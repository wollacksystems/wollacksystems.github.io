# wollacksystems.github.io

Marketing site for Wollack Systems, capturing manufacturing expertise before it retires.

Records what experienced operators know (hands-free: a body-worn microphone, fixed cameras, and interviews) and turns it into a searchable, askable library the plant keeps — an ongoing service, not a one-time document.

## What's here

- `src/pages/index.astro` — the Wollack Systems landing page: the whole story, told once (invoice hero, founder + the pitch, why now, how, the work, CTA)
- `src/pages/about.astro` — the founder and the partnership: what Will listens for, and who writes it down. It carries only the beats the landing page doesn't, plus the portrait plates
- `src/pages/journeyman.astro` — the Journeyman product page, a "rust & iron" color variant of the same design system (scoped via `<body data-theme="journeyman">`). It leads with what the product is and then the askable library — the flagship surface, shown as a working demo — before the engagement, the fit, and the two fee halves (capture quoted per project, library monthly from delivery)
- `src/components/AskLibraryDemo.astro` + `src/lib/library-demo.ts` (the sample corpus) + `src/lib/retrieval.ts` (the matching, split out so the client bundle carries no second copy of the answers) — the askable-library demo: a question box over four captured jobs from a sample plant, each answer stamped with the segment it came from. Scripted and offline by design (no network, no model, no tokens); the copy and the corpus are in the markup, so the default answer renders without JavaScript, and `npm run check:demo` guards the wiring and runs a labeled question battery through the retrieval
- `src/layouts/BaseLayout.astro` + `src/components/` — the shared shell (head/fonts, header, footer) every page composes
- `src/lib/brand.ts` — the canonical brand mark: the derived small-size silhouette that the header lockup, `/favicon.svg`, and the icon rasters all render
- `src/styles/global.css` — the design system; tokens mirror `DESIGN.md` (the normative spec), with the Journeyman variant folded in as a page-scoped override
- `DESIGN.md` — the design system spec (palette, typography, layout, components)
- `FEATURES.md` — the feature map: what each feature does, where it lives, and how to verify it

Built with [Astro](https://astro.build) (TypeScript, static output): no dependencies beyond the webfonts (Instrument Serif, Inter, JetBrains Mono), and exactly one piece of client-side JavaScript — the scripted demo above, which ships only on `/journeyman`.

## Local development

```sh
npm install
npm run dev      # dev server with hot reload
npm run build    # production build into dist/
npm run preview  # serve the production build locally
npm run check    # astro check (type-check the .astro files)
npm run check:copy  # fail if a built page ships a welded word (run after build)
npm run check:demo  # fail if the demo's questions, answers, or sources stop lining up
npm run check:contrast  # fail if a token pair drops below WCAG AA
npm run check:language  # fail if the copy defaults anyone to a gender
```

## Hosting

Deployed to GitHub Pages by CI: `.github/workflows/deploy.yml` builds the site on every push to `main` and publishes `dist/` through GitHub Actions (the repo's Pages source must be set to "GitHub Actions"). A migration to AWS (S3 + CloudFront) is planned as Phase 1 of the platform hosting plan; GitHub Pages stays as a staging mirror until the DNS cutover.

## Brand voice

- **Company:** Wollack Systems (the product work lives under the Journeyman name in the partnership).
- **Terminology rule:** the people recorded are *experienced operators / senior technicians*, never "journeymen" in customer-facing copy.
- **Length:** short sentences, one idea each, and two or three of them per paragraph. Cut the clause before adding one, and give each section a single claim. The story pages (`/`, `/about`) sit around 400 words each; treat that as the ceiling, not the target. `/journeyman` is the exception: it carries the product detail and the demo, so it runs longer on purpose — around 410 words of prose plus the demo's own 340, and the prose is what a trim pass should cut. A claim stated twice is the usual reason a band runs long: state it where a buyer reads it first and delete the echo.
- **The demo is scripted, and says so:** it answers from a fixed sample corpus, offline, with no model and no tokens. Keep it labeled a sample — no invented customer, plant, or operator — and keep the promise the page makes, that every answer names the segment it came from. A question it cannot answer gets the miss state, not a best guess: the battery in `scripts/check-demo.mjs` is the record of that, and `npm run check:demo` also fails on a broken question/answer pair, on more than one answer rendering on load, or on a network call appearing in the script.
- **Specifics over adjectives:** keep the concrete details that do the work (`$9,995` for knowing where to tap, `300–500` people, `six hours` of explanation) and drop the words around them.
- **Tell each beat once:** the landing page owns the origin — the pitch, the cofounder it found, the arithmetic of why now. `/about` carries only what `/` doesn't (the founder, the partnership) and links to `/journeyman` rather than restating it. If a sentence reads the same on two pages, one of the two is wrong.
- **No gendered pronouns:** nobody in the copy is defaulted to a gender. Name the person (`Will`, `Ethan`) or the role (the founder, the operator, the engineer, the machinist), and write the generic case in the plural or the second person. `npm run check:language` fails the build on a gendered pronoun or noun.
- Contact CTAs point at [willwollack@gmail.com](mailto:willwollack@gmail.com).
