// The Atlas organization directory — treaties, agencies, data hubs, research
// institutes, school platforms, and civil-society networks that inform the
// Recyclopedia/LBG knowledge base, plus the SOURCES citation table.
// Powers the public directory at /academy/directory and the provenance chain
// disposition → source → organization (DATA_SCHEMA.md).
// Seeded 2026-07-12 from docs/research/2026-07-12-lbg-directory-seed.md and
// docs/research/2026-07-12-global-waste-datasets.md; outreach contacts stay in
// REFERENCE_ORGANIZATIONS.md. Schema: DATA_SCHEMA.md "Organization directory
// extension (2026-07)".

// Canonical org_role_t (DATA_SCHEMA.md) — locked, do not extend. Directory
// facets live in the fields below, not in new role values.
export type OrgRole =
  | 'governing_body' | 'gov_agency' | 'university' | 'ngo'
  | 'intergovernmental' | 'standards_body' | 'data_provider';

// Directory taxonomy from the 2026-07-12 seed note (UI facet, not a role).
export type DirectoryCategory =
  | 'treaties-governance' | 'data-hubs' | 'earth-observation'
  | 'research-institutes' | 'school-platforms' | 'zero-waste-plastics'
  | 'circular-repair' | 'environmental-justice' | 'waste-pickers'
  | 'national-agencies';

export type AuthorityLevel =
  | 'treaty' | 'intergovernmental' | 'national' | 'academic' | 'ngo'
  | 'grassroots' | 'private-sector';

// Seed-note rule: verified official domains vs entries awaiting re-check vs the
// future community-submitted layer. Archived (dead-link) entries keep history.
export type VerificationStatus =
  | 'verified-official' | 'needs-review' | 'community-submitted' | 'archived';

export type Region = 'global' | 'africa' | 'americas' | 'asia-pacific' | 'europe' | 'middle-east';

export interface Organization {
  id: string;                 // 'unep', 'basel-convention', 'br-ibama'
  name: string;
  role: OrgRole;
  category: DirectoryCategory;
  geography: string;          // display scope: 'Global', 'Brazil', 'European Union'
  region: Region;             // coarse filter facet
  focus_tags: string[];
  authority_level: AuthorityLevel;
  data_available: boolean;    // publishes reports/data/curricula worth citing
  url: string;
  verification_status: VerificationStatus;
  last_checked: string;       // ISO date of last URL/name review (re-check every 6 months)
  feeds?: string[];           // Atlas layers it informs: 'macro','facility','local_rule','item'
  notes?: string;
}

// A citable dataset/report, traceable to an organization ("no greenwashing").
// quality_tier per the 2026-07-12 dataset note: baselines (World Bank / UN /
// OECD), stream-specific monitors, and leads (satellite/NGO — investigate,
// don't treat as official counts).
export interface Source {
  id: string;                 // 'gwmo-2024', 'wb-what-a-waste'
  name: string;
  organization_id: string;
  url: string;
  license?: string;
  retrieved_at: string;
  headline_stats?: string[];
  quality_tier: 'baseline' | 'stream-monitor' | 'lead';
}

export const CATEGORY_LABELS: Record<DirectoryCategory, string> = {
  'treaties-governance': 'Treaties & Governance',
  'data-hubs': 'Waste & Circularity Data',
  'earth-observation': 'Earth Observation & Climate',
  'research-institutes': 'Research & Knowledge',
  'school-platforms': 'Schools & Education',
  'zero-waste-plastics': 'Zero Waste & Plastics',
  'circular-repair': 'Circular Economy & Repair',
  'environmental-justice': 'Justice, Toxics & Law',
  'waste-pickers': 'Waste Picker Organizations',
  'national-agencies': 'National & Regional Agencies',
};

export const REGION_LABELS: Record<Region, string> = {
  global: 'Global', africa: 'Africa', americas: 'Americas',
  'asia-pacific': 'Asia-Pacific', europe: 'Europe', 'middle-east': 'Middle East',
};

export const AUTHORITY_LABELS: Record<AuthorityLevel, string> = {
  treaty: 'Treaty', intergovernmental: 'Intergovernmental', national: 'National',
  academic: 'Academic', ngo: 'NGO', grassroots: 'Grassroots', 'private-sector': 'Private sector',
};

