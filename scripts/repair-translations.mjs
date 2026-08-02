// Restores heading ids and internal link targets in a translated locale.
//
// Translators localise things they were told to copy - a heading id, the
// fragment on a link - and the result is a page that reads fine and links
// nowhere. Those two are pure identifiers, so they can be taken back from the
// Korean source positionally: the Nth heading id of the translation is the Nth
// heading id of the source.
//
// Position is only trustworthy when the counts match, so a file whose counts
// differ is reported and left alone rather than silently rewritten.
//
//   node scripts/repair-translations.mjs en
//   node scripts/repair-translations.mjs ja --write

import fs from 'node:fs';
import path from 'node:path';

const locale = process.argv[2];
const write = process.argv.includes('--write');
if (!locale) {
  console.error('usage: node scripts/repair-translations.mjs <locale> [--write]');
  process.exit(1);
}

const SRC = 'docs';
const DST = path.join('i18n', locale, 'docusaurus-plugin-content-docs', 'current');

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (p.endsWith('.md')) acc.push(p);
  }
  return acc;
}

const HEADING_ID = /\{#([^}]+)\}/g;
const INTERNAL_LINK = /\]\((\/[^)\s]*)\)/g;

const seq = (text, re) => [...text.matchAll(re)].map((m) => m[1]);

function replaceInOrder(text, re, values) {
  let i = 0;
  return text.replace(re, (whole, captured) => {
    const next = values[i++];
    return next === undefined ? whole : whole.replace(captured, next);
  });
}

let repaired = 0;
let skipped = 0;

for (const src of walk(SRC)) {
  const rel = path.relative(SRC, src);
  const dst = path.join(DST, rel);
  if (!fs.existsSync(dst)) continue;

  const a = fs.readFileSync(src, 'utf8');
  let b = fs.readFileSync(dst, 'utf8');
  const before = b;

  const srcIds = seq(a, HEADING_ID);
  const dstIds = seq(b, HEADING_ID);
  const srcLinks = seq(a, INTERNAL_LINK);
  const dstLinks = seq(b, INTERNAL_LINK);

  const notes = [];
  if (srcIds.length !== dstIds.length) {
    notes.push(`heading ids ${srcIds.length} vs ${dstIds.length}`);
  } else if (srcIds.join('|') !== dstIds.join('|')) {
    b = replaceInOrder(b, HEADING_ID, srcIds);
  }

  if (srcLinks.length !== dstLinks.length) {
    notes.push(`internal links ${srcLinks.length} vs ${dstLinks.length}`);
  } else if (srcLinks.join('|') !== dstLinks.join('|')) {
    b = replaceInOrder(b, INTERNAL_LINK, srcLinks);
  }

  if (notes.length) {
    console.log(`SKIP  ${rel}  (${notes.join('; ')})`);
    skipped++;
    continue;
  }

  if (b !== before) {
    if (write) fs.writeFileSync(dst, b);
    console.log(`${write ? 'fixed' : 'would fix'}  ${rel}`);
    repaired++;
  }
}

console.log(
  `\n${locale}: ${repaired} file(s) ${write ? 'repaired' : 'to repair'}, ${skipped} skipped`
);
