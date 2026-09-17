import { test } from 'node:test';
import assert from 'node:assert/strict';
import { VOCAB, ITEMS, CATEGORIES, ITEM_SLUGS, itemsTsSource, SOURCE_IDS } from './_load.mjs';

test('VOCAB = every item + one entry per category', () => {
  assert.equal(VOCAB.length, ITEMS.length + CATEGORIES.length);
  assert.equal(CATEGORIES.length, 11);
  const slugs = VOCAB.map((v) => v.slug);
  assert.equal(new Set(slugs).size, slugs.length, 'duplicate vocab slug');
  for (const c of CATEGORIES) {
    const slug = 'category:' + c.toLowerCase().replace(/\s+/g, '-');
    assert.ok(slugs.includes(slug), `missing ${slug}`);
  }
  for (const s of ITEM_SLUGS) assert.ok(slugs.includes(s), `missing item ${s}`);
});

test('every item has at least two aliases (search + vision prompt)', () => {
  for (const i of ITEMS) assert.ok(i.aliases.length >= 2, `${i.slug}: ${i.aliases.length} aliases`);
});

test('aliases are lowercase, short, and never repeat the item name', () => {
  for (const i of ITEMS) {
    for (const a of i.aliases) {
      assert.equal(a, a.toLowerCase(), `${i.slug}: alias "${a}" not lowercase`);
      assert.ok(a.length >= 2 && a.length <= 40, `${i.slug}: alias "${a}" length`);
      assert.notEqual(a, i.name.toLowerCase(), `${i.slug}: alias repeats the name`);
    }
  }
});

test('material codes follow the resin / EU code shape', () => {
  for (const i of ITEMS) {
    for (const code of i.material_codes) assert.match(code, /^(C\/)?[A-Z]+-\d{1,2}$/, `${i.slug}: ${code}`);
  }
  const withCodes = ITEMS.filter((i) => i.material_codes.length).length;
  assert.ok(withCodes >= 30, `only ${withCodes} items carry material codes`);
});

test('every item citation points at a real source', () => {
  for (const i of ITEMS) for (const s of i.sources) assert.ok(SOURCE_IDS.has(s), `${i.slug}: ${s}`);
});

test('items.ts carries no "? " glyph corruption (the v0.1.4 bug)', () => {
  assert.ok(!/['"]\? /.test(itemsTsSource), 'corrupted badge glyph detected');
});

test('category entries say what they cover, without shadowing any item', () => {
  const itemTerms = new Set(ITEMS.flatMap((i) => [i.name.toLowerCase(), ...i.aliases]));
  for (const v of VOCAB.filter((v) => v.slug.startsWith('category:'))) {
    assert.match(v.label, / — .+/, `${v.slug}: label names no contents`);
    assert.ok(v.aliases.length >= 4, `${v.slug}: too few cover terms`);
    for (const a of v.aliases) {
      assert.equal(a, a.toLowerCase(), `${v.slug}: "${a}" not lowercase`);
      assert.ok(!itemTerms.has(a), `${v.slug}: "${a}" collides with an item name/alias`);
    }
  }
  const organics = VOCAB.find((v) => v.slug === 'category:organics');
  assert.ok(organics.aliases.includes('wood'), 'wood must route to category:organics');
});
