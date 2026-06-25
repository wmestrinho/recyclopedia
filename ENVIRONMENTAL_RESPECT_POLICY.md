# Environmental Respect Policy

> **Status: CANONICAL — source of truth.** This is the single document that
> Recyclopedia's content derives from. `gratitude_note`s, item acceptance calls,
> and copy all **pull from here**. Referenced as canon by [VISION.md](VISION.md),
> [AP_GUIDELINES.md](AP_GUIDELINES.md), and [DATA_SCHEMA.md](DATA_SCHEMA.md).

A policy of [Absolutely Plausible Solutions](https://absolutelyplausible.com),
governing how Recyclopedia treats objects, materials, and the people who use it.

## The ethic

Every object carries embodied materials, energy, and human labor. Discarding it
is the **last** form of respect we can offer, not the first. Recyclopedia exists
to help people give each object the most grateful next life that is actually
available to it.

We lead with **gratitude, not guilt.** A person reaching for this tool already
cares; our job is to make the respectful choice the easy one.

## The Gratitude Hierarchy

We always recommend the **highest available rung** for a given object:

| Rung | Meaning |
|------|---------|
| 1. **Reuse** | Keep using it, as-is, for its purpose. |
| 2. **Repair** | Fix it so it can keep being used. |
| 3. **Repurpose / Upcycle** | Give it a new use or higher-value form. |
| 4. **Donate / Gift** | Pass it to someone who can use it (e.g. Donate Electronics). |
| 5. **Recycle** | Return its materials to the supply chain. |
| 6. **Compost / Rot** | Return organics to the soil. |
| 7. **Responsibly dispose** | Last resort — safe, lawful disposal (incl. hazardous). |

"Dispose" and "discard" are rung 7 of 7 — never the default answer.

---

## The 100% Sustainable Zero-Waste Policy

> What Absolutely Plausible stands for, declared plainly. Every item, note, and
> recommendation in Recyclopedia must be consistent with these.

- **Nothing is "thrown away" in ignorance.** Every object gets a named, real path —
  there is no "Other," no junk drawer, no shrug. (See the 11-category taxonomy in
  [DATA_SCHEMA.md](DATA_SCHEMA.md).)
- **The highest available rung wins.** We recommend the most grateful path that
  actually exists for that object, in that place — not the most convenient one.
- **Refuse and reduce come before any rung.** The most sustainable object is the
  one never made. When an item's honest best answer is "don't buy the next one,"
  we say so — kindly.
- **Reuse and repair outrank recycling.** Recycling is rung 5 of 7, not the goal.
  Keeping a thing whole and in use honors far more embodied value than melting it down.
- **Honor embodied value.** Material, energy, and human labor deserve acknowledgment
  in how we speak about every object.
- **Local truth matters.** The respectful path depends on local infrastructure and
  law. When we don't know the local rule, we say **"check local"** — that is the
  correct answer, not a gap.
- **Safety is non-negotiable.** Hazardous items follow safe, lawful handling even
  when that means rung 7. We never soften safety for a slicker answer.
- **No greenwashing.** We never overstate recyclability or impact. Claims trace to a
  citable source where one exists.
- **Gratitude over guilt, always.** We thank people for caring. We never shame.
- **Privacy is respect, too.** Camera images and location help in the moment; they
  are not used to surveil. (See [AP_GUIDELINES.md](AP_GUIDELINES.md).)

## Not accepted as sustainable behaviour

> The explicit "no" list. These are framed as anti-patterns we name plainly so the
> app never quietly endorses them. Each is stated simply; the kind reframe (what to
> do instead) is the job of the `gratitude_note` and the recommendation.

- **Wishcycling** — tossing non-recyclables in the bin "hoping" they get recycled.
  It contaminates whole loads and sends *more* to landfill. We tell the truth instead.
- **Landfill-as-default** — reaching for the trash before checking for a higher rung.
- **Single-use-by-default** — choosing disposable when a reusable exists, as a habit.
- **Greenwashing** — labels, claims, or vibes of sustainability without substance.
- **"Recyclable" as the finish line** — treating recycling as success while ignoring
  reuse/repair/donate above it.
- **Downcycling sold as recycling** — implying a one-way quality drop is a closed loop.
- **Unsafe DIY disposal** — puncturing pressurized cans, pouring chemicals/oil down
  drains or onto soil, burning waste, mixing hazardous streams.
- **Curbside contamination** — putting bagged recyclables, food-soiled paper, plastic
  film, or tanglers (cords, hoses) in the curbside bin where they jam or spoil loads.
- **Data-careless e-waste** — recycling or donating devices without wiping personal data.
- **Export-and-forget** — offshoring waste as a "solution" without accountability.
- **Hoarding as virtue** — keeping broken, unusable things indefinitely instead of
  routing them to a real grateful path.

> This list is living. Add a bullet when a new behaviour needs naming; never delete
> one without a reason recorded in the commit.

---

## `gratitude_note` — voice spec

> The `gratitude_note` is the **voice of the Gratitude Hierarchy, spoken to the
> object.** It is the single line that makes Recyclopedia answer *"what is the most
> grateful end for this?"* instead of *"recycle: yes/no."* It renders in the Lookup
> card today and the Lens scan card later ([DATA_SCHEMA.md](DATA_SCHEMA.md):
> *"object-directed; shown after confirm"*). **Write every note from this spec — do
> not invent notes item-by-item from scratch.**

**The pattern — one sentence, ~8–16 words, doing three things:**

1. **A material truth** — say something *true and specific* about the object's
   substance, value, or behaviour in the waste stream. (Lead with this.)
2. **A gratitude reframe** — honor the embodied value; personify the material; never
   shame the person.
3. **A kind nudge** — end pointing toward the most grateful *available* rung for it.

**Rules:**

- Object-directed, warm, plain. A hurried person should feel thanked, not lectured.
- Even a rung-7 ("trash") item earns a kind reframe — usually a *refuse/reduce* nudge.
- One sentence. No exclamation-mark cheerleading. An em dash to pivot is on-brand.
- Must be consistent with the Zero-Waste Policy and the "not accepted" list above.
- Never overstate (no greenwashing): if it's barely recyclable, say so honestly.

**Canonical examples (lifted from the existing dataset):**

| Item | Note | Why it works |
|------|------|--------------|
| Aluminum can | *"Endlessly reborn — this can comes back as a new can, again and again. Rinse it and send it home."* | material truth (infinite recycling) → gratitude → nudge |
| Aerosol can (full) | *"Still pressurized and proud — it needs careful hands, not a crusher."* | truth (pressure/safety) → personify → safe nudge |
| Plastic straw (trash) | *"Too small to save this time — the kindest fix is skipping the next one."* | honest truth → no shame → refuse/reduce nudge |
| Cardboard | *"The most in-demand fiber after aluminum — flatten it and send it on."* | truth (demand) → action nudge |
| Glass jar | *"A jar is a gift twice — store something in it, or recycle the metal lid apart."* | reuse-first reframe → nudge |

**Mini-checklist before saving a note:** ☐ one sentence ☐ a true material fact
☐ object-directed & kind ☐ ends on the right rung ☐ no greenwashing ☐ no shame.

---

## Operating standards (see also AP_GUIDELINES.md)

- Recommendations and notes trace to this policy's hierarchy and, where possible, a
  citable source. **No greenwashing.**
- Local accuracy is preferred; when local rules are unknown, we say **"check local."**
- Safety/hazardous handling is never softened for convenience.
- "Never guess someone into a landfill" — the Confidence Ladder is operationalized in
  [AP_GUIDELINES.md](AP_GUIDELINES.md).

## Still to define

- Sourcing and citation standards for environmental claims (which sources, how cited).
- Measurement of "objects correctly diverted from landfill" (the north-star metric).
- Regional/municipal rule sourcing (gates the licensed local-rules layer —
  see [DATA_STRATEGY.md](DATA_STRATEGY.md)).

---
*Canonical source of truth. Supersede deliberately and record why in the commit.*
