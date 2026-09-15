// Shared loader for the data tests. The TypeScript data modules are exported
// as JSON by Astro endpoints at build time (src/pages/data/*.json.ts), so the
// tests need `npm run build` first — `npm test` does that. No extra deps.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

function loadJson(rel) {
  const file = path.join(ROOT, 'dist', 'data', rel);
  if (!existsSync(file)) {
    throw new Error(`${rel} not built — run \`npm run build\` first (or \`npm test\`).`);
  }
  return JSON.parse(readFileSync(file, 'utf8'));
}

export const materialsExport = loadJson('materials.json');
export const vocabExport = loadJson('vocab.json');
export const MATERIALS = materialsExport.materials;
export const CATEGORY_DEFAULT_MATERIAL = materialsExport.category_default_material;
export const CATEGORIES = vocabExport.categories;
export const VOCAB = vocabExport.vocab;
export const ITEMS = vocabExport.items;
export const ITEM_SLUGS = new Set(ITEMS.map((i) => i.slug));

// Citation ids straight from the source registry (text scan — no TS loader needed).
const sourcesTs = readFileSync(path.join(ROOT, 'src', 'data', 'sources.ts'), 'utf8');
export const SOURCE_IDS = new Set([...sourcesTs.matchAll(/^\s*id:\s*'([^']+)'/gm)].map((m) => m[1]));

export const itemsTsSource = readFileSync(path.join(ROOT, 'src', 'data', 'items.ts'), 'utf8');
