---
version: "alpha"
name: "Wollack Systems — Industrial Editorial"
description: "High-contrast, text-first editorial system for a manufacturing knowledge-capture company. Dark charcoal ground, warm paper accents, electric blue as the sole interaction color."
colors:
  primary: "#121316"
  secondary: "#9EABB7"
  tertiary: "#0084FF"
  surface-subtle: "#1E2024"
  paper: "#F4F3EF"
  ink-on-paper: "#121316"
  text-primary: "#FFFFFF"
typography:
  display:
    fontFamily: Instrument Serif
    fontSize: 3.5rem
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.01em
  section-title:
    fontFamily: Instrument Serif
    fontSize: 2rem
    fontWeight: 400
    lineHeight: 1.2
  quote-editorial:
    fontFamily: Instrument Serif
    fontSize: 1.35rem
    fontWeight: 400
    lineHeight: 1.4
  step-index:
    fontFamily: Instrument Serif
    fontSize: 2rem
    fontWeight: 400
    lineHeight: 1
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
  body-lede:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.55
  eyebrow-label:
    fontFamily: JetBrains Mono
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.12em
  table-header:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.05em
rounded:
  sm: 0px
  md: 2px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  section: 96px
components:
  page-canvas:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    padding: 96px
  section-panel:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.md}"
    padding: "32px"
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.ink-on-paper}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "12px 26px"
  button-secondary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: "12px 26px"
  button-secondary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.md}"
    padding: "12px 26px"
  eyebrow-tagline:
    textColor: "{colors.secondary}"
    typography: "{typography.eyebrow-label}"
  step-card:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    padding: "24px 0"
  step-card-index:
    textColor: "{colors.tertiary}"
    typography: "{typography.step-index}"
  accent-callout:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-primary}"
    padding: "8px 0 8px 20px"
  callout-quote:
    typography: "{typography.quote-editorial}"
    textColor: "{colors.text-primary}"
  ledger-table-head:
    typography: "{typography.table-header}"
    textColor: "{colors.secondary}"
    padding: "12px 16px"
  ledger-table-cell:
    typography: "{typography.body-md}"
    textColor: "{colors.text-primary}"
    padding: "16px"
  ledger-table-row-hover:
    backgroundColor: "{colors.surface-subtle}"
  invoice-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-on-paper}"
    rounded: "{rounded.sm}"
    padding: "28px"
  brand-lockup:
    markColor: "{colors.tertiary}"
    textColor: "{colors.text-primary}"
    markSize: 30px
---

## Overview

Industrial Brutalism Lite meets editorial gravitas. The UI reads like a
well-set trade document: an off-black charcoal ground, crisp white serif
headlines, slate-gray supporting copy, and a single electric-blue accent that
drives every interactive element. Geometry is sharp and architectural —
nothing bubbly, nothing decorative for its own sake. The reference mood is a
premium pitch deck crossed with plant-floor documentation.

## Colors

The palette is grounded in near-black and reserved light, with one
high-energy accent.

