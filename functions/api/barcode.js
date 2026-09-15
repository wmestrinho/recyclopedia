// GET /api/barcode?gtin=<8|12|13|14 digits>
//
// Tier 2 of the engine (Lens master plan, Card B.4). The phone decodes the
// barcode on-device; this function turns a GTIN into product identity and
// packaging components via the Open Food Facts family (ODbL), then maps each
// component's material + shape onto our material-first layer.
//
// Privacy: the GTIN is the only thing received; it is never logged. Responses
// are cached by URL for 24 h in the edge cache (a GTIN is not personal data).
// Open Food Facts is the source for product/packaging FACTS — disposal advice
// only ever comes from materials.ts / items.ts.
import { itemSlugFor, materialForComponent, materialForOffTag } from '../../src/data/materials';
import pkg from '../../package.json';

const FIELDS = [
  'product_name', 'brands', 'product_type', 'packagings', 'packaging_materials_tags',
  'packaging_shapes_tags', 'packaging_recycling_tags',
].join(',');

// Flavours, in order. OFF v2 product reads are per-flavour; a household GTIN
// often lives in Open Products Facts, a shampoo in Open Beauty Facts.
const FLAVOURS = [
  'world.openfoodfacts.org',
  'world.openproductsfacts.org',
  'world.openbeautyfacts.org',
  'world.openpetfoodfacts.org',
];

const USER_AGENT = `Recyclopedia/${pkg.version} (https://recyclopedia.cc; contact@absolutelyplausible.com)`;
const UPSTREAM_BUDGET_MS = 8000;

function json(body, status = 200, cache = 'no-store') {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': cache },
  });
}

export function validGtin(s) {
  if (!/^\d{8}$|^\d{12,14}$/.test(s)) return false;
  const digits = s.split('').map(Number);
  const check = digits.pop();
  let sum = 0;
  digits.reverse().forEach((n, i) => { sum += n * (i % 2 === 0 ? 3 : 1); });
  return (10 - (sum % 10)) % 10 === check;
}

async function fetchFlavour(host, code, signal) {
  const url = `https://${host}/api/v2/product/${code}.json?fields=${FIELDS}`;
  const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' }, signal });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`upstream ${res.status}`);
  const data = await res.json();
  return data && data.status === 1 && data.product ? data.product : null;
}

/** Try the code as read; a 12-digit UPC-A may be stored as a 13-digit EAN with a leading zero. */
function codeVariants(gtin) {
  const v = [gtin];
  if (gtin.length === 12) v.push('0' + gtin);
  if (gtin.length === 13 && gtin.startsWith('0')) v.push(gtin.slice(1));
  return v;
}

export function mapComponents(packagings) {
  const out = [];
  const seen = new Set();
  for (const p of Array.isArray(packagings) ? packagings : []) {
    const tag = typeof p.material === 'string' ? p.material : null;
    const shape = typeof p.shape === 'string' ? p.shape : null;
    const base = materialForOffTag(tag);
    const material = materialForComponent(base, shape);
    const item_slug = itemSlugFor(base, shape) ?? null;
    const key = `${material?.id ?? tag ?? ''}|${shape ?? ''}|${item_slug ?? ''}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      off_material: tag,
      material_id: material?.id ?? null,
      material_name: material?.name ?? null,
      category: material?.category ?? null,
      shape,
      recycling: typeof p.recycling === 'string' ? p.recycling : null,
      item_slug,
    });
  }
  return out;
}

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const gtin = (url.searchParams.get('gtin') || '').trim();
  if (!validGtin(gtin)) {
    return json({ found: false, error: 'invalid_gtin', hint: '8, 12, 13 or 14 digits with a valid check digit' }, 400);
  }

  const cacheKey = new Request(`${url.origin}/api/barcode?gtin=${gtin}`, { method: 'GET' });
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_BUDGET_MS);
  let product = null;
  let host = null;
  let upstreamFailed = false;
  try {
    outer: for (const code of codeVariants(gtin)) {
      for (const flavour of FLAVOURS) {
        try {
          product = await fetchFlavour(flavour, code, controller.signal);
        } catch (e) {
          if (controller.signal.aborted) { upstreamFailed = true; break outer; }
          upstreamFailed = true; // one flavour down is not fatal; keep going
          continue;
        }
        if (product) { host = flavour; break outer; }
      }
    }
  } finally {
    clearTimeout(timer);
  }

  const contribute_url = `https://world.openfoodfacts.org/cgi/product.pl?type=add&code=${gtin}`;

  if (!product) {
    const body = { found: false, gtin, components: [], source: 'openfoodfacts', contribute_url };
    if (upstreamFailed) return json({ ...body, error: 'upstream' }, 502);
    const res = json(body, 200, 'public, max-age=3600');
    await cache.put(cacheKey, res.clone());
    return res;
  }

  const body = {
    found: true,
    gtin,
    product: {
      name: product.product_name || '',
      brand: product.brands || '',
      type: product.product_type || null,
    },
    components: mapComponents(product.packagings),
    source: 'openfoodfacts',
    source_url: `https://${host}/product/${gtin}`,
    contribute_url,
    license: 'ODbL 1.0 — https://opendatacommons.org/licenses/odbl/1-0/',
  };
  const res = json(body, 200, 'public, max-age=86400');
  await cache.put(cacheKey, res.clone());
  return res;
}
