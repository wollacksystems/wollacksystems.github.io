// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Org site served at the apex; no base prefix needed.
  // Required by @astrojs/sitemap and canonical/OG URLs (#9).
  site: 'https://wollacksystems.github.io',
  integrations: [sitemap()],

  // Path alias: @/ maps to src/ so imports like
  // "@/layouts/BaseLayout.astro" resolve consistently for Astro,
  // Vite/rolldown (the build tool), and TypeScript (jsconfig/tsconfig).
  // https://docs.astro.build/en/guides/path-alias/
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  },
});
