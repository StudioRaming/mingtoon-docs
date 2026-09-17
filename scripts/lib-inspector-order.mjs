// Shared source reader for the MingToon reference generator.
//
// Two jobs:
//   1. Read the BRP shader Properties block -> type / range / default / attributes.
//   2. Walk MingToonShaderGUI.InspectorUx.cs DrawFullInspector -> the inspector's
//      own tab + section order, and which properties each section draws.
//
// The C# lexical helpers (scanString / parseArgs / maskLiteralsAndComments /
// evalStringArg) are the ones glossary-extract.mjs already proved against this
// tree. They are reproduced here rather than imported because that file is a
// script with side effects (it rewrites glossary.json), and this generator must
// not touch another agent's output.

import fs from 'node:fs';
import path from 'node:path';

// ------------------------------------------------------------- C# lexing
export function scanString(text, i) {
  let j = i;
  let verbatim = false, interp = false;
  while (text[j] === '@' || text[j] === '$') {
    if (text[j] === '@') verbatim = true;
    if (text[j] === '$') interp = true;
    j++;
  }
  if (text[j] !== '"') return -1;
  j++;
  if (verbatim) {
    while (j < text.length) {
      if (text[j] === '"') {
        if (text[j + 1] === '"') { j += 2; continue; }
        return j + 1;
      }
      j++;
    }
    return -1;
  }
  let depth = 0;
  while (j < text.length) {
    const c = text[j];
    if (c === '\\') { j += 2; continue; }
    if (interp && c === '{') { depth++; j++; continue; }
    if (interp && c === '}') { if (depth > 0) depth--; j++; continue; }
    if (c === '"' && depth === 0) return j + 1;
    if (c === '\n') return -1;
    j++;
  }
  return -1;
}

export function literalValue(text, start, end) {
  let j = start;
  let verbatim = false;
  while (text[j] === '@' || text[j] === '$') { if (text[j] === '@') verbatim = true; j++; }
  const body = text.slice(j + 1, end - 1);
  if (verbatim) return body.split('""').join('"');
  return body.replace(/\\(u[0-9a-fA-F]{4}|.)/g, (m, g) => {
    if (g[0] === 'u') return String.fromCharCode(parseInt(g.slice(1), 16));
    switch (g) {
      case 'n': return '\n';
      case 't': return '\t';
      case 'r': return '\r';
      case '0': return '\0';
      case '\\': return '\\';
      case '"': return '"';
      case "'": return "'";
      default: return g;
    }
  });
}

const MASK_CACHE = new Map();
export function maskLiteralsAndComments(text) {
  if (MASK_CACHE.has(text)) return MASK_CACHE.get(text);
  const out = text.split('');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '/' && text[i + 1] === '/') {
      let j = i;
      while (j < text.length && text[j] !== '\n') { out[j] = ' '; j++; }
      i = j;
      continue;
    }
    if (c === '/' && text[i + 1] === '*') {
      const end = text.indexOf('*/', i + 2);
      const stop = end === -1 ? text.length : end + 2;
      for (let j = i; j < stop; j++) if (text[j] !== '\n') out[j] = ' ';
      i = stop - 1;
      continue;
    }
    if (c === '"' || ((c === '@' || c === '$') && (text[i + 1] === '"' || text[i + 2] === '"'))) {
      const end = scanString(text, i);
      if (end === -1) continue;
      for (let j = i; j < end; j++) if (text[j] !== '\n') out[j] = ' ';
      i = end - 1;
      continue;
    }
  }
  const result = out.join('');
  MASK_CACHE.set(text, result);
  return result;
}

export function parseArgs(text, open) {
  if (text[open] !== '(') return null;
  const args = [];
  let depth = 0;
  let i = open;
  let argStart = open + 1;
  for (; i < text.length; i++) {
    const c = text[i];
    if (c === '"' || ((c === '@' || c === '$') && text[i + 1] === '"') ||
        (c === '$' && text[i + 1] === '@' && text[i + 2] === '"')) {
      const end = scanString(text, i);
      if (end === -1) continue;
      i = end - 1;
      continue;
    }
    if (c === "'") {
      let j = i + 1;
      while (j < text.length) { if (text[j] === '\\') { j += 2; continue; } if (text[j] === "'") break; j++; }
      i = j;
      continue;
    }
    if (c === '/' && text[i + 1] === '/') { while (i < text.length && text[i] !== '\n') i++; continue; }
    if (c === '/' && text[i + 1] === '*') { const e = text.indexOf('*/', i + 2); i = e === -1 ? text.length : e + 1; continue; }
    if (c === '(' || c === '[' || c === '{') { depth++; continue; }
    if (c === ')' || c === ']' || c === '}') {
      depth--;
      if (depth === 0) {
        args.push({ raw: text.slice(argStart, i), start: argStart, end: i });
        return { args, close: i };
      }
      continue;
    }
    if (c === ',' && depth === 1) {
      args.push({ raw: text.slice(argStart, i), start: argStart, end: i });
      argStart = i + 1;
    }
  }
  return null;
}

