// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://recyclopedia.cc',
  integrations: [svelte(), sitemap({ filter: (page) => !page.includes('/dropoff/') })],
  vite: {
    resolve: {
      alias: {
        'astro/entrypoints/prerender': fileURLToPath(
          import.meta.resolve('astro/entrypoints/prerender')
        ),
      },
    },
  },
});
