#!/usr/bin/env node
// Generates the seven property-reference pages of the MingToon docs site in
// Korean, English and Japanese.
//
//   node scripts/gen-reference.mjs [productRoot] [siteRoot]
//   MINGTOON_ROOT=<package> npm run gen:reference
//
// Inputs
//   1. Editor/InspectorUx/MingToonShaderGUI.InspectorUx.cs -> DrawFullInspector
//      gives the tab / section order and, per section, the draw calls it makes.
//   2. Each draw call carries its own label and tooltip in all three languages,
//      either inline (LocalLabel(ko, en, ja)) or by catalogue key
//      (MingInspectorText.GetLabel / GetTooltip), resolved by reading the
//      registrations in Editor/InspectorUx/MingInspectorText.cs directly.
//   3. Shaders/MingToonBRP.shader Properties -> type, range, default.
//
// Output: one style-2-C table per inspector section, grouped into the seven
// reference pages, written once per locale. The frontmatter and the lead
// paragraphs of every page belong to whoever wrote them (a translator, for the
// two i18n trees) and are read back off disk untouched; only the tables and the
// section headings are generated.
//
// Re-runnable. Prints per-locale row counts and three checks that must read 0:
// mid-word truncations, duplicate labels inside one table, and leftover "2D".

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  readShaderProperties,
  buildSource,
  maskLiteralsAndComments,
  scanString,
  literalValue,
  parseArgs,
  firstLiteral,
  readTextCatalogue,
  readUiTextTriples,
} from './lib-inspector-order.mjs';

// fileURLToPath, not URL.pathname: the latter leaves %20 in place, so a path
// with a space in it ("New Project…") resolves to a directory that is not there.
const HERE = path.dirname(fileURLToPath(import.meta.url));

// The MingToon package to read. Override with MINGTOON_ROOT when the product
// lives somewhere else; the default is where it sits on the authoring machine.
const DEFAULT_ROOT =
  'C:/Users/zmnbn/AppData/Local/VRChatCreatorCompanion/VRChatProjects/New Project1231231234/Assets/StudioRaming/MingToon';
const ROOT = process.argv[2] || process.env.MINGTOON_ROOT || DEFAULT_ROOT;
// The docs site. Defaults to the repository this script ships in.
const SITE = process.argv[3] || path.resolve(HERE, '..');

for (const [label, dir] of [['MINGTOON_ROOT', ROOT], ['site root', SITE]]) {
  if (!fs.existsSync(dir)) {
    console.error(`[gen-reference] ${label} does not exist: ${dir}`);
    process.exit(1);
  }
}

const LANGS = ['ko', 'en', 'ja'];

// ------------------------------------------------------------- rename rule
// Every "2D" in this inspector names a camera-depth effect, so it reads 뎁스 /
// Depth / デプス. Translucency is the one exception and becomes SSSSS. Rules run
// in order, most specific first, and are idempotent: a string the glossary has
// already rewritten passes through unchanged.
const RENAME = {
  ko: [
    ['2D 투과광', 'SSSSS (실험적)'],
    ['Inner 2D Edge', 'Inner Depth Edge'],
    ['내부 2D 경계', '내부 뎁스 경계'],
    ['2D 투영 그림자', '뎁스 투영 그림자'],
    ['2D 깊이 효과', '뎁스 효과'],
    ['2D 림라이트', '뎁스 림라이트'],
    ['2D 그림자', '뎁스 그림자'],
    ['2D 섀도우', '뎁스 그림자'],
    ['2D 실루엣', '뎁스 실루엣'],
    ['2D 경계', '뎁스 경계'],
    ['2D 효과', '뎁스 효과'],
    ['2D 설정', '뎁스 설정'],
    ['2D 림', '뎁스 림'],
    ['2D·', '뎁스·'],
    ['·2D ', '·뎁스 '],
  ],
  en: [
    ['2D Translucency', 'SSSSS (Experimental)'],
    ['2D translucency', 'SSSSS (Experimental)'],
    ['Inner 2D Edge', 'Inner Depth Edge'],
    ['inner 2D edge', 'inner depth edge'],
    ['2D Rim Light', 'Depth Rim Light'],
    ['2D Rim', 'Depth Rim'],
    ['2D rim', 'depth rim'],
    ['2D-rim', 'depth-rim'],
    ['2D Projected Shadow', 'Depth Projected Shadow'],
    ['2D projected-shadow', 'depth projected-shadow'],
    ['2D projected shadow', 'depth projected shadow'],
    ['2D Silhouette', 'Depth Silhouette'],
    ['2D silhouette', 'depth silhouette'],
    ['2D Shadow', 'Depth Shadow'],
    ['2D shadow', 'depth shadow'],
    ['2D depth effects', 'depth effects'],
    ['2D-effect', 'depth-effect'],
    ['2D Effect', 'Depth Effect'],
    ['2D effect', 'depth effect'],
    ['2D Setting', 'Depth Setting'],
    ['2D setting', 'depth setting'],
    ['2D Edge', 'Depth Edge'],
    ['2D edge', 'depth edge'],
    ['2D and cast shadows', 'depth and cast shadows'],
    [', 2D,', ', depth,'],
    ['and 2D shadows', 'and depth shadows'],
    ['or 2D shadows', 'or depth shadows'],
  ],
  ja: [
    ['2D透過光', 'SSSSS（実験的）'],
    ['Inner 2D Edge', 'Inner Depth Edge'],
    ['2D投影シャドウ', 'デプス投影シャドウ'],
    ['2D投影影', 'デプス投影影'],
    ['2Dリムライト', 'デプスリムライト'],
    ['2Dリム', 'デプスリム'],
    ['2Dシルエット', 'デプスシルエット'],
    ['2Dシャドウ', 'デプスシャドウ'],
    ['内側2Dエッジ', '内側デプスエッジ'],
    ['2Dエッジ', 'デプスエッジ'],
    ['2Dエフェクト', 'デプスエフェクト'],
    ['2Dの深度エフェクト', 'デプスエフェクト'],
    ['2D効果', 'デプス効果'],
    ['2D設定', 'デプス設定'],
    ['2D影', 'デプス影'],
    ['2Dの各シャドウ', 'デプスの各シャドウ'],
    ['2D・', 'デプス・'],
    ['・2D', '・デプス'],
  ],
};

