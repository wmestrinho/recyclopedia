// POST /api/vision   body: image/jpeg, ≤ 1 MB
//
// Tier 3 of the engine (Lens master plan, Card C.1). The phone downsizes a
// photo to ~768 px and sends it once; a Workers AI vision model picks up to
// three entries from our closed vocabulary; src/lib/vision_core.js decides what
// the client may be told (unknown slugs dropped, confidence clamped, identity
// asserted only at ≥ 0.6, hazards always carry the safe path).
//
// Privacy: the image is held in memory for the length of this request and
// never stored, logged, or cached. Responses are `no-store`.
//
// SWITCHED OFF until the Card C.0 benchmark has picked the model and decided
// item-level vs category-only: `VISION_ENABLED` must be "1" (wrangler.jsonc
// `vars`), otherwise every request gets 503 and no model is ever called.
import { ITEMS } from '../../src/data/items';
import { VOCAB, categorySlug } from '../../src/data/recognition';
import { CANDIDATE_SCHEMA, USER_PROMPT, buildSystemPrompt, extractContent, postProcess } from '../../src/lib/vision_core.js';

// Provisional — the primary hypothesis going into C.0 (structured output +
// closed vocabulary). The benchmark's decision replaces this line.
const MODEL = '@cf/meta/llama-4-scout-17b-16e-instruct';

const MAX_BYTES = 1024 * 1024;
const LIMIT_PER_MINUTE = 10;

const SYSTEM_PROMPT = buildSystemPrompt(VOCAB);
const VOCAB_SLUGS = new Set(VOCAB.map((v) => v.slug));
const HAZARD_SLUGS = new Set([
  ...ITEMS.filter((i) => i.hazard).map((i) => i.slug),
  categorySlug('Batteries'), categorySlug('Hazardous'),
]);

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
  });
}

/** Best-effort 10/min per IP on the edge cache. The dashboard rate-limiting rule is the real guard. */
async function overLimit(request) {
  try {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const minute = Math.floor(Date.now() / 60000);
    const key = new Request(`https://ratelimit.recyclopedia.invalid/vision/${encodeURIComponent(ip)}/${minute}`);
    const cache = caches.default;
    const hit = await cache.match(key);
    const count = hit ? Number(await hit.text()) || 0 : 0;
    if (count >= LIMIT_PER_MINUTE) return true;
    await cache.put(key, new Response(String(count + 1), { headers: { 'Cache-Control': 'max-age=90' } }));
    return false;
  } catch {
    return false; // never fail a scan because the counter did
  }
}

function toBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

export async function onRequestPost({ request, env }) {
  if (env.VISION_ENABLED !== '1' || !env.AI) return json({ error: 'vision_disabled' }, 503);

  const type = (request.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (type !== 'image/jpeg') return json({ error: 'unsupported_media_type', accepts: 'image/jpeg' }, 415);
  if (Number(request.headers.get('content-length') || 0) > MAX_BYTES) return json({ error: 'too_large', max_bytes: MAX_BYTES }, 413);

  if (await overLimit(request)) return json({ error: 'rate_limited' }, 429, { 'Retry-After': '60' });

  const bytes = new Uint8Array(await request.arrayBuffer());
  if (bytes.length > MAX_BYTES) return json({ error: 'too_large', max_bytes: MAX_BYTES }, 413);
  // A JPEG starts FF D8 FF — the header can lie, the bytes cannot.
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
    return json({ error: 'unsupported_media_type', accepts: 'image/jpeg' }, 415);
  }

  let result;
  try {
    result = await env.AI.run(MODEL, {
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: [
          { type: 'text', text: USER_PROMPT },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${toBase64(bytes)}` } },
        ] },
      ],
      guided_json: CANDIDATE_SCHEMA,
      max_tokens: 256,
    });
  } catch {
    return json({ error: 'vision_unavailable' }, 502);
  }

  const { dropped, ...answer } = postProcess(extractContent(result), { vocabSlugs: VOCAB_SLUGS, hazardSlugs: HAZARD_SLUGS });
  return json(answer);
}

// Anything but POST (Pages prefers the method-specific handler above).
export function onRequest() {
  return json({ error: 'method_not_allowed' }, 405, { Allow: 'POST' });
}
