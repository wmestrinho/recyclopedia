# Lettuce Beet Grapefruit — Brand & Product Architecture

> **Status:** CANONICAL — defined by Luiz 2026-07-03 (amended same day: Wikipedia
> model, shared research foundation, Creative Commons). This document is the source
> of truth for what lives on which domain. The DNS runbook
> ([LBG_DNS_WIRING.md](LBG_DNS_WIRING.md)) is the *execution* checklist; when the two
> disagree, this file wins.

**Lettuce Beet Grapefruit** ("Let us be grateful" — LBG) is the parent brand,
sibling of Absolutely Plausible (absolutelyplausible.com). It umbrellas three
distinct products on three domains:

---

## 1. `recyclopedia.cc` — The Recyclopedia (engine only)

Stays on its own domain and houses **only** the **Trickle-Down Tier Reasoning
algorithm** — an escalating item-identification pipeline that always ends in an
immediate plan of action:

| Tier | Method | Purpose |
|---|---|---|
| 1 | **Human input** | User searches / describes the item |
| 2 | **Barcode scan** | Machine-readable item recognition |
| 3 (last resort) | **AI vision** — YOLO-class ("You Only Look Once") object recognition | Identify unrecognized objects, then **composition / material identification** for new or discovered materials |

**Resolution layer (every tier funnels here):** based on the user's **location,
district, and available facilities**, determine where the item/material can be
properly disposed of, and return an **immediate plan of action**.

Everything that is not this engine (Academy, general education content) moves off
this domain.

**Operating model (amended 2026-07-03):**

- **Dual presence:** Recyclopedia is a **standalone solo product** on its own
  domain *and* surfaces inside `lettucebeetgrapefruit.org` / `.com` (embedded or
  deep-linked — mechanics TBD per property).
- **Wikipedia model — literally:** run recyclopedia.cc as an open, encyclopedia-
  style public knowledge project. Open-source the project; community contribution
  mechanics TBD.
- **Donations:** accept donations to help build Recyclopedia as an open-source
  project (candidate rails: the existing `ap-stripe-worker` / `shop-api` Stripe
  infrastructure).
- **Shared research foundation:** the research behind the Trickle-Down Tier
  engine (ongoing — more to come) **is the foundation of LBGA's courses**. One
  knowledge base, two surfaces: the engine cites it, the school teaches it. Keep
  research sourced and citable so both properties can draw on it.

## 2. `lettucebeetgrapefruit.org` — LBG Academy (LBGA)

The **teaching and school web application** — its own product, its own domain.
Absorbs everything currently at `recyclopedia.cc/academy`. As content migrates,
**feature names change** — this is a rebrand into Lettuce Beet Grapefruit Academy,
not a lift-and-shift (naming pass pending with Luiz).

## 3. `lettucebeetgrapefruit.com` — LBG umbrella + community storefront

The parent-brand home over LBGA, and the **non-profit-focused storefront**:

- **Calendars** for local meetings and meetups on technology
- **Workshops** and local networking events focused on sustainability and
  zero-waste solutions
- **Core workshop model:** donated electronics become teaching material — 
  workshops teach how to **build and fix electronics**
- **Open to all ages — everyone is welcome to learn at Lettuce Beet Grapefruit**

---

## Licensing — Creative Commons + open source (amended 2026-07-03)

Luiz's direction: put "a bunch of our stuff" under **Creative Commons, including
all current LBG/Recyclopedia work**. Mechanics to know:

- CC licenses are **applied, not registered** — you pick a license, state it on
  the work (site footer, doc headers, LICENSE file), and it's in force. No
  submission step.
- **Content** (encyclopedia entries, Academy modules, whitepaper, research):
  recommend **CC BY-SA 4.0** — the license Wikipedia itself uses; share-alike
  keeps derivatives open. **[decide with Luiz]**
- **Code**: CC is not designed for code — pick an OSS license (MIT or GPL-family)
  for the repo when it goes public. **[decide with Luiz]**
- Repo is currently **PRIVATE with no license**; history has no committed env
  files, but run a full secret scan before flipping public.

## Open items (decide with Luiz, in order of dependency)

1. **Donate Electronics intake** (currently on recyclopedia.cc) — likely moves to
   the `.com` storefront, since donated electronics feed the workshops. Not yet
   decided.
2. **Naming pass** — new names for all features across the three properties.
3. **Repo strategy** — today everything is in the `recyclopedia` repo / one
   Cloudflare Pages project. Eventual split into per-property repos; the
   `storefront-template` repo (token-driven static storefront scaffold) is a
   candidate base for the `.com` storefront.
4. **Whitepaper & audio** — the internal whitepaper draft and the
   "Ending the trash illusion with AI" audio live uncommitted on the Mac; decide
   their home (likely LBGA or the `.com` brand site). Note: the whitepaper is part
   of the shared research foundation — once cleared for release it's a CC
   candidate.
5. **License choices** — CC license for content (recommended CC BY-SA 4.0) + OSS
   license for code, then secret-scan and flip the repo public.
6. **Donation rails** — wire donations through existing Stripe infra
   (`ap-stripe-worker`/`shop-api`) vs. a non-profit-specific processor; depends on
   the non-profit entity question for LBG.

## Owner-gated prerequisite

Both `lettucebeetgrapefruit.com` and `.org` registrar nameservers must point at
Cloudflare before any domain routing works — see
[LBG_DNS_WIRING.md](LBG_DNS_WIRING.md) Step 1 **[you]**.
