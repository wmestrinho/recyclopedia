# Marketing audit: recyclopedia.cc, 2026-09-29

> Seat 2 (ThinkPad), Claude Code. Audit only: nothing on the site was changed.
> Everything here comes from the public pages (read-only `curl` and web search)
> plus this repository's source. Companion audit:
> [MARKETING-AUDIT-2026-09-29-lbg.md](MARKETING-AUDIT-2026-09-29-lbg.md).
> Live version at the time of the audit: the footer read `0.8.15-alpha.1`, which matches `VERSION`.

**Does this file ship?** No. Astro only publishes `src/pages/**` and
`public/**` into `dist/`. `astro.config.mjs` has no extra copy step, and
`functions/` is Pages Functions code, not static output. How it was checked:
(1) the last local build in the shared checkout (`../recyclopedia/dist/`)
contains `_astro academy assets css data diy dropoff images index.html js lbg
manifest.webmanifest privacy robots.txt signs sitemap-*.xml sw.js vendor` and
has no `docs/`; (2) on production, `https://recyclopedia.cc/docs/LBG_BRAND_ARCHITECTURE.md`,
`/HANDOFF.md`, `/qa-comparison.png`, `/mockups/`, `/tmp/`, `/package.json`,
`/.git/config` and `/recyclopedia%20whitepaper%20v1%202.md` all return the
homepage body (272,988 bytes). That is the SPA fallback (see RCY-MKT-03), not
the file. The repo itself is public on GitHub, so this file is world-readable
there anyway. It records public observations only.

---

## 1. Summary

Recyclopedia already has something most recycling lookups lack: 84
hand-written items. Each one has a ranked "most respectful path", prep steps,
a warm one-line note and, for 43 of them, a cited source (US EPA, Call2Recycle,
PaintCare, US FDA). Tier 2 barcode scanning also works. The site is fast
(homepage 48 KB brotli over the wire), mobile-ready, installable and
tracker-free.

Search engines currently see almost none of that:

- **Every item is on one URL.** All 84 items are rendered into the homepage.
  "Deep links" are `/?q=<name>#recyclopedia`. No item has its own page, title
  or description, so the "how do I recycle X" long tail has nothing to rank.
- **The domain does not show up in search.** A `site:recyclopedia.cc` search
  returns nothing from the site. A brand search for "Recyclopedia" returns
  Delaware DNREC, ECOS, ecomaine, recyclopedia.org, recyclopedia.us and
  recyclopedia-app.com. The `.org` Academy host *is* indexed, but under
  "Recyclopedia" titles (see the LBG audit).
- **One build is served on four hosts plus `www` and `pages.dev`**, with no
  canonical on the homepage, and every unknown URL returns the homepage with
  HTTP 200.
- **The headline claims go further than the product.** "The World's Most
  Complete Recycling Resource", "If it exists, we know what to do with it",
  "Zero waste · 100% recycled" and "It's free, it's fast, and it's accurate"
  sit on the page next to "84 items and growing". The repo's own
  Environmental Respect Policy says "No greenwashing. We never overstate."
- **There is no measurement at all.** No analytics (the privacy notice
  promises none), no sign of Search Console, and no way to know whether
  anyone arrives.

### Top 5 priorities

1. **RCY-MKT-01 (P1):** give each item an indexable page (`/item/<slug>/`),
   with a unique title and description, in the sitemap and linked from the
   Lookup cards. This is the single biggest growth lever. `items.ts` already
   has a `slug` for every item.
2. **RCY-MKT-02 + RCY-MKT-03 (P0/P1):** fix the host sprawl and soft 404s.
   Add a canonical to every page, send `www`/`pages.dev` to the apex, add a
   real `404.astro`, and keep `/academy/*` and `/lbg/*` from being indexable on
   `recyclopedia.cc`.
3. **RCY-MKT-06 (P1, Tier 3):** verify the domain in Google Search Console
   and Bing Webmaster Tools and submit the sitemap. Neither needs a script on
   the page.
4. **RCY-MKT-04 (P1):** bring the sitemap into line with the product
   boundary. Today it lists 27 URLs, of which 20 are Academy/LBG/DIY and are
   not Recyclopedia; the only items page is the homepage.
