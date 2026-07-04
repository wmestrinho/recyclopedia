# Recyclopedia — Astro POC

Proof-of-concept for the [TECH_STACK.md](../../TECH_STACK.md) recommendation:
**Astro + TypeScript + a Svelte island**, on the ranked-disposition data
([DATA_SCHEMA.md](../../DATA_SCHEMA.md)). Lives on the `astro-poc` branch only —
**not deployed, not part of the live site.**

## What it demonstrates

- **Content-first + islands:** `src/pages/index.astro` is static (zero JS); the
  Lookup is an interactive island (`src/components/Lookup.svelte`, `client:load`).
- **Typed static data (no DB):** `src/data/items.ts` is the DATA_SCHEMA shape in
  TypeScript — the MVP data layer.
- **The Gratitude Hierarchy UI:** each card renders the object-directed gratitude
  note, the best path, and collapsible "Other respectful paths."
- **The AP design system:** Share Tech Mono + the green accent palette.

## Run it

```sh
cd poc/astro
npm install
npm run dev      # http://localhost:4321
npm run build    # static build to ./dist
```

## What production would add (not in this POC)

- `@astrojs/cloudflare` adapter (SSR) for the Workers AI scanner endpoint.
- `@vite-pwa/astro` for the installable PWA shell.
- A barcode WASM lib (`zxing-wasm` / `zbar-wasm`) — native BarcodeDetector fails on iOS.
- Supabase (Postgres + PostGIS) + Leaflet for the facility map (Phase 3).
