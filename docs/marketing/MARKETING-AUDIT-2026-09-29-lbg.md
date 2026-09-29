# Marketing audit: Lettuce Beet Grapefruit (.com + .org), 2026-09-29

> Seat 2 (ThinkPad), Claude Code. Audit only: nothing on either site was changed.
> Everything here comes from the public pages (read-only `curl` and web search)
> plus this repository's source. Companion audit:
> [MARKETING-AUDIT-2026-09-29-recyclopedia.md](MARKETING-AUDIT-2026-09-29-recyclopedia.md)
> (it includes the build-exclusion check: `docs/` is not in `dist/`, and repo
> files return the SPA fallback, not their contents).

**How the two domains are built.** Both are the same Cloudflare Pages
project and the same `dist/` as recyclopedia.cc. `functions/_middleware.js`
rewrites only the root and one short path:

| Host | `/` serves | Other paths |
|---|---|---|
| `lettucebeetgrapefruit.com` (+`www`) | `/lbg/` (community home) | `/donate` → `/lbg/donate/`; **every other path serves the shared build** |
| `lettucebeetgrapefruit.org` (+`www`) | `/academy/` (Academy home) | **every path serves the shared build** |

The intended roles are canonical in `docs/LBG_BRAND_ARCHITECTURE.md`: `.com` is
the umbrella plus the community/workshops/donations storefront, and `.org` is
LBG Academy. They are **different sites by design**, not mirrors. The
duplication problem comes from the shared build: every page of all three
brands answers on every host.

---

## 1. Summary

The .com home page is clear, warm and honest. "A community home for
learning, fixing, sharing…" is a good 5-second read, and "No fictional events
and no stale listings" is an unusually strong trust line. The Donate
Electronics page is complete and explains data wiping. The Academy has 14
modules plus a capstone with real depth (RCRA, MRF sorting, biopolymers).

What holds both sites back:

- **Search engines see one tangled site.** `.com/academy/`, `.org/lbg/`,
  `.org/lbg/donate/`, `.org/privacy/` and `recyclopedia.cc/academy/*` all
  return 200 with identical content. `.com/nope` returns the *Recyclopedia*
  homepage. The only sitemap lives on recyclopedia.cc, and both LBG
  `robots.txt` files point to it.
- **The index already shows the confusion.** A `site:` search for the two
  domains returns only `.org` pages, titled "Recyclopedia Academy" and
  "Privacy Notice | Recyclopedia". **No `.com` page appears.** A search for
  "Lettuce Beet Grapefruit" returns only salad recipes.
- **The Academy's name is split.** The `.org` homepage says "Recyclopedia
  Academy · recyclopedia.cc". The older lesson pages and the .com home say
  "LBG Academy", and the architecture doc says LBG Academy with the naming
  pass still pending.
- **The Academy is a navigation dead end.** Module pages contain **zero
  links**, and the Academy home never links to the .com community, donations
  or Recyclopedia.
- **The nonprofit story is unresolved.** The architecture calls .com a
  "non-profit-focused storefront", while the donate page says working devices
  are "refurbished and donated or resold". No legal entity is named anywhere.

### Top 5 priorities

1. **LBG-MKT-01 (P0):** enforce the host boundary. `/lbg/*` and `/donate`
   belong only on .com, `/academy/*` only on .org, and everything else goes
   to recyclopedia.cc. Use 301s in `functions/_middleware.js`, redirect `www`
   to the apex, and add a real 404.
2. **LBG-MKT-02 + LBG-MKT-03 (P1):** correct canonicals and og:url on every
   Academy page (they point at recyclopedia.cc or are missing), and give each
   host its own `robots.txt` and sitemap.
3. **LBG-MKT-04 (P1, Tier 3):** Luiz names the Academy (LBG Academy?
   LBGA?). Until then every title, footer and future `Course` schema carries
   the wrong brand.
4. **LBG-MKT-05 (P1):** give the Academy a header and footer that lead
   somewhere: the Academy home, .com, Donate and Recyclopedia.
5. **LBG-MKT-08 / LBG-MKT-09 (P1, Tier 3):** verify both domains in Search
   Console and Bing, and decide the entity and nonprofit framing before
   donations and workshops are promoted.

## 2. Scorecard

