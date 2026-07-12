# RECYCLOPEDIA ACADEMY — WHITE PAPER SERIES
## Three-Volume Draft | June 2026
### Absolutely Plausible Solutions | recyclopedia.cc

> **Status:** DRAFT 1.3 — Internal Review Only. Not for public distribution.
> **Author:** Recyclopedia Academy | Absolutely Plausible Solutions
> **Changelog v1.3:** Global MSW figures updated to UNEP/ISWA Global Waste Management Outlook 2024 (2.1B tonnes 2023 → 3.8B by 2050; direct costs USD 252B 2020 → USD 640.3B 2050). World Bank 2018 baseline retained as historical reference. Global MSW tonnage flag resolved.
> **Changelog v1.2:** Brazil section fully updated with ABREMA Panorama 2024 (base year 2023) verified data. Catadores figure corrected and sourced. Composting rate corrected. Lixões percentage locked. BRL tipping fee range added. Institutional note on ABRELPE → ABREMA transition. Appendix A: Complete Acronym Index / Glossary added.
> **Flags resolved through v1.3 are marked** ✅ **| Remaining open items marked** ⚠️

---
---

# VOLUME I: UNITED STATES

## Smart Sorting for the American Citizen
### A Mobile-First Framework for Organic Waste Diversion and PHA Bioplastic Recovery

**Issued by:** Recyclopedia Academy | Absolutely Plausible Solutions
**Date:** July 2026 | **Version:** Draft 1.3

---

### EXECUTIVE SUMMARY

The United States generates approximately 292 million tons of MSW annually. Nearly half goes to landfills. Less than 10% is composted. The emergence of PHA (Polyhydroxyalkanoate) bioplastics — certified compostable materials that biodegrade into nutrient-rich soil under industrial composting conditions — presents a critical inflection point in how America manages its packaging waste.

The barrier is not technology. It is knowledge.

Recyclopedia Academy proposes a mobile-first, open-source educational platform that transforms everyday American citizens into frontline agents of the circular economy. By equipping smartphone users with the visual literacy to distinguish certified compostable packaging from petroleum-based look-alikes, the Academy directly reduces organic waste stream contamination — one of the most costly and preventable failures in modern American waste management.

This white paper outlines the problem, the regulatory context, the technical solution, and the policy levers that can position Recyclopedia Academy as a national public infrastructure asset.

---

### 1. THE PROBLEM: A CONTAMINATED STREAM

#### 1.1 Scale of the Crisis

The United States MSW system processes over **292 million tons annually** (EPA, 2018 data; most recent comprehensive survey). Of this volume:

- Approximately **146 million tons** are landfill-disposed
- **Less than 10%** of food scraps and organic material are composted
- Organic materials — food waste, yard trimmings, compostable packaging — represent more than **30% of the total landfill stream**

When organic materials decompose anaerobically inside sealed landfill capsules, they generate methane — a greenhouse gas approximately **28 times more potent than CO₂ over a 100-year window** (IPCC AR5, 100-year GWP; approximately 84 times more potent over the critical 20-year window). Landfill gas is the third-largest source of human-related methane emissions in the United States.

#### 1.2 The Contamination Problem

A growing number of American brands have adopted BPI-certified compostable packaging, including PHA-based materials. But sorting infrastructure and consumer education lag far behind material innovation. The result: compostable packaging routinely enters petroleum plastic recycling streams, and petroleum plastic routinely enters composting streams — rendering entire processing batches unrecoverable.

A single contamination event at an industrial composting facility can force the disposal of thousands of tons of otherwise recoverable organic soil amendments. The financial and environmental cost is asymmetric: one wrong item can destroy an entire processing lot.

#### 1.3 The Knowledge Gap

Consumer surveys consistently reveal deep confusion at the point of disposal. Labels like "100% Recyclable," green arrow loops, and generic leaf symbols carry no standardized legal definition in the United States. Citizens navigate a fragmented, locally variable sorting system with no accessible, real-time guidance tool — and with packaging designed to exploit rather than resolve that confusion.

---

### 2. HISTORICAL AND REGULATORY CONTEXT

#### 2.1 From Ancient Refuse Pits to RCRA

Human waste management has evolved from the rudimentary refuse pits of ancient Mediterranean civilizations to the highly engineered systems of today. The modern American landfill traces directly to the work of **Jean Vincenz**, Fresno, California's Public Works Commissioner, who in 1935 pioneered the sanitary trench method: compressing refuse into thin layers and sealing it daily under compacted soil. This innovation eliminated the open-dump public health catastrophe — pest infestations, toxic fires, contaminated wells — that had plagued American cities during the industrial era. By **1959**, the ASCE had codified Vincenz's method into formal municipal engineering guidelines, establishing the sanitary landfill as the national infrastructure standard. ⚠️ *[Fresno date: All internal documents consistently cite 1935. Some external sources date formal operational deployment to 1937. One verification against ASCE historical records recommended before final publication.]*

A second critical inflection point came in **1969**, when the NYC Department of Sanitation — building on commercial innovations from Union Carbide (the GLAD brand) — authorized high-tensile, LDPE bags for curbside garbage collection. The operational gains were immediate: collection speed increased dramatically and workers gained protection from sharp debris and bacterial exposure. The ecological cost, however, proved generational. Oxygen-depleted landfill environments preserve these petroleum-based polymers for centuries, creating a permanent microplastic legacy that persists in soils and waterways today — and that PHA bioplastic diversion is specifically designed to replace at the source.

By 1976, the proliferation of synthetic petroleum plastics made a stronger federal mandate essential. The **RCRA** permanently outlawed open dumps and established the modern framework of composite liner systems, leachate collection networks, and methane extraction infrastructure that governs American landfills today.

RCRA's Subtitle D remains the operational backbone of American solid waste management. It was written before PHA bioplastics existed.

#### 2.2 The Regulatory Gap

Current federal law does not mandate consumer-facing education on compostable material sorting. State-level composting legislation is fragmented and inconsistent. BPI certification provides a credible voluntary standard, but without citizen literacy, certification marks are invisible at the bin.

There is no federal analog to the regulatory clarity provided by RCRA for landfills — applied to the citizen's sorting decision. Recyclopedia Academy proposes to fill that gap in the only place it can be filled: at the point of disposal, on the device already in every citizen's hand.

---

### 3. THE RECYCLOPEDIA ACADEMY SOLUTION

#### 3.1 The Platform Architecture

Recyclopedia Academy is built on a static, mobile-first, zero-dependency open-source stack:

```
[ GitHub Repository (Markdown + JSON) ]
        ↓
[ Static Site Generator — Astro / Hugo / Docusaurus ]
        ↓
[ Cloudflare Edge Pages — Global CDN, sub-2-second load ]
        ↓
[ Citizen's Smartphone — Any Device, Any Carrier ]
```

