export type Rung = 'reuse' | 'repair' | 'repurpose' | 'donate' | 'recycle' | 'compost' | 'dispose';

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
  reuse: '↻ Reuse', repair: '⚒ Repair', repurpose: '⇄ Repurpose', donate: '♡ Donate',
  recycle: '♻ Recycle', compost: '⚘ Compost', dispose: '⊘ Dispose',
};

export const ITEMS: Item[] = [
    // METAL
    { name: 'Aluminum can', cat: 'Metal', status: 'curbside', prep: 'Empty and rinse. No need to crush.', where: 'Curbside recycling bin', note: 'Most valuable recyclable commodity. Can be recycled infinitely without quality loss.',
      gratitude_note: 'Endlessly reborn — this can comes back as a new can, again and again. Rinse it and send it home.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'in your curbside bin', best: true } ] },
    { name: 'Steel / tin can', cat: 'Metal', status: 'curbside', prep: 'Empty and rinse.', where: 'Curbside recycling bin', note: 'Food cans, paint cans (empty and dry). Magnetic separators pull them out at facilities.',
      gratitude_note: 'Strong and magnetic — steel returns to the foundry as good as new.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'in your curbside bin', best: true } ] },
    { name: 'Aerosol can (empty)', cat: 'Metal', status: 'curbside', prep: 'Must be 100% empty. Remove plastic cap.', where: 'Curbside recycling bin', note: 'Only when completely empty — no product or pressure remaining.',
      gratitude_note: 'Emptied of its charge, it is simply valuable steel again.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'in your curbside bin, fully empty', best: true } ] },
    { name: 'Aerosol can (not empty)', cat: 'Metal', status: 'hazardous', prep: 'Never puncture or spray to empty into trash.', where: 'Household Hazardous Waste (HHW) facility', note: 'Pressurized and flammable. Never in regular trash or recycling.',
      gratitude_note: 'Still pressurized and proud — it needs careful hands, not a crusher.',
      dispositions: [ { rung: 'dispose', channel: 'hhw', label: 'at a Household Hazardous Waste facility', best: true, hazard: true } ] },
    { name: 'Aluminum foil (clean)', cat: 'Metal', status: 'partial', prep: 'Clean of all food residue. Scrunch into a ball at least 2 inches across.', where: 'Curbside (when clean and balled up)', note: 'Contaminated foil goes to trash. Clean foil bundles need to be fist-sized for sorting.',
      gratitude_note: 'Ball it up so it cannot slip through the sorters — clean foil is still pure aluminum.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'curbside when clean and balled up', best: true, local: true } ] },
    { name: 'Scrap metal', cat: 'Metal', status: 'drop-off', prep: 'Separate from other materials.', where: 'Scrap metal yard or HHW event', note: 'Many scrap yards pay by weight for aluminum, copper, and brass.',
      gratitude_note: 'Heavy with worth — a scrap yard will weigh it and welcome it.',
      dispositions: [ { rung: 'recycle', channel: 'scrap_yard', label: 'at a scrap metal yard (often paid by weight)', best: true } ] },

    // PLASTIC
    { name: 'Plastic bottle #1 PET', cat: 'Plastic', status: 'curbside', prep: 'Empty, rinse, replace cap.', where: 'Curbside recycling bin', note: 'Water bottles, soda bottles. One of the most commonly recycled plastics.',
      gratitude_note: 'One of the most wanted plastics — cap on, it heads straight for a new life.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'in your curbside bin', best: true } ] },
    { name: 'Plastic jug #2 HDPE', cat: 'Plastic', status: 'curbside', prep: 'Empty and rinse.', where: 'Curbside recycling bin', note: 'Milk jugs, laundry detergent, shampoo bottles.',
      gratitude_note: 'Sturdy and sought-after — #2 is recycled almost everywhere.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'in your curbside bin', best: true } ] },
    { name: 'Plastic bag / film', cat: 'Plastic', status: 'drop-off', prep: 'Clean and dry. No food residue.', where: 'Grocery store drop-off bins (Walmart, Target, Publix)', note: 'NEVER in curbside bin — clogs and destroys sorting machinery.',
      gratitude_note: 'Soft and sneaky — it strangles curbside sorters, but store bins welcome it.',
      dispositions: [ { rung: 'reuse', channel: 'retail_takeback', label: 'use it again first', best: true }, { rung: 'recycle', channel: 'drop_off', label: 'at store film drop-off bins' } ] },
    { name: 'Styrofoam / foam #6 PS', cat: 'Plastic', status: 'drop-off', prep: 'Clean of food.', where: 'Styrofoam drop-off programs, UPS stores, Earth911.com locator', note: 'Check Earth911.com for local foam drop-off. Not accepted curbside anywhere.',
      gratitude_note: 'Light as air, stubborn to process — special drop-offs give it a chance.',
      dispositions: [ { rung: 'recycle', channel: 'drop_off', label: 'at a foam drop-off program', best: true } ] },
    { name: 'Plastic straw', cat: 'Plastic', status: 'no', prep: 'N/A', where: 'Regular trash', note: 'Too small and light for sorting equipment. Contaminates loads and clogs machinery.',
      gratitude_note: 'Too small to save this time — the kindest fix is skipping the next one.',
      dispositions: [ { rung: 'dispose', channel: 'trash', label: 'in the trash — then refuse the next one', best: true } ] },
    { name: 'Plastic utensils / cutlery', cat: 'Plastic', status: 'no', prep: 'N/A', where: 'Regular trash', note: 'Too small to be sorted. Switch to reusable utensils to eliminate the waste.',
      gratitude_note: 'Too small for the sorters — a reusable set ends this cycle for good.',
      dispositions: [ { rung: 'dispose', channel: 'trash', label: 'in the trash — switch to reusable', best: true } ] },
    { name: 'Yogurt container #5 PP', cat: 'Plastic', status: 'partial', prep: 'Empty and rinse.', where: 'Curbside (check your local program)', note: '#5 PP is accepted in many but not all programs. Verify at earth911.com.',
      gratitude_note: 'Welcome in more places every year — check whether yours is one.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'curbside where #5 is accepted', best: true, local: true } ] },
    { name: 'Chip bag / snack wrapper', cat: 'Plastic', status: 'no', prep: 'N/A', where: 'Regular trash', note: 'Multi-layer films (plastic + foil + plastic) cannot be sorted or processed.',
      gratitude_note: 'Layered foil and film, fused for freshness — sadly unsortable today.',
      dispositions: [ { rung: 'dispose', channel: 'trash', label: 'in the trash (multi-layer, unsortable)', best: true } ] },
    { name: 'Bubble wrap', cat: 'Plastic', status: 'drop-off', prep: 'Clean and dry.', where: 'Grocery store plastic film collection bins', note: 'Goes in the same bin as plastic bags at most retailers.',
      gratitude_note: 'Pop-worthy and reusable — then it joins the store film bin.',
      dispositions: [ { rung: 'reuse', channel: 'retail_takeback', label: 'reuse it for your next shipment', best: true }, { rung: 'recycle', channel: 'drop_off', label: 'at store film bins' } ] },

    // PAPER & CARDBOARD
    { name: 'Cardboard (clean, dry)', cat: 'Paper', status: 'curbside', prep: 'Break down flat. Remove packing tape.', where: 'Curbside recycling bin', note: 'Most in-demand recyclable after aluminum. Must be dry — wet cardboard is trash.',
      gratitude_note: 'The most in-demand fiber after aluminum — flatten it and send it on.',
      dispositions: [ { rung: 'reuse', channel: 'retail_takeback', label: 'reuse the box first' }, { rung: 'recycle', channel: 'curbside', label: 'flattened in your curbside bin', best: true } ] },
    { name: 'Cardboard (greasy or wet)', cat: 'Paper', status: 'no', prep: 'N/A', where: 'Compost or trash', note: 'Grease and moisture destroy paper fibers. Compost it if you can.',
      gratitude_note: 'Grease ruins the fiber, but the soil will still gladly take it.',
      dispositions: [ { rung: 'compost', channel: 'compost_home', label: 'compost it if you can', best: true }, { rung: 'dispose', channel: 'trash', label: 'otherwise the trash' } ] },
    { name: 'Office paper', cat: 'Paper', status: 'curbside', prep: 'No need to remove staples or paper clips.', where: 'Curbside recycling bin', note: 'Staples and clips are removed by magnets at facilities.',
      gratitude_note: 'Staples and all — magnets pull the metal out downstream. Just recycle it.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'in your curbside bin', best: true } ] },
    { name: 'Newspaper', cat: 'Paper', status: 'curbside', prep: 'No prep needed.', where: 'Curbside recycling bin', note: "Soy-based inks are fine. Don't bundle with rubber bands.",
      gratitude_note: 'Yesterday’s news, tomorrow’s newsprint — soy inks and all.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'in your curbside bin', best: true } ] },
    { name: 'Magazines / catalogs', cat: 'Paper', status: 'curbside', prep: 'Remove plastic sleeve if present.', where: 'Curbside recycling bin', note: 'Glossy paper is recyclable.',
      gratitude_note: 'Glossy is fine — only the plastic mailing sleeve needs to come off.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'in your curbside bin', best: true } ] },
    { name: 'Shredded paper', cat: 'Paper', status: 'partial', prep: 'Seal inside a paper bag. Staple or tape shut.', where: 'Curbside (bagged) or paper recycling drop-off', note: 'Loose shreds jam sorting machinery. Always contain them in a paper bag first.',
      gratitude_note: 'Bag the confetti so it will not jam the works — then it still counts.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'bagged in your curbside bin', best: true, local: true }, { rung: 'compost', channel: 'compost_home', label: 'or compost the shreds' } ] },
    { name: 'Thermal paper receipt', cat: 'Paper', status: 'no', prep: 'N/A', where: 'Regular trash', note: 'Thermal coating contains BPA/BPS — a known endocrine disruptor. Cannot and should not be recycled.',
      gratitude_note: 'Coated in BPA — better it never touches the recycling stream at all.',
      dispositions: [ { rung: 'dispose', channel: 'trash', label: 'in the trash (BPA-coated)', best: true } ] },
    { name: 'Pizza box (clean top half)', cat: 'Paper', status: 'partial', prep: 'Tear off the clean top — recycle it. Compost or trash the greasy bottom.', where: 'Top half: curbside bin', note: 'The clean top of most pizza boxes is recyclable. Tear it off and use it.',
      gratitude_note: 'Tear it in two — the clean half still has a future ahead of it.',
      dispositions: [ { rung: 'recycle', channel: 'curbside', label: 'clean top half in curbside', best: true, local: true }, { rung: 'compost', channel: 'compost_home', label: 'greasy bottom to compost' } ] },
    { name: 'Paper coffee cup', cat: 'Paper', status: 'no', prep: 'N/A', where: 'Regular trash', note: 'Lined with plastic or wax. Almost no facilities process them. Lids are usually #6 PS — also not recyclable.',
      gratitude_note: 'A thin plastic lining hides inside — almost nowhere can split it apart.',
      dispositions: [ { rung: 'dispose', channel: 'trash', label: 'in the trash (plastic-lined)', best: true } ] },
    { name: 'Paper bags', cat: 'Paper', status: 'curbside', prep: 'Remove rope or plastic handles.', where: 'Curbside recycling bin', note: 'Clean, flat paper bags are fine for curbside.',
      gratitude_note: 'Good for many trips first — then flat into the curbside bin.',
      dispositions: [ { rung: 'reuse', channel: 'retail_takeback', label: 'reuse them first' }, { rung: 'recycle', channel: 'curbside', label: 'flat in your curbside bin', best: true } ] },

    // GLASS
    { name: 'Glass bottle (clear)', cat: 'Glass', status: 'partial', prep: 'Empty and rinse.', where: 'Curbside (check local) or glass drop-off point', note: 'Many programs no longer accept glass curbside due to contamination. Check earth911.com.',
      gratitude_note: 'Infinitely recyclable — if your program still takes it, or a glass drop-off does.',
      dispositions: [ { rung: 'reuse', channel: 'retail_takeback', label: 'reuse it first' }, { rung: 'recycle', channel: 'curbside', label: 'curbside or a glass drop-off', best: true, local: true } ] },
    { name: 'Glass food jar', cat: 'Glass', status: 'partial', prep: 'Empty, rinse, remove lid (recycle metal lid separately).', where: 'Curbside (check local) or glass drop-off', note: 'Steel lids go in the metal bin. Verify your municipality accepts glass curbside.',
      gratitude_note: 'A jar is a gift twice — store something in it, or recycle the metal lid apart.',
      dispositions: [ { rung: 'reuse', channel: 'retail_takeback', label: 'reuse it for storage', best: true }, { rung: 'recycle', channel: 'curbside', label: 'or recycle (lid in the metal bin)', local: true } ] },
    { name: 'Broken glass', cat: 'Glass', status: 'no', prep: 'Wrap in several layers of newspaper or a paper bag. Label: BROKEN GLASS.', where: 'Regular trash (safely wrapped)', note: 'A safety hazard and cannot be processed at most facilities. Wrap it and label it.',
      gratitude_note: 'Sharp and unsortable — wrap it kindly so no one downstream is hurt.',
      dispositions: [ { rung: 'dispose', channel: 'trash', label: 'wrapped and labeled, in the trash', best: true } ] },
    { name: 'Ceramics / pottery', cat: 'Glass', status: 'no', prep: 'If intact, donate. If broken, wrap for trash.', where: 'Donation (intact) or trash (broken)', note: 'Different chemical composition than container glass. Will ruin a glass processing batch.',
      gratitude_note: 'Whole, it can serve another table; broken, wrap it with care.',
      dispositions: [ { rung: 'donate', channel: 'donation_center', label: 'donate it if intact', best: true }, { rung: 'dispose', channel: 'trash', label: 'wrap and trash if broken' } ] },
    { name: 'Mirrors / window glass', cat: 'Glass', status: 'no', prep: 'Wrap safely for trash.', where: 'Regular trash (safely wrapped)', note: 'Different chemistry than bottle glass. Not recyclable in standard glass streams.',
      gratitude_note: 'A different glass entirely — it cannot join the bottles, but it may still serve.',
      dispositions: [ { rung: 'donate', channel: 'donation_center', label: 'donate if intact', best: true }, { rung: 'dispose', channel: 'trash', label: 'wrap and trash otherwise' } ] },

    // ELECTRONICS
    { name: 'Smartphone', cat: 'Electronics', status: 'drop-off', prep: 'Back up data, factory reset, remove SIM and SD cards.', where: 'E-waste facility, manufacturer take-back, or Best Buy drop-off', note: 'Contains gold, silver, cobalt. Apple, Samsung, and Google have take-back programs — some offer credit.',
      gratitude_note: 'This little machine holds gold, silver, and cobalt pulled from the earth — and it still has more life in it. Let’s pass it on.',
      dispositions: [ { rung: 'reuse', channel: 'retail_takeback', label: 'keep it as a backup or media device' }, { rung: 'repair', channel: 'repair_shop', label: 'fix a cracked screen or battery' }, { rung: 'donate', channel: 'donation_center', label: 'it still works', best: true }, { rung: 'recycle', channel: 'ewaste', label: 'recover the metals (certified e-waste)' }, { rung: 'dispose', channel: 'trash', label: 'never — phones never belong in the trash' } ] },
    { name: 'Laptop / notebook computer', cat: 'Electronics', status: 'drop-off', prep: 'Back up and wipe data (DBAN or factory reset + encrypt).', where: 'E-waste facility, Best Buy, Staples, or manufacturer take-back', note: 'Dell, Apple, HP all have take-back programs. Working devices can be resold or donated.',
      gratitude_note: 'Wiped and willing, it can serve a student or a stranger before it is ever mined for metals.',
      dispositions: [ { rung: 'reuse', channel: 'retail_takeback', label: 'keep it as a backup machine' }, { rung: 'repair', channel: 'repair_shop', label: 'upgrade the RAM or drive' }, { rung: 'donate', channel: 'donation_center', label: 'it still works', best: true }, { rung: 'recycle', channel: 'ewaste', label: 'wipe and recycle the metals' } ] },
    { name: 'CRT television (tube TV)', cat: 'Electronics', status: 'hazardous', prep: 'Do not break — contains lead glass. Handle upright.', where: 'Certified e-waste facility only (call ahead — some charge a fee)', note: 'CRTs contain 4–8 lbs of lead. Illegal in the trash in most states.',
      gratitude_note: 'Pounds of leaded glass inside — it needs a certified, careful goodbye.',
      dispositions: [ { rung: 'recycle', channel: 'ewaste', label: 'certified e-waste facility only', best: true, hazard: true }, { rung: 'dispose', channel: 'trash', label: 'never — illegal in the trash in most states' } ] },
    { name: 'Flat-screen TV (LED/LCD)', cat: 'Electronics', status: 'drop-off', prep: 'Remove remote and any attached cables.', where: 'E-waste facility or retailer drop-off (Best Buy charges a small fee)', note: 'Older LED backlights may contain mercury. Best Buy accepts TVs with a processing fee.',
      gratitude_note: 'Still glowing for someone, maybe — and if not, certified recyclers reclaim it.',
      dispositions: [ { rung: 'donate', channel: 'donation_center', label: 'donate if it still works' }, { rung: 'recycle', channel: 'ewaste', label: 'certified e-waste recycler', best: true } ] },
    { name: 'Printer (inkjet or laser)', cat: 'Electronics', status: 'drop-off', prep: 'Remove ink/toner cartridges first (recycle those separately at Staples or Office Depot).', where: 'E-waste facility', note: 'Staples and Office Depot recycle cartridges and earn you reward points.',
      gratitude_note: 'Pull its cartridges first, then let the e-waste stream reclaim the rest.',
      dispositions: [ { rung: 'donate', channel: 'donation_center', label: 'donate if it still prints' }, { rung: 'recycle', channel: 'ewaste', label: 'e-waste (cartridges removed)', best: true } ] },
    { name: 'Ink cartridge / toner cartridge', cat: 'Electronics', status: 'drop-off', prep: 'Place in a resealable bag to prevent leaks.', where: 'Staples, Office Depot, or manufacturer mail-back programs', note: 'Refilling is even better than recycling — ask about refill programs. Staples Rewards gives points for every cartridge returned.',
      gratitude_note: 'Refilled, it lives again; returned, it earns you points either way.',
      dispositions: [ { rung: 'reuse', channel: 'retail_takeback', label: 'refill and reuse it', best: true }, { rung: 'recycle', channel: 'retail_takeback', label: 'return at Staples / Office Depot' } ] },
    { name: 'Tablet / iPad', cat: 'Electronics', status: 'drop-off', prep: 'Back up data and perform factory reset.', where: 'E-waste facility, Apple store, Best Buy', note: "Apple's Trade In / Recycle program accepts all Apple devices — even non-functional ones.",
      gratitude_note: 'Even dark and dead, Apple and others will take it back to mine its metals.',
      dispositions: [ { rung: 'reuse', channel: 'retail_takeback', label: 'keep it as an e-reader' }, { rung: 'donate', channel: 'donation_center', label: 'it still works', best: true }, { rung: 'recycle', channel: 'ewaste', label: 'take-back even if it is dead' } ] },

    // BATTERIES
    { name: 'Alkaline battery (AA, AAA, 9V)', cat: 'Batteries', status: 'drop-off', prep: 'Tape the terminals of 9V batteries with electrical tape before dropping off.', where: 'Home Depot, Lowe\'s, Staples, Best Buy, or Call2Recycle.org drop-off', note: 'Now considered non-hazardous in most US states but should still be diverted from landfill.',
      gratitude_note: 'Spent but not worthless — a drop-off keeps its metals out of the ground.',
      dispositions: [ { rung: 'recycle', channel: 'drop_off', label: 'at a battery drop-off', best: true } ] },
    { name: 'Rechargeable battery (NiMH, NiCd)', cat: 'Batteries', status: 'drop-off', prep: 'Tape terminals. Place in a clear plastic bag.', where: 'Call2Recycle drop-off (Home Depot, Lowe\'s, Best Buy)', note: 'Use Call2Recycle.org to find the nearest drop-off by zip code.',
      gratitude_note: 'Made to be used hundreds of times — and recycled when it finally rests.',
      dispositions: [ { rung: 'recycle', channel: 'drop_off', label: 'Call2Recycle drop-off', best: true } ] },
    { name: 'Lithium-ion battery', cat: 'Batteries', status: 'hazardous', prep: 'Never puncture or expose to heat. Tape terminals with electrical tape.', where: 'Certified e-waste / hazardous waste facility', note: 'Fire risk if damaged, punctured, or improperly shipped. Never in regular trash or curbside.',
      gratitude_note: 'Powerful and touchy — tape its terminals and hand it to people who know how.',
      dispositions: [ { rung: 'recycle', channel: 'ewaste', label: 'certified e-waste, terminals taped', best: true, hazard: true } ] },
    { name: 'Car battery (lead-acid)', cat: 'Batteries', status: 'drop-off', prep: 'Keep upright. Do not allow acid to leak.', where: 'Auto parts store (AutoZone, O\'Reilly, Advanced Auto — usually gives a core deposit refund)', note: 'Auto parts stores are required to accept lead-acid batteries in most states.',
      gratitude_note: 'Almost 100% recyclable — and the store may even pay you a core refund.',
      dispositions: [ { rung: 'recycle', channel: 'retail_takeback', label: 'auto parts store (core refund)', best: true } ] },
    { name: 'Laptop battery (removed)', cat: 'Batteries', status: 'hazardous', prep: 'Do not bend or puncture. Tape terminals.', where: 'E-waste facility or manufacturer take-back', note: 'Lithium batteries from laptops are a fire risk if mishandled or shipped improperly.',
      gratitude_note: 'A fire risk if bent — tape it, bag it, and bring it to e-waste.',
      dispositions: [ { rung: 'recycle', channel: 'ewaste', label: 'e-waste, terminals taped', best: true, hazard: true } ] },

    // HAZARDOUS
    { name: 'Motor oil', cat: 'Hazardous', status: 'drop-off', prep: 'Keep in original container or a clean sealed container.', where: 'AutoZone, O\'Reilly Auto, Jiffy Lube, or municipal HHW facility', note: '1 quart of motor oil can contaminate 250,000 gallons of drinking water. Never pour it down a drain.',
      gratitude_note: 'Filtered and re-refined, used oil runs again — never let it touch a drain.',
      dispositions: [ { rung: 'recycle', channel: 'drop_off', label: 'auto store or HHW (re-refined)', best: true } ] },
    { name: 'Paint (latex / water-based)', cat: 'Hazardous', status: 'drop-off', prep: 'Keep lid on tightly. Do not dilute.', where: 'PaintCare drop-off (paintcare.org) — hardware stores nationwide', note: 'Dried-out latex paint can go in regular trash. Wet paint must go to PaintCare or HHW.',
      gratitude_note: 'Wet latex finds new life through PaintCare; dried, it can rest in the trash.',
      dispositions: [ { rung: 'recycle', channel: 'drop_off', label: 'PaintCare drop-off', best: true } ] },
    { name: 'Paint (oil-based)', cat: 'Hazardous', status: 'hazardous', prep: 'Keep in original container with tight lid.', where: 'HHW (Household Hazardous Waste) event only', note: 'Oil-based paint is flammable. Check your county\'s HHW event schedule.',
      gratitude_note: 'Flammable and fierce — only an HHW event should take it from here.',
      dispositions: [ { rung: 'dispose', channel: 'hhw', label: 'HHW event only', best: true, hazard: true } ] },
    { name: 'Fluorescent bulb / CFL', cat: 'Hazardous', status: 'drop-off', prep: 'Do not break — contains mercury vapor. Keep in original box or wrap in newspaper.', where: 'Home Depot, Lowe\'s, or HHW event', note: 'If a CFL breaks: ventilate room immediately, do not vacuum, follow EPA cleanup guidelines.',
      gratitude_note: 'Mercury sleeps inside — keep it whole and let a take-back reclaim it.',
      dispositions: [ { rung: 'recycle', channel: 'retail_takeback', label: 'hardware store take-back', best: true, hazard: true } ] },
    { name: 'LED bulb', cat: 'Hazardous', status: 'drop-off', prep: 'No prep needed.', where: 'Home Depot, local HHW, or some curbside programs', note: 'LEDs contain small amounts of hazardous metals. Check if your curbside program accepts them.',
      gratitude_note: 'Small hazardous metals within — a drop-off keeps them out of the soil.',
      dispositions: [ { rung: 'recycle', channel: 'drop_off', label: 'hardware store or HHW', best: true } ] },
    { name: 'Prescription medications', cat: 'Hazardous', status: 'drop-off', prep: 'Remove personal info from labels.', where: 'Pharmacy drug take-back (CVS, Walgreens) or DEA National Take-Back Day', note: 'Never flush medications — they end up in waterways and affect aquatic life.',
      gratitude_note: 'Never flushed, never landfilled — a pharmacy take-back protects the water.',
      dispositions: [ { rung: 'dispose', channel: 'drop_off', label: 'pharmacy take-back — never flush', best: true, hazard: true } ] },
    { name: 'Pesticides / herbicides', cat: 'Hazardous', status: 'hazardous', prep: 'Keep in original labeled container. Do not mix.', where: 'HHW facility', note: 'Never pour on ground or down drains. Highly toxic to groundwater, soil, and wildlife.',
      gratitude_note: 'Toxic to soil and stream — only an HHW facility should handle it.',
      dispositions: [ { rung: 'dispose', channel: 'hhw', label: 'HHW facility only', best: true, hazard: true } ] },
    { name: 'Antifreeze / coolant', cat: 'Hazardous', status: 'drop-off', prep: 'Keep in original or a clean sealed container.', where: 'Auto parts stores, some municipal facilities', note: 'Toxic to animals but has a sweet smell that attracts them. Never pour down drains.',
      gratitude_note: 'Sweet-smelling but deadly to animals — recyclers can clean and reuse it.',
      dispositions: [ { rung: 'recycle', channel: 'drop_off', label: 'auto store or municipal facility', best: true, hazard: true } ] },
    { name: 'Smoke detector (ionization type)', cat: 'Hazardous', status: 'drop-off', prep: 'Do not disassemble.', where: 'Manufacturer mail-back program (Kidde, First Alert) or HHW facility', note: 'Contains trace amounts of Americium-241 (radioactive). Most manufacturers offer free mail-back.',
      gratitude_note: 'A speck of radioactivity inside — most makers will take it back for free.',
      dispositions: [ { rung: 'recycle', channel: 'mail_back', label: 'manufacturer mail-back', best: true, hazard: true } ] },

    // TEXTILES
    { name: 'Clothing (wearable)', cat: 'Textiles', status: 'drop-off', prep: 'Clean and dry.', where: 'Goodwill, Salvation Army, H&M take-back bins, or local textile collection', note: 'Even worn or torn clothing is accepted — what can\'t be resold is shredded into insulation or rags.',
      gratitude_note: 'Worn or torn, every thread has a next use — wear it, share it, or shred it.',
      dispositions: [ { rung: 'reuse', channel: 'donation_center', label: 'wear or hand it down again' }, { rung: 'donate', channel: 'donation_center', label: 'donate it (any condition)', best: true }, { rung: 'recycle', channel: 'drop_off', label: 'shredded into rags / insulation' } ] },
    { name: 'Shoes', cat: 'Textiles', status: 'drop-off', prep: 'Tie pairs together.', where: 'Goodwill, Nike Reuse-A-Shoe, or local textile bins', note: "Nike's Reuse-A-Shoe program grinds old sneakers into sports court surfaces.",
      gratitude_note: 'Another mile left in them for someone — or ground into a playground.',
      dispositions: [ { rung: 'donate', channel: 'donation_center', label: 'donate wearable pairs', best: true }, { rung: 'recycle', channel: 'drop_off', label: 'Nike Reuse-A-Shoe grind' } ] },
    { name: 'Textiles / fabric scraps', cat: 'Textiles', status: 'drop-off', prep: 'Clean and dry. Any condition.', where: 'Textile recycling bins or thrift stores', note: 'Torn or stained textiles are still useful as industrial rags and insulation filler.',
      gratitude_note: 'Too far gone to wear, still perfect as rags and insulation.',
      dispositions: [ { rung: 'repurpose', channel: 'retail_takeback', label: 'reuse as cleaning rags' }, { rung: 'donate', channel: 'donation_center', label: 'thrift store textile bin' }, { rung: 'recycle', channel: 'drop_off', label: 'textile recycling', best: true } ] },

    // ORGANICS
    { name: 'Food scraps / organics', cat: 'Organics', status: 'compost', prep: 'No meat, dairy, or oils for home composting.', where: 'Home compost bin or municipal composting program', note: 'Food waste is ~30% of what goes to landfill. Composting returns critical nutrients to soil.',
      gratitude_note: 'Yesterday’s meal becomes tomorrow’s soil — give it back to the earth.',
      dispositions: [ { rung: 'compost', channel: 'compost_home', label: 'home or municipal compost', best: true } ] },
    { name: 'Cooking oil (used)', cat: 'Organics', status: 'drop-off', prep: 'Cool completely. Strain food particles. Seal in a container.', where: 'Some municipalities, biodiesel programs, or grease recycling drop-off', note: 'Used cooking oil can be converted into biodiesel fuel.',
      gratitude_note: 'Strained and cooled, it can fuel an engine as biodiesel.',
      dispositions: [ { rung: 'recycle', channel: 'drop_off', label: 'grease / biodiesel drop-off', best: true } ] },

    // RUBBER
    { name: 'Tires', cat: 'Rubber', status: 'drop-off', prep: 'No rims required.', where: 'Tire retailer (when buying new tires) or municipal tire drop-off event', note: 'Recycled tires become playground surfaces, athletic tracks, and road asphalt.',
      gratitude_note: 'Built to roll for years — reborn as playgrounds, tracks, and roads.',
      dispositions: [ { rung: 'repurpose', channel: 'retail_takeback', label: 'reuse as planters or swings' }, { rung: 'recycle', channel: 'drop_off', label: 'tire retailer or amnesty event', best: true } ] },

    // BULKY GOODS
    { name: 'Mattress', cat: 'Bulky Goods', status: 'drop-off', prep: 'Bag in a mattress bag if possible.', where: 'Mattress recycling facility or retailer take-back (byebyemattress.com)', note: 'Mattress Recycling Council runs programs in CA, CT, and RI. Check for local retailer programs elsewhere.',
      gratitude_note: 'Up to 90% recyclable — steel, foam, and fiber all find new beds.',
      dispositions: [ { rung: 'donate', channel: 'donation_center', label: 'donate if still usable' }, { rung: 'recycle', channel: 'drop_off', label: 'mattress recycling facility', best: true } ] }
  ];

