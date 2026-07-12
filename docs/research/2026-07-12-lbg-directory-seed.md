# Global environmental source directory — seed document

> **Provenance:** received 2026-07-12 via the research handoff pipeline (see
> [README](README.md)). Archived verbatim (tables restored from tab-separated paste).
> Machine-readable canon lives in `src/data/organizations.ts`; the public index at
> `/academy/directory`. Known flaw carried in data: the Argentina agency URL points
> to a tourism/sports secretariat — marked `needs-review`.

Prepared for lettucebeetgrapefruit.org as a seed directory for an open-source school platform focused on sustainable solutions, zero-waste initiatives, and the question: why do we have trash at all?

## Scope Note

No single static document can truthfully list every local waste office, school club, researcher, nonprofit, agency, and community group in the world. The practical source of truth should be a living directory. This document is the authoritative first layer: global treaty bodies, major data hubs, national and regional agencies, NASA and research programs, school platforms, and major civil-society networks. It is organized so lettucebeetgrapefruit.org can ingest, tag, verify, and expand entries over time.

Recommended core categories:

- Global governance and treaties
- Waste, recycling, circular economy, and materials data
- Climate, emissions, and Earth-observation data
- Chemicals, toxics, pollution, and health
- National and regional environmental agencies
- NASA, satellites, universities, and research institutes
- Schools, student platforms, and education networks
- Nonprofits, alliances, and community organizations
- Waste picker, repair, reuse, and environmental justice organizations

## Where The Data Meets

lettucebeetgrapefruit.org should become the public knowledge hub where these sources meet:

- Official law and reporting: UNFCCC, Basel Convention, national environment agencies, SDG indicators.
- Physical Earth data: NASA Earthdata, NOAA, Copernicus, WMO, national meteorological and monitoring agencies.
- Waste system data: World Bank What a Waste, UNEP Global Waste Management Outlook, OECD, UN-Habitat, national waste agencies.
- Community proof: zero-waste cities, school audits, composting programs, reuse and repair networks, waste picker organizations.
- Education: school lesson plans, student research, campus audits, local zero-waste action projects.

Recommended database fields:

| Field | Purpose |
|---|---|
| name | Official organization, program, project, or dataset name |
| category | Governance, agency, nonprofit, research, school, data, treaty, local group |
| geography | Global, region, country, state/province, city, campus |
| focus_tags | Waste, recycling, compost, plastics, climate, air, water, toxics, e-waste, reuse, repair, circular economy |
| authority_level | Treaty, government, scientific, school, community, advocacy, private-sector |
| data_available | Reports, API, open data, map, curriculum, law, project examples |
| official_url | Canonical source URL |
| verification_status | Verified official, needs review, community submitted, archived |
| last_checked | Date the source was last reviewed |
| notes | Short explanation of why it matters |

## Global Governance And Treaty Bodies

| Organization | Category | Role | URL |
|---|---|---|---|
| United Nations Environment Programme (UNEP) | Global governance | UN environmental authority; waste, pollution, plastics, circularity, climate, environmental law | https://www.unep.org/ |
| UN Environment Assembly (UNEA) | Governing body | Global intergovernmental environment decision body under UNEP | https://www.unep.org/environmentassembly |
| International Resource Panel | Science-policy body | Resource use, material flows, circular economy, lifecycle assessment | https://www.resourcepanel.org/ |
| Basel Convention Secretariat | Waste treaty | Controls transboundary movement and disposal of hazardous and other wastes | https://www.basel.int/ |
| Rotterdam Convention Secretariat | Chemicals treaty | Prior informed consent for hazardous chemicals and pesticides in trade | https://www.pic.int/ |
| Stockholm Convention Secretariat | Toxics treaty | Persistent organic pollutants controls and monitoring | https://www.pops.int/ |
| Minamata Convention Secretariat | Pollution treaty | Mercury pollution controls across products, emissions, mining, and waste | https://minamataconvention.org/en |
| Ozone Secretariat / Montreal Protocol | Atmosphere treaty | Ozone-depleting substances and HFC phase-down reporting | https://ozone.unep.org/treaties/montreal-protocol |
| UNFCCC Secretariat | Climate treaty | Paris Agreement, NDCs, national GHG inventories, transparency framework | https://unfccc.int/ |
| Intergovernmental Panel on Climate Change (IPCC) | Science-policy body | Climate assessments and GHG inventory methods | https://www.ipcc.ch/ |
| World Meteorological Organization (WMO) | Intergovernmental science | Weather, climate, atmospheric monitoring, greenhouse gases | https://wmo.int/ |
| Global Climate Observing System (GCOS) | Observing system | Essential Climate Variables and climate observing coordination | https://gcos.wmo.int/ |
| UN Statistics Division Environment Statistics | Statistics standard | Environment statistics, SDG indicators, climate indicators | https://unstats.un.org/unsd/envstats/ |
| System of Environmental-Economic Accounting (SEEA) | Accounting standard | Environmental-economic accounting for materials, emissions, waste, ecosystems | https://seea.un.org/ |
| International Maritime Organization (IMO) | Marine pollution rules | MARPOL pollution controls for ships, garbage, sewage, oil, chemicals, air emissions | https://www.imo.org/ |
| International Civil Aviation Organization (ICAO) | Aviation emissions | International aviation emissions and environmental standards | https://www.icao.int/environmental-protection/Pages/default.aspx |