The platform is engineered to load in under two seconds on a 3G connection. No login required. No app download. No data collected. Accessible to any American citizen at any income level on any carrier.

#### 3.2 The Curriculum

**Track 1: Citizen Science & Action (Free / Public Access)**
- Module 1.1: The Hidden History of Your Trash
- Module 1.2: The Smartphone Sorting Guide

**Track 2: System Architecture & Logistics (Advanced)**
- Module 2.1: Modern Sanitary Engineering — 1935 to RCRA
- Module 2.2: Industrial PHA Diversion & Sorting Workflows

The core citizen curriculum delivers a single, actionable decision tree:

```
[ UNKNOWN PACKAGING ITEM ]
            │
            ▼
   Look for GREEN STRIPE or PHA / BPI stamp
    ├──► FOUND: Organics / Compost Bin
    └──► NOT FOUND: Black Regular Trash Bin
```

**The Golden Law:** "If in doubt, throw it out into the regular trash."

Sending an unidentified item to the trash bin is safer than contaminating an organic composting stream. One piece of petroleum plastic can force the disposal of a multi-ton composting lot. The Academy teaches citizens to be fast, accurate, and confident — not to guess.

#### 3.3 The Open-Source Imperative

Every module, quiz block, and code component in the Recyclopedia stack is open-source and zero-vendor-lock-in by architecture. This allows municipal governments, school districts, waste haulers, composting facilities, and community organizations to self-host, translate, and adapt the curriculum without licensing fees or proprietary dependencies — at zero marginal cost per additional user.

#### 3.4 The Quiz Engine

The platform's interactive learning layer runs on a pure Vanilla ES6+ JavaScript class (`RecyclopediaQuiz`) with zero external dependencies. It loads instantly on low-bandwidth connections, renders dynamic quiz blocks from structured JSON files, and provides immediate explanatory feedback on each answer — a learning science principle (elaborative feedback) that measurably improves retention over simple right/wrong responses.

---

### 4. FINANCIAL CASE

The following analysis is drawn from the Recyclopedia Academy internal Financial Cost-Benefit Analysis (CBA), modeled on a mid-sized US municipality processing **100,000 tons of MSW annually** with a **20% organic diversion target** (20,000 tons). ⚠️ *[Tipping fee assumptions — $75/ton landfill, $51/ton composting — should be validated against current BioCycle State of Garbage survey or EPA Advancing Sustainable Materials Management data before formal submission.]*

**Capital Expenditures — One-Time Investment**

| Item | Cost |
|---|---|
| NIR Optical Sorting Upgrade | $350,000 |
| Curbside Green Bin Rollout — 20,000 households @ $30/bin | $600,000 |
| Public Education Launch | $100,000 |
| **Total CapEx** | **$1,050,000** |

**Annual Operating Costs**

| Item | Annual Cost |
|---|---|
| Dedicated Organic Collection Routing (fuel, labor, fleet) | $150,000 |
| Contamination Processing Fees (secondary sorting + residue disposal) | $50,000 |
| **Total Annual OpEx** | **$200,000** |

**Annual Financial Benefits**

| Item | Annual Value |
|---|---|
| Landfill Tipping Fee Avoidance (20,000 tons @ $75/ton) | +$1,500,000 |
| Industrial Composting Tipping Fee (20,000 tons @ $51/ton) | −$1,020,000 |
| **Net Tipping Fee Arbitrage** | **+$480,000** |
| Landfill Asset Life Extension (preserved airspace value) | +$90,000 |
| Compost Commodity Sales (~2,000 tons @ $25/ton) | +$50,000 |
| **Gross Annual Benefit** | **+$620,000** |

**Net Financial Summary**

| Metric | Value |
|---|---|
| Gross Annual Benefit | $620,000 |
| Total Annual OpEx | −$200,000 |
| **Net Annual Benefit** | **$420,000/year** |
| **Net Benefit Per Ton Diverted** | **$21.00/ton** |
| **CapEx Payback Period** | **2.5 years** |

> **Internal note — resolved in v1.1:** Two figures appear in source documents — $18.50/ton and $21.00/ton. Both derive from the same model. $18.50 excludes compost commodity sales revenue ($50K/year); $21.00 includes all revenue streams. **Adopted position:** $21.00/ton primary figure; $18.50/ton footnoted as conservative floor.

Even at conservative adoption — capturing 5% of the approximately **80 million tons** of organic material currently landfilled annually — a $21/ton verified diversion benefit represents a potential **$84 million annual national value stream**, net of operational costs.

Recyclopedia Academy's platform infrastructure eliminates the $100,000 public education CapEx line in the above model for every municipality that adopts the open-source curriculum, directly reducing municipal investment required and shortening the payback window.

---

### 5. POLICY RECOMMENDATIONS

1. **Federal EPA Partnership:** Pursue EPA recognition of the Recyclopedia Academy framework as a compliant public education instrument under RCRA Subtitle D outreach provisions.

2. **State Pilot Targeting:** Prioritize deployment in states with existing organic waste mandates — California SB 1383, Massachusetts Organic Waste Ban, Vermont Universal Recycling Law.

3. **BPI Packaging Integration:** Work with BPI to embed Recyclopedia Academy sorting guides via QR codes printed directly on certified compostable packaging at point of manufacture.

4. **K–12 STEM Integration:** Adapt Track 1 modules for standard K–12 science curricula, leveraging NGSS environmental literacy benchmarks.

5. **Civic Data Layer:** Instrument quiz completion events — privacy-preserving, aggregated, zip-code level — to generate consumer literacy heatmaps for municipal waste planners.

---

### 6. CONCLUSION

The American waste management system is a marvel of 20th-century engineering — and a structural mismatch for 21st-century materials. The barrier between a contaminated landfill and a functional circular economy is not infrastructure. It is informed human behavior at the moment of disposal.

Recyclopedia Academy is built on the conviction that a citizen armed with a smartphone and thirty minutes of open-access education is the most cost-effective sorting technology ever deployed. The content is developed. The architecture is production-ready. The policy window is open.

The question is not whether Americans can sort correctly. The question is whether they have ever been given the tools to do so.

---
---

# VOLUME II: BRASIL

## Da Lixeira ao Solo Vivo
### Recyclopedia Academy e a Economia Circular Brasileira

**From the Dumpster to Living Soil: Recyclopedia Academy and the Brazilian Circular Economy**

**Issued by:** Recyclopedia Academy | Absolutely Plausible Solutions
**Date:** Julho / July 2026 | **Version:** Draft 1.3

> *Nota: Este documento foi redigido em inglês para revisão interna. A versão em Português Brasileiro (PT-BR) está em produção como documento primário.*
> *Note: This document was drafted in English for internal review. The Brazilian Portuguese (PT-BR) version is in production as the primary public document.*

