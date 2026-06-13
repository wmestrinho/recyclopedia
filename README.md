# chorecycle

**Status:** In development — v0.1.0 alpha
**Live site:** [psychicrecycle.absolutelyplausible.com](https://psychicrecycle.absolutelyplausible.com)
**Project name:** chorecycle (display name) · repo slug: psychicrecycle

A project by [Absolutely Plausible Solutions](https://absolutelyplausible.com).

## Purpose

The world's most complete recycling education platform.

- **Academy** — Six learning modules covering recycling basics, e-waste, hazardous materials, zero-waste living, myth-busting, and local regulations
- **Recyclopedia** — Searchable database of 60+ items with exact recycling instructions, prep steps, and drop-off locations
- **Donate Electronics** — Intake form for electronics donations (working or not); searchable dropdown from 200+ item list

## Stack

- Pure HTML / CSS / JS — no build step, no framework
- Cloudflare Pages — `$0/month` hosting
- Font: Share Tech Mono (Google Fonts)
- Database (Phase 2): Supabase

## Deployment

```sh
npx wrangler pages deploy .
```

Domain: `psychicrecycle.absolutelyplausible.com`

## Version

See `VERSION` file. Current: `v0.1.0 alpha`

## Validation

```sh
python3 scripts/validate_agent_baseline.py
```

## Roadmap

- **Phase 1 (current):** Homepage, Recyclopedia (60+ items), Academy myths module, Electronics donation form
- **Phase 2:** Expand to 500+ items, Supabase backend, state/municipality regulations database
- **Phase 3:** Full Academy course content, interactive quizzes, facility locator by ZIP
