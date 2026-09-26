# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]
### Added
- `docs/research/2026-09-26-lens-benchmark.md`: the first rough Lens number,
  run on the 37 openly licensed stock examples (Pit Board `act5`). Llama 4
  Scout: top-1 86.5%, p95 3.2 s, which passes the Card C.0 bar on stock
  photos. Moondream 3.1: 35.1%. The real number still needs the owner's own
  photos.

## [0.8.15-alpha.1] - 2026-09-22
### Changed
- **Donate Electronics moved to Lettuce Beet Grapefruit** (Pit Board `E`):
  the form, the donation sign and the item list now live at
  `lettucebeetgrapefruit.com/donate` (built at `/lbg/donate/`; the middleware
  maps `/donate` on the `.com` host). recyclopedia.cc keeps the sign in its
  Donate section with a card pointing there; the header's Donate Electronics
  button, the sign's item cells, the LBG homepage's donate band and its
  "Donate Tech" nav link all open the new page, pre-filling `?item=`. The
  sign's Lookup links point back at recyclopedia.cc when shown off it.
- The privacy notice says where the form lives and that it will say so before
  direct submission is switched on.
### Added
- **The direct intake, built and switched off**: `functions/api/donate.js`
  (JSON, 8 KB cap, validation, honeypot, per-IP limit, `no-store`, no IP or
  user agent stored) writing to a D1 table (`db/intake/schema.sql`). While
  `DONATE_INTAKE_ENABLED` / `DONATE_INTAKE_LIVE` are off, the form keeps the
  email hand-off; when on, it falls back to email on any failure.
- `scripts/test/donate.test.mjs`: switches in step, validation, 503 when off,
  store / honeypot when on, the `/donate` host route, and the built pages.
- `docs/lbg/24HR-REPAIR-SHOP.md`: a planning stub for Luiz's 24-hour
  electronics repair shop idea (questions only, no code).

## [0.8.14-alpha.1] - 2026-09-22
### Added
- **An experiment: Florida scrap yards and county drop-offs** at
  `/dropoff/florida` (Pit Board `D`). 637 scrap yards and 13 county or city
  drop-off sites from the U.S. EPA Facility Registry, each with the reason it
  is listed, a map link, its EPA record and a "report a problem" link, under a
  caution block: not confirmed, no hours, call first, hazardous items go
  elsewhere. `noindex`, and left out of the sitemap. Linked from the About
  roadmap's Phase 4 card.
- **The facility database, every state and territory**:
  `db/facilities/schema.sql` (SQLite / D1) and `scripts/frs_national.py`,
  which reads all 56 EPA bundles (36,297 sites) and adds who runs each site
  from FRS's own owner/operator records and an SIC 5093 fallback for scrap
  yards. The database stays generated in `.cache/`; the per-state and
  per-county summary (`docs/research/frs-national-summary.json`) is committed
  for the Academy's statistics.
- `scripts/test/dropoff.test.mjs`: Florida only, two classes, evidence on
  every site, and the page never says "open to the public".
### Changed
- `scripts/frs_ingest.py`: classification moved into `classify()`, shared with
  the national builder. Output unchanged.

## [0.8.13-alpha.1] - 2026-09-22
### Changed
- **The version rule runs on every push, not only on pull requests**
  (Pit Board `H`). The rule is the one stated for every AP repo in
  `ap-ops/docs/PROJECT-RULES.md`; `scripts/check_version_rule.mjs` makes it
  runnable (bare SemVer `VERSION`, `package.json` agrees, a dated `CHANGELOG`
  section for the current version, and a `VERSION` bump whenever anything but
  docs or CI config changed). `version-check.yml` now runs it on push to
  `main` and on PRs; agents run it before pushing.
### Fixed
- `ci.yml`'s version-drift guard grepped for a `v` prefix that `VERSION` has
  not carried since the SemVer cleanup, so it would have failed every run. It
  never ran, which is why nobody saw it. Replaced with the shared script.