> **Institutional note:** The Panorama dos Resíduos Sólidos no Brasil — Brazil's authoritative annual solid waste survey — was published for 20 years by **ABRELPE** (Associação Brasileira de Empresas de Limpeza Pública e Resíduos Especiais). In 2023, ABRELPE merged with Abetre, Selur, and Selurb to form **ABREMA** (Associação Brasileira de Resíduos e Meio Ambiente). All data cited below from the 2024 edition of the Panorama is attributed to ABREMA. Historical citations remain attributed to ABRELPE.

---

### EXECUTIVE SUMMARY

Brazil generated **81 million tons** of RSU in 2023 — approximately 1,047 kg per inhabitant per day. Of this total, only **58.5%** received environmentally adequate final destination. **41.5%** was disposed of inadequately, with **35.5%** going directly to lixões (open dumps) that remain illegal under the PNRS (Lei 12.305/2010) but persist across thousands of Brazilian municipalities. Only **0.4% of RSU** reached composting facilities — approximately 300,000 tons, resulting in 85,500 tons of finished compost.

*(Source: ABREMA, Panorama dos Resíduos Sólidos no Brasil 2024, base year 2023)*

Brazil also holds one of the world's most significant structural advantages for the circular economy: a world-class sugarcane and industrial fermentation sector that positions the country as a potential global leader in bio-based material production and organic waste diversion. Brazilian companies already produce commercial-scale bio-based polymers; the national feedstock base for PHA bioplastic synthesis is among the most favorable on earth.

The gap between Brazil's waste reality and its circular economy potential is not technological. It is educational — and specifically, it is a mobile education gap in a country where smartphone penetration exceeds 85% of the adult population.

Recyclopedia Academy's open-source, mobile-first, multilingual framework is built to close this gap — starting in Portuguese, meeting Brazilian citizens where they already are: on their smartphones, in WhatsApp groups, and in communities where informal waste pickers (catadores) provide the backbone of the national recycling chain.

---

### 1. O PROBLEMA / THE PROBLEM

#### 1.1 Solid Waste in Brazil — Verified 2023 Data

The following figures are drawn from the **ABREMA Panorama dos Resíduos Sólidos no Brasil 2024** (base year 2023) and the **IBGE MUNIC 2023** survey. ✅ *[Flag closed: Brazil MSW tonnage and breakdown now sourced and locked.]*

| Indicator | Value | Source |
|---|---|---|
| Total RSU generated | **81 million tons/year** | ABREMA Panorama 2024 |
| RSU per capita | **1,047 kg/inhabitant/day** | ABREMA Panorama 2024 |
| RSU collected | **75.6 million tons** (93.4% of generated) | ABREMA Panorama 2024 |
| Adequate final destination | **58.5%** of generated RSU | ABREMA Panorama 2024 |
| Inadequate final destination | **41.5%** of generated RSU | ABREMA Panorama 2024 |
| — of which: lixões (open dumps) | **35.5%** of generated RSU | ABREMA Panorama 2024 |
| Formal composting | **0.4%** of RSU (~300,000 tons → 85,500 tons compost) | ABREMA Panorama 2024 |
| Recycling (dry materials) | **8%** of adequately destined dry waste (6.7M tons) | ABREMA Panorama 2024 |
| Informal catadores' share of recycling | **67.2%** of formal recycling chain | ABREMA Panorama 2024 |
| Annual municipal MSW spending | **R$ 34.7 billion** (public) / R$ 37 billion (public + private) | ABREMA Panorama 2024 |
| Southeast region share | **49.3%** of total RSU (~40 million tons) | ABREMA Panorama 2024 |

**Regional breakdown of lixão persistence (IBGE MUNIC 2023):**

| Region | Municipalities still using lixões |
|---|---|
| Norte | 73.8% |
| Nordeste | 51.6% |
| Centro-Oeste | 52.9% |
| Sudeste | 12.1% |
| Sul | 5.7% |
| **National average** | **31.9%** |

The data reveals a country structurally divided: the Southeast (São Paulo, Rio de Janeiro, Minas Gerais) has largely transitioned to formal landfills, while the North and Northeast remain heavily dependent on illegal lixões — despite the PNRS having set lixão closure deadlines as far back as 2014. As of 2026, no deadline has been met.

#### 1.2 The PNRS Gap

The **Lei 12.305/2010 — Política Nacional de Resíduos Sólidos (PNRS)** was landmark legislation that:

- Established **shared responsibility** (responsabilidade compartilhada) across the full production and consumption chain
- Set binding deadlines for closure of all lixões — repeated extensions have been granted; enforcement remains structurally incomplete as of 2026
- Created the legal framework for reverse logistics (logística reversa) and composting infrastructure
- Formally recognized catadores and their cooperatives as essential actors in the national waste system (Art. 8, XI)
- Required municipalities to develop PGIRS — Planos de Gestão Integrada de Resíduos Sólidos
- Mandated environmental education as a core policy instrument (Art. 8, IX)

Sixteen years after passage: the lixão closure mandate has not been met; composting reaches 0.4% of RSU; and citizen-facing sorting education remains fragmented and inconsistently funded at the municipal level. The PNRS mandates the action. Recyclopedia Academy provides the interface.

#### 1.3 The Catador Network — Corrected and Sourced Data

Brazil's informal waste picker workforce is its most significant and under-recognized circular economy asset — and the most cited figure in this space requires correction.

✅ *[Flag closed: Catadores figure corrected from "~1 million" to verified data below.]*

| Metric | Value | Source |
|---|---|---|
| Officially counted catadores (IBGE/PNAD Contínua) | **281,000+** | WIEGO Statistical Brief No. 29; IBGE |
| Estimated total including undercounted informal workers | **400,000–1,000,000** | MNCR advocacy estimates; varies by methodology |
| Urban concentration | **94%** operating in urban areas | Circle Economy / WIEGO 2024 |
| Gender breakdown | **70% male, 30% female** | WIEGO 2024 |
| Share organized in cooperatives | **~15%** | Circle Economy 2024 |
| MNCR-represented cooperatives/associations | **800+** representing 70,000+ members | MNCR / Circulate Initiative 2026 |
| Share of Brazil's formal recycling chain | **67.2%** of all recycled materials | ABREMA Panorama 2024 |
| Aluminium can recycling rate (catador-driven) | **97%** | ABREMA / Circle Economy 2024 |

