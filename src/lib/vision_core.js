// Vision core (Lens master plan, Card C.1) — the prompt, the schema, and the
// rules applied to whatever the model says. Plain JS with no imports so that
// the Pages Function, the benchmark, and `node --test` all run the same code.
//
// The model proposes; this file disposes. Nothing here trusts the model:
// slugs outside the vocabulary are dropped, confidence is clamped, and an
// identity is only ever *asserted* at or above the AP_GUIDELINES floor.

export const CONFIDENCE_FLOOR = 0.6;
export const MAX_CANDIDATES = 3;

export const CANDIDATE_SCHEMA = {
  type: 'object',
  properties: {
    candidates: {
      type: 'array', maxItems: MAX_CANDIDATES,
      items: {
        type: 'object',
        properties: { slug: { type: 'string' }, confidence: { type: 'number' } },
        required: ['slug', 'confidence'],
      },
    },
    material_guess: { type: 'string' },
    hazard_flag: { type: 'boolean' },
  },
  required: ['candidates', 'material_guess', 'hazard_flag'],
};

/** AP_GUIDELINES in three lines + the closed list. `vocab` = VOCAB from recognition.ts. */
export function buildSystemPrompt(vocab) {
  return [
    'You identify ONE household object for a recycling encyclopedia.',
    'Choose only from the provided list. If you are unsure which exact item it is, prefer a "category:" entry — never invent a slug and never guess.',
    'Flag hazards (batteries, chemicals, sharps, pressurised cans).',
    '',
    'List:',
    vocab.map((v) => (v.aliases.length ? `${v.slug} (${v.label}; ${v.aliases.slice(0, 4).join(', ')})` : `${v.slug} (${v.label})`)).join('\n'),
  ].join('\n');
}

export const USER_PROMPT = 'Identify the single main object in this photo.';

/** Pull the JSON string out of either response shape (REST `result`, or the binding's return). */
export function extractContent(result) {
  const r = result?.result ?? result;
  const content = r?.choices?.[0]?.message?.content ?? r?.response ?? '';
  return typeof content === 'string' ? content : JSON.stringify(content);
}

/**
 * Model text → what the client may be told.
 *   vocabSlugs  Set of every slug in VOCAB
 *   hazardSlugs Set of item slugs whose card is hazardous (items.ts `hazard`)
 *               plus the hazardous categories — a hazard we know about does
 *               not depend on the model remembering to flag it.
 */
export function postProcess(content, { vocabSlugs, hazardSlugs = new Set() }) {
  let parsed = null;
  try { parsed = typeof content === 'string' ? JSON.parse(content) : content; } catch { /* not JSON → no candidates */ }
  const raw = Array.isArray(parsed?.candidates) ? parsed.candidates : [];

  const seen = new Set();
  const candidates = raw
    .filter((c) => c && typeof c.slug === 'string' && vocabSlugs.has(c.slug))
    .map((c) => {
      const n = Number(c.confidence);
      return { slug: c.slug, confidence: Number.isFinite(n) ? Math.min(1, Math.max(0, n)) : 0 };
    })
    .sort((a, b) => b.confidence - a.confidence)
    .filter((c) => (seen.has(c.slug) ? false : (seen.add(c.slug), true)))
    .slice(0, MAX_CANDIDATES);

  const dropped = raw.filter((c) => !c || typeof c.slug !== 'string' || !vocabSlugs.has(c.slug)).map((c) => String(c?.slug ?? ''));
  const hazard_flag = parsed?.hazard_flag === true || candidates.some((c) => hazardSlugs.has(c.slug));
  const material_guess = typeof parsed?.material_guess === 'string' ? parsed.material_guess.slice(0, 80) : '';

  const out = {
    candidates,
    assert: candidates.length > 0 && candidates[0].confidence >= CONFIDENCE_FLOOR,
    material_guess,
    hazard_flag,
  };
  if (hazard_flag) out.safe_path = 'hhw'; // safety override: shown above whatever else
  return { ...out, dropped };
}