## [0.8.12-alpha.1] - 2026-09-17
### Changed
- **The top header is a sign's title row.** Graph paper under the bar, a 1px
  ink rule, the recycling mark re-drawn at build time as a pencil sketch (one
  arrow per logo colour) on its own paper tile, the wordmark in Hanken bold
  uppercase, the AP by-line in Share Tech Mono, nav pills that fill with ink
  when active. One `EngineHeader.astro` now serves the homepage, `/privacy`
  and every `/signs/*` page (the board pages' mobile menu button works for
  the first time; the toggle moved out of `main.js`).
- **The logo is the sketch.** The favicon is `images/recyclopedia-mark.svg`
  (the same drawing on a bordered graph-paper tile) and the PWA / touch icons
  are rendered from it by `scripts/make_brand_mark.mjs` (sharp), replacing the
  ♻ glyph and the Playwright icon script.
- The sketch renderer moved to `src/lib/sketch.ts`, shared by the sign glyphs
  and the brand mark.

## [0.8.11-alpha.1] - 2026-09-17
### Added
- **Sketch icons on graph paper (the approved "direction D").** Every sign
  glyph is re-drawn at build time by Rough.js as a pencil sketch: an ink
  outline that wobbles, the half's logo colour hatched inside closed shapes,
  a fixed per-icon seed so builds are identical. Sign fields are graph paper
  (10px grid, heavier line every fifth, faint ink). Static SVG ships; nothing
  runs in the browser. Design record: `docs/design/sketch-icons.html`,
  regenerated by `scripts/sketch_icons_preview.mjs`.
- **Every board is a page** (Phase A of the sign-as-navigation plan):
  `/signs/curbside`, `/signs/donate`, with previous / next flips and a board
  counter. The homepage boards' titles link to their page. Cell links are
  now real URLs (`/?q=…#recyclopedia`, `/?item=…#donate`) that the homepage
  reads on arrival, so a tap works from any page; on the homepage the same
  tap still switches without a reload.
### Fixed
- **The Astro-upgrade merge (`d39cd7f`) had dropped `barcode-detector`, the
  `prebuild` WASM copy, the service-worker step and the test script from
  `package.json`** — builds since then shipped no `sw.js`. Restored, with the
  Astro 7.3.3 upgrade kept; `npm test` passes 24/24 again.

## [0.8.10-alpha.1] - 2026-09-17
### Changed
- **Signs re-cut to the three logo colours.** Lettuce owns Acceptable, beet
  owns Not Acceptable, grapefruit owns the rail (which now has a solid
  grapefruit heading strip), the frame and more-info bar are ink, and each
  half's glyphs, hover underline and focus ring take that half's colour. The
  recycling mark's three arrows are lettuce, beet and grapefruit. Gone: the
  dark-green frame, the amber rail and the cream field — no shade outside the
  logo trio, paper and ink remains.

## [0.8.9-alpha.1] - 2026-09-17
### Added
- **The donation sign** at the top of the Donate page: "What can you donate?"
  — six "We take these" groups summarising the form's 19 categories, nine
  "Not this way" items from `items.ts` that each link to their own path, and a
  "Before you bring it" rail (wipe data, tape terminals, bag batteries, bundle
  cables). A tap on a "We take these" group pre-fills the form's item box and
  opens its suggestions.
### Changed
- `CurbsideSign` cells can now link three ways (`SignLink`): an item slug →
  Lookup, `donate` → the form's item box, or a plain `href`. `id` prop keeps
  two signs on one page from sharing a title id. 22 new line-art glyphs.

## [0.8.8-alpha.1] - 2026-09-17
### Removed
- **Automatic dark mode** (added in 0.7.8). The owner wants the LBG family to
  stay on its light oat-paper theme everywhere: the `prefers-color-scheme:
  dark` token block is gone from `public/css/lbg-theme.css`, `body.lbg-site`
  declares `color-scheme: light`, and both pages carry a single light
  `theme-color`.

