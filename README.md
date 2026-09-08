# wollacksystems.github.io

Marketing site for Wollack Systems — capturing manufacturing expertise before it retires.

Records what experienced operators know — hands-free, body-worn cameras — and turns it into a permanent, searchable record the plant owns.

## What's here

- `index.html` + `style.css` — the Wollack Systems landing page (hero, problem, how-it-works, value, pricing, CTAs)
- `journeyman.html` + `journeyman.css` — the Journeyman product page, a "rust & iron" color variant of the same design system
- `DESIGN.md` — the design system spec (palette, typography, layout, components)

The site is intentionally a plain static page: no build step, no framework, no dependencies beyond two webfonts (Instrument Serif + Inter).

## Local development

Serve the directory with any static file server and open `index.html`:

```sh
npx serve .
```

Or just open `index.html` in a browser.

## Hosting

Currently deployed to GitHub Pages via the `main` branch. A migration to AWS (S3 + CloudFront) is planned as Phase 1 of the platform hosting plan; GitHub Pages stays as a staging mirror until the DNS cutover.

## Brand voice

- **Company:** Wollack Systems (the product work lives under the Journeyman name in the partnership).
- **Terminology rule:** the people recorded are *experienced operators / senior technicians* — never "journeymen" in customer-facing copy.
- Contact CTAs point at [willwollack@gmail.com](mailto:willwollack@gmail.com).