5. **RCY-MKT-08 (P1, Tier 2/3):** rewrite the title and hero claims so they
   match the policy (no overstatement) and the brand (gratitude, plain and kind
   language). Also deal with the name collision: "Recyclopedia" is used by at
   least six other recycling programs.

## 2. Scorecard

| Area | Grade | Reason |
|---|---|---|
| Positioning & messaging | C | The differentiator is strong ("most grateful end", the Gratitude Hierarchy) but buried under overclaims and a jarring hero line. The generic name collides with at least six others. |
| Conversion paths | C+ | Search is front and centre and the barcode scanner works. No email capture, no "request an item", no save/share per item. The donate path moved to .com cleanly. |
| On-page SEO | D | One H1. The homepage has no canonical, no JSON-LD, and descriptions of 212 characters. There are no item URLs, and the signs pages have the H1 "Boards". |
| Technical SEO | D+ | robots and sitemap exist. But there is a soft-404 catch-all, duplicate hosts (`www`, `pages.dev`, two LBG hosts), and cross-host sitemap scope. The speed itself is excellent. |
| Performance / mobile | A- | 48 KB brotli homepage, 3 small scripts, viewport and manifest are set, PWA icons exist. Google Fonts is the only third-party request. |
| Measurement | F | Nothing. There is no analytics or Search Console, and conversions are invisible (the donate form hands off to email). |
| Search presence | F | Not found for its own domain, brand or item queries. |
| Trust signals | B- | Items carry citations, and there are a privacy page, the open source, the license and an Orlando location. What's missing: an About/methodology page on its own URL, "last reviewed" dates, named reviewers. |
| Legal | B | The privacy notice is clear and discloses Google Fonts. There is no cookie banner and none is needed (no cookies). No terms or disclaimer page beyond "EDUCATIONAL PURPOSES ONLY". |

## 3. Findings

Severity: **P0** = broken or losing users now · **P1** = high · **P2** =
improvement · **P3** = nice to have. Tier: **1** = an agent can ship it (a
verifiable technical fix) · **2** = public copy, visuals or identity; build
it on a branch for Luiz to review · **3** = Luiz only (positioning, accounts,
legal).

### RCY-MKT-01 · P1 · Tier 2: No indexable item pages (the programmatic SEO gap)
- **Evidence:** `curl -sL https://recyclopedia.cc/` gives 272,988 bytes, and
  all 84 items render as cards inside the homepage (`## Aluminum can ✓
  Curbside` … `## Mattress ↗ Drop-off Only`). Links from the signs point to
  `/?q=Pizza%20box…#recyclopedia` (the query is read client-side in
  `src/components/Lookup.svelte:19-20`). The sitemap
  (`/sitemap-0.xml`, 29 URLs) holds no item URLs.
- **Why:** "how to recycle a pizza box", "where to drop off lithium-ion
  batteries" and similar are the site's natural demand. Today those results
  are held by AF&PA, The Recycling Partnership, Rumpke, the EPA, Redwood
  Materials, the Battery Network and city "What Goes Where" guides (web search,
  2026-09-29). Each of them has **one URL per item**. A single homepage can
  rank for at most a handful of head terms.
- **Fix:** add `src/pages/item/[slug].astro` driven by `src/data/items.ts`
  (every `Item` already has a `slug`). Each page gets a unique `<title>` such
  as "How to recycle a pizza box: best path, prep, where | Recyclopedia", a
  150–160 character description built from the item's `note`/`gratitude_note`,
  the H1 set to the item name, the ranked dispositions, the source citation,
  the Academy "Learn more" link, related items in the same category, and a
  canonical. Link each Lookup card title to its page, and keep `?q=` for
  in-page search. The pages then appear in the sitemap automatically. Tier 2
  because it creates about 84 new public URLs and fixes the URL scheme for
  good. Luiz should approve `/item/` against another scheme (for example
  `/how-to-recycle/<slug>/`) before launch.

