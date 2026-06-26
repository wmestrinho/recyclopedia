import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Recyclopedia Academy lessons. Each lesson is a markdown file in
// src/content/academy/. Frontmatter drives routing, the catalog cards, and
// which quiz islands mount inside the lesson. See DATA_SCHEMA.md for the
// broader data philosophy; this is the education layer.
const academy = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/academy' }),
  schema: z.object({
    title: z.string(),
    // Citizen-first taxonomy reconciled with the live 6-module homepage grid.
    track: z.enum(['Citizen Science & Action', 'System & Logistics']),
    module: z.string(), // human module id, e.g. "1.1"
    order: z.number(), // sort order within the catalog
    summary: z.string(), // one-line card descriptor
    lang: z.string().default('en'),
    quizzes: z.array(z.string()).default([]), // ids resolved from src/data/quizzes.ts
    draft: z.boolean().default(false),
  }),
});

export const collections = { academy };