| Area | .com | .org | Reason |
|---|---|---|---|
| Positioning & messaging | B | D | .com: clear, warm, honest ("Three doors into the same mission" explains the family well). .org: branded "Recyclopedia Academy · recyclopedia.cc", which contradicts the architecture and the .com page. |
| Conversion paths | C | C- | .com: Explore workshops / Enter Academy / Donate are clear, but the calendar is empty and the only other action is a mailto. .org: "Start with Module 1.1" plus local progress tracking works, but there is no sign-up, no certificate path and no way out. |
| On-page SEO | C | D | .com: canonical, OG, one H1, alt text all fine; no JSON-LD. .org: no canonical, og:url on recyclopedia.cc, the home has no H2s, descriptions up to 281 characters, emoji favicon. |
| Technical SEO | D | D | Cross-host duplicates, soft 404, `www` not redirected, robots.txt points at another domain's sitemap, no per-host sitemap. |
| Performance / mobile | A | A | .com 3.3 KB, .org 3.0 KB HTML over the wire (brotli); the directory is 22 KB. |
| Measurement | F | F | No analytics, no sign of Search Console, no conversion record for donations or event proposals. |
| Search presence | F | D | .com: nothing indexed; the brand SERP is all recipes. .org: some pages indexed, under the wrong brand name. |
| Trust signals | B- | C | .com: the builder is named (AP), open source, license, the "no fictional events" line. .org: no author or reviewer, no "about the Academy", mixed license statement. |
| Legal | C | C | The privacy page is Recyclopedia-branded on both LBG hosts, although the .com donate form collects personal data. No entity is named, and there is no terms page. |

## 3. Findings

Severity **P0–P3** and tiers as defined in the Recyclopedia audit (Tier 1 =
an agent ships, Tier 2 = branch + Luiz review, Tier 3 = Luiz only).

### LBG-MKT-01 · P0 · Tier 1: Every page answers on every host (cross-brand duplicate content + soft 404)
- **Evidence:** `curl -s -o /dev/null -w "%{http_code} %{size_download}"`
  gives 200 17114 for `https://lettucebeetgrapefruit.com/academy/`, 200 10242
  for `https://lettucebeetgrapefruit.org/lbg/`, 200 74059 for
  `https://lettucebeetgrapefruit.org/lbg/donate/`, 200 7100 for
  `https://lettucebeetgrapefruit.com/diy/`, 200 17120 for
  `https://lettucebeetgrapefruit.org/privacy/`, and **200 272988 for
  `https://lettucebeetgrapefruit.com/nope`** (the Recyclopedia homepage served
  as the LBG 404). `www.lettucebeetgrapefruit.com/` and
  `www.lettucebeetgrapefruit.org/` return 200 with no redirect. Root cause:
  `functions/_middleware.js:1-13` rewrites only `/` (and `/donate` on .com),
  and passes every other path to the shared `dist/`. There is no
  `src/pages/404.astro`.
- **Why:** three brands compete with themselves, and search engines pick
  canonicals at random. That has already happened: `.org/privacy/` and
  `.org/diy/pallet-guide/` are indexed under "Recyclopedia" titles. Any
  mistyped .com link lands on a different brand.
- **Canonical choice (recommended, following the architecture doc):**
  .com is canonical for `/` (LBG home) and `/donate/`; .org is canonical for
  `/` (the Academy home) and `/academy/*`; recyclopedia.cc is canonical for
  everything else, including `/privacy/` and `/signs/*` until LBG has its own.
  Apex over `www` on every domain.
- **Fix:** extend `functions/_middleware.js` with a host → allowed-prefix
  map that sends a **301** for (a) `www.*` → apex, (b) `/academy/*` on .com or
  recyclopedia.cc → .org, (c) `/lbg/` → .com `/`, (d) `/lbg/donate/` → .com
  `/donate/`, (e) non-LBG paths on LBG hosts → recyclopedia.cc, and (f) on
  .org, `/academy/` → `/` so the Academy home has one URL. Keep internal
  `_astro/`, `css/`, `js/` and `images/` asset paths servable on every host.
  Add `404.astro` (shared with RCY-MKT-02). Extend the middleware tests that
  already live in `scripts/test/donate.test.mjs` with the redirect cases.
  `/dropoff/`, `/data/` and the API stay on recyclopedia.cc.

### LBG-MKT-02 · P1 · Tier 1: Academy canonicals and og:url point at recyclopedia.cc or are missing
- **Evidence:** the `.org` home (`/academy/`) has **no canonical** and
  `og:url = https://recyclopedia.cc/academy/` (`src/pages/academy/index.astro:75`).
  All 14 module pages have no canonical, and their og:url is
  `https://recyclopedia.cc/academy/module-…/`
  (`src/layouts/LbgaModule.astro:52`, `Astro.url.href` built against
  `site: 'https://recyclopedia.cc'`). The four older lesson pages *do*
  canonicalize to .org, but without the trailing slash
  (`src/pages/academy/[slug].astro:27`, `directory.astro:28`), and those URLs
  308-redirect.
