# VISION — Recyclopedia

> The north-star document for Recyclopedia. Product and roadmap decisions should
> trace back to this. The site (`recyclopedia.cc`) **is** the Recyclopedia; this
> file describes where it is going.
>
> **Domain boundary (2026-07-03):** `recyclopedia.cc` is the identification and
> local-action engine only. Academy is a separate LBG product at
> `lettucebeetgrapefruit.org`. The two share a sourced research foundation, but
> education pages are not a Recyclopedia surface. See
> [LBG Brand & Product Architecture](docs/LBG_BRAND_ARCHITECTURE.md).

A project by [Absolutely Plausible Solutions](https://absolutelyplausible.com).

---

## The core idea

Today a person *types* an item into the human-input tier to learn how to deal with it.
The ultimate Recyclopedia lets them **point a phone camera at the object** and
have the right page open automatically.

**Machine recognition is an escalating front door to the Recyclopedia — not a
separate product.** Human input comes first, then barcode recognition, then
last-resort AI vision and material identification. Every tier ends in the same
gesture: *identify → understand → act.*

## The differentiator

Every recycling app answers one narrow question: *recycle or trash?*

Recyclopedia answers a better one:

> **"What is the most grateful end for this object?"**

When the camera recognizes a thing, the app walks **down a hierarchy of
respect** and surfaces the highest-value path actually available for it —
not just whether it's recyclable.

### The Gratitude Hierarchy

```
Reuse  →  Repair  →  Repurpose  →  Donate  →  Recycle  →  Compost  →  Responsibly dispose
 (best / most respectful)                                          (last resort)
```

"Dispose" and "discard" are the **last resort**, never the default. This
hierarchy is the Absolutely Plausible philosophy made tangible, and it is
defined canonically in the [Environmental Respect Policy](ENVIRONMENTAL_RESPECT_POLICY.md).

> Note: **Donate** is a path in the Gratitude Hierarchy. The current electronics
> intake remains on this site temporarily; its destination in the LBG `.com`
> property is still an owner decision.

## The framework — four ladders, three backbones, surfaces

> This is the shared vocabulary for the whole platform. "Tier", "fallback", and
> "trickledown" are not one thing — they are **four distinct ordered systems
> ("ladders")**. Everything we build is either one of three **knowledge backbones**
> or a **surface** that presents them. Use these names everywhere.

### The four decision ladders

Each ladder is *ordered*: try the top first, fall to the next only when the one
above can't answer confidently.

1. **Recognition Ladder** — *how do we figure out what the object is?*
   `human input → barcode → AI vision + material identification`.
2. **Gratitude Hierarchy** — *what should they do with it?* (the **trickledown**)
   `reuse → repair → repurpose → donate → recycle → compost → dispose` — always show
   the **highest *available*** rung. (Canonical in the
   [Environmental Respect Policy](ENVIRONMENTAL_RESPECT_POLICY.md).)
3. **Confidence Ladder** — *where does the answer come from, and how sure are we?*
   `local rule (licensed) → our item knowledge → category default → honest "check local"`.
   Governed by the [AP Guidelines](AP_GUIDELINES.md): **never guess someone into a landfill.**
4. **Where Ladder** — *where do they physically go?*
   `specific nearby facility → generic facility type → "check local."`

**How they chain (the one model to reuse everywhere):**

```
Recognition  →  Lookup item  →  Gratitude ranking  →  Atlas "where"
 (identify)      (the "what")     (the trickledown)     (the place)
                          ⟍                       ⟋
                       all gated by the Confidence Ladder
                    (+ an Academy micro-lesson, the "why")
```

### The three knowledge backbones

| Backbone | Owns | Answers |
|----------|------|---------|
| **Lookup** | item knowledge | *what is this + its grateful paths?* |
| **Atlas** | geography + provenance | *where do I act, is it accepted locally, who says so?* |
| **Academy** | concepts + macro/credibility | ***why*** *+ the credibility story* |

Every complete answer is a **Lookup item × an Atlas location, gated by Confidence.**

- **Lookup** — the searchable encyclopedia (60 → 500+ items), each with a
  `gratitude_note` + ranked dispositions. **One dataset, two doors:** the search box
  and the camera (Lens) are both inputs into it — never a separate database.
- **Atlas** — one layered map with **three layers**: *Facilities* (**all disposition
  endpoints**, not recycling-only → Where Ladder), *Jurisdictions + Local Rules*
  (→ Confidence Ladder), and *Organizations & Sources* (a linked **provenance graph** —
  every facility and rule traces to a typed source org). Two surfaces: the user-facing
  actionable map, and the **provenance infographic** shown in Academy.
- **Academy** — the "why" layer; a destination *and* a library that injects
  contextual micro-lessons into Lookup and Lens. Hosts the public Atlas provenance
  infographic and the macro/credibility sources.

### The surfaces (doors)

`Search box · Lens · The Map (Atlas) · Donate · Academy pages`

- **Lens** — the **orchestrating front door** (Phase 4). Owns no data; it runs all
  four ladders over all three backbones in a single gesture.
- **Donate** — a rung-4 **action surface**: a "where to donate" Atlas view (all
  categories) + AP's own intake form (AP as a donation node, electronics-only).
  ⚠️ **Placeholder — AP is not accepting donations during development; revisit later.**

## Purpose · Big picture · Ultimate goal

- **Purpose (why we exist):** Make the most respectful end-of-life choice for any
  object the *easiest* choice — by letting anyone point a camera at a thing and
  instantly know the most grateful way to give it its next life.

- **Big picture (the world we want):** A world where nothing is thrown away in
  ignorance — where every person carries the whole Recyclopedia in their pocket
  and is guided, kindly, to honor the materials and labor embodied in everything
  they hold.

- **Ultimate goal (north star):** The camera becomes the front door to the
  Recyclopedia: **point → identify → receive a ranked, locally-aware path**
  grounded in the [Environmental Respect Policy](ENVIRONMENTAL_RESPECT_POLICY.md)
  and the [AP Guidelines](AP_GUIDELINES.md).
  **North-star metric: objects correctly diverted from landfill.**

## Guiding principles

1. **Gratitude over guilt.** We thank people for caring; we never shame them.
2. **Never guess someone into a landfill.** When unsure, we say so and offer the
   safest respectful option — we do not fabricate confidence. (See [AP Guidelines](AP_GUIDELINES.md).)
3. **The hierarchy first, recycling second.** Recycling is one rung, not the goal.
4. **Local truth matters.** The right answer depends on where you are; we move
   toward location-aware rules.
5. **Same platform, same ethos.** Built on the existing Cloudflare stack to keep
   it fast, private, and near-zero-cost.

## Supporting pillars

Two pillars from the founder's business draft (Google Drive, 2026-06) support the
camera north star:

- **National Facility Registry & Map → now the Atlas backbone.** A centralized,
  searchable registry and map of disposition endpoints across the United States. This is
  what makes the "Where" in every recommendation *locally true* — the camera tells you
  the best rung, the Atlas tells you the nearest real place to act on it. (Larger than
  the earlier "ZIP locator" idea; merged with the organizations/sources registry into the
  single layered **Atlas** described above.)

- **Credible, globally-aware knowledge base.** A 500+ item database prioritized by
  urgency and global recycling need, informed by leading waste organizations
  (World Bank, Yale EPI, NRDC, ISWA, UNEP). See
  [Reference & Partner Organizations](REFERENCE_ORGANIZATIONS.md). This is the
  sourcing backbone behind the [Environmental Respect Policy](ENVIRONMENTAL_RESPECT_POLICY.md)'s
  "no greenwashing" / citable-claims standard.

## How we get there (delivery & recognition)

- **Delivery: PWA now, native later.** Ship as an installable Progressive Web App
  using the browser camera — one codebase, no app stores, on the current
  pure-HTML / Cloudflare Pages stack. Wrap/port to native once usage justifies it.

- **Recognition: the Recognition Ladder.** Start with **human input**, then try a
  barcode for an exact product match, then use **visual AI plus material
  identification** only as the last resort. For the vision tier, the working plan is
  **Cloudflare Workers AI open-vocabulary vision for the MVP** (zero training, broad
  coverage, same platform we deploy to), with **YOLO / on-device custom models as a
  later optimization** for cost and offline use once we have labeled data.
  ⚠️ **Provisional — an explicit open question pending a research dive; see below.**

- **Scan modes: a pre-capture gate.** Before the camera opens, the user declares
  the capture type — **(1) one item**, **(2) multi-material**, or **(3) pile/hoard**
  — so we never guess. **MVP ships Mode 1 only**; Modes 2–3 are designed-for but
  deferred. (Details in [DATA_SCHEMA.md](DATA_SCHEMA.md).)

- **Every item earns a real category — no "Other."** The taxonomy is a complete,
  exhaustive set of 11 disposal-stream categories. A junk-drawer category would
  break the encyclopedia's promise that *nothing* goes unlisted.

## Open questions (to revisit with deeper research)

- **Recognition engine — REVISIT.** The Recognition Ladder order is adopted, but the
  Tier 3 visual-AI engine is *not* a settled decision. **Workers AI for MVP / YOLO
  later** is the working plan; a founder's Drive proposal favored **YOLO + TrashNet** as
  primary — but TrashNet alone is too coarse (~6 material buckets, not item-level), so it
  can fine-tune, not power, recognition. Needs a deeper research dive: accuracy of vision
  models on real-world waste, per-scan cost at scale, on-device vs. cloud, privacy, and
  offline behavior. Do not treat as final.
- **"Recyclable vs. not" is not our answer.** Any framing (incl. earlier draft docs)
  that reduces the result to a recyclable/non-recyclable binary is **superseded** by the
  Gratitude Hierarchy: recognition outputs an item/category; the answer is a *ranked
  path*, never a yes/no.
- **Data model evolution.** Lookup items today carry a single `status`
  (curbside / drop-off / hazardous / …). The camera flow needs each object to map
  to a **ranked list of dispositions** following the Gratitude Hierarchy. This
  shapes the Phase 2 Supabase schema. **How we source all of this is set out in
  [DATA_STRATEGY.md](DATA_STRATEGY.md)** (the four-layer build/license/aggregate model).
- **Local rules.** How we source and store municipality/state-level rules so the
  ranked path is locally accurate.
- **Naming.** Working name for the feature: **Recyclopedia Lens** (point it, the
  encyclopedia opens to the right page). Not final.
- **The 500+ item database — IN PROGRESS.** The 500+ item set is still being
  built; this repo currently has ~60 items in `js/recyclopedia.js`. Open: where it
  is assembled and how it imports into the (ranked-disposition) schema.
- **Facility data sourcing.** How we build and keep current the national registry/
  map of recycling & transfer stations (data source, licensing, update cadence).

## Status

- Human-input identification and ranked paths are live in v0.2.0 alpha.
- Barcode, vision/material identification, and local resolution are forward-looking.
