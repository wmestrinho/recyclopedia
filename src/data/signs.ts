// Content for the curbside sign on the homepage — the "what goes in the bin"
// board, in the layout every municipal solid-waste department prints.
//
// Every entry references items by slug so the sign can never name something
// the database does not carry: `resolveSign` throws at build time on a slug
// that has gone missing. Labels are authored (a sign says "Paper", not
// "Magazines / catalogs"); the query string each entry links into the Lookup
// with is the item's real name, so the click lands on the card.
import { ITEMS, type Item } from './items';

export type SignIcon =
  | 'newspaper' | 'paper-bag' | 'sheets'
  | 'box' | 'carton'
  | 'can' | 'tin' | 'aerosol'
  | 'bottle' | 'jug'
  | 'plastic-bag' | 'foam-cup' | 'chip-bag' | 'cutlery' | 'pizza-box'
  | 'coffee-cup' | 'receipt' | 'broken-glass' | 'dish'
  | 'battery' | 'laptop' | 'bulb' | 'paint-can';

/** A cluster on the "yes" half: several icons, one label, one sub-line. */
export interface SignGroup {
  label: string;
  sub: string;
  icons: SignIcon[];
  /** Items this group speaks for. The first one's category is the search. */
  slugs: string[];
}

/** A single cell on the "no" half or the side rail: one icon, one label. */
export interface SignEntry {
  label: string;
  icon: SignIcon;
  slug: string;
}

export interface SignSpec {
  title: string;
  yes: { heading: string; sub: string; groups: SignGroup[] };
  no: { heading: string; sub: string; entries: SignEntry[] };
  rail: { heading: string; entries: SignEntry[] };
  moreInfo: { label: string; href: string };
}

export const CURBSIDE_SIGN: SignSpec = {
  title: 'What should be recycled?',
  yes: {
    heading: 'Acceptable',
    sub: 'Put these in your curbside recycling bin loose, empty, clean, and dry.',
    groups: [
      {
        label: 'Paper',
        sub: 'Newspaper, magazines, office paper, paper bags',
        icons: ['newspaper', 'paper-bag', 'sheets'],
        slugs: ['newspaper', 'magazines-catalogs', 'office-paper', 'paper-bags'],
      },
      {
        label: 'Aluminum, tin, and steel',
        sub: 'Drink cans, food cans, empty aerosols (cap off)',
        icons: ['can', 'tin', 'aerosol'],
        slugs: ['aluminum-can', 'steel-tin-can', 'aerosol-can-empty'],
      },
      {
        label: 'Cardboard',
        sub: 'Boxes broken down flat, tape off, clean and dry',
        icons: ['box', 'carton'],
        slugs: ['cardboard-clean-dry', 'pizza-box-clean-top-half'],
      },
      {
        label: 'Plastic',
        sub: 'Bottles #1 and jugs #2 only, rinsed, cap back on',
        icons: ['bottle', 'jug'],
        slugs: ['plastic-bottle-pet', 'plastic-jug-hdpe', 'loose-bottle-cap'],
      },
    ],
  },
  no: {
    heading: 'Not acceptable',
    sub: 'Keep these out of the curbside bin. Most still have a path.',
    entries: [
      { label: 'Plastic bags', icon: 'plastic-bag', slug: 'plastic-bag-film' },
      { label: 'Styrofoam', icon: 'foam-cup', slug: 'styrofoam-foam-ps' },
      { label: 'Chip bags', icon: 'chip-bag', slug: 'chip-bag-snack-wrapper' },
      { label: 'Straws and cutlery', icon: 'cutlery', slug: 'plastic-utensils-cutlery' },
      { label: 'Greasy cardboard', icon: 'pizza-box', slug: 'cardboard-greasy-or-wet' },
      { label: 'Coffee cups', icon: 'coffee-cup', slug: 'paper-coffee-cup' },
      { label: 'Receipts', icon: 'receipt', slug: 'thermal-paper-receipt' },
      { label: 'Broken glass', icon: 'broken-glass', slug: 'broken-glass' },
      { label: 'Ceramic dishes', icon: 'dish', slug: 'ceramics-pottery' },
    ],
  },
  rail: {
    heading: 'These have a path too. Look them up:',
    entries: [
      { label: 'Batteries', icon: 'battery', slug: 'alkaline-battery-aa-aaa-9v' },
      { label: 'Electronics', icon: 'laptop', slug: 'laptop-notebook-computer' },
      { label: 'Light bulbs', icon: 'bulb', slug: 'fluorescent-bulb-cfl' },
      { label: 'Paint and motor oil', icon: 'paint-can', slug: 'paint-latex-water-based' },
    ],
  },
  moreInfo: { label: 'More info: recyclopedia.cc', href: '#recyclopedia' },
};

const bySlug = new Map(ITEMS.map((i) => [i.slug, i]));

export function itemFor(slug: string): Item {
  const item = bySlug.get(slug);
  if (!item) throw new Error(`signs.ts: no item with slug "${slug}"`);
  return item;
}

/** Build-time check that every slug on a sign still exists. Returns the spec. */
export function resolveSign(spec: SignSpec): SignSpec {
  for (const g of spec.yes.groups) g.slugs.forEach(itemFor);
  for (const e of spec.no.entries) itemFor(e.slug);
  for (const e of spec.rail.entries) itemFor(e.slug);
  return spec;
}