function rename(value, lang) {
  if (!value) return '';
  let out = value;
  for (const [from, to] of RENAME[lang]) out = out.split(from).join(to);
  return out;
}

// A label or tooltip in all three languages.
function triple(ko, en, ja) {
  return { ko: rename(ko || '', 'ko'), en: rename(en || '', 'en'), ja: rename(ja || '', 'ja') };
}
const hasText = (t) => Boolean(t && (t.ko || t.en || t.ja));

// ------------------------------------------------------------- text catalogue
// Read straight out of MingInspectorText.cs, so the labels printed here are the
// ones the editor compiles. No exported snapshot to keep in sync.
const { entries: CATALOGUE, skipped: catalogueSkipped } = readTextCatalogue(ROOT);
const UI_TEXT = readUiTextTriples(ROOT);

function catalogueLabel(key) {
  const r = key && CATALOGUE.get(key);
  if (!r) return null;
  const t = triple(r.ko, r.en, r.ja);
  return hasText(t) ? t : null;
}
function catalogueTooltip(key) {
  const r = key && CATALOGUE.get(key);
  if (!r) return null;
  const t = triple(r.tooltip_ko, r.tooltip_en, r.tooltip_ja);
  return hasText(t) ? t : null;
}
function uiLabel(english) {
  const r = english && UI_TEXT.get(english);
  if (!r) return null;
  const t = triple(r.ko, r.en, r.ja);
  return hasText(t) ? t : null;
}

// ------------------------------------------------------------- shader types
const shaderProps = readShaderProperties(path.join(ROOT, 'Shaders/MingToonBRP.shader'));
// Layered modules draw one row per layer from a base name plus a two-digit
// suffix ("_MatcapRotation" + "01"), so the base name has no declaration of its
// own. Layer 01 carries the type, range and default for the whole family.
function shaderProp(name) {
  if (shaderProps.has(name)) return { decl: shaderProps.get(name) };
  if (shaderProps.has(name + '01')) return { decl: shaderProps.get(name + '01') };
  return null;
}

const HIDDEN_ATTRS = /^(HideInInspector|PerRendererData)$/;
const isHidden = (decl) => decl.attrs.some((a) => HIDDEN_ATTRS.test(a.split('(')[0].trim()));

// [Enum(UnityEngine.Rendering.X)] names a runtime enum instead of listing its
// members, so the members are spelled out here. Without this the Range column
// printed the type name and the Default column printed it again.
const UNITY_ENUMS = {
  'UnityEngine.Rendering.CompareFunction':
    ['Disabled', 'Never', 'Less', 'Equal', 'LessEqual', 'Greater', 'NotEqual', 'GreaterEqual', 'Always'],
  'UnityEngine.Rendering.StencilOp':
    ['Keep', 'Zero', 'Replace', 'IncrementSaturate', 'DecrementSaturate', 'Invert', 'IncrementWrap', 'DecrementWrap'],
  'UnityEngine.Rendering.CullMode': ['Off', 'Front', 'Back'],
  'UnityEngine.Rendering.BlendOp': ['Add', 'Subtract', 'ReverseSubtract', 'Min', 'Max'],
  'UnityEngine.Rendering.BlendMode':
    ['Zero', 'One', 'DstColor', 'SrcColor', 'OneMinusDstColor', 'SrcAlpha', 'OneMinusSrcColor',
     'DstAlpha', 'OneMinusDstAlpha', 'SrcAlphaSaturate', 'OneMinusSrcAlpha'],
};

function enumOptions(decl) {
  const m = decl.attrs.map((a) => a.match(/^(?:Keyword)?Enum\s*\(([^)]*)\)$/)).find(Boolean);
  if (!m) return null;
  const parts = m[1].split(',').map((s) => s.trim()).filter(Boolean);
  if (parts.length === 1 && UNITY_ENUMS[parts[0]]) {
    return UNITY_ENUMS[parts[0]].map((name, value) => ({ name, value }));
  }
  const opts = [];
  if (parts.length >= 2 && /^-?\d+(\.\d+)?$/.test(parts[1])) {
    for (let i = 0; i + 1 < parts.length; i += 2) opts.push({ name: parts[i], value: Number(parts[i + 1]) });
  } else {
    parts.forEach((n, i) => opts.push({ name: n, value: i }));
  }
  return opts;
}

