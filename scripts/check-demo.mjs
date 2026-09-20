#!/usr/bin/env node
/**
 * Guards the askable-library demo on /journeyman, whose failure mode is silence.
 *
 * The demo is deliberately scripted (four captured jobs, no model, no network),
 * and it is wired by ids in markup the build cannot type-check: a chip points at
 * an answer with `data-ask-entry="<id>"` / `data-ask-answer="<id>"`, the answer
 * points back at a segment stamp, and the client script only toggles what is
 * already rendered. Rename one side of that pair and the demo still builds, still
 * type-checks, still renders — and clicking a question does nothing.
 *
 * Four things it holds, each invisible to every other check:
 *   1. every chip has an answer slip, and every slip has a chip;
 *   2. exactly one slip is visible on load — the first — so a visitor with
 *      JavaScript off still reads a real question, answer, and source;
 *   3. the demo stays offline. It is sold on the page as a scripted sample, so
 *      no fetch, socket, or import may creep into its module;
 *   4. the retrieval still answers what it should and refuses what it should,
 *      by running the labeled battery below through src/lib/retrieval.ts — the
 *      module the browser actually bundles.
 *
 * Reads the built HTML (run it after `npm run build`); pass paths to check files
 * elsewhere.
 */
import { readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { DEMO_ANSWERS } from '../src/lib/library-demo.ts';
import { pick } from '../src/lib/retrieval.ts';

const ROOT = process.cwd();
const DEFAULT_TARGET = join(ROOT, 'dist', 'journeyman', 'index.html');
const NETWORK = /\b(fetch|XMLHttpRequest|WebSocket|EventSource|import)\s*\(|https?:\/\//;

const CHIP = /<button[^>]*data-ask-entry="([^"]+)"[^>]*data-ask-match="([^"]*)"[^>]*>/g;
const SLIP = /<article[^>]*data-ask-answer="([^"]+)"([^>]*)>/g;

/**
 * Questions with the answer they must retrieve, and questions that must not
 * retrieve anything at all. The misses are the point: a paraphrase has to find
 * its job, and an unrelated question has to come back empty-handed rather than
 * pick up a stray keyword and put a confident source under the wrong answer.
 * Expected null means the demo must show its miss state.
 */
const BATTERY = [
  ['The tool changer stopped mid-swap. Where do we start?', 'atc-jam'],
  ['how do I stop the tool changer from jamming mid swap', 'atc-jam'],
  ['why does the slide keep starving for oil?', 'way-lube'],
  ['tramp oil crust in the metering valve', 'way-lube'],
  ['door sensor says open', 'false-interlock'],
  ['the machine says the door is open but it is shut', 'false-interlock'],
  ['one axis alarms at the same spot every time', 'encoder-cable'],
  ['cable', 'encoder-cable'],
  ['oil', 'way-lube'],
  ['jam', 'atc-jam'],
  ['how much coolant should the sump hold?', null],
  ['coolant sump', null],
  ['spindle overheating tolerance drift', null],
  ['what is the capital of France', null],
  ['who do I call about a late delivery', null],
  ['   ', null],
];

function retrieval() {
  const entries = DEMO_ANSWERS.map((entry) => ({ id: entry.id, match: entry.match }));
  return BATTERY.filter(([question, expected]) => pick(question, entries) !== expected)
    .map(([question, expected]) =>
      `"${question.trim() || '(blank)'}" retrieves ${pick(question, entries) ?? 'nothing'}, expected ${expected ?? 'nothing'}`);
}

function demoBlock(html) {
  const start = html.indexOf('data-ask-demo');
  if (start < 0) return null;
  const end = html.indexOf('</section>', start);
  return html.slice(start, end < 0 ? undefined : end);
}

