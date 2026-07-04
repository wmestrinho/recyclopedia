# LBG / DNS + Cloudflare Wiring Runbook

Brand & domain architecture for the **Lettuce Beet Grapefruit** ("Let us be grateful")
umbrella. This is the execution checklist — steps that need your registrar login or a
credentialed `wrangler` session are marked **[you]**; everything else is already done in-repo.

## Target architecture

> Canonical product definitions live in [LBG_BRAND_ARCHITECTURE.md](LBG_BRAND_ARCHITECTURE.md)
> (2026-07-03); this table summarizes for DNS purposes.

| Domain | Role | Serves |
|---|---|---|
| `lettucebeetgrapefruit.com` | **Umbrella / parent brand + non-profit community storefront** — sibling of absolutelyplausible.com | LBG landing (`/lbg` today), event/meetup calendars, electronics-repair workshops |
| `lettucebeetgrapefruit.org` | **LBG Academy (LBGA)** — teaching & school web application | The Academy (`/academy/*` today), rebranded |
| `recyclopedia.cc` | **Recyclopedia engine only** — the Trickle-Down Tier Reasoning algorithm (human input → barcode → YOLO-class vision → material ID → local disposal plan) | What is today the "Lookup" tab |
| `absolutelyplausible.com` | Company / storefront (the mothership) | Existing AP site — unchanged |

Single Cloudflare Pages project (`recyclopedia`) can serve all three via **custom domains**
+ routing, OR split into separate projects later. Recommended first step: **one project, three
custom domains**, no code split yet. Cheapest, reversible, zero downtime.

## Step 1 — Bring both domains into Cloudflare ✅

For each of `lettucebeetgrapefruit.com` and `.org`:

1. Cloudflare dashboard → **Add a site** → enter the domain → Free plan.
2. Cloudflare gives you **two nameservers** (e.g. `xxx.ns.cloudflare.com`).
3. At the **registrar** where you bought the domains, replace the existing nameservers with
   Cloudflare's. (Propagation: minutes to a few hours.)
4. Wait for Cloudflare to show the zone as **Active**.

Verified 2026-07-04: both zones delegate to `guy.ns.cloudflare.com` and
`kara.ns.cloudflare.com`. Apex and `www` host records are not present until the
Pages custom domains in Step 2 are attached.

## Step 2 — Attach custom domains to the Pages project ✅

Attached to Pages project `recyclopedia` on 2026-07-04:

- Add `lettucebeetgrapefruit.com` and `www.lettucebeetgrapefruit.com`
- Add `lettucebeetgrapefruit.org` and `www.lettucebeetgrapefruit.org`

Cloudflare auto-creates the CNAME records and provisions SSL. Or via CLI **[you]**:

```sh
npx wrangler pages domain add lettucebeetgrapefruit.com --project-name recyclopedia
npx wrangler pages domain add lettucebeetgrapefruit.org --project-name recyclopedia
```

## Step 3 — Route each domain to the right page ✅

Because Pages serves one `dist/` for all domains, route by host.

`functions/_middleware.js` now performs internal root rewrites:

- `lettucebeetgrapefruit.com/` → `/lbg/`
- `lettucebeetgrapefruit.org/` → `/academy/`
- `recyclopedia.cc/` → unchanged

Both apex and `www` hosts are covered. The middleware compiles successfully with
Wrangler and has local host-routing tests.

## Step 4 — `.org` redirect decision

`.org` = the Academy. Decided. (Earlier open question — now resolved: `.org` is NOT a bare
redirect to `.com`; it is the school's own front door.)

## What's already done in this repo (no DNS needed)

- ✅ LBG umbrella landing page built → `src/pages/lbg/index.astro` (preview: `npm run dev` → `/lbg`)
- ✅ Academy Module 1.3 "Zero-Waste Micro-Habits" added → live in `/academy`
- ✅ Warm LBG theme, The Menu, upgraded Taste Tests, and responsive navigation
- ✅ Host routing middleware
- ✅ Build verified clean (7 routes, baseline OK)

## Launch verification — 2026-07-04

- ✅ `https://lettucebeetgrapefruit.com/` → LBG community, HTTP 200
- ✅ `https://www.lettucebeetgrapefruit.com/` → LBG community, HTTP 200
- ✅ `https://lettucebeetgrapefruit.org/` → LBG Academy, HTTP 200
- ✅ `https://www.lettucebeetgrapefruit.org/` → LBG Academy, HTTP 200
- ✅ All four Pages domains show verification, certificate validation, and
  overall status `active`
- ✅ `https://recyclopedia.cc/` still serves the engine unchanged

Remaining architectural option: decide whether to split repositories after the
shared-project launch. This is not a launch blocker.
