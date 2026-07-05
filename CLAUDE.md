# CLAUDE.md — recyclopedia

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

**Recyclopedia** (repo slug: recyclopedia) — Active development, v0.5.0 alpha.
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

Manual fallback (if ever needed):

```sh
npm run build && npx wrangler pages deploy dist --project-name recyclopedia
```

Domain: `recyclopedia.cc`

## Version Rule

- Single source of truth: `VERSION`
- Current version: `v0.5.0 alpha`

## Before Committing

- Run: `python3 scripts/validate_agent_baseline.py`
- Run: `git status --short --branch`