## Global Waste, Recycling, And Circular Economy Data Hubs

| Organization / Dataset | Role | URL |
|---|---|---|
| UNEP Global Waste Management Outlook | Global municipal waste assessment and zero-waste/circular economy scenarios | https://www.unep.org/resources/global-waste-management-outlook-2024 |
| World Bank What a Waste | Global solid waste database covering generation, composition, collection, treatment, disposal, legislation, finance | https://www.worldbank.org/en/publication/what-a-waste |
| OECD Municipal Waste Indicator | Municipal waste generation, treatment, recycling, and landfill data for OECD and partner countries | https://www.oecd.org/en/data/indicators/municipal-waste.html |
| UN-Habitat Waste Wise Cities | City-level municipal solid waste assessment and SDG 11.6.1 methods | https://unhabitat.org/ |
| UNITAR / ITU Global E-waste Monitor | Global electrical and electronic waste statistics and policy tracking | https://ewastemonitor.info/ |
| FAO Food Loss and Waste Platform | Food loss and waste measurement and SDG 12.3 support | https://www.fao.org/platform-food-loss-waste/en/ |
| International Solid Waste Association (ISWA) | Solid waste professional association, technical reports, waste management standards | https://www.iswa.org/ |
| International Energy Agency (IEA) | Energy and energy-related emissions data | https://www.iea.org/data-and-statistics |
| WHO Global Air Quality Guidelines | Pollution and health standards | https://www.who.int/publications/i/item/9789240034228 |

## NASA, Earth Observation, And Climate Data

| Organization / Program | Role | URL |
|---|---|---|
| NASA Earthdata | Open NASA Earth science data, data catalog, tools, topics, APIs, DAACs | https://www.earthdata.nasa.gov/ |
| NASA Earthdata Search | Search and access NASA Earth science datasets | https://search.earthdata.nasa.gov/ |
| NASA Worldview | Satellite imagery visualization for fires, smoke, aerosols, weather, land, ocean | https://worldview.earthdata.nasa.gov/ |
| NASA FIRMS | Fire Information for Resource Management System; active fire and thermal anomaly data | https://firms.modaps.eosdis.nasa.gov/ |
| NASA ARSET | Free applied remote sensing training for air quality, water, climate resilience, disasters, agriculture | https://www.earthdata.nasa.gov/data/projects/arset |
| NASA GES DISC | Atmospheric composition, hydrology, precipitation, climate datasets | https://disc.gsfc.nasa.gov/ |
| NASA LAADS DAAC | MODIS and VIIRS atmosphere and land data | https://ladsweb.modaps.eosdis.nasa.gov/ |
| NASA OCO-2 / OCO-3 | Carbon dioxide observations and carbon-cycle research | https://ocov2.jpl.nasa.gov/ |
| NASA VEDA | Visualization, exploration, and data analysis for Earth science and environmental indicators | https://www.earthdata.nasa.gov/data/tools/veda |
| NOAA | Climate, weather, ocean, atmospheric and greenhouse gas observations | https://www.noaa.gov/ |
| NOAA NCEI | National Centers for Environmental Information; climate and environmental data archive | https://www.ncei.noaa.gov/ |
| Copernicus Atmosphere Monitoring Service | Air quality, aerosols, greenhouse gases, atmospheric composition | https://atmosphere.copernicus.eu/ |
| Copernicus Climate Change Service | Climate monitoring, reanalysis, indicators, climate datasets | https://climate.copernicus.eu/ |
| European Space Agency Climate Office | Climate data records and satellite-based climate research | https://climate.esa.int/ |
| Google Earth Engine | Planetary-scale geospatial analysis used by researchers, NGOs, and schools | https://earthengine.google.com/ |
| Microsoft Planetary Computer | Open geospatial data catalog and analysis platform | https://planetarycomputer.microsoft.com/ |

## Research Institutes, Universities, And Knowledge Networks

