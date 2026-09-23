#!/usr/bin/env python3
"""Build the facility database for every US state and territory from EPA FRS.

Pit Board D (Luiz, 2026-09-21): keep the data for every state including
Alaska, Hawaii and Puerto Rico, for statistics, maps and demographic charts;
build the database with these classes; publish scrap yards and county transfer
stations, Florida first, as an experiment with caution declarations.

Reads EPA FRS "state combined CSV" zips straight from a cache folder (no
extraction) and classifies every in-scope site with the same rules as
scripts/frs_ingest.py (its `classify()`), plus two things the one-state
prototype did not have:

  * operator_kind — who owns / operates the site according to FRS's own
    ORGANIZATION file (ORG_TYPE COUNTY / MUNICIPAL / STATE / FEDERAL / TRIBE /
    PRIVATE on an OWNER or OPERATOR affiliation). That is registry data, not a
    guess from the name, and it is what lets us say "county transfer station".
    A municipal-sounding name is used only when the registry is silent, and
    the basis column says so.
  * SIC 5093 (scrap and waste materials) as a fallback class for sites that
    carry no in-scope NAICS code, marked `class_basis: sic: 5093`.

Outputs
  --db       SQLite database (schema: db/facilities/schema.sql). Not committed:
             it is generated and large. D1-compatible.
  --summary  per-state and per-county counts (committed; small; the Academy's
             statistics start here).
  --publish  the Florida experiment slice shown on the site (committed).

Usage
  # 1. download (1.5 GB for all 56 bundles; kept in .cache/, gitignored)
  python3 scripts/frs_national.py --download --cache .cache/frs --states ALL
  # 2. build
  python3 scripts/frs_national.py --cache .cache/frs --states ALL \\
      --db .cache/facilities.sqlite \\
      --summary docs/research/frs-national-summary.json \\
      --publish src/data/dropoff-fl.json
"""
import argparse
import csv
import io
import json
import os
import re
import sqlite3
import sys
import urllib.request
import zipfile

csv.field_size_limit(1 << 24)
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from frs_ingest import PUBLIC_ACCESS, TYPE_OF, TYPE_PRIORITY, classify  # noqa: E402

ROOT = Path(__file__).resolve().parents[1]
URL = 'https://ordsext.epa.gov/FLA/www3/state_files/state_combined_{}.zip'

# 50 states + DC + the five inhabited territories FRS publishes bundles for.
ALL_STATES = ('AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS '
              'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV '
              'WI WY PR VI GU AS MP').split()

SIC_FALLBACK = {'5093': 'scrap_yard'}  # scrap and waste materials (wholesale)

CLASSES = [
    # id, label, naics, description
    ('landfill', 'Landfill', '562212', 'Solid-waste landfill. Many county landfills take resident self-haul; private ones often do not.'),
    ('incinerator', 'Incinerator / waste-to-energy', '562213', 'Combustion facility. Not a drop-off point.'),
    ('hazardous_treatment', 'Hazardous waste treatment / disposal', '562211', 'Permitted treatment, storage and disposal facility. Contract-only.'),
    ('hazardous_collection', 'Hazardous waste collection', '562112', 'Mixed bucket: real household-hazardous-waste sites sit next to consultancies and septic firms.'),
    ('waste_treatment_other', 'Other non-hazardous treatment (incl. compost)', '562219', 'Includes composting; FRS cannot split it out.'),
    ('scrap_yard', 'Scrap yard / recyclable-material dealer', '423930', 'Buys and sells scrap metal and used parts, usually over the counter. Also holds some electronics and specialty recyclers.'),
    ('mrf', 'Materials recovery facility', '562920', 'Sorting plant. Not a drop-off point. Over-assigned by FRS.'),
    ('waste_collection', 'Waste collection / hauler', '562111,562119', 'Hauling companies. You do not visit a hauler.'),
    ('transfer_station', 'Transfer station / drop-off centre', None, 'Name-derived: FRS has no code for it. County and city ones take residents.'),
]

LOCAL_GOV = {'COUNTY', 'MUNICIPAL', 'CITY', 'TOWN', 'DISTRICT', 'LOCAL'}
OP_RANK = {'local_government': 0, 'state': 1, 'federal': 2, 'tribal': 3, 'private': 4}
MUNICIPAL_NAME = re.compile(r'\b(COUNTY|CITY OF|TOWN OF|VILLAGE OF|BOROUGH|PARISH|MUNICIPAL|'
                            r'RESIDENTIAL|CITIZENS?|CONVENIENCE (CENTER|SITE))\b')
