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
- [x] **Buy domain `recyclopedia.cc`** — done 2026-06-15.
- [x] Update domain references in README/CLAUDE/AGENTS — done 2026-06-15.
- [x] **Wire up `recyclopedia.cc`:** custom domain added to the `recyclopedia` Pages project (apex + www), DNS auto-created, SSL Active, verified serving the site — done 2026-06-15.
- [ ] **Rename the local folder on the primary Mac** to `recyclopedia` (cosmetic; the working dir is still under the old folder name): `mv ~/Workspace/Projects/psychicrecycle ~/Workspace/Projects/recyclopedia`
- [ ] Decommission / clean up the previous (pre-`recyclopedia.cc`) Cloudflare Pages project + its interim subdomain, now that the new domain is live.
- [ ] **Phase 2:** expand the Lookup database to 500+ items; add Supabase backend; state/municipality regulations.
- [ ] **Phase 3:** full Academy course content, quizzes, facility locator by ZIP.
- [ ] (Low priority / optional) Internal element IDs and JS still use `recyclopedia`/`recyclopedia-results` for the Lookup feature — fine to leave; rename only if doing a broader refactor.

## Coordination
- Multiple machines/agents may touch this repo. Coordinate via GitHub only.
- Secondary machine: Windows ThinkPad Lenovo X260, PowerShell + OpenAI Codex.
- Always `git status --short --branch` before editing/committing/pushing. Do not run destructive git commands without checking status.
