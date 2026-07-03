# Lettuce Beet Grapefruit — Brand & Product Architecture

> **Status:** CANONICAL — defined by Luiz 2026-07-03. This document is the source of
> truth for what lives on which domain. The DNS runbook
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
   their home (likely LBGA or the `.com` brand site).

## Owner-gated prerequisite

Both `lettucebeetgrapefruit.com` and `.org` registrar nameservers must point at
Cloudflare before any domain routing works — see
[LBG_DNS_WIRING.md](LBG_DNS_WIRING.md) Step 1 **[you]**.