- **Primary (#121316):** Deep slate/charcoal — the default canvas for the
  entire site (dark-mode-first brand).
- **Text Primary (#FFFFFF):** Pure white for headlines, emphasis, and core
  body copy on dark ground.
- **Secondary (#9EABB7):** Slate gray for sub-labels, captions, metadata,
  and descriptions.
- **Tertiary (#0084FF):** Electric blue — highlights, callouts, key values,
  numbered indexes, and all calls to action. It is the only saturated hue in
  the system.
- **Surface Subtle (#1E2024):** Elevated dark fill for cards, hover rows,
  and contained panels.
- **Paper (#F4F3EF):** Warm off-white reserved for print-motif containers
  such as invoices and receipts.
- **Ink on Paper (#121316):** High-contrast ink used only on Paper surfaces.
- **Muted ink on Paper (rgba(18, 19, 22, 0.7)):** the secondary ink for
  labels, captions, and closing lines on Paper surfaces (the invoice head and
  its italic itemization, `section-close-ink`). At 0.55 it composites to
  3.99:1 — below AA, which is what those labels shipped as — so 0.7 is the
  floor at 6.6:1. It is a token, not a literal, so the contrast guard can see
  it; the Journeyman ground overrides it with its own ink.

Divider lines use `#2B2E35` at `1px` — documented under Layout rather than as
a token because borders are structural rules, not fills.

## Typography

A refined editorial serif carries voice; a functional grotesque carries data.

- **Display (`display`, `section-title`):** Instrument Serif at `3.5rem` /
  `2rem`. The face ships only a regular cut; hierarchy comes from scale, not
  synthetic bolding. Fallbacks: Newsreader, Georgia.
- **Editorial quotes (`quote-editorial`):** Instrument Serif at `1.35rem`,
  line-height 1.4 — used inside accent callouts.
- **Feature numbers (`step-index`):** Instrument Serif at `2rem`, always
  colored Tertiary blue (`01`, `02`, `03`).
- **Body (`body-md`, `body-lede`):** Inter at `1rem` / `1.125rem`,
  line-height 1.5–1.6, max measure ~65ch for longform passages. Fallbacks:
  Geist Sans, system stack.
- **Eyebrows (`eyebrow-label`):** JetBrains Mono at `0.75rem`, uppercase,
  letter-spacing +0.12em, Secondary slate — category trackers above headlines.
- **Table headers (`table-header`):** Inter at `0.75rem`, uppercase,
  letter-spacing +0.05em.
- **Inline emphasis:** Astro trims whitespace that sits at a line break next to
  an inline element, so a wrapped `<strong>` or `<a>` glues itself to the word
  before it — `...the same sentence:` / `<strong>the knowledge...` renders as
  `sentence:the knowledge`. Text-to-text line breaks are safe. Either keep the
  text and the element on one line or write `{" "}` before the element, and
  `npm run check:copy` fails the build if any page ships a welded word; it runs
  after the build in both `ci.yml` and the Pages deploy, which publishes only if
  the guards pass.

## Layout

- **Grid:** Multi-column asymmetric layouts (2–3 columns) with generous dark
  negative space; content measures stay narrow enough to scan.
- **Dividers:** Subtle horizontal rules — `1px solid #2B2E35` — segment
  narrative blocks instead of wrapping everything in cards.
- **Vertical rhythm:** Section spacing at `{spacing.section}`; component
  internal gaps at `{spacing.md}`–`{spacing.lg}`. A `.section-close` that acts
  as the lede introducing a grid (`+ .grid-3` / `+ .grid-4`) is followed by
  `36px` of entry room — the same air the band gives between heading and lede;
  the grid's top rule must never sit flush against the lede.
- **Heading alignment:** section headings and the lead paragraph that opens a
  band (`h2 + .lede`) sit on the page axis, because everything under them is
  centered — fact grids, callouts, step lists, CTA rows, the centered closing
  lines — and a heading pinned to the container's left edge reads as a
  misalignment, not as an anchor. Two properties are doing the work: the heading
  is capped at `24ch` (`18ch` for `h1`), so `margin-inline: auto` centers the
  box, and `text-align: center` centers the lines inside it. A hero keeps
  left-aligned type because it leads with `h1`, and prose inside a two-column
  split keeps its left edge.
- **Body alignment:** prose that is not a band's opening line — step copy, list
  text, hero copy — stays left-aligned inside its centered block. A centered
  heading over a left-aligned list is the intended pattern, not a leftover.

## Elevation & Depth

Depth is expressed through value shifts, not shadows. Elevated surfaces move
one step from Primary (#121316) to Surface Subtle (#1E2024). Drop shadows are
avoided entirely; where separation is needed, a `1px` divider does the work.
Two intentional exceptions read as physical objects resting on the page: the
Paper invoice panel and the portrait plates, which carry a soft ambient
shadow to sit like mounted photographs.

## Shapes

Strictly architectural. Corner radii are `0px` (documents, tables, panels) or
at most `2px` (buttons, subtle panels). No pill shapes, no oversized radii.
Borders are `1px` and structural; the only thick rule is the `3px` vertical
accent bar on callouts.

## Components

- **page-canvas:** Charcoal ground with white text; sections sit directly on
  it without card wrapping.
- **section-panel:** One-step-elevated dark container for grouped content.
- **button-primary / button-secondary (+hover):** Blue fill with ink text is
  the single loud action; the quiet alternative is white-on-charcoal that
  turns blue on hover.
- **header-cta:** the primary button at the small size (`btn btn-primary
  btn-small`), the header's persistent action, with a 44px minimum hit target.
  It must keep a variant class: `.btn` alone sets no fill, and the header's
  own link color is deliberately scoped to `a:not(.btn)` because it outranks
  `.btn-primary` (0,2,1 against 0,1,0) and would repaint the button's text
  slate on its own fill — 1.6:1. Measured pairs: ink on electric blue 5.1:1 on
  `/` and `/about`, ink on rust 5.0:1 on `/journeyman`; the mobile menu's
  quiet link sits at 7.9:1 and 8.4:1 on those grounds.
- **step-card / step-card-index:** Numbered process blocks — big blue serif
  index over a bold sans title, divided by top rules, no boxes.
- **accent-callout / callout-quote:** Vertical blue bar with an editorial
  serif quote; used sparingly for the hardest-hitting lines.
- **ledger-table-head / cell / row-hover:** Minimal-border data tables;
  uppercase slate headers, white cells, hover tint via Surface Subtle.
- **invoice-panel:** Warm paper receipt motif (the "$10,000 itemized" story)
  rendered as a light document on the dark canvas.
- **ask-console:** the askable-library demo on `/journeyman` — the one
  interactive surface. A Surface Subtle panel with a hairline border and no
  shadow, opened by a mono bar (`JOURNEYMAN` / `MACHINING CELL · VMC-04` /
  status) over a text input on the Primary ground and a grid of question chips.
  Chips are quiet buttons: Secondary slate on the console, Primary slate and an
  accent border on hover, 44px minimum height, `radius-sm`. The input is a
  token pair, not a new fill — Primary ground, hairline border, Primary ink —
  with the accent as its focus outline.
- **answer-slip:** the demo's answer, back on Paper: the question in mono at
  `--color-ink-on-paper-muted`, the answer in Inter at Primary ink, then a
  dashed rule (`--color-border-subtle`, the token rather than the invoice's
  literal, so the warm ground gets a warm hairline) over a 4px segment scrub —
  `--color-border-subtle` track with an accent fill, measured at 3.7:1 on
  `/:root` and 3.8:1 on `/journeyman` against the 3:1 non-text floor — and the
  source stamp: `FROM SEG 12 · 14:32` in ink over the segment's duration, job,
  recorded role, and machine in muted ink.
- **ask-miss:** when nothing in the sample fits, the console answers on its own
  ground instead of a slip: a 3px accent rule with the question in Instrument
  Serif and the explanation in Secondary slate. It never invents an answer, and
  it never claims the sample is the product.
- **Demo states:** default (the first question, its answer, and its source are
  server-rendered, so the panel reads with JavaScript off), answering (the mono
  status line reads `Searching the index…`), retrieved (one slip shown, chips
  and the status line unchanged otherwise), and miss. The scripted beat before
  an answer is skipped when the OS asks for reduced motion, and only one script
  ships, inlined into that page (~2.5KB, no second copy of the answers: the
  retrieval is `src/lib/retrieval.ts`, the corpus is markup); it must stay
  offline and scripted.
- **portrait-plate:** Framed monochrome portrait with a mono caption, used for
  people on the about page. The frame is a Surface Subtle plate with a 1px
  border, `radius-sm`, and a square 1:1 image window; `object-fit: cover`
  crops any source shape top-anchored so faces survive. Images render
  grayscale (`contrast(1.05)`) and reveal full color on plate hover. The
  caption is the eyebrow style: JetBrains Mono, uppercase, +0.12em tracking,
  name in white with a 14–18px blue accent tick, role in Secondary slate.
  Two accepted sizes: the hero plate (about 380px wide, right column of the
  about hero; collapses to full-width, max 380px, below 820px) and the team
  plate (180px, right-aligned beside the partnership copy in `.split-with-plate`
  at 700px and up; centers at 220px in the single-column layout below). When a
  portrait file is absent,
  the hero falls back to a typographic placeholder with the same frame (see
  `FEATURES.md`, drop-in portraits).

## Brand mark

The mark is a 1-bit dithered dog head. The site ships one shape and three
deliberate renderings of it, and all three render the same path: `MARK_PATH`
in `src/lib/brand.ts`. No other file draws or copies the shape.

| Rendering | Asset | Where it is used | Rules |
| --- | --- | --- | --- |
| **Canonical raster** (expressive) | `public/logo.png` (600×600) | `og-image.png` embeds it at 315px on the charcoal ground (checked: the embedded mark matches the reference within 2px); `Organization.logo` and `Organization.image` point at it | Dithered white on a solid black ground, cropped flush to the top and bottom of its square: no transparent padding, ~20px of ground on the left, ~19px on the right. Use it wherever the halftone can read as tone (roughly 96px and up) and wherever structured data needs a crawlable bitmap. |
| **Small-size cut** (flat fill) | `MARK_PATH` in `src/lib/brand.ts` | Header lockup (`src/components/BrandMark.astro`), `/favicon.svg` | A solid silhouette derived from the raster — derivation in the module docstring. One closed path, no holes, same 600×600 frame and the same flush crop. Below ~48px a halftone's dot density stops reading as tone and its interior shading smears into noise, so the dots, eyes, and muzzle shadow are dropped on purpose. |
| **Tile** (opaque plate) | `public/favicon-32.png`, `public/apple-touch-icon.png` | PNG favicon fallback, iOS home screen | Charcoal `#121316` plate, the mark centered at 80% of the box. Masked and light-chrome targets need a ground of their own, which is the only reason a plate exists at all. |

- **Lockup:** mark then wordmark, 30px mark, 10px gap, wordmark in Instrument
  Serif at `1.25rem`. The wordmark carries the name, so the mark is decorative
  (`aria-hidden`) there; pass `label` to `BrandMark` only where the mark is the
  sole carrier of the brand name.
- **Color:** the lockup mark is tinted with the page accent token, so it rides
  the Journeyman rust variant. The favicon instead follows the browser chrome
  (`prefers-color-scheme`: charcoal ink on light chrome, white on dark), because
  its ground is not ours to control.
- **Crop:** every rendering keeps the canonical frame. Do not re-crop the mark
  to its content bounds, add padding, or stretch it — the flush top and bottom
  edges are the mark's intended crop, and the small-size cut reproduces it
  (x 19..578 against the raster's own dot envelope of x 19..578).
- **Regenerating:** if `public/logo.png` is ever replaced, re-derive the
  silhouette (dilate the dots to bridge the halftone cells, flood-fill the
  exterior from all four corners — the mark's flush crop splits it into two
  regions — erode back to the envelope, smooth, then trace and simplify the
  single contour), update `MARK_PATH`, and re-render the two tile PNGs from it.
  Everything else follows automatically.

## Do's and Don'ts

Do keep blue scarce — if everything glows, nothing does. Reserve Tertiary for
indexes, links, CTAs, and accent bars.
Do let type carry hierarchy: serif for voice, sans for facts, mono for labels.
Do use dividers before cards; wrap only when grouping truly demands it.

Don't introduce additional hues; the palette is charcoal, slate, bone, white,
and exactly one blue.
Don't let the askable-library demo go online, generate its answers, or wear
invented customers: it answers from a fixed sample corpus, offline, and the page
says so.
Don't add a second brand mark, redraw the mark per surface, or give it a
transparent-padded, re-cropped, or stretched variant: the three renderings in
Brand mark are the whole system.
Don't round corners past `2px` or add drop shadows beyond the two accepted
physical-object exceptions above.
Don't set body copy wider than ~65ch or pair Electric Blue with Paper — blue
text belongs exclusively on the charcoal ground.
