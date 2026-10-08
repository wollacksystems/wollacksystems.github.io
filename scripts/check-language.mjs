#!/usr/bin/env node
/**
 * Guards the copy's language: nobody in it is defaulted to a gender.
 *
 * Also guards the copy's voice against AI-writing tells (the wordlist follows
 * Wikipedia's "Signs of AI writing" field guide): the chatbot vocabulary
 * (delve, crucial, showcase, tapestry...), copula avoidance ("serves as"
 * where "is" is meant), negative parallelism ("not just X, but Y"), and
 * em-dash density. The site voice is short sentences and plain verbs; these
 * are exactly the things that creep in one sentence at a time.
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

// AI-writing vocabulary, per Wikipedia's "Signs of AI writing": words LLMs
// measurably overuse, copula-avoidance phrases, and chatbot mannerisms. Keep
// the list unambiguous — a word here must never be the right word on this
// site. (If one ever is, it moves to AI_ALLOW with a reason.)
const AI_WORDS = [
  // The chatbot vocabulary.
  'delve', 'delves', 'delved', 'delving',
  'crucial', 'crucially', 'pivotal',
  'underscore', 'underscores', 'underscored', 'underscoring',
  'showcase', 'showcases', 'showcased', 'showcasing',
  'tapestry', 'testament', 'vibrant',
  'fostering', 'fostered', 'garner', 'garnered', 'garnering',
  'intricate', 'intricacies', 'interplay',
  'meticulous', 'meticulously',
  'bolster', 'bolstered', 'bolstering',
  'enduring', 'enhance', 'enhances', 'enhanced', 'enhancing',
  'valuable', 'additionally', 'moreover', 'furthermore',
  'highlighting', 'emphasizing',
  'boasts', 'boasting', 'renowned',
  'seamless', 'seamlessly', 'groundbreaking', 'revolutionary',
  'unlock', 'unlocked', 'unlocking',
  'empower', 'empowers', 'empowered', 'empowering',
  'supercharge', 'supercharged', 'elevate', 'elevated', 'elevating',
  'harness', 'harnesses', 'harnessed', 'harnessing',
  'nestled', 'landscape',
  'leverage', 'leverages', 'leveraged', 'leveraging',
];
const AI_PHRASES = [
  // Copula avoidance: "serves as" where "is" is meant.
  'serves as', 'stands as', 'functions as', 'operates as',
  // Chatbot mannerisms and filler.
  'deep dive', 'cutting-edge', 'world-class', 'natural beauty',
  'in the heart of', "in today's", 'fast-paced', 'ever-evolving',
  'align with', 'aligns with', 'aligned with',
  "it's important to note", 'it is important to note', 'in conclusion',
];
const AI_ALLOW = [
  // e.g. /a literal underline/ — nothing on the site needs one today.
];

// "Not just X, but Y" and kin: the misconception-clearing move. Window kept
// tight so legitimate contrasts ("not for long, but...") stay out of it.
const AI_PARALLEL = /\bnot\s+(?:just|only)\b[^.!?]{0,100}?\bbut\b/i;

// Em-dash budget per page. The voice is short sentences; AI text leans on the
// dash. Every page today sits at 6 or fewer — 8 leaves headroom without
// opening the door.
const DASH_CAP = 8;

const PATTERN = new RegExp(`\\b(${GENDERED.join('|')})\\b`, 'gi');
const AI_PATTERN = new RegExp(
  `\\b(${AI_WORDS.join('|')})\\b|${AI_PHRASES.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}`,
  'gi',
);
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
    out.push({ term: match[0], kind: 'gendered', snippet: `…${snippet}…` });
  }
  for (const match of text.matchAll(AI_PATTERN)) {
    if (AI_ALLOW.some((rx) => rx.test(match[0]))) continue;
    const start = Math.max(0, match.index - 45);
    const snippet = text.slice(start, match.index + match[0].length + 45).trim();
    if (out.some((f) => f.snippet === snippet)) continue;
    out.push({ term: match[0], kind: 'ai-voice', snippet: `…${snippet}…` });
  }
  const parallel = text.match(AI_PARALLEL);
  if (parallel) {
    const index = text.indexOf(parallel[0]);
    const start = Math.max(0, index - 30);
    out.push({
      term: parallel[0].split(/\s+/).slice(0, 3).join(' ') + ' …',
      kind: 'ai-voice',
      snippet: `…${text.slice(start, index + parallel[0].length + 30).trim()}…`,
    });
  }
  const dashes = (text.match(/—/g) ?? []).length + (html.match(/&mdash;/g) ?? []).length;
  if (dashes > DASH_CAP) {
    out.push({
      term: `${dashes} em-dashes`,
      kind: 'ai-voice',
      snippet: `page carries ${dashes} em-dashes; the budget is ${DASH_CAP}. Use a full stop.`,
    });
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
  for (const { term, kind, snippet } of hits) {
    console.log(`  [${kind}] "${term}": ${snippet}`);
  }
}

if (failures) {
  console.log(`\n${failures} language finding(s).`);
  console.log('Gendered: name the person or the role, or use the plural. AI voice: say it plainly — short sentences, plain verbs.');
  console.log('If a use is genuinely needed, add it to ALLOW or AI_ALLOW in scripts/check-language.mjs with a reason.');
  process.exit(1);
}
console.log(`check-language: ${files.length} page(s) clean.`);
