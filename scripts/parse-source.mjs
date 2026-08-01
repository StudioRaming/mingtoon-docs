// Parses the MingToon Unity source into a single JSON model that the docs
// generator consumes. Two inputs only:
//
//   Editor/InspectorUx/MingInspectorText.cs   ko/en/ja labels and tooltips
//   Editor/Modules/MingBuiltInModuleCatalog.cs  which property sits where
//
// Everything the reference pages show comes from here, so a label that moves in
// the inspector moves in all three languages of the docs on the next run.

import fs from 'node:fs';
import path from 'node:path';

const SRC = process.env.MINGTOON_SRC;
if (!SRC) {
  console.error(
    'Set MINGTOON_SRC to the MingToon folder, e.g.\n' +
      '  MINGTOON_SRC="E:/Unity/warudo_nilo/My project BRP/Assets/StudioRaming/MingToon" node scripts/parse-source.mjs'
  );
  process.exit(1);
}

const TEXT_CS = path.join(SRC, 'Editor/InspectorUx/MingInspectorText.cs');
const CATALOG_CS = path.join(SRC, 'Editor/Modules/MingBuiltInModuleCatalog.cs');

// ---------------------------------------------------------------- shared

function unescapeCs(s) {
  return s
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16))
    )
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\');
}

// Splits a C# argument list at top-level commas, respecting string literals.
function splitArgs(body) {
  const args = [];
  let cur = '';
  let depth = 0;
  let inStr = false;
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (inStr) {
      cur += ch;
      if (ch === '\\') {
        cur += body[++i];
        continue;
      }
      if (ch === '"') inStr = false;
      continue;
    }
    if (ch === '"') {
      inStr = true;
      cur += ch;
      continue;
    }
    if (ch === '(' || ch === '[') depth++;
    if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) {
      args.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) args.push(cur.trim());
  return args;
}

// "a" + "b" -> ab ; returns null when the argument is not a string literal.
function literal(arg) {
  const parts = [...arg.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  if (!parts.length) return null;
  const joinedOnly = arg.replace(/"(?:[^"\\]|\\.)*"/g, '').replace(/[\s+]/g, '');
  if (joinedOnly.length) return null; // had non-literal tokens
  return unescapeCs(parts.join(''));
}

// ------------------------------------------------------------------ text

