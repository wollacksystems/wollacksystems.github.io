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

## Layout

- **Grid:** Multi-column asymmetric layouts (2–3 columns) with generous dark
  negative space; content measures stay narrow enough to scan.
- **Dividers:** Subtle horizontal rules — `1px solid #2B2E35` — segment
  narrative blocks instead of wrapping everything in cards.
- **Vertical rhythm:** Section spacing at `{spacing.section}`; component
  internal gaps at `{spacing.md}`–`{spacing.lg}`.
- **Accent bars:** Vertical blue rules (`3px`) mark pull-quotes and hard
  truths; horizontal top borders mark sequence steps.

## Elevation & Depth

Depth is expressed through value shifts, not shadows. Elevated surfaces move
one step from Primary (#121316) to Surface Subtle (#1E2024). Drop shadows are
avoided entirely; where separation is needed, a `1px` divider does the work.
The Paper invoice panel is the one intentional exception — it may carry a soft
ambient shadow to read as a physical document resting on the page.

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
- **step-card / step-card-index:** Numbered process blocks — big blue serif
  index over a bold sans title, divided by top rules, no boxes.
- **accent-callout / callout-quote:** Vertical blue bar with an editorial
  serif quote; used sparingly for the hardest-hitting lines.
- **ledger-table-head / cell / row-hover:** Minimal-border data tables;
  uppercase slate headers, white cells, hover tint via Surface Subtle.
- **invoice-panel:** Warm paper receipt motif (the "$10,000 itemized" story)
  rendered as a light document on the dark canvas.

## Do's and Don'ts

Do keep blue scarce — if everything glows, nothing does. Reserve Tertiary for
indexes, links, CTAs, and accent bars.
Do let type carry hierarchy: serif for voice, sans for facts, mono for labels.
Do use dividers before cards; wrap only when grouping truly demands it.

Don't introduce additional hues; the palette is charcoal, slate, bone, white,
and exactly one blue.
Don't round corners past `2px` or add decorative drop shadows.
Don't set body copy wider than ~65ch or pair Electric Blue with Paper — blue
text belongs exclusively on the charcoal ground.
