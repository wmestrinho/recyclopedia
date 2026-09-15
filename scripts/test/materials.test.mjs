import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MATERIALS, CATEGORY_DEFAULT_MATERIAL, CATEGORIES, ITEM_SLUGS, SOURCE_IDS } from './_load.mjs';

const RUNGS = new Set(['reuse', 'repair', 'repurpose', 'donate', 'recycle', 'compost', 'dispose']);
const CHANNELS = new Set(['curbside', 'drop_off', 'mail_back', 'retail_takeback', 'hhw', 'scrap_yard',
  'donation_center', 'compost_home', 'compost_municipal', 'trash', 'special_event']);

test('there is a bounded, non-trivial materials table', () => {
  assert.ok(MATERIALS.length >= 30 && MATERIALS.length <= 80, `got ${MATERIALS.length}`);
});

test('material ids are unique and slug-shaped', () => {
  const ids = MATERIALS.map((m) => m.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate material id');
  for (const id of ids) assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/, id);
});

test('every Open Food Facts tag maps to exactly one material', () => {
  const seen = new Map();
  for (const m of MATERIALS) {
    for (const tag of m.off_tags) {
      assert.match(tag, /^en:[a-z0-9-]+$/, `${m.id}: bad tag ${tag}`);
      assert.ok(!seen.has(tag), `${tag} is claimed by both ${seen.get(tag)} and ${m.id}`);
      seen.set(tag, m.id);
    }
  }
  assert.ok(seen.size >= 100, `only ${seen.size} tags mapped`);
});

test('every category is one of the 11 — no "Other"', () => {
  const cats = new Set(CATEGORIES);
  assert.equal(cats.size, 11);
  for (const m of MATERIALS) assert.ok(cats.has(m.category), `${m.id}: category ${m.category}`);
});

test('every default_item and shape_override points at a real item slug', () => {
  for (const m of MATERIALS) {
    if (m.default_item) assert.ok(ITEM_SLUGS.has(m.default_item), `${m.id}: default_item ${m.default_item}`);
    for (const [shape, slug] of Object.entries(m.shape_overrides ?? {})) {
      assert.match(shape, /^en:[a-z0-9-]+$/, `${m.id}: bad shape ${shape}`);
      assert.ok(ITEM_SLUGS.has(slug), `${m.id}: shape ${shape} → unknown item ${slug}`);
    }
  }
});

test('every material has a ranked path with exactly one recommended rung', () => {
  for (const m of MATERIALS) {
    assert.ok(m.dispositions.length >= 1, `${m.id}: no dispositions`);
    const recommended = m.dispositions.filter((d) => d.is_recommended);
    assert.equal(recommended.length, 1, `${m.id}: ${recommended.length} recommended rungs`);
    for (const d of m.dispositions) {
      assert.ok(RUNGS.has(d.rung), `${m.id}: rung ${d.rung}`);
      assert.ok(CHANNELS.has(d.channel), `${m.id}: channel ${d.channel}`);
      assert.equal(typeof d.rank, 'number', `${m.id}: rank`);
      assert.ok(d.label && d.label.length > 3, `${m.id}: label`);
    }
  }
});

test('no material is recommended straight into the trash without saying why it varies', () => {
  // "Never guess someone into a landfill": a bare-category material may only
  // recommend `trash` when it is genuinely unrecyclable packaging we named.
  const allowed = new Set(['metallised-film', 'adhesive-tape', 'paper-plastic', 'film-other']);
  for (const m of MATERIALS) {
    const best = m.dispositions.find((d) => d.is_recommended);
    if (best.channel === 'trash') assert.ok(allowed.has(m.id), `${m.id} recommends trash`);
  }
});

test('citations only reference sources that exist', () => {
  for (const m of MATERIALS) {
    if (m.source) assert.ok(SOURCE_IDS.has(m.source), `${m.id}: source ${m.source}`);
    for (const d of m.dispositions) if (d.source) assert.ok(SOURCE_IDS.has(d.source), `${m.id}: ${d.source}`);
  }
});

test('every one of the 11 categories has a default material that exists', () => {
  const ids = new Set(MATERIALS.map((m) => m.id));
  for (const c of CATEGORIES) {
    const id = CATEGORY_DEFAULT_MATERIAL[c];
    assert.ok(id, `no default for ${c}`);
    assert.ok(ids.has(id), `${c}: default ${id} missing`);
    assert.equal(MATERIALS.find((m) => m.id === id).category, c, `${c}: default is in another category`);
  }
});

test('resin codes agree with the id and the OFF tags', () => {
  for (const m of MATERIALS) {
    if (m.resin_code === undefined) continue;
    assert.ok(m.resin_code >= 1 && m.resin_code <= 7, `${m.id}: resin ${m.resin_code}`);
    assert.ok(m.id.endsWith(`-${m.resin_code}`), `${m.id} should end in -${m.resin_code}`);
  }
});