CORPORATE_NAME = re.compile(r'\b(INC|LLC|L\.L\.C|LTD|CORP|CORPORATION|COMPANY|CO)\b\.?|'
                            r'\bWM\b|WASTE MANAGEMENT|REPUBLIC SERVICES|WASTE CONNECTIONS|WASTE PRO')
# Scrap-class sites whose names say they are not a counter a person walks up to.
NOT_WALK_IN = re.compile(r'\b(ASPHALT|PAVING|CONCRETE|AGGREGATE|MEDICAL|PHARMA\w*|COATING|'
                         r'CONSULT\w*|ENVIRONMENTAL SERVICES|TRANSPORT\w*|TRUCKING|'
                         r'WASTE PROCESSING|LANDFILL|SHREDDING|DOCUMENT|PAPER|FIBER|TEXTILES?)\b')


def org_kind(org_type):
    t = (org_type or '').upper()
    if t in LOCAL_GOV:
        return 'local_government'
    if t == 'STATE':
        return 'state'
    if t == 'FEDERAL':
        return 'federal'
    if t in ('TRIBE', 'TRIBAL', 'INDIAN'):
        return 'tribal'
    if t == 'PRIVATE':
        return 'private'
    return None


def rows(z, name):
    # Some bundles carry stray NUL bytes inside fields, which csv refuses.
    with z.open(name) as raw:
        text = io.TextIOWrapper(raw, encoding='utf-8', errors='replace', newline='')
        yield from csv.DictReader(line.replace(chr(0), '') for line in text)


def download(cache, states):
    cache.mkdir(parents=True, exist_ok=True)
    for st in states:
        dest = cache / f'state_combined_{st.lower()}.zip'
        if dest.exists() and dest.stat().st_size:
            continue
        print(f'download {st} …', flush=True)
        part = dest.with_suffix('.zip.part')
        req = urllib.request.Request(URL.format(st.lower()), headers={'User-Agent': 'recyclopedia-frs/1'})
        with urllib.request.urlopen(req, timeout=120) as r, open(part, 'wb') as f:
            while chunk := r.read(1 << 20):
                f.write(chunk)
            lm = r.headers.get('Last-Modified')
        part.replace(dest)
        if lm:
            ts = datetime.strptime(lm, '%a, %d %b %Y %H:%M:%S %Z').replace(tzinfo=timezone.utc).timestamp()
            os.utime(dest, (ts, ts))


def edition_date(path):
    return datetime.fromtimestamp(path.stat().st_mtime, timezone.utc).date().isoformat()


def process_state(path, st):
    z = zipfile.ZipFile(path)
    names = {n.upper(): n for n in z.namelist()}
    need = f'{st}_FACILITY_FILE.CSV'
    if need not in names:
        raise SystemExit(f'{path.name}: no {need}')

    naics_by_reg = defaultdict(set)
    for r in rows(z, names[f'{st}_NAICS_FILE.CSV']):
        if r['NAICS_CODE'] in TYPE_OF:
            naics_by_reg[r['REGISTRY_ID']].add(r['NAICS_CODE'])
    sic_by_reg = defaultdict(set)
    if f'{st}_SIC_FILE.CSV' in names:
        for r in rows(z, names[f'{st}_SIC_FILE.CSV']):
            if r['SIC_CODE'] in SIC_FALLBACK and r['REGISTRY_ID'] not in naics_by_reg:
                sic_by_reg[r['REGISTRY_ID']].add(r['SIC_CODE'])
    in_scope = set(naics_by_reg) | set(sic_by_reg)

    ops = defaultdict(list)  # registry id -> [(kind, 'ORG_TYPE AFFILIATION')]
    if f'{st}_ORGANIZATION_FILE.CSV' in names:
        for r in rows(z, names[f'{st}_ORGANIZATION_FILE.CSV']):
            reg = r['REGISTRY_ID']
            if reg not in in_scope:
                continue
            aff = (r['AFFILIATION_TYPE'] or '').upper()
            if 'OWNER' not in aff and 'OPERATOR' not in aff:
                continue
            kind = org_kind(r['ORG_TYPE'])
            if kind:
                ops[reg].append((kind, f"{r['ORG_TYPE'].upper()} {aff}"))

    scanned = 0
    seen = set()
    out = []
    for r in rows(z, names[need]):
        scanned += 1
        reg = r['REGISTRY_ID']
        if reg not in in_scope or reg in seen:
            continue
        seen.add(reg)
        name = (r['PRIMARY_NAME'] or '').strip()
        if reg in naics_by_reg:
            codes = sorted(naics_by_reg[reg], key=lambda c: TYPE_PRIORITY[c])
            ftype, access, basis = classify(name, codes)
            naics_class = TYPE_OF[codes[0]]
            class_basis = ('name: transfer station / drop-off' if ftype == 'transfer_station'
                           else f'naics: {codes[0]}')
            code_list = codes
        else:
            code_list = sorted(sic_by_reg[reg])
            ftype = SIC_FALLBACK[code_list[0]]
            access, basis = PUBLIC_ACCESS[ftype], f'facility_type: {ftype} (from SIC)'
            naics_class = None
            class_basis = f'sic: {code_list[0]}'

        if ops.get(reg):
            kind, why = min(ops[reg], key=lambda k: OP_RANK[k[0]])
            op_kind, op_basis = kind, f'frs-organization: {why}'
        elif MUNICIPAL_NAME.search(name.upper()) and not CORPORATE_NAME.search(name.upper()):
            op_kind, op_basis = 'local_government', 'name: municipal wording (registry silent)'
        else:
            op_kind, op_basis = 'unknown', 'none'

        lat, lng = (r['LATITUDE83'] or '').strip(), (r['LONGITUDE83'] or '').strip()
        fips = (r.get('FIPS_CODE') or '').strip()
        out.append({
            'registry_id': reg, 'state': (r['STATE_CODE'] or st).strip() or st,
            'county': (r['COUNTY_NAME'] or '').strip() or None,
            'county_fips': fips if re.fullmatch(r'\d{5}', fips) else None,
            'name': name,
            'address': (r['LOCATION_ADDRESS'] or '').strip() or None,
            'city': (r['CITY_NAME'] or '').strip() or None,
            'zip': (r['POSTAL_CODE'] or '').strip() or None,
            'lat': float(lat) if lat else None, 'lng': float(lng) if lng else None,
            'facility_class': ftype, 'class_basis': class_basis, 'naics_class': naics_class,
            'codes': ','.join(code_list),
            'public_access': access, 'public_access_basis': basis,
            'operator_kind': op_kind, 'operator_basis': op_basis,
            'frs_url': (r['FRS_FACILITY_DETAIL_REPORT_URL'] or '').strip() or None,
        })
    return out, scanned


