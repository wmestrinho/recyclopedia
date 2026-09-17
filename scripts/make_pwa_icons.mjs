// One-off: renders the PWA icons (Card D.1) — a monochrome ♻ in --accent-deep
// on the oat --bg. Not part of the build; the PNGs are committed. Uses the
// npx-cached Playwright on the Mac (no repo dependency); adjust the import to
// re-run elsewhere:  node scripts/make_pwa_icons.mjs "$PWD/public/images/pwa"
import { chromium } from '/Users/wmestrinho/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const out = process.argv[2];
const page = (size, glyph) => `<html><body style="margin:0;width:${size}px;height:${size}px;background:#efe9db;display:grid;place-items:center">
<svg width="${size}" height="${size}" viewBox="0 0 100 100"><text x="50" y="56" text-anchor="middle" dominant-baseline="central" font-family="Apple Symbols, 'Segoe UI Symbol', 'Noto Sans Symbols 2', sans-serif" font-size="${glyph}" fill="#3c5e2c">&#x267B;&#xFE0E;</text></svg></body></html>`;
const b = await chromium.launch();
for (const [name, size, glyph] of [['icon-192.png',192,78],['icon-512.png',512,78],['icon-maskable-512.png',512,62],['apple-touch-icon.png',180,70]]) {
  const p = await b.newPage({ viewport: { width: size, height: size } });
  await p.setContent(page(size, glyph));
  await p.screenshot({ path: `${out}/${name}`, clip: { x:0, y:0, width:size, height:size } });
  await p.close();
}
await b.close();
