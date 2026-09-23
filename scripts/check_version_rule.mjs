#!/usr/bin/env node
// The AP version rule, runnable — ap-ops/docs/PROJECT-RULES.md §1, §2, §5.
//
// The rule is not this repo's invention and this file is not "the check": the
// rule is stated once, in ap-ops, for every AP repo (Pit Board H, 2026-09-21:
// "it was never meant to be a check. the version rule was stated from ap-ops
// for every repo"). This script only makes it cheap to follow — run it before
// you push, and CI runs the same thing on every push to main and on every PR.
//
//   node scripts/check_version_rule.mjs                 # vs origin/main (before you push)
//   node scripts/check_version_rule.mjs <base-ref>      # vs any ref (CI passes the pushed range's base)
//   node scripts/check_version_rule.mjs --consistency   # only §1/§2 file checks, no diff
//
// What it enforces:
//   §1  VERSION is bare SemVer (`N.N.N` or `N.N.N-alpha|beta|rc.N`, no `v`);
//       package.json "version" equals VERSION exactly.
//   §2  CHANGELOG.md keeps an `## [Unreleased]` section and has a dated
//       `## [<VERSION>] - YYYY-MM-DD` section for the current VERSION.
//   §5  If anything other than docs / CI config changed since <base>, VERSION
//       changed too. Exempt: *.md, *.txt, docs/**, .github/**.
import { readFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const consistencyOnly = args.includes('--consistency');
const base = args.find((a) => !a.startsWith('--')) ?? 'origin/main';

const errors = [];
const read = (f) => readFileSync(path.join(ROOT, f), 'utf8');

// §1 — format and package.json agreement.
const version = read('VERSION').trim().split(/\r?\n/)[0].trim();
if (!/^\d+\.\d+\.\d+(?:-(?:alpha|beta|rc)\.\d+)?$/.test(version)) {
  errors.push(`VERSION ${JSON.stringify(version)} is not bare SemVer (N.N.N or N.N.N-alpha.N, no "v").`);
}
if (existsSync(path.join(ROOT, 'package.json'))) {
  const pkg = JSON.parse(read('package.json')).version;
  if (pkg !== version) errors.push(`package.json version ${pkg} does not match VERSION ${version}.`);
}

// §2 — CHANGELOG sections.
if (!existsSync(path.join(ROOT, 'CHANGELOG.md'))) {
  errors.push('CHANGELOG.md is missing.');
} else {
  const log = read('CHANGELOG.md');
  if (!/^## \[Unreleased\]/m.test(log)) errors.push('CHANGELOG.md has no "## [Unreleased]" section.');
  const esc = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (!new RegExp(`^## \\[${esc}\\] - \\d{4}-\\d{2}-\\d{2}`, 'm').test(log)) {
    errors.push(`CHANGELOG.md has no dated "## [${version}] - YYYY-MM-DD" section.`);
  }
}

// §5 — a non-doc change carries a VERSION bump.
if (!consistencyOnly) {
  const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8' }).trim();
  let changed = null;
  try {
    git('rev-parse', '--verify', '--quiet', `${base}^{commit}`);
    changed = git('diff', '--name-only', `${base}...HEAD`).split('\n').filter(Boolean);
  } catch {
    // New branch pushed with no usable base (all-zero "before" sha), or a
    // shallow clone that lacks it: nothing to compare, so only §1/§2 apply.
    console.log(`version rule: base ${base} not available — skipping the bump comparison.`);
  }
  if (changed) {
    const exempt = (f) => /\.(md|txt)$/i.test(f) || f.startsWith('docs/') || f.startsWith('.github/');
    const source = changed.filter((f) => !exempt(f));
    if (source.length && !changed.includes('VERSION')) {
      errors.push(
        `Source files changed since ${base} but VERSION was not bumped:\n    ` +
          source.slice(0, 15).join('\n    ') +
          (source.length > 15 ? `\n    …and ${source.length - 15} more` : ''),
      );
    }
  }
}

if (errors.length) {
  console.error('VERSION RULE FAILED (ap-ops/docs/PROJECT-RULES.md)');
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
console.log(`VERSION RULE OK — ${version}${consistencyOnly ? ' (consistency only)' : ` vs ${base}`}`);
