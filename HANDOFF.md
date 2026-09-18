# HANDOFF — Recyclopedia

Cross-machine handoff notes. Read this first when picking up work on another
machine (e.g. the Lenovo ThinkPad running Codex). Keep it current at the end of
every session.

## ✅ The donation sign — 2026-09-17 (Mac Claude Code, Fable 5.1)

- Second `SignSpec`, `DONATION_SIGN` in `src/data/signs.ts`, placed at the
  top of `#donate` under the section heading. Groups mirror the categories in
  `public/js/donate.js` (187 items, 19 groups); "Not this way" and the rail
  reference `items.ts` slugs, so the build guards them.
- `SignLink` generalises where a cell goes: `slug` → Lookup, `donate` → the
  form's `#item-input` (value set, `input` event, focus; donate.js opens the
  suggestions on focus), `href` → plain link. `linkFor()` builds the anchor.
- Verified locally at 1280 / 390: Laptop group → item box "Laptop" with two
  suggestions open, page stays on Donate; Tires → Lookup with the query set;
  no duplicate ids with two signs on the page; no errors; no sideways scroll.
- Version `0.8.8-alpha.1 → 0.8.9-alpha.1`, deployed manually.

## ✅ Dark mode removed by owner decision — 2026-09-17 (Mac Claude Code, Fable 5.1)

- Luiz, on seeing the site in dark mode: keep the lighter theme, "this darker
  mode is not cool at all". The automatic dark scheme from `988e56b` (v0.7.8,
  ThinkPad Codex) is removed: no `prefers-color-scheme: dark` block in
  `lbg-theme.css`, `color-scheme: light` on `body.lbg-site`, one light
  `theme-color` meta on `/` and `/privacy`. **Do not reintroduce it.**
- Version `0.8.7-alpha.1 → 0.8.8-alpha.1`, deployed manually.

## ✅ The curbside sign — 2026-09-17 (Mac Claude Code, Fable 5.1)

- **The homepage now carries the "what should be recycled?" board** in the
  layout municipal solid-waste departments print (the owner supplied a City of
  Kissimmee sign as the reference): `src/components/CurbsideSign.astro`, content
  in `src/data/signs.ts` (`CURBSIDE_SIGN`). It sits in `#home` directly under
  the hero grid, before the tiers block. The owner asked for it as **a template
  for displaying our lists and categories** — a second sign is a second
  `SignSpec` and one more `<CurbsideSign spec={…} />`.
- **Content is data, not copy.** Groups and entries reference item slugs;
  `resolveSign` throws at build time on a missing slug. The acceptable half is
  the four groups whose items are `status: curbside`; the red half is nine
  `no` / common-contaminant items; the rail is batteries, electronics, bulbs,
  paint and oil. Labels are authored; the click carries the item's real name
  into the Lookup (`window` event `recyclopedia:search`).
- **Astro gotcha, worth remembering:** markup injected with `set:html` does not
  get the component's `data-astro-cid-*` attribute, so scoped rules never match
  it. The glyphs carry `fill`/`stroke` as presentation attributes and the size
  rules use `:global(.sign__glyph)`. The first build shipped black silhouettes.
- **Verified locally** (Playwright Chromium against `python3 -m http.server` on
  `dist`) at 1280 / 900 / 600 / 390-dark / 320: no sideways scroll, no page
  errors, and a click on a cell activates the Lookup page with the query filled
  and one card returned. The fixed header overlaps element screenshots taken at
  the top of the page — that is the harness, not the layout.
- Version `0.8.6-alpha.1 → 0.8.7-alpha.1`. Auto-deploy is still broken (see
  CLAUDE.md); deployed with the manual fallback and the live footer checked.

## 🔶 Card C.2 built and switched off — Tier 3 is two switches from live — 2026-09-17 (Mac Claude Code, Fable 5.1)

- **The whole photo tier now exists, dark.** To go live after C.0:
  1. `functions/api/vision.js` → `MODEL` = the benchmark's winner;
  2. `wrangler.jsonc` → `"VISION_ENABLED": "1"`;
  3. `src/data/flags.ts` → `VISION_LIVE = true` (a test refuses 2 without 3);
  4. Card C.3 copy (`/privacy` photo paragraph, homepage Tier 3 card), `0.9.0`.
  If the benchmark says **category-only**, also make `postProcess` keep only
  `category:` slugs — the picker and the general-path answer already handle it.
- **Verified on a flags-on build deployed to the preview branch only**
  (production never had the flag on): Chromium 320, Chromium dark 390, WebKit
  iPhone 14 — 18 checks each against mocked `/api/vision` responses (confirm,
  meter, AI badge, below-floor never asserts, picker chips 44 px, category →
  general path, none-of-these → pre-filled search, hazard banner above picker
  and answer, slug-shaped guess withheld, 429, 503, no sideways scroll, no page
  errors) **plus one real model call per engine**: boards photo →
  `category:organics 0.9` → Confirm "90% sure of the category, not the exact
  item". The upload is a real JPEG (`ffd8ff`, ~110 KB).
- **Harness note:** Playwright WebKit reports a Blob POST body as 0 bytes; the
  real call returning 200 (the function checks magic bytes) is the proof.
- **Not verified — needs the iPhone once live:** Snap from the *live video
  frame* (headless has no camera, so tests went through the photo-picker
  path), and the card's own done-when (sharp phone → Confirm, blurry → picker,
  battery → hazard).
- Version `0.8.5-alpha.1 → 0.8.6-alpha.1`. **Everything left in Phase C now
  waits on the owner's fixture photos** — filed on the AP Ops Pit Board as
  **`act5`** (2026-09-17), with the iPhone offline check folded in. Read its
  answer before starting C.0: one option is "use openly licensed photos for a
  first rough number", another parks Tier 3.

## 🔶 Card C.1 built and switched off — waiting on C.0 to switch it on — 2026-09-17 (Mac Claude Code, Fable 5.1)

- **`functions/api/vision.js` exists, is deployed, and answers 503.** Everything
  in C.1 that does not depend on the benchmark is done: validation (JPEG magic
  bytes, 1 MB), limiter, `no-store`, and `src/lib/vision_core.js` — the shared
  prompt / schema / post-processor that the function, `lens_bench.mjs`, and the
  tests all import. **To turn it on after C.0:** set the `MODEL` constant to
  the benchmark's winner, `VISION_ENABLED` to `"1"` in `wrangler.jsonc`, deploy.
- **Verified with `npx wrangler pages dev dist --binding VISION_ENABLED=1`**
  (real binding, two paid calls): boards photo → `category:organics 0.9`,
  `assert: true`, ~2.2 s, `Cache-Control: no-store`; GET → 405; text → 415; a
  body that only claims to be JPEG → 415; 1.5 MB → 413; 11th request in a
  minute → 429 + `Retry-After`. Default config → 503, no model call.
- **The binding's response shape matches REST** (`choices[0].message.content`);
  `extractContent` also accepts the older `{ response }` shape.
- **Beyond the brief:** hazard is not left to the model's memory — a candidate
  that is a known-hazardous item (or the Batteries / Hazardous category) sets
  `hazard_flag` and `safe_path: 'hhw'` even when the model said `false`.
- **Seen again, worth a fixture photo:** a shelf *of cans* came back
  `category:organics` (the shelf is wood; the cans are small). "One object per
  photo" in `bench/README.md` matters — and C.2's framing hint should say
  "fill the frame with one thing".
- **Owner touchpoint when it goes live:** a dashboard rate-limiting rule on
  `/api/vision` (the in-function limiter is best-effort, per edge location).
- Version `0.8.4-alpha.1 → 0.8.5-alpha.1`. Next: **C.0** (photos), flip the
  switch, then **C.2** (Snap flow + top-3 picker).

## ✅ Card D.2: the Academy bridge — 2026-09-17 (Mac Claude Code, Fable 5.1)

- **Answer cards now link the lesson that explains them.** `src/data/lessons.ts`
  (standalone — never import `materials.ts` into it, `ItemCard` ships in the
  search bundle): material id → lesson, item `material_codes` → lesson, and a
  category fallback for Textiles / Batteries / Hazardous. **A lesson was mapped
  only after reading the module and finding it teaches that routing**; no fit,
  no link. All five linked modules return 200 on `lettucebeetgrapefruit.org`.
- **"Why this path"** renders from `Disposition.why`. Four authored so far
  (pla-7, plastic-film, textile, battery-lithium), each paraphrasing its lesson.
  `why` only exists on material default paths today, so it shows on scanner
  cards, not on the 84 search items — extending it to `items.ts` is content
  work for a later pass, same rule: say only what the lesson says.
- `/data/materials.json` carries `lesson`; README has a "Data" section.
- **Verified on a preview deployment**, Chromium 320, Chromium dark 390, WebKit
  iPhone 14: aluminum can → 2.3; smartphone → no link; a mocked film barcode →
  why line + 2.3 link inside the Lens; no sideways scroll; dark mode holds.
- **Version:** `0.8.4-alpha.1`, not the plan's `0.10.0` — Tier 3 (`0.9.0`) has
  not shipped, and version numbers should not claim it has.
- **Phase D is complete. Phase E is parked on Pit Board D + act4.** The only
  remaining engine work is Phase C, and it starts with the owner's fixture
  photos (see the C.0 entry below). Nothing else is unblocked.

