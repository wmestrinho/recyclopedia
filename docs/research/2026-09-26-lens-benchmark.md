# Lens recognition benchmark — 2026-09-26

> **Stock photos, rough (Pit Board act5).** These 37 fixtures are the openly
> licensed Wikimedia Commons examples from `docs/lens/capture-examples.json`
> (shots 01–37; 38–40 skipped because their example shows a different subject;
> #21 labelled `rechargeable-battery-nimh-nicd`, since the example shows NiMH
> cells). Stock photos are tidy and well lit, so they flatter a vision model.
> Treat this as a first rough number only. The real number needs Luiz's own 40
> phone photos, taken with `docs/lens/capture-guide.html`. Run on Seat 1 (Mac
> mini), 2026-09-25 local time.

Fixtures: **37** labelled photos · vocabulary: **95** entries (84 items + 11 categories).
Images downscaled to a 768px long edge, JPEG q80 — the same shape the client sends.

Pass bar (master plan Card C.0): top-3 ≥ 85%, top-1 ≥ 65%, p95 < 4s.

| Model | top-1 | top-3 | category-only | p50 | p95 | errors | invented slugs | est. cost / 1k scans |
|---|---|---|---|---|---|---|---|---|
| Llama 4 Scout 17B | 86.5% | 86.5% | 2.7% | 1401 ms | 3212 ms | 0 | 0 | $1.00 |
| Moondream 3.1 9B | 35.1% | 35.1% | 5.4% | 469 ms | 720 ms | 0 | 0 | $0.23 |

### Llama 4 Scout 17B — missed (5)

| Photo | Expected | Returned |
|---|---|---|
| 03-aerosol-can-empty.jpg | `aerosol-can-empty` | `aerosol-can-not-empty` |
| 14-glass-bottle-clear.jpg | `glass-bottle-clear` | `glass-food-jar` |
| 24-power-tool-battery.jpg | `power-tool-battery` | `lithium-ion-battery` |
| 26-category-hazardous.jpg | `category:hazardous` | `plastic-bottle-pet` |
| 32-food-scraps-organics.jpg | `food-scraps-organics` | `category:organics` |

### Moondream 3.1 9B — missed (24)

| Photo | Expected | Returned |
|---|---|---|
| 01-aluminum-can.jpg | `aluminum-can` | _Diet Sierra Mist_ |
| 02-steel-tin-can.jpg | `steel-tin-can` | _Baked beans_ |
| 04-scrap-metal.jpg | `scrap-metal` | `pvc-vinyl-3` |
| 06-plastic-jug-hdpe.jpg | `plastic-jug-hdpe` | _water cooler_ |
| 07-plastic-bag-film.jpg | `plastic-bag-film` | `category:plastic` |
| 08-styrofoam-foam-ps.jpg | `styrofoam-foam-ps` | _discarded cup_ |
| 09-yogurt-container-pp.jpg | `yogurt-container-pp` | _yogurt_ |
| 10-cardboard-clean-dry.jpg | `cardboard-clean-dry` | _box_ |
| 14-glass-bottle-clear.jpg | `glass-bottle-clear` | _bottle_ |
| 15-glass-food-jar.jpg | `glass-food-jar` | _pickled cucumber_ |
| 16-ceramics-pottery.jpg | `ceramics-pottery` | _mug_ |
| 21-alkaline-battery-aa-aaa-9v.jpg | `rechargeable-battery-nimh-nicd` | `category:batteries` |
| 22-button-coin-cell.jpg | `button-coin-cell` | _Speaker_ |
| 23-car-battery-lead-acid.jpg | `car-battery-lead-acid` | _battery_ |
| 24-power-tool-battery.jpg | `power-tool-battery` | _battery_ |
| 25-paint-latex-water-based.jpg | `paint-latex-water-based` | _paintbrush_ |
| 26-category-hazardous.jpg | `category:hazardous` | _spray bottle_ |
| 27-fluorescent-bulb-cfl.jpg | `fluorescent-bulb-cfl` | `led-bulb` |
| 28-motor-oil.jpg | `motor-oil` | _oil bottle_ |
| 31-textiles-fabric-scraps.jpg | `textiles-fabric-scraps` | _basket_ |
| 32-food-scraps-organics.jpg | `food-scraps-organics` | _compost bin_ |
| 33-category-organics.jpg | `category:organics` | _plank_ |
| 35-category-rubber.jpg | `category:rubber` | _hose_ |
| 37-category-bulky-goods.jpg | `category:bulky-goods` | _armchair_ |

## Decision

Not decided yet; the owner decides. What this run shows: **Llama 4 Scout passes the
Card C.0 bar on stock photos** (top-1 86.5%, top-3 86.5%, p95 3.2 s), with no
invented slugs. **Moondream 3.1 fails it** (35.1%). It mostly answers in free
text that does not map back to the vocabulary. Wait for the real-photo run
before choosing.

<!-- Fill in after the real-photo run: chosen model, and whether Tier 3 ships item-level or category-only. -->