- **Fix:** add a single helper that builds
  `https://lettucebeetgrapefruit.org/academy/<slug>/` (trailing slash) and
  use it for the canonical and og:url in `LbgaModule.astro`,
  `academy/index.astro` (canonical `https://lettucebeetgrapefruit.org/`),
  `[slug].astro` and `directory.astro`. On .com, `lbg/index.astro:22` and
  `lbg/donate.astro:26` are already correct.

### LBG-MKT-03 · P1 · Tier 1: No LBG sitemap; robots.txt points at recyclopedia.cc
- **Evidence:** `curl https://lettucebeetgrapefruit.com/robots.txt` and the
  `.org` equivalent both return the same file, `Sitemap:
  https://recyclopedia.cc/sitemap-index.xml` (`public/robots.txt`). That
  sitemap lists the Academy and LBG pages under `https://recyclopedia.cc/…`,
  never under their own domains.
- **Why:** a sitemap on another host is only honoured when both hosts are
  verified in the same Search Console account (not verified, see
  LBG-MKT-08), and its URLs contradict the canonicals anyway.
- **Fix:** serve a per-host `robots.txt` from the middleware (or from static
  `robots-com.txt` / `robots-org.txt` rewritten by host), and generate
  `sitemap-com.xml` (`/`, `/donate/`) and `sitemap-org.xml` (`/`,
  `/academy/*`, directory) with a small Astro endpoint in `src/pages/` that
  reads the same page list. Remove LBG paths from the recyclopedia.cc sitemap
  (RCY-MKT-04).

