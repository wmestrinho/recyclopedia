# DATA SCHEMA — Ranked Dispositions

> The spine of Recyclopedia's data. Every layer in [DATA_STRATEGY.md](DATA_STRATEGY.md)
> normalizes into this shape, and the [Recyclopedia Lens](VISION.md) scan card
> renders directly from it. **Design goal: the same model works as static JSON
> today and as Supabase/Postgres later — so we build it once.**

## The one idea

Today each Lookup item has a **single** `status`. That can't express the truth: a
smartphone is simultaneously *reusable, repairable, donatable, and recyclable*.

So an **item has many dispositions**, each one a rung of the
[Gratitude Hierarchy](ENVIRONMENTAL_RESPECT_POLICY.md), and the app shows the
**highest-ranked one that's actually available** as the "best path," with the rest
collapsed beneath it.

```
item ──< disposition >── facility_type ──< facility        (the "where", for the map)
  │           │
  │           └── source          (citation — "no greenwashing")
  └── barcode / recognition_label  (how the camera maps an image → an item)
```

## Gratitude Hierarchy — canonical rungs

| # | rung | meaning |
|---|------|---------|
| 1 | `reuse` | keep using it, as-is |
| 2 | `repair` | fix it so it keeps being used |
| 3 | `repurpose` | give it a new use / higher-value form |
| 4 | `donate` | pass it to someone who can use it |
| 5 | `recycle` | return its materials to the supply chain |
| 6 | `compost` | return organics to the soil |
| 7 | `dispose` | last resort — safe, lawful disposal |

`rung` carries the *ethic* (priority). `channel` (below) carries the *logistics*
(how/where). They're separate on purpose — "drop-off" is not a rung, it's a channel.

## Decomposing the legacy `status`

The current 6 statuses each split into `(rung, channel, flags)`:

| legacy `status` | rung | channel | flags |
|-----------------|------|---------|-------|
| `curbside` | recycle | `curbside` | — |
| `drop-off` | recycle/donate/dispose | `drop_off` | — |
| `hazardous` | dispose | `hhw` | `hazard = true` |
| `compost` | compost | `compost_home`/`compost_municipal` | — |
| `no` | dispose | `trash` | — |
| `partial` | recycle | `curbside` | `local_variance = true` → "check local" |

A `status_badge` can still be **computed** from `(rung, channel, flags)` so the
existing card UI keeps working during migration.

---

## Category taxonomy — complete, no "Other"

**Principle:** every item earns a real category. There is **no `other` catch-all** —
a junk drawer just hides items from review and erodes the encyclopedia's promise
that *nothing* goes unlisted. The taxonomy is a flat list of 11 categories, each a
genuine disposal stream:

```
Metal   Plastic   Paper   Glass   Electronics   Batteries
Hazardous   Textiles   Organics   Rubber   Bulky Goods
```

`Organics`, `Rubber`, and `Bulky Goods` replace the old `Other`. Reclassification
of the current items:

| Was `Other` | Now | Note |
|-------------|-----|------|
| Food scraps / organics | **Organics** | |
| Cooking oil (used) | **Organics** | food-derived → biodiesel/grease recycling |
| Tires | **Rubber** | real stream (retailer/tire-amnesty drop-off) |
| Mattress | **Bulky Goods** | real stream (Mattress Recycling Council / bulky pickup) |
| Ink / toner cartridge | **Electronics** | **dedup** — already listed under Electronics |

> The current `js/recyclopedia.js` `CATEGORIES` array (`…,'Textiles','Other'`)
> becomes `…,'Textiles','Organics','Rubber','Bulky Goods'` (drop `'Other'`), and the
> ~5 items above get re-tagged, when migration Step 1 runs.

## Item shape — static JSON (use now)

This enriches the current `js/recyclopedia.js` item without breaking it. The old
flat fields can be derived from `dispositions[0]` during transition.

