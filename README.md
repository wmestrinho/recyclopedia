# Recyclopedia

**Status:** In development — see `VERSION` for the current release
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

- **Human input (live)** — Searchable knowledge base (every item in `src/data/items.ts`; the homepage renders the exact count at build time) with preparation guidance and ranked paths through the Gratitude Hierarchy.
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

## Data

The material-first table behind the scanner is public, built on every deploy:
[`recyclopedia.cc/data/materials.json`](https://recyclopedia.cc/data/materials.json)
— every material, its Open Food Facts packaging tags, ranked default paths, and
(where one exists) the Academy lesson that teaches the routing. Licensed
[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), like the
rest of the content. It is the first "database as Academy material" artifact.

## Stack

- Astro + TypeScript at the repo root
- Svelte island for the interactive Lookup
- Existing CSS and browser JS preserved under `public/`
- Cloudflare Pages — `$0/month` hosting
- Type: Newsreader display, Hanken Grotesk body/UI, Share Tech Mono for technical labels
- Server code: Cloudflare Pages Functions in `functions/` only (no adapter, no database)

## Deployment

```sh
npm install
npm run build
npx wrangler pages deploy dist --project-name=recyclopedia --branch=main
```

Domains: `recyclopedia.cc`, `lettucebeetgrapefruit.org`, and
`lettucebeetgrapefruit.com`

## Version

The `VERSION` file is the single source of truth; `CHANGELOG.md` has the
per-release detail. Don't restate the number in prose — it drifts. The rule is
stated once for every AP repo in
[`ap-ops/docs/PROJECT-RULES.md`](https://github.com/wmestrinho/ap-ops/blob/main/docs/PROJECT-RULES.md);
`scripts/check_version_rule.mjs` makes it runnable here.

## Validation

```sh
npm run build
python3 scripts/validate_agent_baseline.py
node scripts/check_version_rule.mjs     # after committing, before pushing
```

## Roadmap

One phase order, shared with `VISION.md` and the homepage (see `docs/LENS-MASTER-PLAN.md` for the release train).

- **Phase 1 (live):** Human-input identification over the item knowledge base, ranked paths
- **Phase 2 (in development):** Camera on the search bar — barcode recognition first (product and packaging facts from the Open Food Facts family), then AI vision with a top-3 fallback
- **Phase 3 (planned):** Installable PWA with an offline shell, plus the material-first knowledge layer surfaced on every answer
- **Phase 4 (parked):** Local resolution — district rules and nearby facilities; waits on Pit Board item D and the data outreach
