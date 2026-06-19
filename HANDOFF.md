# HANDOFF — Recyclopedia

Cross-machine handoff notes. Read this first when picking up work on another
machine (e.g. the Lenovo ThinkPad running Codex). Keep it current at the end of
every session.

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
Single source of truth for version: the `VERSION` file (currently `v0.1.3 alpha`).

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