| Institution / Network | Focus | URL |
|---|---|---|
| Yale Center for Industrial Ecology | Industrial ecology, material flows, lifecycle assessment, circular economy | https://cie.research.yale.edu/ |
| Yale Program on Climate Change Communication | Climate public understanding, communication, education research | https://climatecommunication.yale.edu/ |
| MIT Climate and Sustainability Consortium | Industry, research, climate and sustainability systems | https://impactclimate.mit.edu/ |
| MIT Senseable City Lab | Urban systems, mobility, environmental sensing, city data | https://senseable.mit.edu/ |
| Columbia Climate School | Climate science, adaptation, policy, education | https://www.climate.columbia.edu/ |
| Columbia Center for Sustainable Urban Development | Urban sustainability, infrastructure, transport, climate | https://csud.climate.columbia.edu/ |
| University of Leeds Sustainability Research Institute | Climate, consumption, sustainability transitions, policy | https://environment.leeds.ac.uk/sustainability-research-institute |
| University College London Institute for Sustainable Resources | Resource efficiency, circular economy, materials, policy | https://www.ucl.ac.uk/bartlett/sustainable/ |
| Chatham House Environment and Society Centre | Circular economy, resource trade, climate policy | https://www.chathamhouse.org/about-us/our-departments/environment-and-society-centre |
| Stockholm Environment Institute | Climate, air pollution, consumption, policy, sustainable development | https://www.sei.org/ |
| Potsdam Institute for Climate Impact Research | Climate impacts, Earth systems, policy modeling | https://www.pik-potsdam.de/en |
| IIASA | Systems analysis, climate, pollution, land, energy, resource modeling | https://iiasa.ac.at/ |
| WRI Ross Center / World Resources Institute | Climate, cities, food loss, circularity, resource systems | https://www.wri.org/ |
| Global Footprint Network | Ecological footprint accounting and education | https://www.footprintnetwork.org/ |
| Material Flow Analysis Portal / UNEP IRP | Global material extraction, use, and resource productivity | https://www.resourcepanel.org/global-material-flows-database |
| Environmental Justice Atlas | Global map of environmental conflicts and frontline communities | https://ejatlas.org/ |
| OpenAQ | Open air quality data aggregation | https://openaq.org/ |
| Climate TRACE | Independent global emissions inventory using satellites, remote sensing, and AI | https://climatetrace.org/ |
| Global Carbon Project | Carbon budget and greenhouse gas science | https://www.globalcarbonproject.org/ |
| Our World in Data | Public datasets and explainers on emissions, energy, waste, pollution, climate | https://ourworldindata.org/ |

## School Platforms, Student Networks, And Education Groups

| Organization / Platform | Role | URL |
|---|---|---|
| Eco-Schools | Global school sustainability program using whole-school action methodology | https://www.ecoschools.global/ |
| Foundation for Environmental Education | International environmental education organization behind Eco-Schools, Young Reporters, LEAF, Blue Flag | https://www.fee.global/ |
| UNESCO Education for Sustainable Development | Education policy and curriculum support for sustainability and climate action | https://www.unesco.org/en/education-sustainable-development |
| UNEP Youth, Education and Environment | Environmental education, youth engagement, learning resources | https://www.unep.org/explore-topics/education-environment |
| Green Schools Alliance | School network for climate, sustainability, resource efficiency, peer learning | https://www.greenschoolsalliance.org/ |
| Center for Green Schools | School sustainability programs and resources | https://www.centerforgreenschools.org/ |
| Center for Ecoliteracy | K-12 sustainable living, food systems, gardens, ecological education | https://www.ecoliteracy.org/ |
| National Wildlife Federation Eco-Schools USA | US Eco-Schools implementation and school sustainability program | https://www.nwf.org/Eco-Schools-USA |
| Climate Reality Project Green Schools Campaign | Student-led school clean energy and climate organizing | https://www.climaterealityproject.org/ |
| Learning for a Sustainable Future | Canadian sustainability education network | https://lsf-lst.ca/ |
| Cloud Institute for Sustainability Education | Education for sustainability curriculum and teacher learning | https://cloudinstitute.org/ |
| Project Learning Tree | Environmental education curriculum for schools | https://www.plt.org/ |
| The Story of Stuff Project | Curriculum and public education on consumption, waste, plastics, and systems change | https://www.storyofstuff.org/ |
| Precious Plastic | Open-source machines and community education for plastic recycling and redesign | https://www.preciousplastic.com/ |
| Global Action Plan | Behavior change, sustainability education, clean air and waste reduction programs | https://www.globalactionplan.org.uk/ |

## Major Nonprofits, Alliances, And Civil-Society Networks

### Zero Waste, Plastics, And Waste Systems

