# LBGA — Lettuce Beet Grapefruit Academy · Sketch

> **Status:** IMPLEMENTED IN v0.3.0 ALPHA — structure and naming approved by Luiz
> 2026-07-04. The school at **lettucebeetgrapefruit.org** uses Scheme A ("The
> Menu") and the Claude Design warm-theme handoff.

## What LBGA is

The teaching and school web application of the Lettuce Beet Grapefruit family.
Free, open to all ages, no commercial use (CC BY-NC-SA 4.0 content, AGPL-3.0
code — same dual license as Recyclopedia). It absorbs `recyclopedia.cc/academy`
and **remains the "Academy" knowledge backbone from VISION.md**: the "why"
layer that both stands alone as a school *and* feeds contextual micro-lessons
into the Recyclopedia engine (Lookup today, Lens later). Moving domains does
not break the backbone contract.

**Voice:** gratitude over guilt — "Let us be grateful," literally.

## Naming pass (decided)

The brand is a meal of produce. Three candidate schemes:

### Scheme A — "The Menu" (selected)

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

## Technical implementation

- **Current deployment:** one Astro/Cloudflare Pages project with host-aware
  middleware. `.org` serves `/academy`, `.com` serves `/lbg`, and
  `recyclopedia.cc` remains the engine. A later repo split remains possible.
- **Brand tokens:** route-scoped warm theme from the 2026-07-04 Claude Design
  handoff: oat paper, lettuce `#6B9A3A`, beet `#8A2450`, grapefruit `#E4562E`,
  Newsreader display type, and Hanken Grotesk UI type.
- **Taste Test:** production Svelte island uses the recommended card interaction
  with progress, streak, feedback, results ring, keyboard focus, and retake.
- **Micro-lesson syndication** (backbone contract): lessons carry stable IDs so
  the engine can deep-link/embed them; a lesson moving from recyclopedia.cc to
  .org is a redirect, never a dead link.
- **Later:** Supabase accounts/progress (same instance planned for engine
  Phase 2), only when a real need appears.

## Rollout (one property at a time, within the property)

1. **A — Scaffold: DONE.** Warm-theme Academy landing + The Menu.
2. **B — Migrate: DONE.** Four live lessons + upgraded Taste Tests.
3. **C — Cutover: DONE.** Host middleware, apex + `www` custom domains, DNS,
   SSL, and live content verification completed 2026-07-04.
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

## Still open

1. Whitepaper clearance timing (gates Rollout D, not A–C)
2. Whether the temporary shared repo should split after the domain launch
