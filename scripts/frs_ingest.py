#!/usr/bin/env python3
"""Prototype EPA FRS ingestion — layer 3 of the data strategy (facilities).

Reads an extracted EPA Facility Registry Service "state combined CSV" bundle
(https://www.epa.gov/frs/epa-state-combined-csv-download-files, e.g.
state_combined_fl.zip) and emits waste/recycling facilities for one county as
JSON matching the `facility` table in DATA_SCHEMA.md.

Facility selection is NAICS-based: FRS interest types are permit-program
labels (NPDES, AIR MINOR...), useless for "what kind of place is this" —
NAICS sector 562 + 423930 is the honest classifier. Records without NAICS in
scope are excluded; this is a floor, not a census.

NAICS says what INDUSTRY a site is in, never whether a member of the public
may walk in. The Orange County pilot made that concrete: the "hazardous
collection" bucket held an environmental consultancy (CARLSON ENVIRONMENTAL
CONSULTANTS PC) and a septic-tank company alongside a Walgreens pharmacy
take-back. Shipping that raw would send someone to a consultant's office with
a box of paint. So every record now carries `public_access`, derived from
facility_type alone and never asserted per record - see PUBLIC_ACCESS.

Usage:
  python3 scripts/frs_ingest.py --dir <extracted-zip-dir> --state FL \
      --county ORANGE --out docs/research/frs-orange-fl.json
  python3 scripts/frs_ingest.py --dir <dir> --state FL --county ALL --out fl.json
"""
import argparse
import csv
import json
import sys
from collections import defaultdict
from datetime import date

# NAICS -> our facility_type id (DATA_SCHEMA.md facility_type table).
# Priority order matters: when one registry id carries several codes, the
# first match below wins as the primary type; the rest land in `accepts`.
#
# Priority note: 423930 deliberately outranks 562920. FRS assigns 562920
# ("materials recovery facility") loosely — 19 of the 106 FL sites carrying it
# also carry 423930, and by name those are used-auto-parts and scrap dealers
# (e.g. BUDGET AUTO PARTS OF ORLANDO), not MRFs. Scrap yard is the truer read,
# and it is also the consumer-facing one. Primary type is a heuristic; the full
# `accepts` list is the real data.
NAICS_TO_TYPE = [
    ('562212', 'landfill'),
    ('562213', 'incinerator'),
    ('562211', 'hazardous_treatment'),
    ('562112', 'hazardous_collection'),
    ('562219', 'waste_treatment_other'), # incl. compost — FRS can't split it out
    ('423930', 'scrap_yard'),            # recyclable material merchant wholesalers
    ('562920', 'mrf'),                   # materials recovery facility (over-assigned)
    ('562111', 'waste_collection'),
    ('562119', 'waste_collection'),
]

# Can a member of the public plausibly show up here? Derived from facility_type
# ONLY. FRS has no public-access field, so a per-record claim would be invented.
#   'likely'  — this KIND of site commonly takes walk-ins. Still call first.
#   'unknown' — mixed bucket; some do, some are commercial-only. Never imply open.
#   'no'      — industrial / contract-only. Do not route a person here.
PUBLIC_ACCESS = {
    'scrap_yard': 'likely',             # buy/sell scrap and used parts over the counter
    'landfill': 'likely',               # many counties take resident self-haul
    'hazardous_collection': 'unknown',  # HHW sites AND consultancies land here
    'waste_treatment_other': 'unknown', # 562219 mixes compost in; can't split
    'waste_collection': 'no',           # haulers; you don't visit a hauling company
    'mrf': 'no',                        # sorting lines are not drop-off points
    'incinerator': 'no',
    'hazardous_treatment': 'no',        # permitted TSDs, contract-only
    'transfer_station': 'unknown',      # name-derived; municipal ones take residents
}

# Transfer stations and county drop-offs are the most consumer-usable sites FRS
# holds, and it cannot express them: they scatter across 562111 waste_collection
# and 423930. Only the name gives them away, so this is a NAME match — a
# heuristic, surfaced as one on every record it touches, never a verified fact.
# It overrides the NAICS type, because "ORLANDO TRANSFER STATION" is a transfer
# station whatever its codes say. Access stays 'unknown', not 'likely': we can't
# tell a municipal drop-off from a private one by name alone.
TRANSFER_HINTS = ('TRANSFER STATION', 'TRANSFER STA', 'CONVENIENCE CENTER',
                  'DROP OFF', 'DROP-OFF', 'RECYCLING CENTER')
# ...but "RECYCLING CENTER" is also what scrap dealers call themselves
# (DOMINION METAL RECYCLING CENTER, 419 METAL & AUTO RECYCLING CENTER). When the
# name carries a scrap word and the site holds the scrap NAICS, believe scrap.
SCRAP_WORDS = ('METAL', 'AUTO', 'SCRAP', 'SALVAGE', 'IRON', 'JUNK')
# Deliberately excluded: 562910 remediation, 562991 septic, and the noisy
# 562998 "all other misc waste management" bucket. 5-digit rollup codes
# (56211, 56221...) are rare duplicates of their 6-digit children — skipped.
TYPE_PRIORITY = {code: i for i, (code, _) in enumerate(NAICS_TO_TYPE)}
TYPE_OF = dict(NAICS_TO_TYPE)

