(function () {
  'use strict';

  var ITEMS = [
    // METAL
    { name: 'Aluminum can', cat: 'Metal', status: 'curbside', prep: 'Empty and rinse. No need to crush.', where: 'Curbside recycling bin', note: 'Most valuable recyclable commodity. Can be recycled infinitely without quality loss.' },
    { name: 'Steel / tin can', cat: 'Metal', status: 'curbside', prep: 'Empty and rinse.', where: 'Curbside recycling bin', note: 'Food cans, paint cans (empty and dry). Magnetic separators pull them out at facilities.' },
    { name: 'Aerosol can (empty)', cat: 'Metal', status: 'curbside', prep: 'Must be 100% empty. Remove plastic cap.', where: 'Curbside recycling bin', note: 'Only when completely empty — no product or pressure remaining.' },
    { name: 'Aerosol can (not empty)', cat: 'Metal', status: 'hazardous', prep: 'Never puncture or spray to empty into trash.', where: 'Household Hazardous Waste (HHW) facility', note: 'Pressurized and flammable. Never in regular trash or recycling.' },
    { name: 'Aluminum foil (clean)', cat: 'Metal', status: 'partial', prep: 'Clean of all food residue. Scrunch into a ball at least 2 inches across.', where: 'Curbside (when clean and balled up)', note: 'Contaminated foil goes to trash. Clean foil bundles need to be fist-sized for sorting.' },
    { name: 'Scrap metal', cat: 'Metal', status: 'drop-off', prep: 'Separate from other materials.', where: 'Scrap metal yard or HHW event', note: 'Many scrap yards pay by weight for aluminum, copper, and brass.' },

    // PLASTIC
    { name: 'Plastic bottle #1 PET', cat: 'Plastic', status: 'curbside', prep: 'Empty, rinse, replace cap.', where: 'Curbside recycling bin', note: 'Water bottles, soda bottles. One of the most commonly recycled plastics.' },
    { name: 'Plastic jug #2 HDPE', cat: 'Plastic', status: 'curbside', prep: 'Empty and rinse.', where: 'Curbside recycling bin', note: 'Milk jugs, laundry detergent, shampoo bottles.' },
    { name: 'Plastic bag / film', cat: 'Plastic', status: 'drop-off', prep: 'Clean and dry. No food residue.', where: 'Grocery store drop-off bins (Walmart, Target, Publix)', note: 'NEVER in curbside bin — clogs and destroys sorting machinery.' },
    { name: 'Styrofoam / foam #6 PS', cat: 'Plastic', status: 'drop-off', prep: 'Clean of food.', where: 'Styrofoam drop-off programs, UPS stores, Earth911.com locator', note: 'Check Earth911.com for local foam drop-off. Not accepted curbside anywhere.' },
    { name: 'Plastic straw', cat: 'Plastic', status: 'no', prep: 'N/A', where: 'Regular trash', note: 'Too small and light for sorting equipment. Contaminates loads and clogs machinery.' },
    { name: 'Plastic utensils / cutlery', cat: 'Plastic', status: 'no', prep: 'N/A', where: 'Regular trash', note: 'Too small to be sorted. Switch to reusable utensils to eliminate the waste.' },
    { name: 'Yogurt container #5 PP', cat: 'Plastic', status: 'partial', prep: 'Empty and rinse.', where: 'Curbside (check your local program)', note: '#5 PP is accepted in many but not all programs. Verify at earth911.com.' },
    { name: 'Chip bag / snack wrapper', cat: 'Plastic', status: 'no', prep: 'N/A', where: 'Regular trash', note: 'Multi-layer films (plastic + foil + plastic) cannot be sorted or processed.' },
    { name: 'Bubble wrap', cat: 'Plastic', status: 'drop-off', prep: 'Clean and dry.', where: 'Grocery store plastic film collection bins', note: 'Goes in the same bin as plastic bags at most retailers.' },

    // PAPER & CARDBOARD
    { name: 'Cardboard (clean, dry)', cat: 'Paper', status: 'curbside', prep: 'Break down flat. Remove packing tape.', where: 'Curbside recycling bin', note: 'Most in-demand recyclable after aluminum. Must be dry — wet cardboard is trash.' },
    { name: 'Cardboard (greasy or wet)', cat: 'Paper', status: 'no', prep: 'N/A', where: 'Compost or trash', note: 'Grease and moisture destroy paper fibers. Compost it if you can.' },
    { name: 'Office paper', cat: 'Paper', status: 'curbside', prep: 'No need to remove staples or paper clips.', where: 'Curbside recycling bin', note: 'Staples and clips are removed by magnets at facilities.' },
    { name: 'Newspaper', cat: 'Paper', status: 'curbside', prep: 'No prep needed.', where: 'Curbside recycling bin', note: "Soy-based inks are fine. Don't bundle with rubber bands." },
    { name: 'Magazines / catalogs', cat: 'Paper', status: 'curbside', prep: 'Remove plastic sleeve if present.', where: 'Curbside recycling bin', note: 'Glossy paper is recyclable.' },
    { name: 'Shredded paper', cat: 'Paper', status: 'partial', prep: 'Seal inside a paper bag. Staple or tape shut.', where: 'Curbside (bagged) or paper recycling drop-off', note: 'Loose shreds jam sorting machinery. Always contain them in a paper bag first.' },
    { name: 'Thermal paper receipt', cat: 'Paper', status: 'no', prep: 'N/A', where: 'Regular trash', note: 'Thermal coating contains BPA/BPS — a known endocrine disruptor. Cannot and should not be recycled.' },
    { name: 'Pizza box (clean top half)', cat: 'Paper', status: 'partial', prep: 'Tear off the clean top — recycle it. Compost or trash the greasy bottom.', where: 'Top half: curbside bin', note: 'The clean top of most pizza boxes is recyclable. Tear it off and use it.' },
    { name: 'Paper coffee cup', cat: 'Paper', status: 'no', prep: 'N/A', where: 'Regular trash', note: 'Lined with plastic or wax. Almost no facilities process them. Lids are usually #6 PS — also not recyclable.' },
    { name: 'Paper bags', cat: 'Paper', status: 'curbside', prep: 'Remove rope or plastic handles.', where: 'Curbside recycling bin', note: 'Clean, flat paper bags are fine for curbside.' },

    // GLASS
    { name: 'Glass bottle (clear)', cat: 'Glass', status: 'partial', prep: 'Empty and rinse.', where: 'Curbside (check local) or glass drop-off point', note: 'Many programs no longer accept glass curbside due to contamination. Check earth911.com.' },
    { name: 'Glass food jar', cat: 'Glass', status: 'partial', prep: 'Empty, rinse, remove lid (recycle metal lid separately).', where: 'Curbside (check local) or glass drop-off', note: 'Steel lids go in the metal bin. Verify your municipality accepts glass curbside.' },
    { name: 'Broken glass', cat: 'Glass', status: 'no', prep: 'Wrap in several layers of newspaper or a paper bag. Label: BROKEN GLASS.', where: 'Regular trash (safely wrapped)', note: 'A safety hazard and cannot be processed at most facilities. Wrap it and label it.' },
    { name: 'Ceramics / pottery', cat: 'Glass', status: 'no', prep: 'If intact, donate. If broken, wrap for trash.', where: 'Donation (intact) or trash (broken)', note: 'Different chemical composition than container glass. Will ruin a glass processing batch.' },
    { name: 'Mirrors / window glass', cat: 'Glass', status: 'no', prep: 'Wrap safely for trash.', where: 'Regular trash (safely wrapped)', note: 'Different chemistry than bottle glass. Not recyclable in standard glass streams.' },

    // ELECTRONICS
    { name: 'Smartphone', cat: 'Electronics', status: 'drop-off', prep: 'Back up data, factory reset, remove SIM and SD cards.', where: 'E-waste facility, manufacturer take-back, or Best Buy drop-off', note: 'Contains gold, silver, cobalt. Apple, Samsung, and Google have take-back programs — some offer credit.' },
    { name: 'Laptop / notebook computer', cat: 'Electronics', status: 'drop-off', prep: 'Back up and wipe data (DBAN or factory reset + encrypt).', where: 'E-waste facility, Best Buy, Staples, or manufacturer take-back', note: 'Dell, Apple, HP all have take-back programs. Working devices can be resold or donated.' },
    { name: 'CRT television (tube TV)', cat: 'Electronics', status: 'hazardous', prep: 'Do not break — contains lead glass. Handle upright.', where: 'Certified e-waste facility only (call ahead — some charge a fee)', note: 'CRTs contain 4–8 lbs of lead. Illegal in the trash in most states.' },
    { name: 'Flat-screen TV (LED/LCD)', cat: 'Electronics', status: 'drop-off', prep: 'Remove remote and any attached cables.', where: 'E-waste facility or retailer drop-off (Best Buy charges a small fee)', note: 'Older LED backlights may contain mercury. Best Buy accepts TVs with a processing fee.' },
    { name: 'Printer (inkjet or laser)', cat: 'Electronics', status: 'drop-off', prep: 'Remove ink/toner cartridges first (recycle those separately at Staples or Office Depot).', where: 'E-waste facility', note: 'Staples and Office Depot recycle cartridges and earn you reward points.' },
    { name: 'Ink cartridge / toner cartridge', cat: 'Electronics', status: 'drop-off', prep: 'Place in a resealable bag to prevent leaks.', where: 'Staples, Office Depot, or manufacturer mail-back programs', note: 'Staples Recycling Rewards: earn points for every cartridge returned.' },
    { name: 'Tablet / iPad', cat: 'Electronics', status: 'drop-off', prep: 'Back up data and perform factory reset.', where: 'E-waste facility, Apple store, Best Buy', note: "Apple's Trade In / Recycle program accepts all Apple devices — even non-functional ones." },

    // BATTERIES
    { name: 'Alkaline battery (AA, AAA, 9V)', cat: 'Batteries', status: 'drop-off', prep: 'Tape the terminals of 9V batteries with electrical tape before dropping off.', where: 'Home Depot, Lowe\'s, Staples, Best Buy, or Call2Recycle.org drop-off', note: 'Now considered non-hazardous in most US states but should still be diverted from landfill.' },
    { name: 'Rechargeable battery (NiMH, NiCd)', cat: 'Batteries', status: 'drop-off', prep: 'Tape terminals. Place in a clear plastic bag.', where: 'Call2Recycle drop-off (Home Depot, Lowe\'s, Best Buy)', note: 'Use Call2Recycle.org to find the nearest drop-off by zip code.' },
    { name: 'Lithium-ion battery', cat: 'Batteries', status: 'hazardous', prep: 'Never puncture or expose to heat. Tape terminals with electrical tape.', where: 'Certified e-waste / hazardous waste facility', note: 'Fire risk if damaged, punctured, or improperly shipped. Never in regular trash or curbside.' },
    { name: 'Car battery (lead-acid)', cat: 'Batteries', status: 'drop-off', prep: 'Keep upright. Do not allow acid to leak.', where: 'Auto parts store (AutoZone, O\'Reilly, Advanced Auto — usually gives a core deposit refund)', note: 'Auto parts stores are required to accept lead-acid batteries in most states.' },
    { name: 'Laptop battery (removed)', cat: 'Batteries', status: 'hazardous', prep: 'Do not bend or puncture. Tape terminals.', where: 'E-waste facility or manufacturer take-back', note: 'Lithium batteries from laptops are a fire risk if mishandled or shipped improperly.' },

    // HAZARDOUS
    { name: 'Motor oil', cat: 'Hazardous', status: 'drop-off', prep: 'Keep in original container or a clean sealed container.', where: 'AutoZone, O\'Reilly Auto, Jiffy Lube, or municipal HHW facility', note: '1 quart of motor oil can contaminate 250,000 gallons of drinking water. Never pour it down a drain.' },
    { name: 'Paint (latex / water-based)', cat: 'Hazardous', status: 'drop-off', prep: 'Keep lid on tightly. Do not dilute.', where: 'PaintCare drop-off (paintcare.org) — hardware stores nationwide', note: 'Dried-out latex paint can go in regular trash. Wet paint must go to PaintCare or HHW.' },
    { name: 'Paint (oil-based)', cat: 'Hazardous', status: 'hazardous', prep: 'Keep in original container with tight lid.', where: 'HHW (Household Hazardous Waste) event only', note: 'Oil-based paint is flammable. Check your county\'s HHW event schedule.' },
    { name: 'Fluorescent bulb / CFL', cat: 'Hazardous', status: 'drop-off', prep: 'Do not break — contains mercury vapor. Keep in original box or wrap in newspaper.', where: 'Home Depot, Lowe\'s, or HHW event', note: 'If a CFL breaks: ventilate room immediately, do not vacuum, follow EPA cleanup guidelines.' },
    { name: 'LED bulb', cat: 'Hazardous', status: 'drop-off', prep: 'No prep needed.', where: 'Home Depot, local HHW, or some curbside programs', note: 'LEDs contain small amounts of hazardous metals. Check if your curbside program accepts them.' },
    { name: 'Prescription medications', cat: 'Hazardous', status: 'drop-off', prep: 'Remove personal info from labels.', where: 'Pharmacy drug take-back (CVS, Walgreens) or DEA National Take-Back Day', note: 'Never flush medications — they end up in waterways and affect aquatic life.' },
    { name: 'Pesticides / herbicides', cat: 'Hazardous', status: 'hazardous', prep: 'Keep in original labeled container. Do not mix.', where: 'HHW facility', note: 'Never pour on ground or down drains. Highly toxic to groundwater, soil, and wildlife.' },
    { name: 'Antifreeze / coolant', cat: 'Hazardous', status: 'drop-off', prep: 'Keep in original or a clean sealed container.', where: 'Auto parts stores, some municipal facilities', note: 'Toxic to animals but has a sweet smell that attracts them. Never pour down drains.' },
    { name: 'Smoke detector (ionization type)', cat: 'Hazardous', status: 'drop-off', prep: 'Do not disassemble.', where: 'Manufacturer mail-back program (Kidde, First Alert) or HHW facility', note: 'Contains trace amounts of Americium-241 (radioactive). Most manufacturers offer free mail-back.' },

    // TEXTILES
    { name: 'Clothing (wearable)', cat: 'Textiles', status: 'drop-off', prep: 'Clean and dry.', where: 'Goodwill, Salvation Army, H&M take-back bins, or local textile collection', note: 'Even worn or torn clothing is accepted — what can\'t be resold is shredded into insulation or rags.' },
    { name: 'Shoes', cat: 'Textiles', status: 'drop-off', prep: 'Tie pairs together.', where: 'Goodwill, Nike Reuse-A-Shoe, or local textile bins', note: "Nike's Reuse-A-Shoe program grinds old sneakers into sports court surfaces." },
    { name: 'Textiles / fabric scraps', cat: 'Textiles', status: 'drop-off', prep: 'Clean and dry. Any condition.', where: 'Textile recycling bins or thrift stores', note: 'Torn or stained textiles are still useful as industrial rags and insulation filler.' },

    // OTHER
    { name: 'Food scraps / organics', cat: 'Other', status: 'compost', prep: 'No meat, dairy, or oils for home composting.', where: 'Home compost bin or municipal composting program', note: 'Food waste is ~30% of what goes to landfill. Composting returns critical nutrients to soil.' },
    { name: 'Cooking oil (used)', cat: 'Other', status: 'drop-off', prep: 'Cool completely. Strain food particles. Seal in a container.', where: 'Some municipalities, biodiesel programs, or grease recycling drop-off', note: 'Used cooking oil can be converted into biodiesel fuel.' },
    { name: 'Tires', cat: 'Other', status: 'drop-off', prep: 'No rims required.', where: 'Tire retailer (when buying new tires) or municipal tire drop-off event', note: 'Recycled tires become playground surfaces, athletic tracks, and road asphalt.' },
    { name: 'Mattress', cat: 'Other', status: 'drop-off', prep: 'Bag in a mattress bag if possible.', where: 'Mattress recycling facility or retailer take-back (byebyemattress.com)', note: 'Mattress Recycling Council runs programs in CA, CT, and RI. Check for local retailer programs elsewhere.' },
    { name: 'Ink / toner cartridge', cat: 'Other', status: 'drop-off', prep: 'Place in a resealable bag to prevent leaks.', where: 'Staples or Office Depot — reward points available', note: 'Refilling cartridges is even better than recycling them. Ask about refill programs.' }
  ];

  var STATUS_CONFIG = {
    curbside: { label: '✓ Curbside',             cls: 'status-badge--curbside' },
    'drop-off': { label: '↗ Drop-off Only',       cls: 'status-badge--drop-off' },
    hazardous: { label: '⚠ Hazardous Waste',      cls: 'status-badge--hazardous' },
    no:        { label: '✕ Not Recyclable',        cls: 'status-badge--no' },
    compost:   { label: '⬡ Compost',              cls: 'status-badge--compost' },
    partial:   { label: '◑ Check Local',          cls: 'status-badge--partial' }
  };

  var CATEGORIES = ['All', 'Metal', 'Plastic', 'Paper', 'Glass', 'Electronics', 'Batteries', 'Hazardous', 'Textiles', 'Other'];

  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function makeCard(item) {
    var st = STATUS_CONFIG[item.status] || STATUS_CONFIG.no;
    return [
      '<article class="recycle-card">',
        '<div>',
          '<p class="recycle-card__cat">' + escHtml(item.cat) + '</p>',
          '<h3 class="recycle-card__name">' + escHtml(item.name) + '</h3>',
        '</div>',
        '<span class="status-badge ' + st.cls + '">' + st.label + '</span>',
        '<div class="recycle-card__detail">',
          '<div class="recycle-card__row"><span class="recycle-card__row-label">Prep</span><span class="recycle-card__row-val">' + escHtml(item.prep) + '</span></div>',
          '<div class="recycle-card__row"><span class="recycle-card__row-label">Where</span><span class="recycle-card__row-val">' + escHtml(item.where) + '</span></div>',
        '</div>',
        '<p class="recycle-card__note">' + escHtml(item.note) + '</p>',
      '</article>'
    ].join('');
  }

  function renderItems(items, container) {
    if (!items.length) {
      container.innerHTML = '<div class="empty-state"><p>No items found. Try a different search term or category.</p></div>';
      return;
    }
    container.innerHTML = items.map(makeCard).join('');
  }

  function initRecyclopedia() {
    var searchEl = document.getElementById('recycle-search');
    var resultsEl = document.getElementById('recyclopedia-results');
    var pillsEl = document.getElementById('recycle-pills');
    if (!searchEl || !resultsEl || !pillsEl) return;

    var activeFilter = 'All';

    // Build filter pills
    pillsEl.innerHTML = CATEGORIES.map(function (cat) {
      return '<button class="pill' + (cat === 'All' ? ' is-active' : '') + '" data-filter="' + escHtml(cat) + '">' + escHtml(cat) + '</button>';
    }).join('');

    function getFiltered() {
      var q = searchEl.value.trim().toLowerCase();
      return ITEMS.filter(function (item) {
        var matchesCat = activeFilter === 'All' || item.cat === activeFilter;
        var matchesQ = !q || item.name.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q) || item.prep.toLowerCase().includes(q) || item.where.toLowerCase().includes(q);
        return matchesCat && matchesQ;
      });
    }

    function update() {
      renderItems(getFiltered(), resultsEl);
    }

    pillsEl.addEventListener('click', function (e) {
      var pill = e.target.closest('.pill');
      if (!pill) return;
      activeFilter = pill.dataset.filter;
      pillsEl.querySelectorAll('.pill').forEach(function (p) {
        p.classList.toggle('is-active', p.dataset.filter === activeFilter);
      });
      update();
    });

    searchEl.addEventListener('input', update);

    // Initial render
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRecyclopedia);
  } else {
    initRecyclopedia();
  }
})();
