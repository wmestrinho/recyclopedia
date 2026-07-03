# LBG / DNS + Cloudflare Wiring Runbook

Brand & domain architecture for the **Lettuce Beet Grapefruit** ("Let us be grateful")
umbrella. This is the execution checklist — steps that need your registrar login or a
credentialed `wrangler` session are marked **[you]**; everything else is already done in-repo.

## Target architecture

| Domain | Role | Serves |
|---|---|---|
| `lettucebeetgrapefruit.com` | **Umbrella / parent brand** — sibling of absolutelyplausible.com | The LBG landing page (`/lbg`), links out to both properties |
| `lettucebeetgrapefruit.org` | **Academy / school** | The Academy (`/academy/*`) |
| `recyclopedia.cc` | **Recyclopedia only** — the database, search engine, item-recognition app | What is today the "Lookup" tab |
| `absolutelyplausible.com` | Company / storefront (the mothership) | Existing AP site — unchanged |

Single Cloudflare Pages project (`recyclopedia`) can serve all three via **custom domains**
+ routing, OR split into separate projects later. Recommended first step: **one project, three
custom domains**, no code split yet. Cheapest, reversible, zero downtime.

## Step 1 — Bring both domains into Cloudflare **[you]**

For each of `lettucebeetgrapefruit.com` and `.org`:

1. Cloudflare dashboard → **Add a site** → enter the domain → Free plan.
2. Cloudflare gives you **two nameservers** (e.g. `xxx.ns.cloudflare.com`).
3. At the **registrar** where you bought the domains, replace the existing nameservers with
   Cloudflare's. (Propagation: minutes to a few hours.)
4. Wait for Cloudflare to show the zone as **Active**.

> Until nameservers point at Cloudflare, no DNS/Pages wiring below will take effect. This is
> the one gate I can't do for you — it needs the registrar login.

## Step 2 — Attach custom domains to the Pages project **[you, or me next session]**

Once both zones are **Active**, in **Pages → `recyclopedia` project → Custom domains**:

- Add `lettucebeetgrapefruit.com` and `www.lettucebeetgrapefruit.com`
- Add `lettucebeetgrapefruit.org` and `www.lettucebeetgrapefruit.org`

Cloudflare auto-creates the CNAME records and provisions SSL. Or via CLI **[you]**:

```sh
npx wrangler pages domain add lettucebeetgrapefruit.com --project-name recyclopedia
npx wrangler pages domain add lettucebeetgrapefruit.org --project-name recyclopedia
```

## Step 3 — Route each domain to the right page

Because Pages serves one `dist/` for all domains, route by host. Two options:

- **Simple (now):** `lettucebeetgrapefruit.com` → its visitors land on `/` of the build. We can
  add a tiny redirect/rewrite in `public/_redirects` or a Pages Function so:
  - `lettucebeetgrapefruit.com/` → serves the LBG landing (`/lbg`)
  - `lettucebeetgrapefruit.org/` → serves `/academy`
  - `recyclopedia.cc/` → serves `/` (the current site, eventually trimmed to Lookup-only)
- **Clean (later):** split into separate Pages projects / repos per property.

Draft `public/_redirects` host rules (apply once domains resolve):

```
# Umbrella root → LBG landing
https://lettucebeetgrapefruit.com/  /lbg  200
https://www.lettucebeetgrapefruit.com/  /lbg  200
# Academy domain root → Academy
https://lettucebeetgrapefruit.org/  /academy  200
https://www.lettucebeetgrapefruit.org/  /academy  200
```

> NOTE: verify `_redirects` host-based matching behaviour on Pages before relying on it; a Pages
> Function (`functions/_middleware.ts`) keying off `request.headers.get('host')` is the robust
> fallback. Not committed yet — pending Step 1 so we can test against a live zone.

## Step 4 — `.org` redirect decision

`.org` = the Academy. Decided. (Earlier open question — now resolved: `.org` is NOT a bare
redirect to `.com`; it is the school's own front door.)

## What's already done in this repo (no DNS needed)

- ✅ LBG umbrella landing page built → `src/pages/lbg/index.astro` (preview: `npm run dev` → `/lbg`)
- ✅ Academy Module 1.3 "Zero-Waste Micro-Habits" added → live in `/academy`
- ✅ Build verified clean (7 routes, baseline OK)

## Not yet done (needs you / next session)

- ⬜ Steps 1–2 above (registrar nameservers + custom-domain attach) — **needs your logins**
- ⬜ Host-based routing (`_redirects` or middleware) — build + test once a zone is live
- ⬜ Eventual content split: trim `recyclopedia.cc` to Lookup-only; move Academy nav under LBG
- ⬜ Brand assets: LBG favicon/wordmark (currently using 🥬 emoji placeholder)