### LBG-MKT-04 · P1 · Tier 3: The Academy's name is inconsistent across pages and domains
- **Evidence:** the `.org` home title is "Recyclopedia Academy · LBGA Online
  School" and its eyebrow reads "Recyclopedia Academy · recyclopedia.cc". Its
  footer says "recyclopedia.cc/#academy". Module titles end "| Recyclopedia
  Academy" (`src/layouts/LbgaModule.astro:48`). The older lessons and
  directory say "LBG Academy" with a different header ("Everyone is welcome at
  the table"). The .com home says "LBG Academy". `docs/LBG_BRAND_ARCHITECTURE.md`
  §2 says the Academy is being rebranded into "Lettuce Beet Grapefruit
  Academy", with the naming pass pending. Search already shows "Recyclopedia
  Academy" for `lettucebeetgrapefruit.org` (web search, 2026-09-29).
- **Why:** a visitor coming from .com ("Enter LBG Academy") lands on a page
  that calls itself Recyclopedia and names a different domain. That also
  feeds the Recyclopedia name collision.
- **Fix (Luiz):** confirm the name. After that it is a Tier 1 sweep of
  titles, eyebrows, footers, og:site_name and schema. Pit Board F (Academy
  migration) is related; answer them together.

### LBG-MKT-05 · P1 · Tier 2: The Academy is a dead end
- **Evidence:** module pages contain **no `<a href>` at all** (for example
  `/academy/module-1-1/` and `/academy/module-2-4/`: an empty link list from
  `grep -o '<a [^>]*href'`), not even back to the Academy home. The Academy
  home links only to modules, `/diy/pallet-guide` and `/privacy`. It has no
  link to .com, Donate, Recyclopedia or GitHub.
- **Why:** it traps readers and wastes internal link equity. The Academy is
  the richest content in the family and should feed the community and the
  engine.
- **Fix:** add a slim header (Academy home · Tracks · the LBG community ·
  Recyclopedia) and a footer to `LbgaModule.astro` and `academy/index.astro`,
  with a "Next module →" link at the end of each module. Tier 2 because it
  changes the visible chrome.

### LBG-MKT-06 · P1 · Tier 1: Older lesson pages link to anchors that no longer exist
- **Evidence:** `/academy/hidden-history/`, `/academy/myths/`,
  `/academy/smartphone-sorting/`, `/academy/zero-waste-habits/` and
  `/academy/directory/` (the `LbgHeader` academy surface) link to
  `https://lettucebeetgrapefruit.org/#menu`, `#philosophy`, `#library` and
  `#about`. The current .org home (the Academy dashboard) has none of those
  ids (`grep -c 'id="menu"\|id="library"'` returns 0). The primary CTA
  "Choose a course" points at `#menu`.
- **Fix:** point the nav at existing targets (the Academy home, the track
  headings once they have ids, `/academy/directory/`) or give the dashboard
  those ids.

### LBG-MKT-07 · P1 · Tier 3: Four lessons are published twice
- **Evidence:** `/academy/module-1-1/` and `/academy/hidden-history/` ("The
  Hidden History of Your Trash"); `/academy/module-1-2/` and
  `/academy/smartphone-sorting/`; `/academy/module-1-3/` and
  `/academy/zero-waste-habits/`; `/academy/module-5/` and `/academy/myths/`.
  All eight are in the sitemap and all return 200 (already recorded in
  `docs/academy/MIGRATION-PLAN.md`).
- **Fix (Luiz):** "which duplicate wins" is already a Pit Board F question.
  Once answered, 301 the loser to the winner (Tier 1). Do not add interim
  canonicals that pre-empt his choice.

### LBG-MKT-08 · P1 · Tier 3: No measurement or search-engine verification for either domain
- **Evidence:** no analytics on any LBG page. `site:lettucebeetgrapefruit.com`
  returns no results; only `.org` URLs appear. The donate form hands off to
  `mailto:` (intake off), and "Propose an event" is a `mailto:`, so
  conversions are invisible.
- **Fix (Luiz):** add both as Domain properties in Google Search Console and
  Bing Webmaster Tools (DNS TXT, no page change) and submit the per-host
  sitemaps from LBG-MKT-03. Review Cloudflare zone analytics for traffic.
  Any page-level analytics needs a privacy-notice update first (the shared
  privacy page promises none).

### LBG-MKT-09 · P1 · Tier 3: Nonprofit and entity framing is unresolved
- **Evidence:** `docs/LBG_BRAND_ARCHITECTURE.md` calls .com the
  "non-profit-focused storefront", and open item 6 flags "the non-profit
  entity question". The .com footer says "Lettuce Beet Grapefruit. An
  Absolutely Plausible Solutions sibling project." The donate page says
  "Working devices → refurbished and donated or resold" and "Zero landfill.
  Always." No legal entity, registration or tax status appears on either
  domain, and no directory listing (Candid/GuideStar and similar) was found.
  "Lettuce Beet Grapefruit" as a search returns only salad recipes.
- **Why:** donors and venue partners will ask who receives the device, what
  "resold" funds, and whether a receipt is possible. ".org" also suggests a
  nonprofit to many visitors.
- **Fix (Luiz):** decide the entity (AP program, fiscal sponsorship or its
  own nonprofit). Then state it in one line on .com and the donate page, name
  the data controller in the privacy notice (LBG-MKT-13), and explain where
  resale proceeds go. Only after that: nonprofit directories, Google for
  Nonprofits, and local listings.

### LBG-MKT-10 · P2 · Tier 2: .com never says where it is
- **Evidence:** the .com home talks about "Meet locally" and "local
  gathering" but names no city. "Orlando, FL area" appears only deep in the
  donate page's "What happens next". Recyclopedia's hero says "Orlando, FL".
- **Why:** local community and workshops are inherently local searches
  ("electronics repair workshop Orlando", "donate electronics Orlando").
- **Fix:** put the service area in the hero sub-line and in the description,
  and add `Organization` JSON-LD with `areaServed` (LBG-MKT-12). A Google
  Business Profile is Tier 3 and needs a real address policy.

### LBG-MKT-11 · P2 · Tier 2 (copy) / Tier 3 (email tool): The primary CTA leads to an empty calendar, with no way to follow
- **Evidence:** the header CTA "See what is happening" goes to `#events`, which
  says "The first dates are being assembled", plus a mailto. There is no
  interest list or newsletter on .com or .org.
- **Fix:** make Donate or Explore workshops the header CTA until events
  exist. Add "Tell me when the first workshop is scheduled" once Luiz picks
  an email tool (Tier 3). When events exist, add `Event` JSON-LD for each one.

### LBG-MKT-12 · P2 · Tier 1: No structured data
- **Evidence:** zero `application/ld+json` on `.com/`, `.com/donate/`, the
  `.org` home, modules and lessons.
- **Fix:** on .com, `Organization` (name, url, logo, `parentOrganization` or
  `sponsor` Absolutely Plausible Solutions, `sameAs` GitHub). On .org, after
  LBG-MKT-04: `EducationalOrganization` on the home, and `Course` on each
  module (`name`, `description`, `provider`, `isAccessibleForFree: true`,
  `inLanguage: en`, `license` CC BY-NC-SA 4.0). Add `BreadcrumbList` on
  modules.

### LBG-MKT-13 · P2 · Tier 3: The privacy notice on LBG hosts is Recyclopedia's
- **Evidence:** `.com` links `/privacy`, which is titled "Privacy Notice |
  Recyclopedia" and uses Recyclopedia branding. The donate page links
  `https://recyclopedia.cc/privacy`. Personal data (name, email, device
  details) is collected on `lettucebeetgrapefruit.com/donate/`.
- **Fix (Luiz):** decide the controller (depends on LBG-MKT-09). Then either
  write an LBG privacy page or add an explicit "This notice also covers
  lettucebeetgrapefruit.com/.org, operated by …" line. The retention period
  is already a precondition for switching the intake on (HANDOFF, Pit Board E).

### LBG-MKT-14 · P2 · Tier 1: License statement inconsistent
- **Evidence:** the decided content license is CC BY-NC-SA 4.0
  (`docs/LBG_BRAND_ARCHITECTURE.md`), shown on the .com footer and the older
  lesson footers. The Academy home and every module footer instead say
  "recyclopedia.cc/#academy · CC BY-NC 4.0" (`src/pages/academy/index.astro:149`,
  `src/layouts/LbgaModule.astro:106`), as do the DIY pages
  (`src/pages/diy/*.astro`).
- **Fix:** change them to "CC BY-NC-SA 4.0" linking the license deed, and
  drop the stale `recyclopedia.cc/#academy` label. The decision already
  exists, so this is a correction, not a new choice.

### LBG-MKT-15 · P2 · Tier 1: Footer words run together on .com
- **Evidence:** the rendered HTML reads `Lettuce Beet Grapefruit.
  An<a …>Absolutely Plausible Solutions</a>sibling project.`, which displays
  as "AnAbsolutely Plausible Solutionssibling project." Cause: Astro's
  `compressHTML` removes the newline whitespace around the link in
  `src/components/LbgFooter.astro:15-19`.
- **Fix:** add `{' '}` before and after the `<a>` (or keep it on one line).

### LBG-MKT-16 · P2 · Tier 1: Academy meta hygiene
- **Evidence:** descriptions over 160 characters: module-1-7 281, 2-4 256,
  2-2 253, 1-4 233, 2-3 233, 2-6 231, 2-1 227, 1-1 216, and the home 206. The
  .org home has an H1 but **no H2s** (track labels are divs). The favicon on
  the .org home and modules is an inline "♻" emoji data-URI, not the LBG
  mark, and there is no manifest. Every og:image is hosted on
  `recyclopedia.cc`, which will break if the repos are split
  (`LBG_BRAND_ARCHITECTURE.md` open item 3).
- **Fix:** trim descriptions to 150–160 characters, make the track labels
  `<h2>`, use `/images/lbg/lbg-favicon.png` (already served) for the icon, and
  reference share images relative to the page's own host.

### LBG-MKT-17 · P3 · Tier 1: Directory outbound link rot
- **Evidence:** `/academy/directory/` has about 1,500 outbound links.
  Checking all 1,525 external URLs in the crawl (GET, following redirects, 25
  s timeout) gave 1,480 × 200, 18 × 403 (mostly bot blocking; probably fine
  in a browser), 20 × timeout, 1 × 503 and **5 × 404**. Four of the 404s are
  in the directory: `au.int/en/directorates/arbe`,
  `unep.org/regions/africa/amcen`, `circularity-gap.world/` (from
  `src/data/sources.ts:83`) and `ym.fi/en/frontpage`. The fifth is on the
  privacy page (RCY-MKT-18).
- **Fix:** update the four entries in `src/data/organizations.ts` /
  `sources.ts` after checking each org's current URL by hand, and add a
  monthly link check (script in §5).

### LBG-MKT-18 · P3 · Tier 3: Relationship to diy.recyclopedia.cc
- **Evidence:** the Academy capstone "DIY Pallet Workshop" links to
  `/diy/pallet-guide` on the shared build, while `diy.recyclopedia.cc`
  publishes overlapping DIY builds (see RCY-MKT-15). Neither site links to
  the other's copy.
- **Fix (Luiz):** decide whether DIY belongs with the Academy (.org), the
  workshops (.com) or its own subdomain, then redirect the rest.

## 4. Checklist

### Tier 1: an agent can ship
- [ ] LBG-MKT-01 host-boundary 301s + `www` → apex + `404.astro` (with RCY-MKT-02/03)
- [ ] LBG-MKT-02 Academy canonical and og:url → `lettucebeetgrapefruit.org/…/` (trailing slash)
- [ ] LBG-MKT-03 per-host robots.txt and sitemaps
- [ ] LBG-MKT-06 fix `#menu`/`#philosophy`/`#library`/`#about` anchors
- [ ] LBG-MKT-12 Organization JSON-LD on .com (Course/EducationalOrganization after LBG-MKT-04)
- [ ] LBG-MKT-14 license line → CC BY-NC-SA 4.0 on the Academy and DIY footers
- [ ] LBG-MKT-15 footer spacing in `LbgFooter.astro`
- [ ] LBG-MKT-16 description lengths, H2s, favicon, own-host og:image
- [ ] LBG-MKT-17 replace the 4 dead directory URLs (verify each by hand)

### Tier 2: branch + Luiz review
- [ ] LBG-MKT-05 Academy header/footer + "Next module"
- [ ] LBG-MKT-10 service area on the .com hero and description
- [ ] LBG-MKT-11 header CTA while the calendar is empty

### Tier 3: Luiz only
- [ ] LBG-MKT-04 Academy name (then a Tier 1 sweep)
- [ ] LBG-MKT-07 which duplicate lesson wins (Pit Board F)
- [ ] LBG-MKT-08 Search Console + Bing for both domains; analytics decision
- [ ] LBG-MKT-09 entity / nonprofit framing; where resale proceeds go
- [ ] LBG-MKT-11 email tool for an interest list
- [ ] LBG-MKT-13 privacy controller for the LBG hosts
- [ ] LBG-MKT-18 one home for DIY

**Count by severity:** P0 × 1 · P1 × 8 · P2 × 7 · P3 × 2 (18 findings).

## 5. Re-check commands

```sh
UA="Mozilla/5.0"
# host boundary: want 301s (or 404 for the junk path) instead of 200
for u in https://lettucebeetgrapefruit.com/academy/ https://lettucebeetgrapefruit.org/lbg/ \
         https://lettucebeetgrapefruit.org/lbg/donate/ https://lettucebeetgrapefruit.org/privacy/ \
         https://lettucebeetgrapefruit.com/nope https://www.lettucebeetgrapefruit.com/ \
         https://www.lettucebeetgrapefruit.org/ https://recyclopedia.cc/academy/; do
  curl -s -o /dev/null -A "$UA" -w "%{http_code} %{size_download} $u -> %{redirect_url}\n" "$u"; done
# robots + sitemap per host
curl -s https://lettucebeetgrapefruit.com/robots.txt; curl -s https://lettucebeetgrapefruit.org/robots.txt
# canonical / og:url on the Academy
for p in / /academy/module-1-1/ /academy/myths/; do
  curl -sL -A "$UA" "https://lettucebeetgrapefruit.org$p" | grep -oE 'rel="canonical"[^>]*|og:url" content="[^"]*"'; done
# dead-end check (want > 0 links on a module)
curl -sL https://lettucebeetgrapefruit.org/academy/module-1-1/ | grep -o '<a [^>]*href' | wc -l
# footer spacing + license
curl -sL https://lettucebeetgrapefruit.com/ | grep -o 'Grapefruit. An.\{0,40\}'
curl -sL https://lettucebeetgrapefruit.org/ | grep -o 'CC BY-NC[-A-Z]* 4.0'
# outbound links in the directory (polite, 10 parallel)
curl -sL https://lettucebeetgrapefruit.org/academy/directory/ | grep -oE 'href="https?://[^"]+' | sed 's/href="//' \
  | grep -v lettucebeetgrapefruit | sort -u \
  | xargs -P 10 -I{} sh -c 'echo "$(curl -s -o /dev/null -L -A "$0" -w "%{http_code}" --max-time 25 "{}") {}"' "$UA" | grep -v '^200'
# search presence (manual): site:lettucebeetgrapefruit.com · site:lettucebeetgrapefruit.org · "Lettuce Beet Grapefruit"
```

What was not verified: Search Console/Bing status (DNS-level); whether
Cloudflare Pages will return a true 404 status once `404.astro` exists (it
should; re-check after deploy); the 20 timed-out and 18 × 403 directory links
(they may work in a browser); nonprofit registrations under other names;
social profiles for LBG (none linked, none found by search).