## ✅ Card D.1: installable + offline, and the scanner's ✕ fixed — 2026-09-17 (Mac Claude Code, Fable 5.1)

- **Worked out of order on purpose.** C.0 is blocked on the owner's photos and
  C.1–C.3 depend on it, so per the plan's "continue with the next card that
  does not depend on it" this session did D.1. Version stays on the 0.8 line
  (`0.8.3-alpha.1`); 0.9.0 is still reserved for Tier 3.
- **Deviation:** no `@vite-pwa/astro` — its peer range ends at Astro 5, we are on
  6.4.7. `scripts/build_sw.mjs` writes `dist/sw.js` after `astro build` (zero
  new deps): precache of the engine shell, network-first navigations,
  cache-first `/_astro/*`, stale-while-revalidate for other static files and
  Google Fonts, **`/api/*` never intercepted**. Cache name = VERSION + content
  hash, old caches deleted on activate. The build fails loudly if a precache
  entry is missing from `dist/`.
- **Install hint:** once, after the first "Yes, that's it" — real install
  prompt on Chromium, Share → Add to Home Screen text on iOS Safari
  (`rcy:a2hs-hinted` in localStorage, try/catch).
- **Bug found and fixed on the way:** the Lens ✕ was covered by the sticky
  header on every phone since v0.8.0 (`main.site-shell` z-index:1 trapped the
  overlay). The dialog now portals to `<body>`; verified with a hit-tested click
  in Chromium and WebKit, focus returns to the camera button.
- **Verified on a Pages preview deployment**, Chromium 390 + 320 and WebKit
  iPhone 14: SW active + controlling, manifest and all icons 200, hint shown
  once / never twice, install button calls `prompt()`, buttons 44 px, no
  sideways scroll, no `/api/` entry in any cache, console clean. **Offline
  reload renders and search answers — Chromium only.** Playwright's WebKit
  blocks navigation before the service worker sees it, so offline on Safari is
  **not verified**; the cache there does hold `/` (140 KB).
- **Zone quirk worth knowing:** on `recyclopedia.cc` (not on `*.pages.dev`) the
  Cloudflare zone rewrites `Cache-Control` to `max-age=14400` for `.js`/`.css`,
  overriding Pages' `max-age=0` and even `no-cache`. Only `no-store` gets
  through — that is what `public/_headers` sets on `/sw.js`. This is also why
  unhashed `/css/style.css` goes stale for hours after a deploy. Owner-side fix:
  zone → Caching → Browser Cache TTL → "Respect Existing Headers".
- **Owner ask:** on the iPhone — open recyclopedia.cc, scan a barcode, follow
  the hint to add it to the Home Screen, then switch on Airplane Mode and open
  it from the icon. It should load and search; scanning needs a connection.
  Also confirm the scanner works from the installed icon (the card's
  "Done when").
- Next card: **C.0** when photos land; otherwise **D.2** (Academy bridge).

## ✅ Pre-C.1 vocabulary fix: categories say what they cover — 2026-09-17 (Mac Claude Code, Fable 5.1)

- **The wood gap from the C.0 selftest is closed.** `recognition.ts` gained
  `CATEGORY_COVERS`; each `category:<name>` VOCAB entry now carries its
  contents in the label and aliases. Verified live: `dj-03-boards.jpeg` went
  from `candidates: []` / "wood (not listed)" to `category:organics 0.90`
  on Llama 4 Scout. Moondream still answers free text ("chair") — unchanged.
- New test guards the cover terms against colliding with item names/aliases
  (it caught five on the first pass — those objects are items, not categories).
- **C.0 is still blocked on the owner's photos** — checked 2026-09-17: nothing
  in Drive `RandDRecyclopedia/lens-fixtures/`, `bench/fixtures/` empty. Pit
  Board has no answered Recyclopedia items.
- Version `0.8.1-alpha.1 → 0.8.2-alpha.1`.
- Next card: **C.0** (run it when photos land), then C.1.

## 🔶 Card C.0 harness ready — waiting on the owner's photos — 2026-09-15 (Mac Claude Code, Opus 5)

- **`scripts/lens_bench.mjs` is written and proven against the live API.** The
  benchmark cannot produce numbers until the fixtures exist, so everything
  except the photos is done: drop the Drive folder into `bench/fixtures/` and
  run `node scripts/lens_bench.mjs`.
- **Both request shapes verified live (the Cloudflare docs show neither):**
  - `llama-4-scout` takes OpenAI-style content parts with the image as a
    `data:` URI in `image_url.url`, plus `guided_json`; the answer is a JSON
    string at `result.choices[0].message.content`. **No licence agreement was
    required** — the first call succeeded, so the master plan's "agree to
    Meta's licence" owner touchpoint is not needed.
  - `moondream3.1` takes `{ task:'query', image:<data URI>, question, stream:false }`.
    **`stream` must be sent explicitly as `false`** — omit it and the API
    returns `{"result":{},"success":true}`, an empty answer that looks like a
    success. Answer is at `result.result.answer`.
- **Early signal, not a result** (two DIY build photos, out of distribution):
  Llama returned in-vocabulary structured candidates both times (1.5–3.5 s);
  Moondream returned free text ("chair", "shoe rack") that matched no slug.
  Moondream has no structured output and no closed vocabulary, so it needs a
  text→slug match that fails whenever it names something we do not list. If
  the real fixtures repeat that pattern, Llama 4 Scout wins on shape alone.