// The string an argument starts with, ignoring any leading whitespace and
// comments. Arguments in this tree are routinely preceded by a comment block
// explaining the wording, and reading the literal without skipping it loses the
// label entirely.
export function firstLiteral(raw) {
  let i = 0;
  for (;;) {
    while (i < raw.length && /\s/.test(raw[i])) i++;
    if (raw[i] === '/' && raw[i + 1] === '/') {
      while (i < raw.length && raw[i] !== '\n') i++;
      continue;
    }
    if (raw[i] === '/' && raw[i + 1] === '*') {
      const end = raw.indexOf('*/', i + 2);
      i = end === -1 ? raw.length : end + 2;
      continue;
    }
    break;
  }
  const end = scanString(raw, i);
  if (end === -1) return null;
  return literalValue(raw, i, end);
}

// ---------------------------------------------------- shaderlab properties
// One declaration per line:
//   [Attr][Attr2] _Name ("Display Name", Range(0, 1)) = 0.5
const PROP_RE =
  /^[ \t]*((?:\[[^\]\n]*\][ \t]*)*)(_[A-Za-z0-9_]+)[ \t]*\([ \t]*"((?:[^"\\]|\\.)*)"[ \t]*,[ \t]*([^)]*(?:\([^)]*\))?[^)]*)\)[ \t]*=[ \t]*(.*)$/;

export function readShaderProperties(shaderFile) {
  const text = fs.readFileSync(shaderFile, 'utf8');
  const start = text.indexOf('Properties');
  const open = text.indexOf('{', start);
  let depth = 0, end = open;
  for (; end < text.length; end++) {
    if (text[end] === '{') depth++;
    else if (text[end] === '}') { depth--; if (depth === 0) break; }
  }
  const block = text.slice(open + 1, end);
  const props = new Map();
  let order = 0;
  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.replace(/\/\/.*$/, '');
    const m = line.match(PROP_RE);
    if (!m) continue;
    const [, attrText, name, display, typeText, defText] = m;
    const attrs = (attrText.match(/\[[^\]]*\]/g) || []).map((a) => a.slice(1, -1).trim());
    props.set(name, {
      name,
      display,
      attrs,
      rawType: typeText.trim(),
      rawDefault: defText.trim(),
      order: order++,
    });
  }
  return props;
}

// ----------------------------------------------------------- text catalogue
// MingInspectorText.cs registers every inspector string as
//   Add(entries, "key", ko, en, ja, tooltipKo, tooltipEn, tooltipJa)
//   AddLabel(entries, "key", ko, en, ja)
// Reading it here keeps the generator independent of any exported snapshot: the
// labels it prints are the ones the editor compiles.

function splitTopLevelPlus(raw) {
  const parts = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (c === '"' || ((c === '@' || c === '$') && raw[i + 1] === '"')) {
      const end = scanString(raw, i);
      if (end === -1) continue;
      i = end - 1;
      continue;
    }
    if (c === '/' && (raw[i + 1] === '/' || raw[i + 1] === '*')) {
      const masked = maskLiteralsAndComments(raw.slice(i));
      let j = 0;
      while (j < masked.length && masked[j] === ' ') j++;
      i += Math.max(j, 1) - 1;
      continue;
    }
    if (c === '(' || c === '[' || c === '{') depth++;
    else if (c === ')' || c === ']' || c === '}') depth--;
    else if (c === '+' && depth === 0) { parts.push(raw.slice(start, i)); start = i + 1; }
  }
  parts.push(raw.slice(start));
  return parts;
}

// Evaluates an argument that must resolve to a compile-time string, following
// `const string` declarations and `+` concatenation. Returns null when any
// operand cannot be resolved, which is how loop-generated registrations opt out.
// Skips whitespace and comments from `i`.
function skipTrivia(text, i) {
  for (;;) {
    while (i < text.length && /\s/.test(text[i])) i++;
    if (text[i] === '/' && text[i + 1] === '/') {
      while (i < text.length && text[i] !== '\n') i++;
      continue;
    }
    if (text[i] === '/' && text[i + 1] === '*') {
      const end = text.indexOf('*/', i + 2);
      i = end === -1 ? text.length : end + 2;
      continue;
    }
    return i;
  }
}

