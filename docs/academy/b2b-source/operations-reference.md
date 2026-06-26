# Operations Reference — NIR Risk Register + Organics Diversion CBA

**Tier:** B2B (parked — see ../README.md)
Source: Gemini "Verification Report" + "Master System Briefing" (Drive).

---

## Part A — Technical risk register (NIR + organics sorting)

| ID | Failure mode | Prob. | Impact | Proactive mitigation | Reactive contingency |
|---|---|---|---|---|---|
| TR-01 | **NIR lens occlusion** — dust/moisture/sludge coats sensor, PHA signature missed | High | High | Continuous positive-pressure air knives; scheduled lens-purge every 4h | PLC switches line to manual sort; audible alarm deploys extra operators |
| TR-02 | **Shredder jamming** — high-tensile material/metal wraps cutting shafts | Med | High | Overband cross-belt magnet upstream; mandatory manual pre-sort | Auto motor-reversing self-clear; if it fails, LOTO and manual clear |
| TR-03 | **Air-jet actuator failure** — solenoids stick, can't blast petroleum plastics off line | Med | Med | Diagnostic sensors on air pressure; modular valve banks on-site | Recirculating loop for unseparated material; manual override during swap |
| TR-04 | **Cross-contamination** — unseparated PET/LDPE hides under organics, pollutes compost | High | High | Dual-stage cascading NIR (two scans); thin single-layer belt speeds | Quarantine batch; reroute through intake or to landfill |
| TR-05 | **Moisture belt slippage** — wet waste lowers friction, desyncs detection→jet timing | Med | Med | Perforated high-friction drainage belts; VFDs for dynamic belt speed | Sensor reads lag, auto-adjusts air-jet fire delay; clean rollers off-peak |

### Verified historical facts (for compliance citations)
- **Jean Vincenz (1935):** Commissioner of Public Works, Fresno CA; designed the Fresno
  Municipal Sanitary Landfill (trench method). Some sources list "Public Works Director."
- **Polyethylene garbage bag (1950):** Harry Wasylyk & Larry Hansen (some archives: "Hanson");
  Union Carbide later acquired the tech; NYC sanitation scaled it in 1969.
- **RCRA Subtitle D (1976):** matches EPA framework; tipping-fee arbitrage of $15–$25/ton is
  statistically valid where landfill fees exceed composting infrastructure cost.

---

## Part B — Financial cost-benefit analysis (organics/PHA diversion)

*Model: mid-sized municipality, 100,000 tons MSW/yr, 20% diversion (20,000 tons).*

### Capital expenditure (CapEx)
- Optical (NIR) sorting retrofit: $350,000
- Curbside green bins: $600,000 ($30 × 20,000 households)
- Public education launch: $100,000
- **Total CapEx: $1,050,000**

### Operating expenditure (OpEx, annual)
- Dedicated organic collection routing: +$150,000/yr
- Contamination processing fees: +$50,000/yr
- **Total OpEx: $200,000/yr**

### Monetized benefits (annual)
- Landfill tipping-fee avoidance: +$1,500,000 (20,000 t × $75/t)
- Lower composting tipping cost: −$1,020,000 (20,000 t × $51/t) → **net arbitrage +$480,000**
- Landfill asset life extension: +$90,000
- Finished compost commodity sales: +$50,000 (bulk humus × $25/t)

### Summary
- Net annual financial benefit: **+$420,000/yr**
- Net value per ton: **+$21.00/ton**
- Payback period: **2.5 years** ($1,050,000 / $420,000)

> Note: figures are an illustrative pro-forma, not a quote. Validate tipping fees and
> facility costs against the target municipality before any pitch.
