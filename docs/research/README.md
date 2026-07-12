# Research Archive — Provenance Index

Raw research notes are archived here **verbatim** as they arrive through the
multi-agent handoff pipeline; curated outcomes live in the canonical docs and
data files. Same rules as `docs/academy/PROVENANCE.md`: research is reviewed
critically before implementation — archived text is provenance, not policy.

## Roles

- **Research agents (Gemini / external)** — sweeping research, source discovery.
- **Claude (this repo)** — review, correction, implementation into the codebase.
- **Luiz** — owner / final decision.

## Archived notes

| Note | Received | Author | Outcome in repo |
|---|---|---|---|
| [Global waste-tracking datasets](2026-07-12-global-waste-datasets.md) | 2026-07-12 | Research handoff (via Luiz) | `SOURCES` table in `src/data/organizations.ts`; "Global / macro datasets" section in `DATA_STRATEGY.md`; whitepaper v1.3 figure refresh (GWMO 2024, E-waste Monitor 2024); "Key datasets" strip on `/academy/directory` |
| [LBG directory seed (~200 orgs)](2026-07-12-lbg-directory-seed.md) | 2026-07-12 | Research handoff (via Luiz) | `ORGANIZATIONS` table in `src/data/organizations.ts`; public directory at `/academy/directory`; directory extension in `DATA_SCHEMA.md`; Module 1.7 "Why Do We Have Trash At All?" (the note's 9-stage learning path) |

## Corrections applied during implementation

1. **Argentina agency URL** in the directory seed resolved to a tourism/sports
   secretariat, not an environment authority — ingested with
   `verification_status: 'needs-review'` rather than silently fixed or dropped
   (per the note's own verification rules).
2. **Note-two schema reconciled, not adopted wholesale:** its 10 fields were
   merged with the pre-existing Atlas `organization`/`source` model in
   `DATA_SCHEMA.md`; the locked `org_role_t` enum was kept unchanged and the
   note's `category` taxonomy became a separate directory facet.
3. **Profile-per-organization pages deferred** to the future
   lettucebeetgrapefruit.org build-out; v1 ships a single filterable index.