// The value of `t` when it is exactly one string literal, else null.
function wholeLiteral(t) {
  const start = skipTrivia(t, 0);
  const end = scanString(t, start);
  if (end === -1) return null;
  return skipTrivia(t, end) === t.length ? literalValue(t, start, end) : null;
}

function evalStringArg(raw, consts) {
  const parts = splitTopLevelPlus(raw);
  let out = '';
  for (const part of parts) {
    const lit = wholeLiteral(part);
    if (lit !== null) { out += lit; continue; }
    const t = part.trim();
    if (consts && Object.prototype.hasOwnProperty.call(consts, t)) { out += consts[t]; continue; }
    return null;
  }
  return out;
}

function findCalls(text, name) {
  const masked = maskLiteralsAndComments(text);
  const re = new RegExp(`(?<![A-Za-z0-9_.])${name}\\s*\\(`, 'g');
  const hits = [];
  let m;
  while ((m = re.exec(masked)) !== null) {
    const open = m.index + m[0].length - 1;
    const parsed = parseArgs(text, open);
    if (parsed) hits.push({ at: m.index, ...parsed });
  }
  return hits;
}

// `#if MINGTOON_DEV` guards strings that never reach a shipping build.
function devOnlyRanges(text) {
  const ranges = [];
  const re = /^[ \t]*#if[ \t]+MINGTOON_DEV[^\n]*$/gm;
  let m;
  while ((m = re.exec(text)) !== null) {
    const dirRe = /^[ \t]*#(if|else|elif|endif)\b[^\n]*$/gm;
    dirRe.lastIndex = re.lastIndex;
    let depth = 1, stop = -1, d;
    while ((d = dirRe.exec(text)) !== null) {
      if (d[1] === 'if') depth++;
      else if (d[1] === 'endif') { depth--; if (depth === 0) { stop = d.index; break; } }
      else if (depth === 1) { stop = d.index; break; }
    }
    ranges.push([m.index, stop === -1 ? text.length : stop]);
  }
  return ranges;
}

export function readTextCatalogue(root) {
  const file = path.join(root, 'Editor/InspectorUx/MingInspectorText.cs');
  const text = fs.readFileSync(file, 'utf8');

  // `const string NAME = "value";` anywhere in this file.
  const consts = Object.create(null);
  {
    const masked = maskLiteralsAndComments(text);
    const re = /\bconst\s+string\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*/g;
    let m;
    while ((m = re.exec(masked)) !== null) {
      const at = m.index + m[0].length;
      const semi = masked.indexOf(';', at);
      if (semi === -1) continue;
      const v = evalStringArg(text.slice(at, semi), consts);
      if (v !== null && !(m[1] in consts)) consts[m[1]] = v;
    }
  }

  const dev = devOnlyRanges(text);
  const isDev = (i) => dev.some(([a, b]) => i >= a && i < b);

  const entries = new Map();
  let skipped = 0;
  for (const [fn, arity] of [['Add', 8], ['AddLabel', 5]]) {
    for (const call of findCalls(text, fn)) {
      const a = call.args;
      if (!a.length || a[0].raw.trim() !== 'entries') continue;
      // AddLabel's body forwards to Add with its own parameters, not a call site.
      if (fn === 'Add' && a[1] && a[1].raw.trim() === 'key') continue;
      if (isDev(call.at)) { skipped++; continue; }
      if (a.length !== arity) { skipped++; continue; }
      const vals = a.slice(1).map((x) => evalStringArg(x.raw, consts));
      if (vals.some((v) => v === null)) { skipped++; continue; }
      const [key, ko, en, ja, ttKo = '', ttEn = '', ttJa = ''] = vals;
      if (!entries.has(key)) {
        entries.set(key, { ko, en, ja, tooltip_ko: ttKo, tooltip_en: ttEn, tooltip_ja: ttJa });
      }
    }
  }
  return { entries, skipped };
}

