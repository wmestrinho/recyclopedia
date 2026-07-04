# Recyclopedia

**Status:** In development — v0.3.1 alpha
**Live site:** [recyclopedia.cc](https://recyclopedia.cc)
**Project name:** Recyclopedia (display name) · repo slug: recyclopedia

A project by [Absolutely Plausible Solutions](https://absolutelyplausible.com), part of
the [Lettuce Beet Grapefruit](https://lettucebeetgrapefruit.com) family. Open source,
donation-supported, run like an encyclopedia: open to read, edited in-house.

## License

- **Code:** [GNU AGPL-3.0](LICENSE). If you run a modified version of this software —
  including as a network service — you must make your modified source available under
  the same license.
- **Content** (encyclopedia entries, lessons, quizzes, research):
  [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) —
  attribution required, **no commercial use**, share-alike. Educational purposes only.

## Purpose

An item-identification and local-action reasoning engine.

- **Human input (live)** — Searchable knowledge base of 60+ items with preparation guidance and ranked paths through the Gratitude Hierarchy.
- **Barcode recognition (in development)** — Product-code identification feeding the same item and material knowledge.
- **AI vision + material ID (researching)** — A last-resort recognition tier, not a committed model choice.
- **Local resolution (planned)** — Combine the identified item with district rules and available facilities to return an immediate plan of action.
- **Donate Electronics (temporary location)** — Intake remains on this site while its move to the LBG `.com` property is unresolved. ⚠️ AP is not yet accepting donations.

Academy content is retained in this shared repository, but it is no longer part
of the Recyclopedia homepage or primary navigation. It is live as Lettuce Beet
Grapefruit Academy at [lettucebeetgrapefruit.org](https://lettucebeetgrapefruit.org).

## LBG webapps

The same Astro build currently serves two isolated LBG surfaces without changing
the Recyclopedia engine theme:

- `lettucebeetgrapefruit.org` → LBG Academy (`/academy` internally): The Menu,
  four live courses, lesson readers, and interactive Taste Tests.
- `lettucebeetgrapefruit.com` → LBG community (`/lbg` internally): workshops,
  events, technology-donation coordination, and family links.

Both use the route-scoped warm LBG theme in `public/css/lbg-theme.css`. Host-based
root rewrites live in `functions/_middleware.js`.

## Framework (shared vocabulary)

The engine combines recognition, ranked respectful paths, confidence, and local
resolution. Its research foundation is shared with the separate LBG Academy product,
but `recyclopedia.cc` remains the action engine. The domain boundary is canon in
[docs/LBG_BRAND_ARCHITECTURE.md](docs/LBG_BRAND_ARCHITECTURE.md).

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

Domains: `recyclopedia.cc`, `lettucebeetgrapefruit.org`, and
`lettucebeetgrapefruit.com`

## Version

See `VERSION` file. Current: `v0.3.1 alpha`

## Validation

```sh
npm run build
python3 scripts/validate_agent_baseline.py
```

## Roadmap

- **Phase 1 (current):** Human-input identification, 60+ item knowledge base, ranked paths
- **Phase 2:** 500+ items plus district rules and nearby-facility resolution
- **Phase 3:** Barcode recognition
- **Phase 4:** AI vision and material identification after explicit model research