def publish_tier(f):
    """Which label a site is shown under, or None (statistics only).

    Only the two classes Luiz cleared for publication, and only where we have a
    reason to think a person may walk in:
      scrap_yard      — the scrap class (NAICS 423930 or SIC 5093), minus names
                        that say the business is not a counter (paving, medical,
                        document shredding, ...).
      public_drop_off — a transfer station / drop-off centre that FRS's own
                        owner/operator records put in local-government hands,
                        or, where the registry is silent, whose name is
                        municipal and not corporate.
    """
    upper = f['name'].upper()
    if f['facility_class'] == 'scrap_yard':
        return None if NOT_WALK_IN.search(upper) else 'scrap_yard'
    if f['facility_class'] == 'transfer_station' and f['operator_kind'] == 'local_government':
        return 'public_drop_off'
    return None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--cache', default='.cache/frs')
    ap.add_argument('--states', default='ALL', help='comma list (FL,AK,PR) or ALL')
    ap.add_argument('--download', action='store_true', help='fetch missing bundles, then stop')
    ap.add_argument('--db')
    ap.add_argument('--summary')
    ap.add_argument('--publish', help='write the Florida experiment slice here')
    ap.add_argument('--publish-states', default='FL')
    args = ap.parse_args()

    cache = (ROOT / args.cache) if not os.path.isabs(args.cache) else Path(args.cache)
    states = ALL_STATES if args.states.upper() == 'ALL' else [s.strip().upper() for s in args.states.split(',')]
    if args.download:
        download(cache, states)
        return

    db = None
    if args.db:
        dbp = Path(args.db)
        if dbp.exists():
            dbp.unlink()
        db = sqlite3.connect(dbp)
        db.executescript((ROOT / 'db/facilities/schema.sql').read_text(encoding='utf-8'))
        db.executemany('INSERT INTO facility_class VALUES (?,?,?,?,?)',
                       [(i, l, n, PUBLIC_ACCESS[i], d) for i, l, n, d in CLASSES])

    publish_scope = {s.strip().upper() for s in args.publish_states.split(',')}
    summary_states = {}
    county_rows = defaultdict(Counter)
    county_names = {}
    published = []
    missing = []
    now = datetime.now(timezone.utc).date().isoformat()

    for st in states:
        path = cache / f'state_combined_{st.lower()}.zip'
        if not path.exists():
            missing.append(st)
            continue
        facs, scanned = process_state(path, st)
        for f in facs:
            f['publish_tier'] = publish_tier(f) if f['state'] in publish_scope else None
            f['publish_scope'] = 'fl-experiment' if f['publish_tier'] else None
            # Rows whose STATE_CODE disagrees with the bundle keep the bundle's
            # state, so every row joins its source edition.
            f['state'] = st
        edition = edition_date(path)
        if db:
            db.execute('INSERT INTO source_edition VALUES (?,?,?,?,?,?)',
                       (st, URL.format(st.lower()), edition, now, scanned, len(facs)))
            cols = ['registry_id', 'state', 'county', 'county_fips', 'name', 'address', 'city', 'zip',
                    'lat', 'lng', 'facility_class', 'class_basis', 'naics_class', 'codes',
                    'public_access', 'public_access_basis', 'operator_kind', 'operator_basis',
                    'publish_tier', 'publish_scope', 'frs_url']
            db.executemany(f'INSERT OR IGNORE INTO facility ({",".join(cols)}) VALUES ({",".join("?" * len(cols))})',
                           [tuple(f[c] for c in cols) for f in facs])

        by_class = Counter(f['facility_class'] for f in facs)
        by_access = Counter(f['public_access'] for f in facs)
        by_op = Counter(f['operator_kind'] for f in facs)
        summary_states[st] = {
            'edition': edition,
            'total': len(facs),
            'geocoded': sum(1 for f in facs if f['lat'] is not None),
            'by_class': dict(sorted(by_class.items())),
            'by_public_access': dict(sorted(by_access.items())),
            'by_operator': dict(sorted(by_op.items())),
            'from_sic_only': sum(1 for f in facs if f['class_basis'].startswith('sic')),
            'publishable_if_enabled': {
                'scrap_yard': sum(1 for f in facs if f['facility_class'] == 'scrap_yard' and not NOT_WALK_IN.search(f['name'].upper())),
                'public_drop_off': sum(1 for f in facs if f['facility_class'] == 'transfer_station' and f['operator_kind'] == 'local_government'),
            },
        }
        for f in facs:
            if f['county_fips']:
                county_rows[f['county_fips']][f['facility_class']] += 1
                county_names[f['county_fips']] = (st, f['county'])
        published += [f for f in facs if f['publish_tier']]
        print(f'{st}: {len(facs):6d} sites  ({scanned} FRS records scanned)', flush=True)

    if db:
        db.commit()
        db.close()

    if args.summary:
        totals = Counter()
        for s in summary_states.values():
            for k, v in s['by_class'].items():
                totals[k] += v
        out = {
            'generated': now,
            'source': 'epa-frs',
            'source_url': 'https://www.epa.gov/frs/epa-state-combined-csv-download-files',
            'builder': 'scripts/frs_national.py',
            'note': ('Counts of sites in EPA\'s Facility Registry Service whose industry codes put '
                     'them in waste and recycling (NAICS 562xxx, 423930; SIC 5093 where no NAICS). '
                     'A floor, not a census. public_access and operator_kind are Recyclopedia\'s '
                     'classifications, not EPA fields; see db/facilities/schema.sql.'),
            'states_included': sorted(summary_states),
            'states_missing': missing,
            'national': {'total': sum(s['total'] for s in summary_states.values()),
                         'by_class': dict(sorted(totals.items()))},
            'states': summary_states,
            'counties': {fips: {'state': county_names[fips][0], 'county': county_names[fips][1],
                                'by_class': dict(sorted(c.items()))}
                         for fips, c in sorted(county_rows.items())},
        }
        Path(args.summary).write_text(json.dumps(out, indent=1, ensure_ascii=False) + '\n', encoding='utf-8')
        print(f'summary -> {args.summary}')

    if args.publish:
        keep = ['registry_id', 'name', 'address', 'city', 'county', 'zip', 'lat', 'lng',
                'publish_tier', 'operator_kind', 'operator_basis', 'class_basis', 'frs_url']
        # One real site sometimes has two registry ids (two KEY LARGO TRANSFER
        # STATION records): collapse exact name + address duplicates.
        uniq = {}
        for f in sorted(published, key=lambda f: (f['county'] or '', f['publish_tier'], f['name'])):
            uniq.setdefault((f['name'].upper(), (f['address'] or '').upper()), f)
        sites = [{k: f[k] for k in keep} for f in uniq.values()]
        editions = sorted({summary_states[s]['edition'] for s in publish_scope if s in summary_states})
        out = {
            'generated': now,
            'scope': sorted(publish_scope),
            'experiment': True,
            'source': 'epa-frs',
            'source_edition': editions,
            'rule': publish_tier.__doc__.strip(),
            'counts': dict(Counter(f['publish_tier'] for f in sites)),
            'total': len(sites),
            'sites': sites,
        }
        Path(args.publish).write_text(json.dumps(out, indent=1, ensure_ascii=False) + '\n', encoding='utf-8')
        print(f'publish -> {args.publish}: {out["counts"]}')


if __name__ == '__main__':
    main()
