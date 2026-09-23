# Academy migration plan

2026-09-22 · Seat 2 (ThinkPad, Claude Code) · Pit Board `F`

Luiz chose **schedule** ("still moving — plan it as a proper piece of work")
and wrote:

> This should've already happened.. NO wonder the Academy seemed less than
> what we had planned. More needs to be clarify on this. This material and all
> its content is meant to be internal to be used on multiple projects, but
> apparently we drifted away from that... let me know if you have any
> questions about this

This plan takes that note literally: the Academy is not "a website that lives
in the wrong repo". It is **a body of teaching material that several projects
draw from**, and the website is only one place it shows up. That changes the
move from "copy the pages to another repo" into "pull the material out into
its own home, then let each site render it". Nothing here has been moved yet.
The questions at the end decide the details; the sequence works either way.

## 1. What exists today (inventory, 2026-09-22)

All of it is in this repo and ships with recyclopedia.cc.
`lettucebeetgrapefruit.org/` is the same deployment with its root rewritten to
`/academy/` by `functions/_middleware.js`.

| Piece | Where | Notes |
|---|---|---|
| 14 lesson pages | `src/pages/academy/module-1-1.astro` … `module-1-7`, `module-2-1` … `module-2-6`, `module-5` | Content is written **inside** the page markup, mixed with layout. |
| 4 older lesson versions | `src/content/academy/*.md`, served by `src/pages/academy/[slug].astro` at `/academy/hidden-history`, `/smartphone-sorting`, `/zero-waste-habits`, `/myths` | **Duplicates** of modules 1.1, 1.2, 1.3 and 5 in the older markdown form. Two live URLs per lesson; they may already disagree. |
| Academy home | `src/pages/academy/index.astro` | "The Menu", Taste Tests. |
| Directory of 249 organisations | `src/pages/academy/directory.astro`, `src/components/Directory.svelte`, `src/data/organizations.ts` | `organizations.ts` re-exports `SOURCES` from `sources.ts`, which the **engine** also uses (citation chips on answer cards). |
| Quizzes | `src/data/quizzes.ts`, `src/components/Quiz.svelte`, `QuizLbga.svelte` | |
| Lesson layout and blocks | `src/layouts/LbgaModule.astro`, `src/components/LbgaBriefing.astro`, `LbgaFieldBrief.astro`, `LbgHeader.astro` / `LbgFooter.astro` (shared with the `.com` page) | |
| Theme | `public/css/lbg-theme.css`, `public/css/style.css` | Shared with recyclopedia.cc and the `.com` page. |
| Engine → lesson links | `src/data/lessons.ts` (Card D.2) | Answer cards link lessons at **absolute** `lettucebeetgrapefruit.org/academy/...` URLs. Also exported in `/data/materials.json`. |
| Research and provenance | `docs/academy/PROVENANCE.md`, `docs/academy/b2b-source/` (SOP checklists, vendor SLA, multilingual posters) | The B2B material is operations content, not public lessons. |
| Outside the repo | Drive `RandDRecyclopedia` (Gemini drafts, `[SCOPE] NOT FINAL Recyclopedia Academy`), `Interactive School Modules.zip` (local, gitignored), `design_handoff_lbga_theme/` | Source material that never became lessons. |

## 2. Where it goes

Proposed shape; the questions in §6 can change any row.

| What | Destination | Why |
|---|---|---|
| **The material itself**: lesson text, quizzes, the organisation directory data, sources, research notes, B2B operations content | **A new private repository**, working name `lbg-academy`, holding plain Markdown + JSON only | "Internal, to be used on multiple projects". One source, no site code. Private, because B2B and draft material is not public (the recyclopedia repo is public). |
| **The public Academy website** | Rendered from that repo; hosted at `lettucebeetgrapefruit.org` | Either a small Astro site in the same repo, or a separate `lbg-academy-site` repo. Question 3. |
| **The `.com` community page and Donate Electronics** | Stay here for now | Pit Board `E` put Donate Electronics on `.com` "for now"; moving `.com` is a separate decision. |
| **Recyclopedia's engine** | Stays here; keeps only what the engine uses | `sources.ts` (citations) and `lessons.ts` (links out) stay. They point at the Academy; they do not contain it. |
| **The shared theme** | Copied once into the new site, then owned there | Two copies drift. Accepting that is cheaper than a shared package for three CSS files. Question 5. |

## 3. Sequence

Each step is shippable on its own and leaves every live URL working.

**Step 0: Decisions (Luiz).** Answer §6. Nothing moves before questions 1–3.

**Step 1: Freeze and deduplicate (this repo, small).**
- No new lessons here from now on. New material goes into the new repo from
  its first day.
- Pick one version of modules 1.1, 1.2, 1.3 and 5 (the page or the markdown).
  Redirect the loser's URL to the winner, and delete the loser.

**Step 2: Create the material repo (new, private).**
- Structure: `lessons/<id>.md` (frontmatter: id, title, track, module, order,
  summary, lang, quizzes, sources), `quizzes/*.json`,
  `directory/organizations.json`, `sources.json`, `research/`, `b2b/`,
  `PROVENANCE.md`.