export const ORGANIZATIONS: Organization[] = [
  // ── Treaties & governance ─────────────────────────────────────────────
  {
    id: 'unep', name: 'United Nations Environment Programme (UNEP)', role: 'intergovernmental',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'plastics', 'climate', 'circular-economy', 'policy'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.unep.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'UN environmental authority — waste, pollution, plastics, circularity, environmental law.',
  },
  {
    id: 'unea', name: 'UN Environment Assembly (UNEA)', role: 'governing_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['policy', 'climate', 'waste'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.unep.org/environmentassembly',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Global intergovernmental environment decision body under UNEP.',
  },
  {
    id: 'resource-panel', name: 'International Resource Panel', role: 'standards_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['materials', 'circular-economy', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.resourcepanel.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Science-policy body — resource use, material flows, lifecycle assessment.',
  },
  {
    id: 'basel-convention', name: 'Basel Convention Secretariat', role: 'governing_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['hazardous-waste', 'e-waste', 'plastics', 'policy'],
    authority_level: 'treaty', data_available: true, url: 'https://www.basel.int/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Controls transboundary movement and disposal of hazardous and other wastes.',
  },
  {
    id: 'rotterdam-convention', name: 'Rotterdam Convention Secretariat', role: 'governing_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['chemicals', 'toxics', 'policy'],
    authority_level: 'treaty', data_available: true, url: 'https://www.pic.int/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Prior informed consent for hazardous chemicals and pesticides in trade.',
  },
  {
    id: 'stockholm-convention', name: 'Stockholm Convention Secretariat', role: 'governing_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['toxics', 'chemicals', 'policy'],
    authority_level: 'treaty', data_available: true, url: 'https://www.pops.int/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Persistent organic pollutants controls and monitoring.',
  },
  {
    id: 'minamata-convention', name: 'Minamata Convention Secretariat', role: 'governing_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['toxics', 'chemicals', 'waste'],
    authority_level: 'treaty', data_available: true, url: 'https://minamataconvention.org/en',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Mercury pollution controls across products, emissions, mining, and waste.',
  },
  {
    id: 'montreal-protocol', name: 'Ozone Secretariat / Montreal Protocol', role: 'governing_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['air', 'emissions', 'chemicals'],
    authority_level: 'treaty', data_available: true, url: 'https://ozone.unep.org/treaties/montreal-protocol',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Ozone-depleting substances and HFC phase-down reporting.',
  },
  {
    id: 'unfccc', name: 'UNFCCC Secretariat', role: 'governing_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['climate', 'emissions', 'policy', 'data'],
    authority_level: 'treaty', data_available: true, url: 'https://unfccc.int/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Paris Agreement, NDC registry, national GHG inventories, transparency framework.',
  },
  {
    id: 'ipcc', name: 'Intergovernmental Panel on Climate Change (IPCC)', role: 'standards_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['climate', 'emissions', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.ipcc.ch/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Climate assessments and GHG inventory methods.',
  },
  {
    id: 'wmo', name: 'World Meteorological Organization (WMO)', role: 'intergovernmental',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['climate', 'air', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://wmo.int/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Weather, climate, atmospheric monitoring, greenhouse gases.',
  },
  {
    id: 'gcos', name: 'Global Climate Observing System (GCOS)', role: 'standards_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['climate', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://gcos.wmo.int/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Essential Climate Variables and climate observing coordination.',
  },
  {
    id: 'unsd-envstats', name: 'UN Statistics Division — Environment Statistics', role: 'standards_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['data', 'policy', 'waste'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://unstats.un.org/unsd/envstats/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Environment statistics, SDG indicators, climate indicators.',
  },
  {
    id: 'seea', name: 'System of Environmental-Economic Accounting (SEEA)', role: 'standards_body',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['materials', 'emissions', 'waste', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://seea.un.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Environmental-economic accounting for materials, emissions, waste, ecosystems.',
  },
  {
    id: 'imo', name: 'International Maritime Organization (IMO)', role: 'intergovernmental',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['ocean', 'marine', 'policy'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.imo.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'MARPOL pollution controls for ships — garbage, sewage, oil, chemicals, air emissions.',
  },
  {
    id: 'icao', name: 'International Civil Aviation Organization (ICAO)', role: 'intergovernmental',
    category: 'treaties-governance', geography: 'Global', region: 'global',
    focus_tags: ['emissions', 'air', 'policy'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.icao.int/environmental-protection/Pages/default.aspx',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'International aviation emissions and environmental standards.',
  },

  // ── Waste, recycling & circularity data hubs ──────────────────────────
  {
    id: 'world-bank', name: 'World Bank', role: 'intergovernmental',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'data', 'policy'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.worldbank.org/en/publication/what-a-waste',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Publishes What a Waste — the global solid-waste database (generation, composition, treatment, finance).',
  },
  {
    id: 'oecd', name: 'OECD', role: 'intergovernmental',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'plastics', 'data', 'policy'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.oecd.org/en/data/indicators/municipal-waste.html',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Municipal waste indicators and the Global Plastics Outlook.',
  },
  {
    id: 'un-habitat', name: 'UN-Habitat — Waste Wise Cities', role: 'intergovernmental',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'cities', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://unhabitat.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'City-level municipal solid waste assessment and SDG 11.6.1 methods.',
  },
  {
    id: 'unitar', name: 'UNITAR / ITU (Global E-waste Monitor)', role: 'intergovernmental',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['e-waste', 'data', 'policy'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://ewastemonitor.info/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Global electrical and electronic waste statistics and policy tracking.',
  },
  {
    id: 'fao', name: 'FAO — Food Loss and Waste Platform', role: 'intergovernmental',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['food-waste', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.fao.org/platform-food-loss-waste/en/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Food loss and waste measurement and SDG 12.3 support.',
  },
  {
    id: 'iswa', name: 'International Solid Waste Association (ISWA)', role: 'standards_body',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'recycling', 'policy'],
    authority_level: 'ngo', data_available: true, url: 'https://www.iswa.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Solid-waste professional association — technical reports and management standards; co-publishes the GWMO.',
  },
  {
    id: 'iea', name: 'International Energy Agency (IEA)', role: 'intergovernmental',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['energy', 'emissions', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.iea.org/data-and-statistics',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Energy and energy-related emissions data.',
  },
  {
    id: 'who', name: 'World Health Organization (WHO)', role: 'intergovernmental',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['health', 'air', 'policy'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.who.int/publications/i/item/9789240034228',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Global Air Quality Guidelines — pollution and health standards.',
  },
  {
    id: 'waste-atlas', name: 'Waste Atlas', role: 'data_provider',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'cities', 'data', 'map'],
    authority_level: 'ngo', data_available: true, url: 'https://wasteatlas.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'City/country waste profiles, facilities, dumpsites, maps — cross-check dates against World Bank/UNEP.',
  },
  {
    id: 'global-plastic-watch', name: 'Global Plastic Watch (Minderoo / Earthrise)', role: 'data_provider',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['plastics', 'satellite', 'map', 'data'],
    authority_level: 'ngo', data_available: true, url: 'https://globalplasticwatch.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Near-real-time satellite + AI mapping of land-based plastic pollution sites.',
  },
  {
    id: 'our-world-in-data', name: 'Our World in Data', role: 'data_provider',
    category: 'data-hubs', geography: 'Global', region: 'global',
    focus_tags: ['data', 'plastics', 'waste', 'climate', 'education'],
    authority_level: 'academic', data_available: true, url: 'https://ourworldindata.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Public datasets and explainers on emissions, energy, waste, pollution, climate.',
  },

  // ── NASA, Earth observation & climate data ────────────────────────────
  {
    id: 'nasa-earthdata', name: 'NASA Earthdata', role: 'data_provider',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['satellite', 'climate', 'data', 'air', 'water'],
    authority_level: 'national', data_available: true, url: 'https://www.earthdata.nasa.gov/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Open NASA Earth-science data — catalog, tools, topics, APIs, DAACs.',
  },
  {
    id: 'nasa-earthdata-search', name: 'NASA Earthdata Search', role: 'data_provider',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['satellite', 'data'],
    authority_level: 'national', data_available: true, url: 'https://search.earthdata.nasa.gov/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Search and access NASA Earth-science datasets.',
  },
  {
    id: 'nasa-worldview', name: 'NASA Worldview', role: 'data_provider',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['satellite', 'map', 'air'],
    authority_level: 'national', data_available: true, url: 'https://worldview.earthdata.nasa.gov/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Satellite imagery visualization — fires, smoke, aerosols, weather, land, ocean.',
  },
  {
    id: 'nasa-firms', name: 'NASA FIRMS', role: 'data_provider',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['satellite', 'map', 'data'],
    authority_level: 'national', data_available: true, url: 'https://firms.modaps.eosdis.nasa.gov/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Fire Information for Resource Management System — active fire and thermal anomaly data.',
  },
  {
    id: 'nasa-arset', name: 'NASA ARSET', role: 'data_provider',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['education', 'satellite', 'air', 'water'],
    authority_level: 'national', data_available: true, url: 'https://www.earthdata.nasa.gov/data/projects/arset',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Free applied remote-sensing training — air quality, water, climate resilience, disasters, agriculture.',
  },
  {
    id: 'nasa-ges-disc', name: 'NASA GES DISC', role: 'data_provider',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['satellite', 'climate', 'water', 'data'],
    authority_level: 'national', data_available: true, url: 'https://disc.gsfc.nasa.gov/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Atmospheric composition, hydrology, precipitation, climate datasets.',
  },
  {
    id: 'nasa-laads-daac', name: 'NASA LAADS DAAC', role: 'data_provider',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['satellite', 'data'],
    authority_level: 'national', data_available: true, url: 'https://ladsweb.modaps.eosdis.nasa.gov/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'MODIS and VIIRS atmosphere and land data.',
  },
  {
    id: 'nasa-oco', name: 'NASA OCO-2 / OCO-3', role: 'data_provider',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['satellite', 'emissions', 'climate'],
    authority_level: 'national', data_available: true, url: 'https://ocov2.jpl.nasa.gov/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Carbon dioxide observations and carbon-cycle research.',
  },
  {
    id: 'nasa-veda', name: 'NASA VEDA', role: 'data_provider',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['satellite', 'data', 'map'],
    authority_level: 'national', data_available: true, url: 'https://www.earthdata.nasa.gov/data/tools/veda',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Visualization, exploration, and data analysis for Earth science and environmental indicators.',
  },
  {
    id: 'noaa', name: 'NOAA', role: 'gov_agency',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['climate', 'ocean', 'air', 'data'],
    authority_level: 'national', data_available: true, url: 'https://www.noaa.gov/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Climate, weather, ocean, atmospheric and greenhouse-gas observations.',
  },
  {
    id: 'noaa-ncei', name: 'NOAA NCEI', role: 'data_provider',
    category: 'earth-observation', geography: 'United States', region: 'americas',
    focus_tags: ['climate', 'data'],
    authority_level: 'national', data_available: true, url: 'https://www.ncei.noaa.gov/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'National Centers for Environmental Information — climate and environmental data archive.',
  },
  {
    id: 'copernicus-cams', name: 'Copernicus Atmosphere Monitoring Service', role: 'data_provider',
    category: 'earth-observation', geography: 'European Union', region: 'europe',
    focus_tags: ['air', 'emissions', 'satellite', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://atmosphere.copernicus.eu/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Air quality, aerosols, greenhouse gases, atmospheric composition.',
  },
  {
    id: 'copernicus-c3s', name: 'Copernicus Climate Change Service', role: 'data_provider',
    category: 'earth-observation', geography: 'European Union', region: 'europe',
    focus_tags: ['climate', 'satellite', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://climate.copernicus.eu/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Climate monitoring, reanalysis, indicators, climate datasets.',
  },
  {
    id: 'esa-climate', name: 'European Space Agency Climate Office', role: 'intergovernmental',
    category: 'earth-observation', geography: 'Europe', region: 'europe',
    focus_tags: ['climate', 'satellite', 'data'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://climate.esa.int/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Climate data records and satellite-based climate research.',
  },
  {
    id: 'google-earth-engine', name: 'Google Earth Engine', role: 'data_provider',
    category: 'earth-observation', geography: 'Global', region: 'global',
    focus_tags: ['satellite', 'map', 'data'],
    authority_level: 'private-sector', data_available: true, url: 'https://earthengine.google.com/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Planetary-scale geospatial analysis used by researchers, NGOs, and schools.',
  },
  {
    id: 'microsoft-planetary-computer', name: 'Microsoft Planetary Computer', role: 'data_provider',
    category: 'earth-observation', geography: 'Global', region: 'global',
    focus_tags: ['satellite', 'map', 'data'],
    authority_level: 'private-sector', data_available: true, url: 'https://planetarycomputer.microsoft.com/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Open geospatial data catalog and analysis platform.',
  },

  // ── Research institutes, universities & knowledge networks ────────────
  {
    id: 'yale-cie', name: 'Yale Center for Industrial Ecology', role: 'university',
    category: 'research-institutes', geography: 'United States', region: 'americas',
    focus_tags: ['materials', 'circular-economy'],
    authority_level: 'academic', data_available: true, url: 'https://cie.research.yale.edu/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Industrial ecology, material flows, lifecycle assessment, circular economy.',
  },
  {
    id: 'yale-pccc', name: 'Yale Program on Climate Change Communication', role: 'university',
    category: 'research-institutes', geography: 'United States', region: 'americas',
    focus_tags: ['climate', 'education'],
    authority_level: 'academic', data_available: true, url: 'https://climatecommunication.yale.edu/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Climate public understanding, communication, education research.',
  },
  {
    id: 'mit-csc', name: 'MIT Climate and Sustainability Consortium', role: 'university',
    category: 'research-institutes', geography: 'United States', region: 'americas',
    focus_tags: ['climate', 'materials'],
    authority_level: 'academic', data_available: true, url: 'https://impactclimate.mit.edu/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Industry, research, climate and sustainability systems.',
  },
  {
    id: 'mit-senseable', name: 'MIT Senseable City Lab', role: 'university',
    category: 'research-institutes', geography: 'United States', region: 'americas',
    focus_tags: ['cities', 'data'],
    authority_level: 'academic', data_available: true, url: 'https://senseable.mit.edu/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Urban systems, mobility, environmental sensing, city data (incl. Trash Track).',
  },
  {
    id: 'columbia-climate-school', name: 'Columbia Climate School', role: 'university',
    category: 'research-institutes', geography: 'United States', region: 'americas',
    focus_tags: ['climate', 'education', 'policy'],
    authority_level: 'academic', data_available: true, url: 'https://www.climate.columbia.edu/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Climate science, adaptation, policy, education.',
  },
  {
    id: 'columbia-csud', name: 'Columbia Center for Sustainable Urban Development', role: 'university',
    category: 'research-institutes', geography: 'United States', region: 'americas',
    focus_tags: ['cities', 'climate'],
    authority_level: 'academic', data_available: true, url: 'https://csud.climate.columbia.edu/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Urban sustainability, infrastructure, transport, climate.',
  },
  {
    id: 'leeds-sri', name: 'University of Leeds Sustainability Research Institute', role: 'university',
    category: 'research-institutes', geography: 'United Kingdom', region: 'europe',
    focus_tags: ['climate', 'policy'],
    authority_level: 'academic', data_available: true, url: 'https://environment.leeds.ac.uk/sustainability-research-institute',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Climate, consumption, sustainability transitions, policy.',
  },
  {
    id: 'ucl-isr', name: 'UCL Institute for Sustainable Resources', role: 'university',
    category: 'research-institutes', geography: 'United Kingdom', region: 'europe',
    focus_tags: ['materials', 'circular-economy', 'policy'],
    authority_level: 'academic', data_available: true, url: 'https://www.ucl.ac.uk/bartlett/sustainable/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Resource efficiency, circular economy, materials, policy.',
  },
  {
    id: 'chatham-house-esc', name: 'Chatham House Environment and Society Centre', role: 'ngo',
    category: 'research-institutes', geography: 'United Kingdom', region: 'europe',
    focus_tags: ['circular-economy', 'policy', 'materials'],
    authority_level: 'academic', data_available: true, url: 'https://www.chathamhouse.org/about-us/our-departments/environment-and-society-centre',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Circular economy, resource trade, climate policy.',
  },
  {
    id: 'sei', name: 'Stockholm Environment Institute', role: 'university',
    category: 'research-institutes', geography: 'Global', region: 'europe',
    focus_tags: ['climate', 'air', 'policy'],
    authority_level: 'academic', data_available: true, url: 'https://www.sei.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Climate, air pollution, consumption, policy, sustainable development.',
  },
  {
    id: 'pik', name: 'Potsdam Institute for Climate Impact Research', role: 'university',
    category: 'research-institutes', geography: 'Germany', region: 'europe',
    focus_tags: ['climate', 'data'],
    authority_level: 'academic', data_available: true, url: 'https://www.pik-potsdam.de/en',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Climate impacts, Earth systems, policy modeling.',
  },
  {
    id: 'iiasa', name: 'IIASA', role: 'university',
    category: 'research-institutes', geography: 'Austria', region: 'europe',
    focus_tags: ['climate', 'materials', 'energy', 'data'],
    authority_level: 'academic', data_available: true, url: 'https://iiasa.ac.at/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Systems analysis — climate, pollution, land, energy, resource modeling.',
  },
  {
    id: 'wri', name: 'World Resources Institute', role: 'ngo',
    category: 'research-institutes', geography: 'Global', region: 'global',
    focus_tags: ['climate', 'cities', 'food-waste', 'circular-economy'],
    authority_level: 'ngo', data_available: true, url: 'https://www.wri.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Climate, cities, food loss, circularity, resource systems (incl. Ross Center).',
  },
  {
    id: 'global-footprint-network', name: 'Global Footprint Network', role: 'ngo',
    category: 'research-institutes', geography: 'Global', region: 'global',
    focus_tags: ['materials', 'data', 'education'],
    authority_level: 'ngo', data_available: true, url: 'https://www.footprintnetwork.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Ecological footprint accounting and education.',
  },
  {
    id: 'unep-irp-mfa', name: 'Global Material Flows Database (UNEP IRP)', role: 'data_provider',
    category: 'research-institutes', geography: 'Global', region: 'global',
    focus_tags: ['materials', 'data', 'circular-economy'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.resourcepanel.org/global-material-flows-database',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Global material extraction, use, and resource productivity.',
  },
  {
    id: 'ej-atlas', name: 'Environmental Justice Atlas', role: 'data_provider',
    category: 'research-institutes', geography: 'Global', region: 'global',
    focus_tags: ['justice', 'map', 'data'],
    authority_level: 'academic', data_available: true, url: 'https://ejatlas.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Global map of environmental conflicts and frontline communities.',
  },
  {
    id: 'openaq', name: 'OpenAQ', role: 'data_provider',
    category: 'research-institutes', geography: 'Global', region: 'global',
    focus_tags: ['air', 'data'],
    authority_level: 'ngo', data_available: true, url: 'https://openaq.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Open air-quality data aggregation (API).',
  },
  {
    id: 'climate-trace', name: 'Climate TRACE', role: 'data_provider',
    category: 'research-institutes', geography: 'Global', region: 'global',
    focus_tags: ['emissions', 'satellite', 'data'],
    authority_level: 'ngo', data_available: true, url: 'https://climatetrace.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Independent global emissions inventory using satellites, remote sensing, and AI.',
  },
  {
    id: 'global-carbon-project', name: 'Global Carbon Project', role: 'data_provider',
    category: 'research-institutes', geography: 'Global', region: 'global',
    focus_tags: ['emissions', 'climate', 'data'],
    authority_level: 'academic', data_available: true, url: 'https://www.globalcarbonproject.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Carbon budget and greenhouse-gas science.',
  },

  // ── School platforms, student networks & education ────────────────────
  {
    id: 'eco-schools', name: 'Eco-Schools', role: 'ngo',
    category: 'school-platforms', geography: 'Global', region: 'global',
    focus_tags: ['education', 'waste', 'climate'],
    authority_level: 'ngo', data_available: true, url: 'https://www.ecoschools.global/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Global school sustainability program using whole-school action methodology.',
  },
  {
    id: 'fee', name: 'Foundation for Environmental Education', role: 'ngo',
    category: 'school-platforms', geography: 'Global', region: 'global',
    focus_tags: ['education'],
    authority_level: 'ngo', data_available: true, url: 'https://www.fee.global/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Behind Eco-Schools, Young Reporters, LEAF, Blue Flag.',
  },
  {
    id: 'unesco-esd', name: 'UNESCO Education for Sustainable Development', role: 'intergovernmental',
    category: 'school-platforms', geography: 'Global', region: 'global',
    focus_tags: ['education', 'policy'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.unesco.org/en/education-sustainable-development',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Education policy and curriculum support for sustainability and climate action.',
  },
  {
    id: 'unep-education', name: 'UNEP Youth, Education and Environment', role: 'intergovernmental',
    category: 'school-platforms', geography: 'Global', region: 'global',
    focus_tags: ['education'],
    authority_level: 'intergovernmental', data_available: true, url: 'https://www.unep.org/explore-topics/education-environment',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Environmental education, youth engagement, learning resources.',
  },
  {
    id: 'green-schools-alliance', name: 'Green Schools Alliance', role: 'ngo',
    category: 'school-platforms', geography: 'United States', region: 'americas',
    focus_tags: ['education', 'climate'],
    authority_level: 'ngo', data_available: true, url: 'https://www.greenschoolsalliance.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'School network for climate, sustainability, resource efficiency, peer learning.',
  },
  {
    id: 'center-for-green-schools', name: 'Center for Green Schools', role: 'ngo',
    category: 'school-platforms', geography: 'United States', region: 'americas',
    focus_tags: ['education'],
    authority_level: 'ngo', data_available: true, url: 'https://www.centerforgreenschools.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'School sustainability programs and resources (USGBC).',
  },
  {
    id: 'center-for-ecoliteracy', name: 'Center for Ecoliteracy', role: 'ngo',
    category: 'school-platforms', geography: 'United States', region: 'americas',
    focus_tags: ['education', 'compost'],
    authority_level: 'ngo', data_available: true, url: 'https://www.ecoliteracy.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'K-12 sustainable living, food systems, gardens, ecological education.',
  },
  {
    id: 'nwf-eco-schools-usa', name: 'NWF Eco-Schools USA', role: 'ngo',
    category: 'school-platforms', geography: 'United States', region: 'americas',
    focus_tags: ['education', 'waste'],
    authority_level: 'ngo', data_available: true, url: 'https://www.nwf.org/Eco-Schools-USA',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'US Eco-Schools implementation and school sustainability program.',
  },
  {
    id: 'climate-reality-green-schools', name: 'Climate Reality Project — Green Schools Campaign', role: 'ngo',
    category: 'school-platforms', geography: 'United States', region: 'americas',
    focus_tags: ['education', 'climate', 'energy'],
    authority_level: 'ngo', data_available: true, url: 'https://www.climaterealityproject.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Student-led school clean energy and climate organizing.',
  },
  {
    id: 'lsf-canada', name: 'Learning for a Sustainable Future', role: 'ngo',
    category: 'school-platforms', geography: 'Canada', region: 'americas',
    focus_tags: ['education'],
    authority_level: 'ngo', data_available: true, url: 'https://lsf-lst.ca/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Canadian sustainability education network.',
  },
  {
    id: 'cloud-institute', name: 'Cloud Institute for Sustainability Education', role: 'ngo',
    category: 'school-platforms', geography: 'United States', region: 'americas',
    focus_tags: ['education'],
    authority_level: 'ngo', data_available: true, url: 'https://cloudinstitute.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Education for sustainability curriculum and teacher learning.',
  },
  {
    id: 'project-learning-tree', name: 'Project Learning Tree', role: 'ngo',
    category: 'school-platforms', geography: 'United States', region: 'americas',
    focus_tags: ['education'],
    authority_level: 'ngo', data_available: true, url: 'https://www.plt.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Environmental education curriculum for schools.',
  },
  {
    id: 'story-of-stuff', name: 'The Story of Stuff Project', role: 'ngo',
    category: 'school-platforms', geography: 'Global', region: 'global',
    focus_tags: ['education', 'waste', 'plastics'],
    authority_level: 'ngo', data_available: true, url: 'https://www.storyofstuff.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Curriculum and public education on consumption, waste, plastics, and systems change.',
  },
  {
    id: 'precious-plastic', name: 'Precious Plastic', role: 'ngo',
    category: 'school-platforms', geography: 'Global', region: 'global',
    focus_tags: ['plastics', 'repair', 'education', 'recycling'],
    authority_level: 'grassroots', data_available: true, url: 'https://www.preciousplastic.com/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Open-source machines and community education for plastic recycling and redesign.',
  },
  {
    id: 'global-action-plan', name: 'Global Action Plan', role: 'ngo',
    category: 'school-platforms', geography: 'United Kingdom', region: 'europe',
    focus_tags: ['education', 'air', 'waste'],
    authority_level: 'ngo', data_available: true, url: 'https://www.globalactionplan.org.uk/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Behavior change, sustainability education, clean air and waste reduction programs.',
  },

  // ── Zero waste, plastics & waste systems ──────────────────────────────
  {
    id: 'break-free-from-plastic', name: 'Break Free From Plastic', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['plastics', 'reuse', 'policy'],
    authority_level: 'ngo', data_available: true, url: 'https://www.breakfreefromplastic.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Global movement for plastic reduction, treaty advocacy, brand audits, reuse.',
  },
  {
    id: 'gaia', name: 'GAIA', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'plastics', 'justice', 'climate'],
    authority_level: 'ngo', data_available: true, url: 'https://www.no-burn.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Zero waste, anti-incineration, waste justice, plastics, climate.',
  },
  {
    id: 'zwia', name: 'Zero Waste International Alliance', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'policy'],
    authority_level: 'ngo', data_available: true, url: 'https://zwia.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Zero-waste principles, standards, certification, advocacy.',
  },
  {
    id: 'zero-waste-europe', name: 'Zero Waste Europe', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Europe', region: 'europe',
    focus_tags: ['waste', 'cities', 'circular-economy', 'policy'],
    authority_level: 'ngo', data_available: true, url: 'https://zerowasteeurope.eu/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Zero-waste cities, EU policy, circular economy.',
  },
  {
    id: 'zero-waste-usa', name: 'Zero Waste USA', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'United States', region: 'americas',
    focus_tags: ['waste', 'education', 'policy'],
    authority_level: 'ngo', data_available: true, url: 'https://zerowasteusa.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'US zero-waste education, policy, certification.',
  },
  {
    id: 'plastic-pollution-coalition', name: 'Plastic Pollution Coalition', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['plastics', 'toxics'],
    authority_level: 'ngo', data_available: true, url: 'https://www.plasticpollutioncoalition.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Coalition against plastic pollution and toxic impacts.',
  },
  {
    id: '5-gyres', name: '5 Gyres Institute', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['plastics', 'ocean', 'data'],
    authority_level: 'ngo', data_available: true, url: 'https://www.5gyres.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Plastic pollution research and policy advocacy.',
  },
  {
    id: 'plastic-soup-foundation', name: 'Plastic Soup Foundation', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Netherlands', region: 'europe',
    focus_tags: ['plastics', 'health', 'ocean'],
    authority_level: 'ngo', data_available: true, url: 'https://www.plasticsoupfoundation.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Plastic pollution, microplastics, health, campaigns.',
  },
  {
    id: 'ocean-conservancy', name: 'Ocean Conservancy', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['ocean', 'plastics', 'marine'],
    authority_level: 'ngo', data_available: true, url: 'https://oceanconservancy.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Marine debris, ocean plastics, International Coastal Cleanup data.',
  },
  {
    id: 'oceana', name: 'Oceana', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['ocean', 'plastics', 'policy'],
    authority_level: 'ngo', data_available: true, url: 'https://oceana.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Ocean protection, plastics policy.',
  },
  {
    id: 'surfrider', name: 'Surfrider Foundation', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'United States', region: 'americas',
    focus_tags: ['ocean', 'plastics', 'marine'],
    authority_level: 'grassroots', data_available: true, url: 'https://www.surfrider.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Coastal protection, plastic pollution, local chapters.',
  },
  {
    id: 'parley', name: 'Parley for the Oceans', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['ocean', 'plastics', 'materials'],
    authority_level: 'ngo', data_available: false, url: 'https://parley.tv/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Ocean plastic awareness, interception, material innovation.',
  },
  {
    id: 'ocean-cleanup', name: 'The Ocean Cleanup', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['ocean', 'plastics', 'data'],
    authority_level: 'ngo', data_available: true, url: 'https://theoceancleanup.com/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'River and ocean plastic removal systems.',
  },
  {
    id: 'lets-do-it-world', name: "Let's Do It World", role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'education'],
    authority_level: 'grassroots', data_available: true, url: 'https://www.letsdoitworld.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Global cleanup mobilization and World Cleanup Day.',
  },
  {
    id: 'reloop', name: 'Reloop Platform', role: 'ngo',
    category: 'zero-waste-plastics', geography: 'Global', region: 'global',
    focus_tags: ['reuse', 'recycling', 'policy', 'data'],
    authority_level: 'ngo', data_available: true, url: 'https://www.reloopplatform.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Deposit return, reuse, recycling, circular-economy policy.',
  },

  // ── Circular economy, reuse, repair & materials ───────────────────────
  {
    id: 'ellen-macarthur', name: 'Ellen MacArthur Foundation', role: 'ngo',
    category: 'circular-repair', geography: 'Global', region: 'global',
    focus_tags: ['circular-economy', 'education', 'policy'],
    authority_level: 'ngo', data_available: true, url: 'https://www.ellenmacarthurfoundation.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Circular-economy frameworks, business, policy, education.',
  },
  {
    id: 'circle-economy', name: 'Circle Economy Foundation', role: 'ngo',
    category: 'circular-repair', geography: 'Netherlands', region: 'europe',
    focus_tags: ['circular-economy', 'materials', 'data'],
    authority_level: 'ngo', data_available: true, url: 'https://www.circle-economy.com/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Circularity Gap reporting and transition support.',
  },
  {
    id: 'pace', name: 'Platform for Accelerating the Circular Economy', role: 'ngo',
    category: 'circular-repair', geography: 'Global', region: 'global',
    focus_tags: ['circular-economy', 'policy'],
    authority_level: 'ngo', data_available: true, url: 'https://pacecircular.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Public-private circular-economy action platform.',
  },
  {
    id: 'sitra', name: 'Sitra / World Circular Economy Forum', role: 'ngo',
    category: 'circular-repair', geography: 'Finland', region: 'europe',
    focus_tags: ['circular-economy', 'policy'],
    authority_level: 'ngo', data_available: true, url: 'https://www.sitra.fi/en/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Finnish public innovation fund — circular-economy roadmaps and global forum.',
  },
  {
    id: 'rreuse', name: 'RREUSE', role: 'ngo',
    category: 'circular-repair', geography: 'Europe', region: 'europe',
    focus_tags: ['reuse', 'repair', 'recycling'],
    authority_level: 'ngo', data_available: true, url: 'https://rreuse.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Social enterprises in reuse, repair, and recycling.',
  },
  {
    id: 'wrap', name: 'WRAP', role: 'ngo',
    category: 'circular-repair', geography: 'Global', region: 'europe',
    focus_tags: ['food-waste', 'plastics', 'textiles', 'circular-economy'],
    authority_level: 'ngo', data_available: true, url: 'https://wrap.org.uk/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Food waste, plastics pacts, textiles, circular economy; co-publishes the Food Waste Index.',
  },
  {
    id: 'repair-cafe', name: 'Repair Cafe International', role: 'ngo',
    category: 'circular-repair', geography: 'Global', region: 'global',
    focus_tags: ['repair', 'reuse', 'education'],
    authority_level: 'grassroots', data_available: true, url: 'https://www.repaircafe.org/en/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Community repair movement and repair education.',
  },
  {
    id: 'ifixit', name: 'iFixit', role: 'data_provider',
    category: 'circular-repair', geography: 'Global', region: 'global',
    focus_tags: ['repair', 'e-waste', 'education'],
    authority_level: 'private-sector', data_available: true, url: 'https://www.ifixit.com/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['item'],
    notes: 'Repair manuals and right-to-repair education — its guides are a dataset.',
  },
  {
    id: 'open-repair-alliance', name: 'Open Repair Alliance', role: 'data_provider',
    category: 'circular-repair', geography: 'Global', region: 'global',
    focus_tags: ['repair', 'data'],
    authority_level: 'ngo', data_available: true, url: 'https://openrepair.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Open repair data and repair movement coordination.',
  },
  {
    id: 'acr-plus', name: 'ACR+', role: 'ngo',
    category: 'circular-repair', geography: 'Europe', region: 'europe',
    focus_tags: ['cities', 'waste', 'circular-economy'],
    authority_level: 'ngo', data_available: true, url: 'https://www.acrplus.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Cities and regions for sustainable resource management.',
  },

  // ── Pollution, toxics, law & environmental justice ────────────────────
  {
    id: 'ipen', name: 'IPEN', role: 'ngo',
    category: 'environmental-justice', geography: 'Global', region: 'global',
    focus_tags: ['toxics', 'chemicals', 'plastics'],
    authority_level: 'ngo', data_available: true, url: 'https://ipen.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Toxic pollutants, plastic chemicals, POPs, mercury, lead.',
  },
  {
    id: 'ciel', name: 'Center for International Environmental Law', role: 'ngo',
    category: 'environmental-justice', geography: 'Global', region: 'global',
    focus_tags: ['policy', 'plastics', 'toxics', 'justice'],
    authority_level: 'ngo', data_available: true, url: 'https://www.ciel.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Legal advocacy on plastics, climate, human rights, toxics.',
  },
  {
    id: 'ban', name: 'Basel Action Network', role: 'ngo',
    category: 'environmental-justice', geography: 'Global', region: 'global',
    focus_tags: ['e-waste', 'hazardous-waste', 'toxics'],
    authority_level: 'ngo', data_available: true, url: 'https://www.ban.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Hazardous waste trade and e-waste watchdog — investigative lead, not a neutral statistical baseline.',
  },
  {
    id: 'hcwh', name: 'Health Care Without Harm', role: 'ngo',
    category: 'environmental-justice', geography: 'Global', region: 'global',
    focus_tags: ['health', 'waste', 'chemicals'],
    authority_level: 'ngo', data_available: true, url: 'https://noharm-global.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Medical waste, health-care climate, chemicals, mercury.',
  },
  {
    id: 'earthjustice', name: 'Earthjustice', role: 'ngo',
    category: 'environmental-justice', geography: 'United States', region: 'americas',
    focus_tags: ['policy', 'justice', 'toxics'],
    authority_level: 'ngo', data_available: false, url: 'https://earthjustice.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Environmental law and pollution litigation.',
  },
  {
    id: 'clientearth', name: 'ClientEarth', role: 'ngo',
    category: 'environmental-justice', geography: 'Global', region: 'europe',
    focus_tags: ['policy', 'plastics', 'justice'],
    authority_level: 'ngo', data_available: false, url: 'https://www.clientearth.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Environmental law, pollution, plastics, corporate accountability.',
  },
  {
    id: 'ejf', name: 'Environmental Justice Foundation', role: 'ngo',
    category: 'environmental-justice', geography: 'Global', region: 'global',
    focus_tags: ['justice', 'climate'],
    authority_level: 'ngo', data_available: true, url: 'https://ejfoundation.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Environmental harm and human-rights investigations.',
  },
  {
    id: 'foei', name: 'Friends of the Earth International', role: 'ngo',
    category: 'environmental-justice', geography: 'Global', region: 'global',
    focus_tags: ['justice', 'climate'],
    authority_level: 'grassroots', data_available: false, url: 'https://www.foei.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Climate justice, pollution, economics, grassroots environmental campaigns.',
  },
  {
    id: 'greenpeace', name: 'Greenpeace International', role: 'ngo',
    category: 'environmental-justice', geography: 'Global', region: 'global',
    focus_tags: ['plastics', 'toxics', 'climate', 'ocean'],
    authority_level: 'ngo', data_available: true, url: 'https://www.greenpeace.org/international/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Plastics, toxics, climate, oceans, corporate accountability.',
  },
  {
    id: 'can-international', name: 'Climate Action Network International', role: 'ngo',
    category: 'environmental-justice', geography: 'Global', region: 'global',
    focus_tags: ['climate', 'policy'],
    authority_level: 'ngo', data_available: false, url: 'https://climatenetwork.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Global climate NGO network.',
  },
  {
    id: '350-org', name: '350.org', role: 'ngo',
    category: 'environmental-justice', geography: 'Global', region: 'global',
    focus_tags: ['climate', 'energy', 'justice'],
    authority_level: 'grassroots', data_available: false, url: 'https://350.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Fossil fuels, climate justice, movement organizing.',
  },
  {
    id: 'ien', name: 'Indigenous Environmental Network', role: 'ngo',
    category: 'environmental-justice', geography: 'United States', region: 'americas',
    focus_tags: ['justice', 'toxics', 'climate'],
    authority_level: 'grassroots', data_available: false, url: 'https://www.ienearth.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Indigenous-led climate, toxics, extractives, sovereignty work.',
  },
  {
    id: 'climate-justice-alliance', name: 'Climate Justice Alliance', role: 'ngo',
    category: 'environmental-justice', geography: 'United States', region: 'americas',
    focus_tags: ['justice', 'climate'],
    authority_level: 'grassroots', data_available: false, url: 'https://climatejusticealliance.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Frontline climate and environmental-justice alliance.',
  },

  // ── Waste picker inclusion & informal recycling ───────────────────────
  {
    id: 'iawp', name: 'International Alliance of Waste Pickers', role: 'ngo',
    category: 'waste-pickers', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'justice', 'recycling'],
    authority_level: 'grassroots', data_available: true, url: 'https://wastepickersinternational.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Global democratic union of waste picker organizations.',
  },
  {
    id: 'wiego', name: 'WIEGO', role: 'ngo',
    category: 'waste-pickers', geography: 'Global', region: 'global',
    focus_tags: ['waste', 'justice', 'data'],
    authority_level: 'ngo', data_available: true, url: 'https://www.wiego.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12', feeds: ['macro'],
    notes: 'Research and policy network for informal workers, including waste pickers.',
  },
  {
    id: 'red-lacre', name: 'Red LACRE', role: 'ngo',
    category: 'waste-pickers', geography: 'Latin America & Caribbean', region: 'americas',
    focus_tags: ['waste', 'justice', 'recycling'],
    authority_level: 'grassroots', data_available: false, url: 'https://www.redrecicladores.net/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Latin American and Caribbean waste picker network.',
  },
  {
    id: 'mncr', name: 'MNCR Brazil', role: 'ngo',
    category: 'waste-pickers', geography: 'Brazil', region: 'americas',
    focus_tags: ['waste', 'justice', 'recycling'],
    authority_level: 'grassroots', data_available: false, url: 'https://www.mncr.org.br/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'National movement of recyclable-material collectors (catadores).',
  },
  {
    id: 'arb-bogota', name: 'Asociación de Recicladores de Bogotá', role: 'ngo',
    category: 'waste-pickers', geography: 'Colombia', region: 'americas',
    focus_tags: ['waste', 'justice', 'recycling'],
    authority_level: 'grassroots', data_available: false, url: 'https://asociacionrecicladoresbogota.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Waste picker recognition and recycler service model.',
  },
  {
    id: 'swach', name: 'SWaCH Cooperative', role: 'ngo',
    category: 'waste-pickers', geography: 'India', region: 'asia-pacific',
    focus_tags: ['waste', 'justice', 'recycling'],
    authority_level: 'grassroots', data_available: false, url: 'https://swachcoop.com/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Waste picker cooperative in Pune, India.',
  },
  {
    id: 'kkpkp', name: 'KKPKP', role: 'ngo',
    category: 'waste-pickers', geography: 'India', region: 'asia-pacific',
    focus_tags: ['waste', 'justice'],
    authority_level: 'grassroots', data_available: false, url: 'https://kkpkp-pune.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Waste picker and informal recycler union in Pune, India.',
  },
  {
    id: 'hasiru-dala', name: 'Hasiru Dala', role: 'ngo',
    category: 'waste-pickers', geography: 'India', region: 'asia-pacific',
    focus_tags: ['waste', 'justice', 'circular-economy'],
    authority_level: 'ngo', data_available: true, url: 'https://hasirudala.in/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Waste picker inclusion and circular services in India.',
  },
  {
    id: 'aro', name: 'African Reclaimers Organisation', role: 'ngo',
    category: 'waste-pickers', geography: 'South Africa', region: 'africa',
    focus_tags: ['waste', 'justice', 'recycling'],
    authority_level: 'grassroots', data_available: false, url: 'https://www.africanreclaimers.org/',
    verification_status: 'verified-official', last_checked: '2026-07-12',
    notes: 'Informal reclaimer organization in South Africa.',
  },
];

// Citable datasets from the 2026-07-12 dataset research note. Tiering rule:
// use baselines for comparisons, stream monitors per waste stream, and treat
// leads as pointers to investigate — never as official counts.
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
];
