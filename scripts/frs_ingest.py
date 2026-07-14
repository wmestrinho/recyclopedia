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

Usage:
  python3 scripts/frs_ingest.py --dir <extracted-zip-dir> --state FL \
      --county ORANGE --out docs/research/frs-orange-fl.json
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
NAICS_TO_TYPE = [
    ('562920', 'mrf'),                   # materials recovery facility
    ('562212', 'landfill'),
    ('562213', 'incinerator'),
    ('562211', 'hazardous_treatment'),
    ('562112', 'hazardous_collection'),
    ('562219', 'waste_treatment_other'), # incl. compost — FRS can't split it out
    ('562111', 'waste_collection'),
    ('562119', 'waste_collection'),
    ('423930', 'scrap_yard'),            # recyclable material merchant wholesalers
]
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
    ap.add_argument('--county', required=True, help='county name as FRS spells it, e.g. ORANGE')
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
        if row['COUNTY_NAME'].upper() != county:
            continue
        seen.add(reg)
        codes = sorted(naics_by_reg[reg], key=lambda c: TYPE_PRIORITY[c])
        lat, lon = row['LATITUDE83'].strip(), row['LONGITUDE83'].strip()
        facilities.append({
            'registry_id': reg,
            'name': row['PRIMARY_NAME'].strip(),
            'facility_type': TYPE_OF[codes[0]],
            'address': row['LOCATION_ADDRESS'].strip() or None,
            'city': row['CITY_NAME'].strip() or None,
            'state': row['STATE_CODE'].strip(),
            'zip': row['POSTAL_CODE'].strip() or None,
            'geo': {'lat': float(lat), 'lng': float(lon)} if lat and lon else None,
            'accepts': sorted({TYPE_OF[c] for c in codes}),
            'url': row['FRS_FACILITY_DETAIL_REPORT_URL'].strip() or None,
            'notes': 'NAICS ' + ','.join(codes),
            'source_id': SOURCE_ID,
            'verified_at': None,  # FRS listing != field-verified; stays null
        })

    facilities.sort(key=lambda f: (f['facility_type'], f['name']))
    by_type = defaultdict(int)
    for f in facilities:
        by_type[f['facility_type']] += 1

    out = {
        'generated': date.today().isoformat(),
        'source': SOURCE_ID,
        'query': {'state': st, 'county': county, 'naics': sorted(TYPE_OF)},
        'caveats': [
            'FRS is regulatory-flavored: permits and reporters, not consumer drop-off points.',
            'NAICS-based floor — facilities without waste NAICS codes are missing.',
            'Not field-verified; verified_at stays null until a human or partner confirms.',
            "562219 mixes compost with other non-hazardous treatment — FRS can't split it.",
        ],
        'counts': dict(sorted(by_type.items())),
        'total': len(facilities),
        'facilities': facilities,
    }
    with open(args.out, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f'{len(facilities)} facilities -> {args.out}')
    for t, n in sorted(by_type.items()):
        print(f'  {n:4d}  {t}')


if __name__ == '__main__':
    main()
