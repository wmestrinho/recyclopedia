# Recyclopedia — Master Plan: camera on the search bar

**Plan date:** 2026-09-15 · **Repo at:** `0.7.9-alpha.1` (main, clean, in sync with origin) · **Live site:** `v0.7.5 alpha`
**Scope (Luiz, 2026-09-15):** engine only. Pit Board items D/E/F/H stay parked; nothing here touches the Academy, Donate, or the Florida facility data.

## Context

Recyclopedia's whole thesis (VISION.md) is *point a camera at a thing → the encyclopedia opens to the right page → a ranked Gratitude-Hierarchy path*. Today only Tier 1 (typed search over 84 items) exists. Tier 2 (barcode) and Tier 3 (AI vision) are marketing cards that say "in development" / "planned". The canon (VISION → DATA_STRATEGY → DATA_SCHEMA → TECH_STACK → AP_GUIDELINES) is unusually complete; what is missing is the build.

Review findings that shape the plan:

1. **Production is frozen at v0.7.5.** Cloudflare Pages' last deployment is commit `d338934` (~2 months ago). The five commits since (`e83654d` v0.7.7, `988e56b` v0.7.8, `968bfe5`, `f32789b`, `bc1f203` v0.7.9) never deployed. Nothing failed — no build was even attempted, so the GitHub→Pages integration itself is broken (same class of silent failure as June's missing build command). SEO baseline, social footer, dark mode and the FRS work are all invisible to visitors.
2. **The site under-reports itself.** `items.ts` has **84** items, 43 dispositions carry verified citations; the homepage hard-codes "60+" in five places. About says the stack is "HTML · CSS · JS". README's phase order (Phase 3 = barcode) contradicts VISION's (Phase 4 = Lens).
3. **The engine is architecturally ready for a camera.** `Lookup.svelte` already resolves best path / other paths / citations from `dispositions[]`; `mockups/scan-result-card.html` already designs the three card states (confirm / answer / not sure); `functions/_middleware.js` proves Pages Functions run in this project; `wrangler.jsonc` exists for bindings.
4. **The recognition engine is still marked PROVISIONAL** with a "research dive" that never happened (no research doc in Drive, no bench). Cloudflare Workers AI now hosts `@cf/meta/llama-4-scout-17b-16e-instruct` (vision, `guided_json`, $0.27/M in · $0.85/M out) and `@cf/moondream/moondream3.1-9B-A2B` (`detect`/`query` tasks, $0.30/M in). Both are callable from a Pages Function via `env.AI`. A scan costs a fraction of a cent.
5. **Barcode → material is solved by open data.** Verified live during planning: Open Food Facts v2 `GET /api/v2/product/{gtin}.json?fields=packagings,packaging_materials_tags,…` returns per-component `material` (`en:aluminium`, `en:pet-1-…`), `shape` and `recycling` tags. ODbL, free, CORS. Non-food coverage (Open Products Facts) is thin — a Coca-Cola can resolved, a random household GTIN did not. iOS has no native `BarcodeDetector`; the `barcode-detector` npm ponyfill (ZXing WASM, ~260 KB unpacked) covers it.
6. **The 500-item hand-written database is the wrong unit.** Luiz's direction (2026-09-15): pull product/material facts from APIs; the database we own is the shared foundation the Academy teaches from. So the pivot becomes **materials** (a bounded ~40-entry table we author once) + **items** (84 today, grown opportunistically) + **API-sourced product identity**. Nobody sells "grateful ranked dispositions" — that thin editorial layer stays ours (DATA_STRATEGY layer 1); everything heavy is aggregated.

### Statement to preserve (Luiz, verbatim, 2026-09-15 — save to memory + hand to ap-website)

> "We should be pulling this from the internet somewhere, we need APIs. Building a database is for us to use it as material for the academy as both entities grow along reinforcing and supporting each other, in a symbiotic and mutual manner of reciprocity."

Implementation step 0.4 below persists it (memory file + a note for the ap-website repo). It is also the one-line rationale for the material-first data model.

---

## Release train

| Version | Ships | Gate |
|---|---|---|
| **0.7.10** | Production un-frozen; site tells the truth about itself | live shows `VERSION` |
| **0.8.0** | 📷 button on the search bar → live barcode scan → product + packaging → result card (Tier 2 LIVE) | works on an iPhone via `*.pages.dev` |
| **0.9.0** | Snap-a-photo → Workers AI vision → confirm / top-3 / search fallback (Tier 3 LIVE); recognition benchmark closes the "provisional" question | bench ≥ target on fixture set |
| **0.10.0** | Installable PWA + offline shell; materials knowledge surfaced on cards | Lighthouse PWA pass |
| **1.0.0** | Local resolution (Where Ladder on real facilities) | **parked** — Pit Board D + act4 outreach |

Every release: bump `VERSION` + `package.json` + `CHANGELOG.md`, `python3 scripts/validate_agent_baseline.py`, `npm run build`, commit to `main`, push (= deploy), verify live footer version, update `HANDOFF.md`.

---

## Phase 0 — Un-freeze production and tell the truth (→ 0.7.10)

**0.1 Manual deploy now.** `npm run build && npx wrangler pages deploy dist --project-name recyclopedia --branch main`. Verify `curl -sS https://recyclopedia.cc | grep footer-version` shows `v0.7.9`. (Standing instruction: verified work ships to main without asking.)

