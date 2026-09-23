// Donate Electronics on lettucebeetgrapefruit.com (Pit Board E).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './_load.mjs';
import { validate, onRequestPost } from '../../functions/api/donate.js';
import { onRequest as middleware } from '../../functions/_middleware.js';

test('the intake switch and the client flag are flipped together', () => {
  const flags = readFileSync(path.join(ROOT, 'src', 'data', 'flags.ts'), 'utf8');
  const wrangler = readFileSync(path.join(ROOT, 'wrangler.jsonc'), 'utf8');
  const client = /export const DONATE_INTAKE_LIVE = (true|false);/.exec(flags)?.[1];
  const server = /"DONATE_INTAKE_ENABLED":\s*"([01])"/.exec(wrangler)?.[1];
  assert.ok(client && server, 'could not read both switches');
  assert.equal(client === 'true', server === '1', `DONATE_INTAKE_LIVE=${client} but DONATE_INTAKE_ENABLED="${server}"`);
});

test('validation accepts a real donation and names the first bad field', () => {
  const good = { item: 'Laptop', condition: 'working', quantity: '2', name: 'Jane', email: 'jane@example.com', zip: '32801' };
  const ok = validate(good);
  assert.equal(ok.ok, true);
  assert.equal(ok.value.quantity, 2);
  assert.equal(validate({ ...good, item: ' ' }).field, 'item');
  assert.equal(validate({ ...good, condition: 'mint' }).field, 'condition');
  assert.equal(validate({ ...good, quantity: '0' }).field, 'quantity');
  assert.equal(validate({ ...good, email: 'nope' }).field, 'email');
  assert.equal(validate(null).field, 'body');
});

test('switched off, the endpoint answers 503 and touches nothing', async () => {
  const req = new Request('https://lettucebeetgrapefruit.com/api/donate', { method: 'POST', body: '{}', headers: { 'content-type': 'application/json' } });
  const res = await onRequestPost({ request: req, env: { DONATE_INTAKE_ENABLED: '0' } });
  assert.equal(res.status, 503);
  assert.equal(res.headers.get('cache-control'), 'no-store');
});

test('switched on, a donation is stored; a filled honeypot is not', async () => {
  const rows = [];
  const env = {
    DONATE_INTAKE_ENABLED: '1',
    DONATIONS: { prepare: () => ({ bind: (...a) => ({ run: async () => rows.push(a) }) }) },
  };
  globalThis.caches ??= { default: { match: async () => undefined, put: async () => {} } };
  const post = (body) => onRequestPost({ env, request: new Request('https://lettucebeetgrapefruit.com/api/donate', {
    method: 'POST', body: JSON.stringify(body),
    headers: { 'content-type': 'application/json', origin: 'https://lettucebeetgrapefruit.com' },
  }) });
  const base = { item: 'Printer', condition: 'not-working', quantity: '1', name: 'Sam', email: 'sam@example.com' };
  assert.equal((await post(base)).status, 201);
  assert.equal(rows.length, 1);
  assert.equal((await post({ ...base, website: 'http://spam' })).status, 201);
  assert.equal(rows.length, 1, 'honeypot submission was stored');
  assert.equal((await post({ ...base, email: 'x' })).status, 422);
});

test('lettucebeetgrapefruit.com/donate serves the LBG donation page', async () => {
  const seen = [];
  const next = (req) => { seen.push(req ? new URL(req.url).pathname : null); return new Response('ok'); };
  await middleware({ request: new Request('https://lettucebeetgrapefruit.com/donate'), next });
  await middleware({ request: new Request('https://www.lettucebeetgrapefruit.com/donate/'), next });
  await middleware({ request: new Request('https://lettucebeetgrapefruit.com/'), next });
  await middleware({ request: new Request('https://recyclopedia.cc/donate'), next });
  assert.deepEqual(seen, ['/lbg/donate/', '/lbg/donate/', '/lbg/', null]);
});

test('the built pages: the form is on LBG, recyclopedia.cc points there', () => {
  const lbg = path.join(ROOT, 'dist', 'lbg', 'donate', 'index.html');
  const home = path.join(ROOT, 'dist', 'index.html');
  if (!existsSync(lbg) || !existsSync(home)) throw new Error('not built — run `npm run build` first (or `npm test`).');
  const l = readFileSync(lbg, 'utf8');
  const h = readFileSync(home, 'utf8');
  assert.match(l, /id="donation-form"/);
  assert.match(l, /data-intake="email"/);
  assert.match(l, /\/js\/donate\.js/);
  assert.doesNotMatch(h, /id="donation-form"/);
  assert.match(h, /https:\/\/lettucebeetgrapefruit\.com\/donate\//);
});