**Why the discrepancy matters:** The "1 million catadores" figure frequently cited in advocacy materials (including MNCR's own communications) reflects broader estimates that include unregistered autonomous workers and seasonal pickers not captured in IBGE surveys. For formal white paper submissions, the IBGE-based 281,000+ figure with a transparent methodology note is the appropriate citation. Both figures illustrate the same structural reality: Brazil's recycling infrastructure is disproportionately dependent on informal workers who receive no formal environmental education, no equipment support, and no stable income guarantee — making them the highest-priority audience for Recyclopedia Academy's sorting education content.

Any credible citizen waste education program in Brazil must:
- Partner with, not compete against, catador cooperative networks (MNCR, ANCAT, Unicatadores)
- Produce materials accessible to workers with varying formal literacy levels
- Be deployable on low-cost Android devices under limited mobile data plans
- Reflect Brazilian packaging conventions, not US or European defaults

Recyclopedia Academy's mobile-first, low-bandwidth, open-license architecture was designed for exactly this context.

---

### 2. BRAZIL'S BIOPLASTICS ADVANTAGE

Brazil's sugarcane ethanol and industrial fermentation sector produces renewable feedstocks — including fermentable sugars and bio-based oils — ideal for PHA bioplastic synthesis. Brazilian industrial capacity for biopolymer production exists at commercial scale. As PHA adoption grows in Brazilian consumer markets — driven by EU packaging regulations affecting Brazilian exports and growing domestic sustainability mandates — the citizen knowledge gap at the sorting bin will widen unless education scales in parallel.

A citizen who cannot distinguish a PHA-certified cup from a conventional PET cup cannot route it correctly, regardless of how sophisticated the composting facility at the other end of the chain may be. The weakest link in the circular economy chain is the 3-second decision at the bin. Recyclopedia Academy addresses that link directly.

For all formal submissions, PHA is correctly characterized as a **bio-based, biodegradable polymer** — synthesized by microorganisms from renewable feedstocks including sugarcane derivatives, corn, bio-based oils, and organic waste streams. The precise regulatory framing under ABNT and ISO standards is: *"bio-based and biodegradable under industrial composting conditions at 140°F / 60°C or above, within 90 days."*

---

### 3. RECYCLOPEDIA ACADEMY — ESTRUTURA BRASILEIRA / BRAZILIAN FRAMEWORK

#### 3.1 Português-First Content Architecture

All Recyclopedia Academy Track 1 modules for the Brazilian market will be produced in **Brazilian Portuguese (PT-BR) as primary content** — not as translations of English originals. Language, idioms, sorting icons, and regulatory citations will reflect Brazilian packaging conventions, ANVISA standards, and municipal waste system realities.

#### 3.2 Multilingual Matrix — Brazil as PT Hub

| Language | Primary Region | Status |
|---|---|---|
| English (EN) | United States | Production |
| Português (PT-BR) | Brasil | In Development |
| Español (ES) | América Latina | Planned |
| Français (FR) | West Africa / Haiti | Planned |

#### 3.3 Alignment with PNRS Mandates

| PNRS Requirement | Recyclopedia Academy Response |
|---|---|
| Responsabilidade compartilhada no descarte | Module 1.2: Visual PHA identification at point of disposal |
| Encerramento de lixões | Module 2.1: Engineering context for community advocates |
| Infraestrutura de compostagem | Module 2.2: Industrial organic routing workflows |
| Inclusão dos catadores (Art. 8, XI) | Track 1 designed for cooperative training; accessible visual formats |
| Educação ambiental (Art. 8, IX) | Full curriculum fulfills PNRS Art. 8 education mandate |

#### 3.4 Infrastructure Notes for Brazilian Deployment

- **Hosting:** Cloudflare's São Paulo edge node (GRU) — sub-50ms load times for most Brazilian urban users
- **Connectivity:** Static architecture functional on 3G; PWA offline layer planned for catadores and rural/interior users with intermittent connectivity
- **Funding:** BNDES Fundo Clima; FNMA grants; Pix-enabled micro-donation layer for cooperative networks
- **Device Profile:** Primary target: low-cost Android on prepaid mobile data

---

### 4. FINANCIAL CASE FOR BRAZIL

#### 4.1 Structural Framework

The US-market CBA (Volume I, Section 4) establishes the analytical model. The structural arbitrage logic — composting tipping fees are lower than landfill disposal costs — holds across waste markets. The specific figures require Brazilian market calibration.

#### 4.2 Brazilian Tipping Fee Data — Verified

✅ *[Flag partially closed: BRL tipping fee range now sourced from Brazilian market data.]*

| Disposal Method | Cost Range | Source / Notes |
|---|---|---|
| Sanitary landfill (aterro sanitário) — operational cost | **R$ 90–160/ton** | Agrolink / BNDES FGV analysis; varies by scale and region |
| Concession-operated landfill (Santa Catarina benchmark) | **R$ 306–320/ton** (includes collection + transport) | DW Brasil / Saneamento Básico reporting 2022 |
| Itápolis, SP (2021 benchmark) | **R$ 152/ton** (R$ 105 aterramento + R$ 47 transport) | Municipal contract data |
| Total municipal RSU management cost | **R$ 34.7 billion/year** (public sector) | ABREMA Panorama 2024 |

> ⚠️ *[Composting tipping fees: Benchmark data from Brazilian ICF operators is still required. No published national standard exists for composting facility gate fees. Recommend direct outreach to Curitiba and São Paulo composting facilities for current fee schedules before committing to BRL CBA model figures.]*

#### 4.3 Brazilian Market Adaptation Variables

| Variable | Brazilian Context | Status |
|---|---|---|
| Landfill tipping cost | R$ 90–160/ton (operational); full-service R$ 152–320/ton | ✅ Sourced |
| Composting tipping cost | To be benchmarked from ICF operators | ⚠️ Pending |
| Compost product revenue | Growing agribusiness market; no standardized gate price | ⚠️ Pending |
| Carbon credits (SBCE) | Monetizable methane offset channel; market rate to be verified | ⚠️ Pending |
| Catador cooperative income extension | New composting supply chain revenue stream for cooperatives | Qualitative |
| Education CapEx offset | Recyclopedia Academy eliminates per-municipality education production cost | ✅ Confirmed |

#### 4.4 Scale of Opportunity

Brazil spends **R$ 34.7 billion per year** on municipal solid waste management. Of the 81 million tons generated, only 0.4% (300,000 tons) is composted. A 5% diversion of organic RSU to composting — approximately 4 million tons — at even a conservative Brazilian cost-benefit differential would represent a transformation in both environmental outcomes and municipal fiscal efficiency.

The 0.4% composting rate is not a materials failure. It is an education and infrastructure failure. The materials exist. The composting technology exists. The catador networks exist. What is absent is a low-cost, mobile-first system that teaches citizens the one decision that unlocks the entire chain.

---

### 5. RECOMENDAÇÕES DE POLÍTICA / POLICY RECOMMENDATIONS

1. **Alinhamento com o MMA:** Submit the Academy curriculum for review by the Ministério do Meio Ambiente e Mudança Climática as a compliant public education instrument under PNRS Art. 8 (IX) — Educação Ambiental.

2. **Parceria com o MNCR/ANCAT:** Establish a formal partnership with the MNCR and ANCAT to integrate Track 1 modules into cooperative training programs across 800+ cooperatives — providing catadores with the sorting education tools to add PHA composting streams to their operational scope.

3. **Municípios Piloto:** Target Curitiba (national waste management leadership, existing composting infrastructure) and São Paulo (largest catador cooperative network, existing selective collection programs) for initial Academy deployment pilots.

4. **Financiamento BNDES:** Develop a grant application aligned with BNDES Fundo Clima — framing the Academy as citizen-facing digital infrastructure for the PNRS education gap.

5. **Integração Escolar via BNCC:** Adapt Track 1 for the BNCC environmental education competencies in Ciências da Natureza — deployment pathway into ~40 million Brazilian public school students.

6. **COP30 Positioning:** The 2025 ABREMA Panorama explicitly links the waste sector to Brazil's COP30 commitments. Recyclopedia Academy's launch in Q3 2026 positions it as a tangible post-COP30 citizen action tool in the country that hosted the conference.

---

### 6. CONCLUSION

Brazil is simultaneously a microcosm of the global waste crisis and one of the world's most uniquely positioned laboratories for its solution. The catador network — 281,000 officially, potentially one million in reality — proves that organized citizen action can power industrial-scale material recovery without heavy institutional infrastructure. Brazil's bioplastics feedstock advantage proves that the materials science for a circular economy is commercially available. And the PNRS of 2010 proves that the political will to legislate the transition has existed for sixteen years.

What is missing is the knowledge bridge — between the PHA stamp on a cup at a food court in São Paulo and the citizen's hand directing that cup to a composting bin instead of a lixão.

Recyclopedia Academy builds that bridge. In Portuguese. On a 3G connection. For free.

**O futuro da reciclagem no Brasil começa no bolso de cada cidadão.**
*The future of recycling in Brazil begins in every citizen's pocket.*

---
---

# VOLUME III: GLOBAL FRAMEWORK

## One Phone, One Planet
### Recyclopedia Academy as Open-Source Global Waste Intelligence Infrastructure

**Issued by:** Recyclopedia Academy | Absolutely Plausible Solutions
**Date:** July 2026 | **Version:** Draft 1.3

---

### EXECUTIVE SUMMARY

The world generates approximately **2.1 billion tonnes** of MSW annually (UNEP/ISWA, *Global Waste Management Outlook 2024*, base year 2023; the World Bank's *What a Waste 2.0* 2018 baseline of 2.01 billion tons remains the historical reference). By 2050, that figure is projected to reach **3.8 billion tonnes** — driven primarily by population growth and rising consumption in the Global South: precisely the regions with the least composting infrastructure and the highest mobile internet penetration relative to fixed broadband. UNEP estimates direct waste-management costs at **USD 252 billion in 2020**, rising to **USD 640.3 billion by 2050** without urgent action.

The global waste crisis is not, at its root, an engineering problem. The technologies for sorting, composting, and bio-based material production exist. The fundamental barrier is a **knowledge distribution problem** — and the most powerful knowledge distribution network ever built is already in billions of pockets worldwide.

Recyclopedia Academy is designed from first principles as global infrastructure. Its open-source architecture, zero-dependency mobile interface, multilingual content matrix, and git-driven modular structure allow any municipality, cooperative, NGO, or school system anywhere in the world to deploy, adapt, and extend the platform without cost, proprietary lock-in, or technical gatekeepers.

The platform does not ask governments to fund it. It asks them to get out of the way.

---

### 1. THE GLOBAL WASTE LANDSCAPE

#### 1.1 Scale

- **2.1 billion tonnes** of MSW generated globally per year (UNEP/ISWA GWMO 2024, base year 2023; World Bank 2018 baseline: 2.01 billion tons)
- Direct waste-management costs of **USD 252 billion** in 2020, projected to reach **USD 640.3 billion by 2050** without urgent action (GWMO 2024)
- Only **33%** managed in environmentally safe ways
- An estimated **91%** of all plastic waste has never been recycled (Geyer et al., *Science Advances*, 2017)
- High-income countries generate 34% of global waste while representing only 16% of the global population
- Low- and middle-income countries will account for **70% of all global waste growth by 2050**

#### 1.2 The Mobile-First Reality

In Sub-Saharan Africa, Southeast Asia, Latin America, and South Asia:
- Mobile internet penetration exceeds fixed broadband by 5:1 or greater
- First-time internet users are overwhelmingly smartphone users
- Community knowledge sharing happens primarily through WhatsApp, Telegram, and regional social networks

Any global waste education platform that is not mobile-first, low-bandwidth, and offline-capable is not, in practice, a global platform.

#### 1.3 The Regulatory Vacuum

Despite 196 nations having signed the Basel Convention and ongoing negotiations toward a Global Plastics Treaty (INC process, 2022–ongoing), no binding international framework yet mandates citizen-facing waste sorting education or standardized compostable packaging labeling.

⚠️ *[Treaty status: The INC-5 Busan session (November 2024) did not produce a final treaty text. Negotiations are continuing as of mid-2026. Update this section as the INC process moves forward.]*

---

### 2. THE RECYCLOPEDIA GLOBAL ARCHITECTURE

#### 2.1 Technical Stack — Built for the Edge of the Network

```
[ GitHub Repository — Markdown + JSON Content ]
                ↓
[ Static Site Generator — Astro / Docusaurus / Hugo ]
                ↓
[ Cloudflare Edge Pages — 300+ Global PoPs ]
                ↓
[ Citizen's Smartphone — 3G Connection — 2-Second Load ]
```

Zero marginal cost per additional user. No central database. No vendor SLAs. The platform scales from one user to one billion users on infrastructure that costs less per month than a municipal government's printing budget.

#### 2.2 Multilingual Content Matrix

| Language | Primary Region | Content Status |
|---|---|---|
| English (EN) | United States, Global NGO sector | Production |
| Português (PT-BR) | Brazil, CPLP nations | In Development |
| Español (ES) | Latin America, US Hispanic communities | Planned |
| Français (FR) | West Africa, Haiti, Francophone communities | Planned |

#### 2.3 The Modular Curriculum as Open Infrastructure

Every Academy module is published under CC BY-SA 4.0 or equivalent. In practice:
- A school district in Lagos can fork Module 1.2 for Nigerian packaging conventions without asking permission
- A composting cooperative in Medellín can host a Spanish-language Track 1 on its own domain at zero cost
- A French-language NGO in Dakar can extend Track 2 with West African regulatory context and submit it back to the main repository
- A city government in Jakarta can white-label the full Academy in Bahasa Indonesia and deploy it to 10 million residents — without a licensing conversation

---

### 3. ALIGNMENT WITH GLOBAL FRAMEWORKS

#### 3.1 UN Sustainable Development Goals

| SDG | Target | Recyclopedia Academy Contribution |
|---|---|---|
| **SDG 11** | Sustainable Cities and Communities | Track 1: Equipping urban citizens with real-time frontline sorting knowledge |
| **SDG 12** | Responsible Consumption & Production | Core platform mission: closing the consumer literacy gap at point of disposal |
| **SDG 13** | Climate Action | Organic waste diversion reduces landfill methane — direct climate intervention |
| **SDG 4** | Quality Education | Free, open-source, mobile-first learning accessible regardless of income |
| **SDG 17** | Partnerships for the Goals | Open-source model enables NGO, government, and cooperative partnership at zero cost |

#### 3.2 The Global Plastics Treaty — Strategic Positioning

The INC negotiations represent the most significant opportunity for international standardization of compostable packaging labeling, EPR frameworks, and consumer education mandates. Recyclopedia Academy's multilingual, open-source framework is positioned to serve as treaty-compliant citizen education infrastructure the moment binding labeling standards are adopted.

#### 3.3 The Basel Convention Context

The Basel Convention's 2019 plastic waste amendments established new controls on transboundary plastic waste movement, creating pressure on exporting nations to improve domestic waste literacy. Recyclopedia Academy's citizen education framework directly supports the domestic sorting competency that makes Basel compliance achievable at the municipal level.

---

### 4. DEPLOYMENT ROADMAP

| Phase | Geographic Scope | Key Milestones | Target |
|---|---|---|---|
| **Phase 1** | US EN (full) + Brazil PT-BR (beta) | Platform live; Track 1 in EN and PT-BR | Q3 2026 |
| **Phase 2** | Spanish (LatAm) + French (West Africa pilot) | Track 1 localized; first municipal partnership | Q1 2027 |
| **Phase 3** | Municipal Partner Program — 10 pilot cities | Branded deployments; composting facility integrations | Q2 2027 |
| **Phase 4** | UNEP / UN recognition application | One Planet Network submission; INC working group engagement | Q4 2027 |
| **Phase 5** | Global commons handoff | Repository governance framework; multilingual contributor network | 2028 |

---

### 5. FINANCIAL MODEL FOR GLOBAL SCALE

**Platform Infrastructure:** Near-zero marginal cost. Cloudflare Pages free tier. GitHub open-source hosting. No per-user licensing. No database costs.

**The Municipal ROI Benchmark:** The internal CBA (Volume I, Section 4) demonstrates **$21.00/ton net benefit** for a US mid-sized municipality at 20% organic diversion — with a 2.5-year CapEx payback. The structural arbitrage logic is globally transferable; specific figures require country- and region-specific tipping fee benchmarks.

**Content Production:** Foundation and impact grants; municipal government white-label contracts; NGO Training-of-Trainers certification programs; impact investment aligned with verified diversion outcomes.

**Revenue Ceiling by Design:** The open-source model structurally limits rent-seeking. Revenue accrues to Absolutely Plausible Solutions through service, integration, and certification — not through locking municipalities into proprietary content.

---

### 6. POLICY RECOMMENDATIONS — GLOBAL

1. **UNEP One Planet Network:** Submit Academy framework as a model citizen education instrument and open-source global commons.
2. **ISO/CEN Coordination:** Monitor ISO TC 61 and TC 207 working groups; advocate for standardized compostable packaging labeling aligned with the Academy's visual decision tree.
3. **INC Treaty Working Groups:** Contribute white paper to INC working groups on consumer education, EPR, and packaging labeling standardization.
4. **World Bank Urban Development:** Position Academy as low-cost complement to World Bank urban waste management infrastructure investments in LMICs.
5. **Open-Source Mandate Advocacy:** Advocate that publicly funded waste education platforms deployed with international development financing publish curricula under open licenses.
6. **South-South Learning Network:** Facilitate knowledge exchange between Brazil's catador cooperative networks, West African community waste programs, and Southeast Asian informal recycler communities.

---

### 7. CONCLUSION

The mathematics of the global waste crisis are stark. By 2050, humanity will generate 3.8 billion tonnes of waste annually (UNEP/ISWA GWMO 2024). The engineering is largely solved. The policy frameworks are in motion. The materials science is commercially available.

What is missing — at every scale, in every language, in every income bracket — is a simple, reliable, mobile-accessible answer to the question every citizen faces every day at the bin:

**Does this go in the green bin or the black bin?**

Recyclopedia Academy answers that question. In English, Portuguese, Spanish, and French. On a 3G connection. In two seconds. For free. With no proprietary lock-in and no barrier between any government, cooperative, or community organization and the full curriculum.

That is the most scalable waste intervention on Earth. Not because of what it costs. Because of what it costs to access it.

---
---

# APPENDIX A: ACRONYM INDEX & GLOSSARY

*All acronyms and abbreviations appearing in this white paper series, alphabetically ordered. This index is a living document — update with each new draft.*

---

| Acronym / Abbreviation | Full Name | Context / Notes |
|---|---|---|
| **ABNT** | Associação Brasileira de Normas Técnicas | Brazilian Standards Association; equivalent to ASTM/ISO in Brazil. Sets packaging and materials standards relevant to PHA certification. |
| **ABRELPE** | Associação Brasileira de Empresas de Limpeza Pública e Resíduos Especiais | Former publisher of Brazil's Panorama dos Resíduos Sólidos. Merged into ABREMA in 2023. All citations post-2023 use ABREMA. |
| **ABREMA** | Associação Brasileira de Resíduos e Meio Ambiente | Formed from merger of ABRELPE, Abetre, Selur, and Selurb. Current publisher of the Panorama dos Resíduos Sólidos no Brasil. |
| **ANCAT** | Associação Nacional dos Catadores e Catadoras de Materiais Recicláveis | National Association of Recyclable Materials Collectors in Brazil. Supports 500+ cooperatives across 269 cities. |
| **ANVISA** | Agência Nacional de Vigilância Sanitária | Brazil's National Health Surveillance Agency. Sets packaging and food-contact material standards relevant to PHA labeling. |
| **ASCE** | American Society of Civil Engineers | Codified the Fresno sanitary landfill method into national engineering guidelines in 1959. |
| **Basel Convention** | Basel Convention on the Control of Transboundary Movements of Hazardous Wastes | International treaty regulating cross-border movement of hazardous and plastic waste. 2019 amendments added controls on plastic waste. |
| **BNCC** | Base Nacional Comum Curricular | Brazil's National Common Curricular Base — the framework governing public school curricula. Environmental education is embedded under Ciências da Natureza. |
| **BNDES** | Banco Nacional de Desenvolvimento Econômico e Social | Brazil's national development bank. Key funding pathway for Recyclopedia Academy through Fundo Clima and circular economy financing lines. |
| **BPI** | Biodegradable Products Institute | US-based certification body for compostable products. BPI certification is the primary consumer-facing standard for identifying compostable packaging in North America. |
| **BRL** | Brazilian Real | Official currency of Brazil (R$). All Brazilian financial figures in this document are denominated in BRL. |
| **CBA** | Cost-Benefit Analysis | Internal financial model developed for Recyclopedia Academy to project municipal ROI from organic waste diversion programs. |
| **CBO** | Classificação Brasileira de Ocupações | Brazil's Occupational Classification system. Formally recognized catadores as a profession in 2002. |
| **CC BY-SA** | Creative Commons Attribution-ShareAlike | Open content license applied to all Recyclopedia Academy curriculum content. Allows free use, adaptation, and redistribution with attribution. |
| **CDN** | Content Delivery Network | Global network of servers that delivers web content from locations close to each user. Cloudflare's CDN enables sub-2-second load times globally. |
| **COP30** | 30th Conference of the Parties (UN Climate) | Held in Belém, Brazil, 2025. ABREMA's Panorama 2025 frames the waste sector as central to Brazil's COP30 climate commitments. |
| **CPLP** | Comunidade dos Países de Língua Portuguesa | Community of Portuguese-Speaking Countries. Brazil's PT-BR content hub in Recyclopedia Academy serves as the primary resource for CPLP-member nations. |
| **EPA** | United States Environmental Protection Agency | Federal agency responsible for enforcing RCRA and overseeing US solid waste management. Key federal partnership target for Academy recognition. |
| **EPR** | Extended Producer Responsibility | Policy framework requiring producers to bear responsibility for the full lifecycle of their products, including post-consumer disposal and education. |
| **ES6+** | ECMAScript 6+ | Modern JavaScript standard (2015 and later). The Recyclopedia Academy quiz engine is written in pure Vanilla ES6+ with zero external dependencies. |
| **FNMA** | Fundo Nacional do Meio Ambiente | Brazil's National Environment Fund. Potential grant funding pathway for Academy deployment in Brazil. |
| **GRU** | Guarulhos / São Paulo Cloudflare Node | Cloudflare's São Paulo data center designation. Provides sub-50ms load times for most Brazilian users. |
| **GWP** | Global Warming Potential | A standardized measure of how much heat a greenhouse gas traps relative to CO₂. Methane GWP: 28x (100-year, IPCC AR5) or 84x (20-year, IPCC AR5). |
| **HDPE** | High-Density Polyethylene | Thick plastic sheeting used as primary liner in modern regulated landfills to contain leachate and prevent groundwater contamination. Required under RCRA Subtitle D. |
| **IBGE** | Instituto Brasileiro de Geografia e Estatística | Brazil's national statistics agency. Source of PNAD Contínua survey data on catadores and MUNIC 2023 survey data on lixões by municipality. |
| **ICF** | Industrial Composting Facility | A facility operating at controlled high temperatures (140°F–160°F / 60°C–71°C) capable of processing PHA bioplastics and food organics into finished compost within 90 days. |
| **INC** | Intergovernmental Negotiating Committee | UN body responsible for negotiating the Global Plastics Treaty. INC-5 met in Busan, South Korea in November 2024 without producing a final text. |
| **IPCC AR5** | Intergovernmental Panel on Climate Change Fifth Assessment Report | Published 2013–2014. Source for standardized methane GWP figures used throughout this document (28x over 100 years, 84x over 20 years). |
| **IPEA** | Instituto de Pesquisa Econômica Aplicada | Brazil's Institute for Applied Economic Research. Source for Brazilian economic and social data relevant to waste sector financial analysis. |
| **ISO** | International Organization for Standardization | Global standards body. ISO TC 61 (plastics) and TC 207 (environmental management) are the relevant working groups for compostable packaging labeling standards. |
| **JSON** | JavaScript Object Notation | Lightweight data format used to structure Recyclopedia Academy quiz content. Quiz blocks are stored as JSON files and rendered dynamically by the RecyclopediaQuiz engine. |
| **LDPE** | Low-Density Polyethylene | The polymer used to manufacture conventional plastic bags. Introduced for curbside collection in NYC in 1969. Oxygen-depleted landfill environments preserve LDPE for centuries. |
| **LMIC** | Low- and Middle-Income Country | World Bank classification. LMICs will account for 70% of global MSW growth by 2050 and are the primary target audience for Volume III of this series. |
| **LMS** | Learning Management System | Software infrastructure for delivering, tracking, and managing educational content. Recyclopedia Academy is a lightweight, static-architecture alternative to heavy LMS platforms. |
| **MMA** | Ministério do Meio Ambiente e Mudança Climática | Brazil's Ministry of Environment and Climate Change. Policy submission target for PNRS Art. 8 (IX) curriculum recognition. |
| **MNCR** | Movimento Nacional dos Catadores de Materiais Recicláveis | Brazil's National Movement of Recyclable Materials Pickers. Established 2001. Represents 800+ cooperatives and associations. Primary civil society partnership target for Academy deployment in Brazil. |
| **MSW** | Municipal Solid Waste | The total stream of residential, commercial, and institutional waste managed by municipal governments. Equivalent to RSU in Brazilian Portuguese. |
| **MUNIC** | Pesquisa de Informações Básicas Municipais | IBGE's Survey of Basic Municipal Information. MUNIC 2023 is the source for regional lixão persistence data cited in Volume II. |
| **NGSS** | Next Generation Science Standards | US K–12 science education framework. Recyclopedia Academy Track 1 modules will be aligned to NGSS environmental literacy benchmarks for K–12 integration. |
| **NGO** | Non-Governmental Organization | Non-profit civil society organizations. Key deployment partners for Track 1 curriculum adaptation in local languages and regulatory contexts. |
| **NIR** | Near-Infrared | Optical sensor technology used in industrial sorting lines to detect and separate PHA bioplastics from conventional petroleum plastics. CapEx item in the CBA model: $350,000 per municipal sorting line upgrade. |
| **NYC** | New York City | Authorized LDPE plastic bags for curbside garbage collection in 1969, in partnership with Union Carbide (GLAD brand) — a pivotal moment in the creation of the modern microplastic legacy. |
| **OpEx** | Operational Expenditures | Recurring annual costs in the CBA model: $200,000/year ($150K collection routing + $50K contamination processing). |
| **PET** | Polyethylene Terephthalate | A common petroleum-based plastic used in clear beverage bottles and food containers. NOT compostable. Visually similar to some PHA containers — the primary source of citizen sorting confusion. |
| **PHA** | Polyhydroxyalkanoate | A bio-based, biodegradable polymer synthesized by microorganisms from renewable feedstocks (sugarcane, corn, bio-oils). Biodegrades into soil within 90 days under industrial composting conditions (140°F–160°F). The core material addressed by Recyclopedia Academy's sorting curriculum. |
| **PGIRS** | Plano de Gestão Integrada de Resíduos Sólidos | Integrated Solid Waste Management Plan. Mandated for all Brazilian municipalities under PNRS (Lei 12.305/2010). |
| **PLA** | Polylactic Acid | Another bio-based, compostable polymer. Like PHA, requires industrial composting conditions to degrade and performs identically to petroleum plastics in standard landfills. |
| **PNAD Contínua** | Pesquisa Nacional por Amostra de Domicílios Contínua | Brazil's continuous national household sample survey (IBGE). Primary source for official catadores workforce count (281,000+). |
| **PNRS** | Política Nacional de Resíduos Sólidos | Brazil's National Solid Waste Policy (Lei 12.305/2010). The foundational legislative framework governing solid waste management, catador recognition, lixão closure mandates, and environmental education requirements in Brazil. |
| **PoP** | Point of Presence | A Cloudflare data center location. 300+ PoPs globally ensure sub-2-second page load times for Recyclopedia Academy users worldwide. |
| **PT-BR** | Português Brasileiro | Brazilian Portuguese. The primary language for Volume II and the first non-English language track of Recyclopedia Academy. |
| **PWA** | Progressive Web App | A web application that can function offline and be installed on a smartphone home screen without an app store. Planned for Recyclopedia Academy to serve catadores and rural Brazilian users with intermittent connectivity. |
| **QR Code** | Quick Response Code | 2D barcode enabling smartphone scanning for direct URL access. BPI packaging integration proposal: QR codes on certified compostable packaging linking directly to Academy sorting guides. |
| **RCRA** | Resource Conservation and Recovery Act | US federal law enacted in 1976. Permanently outlawed open dumps; established cradle-to-grave waste tracking; mandated HDPE liner systems, leachate collection, groundwater monitoring, and methane extraction at all regulated landfills. Administered by the EPA under Subtitle D. |
| **RSU** | Resíduos Sólidos Urbanos | Brazilian Portuguese for MSW — Municipal Solid Waste. Used throughout Volume II and in all Brazilian source data citations. |
| **SBCE** | Sistema Brasileiro de Comércio de Emissões | Brazil's Emissions Trading System. Provides a monetizable carbon credit channel for verified reductions in landfill methane generation through organic waste diversion. |
| **SDG** | Sustainable Development Goal | UN framework of 17 goals adopted in 2015. Recyclopedia Academy aligns with SDGs 4, 11, 12, 13, and 17. See Volume III, Section 3.1. |
| **SLA** | Service Level Agreement | Contract specifying performance standards for service providers. Referenced in Academy curriculum (Module 2.2) in the context of NIR sensor maintenance contracts for industrial composting facilities. |
| **SNIS** | Sistema Nacional de Informações sobre Saneamento | Brazil's National Sanitation Information System. Tracks municipal waste management costs and service coverage data. Cited in academic literature on Brazilian MSW costs. |
| **UN** | United Nations | International body. Relevant UN instruments include SDGs, Basel Convention, UNEP mandate, and ongoing Global Plastics Treaty (INC) process. |
| **UNEP** | United Nations Environment Programme | UN's primary environmental body. Recyclopedia Academy targets recognition through UNEP's One Planet Network (Sustainable Consumption and Production programme). |
| **Unicatadores** | União Nacional de Catadores e Catadoras de Materiais Recicláveis do Brasil | Brazil's National Union of Recyclable Material Pickers. One of three major national catador advocacy organizations alongside MNCR and ANCAT. |
| **WIEGO** | Women in Informal Employment: Globalizing and Organizing | Global research and advocacy network. Source for IBGE-based catadores workforce statistics (281,000+) cited in Volume II, Section 1.3. |

---

*End of Draft | White Paper Series v1.3*
*Recyclopedia Academy | Absolutely Plausible Solutions*
*For internal review and stakeholder circulation only. Not for public distribution.*

---

## CHANGE LOG

| Version | Date | Key Changes |
|---|---|---|
| v1.0 | June 2026 | Initial three-volume draft. All Brazil data flagged as unverified. $21/ton unsourced. |
| v1.1 | June 2026 | CBA model fully documented. Methane standardized to IPCC 28x/84x. Bio-based language corrected. $18.50/$21 discrepancy resolved. ASCE 1959 + NYC 1969 history added. |
| v1.2 | June 2026 | Brazil section rebuilt with ABREMA Panorama 2024 data (base year 2023). Catadores corrected to 281,000+ (IBGE/WIEGO). Composting rate corrected to 0.4%. Lixões at 35.5%. BRL tipping fee range added (R$ 90–320/ton by scenario). Appendix A: Full Acronym Index added (45 entries). |
| v1.3 | July 2026 | Global MSW updated to UNEP/ISWA GWMO 2024: 2.1B tonnes (2023) → 3.8B by 2050; direct costs USD 252B (2020) → USD 640.3B (2050). World Bank 2018 baseline retained as historical reference. Global MSW tonnage flag resolved. Sources now cross-referenced in the repo Atlas directory (`src/data/organizations.ts`). |

---

## FLAGS STATUS AS OF v1.3

**✅ RESOLVED**
- Brazil MSW tonnage: 81 million tons (ABREMA 2024, base 2023)
- Brazil adequate destination: 58.5%
- Brazil inadequate destination: 41.5% total / 35.5% lixões specifically
- Brazil composting rate: 0.4% (~300,000 tons → 85,500 tons finished compost)
- Catadores figure: 281,000+ officially (IBGE/WIEGO); context on MNCR higher estimates provided
- Catadores recycling share: 67.2% of formal recycling chain (ABREMA 2024)
- ABRELPE → ABREMA institutional transition noted and sourced
- Brazilian landfill tipping fee range: R$ 90–320/ton (source-dependent)
- $21.00/ton sourced (internal CBA, fully documented)
- $18.50/$21 discrepancy identified and resolved
- Methane potency standardized (28x / 84x with IPCC citation)
- PHA 90-day breakdown confirmed (140°F–160°F conditions)
- Bio-based language corrected throughout
- ASCE 1959 + NYC 1969 history integrated
- Global MSW tonnage updated to GWMO 2024: 2.1B tonnes (2023) → 3.8B by 2050, costs USD 252B → 640.3B (resolved v1.3; World Bank 2018 baseline retained as historical reference)

**⚠️ STILL PENDING BEFORE EXTERNAL SUBMISSION**
- Fresno date (1935 vs. 1937): Internal docs consistent on 1935; one ASCE records check recommended
- Brazilian composting tipping fees: No published national benchmark; direct outreach to ICF operators required
- Brazilian compost product pricing: Market data needed
- Brazil SBCE carbon credit rate: Monetization pathway confirmed; rate to be verified
- US tipping fee assumptions ($75/$51): Validate against BioCycle or EPA current survey
- INC Treaty status: Update as negotiations proceed beyond INC-5