SOURCE_ID = 'epa-frs'


def read_csv(path):
    with open(path, encoding='utf-8', errors='replace', newline='') as f:
        yield from csv.DictReader(f)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dir', required=True, help='extracted state_combined_* directory')
    ap.add_argument('--state', required=True, help='state code, e.g. FL (file prefix)')
    ap.add_argument('--county', required=True,
                    help="county name as FRS spells it (e.g. ORANGE), or ALL for statewide")
    ap.add_argument('--out', required=True, help='output JSON path')
    args = ap.parse_args()

    st = args.state.upper()
    county = args.county.upper()

    # Pass 1 — registry ids in scope by NAICS, with all their codes.
    naics_by_reg = defaultdict(set)
    for row in read_csv(f'{args.dir}/{st}_NAICS_FILE.CSV'):
        code = row['NAICS_CODE']
        if code in TYPE_OF:
            naics_by_reg[row['REGISTRY_ID']].add(code)
    if not naics_by_reg:
        sys.exit('no in-scope NAICS records found — wrong directory or state?')

    # Pass 2 — facility records for those ids in the requested county.
    facilities = []
    seen = set()
    for row in read_csv(f'{args.dir}/{st}_FACILITY_FILE.CSV'):
        reg = row['REGISTRY_ID']
        if reg not in naics_by_reg or reg in seen:
            continue
        if county != 'ALL' and row['COUNTY_NAME'].upper() != county:
            continue
        seen.add(reg)
        codes = sorted(naics_by_reg[reg], key=lambda c: TYPE_PRIORITY[c])
        lat, lon = row['LATITUDE83'].strip(), row['LONGITUDE83'].strip()
        name = row['PRIMARY_NAME'].strip()
        ftype = TYPE_OF[codes[0]]
        # Name evidence beats NAICS for transfer stations / drop-offs, which FRS
        # files under whatever permit program happened to register them.
        upper = name.upper()
        looks_transfer = any(h in upper for h in TRANSFER_HINTS)
        if looks_transfer and '423930' in codes and any(w in upper for w in SCRAP_WORDS):
            looks_transfer = False  # a metal "recycling center" is a scrap yard
        if looks_transfer:
            ftype = 'transfer_station'
        access = PUBLIC_ACCESS[ftype]
        facilities.append({
            'registry_id': reg,
            'name': name,
            'facility_type': ftype,
            'public_access': access,
            'public_access_basis': (
                'name-heuristic: looks like a transfer station / drop-off'
                if looks_transfer else f'facility_type: {ftype}'),
            'county': row['COUNTY_NAME'].strip() or None,
            'address': row['LOCATION_ADDRESS'].strip() or None,
            'city': row['CITY_NAME'].strip() or None,
            'state': row['STATE_CODE'].strip(),
            'zip': row['POSTAL_CODE'].strip() or None,
            'geo': {'lat': float(lat), 'lng': float(lon)} if lat and lon else None,
            'accepts': sorted({TYPE_OF[c] for c in codes}),
            'url': row['FRS_FACILITY_DETAIL_REPORT_URL'].strip() or None,
            'naics_type': TYPE_OF[codes[0]],  # what NAICS alone said, pre-heuristic
            'notes': 'NAICS ' + ','.join(codes),
            'source_id': SOURCE_ID,
            'verified_at': None,  # FRS listing != field-verified; stays null
        })

    facilities.sort(key=lambda f: (f['facility_type'], f['name']))
    by_type = defaultdict(int)
    by_access = defaultdict(int)
    for f in facilities:
        by_type[f['facility_type']] += 1
        by_access[f['public_access']] += 1

    out = {
        'generated': date.today().isoformat(),
        'source': SOURCE_ID,
        'query': {'state': st, 'county': county, 'naics': sorted(TYPE_OF)},
        'public_access_note': (
            'public_access is derived from facility_type, not from FRS — FRS has '
            'no such field. It answers "could a person plausibly walk in", not '
            '"is this open to you today". Never render a "likely" as "open to '
            'the public"; always pair it with call-ahead guidance.'),
        'caveats': [
            'FRS is regulatory-flavored: permits and reporters, not consumer drop-off points.',
            'NAICS-based floor — facilities without waste NAICS codes are missing.',
            'Not field-verified; verified_at stays null until a human or partner confirms.',
            "562219 mixes compost with other non-hazardous treatment — FRS can't split it.",
            'NAICS describes industry, not public access: the hazardous-collection '
            'bucket mixes real HHW sites with consultancies and septic firms.',
            'Primary facility_type is a heuristic when a site carries several NAICS '
            'codes; `accepts` is the full, unranked truth.',
        ],
        'counts': dict(sorted(by_type.items())),
        'public_access_counts': dict(sorted(by_access.items())),
        'total': len(facilities),
        'facilities': facilities,
    }
    with open(args.out, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f'{len(facilities)} facilities -> {args.out}')
    for t, n in sorted(by_type.items()):
        print(f'  {n:4d}  {t}')
    print('  public access (derived from type, not FRS):')
    for a in ('likely', 'unknown', 'no'):
        if by_access.get(a):
            print(f'  {by_access[a]:4d}  {a}')


if __name__ == '__main__':
    main()
