# Lettuce Beet Grapefruit — Brand & Product Architecture

> **Status:** CANONICAL — defined by Luiz 2026-07-03 (amended same day: Wikipedia
> model, shared research foundation, Creative Commons). This document is the source
> of truth for what lives on which domain. The DNS runbook
> ([LBG_DNS_WIRING.md](LBG_DNS_WIRING.md)) is the *execution* checklist; when the two
> disagree, this file wins.

**Lettuce Beet Grapefruit** (LBG) is the parent brand, sibling of Absolutely
Plausible (absolutelyplausible.com). It umbrellas three distinct products on
three domains:

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
- **Wikipedia model — literally, with in-house editing (DECIDED 2026-07-03):**
  run recyclopedia.cc as an open, encyclopedia-style public knowledge project —
  open-source, but **editing stays in-house for now and probably a long time**.
  Luiz's framing: *Bitcoin is open-source, but that doesn't mean it's open to
  the public to change* — open license and visible source ≠ open write access.
  Contributions, if ever, come later and gated.
- **Donations (DECIDED 2026-07-03):** accept donations to help build
  Recyclopedia as an open-source project, **via the existing
  `ap-stripe-worker` / `shop-api` Stripe rails**.
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
- **Content license (DECIDED 2026-07-03): CC BY-NC-SA 4.0** — deliberately
  aggressive and anti-corporation: **NO COMMERCIAL USE ALLOWED** (NC), and
  share-alike (SA) keeps derivatives open. Applied to all four site footers in
  v0.1.7 alpha, alongside the required quote **"EDUCATIONAL PURPOSES ONLY"**
  (`.footer-license` slot per the workspace footer standard).
- **Code**: CC is not designed for code — pick an OSS license for the repo when
  it goes public. Given the anti-corporate stance, a copyleft license
  (**AGPL-3.0** or GPL-3.0) fits better than MIT. **[decide with Luiz]**
- Repo is currently **PRIVATE with no license file**; history has no committed
  env files, but run a full secret scan before flipping public.

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
5. **Code license** — content is decided (CC BY-NC-SA 4.0, applied); pick the
   OSS license for code (AGPL-3.0 suggested), then secret-scan and flip the repo
   public.
6. **Donation rails** — decided: existing Stripe infra
   (`ap-stripe-worker`/`shop-api`). Remaining: the non-profit entity question for
   LBG (affects how donations are framed/receipted on the `.com` storefront).

## Owner-gated prerequisite

Both `lettucebeetgrapefruit.com` and `.org` registrar nameservers must point at
Cloudflare before any domain routing works — see
[LBG_DNS_WIRING.md](LBG_DNS_WIRING.md) Step 1 **[you]**.
