#!/usr/bin/env node
/**
 * Guards the copy's language: nobody in it is defaulted to a gender.
 *
 * "a plant is calling back a man who retired six years ago. He puts his ear to
 * the housing" reads as if the operator is a man by default, and the same goes
 * for "he" standing in for a named founder in a paragraph that already names
 * the person. The fix is always cheap — name the person, name the role, or write
 * the generic case in the plural or the second person — and it is exactly the
 * kind of thing that creeps back in one sentence at a time.
 *
 * Reads the *built* HTML (so meta descriptions, alt text and aria labels are
 * covered too), which means running it after `npm run build`. Pass paths to
 * check files outside dist.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();

const GENDERED = [
  'he', 'him', 'his', 'himself',
  'she', 'her', 'hers', 'herself',
  'man', 'men', 'woman', 'women',
  'guy', 'guys', 'businessman', 'businessmen', 'salesman', 'salesmen',
  'craftsman', 'craftsmen', 'tradesman', 'tradesmen', 'spokesman', 'spokesmen',
  'chairman', 'mankind', 'manpower', 'man-hours',
];

// Legitimate uses a plain word match would flag. Every entry needs a reason.
const ALLOW = [
  // e.g. /women-owned|man-hours per line/ — nothing on the site needs one today.
];

const PATTERN = new RegExp(`\\b(${GENDERED.join('|')})\\b`, 'gi');
const ATTRS = /\b(?:content|aria-label|alt|title)="([^"]*)"/g;

function collectHtml(target) {
  let stat;
  try {
    stat = statSync(target);
  } catch {
    console.error(`check-language: ${relative(ROOT, target)} is missing — run \`npm run build\` first.`);
    process.exit(1);
  }
  if (stat.isFile()) return [target];
  return readdirSync(target)
    .flatMap((entry) => collectHtml(join(target, entry)))
    .filter((file) => file.endsWith('.html'));
}

/** Visible text plus the attributes that carry copy to a reader. */
function prose(html) {
  let text = '';
  for (const match of html.matchAll(/<!--[\s\S]*?-->|<(script|style)\b[\s\S]*?<\/\1>|<[^>]*>|[^<]+/g)) {
    const raw = match[0];
    if (raw.startsWith('<!--') || /^<(script|style)\b/i.test(raw)) continue;
    if (raw.startsWith('<')) {
      for (const [, value] of raw.matchAll(ATTRS)) text += ` ${value} `;
      continue;
    }
    text += raw;
  }
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z]+;|&#\d+;/g, ' ')
    .replace(/\s+/g, ' ');
}

function findings(html) {
  const text = prose(html);
  const out = [];
  for (const match of text.matchAll(PATTERN)) {
    if (ALLOW.some((rx) => rx.test(match[0]))) continue;
    const start = Math.max(0, match.index - 45);
    const snippet = text.slice(start, match.index + match[0].length + 45).trim();
    if (out.some((f) => f.snippet === snippet)) continue;
    out.push({ term: match[0], snippet: `…${snippet}…` });
  }
  return out;
}

const targets = process.argv.slice(2);
const files = (targets.length ? targets : [join(ROOT, 'dist')]).flatMap(collectHtml);
let failures = 0;
for (const file of files) {
  const hits = findings(readFileSync(file, 'utf8'));
  if (!hits.length) continue;
  failures += hits.length;
  console.log(`\n${relative(ROOT, file)}`);
  for (const { term, snippet } of hits) {
    console.log(`  "${term}": ${snippet}`);
  }
}

if (failures) {
  console.log(`\n${failures} gendered reference(s). Name the person or the role, or use the plural.`);
  console.log('If a use is genuinely gender-specific, add it to ALLOW in scripts/check-language.mjs.');
  process.exit(1);
}
console.log(`check-language: ${files.length} page(s) clean.`);
