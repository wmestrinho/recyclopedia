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

export const VOCAB: VocabEntry[] = [
  ...ITEMS.map((item) => ({ slug: item.slug, label: item.name, aliases: item.aliases ?? [] })),
  ...REAL_CATEGORIES.map((c) => ({
    slug: categorySlug(c),
    label: `Category: ${c}`,
    aliases: [c.toLowerCase(), `${c.toLowerCase()} (unsure which item)`],
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
