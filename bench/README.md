# bench — Lens recognition fixtures

`bench/fixtures/` is **gitignored**. This repository is public; the benchmark
photos are not published here.

## Getting the fixtures

Copy the contents of Google Drive `RandDRecyclopedia/lens-fixtures/` into
`bench/fixtures/`. It should contain:

- ~40 phone photos spread across the 11 categories, one object per photo
  (scan Mode 1 — the MVP mode);
- `labels.json`, mapping each filename to the right answer:

```json
{
  "IMG_0001.jpg": "smartphone",
  "IMG_0002.jpg": "aluminum-can",
  "IMG_0003.jpg": "category:textiles"
}
```

Every value must be a slug that exists in the vocabulary: an item slug from
`src/data/items.ts`, or `category:<name>` for one of the 11 categories. Use a
category label when a person could not reasonably name the exact item either.
The runner refuses to start if a label is not in the vocabulary, so a typo
fails loudly instead of quietly scoring zero.

## Running

```sh
npm run build                              # emits dist/data/vocab.json
npx wrangler login                         # once, for Workers AI access
node scripts/lens_bench.mjs --selftest     # credentials + API shapes, 2 repo photos
node scripts/lens_bench.mjs                # the real run
```

Output lands in `docs/research/<date>-lens-benchmark.md` (committed — the table,
not the photos). Workers AI calls are billed; a 40-photo run over both models
costs a few cents.
