# Lens capture guide (Pit Board act5)

Luiz: *"Using openly licensed photos, build me the guide for how to capture
each photo, with the openly licensed photos as an example."*

- `capture-guide.html`: the shot list, 40 cards. Each card has what to shoot,
  how, what to avoid, the file name to save it as (the name encodes the
  label), and an openly licensed example photo with its credit. Open it
  locally in a browser. The example images are hotlinked from Wikimedia
  Commons, so the page needs a connection.
- `capture-examples.json`: the same content as data. For every example it
  records the Commons page, the licence and licence URL, the author, a
  ready-to-print credit line, and whether it shows the subject or the defect.
  It also carries the matching `labels.json`.
- A phone-friendly copy with the images bundled is published as a private
  Claude artifact: <https://claude.ai/artifact/DJSjX1i8rqRtbkUDUZkDEy>. It
  has "Taken" checkboxes and a copy button for `labels.json`.

## The examples

40 photos from Wikimedia Commons: 19 CC0, 5 public domain, 16 CC BY (2.0 / 3.0 /
4.0). No CC BY-SA, no GFDL. Every image was checked by eye, full frame and edge
strips, for watermarks and overlays (workspace asset policy). One candidate
was rejected for a photographer's stamp. Brand labels printed on the
products themselves remain on some examples.

Known gaps, noted on the cards: #21 shows rechargeable NiMH AAs rather than
alkaline; #38–#40 show the *defect* (motion blur, low light, clutter) on a
different subject, because no openly licensed blurry can, dark battery or
junk drawer turned up.

## The rough first number

Luiz chose "use openly licensed photos for a first rough number". It has
**not** been run. `scripts/lens_bench.mjs` calls Workers AI on the
Cloudflare account (billed, a few cents), so it cannot run offline. On the
ThinkPad the script also does not find wrangler's Windows token path, and
running it would mean handling the account token, which Seat 2 does not do.
To run it on the Mac:

1. Build 37 stock fixtures from `capture-examples.json`: shots 01–37 (not
   38–40, whose example is a different subject), resized to 768 px. Label #21
   `rechargeable-battery-nimh-nicd`, because that is what the example shows.
2. Put them and their `labels.json` in `bench/fixtures/` (gitignored), then
   run `npm run build` and `node scripts/lens_bench.mjs`.
3. Record the result as **stock photos, rough**. Tidy stock photos flatter a
   vision model, so the real number still needs Luiz's own 40 photos.