- **A real finding for Phase C, found by the selftest.** On a photo of a
  pallet-wood frame Llama returned `candidates: []` with
  `material_guess: "wood (not listed)"` — the honest refusal we designed for,
  but it never reached for `category:organics`, which is where `materials.ts`
  files wood. Nobody looking at a plank thinks "organics". Before C.1, the
  category entries in `VOCAB` should name what they cover (e.g. "Organics —
  food scraps, wood, cork, yard waste") or wood should earn an item of its
  own. Otherwise Tier 3 will drop honest-but-useless answers on anything
  wooden. Cheap to fix in `recognition.ts`; it changes the prompt, not the
  schema.
- **Owner ask (this is the blocker):** ~40 phone photos across the 11
  categories into Drive `RandDRecyclopedia/lens-fixtures/`, one object per
  photo, plus `labels.json` mapping each filename to an item slug or
  `category:<name>`. Contract and examples: `bench/README.md`.
- Version `0.8.0-alpha.1 → 0.8.1-alpha.1`.
- Next card: **C.0** (run it), then C.1.

## ✅ Cards B.1–B.5: Tier 2 LIVE — camera on the search bar — 2026-09-15 (Mac Claude Code, Fable 5.1 → Opus 5)

- **The camera is live on `recyclopedia.cc`.** Tap 📷 in the search bar →
  point at an EAN/UPC → the barcode is decoded **on the device** → only the
  number goes to `/api/barcode` → Open Food Facts returns product + packaging
  components → each component maps through `materials.ts` to an item card.
- **Verified end-to-end, headless, on the real preview deployment**
  (`lens-preview.recyclopedia.pages.dev`), Chromium 390 + 320 px and WebKit
  390 px: camera button 44×44, Lens chunk **not** in the initial page load and
  fetched only on tap, file-fallback path reads a printed EAN `5449000000996`
  → Confirm ("Coca-Cola · Aluminium · drink can", Open Food Facts chip) →
  Answer (Aluminum can, curbside, gratitude note), Snap disabled, Esc closes
  and returns focus to the camera button, no sideways scroll in any state, no
  console errors. Dark mode holds. `check_responsive.py` clean.
- **API checks:** valid GTIN → `found: true` with one `aluminium` /
  `en:drink-can` / `aluminum-can` component in ~0.9 s; bad check digit → 400;
  valid-but-unknown GTIN → `found: false` in 2.5 s with a "help Open Food
  Facts add it" link. A record with a shape but no material resolves to
  **not-sure**, never a guessed material.
- **Two deviations from the brief, both deliberate:**
  1. The brief said import the barcode ponyfill's WASM from a CDN. It is
     **self-hosted** at `/vendor/zxing_reader.wasm` (a `prebuild` script
     copies it out of `node_modules`; the file is gitignored). A third-party
     CDN fetch would have contradicted the privacy line on the viewfinder.
  2. The function does **not** import `materials.json`; Wrangler bundles the
     TypeScript module directly from `src/data/`, which is simpler and keeps
     one source of truth.
- **`ItemCard.svelte` extraction verified byte-for-byte:** the 84 rendered
  cards in `dist/index.html` are identical to the pre-change snapshot once
  Svelte's SSR comments are stripped; class sets match exactly.
- Version `0.7.11-alpha.1 → 0.8.0-alpha.1`.
- **Owner asks:** unchanged (auto-deploy repair, Card C.0 fixture photos).
  Nothing new is needed for Tier 2.
- **Still to do on a real phone:** the headless runs exercise the file path,
  not a live camera stream. Open `https://recyclopedia.cc/#recyclopedia` on
  an iPhone, tap 📷, allow the camera, and point it at a real can.
- Next card: **C.0** (the vision benchmark — blocked on the fixture photos).

## ✅ Cards 0.5 + A.1–A.3: material-first data layer, tests wired — 2026-09-15 (Mac Claude Code, Fable 5.1)

- **Card 0.5 — observed.** After the 0.7.10 push `gh run list --limit 3` is
  empty: both workflows are `active` and Actions is `enabled` at repo level,
  yet nothing has ever run. Not touched (Pit Board H parked). The board CLI has
  no "annotate" command, so the observation lives here, not on the item.
- **Card 0.2 — confirmed by the push test.** `bcfddec` produced no
  `github:push` deployment and no check-run; both 0.7.10 and this release were
  deployed manually. Owner ask stands (below).
- **Card A.1 — `src/data/materials.ts`.** 40 materials, every category
  covered, 141 OFF `packaging_materials` ids (taxonomy fetched from
  `static.openfoodfacts.org` 2026-09-15 — children such as `en:pet-transparent`
  and all `en:tetra-*` listed explicitly), `shape_overrides` from
  `packaging_shapes` (`en:drink-can` → `aluminum-can`, caps → `loose-bottle-cap`,
  cutlery → `plastic-utensils-cutlery`…). Deliberate splits: rigid PS #6 vs
  foam EPS (different paths); `plastic-unknown` recommends "check local", never
  a bin; `en:unknown` maps to nothing (renders "not sure"). Known gap for Card
  B.4: PP/OPP *film* has no honest item — the function should fall back to the
  category default, not `yogurt-container-pp`.
- **Card A.2 — `recognition.ts` + enrichment.** `VOCAB.length === 95`;
  aliases on all 84 items; `material_codes` on 37 containers. Lookup chunk
  62.9 → 67.9 KB (alias data only; `materials.ts`/`recognition.ts` are not in
  the homepage bundle).
- **Card A.3 — tests.** 16 checks green via `npm test` (build → node --test).
  Data reaches the tests through Astro endpoints (`dist/data/*.json`), no
  `tsx`/loader dep. CI step added after Build; validator requires
  `scripts/test/`.
- Version `0.7.10-alpha.1 → 0.7.11-alpha.1`. Deployed manually; live footer
  verified.
- Next card: **B.1** (`ItemCard.svelte` extraction).

## ✅ Cards 0.1–0.4: production un-frozen, site tells the truth — 2026-09-15 (Mac Claude Code, Fable 5.1)

- **Card 0.1 — done.** `npm ci && npm run build && npx wrangler pages deploy dist
  --project-name recyclopedia --branch main` → live footer went `v0.7.5 alpha`
  → `v0.7.9-alpha.1` (verified with the curl in the card). Two months of work
  (SEO, social footer, dark mode, FRS) is finally visible.
- **Card 0.2 — diagnosed, owner-blocked.** Config is intact (source attached,
  repo id matches, branch/build/output correct, deployments enabled) and the
  Cloudflare GitHub App is still installed on the account. But the first
  September commit (`e83654d`) has **zero check-runs** where `d338934` has a
  `cloudflare-workers-and-pages` run — the App stopped delivering pushes for
  this repo between 2026-07-16 and 2026-09-05. Both fix surfaces are gated by
  auth an agent must not do (GitHub sudo 2FA; Cloudflare dashboard sign-in).
  Root cause + diagnostic recorded in `CLAUDE.md` deployment history.
  **Until fixed: manual deploy after every push** (done for this release).
- **Card 0.3 — done.** Homepage counts render from `ITEMS.length` /
  `CATEGORIES` at build time; stack tags honest; one four-phase roadmap in
  `index.astro`, `README.md`, `VISION.md` Status; header/footer wording per
  the footer standard; `.feature-grid` → `auto-fit/minmax`.
  Verified: `grep -rn "60+" src/ README.md` empty; build green;
  `validate_agent_baseline.py` OK; live footer `v0.7.10-alpha.1`.
- **Card 0.4 — done.** "Sourcing principle" (Luiz, verbatim) sits under "The
  core idea" in `VISION.md`; memory file `luiz-api-first-symbiosis-statement.md`
  already existed and is indexed.
- Version `0.7.9-alpha.1 → 0.7.10-alpha.1`.
- **Owner asks:**
  - **Auto-deploy (Card 0.2):** GitHub → Settings → Installed GitHub Apps →
    *Cloudflare Workers and Pages* → Configure → make sure `recyclopedia` is in
    the repository list. Then Cloudflare → Workers & Pages → recyclopedia →
    Settings → Builds & deployments → reconnect if it prompts. Proof: the next
    push shows in `npx wrangler pages deployment list --project-name recyclopedia`
    with source `github:push`.
  - **ap-website:** publish Luiz's 2026-09-15 API-first / symbiosis statement
    (text in `VISION.md` → "Sourcing principle").
  - **Card C.0 fixtures:** ~40 phone photos across the 11 categories into Drive
    `RandDRecyclopedia/lens-fixtures/` with a `labels.json`.
- Next card: **0.5** (CI observation after this push), then **A.1**.

## ▶ Lens master plan approved — 2026-09-15 (Mac Claude Code, Fable 5.1)

- **Read `docs/LENS-MASTER-PLAN.md` first.** It is the approved master plan for
  the engine (camera on the search bar) plus an execution handoff with 19 task
  cards (0.1 → D.2), each with a "Done when" test. Work the cards in order; do
  not re-plan. Written for Opus 5 / Codex / any cold session on either machine.
- **Scope locked by Luiz:** engine only. Pit Board items D, E, F, H stay parked
  (read the board, do not act on them). Item knowledge comes from APIs
  (Open Food Facts family for barcode → packaging materials); the data we own
  is a material-first layer (~40 materials + 11 categories) that doubles as
  Academy teaching material. Uncertain scans show top-3 guesses, then search.
- **Production is frozen at v0.7.5.** Cloudflare Pages has not built anything
  since commit `d338934` (~2 months). Five commits (v0.7.7 → v0.7.9) never
  deployed and no build was even attempted, so the GitHub → Pages integration
  is broken. **Card 0.1** (manual deploy) and **Card 0.2** (repair the
  integration; may need Luiz in the dashboard) come before everything else.
- **Owner asks (from the plan):** reconnect the Pages git integration if the
  dashboard shows it disconnected; ~40 fixture photos for the vision benchmark
  (Drive `RandDRecyclopedia/lens-fixtures/`); later a rate-limit rule on
  `/api/vision`.
- **ap-website:** publish Luiz's 2026-09-15 API-first / symbiosis statement
  (verbatim text in `docs/LENS-MASTER-PLAN.md`, "Statement to preserve"; Card
  0.4 also adds it to `VISION.md`).
- Docs only; no `VERSION` bump. Next card: **0.1**.

## ✅ Pit Board wired up — 2026-09-15 (Mac Claude Code)

- **Recyclopedia gets no board of its own.** The workspace-wide **AP Ops board**
  already covers every repo and already held a Recyclopedia item (`C`), so a
  second board would have split the decisions in two. Recyclopedia also can't
  host one honestly: it's a public, unauthenticated static site, so a board
  served from it would be world-readable and world-writable.
- `AGENTS.md` and `CLAUDE.md` now point at it (standard §3, §6.4) — a cold
  session, on this machine or the ThinkPad, had no way to find the board before.
  **Read it at session start:** `cd ../ap-ops && node scripts/pitboard.mjs read`;
  Recyclopedia's items are tagged `repo: recyclopedia`.
- **Filed six items** — `act4` (the two unsent outreach emails), `D` (does the
  facility data ship at all), `E` (where Donate Electronics lives), `F` (does the
  Academy still migrate), `G` (the dead PROJECT-RULES.md pointer, `repo: ap-ops`),
  `H` (the version check that has never run).
- **Closed `C`** — the stale issue #1 question — with an outcome line. Note it
  was closed **without a stored answer**: Luiz authorised the work in session
  rather than on the board, and the CLI warned accordingly. Its suggested option
  was "close it", which is what happened.
- No `VERSION` bump: docs only.

## ✅ Layer 3: FRS classifier made honest about public access — 2026-09-15 (Mac Claude Code)

- **Pipeline confirmed reproducible.** The 69 MB FL bundle was gone (never
  committed); re-downloaded the current EPA edition (refreshed 2026-09-08) and
  re-ran — reproduced the July pilot exactly, plus 2 new facilities.
- **Scaled to statewide:** `--county ALL`. Florida = **1,700 facilities across
  95 counties, 98.6% geocoded**, committed as the reference dataset at
  `docs/research/2026-09-15-frs-florida-statewide.json`. Don't commit one per
  state — 50 would be ~60 MB of generated data in a public repo.
- **The finding, and it is the important one: NAICS says what industry a site is
  in, never whether a person may walk in.** The pilot's "hazardous collection"
  bucket held an environmental consultancy, a septic-tank company and a
  Walgreens take-back, side by side. Shipping that raw sends someone to a
  consultant's office with a box of paint.
  → Every record now carries **`public_access`** (`likely`/`unknown`/`no`)
  plus **`public_access_basis`**, derived from `facility_type` **only** — FRS
  has no such field, so a per-record claim would be invented. FL: 957 / 347 /
  396. **`likely` is not `open`:** nothing rendered from this may say "open to
  the public", it must pair with call-ahead guidance, `verified_at` stays null.
- **Two classifier bugs fixed, both found by reading the names:**
  - `562920` (MRF) is over-assigned by FRS; 19 of 106 FL sites carrying it also
    carry `423930`, and by name they're scrap/used-parts dealers. `423930` now
    outranks it. Orange County MRFs 4 → 1, and BUDGET AUTO PARTS OF ORLANDO
    stopped being a "materials recovery facility".
  - Transfer stations — the *most* consumer-usable thing FRS holds — were
    invisible, scattered across `562111` and `423930`. Name-matched into a new
    `transfer_station` type (54 statewide, mostly real county drop-offs), with
    a scrap-word guard so DOMINION METAL RECYCLING CENTER stays a scrap yard.
  - `naics_type` preserves what NAICS alone said, pre-heuristic, on every record.
- **Next is a product call, not a data one:** does a "check local" surface ship
  on `unknown`-grade data at all, or wait for the Earth911 / Recycling
  Partnership outreach (still owner-gated)? Nothing is wired into the site yet
  and that was deliberate.

## ✅ Stale-handoff cleanup + version-drift fix — 2026-09-15 (Mac Claude Code)

- **Closed GitHub issue #1** ("Handoff todo list for Codex agent") as stale, with
  an item-by-item correction comment. It described the **pre-Astro** repo
  (`index.html`/`js/main.js`, `psychicrecycle.absolutelyplausible.com`) and led
  with a BLOCKER claiming the site had never been pushed — void, and actively
  harmful: an agent reading it would refuse to touch `main`. Of its todos only
  two survive (500+ items; Supabase), both already tracked below.
- **Mac session had been working from a two-month-stale `main`** — the three
  Codex pushes (asset-pack ignore, SEO/footer/versioning, dark mode) were not
  fetched. Lesson for both machines: `git fetch` **before** auditing state, not
  just before pushing.
- **Version drift, fixed at the root cause.** `README.md` said `v0.4.0` in two
  places and `HANDOFF.md` said `v0.1.4`, against a `VERSION` of `0.7.8-alpha.1`.
  `CLAUDE.md` had drifted *again within two commits* (`0.7.6-alpha.1` vs
  `0.7.8-alpha.1`). All four docs now point at `VERSION` and restate nothing.
- **`AGENTS.md` version rule pointed at a file that does not exist.** The
  2026-09-05 "versioning cleanup" replaced the inline rule with "see
  `ap-ops-workspace/PROJECT-RULES.md`" — there is no such file anywhere: the
  repo is `ap-ops`, and it contains nothing named PROJECT-RULES.md. The same
  dangling pointer is in `ap-ops/AGENTS.md:38` and `ap-ops/CLAUDE.md:95`.
  That is *why* CLAUDE.md drifted again — the rule pointed nowhere. AGENTS.md
  now states the rule inline (VERSION + package.json + CHANGELOG, `N.N.N-alpha.N`
  format, CI gate) and flags the pointer as unresolved.
  **Owner ask: either create `PROJECT-RULES.md` in `ap-ops` or drop the pointer
  from both repos.**
- **`AGENTS.md` deploy command corrected:** it still said
  `npx wrangler pages deploy .` — the repo root, not `dist`. That is exactly the
  class of mistake that silently froze the live site for many commits (see the
  history note in `CLAUDE.md`). Now build-then-deploy-`dist`, flagged as the
  manual fallback only.
- Checked off two TODOs done but never marked: the Mac folder rename, and the
  old Cloudflare Pages project decommission.
- Docs-only change; no `VERSION` bump (the CI version gate exempts `*.md`).

## ✅ Local source asset pack ignored — 2026-07-16 (Windows Codex)

- The ThinkPad had an untracked `public/assets/` folder containing the raw LBG
  source art pack (`lbg-blobs` PNGs + zip, ~41 MB). The optimized runtime assets
  are already tracked under `public/images/lbg/`, so the raw source pack should
  stay local and should not be swept into the public repo by the new
  cross-machine asset sync workflow.
- Added `public/assets/` to `.gitignore`. Verified from `ap-ops`:
  `python scripts/sync_assets.py --repo recyclopedia --check` now reports
  everything synced.

## ✅ Phase 2 kickoff: EPA FRS ingestion prototype + outreach guide — 2026-07-14 (Mac Claude Code)

- **Owner outreach guide created in Drive** (repo is PUBLIC — negotiation
  playbooks don't get committed): "Recyclopedia Data Outreach Guide —
  Earth911 & The Recycling Partnership" in `RandDRecyclopedia`. Sequenced
  plays (Earth911 first), draft emails, question checklists, decision tree,
  red lines, outcome log. Outreach outcome gates layer 2.
- **Cloudflare cleanup TODO is DONE** (verified via `wrangler pages project
  list` 2026-07-14): only `recyclopedia` (all 4 apex/www domains incl. LBG
  .com/.org), `diy-pallet-guide`, and two unrelated projects remain — the old
  pre-recyclopedia.cc project no longer exists. Check it off.
- **DATA_STRATEGY next-step #3 prototyped — `scripts/frs_ingest.py`:**
  ingests EPA FRS "state combined CSV" bundles (state_combined_fl.zip,
  refreshed by EPA 2026-07-08, 69 MB). Findings that shape layer 3:
  - Envirofacts efservice single-table queries work, but **cross-table joins
    500 server-side** → bulk CSV is the reliable path.
  - FRS `INTEREST_TYPE` is permit-program noise (NPDES/AIR/…); **NAICS 562xx
    + 423930 is the honest facility classifier** (FL: 785 landfills, 1,106
    recyclable-material wholesalers, 106 MRFs, 608 collection…).
  - Excluded as noise: 562910 remediation, 562991 septic, 562998 misc.
- **Pilot output committed:** `docs/research/2026-07-14-frs-orange-county-fl.json`
  — 97 Orange County facilities (40 scrap yards, 11 landfills incl. the real
  Orange County Landfill, 4 MRFs…), 97/97 geocoded, caveats embedded
  (regulatory floor, not consumer drop-off points; `verified_at` stays null).
- **`epa-frs` added to SOURCES** (baseline tier) — renders in the directory's
  Key Datasets strip.
- Version `v0.7.4 → v0.7.5 alpha`.
- **Owner asks outstanding:** send the two outreach emails (guide in Drive);
  enable GitHub Actions at account level if CI is wanted; Supabase account
  creation is owner-only when layer 3 goes live.

## ✅ Smoke-detector correction + EPA RadTown source — 2026-07-13 (Mac Claude Code)

- Chasing the last uncited hazardous item exposed **stale facts on the card**:
  EPA's RadTown page (`americium-ionization-smoke-detectors`, verified 200 +
  content-fetched 2026-07-13) says there are **no special disposal
  instructions** — household trash or community recycling is allowed — and
  never mentions mail-back. Web-verified separately: **Kidde no longer accepts
  mail-ins** (recommends HHW); **First Alert takes back up to 4 of its own
  brands** (First Alert/BRK/Family Gard/Onelink; fee beyond 4).
- Item rewritten honestly: best path = First Alert take-back (with brand
  `conditions`), then HHW, then a new trash rung citing `epa-smoke-detectors`
  (`local_variance: true` — some states differ, e.g. Colorado). The take-back
  rung stays **uncited**: manufacturer support pages aren't directory material,
  so no First Alert org/source was added.
- Remaining uncited: antifreeze, LED bulb (still no verified authority page).
- Version `v0.7.3 → v0.7.4 alpha`.

## ✅ Citation chips on Lookup cards + sources.ts split — 2026-07-13 (Mac Claude Code)

- **`Disposition.source` now renders**: a small mono "SRC: US EPA ↗" chip on
  the best-path line and on cited "Other respectful paths" rows
  (`Lookup.svelte` + `.recycle-card__src` in `public/css/style.css`).
  `title` = full source name; uncited rows show nothing (no source, no chip).
- **New `Source.short_label`** ('US EPA', 'US FDA', 'Call2Recycle',
  'PaintCare') for the chip text; falls back to `name`.
- **Bundle-split lesson:** importing SOURCES from `organizations.ts` made
  Rollup hoist the whole 107 KB org module into a chunk the homepage loads.
  Fix: `SOURCES` + `Source` moved to **`src/data/sources.ts`**;
  `organizations.ts` re-exports them (existing imports unchanged). Lookup
  chunk 54.1 → 61.6 KB (+7.4 KB of source data only); homepage no longer
  touches the org array. If a future island needs org data, watch chunking.
- **Verified in-browser** (astro preview + Chrome): lithium battery best path
  shows the EPA chip; smartphone shows donate-chip + recycle-chip while
  reuse/repair/dispose rows correctly stay uncited; links carry the full
  source name.
- Version `v0.7.2 → v0.7.3 alpha`.

## ✅ Item-advice provenance, hazardous-first — 2026-07-13 (Mac Claude Code)

- **Corrects the v0.7.0 "unblocked" note:** the 12 dataset SOURCES (GWMO, GEM,
  Plastics Outlook…) back the *numbers*, not item instructions — stamping them
  onto `Disposition.source` would be fabricated provenance. Item advice needs
  item-guidance authorities.
- **New `quality_tier: 'guidance'`** on `Source` (organizations.ts +
  DATA_SCHEMA.md): advice provenance vs. statistics. Guidance sources are
  filtered OUT of the directory's "Key datasets" strip (directory.astro).
- **9 guidance sources added** (all URLs curl-verified 200 + title-matched +
  content-checked for the specific claims, 2026-07-13): EPA household
  batteries / li-ion batteries / electronics / used oil / HHW / CFL-mercury,
  FDA drug disposal, Call2Recycle locator, PaintCare. **3 new orgs:** `us-fda`,
  `call2recycle`, `paintcare` (directory 246 → 249).
- **42 citations inserted into `items.ts`** (script keyed by slug + disposition
  label, one-match-or-abort): all 9 battery items, motor oil, both paints, CFL,
  meds, pesticides, and 16 electronics items (recycle + donate rungs; power
  bank & earbuds cite the li-ion page as the closer fit).
- **Honestly left uncited** (no verified authority page yet): antifreeze (EPA
  HHW page doesn't mention it), LED bulb (CFL page is mercury-bulbs only),
  ionization smoke detector (needs an NRC source + org — future pass).
- **Heads-up:** Call2Recycle appears to be rebranding to **"The Battery
  Network"** (site titles, same domain, observed 2026-07-13). Item copy still
  says "Call2Recycle" — fine for now, revisit if the old name disappears.
- **Field is data-only for now** — `Lookup.svelte` doesn't render
  `Disposition.source` yet. Rendering "Source: EPA ↗" on disposition rows is
  the natural next step.
- Version `v0.7.1 → v0.7.2 alpha`.

## ✅ Privacy Notice at /privacy — 2026-07-13 (Mac Claude Code)

- **Context:** compliance review found the site collects nothing server-side
  (static, no analytics, no cookies; localStorage progress only), but the
  Donate Electronics flow puts names/addresses/pickup details into the AP
  inbox via mailto — the one item of personal data actually handled. A
  privacy notice was the single currently-due compliance item.
- **`/privacy`** — standalone page (deliberately NOT a hash-route section;
  privacy notices need a stable URL). Root-surface styling, no `main.js`
  (its SPA router would break plain-anchor nav on subpages). Covers: zero
  collection while browsing, localStorage progress scope, how the mailto
  donation form works, what we receive/retain/delete for donations, the
  data-wiping policy for donated devices, Cloudflare + Google Fonts
  disclosure, children, change policy. Effective date 2026-07-13.
- **Links in:** root footer + `LbgFooter` (`· Privacy` after the CC license),
  and the Donate "Data security" panel now states the wipe-before-recycle
  policy and links the notice.
- **Future compliance gates noted in session (feature-triggered, not due now):**
  location layer → privacy design decision (client vs server) + policy update;
  analytics → choose cookieless; Earth911/TRP → ToS review at outreach;
  Academy student accounts (if ever) → COPPA; Lens → privacy-by-design pass.
- Version `v0.7.0 → v0.7.1 alpha` (VERSION + package.json + CLAUDE.md strings,
  which had drifted at 0.6.0).

## ✅ World Directory + Module 1.7 + whitepaper v1.3 — 2026-07-12 (Mac Claude Code)

- **Research ingested** (two 2026-07-12 notes: global waste datasets + ~200-org
  LBG directory seed), archived verbatim in `docs/research/` with a provenance
  index. This was the "source-gathering research dive" that
  `REFERENCE_ORGANIZATIONS.md` had been waiting for.
- **`src/data/organizations.ts`** — new Atlas org layer: 246 typed organizations
  (9 thematic categories + 121 national/regional agencies) + 12 `SOURCES`
  citations with headline stats and baseline/stream-monitor/lead quality tiers.
  `org_role_t` unchanged; directory facets documented in `DATA_SCHEMA.md`
  "Organization directory extension (2026-07)". Known flaws carried honestly as
  `needs-review` (Argentina tourism-URL, ASMC/SACEP http-only, Indonesia/Vietnam
  post-merger portals). 6-month agency re-verification rule in `DATA_STRATEGY.md`.
- **`/academy/directory`** — public World Directory: `Directory.svelte` island
  (search, category pills, region select, tag chips, verified-only toggle,
  verification badges) + Key Datasets strip from `SOURCES`. Nav link added to
  the LbgHeader academy surface only (deliberately NOT an academy-index card —
  `data-key` cards feed the progress bar).
- **Module 1.7 "Why Do We Have Trash At All?"** — the seed note's nine-stage
  learning path as a Track 1 module; quizzes `academy_1_7_a/b` shipped in the
  same commit (2.2–2.6 quiz-mismatch lesson applied). Progress denominator
  14 → 15 (existing users' % drops one step — cosmetic, expected).
- **Whitepaper → v1.3** (`recyclopedia whitepaper v1 2.md`, now tracked in git;
  the filename intentionally lags — the internal CHANGE LOG is the version
  record): global MSW refreshed to GWMO 2024 (2.1B t 2023 → 3.8B by 2050, costs
  USD 252B → 640.3B), Global-MSW flag resolved. `.m4a`/`.zip` working files
  gitignored.
- **Follow-up unblocked:** `SOURCES` ids can now populate the empty
  `Disposition.source` field in `items.ts` (Atlas provenance chain).
- Version `v0.6.0 → v0.7.0 alpha` (VERSION + package.json, which had drifted at
  0.4.0-alpha). Build 25 routes green; validator green.

## ✅ LBG painted brand graphics LIVE — 2026-07-05 (Mac Claude Code)

- New hand-painted LBG brand art (four style sets) sourced from Drive
  `RandDRecyclopedia/lbg-blobs` (example-01…04, 32 PNGs), optimized to WebP
  in `public/images/lbg/` (~330 KB total vs 15 MB+ source; sips + cwebp q82).
- Each set has a distinct purpose:
  - example-01 veggie trio → `/lbg` hero wordmark art (srcset 600/1200w).
  - example-03 painted dabs → `LbgHeader` brand dots (`.lbg-dot--painted`),
    inherited by `/lbg` and all Academy pages; also the new `/lbg` favicon.
  - example-02 watercolor solos → homepage engine-tier card washes
    (`.module-card--wash-{lettuce,beet,grapefruit}` = Tier 1/2/3).
  - example-04 swirl → homepage hero panel art (`.hero-swirl`), replacing
    the ♻ emoji frame; Recyclopedia keeps ♻ in its own header brand.
- CSS added in `lbg-theme.css` (dabs, wordmark art) and `style.css` (swirl,
  card washes); removed the now-unused `.hero-recycle-symbol` rule.
- Version `v0.5.0 → v0.6.0 alpha`. Build 23 routes green; visual checks on
  `/` and `/lbg/` via local preview passed.

## ✅ DIY section + Track 2 quiz fix LIVE — 2026-07-05 (Mac Claude Code)

- New DIY section, all cross-linked and live on `recyclopedia.cc`:
  `/diy` index (`e7a741b`), `/diy/pallet-guide` field guide (`337d4c8`), and
  `/diy/dj-pallet-table` build log (`a031347`) — 12 photos curated from the
  raw HEIC set (9 sessions, Apr 15–May 13). The `diy.recyclopedia.cc`
  subdomain idea is retired; footers now say `recyclopedia.cc/diy`.
- Fixed live Academy Track 2 knowledge checks (`c3c6398`): quizzes
  `academy_2_2_a`–`academy_2_6_a` existed only in the design project's
  `quizzes.js`, so modules 2.2–2.6 rendered 'Quiz … not found'. Ported the
  fact-checked set into `src/data/quizzes.ts`; verified live on module 2.6.
- Modules 2.2–2.6 authored back into the Claude Design project
  ("Interactive School Modules") as `Module 2.x.dc.html`, byte-consistent
  with the Module 2.1 template.
- Version bumped to `v0.5.0 alpha`; root footer now reads it from `VERSION`
  (was hardcoded) — `LbgFooter.astro` already did. All deploys through
  Cloudflare Pages auto-build; live checks passed on `recyclopedia.cc`.

## ✅ LBG family skin LIVE on Recyclopedia — 2026-07-04 (Windows Codex)

- Recyclopedia now shares the warm Newsreader/Hanken theme already used by the
  LBG `.com` and `.org` surfaces: oat paper, lettuce primary, beet contrast, and
  grapefruit highlights.
- The engine boundary is unchanged. Lookup data, search/filter behavior, ranked
  paths, Donate flow, navigation model, and host routing remain intact.
- Root-specific component overrides live in `public/css/lbg-theme.css`.
- Version bumped to `v0.4.0 alpha`.
- Release commit `62e82ff` deployed through Cloudflare Pages production
  deployment `c2512009`; live checks passed on `recyclopedia.cc`,
  `lettucebeetgrapefruit.org`, and `lettucebeetgrapefruit.com`.

## ✅ LBG `.com` + Academy `.org` LIVE — 2026-07-04 (Windows Codex)

- Implemented the full Claude Design handoff in `25fe402` and pushed to `main`,
  scoped only to `/academy` and `/lbg`; Recyclopedia root styling is unchanged.
- LBGA now uses approved "The Menu" naming, four live courses, warm
  Newsreader/Hanken theme, and upgraded Taste Tests with progress, streak,
  feedback, results ring, keyboard focus, and retake.
- LBG `.com` now has workshop, event, technology-donation coordination, family,
  and open-source sections with honest functional contact paths.
- Added responsive shared LBG navigation/footer and `functions/_middleware.js`
  root rewrites for `.org` → `/academy/` and `.com` → `/lbg/`. Recyclopedia is
  explicitly passed through.
- `v0.2.0 → v0.3.0 alpha`. Astro build: 7 routes green; baseline, diff, route
  isolation, canonical-domain, responsive-nav, Taste Test, middleware, and
  Wrangler function compilation checks green.
- Cloudflare production deploy succeeded (`bf00dc48`); verified HTTP 200 and
  expected v0.3.0 content at `recyclopedia.cc/`, `/academy/`, and `/lbg/`.
- Attached apex + `www` for both zones to Pages project `recyclopedia`, added
  proxied CNAMEs to `recyclopedia.pages.dev`, and waited for certificate
  validation. All six project domains now show `active`.
- Live verification: both `.com` hosts serve the community site, both `.org`
  hosts serve LBGA, all return HTTPS 200 with expected content, and
  `recyclopedia.cc` still serves the engine unchanged.

## ✅ OPEN-SOURCED — 2026-07-03 (Mac mini, Claude Code)

- **Code license: AGPL-3.0** (confirmed by Luiz) — `LICENSE` + `package.json`
  `"license": "AGPL-3.0-only"`. Content remains CC BY-NC-SA 4.0; the dual split
  is documented in README's License section.
- **Full-history secret scan: CLEAN** (48 commits; Stripe/AWS/GitHub/Google/
  Slack/JWT/private-key/generic patterns + filename sweep — zero hits).
- **Repo flipped PUBLIC** on GitHub. From now on: never commit anything secret
  or client-private here; the whitepaper draft and audio stay out until cleared.

## ✅ Site trimmed to the engine — 2026-07-03 (Mac mini, Claude Code) — v0.2.0 alpha

First one-at-a-time property move, authorized by Luiz ("recyclopedia is all
yours"). Per `docs/LBG_BRAND_ARCHITECTURE.md`:

- Homepage restructured around the **Trickle-Down Tier engine**: "Three pillars"
  block replaced with Tier 1 Search (live) / Tier 2 Barcode (in development) /
  Tier 3 AI vision (planned) + the location→plan-of-action resolution band
  (`#tiers`). Myths preview and the whole in-page `#academy` SPA section removed;
  `academy` dropped from `pageTitles` in `public/js/main.js` (stray `#academy`
  hashes fall back to home). Roadmap phases reframed to engine phases.
- **Academy routes stay live and unchanged** (`/academy`, lessons, quizzes) —
  only de-emphasized: out of the primary nav, migration notice on `/academy`
  pointing to lettucebeetgrapefruit.org / LBGA. Content moves in the .org build.
- Donate Electronics stays on the site until its home is decided (likely .com).
- `v0.1.7 → v0.2.0 alpha` (VERSION + 3 page footers). Build verified: 7 pages,
  no `/academy` links left on the homepage.
- Windows follow-up synchronized `README.md`, `VISION.md`, agent guidance, and
  npm package metadata with the v0.2.0 engine boundary; no UI code was changed.

## Brand architecture locked — 2026-07-03 (Mac mini, Claude Code)

- Luiz defined the canonical three-domain LBG architecture. **Read
  `docs/LBG_BRAND_ARCHITECTURE.md` before touching anything LBG/Academy/Lookup.**
- Short version: `recyclopedia.cc` = Trickle-Down Tier Reasoning engine ONLY
  (human input → barcode → YOLO-class vision → material ID → local disposal
  plan of action); `.org` = LBG Academy, its own school webapp, absorbs
  `/academy`; `.com` = umbrella + non-profit storefront with meetup calendars
  and donated-electronics repair workshops, all ages.
- Work proceeds **one property at a time**, directed by Luiz.
- Same-day amendments: Recyclopedia = standalone product AND embedded in the
  LBG properties; run it **like Wikipedia** — open-source, donation-supported;
  the engine research is the **foundation of LBGA's courses** (one knowledge
  base, two surfaces); put content under **Creative Commons**.
- Session close (2026-07-03): three decisions locked — content license
  **CC BY-NC-SA 4.0, NO commercial use**, applied to all four footers with
  "EDUCATIONAL PURPOSES ONLY" (v0.1.7 alpha); Wikipedia model with **in-house
  editing** (open-source ≠ open write access); donations via **existing Stripe
  rails** (`ap-stripe-worker`/`shop-api`). Still open: code OSS license
  (AGPL-3.0 suggested) → secret scan → repo public.
- **Recommended next move (awaiting Luiz's go):** trim recyclopedia.cc to the
  engine (move Academy out of nav, restructure around the trickle-down tiers)
  as the first one-at-a-time property.

## Recovery — 2026-07-03 (Mac mini, Claude Code)

- The four Mac-only files flagged in the 2026-06-29 sync audit are recovered and
  pushed in this commit: `src/pages/lbg/index.astro`, Academy Module 1.3
  (`src/content/academy/zero-waste-habits.md`), its quiz in `src/data/quizzes.ts`
  (`academy_1_3_a`), and `docs/LBG_DNS_WIRING.md`.
- Deliberately **not** committed (still local on the Mac): the whitepaper draft
  (`recyclopedia whitepaper v1 2.md`, marked internal-review-only) and a 36 MB
  audio file (`Ending_the_trash_illusion_with_AI.m4a`). Decide their home with
  Luiz before adding either to the repo.
- Next owner-gated action unchanged: point the two LBG domains' registrar
  nameservers at Cloudflare (see `docs/LBG_DNS_WIRING.md`).

## Sync audit — 2026-06-29 (Windows Codex)

- Fetched GitHub and fast-forwarded local `main` to `08d5492`; the working tree
  was clean and exactly matched `origin/main`.
- Cross-repo reconciliation found a newer note in
  `absolutely-plausible-ops/HANDOFF.md`: both LBG domains were secured and four
  Recyclopedia files were reportedly still uncommitted on the other machine
  (`src/pages/lbg/`, Academy Module 1.3, `docs/LBG_DNS_WIRING.md`, plus one
  related file).
- Those four files are **not present on GitHub `main`, `origin/astro-poc`, or
  anywhere in this Windows workspace**. Recover and commit/push the original
  files from the machine that created them before continuing the LBG rollout;
  do not recreate them from the summary alone.
- After recovery, the next owner-gated action remains changing the two LBG
  domains' registrar nameservers to Cloudflare. The Drive content task still
  requires pulling `RandDRecyclopedia` and reviewing the drafts with Luiz before
  implementation.

## ▶ NEXT SESSION — START HERE (planned 2026-06-27+)

Two things Luiz lined up for next time:

1. **New domain / brand kickoff.** Luiz will have the **Lettuce Beet Grapefruit** domain
   ready (the parent brand; recyclopedia.cc becomes a property under it). When it's in
   hand: plan the rebrand — parent-brand landing/identity, where recyclopedia
   sits under LBG, DNS/Cloudflare wiring, and how AP visual identity carries over. Until the
   domain exists, **do not rename** files/UI/strings. See the rebrand memory + `docs/academy/PROVENANCE.md`.
2. **New content modules from Gemini.** Luiz will drop fresh drafts into the Drive
   `RandDRecyclopedia` handoff station. Pull them via the **gdrive-ap** skill, then **review
   together** before implementing — same bar as last time: check architecture fit, factual
   accuracy (vs the Myths lesson + Gratitude Hierarchy), brand/emoji, and localization. Record
   attribution in `docs/academy/PROVENANCE.md`.

**Open backlog (not blocking):** migrate Modules 02/03/04/06 (E-Waste, Hazardous, Zero-Waste,
Local Regs) from "coming soon" cards into real lessons; lesson i18n (collection supports
`*.es.md`); Module 1.3 (Zero-Waste Micro-Habits) still un-drafted; B2B tier build-out when we
court municipalities (source staged in `docs/academy/b2b-source/`).

---

## ✅ Session 2026-06-26 — SHIPPED & LIVE (v0.1.6 alpha on recyclopedia.cc)

Merged `feat/academy-online-school` → `main` (commit `7acb301`), pushed, Cloudflare
auto-deployed. **Verified live:** homepage footer `v0.1.6 alpha`, flat CSS (3px borders, zero
gradients), `/academy` catalog lists 3 lessons, `/academy/myths` renders + quiz hydrates.
Details of what shipped are in the two sub-sections below.

## Session 2026-06-26 (cont.) — Flat UI restyle + Myths lesson (same branch)

- **Flat "Gumroad" restyle** (`public/css/style.css`, token-level): `--border` darkened to
  `#2a2e45`; `--shadow`/`--glow-*` set to `none` (all box-shadows/glows/text-glows now render
  nothing); removed body scanline + ambient glow overlays; replaced every gradient/translucent/
  `backdrop-filter` background (header, cta-band, cards, footer, mobile nav) with **solid theme
  colors**. Green accent palette + all rounded corners preserved.
- **Myths → real lesson:** `src/content/academy/myths.md` (all 10 myths) at `/academy/myths`,
  with new `academy_5_a` quiz in `src/data/quizzes.ts`. Homepage: "See all 10 myths →" and the
  Module 05 card now link to `/academy/myths`; the inline 10-myth block was removed from
  `index.astro` (4-myth home teaser kept). Catalog now lists 3 lessons.
- **Rebrand (recorded, not executed):** parent brand will be **Lettuce Beet Grapefruit**;
  recyclopedia.cc becomes a property under it. No rename yet.
- Final border pass: outer card containers + header bottom line + footer top line all **3px**
  (inner inputs/chips stay 1px); committed in `7acb301`. Build green (5 pages). **Shipped & live.**

## Session 2026-06-26 — Academy online school, Phase 1 (branch `feat/academy-online-school`)

Turned the Gemini-drafted Drive handoff (`RandDRecyclopedia`) into a real, static Academy.
**Merged to `main` and deployed live** (see SHIPPED section above).

- **New architecture:** Academy is now an Astro **content collection** (`src/content.config.ts`,
  `src/content/academy/*.md`) with routed pages `/academy` (catalog) and `/academy/<slug>`
  (lesson). Graduated from the homepage hash-section SPA. Homepage nav + hero "Start Learning"
  now point to `/academy`; the `#academy` teaser + Myths content stay reachable at `/#academy`.
- **Two lessons live:** `hidden-history.md` (Module 1.1, ported) and `smartphone-sorting.md`
  (Module 1.2, **rewritten** — the original "green stripe → trash" framing was factually wrong
  and contradicted our Myths module; redone around resin codes, curbside vs drop-off, the
  Gratitude Hierarchy, "when in doubt leave it out").
- **Interactive quizzes:** `src/components/Quiz.svelte` (Svelte island, replaces Gemini's vanilla
  JS class — fixed an undefined-`containerId` bug + full-page reload retake, applied AP tokens);
  data in `src/data/quizzes.ts` (`academy_1_1_a/b`, `academy_1_2_a`).
- **Rejected** the Canvas LMS + Gumroad + AWS plan (conflicts with our static/open-source canon).
- **Parked B2B content** under `docs/academy/b2b-source/` (vendor SLA, NIR risk register +
  financial CBA, frontline multilang materials) — Tier-2, not shipped. **Fixed localization bugs**
  (ES had PT "LIXO"/"OBRIGATORIO"; PT had ES "PASO"/"CORRECTO" + EN "minutes"; added missing EN SOP).
- **Provenance** recorded in `docs/academy/PROVENANCE.md` (Gemini research vs Claude implementation;
  Gemini's self-written "Persistent Task Directive" logged as record, **not** adopted as policy).
- Version bumped `v0.1.5 → v0.1.6 alpha` (VERSION, package.json, footers). Build + baseline validator green.
- **TODO next:** review/merge → deploy; migrate Myths into a lesson; consider lesson i18n;
  Module 1.3 (Zero-Waste Micro-Habits) still un-drafted.

## ✅ Done (2026-06-25)

- **Fixed Cloudflare Pages auto-deploy (root cause).** It had been silently broken for
  many commits — the build log showed `No build command specified. Skipping build step.`
  then `Error: Output directory "dist" not found.` The Pages project had **no build
  command configured**, so CF skipped `astro build` and failed on the missing (un-
  committed) `dist/`. Fixes:
  - Set the project build command to `npm run build` (via Cloudflare API).
  - Pinned Node via `.nvmrc` → `22.16.0` (commit `02d9cd2`); Astro 6 needs Node ≥22.12.
  - Triggered a fresh git build: all stages green (`build` → `deploy` success).
    Verified `v0.1.5 alpha` live on recyclopedia.cc (HTTP 200). **Auto-deploy works.**
  - If builds ever regress, check the **build command** in the Pages project settings
    first. Manual fallback: `npm run build && npx wrangler pages deploy dist --project-name recyclopedia`.
- **Housekeeping committed** (`cedd2eb`): `.gitignore` ignores `.vscode/`;
  `.github/copilot-instructions.md` added (Copilot guidance mirroring `CLAUDE.md`);
  fixed `v0.1.4 → v0.1.5` version drift in the Copilot file and `CLAUDE.md` overview.

## Project at a glance
- **Name:** Recyclopedia (recycle + encyclopedia). Official domain/identity: **recyclopedia.cc**.
- **Repo:** `wmestrinho/recyclopedia`.
- **Stack:** Astro + TypeScript at repo root, Svelte for the Lookup island, existing CSS/browser JS preserved under `public/`. Cloudflare Pages.
- **Structure:** single-page Astro site (`src/pages/index.astro`). Three areas — Academy, **Lookup** (the searchable item database, core of the site), Donate Electronics.
- The site **is** the Recyclopedia; the searchable section is labeled "Lookup" in the UI.

## Current live state (as of 2026-06-19)
- **LIVE on official domain:** https://recyclopedia.cc 🎉 (and https://www.recyclopedia.cc) — both Active, valid SSL. Current repo version is **v0.1.4 alpha**.
- **Deploy is automatic:** push to `main` → Cloudflare Pages git integration builds & deploys. `npx wrangler pages deploy dist` is just the manual fallback.
- `main` is up to date and clean.

## Session 2026-06-20 — framework definition (canon revised, docs-only)
Brainstorm session that locked the platform's **shared vocabulary**. No code/runtime
change; canon docs revised in place. Read `VISION.md` "The framework" section first.
- **Four decision ladders** named: **Recognition** (barcode → visual AI → manual → ask-a-human),
  **Gratitude Hierarchy** (the trickledown), **Confidence** (local rule → item → category → "check local"),
  **Where** (facility → facility type → "check local"). The old "tier/fallback/trickledown" ambiguity is resolved.
- **Three knowledge backbones:** **Lookup** (items; one dataset, two doors = search + Lens),
  **Atlas** (geography + provenance), **Academy** (concepts + macro/credibility; destination + contextual micro-lessons).
- **Atlas = merge of the old "Facility Map" (#5) + "Org/Sources Registry" (#6)** into one
  layered map: Facilities (**all disposition endpoints**, not recycling-only) + Jurisdictions/Local Rules +
  Organizations provenance graph. Two surfaces: user map + Academy provenance infographic (plots org location + jurisdiction).
- **Lens** = the orchestrating front door (owns no data; runs all four ladders over all three backbones).
- **Donate** = a rung-4 action surface (Atlas "where" view + AP intake node, electronics-only).
  ⚠️ **Placeholder — AP NOT accepting donations during development; `#needs more discussion later#`.**
- **Recognition engine — provisional:** Workers AI open-vocab for MVP, YOLO/on-device later
  (TrashNet too coarse — ~6 buckets). Pending a **source-gathering + recognition research dive** (parked follow-up).
- **Reconciled the Drive "Project proposal" (2026-06-18):** its YOLO+TrashNet-primary and
  "recyclable vs. non-recyclable" framings are superseded; its EPA Envirofacts/Data.gov sources and NASA/NOAA/IPCC orgs were folded in.
- **Deferred:** the impact/metrics dashboard (the inward half of the old #6).
- Docs touched: `VISION.md`, `DATA_SCHEMA.md` (added `organization` provenance entity),
  `DATA_STRATEGY.md`, `AP_GUIDELINES.md` (filled confidence thresholds), `REFERENCE_ORGANIZATIONS.md` (+NASA/NOAA/IPCC), `README.md`.

## Session 2026-06-19 — go-live correctness fixes (v0.1.4, pushed)
Done on the **primary Mac (Opus 4.8)**, on top of the Astro root migration (v0.1.3):
- **Donate form no longer discards submissions.** It previously showed "Donation submitted! We'll contact you in 48 hours" while sending nothing. Now `public/js/donate.js` validates required fields and opens the donor's mail client pre-filled to `contact@absolutelyplausible.com` (zero-backend honest stopgap). Success copy in `src/pages/index.astro` updated to match. **Proper fix = a Cloudflare Pages Function that emails submissions directly; tracked for Phase 2.**
- **Favicon 404 fixed** in `src/pages/index.astro` (`assets/favicon.png` never existed → inline SVG ♻ data-URI).
- Bumped to **v0.1.4 alpha**. Fixes were ported into the Astro source (not the now-legacy root `index.html`/`js/`).
- ⚠️ **Verify on the live site after deploy** (build was not run locally this session): confirm the favicon shows, the donate flow opens an email, and Cloudflare Pages is set to **build `npm run build`, output `dist`** — if Pages still serves the repo root, the Astro build won't take effect.

## Session 2026-06-16 — what changed (big strategy + first build)
Defined the project's ultimate goal and the path to it. **All new docs are canon; read them before Phase 2 work:**
- **`VISION.md`** — north star: **Recyclopedia Lens**, a camera app (point → recognize → confirm → speak to the object → ranked **Gratitude Hierarchy** path: reuse→repair→repurpose→donate→recycle→compost→dispose). PWA now / native later. Barcode-first + Workers AI fallback (PROVISIONAL). Scan modes (1 item [MVP] / multi-material / pile-hoard).
- **`ENVIRONMENTAL_RESPECT_POLICY.md`** + **`AP_GUIDELINES.md`** — stub canon (the ethic + "never guess someone into a landfill"). To be fully drafted later.
- **`DATA_STRATEGY.md`** — four data layers (item knowledge / local rules / facility map / macro); build-vs-license-vs-aggregate per layer.
- **`DATA_SCHEMA.md`** — ranked-disposition schema (JSON now → Postgres/Supabase later); complete 11-category taxonomy, **no "Other"**.
- **`REFERENCE_ORGANIZATIONS.md`** — World Bank / Yale EPI / NRDC / ISWA / UNEP contacts.
- **`TECH_STACK.md`** — **Astro + TypeScript on Cloudflare**; static data for MVP, Supabase (PostGIS) only for the facility geo-map. (Cloudflare acquired Astro Jan 2026 → first-party.)
- **`mockups/scan-result-card.html`** — the scan-card UI (confirm / answer / not-sure states).
- **`js/recyclopedia.js`** (v0.1.1, SHIPPED): all 58 items migrated to `gratitude_note` + ranked `dispositions[]`; Lookup card renders best path + collapsible other paths; taxonomy applied (Organics/Rubber/Bulky Goods, ink/toner deduped).
- **Astro POC:** branch **`astro-poc`**, **draft PR #4**, in `poc/astro/` (Astro 6 + Svelte 5; homepage + Lookup island; builds clean). NOT deployed.

## Session 2026-06-17 — Phase 2 review on Windows Codex machine
- Repo sync/cleanup complete; local repo is clean and aligned with GitHub.
- **Astro POC reviewed:** good direction, not production-ready by itself.
  - `poc/astro/` proves the recommended architecture: static Astro page + Svelte Lookup island + typed data.
  - The POC currently carries **9 representative items**, not the full live dataset.
  - The live site still holds **58 items across all 11 categories** in `js/recyclopedia.js`.
  - Conclusion: approve Astro as the Phase 2 direction, but do **not** replace the live site with the POC as-is.
- **Migration Step 2 bridge completed:** the live 58-item dataset now lives in `js/recyclopedia-data.js`, loaded separately from the render logic in `js/recyclopedia.js`.
- Next engineering step: convert that standalone data file into JSON or a typed module as the Astro migration starts, then port the real page incrementally.
- Owner blockers are unchanged: partnership/API outreach (Earth911, The Recycling Partnership) and the source workflow for the future 500+ item dataset.

## Session 2026-06-18 — Astro root migration started
- **Migration Step 3 completed in working tree:** Astro/Svelte project files added at repo root (`package.json`, `astro.config.mjs`, `tsconfig.json`).
- The live page shell was ported to `src/pages/index.astro` with the existing visual structure and CSS.
- Static browser assets moved into `public/css/style.css`, `public/js/main.js`, and `public/js/donate.js`.
- The full 58-item dataset was converted into a typed Astro module at `src/data/items.ts`.
- Lookup was converted from vanilla DOM rendering to a Svelte island at `src/components/Lookup.svelte`, using the same live card classes and ranked-disposition behavior.
- `wrangler.jsonc` now points Pages output to `dist`.
- Node/npm are now available on the Windows PowerShell machine (`node v24.16.0`, `npm 11.13.0`).
- Build verification passed: `npm run build` generated `dist/index.html` successfully.
- Validation passed: `python scripts/validate_agent_baseline.py`.
- Migration fix applied: public scripts in `src/pages/index.astro` use `is:inline` so Astro preserves `/js/donate.js` and `/js/main.js` as static browser assets.
- Encoding fix applied: `src/pages/index.astro` and `src/data/items.ts` were re-decoded to proper UTF-8 after Windows mojibake broke symbols/copy (`♻`, arrows, em dashes, emoji icons). Current scan over `src`, `public`, and `dist` is clean.
- Dependency pins applied in `package.json`/`package-lock.json` (`astro 6.4.7`, `@astrojs/svelte 8.1.2`, `svelte 5.56.3`, `typescript 6.0.3`) instead of `latest`.
- Local build quirk: Astro/Vite needed a narrow alias for `astro/entrypoints/prerender` in `astro.config.mjs`; keep it unless a future dependency update proves it unnecessary.
- npm reported 3 low-severity advisories; do not run `npm audit fix --force` casually during migration because it can introduce breaking dependency churn.

## Next session — start here
1. **Read the canon docs above** (VISION → DATA_STRATEGY → DATA_SCHEMA → TECH_STACK) before touching Phase 2.
2. **Treat the Astro POC as approved direction, not merge-ready production.** Keep it as the architecture proof.
3. **Astro root migration is build-verified on Windows PowerShell.** Next step is visual/browser smoke testing the built site, then commit/push/deploy.
4. **Confirm Cloudflare Pages settings:** build command `npm run build`, output directory `dist`. Manual fallback: `npx wrangler pages deploy dist --project-name=recyclopedia --branch=main`.
5. **Owner-only, blocking later phases:** data-partnership outreach to The Recycling Partnership + Earth911 (see TODO below); these gate the "local rules" layer.
6. **Open questions still to resolve:** recognition engine (barcode+AI is provisional — needs deeper research); where the 500+ item set is being assembled.
- Tip: run `npm run build` and `python3 scripts/validate_agent_baseline.py` before committing; bump `VERSION` (+ footer in `src/pages/index.astro`) for meaningful changes.

## Domains & subdomains (recyclopedia.cc zone, all on Cloudflare)
- `recyclopedia.cc` + `www.recyclopedia.cc` → Pages project **`recyclopedia`** (this repo).
- `diy.recyclopedia.cc` → Pages project **`diy-pallet-guide`** (separate repo, separate agent). Subdomain plumbing verified 2026-06-15; its content is owned by that project's `main` branch.
- Rule of thumb: each new subdomain = a custom domain on its own Pages project; Cloudflare auto-creates the proxied CNAME in this zone.

## Brand / founding dates (intentional — do NOT "fix")
- **1993** (footer tagline "since 1993") = founder's personal origin of the mission, growing up in Brazil.
- **2008** (About section "since 2008") = year the founder committed to it as a life goal and became an entrepreneur / founded AP.
- The two dates are deliberate and different. Inline HTML comments in `index.html` mark both.

## How to deploy
```sh
npm install
npm run build
npx wrangler pages deploy dist --project-name=recyclopedia --branch=main
```
Requires wrangler auth (`npx wrangler login`) with access to the Cloudflare account.

## Before committing (project rule)
```sh
python3 scripts/validate_agent_baseline.py
git status --short --branch
```
Single source of truth for version: the `VERSION` file. (This line used to
restate the number and drifted to `v0.1.4` — read the file, don't restate it.)

## TODO / next up (rough priority)

**Manual, owner-only (Luiz's machine / Cloudflare dashboard — agents can't do these):**
- [x] **Rename the local folder on the primary Mac** to `recyclopedia` — done; the working dir is now `~/Workspace/Projects/recyclopedia`.
- [x] Decommission / clean up the previous (pre-`recyclopedia.cc`) Cloudflare Pages project + its interim subdomain — done; verified 2026-07-14 via `wrangler pages project list`.
- [ ] **Data partnership outreach (gates the "local rules" layer — see `DATA_STRATEGY.md`):**
  - [ ] **The Recycling Partnership** — Recycle Check / National Recycling Database (9,000+ community programs, real-time local rules). Ask about partnership/API/licensing terms. recyclingpartnership.org/recyclecheck
  - [ ] **Earth911** — Search API (350+ materials, ~800k listings); request a developer API key + terms. api.earth911.com
  - Outcome decides whether layer 2 is "license now" or "defer behind honest *check local*."

**Project work:**
- [ ] **Phase 2:** expand the Lookup database to 500+ items; add Supabase backend; state/municipality regulations. Schema in `DATA_SCHEMA.md` (ranked dispositions). ✅ **Migration Step 1 done (v0.1.1):** all 58 items now carry `gratitude_note` + ranked `dispositions[]`; complete 11-category taxonomy (no "Other"); ink/toner deduped; Lookup card renders grateful note + best path + collapsible "Other respectful paths". ✅ **Migration Step 2 bridge done (v0.1.2):** dataset extracted to `js/recyclopedia-data.js`. ✅ **Migration Step 3 build-verified (v0.1.3):** dataset converted to typed `src/data/items.ts`, live page ported to Astro, Lookup moved to a Svelte island, root build passes. Next: browser smoke test, commit/push/deploy, then grow toward 500+.
- [ ] **Phase 3:** full Academy course content, quizzes, and a **national registry + map of US recycling & transfer stations** (elevated from a simple ZIP locator per the founder's business draft — it's the "where" behind every recommendation).
- [ ] **From Google Drive source docs (2026-06):** the 500+ item DB is still being built — define where it's assembled and how it imports into the ranked-disposition schema. Reference orgs + contacts captured in `REFERENCE_ORGANIZATIONS.md`. (Note: canonical brand spelling is **Recyclopedia** with an "o"; "Recyclepedia" in the draft was a typo.)
- [ ] **Phase 4 — Recyclopedia Lens (camera):** the big bet. Point a phone camera at an object → recognize → open the right Recyclopedia page with a ranked path down the Gratitude Hierarchy. North-star metric: objects correctly diverted from landfill. **Delivery: PWA now, native later. Recognition: barcode-first + AI fallback — PROVISIONAL, needs deeper research before committing.** Data model must evolve from single `status` to a ranked list of dispositions (shapes the Phase 2 Supabase schema). Canon: `VISION.md`, `ENVIRONMENTAL_RESPECT_POLICY.md`, `AP_GUIDELINES.md` (all added 2026-06-16).
- [ ] (Low priority / optional) Internal element IDs and JS still use `recyclopedia`/`recyclopedia-results` for the Lookup feature — fine to leave; rename only if doing a broader refactor.

**Done (2026-06-15):** bought `recyclopedia.cc`; wired apex + www + `diy.` subdomain; purged all legacy project names so recyclopedia.cc is the sole identity; footer tagline + all "Absolutely Plausible" mentions linked to absolutelyplausible.com; confirmed the 1993/2008 dates are intentional.

## Coordination
- Multiple machines/agents may touch this repo. Coordinate via GitHub only.
- Secondary machine: Windows ThinkPad Lenovo X260, PowerShell + OpenAI Codex.
- Always `git status --short --branch` before editing/committing/pushing. Do not run destructive git commands without checking status.
