# AGENTS.md — recyclopedia

Canonical path
- `/Users/wmestrinho/Workspace/Projects/recyclopedia`

Legacy path
- `/Users/wmestrinho/.openclaw/workspace/projects/psychicrecycle`
- Treat legacy path as deprecated. Do not start new work there.

Project purpose
- See `README.md` — project purpose TBD.
- Planned live target: `https://psychicrecycle.absolutelyplausible.com` (dedicated domain pending)

Required baseline for AI agents
- Read this file before editing.
- Check `git status --short --branch` before editing, committing, rebasing, or pushing.
- Preserve project-specific instructions in `CLAUDE.md`.
- Keep deployment notes current in `README.md`.
- Run validation before commit.

Version rule
- Single source of truth: `VERSION`
- Current baseline version: `v0.1.0 alpha`
- Bump version for any meaningful change.

Deployment
- Deployment not yet defined. Add exact deploy command/target when this repo is next touched.

Validation
- Run: `python3 scripts/validate_agent_baseline.py`

Coordination warning
- Multiple AI agents may be working across this workspace. Do not run destructive git commands without checking status and coordinating with Luiz.
- Secondary machine: Windows ThinkPad Lenovo X260 using PowerShell + OpenAI Codex. Coordinate via GitHub only.