## [0.8.7-alpha.1] - 2026-09-17
### Added
- **The curbside sign on the homepage.** `src/components/CurbsideSign.astro`
  reproduces the board every solid-waste department prints — title row with
  the recycling mark, a green Acceptable half, a red Not Acceptable half, a
  side rail for what needs a special trip, a vertical more-info bar, and the
  brand in the footer — filled from our own item data (`src/data/signs.ts`).
  Every cell is a link into the Lookup pre-filled with the item's real name
  (`recyclopedia:search` event, listened for in `Lookup.svelte`), and a slug
  that leaves `items.ts` fails the build rather than the sign. Icons are
  monochrome line art; the palette is the LBG theme's own and stays paper-and-
  ink in dark mode, as a printed object would. Stacks to one column on phones.

## [0.8.6-alpha.1] - 2026-09-17
### Added
- **The Snap flow and top-3 picker (Card C.2), built and switched off.**
  `src/data/flags.ts` → `VISION_LIVE = false`; while it is false the Snap button
  is the same disabled placeholder as before. With it on: Snap grabs the video
  frame (or a chosen photo where there is no camera), re-encodes to a ≤ 768 px
  JPEG on a canvas (which strips EXIF), posts it once to `/api/vision`, then
  - asserted (≥ 0.6) → Confirm with a confidence meter → Answer, badged
    "Identified by AI — please confirm";
  - not asserted, or "Not quite" → up to three chips (items or categories);
    a category lands on the material's general path and says so;
  - "None of these" → Not sure → search pre-filled with the model's
    plain-word material guess (a slug-shaped guess is never pushed into search);
  - a hazard flag puts the safe-handling banner above every screen, answer included;
  - 429 / 503 / 502 → a plain message that points back to barcode or search.
- Test: `VISION_LIVE` and the server's `VISION_ENABLED` must agree, so the
  button and the endpoint can only be switched on together.
### Fixed
- A camera that answers late (slow permission prompt) could replace whatever
  screen the Lens had moved on to. Only an idle Lens now enters scanning.

## [0.8.5-alpha.1] - 2026-09-17
### Added
- **`/api/vision` — built, tested, and switched off (Card C.1, the part that
  does not depend on the benchmark).** POST `image/jpeg` ≤ 1 MB (magic bytes
  checked, not just the header) → Workers AI → up to three in-vocabulary
  candidates. Replies 503 `vision_disabled` without calling any model until
  `VISION_ENABLED` is `"1"` in `wrangler.jsonc`. `no-store`; the image is
  never stored or logged; best-effort 10/min per IP; 405 / 413 / 415 / 429 / 502.
- `src/lib/vision_core.js` — prompt, `guided_json` schema, and the rules the
  model cannot override: unknown slugs dropped, confidence clamped, duplicates
  removed, top three, identity asserted only at ≥ 0.6, and the hazard safe path
  attached when the model flags a hazard **or** a candidate is an item we
  already know is hazardous. The benchmark now imports the same file, so the
  bench and production cannot drift.
- `wrangler.jsonc`: `ai` binding + `VISION_ENABLED: "0"`.
- Tests (5): three recorded Llama 4 Scout responses (`lens_bench --selftest
  --record`), invented slugs, clamping, the 0.6 floor, junk input, hazards.
### Notes
- The model constant (`llama-4-scout`) is provisional. C.0 still decides the
  model and item-level vs category-only; nothing here pre-empts it.

## [0.8.4-alpha.1] - 2026-09-17
### Added
- **The Academy bridge (Card D.2) — the engine cites, the school teaches.**
  `src/data/lessons.ts` maps materials, resin / EU material codes, and three
  categories to the one Academy lesson that teaches their routing (1.2 resin
  codes, 1.6 wardrobe, 2.2 biopolymers, 2.3 inside the MRF, 2.4 hazardous
  test). Answer cards — search and scanner alike — show a "Learn more" link
  when a lesson fits, and nothing when none does (glass, electronics, rubber,
  bulky goods, foam, cartons have no lesson yet). Links are absolute on
  `lettucebeetgrapefruit.org`, so they survive the Academy's move.