const TOGGLE_ATTR = /^(Toggle|ToggleUI|ToggleOff|MingModuleToggle)\b/;

// The six form names, per locale.
const TYPE_WORDS = {
  toggle: { ko: '켜기/끄기', en: 'Toggle', ja: 'オン/オフ' },
  float: { ko: '실수', en: 'Float', ja: '実数' },
  int: { ko: '정수', en: 'Int', ja: '整数' },
  color: { ko: '색상', en: 'Color', ja: '色' },
  texture: { ko: '텍스처', en: 'Texture', ja: 'テクスチャ' },
  enum: { ko: '선택', en: 'Enum', ja: '選択' },
};
const WORD = {
  on: { ko: '켜짐', en: 'On', ja: 'オン' },
  off: { ko: '꺼짐', en: 'Off', ja: 'オフ' },
  none: { ko: '없음', en: 'None', ja: 'なし' },
  white: { ko: '흰색', en: 'White', ja: '白' },
  black: { ko: '검정', en: 'Black', ja: '黒' },
  fourValues: { ko: '네 값', en: 'Four values', ja: '4つの値' },
};

// Returns { kind, range, def } where each is a locale triple or a plain string.
function describeType(decl) {
  const attrs = decl.attrs.map((a) => a.trim());
  const type = decl.rawType;
  const opts = enumOptions(decl);
  const isToggle = attrs.some((a) => TOGGLE_ATTR.test(a));
  const isIntRange = attrs.some((a) => /^IntRange\b/.test(a));

  if (isToggle) {
    return { kind: TYPE_WORDS.toggle, range: '-', def: numberOr(decl.rawDefault) === 1 ? WORD.on : WORD.off };
  }
  if (opts) {
    const d = numberOr(decl.rawDefault);
    const hit = opts.find((o) => o.value === d);
    return {
      kind: TYPE_WORDS.enum,
      range: opts.map((o) => o.name).join(' / '),
      def: hit ? hit.name : String(decl.rawDefault),
    };
  }
  if (/^(2D|Cube|3D)$/.test(type)) return { kind: TYPE_WORDS.texture, range: '-', def: WORD.none };
  if (type === 'Color') return { kind: TYPE_WORDS.color, range: '-', def: colorText(decl.rawDefault) };
  if (type === 'Vector') return { kind: TYPE_WORDS.float, range: WORD.fourValues, def: vectorText(decl.rawDefault) };
  const rm = type.match(/^Range\s*\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)$/);
  if (rm) {
    return {
      kind: isIntRange ? TYPE_WORDS.int : TYPE_WORDS.float,
      range: `${trimNum(rm[1])} ~ ${trimNum(rm[2])}`,
      def: trimNum(decl.rawDefault),
    };
  }
  if (/^Int$/i.test(type)) return { kind: TYPE_WORDS.int, range: '-', def: trimNum(decl.rawDefault) };
  return { kind: TYPE_WORDS.float, range: '-', def: trimNum(decl.rawDefault) };
}

function numberOr(s) {
  const n = Number(String(s).trim());
  return Number.isFinite(n) ? n : NaN;
}
function trimNum(s) {
  const n = Number(String(s).trim());
  if (!Number.isFinite(n)) return String(s).trim();
  return String(Number(n.toFixed(4)));
}
function vectorText(s) {
  return String(s).replace(/[()]/g, '').split(',').map((x) => trimNum(x)).join(', ');
}
function colorText(s) {
  const nums = String(s).replace(/[()]/g, '').split(',').map((x) => Number(x));
  if (nums.length >= 3 && nums.slice(0, 3).every((v) => v === 1)) return WORD.white;
  if (nums.length >= 3 && nums.slice(0, 3).every((v) => v === 0)) return WORD.black;
  return vectorText(s);
}

// ------------------------------------------------- draw-site row extraction
const SRC = buildSource(ROOT);

const LOOKUP_CALLS = new Set(['Optional', 'Find', 'FindProperty', 'LayerName', 'Mathf', 'GUIContent']);

// The map/mask slot UI (channel source, remap, feather, mask UV, HSVG) is one
// shared control set drawn inside every texture slot, and the site documents it
// once on its own page.
const SHARED_SLOT_FILE = /(MingTextureModuleGUI|TexturePreview|TextureCards)/;
const sharedHelperCache = new Map();
function isSharedSlotHelper(name) {
  if (sharedHelperCache.has(name)) return sharedHelperCache.get(name);
  const defs = SRC.METHODS.get(name) || [];
  const shared = defs.length > 0 && defs.every((d) => SHARED_SLOT_FILE.test(path.basename(d.file)));
  sharedHelperCache.set(name, shared);
  return shared;
}