function check(html) {
  const findings = [];
  const block = demoBlock(html);
  if (!block) return ['the /journeyman page has no `data-ask-demo` block'];

  const chips = [...block.matchAll(CHIP)].map((match) => ({ id: match[1], index: match[2] }));
  const slips = [...block.matchAll(SLIP)].map((match) => ({
    id: match[1],
    hidden: /\shidden(\s|>|$)/.test(match[2]),
  }));

  if (!chips.length) findings.push('no question chips found');
  if (!slips.length) findings.push('no answer slips found');

  const chipIds = new Set(chips.map((chip) => chip.id));
  const slipIds = new Set(slips.map((slip) => slip.id));

  for (const chip of chips) {
    if (!slipIds.has(chip.id)) findings.push(`chip "${chip.id}" has no answer slip with that id`);
    if (chip.index.trim().split(/\s+/).filter(Boolean).length < 5) {
      findings.push(`chip "${chip.id}" carries a thin keyword index (${chip.index.trim() || 'empty'})`);
    }
  }
  for (const slip of slips) {
    if (!chipIds.has(slip.id)) findings.push(`answer slip "${slip.id}" has no chip that reveals it`);
  }

  const visible = slips.filter((slip) => !slip.hidden);
  if (visible.length !== 1) {
    findings.push(`${visible.length} answer slips render on load (expected exactly 1)`);
  } else if (slips[0].id !== visible[0].id) {
    findings.push(
      `the slip rendered on load is "${visible[0].id}", not the first one ("${slips[0].id}") — `
      + 'the default state should be the page order',
    );
  }

  // Each slip carries its own source: a segment number, a position, a scrub.
  for (const [index, slip] of slips.entries()) {
    const from = block.indexOf(`data-ask-answer="${slip.id}"`);
    const next = index + 1 < slips.length
      ? block.indexOf(`data-ask-answer="${slips[index + 1].id}"`)
      : block.length;
    const body = block.slice(from, next < 0 ? undefined : next);
    if (!/FROM SEG \d+ (?:·|&middot;) \d{1,2}:\d{2}/.test(body)) {
      findings.push(`slip "${slip.id}" has no "FROM SEG <n> · <mm:ss>" source stamp`);
    }
    if (!/class="ask-answer-a">\s*\S/.test(body)) {
      findings.push(`slip "${slip.id}" has no answer text`);
    }
    if (!/width:\s*\d{1,3}%/.test(body)) {
      findings.push(`slip "${slip.id}" has no scrub position`);
    }
  }

  // Unrendered template syntax means a data shape changed under the markup.
  // Checked on the markup only: the inlined script is JavaScript, and its own
  // template literals are not leftovers.
  const markup = block.replace(/<script[\s\S]*?<\/script>/g, '');
  if (/\{[a-zA-Z]|\$\{/.test(markup)) {
    findings.push('the demo block contains unrendered template syntax');
  }

  const script = html.match(/<script type="module">([\s\S]*?)<\/script>/);
  if (!script) {
    findings.push('the demo ships no module script — nothing would respond to a question');
  } else if (NETWORK.test(script[1])) {
    findings.push('the demo script reaches the network; it is a scripted sample and must stay offline');
  }

  return findings;
}

const targets = process.argv.slice(2);
const files = targets.length ? targets : [DEFAULT_TARGET];

let failures = 0;

const battery = retrieval();
if (battery.length) {
  failures += battery.length;
  console.log('\nsrc/lib/retrieval.ts');
  for (const finding of battery) console.log(`  ${finding}`);
}

for (const file of files) {
  try {
    statSync(file);
  } catch {
    console.error(`check-demo: ${relative(ROOT, file)} is missing — run \`npm run build\` first.`);
    process.exit(1);
  }
  const findings = check(readFileSync(file, 'utf8'));
  if (!findings.length) continue;
  failures += findings.length;
  console.log(`\n${relative(ROOT, file)}`);
  for (const finding of findings) console.log(`  ${finding}`);
}

if (failures) {
  console.log(`\n${failures} demo wiring problem(s). The demo builds and renders either way — this is the only check that sees it.`);
  process.exit(1);
}
console.log(
  `check-demo: ${files.length} page(s) clean — chips, slips, sources, no network, and ${BATTERY.length} retrieval questions behaved.`,
);
