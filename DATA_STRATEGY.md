# DATA STRATEGY — Recyclopedia

> How Recyclopedia sources, owns, and assembles its data. Companion to
> [VISION.md](VISION.md). Decisions here gate Phase 2 (database) and Phase 4
> (Recyclopedia Lens). Source landscape verified via research, 2026-06-16.

## The core realization

What Recyclopedia needs is **not one database — it is four layers**, each owned
by a different kind of organization for a different reason. No single source
combines them, because **no one else organizes recycling around *ranked
dispositions + gratitude*** (the [Gratitude Hierarchy](ENVIRONMENTAL_RESPECT_POLICY.md)).
Everyone else answers the narrow question "recycle: yes/no." That gap *is* the
product. The data being scattered is the opportunity, not the obstacle.

| Layer | The question it answers | Who owns it today |
|-------|-------------------------|-------------------|
| **1. Item knowledge** | "What is this, and what are its respectful options?" | *Nobody, our way* — this is our IP |
| **2. Local rules** | "Is item X accepted in ZIP Y?" | The Recycling Partnership; Earth911 (gated) |
| **3. Facility map** | "Where is the nearest place to act?" | EPA + ~19,000 municipalities (fragmented) |
| **4. Macro / credibility** | "What is the global picture?" | World Bank, UNEP, Yale — free, open |

## The decision: build vs. license vs. aggregate (per layer)

The guiding principle: **own the thin, high-value editorial layer; aggregate or
license the heavy, fast-changing operational layers.** Do not sign up to manually
maintain 9,000 municipal rulebooks — that is a whole company by itself.

| Layer | Decision | Rationale |
|-------|----------|-----------|
| **1. Item knowledge** | 🔨 **BUILD & OWN** | Our IP, voice, and ranked dispositions. ~500 items is hand/agent-buildable. Nobody sells "grateful ranked dispositions." |
| **2. Local rules** | 🤝 **LICENSE / PARTNER (later)** | 9,000+ programs change weekly; maintaining it *is* a company (it's TRP's). Until licensed, answer honestly with **"check local."** |
| **3. Facility map** | 🔧 **AGGREGATE** | Seed from free **EPA FRS** + municipal open data + Google Places (retail drop-offs). Build a *pipeline*, not the data. |
| **4. Macro / credibility** | 📎 **CITE** | Pull World Bank / UNEP / Yale openly. Backs Academy + "no greenwashing." Never blocks a user. |

The **ranked-disposition schema** (Phase 2) is the spine all four layers normalize
into. Lock the schema before importing the 500 items, or we import twice.

## The "check local" stance

Per [AP Guidelines](AP_GUIDELINES.md) ("never guess someone into a landfill"),
saying *"recyclability varies here — confirm with your local program"* is the
**correct** answer until layer 2 is licensed. A confident wrong "yes" is worse
than an honest "check local." This is a feature of the ethic, not a gap.

## Source landscape (researched 2026-06)

### Usable now / free
- **EPA Facility Registry Service (FRS)** — free, open, government. 41,000+
  facilities (landfills, transfer stations, MRFs, composting) via Data.gov. Raw
  and regulatory-flavored (won't list "Best Buy takes batteries"), but the free
  backbone for layer 3. <https://www.epa.gov/enviro/facility-registry-service-frs>
- **World Bank — What a Waste 2.0** — global stats, **CC BY 3.0 IGO (free reuse)**,
  CSV download. Layer 4 / Academy. <https://datatopics.worldbank.org/what-a-waste/>
- **Municipal open data** (e.g. Data.gov "recycling", city portals) — patchwork,
  per-city, inconsistent schemas. Useful for seeding specific metros.
- **Google Places API** — for consumer/retail drop-off points (paid per call).

### License / partnership targets (layer 2 — the hard part)
- **The Recycling Partnership — Recycle Check / National Recycling Database** —
  gold standard: **9,000+ community programs, real-time localized rules**. Powers
  How2Recycle Plus. B2B partnership platform, no public dev API — negotiate.
  <https://recyclingpartnership.org/recyclecheck/> · <https://recyclingpartnership.org/data/>
- **Earth911 Search API** — biggest US directory (350+ materials, ~800k listings),
  real REST/JSON API, but **access is gated** (request a key) and terms are dated.
  Covers layers 2+3 as a licensed feed. <https://api.earth911.com/>

### Ruled out / cautions
- **RecycleNation API** — **discontinued.** Not usable programmatically.
- **Scraping** any of the above violates ToS — partnerships/APIs are the clean,
  business-safe path. No scraping.

### Recognition datasets (Phase 4 — informs, doesn't power)
- **TrashNet** (6 categories), **TACO** (60 litter categories, in-the-wild),
  **OpenLitterMap** — small and *litter*-focused. They classify trash *categories*,
  not specific consumer products. **This confirms barcode-first:** visual AI alone
  won't reliably tell a #5 tub from a #6 tub. Useful for benchmarking/fine-tuning
  only. <https://github.com/AgaMiko/waste-datasets-review>

## Next steps

1. **Design the ranked-disposition schema first** — the spine everything ingests
   into. Gate for Phase 2.
2. **Outreach (owner-only):** contact **Earth911** and **The Recycling
   Partnership** for partnership/API terms — this decides whether layer 2 is
   "license now" or "defer behind check-local." See HANDOFF.
3. **Prototype EPA FRS ingestion** into the facility schema (layer 3) once the
   schema exists.

---
*Reference org contacts: [REFERENCE_ORGANIZATIONS.md](REFERENCE_ORGANIZATIONS.md).*