### RCY-MKT-02 · P0 · Tier 1: Soft 404: every unknown path returns the homepage with 200
- **Evidence:** `curl -s -o /dev/null -w "%{http_code} %{size_download}"
  https://recyclopedia.cc/does-not-exist` gives `200 272988`, and the same for
  `/HANDOFF.md`, `/mockups/` and `/.git/config`. The same happens on
  `https://lettucebeetgrapefruit.com/nope` (the *Recyclopedia* homepage is
  served on the LBG domain). `src/pages/` has no `404.astro`, so Cloudflare
  Pages falls back to SPA behaviour and serves `/index.html`.
- **Why:** it wastes crawl budget, lets any stray URL be indexed as a copy of
  the homepage, and shows people who follow a stale link the wrong brand.
- **Fix:** add `src/pages/404.astro` (neutral LBG-family styling, links to
  Recyclopedia search, LBG and the Academy, plus `noindex`). Pages then
  returns a real 404 status. Re-check with the commands in §5.

### RCY-MKT-03 · P1 · Tier 1: Duplicate hosts and no canonical on the homepage
- **Evidence:** `https://www.recyclopedia.cc/` returns 200 with the same
  272,988 bytes (no redirect). `https://recyclopedia.pages.dev/` returns 200
  with no `X-Robots-Tag` (`curl -sI`). `http://` correctly gives 301 to https.
  The homepage has no `<link rel="canonical">` (`src/pages/index.astro:24-40`),
  and neither do `/diy/*` or `/privacy/`. The same build is also served at
  `lettucebeetgrapefruit.com/` and `lettucebeetgrapefruit.org/` under their
  paths (`functions/_middleware.js` only rewrites `/` and `/donate`), so
  `https://lettucebeetgrapefruit.org/privacy/` is a live, indexed copy of the
  Recyclopedia privacy page (web search: "Privacy Notice | Recyclopedia" at
  `lettucebeetgrapefruit.org/privacy/`).
- **Why:** signals split across copies. Search engines may pick the wrong
  host as canonical, as has already happened with the `.org` privacy page.
- **Fix:** (a) add a self-referencing absolute canonical to every
  Recyclopedia page (`https://recyclopedia.cc/<path>/` with the trailing
  slash). (b) In `functions/_middleware.js`, 301 `www.recyclopedia.cc` to the
  apex, and on `*.pages.dev` add `X-Robots-Tag: noindex` (or 301 to the apex).
  (c) Enforce the host boundary. Recyclopedia paths (`/`, `/privacy/`,
  `/signs/*`, `/item/*`) requested on an LBG host should 301 to
  `recyclopedia.cc`, and `/academy/*` and `/lbg/*` on `recyclopedia.cc` should
  301 to their LBG host (this is LBG-MKT-01, done once for both sites).
  Redirect rules only; no copy changes.

### RCY-MKT-04 · P1 · Tier 1: The sitemap mixes three brands and misses the product
- **Evidence:** `https://recyclopedia.cc/sitemap-0.xml` lists 29 URLs: `/`,
  20 `/academy/*`, 3 `/diy/*`, `/lbg/` and `/lbg/donate/`, `/privacy/` and 2
  `/signs/*`. Several of those pages declare a canonical on another domain
  (for example `/academy/myths/` points to
  `https://lettucebeetgrapefruit.org/academy/myths`), which contradicts the
  sitemap. Cause: `astro.config.mjs:9` runs `@astrojs/sitemap` with
  `site: 'https://recyclopedia.cc'` and filters only `/dropoff/`.
- **Why:** under `LBG_BRAND_ARCHITECTURE.md`, recyclopedia.cc is "engine
  only". A sitemap that advertises Academy and LBG URLs on this host, while
  those pages point their canonical elsewhere, sends conflicting signals.
- **Fix:** give the sitemap integration a filter that keeps only
  Recyclopedia routes (`/`, `/privacy/`, `/signs/*`, and later `/item/*`),
  and emit per-host sitemaps for LBG (see LBG-MKT-03). Decide whether `/diy/`
  belongs here or to `diy.recyclopedia.cc` (RCY-MKT-15).

### RCY-MKT-05 · P1 · Tier 1: No structured data at all
- **Evidence:** zero `application/ld+json` blocks across the 30 pages fetched
  (script `brief.py`, column `LD:0`).
