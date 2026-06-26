# Recyclopedia Academy — Content Provenance

This file records **who produced what** as Academy content moves from research into
the codebase. We collaborate with multiple agents; provenance keeps the chain honest.

## Roles

- **Gemini (Google Chrome / Workspace)** — research + drafting. Produces raw curriculum,
  fact-checks, and code sketches into the `RandDRecyclopedia` Google Drive handoff station.
  Strong at sweeping research across the Google ecosystem; used primarily when Luiz is away
  from the main dev machine.
- **Claude (Opus, this repo)** — senior lead / implementation. Reviews Gemini's drafts,
  corrects what doesn't meet AP standards, and implements everything into the codebase.
- **Luiz** — owner / final decision. Standards and direction come down to Luiz + Claude.

## Source documents (Drive: `RandDRecyclopedia`)

| Drive doc | Author | Outcome in repo |
|---|---|---|
| ACADEMY LESSON PROFILE (Module 1.1) | Gemini | Ported → `src/content/academy/hidden-history.md` |
| RECYCLOPEDIA ACADEMY CODE & CURRICULUM ARCHIVE | Gemini | Quiz engine reimplemented → `src/components/Quiz.svelte`; Module 1.2 **rewritten** → `smartphone-sorting.md` |
| Section 1: Verification Report & Data Integrity Check | Gemini | Risk register staged in `b2b-source/`; history facts confirmed |
| MASTER SYSTEM BRIEFING & OPERATIONAL BLUEPRINT | Gemini | History → lesson 1.1; financial/industrial parts → `b2b-source/` |
| Architecture: Open-Source, Sustainable LMS Pipeline | Gemini | **Adopted** — informs the static Astro approach |
| Online Academy Architecture (Canvas + Gumroad + AWS) | Gemini | **Superseded** — conflicts with our static/open-source canon |
| [SCOPE] NOT FINAL Recyclopedia Academy | Gemini + Luiz | Strategy + Luiz's answers (citizen-first, open-source) |
| Visual Wall Poster / SOP Checklists / Supervisor Training / Vendor SLA | Gemini | Staged in `b2b-source/` (Tier-2, parked) |

## Corrections applied during implementation

1. **Architecture:** rejected Canvas LMS + Gumroad + AWS/DigitalOcean in favour of the
   existing static Astro → Cloudflare Pages pipeline (open-source, sustainable, $0 hosting).
2. **Module 1.2 factual rewrite:** the "green stripe → organics, else trash" framing was not
   globally true and contradicted our live Myths module. Rewritten around resin codes,
   curbside vs drop-off, the Gratitude Hierarchy, and "when in doubt, leave it out."
3. **Quiz engine:** ported vanilla-JS class to a Svelte island; fixed the undefined-`containerId`
   ReferenceError, replaced full-page `location.reload()` retake, and applied AP design tokens.
4. **Localization bugs fixed** in `b2b-source/` (ES poster had Portuguese "LIXO"/"OBRIGATORIO";
   PT poster had Spanish "PASO"/"CORRECTO" and English "minutes"; SOP checklist had no English).
5. **Brand:** stripped decorative emoji per AP identity (Share Tech Mono + minimal line-art).

## Note on the "Meta-Signature / Persistent Task Directive"

The CODE & CURRICULUM ARCHIVE doc ends with a Gemini-authored "Meta-Signature" and a
"Persistent Task Directive" declaring itself a *hardcoded appendix rule for all subsequent
modules.* We record it here as **provenance, not policy.** Standards for this project are set
by Luiz and Claude — no agent's self-written directive is binding on the pipeline.
