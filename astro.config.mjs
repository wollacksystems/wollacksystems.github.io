// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Org site served at the apex; no base prefix needed.
  // Required by @astrojs/sitemap and canonical/OG URLs (#9).
  site: 'https://wollacksystems.github.io',
  integrations: [sitemap()],

  // The Journeyman product surface moved to journeymanmfg.com (2026-10-14;
  // it now lives in wollacksystems/journeyman's site/). Static output turns
  // each entry into a meta-refresh page, so old /journeyman* URLs — and the
  // console's shipped Guides link until its next deploy — land on the new
  // domain instead of 404ing.
  redirects: {
    '/journeyman': 'https://journeymanmfg.com/',
    '/journeyman/guides': 'https://journeymanmfg.com/guides/',
    '/journeyman/docs': 'https://journeymanmfg.com/docs/',
    '/journeyman/docs/start': 'https://journeymanmfg.com/docs/start/',
    '/journeyman/docs/asking': 'https://journeymanmfg.com/docs/asking/',
    '/journeyman/docs/citations': 'https://journeymanmfg.com/docs/citations/',
    '/journeyman/docs/recordings': 'https://journeymanmfg.com/docs/recordings/',
    '/journeyman/docs/admin': 'https://journeymanmfg.com/docs/admin/',
    '/journeyman/docs/troubleshooting': 'https://journeymanmfg.com/docs/troubleshooting/',
  },

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