```jsonc
{
  "slug": "smartphone",
  "name": "Smartphone",
  "category": "electronics",
  "aliases": ["cell phone", "mobile phone", "iphone", "android phone"],
  "material_codes": [],                       // e.g. ["PET-1"] for plastics
  "summary": "Handheld computer; contains recoverable precious metals.",
  "hazard": false,
  "gratitude_note": "This little machine holds gold, silver, and cobalt pulled from the earth — and it still has more life in it. Let's pass it on.",
  "image_url": null,

  "dispositions": [
    {
      "rung": "reuse", "rank": 1, "channel": "retail_takeback",
      "label": "Reuse — keep it as a backup or media device",
      "prep": "Factory reset if repurposing.",
      "conditions": "If it still powers on.",
      "why": "A working device kept in use honors far more embodied value than recycling.",
      "local_variance": false, "facility_type": null, "source": "ap-erp"
    },
    {
      "rung": "repair", "rank": 2, "channel": "retail_takeback",
      "label": "Repair — a cracked screen or battery is often worth fixing",
      "prep": "Back up data first.",
      "conditions": "If damaged but economically repairable.",
      "why": "Repair extends life at the lowest material cost.",
      "local_variance": false, "facility_type": "repair_shop", "source": "ap-erp"
    },
    {
      "rung": "donate", "rank": 4, "channel": "donation_center",
      "label": "Donate — it still works",
      "prep": "Back up data, factory reset, remove SIM & SD card.",
      "conditions": "If functional.",
      "why": "Passing it on keeps the whole device in service for someone else.",
      "local_variance": false, "facility_type": "ewaste_donation", "source": "ap-erp",
      "is_recommended": true
    },
    {
      "rung": "recycle", "rank": 5, "channel": "retail_takeback",
      "label": "Recycle — recover the metals",
      "prep": "Wipe data. Use a certified e-waste program.",
      "conditions": "If broken beyond repair.",
      "why": "Recovers gold, silver, cobalt instead of mining more.",
      "local_variance": false, "facility_type": "ewaste", "source": "epa-ewaste"
    },
    {
      "rung": "dispose", "rank": 7, "channel": "trash",
      "label": "Dispose — never; phones never belong in the trash",
      "prep": "—", "conditions": "Never.",
      "why": "Contains heavy metals and lithium; landfill is unsafe and unlawful in many states.",
      "local_variance": false, "facility_type": null, "source": "epa-ewaste"
    }
  ]
}
```

**"Best path" resolution (what the scan card highlights):**
1. Filter `dispositions` to those *available* for the user's context (conditions
   met; not blocked by local rules).
2. Pick `is_recommended === true` if a curator set one; otherwise the lowest
   `rank` (highest rung) among available.
3. Show it as the hero badge; render the rest in the collapsible "Other respectful
   paths," in `rank` order. `local_variance` rungs render as **"check local."**

This is exactly the three-tier card in `mockups/scan-result-card.html`.

---

## Postgres / Supabase DDL (use later — same model)

```sql
-- enums --------------------------------------------------------------------
create type rung_t as enum
  ('reuse','repair','repurpose','donate','recycle','compost','dispose');

create type channel_t as enum
  ('curbside','drop_off','mail_back','retail_takeback','hhw','scrap_yard',
   'donation_center','compost_home','compost_municipal','trash','special_event');

create type category_t as enum   -- complete & exhaustive; NO 'other' catch-all
  ('metal','plastic','paper','glass','electronics','batteries',
   'hazardous','textiles','organics','rubber','bulky');

-- sources (citations — "no greenwashing") ---------------------------------
create table source (
  id          text primary key,            -- e.g. 'epa-ewaste', 'earth911'
  name        text not null,
  url         text,
  license     text,
  retrieved_at date
);

-- items --------------------------------------------------------------------
create table item (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  category       category_t not null,
  aliases        text[] not null default '{}',
  material_codes text[] not null default '{}',
  summary        text,
  gratitude_note text,                      -- object-directed; shown after confirm
  hazard         boolean not null default false,
  image_url      text,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index item_category_idx on item (category);
create index item_aliases_idx  on item using gin (aliases);

-- facility types (generic "kind of place" a disposition points at) ---------
create table facility_type (
  id          text primary key,            -- 'hhw','ewaste','grocery_film',...
  name        text not null,
  description text
);

-- dispositions (the ranked rungs) -----------------------------------------
create table disposition (
  id             uuid primary key default gen_random_uuid(),
  item_id        uuid not null references item(id) on delete cascade,
  rung           rung_t not null,
  rank           smallint not null,         -- display/priority order (1 = best)
  channel        channel_t not null,
  label          text not null,
  prep           text,
  conditions     text,                      -- "only if clean", "if working"
  why            text,                      -- cites the ethic
  local_variance boolean not null default false,  -- true => "check local"
  is_recommended boolean not null default false,  -- curator override for "best"
  facility_type  text references facility_type(id),
  source_id      text references source(id),
  active         boolean not null default true
);
create index disposition_item_idx on disposition (item_id, rank);

-- facilities (layer 3 — physical places, for the map) ----------------------
-- enable postgis for nearest-facility queries: create extension postgis;
create table facility (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  facility_type text references facility_type(id),
  address       text, city text, state text, zip text,
  geo           geography(point,4326),      -- lng/lat for map + KNN search
  accepts       text[] not null default '{}', -- categories/material codes
  phone         text, url text, hours text, notes text,
  source_id     text references source(id),
  verified_at   date
);
create index facility_geo_idx on facility using gist (geo);

-- recognition: barcode-first ----------------------------------------------
create table barcode (
  gtin       text primary key,             -- UPC/EAN
  item_id    uuid references item(id),
  brand      text, product_name text,
  source_id  text references source(id)
);

-- recognition: AI fallback (model label → item/category) -------------------
create table recognition_label (
  id              uuid primary key default gen_random_uuid(),
  label           text not null,           -- e.g. 'cell phone'
  item_id         uuid references item(id),
  category        category_t,
  confidence_floor real not null default 0.6  -- below this → "not sure" flow
);
create index recognition_label_idx on recognition_label (label);

-- layer 2 (LICENSED later — schema-ready, kept empty until partnered) ------
create table jurisdiction (
  id       uuid primary key default gen_random_uuid(),
  kind     text not null,                  -- 'municipality','county','state'
  name     text not null, state text, fips text, zip_codes text[]
);
create table local_rule (
  id             uuid primary key default gen_random_uuid(),
  jurisdiction_id uuid references jurisdiction(id),
  item_id        uuid references item(id),
  material_code  text,                      -- rule may key on material, not item
  accepted       text not null,             -- 'yes','no','dropoff_only','conditional'
  channel        channel_t,
  note           text,
  source_id      text references source(id),
  effective_date date
);
```

