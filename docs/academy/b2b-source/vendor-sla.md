# Vendor Service Level Agreement (SLA) — NIR Optical Sorting

**System component:** Near-Infrared (NIR) Optical Sorting Matrix
**Classification:** Critical operational infrastructure
**Status:** Production template / ready for execution
**Tier:** B2B (parked — see ../README.md)

## 1. Purpose & scope

Defines hardware support, software maintenance, performance metrics, and emergency
response between **[Vendor Name]** ("Vendor") and **[City/Organization Name]** ("Client")
for the NIR optical sorting systems at the **[Facility Name]** composting plant. Ensures
maximum uptime, high-accuracy PHA bioplastic sorting, and swift remediation of failures.

## 2. Equipment coverage

- NIR optical sensor units, lenses, and spectrometers
- Proprietary material classification & sorting software
- Pneumatic air-jet manifolds and solenoid actuators
- Industrial touchscreen interfaces (HMIs) and programmable logic controllers (PLCs)

## 3. Performance metrics

- **Target sorting accuracy:** ≥ 98.0% for separating petroleum plastics (PET, HDPE, LDPE)
  from the organic/PHA stream, provided belt speed stays within spec ([X] m/s) and material
  arrives loose, un-clumped, single-layer.
- **System availability (uptime):** ≥ 99.0% monthly during operational hours
  ([e.g. Mon–Fri, 6:00 AM–10:00 PM]).
  `Availability % = ((Total Operational Minutes − Unscheduled Downtime Minutes) / Total Operational Minutes) × 100`

## 4. Ticket severity & response times

| Severity | Definition | Max remote response | Max on-site arrival | Max resolution |
|---|---|---|---|---|
| 1 — Critical | Total outage; line non-functional, no bypass | 30 min | 2 hours | 4 hours |
| 2 — High | Accuracy < 90%, excessive cross-contamination | 1 hour | 4 hours | 12 hours |
| 3 — Medium | Single non-critical component fails; redundancy holds | 4 hours | Next business day | 48 hours |
| 4 — Low | Routine optimization / calibration inquiries | 24 hours | As scheduled | 5 business days |

## 5. Preventative maintenance (Vendor obligations)

- **Monthly remote calibration** during non-operational hours: update chemical signature
  profiles, review error logs, optimize lens sensitivity.
- **Quarterly on-site inspection (every 90 days):** deep-clean and align NIR lenses, test
  and pressure-balance pneumatic air-jet actuators, replace high-wear items (lens shields, filters).

## 6. Client obligations (first-line defense)

- Wipe external sensor enclosures with approved microfiber at end of every shift.
- Keep upstream mechanical separation (e.g. overband magnet) active to prevent belt damage.

## 7. Penalties, credits, remedies

Service-level credits against the following month's invoice if uptime guarantee or
Severity 1/2 windows are missed:

- Uptime 97.0–98.9%: 10% credit
- Uptime 95.0–96.9%: 25% credit
- Uptime < 95.0%: 50% credit
- Missed Severity 1 resolution: $500 per hour past the 4-hour limit

**Chronic failure clause:** if availability drops below 90.0% for two consecutive months,
the Client may terminate immediately without penalty and seek hardware replacement under warranty.

## 8. Signatures

For the Client: Signature ___ · Name/Title ___ · Date ___
For the Vendor: Signature ___ · Name/Title ___ · Date ___
