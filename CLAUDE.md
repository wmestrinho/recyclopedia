# CLAUDE.md — recyclopedia

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

**Recyclopedia** (repo slug: recyclopedia) — Active development; see `VERSION`.
**Live site:** [recyclopedia.cc](https://recyclopedia.cc)

An item-identification and local-action reasoning engine by Absolutely Plausible Solutions:
1. **Human input** — live search over 60+ items and ranked respectful paths
2. **Barcode recognition** — in development
3. **AI vision + material identification** — last-resort tier under research
4. **Local resolution** — planned district-rule and nearby-facility action layer

Academy content remains in the repo only while it migrates to
`lettucebeetgrapefruit.org`; it is not part of the `recyclopedia.cc` product boundary.
Donate Electronics remains temporarily pending an owner decision about moving it to
the LBG `.com` property.

**Stack:** Astro + Svelte islands · TypeScript · Cloudflare Pages
**Design:** LBG family warm theme — Newsreader + Hanken Grotesk on oat paper with lettuce, beet, and grapefruit accents.

Recyclopedia, `/academy`, and `/lbg` share the warm family tokens in
`public/css/lbg-theme.css`. Recyclopedia keeps its own information architecture,
engine interactions, and root-specific component rules.

## Deployment

Push to `main` → Cloudflare Pages git integration builds (`npm run build` →
`astro build` → `dist/`) and deploys automatically.

> **History (fixed 2026-06-25):** auto-deploy had been silently broken for many
> commits — the Pages project had **no build command set**, so CF skipped the build
> and failed on a missing `dist/` (which isn't committed). The site was frozen at
> `v0.1.2` while `VERSION` was `v0.1.5`. Fixed by setting the project build command to
> `npm run build` and pinning Node via `.nvmrc` (Astro 6 needs Node ≥22.12). If builds
> regress, check the project's **build command** first.

> **History (open 2026-09-15):** auto-deploy broke a second time, differently.
> The last GitHub-triggered build was `d338934` (2026-07-16); the five commits
> from 2026-09-05 on never reached Pages. The project config is intact (source
> `wmestrinho/recyclopedia`, repo id matches GitHub, production branch `main`,
> build `npm run build`, output `dist`, deployments enabled) and the
> "Cloudflare Workers and Pages" GitHub App is still installed on the account —
> but the September commits carry **no Cloudflare check-run at all**, so the
> App is not delivering push events for this repo any more (most likely its
> repository-access list, or a stale authorisation on the Cloudflare side).
> Fixing it needs the owner: GitHub → Settings → Installed GitHub Apps →
> Cloudflare Workers and Pages → Configure (2FA prompt) → confirm `recyclopedia`
> is in the allowed repositories; and the Pages dashboard → Settings → Builds &
> deployments → reconnect if prompted. Until then, ship with the manual
> fallback below after every push and verify the live footer version.
> **Diagnostic:** `gh api repos/wmestrinho/recyclopedia/commits/<sha>/check-runs`
> — a healthy push shows a `cloudflare-workers-and-pages` run.

Manual fallback (if ever needed):

```sh
npm run build && npx wrangler pages deploy dist --project-name recyclopedia
```

Domain: `recyclopedia.cc`

## Pit Board — owner decisions

Recyclopedia has **no board of its own**. Its open owner-decisions live on the
**workspace-wide AP Ops board** at **ops.absolutelyplausible.com → Pit Board**.

**Read it at the start of every session, before planning work:**

```sh
cd ../ap-ops && node scripts/pitboard.mjs read     # items tagged repo: recyclopedia
node scripts/pitboard.mjs close <key> "outcome"    # ship with the work, same commit
node scripts/pitboard.mjs file <item.json>         # new question for Luiz
```

Act only on what he actually chose — never invent an answer. Closing a board
item does **not** close the GitHub issue. Standard:
[pitboard-standard.md](https://github.com/wmestrinho/ap-workspace-standards/blob/main/pitboard-standard.md).

## Version Rule

Versioning, CHANGELOG, LICENSE, and CI conventions: see [`ap-ops/docs/PROJECT-RULES.md`](https://github.com/wmestrinho/ap-ops/blob/main/docs/PROJECT-RULES.md).

## Before Committing

- Run: `python3 scripts/validate_agent_baseline.py`
- Run: `git status --short --branch`
