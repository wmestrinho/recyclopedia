// Build-time export of the vision vocabulary + item facts the tests need
// (Card A.3). Public, CC BY-NC-SA 4.0.
import { CATEGORIES, ITEMS } from '../../data/items';
import { VOCAB } from '../../data/recognition';
import versionSource from '../../../VERSION?raw';

export function GET() {
  const body = {
    version: versionSource.trim(),
    license: 'CC BY-NC-SA 4.0',
    categories: CATEGORIES.filter((c) => c !== 'All'),
    vocab: VOCAB,
    items: ITEMS.map(({ slug, name, cat, status, hazard, aliases, material_codes, dispositions }) => ({
      slug, name, cat, status, hazard, aliases: aliases ?? [], material_codes: material_codes ?? [],
      sources: dispositions.map((d) => d.source).filter(Boolean),
    })),
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
