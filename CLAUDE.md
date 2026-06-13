# CLAUDE.md — psychicrecycle

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project Overview

**chorecycle** (repo slug: psychicrecycle) — Active development, v0.1.0 alpha.
**Live site:** [psychicrecycle.absolutelyplausible.com](https://psychicrecycle.absolutelyplausible.com)

A recycling education platform by Absolutely Plausible Solutions. Three pillars:
1. **Academy** — Educational modules on recycling, e-waste, hazardous materials, myths
2. **Recyclopedia** — Searchable database of recyclable items (60+ items, Phase 2: 500+)
3. **Donate Electronics** — Intake form with searchable electronics dropdown (200+ items)

**Stack:** Pure HTML/CSS/JS · Cloudflare Pages · Font: Share Tech Mono
**Design:** AP design system, green-shifted accent palette (`--accent: #3d9c6b`)

## Deployment

```sh
npx wrangler pages deploy .
```

Domain: `psychicrecycle.absolutelyplausible.com`

## Version Rule

- Single source of truth: `VERSION`
- Current version: `v0.1.0 alpha`

## Before Committing

- Run: `python3 scripts/validate_agent_baseline.py`
- Run: `git status --short --branch`
