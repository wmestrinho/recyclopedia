# HANDOFF — Recyclopedia

Cross-machine handoff notes. Read this first when picking up work on another
machine (e.g. the Lenovo ThinkPad running Codex). Keep it current at the end of
every session.

## Project at a glance
- **Name:** Recyclopedia (recycle + encyclopedia). Official domain/identity: **recyclopedia.cc**.
- **Repo:** `wmestrinho/recyclopedia`.
- **Stack:** Pure HTML/CSS/JS, no build step. Cloudflare Pages.
- **Structure:** single-page site (`index.html`). Three areas — Academy, **Lookup** (the searchable item database, core of the site), Donate Electronics.
- The site **is** the Recyclopedia; the searchable section is labeled "Lookup" in the UI.

## Current live state (as of 2026-06-15)
- **LIVE on official domain:** https://recyclopedia.cc 🎉 (and https://www.recyclopedia.cc) — both Active, valid SSL, serving the site. Registered + wired up 2026-06-15.
- **Deployed:** https://recyclopedia.pages.dev (Cloudflare Pages project `recyclopedia`, production branch `main`); `recyclopedia.cc` is a custom domain on that project.
- `main` is up to date.

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
npx wrangler pages deploy . --project-name=recyclopedia --branch=main
```
Requires wrangler auth (`npx wrangler login`) with access to the Cloudflare account.

## Before committing (project rule)
```sh
python3 scripts/validate_agent_baseline.py
git status --short --branch
```
Single source of truth for version: the `VERSION` file (currently `v0.1.0 alpha`).

## TODO / next up (rough priority)

**Manual, owner-only (Luiz's machine / Cloudflare dashboard — agents can't do these):**
- [ ] **Rename the local folder on the primary Mac** to `recyclopedia` (cosmetic; the working dir is still under the old folder name): `mv ~/Workspace/Projects/psychicrecycle ~/Workspace/Projects/recyclopedia`
- [ ] Decommission / clean up the previous (pre-`recyclopedia.cc`) Cloudflare Pages project + its interim subdomain, now that the new domain is live.
- [ ] **Data partnership outreach (gates the "local rules" layer — see `DATA_STRATEGY.md`):**
  - [ ] **The Recycling Partnership** — Recycle Check / National Recycling Database (9,000+ community programs, real-time local rules). Ask about partnership/API/licensing terms. recyclingpartnership.org/recyclecheck
  - [ ] **Earth911** — Search API (350+ materials, ~800k listings); request a developer API key + terms. api.earth911.com
  - Outcome decides whether layer 2 is "license now" or "defer behind honest *check local*."

**Project work:**
- [ ] **Phase 2:** expand the Lookup database to 500+ items; add Supabase backend; state/municipality regulations.
- [ ] **Phase 3:** full Academy course content, quizzes, and a **national registry + map of US recycling & transfer stations** (elevated from a simple ZIP locator per the founder's business draft — it's the "where" behind every recommendation).
- [ ] **From Google Drive source docs (2026-06):** the 500+ item DB is still being built — define where it's assembled and how it imports into the ranked-disposition schema. Reference orgs + contacts captured in `REFERENCE_ORGANIZATIONS.md`. (Note: canonical brand spelling is **Recyclopedia** with an "o"; "Recyclepedia" in the draft was a typo.)
- [ ] **Phase 4 — Recyclopedia Lens (camera):** the big bet. Point a phone camera at an object → recognize → open the right Recyclopedia page with a ranked path down the Gratitude Hierarchy. North-star metric: objects correctly diverted from landfill. **Delivery: PWA now, native later. Recognition: barcode-first + AI fallback — PROVISIONAL, needs deeper research before committing.** Data model must evolve from single `status` to a ranked list of dispositions (shapes the Phase 2 Supabase schema). Canon: `VISION.md`, `ENVIRONMENTAL_RESPECT_POLICY.md`, `AP_GUIDELINES.md` (all added 2026-06-16).
- [ ] (Low priority / optional) Internal element IDs and JS still use `recyclopedia`/`recyclopedia-results` for the Lookup feature — fine to leave; rename only if doing a broader refactor.

**Done (2026-06-15):** bought `recyclopedia.cc`; wired apex + www + `diy.` subdomain; purged all legacy project names so recyclopedia.cc is the sole identity; footer tagline + all "Absolutely Plausible" mentions linked to absolutelyplausible.com; confirmed the 1993/2008 dates are intentional.

## Coordination
- Multiple machines/agents may touch this repo. Coordinate via GitHub only.
- Secondary machine: Windows ThinkPad Lenovo X260, PowerShell + OpenAI Codex.
- Always `git status --short --branch` before editing/committing/pushing. Do not run destructive git commands without checking status.
