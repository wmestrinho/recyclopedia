// prebuild: self-host the ZXing WASM reader that `barcode-detector` needs, so
// the barcode scanner never fetches a binary from a third-party CDN (privacy
// line under the viewfinder; CSP/offline-friendly for the PWA phase).
// Output is gitignored (public/vendor/); Astro copies public/ into dist/.
import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'node_modules', 'zxing-wasm', 'dist', 'reader', 'zxing_reader.wasm');
const outDir = path.join(root, 'public', 'vendor');
mkdirSync(outDir, { recursive: true });
copyFileSync(src, path.join(outDir, 'zxing_reader.wasm'));
console.log(`[prebuild] zxing_reader.wasm → public/vendor/ (${Math.round(statSync(src).size / 1024)} KB)`);