**RLS (Supabase):** all content tables are **public read**, writes only via the
service role / admin. (`alter table item enable row level security;` + a
`select` policy `using (true)`; no public insert/update.)

---

## Scan modes — pre-capture gate

Before the camera ever opens, the user declares **what kind of capture** this is.
This removes ambiguity at the source (we never have to guess whether a photo is one
thing or twenty) and keeps each mode's logic clean.

| # | Mode | Meaning | Status |
|---|------|---------|--------|
| 1 | **One item only** | A single object fills the frame. | ✅ **MVP** |
| 2 | **Multi-material** | One object made of several materials (e.g. a blister pack: plastic + foil + paper). Resolves to per-component dispositions. | 🔜 later |
| 3 | **Pile or Hoard** | Many distinct items in one capture; detect & itemize each. | 🔜 later |

**MVP builds Mode 1 only.** Modes 2–3 are defined now so the UI, schema, and
recognition pipeline are designed to accommodate them — but they are deliberately
deferred to keep the MVP solid and simple. (Mode 2 is why `item.material_codes[]`
exists; Mode 3 is a multi-detection problem on top of the same item lookup.)

## How the camera flow uses it (Phase 4)

1. **Barcode present?** → `barcode.gtin` → `item`. Exact match, highest confidence.
2. **No barcode?** → vision model label → `recognition_label.label` → `item` or
   `category`. If best confidence `< confidence_floor` → the **"not sure"** card
   (search / ask-a-human / try again).
3. **Confirm** with the user (per AP Guidelines), then:
4. Load `item.gratitude_note` + ranked `dispositions`, resolve **best available
   path** (above), resolve `facility_type` → nearest `facility` via `geo` KNN, and
   render the scan card.

## Migration path (no double build)

- **Step 1 (now):** add a `dispositions[]` array to items in `js/recyclopedia.js`;
  keep the flat fields, derive the badge from `dispositions[0]`. Site keeps working.
- **Step 2:** move items to a static `items.json` of this exact shape (decouples
  data from code; still no backend).
- **Step 3 (Phase 2):** load that JSON into Supabase with the DDL above — a direct,
  lossless import. Add `facility`, `barcode`, `local_rule` as those layers land.

## Open schema questions

- **Materials vs items:** some rules key on *material* (`#5 PP`) not the item.
  `material_codes[]` + `local_rule.material_code` support this; may warrant a
  full `material` table later.

### Resolved
- **No `other` category** — replaced by the complete 11-category taxonomy above
  (`organics` / `rubber` / `bulky` added). Every item earns a real home.
- **Multi-material objects** — handled by the **pre-capture scan-mode gate**
  (Mode 2), not guesswork. MVP is single-item (Mode 1) only.
