# wollacksystems.github.io

Marketing site for Wollack Systems — capturing manufacturing expertise before it retires.

Records what experienced operators know — hands-free, body-worn cameras — and turns it into a permanent, searchable record the plant owns.

## What's here

- `src/pages/index.astro` — the Wollack Systems landing page (hero, problem, how-it-works, value, pricing, CTAs)
- `src/pages/journeyman.astro` — the Journeyman product page, a "rust & iron" color variant of the same design system (scoped via `<body data-theme="journeyman">`)
- `src/layouts/BaseLayout.astro` + `src/components/` — the shared shell (head/fonts, header, footer) every page composes
- `src/styles/global.css` — the design system; tokens mirror `DESIGN.md` (the normative spec), with the Journeyman variant folded in as a page-scoped override
- `DESIGN.md` — the design system spec (palette, typography, layout, components)

Built with [Astro](https://astro.build) (TypeScript, static output): no client-side JS, no dependencies beyond the webfonts (Instrument Serif, Inter, JetBrains Mono).

## Local development

```sh
npm install
npm run dev      # dev server with hot reload
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Hosting

Deployed to GitHub Pages by CI: `.github/workflows/deploy.yml` builds the site on every push to `main` and publishes `dist/` through GitHub Actions (the repo's Pages source must be set to "GitHub Actions"). A migration to AWS (S3 + CloudFront) is planned as Phase 1 of the platform hosting plan; GitHub Pages stays as a staging mirror until the DNS cutover.

## Brand voice

- **Company:** Wollack Systems (the product work lives under the Journeyman name in the partnership).
- **Terminology rule:** the people recorded are *experienced operators / senior technicians* — never "journeymen" in customer-facing copy.
- Contact CTAs point at [willwollack@gmail.com](mailto:willwollack@gmail.com).