| Organization | Role | URL |
|---|---|---|
| Break Free From Plastic | Global movement for plastic reduction, treaty advocacy, brand audits, reuse | https://www.breakfreefromplastic.org/ |
| GAIA | Zero waste, anti-incineration, waste justice, plastics, climate | https://www.no-burn.org/ |
| Zero Waste International Alliance | Zero-waste principles, standards, certification, advocacy | https://zwia.org/ |
| Zero Waste Europe | Zero-waste cities, EU policy, circular economy | https://zerowasteeurope.eu/ |
| Zero Waste USA | US zero-waste education, policy, certification | https://zerowasteusa.org/ |
| Plastic Pollution Coalition | Coalition against plastic pollution and toxic impacts | https://www.plasticpollutioncoalition.org/ |
| 5 Gyres Institute | Plastic pollution research and policy advocacy | https://www.5gyres.org/ |
| Plastic Soup Foundation | Plastic pollution, microplastics, health, campaigns | https://www.plasticsoupfoundation.org/ |
| Ocean Conservancy | Marine debris, ocean plastics, coastal cleanup | https://oceanconservancy.org/ |
| Oceana | Ocean protection, plastics policy | https://oceana.org/ |
| Surfrider Foundation | Coastal protection, plastic pollution, local chapters | https://www.surfrider.org/ |
| Parley for the Oceans | Ocean plastic awareness, interception, material innovation | https://parley.tv/ |
| The Ocean Cleanup | River and ocean plastic removal systems | https://theoceancleanup.com/ |
| Let's Do It World | Global cleanup mobilization and World Cleanup Day | https://www.letsdoitworld.org/ |
| Reloop Platform | Deposit return, reuse, recycling, circular economy policy | https://www.reloopplatform.org/ |

### Circular Economy, Reuse, Repair, And Materials

| Organization | Role | URL |
|---|---|---|
| Ellen MacArthur Foundation | Circular economy frameworks, business, policy, education | https://www.ellenmacarthurfoundation.org/ |
| Circle Economy Foundation | Circularity gap reporting and transition support | https://www.circle-economy.com/ |
| Platform for Accelerating the Circular Economy | Public-private circular economy action platform | https://pacecircular.org/ |
| Sitra / World Circular Economy Forum | Circular economy roadmaps and global forum | https://www.sitra.fi/en/ |
| RREUSE | Social enterprises in reuse, repair, and recycling | https://rreuse.org/ |
| WRAP | Food waste, plastics pacts, textiles, circular economy | https://wrap.org.uk/ |
| Repair Cafe International | Community repair movement and repair education | https://www.repaircafe.org/en/ |
| iFixit | Repair manuals, right-to-repair education | https://www.ifixit.com/ |
| Open Repair Alliance | Open repair data and repair movement coordination | https://openrepair.org/ |
| ACR+ | Cities and regions for sustainable resource management | https://www.acrplus.org/ |

### Pollution, Toxics, Law, And Environmental Justice

| Organization | Role | URL |
|---|---|---|
| IPEN | Toxic pollutants, plastic chemicals, POPs, mercury, lead | https://ipen.org/ |
| Center for International Environmental Law | Legal advocacy on plastics, climate, human rights, toxics | https://www.ciel.org/ |
| Basel Action Network | Hazardous waste trade and e-waste watchdog | https://www.ban.org/ |
| Health Care Without Harm | Medical waste, health care climate, chemicals, mercury | https://noharm-global.org/ |
| Earthjustice | Environmental law and pollution litigation | https://earthjustice.org/ |
| ClientEarth | Environmental law, pollution, plastics, corporate accountability | https://www.clientearth.org/ |
| Environmental Justice Foundation | Environmental harm and human rights investigations | https://ejfoundation.org/ |
| Friends of the Earth International | Climate justice, pollution, economics, grassroots environmental campaigns | https://www.foei.org/ |
| Greenpeace International | Plastics, toxics, climate, oceans, corporate accountability | https://www.greenpeace.org/international/ |
| Climate Action Network International | Global climate NGO network | https://climatenetwork.org/ |
| 350.org | Fossil fuels, climate justice, movement organizing | https://350.org/ |
| Indigenous Environmental Network | Indigenous-led climate, toxics, extractives, sovereignty work | https://www.ienearth.org/ |
| Climate Justice Alliance | Frontline climate and environmental justice alliance | https://climatejusticealliance.org/ |

### Waste Picker Inclusion And Informal Recycling

| Organization | Role | URL |
|---|---|---|
| International Alliance of Waste Pickers | Global democratic union of waste picker organizations | https://wastepickersinternational.org/ |
| WIEGO | Research and policy network for informal workers, including waste pickers | https://www.wiego.org/ |
| Red LACRE | Latin American and Caribbean waste picker network | https://www.redrecicladores.net/ |
| MNCR Brazil | National movement of recyclable-material collectors | https://www.mncr.org.br/ |
| Asociacion de Recicladores de Bogota | Waste picker recognition and recycler service model | https://asociacionrecicladoresbogota.org/ |
| SWaCH Cooperative | Waste picker cooperative in Pune, India | https://swachcoop.com/ |
| KKPKP | Waste picker and informal recycler union in Pune, India | https://kkpkp-pune.org/ |
| Hasiru Dala | Waste picker inclusion and circular services in India | https://hasirudala.in/ |
| African Reclaimers Organisation | Informal reclaimer organization in South Africa | https://www.africanreclaimers.org/ |

