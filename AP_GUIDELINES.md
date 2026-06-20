# Absolutely Plausible Guidelines

> **Status: STUB / canonical reference.** Referenced as canon by
> [VISION.md](VISION.md). The full guidelines are to be written; the operating
> standard below is stable enough to cite now.

The operating standard for everything built under
[Absolutely Plausible Solutions](https://absolutelyplausible.com), including
Recyclopedia. Where the [Environmental Respect Policy](ENVIRONMENTAL_RESPECT_POLICY.md)
defines the *ethic* (why), these Guidelines define the *operating standard* (how
we behave).

## How we behave

- **Never guess someone into a landfill.** When the app is not confident about an
  item, it says so plainly and offers the safest respectful option — it never
  fabricates confidence to look smart.
- **Accuracy over completeness.** A correct "we're not sure, here's the safe path"
  beats a confident wrong answer.
- **Gratitude in tone.** Thank, don't shame. Encourage the next better choice.
- **Plain, kind language.** Clear instructions a hurried person can follow.
- **Show the why.** Pair the recommendation with the reason, so people learn and
  trust it.
- **Respect privacy.** Camera images and location are used to help in the moment,
  not to surveil.

## Quality bar

- Recommendations trace to the [Environmental Respect Policy](ENVIRONMENTAL_RESPECT_POLICY.md)
  hierarchy and, where possible, to a citable source.
- Local accuracy is preferred; when local rules are unknown, we say "check local."
- Safety/hazardous handling is never softened for convenience.

## Confidence thresholds (the Confidence Ladder)

"Never guess someone into a landfill" is operationalized as the **Confidence Ladder**:
the answer comes from the most trustworthy source available, and we degrade *honestly*
rather than fabricate certainty.

- **Recognition confidence.** The visual-AI rung returns a label with a confidence score.
  Below `confidence_floor` (default **0.6**, see [DATA_SCHEMA.md](DATA_SCHEMA.md)) we do
  **not** assert an identification — we fall to manual search (Lookup), then to the
  **"not sure" / ask-a-human** card. Above it, we still **confirm with the user** before
  acting.
- **Answer sourcing.** Prefer a licensed **local rule**; absent that, our **item
  knowledge**; absent that, a **category default**. Where local rules are unknown or
  vary, set `local_variance` and show **"check local"** — that is the *correct* answer,
  not a gap.
- **Safety override.** For hazardous items, when confidence is low we surface the safe
  handling path regardless — safety is never traded for a slicker answer.

## To be defined

- Brand voice specifics and copy patterns.
- Review process for added items and claims.
- Accessibility standards.

---
*Stub created as a referenceable canon. Supersede freely as the full guidelines are authored.*
