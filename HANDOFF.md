# HANDOFF — Recyclopedia

Cross-machine handoff notes. Read this first when picking up work on another
machine (e.g. the Lenovo ThinkPad running Codex). Keep it current at the end of
every session.

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
   ready ("Let us be grateful" — the parent brand; recyclopedia.cc becomes a property under
   it). When it's in hand: plan the rebrand — parent-brand landing/identity, where recyclopedia
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
- **Rebrand (recorded, not executed):** parent brand will be **Lettuce Beet Grapefruit**
  ("Let us be grateful"); recyclopedia.cc becomes a property under it. No rename yet.
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
Single source of truth for version: the `VERSION` file (currently `v0.1.4 alpha`).

## TODO / next up (rough priority)

**Manual, owner-only (Luiz's machine / Cloudflare dashboard — agents can't do these):**
- [ ] **Rename the local folder on the primary Mac** to `recyclopedia` (cosmetic; the working dir is still under the old folder name): `mv ~/Workspace/Projects/psychicrecycle ~/Workspace/Projects/recyclopedia`
- [ ] Decommission / clean up the previous (pre-`recyclopedia.cc`) Cloudflare Pages project + its interim subdomain, now that the new domain is live.
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
