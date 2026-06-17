# TECH STACK — Recyclopedia

> The recommended framework, language, and libraries for Recyclopedia as it grows
> from a static site into a camera-driven PWA. Companion to [VISION.md](VISION.md),
> [DATA_STRATEGY.md](DATA_STRATEGY.md), and [DATA_SCHEMA.md](DATA_SCHEMA.md).
> Researched 2026-06-16. **This is a forward plan — not a call to rewrite today.**

## Headline

**Adopt Astro + TypeScript; stay on Cloudflare; add Supabase only when the facility
map needs geo.** Recyclopedia is fundamentally a **content site with a few
app-shaped islands** (scanner, lookup, donate) — not an app-first dashboard. That
single fact drives every choice below.

The decisive signal: **Cloudflare acquired Astro on 2026-01-16** (stays MIT /
open-source), making Astro the **first-party framework** for our all-Cloudflare
stack. Even ignoring the acquisition, Astro fits on the merits: content-first,
**zero JS by default**, islands only where you need interactivity, and the
**lowest-disruption migration** from the current hand-written HTML.

## The logic we're building for

| Surface | Nature | Examples |
|---|---|---|
| Encyclopedia + Academy | Content (static, SEO, fast, cheap) | Lookup entries, Academy modules, About |
| Interactive islands | Client state | Lookup search/filter, Donate form, scan-mode gate |
| Camera scanner (Phase 4) | Device APIs + AI | getUserMedia → barcode → AI fallback → confirm → ranked dispositions → nearest facility |
| Data | Postgres + geo (later) | ranked-disposition schema, facilities (PostGIS) |
| AI recognition | Edge inference | barcode-first, Workers AI vision fallback |
| Facility map | Geo UI | nearest recycling / transfer stations |
| Delivery | PWA | installable, camera, offline shell |

## Recommended stack

| Layer | Pick | Why |
|---|---|---|
| **Language** | **TypeScript** | Types on the item/disposition schema catch errors; vital when AI agents co-maintain the code. |
| **Framework** | **Astro** | Content-first + islands; zero-JS default; first-party on Cloudflare; incremental migration. |
| **Interactive islands** | **Svelte** (Preact/React also fine) | Smallest runtime for scanner/lookup; Astro supports all → swappable, low-stakes. |
| **Hosting / deploy** | **Cloudflare Pages** (`@astrojs/cloudflare`) | Keep the zero-cost git auto-deploy already working. |
| **Data (MVP)** | **Typed static JSON/TS in the Astro build** | The encyclopedia is read-heavy and rarely changes. No DB needed for MVP → zero cost, no pause risk, instant. |
| **Data (Phase 3 geo)** | **Supabase (Postgres + PostGIS)** | Nearest-facility queries (`<->`, spatial index). D1 has no geospatial. Introduce only when the map arrives. |
| **AI recognition** | **Cloudflare Workers AI** (Llama 3.2 11B Vision / LLaVA) | On-platform vision; ~$0.049/M input tokens (a scan ≈ fractions of a cent); called from an Astro server endpoint. |
| **Barcode scanner** | **WASM lib — `zxing-wasm`** (broad formats) or **`zbar-wasm`** (~230 KB) | ⚠️ Native `BarcodeDetector` **does not work on iOS Safari** (all iOS browsers are WebKit). A WASM lib is mandatory for iPhones. |
| **Facility map** | **Leaflet** (+ OpenStreetMap) | Lightest, no API key, ideal store-locator. MapLibre only if vector maps are wanted later. |
| **Item search** | **MiniSearch / Fuse.js** client-side → Supabase FTS later | Bounded dataset; client-side is instant and free until it grows past ~thousands. |
| **PWA** | **`@vite-pwa/astro`** | Installable + offline shell + service worker. |
| **Styling** | **Keep the existing CSS** (Share Tech Mono / AP palette) | The hand-rolled design system is distinctive — no Tailwind needed. Astro scoped styles wrap it cleanly. |

## Architecture in one line

**Cloudflare** hosts + runs compute + AI inference · **Astro** structures content &
islands · **typed static data** for MVP, **Supabase (Postgres/PostGIS)** for facility
geo later. Cloudflare-front + Supabase-data is a clean, battle-tested split.

## Pressure-test (the three worries)

1. **iOS PWA camera — works, but plan around Apple.** `getUserMedia` works in
   installed iOS PWAs now, BUT camera permission is **not persisted** (re-prompts),
   iOS 18.0 briefly broke it (fixed 18.1.1), and history is flaky. → **PWA now,
   native later** is correct; the scanner must also run in a **plain Safari tab**,
   not only when installed. No `MediaRecorder` on iOS, but we only need stills.
2. **AI recognition — cost is trivial, accuracy is the risk.** Workers AI vision is
   ~$0.049/M input tokens (a scan ≈ a fraction of a cent), sub-100 ms cold starts,
   no egress fees. The open question is *accuracy on messy real-world waste* → this
   is exactly why the flow is **barcode-first, AI as fallback, with a user confirm
   step** (per [AP Guidelines](AP_GUIDELINES.md): never guess someone into a landfill).
3. **Supabase free tier — fine, but pauses.** 500 MB DB, commercial use OK, but a
   free project **pauses after 7 days inactivity** (data preserved). → **MVP needs
   no database**; introduce Supabase only for the facility geo layer, and by then
   use a keep-alive ping or the $25/mo Pro tier.

## Alternatives considered

- **Stay vanilla HTML/JS** — great today, but the camera/PWA/map/state load will
  outgrow it. Keep it until Phase 2 begins, then adopt Astro incrementally.
- **SvelteKit** — better if this were app-*first* (auth everywhere, real-time
  dashboards). Recyclopedia is content-first with islands → Astro.
- **All-Cloudflare (D1 instead of Supabase)** — keeps one vendor, but D1 has no
  geospatial; PostGIS is the reason to bring in Supabase, and only for facilities.

## When to adopt (no rewrite for its own sake)

The current vanilla site is excellent and just shipped v0.1.1. Trigger to introduce
Astro = **start of Phase 2** (data → typed modules, app surfaces appear). Astro
adopts incrementally:

1. Port `index.html` + the CSS into Astro (homepage parity).
2. Convert **Lookup** and **Donate** into islands.
3. Move the items array to a typed `items.ts` (the [DATA_SCHEMA](DATA_SCHEMA.md) shape).
4. Add the PWA shell; build the scanner island (barcode WASM + Workers AI endpoint).
5. Add Supabase + Leaflet for the facility map (Phase 3).

A proof-of-concept lives in `poc/astro/` (separate branch) — homepage parity + a
Lookup island — to validate the approach with zero risk to the live site.

## Sources

- Cloudflare acquires Astro: <https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/>
- Astro vs SvelteKit (content-first vs app-first): <https://www.pkgpulse.com/guides/astro-vs-sveltekit-2026>
- Workers AI models + vision: <https://developers.cloudflare.com/workers-ai/models/>
- BarcodeDetector unsupported on iOS: <https://dev.to/ilhannegis/barcode-scanning-on-ios-the-missing-web-api-and-a-webassembly-solution-2in2>
- Supabase PostGIS geo queries: <https://supabase.com/docs/guides/database/extensions/postgis>
- Supabase free-tier pause: <https://supabase.com/pricing>
- Leaflet vs MapLibre: <https://blog.jawg.io/maplibre-gl-vs-leaflet-choosing-the-right-tool-for-your-interactive-map/>
