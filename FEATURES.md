# Features

What the site does, where each feature starts, where it lives, and how to check it. Keep this current as features land; the agent or contributor changing a feature updates its row in the same change.

| Feature | Where it starts | Where it lives | How to check it |
| --- | --- | --- | --- |
| Landing page | Visitor opens `/` | `src/pages/index.astro` | `npm run build`, then read `dist/index.html`; story sections, invoice panel, pricing |
| Founder story page | Visitor opens `/about` | `src/pages/about.astro` | Build and read `dist/about/index.html`; steps 01–04, cofounder portrait plate |
| Journeyman product page | Visitor opens `/journeyman` | `src/pages/journeyman.astro` | Build and read `dist/journeyman/index.html`; Rust & Iron theme via `<body data-theme="journeyman">` |
| Shared shell (header, footer, fonts, meta) | Every page render | `src/layouts/BaseLayout.astro`, `src/components/` | Change a nav label in `SiteHeader.astro`, rebuild, see it on all three pages |
| Design system and Journeyman theme variant | Any visual change | `src/styles/global.css` (tokens mirror `DESIGN.md`, the normative spec); theme override on `body[data-theme="journeyman"]` | Compare `/` and `/journeyman` palettes; reduced-motion block near the Responsive section |
| Drop-in portraits (founder and cofounder) | Copy a PNG into `public/` | `src/lib/schema.ts` detects `public/will-wollack.png` and `public/ethan-davidson.png` at build time via `existsSync` and exports root-relative and absolute URLs; `about.astro` renders plates with a typographic placeholder when absent | Delete a PNG, rebuild: placeholder renders and JSON-LD drops the image; restore it and rebuild to reverse. Absolute URLs feed Person JSON-LD |
| SEO metadata and social cards | Every page's `<head>` | `BaseLayout.astro` (canonical, Open Graph, Twitter), per-page title/description props | View source on a built page; canonical must end in `/` and match the served URL |
| Structured data (JSON-LD) | Every page's `<head>` | `src/lib/schema.ts` builds entities, `src/components/JsonLd.astro` emits them | Paste a built page's JSON-LD into validator.schema.org |
| Sitemap and robots.txt | Crawlers | `astro.config.mjs` (`site` is the single source of truth) + `@astrojs/sitemap` emit `sitemap-index.xml`; `src/pages/robots.txt.ts` points at it | `npm run build`, then check `dist/sitemap-index.xml` and `dist/robots.txt` |
| CI checks | Pull requests | `.github/workflows/ci.yml` runs `astro check` + build | Open or update a PR, watch the `ci` run |
| Pages deploy | Push to `main` | `.github/workflows/deploy.yml` builds and publishes via the GitHub Actions Pages source | `gh run list` on the repo; verify production after each deploy |

## Limitations

- No client-side JavaScript anywhere; interactivity is CSS only (hover reveals, sticky header, smooth anchors). Features needing state are out of scope for this stack.
- The preview webview in the Freebuff desktop app cannot resize below 613px and may not composite frames for screenshots; verify phone-width behavior with a real browser, devtools device mode, or a same-origin iframe probe.
- Portrait URLs are resolved at build time, so adding or removing a PNG requires a rebuild to take effect.
- Contact CTAs are plain `mailto:` links; there is no form or backend by design.