- **Why:** a `WebSite` + `SearchAction` makes the site eligible for the
  sitelinks search box and tells engines that `/?q=` is a search. An
  `Organization` block ties Recyclopedia to Absolutely Plausible and LBG, and
  helps the brand-name collision (RCY-MKT-09). Items suit `HowTo`-like
  content, but Google no longer shows HowTo rich results and limits FAQ rich
  results to government and health sites, so do not expect visual snippets
  from those.
- **Fix:** in `src/pages/index.astro` `<head>`, add `WebSite` (`name`, `url`,
  `potentialAction: SearchAction` with target
  `https://recyclopedia.cc/?q={search_term_string}`) and `Organization`/`Project`
  (`name: Recyclopedia`, `url`, `logo` → `/images/pwa/icon-512.png`,
  `parentOrganization: Absolutely Plausible Solutions`, `sameAs`: the GitHub
  repo and the confirmed Instagram already in the footer). On future item
  pages, add `BreadcrumbList` and an `Article` whose `citation` is the source
  URL. Validate with the Schema.org validator.

### RCY-MKT-06 · P1 · Tier 3: No measurement and no search-engine verification
- **Evidence:** no analytics script on any page (the only "plausible"
  matches are the `absolutelyplausible.com` links). `src/pages/privacy.astro:67`
  promises "No analytics or tracking scripts". Donations go through a
  `mailto:` hand-off while the intake is off (`functions/api/donate.js`), so
  there is no record of conversions. There is no public evidence of Search
  Console or Bing verification (no verification meta tag or file; DNS
  verification cannot be seen from outside, so **unverified**).
- **Why:** without data there is no way to tell whether any of these fixes
  work, or which items people look for and fail to find.
- **Fix (Luiz):** (1) verify `recyclopedia.cc` as a Domain property in Google
  Search Console and Bing Webmaster Tools through a DNS TXT record (no page
  change, no script), then submit the sitemap. (2) Look at the Cloudflare
  zone's built-in HTTP traffic analytics, which are server-side and need no
  page script. (3) If a page-level signal is wanted later, choose a cookieless
  option (Cloudflare Web Analytics or self-hosted Plausible/Umami) and update
  `/privacy` **first**, because the page currently promises none. (4) A
  privacy-safe "not found" signal: log zero-result Lookup queries
  anonymously. That is the best input for which items to add next, and it
  also needs a privacy-notice change.

### RCY-MKT-07 · P1 · Tier 1: Meta descriptions too long or too short; weak H1s on the signs and privacy pages
- **Evidence:** description lengths are home 212, `/signs/curbside/` 59,
  `/signs/donate/` 77, `/diy/pallet-guide/` 189, `/privacy/` 164.
  `ap-ops/docs/PROJECT-RULES.md` §7 asks for 150–160. H1 on both signs pages
  is "Boards" (`src/pages/signs/[slug].astro:58`), and the sign's real title
  ("What should be recycled?") is an H2. `/privacy/` has no H1 at all (the
  first heading is an H2, `src/pages/privacy.astro:51`).
