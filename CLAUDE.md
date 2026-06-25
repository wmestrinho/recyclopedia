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

> ⚠️ **Auto-deploy is currently BROKEN (as of 2026-06-25).** The Cloudflare Pages
> git-integration build fails on every push to `main` (has been failing for many
> commits — live site was frozen at `v0.1.2` while `VERSION` was `v0.1.5`). The
> `astro build` itself succeeds locally; the failure is in Cloudflare's build env.
> **Until fixed, you MUST deploy manually after every push** (see below). Root cause
> needs the build log from the authenticated Cloudflare dashboard.

Push to `main` is *intended* to trigger a Cloudflare Pages git-integration build
(`astro build` → `dist/`) and deploy automatically — but this is broken (see above).
**Working deploy path right now:**

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
