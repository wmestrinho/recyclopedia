# The facility database: every state, and the Florida experiment

2026-09-22 · Seat 2 (ThinkPad, Claude Code) · Pit Board `D`

## What Luiz decided

Option **pilot**: Florida only, clearly labelled as an experiment, only the
places we think take the public. His note added three things:

1. **Keep the data for every state**, including Alaska, Hawaii and Puerto Rico,
   for statistics and for the Academy on lettucebeetgrapefruit.com: maps and
   demographic charts.
2. **Build the database with these classes** (the facility classes and the
   `likely` / `unknown` / `no` public-access classes).
3. **Scrap yards and county transfer stations can be published** "with proper
   caution declarations". Deepen the research.

## What was built

| Piece | Where | Committed? |
|---|---|---|
| Schema (SQLite / Cloudflare D1) | `db/facilities/schema.sql` | yes |
| National builder | `scripts/frs_national.py` (shares `classify()` with `scripts/frs_ingest.py`) | yes |
| All 56 EPA bundles (1.4 GB) | `.cache/frs/` | no, gitignored |
| The database (36,297 sites, 16 MB) | `.cache/facilities.sqlite` | no, gitignored |
| Statistics: per state and per county | `docs/research/frs-national-summary.json` (480 KB) | yes |
| The published Florida slice | `src/data/dropoff-fl.json` | yes |
| The page | `/dropoff/florida` (`src/pages/dropoff/florida.astro`) | yes |
| Tests | `scripts/test/dropoff.test.mjs` | yes |

Rebuild everything:

```sh
python3 scripts/frs_national.py --download --cache .cache/frs --states ALL   # ~1.4 GB
python3 scripts/frs_national.py --cache .cache/frs --states ALL \
    --db .cache/facilities.sqlite \
    --summary docs/research/frs-national-summary.json \
    --publish src/data/dropoff-fl.json
```

The build takes about four minutes on the ThinkPad. The download is the slow
part: the EPA server drops to about 0.3 MB/s on one connection, so eight
parallel `curl -R` downloads (as used on 2026-09-22) are much faster than the
script's own one-at-a-time `--download`. `-R` keeps EPA's Last-Modified date
as the file's date, which the builder records as the edition.

## Sources

| Source | What we took | Licence / terms | Edition |
|---|---|---|---|
| U.S. EPA Facility Registry Service, state combined CSV files: <https://www.epa.gov/frs/epa-state-combined-csv-download-files> (files at `https://ordsext.epa.gov/FLA/www3/state_files/state_combined_xx.zip`) | `*_FACILITY_FILE` (name, address, county, county FIPS, coordinates), `*_NAICS_FILE`, `*_SIC_FILE`, `*_ORGANIZATION_FILE` (owner / operator type) | U.S. federal government work, public domain. Not endorsed by EPA; the page says so. | 2026-09-08 for all 56 bundles |

Coverage: the 50 states, DC, Puerto Rico, the U.S. Virgin Islands, Guam,
American Samoa and the Northern Mariana Islands (56 bundles).

## National numbers (EPA edition 2026-09-08)

- **36,297 sites** in scope nationally; 34,722 (95.7%) have coordinates;
  2,809 counties or county-equivalents carry at least one.
- By class: landfill 12,366 · scrap yard 11,379 · hazardous collection 3,711 ·
  waste collection 3,347 · hazardous treatment 1,736 · other treatment 1,184 ·
  MRF 1,094 · incinerator 792 · transfer station 688.
