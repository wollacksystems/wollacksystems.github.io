#!/usr/bin/env node
/**
 * Guards the one failure no other check can see: a text color that matches the
 * surface behind it. It type-checks, builds, and renders "fine" — the header CTA
 * shipped as ink #121316 on the charcoal #121316 header (1:1, invisible) and
 * nothing caught it.
 *
 * This reads the tokens out of src/styles/global.css and checks the pairs the
 * design system actually renders, for the canonical theme and the Journeyman
 * variant. No dependencies: if a token is renamed or a hue is retuned below
 * WCAG AA, this fails and names the pair.
 */
import { readFileSync } from 'node:fs';

const CSS_PATH = process.argv[2] ?? 'src/styles/global.css';
const AA_NORMAL = 4.5; // body and UI text
const AA_LARGE = 3; // 24px+ display type

// [label, foreground token, background token, minimum ratio]
const PAIRS = [
  ['body copy', '--color-text-primary', '--color-bg-primary', AA_NORMAL],
  ['secondary copy on the dark ground', '--color-text-secondary', '--color-bg-primary', AA_NORMAL],
  ['secondary copy on tinted sections', '--color-text-secondary', '--color-surface-subtle', AA_NORMAL],
  ['primary button label', '--color-ink-on-paper', '--color-accent-blue', AA_NORMAL],
  ['primary button label (:hover)', '--color-ink-on-paper', '--color-accent-hover', AA_NORMAL],
  ['links and accents on the dark ground', '--color-accent-blue', '--color-bg-primary', AA_NORMAL],
  ['paper surfaces (invoice, CTA band)', '--color-ink-on-paper', '--color-paper', AA_NORMAL],
  ['muted ink on paper (labels, captions)', '--color-ink-on-paper-muted', '--color-paper', AA_NORMAL],
  ['display type on the dark ground', '--color-text-primary', '--color-bg-primary', AA_LARGE],
  // Non-text UI: the askable-library demo's scrub fill against its track, the
  // pair that shows where in the recorded session an answer came from.
  ['demo scrub fill against its track', '--color-accent-blue', '--color-border-subtle', AA_LARGE],
];

/**
 * The `{...}` body of a rule at the start of a line. Anchoring to the line
 * matters: the file mentions `[data-theme="journeyman"]` in its header comment
 * long before the selector, and a plain search finds the comment and reads the
 * `:root` block — which silently reports the canonical palette for the variant.
 */
function block(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(`^${escaped}\\s*\\{`, 'm').exec(css);
  if (!match) throw new Error(`check-contrast: no \`${selector}\` rule in ${CSS_PATH}`);
  const open = match.index + match[0].length - 1;
  const close = css.indexOf('}', open);
  return css.slice(open, close);
}

function tokens(source) {
  const found = {};
  for (const [, name, value] of source.matchAll(/(--[a-z0-9-]+):\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\))/g)) {
    found[name] = parse(value);
  }
  return found;
}

function parse(value) {
  if (value.startsWith('#')) {
    const digits = value.replace('#', '');
    const full = [3, 4].includes(digits.length) ? [...digits].map((d) => d + d).join('') : digits;
    return { r: parseInt(full.slice(0, 2), 16), g: parseInt(full.slice(2, 4), 16), b: parseInt(full.slice(4, 6), 16), a: 1 };
  }
  const [r, g, b, a = 1] = value.match(/[\d.]+/g).map(Number);
  return { r, g, b, a };
}

/** Alpha colors sit on the surface, so flatten before measuring. */
const flatten = (fg, bg) => (fg.a >= 1 ? fg : {
  r: fg.a * fg.r + (1 - fg.a) * bg.r,
  g: fg.a * fg.g + (1 - fg.a) * bg.g,
  b: fg.a * fg.b + (1 - fg.a) * bg.b,
  a: 1,
});

function luminance({ r, g, b }) {
  const channel = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

const ratio = (fg, bg) => {
  const flat = flatten(fg, bg);
  const [hi, lo] = [luminance(flat), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const show = ({ r, g, b, a }) =>
  `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;

const css = readFileSync(CSS_PATH, 'utf8');
const themes = [
  ['/:root', tokens(block(css, ':root'))],
  ['/journeyman ([data-theme="journeyman"])', tokens(block(css, '[data-theme="journeyman"]'))],
];
themes[1][1] = { ...themes[0][1], ...themes[1][1] };

let failures = 0;
for (const [theme, table] of themes) {
  console.log(`\n${theme}`);
  for (const [label, fg, bg, min] of PAIRS) {
    if (!table[fg] || !table[bg]) {
      console.log(`  × ${label}: missing token ${!table[fg] ? fg : bg}`);
      failures += 1;
      continue;
    }
    const value = ratio(table[fg], table[bg]);
    const ok = value >= min;
    if (!ok) failures += 1;
    console.log(
      `  ${ok ? '✓' : '×'} ${label}: ${value.toFixed(2)}:1 (needs ${min}:1) — `
      + `${fg} ${show(flatten(table[fg], table[bg]))} on ${show(table[bg])}`,
    );
  }
}

if (failures) {
  console.log(`\n${failures} contrast failure(s). Retune the token pair or the surface it sits on.`);
  process.exit(1);
}
console.log('\ncheck-contrast: every documented pair is at or above WCAG AA.');
