# Global waste-tracking datasets — research note

> **Provenance:** received 2026-07-12 via the research handoff pipeline (see
> [README](README.md)). Archived verbatim; curated outcomes live in
> `DATA_STRATEGY.md` ("Global / macro datasets") and `src/data/organizations.ts`.

Research date: 2026-07-12

## Best starting points

**World Bank - What a Waste Global Database**

- Link: https://datacatalog.worldbank.org/search/dataset/0039597/what-a-waste-global-database
- Focus: Municipal solid waste by country and city.
- Coverage: 217 countries and 262 cities, with data on generation, composition, collection, treatment, disposal, waste workers, policy arrangements, and plastic waste.
- Why it matters: Best practical dataset for comparing national and city-level waste systems. The World Bank notes that sources and estimations are documented, though definitions vary by country.

**UN Environment Programme (UNEP) + International Solid Waste Association (ISWA) - Global Waste Management Outlook 2024**

- Link: https://www.unep.org/resources/global-waste-management-outlook-2024
- Focus: Global municipal waste trends, costs, policy pathways, and circular-economy scenarios.
- Key figures: Municipal solid waste is projected to grow from 2.1 billion tonnes in 2023 to 3.8 billion tonnes by 2050. UNEP estimates direct waste-management costs at USD 252 billion in 2020, rising to USD 640.3 billion by 2050 without urgent action.
- Why it matters: Best global policy framing source and a strong citation for why waste tracking is urgent.

**OECD - Global Plastics Outlook**

- Link: https://www.oecd.org/en/publications/global-plastics-outlook_aa1edf33-en.html
- Focus: Plastic use, plastic waste, recycling, leakage, lifecycle impacts, and policy scenarios.
- Key figures: Under current policies, OECD projects plastic use and plastic waste could almost triple by 2060, with half of plastic waste still landfilled and less than one-fifth recycled.
- Why it matters: Best source for plastics policy modeling and long-term projections.

**Global E-waste Monitor - ITU and UNITAR**

- Link: https://ewastemonitor.info/the-global-e-waste-monitor-2024/
- Focus: Global e-waste generation, formal collection and recycling, country policy coverage, and resource loss.
- Key figures: 62 million tonnes of e-waste were generated in 2022, up 82% from 2010, and only 22.3% was documented as properly collected and recycled. E-waste is projected to reach 82 million tonnes by 2030.
- Why it matters: Best worldwide source for electronics waste tracking.

**UNEP + WRAP - Food Waste Index Report 2024**

- Link: https://www.unep.org/resources/publication/food-waste-index-report-2024
- Focus: Food waste measurement across household, retail, and food service sectors, tied to SDG 12.3.
- Coverage: Expanded global and national estimates with more data points than the 2021 report, plus methodology guidance for national measurement.
- Why it matters: Best source for global food waste monitoring and reduction benchmarking.

**Global Plastic Watch - Minderoo Foundation / Earthrise**

- Link: https://globalplasticwatch.org/
- Focus: Near-real-time mapping of plastic pollution sites using satellite imagery and artificial intelligence.
- Why it matters: Useful for geospatial tracking of visible land-based plastic waste hotspots, especially where official waste-site registries are incomplete.

**Basel Convention Secretariat**

- Link: https://www.basel.int/
- Focus: Transboundary movements of hazardous and other wastes, including plastic-waste controls.
- Why it matters: Best official source for tracking international waste movement governance, national reporting, and compliance frameworks.

**Waste Atlas**

- Link: https://wasteatlas.org/
- Focus: Aggregated waste indicators, city and country profiles, waste facilities, dumpsites, and maps.
- Coverage reported by public summaries: data for 164 countries, more than 1,800 cities, and roughly 2,500 facilities.
- Why it matters: Useful reference for city-level waste visualization, but should be cross-checked because some data may be older than World Bank or UNEP sources.

## Also worth monitoring

**Our World in Data - Plastic Pollution**

- Link: https://ourworldindata.org/plastic-pollution
- Good for accessible charts and explainers, usually based on peer-reviewed and institutional sources.

**Circle Economy - Circularity Gap Report**

- Link: https://www.circularity-gap.world/
- Tracks material circularity and resource flows rather than waste alone. Useful if the goal is broader circular-economy benchmarking.

**Basel Action Network**

- Link: https://www.ban.org/
- NGO watchdog focused on toxic trade, e-waste, shipbreaking, and plastic waste exports. Useful for investigative and accountability angles, not a neutral statistical baseline.

## Practical shortlist by use case

- Country or city municipal solid waste data: World Bank What a Waste
- Global policy and cost narrative: UNEP / ISWA Global Waste Management Outlook
- Plastic waste projections and leakage: OECD Global Plastics Outlook
- E-waste: Global E-waste Monitor
- Food waste: UNEP / WRAP Food Waste Index
- Satellite mapping of plastic waste sites: Global Plastic Watch
- Hazardous waste trade and regulation: Basel Convention
- City maps and quick reference: Waste Atlas

## Notes on data quality

Waste data is fragmented because countries use different definitions, collection methods, and reporting frequencies. The strongest approach is to use World Bank or UN/OECD datasets for baselines, then supplement with specialized sources by stream: plastics, e-waste, food waste, or hazardous waste trade. For operational decisions, treat satellite and NGO datasets as leads to investigate rather than final official counts.
