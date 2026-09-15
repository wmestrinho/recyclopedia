# Research Archive — Provenance Index

Raw research notes are archived here **verbatim** as they arrive through the
multi-agent handoff pipeline; curated outcomes live in the canonical docs and
data files. Same rules as `docs/academy/PROVENANCE.md`: research is reviewed
critically before implementation — archived text is provenance, not policy.

## Roles

- **Research agents (Gemini / external)** — sweeping research, source discovery.
- **Claude (this repo)** — review, correction, implementation into the codebase.
- **Luiz** — owner / final decision.

## Archived notes

| Note | Received | Author | Outcome in repo |
|---|---|---|---|
| [Global waste-tracking datasets](2026-07-12-global-waste-datasets.md) | 2026-07-12 | Research handoff (via Luiz) | `SOURCES` table in `src/data/organizations.ts`; "Global / macro datasets" section in `DATA_STRATEGY.md`; whitepaper v1.3 figure refresh (GWMO 2024, E-waste Monitor 2024); "Key datasets" strip on `/academy/directory` |
| [LBG directory seed (~200 orgs)](2026-07-12-lbg-directory-seed.md) | 2026-07-12 | Research handoff (via Luiz) | `ORGANIZATIONS` table in `src/data/organizations.ts`; public directory at `/academy/directory`; directory extension in `DATA_SCHEMA.md`; Module 1.7 "Why Do We Have Trash At All?" (the note's 9-stage learning path) |
| [EPA FRS — Orange County FL pilot](2026-07-14-frs-orange-county-fl.json) | 2026-07-14 | `scripts/frs_ingest.py` (EPA FRS state CSV) | Layer-3 facility prototype; `epa-frs` added to `SOURCES` |
| [EPA FRS — Florida statewide](2026-09-15-frs-florida-statewide.json) | 2026-09-15 | `scripts/frs_ingest.py --county ALL` | 1,700 facilities across 95 counties, 98.6% geocoded; the `public_access` classification (below) was derived and validated against it |

## Corrections applied during implementation

1. **Argentina agency URL** in the directory seed resolved to a tourism/sports
   secretariat, not an environment authority — ingested with
   `verification_status: 'needs-review'` rather than silently fixed or dropped
   (per the note's own verification rules).
2. **Note-two schema reconciled, not adopted wholesale:** its 10 fields were
   merged with the pre-existing Atlas `organization`/`source` model in
   `DATA_SCHEMA.md`; the locked `org_role_t` enum was kept unchanged and the
   note's `category` taxonomy became a separate directory facet.
3. **Profile-per-organization pages deferred** to the future
   lettucebeetgrapefruit.org build-out; v1 ships a single filterable index.

## EPA FRS facility ingestion (layer 3)

Generated, not hand-written: `scripts/frs_ingest.py` reads an EPA FRS
"state combined CSV" bundle. Both JSON files above are reproducible from a
fresh download — re-running FL on the 2026-09-08 EPA edition reproduced the
July pilot exactly, plus two new facilities.

**Do not commit a statewide file per state.** Florida is here as the reference
dataset the classifier was validated against; 50 of these would be ~60 MB of
generated data in a public repo. Generate what you need.

### The finding that shapes layer 3

**NAICS tells you what industry a site is in. It never tells you whether a
person may walk in.** The Orange County pilot filed an environmental
consultancy, a septic-tank company and a Walgreens pharmacy take-back under the
same "hazardous collection" heading. Shipping that raw would send someone to a
consultant's office with a box of paint.

So every record carries `public_access` — `likely` / `unknown` / `no` —
derived from `facility_type` **only**, with `public_access_basis` naming the
derivation. FRS has no public-access field, so any per-record claim would be
invented. Statewide FL: 957 likely, 347 unknown, 396 no.

**This is a floor, not a census, and `likely` is not `open`.** Nothing rendered
from this data may say "open to the public"; it must pair with call-ahead
guidance, and `verified_at` stays `null` until a human or partner confirms.

### Two heuristics, both deliberate and both marked in the data

1. **Primary type when a site carries several NAICS codes.** `423930` (scrap)
   now outranks `562920` (MRF): FRS assigns 562920 loosely, and 19 of the 106
   Florida sites carrying it also carry 423930 — by name those are
   used-auto-parts and scrap dealers (BUDGET AUTO PARTS OF ORLANDO), not MRFs.
   `accepts` keeps the full unranked truth; `naics_type` keeps what NAICS alone
   said before any heuristic ran.
2. **Transfer stations are name-matched.** They are the most consumer-usable
   sites FRS holds and it cannot express them — they scatter across 562111
   and 423930. The name match overrides the NAICS type (54 found statewide,
   mostly genuine county drop-offs), guarded so that metal "recycling centers"
   stay scrap yards. Access stays `unknown`, never `likely`: a name can't
   distinguish a municipal drop-off from a private one.

### Known limits

- FRS is regulatory: permits and reporters, not a consumer directory.
- Envirofacts cross-table joins 500 server-side — bulk state CSV is the path.
- `562219` mixes composting with other non-hazardous treatment; unsplittable.
- Duplicate registry ids exist for one real site (two KEY LARGO TRANSFER
  STATION records statewide). Dedup is by registry id, so they survive.
- 1.4% of Florida records have no coordinates.