## National And Regional Environmental Agencies

### North America

| Country | Agency | Focus | URL |
|---|---|---|---|
| United States | Environmental Protection Agency | Pollution, waste, recycling, hazardous waste, climate programs, enforcement | https://www.epa.gov/ |
| United States | NOAA | Climate, weather, ocean, atmospheric and greenhouse gas observations | https://www.noaa.gov/ |
| Canada | Environment and Climate Change Canada | Pollution prevention, climate, weather, water, enforcement | https://www.canada.ca/en/environment-climate-change.html |
| Canada | Impact Assessment Agency of Canada | Environmental and climate assessment of major projects | https://www.canada.ca/en/impact-assessment-agency.html |
| Mexico | SEMARNAT | Environment, climate, waste, hazardous materials, biodiversity | https://www.gob.mx/semarnat |
| Mexico | PROFEPA | Environmental enforcement and inspections | https://www.gob.mx/profepa |
| Mexico | INECC | Climate and ecology research, emissions, policy support | https://www.gob.mx/inecc |

### Latin America And The Caribbean

| Country / Region | Agency / Body | Focus | URL |
|---|---|---|---|
| Argentina | National environment authority | Environmental policy, climate, biodiversity, waste | https://www.argentina.gob.ar/interior/secretaria-de-turismo-ambiente-y-deportes |
| Brazil | Ministry of Environment and Climate Change | Climate, biodiversity, waste, circular economy, forests | https://www.gov.br/mma/ |
| Brazil | IBAMA | Environmental enforcement, licensing, pollution control | https://www.gov.br/ibama/ |
| Brazil | INPE | Satellite monitoring, deforestation, Earth observation | https://www.gov.br/inpe/ |
| Chile | Ministry of Environment | Climate, waste, circular economy, air quality, environmental data | https://mma.gob.cl/ |
| Chile | Environmental Superintendency | Environmental compliance and enforcement | https://portal.sma.gob.cl/ |
| Colombia | Ministry of Environment and Sustainable Development | Environment, climate, water, biodiversity, waste | https://www.minambiente.gov.co/ |
| Colombia | IDEAM | Climate, hydrology, emissions inventories, deforestation data | https://www.ideam.gov.co/ |
| Peru | Ministry of Environment | Climate, environmental quality, solid waste, data | https://www.gob.pe/minam |
| Peru | OEFA | Environmental assessment, supervision, enforcement | https://www.gob.pe/oefa |
| Ecuador | Ministry of Environment | Water, climate, biodiversity, pollution, permitting | https://www.ambiente.gob.ec/ |
| Bolivia | Ministry of Environment and Water | Water, sanitation, climate, biodiversity, waste | https://www.mmaya.gob.bo/ |
| Paraguay | MADES | Environmental regulation, climate, pollution, licensing | https://www.mades.gov.py/ |
| Uruguay | Ministry of Environment | Water, climate, waste, environmental monitoring | https://www.gub.uy/ministerio-ambiente/ |
| Costa Rica | MINAE | Climate, biodiversity, protected areas, water, energy | https://www.minae.go.cr/ |
| Panama | Ministry of Environment | Climate, EIA, forests, water, pollution control | https://www.miambiente.gob.pa/ |
| Guatemala | MARN | Climate, pollution prevention, waste, assessment | https://www.marn.gob.gt/ |
| El Salvador | MARN | Climate, environmental monitoring, waste, water | https://www.marn.gob.sv/ |
| Honduras | MiAmbiente | Climate, water, pollution, licensing | https://www.miambiente.gob.hn/ |
| Nicaragua | MARENA | Environment, biodiversity, climate, pollution | https://www.marena.gob.ni/ |
| Bahamas | Department of Environmental Planning and Protection | Permitting, pollution, waste, chemicals | https://depp.gov.bs/ |
| Barbados | Environment ministry | Waste, climate resilience, green and blue economy | https://environment.gov.bb/ |
| Belize | Department of the Environment | EIA, pollution, waste, hazardous substances | https://doe.gov.bz/ |
| Cuba | CITMA | Science, technology, environment, climate, pollution | https://www.citma.gob.cu/ |
| Dominican Republic | Ministry of Environment | Climate, protected areas, waste, pollution | https://ambiente.gob.do/ |
| Guyana | Environmental Protection Agency | Permits, EIA, pollution, compliance | https://epaguyana.org/ |
| Jamaica | National Environment and Planning Agency | Planning, permitting, pollution, enforcement | https://www.nepa.gov.jm/ |
| Trinidad and Tobago | Environmental Management Authority | Environmental clearance, pollution control, monitoring | https://www.ema.co.tt/ |
| Latin America and Caribbean | UNEP regional office / Forum of Ministers | Regional coordination | https://www.unep.org/regions/latin-america-and-caribbean |
| Central America | CCAD | Regional environmental cooperation | https://www.sica.int/ccad/ |
| Amazon Basin | Amazon Cooperation Treaty Organization | Amazon conservation, water, climate, biodiversity | https://otca.org/en/ |
| Caribbean | Caribbean Community Climate Change Centre | Regional climate data and resilience | https://www.caribbeanclimate.bz/ |

