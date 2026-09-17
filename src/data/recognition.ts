// Vision vocabulary + candidate resolution (Lens master plan, Card A.2).
//
// VOCAB is the closed list the vision model may choose from: every item plus
// one "category:<cat>" entry per category (Confidence Ladder rung 3 — when the
// model is not sure of the item, it prefers a category and we answer with the
// material-first default path instead of guessing).
//
// Imported by Pages Functions and the Lens island — keep it small; never pull
// organizations.ts in here.

import { CATEGORIES, ITEMS, type Category, type Item } from './items';
import { CATEGORY_DEFAULT_MATERIAL, materialById, type Material } from './materials';
import type { Status } from './items';

export interface VocabEntry {
  slug: string;      // item slug, or 'category:<lowercase-hyphenated>'
  label: string;
  aliases: string[];
}

export const CATEGORY_PREFIX = 'category:';

export function categorySlug(category: Category): string {
  return CATEGORY_PREFIX + category.toLowerCase().replace(/\s+/g, '-');
}

const REAL_CATEGORIES = CATEGORIES.filter((c): c is Category => c !== 'All');
const CATEGORY_BY_SLUG = new Map(REAL_CATEGORIES.map((c) => [categorySlug(c), c]));
const ITEM_BY_SLUG = new Map(ITEMS.map((i) => [i.slug, i]));

// What each category covers, in the words someone looking at the object would
// use. A bare "Organics" never gets picked for a plank of wood (found by the
// C.0 selftest), so the category entries name their contents in the prompt.
// Keep every term distinct from item names and aliases — the tests enforce it.
export const CATEGORY_COVERS: Record<Category, string[]> = {
  Metal: ['metal objects', 'cookware', 'metal tools', 'wire', 'hardware'],
  Plastic: ['plastic containers', 'plastic packaging', 'plastic parts', 'plastic housewares'],
  Paper: ['paper products', 'paper packaging', 'books', 'stationery'],
  Glass: ['glassware', 'ceramics', 'drinking glasses', 'window glass'],
  Electronics: ['electronic devices', 'gadgets', 'anything with a plug or circuit board'],
  Batteries: ['any battery', 'loose cells', 'unlabelled battery', 'battery of unknown type'],
  Hazardous: ['chemicals', 'solvents', 'fuel', 'pesticides', 'unknown liquids'],
  Textiles: ['upholstery', 'bedding', 'curtains', 'bags', 'soft goods'],
  Organics: ['wood', 'lumber', 'pallet wood', 'cork', 'yard waste', 'plants', 'natural fibres'],
  Rubber: ['rubber objects', 'silicone', 'hoses', 'mats'],
  'Bulky Goods': ['large household objects', 'fixtures', 'anything too big for a bin'],
};

export const VOCAB: VocabEntry[] = [
  ...ITEMS.map((item) => ({ slug: item.slug, label: item.name, aliases: item.aliases ?? [] })),
  ...REAL_CATEGORIES.map((c) => ({
    slug: categorySlug(c),
    label: `Category: ${c} — ${CATEGORY_COVERS[c].join(', ')}`,
    aliases: [c.toLowerCase(), `${c.toLowerCase()} (unsure which item)`, ...CATEGORY_COVERS[c]],
  })),
];

export type Candidate =
  | { kind: 'item'; item: Item }
  | { kind: 'category'; category: Category; material: Material };

/** Resolve a VOCAB slug to the thing that answers it, or undefined if it is not in the vocabulary. */
export function resolveCandidate(slug: string): Candidate | undefined {
  const item = ITEM_BY_SLUG.get(slug);
  if (item) return { kind: 'item', item };
  const category = CATEGORY_BY_SLUG.get(slug);
  if (!category) return undefined;
  const material = materialById(CATEGORY_DEFAULT_MATERIAL[category]);
  return material ? { kind: 'category', category, material } : undefined;
}

export function isVocabSlug(slug: string): boolean {
  return ITEM_BY_SLUG.has(slug) || CATEGORY_BY_SLUG.has(slug);
}

/**
 * Present a material's category-default path through the item card. Used when a
 * scan resolves to a material but no exact item (barcode components, vision
 * category guesses). The card's status is derived from the recommended rung.
 */
export function itemFromMaterial(material: Material, label?: string): Item {
  const best = material.dispositions.find((d) => d.is_recommended) ?? material.dispositions[0];
  let status: Status = 'drop-off';
  if (best.hazard || best.channel === 'hhw') status = 'hazardous';
  else if (best.rung === 'compost') status = 'compost';
  else if (best.channel === 'trash') status = 'no';
  else if (best.local_variance) status = 'partial';
  else if (best.channel === 'curbside') status = 'curbside';
  return {
    slug: `material:${material.id}`,
    name: label ?? material.name,
    cat: material.category,
    status,
    hazard: material.dispositions.some((d) => d.hazard) || status === 'hazardous',
    prep: 'Empty it; rinse if it held food.',
    where: best.label.charAt(0).toUpperCase() + best.label.slice(1),
    note: `No exact item matched, so this is the general path for ${material.name.toLowerCase()} — the honest default, not a guess.`,
    gratitude_note: '',
    material_codes: material.resin_code ? [`${material.id.toUpperCase()}`] : [],
    dispositions: material.dispositions,
  };
}
