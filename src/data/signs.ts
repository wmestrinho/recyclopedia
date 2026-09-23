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
  | 'can' | 'tin' | 'aerosol' | 'spray-bottle'
  | 'bottle' | 'jug'
  | 'plastic-bag' | 'foam-cup' | 'chip-bag' | 'cutlery' | 'pizza-box'
  | 'coffee-cup' | 'receipt' | 'broken-glass' | 'dish'
  | 'battery' | 'laptop' | 'bulb' | 'paint-can'
  | 'phone' | 'tablet' | 'watch' | 'monitor' | 'tv' | 'printer' | 'router'
  | 'speaker' | 'headphones' | 'gamepad' | 'camera'
  | 'microwave' | 'fridge' | 'drill' | 'plug' | 'bundle'
  | 'tire' | 'sofa' | 'shirt' | 'apple' | 'lock';

/**
 * Where a cell goes when tapped. Exactly one of:
 *  - `slug`   → the Lookup, pre-filled with that item's real name;
 *  - `donate` → the donation form's item box, pre-filled with this text
 *                (the form lives on lettucebeetgrapefruit.com: DONATE_URL);
 *  - `href`   → any URL (a page, an anchor), as a plain link.
 */
export interface SignLink {
  slug?: string;
  donate?: string;
  href?: string;
}

/** A cluster on the "yes" half: several icons, one label, one sub-line. */
export interface SignGroup extends SignLink {
  label: string;
  sub: string;
  icons: SignIcon[];
  /** Items this group speaks for; without `slug`/`donate`/`href`, the
   *  first one's category becomes the Lookup search. */
  slugs?: string[];
}