- "Why this path" line on the card, drawn from `Disposition.why`. First four
  authored, each from what the linked lesson actually says: PLA, plastic film,
  textiles, lithium batteries.
- `/data/materials.json` now carries each material's `lesson` URL; README gains
  a "Data" section linking the export (CC BY-NC-SA 4.0).
- Test: every material id in the lesson map exists; lesson URLs are absolute.
### Notes
- Standalone module on purpose: the search bundle grew 2.4 KB instead of
  pulling in the materials table.
- Version stays on the 0.8 line; the plan's `0.10.0` label waits until Tier 3
  (`0.9.0`) has actually shipped.

## [0.8.3-alpha.1] - 2026-09-17
### Added
- **Installable + offline (Card D.1).** `public/manifest.webmanifest`, ♻ icons
  (192 / 512 / maskable / apple-touch, generated by `scripts/make_pwa_icons.mjs`),
  `theme-color` for light and dark, and a service worker written at build time by
  `scripts/build_sw.mjs` (`npm run build` now runs it after `astro build`).
  Precaches the engine shell (home, privacy, their CSS/JS, the Lens chunks);
  navigations are network-first with an offline copy; `/_astro/*` cache-first;
  `/api/*` is never intercepted, so nothing about a scan is cached on the device.
- One-time "Add to Home Screen" hint on the Lens answer screen after the first
  successful scan — the browser's install prompt where there is one, Share →
  Add to Home Screen steps on iOS Safari, nothing elsewhere.
- `/privacy` says what the offline copy and the one-time flag are.
- `public/_headers`: `sw.js` is `no-store`, the manifest `no-cache`. The zone
  rewrites browser TTL to 4 h for `.js` on `recyclopedia.cc` (it ignored
  `no-cache`; it respects `no-store`), which would have pinned a stale worker.
### Fixed
- **The scanner's ✕ could not be tapped.** `main.site-shell` is a stacking
  context (`z-index: 1`), so the Lens overlay sat *under* the sticky header,
  which covered its title bar and close button. The dialog now mounts on
  `<body>`. Live since v0.8.0; "Done" and Esc worked, which is why it was missed.
### Deviation from the master plan
- Hand-rolled service worker instead of `@vite-pwa/astro@1.2.0`: that
  integration's peer range stops at Astro 5 and the repo is on Astro 6.4.7.
  No new dependencies.

