#!/usr/bin/env node
// Recyclopedia Lens — vision recognition benchmark (Lens master plan, Card C.0).
//
// Settles VISION.md's "recognition engine is PROVISIONAL" open question with
// numbers instead of a guess: runs a folder of real phone photos through the
// candidate Workers AI vision models and scores top-1 / top-3 against labels.
//
//   node scripts/lens_bench.mjs --selftest          # prove credentials + API shapes (2 repo photos)
//   node scripts/lens_bench.mjs                     # full run over bench/fixtures/
//   node scripts/lens_bench.mjs --limit 5 --models llama
//
// Fixtures live in `bench/fixtures/` (gitignored — never commit photos to a
// public repo). Owner drops them there from Drive `RandDRecyclopedia/lens-fixtures/`
// together with `labels.json`: { "IMG_0001.jpg": "smartphone", ... } where each
// value is an item slug or `category:<name>` from VOCAB.
//
// Credentials: CLOUDFLARE_API_TOKEN + CF_ACCOUNT_ID, or the wrangler OAuth token
// (~/.wrangler/config/default.toml) is used automatically — run `npx wrangler login`
// first. Real Workers AI usage is billed; a full 40-photo run over both models is
// a few cents.
//
// API shapes verified live 2026-09-15 (the docs show neither):
//   llama-4-scout  OpenAI content parts, image as a data: URI in image_url.url;
//                  `guided_json` for structured output; answer at
//                  result.choices[0].message.content.
//   moondream3.1   { task:'query', image:<data URI>, question, stream:false }.
//                  `stream` MUST be sent as false — omitting it returns an empty
//                  result object with success:true. Answer at result.result.answer;
//                  free text, so it is matched back to VOCAB by label/alias.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FIXTURES = path.join(ROOT, 'bench', 'fixtures');
const IMAGE_RE = /\.(jpe?g|png|webp|heic)$/i;

const MODELS = {
  llama: {
    id: '@cf/meta/llama-4-scout-17b-16e-instruct',
    label: 'Llama 4 Scout 17B',
    price: { in: 0.27, out: 0.85 }, // USD per 1M tokens
    structured: true,
  },
  moondream: {
    id: '@cf/moondream/moondream3.1-9B-A2B',
    label: 'Moondream 3.1 9B',
    price: { in: 0.3, out: 1.0 },
    structured: false,
  },
};

// ── args ───────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback;
};
const has = (name) => argv.includes(`--${name}`);
const SELFTEST = has('selftest');
const LIMIT = Number(flag('limit', '0')) || 0;
const CHOSEN = (flag('models', 'llama,moondream')).split(',').map((s) => s.trim()).filter((m) => MODELS[m]);

// ── credentials ────────────────────────────────────────────────────────────
function wranglerToken() {
  const candidates = [
    path.join(os.homedir(), '.wrangler', 'config', 'default.toml'),
    path.join(os.homedir(), 'Library', 'Preferences', '.wrangler', 'config', 'default.toml'),
  ].filter(existsSync);
  let best = null;
  for (const file of candidates) {
    const text = readFileSync(file, 'utf8');
    const token = text.match(/^oauth_token\s*=\s*"([^"]+)"/m)?.[1];
    const expires = text.match(/^expiration_time\s*=\s*"([^"]+)"/m)?.[1];
    if (!token) continue;
    const when = expires ? Date.parse(expires) : 0;
    if (!best || when > best.when) best = { token, when, file };
  }
  if (best && best.when && best.when < Date.now()) {
    console.warn(`[warn] the wrangler token in ${best.file} expired at ${new Date(best.when).toISOString()} — run \`npx wrangler login\``);
  }
  return best?.token ?? null;
}

