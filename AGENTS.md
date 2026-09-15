# AGENTS.md — recyclopedia

Canonical path
- `/Users/wmestrinho/Workspace/Projects/recyclopedia`

Project purpose
- See `README.md`.
- Live domain: `https://recyclopedia.cc` (registered 2026-06-15) — see `HANDOFF.md` for DNS/Pages wiring status.

Required baseline for AI agents
- Read this file before editing.
- Read `HANDOFF.md` first when picking up work — it holds current live state and the running TODO list. Update it at the end of every session.
- Check `git status --short --branch` before editing, committing, rebasing, or pushing.
- Preserve project-specific instructions in `CLAUDE.md`.
- Keep deployment notes current in `README.md`.
- Run validation before commit.

Pit Board — owner decisions
- Recyclopedia has **no board of its own**. Its open owner-decisions live on the
  **workspace-wide AP Ops board**, which already covers every repo:
  **https://ops.absolutelyplausible.com → Pit Board** (Cloudflare Access-gated).
- **Read it at the start of every session, before planning work:**
  `cd ../ap-ops && node scripts/pitboard.mjs read`
  Recyclopedia's items are the ones tagged `repo: recyclopedia`.
- Act only on what Luiz actually chose. Never invent an answer he has not given.
- Close what you finish, in the same commit as the work:
  `node scripts/pitboard.mjs close <key> "what actually happened"`
- File new owner-questions on the board rather than asking in chat and losing them:
  `node scripts/pitboard.mjs file <item.json>`
- Closing a board item does **not** close the GitHub issue — do that by hand.
- Standard: https://github.com/wmestrinho/ap-workspace-standards/blob/main/pitboard-standard.md
  AP Ops's §5 answers: `ap-ops/docs/PITBOARD.md`

Version rule
- Single source of truth: the `VERSION` file. Read it; never restate the number
  in prose (it has drifted every time we have).
- Format: `MAJOR.MINOR.PATCH[-alpha.N]`, no `v` prefix — enforced by
  `scripts/validate_agent_baseline.py`.
- Bump `VERSION` + `package.json` together and add a `CHANGELOG.md` entry for any
  meaningful change. CI (`.github/workflows/version-check.yml`) fails a PR that
  touches non-doc files without bumping `VERSION`.
- Fuller conventions: `ap-ops-workspace/PROJECT-RULES.md` — **this file does not
  exist yet** (checked 2026-09-15; the repo is `ap-ops`, and nothing named
  PROJECT-RULES.md is in it). Treat the rules above as authoritative until it does.

Deployment
- Cloudflare Pages (project `recyclopedia`): `npm run build && npx wrangler pages deploy dist --project-name=recyclopedia --branch=main`
- Never deploy `.` — that ships the repo root instead of the build output. Normal
  deploys are automatic: push to `main` and Pages builds. This command is the
  manual fallback only.
- Live: https://recyclopedia.pages.dev — see `HANDOFF.md` for domain status.

Validation
- Run: `python3 scripts/validate_agent_baseline.py`

Coordination warning
- Multiple AI agents may be working across this workspace. Do not run destructive git commands without checking status and coordinating with Luiz.
- Secondary machine: Windows ThinkPad Lenovo X260 using PowerShell + OpenAI Codex. Coordinate via GitHub only.
