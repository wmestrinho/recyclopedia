# Recyclopedia

**Status:** In development — v0.1.4 alpha
**Live site:** [recyclopedia.cc](https://recyclopedia.cc)
**Project name:** Recyclopedia (display name) · repo slug: recyclopedia

A project by [Absolutely Plausible Solutions](https://absolutelyplausible.com).

## Purpose

The world's most complete recycling education platform.

- **Academy** — Six learning modules covering recycling basics, e-waste, hazardous materials, zero-waste living, myth-busting, and local regulations
- **Lookup** — Searchable database of 60+ items with exact recycling instructions, prep steps, and drop-off locations (the core of the Recyclopedia)
- **Donate Electronics** — Intake form for electronics donations (working or not); searchable dropdown from 200+ item list. ⚠️ Placeholder during development — AP is not yet accepting donations.

## Framework (shared vocabulary)

Everything in Recyclopedia is one of **four decision ladders** (Recognition · Gratitude
Hierarchy · Confidence · Where), one of **three knowledge backbones** (**Lookup** = items,
**Atlas** = geography + provenance, **Academy** = the "why"), or a **surface** that
presents them (Search · Lens · The Map · Donate · Academy). The full model is canon in
[VISION.md](VISION.md).

## Stack

- Astro + TypeScript at the repo root
- Svelte island for the interactive Lookup
- Existing CSS and browser JS preserved under `public/`
- Cloudflare Pages — `$0/month` hosting
- Font: Share Tech Mono (Google Fonts)
- Database (Phase 2): Supabase

## Deployment

```sh
npm install
npm run build
npx wrangler pages deploy dist --project-name=recyclopedia --branch=main
```

Domain: `recyclopedia.cc`

## Version

See `VERSION` file. Current: `v0.1.4 alpha`

## Validation

```sh
npm run build
python3 scripts/validate_agent_baseline.py
```

## Roadmap

- **Phase 1 (current):** Homepage, searchable database (60+ items), Academy myths module, Electronics donation form
- **Phase 2:** Expand to 500+ items, Supabase backend, state/municipality regulations database
- **Phase 3:** Full Academy course content, interactive quizzes, and the **Atlas** — a layered registry + map of US disposition endpoints (all rungs, not recycling-only), jurisdictions/local rules, and the organizations/sources provenance graph (the searchable "where" + "who" behind every recommendation)
- **Phase 4 — Recyclopedia Lens (camera):** Point a phone camera at an object → recognize it → open the right page of the Recyclopedia with a ranked, locally-aware path down the Gratitude Hierarchy (reuse → repair → repurpose → donate → recycle → compost → dispose). PWA first (native later). Recognition Ladder: barcode → visual AI (Workers AI for MVP / YOLO later) → manual search → ask-a-human — **provisional, pending a research dive**. See [VISION.md](VISION.md), grounded in the [Environmental Respect Policy](ENVIRONMENTAL_RESPECT_POLICY.md) and [AP Guidelines](AP_GUIDELINES.md).