- Public access (our inference): likely 23,745 · unknown 5,583 · no 6,969.
- Operator (FRS's own records): local government 4,025 · private 9,204 ·
  state 186 · federal 123 · tribal 107 · not recorded 22,652.
- Alaska 115, Hawaii 133, Puerto Rico 120 sites.
- If every state were published under the Florida rule: 11,031 scrap yards
  and 224 county or city drop-offs.

Florida: 1,825 sites (up from 1,700 on 2026-09-15; the 125 extra are the SIC
fallback below). Published: **637 scrap yards and 13 county or city
drop-offs.**

## What the deeper research changed

1. **FRS does say who runs a site. We were not reading it.** The
   `ORGANIZATION_FILE` has `ORG_TYPE` (COUNTY, MUNICIPAL, STATE, FEDERAL,
   TRIBE, PRIVATE) on OWNER / OPERATOR rows. That is registry data, not
   inference, and it is what lets the page say "county drop-off" honestly.
   Every site now carries `operator_kind` and `operator_basis`. A municipal
   name ("OKALOOSA COUNTY TRANSFER STATION") is used only when the registry
   is silent, and the basis says so.
2. **The registry is often silent, and sometimes surprising.** 62% of sites
   nationally have no owner/operator type. In Florida, 30 of 54 transfer
   stations have none (Key Largo, Clewiston, LaBelle, Naples, Ocala, Orlando…).
   And a public site run by a contractor can be recorded as PRIVATE (11
   Florida transfer stations are, e.g. L B MCLEOD TRANSFER STATION in
   Orlando; whether that one is public-run is exactly what we cannot tell
   from here). So the drop-off list is
   deliberately short (13) and misses real county sites. That is the cautious
   side to err on; widening it is a question for Luiz (see HANDOFF.md).
3. **SIC 5093 finds scrap yards NAICS misses.** Older FRS records carry only
   an SIC code. Using SIC 5093 (scrap and waste materials) as a fallback, only
   where a site has no in-scope NAICS code, adds 7,084 sites nationally and 125
   in Florida. Marked `class_basis: sic: 5093`, and the page says "older
   industry code".
4. **The scrap class is not only scrap yards.** It includes electronics
   recyclers, medical-equipment dealers, paving and aggregate firms. The
   published rule drops names that say "not a counter" (paving, asphalt,
   concrete, medical, document shredding, paper, transport and similar), which
   removes 39 of 676 in Florida. What is left still includes some non-scrap
   businesses; the page's "why it is listed" line says exactly what the
   evidence is.
5. **County FIPS is on every record that has a county** (86.6%). That is the
   join key for Census population and demographics: per-capita access,
   distance to the nearest drop-off, and similar charts for the Academy.

## The publish rule (in code: `publish_tier()` in `scripts/frs_national.py`)

- **scrap_yard**: the scrap class (NAICS 423930, or SIC 5093 when no NAICS),
  minus the "not a counter" names.
- **public_drop_off**: a transfer station or drop-off centre that FRS's own
  owner/operator records put in local-government hands; where the registry
  is silent, a municipal and non-corporate name.
- Everything else is kept for statistics and never shown to visitors.
- Only Florida is published (`--publish-states FL`).

## The caution declarations on the page

- The Experiment label, and "Florida only".
- "We have not confirmed any of these places."
- "No opening hours, no phone numbers, no list of what each accepts."
- "Call first, every time", plus what to ask and a note on residency checks.
- Hazardous items go to household hazardous waste or take-back, not here.
- Every site says why it is listed, and links its EPA record.
- A "Report a problem" link on every site.
- `noindex`, and excluded from the sitemap: an unconfirmed list should not
  become a search result that outlives it.
- The tests fail the build if the page ever says "open to the public".

## Next research (not done)

1. **Census join**: county population and demographics (Census API, ACS
   5-year; public domain) against `county_fips`, for per-capita access
   charts. Small; no account needed.
2. **Florida DEP's solid-waste facility list**: the state regulator's own
   permits name transfer stations and their operators, and would fill the
   30 silent Florida transfer stations.
3. **County household hazardous waste (HHW) sites**: most Florida counties
   publish them. That is the next public class, and the one hazardous items
   need.
4. **Duplicates**: the same real site sometimes has two registry ids. The
   Florida slice collapses exact name and address repeats; a proper geo dedupe
   (same coordinates within about 50 m) is still to do.
5. **Earth911 / The Recycling Partnership**: hours and accepted materials,
   the part FRS will never have (Pit Board `act4`; redrafted outreach in Drive).
