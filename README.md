# wollacksystems.github.io

Marketing site for Wollack Systems, capturing manufacturing expertise before it retires.

Records what experienced operators know (hands-free: a body-worn microphone, fixed cameras, and interviews) and turns it into a searchable, askable library the plant keeps — an ongoing service, not a one-time document.

## What's here

- `src/pages/index.astro` — the Wollack Systems landing page, cut to the Dale test (invoice hero, why now, how it works at your plant, the work, CTA). The team lives on `/about`
- `src/pages/about.astro` — the team: what Will listens for, and who writes it down — who the two halves are and what each does. Plus the portrait plates
- `src/layouts/BaseLayout.astro` + `src/components/` — the shared shell (head/fonts, header, footer) every page composes
- **Two surfaces, two domains, one shell:** the company surface (`/`, `/about`) lives here; the product surface moved to [journeymanmfg.com](https://journeymanmfg.com) (2026-10-14, extracted into `wollacksystems/journeyman`'s `site/`; old `/journeyman*` URLs redirect there). Both still share one header, footer, and design system — the nav's middle links are the current surface's own anchors, and the other surface is one click away in a fixed slot (`Journeyman` here, `Wollack Systems` there). The palette still switches per surface (blue vs. Rust & Iron) — deliberate wayfinding, not inconsistency.
- `src/lib/brand.ts` — the canonical brand mark: the derived small-size silhouette that the header lockup, `/favicon.svg`, and the icon rasters all render
- `src/styles/global.css` — the design system; tokens mirror `DESIGN.md` (the normative spec), with the Journeyman variant folded in as a page-scoped override. **Mirrored verbatim in `wollacksystems/journeyman`'s `site/`: change both repos in the same PR pair** so the two surfaces never drift
- `DESIGN.md` — the design system spec (palette, typography, layout, components)
- `FEATURES.md` — the feature map: what each feature does, where it lives, and how to verify it

Built with [Astro](https://astro.build) (TypeScript, static output): no dependencies beyond the webfonts (Instrument Serif, Inter, JetBrains Mono), and no client-side JavaScript — the one scripted piece the site had (the askable-library demo) moved to journeymanmfg.com with the product surface.

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
npm run check:all   # the type-check plus all three guards — the gate CI and the
                    # Pages deploy both run before anything ships
```

## Hosting

Deployed to GitHub Pages by CI: `.github/workflows/deploy.yml` builds the site on every push to `main`, runs `npm run check:all` — the `astro check` type-check plus the four guards — against the `dist/` it is about to publish, and only then publishes through GitHub Actions (the repo's Pages source must be set to "GitHub Actions"). A failure fails the build job, so the `deploy` job never runs and Pages keeps serving the last build that passed. A migration to AWS (S3 + CloudFront) is planned as Phase 1 of the platform hosting plan; GitHub Pages stays as a staging mirror until the DNS cutover.

## Brand voice

- **Company:** Wollack Systems (the product work lives under the Journeyman name in the partnership).
- **Terminology rule:** the people recorded are *experienced operators / senior technicians*, never "journeymen" in customer-facing copy.
- **Artifact rule:** the deliverable is *the written record*; the surface your team asks is *the library*; the raw captured media is *the recordings* — the word for what your plant owns. Never bare *the record*: the reader can't tell it from the audio.
- **Length:** short sentences, one idea each, and two or three of them per paragraph. Cut the clause before adding one, and give each section a single claim. The story pages (`/` ~350 words, `/about` ~240, chrome included) sit well under 400; treat 400 as the ceiling, not the target. A claim stated twice is the usual reason a band runs long: state it where a buyer reads it first and delete the echo.
- **Section ceiling:** four reading bands per page, hero included — the October 5 session set it ("because then they will start to get lost"), and it applies to every page. CTA bands (the closing ask) don't count toward it: the ceiling limits what a reader must read, not where they act.
- **Specifics over adjectives:** keep the concrete details that do the work (`$9,995` for knowing where to tap, `50–500` people, `six hours` of explanation) and drop the words around them.
- **Tell each beat once:** `/about` carries the team — who they are and what each half does; the how-we-met story is cut by decision (Oct 7), not relocated. `/` carries the urgency and the mechanism; the product beats live on journeymanmfg.com. If a sentence reads the same on two pages, one of the two is wrong.
- **No gendered pronouns:** nobody in the copy is defaulted to a gender. Name the person (`Will`, `Ethan`) or the role (the founder, the operator, the engineer, the machinist), and write the generic case in the plural or the second person. `npm run check:language` fails the build on a gendered pronoun or noun — and on AI-writing tells (the chatbot vocabulary, copula avoidance, "not just X, but Y", more than 8 em-dashes on a page; the wordlist follows Wikipedia's *Signs of AI writing*).
- Contact CTAs point at [willwollack@gmail.com](mailto:willwollack@gmail.com).
