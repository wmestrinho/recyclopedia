// Material-first knowledge layer (Lens master plan, Phase A — 2026-09-15).
//
// The unit we author is the MATERIAL, not the 500th item: product identity and
// packaging composition come from APIs (the Open Food Facts family, ODbL), and
// this bounded table turns a material tag into the ranked, cited, kindly-voiced
// path we own. It doubles as the Academy's teaching table.
//
// Rules (AP_GUIDELINES + DATA_SCHEMA):
// - every material has a real category — no "Other";
// - `dispositions[]` is the category-default ranked path used when no item
//   matches (Confidence Ladder rung 3): honest, "check local" where it varies,
//   never a guess into the landfill;
// - `source` / `Disposition.source` only where the cited page was verified to
//   support that guidance for the material *generally* (not just one item);
// - `off_tags` are Open Food Facts packaging-materials taxonomy ids, taken
//   from https://static.openfoodfacts.org/data/taxonomies/packaging_materials.json
//   (2026-09-15). Children are listed explicitly so no taxonomy walk is needed
//   at runtime. Shapes come from packaging_shapes.json.
//
// Keep this module small: it is imported by the Lens island and by Pages
// Functions. Never import organizations.ts here (bundle-split lesson).

import type { Category, Disposition } from './items';

export interface Material {
  id: string;                 // 'aluminium' | 'pet-1' | 'hdpe-2' | ...
  name: string;
  category: Category;         // one of the 11 — no 'Other'
  off_tags: string[];         // Open Food Facts packaging-materials ids
  resin_code?: number;        // 1–7 where applicable
  default_item?: string;      // item slug that best represents "a container made of this"
  shape_overrides?: Record<string, string>; // OFF shape tag → item slug
  dispositions: Disposition[]; // category-default ranked path when no item matches
  source?: string;            // citation id, only if verified for this guidance
  lesson?: string;            // Academy lesson URL (Phase D)
}

// Shared shape → item maps (bottle caps, cutlery) so the resin entries stay short.
const CAP_SHAPES: Record<string, string> = {
  'en:bottle-cap': 'loose-bottle-cap',
  'en:screw-cap': 'loose-bottle-cap',
  'en:lid-or-cap': 'loose-bottle-cap',
  'en:tethered-cap': 'loose-bottle-cap',
  'en:flip-top': 'loose-bottle-cap',
  'en:pouring-cap': 'loose-bottle-cap',
  'en:overcap': 'loose-bottle-cap',
};
const CUTLERY_SHAPES: Record<string, string> = {
  'en:cutlery': 'plastic-utensils-cutlery',
  'en:eating-utensils': 'plastic-utensils-cutlery',
  'en:fork': 'plastic-utensils-cutlery',
  'en:knife': 'plastic-utensils-cutlery',
  'en:spoon': 'plastic-utensils-cutlery',
  'en:teaspoon': 'plastic-utensils-cutlery',
  'en:tablespoon': 'plastic-utensils-cutlery',
  'en:chopsticks': 'plastic-utensils-cutlery',
  'en:drinking-straw': 'plastic-straw',
  'en:tumbler': 'disposable-plastic-cup',
};

