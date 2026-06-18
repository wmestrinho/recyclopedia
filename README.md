# Recyclopedia

**Status:** In development — v0.1.1 alpha
**Live site:** [recyclopedia.cc](https://recyclopedia.cc)
**Project name:** Recyclopedia (display name) · repo slug: recyclopedia

A project by [Absolutely Plausible Solutions](https://absolutelyplausible.com).

## Purpose

The world's most complete recycling education platform.

- **Academy** — Six learning modules covering recycling basics, e-waste, hazardous materials, zero-waste living, myth-busting, and local regulations
- **Lookup** — Searchable database of 60+ items with exact recycling instructions, prep steps, and drop-off locations (the core of the Recyclopedia)
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

Domain: `recyclopedia.cc`

## Version

See `VERSION` file. Current: `v0.1.1 alpha`

## Validation

```sh
python3 scripts/validate_agent_baseline.py
```

## Roadmap

- **Phase 1 (current):** Homepage, searchable database (60+ items), Academy myths module, Electronics donation form
- **Phase 2:** Expand to 500+ items, Supabase backend, state/municipality regulations database
- **Phase 3:** Full Academy course content, interactive quizzes, and a **national registry + map of US recycling & transfer stations** (the searchable "where" behind every recommendation)
- **Phase 4 — Recyclopedia Lens (camera):** Point a phone camera at an object → recognize it → open the right page of the Recyclopedia with a ranked, locally-aware path down the Gratitude Hierarchy (reuse → repair → repurpose → donate → recycle → compost → dispose). PWA first (native later); barcode-first + AI recognition (provisional — to revisit). See [VISION.md](VISION.md), grounded in the [Environmental Respect Policy](ENVIRONMENTAL_RESPECT_POLICY.md) and [AP Guidelines](AP_GUIDELINES.md).
