# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.7.10-alpha.1] - 2026-09-15
### Changed
- Homepage now renders the item and category counts from `src/data/items.ts`
  at build time (metric card, two ledes, Tier 1 card, Phase 1 roadmap card)
  instead of a hard-coded "60+".
- About stack tags tell the truth: `Astro · Svelte · TypeScript`,
  `Cloudflare Pages`, `$0/month hosting`, `Open data`.
- One phase order everywhere (homepage roadmap, `README.md`, `VISION.md`
  Status): 1 human input (live) → 2 camera on the search bar (barcode, then
  vision) → 3 PWA + materials layer → 4 local resolution (parked).
- Header sub-line and footer link text is "Absolutely Plausible"; footer
  "initiative" → "production" (footer standard, AP-owned public brand).
- `.feature-grid` uses `auto-fit` / `minmax` so a fourth roadmap card wraps
  cleanly (responsive standard).
- `VISION.md` gains "Sourcing principle" under "The core idea" — Luiz's
  2026-09-15 API-first / symbiosis statement, verbatim.

### Fixed
- Production had been frozen at `v0.7.5` since 2026-07-16: the GitHub → Pages
  integration stopped receiving pushes. Deployed manually; see `CLAUDE.md`
  deployment history and `HANDOFF.md` for the owner ask.

## [0.7.9-alpha.1] - 2026-09-15
### Changed
- `scripts/frs_ingest.py` (layer 3, EPA FRS facilities): records now carry
  `public_access` (`likely`/`unknown`/`no`) and `public_access_basis`, derived
  from `facility_type` only. NAICS classifies industry, not public access —
  the Orange County pilot filed an environmental consultancy and a septic-tank
  company under the same "hazardous collection" heading as a real take-back.
  `likely` is not `open`: anything rendered from this must pair with call-ahead
  guidance, and `verified_at` stays null.
- Fixed primary-type selection: `423930` (scrap) now outranks the loosely
  assigned `562920` (MRF). Orange County MRFs 4 → 1.
- New name-derived `transfer_station` type (54 in Florida) — the most
  consumer-usable sites FRS holds, previously invisible across `562111` and
  `423930`. Guarded so metal "recycling centers" stay scrap yards.
- `naics_type` preserves the pre-heuristic NAICS reading on every record.

### Added
- `--county ALL` for statewide extraction.
- `docs/research/2026-09-15-frs-florida-statewide.json` — 1,700 facilities,
  95 counties, 98.6% geocoded; the reference dataset the classifier was
  validated against.
- Docs: `docs/research/README.md` § "EPA FRS facility ingestion (layer 3)".

### Fixed
- Doc drift: `README.md` (v0.4.0 ×2), `HANDOFF.md` (v0.1.4) and `CLAUDE.md`
  (0.7.6-alpha.1) all restated stale versions. All four docs now point at
  `VERSION`. `AGENTS.md` deploy command said `wrangler pages deploy .` — the
  repo root, not `dist`.
- `package-lock.json` was left at 0.7.7-alpha.1 by the previous bump.

## [0.7.8-alpha.1] - 2026-09-05
### Added
- Automatic dark mode (follows OS/browser `prefers-color-scheme`) for the
  home, privacy, lbg landing, and academy directory/lesson pages, which
  share the `body.lbg-site` token system in `public/css/lbg-theme.css`.
  Colors are hue-preserving dark variants of the real lettuce/beet/
  grapefruit brand palette, not invented. Also fixed two hardcoded colors
  (`site-header` background, hero lede text) that would have broken in
  dark mode, and a stray off-palette nav-hover color in `style.css`.

### Known gap
- The Academy module pages (`src/layouts/LbgaModule.astro`, 13 pages) and
  the `diy/*.astro` pages use their own fully-hardcoded-hex `<style>`
  blocks, independent of `lbg-theme.css` — they don't yet support dark
  mode. Tokenizing them is a separate follow-up.

## [0.7.7-alpha.1] - 2026-09-05
### Added
- Added standardized social footer links (Instagram/LinkedIn/GitHub) to recyclopedia.cc pages.

## [0.7.6-alpha.1] - 2026-09-05
### Added
- `@astrojs/sitemap` integration and `public/robots.txt` for SEO baseline compliance (run `npm install` to pick up the new dependency).
- Open Graph and Twitter Card tags across all page templates.

## [0.7.5-alpha.1] - 2026-09-05
### Added
- Initial changelog baseline.