export const MATERIALS: Material[] = [
  // ── Metal ──────────────────────────────────────────────────────────────
  {
    id: 'aluminium', name: 'Aluminium', category: 'Metal',
    off_tags: ['en:aluminium', 'en:heavy-aluminium', 'en:light-aluminium'],
    default_item: 'aluminum-can',
    shape_overrides: {
      'en:drink-can': 'aluminum-can', 'en:can': 'aluminum-can', 'en:food-can': 'aluminum-can',
      'en:aerosol-can': 'aerosol-can-empty',
      'en:sheet': 'aluminum-foil-clean', 'en:wrapper': 'aluminum-foil-clean', 'en:tray': 'aluminum-foil-clean',
      'en:lid': 'aluminum-foil-clean', 'en:seal': 'aluminum-foil-clean',
    },
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'in your curbside bin, rinsed', is_recommended: true },
    ],
  },
  {
    id: 'aluminium-foil', name: 'Aluminium foil', category: 'Metal',
    off_tags: ['en:aluminium-foil'],
    default_item: 'aluminum-foil-clean',
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'curbside when clean and balled up', local_variance: true, is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash if food-soiled' },
    ],
  },
  {
    id: 'steel', name: 'Steel / tinplate', category: 'Metal',
    off_tags: ['en:steel', 'en:tin-plated-steel'],
    default_item: 'steel-tin-can',
    shape_overrides: {
      'en:food-can': 'steel-tin-can', 'en:can': 'steel-tin-can', 'en:drink-can': 'steel-tin-can',
      'en:aerosol-can': 'aerosol-can-empty',
      'en:lid': 'steel-tin-can', 'en:screw-cap': 'steel-tin-can', 'en:crown-cork': 'steel-tin-can', 'en:lid-or-cap': 'steel-tin-can',
    },
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'in your curbside bin, rinsed', is_recommended: true },
    ],
  },
  {
    id: 'metal-mixed', name: 'Metal (unspecified)', category: 'Metal',
    off_tags: ['en:metal', 'en:recyclable-metals'],
    default_item: 'scrap-metal',
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'curbside if it is a can or lid; otherwise a scrap yard', local_variance: true, is_recommended: true },
      { rung: 'recycle', rank: 5, channel: 'scrap_yard', label: 'at a scrap metal yard', facility_type: 'scrap_yard' },
    ],
  },

  // ── Plastic (resin codes 1–7) ──────────────────────────────────────────
  {
    id: 'pet-1', name: 'PET #1', category: 'Plastic', resin_code: 1,
    off_tags: [
      'en:pet-1-polyethylene-terephthalate', 'en:pet-transparent', 'en:pet-colored', 'en:pet-opaque',
      'en:rpet-recycled-polyethylene-terephthalate', 'en:rpet-transparent', 'en:bpet-biobased-pet',
    ],
    default_item: 'plastic-bottle-pet',
    shape_overrides: {
      'en:bottle': 'plastic-bottle-pet', 'en:squeeze-bottle': 'plastic-bottle-pet',
      'en:tray': 'clamshell-pet-1', 'en:box': 'clamshell-pet-1', 'en:blister': 'clamshell-pet-1',
      'en:tumbler': 'disposable-plastic-cup',
      ...CAP_SHAPES,
    },
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'in your curbside bin, empty and rinsed', is_recommended: true },
    ],
  },
  {
    id: 'hdpe-2', name: 'HDPE #2', category: 'Plastic', resin_code: 2,
    off_tags: ['en:hdpe-2-high-density-polyethylene', 'en:biohdpe-biobased-hdpe'],
    default_item: 'plastic-jug-hdpe',
    shape_overrides: {
      'en:bottle': 'plastic-jug-hdpe', 'en:jug': 'plastic-jug-hdpe', 'en:jug-or-canister': 'plastic-jug-hdpe',
      'en:canister': 'plastic-jug-hdpe', 'en:squeeze-bottle': 'plastic-jug-hdpe', 'en:pump-bottle': 'plastic-jug-hdpe',
      'en:bag': 'plastic-bag-film', 'en:film': 'plastic-bag-film', 'en:wrapper': 'plastic-bag-film',
      ...CAP_SHAPES,
    },
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'in your curbside bin, empty and rinsed', is_recommended: true },
    ],
  },
  {
    id: 'pvc-3', name: 'PVC #3', category: 'Plastic', resin_code: 3,
    off_tags: ['en:pvc-3-polyvinyl-chloride'],
    default_item: 'pvc-vinyl-3',
    dispositions: [
      { rung: 'repurpose', rank: 3, channel: 'retail_takeback', label: 'reuse it for a project first', is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash if unusable (never curbside)' },
    ],
  },
  {
    id: 'ldpe-4', name: 'LDPE #4', category: 'Plastic', resin_code: 4,
    off_tags: [
      'en:ldpe-4-low-density-polyethylene', 'en:bio-ldpe-biobased-ldpe',
      'en:lldpe-linear-low-density-polyethylene', 'en:mdpe-medium-density-polyethylene',
    ],
    default_item: 'produce-bread-bag-4-ldpe',
    shape_overrides: {
      'en:bag': 'produce-bread-bag-4-ldpe', 'en:individual-bag': 'produce-bread-bag-4-ldpe', 'en:carrying-bag': 'plastic-bag-film',
      'en:film': 'plastic-bag-film', 'en:wrapper': 'plastic-bag-film', 'en:bubble-wrap': 'bubble-wrap',
      'en:squeeze-bottle': 'plastic-jug-hdpe', 'en:bottle': 'plastic-jug-hdpe',
      ...CAP_SHAPES,
    },
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'use it again first', is_recommended: true },
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'clean and dry, at a store film drop-off bin', local_variance: true },
    ],
  },
  {
    id: 'pp-5', name: 'PP #5', category: 'Plastic', resin_code: 5,
    off_tags: ['en:pp-5-polypropylene', 'en:opp-oriented-polypropylen', 'en:cpp-cast-polypropylen'],
    default_item: 'yogurt-container-pp',
    shape_overrides: {
      'en:pot': 'yogurt-container-pp', 'en:individual-pot': 'yogurt-container-pp', 'en:terrine-pot': 'yogurt-container-pp',
      'en:tray': 'takeout-container-5-pp', 'en:box': 'takeout-container-5-pp', 'en:bowl': 'takeout-container-5-pp',
      'en:salad-bowl': 'takeout-container-5-pp', 'en:dish': 'takeout-container-5-pp', 'en:plate': 'takeout-container-5-pp',
      'en:bottle': 'yogurt-container-pp', 'en:jar': 'yogurt-container-pp',
      'en:hanger': 'plastic-clothes-hanger',
      ...CAP_SHAPES, ...CUTLERY_SHAPES,
    },
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'curbside where #5 is accepted', local_variance: true, is_recommended: true },
    ],
  },
  {
    id: 'ps-6', name: 'Polystyrene #6 (rigid)', category: 'Plastic', resin_code: 6,
    off_tags: ['en:ps-6-polystyrene'],
    shape_overrides: { ...CUTLERY_SHAPES },
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'use it again if it is a container' },
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'only where a #6 program exists', local_variance: true, is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash where no #6 program exists (never curbside)' },
    ],
  },
  {
    id: 'eps-6', name: 'Foam / EPS #6', category: 'Plastic', resin_code: 6,
    off_tags: ['en:eps-expanded-polystyrene'],
    default_item: 'styrofoam-foam-ps',
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'clean, at a foam drop-off program', local_variance: true, is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash where no foam program exists (never curbside)' },
    ],
  },
  {
    id: 'pla-7', name: 'PLA / compostable plastic #7', category: 'Plastic', resin_code: 7,
    off_tags: ['en:pla-polylactic-acid', 'en:cpla-crystallized-polyactic-acid', 'en:biodegradable-plastic', 'en:biobased-plastic'],
    default_item: 'compostable-pla-7',
    shape_overrides: { ...CUTLERY_SHAPES },
    dispositions: [
      { rung: 'compost', rank: 6, channel: 'compost_municipal', label: 'industrial / municipal compost that accepts PLA', local_variance: true, is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash if no industrial composter (never curbside recycling)' },
    ],
  },
  {
    id: 'other-7', name: 'Other plastics #7', category: 'Plastic', resin_code: 7,
    off_tags: [
      'en:o-7-other-plastics', 'en:pc-polycarbonate', 'en:pa-polyamide', 'en:abs-acrylonitrile-butadiene-styrene',
      'en:pmma-poly-methyl-methacrylate', 'en:pu-pur-polyurethane', 'en:petg-polyethylene-terephthalate-glycol',
      'en:pvdc-7-polyvinylidene-chloride',
    ],
    shape_overrides: { 'en:hanger': 'plastic-clothes-hanger', ...CUTLERY_SHAPES },
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'keep using it — #7 is rarely recyclable', is_recommended: true },
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'only where a program names #7', local_variance: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash if unusable (never curbside)' },
    ],
  },
  {
    id: 'plastic-film', name: 'Plastic film / soft plastic', category: 'Plastic',
    off_tags: ['en:soft-plastic'],
    default_item: 'plastic-bag-film',
    shape_overrides: { 'en:bubble-wrap': 'bubble-wrap', 'en:net': 'plastic-bag-film' },
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'use it again first', is_recommended: true },
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'clean and dry, at a store film drop-off bin (never curbside)', local_variance: true },
    ],
  },
  {
    id: 'film-other', name: 'Plastic film (not polyethylene)', category: 'Plastic',
    off_tags: [],
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'use it again first' },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'in the trash unless your program names this film (store bins take PE only)', local_variance: true, is_recommended: true },
    ],
  },
  {
    id: 'metallised-film', name: 'Metallised / multi-layer film', category: 'Plastic',
    off_tags: ['en:pemet-metalized-polyethylene', 'en:petmet-metalized-polyethylene-terephthalate', 'en:plastic-aluminium'],
    default_item: 'chip-bag-snack-wrapper',
    dispositions: [
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'in the trash (multi-layer, unsortable)', is_recommended: true },
    ],
  },
  {
    id: 'plastic-unknown', name: 'Plastic (unspecified)', category: 'Plastic',
    off_tags: [
      'en:plastic', 'en:hard-plastic', 'en:mixed-plastics', 'en:recyclable-plastic', 'en:recycled-plastic',
      'en:pe-7-polyethylene', 'en:biope-biobased',
    ],
    shape_overrides: {
      'en:bag': 'plastic-bag-film', 'en:film': 'plastic-bag-film', 'en:wrapper': 'plastic-bag-film', 'en:bubble-wrap': 'bubble-wrap',
      'en:hanger': 'plastic-clothes-hanger', 'en:pot': 'nursery-plant-pot',
      ...CAP_SHAPES, ...CUTLERY_SHAPES,
    },
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'use it again first' },
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'curbside only if it carries a #1 or #2 — otherwise check local', local_variance: true, is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash if your program does not name it' },
    ],
  },
  {
    id: 'adhesive-tape', name: 'Tape, cellophane, wax', category: 'Plastic',
    off_tags: ['en:adhesive-tape', 'en:adhesive-plastic-tape', 'en:washi-tape', 'en:cellophane', 'en:wax'],
    dispositions: [
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'in the trash (remove tape from boxes before recycling them)', is_recommended: true },
    ],
  },
  {
    id: 'composite', name: 'Composite packaging', category: 'Plastic',
    off_tags: [
      'en:composite-material', 'en:glass-plastic', 'en:glass-aluminium', 'en:glass-tinplate', 'en:glass-miscellaneous-metals',
      'en:plastic-steelplate', 'en:plastic-miscellaneous-metals', 'en:paper-and-fibreboard-tinplate',
      'en:paper-and-fibreboard-miscellaneous-metals', 'en:paper-and-fibreboard-plastic-aluminium-tinplate',
    ],
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'use it again first' },
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'separate the parts you can (metal lid, glass jar); check local for the rest', local_variance: true, is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash what cannot be separated' },
    ],
  },

  // ── Paper ──────────────────────────────────────────────────────────────
  {
    id: 'paper', name: 'Paper', category: 'Paper',
    off_tags: ['en:paper', 'en:kraft-paper', 'en:recycled-paper', 'en:fsc-paper', 'en:other-paper', 'en:paper-packaging', 'en:paper-or-cardboard'],
    default_item: 'office-paper',
    shape_overrides: {
      'en:bag': 'paper-bags', 'en:carrying-bag': 'paper-bags', 'en:individual-bag': 'paper-bags',
      'en:envelope': 'office-paper', 'en:brochure': 'magazines-catalogs', 'en:card': 'office-paper',
      'en:box': 'cardboard-clean-dry', 'en:pizza-box': 'pizza-box-clean-top-half', 'en:egg-carton': 'cardboard-clean-dry',
      'en:tumbler': 'paper-coffee-cup',
    },
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'in your curbside bin, clean and dry', is_recommended: true },
      { rung: 'compost', rank: 6, channel: 'compost_home', label: 'shredded, in a home compost if soiled' },
    ],
  },
  {
    id: 'cardboard', name: 'Cardboard / paperboard', category: 'Paper',
    off_tags: [
      'en:cardboard', 'en:corrugated-cardboard', 'en:non-corrugated-cardboard', 'en:paperboard', 'en:recycled-cardboard',
      'en:fsc-cardboard', 'en:armed-cardboard', 'en:grass-carton',
    ],
    default_item: 'cardboard-clean-dry',
    shape_overrides: { 'en:pizza-box': 'pizza-box-clean-top-half', 'en:egg-carton': 'cardboard-clean-dry', 'en:tumbler': 'paper-coffee-cup' },
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'reuse the box first' },
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'flattened, in your curbside bin', is_recommended: true },
    ],
  },
  {
    id: 'carton-brick', name: 'Beverage carton (Tetra Pak style)', category: 'Paper',
    off_tags: [
      'en:tetra-pak', 'en:tetra-brik', 'en:tetra-brik-aseptic', 'en:tetra-classic-aseptic', 'en:tetra-fino-aseptic',
      'en:tetra-gemina-aseptic', 'en:tetra-prisma-aseptic', 'en:tetra-recart', 'en:tetra-rex', 'en:tetra-stelo-aseptic',
      'en:tetra-top', 'en:tetra-wedge-aseptic', 'en:biobased-tetra-pak',
      'en:elopak', 'en:pure-pak', 'en:pure-pak-classic', 'en:pure-pak-esense', 'en:pure-pak-imagine', 'en:pure-pak-sense',
      'en:pure-pak-sense-aseptic', 'en:naturally-pure-pak', 'en:d-pak', 'en:sig', 'en:sig-combibloc', 'en:italpack',
      'en:paper-and-cardboard-plastic-aluminium', 'en:paper-and-fibreboard-aluminium',
    ],
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'curbside where cartons are accepted — empty, cap on', local_variance: true, is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash where cartons are not accepted' },
    ],
  },
  {
    id: 'paper-plastic', name: 'Plastic-lined paper', category: 'Paper',
    off_tags: ['en:paper-and-plastic'],
    default_item: 'paper-coffee-cup',
    shape_overrides: { 'en:tumbler': 'paper-coffee-cup' },
    dispositions: [
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'in the trash (plastic-lined) unless your program names it', local_variance: true, is_recommended: true },
    ],
  },

  // ── Glass (the items file keeps ceramics here) ─────────────────────────
  {
    id: 'glass', name: 'Glass', category: 'Glass',
    off_tags: [
      'en:glass', 'en:clear-glass', 'en:uncoloured-glass', 'en:coloured-glass', 'en:brown-glass', 'en:green-glass',
      'en:light-sort-glass', 'en:dark-sort-glass',
    ],
    default_item: 'glass-bottle-clear',
    shape_overrides: { 'en:jar': 'glass-food-jar', 'en:pot': 'glass-food-jar', 'en:bottle': 'glass-bottle-clear' },
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'reuse it first' },
      { rung: 'recycle', rank: 5, channel: 'curbside', label: 'curbside or a glass drop-off, rinsed', local_variance: true, is_recommended: true },
    ],
  },
  {
    id: 'glass-special', name: 'Leaded / coated glass', category: 'Glass',
    off_tags: [
      'en:76-gl-leaded-glass', 'en:light-leaded-glass', 'en:copper-mixed-copper-backed-glass',
      'en:gold-mixed-gold-backed-glass', 'en:silver-mixed-silver-backed-glass',
    ],
    dispositions: [
      { rung: 'donate', rank: 4, channel: 'donation_center', label: 'donate it if intact', is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'wrapped and labelled, in the trash (never the glass bin)' },
    ],
  },
  {
    id: 'ceramic', name: 'Ceramic / porcelain / stone', category: 'Glass',
    off_tags: ['en:ceramic', 'en:porcelain', 'en:sandstone'],
    default_item: 'ceramics-pottery',
    dispositions: [
      { rung: 'donate', rank: 4, channel: 'donation_center', label: 'donate it if intact', is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'wrap and trash if broken (never the glass bin)' },
    ],
  },

  // ── Textiles ───────────────────────────────────────────────────────────
  {
    id: 'textile', name: 'Textile', category: 'Textiles',
    off_tags: ['en:textile', 'en:cotton', 'en:linen', 'en:fabric', 'en:other-textiles', 'en:61-tex-jute'],
    default_item: 'textiles-fabric-scraps',
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'use it again — a cloth bag is a bag' },
      { rung: 'donate', rank: 4, channel: 'donation_center', label: 'donate if still usable' },
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'textile recycling bin, clean and dry', is_recommended: true },
    ],
  },

  // ── Organics ───────────────────────────────────────────────────────────
  {
    id: 'wood', name: 'Wood', category: 'Organics',
    off_tags: ['en:wood'],
    dispositions: [
      { rung: 'repurpose', rank: 3, channel: 'retail_takeback', label: 'reuse or repurpose it first', is_recommended: true },
      { rung: 'compost', rank: 6, channel: 'compost_municipal', label: 'untreated wood at a yard-waste / compost site', local_variance: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash if treated or painted' },
    ],
  },
  {
    id: 'cork', name: 'Cork', category: 'Organics',
    off_tags: ['en:cork'],
    dispositions: [
      { rung: 'repurpose', rank: 3, channel: 'retail_takeback', label: 'keep it for crafts or a cork take-back', is_recommended: true },
      { rung: 'compost', rank: 6, channel: 'compost_home', label: 'natural cork in a home compost (not synthetic)' },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash if synthetic' },
    ],
  },
  {
    id: 'organics', name: 'Organic material', category: 'Organics',
    off_tags: [],
    default_item: 'food-scraps-organics',
    dispositions: [
      { rung: 'compost', rank: 6, channel: 'compost_home', label: 'home or municipal compost', local_variance: true, is_recommended: true },
    ],
  },

  // ── Rubber ─────────────────────────────────────────────────────────────
  {
    id: 'rubber', name: 'Rubber', category: 'Rubber',
    off_tags: ['en:rubber'],
    dispositions: [
      { rung: 'repurpose', rank: 3, channel: 'retail_takeback', label: 'reuse it — seals and bands last', is_recommended: true },
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'tyres go back to a tyre retailer or amnesty event', local_variance: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'small rubber parts in the trash' },
    ],
  },
  {
    id: 'silicone', name: 'Silicone', category: 'Rubber',
    off_tags: ['en:silicone'],
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'keep using it — silicone lasts for years', is_recommended: true },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'trash when worn out (not curbside)' },
    ],
  },

  // ── Batteries (OFF tags products sold with batteries) ──────────────────
  {
    id: 'battery-alkaline', name: 'Alkaline / zinc-carbon battery', category: 'Batteries',
    off_tags: ['en:alkaline-battery', 'en:zinc-carbon-battery'],
    default_item: 'alkaline-battery-aa-aaa-9v',
    source: 'epa-household-batteries',
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'at a battery drop-off', source: 'epa-household-batteries', is_recommended: true },
    ],
  },
  {
    id: 'battery-lithium', name: 'Lithium battery', category: 'Batteries',
    off_tags: ['en:lithium-battery'],
    default_item: 'lithium-ion-battery',
    source: 'epa-lithium-batteries',
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'certified e-waste or battery drop-off, terminals taped', source: 'epa-lithium-batteries', facility_type: 'ewaste', hazard: true, is_recommended: true },
    ],
  },
  {
    id: 'battery-rechargeable', name: 'Rechargeable battery (NiMH / NiCd)', category: 'Batteries',
    off_tags: ['en:nickel-cadmium-battery', 'en:nickel-metal-hydride-battery'],
    default_item: 'rechargeable-battery-nimh-nicd',
    source: 'call2recycle-locator',
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'Call2Recycle drop-off, terminals taped', source: 'call2recycle-locator', hazard: true, is_recommended: true },
    ],
  },
  {
    id: 'battery-lead-acid', name: 'Lead-acid battery', category: 'Batteries',
    off_tags: ['en:lead-acid-battery'],
    default_item: 'car-battery-lead-acid',
    source: 'epa-household-batteries',
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'retail_takeback', label: 'auto parts store (core refund)', source: 'epa-household-batteries', hazard: true, is_recommended: true },
    ],
  },
  {
    id: 'battery-button', name: 'Button / coin cell', category: 'Batteries',
    off_tags: ['en:silver-oxide-battery'],
    default_item: 'button-coin-cell',
    source: 'epa-household-batteries',
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'battery drop-off, taped', source: 'epa-household-batteries', hazard: true, is_recommended: true },
    ],
  },
  {
    id: 'battery-unknown', name: 'Battery (unspecified)', category: 'Batteries',
    off_tags: [],
    dispositions: [
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'a battery drop-off, terminals taped — never the trash or the bin', hazard: true, is_recommended: true },
    ],
  },

  // ── Category defaults with no OFF material of their own ────────────────
  {
    id: 'electronics', name: 'Electronics (unspecified)', category: 'Electronics',
    off_tags: [],
    source: 'epa-electronics',
    dispositions: [
      { rung: 'reuse', rank: 1, channel: 'retail_takeback', label: 'keep it in service if it still works' },
      { rung: 'repair', rank: 2, channel: 'drop_off', label: 'repair before replacing', facility_type: 'repair_shop' },
      { rung: 'donate', rank: 4, channel: 'donation_center', label: 'donate it if it works', source: 'epa-electronics', is_recommended: true },
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'certified e-waste recycler', source: 'epa-electronics', facility_type: 'ewaste' },
      { rung: 'dispose', rank: 7, channel: 'trash', label: 'never — electronics never belong in the trash' },
    ],
  },
  {
    id: 'hazardous', name: 'Household hazardous (unspecified)', category: 'Hazardous',
    off_tags: [],
    source: 'epa-hhw',
    dispositions: [
      { rung: 'dispose', rank: 7, channel: 'hhw', label: 'household hazardous waste collection — never the bin, never the drain', source: 'epa-hhw', facility_type: 'hhw', hazard: true, is_recommended: true },
    ],
  },
  {
    id: 'bulky', name: 'Bulky item (unspecified)', category: 'Bulky Goods',
    off_tags: [],
    dispositions: [
      { rung: 'donate', rank: 4, channel: 'donation_center', label: 'donate if still usable', is_recommended: true },
      { rung: 'recycle', rank: 5, channel: 'drop_off', label: 'a bulky-item recycler where one exists', local_variance: true },
      { rung: 'dispose', rank: 7, channel: 'special_event', label: 'municipal bulk pickup', local_variance: true },
    ],
  },
];

