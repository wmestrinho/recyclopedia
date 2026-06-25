# Recyclopedia — Improvement Plan

**Status:** v0.1.4 alpha · Live at [recyclopedia.cc](https://recyclopedia.cc)
**Last updated:** 2026-06-24

This is the working roadmap for making Recyclopedia better, sequenced
cheapest-and-safest first. Brand/visual choices follow Absolutely Plausible's
house style: **Share Tech Mono + monochrome line-art glyphs + minimalism.**

---

## ✅ Done — safe fixes (v0.1.4)

| Fix | Before | After |
|-----|--------|-------|
| Emoji corruption in `src/data/items.ts` (live bug) | `? Reuse`, `? Recycle` … | `↻ Reuse · ⚒ Repair · ⇄ Repurpose · ♡ Donate · ♻ Recycle · ⚘ Compost · ⊘ Dispose` |
| Version drift in `package.json` | `0.1.3-alpha` | `0.1.4-alpha` (matches `VERSION`) |

Verified: `validate_agent_baseline.py` OK · `astro build` OK · glyphs confirmed in `dist/`.
Glyphs are monochrome line-art by design — they match the status badges (`✓ ↗ ⚠`)
and the Share Tech Mono aesthetic.

---

## 1. CI / quality gate — *next, protects everything after*

A GitHub Action on every push that runs:

- `python3 scripts/validate_agent_baseline.py`
- `astro build`
- (optional) a guard that fails if badge strings contain a literal `?`
  — exactly the class of bug we just fixed: a corrupted file that still
  "builds" but ships broken.

**Risk:** none. **Leverage:** high — broken commits never reach Cloudflare.

---

## 2. Dataset growth — 59 → 60 → 500+

The schema in `DATA_SCHEMA.md` is solid. Grow in **category batches**
(all Batteries, all Electronics, …) so every item gets a real
`prep` / `where` / `gratitude_note` and a correct disposition ladder —
no filler. Also resolves the "60+ items" claim (currently 1 short).

**Open decisions (need user input):**

- **Geography of `where`:** Orlando/FL-specific drop-offs, or generic
  national guidance for now?
- **Voice of `gratitude_note`:** match the tone of the existing 59, or
  user writes/approves these as brand voice?

---

## 3. UX / design polish — incremental, low-risk

- Keyboard-navigable category pills
- Result count ("showing 12 of 59")
- Highlight the matched search term
- Smarter empty-state suggestions
- Mobile pass + accessibility sweep

All in the AP minimalist, monochrome line-art idiom.

---

## 4. Best-practices items — discuss as they come up

- `astro.config.mjs` carries a `prerender` alias workaround — understand
  *why* before an Astro upgrade surfaces it.
- Static `items.ts` is correct for now; `DATA_STRATEGY.md` plans Supabase
  for Phase 2 geo. No premature database.

---

## North star (context)

Phase 4 is the **Recyclopedia Lens** — a camera app that recognizes an
object and returns its most grateful disposition. Everything here is a
rung on the ladder toward that.