### Europe

| Country / Region | Agency / Body | Focus | URL |
|---|---|---|---|
| European Union | European Commission DG Environment | Waste, circular economy, pollution, water, biodiversity | https://environment.ec.europa.eu/ |
| European Union | DG Climate Action | Climate policy, emissions, adaptation | https://climate.ec.europa.eu/ |
| Europe | European Environment Agency | Environmental data, reporting, monitoring | https://www.eea.europa.eu/ |
| Europe | ECHA | Chemicals regulation, REACH, CLP | https://echa.europa.eu/ |
| Europe | Eurostat Environment | EU environmental statistics | https://ec.europa.eu/eurostat/web/environment |
| Europe | IMPEL | Environmental law implementation and enforcement network | https://www.impel.eu/ |
| Europe | OSPAR Commission | North-East Atlantic marine protection | https://www.ospar.org/ |
| Europe | HELCOM | Baltic Sea marine environment | https://helcom.fi/ |
| United Kingdom | DEFRA | Environment, food, rural affairs, waste policy | https://www.gov.uk/government/organisations/department-for-environment-food-rural-affairs |
| United Kingdom | Department for Energy Security and Net Zero | Climate and energy | https://www.gov.uk/government/organisations/department-for-energy-security-and-net-zero |
| England | Environment Agency | Pollution, waste, water, environmental permitting | https://www.gov.uk/government/organisations/environment-agency |
| Scotland | SEPA | Environmental regulation and monitoring | https://www.sepa.org.uk/ |
| Wales | Natural Resources Wales | Environment, natural resources, pollution | https://naturalresources.wales/ |
| Northern Ireland | NIEA / DAERA | Environmental regulation | https://www.daera-ni.gov.uk/northern-ireland-environment-agency |
| Germany | Federal Environment Ministry / German Environment Agency | Climate, waste, pollution, data | https://www.bmuv.de/en/ ; https://www.umweltbundesamt.de/en |
| France | Ecological Transition Ministry / ADEME | Climate, waste, energy, circular economy | https://www.ecologie.gouv.fr/ ; https://www.ademe.fr/en/ |
| Italy | MASE / ISPRA | Environment, energy security, monitoring | https://www.mase.gov.it/ ; https://www.isprambiente.gov.it/en |
| Spain | MITECO / AEMET | Ecological transition, climate, meteorology | https://www.miteco.gob.es/en/ ; https://www.aemet.es/en/portada |
| Ireland | Department of Environment / EPA | Climate, communications, environment regulation | https://www.gov.ie/en/organisation/department-of-the-environment-climate-and-communications/ ; https://www.epa.ie/ |
| Netherlands | Infrastructure and Water Management / ILT / RIVM | Waste, transport, water, environment, health | https://www.government.nl/ministries/ministry-of-infrastructure-and-water-management |
| Sweden | Swedish EPA / SMHI | Environmental protection and climate/weather data | https://www.naturvardsverket.se/en ; https://www.smhi.se/en |
| Finland | Ministry of Environment / SYKE | Environment and research | https://ym.fi/en/frontpage ; https://www.syke.fi/en-US |
| Norway | Environment Ministry / Norwegian Environment Agency | Climate, pollution, nature | https://www.regjeringen.no/en/dep/kld/ ; https://www.environmentagency.no/ |
| Switzerland | Federal Office for the Environment | Waste, climate, air, water, biodiversity | https://www.bafu.admin.ch/bafu/en/home.html |

### Asia And Oceania