// The material that answers a bare category guess (vision "category:<cat>"
// candidates, Confidence Ladder rung 3). Every one of the 11 categories maps.
export const CATEGORY_DEFAULT_MATERIAL: Record<Category, string> = {
  Metal: 'metal-mixed',
  Plastic: 'plastic-unknown',
  Paper: 'paper',
  Glass: 'glass',
  Electronics: 'electronics',
  Batteries: 'battery-unknown',
  Hazardous: 'hazardous',
  Textiles: 'textile',
  Organics: 'organics',
  Rubber: 'rubber',
  'Bulky Goods': 'bulky',
};

/** OFF shapes that are film-like: a resin's rigid default item would be the wrong answer for these. */
export const FILM_SHAPES = new Set(['en:film', 'en:wrapper', 'en:bag', 'en:individual-bag', 'en:carrying-bag', 'en:net', 'en:sleeve', 'en:sheet', 'en:bubble-wrap', 'en:packet']);

const BY_ID = new Map(MATERIALS.map((m) => [m.id, m]));
const BY_OFF_TAG = new Map<string, Material>();
for (const m of MATERIALS) for (const tag of m.off_tags) BY_OFF_TAG.set(tag, m);

export function materialById(id: string): Material | undefined {
  return BY_ID.get(id);
}

/** Open Food Facts packaging material tag (e.g. 'en:pet-transparent') → Material. */
export function materialForOffTag(tag: string | undefined | null): Material | undefined {
  return tag ? BY_OFF_TAG.get(tag) : undefined;
}

/** Item slug for an OFF (material, shape) pair, or undefined when we honestly do not know. */
export function itemSlugFor(material: Material | undefined, shape?: string | null): string | undefined {
  if (!material) return undefined;
  const override = shape ? material.shape_overrides?.[shape] : undefined;
  if (override) return override;
  // A film-shaped component of a rigid resin (PP wrapper, PET sleeve) must not
  // inherit the resin's container item — that would send film to the curbside bin.
  if (shape && FILM_SHAPES.has(shape) && material.category === 'Plastic') return undefined;
  return material.default_item;
}

/** Material that answers a component once the shape rule above has dropped the item. */
export function materialForComponent(material: Material | undefined, shape?: string | null): Material | undefined {
  if (!material) return undefined;
  if (shape && FILM_SHAPES.has(shape) && material.category === 'Plastic' && !material.shape_overrides?.[shape] && material.id !== 'plastic-film' && material.id !== 'metallised-film') {
    return BY_ID.get('film-other');
  }
  return material;
}