**0.2 Repair auto-deploy.** Dashboard → Workers & Pages → `recyclopedia` → Settings → Builds & deployments: confirm the GitHub connection is still attached to `wmestrinho/recyclopedia`, production branch `main`, build `npm run build`, output `dist`, Node from `.nvmrc`. If the git provider shows disconnected, reconnect (owner-only if the GitHub app authorisation is gone). Prove it by watching `npx wrangler pages deployment list --project-name recyclopedia` after the next push. Record the root cause in `CLAUDE.md`'s deployment history note.

**0.3 Truthfulness pass** (`src/pages/index.astro`, `README.md`, `VISION.md` status):
- Replace every hard-coded "60+" with `ITEMS.length` rendered at build time (import `ITEMS` in the frontmatter; the metric card, lede, tier card, Phase 1 card).
- Tier cards: keep statuses honest per release (Tier 2 "in development" until 0.8.0 ships, then "Live now →").
- About stack tags → `Astro · Svelte · TypeScript`, `Cloudflare Pages`, `$0/month hosting`, `Open data`.
- Roadmap: one phase order everywhere (README, VISION status, index.astro) matching the release train above.
- Header/footer standard nits already logged for this repo: header attribution "Absolutely Plausible Solutions" → link text "Absolutely Plausible"; footer "initiative" → "production" (footer-standard §2, AP-owned public brand).

**0.4 Persist Luiz's statement.** Memory file `luiz-api-first-symbiosis-statement.md` (type: project) + `MEMORY.md` index line; add the same block to `VISION.md` under "The core idea" as the sourcing principle; leave a note in `HANDOFF.md` that ap-website should receive it as a public statement.

**0.5 CI sanity (no policy change; H stays parked).** Actions is enabled at repo level now (`enabled: true`, both workflows `active`) but has zero runs ever. After the next push, check `gh run list`; if `ci.yml` still does not fire, note it on the board item H — do not change triggers.

---

## Phase A — Material-first knowledge layer (data foundation for both camera tiers)