| Country / Region | Agency / Body | Focus | URL |
|---|---|---|---|
| Asia-Pacific | UNEP Asia and the Pacific | Regional environment, pollution, climate | https://www.unep.org/regions/asia-and-pacific |
| Southeast Asia | ASEAN Environment / ASOEN | Regional climate, chemicals, waste, cities, marine pollution | https://environment.asean.org/ |
| Southeast Asia | ASEAN Specialised Meteorological Centre | Haze, fire, meteorological monitoring | http://asmc.asean.org/ |
| Pacific | SPREP | Pacific climate, waste, pollution, environment | https://www.sprep.org/ |
| South Asia | SACEP | Regional environmental cooperation | http://www.sacep.org/ |
| Central Asia | CAREC | Regional environment, climate, water knowledge hub | https://carececo.org/ |
| China | Ministry of Ecology and Environment | Pollution control, climate, standards, monitoring | https://english.mee.gov.cn/ |
| Japan | Ministry of the Environment | Waste, recycling, climate, pollution | https://www.env.go.jp/en/ |
| South Korea | Ministry of Climate, Energy and Environment | Climate, pollution, energy transition | https://eng.me.go.kr/ |
| Taiwan | Ministry of Environment | Air, water, waste, resource circulation, climate | https://www.moenv.gov.tw/en/ |
| Hong Kong | Environmental Protection Department | Pollution, waste, recycling, monitoring | https://www.epd.gov.hk/epd/english/top.html |
| India | Ministry of Environment, Forest and Climate Change | Environment, forests, climate | https://moef.gov.in/ |
| India | Central Pollution Control Board | Pollution standards, monitoring, enforcement coordination | https://cpcb.nic.in/ |
| Pakistan | Ministry of Climate Change and Environmental Coordination | Climate and environment policy | https://mocc.gov.pk/ |
| Bangladesh | Ministry of Environment / Department of Environment | Environment, climate, pollution control | https://moef.gov.bd/ ; https://doe.gov.bd/ |
| Sri Lanka | Central Environmental Authority | EIA, pollution, regulation | https://www.cea.lk/ |
| Maldives | Ministry of Climate Change, Environment and Energy | Climate, environment, energy | https://environment.gov.mv/ |
| Singapore | Ministry of Sustainability and the Environment / NEA | Sustainability, waste, pollution, meteorology | https://www.mse.gov.sg/ ; https://www.nea.gov.sg/ |
| Malaysia | Department of Environment | Pollution, hazardous substances, EIA | https://www.doe.gov.my/ |
| Thailand | Pollution Control Department | Pollution, waste, water, air quality | https://www.pcd.go.th/ |
| Philippines | DENR / Environmental Management Bureau | Environment, EIA, air, water, solid waste | https://www.denr.gov.ph/ ; https://emb.gov.ph/ |
| Indonesia | Ministry of Environment | Pollution control and environmental protection | https://lh.go.id/ |
| Vietnam | Ministry of Agriculture and Environment | Environment, natural resources, climate functions | https://mae.gov.vn/ |
| Australia | DCCEEW | Climate, energy, environment, water, waste | https://www.dcceew.gov.au/ |
| Australia | Clean Energy Regulator | Emissions reporting and carbon schemes | https://cer.gov.au/ |
| New Zealand | Ministry for the Environment | Climate, waste, environmental reporting | https://environment.govt.nz/ |
| New Zealand | Environmental Protection Authority | Hazardous substances and environmental regulation | https://www.epa.govt.nz/ |
| Fiji | Ministry of Environment and Climate Change | Environment, climate, waste | https://www.environment.gov.fj/ |
| Samoa | Ministry of Natural Resources and Environment | Climate, waste, environment, meteorology | https://www.mnre.gov.ws/ |

### Africa And Middle East

