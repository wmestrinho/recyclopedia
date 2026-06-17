# VISION — Recyclopedia

> The north-star document for Recyclopedia. Product and roadmap decisions should
> trace back to this. The site (`recyclopedia.cc`) **is** the Recyclopedia; this
> file describes where it is going.

A project by [Absolutely Plausible Solutions](https://absolutelyplausible.com).

---

## The core idea

Today a person *types* an item into **Lookup** to learn how to deal with it.
The ultimate Recyclopedia lets them **point a phone camera at the object** and
have the right page open automatically.

**The camera is the fastest front door to the Recyclopedia — not a separate
product.** It unifies the three areas we already have (Academy, Lookup, Donate)
into a single gesture: *point → understand → act.*

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

> Note: **Donate** is already a path we have built (Donate Electronics). The
> camera unifies it with Lookup and Academy.

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

- **National Facility Registry & Map.** A centralized, searchable registry and map
  of recycling and transfer stations across the United States. This is what makes
  the "Where" in every recommendation *locally true* — the camera tells you the
  best rung, the registry tells you the nearest real place to act on it. (Larger
  than the earlier "ZIP locator" idea; treat as a first-class pillar.)

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

- **Recognition: barcode-first + AI fallback (for now).** Scan a barcode/label
  for an exact product match when one is present; fall back to visual AI
  recognition for loose objects. Cloudflare **Workers AI** vision models let the
  recognition layer live on the same platform we already deploy to.
  ⚠️ **This is a provisional choice and an explicit open question — see below.**

- **Scan modes: a pre-capture gate.** Before the camera opens, the user declares
  the capture type — **(1) one item**, **(2) multi-material**, or **(3) pile/hoard**
  — so we never guess. **MVP ships Mode 1 only**; Modes 2–3 are designed-for but
  deferred. (Details in [DATA_SCHEMA.md](DATA_SCHEMA.md).)

- **Every item earns a real category — no "Other."** The taxonomy is a complete,
  exhaustive set of 11 disposal-stream categories. A junk-drawer category would
  break the encyclopedia's promise that *nothing* goes unlisted.

## Open questions (to revisit with deeper research)

- **Recognition engine — REVISIT.** Barcode-first + AI fallback is the starting
  assumption, *not* a settled decision. Needs deeper research on: accuracy of
  Workers AI vision models on real-world waste, per-scan cost at scale,
  on-device vs. cloud trade-offs, privacy, and offline behavior. Do not treat as
  final.
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

- This is a **forward-looking vision**, not yet built. Current shipped product is
  v0.1.0 alpha (Academy, Lookup, Donate Electronics) — see `README.md`.
- The camera feature is tracked as **Phase 4** on the roadmap.
