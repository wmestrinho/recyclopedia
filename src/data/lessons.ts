// The Academy bridge (Lens master plan, Card D.2): the engine cites, the
// school teaches. Each answer card may link the one Academy lesson that
// explains *why* its path is what it is.
//
// Standalone on purpose — ItemCard ships in the search bundle, so this must
// not import materials.ts. A lesson is mapped only where the module was read
// and found to teach that material's routing (same spirit as the provenance
// rule). No fit, no link: glass, electronics, rubber, bulky goods, foam, and
// cartons have no lesson yet.
//
// Links are absolute on lettucebeetgrapefruit.org so they survive the
// Academy's move out of this repo (Pit Board F) either way.

import type { Item } from './items';

const ACADEMY = 'https://lettucebeetgrapefruit.org/academy/';

export interface Lesson {
  url: string;
  title: string;   // as the Academy index names it
  teaches: string; // the one line that earns the link
}

export const LESSONS = {
  resin: {
    url: `${ACADEMY}module-1-2`,
    title: '1.2 · The Smartphone Sorting Guide',
    teaches: 'how to read the resin code instead of the myth',
  },
  wardrobe: {
    url: `${ACADEMY}module-1-6`,
    title: '1.6 · The Circular Wardrobe',
    teaches: 'fibre literacy and the repair mindset',
  },
  biopolymer: {
    url: `${ACADEMY}module-2-2`,
    title: '2.2 · Biopolymer Engineering',
    teaches: 'why PLA needs industrial compost and never the recycling bin',
  },
  mrf: {
    url: `${ACADEMY}module-2-3`,
    title: '2.3 · Inside the MRF',
    teaches: 'how screens, magnets, and eddy currents sort a truckload, and what jams them',
  },
  hazardous: {
    url: `${ACADEMY}module-2-4`,
    title: '2.4 · RCRA & Regulatory Compliance',
    teaches: 'the four-letter test that makes a waste hazardous',
  },
} as const satisfies Record<string, Lesson>;

export type LessonKey = keyof typeof LESSONS;

/** materials.ts id → lesson. Film goes to the MRF lesson: it is the tangler. */
export const LESSON_BY_MATERIAL: Record<string, LessonKey> = {
  'pet-1': 'resin', 'hdpe-2': 'resin', 'pvc-3': 'resin', 'ldpe-4': 'resin', 'pp-5': 'resin',
  'ps-6': 'resin', 'other-7': 'resin', 'plastic-unknown': 'resin',
  'pla-7': 'biopolymer',
  'plastic-film': 'mrf', 'film-other': 'mrf', 'metallised-film': 'mrf',
  aluminium: 'mrf', 'aluminium-foil': 'mrf', steel: 'mrf', 'metal-mixed': 'mrf',
  paper: 'mrf', cardboard: 'mrf',
  textile: 'wardrobe',
  'battery-alkaline': 'hazardous', 'battery-lithium': 'hazardous', 'battery-rechargeable': 'hazardous',
  'battery-lead-acid': 'hazardous', 'battery-button': 'hazardous', 'battery-unknown': 'hazardous',
  hazardous: 'hazardous',
};

// Item material_codes prefix → lesson (the first code that maps wins).
const LESSON_BY_CODE: [RegExp, LessonKey][] = [
  [/^PLA-/, 'biopolymer'],
  [/^(PET|HDPE|PVC|LDPE|PP|PS|OTHER)-\d/, 'resin'],
  [/^(ALU|FE)-/, 'mrf'],
  [/^PAP-/, 'mrf'],
];

const LESSON_BY_CATEGORY: Partial<Record<Item['cat'], LessonKey>> = {
  Textiles: 'wardrobe',
  Batteries: 'hazardous',
  Hazardous: 'hazardous',
};

export function lessonForItem(item: Item): Lesson | undefined {
  if (item.slug.startsWith('material:')) {
    const key = LESSON_BY_MATERIAL[item.slug.slice('material:'.length)];
    if (key) return LESSONS[key];
  }
  for (const code of item.material_codes ?? []) {
    const hit = LESSON_BY_CODE.find(([re]) => re.test(code));
    if (hit) return LESSONS[hit[1]];
  }
  const key = LESSON_BY_CATEGORY[item.cat];
  return key ? LESSONS[key] : undefined;
}