New file **`src/data/materials.ts`** (typed, ~40 entries; mirrors DATA_SCHEMA's "materials vs items" open question and resolves it):

```ts
export interface Material {
  id: string;                 // 'aluminium' | 'pet-1' | 'hdpe-2' | 'ldpe-4' | 'pp-5' | 'ps-6' | 'pla-7' | 'glass' | 'paper' | 'cardboard' | 'steel' | 'carton-brick' | 'textile' | ...
  name: string;
  category: Category;         // one of the 11 — no 'Other'
  off_tags: string[];         // Open Food Facts taxonomy ids: 'en:aluminium', 'en:pet-1-polyethylene-terephthalate', ...
  resin_code?: number;        // 1–7 where applicable
  default_item?: string;      // item slug that best represents "a container made of this" (e.g. 'aluminum-can')
  shape_overrides?: Record<string, string>; // OFF shape tag → item slug ('en:drink-can' → 'aluminum-can', 'en:bottle' → 'plastic-bottle-pet')
  dispositions: Disposition[]; // category-default ranked path when no item matches (Confidence Ladder rung 3)
  source?: string;            // citation id, only if verified for this guidance
}
```

- Populate from the existing 84 items' knowledge (every plastic resin item already exists: PET-1, HDPE-2, PVC-3, LDPE-4, PP-5, PS-6, PLA-7) — this is extraction, not new research. `Item.material_codes[]` gets filled on the 84 items (only 6 have it today).
- **`src/data/recognition.ts`** — the vision vocabulary: `{ slug, label, aliases[] }` for every item plus `category:<cat>` pseudo-slugs; one exported `VOCAB` array and a `resolveCandidate(slug)` that returns an `Item` or a `Material`/category default. Both Pages Functions and `Lens.svelte` import it (keep it small — the bundle-split lesson from `sources.ts` applies: never pull `organizations.ts` into a client chunk).
- Add `aliases[]` to the ~58 items that lack them (short synonym lists; needed for search *and* for the vision prompt).
- Tests: `scripts/test/materials.test.mjs` with `node --test` (no new dev dependency): every `off_tags` id unique, every `default_item`/`shape_override` slug exists in `ITEMS`, every category in `CATEGORIES`. Wire into `validate_agent_baseline.py` and `ci.yml`.
- Docs: DATA_SCHEMA.md gets a `material` table (DDL) and the OFF tag mapping rule; DATA_STRATEGY.md layer 1 becomes "materials we author + product identity we aggregate (OFF family, ODbL — attribution + share-alike apply to the *data*, not our code)".

---

## Phase B — Tier 2: barcode on the search bar (→ 0.8.0)

**UI — `src/components/Lookup.svelte`.** Add a 📷 button inside `.search-wrap` on the right (44px target, `aria-label="Scan a barcode or photo"`, hidden only when neither `mediaDevices` nor file capture exists). Clicking mounts **`src/components/Lens.svelte`** (a new island loaded lazily via dynamic `import()` so the homepage bundle does not carry the WASM). CSS in `public/css/style.css` (`.search-wrap__camera`) + engine overrides in `lbg-theme.css` using existing tokens (`--surface`, `--line`, `--accent`, dark-mode variants already defined).

**`Lens.svelte` — full-screen overlay (mobile-first, responsive-standard §1):**
1. **Capture surface:** `<video autoplay playsinline muted>` from `getUserMedia({ video: { facingMode: 'environment' } })`. Fallback when denied/unavailable: `<input type="file" accept="image/*" capture="environment">` (also how desktop QA works). Close button, "How this works" link, and the privacy line *"Frames stay on your phone; a photo is only sent when you tap Snap."*
2. **Live barcode loop:** `barcode-detector` ponyfill (`import { BarcodeDetector } from 'barcode-detector/ponyfill'`, formats `ean_13, ean_8, upc_a, upc_e, qr_code`), ~5 detections/second via `requestAnimationFrame` + throttle, native API preferred when present. On a hit: vibrate (if supported), freeze frame, call `/api/barcode?gtin=…`.
3. **Snap button** (Tier 3, Phase C) — present in 0.8.0 but routes to a "coming next" toast until C ships, so the layout is final from day one.
4. **Result states** rendered from `mockups/scan-result-card.html`: **Confirm** (name, category, source chip "src: Open Food Facts ↗", "Yes, that's it / Not quite"), **Answer** (reuse the existing `.recycle-card` markup — extract the card body of `Lookup.svelte` into **`ItemCard.svelte`** so search and Lens render one component), **Not sure** (search box pre-filled with the product name → closes overlay and sets `query`).
5. Multi-component packaging (OFF returns e.g. PET bottle + HDPE cap + paper label) renders as **component cards** — this is data-itemised, not vision-guessed, so it does not violate the Mode-1 MVP rule. Note it in DATA_SCHEMA "Scan modes".

**Server — `functions/api/barcode.js`** (Pages Function; no Astro adapter needed):
- Validate GTIN (8/12/13/14 digits, checksum). Query OFF v2 with `fields=product_name,brands,product_type,packagings,packaging_materials_tags,packaging_shapes_tags,packaging_recycling_tags,image_front_small_url` and a real `User-Agent: Recyclopedia/<VERSION> (contact@absolutelyplausible.com)` (OFF requires it; read limit ~100 req/min — confirm on the OFF API docs at implementation).
- Try `world.openfoodfacts.org`, then `world.openproductsfacts.org`, then `world.openbeautyfacts.org` (verify at implementation whether OFF v2/v3 already federates by `product_type`; if it does, one call).
- Map `packagings[].material` → `materials.ts` (`off_tags`) → item via `shape_overrides` / `default_item`; return `{ gtin, product: {name, brand, image}, components: [{material, shape, item_slug}], source: 'openfoodfacts', found: bool }`.
- Cache in `caches.default` (24 h) keyed by GTIN; 8 s upstream timeout; never log the GTIN beyond the request.
- `found: false` → client shows Not-sure with "Search by name" and a *"Help Open Food Facts add this product ↗"* link (reciprocity: we consume ODbL data, we send contributors back).
- Add `openfoodfacts` to `sources.ts` (guidance tier, `short_label: 'Open Food Facts'`) so the chip renders through the existing `citation()` path.

**Privacy notice `/privacy`:** new section "Camera & scanning" — barcode decoding happens on-device; the GTIN is sent to our Cloudflare function and forwarded to Open Food Facts; no images leave the device in this tier; nothing is stored.

**Verification (Phase B):**
- `npm run build` then `npx wrangler pages dev dist` (no AI needed yet) → `http://localhost:8788`; desktop Chrome with webcam or the file-upload path using a printed EAN (e.g. 5449000000996).
- Push → `*.pages.dev` preview → iPhone Safari (plain tab, not installed): camera prompt, EAN read, card renders, dark mode holds.
- `node --test scripts/test/` green; `validate_agent_baseline.py` green; responsive probe at 390/320 (workspace `check_responsive.py` from ap-ops, plus Lighthouse mobile) — the overlay must not scroll sideways, all controls ≥ 44 px, inputs ≥ 16 px.

---

## Phase C — Tier 3: AI vision + the benchmark that ends "provisional" (→ 0.9.0)

**C.0 Benchmark first (settles VISION's open question with numbers).**
- `scripts/lens_bench.mjs`: runs a fixture folder of real photos (owner supplies ~40 phone shots across the 11 categories; kept in Drive `RandDRecyclopedia/lens-fixtures` and a gitignored local folder — never in the public repo) through both candidate models via the Workers AI REST API, records top-1/top-3 accuracy against a `labels.json`, latency, and cost. Output a markdown table into `docs/research/2026-xx-lens-benchmark.md` (the research index gets a row).
- Candidates: `@cf/meta/llama-4-scout-17b-16e-instruct` (primary hypothesis: open-vocab + `guided_json`) vs `@cf/moondream/moondream3.1-9B-A2B` (`query` with structured output; `detect` as a possible Mode-3 lead). Optional third column: Claude via AI Gateway as an accuracy ceiling, if Luiz wants the comparison (costs more; not the default).
- Pass bar: top-3 ≥ 85 % item-or-category, top-1 ≥ 65 %, p95 < 4 s. Below that, ship Tier 3 as "category-only" (answers land on the material/category default path — still honest, still useful).

**C.1 `functions/api/vision.js`** (Pages Function, `env.AI`):
- `wrangler.jsonc` → `"ai": { "binding": "AI" }` (one AI binding per Pages project; dashboard shows it after redeploy).
- POST `image/jpeg` ≤ 1 MB (client downscales to ~768 px, quality 0.8, EXIF stripped by the canvas re-encode). Reject other types/sizes.
- Prompt: system = AP Guidelines in three lines (identify the single object, never guess, prefer a category when unsure) + the `VOCAB` list; `guided_json` schema `{ candidates: [{ slug, confidence }], material_guess, hazard_flag, notes }` with `slug ∈ VOCAB`. Server re-validates every slug against `VOCAB` and clamps confidence.
- Confidence Ladder enforced server-side: `confidence_floor = 0.6` (AP_GUIDELINES); `hazard_flag` true → always attach the safe-handling path regardless (safety override).
- No image persistence, no AI Gateway logging on this route; response headers `Cache-Control: no-store`.
- Abuse guard: a Cloudflare rate-limiting rule on `/api/vision` (dashboard, owner) + function-level 10 req/min per IP via `caches.default` counters as belt-and-braces.

**C.2 Lens flow (after B):** Snap → `/api/vision` → top candidate ≥ 0.6 → **Confirm** state (item, confidence meter from the mockup) → Answer. Below 0.6 or "Not quite" → **Top-3 picker** (Luiz's choice): up to three candidate chips (items or categories); tap → Answer; "None of these" → search box pre-filled with `material_guess`. Category candidates resolve to `materials.ts` default dispositions with a "check local" badge. Every Tier 3 answer shows *"Identified by AI — please confirm"* and the Snap-again link.

**C.3 Copy + privacy:** `/privacy` gains "Photos you snap are sent once to our Cloudflare function for identification and discarded; they are never stored or used for training." Tier 3 homepage card → "Live now (beta)".

**Verification (Phase C):** bench table committed; `npx wrangler pages dev dist --ai AI` (real usage charges even locally, per CF docs — keep runs small); iPhone test on `*.pages.dev`; a deliberately blurry photo must land on the top-3/not-sure path, a battery photo must show the hazard path; `guided_json` output validated by a `node --test` using recorded fixtures.

---

## Phase D — Installable, offline, and the Academy bridge (→ 0.10.0)

- `@vite-pwa/astro` (v1.2): manifest (name, ♻ icons from the LBG mark set), service worker precaching the shell + `items`/`materials` chunks; `/api/*` network-only. Camera must keep working in a plain Safari tab (TECH_STACK pressure-test #1) — the PWA is additive.
- "Add to Home Screen" hint shown once after a successful scan (localStorage, try/catch).
- Answer card gains a *"Why this path"* line drawn from `Disposition.why` where present and a link to the relevant Academy lesson slug (`lesson?: string` on `Material`) — the reciprocity loop: the engine cites, the school teaches. Links point at `lettucebeetgrapefruit.org` paths so this survives Pit Board F either way.
- Materials table exported as JSON at build time (`/data/materials.json`, CC BY-NC-SA) — the first "database as Academy material" artifact.

---

## Phase E — Local resolution (→ 1.0.0) — PARKED

Gated on Pit Board **D** (ship FRS facility data?) and **act4** (Earth911 / Recycling Partnership outreach). Until then the Where Ladder stops at `facility_type` + "check local", exactly as today. When unparked: `functions/api/near.js` over a D1/KV copy of the classified FRS records (`public_access: likely` only), client geolocation opt-in, Leaflet map — all already sketched in TECH_STACK/DATA_SCHEMA.

---

## Files (critical path)

| Action | Path |
|---|---|
| modify | `src/components/Lookup.svelte` — camera button, lazy Lens mount, card extracted |
| new | `src/components/ItemCard.svelte` — shared card (search + Lens) |
| new | `src/components/Lens.svelte` — overlay, camera, barcode loop, states |
| new | `src/data/materials.ts`, `src/data/recognition.ts` |
| modify | `src/data/items.ts` — `material_codes`, `aliases` fill; `src/data/sources.ts` — `openfoodfacts` |
| new | `functions/api/barcode.js`, `functions/api/vision.js` |
| modify | `wrangler.jsonc` — `ai` binding |
| new | `scripts/lens_bench.mjs`, `scripts/test/*.test.mjs` |
| modify | `scripts/validate_agent_baseline.py`, `.github/workflows/ci.yml` — run tests |
| modify | `public/css/style.css`, `public/css/lbg-theme.css` — camera button + overlay tokens |
| modify | `src/pages/index.astro`, `src/pages/privacy.astro`, `README.md`, `VISION.md`, `DATA_SCHEMA.md`, `DATA_STRATEGY.md`, `TECH_STACK.md`, `HANDOFF.md`, `CHANGELOG.md`, `VERSION`, `package.json` |
| deps | `barcode-detector` (3.x), later `@vite-pwa/astro` (1.2) — pinned exact versions like the rest of `package.json` |

## Reuse, not rebuild

- Best-path / others / citation logic: `Lookup.svelte:32-42` (`byRank`, `bestDisposition`, `rungText`, `citation`) → move into `ItemCard.svelte`.
- Card design + states: `mockups/scan-result-card.html`.
- Status/rung badges: `RUNG_BADGE`, `RUNG_ORDER`, `STATUS_CONFIG`.
- Provenance chips: `Source.short_label` path in `sources.ts`.
- Pages Function pattern: `functions/_middleware.js`.
- Design tokens + dark mode: `public/css/lbg-theme.css` (`body.lbg-site` tokens).

## Owner-only touchpoints (flagged, not blocking)

- Reconnect the Pages git integration if the dashboard shows it disconnected (Phase 0.2).
- Agree to Meta's licence for Llama models on first Workers AI call (one `curl` with `prompt: "agree"`, per CF docs).
- Add the `/api/vision` rate-limiting rule in the dashboard.
- Supply ~40 fixture photos for the benchmark (Drive folder).
- Answer D / act4 when local resolution should unpark.

---

# EXECUTION HANDOFF — for Opus 5 / Codex (Sol 5) / any cold session

You are executing the plan above. Fable 5.1 did the review and research on 2026-09-15; you do the build. Work **one task card at a time, in order**. Do not re-plan, do not widen scope, do not touch anything under "Do not touch".

## First five minutes (every session, every machine)

```sh
cd ~/Workspace/Projects/recyclopedia          # ThinkPad: the Codex checkout of wmestrinho/recyclopedia
git fetch && git status -sb                   # must read "## main...origin/main" with nothing behind
cat VERSION                                   # the only place the version lives; never restate it in prose
cd ../ap-ops && node scripts/pitboard.mjs read && cd -   # D, E, F, H are PARKED — read, do not act on them
```

Read, in this order, before the first edit: `CLAUDE.md`, `AGENTS.md`, `HANDOFF.md` (top entry), `VISION.md` "The framework", `AP_GUIDELINES.md`, `DATA_SCHEMA.md`, then this file. Then `src/components/Lookup.svelte`, `src/data/items.ts` (first 100 lines), `functions/_middleware.js`, `mockups/scan-result-card.html`.

## Non-negotiables

1. **Never guess someone into a landfill** (AP_GUIDELINES). Below confidence 0.6 the UI never asserts an identity. Hazard items always show the safe path.
2. **No fabricated provenance.** A `source` id goes on a disposition only if that page was verified to support that exact instruction. Open Food Facts is the source for *product/packaging facts*, never for disposal advice.
3. **Photos and barcodes are never stored or logged.** `Cache-Control: no-store` on `/api/vision`; only the GTIN is cached (24 h) on `/api/barcode`.
4. **Ship to `main`, push = deploy.** Verified work is committed and pushed without asking (standing instruction). Commit only the files of the change; the repo root carries untracked audio/zip files — leave them.
5. **Every release:** bump `VERSION` + `package.json` (+ `package-lock.json`) together, add a `CHANGELOG.md` entry, run `python3 scripts/validate_agent_baseline.py` and `npm run build`, then `git status --short --branch`, then update `HANDOFF.md` with a dated entry at the top.
6. **Design tokens only.** No hex colours in new CSS; use the `body.lbg-site` tokens in `public/css/lbg-theme.css`. Dark mode must hold.
7. **Mobile contract** (workspace responsive standard): viewport meta present, breakpoints only `600 / 900 / 1200`, touch targets ≥ 44 px, inputs ≥ 16 px, no `body{overflow-x:hidden}`, nothing wider than the screen.
8. **Pin dependency versions exactly** (no `^`), like the existing `package.json`.
9. **Do not add** an Astro adapter, a database, analytics, or a form service. Pages Functions in `functions/` are the only server code.

## Do not touch

`src/pages/academy/**`, `src/pages/lbg/**`, `src/pages/diy/**`, `src/data/organizations.ts`, `src/data/quizzes.ts`, the Donate section of `index.astro`, `scripts/frs_ingest.py`, `docs/research/*.json`, Pit Board items D/E/F/H, the two brand dates (1993 / 2008 — intentional, see comments in `index.astro`).

## Task cards

Each card: **Do → Done when**. Finish a card fully (including its verification) before starting the next. If a card is blocked, write the blocker into `HANDOFF.md` and continue with the next card that does not depend on it.

### Card 0.1 — Deploy what is already on main
**Do:** `npm ci && npm run build && npx wrangler pages deploy dist --project-name recyclopedia --branch main` (needs `npx wrangler login` once).
**Done when:** `curl -sS https://recyclopedia.cc | grep -o 'footer-version">[^<]*'` prints the value in `VERSION` (currently `v0.7.9-alpha.1`). Add a one-line HANDOFF entry.

### Card 0.2 — Repair auto-deploy
**Do:** In the Cloudflare dashboard (Workers & Pages → recyclopedia → Settings → Builds & deployments) check: git connection attached to `wmestrinho/recyclopedia`, production branch `main`, build command `npm run build`, output `dist`. Reconnect if it shows disconnected (this may need Luiz's GitHub authorisation — if so, write it in HANDOFF as an owner ask and move on).
**Done when:** the next push to `main` appears in `npx wrangler pages deployment list --project-name recyclopedia` with today's date. Record the root cause under the deployment history note in `CLAUDE.md`.

### Card 0.3 — Site tells the truth (→ VERSION 0.7.10-alpha.1)
**Do:** in `src/pages/index.astro` frontmatter `import { ITEMS } from '../data/items';` and render `{ITEMS.length}+`… no: render the exact count `{ITEMS.length}` where "60+" appears (metric card, two ledes, Tier 1 card, Phase 1 roadmap card). About stack tags → `Astro · Svelte · TypeScript` / `Cloudflare Pages` / `$0/month hosting` / `Open data`. Header sub-line and footer: link text "Absolutely Plausible" (drop "Solutions" inside the link only), footer "initiative" → "production". `README.md` roadmap: Phase 2 = camera (barcode then vision), Phase 3 = PWA + materials, Phase 4 = local resolution (parked); `VISION.md` "Status" section matches.
**Done when:** `grep -rn "60+" src/ README.md` returns nothing; build green; live footer shows `v0.7.10-alpha.1`.

### Card 0.4 — Persist Luiz's statement
**Do:** Add the quoted statement (section "Statement to preserve" above, verbatim, dated 2026-09-15) to `VISION.md` directly under "The core idea" as **"Sourcing principle"**. Add a HANDOFF line: *"ap-website: publish Luiz's 2026-09-15 API-first / symbiosis statement (text in VISION.md)."* Claude Code sessions also save it as a memory file `luiz-api-first-symbiosis-statement.md` (type: project) + index line in `MEMORY.md`.
**Done when:** the text is in VISION.md and HANDOFF.md; committed with Card 0.3.

### Card 0.5 — CI observation only
**Do:** after the Card 0.3 push, run `gh run list --limit 3`.
**Done when:** the result (runs or none) is one line in HANDOFF.md. Do **not** change workflow triggers (Pit Board H is parked).

### Card A.1 — `src/data/materials.ts`
**Do:** create the `Material` interface exactly as in Phase A. Populate ~40 entries by extracting from the existing items (all seven resin codes exist as items already: `plastic-bottle-pet`, `plastic-jug-hdpe`, `pvc-vinyl-3`, `produce-bread-bag-ldpe`, `yogurt-container-pp`, `styrofoam-foam-ps`, `compostable-plastic-pla` — confirm slugs by grepping `"slug":` in `items.ts`). Include at minimum: aluminium, steel, PET-1, HDPE-2, PVC-3, LDPE-4, PP-5, PS-6, PLA-7 / other-7, glass (clear/coloured), paper, cardboard, carton-brick (Tetra), plastic film, textile, wood, rubber, ceramic, mixed/unknown (→ category default with `local_variance: true`). `off_tags` use the Open Food Facts packaging-materials taxonomy ids (probe a few real barcodes with `curl 'https://world.openfoodfacts.org/api/v2/product/<gtin>.json?fields=packagings' -A 'Recyclopedia/dev (contact@absolutelyplausible.com)'` to see the exact strings; known: `en:aluminium`, `en:pet-1-polyethylene-terephthalate`, `en:hdpe-2-high-density-polyethylene`, `en:pp-5-polypropylene`, `en:glass`, `en:paper`, `en:cardboard`, `en:plastic`). Each material's `dispositions[]` is the category-default ranked path (copy the pattern of the matching item), cited only where the item's citation applies to the material generally.
**Done when:** `node --test scripts/test/` passes the checks in Card A.3; `npm run build` green.

### Card A.2 — `src/data/recognition.ts` + item enrichment
**Do:** export `VOCAB: { slug: string; label: string; aliases: string[] }[]` = every item (`slug`, `name`, `aliases ?? []`) plus one entry per category with slug `category:<lowercase>` (11 entries). Export `resolveCandidate(slug)` → `{ kind: 'item', item } | { kind: 'category', material }`. Fill `aliases[]` on every item lacking one (2–6 everyday synonyms, e.g. Smartphone: `cell phone, mobile, iphone, android`) and `material_codes[]` on containers (`['PET-1']` etc.).
**Done when:** every item has `aliases.length ≥ 2`; `VOCAB.length === ITEMS.length + 11`; build green; the Lookup search still works for the old names.

### Card A.3 — Tests wired
**Do:** `scripts/test/materials.test.mjs` and `scripts/test/recognition.test.mjs` using `node:test` + `node:assert` (import the `.ts` data via a tiny build step: simplest is `npx astro build` then import from a small `scripts/test/_load.mjs` that uses `tsx`? — **no new deps**: instead export the data also as JSON at build time via an Astro endpoint `src/pages/data/materials.json.ts` and `src/pages/data/vocab.json.ts`, and let the tests read `dist/data/*.json` after `npm run build`). Checks: unique `off_tags`; every `default_item` / `shape_overrides` value is a real item slug; every category is in `CATEGORIES`; every item has ≥ 2 aliases; no `'? '` glyph corruption. Add `"test": "npm run build && node --test scripts/test/"` to `package.json`; call it from `.github/workflows/ci.yml` after Build; `validate_agent_baseline.py` gains a check that `scripts/test/` exists.
**Done when:** `npm test` green locally; CHANGELOG entry; VERSION → `0.7.11-alpha.1`; pushed; live.

### Card B.1 — `ItemCard.svelte` extraction
**Do:** move the `<article class="recycle-card">…</article>` body and the helpers `byRank`, `bestDisposition`, `rungText`, `citation`, `STATUS_CONFIG` from `Lookup.svelte` into `src/components/ItemCard.svelte` (props: `item: Item`, optional `origin: 'search' | 'barcode' | 'vision'`, optional `productName`, `sourceLabel`). `Lookup.svelte` renders `<ItemCard {item} />` in its `{#each}`.
**Done when:** the homepage renders identically (compare `dist/index.html` card markup before/after; classes unchanged); build green.

### Card B.2 — Camera button on the search bar
**Do:** in `Lookup.svelte` add inside `.search-wrap` after the input: `<button class="search-wrap__camera" type="button" aria-label="Scan a barcode or photo" onclick={openLens}>📷</button>`; `openLens` does `const { default: Lens } = await import('./Lens.svelte')` and mounts it (Svelte 5: keep a `lensOpen` state and render `{#if lensOpen}<Lens onclose={…} onresult={…} />{/if}` — the dynamic import gates the chunk). Hide the button if `!navigator.mediaDevices && !('capture' in document.createElement('input'))`. CSS: right-aligned inside the wrap, 44×44, `--surface` bg, `--line` border, focus ring in `--accent`; `.search-input` right padding grows to 3.25rem. Tokens only; check dark mode.
**Done when:** button visible on `/#recyclopedia`, keyboard reachable, no layout shift at 320/390/1200 px; Lens chunk not in the initial homepage JS.

### Card B.3 — `Lens.svelte` (barcode tier)
**Do:** full-screen fixed overlay (`role="dialog" aria-modal="true"`, Esc/close returns focus to the camera button). States: `idle → scanning → lookingUp → confirm | answer | notsure | error`. `getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false })` into `<video playsinline muted autoplay>`; on failure show the file input path (`<input type="file" accept="image/*" capture="environment">`). Install `barcode-detector@3.2.2` (exact); `import { BarcodeDetector } from 'barcode-detector/ponyfill'`; `new BarcodeDetector({ formats: ['ean_13','ean_8','upc_a','upc_e','qr_code'] })`; detect from the video element every ~200 ms via `requestAnimationFrame` + timestamp throttle; stop tracks on close. On the first stable read (same value twice): `navigator.vibrate?.(40)`, pause, `fetch('/api/barcode?gtin=' + code)`. Render confirm/answer/notsure per the mockup, using `ItemCard` for answers. Snap button present but disabled with title "Photo identification arrives in the next release". Privacy line under the viewfinder. "Search by name instead" closes the overlay and sets the Lookup `query` (pass through `onresult`).
**Done when:** on desktop Chrome with a webcam (or the file path) a printed EAN `5449000000996` reaches the Answer state showing "Aluminum can" with an Open Food Facts chip; iPhone Safari via the `*.pages.dev` URL does the same from a real can; overlay never scrolls sideways at 320 px.

### Card B.4 — `functions/api/barcode.js`
**Do:** `export async function onRequestGet({ request })`. Validate `gtin` (`/^\d{8}$|^\d{12,14}$/` + mod-10 check digit); 400 otherwise. Cache lookup `caches.default` by URL. Upstream: `https://world.openfoodfacts.org/api/v2/product/${gtin}.json?fields=product_name,brands,product_type,packagings,packaging_materials_tags,packaging_shapes_tags,packaging_recycling_tags,image_front_small_url` with `User-Agent: Recyclopedia/${version} (https://recyclopedia.cc; contact@absolutelyplausible.com)` and an 8 s `AbortController` timeout; if `status !== 1`, try `world.openproductsfacts.org` then `world.openbeautyfacts.org` (first check the OFF docs at https://openfoodfacts.github.io/openfoodfacts-server/api/ — if v2 already returns any `product_type`, use one call). Map each `packagings[]` entry: `material` → `materials.ts` by `off_tags`; item = `shape_overrides[shape] ?? default_item`. Response `{ found, gtin, product: { name, brand, image }, components: [{ material_id, shape, item_slug }], source: 'openfoodfacts' }`; `Cache-Control: public, max-age=86400`; never log the GTIN. Materials data reaches the function by importing the JSON emitted in Card A.3 at build time (copy `dist/data/materials.json` is not available to Functions — instead `import materials from '../../src/data/materials.json'`? Functions are bundled by Wrangler and can import JSON from the repo; simplest robust path: keep a generated `functions/_data/materials.json` written by a `prebuild` npm script from `src/data/materials.ts` via `npx astro build`'s endpoint output copied over. Choose the simplest that works with `npx wrangler pages dev dist` and document it in HANDOFF).
**Done when:** `curl 'http://localhost:8788/api/barcode?gtin=5449000000996'` → `found: true`, one component `aluminium`/`en:drink-can`/`aluminum-can`; an invalid GTIN → 400; an unknown GTIN → `found: false` within 9 s. Add `openfoodfacts` to `src/data/sources.ts` (guidance tier, `short_label: 'Open Food Facts'`, url `https://world.openfoodfacts.org`).

### Card B.5 — Privacy + copy + release 0.8.0
**Do:** `/privacy` "Camera & scanning" section (barcode decoded on-device; GTIN sent to our Cloudflare function → Open Food Facts; no images leave the device in this tier; nothing stored; effective date updated). Homepage Tier 2 card → "Live now →" linking `#recyclopedia`; roadmap Phase 2 text updated. CHANGELOG; VERSION → `0.8.0-alpha.1`; HANDOFF entry with the iPhone test result.
**Done when:** live site shows `v0.8.0-alpha.1`, the camera button, and a working scan on a phone. Run a mobile Lighthouse and note the scores in HANDOFF.

### Card C.0 — Benchmark
**Do:** ask Luiz (HANDOFF owner-ask) for ~40 phone photos across the 11 categories into Drive `RandDRecyclopedia/lens-fixtures/` with a `labels.json` (`{ "IMG_0001.jpg": "smartphone", … }` using item slugs or `category:<cat>`). Local folder `bench/fixtures/` gitignored. `scripts/lens_bench.mjs`: for each image call the Workers AI REST API (`https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/ai/run/<model>` with `CLOUDFLARE_API_TOKEN` from env) for `@cf/meta/llama-4-scout-17b-16e-instruct` (messages with the image + the Card C.1 prompt + `guided_json`) and `@cf/moondream/moondream3.1-9B-A2B` (`task: 'query'`, same question); record top-1 / top-3 hit, latency, tokens. First call to a Llama model needs the one-time licence agreement (`{"prompt":"agree"}`) — do it, note it in HANDOFF. Write `docs/research/<date>-lens-benchmark.md` with the table and a one-paragraph decision; add a row to `docs/research/README.md`.
**Done when:** the table exists; the chosen model and whether Tier 3 ships as item-level or category-only is written down. Pass bar: top-3 ≥ 85 %, top-1 ≥ 65 %, p95 < 4 s.

### Card C.1 — `functions/api/vision.js`
**Do:** `wrangler.jsonc` add `"ai": { "binding": "AI" }`. `onRequestPost`: require `Content-Type: image/jpeg`, body ≤ 1 MB, else 415/413. Build `messages`: system = *"You identify ONE household object for a recycling encyclopedia. Choose only from the provided list. If unsure, prefer a category entry. Never invent. Flag hazards (batteries, chemicals, sharps, pressurised cans)."* + user content: image (base64 data URI — confirm the exact `image` / `image_url` shape on the model page) + the `VOCAB` labels list. `guided_json` schema: `{ candidates: [{ slug: string, confidence: number }] (max 3), material_guess: string, hazard_flag: boolean }`. Post-process: drop slugs not in `VOCAB`, clamp 0–1, sort desc, keep 3; `assert = candidates[0]?.confidence >= 0.6`; if `hazard_flag`, attach `safe_path: 'hhw'`. Return `{ candidates, assert, material_guess, hazard_flag }` with `Cache-Control: no-store`. Simple limiter: 10 req/min/IP using `caches.default` counters keyed by `cf-connecting-ip` (best effort). Never persist the image.
**Done when:** `npx wrangler pages dev dist --ai AI` (real charges — keep to a handful of calls) returns valid JSON for a phone photo; a non-image → 415; unit test validates the post-processor against three recorded fixture responses.

### Card C.2 — Lens photo flow + top-3 picker
**Do:** enable Snap: draw the current video frame to a canvas at max 768 px long edge, `toBlob('image/jpeg', 0.8)` (this also strips EXIF), POST to `/api/vision`. `assert` → Confirm state with the confidence meter (mockup `.conf`), "Yes, that's it" → Answer (`ItemCard`, `origin: 'vision'`, badge *"Identified by AI — please confirm"*); "Not quite" or `!assert` → **Top-3 picker**: up to three chips (item name or "Category: Plastic"); tap → Answer (category → material default path with the "check local" badge); "None of these" → Not-sure state → "Search by name" pre-filled with `material_guess`. Hazard flag → the hazard safe path is shown above whatever else. "Snap again" returns to scanning.
**Done when:** a sharp photo of a phone → Confirm → Answer; a blurry photo → top-3 or not-sure; a battery photo → hazard path visible; tested on iPhone via `*.pages.dev`.

### Card C.3 — Release 0.9.0
**Do:** `/privacy` "Photos you snap" paragraph; homepage Tier 3 card → "Live now (beta)"; VISION.md open question "Recognition engine — REVISIT" rewritten to cite the benchmark; CHANGELOG; VERSION → `0.9.0-alpha.1`; HANDOFF.
**Done when:** live at `v0.9.0-alpha.1`; owner asked (HANDOFF) to add a dashboard rate-limiting rule on `/api/vision`.

### Card D.1 — PWA
**Do:** `@vite-pwa/astro@1.2.0` exact; manifest (name "Recyclopedia", short_name "Recyclopedia", theme colour from tokens, icons generated from `public/images/lbg/lbg-favicon.png` at 192/512 — keep ♻ identity), `workbox` precache of shell + `_astro/*`, `NetworkOnly` for `/api/*`. One-time "Add to Home Screen" hint after the first successful scan (localStorage in try/catch). Camera must still work in a plain Safari tab.
**Done when:** Lighthouse PWA installable; scan works installed and un-installed on iPhone.

### Card D.2 — Academy bridge + materials export
**Do:** `Material.lesson?: string` (absolute URLs on `https://lettucebeetgrapefruit.org/...`); `ItemCard` shows a *"Why this path"* line from `Disposition.why` when present and a "Learn more" link when the material has a lesson. Keep `/data/materials.json` (from Card A.3) as a public, CC BY-NC-SA-licensed export; link it from README "Data".
**Done when:** release `0.10.0-alpha.1` live; HANDOFF closes with "Phase E parked on Pit Board D + act4".

## Reporting format for HANDOFF.md entries (keep it this shape)

```
## ✅ <what shipped> — <YYYY-MM-DD> (<machine + model>)
- What changed (files), why, verification done (commands + result), version bump.
- Owner asks (if any) — one bullet each, actionable.
- Next card: <id>.
```

## When something in this brief is wrong

The brief was written from the code on 2026-09-15 and from live API probes that day. If a library API, an OFF field, or a Workers AI parameter differs at implementation time, **the code wins**: verify on the vendor page, do the smallest correct thing, and write the deviation into HANDOFF.md. Do not silently skip a card.

---

## Answer to "does this make sense?"

Yes, with one precision: APIs give us **product identity and materials** (Open Food Facts family, later Earth911/TRP for local rules, EPA FRS for places). No API gives "the most grateful path" — that ranked, cited, kindly-voiced layer is the part we own, and it is small enough to author as **materials + categories**, not 500 items. The camera makes the API-sourced facts land on our layer; the Academy teaches from the same table. That is the reciprocity, made concrete.