// Every call in `text`, including statically qualified ones. The name reported
// is the last segment, so MingInspectorText.GetLabel(...) reads as GetLabel.
const CALL_CACHE = new Map();
function callsIn(text) {
  if (CALL_CACHE.has(text)) return CALL_CACHE.get(text);
  const masked = maskLiteralsAndComments(text);
  const re = /(?<![A-Za-z0-9_])((?:[A-Za-z_][A-Za-z0-9_]*\s*\.\s*)*)([A-Za-z_][A-Za-z0-9_]*)\s*\(/g;
  const out = [];
  let m;
  while ((m = re.exec(masked)) !== null) {
    const open = m.index + m[0].length - 1;
    const parsed = parseArgs(text, open);
    if (!parsed) continue;
    out.push({ name: m[2], at: m.index, open, close: parsed.close, args: parsed.args });
  }
  if (CALL_CACHE.size < 4000) CALL_CACHE.set(text, out);
  return out;
}

function stringLiterals(text) {
  const out = [];
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"' || ((c === '@' || c === '$') && text[i + 1] === '"')) {
      const end = scanString(text, i);
      if (end === -1) continue;
      out.push({ at: i, value: literalValue(text, i, end) });
      i = end - 1;
    }
  }
  return out;
}

// Every localized string this call passes, in argument order. A row drawer's
// first such string is the label and its second is the tooltip, whether they
// arrive inline, by catalogue key, or through a local declared just above.
function labelSources(callText, localStrings) {
  const found = [];
  for (const c of callsIn(callText)) {
    const a0 = c.args.length ? firstLiteral(c.args[0].raw) : null;
    if (a0 === null) continue;
    if (c.name === 'LocalLabel' && c.args.length === 3) {
      const en = firstLiteral(c.args[1].raw);
      const ja = firstLiteral(c.args[2].raw);
      found.push({ at: c.at, t: triple(a0, en, ja) });
    } else if (c.name === 'LocalUiText') {
      const t = uiLabel(a0);
      if (t) found.push({ at: c.at, t });
    } else if (c.name === 'GetLabel') {
      const t = catalogueLabel(a0);
      if (t) found.push({ at: c.at, t, tip: catalogueTooltip(a0) });
    } else if (c.name === 'GetTooltip') {
      const t = catalogueTooltip(a0);
      if (t) found.push({ at: c.at, t });
    }
  }
  if (localStrings && localStrings.size) {
    const masked = maskLiteralsAndComments(callText);
    const idRe = /(?<![A-Za-z0-9_.])([A-Za-z_][A-Za-z0-9_]*)(?!\s*[(.])/g;
    let m;
    while ((m = idRe.exec(masked)) !== null) {
      const hit = localStrings.get(m[1]);
      if (hit) found.push({ at: m.index, t: hit });
    }
  }
  return found.filter((f) => hasText(f.t)).sort((a, b) => a.at - b.at);
}

// Rows a single method body draws, in source order. Calls are visited innermost
// first and each claims the span it consumed, so a property named by an inner
// row call is never counted again by the wrapper around it.
function rowsInBody(body) {
  const calls = callsIn(body).slice().sort((a, b) => (a.close - a.open) - (b.close - b.open));

  // Some drawers look a property up into a local and pass the local to the row
  // call, so the row call itself never names the property.
  const locals = new Map();
  {
    const re = /MaterialProperty\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(?:Optional|Find|FindProperty)\s*\(\s*"(_[A-Za-z0-9_]+)"/g;
    let m;
    while ((m = re.exec(body)) !== null) if (!locals.has(m[1])) locals.set(m[1], m[2]);
  }
  // Labels are hoisted into locals the same way.
  const localStrings = new Map();
  {
    const re = /\b(?:string|var)\s+([A-Za-z_][A-Za-z0-9_]*)\s*=\s*([A-Za-z_][A-Za-z0-9_.]*)\s*\(/g;
    let m;
    while ((m = re.exec(body)) !== null) {
      if (localStrings.has(m[1])) continue;
      const open = m.index + m[0].length - 1;
      const parsed = parseArgs(body, open);
      if (!parsed || !parsed.args.length) continue;
      const fn = m[2].split('.').pop();
      const a0 = firstLiteral(parsed.args[0].raw);
      if (a0 === null) continue;
      let t = null;
      if (fn === 'LocalLabel' && parsed.args.length === 3) {
        t = triple(a0, firstLiteral(parsed.args[1].raw), firstLiteral(parsed.args[2].raw));
      } else if (fn === 'LocalUiText') t = uiLabel(a0);
      else if (fn === 'GetLabel') t = catalogueLabel(a0);
      if (hasText(t)) localStrings.set(m[1], t);
    }
  }

  const claimed = [];
  const rows = [];
  for (const call of calls) {
    if (LOOKUP_CALLS.has(call.name)) continue;
    const text = body.slice(call.open, call.close + 1);
    const src = labelSources(text, localStrings);
    if (!/^Draw/.test(call.name) && src.length === 0) continue;

    const named = stringLiterals(text).filter((s) => /^_[A-Z][A-Za-z0-9_]*$/.test(s.value));
    if (locals.size) {
      const masked = maskLiteralsAndComments(text);
      const idRe = /(?<![A-Za-z0-9_.])([A-Za-z_][A-Za-z0-9_]*)(?!\s*\()/g;
      let m;
      while ((m = idRe.exec(masked)) !== null) {
        const hit = locals.get(m[1]);
        if (hit) named.push({ at: m.index, value: hit });
      }
      named.sort((a, b) => a.at - b.at);
    }
    const props = named
      .filter((s) => shaderProp(s.value))
      .filter((s) => !claimed.some((r) => call.open + s.at >= r.open && call.open + s.at <= r.close));
    if (props.length === 0) continue;

    const single = props.length === 1;
    // A call drawing several properties pairs its strings with them position by
    // position only when the counts line up; otherwise the strings belong to
    // something else and guessing an index puts the wrong label on the row.
    const paired = single || src.length === props.length;
    const seenHere = new Set();
    for (let i = 0; i < props.length; i++) {
      const p = props[i];
      if (seenHere.has(p.value)) continue;
      seenHere.add(p.value);
      const head = single ? src[0] : (paired ? src[i] : null);
      const label = (head && head.t) || catalogueLabel('prop.' + p.value);
      const tooltip =
        (single && src[1] && src[1].t) ||
        (head && head.tip) ||
        catalogueTooltip('prop.' + p.value) ||
        null;
      if (!hasText(label)) continue;
      rows.push({ prop: p.value, label, tooltip, at: call.open + p.at });
    }
    claimed.push({ open: call.open, close: call.close });
  }
  rows.sort((a, b) => a.at - b.at);
  return rows;
}

// Collects a section's rows by walking its drawer and every helper it calls.
// Rows, group headings and helper calls share one source-ordered stream, so a
// helper's rows land where the call to it sits and the table stays in screen
// order.
function sectionRows(callText, maxDepth = 6) {
  const rows = [];
  const seen = new Set();
  const seenProps = new Set();
  let currentGroup = null;

  function visit(body, depth) {
    const events = rowsInBody(body).map((r) => ({ at: r.at, row: r }));
    for (const c of callsIn(body)) {
      if (c.name !== 'DrawGroupLabel') continue;
      const src = labelSources(body.slice(c.open, c.close + 1));
      if (src.length) events.push({ at: c.at, group: src[0].t });
    }
    if (depth < maxDepth) {
      for (const c of callsIn(body)) {
        const n = c.name;
        if (seen.has(n) || LOOKUP_CALLS.has(n)) continue;
        if (/^Draw(Master|Simple)Section$|^DrawWorkflowGroupHeader$|^DrawFullInspector$|^DrawSimpleInspector$/.test(n)) continue;
        if (isSharedSlotHelper(n)) continue;
        if (!SRC.methodBody(n)) continue;
        events.push({ at: c.at, helper: n });
      }
    }
    events.sort((a, b) => a.at - b.at);
    for (const ev of events) {
      if (ev.group) { currentGroup = ev.group; continue; }
      if (ev.row) {
        if (seenProps.has(ev.row.prop)) continue;
        seenProps.add(ev.row.prop);
        ev.row.group = currentGroup;
        rows.push(ev.row);
        continue;
      }
      if (seen.has(ev.helper)) continue;
      seen.add(ev.helper);
      const outer = currentGroup;
      visit(SRC.methodBody(ev.helper), depth + 1);
      currentGroup = outer;
    }
  }

  visit(callText, 0);
  return rows;
}

// ------------------------------------------------------- inspector order
const UX = path.join(ROOT, 'Editor/InspectorUx/MingToonShaderGUI.InspectorUx.cs');

// GetSectionTextKey remaps a section key onto its catalogue key ("rim" is drawn
// under section.depth_rim), so read the switch instead of assuming the prefix.
const sectionTextKey = (() => {
  const map = new Map();
  const def = (SRC.METHODS.get('GetSectionTextKey') || [])[0];
  if (def) {
    const text = SRC.src(def.file).slice(def.start, def.end);
    const re = /case\s+"([^"]+)"\s*:\s*return\s+"([^"]+)"\s*;/g;
    let m;
    while ((m = re.exec(text)) !== null) map.set(m[1], m[2]);
  }
  return (key) => map.get(key) || `section.${key}`;
})();

function readOrder() {
  const order = [];
  const visitedHelpers = new Set();
  function walk(file, start, end, depth) {
    const text = SRC.src(file);
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
      if (ev.name === 'DrawWorkflowGroupHeader') continue;
      if (ev.name === 'DrawMasterSection' || ev.name === 'DrawSimpleSection') {
        const key = firstLiteral(a[0].raw);
        if (!key || order.some((o) => o.key === key)) continue;
        const master = ev.name === 'DrawMasterSection' && a[5] ? firstLiteral(a[5].raw) : null;
        const countProp = ev.name === 'DrawMasterSection' && a[6] ? firstLiteral(a[6].raw) : null;
        order.push({
          key,
          textKey: sectionTextKey(key),
          master,
          countProp,
          callText: text.slice(open, parsed.close + 1),
        });
        continue;
      }
      if (depth < 4 && !visitedHelpers.has(ev.name)) {
        visitedHelpers.add(ev.name);
        for (const def of SRC.METHODS.get(ev.name) || []) walk(def.file, def.start, def.end, depth + 1);
      }
    }
  }
  const full = (SRC.METHODS.get('DrawFullInspector') || []).find((d) => d.file === UX);
  if (!full) throw new Error('DrawFullInspector not found');
  walk(UX, full.start, full.end, 0);
  return order;
}

// -------------------------------------------------------------- page layout
const PAGES = [
  { file: 'reference/basics.md', sections: ['surface', 'surface_rendering', 'surface_alpha', 'stencil', 'rendering', 'technical'] },
  { file: 'reference/light-and-shadow.md', sections: ['master_adjust', 'lighting', 'form_shadow', 'cast_shadow', 'shadow_color', 'shadow_pattern'] },
  { file: 'reference/rim.md', sections: ['rim_shade', 'fresnel_rim', 'front_light', 'backlight', 'shadow_reflection'] },
  { file: 'reference/depth-effects.md', sections: ['depth', 'rim', 'depth_shadow', 'ssao', 'inner_outline', 'translucency'] },
  { file: 'reference/detail-maps.md', sections: ['stack', 'normal_layers', 'matcap_layers', 'pbr', 'reflection', 'toon_specular', 'emission', 'occlusion', 'glitter'] },
  { file: 'reference/character.md', sections: ['face', 'character_height'] },
  { file: 'reference/outline.md', sections: ['normal_outline'] },
];

// Layered modules repeat one row set per layer. The table lists the set once.
const LAYERED = {
  stack: { count: 10, noun: { ko: '표면 레이어', en: 'surface layers', ja: 'サーフェスレイヤー' } },
  normal_layers: { count: 5, noun: { ko: '노멀 레이어', en: 'normal layers', ja: 'ノーマルレイヤー' } },
  matcap_layers: { count: 5, noun: { ko: '맷캡 레이어', en: 'matcap layers', ja: 'マットキャップレイヤー' } },
};
const layeredNote = {
  ko: (n, c) => `${n}는 최대 ${c}장입니다. 레이어를 늘리면 아래 항목이 장마다 같은 모양으로 반복됩니다.`,
  en: (n, c) => `Up to ${c} ${n}. Adding a layer repeats the fields below once per layer.`,
  ja: (n, c) => `${n}は最大${c}枚です。レイヤーを増やすと、下の項目が1枚ごとに同じ形で繰り返されます。`,
};

const HEADERS = {
  ko: '| 인스펙터 라벨 | 형식 | 범위 | 기본값 | 하는 일 |',
  en: '| Inspector label | Type | Range | Default | What it does |',
  ja: '| インスペクターのラベル | 形式 | 範囲 | 既定値 | 役割 |',
};

const DOCS_DIR = {
  ko: path.join(SITE, 'docs'),
  en: path.join(SITE, 'i18n/en/docusaurus-plugin-content-docs/current'),
  ja: path.join(SITE, 'i18n/ja/docusaurus-plugin-content-docs/current'),
};

// ------------------------------------------------------------------ writing
function cell(s) {
  return String(s == null ? '' : s).replace(/\|/g, '\\|').replace(/\s+/g, ' ').replace(/</g, '&lt;').trim();
}
const pick = (v, lang) => (v && typeof v === 'object' ? (v[lang] || v.en || v.ko || '') : v);

// A sentence that only restates the range and the default says nothing the
// Range / Default columns do not, so it is skipped for the next sentence.
const BOILER = {
  ko: /범위|기본값|꺼짐|켜짐|없음|입니다|이다|도|[은는이가]/g,
  en: /range|default|none|\bon\b|\boff\b|is|the|deg|px/gi,
  ja: /範囲|既定値|デフォルト|オン|オフ|なし|です|度|px|[はがをにでとのも]/g,
};
function isBoilerplate(s, lang) {
  const left = s.replace(BOILER[lang], '').replace(/[-~\d.,、。·・\s()%mM]/g, '');
  return left.length === 0;
}

// Sentence enders: "...다." and "." need whitespace or end after them, "。" does
// not, because Japanese does not space its sentences.
const SENTENCE_RE = /[\s\S]*?(?:。|(?:다\.|\.)(?=\s|$))/g;
const BREAKERS = [' ', ',', '·', '、', '・', '。', '.'];
// English spends more characters on the same sentence than Korean or Japanese,
// so it gets a wider cell before anything is cut.
const LIMIT = { ko: 60, en: 80, ja: 60 };
const MIN_KEEP = 20;

// "What it does" is the tooltip's first informative sentence. It is kept whole
// up to LIMIT characters; past that it is cut at the last breaker before the
// limit and marked with an ellipsis, never inside a word.
// The rule this replaced cut every cell at 40 characters and appended nothing,
// so any sentence longer than that lost its ending silently. LEGACY_LIMIT is
// kept only to count how many cells that was.
const LEGACY_LIMIT = 40;

function summarize(tooltip, lang, onHardCut, onLegacyCut, onOverLong) {
  const raw = tooltip && pick(tooltip, lang);
  if (!raw) return '-';
  const flat = String(raw).replace(/\s+/g, ' ').trim();

  const sentences = [];
  {
    SENTENCE_RE.lastIndex = 0;
    let m, last = 0;
    while ((m = SENTENCE_RE.exec(flat)) !== null) { sentences.push(m[0]); last = SENTENCE_RE.lastIndex; }
    if (last < flat.length) sentences.push(flat.slice(last));
  }
  let s = '';
  for (const part of sentences) {
    const cand = part.replace(/[.。]+$/, '').trim();
    if (!cand || isBoilerplate(cand, lang)) continue;
    s = cand;
    break;
  }
  if (!s) return '-';
  s = s.replace(/[,、·・\s]+$/, '');
  if (s.length > LEGACY_LIMIT && onLegacyCut) onLegacyCut(s);
  const limit = LIMIT[lang];
  if (s.length <= limit) return s;

  let cut = -1;
  for (const b of BREAKERS) {
    const i = s.lastIndexOf(b, limit);
    if (i > cut) cut = i;
  }
  if (cut < MIN_KEEP) {
    // Nothing to cut at inside the limit. Japanese runs whole clauses without
    // a space or a comma, so cutting at the limit would land inside a word.
    // Take the first breaker past the limit instead; if the sentence has none
    // at all, keep it whole and let the cell be long.
    let after = -1;
    for (const b of BREAKERS) {
      const i = s.indexOf(b, limit);
      if (i !== -1 && (after === -1 || i < after)) after = i;
    }
    if (after === -1) {
      if (onOverLong) onOverLong(s);
      return s;
    }
    cut = after;
  }
  const kept = s.slice(0, cut).replace(/[,、·・\s]+$/, '');
  // Post-condition: the cut lands on a breaker, never inside a word.
  if (!BREAKERS.includes(s[cut]) && onHardCut) onHardCut(`${kept} ][ ${s.slice(cut, cut + 10)}`);
  return kept + '…';
}

// Docusaurus slug for a heading. The anchor is always built from the Korean
// label so the three locales share one anchor string.
function anchor(label) {
  return label
    .toLowerCase()
    .replace(/[()[\]{}.,:;!?'"`/\\]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

// The parts of a page that are not generated: everything before the first
// section heading, and the trailing section that has no {#anchor} (the related
// pages list). Both belong to whoever wrote the page in that language.
function pageShell(abs) {
  if (!fs.existsSync(abs)) return null;
  const lines = fs.readFileSync(abs, 'utf8').replace(/\r\n/g, '\n').split('\n');
  const firstSection = lines.findIndex((l) => /^## /.test(l));
  if (firstSection === -1) return null;
  let tailStart = lines.findIndex((l, i) => i >= firstSection && /^## /.test(l) && !l.includes('{#'));
  if (tailStart === -1) tailStart = lines.length;
  return {
    head: lines.slice(0, firstSection).join('\n').trimEnd(),
    tail: lines.slice(tailStart).join('\n').trim(),
  };
}

function run() {
  const order = readOrder();
  const orderByKey = new Map(order.map((o) => [o.key, o]));
  const report = {
    locales: {}, excluded: [], unmapped: [], noSummary: [], ambiguous: [],
    hardCuts: [], overLong: [], missingShell: [], legacyCuts: {}, ellipsis: {},
  };

  const mapped = new Set(PAGES.flatMap((p) => p.sections));
  for (const o of order) if (!mapped.has(o.key)) report.unmapped.push(o.key);

  // ---- collect once, locale neutral
  const built = [];
  for (const page of PAGES) {
    const sections = [];
    for (const key of page.sections) {
      const sec = orderByKey.get(key);
      if (!sec) { report.excluded.push({ prop: '(section)', why: `section ${key}: not in DrawFullInspector` }); continue; }
      const label = catalogueLabel(sec.textKey) || triple(key, key, key);
      const rows = [];
      const seen = new Set();

      for (const head of [sec.master, sec.countProp]) {
        if (!head) continue;
        const sp = shaderProp(head);
        if (!sp || isHidden(sp.decl)) continue;
        const l = catalogueLabel('prop.' + head);
        if (!l) continue;
        seen.add(head);
        rows.push({ prop: head, label: l, tooltip: catalogueTooltip('prop.' + head), group: null });
      }
      for (const r of sectionRows(sec.callText)) {
        if (seen.has(r.prop)) continue;
        if (/HSVG(\d\d)?$/.test(r.prop)) { report.excluded.push({ prop: r.prop, why: 'shared texture-slot HSVG' }); continue; }
        const sp = shaderProp(r.prop);
        if (!sp) { report.excluded.push({ prop: r.prop, why: 'not declared in shader Properties' }); continue; }
        if (isHidden(sp.decl)) { report.excluded.push({ prop: r.prop, why: '[HideInInspector]' }); continue; }
        if (!hasText(r.label)) { report.excluded.push({ prop: r.prop, why: 'no localized label' }); continue; }
        seen.add(r.prop);
        rows.push(r);
      }
      if (rows.length === 0) continue;

      // Two rows with the same label in one table cannot be told apart. The
      // inspector separates them with a group heading, so the heading goes in
      // front of the repeated label. Korean decides, and all three locales get
      // the same treatment so the tables stay row-for-row aligned.
      const count = new Map();
      for (const r of rows) count.set(r.label.ko, (count.get(r.label.ko) || 0) + 1);
      for (const r of rows) {
        if (count.get(r.label.ko) > 1 && r.group && r.group.ko !== r.label.ko) {
          r.label = {
            ko: `${r.group.ko} · ${r.label.ko}`,
            en: `${r.group.en} · ${r.label.en}`,
            ja: `${r.group.ja}・${r.label.ja}`,
          };
        }
      }
      const after = new Map();
      for (const r of rows) after.set(r.label.ko, (after.get(r.label.ko) || 0) + 1);
      for (const [l, n] of after) if (n > 1) report.ambiguous.push(`${page.file} ${key} ${l}`);

      sections.push({ key, label, rows, layered: LAYERED[key] || null });
    }
    built.push({ page, sections });
  }

  // ---- render per locale
  for (const lang of LANGS) {
    const pages = [];
    for (const { page, sections } of built) {
      const abs = path.join(DOCS_DIR[lang], page.file);
      const shell = pageShell(abs);
      if (!shell) { report.missingShell.push(`${lang} ${page.file}`); continue; }

      const out = [shell.head, ''];
      let rowTotal = 0;
      const perSection = [];
      for (const sec of sections) {
        out.push(`## ${pick(sec.label, lang)} {#${anchor(sec.label.ko)}}`, '');
        if (sec.layered) {
          out.push(layeredNote[lang](pick(sec.layered.noun, lang), sec.layered.count), '');
        }
        out.push(HEADERS[lang], '|---|---|---|---|---|');
        for (const r of sec.rows) {
          const t = describeType(shaderProp(r.prop).decl);
          const does = summarize(
            r.tooltip,
            lang,
            (s) => report.hardCuts.push(`${lang} ${page.file} ${sec.key} ${r.prop}: ${s.slice(0, 80)}`),
            () => { report.legacyCuts[lang] = (report.legacyCuts[lang] || 0) + 1; },
            (s) => report.overLong.push(`${lang} ${page.file} ${sec.key} ${r.prop} (${s.length}): ${s}`),
          );
          if (does.endsWith('…')) report.ellipsis[lang] = (report.ellipsis[lang] || 0) + 1;
          if (does === '-' && lang === 'ko') {
            report.noSummary.push(`${page.file} ${sec.key} ${r.prop} (${r.label.ko})`);
          }
          out.push(
            `| **${cell(pick(r.label, lang))}** | ${pick(t.kind, lang)} | ${cell(pick(t.range, lang))} | ${cell(pick(t.def, lang))} | ${cell(does)} |`,
          );
        }
        out.push('');
        rowTotal += sec.rows.length;
        perSection.push({ key: sec.key, rows: sec.rows.length });
      }
      out.push(shell.tail, '');

      fs.writeFileSync(abs, out.join('\n'), 'utf8');
      pages.push({ file: page.file, rows: rowTotal, lines: out.length, sections: perSection });
    }
    report.locales[lang] = pages;
  }

  // ---- leftover "2D" check, excluding shader enum option names
  const leftover2D = [];
  for (const lang of LANGS) {
    for (const p of PAGES) {
      const abs = path.join(DOCS_DIR[lang], p.file);
      if (!fs.existsSync(abs)) continue;
      fs.readFileSync(abs, 'utf8').split('\n').forEach((line, i) => {
        if (!/2D/.test(line)) return;
        // The Range column prints shader enum option names verbatim.
        const cells = line.split('|');
        const outsideRange = cells.filter((_, idx) => idx !== 3).join('|');
        if (/2D/.test(outsideRange)) leftover2D.push(`${lang} ${p.file}:${i + 1} ${line.trim().slice(0, 90)}`);
      });
    }
  }

  // ---- console report
  for (const lang of LANGS) {
    console.log(`\n== ${lang} ==`);
    let total = 0;
    for (const p of report.locales[lang] || []) {
      console.log(`${p.file.padEnd(34)} rows=${String(p.rows).padStart(4)}  lines=${String(p.lines).padStart(4)}`);
      total += p.rows;
    }
    console.log(`${'TOTAL'.padEnd(34)} rows=${String(total).padStart(4)}`);
  }

  console.log(`\ncatalogue: ${CATALOGUE.size} keys, ${UI_TEXT.size} LocalUiText cases, ` +
    `${catalogueSkipped} registrations not resolvable as compile-time strings`);

  const byWhy = new Map();
  for (const e of report.excluded) byWhy.set(e.why, (byWhy.get(e.why) || 0) + 1);
  console.log('\nexcluded:');
  for (const [why, n] of [...byWhy].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${why}`);
  if (report.unmapped.length) console.log('\nsections not on any page:', report.unmapped.join(', '));
  if (report.missingShell.length) console.log('\nmissing page shell:', report.missingShell.join(', '));

  console.log('\ntruncation, before -> after (cells):');
  for (const lang of LANGS) {
    console.log(`  ${lang}  cut by the old 40-char rule: ${report.legacyCuts[lang] || 0}` +
      `   now shortened with an ellipsis: ${report.ellipsis[lang] || 0}`);
  }
  console.log(`\nCHECK mid-word truncations: ${report.hardCuts.length}`);
  for (const x of report.hardCuts) console.log('  ' + x);
  // Not a failure: a sentence with no space or comma past the limit is kept
  // whole, because cutting it would land inside a word.
  console.log(`kept whole, over the limit (no breaker): ${report.overLong.length}`);
  for (const x of report.overLong) console.log('  ' + x);
  console.log(`CHECK duplicate labels in one table: ${report.ambiguous.length}`);
  for (const x of report.ambiguous) console.log('  ' + x);
  console.log(`CHECK leftover "2D" outside the Range column: ${leftover2D.length}`);
  for (const x of leftover2D) console.log('  ' + x);
  console.log(`\nKO cells with no tooltip (-): ${report.noSummary.length}`);
  for (const x of report.noSummary) console.log('  ' + x);

  fs.writeFileSync(path.join(HERE, 'reference-gen-report.json'), JSON.stringify(report, null, 2), 'utf8');
}

run();