function accountId() {
  if (process.env.CF_ACCOUNT_ID) return process.env.CF_ACCOUNT_ID;
  try {
    const out = execFileSync('npx', ['wrangler', 'whoami'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    return out.match(/\b([0-9a-f]{32})\b/)?.[1] ?? null;
  } catch { return null; }
}

const TOKEN = process.env.CLOUDFLARE_API_TOKEN || wranglerToken();
const ACCOUNT = accountId();
if (!TOKEN || !ACCOUNT) {
  console.error('Missing credentials. Set CLOUDFLARE_API_TOKEN + CF_ACCOUNT_ID, or run `npx wrangler login`.');
  process.exit(1);
}

// ── vocabulary (built by `npm run build` → dist/data/vocab.json) ────────────
const vocabFile = path.join(ROOT, 'dist', 'data', 'vocab.json');
if (!existsSync(vocabFile)) {
  console.error('dist/data/vocab.json missing — run `npm run build` first.');
  process.exit(1);
}
const { vocab: VOCAB } = JSON.parse(readFileSync(vocabFile, 'utf8'));
const VOCAB_SLUGS = new Set(VOCAB.map((v) => v.slug));

// AP_GUIDELINES in three lines + the closed list. The server-side prompt in
// functions/api/vision.js must stay in step with this one.
const SYSTEM_PROMPT = [
  'You identify ONE household object for a recycling encyclopedia.',
  'Choose only from the provided list. If you are unsure which exact item it is, prefer a "category:" entry — never invent a slug and never guess.',
  'Flag hazards (batteries, chemicals, sharps, pressurised cans).',
  '',
  'List:',
  VOCAB.map((v) => (v.aliases.length ? `${v.slug} (${v.label}; ${v.aliases.slice(0, 4).join(', ')})` : `${v.slug} (${v.label})`)).join('\n'),
].join('\n');

const CANDIDATE_SCHEMA = {
  type: 'object',
  properties: {
    candidates: {
      type: 'array', maxItems: 3,
      items: {
        type: 'object',
        properties: { slug: { type: 'string' }, confidence: { type: 'number' } },
        required: ['slug', 'confidence'],
      },
    },
    material_guess: { type: 'string' },
    hazard_flag: { type: 'boolean' },
  },
  required: ['candidates', 'material_guess', 'hazard_flag'],
};

// ── helpers ────────────────────────────────────────────────────────────────
function dataUri(file) {
  // Downscale to the same ~768px long edge the client will send, so latency and
  // token counts here mean something for production.
  const tmp = path.join(os.tmpdir(), `lens-bench-${path.basename(file).replace(IMAGE_RE, '')}.jpg`);
  try {
    execFileSync('sips', ['-Z', '768', '-s', 'format', 'jpeg', '-s', 'formatOptions', '80', file, '--out', tmp], { stdio: 'ignore' });
    return { uri: 'data:image/jpeg;base64,' + readFileSync(tmp).toString('base64'), bytes: readFileSync(tmp).length };
  } catch {
    const raw = readFileSync(file);
    return { uri: 'data:image/jpeg;base64,' + raw.toString('base64'), bytes: raw.length };
  }
}

async function run(modelId, body) {
  const started = Date.now();
  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/ai/run/${modelId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  return { ms: Date.now() - started, ok: res.ok && json.success !== false, json };
}

/** Free text → the best VOCAB slug it names. Longest label/alias match wins. */
export function matchVocab(text) {
  const hay = ` ${String(text).toLowerCase().replace(/[^a-z0-9]+/g, ' ')} `;
  let best = null;
  for (const v of VOCAB) {
    for (const needle of [v.label, ...v.aliases]) {
      const n = ` ${needle.toLowerCase().replace(/[^a-z0-9]+/g, ' ')} `;
      if (n.trim().length < 3 || !hay.includes(n)) continue;
      if (!best || n.length > best.len) best = { slug: v.slug, len: n.length };
    }
  }
  return best?.slug ?? null;
}

async function askLlama(uri) {
  const { ms, ok, json } = await run(MODELS.llama.id, {
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: [
        { type: 'text', text: 'Identify the single main object in this photo.' },
        { type: 'image_url', image_url: { url: uri } },
      ] },
    ],
    guided_json: CANDIDATE_SCHEMA,
    max_tokens: 256,
  });
  const content = json?.result?.choices?.[0]?.message?.content ?? '';
  let parsed = null;
  try { parsed = JSON.parse(content); } catch { /* guided_json should prevent this */ }
  const candidates = (parsed?.candidates ?? [])
    .filter((c) => VOCAB_SLUGS.has(c.slug))
    .map((c) => ({ slug: c.slug, confidence: Math.min(1, Math.max(0, Number(c.confidence) || 0)) }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
  const usage = json?.result?.usage ?? {};
  return { ms, ok, candidates, raw: content,
    dropped: (parsed?.candidates ?? []).filter((c) => !VOCAB_SLUGS.has(c.slug)).map((c) => c.slug),
    hazard: !!parsed?.hazard_flag, material: parsed?.material_guess ?? '',
    tokensIn: usage.prompt_tokens ?? 0, tokensOut: usage.completion_tokens ?? 0 };
}

async function askMoondream(uri) {
  const { ms, ok, json } = await run(MODELS.moondream.id, {
    task: 'query', image: uri, stream: false, reasoning: false, max_tokens: 96,
    question: 'Name the single main object in this photo in one short noun phrase, as a person would call it. Answer with the name only.',
  });
  const answer = json?.result?.result?.answer ?? '';
  const metrics = json?.result?.result?.metrics ?? {};
  const slug = matchVocab(answer);
  return { ms, ok, candidates: slug ? [{ slug, confidence: 0.5 }] : [], raw: answer, dropped: [],
    hazard: false, material: answer,
    tokensIn: metrics.input_tokens ?? 0, tokensOut: metrics.output_tokens ?? 0 };
}

const ASK = { llama: askLlama, moondream: askMoondream };

// ── selftest: two photos from the repo, no scoring ─────────────────────────
async function selftest() {
  const shots = ['public/images/diy/dj-03-boards.jpeg', 'public/images/diy/build-shoe-rack-b.jpeg']
    .map((p) => path.join(ROOT, p)).filter(existsSync);
  if (!shots.length) { console.error('no repo images found for the selftest'); process.exit(1); }
  console.log(`Selftest — ${shots.length} repo photo(s), models: ${CHOSEN.join(', ')}`);
  console.log('(these are DIY build photos, not fixtures: this proves credentials and API shapes, not accuracy)\n');
  for (const shot of shots) {
    const { uri, bytes } = dataUri(shot);
    console.log(`${path.basename(shot)} (${Math.round(bytes / 1024)} KB)`);
    for (const key of CHOSEN) {
      const r = await ASK[key](uri);
      const top = r.candidates.map((c) => `${c.slug} ${c.confidence.toFixed(2)}`).join(', ') || '—';
      console.log(`  ${MODELS[key].label.padEnd(18)} ${String(r.ms).padStart(5)} ms  ok=${r.ok}  → ${top}`);
      if (!r.candidates.length || r.dropped.length) console.log(`      raw: ${String(r.raw).replace(/\s+/g, ' ').slice(0, 160)}`);
    }
  }
}

// ── full benchmark ─────────────────────────────────────────────────────────
function pct(n, d) { return d ? `${((n / d) * 100).toFixed(1)}%` : '—'; }
function percentile(values, p) {
  if (!values.length) return 0;
  const s = [...values].sort((a, b) => a - b);
  return s[Math.min(s.length - 1, Math.ceil((p / 100) * s.length) - 1)];
}

async function benchmark() {
  if (!existsSync(FIXTURES)) {
    console.error(`No fixtures. Create ${path.relative(ROOT, FIXTURES)}/ and copy the photos + labels.json`);
    console.error('from Drive RandDRecyclopedia/lens-fixtures/ (the folder is gitignored — never commit photos).');
    process.exit(1);
  }
  const labelsFile = path.join(FIXTURES, 'labels.json');
  if (!existsSync(labelsFile)) { console.error(`Missing ${path.relative(ROOT, labelsFile)}`); process.exit(1); }
  const labels = JSON.parse(readFileSync(labelsFile, 'utf8'));

  const unknown = Object.entries(labels).filter(([, slug]) => !VOCAB_SLUGS.has(slug));
  if (unknown.length) {
    console.error('labels.json names slugs that are not in VOCAB — fix these first:');
    for (const [f, s] of unknown) console.error(`  ${f} → ${s}`);
    process.exit(1);
  }

  let files = readdirSync(FIXTURES).filter((f) => IMAGE_RE.test(f)).sort();
  const unlabelled = files.filter((f) => !labels[f]);
  if (unlabelled.length) console.warn(`[warn] skipping ${unlabelled.length} unlabelled image(s)`);
  files = files.filter((f) => labels[f]);
  if (LIMIT) files = files.slice(0, LIMIT);
  if (!files.length) { console.error('no labelled images found'); process.exit(1); }

  console.log(`Benchmarking ${files.length} photo(s) × ${CHOSEN.length} model(s)…\n`);
  const results = Object.fromEntries(CHOSEN.map((k) => [k, { rows: [], top1: 0, top3: 0, catOnly: 0, errors: 0, ms: [], tin: 0, tout: 0, invented: 0 }]));

  for (const file of files) {
    const truth = labels[file];
    const { uri } = dataUri(path.join(FIXTURES, file));
    for (const key of CHOSEN) {
      const r = await ASK[key](uri);
      const acc = results[key];
      if (!r.ok) acc.errors += 1;
      acc.ms.push(r.ms); acc.tin += r.tokensIn; acc.tout += r.tokensOut;
      acc.invented += r.dropped.length;
      const slugs = r.candidates.map((c) => c.slug);
      const hit1 = slugs[0] === truth;
      const hit3 = slugs.includes(truth);
      // Landing on the right CATEGORY when the exact item is missed is still a
      // useful answer (the material default path) — counted separately.
      const truthCat = truth.startsWith('category:') ? truth : null;
      const catHit = !hit3 && slugs.some((s) => s.startsWith('category:') && (truthCat ? s === truthCat : true));
      if (hit1) acc.top1 += 1;
      if (hit3) acc.top3 += 1;
      if (catHit) acc.catOnly += 1;
      acc.rows.push({ file, truth, slugs, ms: r.ms, hit1, hit3, catHit, raw: r.raw });
      process.stdout.write(`${hit1 ? '✓' : hit3 ? '~' : catHit ? '·' : '✗'}`);
    }
  }
  process.stdout.write('\n\n');

  const date = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Lens recognition benchmark — ${date}`, '');
  lines.push(`Fixtures: **${files.length}** labelled photos · vocabulary: **${VOCAB.length}** entries (${VOCAB.length - 11} items + 11 categories).`);
  lines.push('Images downscaled to a 768px long edge, JPEG q80 — the same shape the client sends.', '');
  lines.push('Pass bar (master plan Card C.0): top-3 ≥ 85%, top-1 ≥ 65%, p95 < 4s.', '');
  lines.push('| Model | top-1 | top-3 | category-only | p50 | p95 | errors | invented slugs | est. cost / 1k scans |');
  lines.push('|---|---|---|---|---|---|---|---|---|');
  for (const key of CHOSEN) {
    const a = results[key], n = a.rows.length, m = MODELS[key];
    const cost = ((a.tin / n) * m.price.in + (a.tout / n) * m.price.out) / 1e6 * 1000;
    lines.push(`| ${m.label} | ${pct(a.top1, n)} | ${pct(a.top3, n)} | ${pct(a.catOnly, n)} | ${percentile(a.ms, 50)} ms | ${percentile(a.ms, 95)} ms | ${a.errors} | ${a.invented} | $${cost.toFixed(2)} |`);
  }
  lines.push('');
  for (const key of CHOSEN) {
    const a = results[key];
    const misses = a.rows.filter((r) => !r.hit3);
    if (!misses.length) continue;
    lines.push(`### ${MODELS[key].label} — missed (${misses.length})`, '');
    lines.push('| Photo | Expected | Returned |', '|---|---|---|');
    for (const r of misses) lines.push(`| ${r.file} | \`${r.truth}\` | ${r.slugs.map((s) => `\`${s}\``).join(', ') || `_${String(r.raw).replace(/\s+/g, ' ').slice(0, 60)}_`} |`);
    lines.push('');
  }
  lines.push('## Decision', '', '<!-- Fill in: chosen model, and whether Tier 3 ships item-level or category-only. -->', '');

  const outDir = path.join(ROOT, 'docs', 'research');
  mkdirSync(outDir, { recursive: true });
  const out = path.join(outDir, `${date}-lens-benchmark.md`);
  writeFileSync(out, lines.join('\n'));
  console.log(lines.slice(4, 4 + CHOSEN.length + 4).join('\n'));
  console.log(`\nWritten: ${path.relative(ROOT, out)}`);
}

// Only run when executed directly — keeps `matchVocab` importable from a test.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await (SELFTEST ? selftest() : benchmark());
}
