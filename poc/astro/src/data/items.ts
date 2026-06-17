// Typed item data — the DATA_SCHEMA.md shape, in TypeScript.
// This is the "static typed data" the MVP uses (no DB). A representative subset.

export type Rung =
  | 'reuse' | 'repair' | 'repurpose' | 'donate' | 'recycle' | 'compost' | 'dispose';

export type Category =
  | 'Metal' | 'Plastic' | 'Paper' | 'Glass' | 'Electronics' | 'Batteries'
  | 'Hazardous' | 'Textiles' | 'Organics' | 'Rubber' | 'Bulky Goods';

export type Status = 'curbside' | 'drop-off' | 'hazardous' | 'no' | 'compost' | 'partial';

export interface Disposition {
  rung: Rung;
  channel: string;
  label: string;
  best?: boolean;
  local?: boolean;
  hazard?: boolean;
}

export interface Item {
  name: string;
  cat: Category;
  status: Status;
  prep: string;
  where: string;
  note: string;
  gratitude_note: string;
  dispositions: Disposition[];
}

export const CATEGORIES: (Category | 'All')[] = [
  'All', 'Metal', 'Plastic', 'Paper', 'Glass', 'Electronics', 'Batteries',
  'Hazardous', 'Textiles', 'Organics', 'Rubber', 'Bulky Goods',
];

export const RUNG_ORDER: Record<Rung, number> = {
  reuse: 1, repair: 2, repurpose: 3, donate: 4, recycle: 5, compost: 6, dispose: 7,
};

export const RUNG_BADGE: Record<Rung, string> = {
  reuse: '↻ Reuse', repair: '✎ Repair', repurpose: '✦ Repurpose', donate: '♡ Donate',
  recycle: '♺ Recycle', compost: '⬡ Compost', dispose: '⊘ Dispose',
};

export const ITEMS: Item[] = [
  {
    name: 'Aluminum can', cat: 'Metal', status: 'curbside',
    prep: 'Empty and rinse. No need to crush.', where: 'Curbside recycling bin',
    note: 'Most valuable recyclable commodity. Recyclable infinitely without quality loss.',
    gratitude_note: 'Endlessly reborn — this can comes back as a new can, again and again. Rinse it and send it home.',
    dispositions: [{ rung: 'recycle', channel: 'curbside', label: 'in your curbside bin', best: true }],
  },
  {
    name: 'Plastic bottle #1 PET', cat: 'Plastic', status: 'curbside',
    prep: 'Empty, rinse, replace cap.', where: 'Curbside recycling bin',
    note: 'Water bottles, soda bottles. One of the most commonly recycled plastics.',
    gratitude_note: 'One of the most wanted plastics — cap on, it heads straight for a new life.',
    dispositions: [{ rung: 'recycle', channel: 'curbside', label: 'in your curbside bin', best: true }],
  },
  {
    name: 'Smartphone', cat: 'Electronics', status: 'drop-off',
    prep: 'Back up data, factory reset, remove SIM and SD cards.',
    where: 'E-waste facility, manufacturer take-back, or Best Buy drop-off',
    note: 'Contains gold, silver, cobalt. Manufacturer take-back programs may offer credit.',
    gratitude_note: 'This little machine holds gold, silver, and cobalt pulled from the earth — and it still has more life in it. Let’s pass it on.',
    dispositions: [
      { rung: 'reuse', channel: 'retail_takeback', label: 'keep it as a backup or media device' },
      { rung: 'repair', channel: 'repair_shop', label: 'fix a cracked screen or battery' },
      { rung: 'donate', channel: 'donation_center', label: 'it still works', best: true },
      { rung: 'recycle', channel: 'ewaste', label: 'recover the metals (certified e-waste)' },
      { rung: 'dispose', channel: 'trash', label: 'never — phones never belong in the trash' },
    ],
  },
  {
    name: 'Glass food jar', cat: 'Glass', status: 'partial',
    prep: 'Empty, rinse, remove lid (recycle metal lid separately).',
    where: 'Curbside (check local) or glass drop-off',
    note: 'Steel lids go in the metal bin. Verify your municipality accepts glass curbside.',
    gratitude_note: 'A jar is a gift twice — store something in it, or recycle the metal lid apart.',
    dispositions: [
      { rung: 'reuse', channel: 'retail_takeback', label: 'reuse it for storage', best: true },
      { rung: 'recycle', channel: 'curbside', label: 'or recycle (lid in the metal bin)', local: true },
    ],
  },
  {
    name: 'Clothing (wearable)', cat: 'Textiles', status: 'drop-off',
    prep: 'Clean and dry.', where: 'Goodwill, Salvation Army, H&M take-back bins, or local textile collection',
    note: 'Even worn or torn clothing is accepted — what cannot be resold is shredded into insulation or rags.',
    gratitude_note: 'Worn or torn, every thread has a next use — wear it, share it, or shred it.',
    dispositions: [
      { rung: 'reuse', channel: 'donation_center', label: 'wear or hand it down again' },
      { rung: 'donate', channel: 'donation_center', label: 'donate it (any condition)', best: true },
      { rung: 'recycle', channel: 'drop_off', label: 'shredded into rags / insulation' },
    ],
  },
  {
    name: 'Food scraps / organics', cat: 'Organics', status: 'compost',
    prep: 'No meat, dairy, or oils for home composting.',
    where: 'Home compost bin or municipal composting program',
    note: 'Food waste is ~30% of what goes to landfill. Composting returns nutrients to soil.',
    gratitude_note: 'Yesterday’s meal becomes tomorrow’s soil — give it back to the earth.',
    dispositions: [{ rung: 'compost', channel: 'compost_home', label: 'home or municipal compost', best: true }],
  },
  {
    name: 'Tires', cat: 'Rubber', status: 'drop-off',
    prep: 'No rims required.', where: 'Tire retailer or municipal tire drop-off event',
    note: 'Recycled tires become playground surfaces, athletic tracks, and road asphalt.',
    gratitude_note: 'Built to roll for years — reborn as playgrounds, tracks, and roads.',
    dispositions: [
      { rung: 'repurpose', channel: 'retail_takeback', label: 'reuse as planters or swings' },
      { rung: 'recycle', channel: 'drop_off', label: 'tire retailer or amnesty event', best: true },
    ],
  },
  {
    name: 'Mattress', cat: 'Bulky Goods', status: 'drop-off',
    prep: 'Bag in a mattress bag if possible.',
    where: 'Mattress recycling facility or retailer take-back (byebyemattress.com)',
    note: 'Mattress Recycling Council runs programs in CA, CT, and RI. Check local retailer programs elsewhere.',
    gratitude_note: 'Up to 90% recyclable — steel, foam, and fiber all find new beds.',
    dispositions: [
      { rung: 'donate', channel: 'donation_center', label: 'donate if still usable' },
      { rung: 'recycle', channel: 'drop_off', label: 'mattress recycling facility', best: true },
    ],
  },
];
