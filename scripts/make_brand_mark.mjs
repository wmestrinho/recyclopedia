// The brand mark as files: the recycling arrows drawn as a pencil sketch
// (src/lib/sketch.ts, the same drawing the header shows) on a paper tile with
// an ink border — the favicon SVG, and the PWA / touch icons rendered from it
// with sharp. Not part of the build; the outputs are committed.
//
//   node --experimental-strip-types scripts/make_brand_mark.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { sketchRecycleMark } from '../src/lib/sketch.ts';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAPER = '#fcfaf4', INK = '#2b2822';
const GRID = 'rgba(43,40,34,0.11)', GRID_MAJOR = 'rgba(43,40,34,0.2)';

// The sketch, re-wrapped: sketchRecycleMark() returns an <svg> with a
// viewBox of 0.5 1 23 21; here it becomes a nested <svg> placed on the tile.
const inner = sketchRecycleMark('mark', 1.5).replace('<svg class="mark"', '<svg x="11" y="13" width="78" height="74"');

// Graph paper as a pattern, the tile's border 1px at 100 units so it reads at
// favicon size the way it does in the header.
const tile = (maskable) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
<defs>
  <pattern id="minor" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="${GRID}" stroke-width="1"/></pattern>
  <pattern id="major" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M50 0H0V50" fill="none" stroke="${GRID_MAJOR}" stroke-width="1"/></pattern>
</defs>
<rect width="100" height="100" rx="${maskable ? 0 : 14}" fill="${PAPER}"/>
<rect width="100" height="100" rx="${maskable ? 0 : 14}" fill="url(#minor)"/>
<rect width="100" height="100" rx="${maskable ? 0 : 14}" fill="url(#major)"/>
${maskable ? '' : `<rect x="1" y="1" width="98" height="98" rx="13" fill="none" stroke="${INK}" stroke-width="2"/>`}
${inner}
</svg>`;

const favicon = tile(false);
fs.writeFileSync(path.join(ROOT, 'public/images/recyclopedia-mark.svg'), favicon);

const out = path.join(ROOT, 'public/images/pwa');
for (const [name, size, maskable] of [['icon-192.png', 192, false], ['icon-512.png', 512, false], ['icon-maskable-512.png', 512, true], ['apple-touch-icon.png', 180, true]]) {
  await sharp(Buffer.from(tile(maskable)), { density: 300 }).resize(size, size).png().toFile(path.join(out, name));
  console.log('wrote', name);
}
console.log('wrote recyclopedia-mark.svg');
