// Build-time export of the materials table (Card A.3): read by the node tests
// from dist/data/materials.json, and public as the first "database as Academy
// material" artifact. Content licence: CC BY-NC-SA 4.0 (same as the site).
import { CATEGORY_DEFAULT_MATERIAL, MATERIALS } from '../../data/materials';
import { LESSONS, LESSON_BY_MATERIAL } from '../../data/lessons';
import versionSource from '../../../VERSION?raw';

export function GET() {
  const body = {
    version: versionSource.trim(),
    license: 'CC BY-NC-SA 4.0',
    source: 'https://recyclopedia.cc/data/materials.json',
    off_taxonomy: 'https://static.openfoodfacts.org/data/taxonomies/packaging_materials.json',
    category_default_material: CATEGORY_DEFAULT_MATERIAL,
    // `lesson` = the Academy module that teaches this material's routing (Card D.2).
    materials: MATERIALS.map((m) => {
      const key = LESSON_BY_MATERIAL[m.id];
      return key ? { ...m, lesson: LESSONS[key].url } : m;
    }),
  };
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
