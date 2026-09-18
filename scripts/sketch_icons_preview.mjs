// The approved icon direction, kept as a living design page.
//
// Owner review 2026-09-17 ("THIS is PERFECT"): direction D — our own glyphs
// re-drawn by Rough.js as pencil sketches, ink outline, the half's logo colour
// hatched inside, on graph paper. This script regenerates
// docs/design/sketch-icons.html from the icon map in CurbsideSign.astro so the
// page always shows the current glyphs. The same renderer runs inside the
// component at build time; the parameters here and there must match.
//
//   node scripts/sketch_icons_preview.mjs
//
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const rough = createRequire(import.meta.url)('roughjs/bundled/rough.cjs.js');
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const g = rough.generator();
const src = fs.readFileSync(path.join(ROOT, 'src/components/CurbsideSign.astro'),'utf8');
const ICONS = {};
for (const m of src.matchAll(/^\s*'([a-z-]+)':\s*'(<.*?)',\s*$/gm)) ICONS[m[1]] = m[2];
const attrs = s => Object.fromEntries([...s.matchAll(/([a-z]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
const shapes = svg => [...svg.matchAll(/<(path|rect|circle|ellipse)\b([^>]*)\/>/g)].map(m => ({ tag: m[1], a: attrs(m[2]) }));
function roughIcon(name, { color, fill, seed = 1, roughness = 0.7, bowing = 1.1 }) {
  const out = [];
  shapes(ICONS[name]).forEach((s, i) => {
    const closed = s.tag !== 'path' || /z\s*$/i.test(s.a.d);
    const o = { roughness, bowing, seed: seed + i, stroke: color, strokeWidth: 1.15, ...(fill && closed ? { fill, fillStyle: 'hachure', hachureGap: 3, fillWeight: 0.5, hachureAngle: -41 } : {}) };
    let d;
    if (s.tag === 'path') d = g.path(s.a.d, o);
    else if (s.tag === 'rect') d = g.rectangle(+s.a.x, +s.a.y, +s.a.width, +s.a.height, o);
    else if (s.tag === 'circle') d = g.circle(+s.a.cx, +s.a.cy, 2 * +s.a.r, o);
    else d = g.ellipse(+s.a.cx, +s.a.cy, 2 * +s.a.rx, 2 * +s.a.ry, o);
    for (const p of g.toPaths(d)) out.push(`<path d="${p.d}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill || 'none'}" stroke-linecap="round" stroke-linejoin="round"/>`);
  });
  return `<svg viewBox="-1 -1 26 26" aria-hidden="true">${out.join('')}</svg>`;
}
const flat = (name, color) => `<svg viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
const INK = '#2b2822', L = '#57862f', B = '#8a2450', G = '#e4562e';
const rows = [
  ['can', 'Aluminum can', L], ['box', 'Cardboard', L], ['bottle', 'Plastic bottle', L], ['laptop', 'Laptop', L],
  ['plastic-bag', 'Plastic bags', B], ['tire', 'Tires', B], ['shirt', 'Clothing', B], ['dish', 'Ceramic dishes', B],
  ['battery', 'Batteries', G], ['bulb', 'Light bulbs', G], ['paint-can', 'Paint', G], ['lock', 'Wipe your data', G],
];
let cells = '';
rows.forEach(([n, label, c], i) => {
  cells += `<tr><th scope="row">${label}</th>
  <td>${flat(n, c)}</td>
  <td class="paper">${roughIcon(n, { color: INK, seed: 10 + i * 7 })}</td>
  <td class="paper">${roughIcon(n, { color: c, seed: 40 + i * 7 })}</td>
  <td class="paper">${roughIcon(n, { color: INK, fill: c, seed: 70 + i * 7 })}</td></tr>`;
});
const big = ['can', 'tire', 'battery'].map((n, i) => `<figure class="paper big">${roughIcon(n, { color: INK, fill: [L, B, G][i], seed: 99 + i })}<figcaption>${['Acceptable', 'Not acceptable', 'Special trip'][i]}</figcaption></figure>`).join('');
// a fragment of the sign's Acceptable half on graph paper
const frag = [['can', 'tin', 'aerosol'], ['bottle', 'jug']].map(([...ns], gi) => `<a class="cell" href="#"><span class="cluster">${ns.map((n, j) => roughIcon(n, { color: INK, fill: L, seed: 200 + gi * 10 + j })).join('')}</span><strong>${gi ? 'Plastic' : 'Aluminum, tin, and steel'}</strong><small>${gi ? 'Bottles #1 and jugs #2 only, rinsed, cap back on' : 'Drink cans, food cans, empty aerosols (cap off)'}</small></a>`).join('');
const html = `<title>Recyclopedia Sketch Icons</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&family=Caveat:wght@500&display=swap">
<style>
:root{--paper:#fcfaf4;--oat:#efe9db;--ink:#2b2822;--muted:#77705f;--grid:rgba(43,40,34,.11);--grid2:rgba(43,40,34,.22);--lettuce:#57862f;--beet:#8a2450;--grapefruit:#e4562e}
body{margin:0;background:var(--oat);color:var(--ink);font:16px/1.5 'Hanken Grotesk',system-ui,sans-serif}
.wrap{max-width:1040px;margin:0 auto;padding-block:2.5rem 4rem;padding-inline:clamp(16px,4vw,32px)}
h1{font-size:clamp(1.6rem,1.2rem+1.8vw,2.4rem);font-weight:700;letter-spacing:.01em;margin:0 0 .35rem;text-wrap:balance}
h2{font-size:1.15rem;font-weight:700;margin:2.5rem 0 .75rem}
p{max-width:64ch;margin:.25rem 0}
.lede{color:var(--muted)}
table{border-collapse:separate;border-spacing:0;width:100%;background:var(--paper);border:1px solid var(--ink);border-radius:12px;overflow:hidden;margin-top:1rem}
th,td{padding:.6rem .75rem;text-align:center;border-bottom:1px solid rgba(43,40,34,.12);vertical-align:middle}
tr:last-child td,tr:last-child th{border-bottom:0}
thead th{font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;background:var(--ink);color:var(--paper)}
tbody th{text-align:left;font-weight:600;font-size:.92rem;width:9rem}
td svg{width:2.9rem;height:2.9rem;display:block;margin:0 auto}
.paper{background:var(--paper) linear-gradient(var(--grid) 1px,transparent 1px) 0 0/8px 8px,linear-gradient(90deg,var(--grid) 1px,transparent 1px) 0 0/8px 8px;background-color:var(--paper);background-image:linear-gradient(var(--grid2) 1px,transparent 1px),linear-gradient(90deg,var(--grid2) 1px,transparent 1px),linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);background-size:50px 50px,50px 50px,10px 10px,10px 10px}
.bigrow{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-top:1rem}
figure.big{margin:0;border:1px solid var(--ink);border-radius:12px;padding:1.5rem 1rem 1rem;display:grid;justify-items:center;gap:.5rem}
figure.big svg{width:7.5rem;height:7.5rem}
figcaption{font-family:'Caveat',cursive;font-size:1.5rem;color:var(--muted)}
.frag{margin-top:1rem;border:1px solid var(--ink);border-radius:12px;overflow:hidden;max-width:640px}
.band{background:var(--lettuce);color:var(--paper);padding:.8rem 1rem}
.band strong{display:block;font-size:1.4rem;text-transform:uppercase;letter-spacing:.03em;line-height:1.1}
.band span{font-size:.86rem}
.field{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:.5rem;padding:1.5rem 1rem}
.cell{display:grid;justify-items:center;text-align:center;gap:.4rem;color:var(--ink);text-decoration:none;padding:.5rem}
.cluster{display:flex;gap:.15rem}.cluster svg{width:2.6rem;height:2.6rem}
.cell strong{font-size:.9rem;text-transform:uppercase;letter-spacing:.02em}.cell small{font-size:.76rem;color:var(--muted);max-width:22ch}
.cell:focus-visible{outline:3px solid var(--lettuce);outline-offset:2px}
.notes{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin-top:1rem}
.note{background:var(--paper);border:1px solid rgba(43,40,34,.25);border-radius:12px;padding:1rem 1.1rem}
.note h3{margin:0 0 .35rem;font-size:1rem}.note p{font-size:.92rem;margin:0}
.note a{color:var(--beet)}
</style>
<div class="wrap">
<h1>Icons as sketches on graph paper</h1>
<p class="lede">Same 45 glyphs we already drew, re-rendered by Rough.js so every stroke wobbles like a pencil. Four directions side by side; the last is the one I recommend.</p>
<table>
<thead><tr><th scope="col">Item</th><th scope="col">A · today</th><th scope="col">B · pencil, ink</th><th scope="col">C · pencil, colour</th><th scope="col">D · ink + hatched colour</th></tr></thead>
<tbody>${cells}</tbody>
</table>
<h2>Direction D at sign size</h2>
<p>Ink outline, and the half's colour as hatching inside. The colour is the meaning: lettuce goes in the bin, beet does not, grapefruit needs a trip.</p>
<div class="bigrow">${big}</div>
<h2>How a half of the sign would feel</h2>
<div class="frag"><div class="band"><strong>Acceptable</strong><span>Put these in your curbside recycling bin loose, empty, clean, and dry.</span></div><div class="field paper">${frag}</div></div>
<h2>Where the drawings can come from</h2>
<div class="notes">
<div class="note"><h3>Roughen what we have (recommended first step)</h3><p>Rough.js (MIT) turns our existing paths into sketches at build time. Zero licensing, every icon consistent, and one seed per icon keeps the wobble stable between builds. Everything on this page was made this way in a few seconds.</p></div>
<div class="note"><h3>Doodle Icons, 400+, CC0</h3><p>Khushmeen Sidhu's hand-drawn set is public domain, SVG and Figma. Good for objects we have no path for yet (appliances, instruments). Strokes are heavier than ours, so they would pass through the same Rough.js step to match.</p></div>
<div class="note"><h3>Excalidraw for the ones we draw by hand</h3><p>MIT editor with the same sketch vocabulary; export SVG straight into the icon map. This is how a one-off like the trio mark or a lesson's diagram gets drawn without a design tool.</p></div>
</div>
</div>`;
fs.mkdirSync(path.join(ROOT, 'docs/design'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'docs/design/sketch-icons.html'), html);
console.log('icons parsed:', Object.keys(ICONS).length, 'html bytes:', html.length);
