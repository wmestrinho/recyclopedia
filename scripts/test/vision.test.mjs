import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { VOCAB, ITEMS, ROOT } from './_load.mjs';
import { CONFIDENCE_FLOOR, buildSystemPrompt, extractContent, postProcess } from '../../src/lib/vision_core.js';

const vocabSlugs = new Set(VOCAB.map((v) => v.slug));
const hazardSlugs = new Set([...ITEMS.filter((i) => i.hazard).map((i) => i.slug), 'category:batteries', 'category:hazardous']);
const run = (obj) => postProcess(typeof obj === 'string' ? obj : JSON.stringify(obj), { vocabSlugs, hazardSlugs });

test('recorded Llama responses parse into in-vocabulary, asserted answers', () => {
  const dir = path.join(ROOT, 'scripts', 'test', 'fixtures', 'vision');
  const files = readdirSync(dir).filter((f) => f.endsWith('.json'));
  assert.ok(files.length >= 3, 'need three recorded fixtures');
  for (const f of files) {
    const { content } = JSON.parse(readFileSync(path.join(dir, f), 'utf8'));
    const out = run(content);
    assert.ok(out.candidates.length >= 1, `${f}: no candidates`);
    for (const c of out.candidates) assert.ok(vocabSlugs.has(c.slug), `${f}: ${c.slug}`);
    assert.equal(out.assert, out.candidates[0].confidence >= CONFIDENCE_FLOOR);
    assert.equal(out.dropped.length, 0);
  }
});

test('invented slugs are dropped, confidence is clamped, order is by confidence, max three', () => {
  const out = run({ candidates: [
    { slug: 'unicorn-horn', confidence: 0.99 },
    { slug: 'aluminum-can', confidence: 0.4 },
    { slug: 'category:metal', confidence: 7 },
    { slug: 'steel-tin-can', confidence: -2 },
    { slug: 'aluminum-can', confidence: 0.3 },
    { slug: 'category:glass', confidence: 'high' },
  ], material_guess: 'metal', hazard_flag: false });
  assert.deepEqual(out.candidates.map((c) => c.slug), ['category:metal', 'aluminum-can', 'steel-tin-can']);
  assert.equal(out.candidates[0].confidence, 1);
  assert.equal(out.candidates[2].confidence, 0);
  assert.deepEqual(out.dropped, ['unicorn-horn']);
});

test('never asserts below the floor, on nothing, or on garbage', () => {
  assert.equal(run({ candidates: [{ slug: 'aluminum-can', confidence: 0.59 }], material_guess: '', hazard_flag: false }).assert, false);
  assert.equal(run({ candidates: [{ slug: 'aluminum-can', confidence: 0.6 }], material_guess: '', hazard_flag: false }).assert, true);
  assert.equal(run({ candidates: [], material_guess: 'wood (not listed)', hazard_flag: false }).assert, false);
  for (const junk of ['', 'not json', '[]', 'null', '{"candidates":"lots"}']) {
    const out = run(junk);
    assert.deepEqual(out.candidates, [], junk);
    assert.equal(out.assert, false, junk);
  }
});

test('hazard: the model flag OR a known-hazard slug always attaches the safe path', () => {
  const flagged = run({ candidates: [{ slug: 'aluminum-can', confidence: 0.9 }], material_guess: '', hazard_flag: true });
  assert.equal(flagged.safe_path, 'hhw');
  const hazardItem = ITEMS.find((i) => i.hazard);
  const known = run({ candidates: [{ slug: hazardItem.slug, confidence: 0.3 }], material_guess: '', hazard_flag: false });
  assert.equal(known.hazard_flag, true, `${hazardItem.slug} must be hazardous even if the model forgot`);
  assert.equal(known.safe_path, 'hhw');
  assert.equal(run({ candidates: [{ slug: 'category:batteries', confidence: 0.2 }], material_guess: '', hazard_flag: false }).safe_path, 'hhw');
  assert.equal('safe_path' in run({ candidates: [{ slug: 'aluminum-can', confidence: 0.9 }], material_guess: '', hazard_flag: false }), false);
});

test('prompt lists every vocabulary slug; both response shapes are read', () => {
  const prompt = buildSystemPrompt(VOCAB);
  for (const v of VOCAB) assert.ok(prompt.includes(`\n${v.slug} (`), v.slug);
  assert.equal(extractContent({ result: { choices: [{ message: { content: '{"a":1}' } }] } }), '{"a":1}');
  assert.equal(extractContent({ response: '{"a":1}' }), '{"a":1}');
  assert.equal(extractContent({ response: { a: 1 } }), '{"a":1}');
  assert.equal(extractContent(undefined), '');
});
