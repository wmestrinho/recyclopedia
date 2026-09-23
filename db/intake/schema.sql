-- Donate Electronics intake (Pit Board E). Cloudflare D1 / SQLite.
--
-- Owner setup, once (needs a Cloudflare login; not done from Seat 2):
--   npx wrangler d1 create lbg-intake
--   npx wrangler d1 execute lbg-intake --remote --file db/intake/schema.sql
--   then bind it in wrangler.jsonc as DONATIONS and flip the two switches
--   (see functions/api/donate.js).
--
-- Personal data. Only what the donor typed; no IP address, no user agent.
-- Retention is an owner decision (privacy notice must say it before go-live).

CREATE TABLE IF NOT EXISTS donation (
  id          TEXT PRIMARY KEY,                 -- random UUID
  received_at TEXT NOT NULL,                    -- ISO 8601, UTC
  site        TEXT NOT NULL,                    -- host the form was sent from
  item        TEXT NOT NULL,
  condition   TEXT NOT NULL CHECK (condition IN ('working','partially-working','not-working','unknown')),
  quantity    INTEGER NOT NULL CHECK (quantity BETWEEN 1 AND 99),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  zip         TEXT,
  notes       TEXT,
  status      TEXT NOT NULL DEFAULT 'new'
              CHECK (status IN ('new','contacted','scheduled','received','declined','withdrawn')),
  handled_at  TEXT
);

CREATE INDEX IF NOT EXISTS donation_status_idx ON donation (status, received_at);