// LocalUiText(english) is a switch whose `case` label IS the English string:
//   case "Smoothness": return LocalLabel("표면 매끄러움", english, "表面の滑らかさ");
// Returns Map english -> {ko, en, ja}.
export function readUiTextTriples(root) {
  const file = path.join(root, 'Editor/InspectorUx/MingToonShaderGUI.InspectorUx.cs');
  const text = fs.readFileSync(file, 'utf8');
  const masked = maskLiteralsAndComments(text);
  const out = new Map();

  const sigRe = /string\s+LocalUiText\s*\(/g;
  let sig;
  while ((sig = sigRe.exec(masked)) !== null) {
    const open = masked.indexOf('(', sig.index);
    const parsed = parseArgs(text, open);
    if (!parsed) continue;
    const brace = masked.indexOf('{', parsed.close);
    if (brace === -1) continue;
    let depth = 0, j = brace;
    for (; j < masked.length; j++) {
      if (masked[j] === '{') depth++;
      else if (masked[j] === '}') { depth--; if (depth === 0) break; }
    }
    const region = text.slice(brace, j + 1);
    const regionMask = masked.slice(brace, j + 1);

    const cases = [];
    const caseRe = /(?:^|\n)\s*case\s+/g;
    let cm;
    while ((cm = caseRe.exec(regionMask)) !== null) {
      const p = cm.index + cm[0].indexOf('case') + 4;
      let q = p;
      while (q < region.length && /\s/.test(region[q])) q++;
      const end = scanString(region, q);
      if (end === -1) continue;
      cases.push({ at: q, value: literalValue(region, q, end), after: end });
    }
    for (let ci = 0; ci < cases.length; ci++) {
      const to = ci + 1 < cases.length ? cases[ci + 1].at : region.length;
      const slice = region.slice(cases[ci].after, to);
      const inner = findCalls(slice, 'LocalLabel')[0];
      if (!inner || inner.args.length !== 3) continue;
      const ko = firstLiteral(inner.args[0].raw);
      const ja = firstLiteral(inner.args[2].raw);
      if (ko === null) continue;
      const en = firstLiteral(inner.args[1].raw) ?? cases[ci].value;
      if (!out.has(cases[ci].value)) out.set(cases[ci].value, { ko, en, ja: ja ?? '' });
    }
  }
  return out;
}

// ------------------------------------------------------- inspector walking
export function buildSource(root) {
  const files = [];
  (function walk(dir) {
    for (const n of fs.readdirSync(dir)) {
      const full = path.join(dir, n);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (full.endsWith('.cs')) files.push(full);
    }
  })(path.join(root, 'Editor'));

  const SRC = new Map();
  const src = (f) => {
    if (!SRC.has(f)) SRC.set(f, fs.readFileSync(f, 'utf8'));
    return SRC.get(f);
  };

  // name -> [{file, start, end}] for every method body in the Editor tree.
  const METHODS = new Map();
  const METHOD_RE =
    /(?:^|\n)[ \t]*(?:\[[^\]]*\][ \t]*\n[ \t]*)*(?:private|internal|public|protected)[^\n;{()]*?\b([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
  for (const file of files) {
    const text = src(file);
    const masked = maskLiteralsAndComments(text);
    let m;
    METHOD_RE.lastIndex = 0;
    while ((m = METHOD_RE.exec(masked)) !== null) {
      const name = m[1];
      const open = masked.indexOf('(', m.index + m[0].length - 1);
      const parsed = parseArgs(text, open);
      if (!parsed) continue;
      let b = parsed.close + 1;
      while (b < masked.length && /\s/.test(masked[b])) b++;
      if (masked[b] !== '{') continue;
      let depth = 0, j = b;
      for (; j < masked.length; j++) {
        if (masked[j] === '{') depth++;
        else if (masked[j] === '}') { depth--; if (depth === 0) break; }
      }
      if (!METHODS.has(name)) METHODS.set(name, []);
      METHODS.get(name).push({ file, start: b, end: j + 1 });
      METHOD_RE.lastIndex = b + 1;
    }
  }

  const bodyCache = new Map();
  function methodBody(name) {
    if (bodyCache.has(name)) return bodyCache.get(name);
    const list = METHODS.get(name);
    const body = !list || !list.length ? null : list.map((x) => src(x.file).slice(x.start, x.end)).join('\n');
    bodyCache.set(name, body);
    return body;
  }

  return { files, src, METHODS, methodBody };
}

// Helper calls that never draw a property row of their own but whose bodies
// would otherwise drag unrelated properties into a section.
const DRAW_STOPLIST = new Set([
  'DrawMasterSection', 'DrawSimpleSection', 'DrawWorkflowGroupHeader',
  'DrawFullInspector', 'DrawSimpleInspector',
]);

// Every method name a drawer calls, in source order, restricted to names that
// exist in the Editor tree. Recursion is bounded by `maxDepth` and by `seen`,
// so a helper shared by two sections lands in the first section that reaches it
// only when it is reached from that section's own drawer.
export function collectProperties(rootBody, methodBody, maxDepth = 6) {
  const acc = [];
  const seen = new Set();

  function visit(rawText, depth) {
    const masked = maskLiteralsAndComments(rawText);
    const tokens = [];
    for (let i = 0; i < rawText.length; i++) {
      const c = rawText[i];
      if (c === '"' || ((c === '@' || c === '$') && rawText[i + 1] === '"')) {
        const end = scanString(rawText, i);
        if (end === -1) continue;
        tokens.push({ at: i, kind: 'str', value: literalValue(rawText, i, end) });
        i = end - 1;
      }
    }
    const callRe = /(?<![A-Za-z0-9_.])([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
    let m;
    while ((m = callRe.exec(masked)) !== null) tokens.push({ at: m.index, kind: 'call', value: m[1] });
    tokens.sort((a, b) => a.at - b.at);

    for (const t of tokens) {
      if (t.kind === 'str') {
        if (/^_[A-Za-z][A-Za-z0-9_]*$/.test(t.value) && !acc.includes(t.value)) acc.push(t.value);
        continue;
      }
      if (depth >= maxDepth) continue;
      if (DRAW_STOPLIST.has(t.value) || seen.has(t.value)) continue;
      const body = methodBody(t.value);
      if (!body) continue;
      seen.add(t.value);
      visit(body, depth + 1);
    }
  }

  visit(rootBody, 0);
  return acc;
}

// Walks DrawFullInspector and returns [{type:'tab'|'section', key, fallback,
// master, count, props}] in the order the inspector draws them.
export function readInspectorOrder(root) {
  const UX = path.join(root, 'Editor/InspectorUx/MingToonShaderGUI.InspectorUx.cs');
  const { src, METHODS, methodBody } = buildSource(root);
  const order = [];
  const visitedHelpers = new Set();

  function walk(file, start, end, depth) {
    const text = src(file);
    const masked = maskLiteralsAndComments(text);
    const region = masked.slice(start, end);
    const events = [];
    const re = /(?<![A-Za-z0-9_.])(DrawWorkflowGroupHeader|DrawMasterSection|DrawSimpleSection|Draw[A-Za-z0-9_]*WorkflowSections?)\s*\(/g;
    let m;
    while ((m = re.exec(region)) !== null) events.push({ at: start + m.index, name: m[1] });
    for (const ev of events) {
      const open = masked.indexOf('(', ev.at);
      const parsed = parseArgs(text, open);
      if (!parsed) continue;
      const a = parsed.args;
      if (ev.name === 'DrawWorkflowGroupHeader') {
        const key = firstLiteral(a[0].raw);
        if (key && !order.some((o) => o.type === 'tab' && o.key === key)) {
          order.push({ type: 'tab', key, props: [] });
        }
        continue;
      }
      if (ev.name === 'DrawMasterSection' || ev.name === 'DrawSimpleSection') {
        const key = firstLiteral(a[0].raw);
        if (!key || order.some((o) => o.type === 'section' && o.key === key)) continue;
        const fallback = a.length > 1 ? firstLiteral(a[1].raw) : null;
        // DrawMasterSection(key, fallback, openByDefault, editor, properties,
        //                   masterProp, countProp, body)
        let master = null, countProp = null;
        if (ev.name === 'DrawMasterSection') {
          master = a[5] ? firstLiteral(a[5].raw) : null;
          countProp = a[6] ? firstLiteral(a[6].raw) : null;
        }
        const callText = text.slice(open, parsed.close + 1);
        const props = collectProperties(callText, methodBody);
        order.push({
          type: 'section',
          key,
          fallback: fallback || '',
          master,
          countProp,
          props,
        });
        continue;
      }
      if (depth < 4 && !visitedHelpers.has(ev.name)) {
        visitedHelpers.add(ev.name);
        for (const def of METHODS.get(ev.name) || []) walk(def.file, def.start, def.end, depth + 1);
      }
    }
  }

  const full = (METHODS.get('DrawFullInspector') || []).find((d) => d.file === UX);
  if (!full) throw new Error('DrawFullInspector not found in ' + UX);
  walk(UX, full.start, full.end, 0);
  return order;
}
