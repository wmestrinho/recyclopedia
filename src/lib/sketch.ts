/**
 * The pencil-sketch renderer behind the approved "direction D" (2026-09-17):
 * plain line-art paths are re-drawn at build time by Rough.js as an ink
 * outline that wobbles, with a colour hatched inside closed shapes. A seed
 * derived from a name keeps every drawing identical from build to build.
 * Static SVG ships; nothing runs in the browser.
 *
 * Used by CurbsideSign.astro (the sign glyphs) and EngineHeader.astro (the
 * brand mark). The parameters here and in scripts/sketch_icons_preview.mjs
 * must match.
 */
import rough from 'roughjs';

export const INK = '#2b2822';
export const LETTUCE = '#57862f';
export const BEET = '#8a2450';
export const GRAPEFRUIT = '#e4562e';

const gen = rough.generator();

/** FNV-1a of a name, folded into Rough's seed range. */
export const seedOf = (s: string): number => {
  let h = 2166136261;
  for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  return (h % 100000) + 1;
};

const attrsOf = (s: string) => Object.fromEntries([...s.matchAll(/([a-z-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const round = (d: string) => d.replace(/-?\d+\.\d+/g, (n) => (+n).toFixed(1));

export interface SketchOptions {
  /** Seed for the wobble; use `seedOf(name)`. */
  seed: number;
  /** Outline colour. Default: ink. */
  stroke?: string;
  strokeWidth?: number;
  /** Hatch colour for closed shapes; `false` leaves them empty. Default: currentColor. */
  hatch?: string | false;
  roughness?: number;
  bowing?: number;
}

/**
 * Re-draws every <path|rect|circle|ellipse …/> in an SVG fragment as a sketch
 * and returns the resulting <path> elements (presentation attributes on the
 * element, because injected markup never gets Astro's scoping attribute).
 */
export function sketchShapes(fragment: string, opts: SketchOptions): string {
  const out: string[] = [];
  const hatch = opts.hatch === undefined ? 'currentColor' : opts.hatch;
  [...fragment.matchAll(/<(path|rect|circle|ellipse)\b([^>]*)\/>/g)].forEach((m, i) => {
    const tag = m[1];
    const a = attrsOf(m[2]);
    const closed = tag !== 'path' || /z\s*$/i.test(a.d);
    const o = {
      roughness: opts.roughness ?? 0.7,
      bowing: opts.bowing ?? 1.1,
      seed: opts.seed + i,
      stroke: opts.stroke ?? INK,
      strokeWidth: opts.strokeWidth ?? 1.15,
      ...(hatch && closed ? { fill: hatch, fillStyle: 'hachure', hachureGap: 3, fillWeight: 0.5, hachureAngle: -41 } : {}),
    };
    const d =
      tag === 'path' ? gen.path(a.d, o)
      : tag === 'rect' ? gen.rectangle(+a.x, +a.y, +a.width, +a.height, o)
      : tag === 'circle' ? gen.circle(+a.cx, +a.cy, 2 * +a.r, o)
      : gen.ellipse(+a.cx, +a.cy, 2 * +a.rx, 2 * +a.ry, o);
    for (const p of gen.toPaths(d)) {
      out.push(`<path d="${round(p.d)}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${p.fill || 'none'}"/>`);
    }
  });
  return out.join('');
}

/**
 * The universal recycling mark, one arrow per logo colour. Outline from
 * Lucide (`recycle`, ISC licence) so it reads as the real thing rather than a
 * hand-drawn approximation. Each arrow is a `<g>` carrying `mark-lettuce`,
 * `mark-beet` or `mark-grapefruit`, so CSS decides the colour where the
 * mark is used flat (the signs).
 */
export const RECYCLE_ARROWS: Array<{ cls: string; colour: string; d: string }> = [
  { cls: 'mark-lettuce', colour: LETTUCE,
    d: '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/>' },
  { cls: 'mark-beet', colour: BEET,
    d: '<path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/>' },
  { cls: 'mark-grapefruit', colour: GRAPEFRUIT,
    d: '<path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>' },
];

export const RECYCLE_PATHS = RECYCLE_ARROWS.map((a) => `<g class="${a.cls}">${a.d}</g>`).join('');

/**
 * The brand mark: the recycling arrows drawn as a pencil sketch, each arrow
 * in its own logo colour. Same seed every build.
 */
export function sketchRecycleMark(className = 'brand__sketch', strokeWidth = 1.6): string {
  const body = RECYCLE_ARROWS.map((a, i) =>
    `<g class="${a.cls}">${sketchShapes(a.d, { seed: seedOf('recyclopedia-mark') + i * 7, stroke: a.colour, strokeWidth, hatch: false })}</g>`
  ).join('');
  return `<svg class="${className}" viewBox="0.5 1 23 21" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}
