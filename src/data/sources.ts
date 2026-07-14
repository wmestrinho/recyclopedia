// Citable sources for the Recyclopedia/LBG knowledge base.
// Split out of organizations.ts (2026-07-13) so the Lookup island can
// import SOURCES for citation chips without bundling the 249-org array
// into the homepage. organizations.ts re-exports for compatibility.

// A citable dataset/report, traceable to an organization ("no greenwashing").
// quality_tier per the 2026-07-12 dataset note: baselines (World Bank / UN /
// OECD), stream-specific monitors, and leads (satellite/NGO — investigate,
// don't treat as official counts). 'guidance' (2026-07-13) = item-handling
// guidance pages cited by Disposition.source in items.ts — advice provenance,
// not statistics; excluded from the directory's "Key datasets" strip.
export interface Source {
  id: string;                 // 'gwmo-2024', 'wb-what-a-waste'
  name: string;
  organization_id: string;
  url: string;
  license?: string;
  retrieved_at: string;
  headline_stats?: string[];
  quality_tier: 'baseline' | 'stream-monitor' | 'lead' | 'guidance';
  short_label?: string;       // compact citation chip on item cards ('US EPA'); falls back to name
}

export const SOURCES: Source[] = [
  {
    id: 'wb-what-a-waste', name: 'What a Waste Global Database', organization_id: 'world-bank',
    url: 'https://datacatalog.worldbank.org/search/dataset/0039597/what-a-waste-global-database',
    license: 'CC BY 3.0 IGO', retrieved_at: '2026-07-12', quality_tier: 'baseline',
    headline_stats: ['Covers 217 countries and 262 cities', 'Generation, composition, collection, treatment, disposal, policy'],
  },
  {
    id: 'gwmo-2024', name: 'Global Waste Management Outlook 2024 (UNEP / ISWA)', organization_id: 'unep',
    url: 'https://www.unep.org/resources/global-waste-management-outlook-2024',
    retrieved_at: '2026-07-12', quality_tier: 'baseline',
    headline_stats: ['2.1B tonnes MSW (2023) → 3.8B tonnes by 2050', 'Direct management costs USD 252B (2020) → USD 640.3B (2050) without urgent action'],
  },
  {
    id: 'oecd-municipal-waste', name: 'OECD Municipal Waste Indicator', organization_id: 'oecd',
    url: 'https://www.oecd.org/en/data/indicators/municipal-waste.html',
    retrieved_at: '2026-07-12', quality_tier: 'baseline',
    headline_stats: ['Municipal waste generation, treatment, recycling, landfill for OECD and partner countries'],
  },
  {
    id: 'basel-reporting', name: 'Basel Convention national reporting', organization_id: 'basel-convention',
    url: 'https://www.basel.int/', retrieved_at: '2026-07-12', quality_tier: 'baseline',
    headline_stats: ['Official record of transboundary hazardous-waste movements and controls'],
  },
  {
    id: 'oecd-plastics-outlook', name: 'OECD Global Plastics Outlook', organization_id: 'oecd',
    url: 'https://www.oecd.org/en/publications/global-plastics-outlook_aa1edf33-en.html',
    retrieved_at: '2026-07-12', quality_tier: 'stream-monitor',
    headline_stats: ['Plastic use and waste could almost triple by 2060 under current policies', 'Less than one-fifth of plastic waste recycled; about half landfilled'],
  },
  {
    id: 'gem-2024', name: 'Global E-waste Monitor 2024 (ITU / UNITAR)', organization_id: 'unitar',
    url: 'https://ewastemonitor.info/the-global-e-waste-monitor-2024/',
    retrieved_at: '2026-07-12', quality_tier: 'stream-monitor',
    headline_stats: ['62 Mt e-waste generated in 2022 — up 82% from 2010', 'Only 22.3% documented as properly collected and recycled', 'Projected 82 Mt by 2030'],
  },
  {
    id: 'food-waste-index-2024', name: 'Food Waste Index Report 2024 (UNEP / WRAP)', organization_id: 'unep',
    url: 'https://www.unep.org/resources/publication/food-waste-index-report-2024',
    retrieved_at: '2026-07-12', quality_tier: 'stream-monitor',
    headline_stats: ['Household, retail, and food-service waste measurement tied to SDG 12.3'],
  },
  {
    id: 'gpw-map', name: 'Global Plastic Watch', organization_id: 'global-plastic-watch',
    url: 'https://globalplasticwatch.org/', retrieved_at: '2026-07-12', quality_tier: 'lead',
    headline_stats: ['Satellite + AI mapping of land-based plastic pollution sites'],
  },
  {
    id: 'waste-atlas-data', name: 'Waste Atlas', organization_id: 'waste-atlas',
    url: 'https://wasteatlas.org/', retrieved_at: '2026-07-12', quality_tier: 'lead',
    headline_stats: ['164 countries, 1,800+ cities, ~2,500 facilities — cross-check dates before citing'],
  },
  {
    id: 'owid-plastic', name: 'Our World in Data — Plastic Pollution', organization_id: 'our-world-in-data',
    url: 'https://ourworldindata.org/plastic-pollution', retrieved_at: '2026-07-12', quality_tier: 'lead',
    headline_stats: ['Accessible charts and explainers built on peer-reviewed and institutional sources'],
  },
  {
    id: 'circularity-gap', name: 'Circularity Gap Report', organization_id: 'circle-economy',
    url: 'https://www.circularity-gap.world/', retrieved_at: '2026-07-12', quality_tier: 'lead',
    headline_stats: ['Tracks material circularity and resource flows, not waste alone'],
  },
  {
    id: 'ban-watch', name: 'Basel Action Network investigations', organization_id: 'ban',
    url: 'https://www.ban.org/', retrieved_at: '2026-07-12', quality_tier: 'lead',
    headline_stats: ['Watchdog reporting on toxic trade, e-waste exports, shipbreaking'],
  },

  // ── Item-handling guidance (Disposition.source provenance, 2026-07-13) ──
  // Every URL below returned 200 with a matching page title on 2026-07-13,
  // and was checked for the specific claims it backs in items.ts.
  {
    id: 'epa-household-batteries', name: 'Used Household Batteries (US EPA)', organization_id: 'us-epa', short_label: 'US EPA',
    url: 'https://www.epa.gov/recycle/used-household-batteries',
    retrieved_at: '2026-07-13', quality_tier: 'guidance',
    headline_stats: ['Handling and drop-off guidance for alkaline, button/coin, zinc-air, and lead-acid household batteries'],
  },
  {
    id: 'epa-lithium-batteries', name: 'Used Lithium-Ion Batteries (US EPA)', organization_id: 'us-epa', short_label: 'US EPA',
    url: 'https://www.epa.gov/recycle/used-lithium-ion-batteries',
    retrieved_at: '2026-07-13', quality_tier: 'guidance',
    headline_stats: ['Never in trash or curbside; tape terminals; battery drop-off or HHW', 'Covers phones, laptops, power banks, and e-cigarettes'],
  },
  {
    id: 'epa-electronics', name: 'Electronics Donation and Recycling (US EPA)', organization_id: 'us-epa', short_label: 'US EPA',
    url: 'https://www.epa.gov/recycle/electronics-donation-and-recycling',
    retrieved_at: '2026-07-13', quality_tier: 'guidance',
    headline_stats: ['Donate working electronics; recycle the rest through certified electronics recyclers'],
  },
  {
    id: 'epa-used-oil', name: 'Managing, Reusing, and Recycling Used Oil (US EPA)', organization_id: 'us-epa', short_label: 'US EPA',
    url: 'https://www.epa.gov/recycle/managing-reusing-and-recycling-used-oil',
    retrieved_at: '2026-07-13', quality_tier: 'guidance',
    headline_stats: ['Used motor oil is re-refinable; never pour it down drains or on the ground'],
  },
  {
    id: 'epa-hhw', name: 'Household Hazardous Waste (US EPA)', organization_id: 'us-epa', short_label: 'US EPA',
    url: 'https://www.epa.gov/hw/household-hazardous-waste',
    retrieved_at: '2026-07-13', quality_tier: 'guidance',
    headline_stats: ['HHW facilities and collection events for oil-based paint, pesticides, and other corrosive/toxic/flammable household waste'],
  },
  {
    id: 'epa-cfl', name: 'Recycling and Disposal of CFLs and Other Bulbs that Contain Mercury (US EPA)', organization_id: 'us-epa', short_label: 'US EPA',
    url: 'https://www.epa.gov/cfl/recycling-and-disposal-cfls',
    retrieved_at: '2026-07-13', quality_tier: 'guidance',
    headline_stats: ['CFLs contain mercury — retail take-back or HHW; includes broken-bulb cleanup steps'],
  },
  {
    id: 'fda-drug-disposal', name: 'Disposal of Unused Medicines: What You Should Know (US FDA)', organization_id: 'us-fda', short_label: 'US FDA',
    url: 'https://www.fda.gov/drugs/safe-disposal-medicines/disposal-unused-medicines-what-you-should-know',
    retrieved_at: '2026-07-13', quality_tier: 'guidance',
    headline_stats: ['Drug take-back first; flushing only for FDA flush-list medicines'],
  },
  {
    id: 'call2recycle-locator', name: 'Battery drop-off locator (Call2Recycle / The Battery Network)', organization_id: 'call2recycle', short_label: 'Call2Recycle',
    url: 'https://www.call2recycle.org/locator/',
    retrieved_at: '2026-07-13', quality_tier: 'guidance',
    headline_stats: ['ZIP-code locator for battery drop-off sites across the US and Canada'],
  },
  {
    id: 'epa-smoke-detectors', name: 'Americium in Ionization Smoke Detectors (US EPA)', organization_id: 'us-epa', short_label: 'US EPA',
    url: 'https://www.epa.gov/radtown/americium-ionization-smoke-detectors',
    retrieved_at: '2026-07-13', quality_tier: 'guidance',
    headline_stats: ['No special disposal instructions — household garbage or a community recycling program; sealed Am-241 poses no radiation risk when handled properly'],
  },
  {
    id: 'paintcare-dropoff', name: 'PaintCare drop-off sites', organization_id: 'paintcare', short_label: 'PaintCare',
    url: 'https://www.paintcare.org/',
    retrieved_at: '2026-07-13', quality_tier: 'guidance',
    headline_stats: ['Paint drop-off locations in paint-stewardship states; availability varies by state'],
  },
];
