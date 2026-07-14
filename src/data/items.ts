export type Rung = 'reuse' | 'repair' | 'repurpose' | 'donate' | 'recycle' | 'compost' | 'dispose';

export type Category =
  | 'Metal' | 'Plastic' | 'Paper' | 'Glass' | 'Electronics' | 'Batteries'
  | 'Hazardous' | 'Textiles' | 'Organics' | 'Rubber' | 'Bulky Goods';

export type Status = 'curbside' | 'drop-off' | 'hazardous' | 'no' | 'compost' | 'partial';

// Canonical channel_t (logistics — how/where). See DATA_SCHEMA.md.
export type Channel =
  | 'curbside' | 'drop_off' | 'mail_back' | 'retail_takeback' | 'hhw' | 'scrap_yard'
  | 'donation_center' | 'compost_home' | 'compost_municipal' | 'trash' | 'special_event';

// A rung of the Gratitude Hierarchy for one item, with logistics + provenance.
// Required: rung, rank, channel, label. The rest are optional enrichment that the
// 500+ build fills over time (DATA_SCHEMA.md "Item shape — static JSON").
export interface Disposition {
  rung: Rung;
  rank: number;              // 1 = best; defaults from RUNG_ORDER
  channel: Channel;
  label: string;
  prep?: string;
  conditions?: string;       // "only if clean", "if working"
  why?: string;              // cites the ethic
  local_variance?: boolean;  // true => render "check local"
  is_recommended?: boolean;  // curator override for the hero "best path"
  hazard?: boolean;
  facility_type?: string;    // 'ewaste','repair_shop','hhw',... (Where Ladder)
  source?: string;           // citation id (Atlas provenance)
}

export interface Item {
  slug: string;
  name: string;
  cat: Category;             // TitleCase display; lowercases to category_t at import
  status: Status;            // display status; also derivable from dispositions[0]
  aliases?: string[];        // search synonyms (enrich over time)
  material_codes?: string[]; // e.g. ['PET-1'] (enrich over time)
  summary?: string;          // short descriptor (enrich over time)
  note: string;              // the factual blurb shown on the card
  gratitude_note: string;    // voice of the Gratitude Hierarchy — see ENVIRONMENTAL_RESPECT_POLICY.md
  hazard: boolean;
  image_url?: string | null;
  prep: string;              // card "Prep" row
  where: string;             // card "Where" row
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
  reuse: '↻ Reuse', repair: '⚒ Repair', repurpose: '⇄ Repurpose', donate: '♡ Donate',
  recycle: '♻ Recycle', compost: '⚘ Compost', dispose: '⊘ Dispose',
};

