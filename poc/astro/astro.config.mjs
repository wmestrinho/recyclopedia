// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// POC config: static output + a Svelte island. Production would add
// @astrojs/cloudflare (SSR) for the Workers AI scanner endpoint. See TECH_STACK.md.
export default defineConfig({
  integrations: [svelte()],
});
