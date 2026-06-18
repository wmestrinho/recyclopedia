# CLAUDE.md — recyclopedia

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

**Recyclopedia** (repo slug: recyclopedia) — Active development, v0.1.2 alpha.
**Live site:** [recyclopedia.cc](https://recyclopedia.cc)

A recycling education platform by Absolutely Plausible Solutions. The site **is** the Recyclopedia — a searchable encyclopedia of recycling. Three areas:
1. **Academy** — Educational modules on recycling, e-waste, hazardous materials, myths
2. **Lookup** — Searchable database of recyclable items (60+ items, Phase 2: 500+) — the core of the Recyclopedia
3. **Donate Electronics** — Intake form with searchable electronics dropdown (200+ items)

**Stack:** Pure HTML/CSS/JS · Cloudflare Pages · Font: Share Tech Mono
**Design:** AP design system, green-shifted accent palette (`--accent: #3d9c6b`)

## Deployment

```sh
npx wrangler pages deploy .
```

Domain: `recyclopedia.cc`

## Version Rule

- Single source of truth: `VERSION`
- Current version: `v0.1.2 alpha`

## Before Committing

- Run: `python3 scripts/validate_agent_baseline.py`
- Run: `git status --short --branch`
