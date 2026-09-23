-- Recyclopedia facility database — layer 3 ("where"), every US state and territory.
--
-- SQLite / Cloudflare D1 dialect. Built by scripts/frs_national.py from EPA FRS
-- state bundles; the Postgres sketch in DATA_SCHEMA.md ("facilities (layer 3)")
-- is the long-term shape, and this file is its first concrete, runnable form.
--
-- Owner decision (Pit Board D, 2026-09-21): keep the data for EVERY state,
-- including Alaska, Hawaii and Puerto Rico, for statistics, maps and
-- demographic charts (the Academy, lettucebeetgrapefruit.com); build the
-- database with these classes; publish only scrap yards and county transfer
-- stations, Florida first, as an experiment with caution declarations.
--
-- Three rules this schema exists to keep:
--   1. `public_access` is OUR inference from the kind of site. FRS has no such
--      field. It is never "open to the public"; `likely` means "this kind of
--      place usually takes walk-ins", nothing more.
--   2. Every inference names its basis (`*_basis` columns). A reader can always
--      see whether a class came from an industry code, a name, or a registry
--      owner record.
--   3. `verified_at` stays NULL until a human or a data partner confirms the
--      site. Nothing in this pipeline sets it.

PRAGMA foreign_keys = ON;

-- One row per downloaded state bundle, so every facility can say which EPA
-- edition it came from.
CREATE TABLE IF NOT EXISTS source_edition (
  state          TEXT PRIMARY KEY,        -- USPS code: FL, AK, PR, GU, ...
  url            TEXT NOT NULL,           -- https://ordsext.epa.gov/FLA/www3/state_files/state_combined_xx.zip
  last_modified  TEXT,                    -- EPA's Last-Modified for the zip (the edition date)
  processed_at   TEXT NOT NULL,           -- when frs_national.py read it
  facility_rows  INTEGER NOT NULL,        -- FRS facility records scanned
  in_scope       INTEGER NOT NULL         -- records that landed in `facility`
);

-- The classes. Fixed vocabulary; frs_national.py inserts these rows.
CREATE TABLE IF NOT EXISTS facility_class (
  id             TEXT PRIMARY KEY,        -- 'scrap_yard', 'transfer_station', ...
  label          TEXT NOT NULL,
  naics          TEXT,                    -- comma list; NULL for name-derived classes
  default_access TEXT NOT NULL CHECK (default_access IN ('likely','unknown','no')),
  description    TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS facility (
  registry_id         TEXT PRIMARY KEY,   -- EPA FRS REGISTRY_ID
  state               TEXT NOT NULL REFERENCES source_edition(state),
  county              TEXT,               -- as FRS spells it
  county_fips         TEXT,               -- 5-digit state+county FIPS, for Census joins
  name                TEXT NOT NULL,
  address             TEXT,
  city                TEXT,
  zip                 TEXT,
  lat                 REAL,
  lng                 REAL,

  facility_class      TEXT NOT NULL REFERENCES facility_class(id),
  class_basis         TEXT NOT NULL,      -- 'naics: 423930' | 'name: transfer station' | 'sic: 5093'
  naics_class         TEXT,               -- what the industry code alone said, before any heuristic
  codes               TEXT NOT NULL,      -- all in-scope NAICS/SIC codes, comma list

  public_access       TEXT NOT NULL CHECK (public_access IN ('likely','unknown','no')),
  public_access_basis TEXT NOT NULL,

  operator_kind       TEXT NOT NULL CHECK (operator_kind IN
                        ('local_government','state','federal','tribal','private','unknown')),
  operator_basis      TEXT NOT NULL,      -- 'frs-organization: COUNTY OWNER' | 'name: COUNTY' | 'none'

  -- NULL = kept for statistics only. A value = shown to visitors, and under
  -- which label. Set by the publish rule in frs_national.py, never by hand.
  publish_tier        TEXT CHECK (publish_tier IN ('scrap_yard','public_drop_off')),
  publish_scope       TEXT,               -- 'fl-experiment' while only Florida is published

  frs_url             TEXT,
  source_id           TEXT NOT NULL DEFAULT 'epa-frs',
  verified_at         TEXT                -- stays NULL (rule 3)
);

CREATE INDEX IF NOT EXISTS facility_state_idx   ON facility (state, facility_class);
CREATE INDEX IF NOT EXISTS facility_county_idx  ON facility (county_fips);
CREATE INDEX IF NOT EXISTS facility_publish_idx ON facility (publish_scope, publish_tier);
CREATE INDEX IF NOT EXISTS facility_geo_idx     ON facility (lat, lng);

-- Statistics views (the Academy's charts start here).
CREATE VIEW IF NOT EXISTS state_class_counts AS
  SELECT state, facility_class, public_access, COUNT(*) AS n
  FROM facility GROUP BY state, facility_class, public_access;

CREATE VIEW IF NOT EXISTS county_class_counts AS
  SELECT state, county_fips, county, facility_class, COUNT(*) AS n
  FROM facility WHERE county_fips IS NOT NULL
  GROUP BY state, county_fips, county, facility_class;