## [0.8.2-alpha.1] - 2026-09-17
### Changed
- `recognition.ts`: every `category:<name>` entry in `VOCAB` now says what it
  covers (`CATEGORY_COVERS` — e.g. "Organics — wood, lumber, pallet wood, cork,
  yard waste…"), in both the label and the aliases. Found by the C.0 selftest:
  the vision model refused a pallet-wood photo ("wood (not listed)") because
  nothing told it wood lives under Organics. After the change the same photo
  returns `category:organics` at 0.90. Prompt-only — the schema is unchanged.
### Added
- Test: category cover terms are lowercase, at least four per category, and
  never shadow an item name or alias (so free-text matching stays unambiguous).

## [0.8.1-alpha.1] - 2026-09-15
### Added
- `scripts/lens_bench.mjs` — the Card C.0 recognition benchmark: runs a fixture
  folder through `@cf/meta/llama-4-scout-17b-16e-instruct` and
  `@cf/moondream/moondream3.1-9B-A2B`, scores top-1 / top-3 / category-only
  against `labels.json`, records latency percentiles and estimated cost per
  1,000 scans, and writes `docs/research/<date>-lens-benchmark.md`.
  `--selftest` proves credentials and API shapes without fixtures.
  Refuses to start on a label that is not in `VOCAB`.
- `bench/README.md` with the fixture contract; `bench/fixtures/` gitignored
  (the repo is public — photos never land in it).

### Fixed
- `AGENTS.md` still told agents that pushing to `main` deploys automatically.
  It has not since 2026-07-16; it now says to deploy manually and verify.

## [0.8.0-alpha.1] - 2026-09-15
### Added
- **Tier 2 is live: a camera on the search bar.** A 44px 📷 button in
  `.search-wrap` mounts `src/components/Lens.svelte` through a dynamic
  `import()`, so the homepage bundle never carries the barcode decoder.
  The overlay is a focus-trapped dialog (Esc closes, focus returns to the
  button) with states `idle → scanning → lookingUp → confirm | answer |
  notsure | error`, a live ~5/s detection loop over `<video>` from
  `getUserMedia({ facingMode: 'environment' })`, and a file-input fallback
  (`capture="environment"`) when the camera is refused or absent.
- `functions/api/barcode.js` — validates the GTIN (length + mod-10 check
  digit), then queries Open Food Facts v2 across four flavours (food,
  products, beauty, pet food) and both 12/13-digit spellings of a UPC-A,
  with an 8 s budget. Maps each `packagings[]` component through
  `materials.ts` to an item. Cached 24 h by GTIN in `caches.default`; the
  GTIN is never logged.
- `src/components/ItemCard.svelte` — the one answer card, shared by search
  and Lens (`origin`, `productName`, `sourceLabel` props). Markup and
  classes are byte-identical to the old inline card.
- `barcode-detector@3.2.2` (exact) with the ZXing WASM reader **self-hosted**
  at `/vendor/zxing_reader.wasm` (copied by a `prebuild` script, gitignored)
  — no third-party CDN fetch, which is what lets the privacy line say frames
  never leave the device.
- Privacy notice: a "Camera & scanning" section (`/privacy#camera`), Open
  Food Facts added to the third-party list, effective date updated.
- `openfoodfacts` in `sources.ts` (guidance tier) so the provenance chip
  renders through the existing citation path.
- `film-other` material + a film-shape rule: a film component of a rigid
  resin (a PP wrapper, a PET sleeve) no longer inherits that resin's
  container item, which would have sent film to the curbside bin.

### Changed
- Homepage Tier 2 card → "Live now →"; Phase 2 roadmap card reflects it.
- `.search-input` font-size 0.9rem → 1rem (16px): below 16px iOS Safari
  zooms the viewport on focus and never zooms back.
- `.feature-grid` and the Lens overlay follow the responsive contract
  (44px targets, no sideways scroll at 320px, `env(safe-area-inset-*)`).

## [0.7.11-alpha.1] - 2026-09-15
### Added
- `src/data/materials.ts` — the material-first knowledge layer (Lens master
  plan, Phase A): 40 materials across all 11 categories, 141 Open Food Facts
  packaging-material ids mapped explicitly (children listed, no taxonomy walk),
  `shape_overrides` (OFF shape → item), `default_item`, a category-default
  ranked path per material, and `CATEGORY_DEFAULT_MATERIAL` for bare category
  guesses. Citations only where the cited page covers the material generally.
- `src/data/recognition.ts` — `VOCAB` (84 items + 11 `category:*` entries)
  and `resolveCandidate()` for the vision tier.
- `src/pages/data/materials.json.ts` + `vocab.json.ts` — build-time JSON
  exports (`/data/materials.json`, `/data/vocab.json`, CC BY-NC-SA 4.0); the
  first "database as Academy material" artifact.
- `scripts/test/*.test.mjs` (`node:test`, no new deps): unique OFF tags,
  real item slugs behind every default/override, 11 categories, one
  recommended rung per material, no bare-category path recommended into the
  trash, citations resolve, every item ≥ 2 aliases, material-code shape, glyph
  guard. `npm test` = build + tests; CI runs them after Build;
  `validate_agent_baseline.py` requires `scripts/test/`.

### Changed
- `src/data/items.ts`: aliases on all 84 items (58 added; one duplicate
  removed), `material_codes` on 37 containers (resin + EU codes: `PET-1`,
  `ALU-41`, `PAP-20`, `GL-70`, `C/PAP-81`…).
- `DATA_SCHEMA.md`: `material` table DDL, the OFF mapping rule, "materials
  vs items" question resolved. `DATA_STRATEGY.md` layer 1: materials we
  author + product identity we aggregate (OFF family, ODbL).

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