- **Fix:** trim or expand the descriptions to 150–160 characters, keeping the
  existing wording where possible (the home description can drop "Donate your
  old electronics too.", which now lives on .com). Make the sign title the H1
  and demote "Boards" to a label. Promote the privacy page's first heading to
  H1.

### RCY-MKT-08 · P1 · Tier 2 (copy) / Tier 3 (claims): Overclaims and off-voice hero copy
- **Evidence (homepage):** `<title>Recyclopedia — The World's Most Complete
  Recycling Resource</title>` (`src/pages/index.astro:26`). "We are the most
  psychotic people on the planet when it comes to recycling"
  (`src/pages/index.astro:65`). "MISSION // Zero waste · 100% recycled".
  "POLICY // If it exists, we know what to do with it". "It's free, it's fast,
  and it's accurate". "every question has one clear answer". All of these sit
  beside "84 items and growing" and the Tier 3 "Planned" badge.
- **Why:** `ENVIRONMENTAL_RESPECT_POLICY.md` says "No greenwashing. We never
  overstate recyclability or impact", and `AP_GUIDELINES.md` says "Accuracy
  over completeness" and "Plain, kind language". A visitor who searches for
  something outside the 84 items meets the gap between the claim and the
  product. "Psychotic" as a boast uses mental-health stigma as a joke, which
  clashes with "gratitude over guilt". The 5-second value proposition is also
  split three ways (search, donate, mission).
- **Fix:** Luiz to choose the positioning line. One on-policy option to review
  is "Recyclopedia: find the most respectful path for anything you're done
  with". The hero sub-line can keep the energy without the stigma or the
  absolute ("Nothing gets thrown away without a fight" already does that
  work). Put item and category counts next to any "complete" wording. Draft
  the options on a branch; do not ship them without review.

### RCY-MKT-09 · P1 · Tier 3: Brand-name collision
- **Evidence:** web searches for "Recyclopedia recyclopedia.cc recycling" and
  `"recyclopedia.cc"` (2026-09-29) return Delaware DNREC's Recyclopedia
  (launched 2021), ECOS's Recyclopedia, ecomaine's Recyclopedia, Cowichan
  Valley's Recyclopedia, Scituate MA's Recyclopedia, recyclopedia.org,
  recyclopedia.us and recyclopedia-app.com. recyclopedia.cc itself does not
  appear. The GitHub repo does.
- **Why:** a generic name makes ranking for the brand hard, and it risks
  confusion with government tools.
- **Fix (Luiz):** decide whether to keep the name and pair it with a
  distinctive modifier in titles and schema ("Recyclopedia by Lettuce Beet
  Grapefruit"), or fold the naming into the pending LBG naming pass
  (`docs/LBG_BRAND_ARCHITECTURE.md` open item 2). Check trademark before
  investing in the name.

### RCY-MKT-10 · P2 · Tier 2: Brand architecture unclear on the page
- **Evidence:** the header says "Recyclopedia by Absolutely Plausible"; the
  footer says "An Absolutely Plausible production"; the OG image is the LBG
  trio mark (`og:image` = `/images/lbg/lbg-trio-mark.webp`, alt "the Lettuce
  Beet Grapefruit mark"). Item cards link out to `lettucebeetgrapefruit.org`
  modules, and the donate CTA goes to `lettucebeetgrapefruit.com`. Nowhere on
  recyclopedia.cc does a sentence say what Lettuce Beet Grapefruit is, and the
  homepage never names LBG.
- **Why:** visitors follow links to a differently named site with a
  different look and no explanation. That is a trust leak on the donate path.
- **Fix:** add one line in About/footer ("Recyclopedia is part of the Lettuce
  Beet Grapefruit family, built by Absolutely Plausible") with links, and
  label the out-links ("Learn more at LBG Academy ↗"). Consider a
  Recyclopedia-branded share image (the OG choice is deliberate per HANDOFF,
  so this needs Luiz's call).

### RCY-MKT-11 · P2 · Tier 2: Conversion: no way to stay in touch or report a missing item
- **Evidence:** no `<form>` on the homepage, and no newsletter or "request an
  item" link. The only contact is an obfuscated email link "Contact AP".
- **Why:** the most valuable action a first-time visitor who does not find
  their item can take is to tell you what was missing. That also supplies the
  item backlog. A light follow-up channel is needed for the Tier 3 vision
  launch.
- **Fix:** on the Lookup empty state, add "Can't find it? Tell us" (a mailto
  with the query prefilled keeps the no-backend stance). Offer a "Get notified
  when camera ID launches" signup only once Luiz picks an email tool (Tier 3
  account).

### RCY-MKT-12 · P2 · Tier 2: Trust: no standalone About/methodology URL and no review dates
- **Evidence:** About is an in-page section (`#about`). It has no
  URL of its own, no "how we decide the best path", and no "last reviewed"
  date on items. Only 43 of 84 items show a `src:` link.
- **Fix:** add a `/about/` or `/method/` page (the Gratitude Hierarchy,
  sourcing principle, confidence ladder, and who reviews). Show a "reviewed
  <month year>" line on items, and fill in the missing sources before those
  items get their own pages.

### RCY-MKT-13 · P2 · Tier 1: Internal links and canonicals point at redirecting URLs
- **Evidence:** item cards link to
  `https://lettucebeetgrapefruit.org/academy/module-2-3` (no slash, 308 to
  `/module-2-3/`). The canonicals on `/signs/*`
  (`src/pages/signs/[slug].astro:39`) and the og:url on `/privacy` and
  `/diy/*` use the no-slash form, which also returns 308. 43 internal links
  in total take one 308 hop (`intstatus.txt`, crawl of all sitemap pages).
- **Fix:** emit trailing-slash URLs everywhere (or set `trailingSlash:
  'always'` in `astro.config.mjs` and build URLs from one helper).

### RCY-MKT-14 · P3 · Tier 2: Share image 1200×800 WebP of the parent mark
- **Evidence:** `lbg-trio-mark.webp` is 1200×800 (3:2) and 80 KB. Most
  platforms crop to 1.91:1, and some older scrapers ignore WebP.
- **Fix:** add a 1200×630 PNG or JPG share card per brand, together with the
  RCY-MKT-10 decision.

### RCY-MKT-15 · P3 · Tier 3: DIY content lives in two places
- **Evidence:** `https://recyclopedia.cc/diy/dj-pallet-table/` and
  `https://diy.recyclopedia.cc/dj-pallet-table` both publish the DJ Pallet
  Table build. Neither has a canonical, and the subdomain's og:url is
  `…/dj-pallet-table.html`. recyclopedia.cc never links to
  `diy.recyclopedia.cc`, but the subdomain links back. Under the brand
  architecture, DIY is not engine content.
- **Fix (Luiz):** pick the one home for DIY, 301 the other, and cross-link
  from that home.

### RCY-MKT-16 · P3 · Tier 1: Self-host fonts
- **Evidence:** Google Fonts CSS is loaded on every page (4 families,
  including Caveat and Share Tech Mono). It is disclosed at
  `src/pages/privacy.astro:217`.
- **Fix:** self-host the woff2 subsets under `public/fonts/` (this removes the
  third-party request, fits the privacy promise, and saves a connection).
  Update the privacy notice in the same change.

### RCY-MKT-17 · P3 · Tier 3: No terms or disclaimer page
- **Evidence:** only "EDUCATIONAL PURPOSES ONLY" in the footer. The site
  gives hazardous-waste handling advice (lithium batteries, pesticides,
  aerosols).
- **Fix (Luiz):** a short terms/disclaimer page ("check local rules;
  hazardous handling follows your local HHW authority"), linked from the
  footer.

### Competitors: what they do better (observed via web search, 2026-09-29; depth unverified)
- **Earth911** (earth911.com): a material page per item, a ZIP-code locator
  over a large facility listing, and years of backlinks. It wins the "where
  near me" step that Recyclopedia's Phase 4 is still planning. Already on the
  outreach list (HANDOFF TODO).
- **ReCollect / Recycle Coach "What Goes Where"** widgets: run by the
  municipality, so rules are exact per address, with collection reminders and
  an app. Their trust comes from the city seal.
- **Delaware DNREC Recyclopedia / ecomaine Recyclopedia:** same name, more
  than 200 illustrated items, answers by ZIP code, and a government domain.
- **AF&PA, The Recycling Partnership, Redwood Materials, Call2Recycle / The
  Battery Network:** one page per question ("Can I recycle a greasy pizza
  box?"), and they own the snippets for those queries.
- **Where Recyclopedia can win:** the ranked "most respectful path" (reuse,
  then repair, then donate, and only then recycle) is something none of them
  do. Put it in titles and snippets ("…and 3 better options than the bin").

### RCY-MKT-18 · P2 · Tier 1: Broken outbound link on the privacy notice
- **Evidence:** `https://world.openfoodfacts.org/cgi/privacy.pl` returns 404
  (`curl -sL -o /dev/null -w "%{http_code}"`). It is linked from
  `src/pages/privacy.astro:219` as the Open Food Facts privacy reference for
  barcode lookups. By contrast, all 18 outbound links on the homepage (EPA,
  Call2Recycle, PaintCare, FDA, Earth911 and others) returned 200.
- **Why:** a dead link on the page that explains third-party data sharing
  undermines trust exactly where trust matters.
- **Fix:** point it at Open Food Facts' current privacy page (look it up on
  their site footer; do not guess the URL).

## 4. Checklist

### Tier 1: an agent can ship (branch → PR → deploy per repo rules)
- [ ] RCY-MKT-02 add `src/pages/404.astro` (noindex) and confirm the 404 status on all hosts
- [ ] RCY-MKT-03 canonicals on every page; `www` → apex 301; `pages.dev` noindex; host-boundary 301s in `functions/_middleware.js` (shared with LBG-MKT-01)
- [ ] RCY-MKT-04 sitemap filter: Recyclopedia routes only
- [ ] RCY-MKT-05 `WebSite`+`SearchAction` and `Organization` JSON-LD on the homepage
- [ ] RCY-MKT-07 meta descriptions at 150–160; H1 on signs and privacy
- [ ] RCY-MKT-13 trailing-slash URLs in links, canonicals and og:url
- [ ] RCY-MKT-16 self-host fonts and update `/privacy`
- [ ] RCY-MKT-18 fix the Open Food Facts privacy link

### Tier 2: branch + Luiz review
- [ ] RCY-MKT-01 item pages at `/item/<slug>/` (approve the URL scheme and the title pattern)
- [ ] RCY-MKT-08 rewrite the title, hero and claims (options only)
- [ ] RCY-MKT-10 name LBG on the page; label out-links; brand share image
- [ ] RCY-MKT-11 "Can't find it? Tell us" on the empty state
- [ ] RCY-MKT-12 `/about/` or `/method/` page, review dates, fill in missing sources
- [ ] RCY-MKT-14 1200×630 share card

### Tier 3: Luiz only
- [ ] RCY-MKT-06 Search Console + Bing (DNS TXT), submit the sitemap; decide on any analytics and update `/privacy` first
- [ ] RCY-MKT-08 positioning line and which claims stay
- [ ] RCY-MKT-09 name collision / modifier / trademark check
- [ ] RCY-MKT-15 one home for DIY
- [ ] RCY-MKT-17 terms or disclaimer page

**Count by severity:** P0 × 1 · P1 × 8 · P2 × 5 · P3 × 4 (18 findings).

## 5. Re-check commands

```sh
UA="Mozilla/5.0"
# soft 404 (want 404, not "200 272988")
curl -s -o /dev/null -A "$UA" -w "%{http_code} %{size_download}\n" https://recyclopedia.cc/does-not-exist
# host sprawl (want 301 → https://recyclopedia.cc/ for www; noindex or 301 for pages.dev)
for u in https://www.recyclopedia.cc/ https://recyclopedia.pages.dev/ https://lettucebeetgrapefruit.org/privacy/; do
  curl -sI -A "$UA" "$u" | grep -iE "^HTTP|^location|x-robots"; done
# canonical, description length, H1, JSON-LD on the homepage
curl -sL -A "$UA" https://recyclopedia.cc/ | grep -oE '<link rel="canonical"[^>]*>|application/ld\+json|<h1[^>]*>' | sort | uniq -c
curl -sL -A "$UA" https://recyclopedia.cc/ | grep -o 'name="description" content="[^"]*"' | awk '{print length($0)-30}'
# sitemap scope (want no /academy/ or /lbg/; want /item/ once RCY-MKT-01 ships)
curl -sL https://recyclopedia.cc/sitemap-0.xml | tr '<' '\n' | grep '^loc>' | sed 's/loc>//'
# live version
curl -sS https://recyclopedia.cc | grep -o 'footer-version">[^<]*'
# search presence (manual): site:recyclopedia.cc · "how to recycle pizza box recyclopedia"
```

What was not verified: whether Search Console/Bing verification exists
(DNS-level); competitor feature depth beyond search results; the Lookup and
barcode UI were not driven in a browser (curl only). Outbound links: the
homepage's 18 were all 200 (Academy directory results are in the LBG audit).