function parseText() {
  const src = fs.readFileSync(TEXT_CS, 'utf8');
  const re =
    /\b(AddLabel|Add)\s*\(\s*entries\s*,\s*((?:"(?:[^"\\]|\\.)*"\s*\+?\s*)+),\s*([\s\S]*?)\)\s*;/g;
  const out = {};
  let m;
  while ((m = re.exec(src))) {
    const key = literal(m[2]);
    const args = splitArgs(m[3]).map(literal);
    if (!key || args.some((a) => a === null)) continue;
    if (m[1] === 'AddLabel' && args.length >= 3) {
      out[key] = {ko: args[0], en: args[1], ja: args[2]};
    } else if (m[1] === 'Add' && args.length >= 6) {
      out[key] = {
        ko: args[0],
        en: args[1],
        ja: args[2],
        tip: {ko: args[3], en: args[4], ja: args[5]},
      };
    }
  }
  return out;
}

// --------------------------------------------------------------- catalog

// Mirrors MingBuiltInModuleCatalog.DefaultInspectorGroup.
function defaultInspectorGroup(semanticId) {
  const map = [
    ['ming.stack.', 'surface.stack'],
    ['ming.normal.', 'surface.normal'],
    ['ming.occlusion.', 'surface.occlusion'],
    ['ming.pbr.', 'lighting.pbr'],
    ['ming.surface.', 'surface.advanced'],
    ['ming.lighting.', 'lighting.core'],
    ['ming.shadow.', 'shadow.advanced'],
    ['ming.matcap.', 'highlight.matcap'],
    ['ming.emission.', 'highlight.emission'],
    ['ming.rim.', 'highlight.rim'],
    ['ming.face.', 'face.advanced'],
    ['ming.outline.', 'outline.advanced'],
  ];
  for (const [prefix, group] of map) {
    if (semanticId.startsWith(prefix)) return group;
  }
  return 'technical';
}

function parseCatalog() {
  const src = fs.readFileSync(CATALOG_CS, 'utf8');

  // Module bodies: `private static MingModuleDescriptor Surface()` ... up to the
  // next declaration. Each contains Module("ming.x", order, cost, hooks, props).
  const modules = [];
  const declRe = /private static MingModuleDescriptor (\w+)\s*\(\s*\)/g;
  const decls = [];
  let d;
  while ((d = declRe.exec(src))) {
    decls.push({fn: d[1], start: d.index});
  }
  for (let i = 0; i < decls.length; i++) {
    const body = src.slice(
      decls[i].start,
      i + 1 < decls.length ? decls[i + 1].start : src.length
    );
    d = [null, decls[i].fn];

    // Backlight/FrontLight/Glitter are three identical bands declared through a
    // shared helper, so their properties only exist as call arguments.
    const band = body.match(
      /LightweightHighlightModule\(\s*\n?\s*"([^"]+)",\s*(\d+),\s*"(_\w+)",\s*\n?\s*"(_\w+)",\s*"(_\w+)"/
    );
    if (band) {
      const [, id, order, master, color, strength] = band;
      modules.push({
        fn: decls[i].fn,
        id,
        order: Number.parseInt(order, 10),
        cost: 'Light',
        properties: [
          ['enabled', master, 'Enable', 'Toggle', 0, null],
          ['color', color, 'Tint', 'Color', 10, master],
          ['strength', strength, 'Amount', 'Range', 20, master],
        ].map(([suffix, name, role, valueKind, order2, controller]) => ({
          name,
          semanticId: id + '.' + suffix,
          role,
          valueKind,
          importance: 'Basic',
          order: order2,
          views: ['Full'],
          inspectorGroup: defaultInspectorGroup(id + '.'),
          controller,
        })),
      });
      continue;
    }

    const idMatch = body.match(
      /Module\(\s*\n?\s*"([^"]+)"\s*,\s*(\d+)\s*,\s*(?:new MingModuleCost\(([^)]*)\)|MingModuleCost\.(\w+))/
    );
    if (!idMatch) continue;

    // `const string master = "_X";` locals are used as P() arguments.
    const locals = new Map();
    for (const c of body.matchAll(/const string (\w+)\s*=\s*"([^"]+)"\s*;/g)) {
      locals.set(c[1], c[2]);
    }

    const properties = [];
    const propRe = /\b(PIA|P)\s*\(\s*("(?:_\w+)"|\w+)\s*,\s*([\s\S]*?)\)\s*,?\s*\n/g;
    let p;
    while ((p = propRe.exec(body))) {
      const kind = p[1];
      const rawName = p[2];
      const name = rawName.startsWith('"')
        ? rawName.slice(1, -1)
        : locals.get(rawName);
      if (!name) continue;
      const rest = splitArgs(p[3]);
      // PIA: semanticId, role, valueKind, importance, order, overrideMode,
      //      dynamicKeep, views, inspectorGroup, [visibilityController]
      // P  : semanticId, role, valueKind, importance, order, overrideMode,
      //      dynamicKeep, [visibilityController]
      const semanticId = literal(rest[0]);
      if (!semanticId) continue;
      const pick = (s, tokenPrefix) => {
        const t = (s || '').replace(/\s+/g, ' ');
        const mm = t.match(new RegExp(tokenPrefix + '\\.(\\w+)'));
        return mm ? mm[1] : null;
      };
      const role = pick(rest[1], 'MingPropertySemanticRole');
      const valueKind = pick(rest[2], 'MingPropertyValueKind');
      const importance = pick(rest[3], 'MingPropertyImportance');
      const order = Number.parseInt(rest[4], 10);
      let views;
      let inspectorGroup;
      let controller;
      if (kind === 'PIA') {
        views = (rest[7] || '')
          .replace(/\s+/g, ' ')
          .split('|')
          .map((v) => (v.match(/MingInspectorView\.(\w+)/) || [])[1])
          .filter(Boolean);
        inspectorGroup = literal(rest[8]);
        controller = rest.length > 9 ? literal(rest[9]) : null;
      } else {
        views = ['Full'];
        inspectorGroup = defaultInspectorGroup(semanticId);
        controller = rest.length > 7 ? literal(rest[7]) : null;
      }
      properties.push({
        name,
        semanticId,
        role,
        valueKind,
        importance,
        order: Number.isNaN(order) ? 0 : order,
        views,
        inspectorGroup,
        controller,
      });
    }

    modules.push({
      fn: d[1],
      id: idMatch[1],
      order: Number.parseInt(idMatch[2], 10),
      cost: idMatch[3] ? 'cost(' + idMatch[3].replace(/\s+/g, '') + ')' : idMatch[4],
      properties,
    });
  }
  modules.sort((a, b) => a.order - b.order);
  return modules;
}

// ---------------------------------------------------------------- output

const text = parseText();
const modules = parseCatalog();

const model = {
  generatedFrom: 'MingToon Unity source',
  modules,
  text,
};

const outDir = path.join(process.cwd(), 'scripts', '.model');
fs.mkdirSync(outDir, {recursive: true});
fs.writeFileSync(
  path.join(outDir, 'model.json'),
  JSON.stringify(model, null, 1)
);

const propCount = modules.reduce((n, m) => n + m.properties.length, 0);
const labelled = modules.reduce(
  (n, m) => n + m.properties.filter((p) => text['prop.' + p.name]).length,
  0
);
console.log(
  `modules: ${modules.length}  properties: ${propCount}  ` +
    `with ko/en/ja label: ${labelled}  text entries: ${Object.keys(text).length}`
);
for (const m of modules) {
  const missing = m.properties
    .filter((p) => !text['prop.' + p.name])
    .map((p) => p.name);
  console.log(
    `  ${m.id.padEnd(24)} ${String(m.properties.length).padStart(3)} props` +
      (missing.length ? `  (no label: ${missing.length})` : '')
  );
}
