#!/usr/bin/env node
// Verifies every destination in the auto-link-terms GLOSSARY against the anchors
// the docs actually publish.
//
// Why this exists: src/remark/auto-link-terms.mjs injects links that appear in no
// markdown file, so a renamed heading breaks them silently -- grep finds nothing
// and only a full Docusaurus build (minutes) reports it. This runs in about a
// second and is wired to "prebuild", so the build stops before it wastes that time.
//
// Rules:
//   ERROR  destination page does not exist, or its anchor does not resolve
//   WARN   the anchor resolves only through a heading's auto-generated slug
//          (rename the heading and it breaks again -- pin it with an explicit
//          {#anchor} on that heading instead)
//
// Usage:
//   node scripts/check-glossary-links.mjs            errors fail, warnings print
//   node scripts/check-glossary-links.mjs --strict   warnings fail too
//
// github-slugger is Docusaurus' own heading slugger, resolved from node_modules
// so this script matches the build exactly rather than reimplementing the rules.

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import { createRequire } from 'node:module';

const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const PLUGIN = path.join(ROOT, 'src', 'remark', 'auto-link-terms.mjs');
const SIDEBARS = path.join(ROOT, 'sidebars.js');
const STRICT = process.argv.includes('--strict');

const require = createRequire(import.meta.url);
let GithubSlugger;
try {
  const m = require('github-slugger');
  GithubSlugger = m.default || m;
} catch {
  console.error('[glossary-links] cannot resolve github-slugger from node_modules.');
  console.error('[glossary-links] run `npm install` first; it ships with @docusaurus/core.');
  process.exit(1);
}

// ---------------------------------------------------------------- docs
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.mdx?$/.test(e.name)) out.push(p);
  }
  return out;
}

// Docusaurus skips files and folders whose name starts with "_".
const isBuilt = rel => !rel.split('/').some(seg => seg.startsWith('_'));

function readPage(file) {
  const rel = path.relative(DOCS, file).split(path.sep).join('/');
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);

  let slug = null;
  if (lines[0] === '---') {
    for (let i = 1; i < lines.length && lines[i] !== '---'; i++) {
      const m = /^slug:\s*(.*)$/.exec(lines[i]);
      if (m) slug = m[1].trim().replace(/^['"]|['"]$/g, '');
    }
  }
  let route = '/' + rel.replace(/\.mdx?$/, '');
  if (slug) route = slug.startsWith('/') ? slug : '/' + slug;
  if (route === '/intro') route = '/';
  route = route.replace(/\/index$/, '') || '/';

  // Headings inside fenced code are not headings.
  const fenced = [];
  let inFence = false;
  lines.forEach((ln, i) => {
    if (/^\s*(```|~~~)/.test(ln)) { fenced[i] = true; inFence = !inFence; }
    else fenced[i] = inFence;
  });

  const slugger = new GithubSlugger();
  const explicit = new Set();
  const auto = new Set();
  lines.forEach((ln, i) => {
    if (fenced[i]) return;
    const h = /^(#{1,6})\s+(.*)$/.exec(ln);
    if (!h) return;
    let text = h[2].trim();
    const ex = /\{#([^}]+)\}\s*$/.exec(text);
    if (ex) { explicit.add(ex[1]); return; }
    const clean = text
      .replace(/`([^`]*)`/g, '$1')
      .replace(/\*\*?([^*]*)\*\*?/g, '$1')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .trim();
    auto.add(slugger.slug(clean));
  });
  // {#id} written on something that is not a heading still produces an anchor.
  lines.forEach((ln, i) => {
    if (fenced[i]) return;
    for (const m of ln.matchAll(/\{#([^}\s]+)\}/g)) explicit.add(m[1]);
  });

  return { rel, route, explicit, auto };
}

const pages = new Map();
for (const f of walk(DOCS)) {
  const p = readPage(f);
  if (isBuilt(p.rel)) pages.set(p.route, p);
}

// A category's generated-index slug is a real route with no anchors of its own.
const extraRoutes = new Set();
if (fs.existsSync(SIDEBARS)) {
  const sb = fs.readFileSync(SIDEBARS, 'utf8');
  for (const m of sb.matchAll(/slug:\s*'([^']+)'/g)) extraRoutes.add(m[1]);
  for (const m of sb.matchAll(/slug:\s*"([^"]+)"/g)) extraRoutes.add(m[1]);
}

// ------------------------------------------------------------- glossary
const src = fs.readFileSync(PLUGIN, 'utf8');
const start = src.indexOf('const GLOSSARY = {');
if (start < 0) {
  console.error('[glossary-links] no `const GLOSSARY = {` in ' + path.relative(ROOT, PLUGIN));
  process.exit(1);
}
const end = src.indexOf('\n};', start);
const body = src.slice(start, end);
const linesBefore = src.slice(0, start).split('\n').length - 1;

// Keys are a mix of quoted and bare. Bare keys are not always ASCII: 이미션,
// 오클루전, 글리터, 백라이트 and 스크린톤 are valid identifiers too, and an
// [A-Za-z0-9_]+ key pattern skips them without a word of complaint.
const entries = [];
for (const m of body.matchAll(/^[ \t]*(?:'([^']+)'|"([^"]+)"|([^\s:'"]+))\s*:\s*['"]([^'"]+)['"]\s*,/gm)) {
  entries.push({
    term: m[1] ?? m[2] ?? m[3],
    url: m[4],
    line: linesBefore + body.slice(0, m.index).split('\n').length,
  });
}

const errors = [];
const warnings = [];
for (const e of entries) {
  const hash = e.url.indexOf('#');
  const route = (hash < 0 ? e.url : e.url.slice(0, hash)).replace(/\/$/, '') || '/';
  const anchor = hash < 0 ? null : decodeURIComponent(e.url.slice(hash + 1));
  const page = pages.get(route);

  if (!page) {
    if (!extraRoutes.has(route)) errors.push({ ...e, why: `page ${route} does not exist` });
    else if (anchor) errors.push({ ...e, why: `${route} is a generated index and has no anchors` });
    continue;
  }
  if (!anchor) continue;
  if (page.explicit.has(anchor)) continue;
  if (page.auto.has(anchor)) {
    warnings.push({ ...e, why: `#${anchor} is an auto slug in ${page.rel}; pin it with {#${anchor}}` });
    continue;
  }
  errors.push({ ...e, why: `${page.rel} has no anchor #${anchor}` });
}

const rel = path.relative(ROOT, PLUGIN).split(path.sep).join('/');
console.log(`[glossary-links] ${entries.length} entries, ${pages.size} pages`);
for (const w of warnings) console.log(`  WARN  ${rel}:${w.line}  "${w.term}" -> ${w.url}\n        ${w.why}`);
for (const e of errors) console.error(`  ERROR ${rel}:${e.line}  "${e.term}" -> ${e.url}\n        ${e.why}`);

if (errors.length || (STRICT && warnings.length)) {
  console.error(`[glossary-links] FAILED: ${errors.length} error(s), ${warnings.length} warning(s).`);
  console.error('[glossary-links] a renamed heading breaks these links; fix the destination or add an alias anchor.');
  process.exit(1);
}
console.log(`[glossary-links] OK (${warnings.length} warning(s)).`);
