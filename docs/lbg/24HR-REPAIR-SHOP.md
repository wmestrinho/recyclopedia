# The 24-hour electronics repair shop — planning stub

Status: **idea recorded, not planned.** No code, no dates, no numbers yet.
Source: Luiz's note on Pit Board `E` (2026-09-21):

> Part of Absolutely Plausible's initiative is also to own a 24hr Electronics
> Repair Shop. It's part of our plan but I might've not been explicit about
> [it] … Nothing can make more sense than opening up The 24hr Electronics
> Repair Shop. Let's go over this plan more in depth. BUT FOR NOW I BELIEVE
> THE ELECTRONICS DONATION BELONGS HERE WITH LBG.com AS WELL. FOR NOW

This file exists so the idea is not lost between sessions. It is a list of
what a real plan would have to answer, and how it connects to what is already
built. It may belong in the private business-plan repo instead; that is one
of the questions.

## How it connects to what exists

- **Donate Electronics** (now at lettucebeetgrapefruit.com/donate) is the
  intake of devices. Today donated devices become LBG workshop material or
  are recycled. A shop would be a third destination: repaired and resold,
  or repaired and returned.
- **LBG workshops** ("Repair Table", "Inside Electronics", "Second-Life Lab"
  on lettucebeetgrapefruit.com) teach the same skills a shop uses.
- **Recyclopedia** already ranks "repair" above "recycle" on the Gratitude
  Hierarchy, and `facility_type: repair_shop` exists in `DATA_SCHEMA.md`. A
  shop is somewhere the engine could send people.
- **The facility database** (`db/facilities/schema.sql`) could hold repair
  shops as a class once there is a source for them.

## Questions a plan has to answer

1. **Which company runs it?** Absolutely Plausible (for-profit) or Lettuce
   Beet Grapefruit (the non-profit-focused community side)? This decides
   whether donated devices can be resold, and how donors are told.
2. **What "24 hours" means.** A physical counter open around the clock, a
   24-hour turnaround promise, or a 24-hour drop box with daytime repair.
3. **Where.** Orlando, where AP and the donation pickups already are?
4. **What it repairs first.** Phones and laptops (most demand), or the wider
   list the donation form takes (appliances, consoles, audio).
5. **Donors' consent.** If a donated device is repaired and sold, the
   donation form and the privacy notice have to say so before it happens.
6. **Data wiping.** The privacy notice already promises every data-bearing
   device is wiped before reuse. A shop needs a written procedure and a log.
7. **Parts and e-waste.** Where the parts come from, and where the
   unrepairable remainder goes (the facility database already lists
   Florida's scrap and e-waste dealers, unverified).
8. **Staffing and hours** for the "24".
9. **What comes first**: the workshops, the shop, or both at once.

## Next step

A conversation with Luiz to answer 1–3. Nothing gets built until then.
