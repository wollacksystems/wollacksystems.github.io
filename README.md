# wollacksystems.github.io

Marketing site for Wollack Systems, capturing manufacturing expertise before it retires.

Records what experienced operators know (hands-free: a body-worn microphone, fixed cameras, and interviews) and turns it into a searchable, askable library the plant keeps — an ongoing service, not a one-time document.

## What's here

- `src/pages/index.astro` — the Wollack Systems landing page: the whole story, told once (invoice hero, founder + the pitch, why now, how, the work, CTA)
- `src/pages/about.astro` — the founder and the partnership: what Will listens for, and who writes it down. It carries only the beats the landing page doesn't, plus the portrait plates
- `src/pages/journeyman.astro` — the Journeyman product page, a "rust & iron" color variant of the same design system (scoped via `<body data-theme="journeyman">`). It leads with what the product is and then the askable library — the flagship surface — before the engagement, the fit, and the two fee halves (capture quoted per project, library monthly from delivery)
- `src/layouts/BaseLayout.astro` + `src/components/` — the shared shell (head/fonts, header, footer) every page composes
- `src/lib/brand.ts` — the canonical brand mark: the derived small-size silhouette that the header lockup, `/favicon.svg`, and the icon rasters all render
- `src/styles/global.css` — the design system; tokens mirror `DESIGN.md` (the normative spec), with the Journeyman variant folded in as a page-scoped override
- `DESIGN.md` — the design system spec (palette, typography, layout, components)
- `FEATURES.md` — the feature map: what each feature does, where it lives, and how to verify it

Built with [Astro](https://astro.build) (TypeScript, static output): no client-side JS, no dependencies beyond the webfonts (Instrument Serif, Inter, JetBrains Mono).

## Local development

```sh
npm install
npm run dev      # dev server with hot reload
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run check    # astro check (type-check the .astro files)
npm run check:copy  # fail if a built page ships a welded word (run after build)
npm run check:contrast  # fail if a token pair drops below WCAG AA
npm run check:language  # fail if the copy defaults anyone to a gender
```

## Hosting

Deployed to GitHub Pages by CI: `.github/workflows/deploy.yml` builds the site on every push to `main` and publishes `dist/` through GitHub Actions (the repo's Pages source must be set to "GitHub Actions"). A migration to AWS (S3 + CloudFront) is planned as Phase 1 of the platform hosting plan; GitHub Pages stays as a staging mirror until the DNS cutover.

## Brand voice

- **Company:** Wollack Systems (the product work lives under the Journeyman name in the partnership).
- **Terminology rule:** the people recorded are *experienced operators / senior technicians*, never "journeymen" in customer-facing copy.
- **Length:** short sentences, one idea each, and two or three of them per paragraph. Cut the clause before adding one, and give each section a single claim. The pages sit around 400 words each; treat that as the ceiling, not the target.
- **Specifics over adjectives:** keep the concrete details that do the work (`$9,995` for knowing where to tap, `300–500` people, `six hours` of explanation) and drop the words around them.
- **Tell each beat once:** the landing page owns the origin — the pitch, the cofounder it found, the arithmetic of why now. `/about` carries only what `/` doesn't (the founder, the partnership) and links to `/journeyman` rather than restating it. If a sentence reads the same on two pages, one of the two is wrong.
- **No gendered pronouns:** nobody in the copy is defaulted to a gender. Name the person (`Will`, `Ethan`) or the role (the founder, the operator, the engineer, the machinist), and write the generic case in the plural or the second person. `npm run check:language` fails the build on a gendered pronoun or noun.
- Contact CTAs point at [willwollack@gmail.com](mailto:willwollack@gmail.com).