export const ITEMS: Item[] = [
  {
    "slug": "aluminum-can",
    "name": "Aluminum can",
    "cat": "Metal",
    "status": "curbside",
    "hazard": false,
    "prep": "Empty and rinse. No need to crush.",
    "where": "Curbside recycling bin",
    "note": "Most valuable recyclable commodity. Can be recycled infinitely without quality loss.",
    "gratitude_note": "Endlessly reborn — this can comes back as a new can, again and again. Rinse it and send it home.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "in your curbside bin",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "steel-tin-can",
    "name": "Steel / tin can",
    "cat": "Metal",
    "status": "curbside",
    "hazard": false,
    "prep": "Empty and rinse.",
    "where": "Curbside recycling bin",
    "note": "Food cans, paint cans (empty and dry). Magnetic separators pull them out at facilities.",
    "gratitude_note": "Strong and magnetic — steel returns to the foundry as good as new.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "in your curbside bin",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "aerosol-can-empty",
    "name": "Aerosol can (empty)",
    "cat": "Metal",
    "status": "curbside",
    "hazard": false,
    "prep": "Must be 100% empty. Remove plastic cap.",
    "where": "Curbside recycling bin",
    "note": "Only when completely empty — no product or pressure remaining.",
    "gratitude_note": "Emptied of its charge, it is simply valuable steel again.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "in your curbside bin, fully empty",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "aerosol-can-not-empty",
    "name": "Aerosol can (not empty)",
    "cat": "Metal",
    "status": "hazardous",
    "hazard": true,
    "prep": "Never puncture or spray to empty into trash.",
    "where": "Household Hazardous Waste (HHW) facility",
    "note": "Pressurized and flammable. Never in regular trash or recycling.",
    "gratitude_note": "Still pressurized and proud — it needs careful hands, not a crusher.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "hhw",
        "label": "at a Household Hazardous Waste facility",
        "facility_type": "hhw",
        "hazard": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "aluminum-foil-clean",
    "name": "Aluminum foil (clean)",
    "cat": "Metal",
    "status": "partial",
    "hazard": false,
    "prep": "Clean of all food residue. Scrunch into a ball at least 2 inches across.",
    "where": "Curbside (when clean and balled up)",
    "note": "Contaminated foil goes to trash. Clean foil bundles need to be fist-sized for sorting.",
    "gratitude_note": "Ball it up so it cannot slip through the sorters — clean foil is still pure aluminum.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "curbside when clean and balled up",
        "local_variance": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "scrap-metal",
    "name": "Scrap metal",
    "cat": "Metal",
    "status": "drop-off",
    "hazard": false,
    "prep": "Separate from other materials.",
    "where": "Scrap metal yard or HHW event",
    "note": "Many scrap yards pay by weight for aluminum, copper, and brass.",
    "gratitude_note": "Heavy with worth — a scrap yard will weigh it and welcome it.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "scrap_yard",
        "label": "at a scrap metal yard (often paid by weight)",
        "facility_type": "scrap_yard",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "plastic-bottle-pet",
    "name": "Plastic bottle #1 PET",
    "cat": "Plastic",
    "status": "curbside",
    "hazard": false,
    "prep": "Empty, rinse, replace cap.",
    "where": "Curbside recycling bin",
    "note": "Water bottles, soda bottles. One of the most commonly recycled plastics.",
    "gratitude_note": "One of the most wanted plastics — cap on, it heads straight for a new life.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "in your curbside bin",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "plastic-jug-hdpe",
    "name": "Plastic jug #2 HDPE",
    "cat": "Plastic",
    "status": "curbside",
    "hazard": false,
    "prep": "Empty and rinse.",
    "where": "Curbside recycling bin",
    "note": "Milk jugs, laundry detergent, shampoo bottles.",
    "gratitude_note": "Sturdy and sought-after — #2 is recycled almost everywhere.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "in your curbside bin",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "plastic-bag-film",
    "name": "Plastic bag / film",
    "cat": "Plastic",
    "status": "drop-off",
    "hazard": false,
    "prep": "Clean and dry. No food residue.",
    "where": "Grocery store drop-off bins (Walmart, Target, Publix)",
    "note": "NEVER in curbside bin — clogs and destroys sorting machinery.",
    "gratitude_note": "Soft and sneaky — it strangles curbside sorters, but store bins welcome it.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "use it again first",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "at store film drop-off bins"
      }
    ]
  },
  {
    "slug": "styrofoam-foam-ps",
    "name": "Styrofoam / foam #6 PS",
    "cat": "Plastic",
    "status": "drop-off",
    "hazard": false,
    "prep": "Clean of food.",
    "where": "Styrofoam drop-off programs, UPS stores, Earth911.com locator",
    "note": "Check Earth911.com for local foam drop-off. Not accepted curbside anywhere.",
    "gratitude_note": "Light as air, stubborn to process — special drop-offs give it a chance.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "at a foam drop-off program",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "plastic-straw",
    "name": "Plastic straw",
    "cat": "Plastic",
    "status": "no",
    "hazard": false,
    "prep": "N/A",
    "where": "Regular trash",
    "note": "Too small and light for sorting equipment. Contaminates loads and clogs machinery.",
    "gratitude_note": "Too small to save this time — the kindest fix is skipping the next one.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "in the trash — then refuse the next one",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "plastic-utensils-cutlery",
    "name": "Plastic utensils / cutlery",
    "cat": "Plastic",
    "status": "no",
    "hazard": false,
    "prep": "N/A",
    "where": "Regular trash",
    "note": "Too small to be sorted. Switch to reusable utensils to eliminate the waste.",
    "gratitude_note": "Too small for the sorters — a reusable set ends this cycle for good.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "in the trash — switch to reusable",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "yogurt-container-pp",
    "name": "Yogurt container #5 PP",
    "cat": "Plastic",
    "status": "partial",
    "hazard": false,
    "prep": "Empty and rinse.",
    "where": "Curbside (check your local program)",
    "note": "#5 PP is accepted in many but not all programs. Verify at earth911.com.",
    "gratitude_note": "Welcome in more places every year — check whether yours is one.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "curbside where #5 is accepted",
        "local_variance": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "chip-bag-snack-wrapper",
    "name": "Chip bag / snack wrapper",
    "cat": "Plastic",
    "status": "no",
    "hazard": false,
    "prep": "N/A",
    "where": "Regular trash",
    "note": "Multi-layer films (plastic + foil + plastic) cannot be sorted or processed.",
    "gratitude_note": "Layered foil and film, fused for freshness — sadly unsortable today.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "in the trash (multi-layer, unsortable)",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "bubble-wrap",
    "name": "Bubble wrap",
    "cat": "Plastic",
    "status": "drop-off",
    "hazard": false,
    "prep": "Clean and dry.",
    "where": "Grocery store plastic film collection bins",
    "note": "Goes in the same bin as plastic bags at most retailers.",
    "gratitude_note": "Pop-worthy and reusable — then it joins the store film bin.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "reuse it for your next shipment",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "at store film bins"
      }
    ]
  },
  {
    "slug": "pvc-vinyl-3",
    "name": "PVC / vinyl #3",
    "cat": "Plastic",
    "status": "no",
    "hazard": false,
    "aliases": [
      "pvc",
      "vinyl",
      "pipe",
      "#3 plastic",
      "cling wrap",
      "vinyl siding"
    ],
    "material_codes": [
      "PVC-3"
    ],
    "prep": "N/A",
    "where": "Reuse / repurpose; otherwise regular trash. Some PVC pipe accepted at scrap yards.",
    "note": "Almost never accepted curbside — PVC releases chlorine and ruins recycling batches. Give it a second job first.",
    "gratitude_note": "Tough and chlorine-rich — almost no curb takes #3, so give it a second life first.",
    "dispositions": [
      {
        "rung": "repurpose",
        "rank": 3,
        "channel": "retail_takeback",
        "label": "reuse the pipe or vinyl for a project",
        "is_recommended": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "landfill if unusable (never curbside)"
      }
    ]
  },
  {
    "slug": "produce-bread-bag-4-ldpe",
    "name": "Produce / bread bag #4 LDPE",
    "cat": "Plastic",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "bread bag",
      "produce bag",
      "ldpe",
      "#4 plastic",
      "dry cleaning bag",
      "newspaper sleeve"
    ],
    "material_codes": [
      "LDPE-4"
    ],
    "prep": "Clean, dry, empty.",
    "where": "Grocery-store plastic film drop-off bins (never curbside).",
    "note": "Same stream as plastic grocery bags — soft #4 film belongs in store film bins, never the curbside cart.",
    "gratitude_note": "Thin film #4 — clean and dry, it belongs in the store bag bin, not the curb.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "reuse it for storage first",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "store film drop-off bin"
      }
    ]
  },
  {
    "slug": "clamshell-pet-1",
    "name": "Clamshell / berry container #1 PET",
    "cat": "Plastic",
    "status": "partial",
    "hazard": false,
    "aliases": [
      "clamshell",
      "berry container",
      "salad box",
      "pet",
      "#1 thermoform"
    ],
    "material_codes": [
      "PET-1"
    ],
    "prep": "Empty, rinse, dry.",
    "where": "Curbside where #1 thermoform is accepted (check local).",
    "note": "Same PET as a bottle but thin thermoform — some programs accept it, many do not. Check yours.",
    "gratitude_note": "Same PET as a bottle, thinner skin — many curbs welcome it, so check yours.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "curbside where #1 clamshells are accepted",
        "is_recommended": true,
        "local_variance": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "trash if not accepted locally"
      }
    ]
  },
  {
    "slug": "takeout-container-5-pp",
    "name": "Take-out container #5 PP",
    "cat": "Plastic",
    "status": "partial",
    "hazard": false,
    "aliases": [
      "takeout",
      "deli container",
      "#5",
      "polypropylene",
      "sour cream tub",
      "margarine tub"
    ],
    "material_codes": [
      "PP-5"
    ],
    "prep": "Empty and rinse.",
    "where": "Reuse; curbside where #5 is accepted (check local).",
    "note": "#5 PP is accepted in many but not all curbside programs, and these tubs are sturdy enough to reuse first.",
    "gratitude_note": "Sturdy #5 — reuse it for leftovers a few times before the bin claims it.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "reuse for storage or leftovers",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "curbside where #5 is accepted",
        "local_variance": true
      }
    ]
  },
  {
    "slug": "disposable-plastic-cup",
    "name": "Disposable plastic cup",
    "cat": "Plastic",
    "status": "partial",
    "hazard": false,
    "aliases": [
      "solo cup",
      "party cup",
      "cold cup",
      "plastic cup"
    ],
    "prep": "Empty and rinse.",
    "where": "Curbside if #1/#5 and accepted; otherwise trash. Best: a reusable cup.",
    "note": "Clear cold cups are often #1 or #5 (sometimes recyclable); soft #6 cups are not. A reusable cup ends the question.",
    "gratitude_note": "A few minutes of use, centuries as litter — a reusable cup ends this loop.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "switch to a reusable cup",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "curbside if #1/#5 and accepted",
        "local_variance": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "trash if #6 or unmarked"
      }
    ]
  },
  {
    "slug": "nursery-plant-pot",
    "name": "Plant pot / nursery pot",
    "cat": "Plastic",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "plant pot",
      "nursery pot",
      "flower pot",
      "garden pot",
      "seedling tray"
    ],
    "prep": "Empty the soil.",
    "where": "Garden-center take-back (Lowe’s, Home Depot, local nurseries); reuse for seedlings.",
    "note": "Usually #2, #5, or #6. Many garden centers take pots back for reuse; rarely accepted curbside.",
    "gratitude_note": "Built to grow life — refill it, or let a garden center take it back to grow more.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "reuse for seedlings",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "garden-center take-back"
      }
    ]
  },
  {
    "slug": "loose-bottle-cap",
    "name": "Loose bottle cap",
    "cat": "Plastic",
    "status": "partial",
    "hazard": false,
    "aliases": [
      "bottle cap",
      "plastic cap",
      "lid",
      "screw cap"
    ],
    "prep": "Leave the cap on the empty, rinsed bottle.",
    "where": "On the bottle, in curbside.",
    "note": "Caps left ON a bottle get recycled with it; loose caps fall through the sorters. Keep caps on.",
    "gratitude_note": "Tiny and slippery alone — screw it back onto the bottle so both get recycled.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "on the bottle, in curbside",
        "is_recommended": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "loose caps fall through the sorters"
      }
    ]
  },
  {
    "slug": "six-pack-rings",
    "name": "Six-pack rings",
    "cat": "Plastic",
    "status": "no",
    "hazard": false,
    "aliases": [
      "six pack rings",
      "can holder",
      "plastic rings",
      "yoke"
    ],
    "prep": "Cut each loop.",
    "where": "Regular trash (cut up).",
    "note": "Not curbside-recyclable and a wildlife hazard. Cut every loop; choose ring-free or compostable packs next time.",
    "gratitude_note": "Snip every loop so nothing gets caught — then choose ring-free next time.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "cut up, in the trash",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "compostable-pla-7",
    "name": "Compostable plastic / PLA #7",
    "cat": "Plastic",
    "status": "no",
    "hazard": false,
    "aliases": [
      "pla",
      "compostable cup",
      "bioplastic",
      "#7",
      "compostable plastic",
      "compostable fork"
    ],
    "material_codes": [
      "PLA-7"
    ],
    "prep": "N/A",
    "where": "Industrial/municipal compost that accepts PLA, or trash. Never curbside recycling.",
    "note": "NOT recyclable and NOT home-compostable — it needs an industrial composter. In the recycling bin it contaminates; in a backyard pile it just sits.",
    "gratitude_note": "Made from plants, but only an industrial composter can finish it — never the curb.",
    "dispositions": [
      {
        "rung": "compost",
        "rank": 6,
        "channel": "compost_municipal",
        "label": "industrial/municipal compost that accepts PLA",
        "is_recommended": true,
        "local_variance": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "trash if no industrial composter"
      }
    ]
  },
  {
    "slug": "plastic-toy",
    "name": "Plastic toy",
    "cat": "Plastic",
    "status": "no",
    "hazard": false,
    "aliases": [
      "toy",
      "kids toy",
      "action figure",
      "plastic toys"
    ],
    "prep": "Clean; remove any batteries.",
    "where": "Donate (Goodwill, shelters); trash if broken (mixed plastic).",
    "note": "Mixed plastics and embedded electronics make toys hard to recycle — but a working toy is wanted by another child.",
    "gratitude_note": "Still full of play — pass it to another kid before it ever becomes waste.",
    "dispositions": [
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate if usable",
        "is_recommended": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "trash if broken (mixed plastic)"
      }
    ]
  },
  {
    "slug": "plastic-clothes-hanger",
    "name": "Plastic clothes hanger",
    "cat": "Plastic",
    "status": "no",
    "hazard": false,
    "aliases": [
      "hanger",
      "clothes hanger",
      "coat hanger"
    ],
    "prep": "N/A",
    "where": "Return to a dry cleaner / donate to a thrift store; trash if broken.",
    "note": "Mixed-resin and a curbside-jammer. Dry cleaners and thrift stores happily reuse them; rarely recyclable.",
    "gratitude_note": "Made to be used for years — hand it to a dry cleaner or thrift store to reuse.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "return to a dry cleaner to reuse",
        "is_recommended": true
      },
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate to a thrift store"
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "trash if broken"
      }
    ]
  },
  {
    "slug": "toothbrush-toothpaste-tube",
    "name": "Toothbrush / toothpaste tube",
    "cat": "Plastic",
    "status": "no",
    "hazard": false,
    "aliases": [
      "toothbrush",
      "toothpaste tube",
      "oral care",
      "floss container"
    ],
    "prep": "Squeeze out the tube.",
    "where": "TerraCycle oral-care mail-in program; otherwise trash.",
    "note": "Multi-material and not curbside. TerraCycle / Colgate mail-in programs are the only real recycling path.",
    "gratitude_note": "Mixed materials, hard to split — a TerraCycle mail-in gives it the only real path.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "mail_back",
        "label": "TerraCycle oral-care mail-in",
        "is_recommended": true,
        "facility_type": "mail_back_program"
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "trash if no program"
      }
    ]
  },
  {
    "slug": "cardboard-clean-dry",
    "name": "Cardboard (clean, dry)",
    "cat": "Paper",
    "status": "curbside",
    "hazard": false,
    "prep": "Break down flat. Remove packing tape.",
    "where": "Curbside recycling bin",
    "note": "Most in-demand recyclable after aluminum. Must be dry — wet cardboard is trash.",
    "gratitude_note": "The most in-demand fiber after aluminum — flatten it and send it on.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "reuse the box first"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "flattened in your curbside bin",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "cardboard-greasy-or-wet",
    "name": "Cardboard (greasy or wet)",
    "cat": "Paper",
    "status": "no",
    "hazard": false,
    "prep": "N/A",
    "where": "Compost or trash",
    "note": "Grease and moisture destroy paper fibers. Compost it if you can.",
    "gratitude_note": "Grease ruins the fiber, but the soil will still gladly take it.",
    "dispositions": [
      {
        "rung": "compost",
        "rank": 6,
        "channel": "compost_home",
        "label": "compost it if you can",
        "is_recommended": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "otherwise the trash"
      }
    ]
  },
  {
    "slug": "office-paper",
    "name": "Office paper",
    "cat": "Paper",
    "status": "curbside",
    "hazard": false,
    "prep": "No need to remove staples or paper clips.",
    "where": "Curbside recycling bin",
    "note": "Staples and clips are removed by magnets at facilities.",
    "gratitude_note": "Staples and all — magnets pull the metal out downstream. Just recycle it.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "in your curbside bin",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "newspaper",
    "name": "Newspaper",
    "cat": "Paper",
    "status": "curbside",
    "hazard": false,
    "prep": "No prep needed.",
    "where": "Curbside recycling bin",
    "note": "Soy-based inks are fine. Don't bundle with rubber bands.",
    "gratitude_note": "Yesterday’s news, tomorrow’s newsprint — soy inks and all.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "in your curbside bin",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "magazines-catalogs",
    "name": "Magazines / catalogs",
    "cat": "Paper",
    "status": "curbside",
    "hazard": false,
    "prep": "Remove plastic sleeve if present.",
    "where": "Curbside recycling bin",
    "note": "Glossy paper is recyclable.",
    "gratitude_note": "Glossy is fine — only the plastic mailing sleeve needs to come off.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "in your curbside bin",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "shredded-paper",
    "name": "Shredded paper",
    "cat": "Paper",
    "status": "partial",
    "hazard": false,
    "prep": "Seal inside a paper bag. Staple or tape shut.",
    "where": "Curbside (bagged) or paper recycling drop-off",
    "note": "Loose shreds jam sorting machinery. Always contain them in a paper bag first.",
    "gratitude_note": "Bag the confetti so it will not jam the works — then it still counts.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "bagged in your curbside bin",
        "local_variance": true,
        "is_recommended": true
      },
      {
        "rung": "compost",
        "rank": 6,
        "channel": "compost_home",
        "label": "or compost the shreds"
      }
    ]
  },
  {
    "slug": "thermal-paper-receipt",
    "name": "Thermal paper receipt",
    "cat": "Paper",
    "status": "no",
    "hazard": false,
    "prep": "N/A",
    "where": "Regular trash",
    "note": "Thermal coating contains BPA/BPS — a known endocrine disruptor. Cannot and should not be recycled.",
    "gratitude_note": "Coated in BPA — better it never touches the recycling stream at all.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "in the trash (BPA-coated)",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "pizza-box-clean-top-half",
    "name": "Pizza box (clean top half)",
    "cat": "Paper",
    "status": "partial",
    "hazard": false,
    "prep": "Tear off the clean top — recycle it. Compost or trash the greasy bottom.",
    "where": "Top half: curbside bin",
    "note": "The clean top of most pizza boxes is recyclable. Tear it off and use it.",
    "gratitude_note": "Tear it in two — the clean half still has a future ahead of it.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "clean top half in curbside",
        "local_variance": true,
        "is_recommended": true
      },
      {
        "rung": "compost",
        "rank": 6,
        "channel": "compost_home",
        "label": "greasy bottom to compost"
      }
    ]
  },
  {
    "slug": "paper-coffee-cup",
    "name": "Paper coffee cup",
    "cat": "Paper",
    "status": "no",
    "hazard": false,
    "prep": "N/A",
    "where": "Regular trash",
    "note": "Lined with plastic or wax. Almost no facilities process them. Lids are usually #6 PS — also not recyclable.",
    "gratitude_note": "A thin plastic lining hides inside — almost nowhere can split it apart.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "in the trash (plastic-lined)",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "paper-bags",
    "name": "Paper bags",
    "cat": "Paper",
    "status": "curbside",
    "hazard": false,
    "prep": "Remove rope or plastic handles.",
    "where": "Curbside recycling bin",
    "note": "Clean, flat paper bags are fine for curbside.",
    "gratitude_note": "Good for many trips first — then flat into the curbside bin.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "reuse them first"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "flat in your curbside bin",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "glass-bottle-clear",
    "name": "Glass bottle (clear)",
    "cat": "Glass",
    "status": "partial",
    "hazard": false,
    "prep": "Empty and rinse.",
    "where": "Curbside (check local) or glass drop-off point",
    "note": "Many programs no longer accept glass curbside due to contamination. Check earth911.com.",
    "gratitude_note": "Infinitely recyclable — if your program still takes it, or a glass drop-off does.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "reuse it first"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "curbside or a glass drop-off",
        "local_variance": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "glass-food-jar",
    "name": "Glass food jar",
    "cat": "Glass",
    "status": "partial",
    "hazard": false,
    "prep": "Empty, rinse, remove lid (recycle metal lid separately).",
    "where": "Curbside (check local) or glass drop-off",
    "note": "Steel lids go in the metal bin. Verify your municipality accepts glass curbside.",
    "gratitude_note": "A jar is a gift twice — store something in it, or recycle the metal lid apart.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "reuse it for storage",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "curbside",
        "label": "or recycle (lid in the metal bin)",
        "local_variance": true
      }
    ]
  },
  {
    "slug": "broken-glass",
    "name": "Broken glass",
    "cat": "Glass",
    "status": "no",
    "hazard": false,
    "prep": "Wrap in several layers of newspaper or a paper bag. Label: BROKEN GLASS.",
    "where": "Regular trash (safely wrapped)",
    "note": "A safety hazard and cannot be processed at most facilities. Wrap it and label it.",
    "gratitude_note": "Sharp and unsortable — wrap it kindly so no one downstream is hurt.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "wrapped and labeled, in the trash",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "ceramics-pottery",
    "name": "Ceramics / pottery",
    "cat": "Glass",
    "status": "no",
    "hazard": false,
    "prep": "If intact, donate. If broken, wrap for trash.",
    "where": "Donation (intact) or trash (broken)",
    "note": "Different chemical composition than container glass. Will ruin a glass processing batch.",
    "gratitude_note": "Whole, it can serve another table; broken, wrap it with care.",
    "dispositions": [
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate it if intact",
        "is_recommended": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "wrap and trash if broken"
      }
    ]
  },
  {
    "slug": "mirrors-window-glass",
    "name": "Mirrors / window glass",
    "cat": "Glass",
    "status": "no",
    "hazard": false,
    "prep": "Wrap safely for trash.",
    "where": "Regular trash (safely wrapped)",
    "note": "Different chemistry than bottle glass. Not recyclable in standard glass streams.",
    "gratitude_note": "A different glass entirely — it cannot join the bottles, but it may still serve.",
    "dispositions": [
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate if intact",
        "is_recommended": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "wrap and trash otherwise"
      }
    ]
  },
  {
    "slug": "smartphone",
    "name": "Smartphone",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "prep": "Back up data, factory reset, remove SIM and SD cards.",
    "where": "E-waste facility, manufacturer take-back, or Best Buy drop-off",
    "note": "Contains gold, silver, cobalt. Apple, Samsung, and Google have take-back programs — some offer credit.",
    "gratitude_note": "Gold, silver, and cobalt from the earth — and still more life in it. Let’s pass it on.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "keep it as a backup or media device"
      },
      {
        "rung": "repair",
        "rank": 2,
        "channel": "drop_off",
        "label": "fix a cracked screen or battery",
        "facility_type": "repair_shop"
      },
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "it still works",
        "source": "epa-electronics",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "recover the metals (certified e-waste)",
        "source": "epa-electronics",
        "facility_type": "ewaste"
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "never — phones never belong in the trash"
      }
    ]
  },
  {
    "slug": "laptop-notebook-computer",
    "name": "Laptop / notebook computer",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "prep": "Back up and wipe data (DBAN or factory reset + encrypt).",
    "where": "E-waste facility, Best Buy, Staples, or manufacturer take-back",
    "note": "Dell, Apple, HP all have take-back programs. Working devices can be resold or donated.",
    "gratitude_note": "Wiped and willing, it can serve a student or a stranger before it is ever mined for metals.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "keep it as a backup machine"
      },
      {
        "rung": "repair",
        "rank": 2,
        "channel": "drop_off",
        "label": "upgrade the RAM or drive",
        "facility_type": "repair_shop"
      },
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "it still works",
        "source": "epa-electronics",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "wipe and recycle the metals",
        "source": "epa-electronics",
        "facility_type": "ewaste"
      }
    ]
  },
  {
    "slug": "crt-television-tube-tv",
    "name": "CRT television (tube TV)",
    "cat": "Electronics",
    "status": "hazardous",
    "hazard": true,
    "prep": "Do not break — contains lead glass. Handle upright.",
    "where": "Certified e-waste facility only (call ahead — some charge a fee)",
    "note": "CRTs contain 4–8 lbs of lead. Illegal in the trash in most states.",
    "gratitude_note": "Pounds of leaded glass inside — it needs a certified, careful goodbye.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "certified e-waste facility only",
        "source": "epa-electronics",
        "facility_type": "ewaste",
        "hazard": true,
        "is_recommended": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "never — illegal in the trash in most states"
      }
    ]
  },
  {
    "slug": "flat-screen-tv-led-lcd",
    "name": "Flat-screen TV (LED/LCD)",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "prep": "Remove remote and any attached cables.",
    "where": "E-waste facility or retailer drop-off (Best Buy charges a small fee)",
    "note": "Older LED backlights may contain mercury. Best Buy accepts TVs with a processing fee.",
    "gratitude_note": "Still glowing for someone, maybe — and if not, certified recyclers reclaim it.",
    "dispositions": [
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate if it still works",
        "source": "epa-electronics"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "certified e-waste recycler",
        "source": "epa-electronics",
        "facility_type": "ewaste",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "printer-inkjet-or-laser",
    "name": "Printer (inkjet or laser)",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "prep": "Remove ink/toner cartridges first (recycle those separately at Staples or Office Depot).",
    "where": "E-waste facility",
    "note": "Staples and Office Depot recycle cartridges and earn you reward points.",
    "gratitude_note": "Pull its cartridges first, then let the e-waste stream reclaim the rest.",
    "dispositions": [
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate if it still prints",
        "source": "epa-electronics"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "e-waste (cartridges removed)",
        "source": "epa-electronics",
        "facility_type": "ewaste",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "ink-cartridge-toner-cartridge",
    "name": "Ink cartridge / toner cartridge",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "prep": "Place in a resealable bag to prevent leaks.",
    "where": "Staples, Office Depot, or manufacturer mail-back programs",
    "note": "Refilling is even better than recycling — ask about refill programs. Staples Rewards gives points for every cartridge returned.",
    "gratitude_note": "Refilled, it lives again; returned, it earns you points either way.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "refill and reuse it",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "retail_takeback",
        "label": "return at Staples / Office Depot"
      }
    ]
  },
  {
    "slug": "tablet-ipad",
    "name": "Tablet / iPad",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "prep": "Back up data and perform factory reset.",
    "where": "E-waste facility, Apple store, Best Buy",
    "note": "Apple's Trade In / Recycle program accepts all Apple devices — even non-functional ones.",
    "gratitude_note": "Even dark and dead, Apple and others will take it back to mine its metals.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "keep it as an e-reader"
      },
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "it still works",
        "source": "epa-electronics",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "take-back even if it is dead",
        "source": "epa-electronics",
        "facility_type": "ewaste"
      }
    ]
  },
  {
    "slug": "desktop-computer-tower",
    "name": "Desktop computer / tower",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "desktop",
      "pc",
      "tower",
      "computer"
    ],
    "prep": "Back up and wipe the drive (or remove it).",
    "where": "E-waste facility, Best Buy, or manufacturer take-back.",
    "note": "Recoverable metals plus a drive holding your data. Wipe it, then donate working units or use certified e-waste.",
    "gratitude_note": "Gold in its board, your data on its drive — wipe it clean, then pass it on.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "keep it as a backup or home server"
      },
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate if it still runs",
        "source": "epa-electronics",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "certified e-waste (wiped)",
        "source": "epa-electronics",
        "facility_type": "ewaste"
      }
    ]
  },
  {
    "slug": "computer-monitor",
    "name": "Computer monitor (LCD/LED)",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "monitor",
      "screen",
      "display",
      "lcd monitor"
    ],
    "prep": "Detach the stand and cables.",
    "where": "E-waste facility or retailer drop-off (Best Buy).",
    "note": "Older backlights may contain mercury. E-waste only — it rides the same stream as TVs, never curbside.",
    "gratitude_note": "A clear window for someone’s work still — donate it, or let certified e-waste reclaim it.",
    "dispositions": [
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate if it works",
        "source": "epa-electronics"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "certified e-waste recycler",
        "source": "epa-electronics",
        "is_recommended": true,
        "facility_type": "ewaste"
      }
    ]
  },
  {
    "slug": "keyboard-mouse",
    "name": "Keyboard & mouse",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "keyboard",
      "mouse",
      "peripherals"
    ],
    "prep": "Remove batteries from wireless models.",
    "where": "E-waste drop-off; donate if working.",
    "note": "Plastic plus circuitry — not curbside. Working sets are donatable; otherwise e-waste.",
    "gratitude_note": "Plenty of keystrokes left in them — donate the set, or send it to e-waste whole.",
    "dispositions": [
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate working peripherals",
        "source": "epa-electronics"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "e-waste drop-off",
        "source": "epa-electronics",
        "is_recommended": true,
        "facility_type": "ewaste"
      }
    ]
  },
  {
    "slug": "charging-cables-cords",
    "name": "Charging cables & cords",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "cable",
      "cord",
      "charger cable",
      "usb cable",
      "wires",
      "chargers"
    ],
    "prep": "Bundle and tie them together.",
    "where": "E-waste drop-off or scrap-metal yard.",
    "note": "The copper inside makes them valuable scrap, but loose cords tangle curbside sorters. E-waste or scrap only.",
    "gratitude_note": "Copper veins worth saving — bundle them for e-waste, never the curbside bin.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "keep a spare that still works"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "e-waste or scrap yard (copper)",
        "source": "epa-electronics",
        "is_recommended": true,
        "facility_type": "ewaste"
      }
    ]
  },
  {
    "slug": "headphones-earbuds",
    "name": "Headphones / earbuds",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": true,
    "aliases": [
      "headphones",
      "earbuds",
      "earphones",
      "airpods",
      "wireless earbuds"
    ],
    "prep": "N/A",
    "where": "E-waste / battery drop-off (especially wireless).",
    "note": "Wired or wireless, they are e-waste; wireless buds hold tiny lithium cells that are a fire risk in the trash.",
    "gratitude_note": "Small but never trash — their tiny batteries belong in e-waste, not a landfill fire.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "battery / e-waste drop-off",
        "source": "epa-lithium-batteries",
        "is_recommended": true,
        "facility_type": "ewaste",
        "hazard": true
      }
    ]
  },
  {
    "slug": "power-bank-portable-charger",
    "name": "Power bank / portable charger",
    "cat": "Electronics",
    "status": "hazardous",
    "hazard": true,
    "aliases": [
      "power bank",
      "portable charger",
      "battery pack",
      "phone charger battery"
    ],
    "prep": "Tape the port; do not puncture.",
    "where": "Certified e-waste / Call2Recycle battery drop-off.",
    "note": "Built-in lithium-ion — never trash or curbside (fire risk). Treat it like any lithium battery.",
    "gratitude_note": "A pocket of stored power — handle it gently and bring it to a battery drop-off.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "battery / e-waste drop-off",
        "source": "epa-lithium-batteries",
        "is_recommended": true,
        "facility_type": "ewaste",
        "hazard": true
      }
    ]
  },
  {
    "slug": "game-console",
    "name": "Game console",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "playstation",
      "xbox",
      "nintendo",
      "console",
      "gaming"
    ],
    "prep": "Sign out of accounts; factory reset.",
    "where": "Sell / donate; e-waste if dead.",
    "note": "High resale and reuse value; otherwise e-waste. Wipe accounts and storage first.",
    "gratitude_note": "Hundreds of hours of joy left in it — sign out, wipe it, and pass it on.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "sell or hand it down"
      },
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate if it works",
        "source": "epa-electronics",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "e-waste if dead",
        "source": "epa-electronics",
        "facility_type": "ewaste"
      }
    ]
  },
  {
    "slug": "router-modem",
    "name": "Router / modem / cable box",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "router",
      "modem",
      "cable box",
      "wifi",
      "gateway"
    ],
    "prep": "Factory reset; return leased gear to your ISP.",
    "where": "ISP return or e-waste drop-off.",
    "note": "Often leased — return it to your provider first. Owned units are e-waste, never curbside.",
    "gratitude_note": "Likely your ISP’s on loan — return it first; if it’s yours, e-waste it whole.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "return leased gear to the ISP",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "e-waste if you own it",
        "source": "epa-electronics",
        "facility_type": "ewaste"
      }
    ]
  },
  {
    "slug": "usb-external-drive",
    "name": "USB drive / external hard drive",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "usb",
      "flash drive",
      "thumb drive",
      "external drive",
      "hard drive",
      "ssd"
    ],
    "prep": "Securely wipe or physically destroy first.",
    "where": "E-waste drop-off (after wiping).",
    "note": "Holds personal data — wipe or destroy it before recycling. E-waste, not curbside.",
    "gratitude_note": "Your data still lives inside — wipe it clean, then let e-waste reclaim the metals.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "e-waste drop-off (wiped)",
        "source": "epa-electronics",
        "is_recommended": true,
        "facility_type": "ewaste"
      }
    ]
  },
  {
    "slug": "digital-camera",
    "name": "Digital camera",
    "cat": "Electronics",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "camera",
      "dslr",
      "digital camera",
      "camcorder",
      "point and shoot"
    ],
    "prep": "Remove and recycle the battery separately.",
    "where": "Sell / donate; e-waste if dead.",
    "note": "Working cameras hold real resale and donation value; the battery recycles separately. E-waste for dead units.",
    "gratitude_note": "Still ready to catch the light — sell or donate it before it’s ever mined for parts.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "retail_takeback",
        "label": "sell or keep as a backup"
      },
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate if it works",
        "source": "epa-electronics",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "e-waste if dead",
        "source": "epa-electronics",
        "facility_type": "ewaste"
      }
    ]
  },
  {
    "slug": "alkaline-battery-aa-aaa-9v",
    "name": "Alkaline battery (AA, AAA, 9V)",
    "cat": "Batteries",
    "status": "drop-off",
    "hazard": false,
    "prep": "Tape the terminals of 9V batteries with electrical tape before dropping off.",
    "where": "Home Depot, Lowe's, Staples, Best Buy, or Call2Recycle.org drop-off",
    "note": "Now considered non-hazardous in most US states but should still be diverted from landfill.",
    "gratitude_note": "Spent but not worthless — a drop-off keeps its metals out of the ground.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "at a battery drop-off",
        "source": "epa-household-batteries",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "rechargeable-battery-nimh-nicd",
    "name": "Rechargeable battery (NiMH, NiCd)",
    "cat": "Batteries",
    "status": "drop-off",
    "hazard": false,
    "prep": "Tape terminals. Place in a clear plastic bag.",
    "where": "Call2Recycle drop-off (Home Depot, Lowe's, Best Buy)",
    "note": "Use Call2Recycle.org to find the nearest drop-off by zip code.",
    "gratitude_note": "Made to be used hundreds of times — and recycled when it finally rests.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "Call2Recycle drop-off",
        "source": "call2recycle-locator",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "lithium-ion-battery",
    "name": "Lithium-ion battery",
    "cat": "Batteries",
    "status": "hazardous",
    "hazard": true,
    "prep": "Never puncture or expose to heat. Tape terminals with electrical tape.",
    "where": "Certified e-waste / hazardous waste facility",
    "note": "Fire risk if damaged, punctured, or improperly shipped. Never in regular trash or curbside.",
    "gratitude_note": "Powerful and touchy — tape its terminals and hand it to people who know how.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "certified e-waste, terminals taped",
        "source": "epa-lithium-batteries",
        "facility_type": "ewaste",
        "hazard": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "car-battery-lead-acid",
    "name": "Car battery (lead-acid)",
    "cat": "Batteries",
    "status": "drop-off",
    "hazard": false,
    "prep": "Keep upright. Do not allow acid to leak.",
    "where": "Auto parts store (AutoZone, O'Reilly, Advanced Auto — usually gives a core deposit refund)",
    "note": "Auto parts stores are required to accept lead-acid batteries in most states.",
    "gratitude_note": "Almost 100% recyclable — and the store may even pay you a core refund.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "retail_takeback",
        "label": "auto parts store (core refund)",
        "source": "epa-household-batteries",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "laptop-battery-removed",
    "name": "Laptop battery (removed)",
    "cat": "Batteries",
    "status": "hazardous",
    "hazard": true,
    "prep": "Do not bend or puncture. Tape terminals.",
    "where": "E-waste facility or manufacturer take-back",
    "note": "Lithium batteries from laptops are a fire risk if mishandled or shipped improperly.",
    "gratitude_note": "A fire risk if bent — tape it, bag it, and bring it to e-waste.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "e-waste, terminals taped",
        "source": "epa-lithium-batteries",
        "facility_type": "ewaste",
        "hazard": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "button-coin-cell",
    "name": "Button / coin cell battery",
    "cat": "Batteries",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "coin cell",
      "button battery",
      "cr2032",
      "watch battery"
    ],
    "prep": "Tape both sides; store out of reach of children.",
    "where": "Battery drop-off (Call2Recycle, retailers).",
    "note": "Tiny but a serious swallowing hazard and often lithium. Tape it, drop it off, and keep it away from kids.",
    "gratitude_note": "Small, shiny, and dangerous to little ones — tape it and bring it to a battery drop-off.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "battery drop-off (taped)",
        "source": "epa-household-batteries",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "power-tool-battery",
    "name": "Power-tool battery pack",
    "cat": "Batteries",
    "status": "hazardous",
    "hazard": true,
    "aliases": [
      "drill battery",
      "tool battery",
      "dewalt battery",
      "18v battery",
      "cordless tool battery"
    ],
    "prep": "Tape terminals; do not puncture.",
    "where": "Call2Recycle / tool-retailer drop-off (Home Depot, Lowe’s).",
    "note": "High-capacity lithium or NiCd — a fire risk. Call2Recycle and tool retailers take them back.",
    "gratitude_note": "Packed with power and risk — tape the terminals and hand it to Call2Recycle.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "Call2Recycle / retailer drop-off",
        "source": "call2recycle-locator",
        "is_recommended": true,
        "hazard": true
      }
    ]
  },
  {
    "slug": "vape-ecigarette",
    "name": "Vape / e-cigarette",
    "cat": "Batteries",
    "status": "hazardous",
    "hazard": true,
    "aliases": [
      "vape",
      "e-cigarette",
      "disposable vape",
      "juul",
      "vape pen"
    ],
    "prep": "Do not disassemble or puncture.",
    "where": "Vape-shop take-back, HHW, or e-waste — never the trash.",
    "note": "A lithium battery and nicotine residue welded together — both a fire risk and hazardous waste. Never trash or curbside.",
    "gratitude_note": "A battery and a toxin in one — never the trash; a take-back or HHW handles it safely.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "vape-shop or e-waste take-back where it exists",
        "source": "epa-lithium-batteries",
        "facility_type": "ewaste",
        "hazard": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "hhw",
        "label": "HHW facility",
        "source": "epa-lithium-batteries",
        "is_recommended": true,
        "hazard": true
      }
    ]
  },
  {
    "slug": "hearing-aid-battery",
    "name": "Hearing aid battery (zinc-air)",
    "cat": "Batteries",
    "status": "drop-off",
    "hazard": false,
    "aliases": [
      "hearing aid battery",
      "zinc air",
      "za13",
      "pr44"
    ],
    "prep": "Collect in a small container.",
    "where": "Battery drop-off or audiologist.",
    "note": "Zinc-air buttons are low-hazard but still worth diverting from landfill. Many audiologists and drop-offs accept them.",
    "gratitude_note": "Spent zinc-air buttons — small, but a drop-off still keeps their metals in the loop.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "battery drop-off or audiologist",
        "source": "epa-household-batteries",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "motor-oil",
    "name": "Motor oil",
    "cat": "Hazardous",
    "status": "drop-off",
    "hazard": false,
    "prep": "Keep in original container or a clean sealed container.",
    "where": "AutoZone, O'Reilly Auto, Jiffy Lube, or municipal HHW facility",
    "note": "1 quart of motor oil can contaminate 250,000 gallons of drinking water. Never pour it down a drain.",
    "gratitude_note": "Filtered and re-refined, used oil runs again — never let it touch a drain.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "auto store or HHW (re-refined)",
        "source": "epa-used-oil",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "paint-latex-water-based",
    "name": "Paint (latex / water-based)",
    "cat": "Hazardous",
    "status": "drop-off",
    "hazard": false,
    "prep": "Keep lid on tightly. Do not dilute.",
    "where": "PaintCare drop-off (paintcare.org) — hardware stores nationwide",
    "note": "Dried-out latex paint can go in regular trash. Wet paint must go to PaintCare or HHW.",
    "gratitude_note": "Wet latex finds new life through PaintCare; dried, it can rest in the trash.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "PaintCare drop-off",
        "source": "paintcare-dropoff",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "paint-oil-based",
    "name": "Paint (oil-based)",
    "cat": "Hazardous",
    "status": "hazardous",
    "hazard": true,
    "prep": "Keep in original container with tight lid.",
    "where": "HHW (Household Hazardous Waste) event only",
    "note": "Oil-based paint is flammable. Check your county's HHW event schedule.",
    "gratitude_note": "Flammable and fierce — only an HHW event should take it from here.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "hhw",
        "label": "HHW event only",
        "source": "epa-hhw",
        "facility_type": "hhw",
        "hazard": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "fluorescent-bulb-cfl",
    "name": "Fluorescent bulb / CFL",
    "cat": "Hazardous",
    "status": "drop-off",
    "hazard": true,
    "prep": "Do not break — contains mercury vapor. Keep in original box or wrap in newspaper.",
    "where": "Home Depot, Lowe's, or HHW event",
    "note": "If a CFL breaks: ventilate room immediately, do not vacuum, follow EPA cleanup guidelines.",
    "gratitude_note": "Mercury sleeps inside — keep it whole and let a take-back reclaim it.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "retail_takeback",
        "label": "hardware store take-back",
        "source": "epa-cfl",
        "hazard": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "led-bulb",
    "name": "LED bulb",
    "cat": "Hazardous",
    "status": "drop-off",
    "hazard": false,
    "prep": "No prep needed.",
    "where": "Home Depot, local HHW, or some curbside programs",
    "note": "LEDs contain small amounts of hazardous metals. Check if your curbside program accepts them.",
    "gratitude_note": "Small hazardous metals within — a drop-off keeps them out of the soil.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "hardware store or HHW",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "prescription-medications",
    "name": "Prescription medications",
    "cat": "Hazardous",
    "status": "drop-off",
    "hazard": true,
    "prep": "Remove personal info from labels.",
    "where": "Pharmacy drug take-back (CVS, Walgreens) or DEA National Take-Back Day",
    "note": "Never flush medications — they end up in waterways and affect aquatic life.",
    "gratitude_note": "Never flushed, never landfilled — a pharmacy take-back protects the water.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "drop_off",
        "label": "pharmacy take-back — never flush",
        "source": "fda-drug-disposal",
        "hazard": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "pesticides-herbicides",
    "name": "Pesticides / herbicides",
    "cat": "Hazardous",
    "status": "hazardous",
    "hazard": true,
    "prep": "Keep in original labeled container. Do not mix.",
    "where": "HHW facility",
    "note": "Never pour on ground or down drains. Highly toxic to groundwater, soil, and wildlife.",
    "gratitude_note": "Toxic to soil and stream — only an HHW facility should handle it.",
    "dispositions": [
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "hhw",
        "label": "HHW facility only",
        "source": "epa-hhw",
        "facility_type": "hhw",
        "hazard": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "antifreeze-coolant",
    "name": "Antifreeze / coolant",
    "cat": "Hazardous",
    "status": "drop-off",
    "hazard": true,
    "prep": "Keep in original or a clean sealed container.",
    "where": "Auto parts stores, some municipal facilities",
    "note": "Toxic to animals but has a sweet smell that attracts them. Never pour down drains.",
    "gratitude_note": "Sweet-smelling but deadly to animals — recyclers can clean and reuse it.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "auto store or municipal facility",
        "hazard": true,
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "smoke-detector-ionization-type",
    "name": "Smoke detector (ionization type)",
    "cat": "Hazardous",
    "status": "drop-off",
    "hazard": true,
    "prep": "Do not disassemble.",
    "where": "First Alert take-back (its own brands, up to 4), HHW facility, or household trash (EPA: no special instructions)",
    "note": "Contains a trace of Americium-241, sealed so it poses no radiation risk handled properly. EPA says household trash is allowed; First Alert still takes back its own-brand alarms (Kidde no longer accepts mail-ins — verified 2026-07-13).",
    "gratitude_note": "A speck of radioactivity, sealed and safe — a take-back or HHW is still the kindest path.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "mail_back",
        "label": "First Alert take-back (own brands, up to 4)",
        "conditions": "First Alert / BRK / Onelink brands only",
        "facility_type": "mail_back_program",
        "hazard": true,
        "is_recommended": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "hhw",
        "label": "HHW facility (other brands)",
        "facility_type": "hhw",
        "hazard": true
      },
      {
        "rung": "dispose",
        "rank": 7,
        "channel": "trash",
        "label": "household trash — EPA: no special instructions",
        "local_variance": true,
        "source": "epa-smoke-detectors"
      }
    ]
  },
  {
    "slug": "clothing-wearable",
    "name": "Clothing (wearable)",
    "cat": "Textiles",
    "status": "drop-off",
    "hazard": false,
    "prep": "Clean and dry.",
    "where": "Goodwill, Salvation Army, H&M take-back bins, or local textile collection",
    "note": "Even worn or torn clothing is accepted — what can't be resold is shredded into insulation or rags.",
    "gratitude_note": "Worn or torn, every thread has a next use — wear it, share it, or shred it.",
    "dispositions": [
      {
        "rung": "reuse",
        "rank": 1,
        "channel": "donation_center",
        "label": "wear or hand it down again"
      },
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate it (any condition)",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "shredded into rags / insulation"
      }
    ]
  },
  {
    "slug": "shoes",
    "name": "Shoes",
    "cat": "Textiles",
    "status": "drop-off",
    "hazard": false,
    "prep": "Tie pairs together.",
    "where": "Goodwill, Nike Reuse-A-Shoe, or local textile bins",
    "note": "Nike's Reuse-A-Shoe program grinds old sneakers into sports court surfaces.",
    "gratitude_note": "Another mile left in them for someone — or ground into a playground.",
    "dispositions": [
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate wearable pairs",
        "is_recommended": true
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "Nike Reuse-A-Shoe grind"
      }
    ]
  },
  {
    "slug": "textiles-fabric-scraps",
    "name": "Textiles / fabric scraps",
    "cat": "Textiles",
    "status": "drop-off",
    "hazard": false,
    "prep": "Clean and dry. Any condition.",
    "where": "Textile recycling bins or thrift stores",
    "note": "Torn or stained textiles are still useful as industrial rags and insulation filler.",
    "gratitude_note": "Too far gone to wear, still perfect as rags and insulation.",
    "dispositions": [
      {
        "rung": "repurpose",
        "rank": 3,
        "channel": "retail_takeback",
        "label": "reuse as cleaning rags"
      },
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "thrift store textile bin"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "textile recycling",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "food-scraps-organics",
    "name": "Food scraps / organics",
    "cat": "Organics",
    "status": "compost",
    "hazard": false,
    "prep": "No meat, dairy, or oils for home composting.",
    "where": "Home compost bin or municipal composting program",
    "note": "Food waste is ~30% of what goes to landfill. Composting returns critical nutrients to soil.",
    "gratitude_note": "Yesterday’s meal becomes tomorrow’s soil — give it back to the earth.",
    "dispositions": [
      {
        "rung": "compost",
        "rank": 6,
        "channel": "compost_home",
        "label": "home or municipal compost",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "cooking-oil-used",
    "name": "Cooking oil (used)",
    "cat": "Organics",
    "status": "drop-off",
    "hazard": false,
    "prep": "Cool completely. Strain food particles. Seal in a container.",
    "where": "Some municipalities, biodiesel programs, or grease recycling drop-off",
    "note": "Used cooking oil can be converted into biodiesel fuel.",
    "gratitude_note": "Strained and cooled, it can fuel an engine as biodiesel.",
    "dispositions": [
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "grease / biodiesel drop-off",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "tires",
    "name": "Tires",
    "cat": "Rubber",
    "status": "drop-off",
    "hazard": false,
    "prep": "No rims required.",
    "where": "Tire retailer (when buying new tires) or municipal tire drop-off event",
    "note": "Recycled tires become playground surfaces, athletic tracks, and road asphalt.",
    "gratitude_note": "Built to roll for years — reborn as playgrounds, tracks, and roads.",
    "dispositions": [
      {
        "rung": "repurpose",
        "rank": 3,
        "channel": "retail_takeback",
        "label": "reuse as planters or swings"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "tire retailer or amnesty event",
        "is_recommended": true
      }
    ]
  },
  {
    "slug": "mattress",
    "name": "Mattress",
    "cat": "Bulky Goods",
    "status": "drop-off",
    "hazard": false,
    "prep": "Bag in a mattress bag if possible.",
    "where": "Mattress recycling facility or retailer take-back (byebyemattress.com)",
    "note": "Mattress Recycling Council runs programs in CA, CT, and RI. Check for local retailer programs elsewhere.",
    "gratitude_note": "Up to 90% recyclable — steel, foam, and fiber all find new beds.",
    "dispositions": [
      {
        "rung": "donate",
        "rank": 4,
        "channel": "donation_center",
        "label": "donate if still usable"
      },
      {
        "rung": "recycle",
        "rank": 5,
        "channel": "drop_off",
        "label": "mattress recycling facility",
        "is_recommended": true
      }
    ]
  }
];
