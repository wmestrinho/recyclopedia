# LBGA — Lettuce Beet Grapefruit Academy · Sketch

> **Status:** PROPOSAL — drafted 2026-07-03 for Luiz's review. Structure + naming
> pass for the school at **lettucebeetgrapefruit.org**, per
> [LBG_BRAND_ARCHITECTURE.md](LBG_BRAND_ARCHITECTURE.md). Nothing here is built
> yet; the naming section needs Luiz's picks before scaffolding starts.

## What LBGA is

The teaching and school web application of the Lettuce Beet Grapefruit family.
Free, open to all ages, no commercial use (CC BY-NC-SA 4.0 content, AGPL-3.0
code — same dual license as Recyclopedia). It absorbs `recyclopedia.cc/academy`
and **remains the "Academy" knowledge backbone from VISION.md**: the "why"
layer that both stands alone as a school *and* feeds contextual micro-lessons
into the Recyclopedia engine (Lookup today, Lens later). Moving domains does
not break the backbone contract.

**Voice:** gratitude over guilt — "Let us be grateful," literally.

## Naming pass (Luiz picks)

The brand is a meal of produce. Three candidate schemes:

### Scheme A — "The Menu" (recommended)

The school catalog is **The Menu**; a course of study is literally a **Course**
(the pun does the work — no forced vocabulary):

| Thing | LBGA name | Note |
|---|---|---|
| Course catalog | **The Menu** | homepage centerpiece |
| Intro/gateway courses | **Starters** | short, zero-prerequisite |
| Core curricula | **Mains** | the six migrated modules live here |
| Short standalone lessons | **Sides** | micro-lessons; same units the engine embeds |
| Fun capstones / projects | **Desserts** | e.g. build-and-fix workshop preludes |
| Quiz | **Taste Test** | existing Quiz island, renamed label only |
| Learner | **Guest** | "everyone is welcome at the table" |

### Scheme B — "The Garden" (grow metaphor)

Tracks = **Plots**, courses = **Crops**, lessons = **Seeds**, quizzes =
**Harvest checks**, learners = **Growers**. Warmer, but more vocabulary to
teach the visitor.

### Scheme C — Plain

Tracks / Courses / Lessons / Quizzes, no metaphor. Safest, least brand.

> In all schemes, **code and URLs stay plain** (`/courses/`, `/lessons/`,
> `quiz`): the metaphor lives in UI copy only, so renames never break links.

## Site structure (IA)

```
lettucebeetgrapefruit.org
├── /              Home — the school front door + The Menu (catalog)
├── /courses/…     Course page → lesson pages (content collection, quizzes inline)
├── /library       Research Library — the shared research foundation:
│                  whitepaper volumes (once cleared), sources, the Atlas
│                  provenance infographic (per VISION.md, Academy hosts it)
├── /philosophy    Gratitude Hierarchy, Environmental Respect Policy, no-greenwashing
├── /about         LBGA story · family links (Recyclopedia engine, .com umbrella)
└── footer         AP attribution + CC BY-NC-SA + EDUCATIONAL PURPOSES ONLY
                   (workspace footer standard, license slot)
```

Donate Electronics does **not** move here — it goes to the `.com` storefront
(donations feed the workshops; teaching *about* e-waste stays here).

## Curriculum v1 (migrates from recyclopedia)

- Track "Citizen Science & Action": 1.1 Hidden History of Your Trash ·
  1.2 Smartphone Sorting Guide · 1.3 Zero-Waste Micro-Habits · 5 The Myths — Debunked
  (with their Taste Tests / quizzes)
- Planned modules from the old Academy grid: Electronics & E-Waste · Hazardous
  Materials · Zero Waste Lifestyle · Local Regulations
- New source material: the whitepaper series (US / Brazil volumes) — becomes
  Library content + course seeds once Luiz clears it for CC release

## Tech proposal

- **New repo** (proposal: `lbg-academy`) — same stack as recyclopedia: Astro +
  TypeScript, Svelte islands (Quiz ports as-is), content collections, Cloudflare
  Pages, $0/month. Scaffolded to workspace baseline (VERSION, validate script,
  HANDOFF, AGENTS/CLAUDE.md).
- **Brand tokens** per the workspace standard: LBG palette from the produce
  itself — lettuce green / beet crimson / grapefruit pink as the accent trio on
  the shared AP token contract. Share Tech Mono stays.
- **Micro-lesson syndication** (backbone contract): lessons carry stable IDs so
  the engine can deep-link/embed them; a lesson moving from recyclopedia.cc to
  .org is a redirect, never a dead link.
- **Later:** Supabase accounts/progress (same instance planned for engine
  Phase 2), only when a real need appears.

## Rollout (one property at a time, within the property)

1. **A — Scaffold**: repo + baseline + landing "Menu" page. Previewable before
   DNS; wired to lettucebeetgrapefruit.org the moment the zone is Active.
2. **B — Migrate**: 4 live lessons + quizzes move over; recyclopedia `/academy`
   pages get per-lesson redirect stubs.
3. **C — Cutover**: recyclopedia.cc/academy → 301 to the .org; Academy notice
   removed from recyclopedia.
4. **D — Library**: whitepaper volumes + provenance infographic (needs Luiz's
   content clearance).
5. **E — School features**: progress, printable certificates, workshop
   tie-ins with the .com calendar.

## Canon reconciliation note (flag, not a decision)

VISION.md's **Recognition Ladder** is `barcode → visual AI → manual search →
ask-a-human`; Luiz's 2026-07-03 architecture statement (and the current
recyclopedia.cc homepage) presents `human input → barcode → AI vision`. Same
rungs, different order. Reconcile with Luiz which ordering is canon before the
Lens build — VISION.md itself marks the ladder *provisional*.

## Open for Luiz

1. Naming scheme — A / B / C (or remix)
2. Repo name — `lbg-academy` proposed
3. Palette — confirm the lettuce/beet/grapefruit accent trio
4. Whitepaper clearance timing (gates Rollout D, not A–C)
