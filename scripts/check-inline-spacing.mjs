#!/usr/bin/env node
/**
 * Guards the one rendering trap plain HTML does not have.
 *
 * Astro trims whitespace that sits at a line break next to an inline element, so
 *
 *     ... the same sentence:
 *     <strong>the knowledge that runs this plant is one retirement from gone.</strong>
 *
 * renders as "…the same sentence:the knowledge…" — the two words weld together.
 * Text-to-text line breaks are safe (those collapse to a space), which is why the
 * bug only ever shows up at an element boundary and is easy to miss in review.
 *
 * This reads the *built* HTML, where a weld is unambiguous: a text node sitting
 * directly against a neighbouring inline element with no whitespace between them
 * inside a single block. Run it after `npm run build`; pass paths to check files
 * outside dist.
 *
 * Only text-to-element boundaries are checked. Element-to-element boundaries
 * cannot be judged here: the build minifies HTML and drops the whitespace between
 * sibling elements (nav links, captions), which is harmless where the parent lays
 * out with flex or grid.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const INLINE = new Set([
  'a', 'abbr', 'b', 'cite', 'code', 'del', 'dfn', 'em', 'i', 'ins', 'kbd',
  'label', 'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub', 'sup',
  'time', 'u', 'var',
]);
const SKIP_CONTENT = new Set(['script', 'style', 'template', 'noscript']);
// punctuation that legitimately hugs an inline element: "(see <a>…</a>), too."
const OK_BEFORE_ELEMENT = /[({\[“‘"'\u2014\u2013-]$/;
const OK_AFTER_ELEMENT = /^[.,;:!?)\]}>%’”"'\u2014\u2013-]/;

function collectHtml(target) {
  let stat;
  try {
    stat = statSync(target);
  } catch {
    console.error(`check-inline-spacing: ${relative(ROOT, target)} is missing — run \`npm run build\` first.`);
    process.exit(1);
  }
  if (stat.isFile()) return [target];
  return readdirSync(target)
    .flatMap((entry) => collectHtml(join(target, entry)))
    .filter((file) => file.endsWith('.html'));
}

/**
 * Tokenise into open/close/text tokens, dropping comments and script/style
 * bodies. Every token carries where it sits so a finding can name the block it
 * lives in — built HTML is minified onto one line, so line numbers mean nothing.
 */
function tokenize(html) {
  const tokens = [];
  const stack = [];
  let skipDepth = 0;
  const where = () => stack.slice(-3).map((n) => n).join(' > ') || '(top level)';
  for (const match of html.matchAll(/<!--[\s\S]*?-->|<(\/?)([a-zA-Z][^\s/>]*)[^>]*>|[^<]+/g)) {
    const raw = match[0];
    if (raw.startsWith('<!--')) continue;
    const tag = match[2]?.toLowerCase();
    if (!tag) {
      if (skipDepth === 0) tokens.push({ type: 'text', raw, where: where() });
      continue;
    }
    if (SKIP_CONTENT.has(tag)) {
      if (match[1] === '/') skipDepth = Math.max(0, skipDepth - 1);
      else if (!raw.endsWith('/>')) skipDepth += 1;
      continue;
    }
    if (skipDepth > 0) continue;
    if (match[1] === '/') {
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].startsWith(tag)) {
          stack.length = i;
          break;
        }
      }
      tokens.push({ type: 'close', tag, raw, where: where() });
      continue;
    }
    const id = raw.match(/\bid="([^"]*)"/)?.[1];
    const cls = raw.match(/\bclass="([^"]*)"/)?.[1]?.trim().split(/\s+/)[0];
    tokens.push({ type: 'open', tag, raw, where: where() });
    if (!raw.endsWith('/>')) stack.push(tag + (id ? `#${id}` : cls ? `.${cls}` : ''));
  }
  return tokens;
}

function scan(html) {
  const tokens = tokenize(html);
  const findings = [];
  tokens.forEach((token, i) => {
    const prev = tokens[i - 1];
    const next = tokens[i + 1];
    if (token.type !== 'text') return;
    if (!token.raw.trim()) return;
    if (prev?.type === 'close' && INLINE.has(prev.tag)
      && !/^\s/.test(token.raw) && !OK_AFTER_ELEMENT.test(token.raw)) {
      findings.push({ where: token.where, why: `</${prev.tag}> runs into the text after it`,
        snippet: `</${prev.tag}>${token.raw.trim().slice(0, 60)}` });
    }
    if (next?.type === 'open' && INLINE.has(next.tag)
      && !/\s$/.test(token.raw) && !OK_BEFORE_ELEMENT.test(token.raw)) {
      findings.push({ where: token.where, why: `text runs into <${next.tag}>`,
        snippet: `${token.raw.trim().slice(-45)}<${next.tag} …>` });
    }
  });
  return findings;
}

const targets = process.argv.slice(2);
const files = (targets.length ? targets : [join(ROOT, 'dist')]).flatMap(collectHtml);
let failures = 0;
for (const file of files) {
  const findings = scan(readFileSync(file, 'utf8'));
  if (!findings.length) continue;
  failures += findings.length;
  console.log(`\n${relative(ROOT, file)}`);
  for (const { where, why, snippet } of findings) {
    console.log(`  in ${where}: ${why}`);
    console.log(`    ${snippet}`);
  }
}

if (failures) {
  console.log(`\n${failures} welded word(s). In the source, a line break beside an inline element drops the space.`);
  console.log('Keep the text and the element on one line, or write {" "} before the element.');
  process.exit(1);
}
console.log(`check-inline-spacing: ${files.length} page(s) clean.`);
