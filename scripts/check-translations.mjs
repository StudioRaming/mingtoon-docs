// Checks a translated locale against the Korean source.
//
// A translator that rewrites a heading id, an admonition marker or a link URL
// produces a page that still looks fine and a build that fails - or worse, one
// that passes with a link pointing nowhere useful. These are the invariants
// that must survive translation, so they are checked mechanically.
//
//   node scripts/check-translations.mjs en
//   node scripts/check-translations.mjs ja

import fs from 'node:fs';
import path from 'node:path';

const locale = process.argv[2];
if (!locale) {
  console.error('usage: node scripts/check-translations.mjs <locale>');
  process.exit(1);
}

const SRC = 'docs';
const DST = path.join(
  'i18n',
  locale,
  'docusaurus-plugin-content-docs',
  'current'
);

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (p.endsWith('.md')) acc.push(p);
  }
  return acc;
}

// The reference pages are generated for every locale, so they are not
// translations and have nothing to compare against.
const sources = walk(SRC).filter((f) => !f.includes(`${path.sep}reference${path.sep}`) || f.endsWith('validator.md'));

const headingIds = (t) => [...t.matchAll(/\{#([^}]+)\}/g)].map((m) => m[1]).sort();
const linkUrls = (t) =>
  [...t.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]).sort();
const admonitions = (t) =>
  [...t.matchAll(/^:::(\w+)/gm)].map((m) => m[1]);
const frontmatter = (t) => {
  const m = t.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim();
  }
  return out;
};

let missing = 0;
let problems = 0;

for (const src of sources) {
  const rel = path.relative(SRC, src);
  const dst = path.join(DST, rel);
  if (!fs.existsSync(dst)) {
    console.log(`MISSING  ${rel}`);
    missing++;
    continue;
  }

  const a = fs.readFileSync(src, 'utf8');
  const b = fs.readFileSync(dst, 'utf8');
  const say = (msg) => {
    console.log(`  ${rel}: ${msg}`);
    problems++;
  };

  const ia = headingIds(a);
  const ib = headingIds(b);
  if (ia.join('|') !== ib.join('|')) {
    const lost = ia.filter((x) => !ib.includes(x));
    const extra = ib.filter((x) => !ia.includes(x));
    say(
      `heading ids differ` +
        (lost.length ? ` | lost: ${lost.join(', ')}` : '') +
        (extra.length ? ` | added: ${extra.join(', ')}` : '')
    );
  }

  const ua = linkUrls(a);
  const ub = linkUrls(b);
  if (ua.join('|') !== ub.join('|')) {
    const lost = ua.filter((x) => !ub.includes(x));
    const extra = ub.filter((x) => !ua.includes(x));
    say(
      `link targets differ` +
        (lost.length ? ` | lost: ${lost.slice(0, 4).join(', ')}` : '') +
        (extra.length ? ` | added: ${extra.slice(0, 4).join(', ')}` : '')
    );
  }

  const aa = admonitions(a);
  const ab = admonitions(b);
  if (aa.join('|') !== ab.join('|')) {
    say(`admonition types differ: ${aa.length} vs ${ab.length}`);
  }

  // The v2 form renders as literal ':::note Title' text.
  const legacy = [...b.matchAll(/^:::[a-z]+ +\S/gm)];
  if (legacy.length) say(`${legacy.length} admonition(s) missing [brackets]`);

  const fa = frontmatter(a);
  const fb = frontmatter(b);
  for (const key of ['id', 'sidebar_position', 'slug']) {
    if ((fa[key] ?? null) !== (fb[key] ?? null)) {
      say(`frontmatter ${key}: "${fa[key]}" vs "${fb[key]}"`);
    }
  }
  if (fb.title && /[가-힣]/.test(fb.title)) say(`title still Korean: ${fb.title}`);

  // Body left untranslated is the failure a build can never catch.
  const body = b.replace(/^---[\s\S]*?---/, '').replace(/\{#[^}]*\}/g, '');
  const korean = (body.match(/[가-힣]/g) || []).length;
  if (korean > body.length * 0.08) {
    say(`body still ${Math.round((korean / body.length) * 100)}% Korean`);
  }
}

console.log(
  `\n${locale}: ${sources.length} expected, ${missing} missing, ${problems} problem(s)`
);
process.exit(missing || problems ? 1 : 0);
