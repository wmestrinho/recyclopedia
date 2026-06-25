# Copilot instructions — Recyclopedia

Authoritative agent guidance for this repo lives in [`CLAUDE.md`](../CLAUDE.md).
This file mirrors the key rules so Copilot's inline help stays aligned.

## What this repo is
**Recyclopedia** — a recycling education platform by Absolutely Plausible at
`recyclopedia.cc` (currently `v0.1.5 alpha`). Three areas: Academy (modules),
Lookup (searchable recyclable-items database), Donate Electronics (intake form).

**Stack:** Astro + Svelte islands · TypeScript · Cloudflare Pages · Share Tech Mono.
**Design:** AP design system, green-shifted accent (`--accent: #3d9c6b`).

## Rules that matter
- **Version:** `VERSION` file is the single source of truth (`v0.1.5 alpha`).
- **Deploy:** push to `main` → Cloudflare Pages builds (`astro build` → `dist/`).
- **Before committing:** run `python3 scripts/validate_agent_baseline.py` and
  `git status --short --branch`.

## Paired sources of truth — never auto-edit without review
- `VERSION` ↔ any visible version string.

## Division of labor
Copilot: inline completions inside Astro/Svelte/TS components, in-editor
explanations. Leave cross-file reasoning, deploys, and the baseline-validation
gate to Claude Code.

## Commits
Convention: `type(scope): subject`.