| Country / Region | Agency / Body | Focus | URL |
|---|---|---|---|
| Africa | UNEP Africa Office | Climate, chemicals, waste, governance | https://www.unep.org/regions/africa |
| Africa | African Ministerial Conference on the Environment | Continental environment policy forum | https://www.unep.org/regions/africa/amcen |
| Africa | African Union ARBE Department | Agriculture, rural development, blue economy, environment | https://au.int/en/directorates/arbe |
| South Africa | Department of Forestry, Fisheries and the Environment | Environment, climate, pollution, waste | https://www.dffe.gov.za/ |
| Nigeria | Federal Ministry of Environment | Policy, pollution control, climate, waste | https://environment.gov.ng/ |
| Nigeria | NESREA | Environmental standards and enforcement | https://nesrea.gov.ng/ |
| Kenya | National Environment Management Authority | Environmental regulation and compliance | https://nema.go.ke/ |
| Ghana | Environmental Protection Authority | Permits, pollution monitoring, regulation | https://epa.gov.gh/ |
| Rwanda | Ministry of Environment / REMA | Environment policy, pollution control, climate | https://www.environment.gov.rw/ ; https://www.rema.gov.rw/ |
| Uganda | National Environment Management Authority | Environmental regulation | https://www.nema.go.ug/ |
| Tanzania | National Environment Management Council | EIA, enforcement, monitoring | https://www.nemc.or.tz/ |
| Zambia | Zambia Environmental Management Agency | Licensing and pollution control | https://www.zema.org.zm/ |
| Egypt | Ministry of Environment / EEAA | Air, waste, climate, EIA, monitoring | https://www.eeaa.gov.eg/ |
| Morocco | Ministry of Energy Transition and Sustainable Development | Environment and climate | https://www.mtedd.gov.ma/ |
| Tunisia | National Environmental Protection Agency | Pollution prevention | https://www.anpe.nat.tn/ |
| Ethiopia | Environmental Protection Authority | Environmental regulation | https://www.epa.gov.et/ |
| Senegal | Ministry of Environment and Ecological Transition | Environment, pollution, climate | https://www.environnement.gouv.sn/ |
| West Asia | UNEP West Asia Office | Climate, pollution, waste, governance | https://www.unep.org/regions/west-asia |
| Saudi Arabia | Ministry of Environment, Water and Agriculture | Environment, water, agriculture | https://www.mewa.gov.sa/en/ |
| Saudi Arabia | National Center for Environmental Compliance | Permits, inspections, compliance | https://ncec.gov.sa/ |
| UAE | Ministry of Climate Change and Environment | Climate, environment, biodiversity | https://www.moccae.gov.ae/ |
| UAE | Environment Agency - Abu Dhabi | Air, groundwater, biodiversity, waste knowledge | https://www.ead.gov.ae/ |
| Qatar | Ministry of Environment and Climate Change | Climate, air quality, inspection | https://www.mecc.gov.qa/ |
| Oman | Environment Authority | Permits, climate, waste registry, air quality | https://www.ea.gov.om/ |
| Bahrain | Supreme Council for Environment | Environmental policy and regulation | https://www.sce.gov.bh/ |
| Kuwait | Environment Public Authority | Monitoring and enforcement | https://epa.org.kw/ |
| Jordan | Ministry of Environment | Climate, compliance, environmental policy | https://www.moenv.gov.jo/ |
| Israel | Ministry of Environmental Protection | Pollution, waste, climate | https://www.gov.il/en/departments/ministry_of_environmental_protection |
| Lebanon | Ministry of Environment | Waste, pollution, environmental policy | https://www.moe.gov.lb/ |
| Iran | Department of Environment | Biodiversity, pollution, environmental protection | https://www.doe.ir/ |
| Turkiye | Ministry of Environment, Urbanization and Climate Change | Climate, EIA, waste, environment | https://csb.gov.tr/ |

## Priority Website Architecture For lettucebeetgrapefruit.org

- Build the directory as a searchable public index, not a static article.
- Give each organization one profile page with source links, category tags, geography, and datasets.
- Separate verified official sources from community-submitted projects.
- Add a school action layer: audits, waste-sorting plans, compost projects, repair days, reuse drives, and student research.
- Add a "why trash exists" learning path:
  1. Extraction
  2. Design and packaging
  3. Consumption
  4. Collection
  5. Sorting
  6. Recycling limits
  7. Compost and organics
  8. Landfills, incineration, dumping
  9. Policy, producer responsibility, and circular redesign
- Add country pages that combine government agencies, laws, datasets, NGOs, schools, and local projects.
- Add data provenance: every number, map, and claim should point back to its original source.

## First Ingestion Priorities

Start with these sources because they create the backbone for the world directory:

- UNEP Global Waste Management Outlook
- World Bank What a Waste
- Basel Convention
- UNFCCC national inventory and NDC registries
- UN SDG indicators
- NASA Earthdata and ARSET
- NOAA climate and atmospheric data
- Copernicus Atmosphere and Climate services
- OECD municipal waste data
- UN-Habitat Waste Wise Cities
- UNITAR / ITU Global E-waste Monitor
- Eco-Schools
- Break Free From Plastic
- GAIA
- International Alliance of Waste Pickers
- Ellen MacArthur Foundation
- OpenAQ
- Climate TRACE
- Environmental Justice Atlas

## Verification Rules

- Prefer official government, treaty, UN, university, or organization domains.
- Mark social-media-only organizations as "needs review" unless no official website exists.
- Keep local school and community groups in a separate community-submitted layer until verified.
- Review national agency names every six months because ministries change names often.
- Archive dead links instead of deleting entries so students can see institutional history.
- Record who submitted each community entry and what evidence supports it.

## Sources Consulted

- UNEP Global Waste Management Outlook: https://www.unep.org/resources/global-waste-management-outlook-2024
- World Bank What a Waste: https://www.worldbank.org/en/publication/what-a-waste
- OECD Municipal Waste: https://www.oecd.org/en/data/indicators/municipal-waste.html
- UNFCCC: https://unfccc.int/
- NASA Earthdata: https://www.earthdata.nasa.gov/
- NASA ARSET: https://www.earthdata.nasa.gov/data/projects/arset
- Eco-Schools: https://www.ecoschools.global/
- Additional official organization pages listed throughout this directory.