- Extract the 14 lessons from `.astro` markup into Markdown. **Content work,
  not a copy**: the prose is interleaved with layout components (briefings,
  field briefs, quiz islands). Each needs a Markdown convention, e.g. a fenced
  `:::briefing` block or a frontmatter list.
- Move `quizzes.ts` and `organizations.ts` to JSON, with their tests.
- Move `docs/academy/b2b-source/` and `PROVENANCE.md`, and bring in the Drive
  drafts worth keeping.

**Step 3: Build the Academy site from the material repo.**
- Astro, reusing `LbgaModule.astro`, the quiz islands and `Directory.svelte`,
  moved over and not rewritten.
- Deploy as a **new Cloudflare Pages project**, first on a `*.pages.dev`
  preview. Compare it page by page with today's `/academy/`.

**Step 4: Switch the domain (owner, Cloudflare).**
- Move the `lettucebeetgrapefruit.org` custom domain from the `recyclopedia`
  Pages project to the new one.
- Keep the same paths (`/academy/module-1-1/` …) so the engine's links and
  every shared link keep working. Moving to cleaner paths later would take a
  redirect table.

**Step 5: Remove the Academy from recyclopedia.**
- Delete `src/pages/academy/`, `src/content/academy/`, the lesson components,
  `quizzes.ts`, `organizations.ts` (keep `sources.ts`), `docs/academy/`.
- Add `public/_redirects`: `/academy/*` →
  `https://lettucebeetgrapefruit.org/academy/:splat` 301, so old
  recyclopedia.cc/academy links land in the right place.
- Remove the `.org` rule from `functions/_middleware.js`.
- `lessons.ts` needs no change: it already links to `.org` by absolute URL.
- Bump the version (`0.x` minor: the site loses a section), and update the
  CHANGELOG, README, CLAUDE.md, `LBG_BRAND_ARCHITECTURE.md` and
  `LBG_DNS_WIRING.md`.

**Step 6: Other projects draw from the material.** For example: workshop
handouts for the `.com` repair workshops, the facility statistics and charts
from Pit Board `D`, AP website articles. Each project reads the material repo;
none copies it.

## 4. Risks

| Risk | What it breaks | Mitigation |
|---|---|---|
| Broken links | Engine answer cards (`lessons.ts`), `/data/materials.json`, shared links to `recyclopedia.cc/academy/...` | Keep the paths in step 4; add the 301 table in step 5; add a link check (every `lessons.ts` URL returns 200) before the switch. |
| Duplicate lessons disagree | Readers get two answers to one lesson today | Step 1, before anything moves. |
| "Internal" vs. already public under CC BY-NC-SA | Lessons have been public and licensed since v0.1.7. Licences cannot be withdrawn from copies already out there. | Decide what "internal" means (question 1). Private *drafts and B2B* material fits it; published lessons stay public. |
| Theme drift between three sites | Visual inconsistency | Copy once and own it in the Academy repo; recyclopedia keeps its sketch theme. |
| Two deploys instead of one | More to maintain. Auto-deploy is already broken here (since July). | Fix the GitHub App connection first (owner, see CLAUDE.md), or deploy both manually with a documented command. |
| SEO: pages move hosts | Ranking dip on recyclopedia.cc/academy URLs | 301s; only 5 of the 19 Academy pages carry a canonical tag today, so give every page a canonical on `.org` in step 3; regenerate the sitemap on the new site. |
| Scope creep: "naming pass" and rebrand | The move never finishes | Move first, rename second. `LBG_BRAND_ARCHITECTURE.md` already says names change during the move; do that as its own step after step 5. |

## 5. Size

Rough and unmeasured. Steps 1 and 5 are one session each. Step 2 is the real
work: 14 lessons of content extraction, likely two to three sessions. Step 3
is one to two. Step 4 is owner time in the Cloudflare dashboard, minutes.

## 6. Questions for Luiz

1. **"Internal" means what, exactly?** (a) the material has one private home
   and several sites draw on it, while published lessons stay public (the plan
   above); (b) the lessons themselves should stop being public; or (c)
   something else. (b) conflicts with the CC BY-NC-SA licence already on them.
2. **Which projects draw on it?** Named ones help the repo structure: the
   `.org` Academy, the `.com` workshops, Recyclopedia answer cards, the AP
   website, client work, others?
3. **One repo or two?** Material and site together in `lbg-academy`, or
   material private and a separate public site repo?
4. **Paths on `.org`:** keep `/academy/module-1-1/` (no redirects needed), or
   clean paths like `/lessons/hidden-history/` (needs a redirect table)?
5. **Theme:** copy once and let the Academy own it, or a shared package all
   three sites import?
6. **Which duplicate wins** for modules 1.1, 1.2, 1.3 and 5: the newer
   `module-*.astro` pages, or the older markdown versions?
7. **What "less than planned" means.** What did you expect the Academy to be
   that it is not? Your answer shapes step 2 (content model) more than
   anything else.
8. **Timing:** start now, or after the Florida experiment and Donate
   Electronics PRs are merged and deployed?
