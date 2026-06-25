# CLAUDE.md — recyclopedia

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

**Recyclopedia** (repo slug: recyclopedia) — Active development, v0.1.5 alpha.
**Live site:** [recyclopedia.cc](https://recyclopedia.cc)

A recycling education platform by Absolutely Plausible Solutions. The site **is** the Recyclopedia — a searchable encyclopedia of recycling. Three areas:
1. **Academy** — Educational modules on recycling, e-waste, hazardous materials, myths
2. **Lookup** — Searchable database of recyclable items (60+ items, Phase 2: 500+) — the core of the Recyclopedia
3. **Donate Electronics** — Intake form with searchable electronics dropdown (200+ items)

**Stack:** Astro + Svelte islands · TypeScript · Cloudflare Pages · Font: Share Tech Mono
**Design:** AP design system, green-shifted accent palette (`--accent: #3d9c6b`)

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
- Current version: `v0.1.5 alpha`

## Before Committing

- Run: `python3 scripts/validate_agent_baseline.py`
- Run: `git status --short --branch`
