// POST /api/donate   body: application/json, ≤ 8 KB
//
// Donate Electronics intake for lettucebeetgrapefruit.com/donate/ (Pit Board E,
// 2026-09-21: the donation form moves to the LBG .com property "and build
// intake there"). Stores what the donor typed in the D1 table from
// db/intake/schema.sql and answers { ok: true, id }.
//
// SWITCHED OFF until the owner has done three things:
//   1. created the D1 database and applied db/intake/schema.sql;
//   2. bound it in wrangler.jsonc as `DONATIONS` and set
//      "DONATE_INTAKE_ENABLED": "1";
//   3. set DONATE_INTAKE_LIVE = true in src/data/flags.ts (a test refuses 2
//      without 3), and updated the privacy notice with the retention period.
// While off, every request gets 503 and public/js/donate.js hands off to the
// donor's own email app, exactly as before.
//
// Privacy: stores only the form fields. No IP address, no user agent, no
// cookies. The in-memory rate limit keys on the IP for one minute and never
// writes it anywhere.

const MAX_BYTES = 8 * 1024;
const LIMIT_PER_MINUTE = 5;
const CONDITIONS = new Set(['working', 'partially-working', 'not-working', 'unknown']);
const ALLOWED_HOSTS = new Set([
  'lettucebeetgrapefruit.com', 'www.lettucebeetgrapefruit.com',
  'recyclopedia.cc', 'www.recyclopedia.cc', 'localhost', '127.0.0.1',
]);

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
  });
}

async function overLimit(request) {
  try {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const minute = Math.floor(Date.now() / 60000);
    const key = new Request(`https://ratelimit.recyclopedia.invalid/donate/${encodeURIComponent(ip)}/${minute}`);
    const cache = caches.default;
    const hit = await cache.match(key);
    const count = hit ? Number(await hit.text()) || 0 : 0;
    if (count >= LIMIT_PER_MINUTE) return true;
    await cache.put(key, new Response(String(count + 1), { headers: { 'Cache-Control': 'max-age=90' } }));
    return false;
  } catch {
    return false;
  }
}

const text = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Validate and normalise the donor's fields. Returns { ok, value } or { ok: false, field }. */
export function validate(body) {
  if (!body || typeof body !== 'object') return { ok: false, field: 'body' };
  const v = {
    item: text(body.item, 120),
    condition: text(body.condition, 32),
    quantity: Number.parseInt(body.quantity ?? '1', 10),
    name: text(body.name, 120),
    email: text(body.email, 254),
    phone: text(body.phone, 40) || null,
    zip: text(body.zip, 10) || null,
    notes: text(body.notes, 2000) || null,
  };
  if (!v.item) return { ok: false, field: 'item' };
  if (!CONDITIONS.has(v.condition)) return { ok: false, field: 'condition' };
  if (!Number.isInteger(v.quantity) || v.quantity < 1 || v.quantity > 99) return { ok: false, field: 'quantity' };
  if (!v.name) return { ok: false, field: 'name' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) return { ok: false, field: 'email' };
  if (v.zip && !/^[0-9A-Za-z -]{3,10}$/.test(v.zip)) return { ok: false, field: 'zip' };
  return { ok: true, value: v };
}

export async function onRequestPost({ request, env }) {
  if (env.DONATE_INTAKE_ENABLED !== '1' || !env.DONATIONS) return json({ error: 'intake_disabled' }, 503);

  const host = new URL(request.url).hostname.toLowerCase();
  const origin = request.headers.get('origin');
  if (origin) {
    let oh = '';
    try { oh = new URL(origin).hostname.toLowerCase(); } catch { /* fall through */ }
    if (!ALLOWED_HOSTS.has(oh) && !oh.endsWith('.recyclopedia.pages.dev')) return json({ error: 'forbidden_origin' }, 403);
  }

  const type = (request.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (type !== 'application/json') return json({ error: 'unsupported_media_type', accepts: 'application/json' }, 415);
  if (Number(request.headers.get('content-length') || 0) > MAX_BYTES) return json({ error: 'too_large' }, 413);
  if (await overLimit(request)) return json({ error: 'rate_limited' }, 429, { 'Retry-After': '60' });

  const raw = await request.text();
  if (raw.length > MAX_BYTES) return json({ error: 'too_large' }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: 'bad_json' }, 400); }

  // Honeypot filled: answer like a success so the bot learns nothing, store nothing.
  if (typeof body?.website === 'string' && body.website.trim()) return json({ ok: true, id: null }, 201);

  const check = validate(body);
  if (!check.ok) return json({ error: 'invalid', field: check.field }, 422);
  const d = check.value;

  const id = crypto.randomUUID();
  try {
    await env.DONATIONS.prepare(
      `INSERT INTO donation (id, received_at, site, item, condition, quantity, name, email, phone, zip, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).bind(id, new Date().toISOString(), host, d.item, d.condition, d.quantity, d.name, d.email, d.phone, d.zip, d.notes).run();
  } catch {
    return json({ error: 'store_failed' }, 500);
  }
  return json({ ok: true, id }, 201);
}

export function onRequest() {
  return json({ error: 'method_not_allowed' }, 405, { Allow: 'POST' });
}