/** A single cell on the "no" half or the side rail: one icon, one label. */
export interface SignEntry extends SignLink {
  label: string;
  icon: SignIcon;
  /** Optional second line, used on the rail for a short instruction. */
  sub?: string;
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

// Donate Electronics lives on the LBG community site (Pit Board E, 2026-09-21:
// "the electronics donation belongs here with LBG.com"). Absolute, so a tap
// works from recyclopedia.cc and from the LBG page alike.
export const DONATE_URL = 'https://lettucebeetgrapefruit.com/donate/';

// ── Sign 2: what we accept for donation ──────────────────────────────────────
// The groups summarise the 19 categories in public/js/donate.js (the form's
// own list). "Not this way" is filled from items.ts — things people try to
// hand over with their electronics that have a path of their own.
export const DONATION_SIGN: SignSpec = {
  title: 'What can you donate?',
  yes: {
    heading: 'We take these',
    sub: 'Working or broken. If it plugs in or runs on a battery, bring it.',
    groups: [
      {
        label: 'Phones and tablets',
        sub: 'Smartphones, tablets, e-readers, smartwatches',
        icons: ['phone', 'tablet', 'watch'],
        donate: 'Smartphone',
      },
      {
        label: 'Computers and screens',
        sub: 'Laptops, desktops, monitors, TVs of any kind',
        icons: ['laptop', 'monitor', 'tv'],
        donate: 'Laptop',
      },
      {
        label: 'Audio, video, gaming',
        sub: 'Speakers, headphones, players, consoles, controllers',
        icons: ['speaker', 'headphones', 'gamepad'],
        donate: 'Gaming Console',
      },
      {
        label: 'Office and networking',
        sub: 'Printers, scanners, routers, modems, drives, cameras',
        icons: ['printer', 'router', 'camera'],
        donate: 'Printer',
      },
      {
        label: 'Appliances and tools',
        sub: 'Kitchen and large appliances, electric power tools',
        icons: ['microwave', 'fridge', 'drill'],
        donate: 'Microwave',
      },
      {
        label: 'Cables, chargers, batteries',
        sub: 'Bundled cables and adapters, power banks, batteries taped and bagged',
        icons: ['plug', 'battery'],
        donate: 'Charging Cables',
      },
    ],
  },
  no: {
    heading: 'Not this way',
    sub: 'Not part of an electronics donation. Each has a path of its own. Tap one to see it.',
    entries: [
      { label: 'Paint', icon: 'paint-can', slug: 'paint-latex-water-based' },
      { label: 'Motor oil', icon: 'jug', slug: 'motor-oil' },
      { label: 'Pesticides', icon: 'spray-bottle', slug: 'pesticides-herbicides' },
      { label: 'Tires', icon: 'tire', slug: 'tires' },
      { label: 'Mattresses', icon: 'sofa', slug: 'mattress' },
      { label: 'Clothing', icon: 'shirt', slug: 'clothing-wearable' },
      { label: 'Food scraps', icon: 'apple', slug: 'food-scraps-organics' },
      { label: 'Ceramic dishes', icon: 'dish', slug: 'ceramics-pottery' },
      { label: 'Broken glass', icon: 'broken-glass', slug: 'broken-glass' },
    ],
  },
  rail: {
    heading: 'Before you bring it:',
    entries: [
      { label: 'Back up and wipe data', icon: 'lock', href: '/privacy' },
      { label: 'Tape battery terminals', icon: 'battery', slug: 'lithium-ion-battery' },
      { label: 'Bag loose batteries', icon: 'paper-bag', slug: 'alkaline-battery-aa-aaa-9v' },
      { label: 'Bundle cables', icon: 'bundle', slug: 'charging-cables-cords' },
    ],
  },
  moreInfo: { label: 'Donate: lettucebeetgrapefruit.com/donate', href: DONATE_URL },
};

const bySlug = new Map(ITEMS.map((i) => [i.slug, i]));

export function itemFor(slug: string): Item {
  const item = bySlug.get(slug);
  if (!item) throw new Error(`signs.ts: no item with slug "${slug}"`);
  return item;
}

/** Build-time check that every slug on a sign still exists. Returns the spec. */
export function resolveSign(spec: SignSpec): SignSpec {
  const check = (l: SignLink & { slugs?: string[] }) => {
    l.slugs?.forEach(itemFor);
    if (l.slug) itemFor(l.slug);
  };
  spec.yes.groups.forEach(check);
  spec.no.entries.forEach(check);
  spec.rail.entries.forEach(check);
  return spec;
}

/**
 * The anchor attributes for a cell (see SignLink). The hrefs are real URLs
 * that work from any page (`/?q=…#recyclopedia`, `DONATE_URL?item=…`); where
 * the target is on the same page (the homepage Lookup, the LBG donation form)
 * main.js and the sign's own script intercept the click instead.
 * `engine` prefixes Lookup links when the sign sits on another host (the LBG
 * donation page passes 'https://recyclopedia.cc').
 */
export function linkFor(l: SignLink & { slugs?: string[] }, engine = ''): Record<string, string> {
  const search = (q: string) => ({ href: `${engine}/?q=${encodeURIComponent(q)}#recyclopedia`, 'data-page': 'recyclopedia', 'data-search': q });
  if (l.slug) return search(itemFor(l.slug).name);
  if (l.donate) return { href: `${DONATE_URL}?item=${encodeURIComponent(l.donate)}`, 'data-donate': l.donate };
  if (l.href) return { href: l.href };
  if (l.slugs?.length) return search(itemFor(l.slugs[0]).cat);
  throw new Error(`signs.ts: cell "${'label' in l ? (l as { label: string }).label : '?'}" has nowhere to link`);
}

/** Every board, in flip order. Each gets a page at /signs/<slug>. */
export const SIGNS: { slug: string; spec: SignSpec; blurb: string }[] = [
  { slug: 'curbside', spec: CURBSIDE_SIGN, blurb: 'What goes in the curbside recycling bin, and what does not.' },
  { slug: 'donate', spec: DONATION_SIGN, blurb: 'The electronics we accept for donation, and what to do before you bring them.' },
];
