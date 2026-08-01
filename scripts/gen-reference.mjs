// Emits the property reference pages for all three locales from the MingToon
// Unity source. The labels and the explanations are the ones the inspector
// itself shows, so the docs cannot drift from the tool: rename a control in
// MingInspectorText.cs, re-run this, and all three languages move together.
//
//   MINGTOON_SRC="<path to Assets/StudioRaming/MingToon>" node scripts/gen-reference.mjs
//
// Writes:
//   docs/reference/*.md                                        (ko, default locale)
//   i18n/en/docusaurus-plugin-content-docs/current/reference/*.md
//   i18n/ja/docusaurus-plugin-content-docs/current/reference/*.md

import fs from 'node:fs';
import path from 'node:path';

const SRC = process.env.MINGTOON_SRC;
if (!SRC) {
  console.error('Set MINGTOON_SRC to the MingToon folder.');
  process.exit(1);
}

const TEXT_CS = path.join(SRC, 'Editor/InspectorUx/MingInspectorText.cs');
const GUI_DIR = path.join(SRC, 'Editor/InspectorUx');
const LOCALES = ['ko', 'en', 'ja'];

// ------------------------------------------------------------- text table

function unescapeCs(s) {
  return s
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16))
    )
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\\\/g, '\\');
}

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

function literal(arg) {
  const parts = [...arg.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]);
  if (!parts.length) return null;
  const leftover = arg.replace(/"(?:[^"\\]|\\.)*"/g, '').replace(/[\s+]/g, '');
  if (leftover.length) return null;
  return unescapeCs(parts.join(''));
}

function readText() {
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
      out[key] = {label: {ko: args[0], en: args[1], ja: args[2]}};
    } else if (m[1] === 'Add' && args.length >= 6) {
      out[key] = {
        label: {ko: args[0], en: args[1], ja: args[2]},
        tip: {ko: args[3], en: args[4], ja: args[5]},
      };
    }
  }
  return out;
}

// Order of first appearance in the inspector partials, which is the order the
// artist meets these controls on screen.
function readInspectorOrder() {
  const files = [
    'MingToonShaderGUI.InspectorUx.cs',
    'MingToonShaderGUI.Surface.cs',
    'MingToonShaderGUI.DetailMaps.cs',
    'MingToonShaderGUI.Shadow.cs',
    'MingToonShaderGUI.Rim.cs',
    'MingToonShaderGUI.Depth.cs',
    'MingToonShaderGUI.Face.cs',
    'MingToonShaderGUI.Outline.cs',
    'MingToonShaderGUI.CharacterHeight.cs',
    'MingToonShaderGUI.Entries.cs',
  ];
  const order = new Map();
  let n = 0;
  for (const f of files) {
    const p = path.join(GUI_DIR, f);
    if (!fs.existsSync(p)) continue;
    const src = fs.readFileSync(p, 'utf8');
    for (const m of src.matchAll(/"(_[A-Za-z0-9]+)"/g)) {
      if (!order.has(m[1])) order.set(m[1], n++);
    }
  }
  return order;
}

// ------------------------------------------------------------- page model

// A section is one foldout in the inspector. `key` resolves its own name and
// description from the same text table, so section headings are translated too.
// `match` decides which shader properties belong to it, first rule wins.
const PAGES = [
  {
    slug: 'basics',
    position: 1,
    title: {ko: '기본 설정', en: 'Basic', ja: '基本設定'},
    lead: {
      ko: '베이스 색, 표면 모드, 자주 쓰는 맵. 재질을 만들면 가장 먼저 만지는 항목들입니다.',
      en: 'Base colour, surface mode and the everyday maps - the first things you touch on a new material.',
      ja: 'ベースカラー、サーフェスモード、よく使うマップ。マテリアルを作って最初に触る項目です。',
    },
    sections: [
      {key: 'section.surface', match: (n) => /^_(MainTex|Color|ColorBlend|Cutoff|Base(Channel|Invert|Tint))/.test(n)},
      {key: 'section.surface_rendering', match: (n) => /^_(AlphaMask|MingSurfaceMode|Cull|ZWrite|ZTest|SrcBlend|DstBlend|BlendOp|ColorMask|FlipBackfaceNormal|OutlineColorMask)/.test(n)},
      {key: 'section.common_maps', match: (n) => /^_(BumpMap|BumpScale|OcclusionMap|OcclusionStrength)/.test(n)},
    ],
  },
  {
    slug: 'light-and-shadow',
    position: 2,
    title: {ko: '조명과 그림자', en: 'Light & Shadow', ja: 'ライティングと影'},
    lead: {
      ko: '툰 룩의 인상을 가장 크게 좌우하는 그룹입니다. 형태 그림자(빛의 방향으로 생기는 명암)와 그림자 투영(실시간으로 드리우는 그림자)은 서로 다른 섹션이니 구분해서 보세요.',
      en: 'The single biggest lever on a toon look. Form Shadow (light-direction shading) and Shadow Projection (real-time cast shadow) are separate sections - keep them apart.',
      ja: 'トゥーンの印象を最も大きく左右するグループです。フォームシャドウ（光の向きによる陰影）とシャドウ投影（実時間で落ちる影）は別セクションなので区別して見てください。',
    },
    sections: [
      {key: 'section.lighting', match: (n) => /^_(LitBrightness|IndirectStrength|BaseColorPreservation|LightColorInfluence|AdditionalLight|MingAdditional|MingMinimum|MingMaximum|MingFinal)/.test(n)},
      {key: 'section.form_shadow', match: (n) => /^_(FormShadow|MingShadowBorder|ShadowBorder)/.test(n)},
      {key: 'section.shadow_color', match: (n) => /^_(MingUnifiedShadow|ShadowColor|MingShadowColor|MingShadowAmbient)/.test(n)},
      {key: 'section.cast_shadow', match: (n) => /^_(CastShadow|CastProjection|SelfShadow|MingFaceCast|LinkDepthShadowToCastShadow)/.test(n)},
      {key: 'shadow.pattern.group', match: (n) => n.startsWith('_ShadowPattern')},
    ],
  },
  {
    slug: 'rim',
    position: 3,
    title: {ko: '림', en: 'Rim', ja: 'リム'},
    lead: {
      ko: '실루엣을 살리고 캐릭터를 배경에서 떼어 놓는 그룹입니다. 여러 종류를 겹쳐 켜면 금세 과해지므로 하나씩 확인하며 올리세요.',
      en: 'This group lifts the silhouette and separates the character from the background. They stack fast, so raise one at a time.',
      ja: 'シルエットを立て、キャラクターを背景から切り離すグループです。重ねるとすぐ過剰になるので、ひとつずつ確認しながら上げてください。',
    },
    sections: [
      {key: 'section.rim_shade', match: (n) => n.startsWith('_MingRimShade')},
      {key: 'section.fresnel_rim', match: (n) => n.startsWith('_MingFresnelRim')},
      {key: 'section.backlight', match: (n) => n.startsWith('_MingBacklight')},
      {key: 'section.shadow_reflection', match: (n) => n.startsWith('_MingShadowReflection')},
      {key: 'section.front_light', match: (n) => n.startsWith('_MingFrontLight')},
    ],
  },
  {
    slug: 'depth-effects',
    position: 4,
    title: {ko: '깊이 기반 효과', en: 'Depth Effects', ja: '深度ベースエフェクト'},
    lead: {
      ko: '카메라 깊이 텍스처를 읽어 화면 공간에서 그리는 효과입니다. 깊이가 없는 환경에서는 통째로 보이지 않으므로, 값을 만지기 전에 깊이부터 확인하세요. 내부 2D 경계도 이 그룹에 들어 있습니다.',
      en: 'Screen-space effects that read the camera depth texture. Without depth they vanish entirely, so confirm depth before touching any value here. Inner 2D Edge lives in this group too.',
      ja: 'カメラ深度テクスチャを読んで画面空間で描くエフェクトです。深度がない環境では丸ごと出ないので、値を触る前にまず深度を確認してください。内部2Dエッジもこのグループに含まれます。',
    },
    sections: [
      {key: 'section.depth', match: (n) => /^_(DepthWidth|DepthWidthMode|DepthDistanceScale|DepthBias|DepthSoftness|DepthEffects|MingDepth)/.test(n)},
      {key: 'section.depth_rim', match: (n) => n.startsWith('_DepthRim')},
      {key: 'section.depth_shadow', match: (n) => n.startsWith('_DepthShadow')},
      {key: 'section.inner_outline', match: (n) => n.startsWith('_OutlineInnerEdge') || n === '_OutlineHullPressureSource'},
    ],
  },
  {
    slug: 'detail-maps',
    position: 5,
    title: {ko: '디테일 맵', en: 'Detail Maps', ja: 'ディテールマップ'},
    lead: {
      ko: '베이스 위에 쌓는 레이어와 재질감입니다. 레이어 계열은 모두 같은 함정을 공유합니다 — 레이어 수보다 뒤에 있는 슬롯은 계산 자체를 건너뜁니다.',
      en: 'The layers and material response stacked on the base. Every layered section shares one trap: a slot past the layer count is skipped entirely.',
      ja: 'ベースの上に重ねるレイヤーと質感です。レイヤー系はすべて同じ罠を共有します — レイヤー数より後ろのスロットは計算自体をスキップします。',
    },
    sections: [
      {key: 'section.stack', match: (n) => n.startsWith('_MingStack')},
      {key: 'section.normal_layers', match: (n) => n.startsWith('_MingNormal')},
      {key: 'section.matcap_layers', match: (n) => n.startsWith('_MingMatcap')},
      {key: 'section.pbr', match: (n) => /^_(MingPbr|Metallic|Smoothness|MaskMap|WorkflowMode)/.test(n)},
      {key: 'section.emission', match: (n) => /^_(EmissionMap|EmissionIntensity|MingEmission)/.test(n)},
      {key: 'section.occlusion', match: (n) => n.startsWith('_MingOcclusion')},
      {key: 'section.glitter', match: (n) => n.startsWith('_MingGlitter')},
    ],
  },
  {
    slug: 'character',
    position: 6,
    title: {ko: '캐릭터 표현', en: 'Character', ja: 'キャラクター表現'},
    lead: {
      ko: '얼굴과 캐릭터 전체를 대상으로 하는 항목입니다. 얼굴은 코와 눈두덩이 만드는 그림자 때문에 몸과 같은 설정으로는 거의 항상 지저분해지므로 따로 다룹니다.',
      en: 'Controls that treat the face and the whole character as their own thing. A face almost never survives the body settings - the nose and brow throw shadows that read as dirt.',
      ja: '顔とキャラクター全体を対象にする項目です。顔は鼻や眉の落とす影のせいで、体と同じ設定ではほぼ必ず汚れるため別に扱います。',
    },
    sections: [
      {key: 'section.face', match: (n) => n.startsWith('_Face') || (n.startsWith('_MingFace') && !n.startsWith('_MingFaceCast'))},
      {
        key: 'section.character_height',
        match: (n) => /^_(MingHeight|MingCharacterHeight|HeightGradient)/.test(n),
        extraKeys: [
          'height.gradient.low_color',
          'height.gradient.high_color',
          'height.gradient.direction',
          'height.gradient.boundary',
          'height.gradient.softness',
          'height.gradient.exponent',
          'height.gradient.influence',
          'height.gradient.uv4_hint',
        ],
      },
    ],
  },
  {
    slug: 'outline',
    position: 7,
    title: {ko: '아웃라인', en: 'Outline', ja: 'アウトライン'},
    lead: {
      ko: '노멀 아웃라인은 메시를 확장해 그리므로 카메라 깊이 없이 어디서나 동작합니다. 화면 깊이를 읽어 표면 안쪽 선까지 그리는 내부 2D 경계는 [깊이 기반 효과](/reference/depth-effects) 그룹에 있습니다.',
      en: 'Normal Outline expands the mesh, so it works anywhere without camera depth. Inner 2D Edge, which reads screen depth to draw lines inside the surface, lives in the [Depth Effects](/reference/depth-effects) group.',
      ja: 'ノーマルアウトラインはメッシュを拡張して描くため、カメラ深度なしでどこでも動作します。画面深度を読んで表面の内側の線まで描く内部2Dエッジは[深度ベースエフェクト](/reference/depth-effects)グループにあります。',
    },
    sections: [
      {key: 'section.normal_outline', match: (n) => /^_Outline(Hull|Vector|Distance|IncludeFormShadow|Pattern)/.test(n)},
      {key: 'section.outline', match: (n) => /^_(Outline|MingOutline)/.test(n) && !n.startsWith('_OutlineStencil')},
      {key: 'section.stencil', match: (n) => n.startsWith('_OutlineStencil')},
    ],
  },
];

const UI_STRINGS = {
  control: {ko: '항목', en: 'Control', ja: '項目'},
  meaning: {ko: '설명', en: 'What it does', ja: '説明'},
  property: {ko: '셰이더 프로퍼티', en: 'Shader property', ja: 'シェーダープロパティ'},
  generated: {
    ko: '이 페이지의 항목 이름과 설명은 MingToon 인스펙터가 실제로 표시하는 문구를 소스에서 그대로 가져온 것입니다.',
    en: 'The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.',
    ja: 'このページの項目名と説明は、MingToonインスペクターが実際に表示する文言をソースからそのまま取得しています。',
  },
  other: {ko: '그 밖의 항목', en: 'Other controls', ja: 'その他の項目'},
};

// ------------------------------------------------------------------ emit

const text = readText();
const order = readInspectorOrder();

// Everything with a translated label is a control an artist can actually see.
const allProps = Object.keys(text)
  .filter((k) => k.startsWith('prop._'))
  .map((k) => k.slice('prop.'.length))
  .sort((a, b) => (order.get(a) ?? 1e9) - (order.get(b) ?? 1e9));

function escapeCell(s) {
  return (s || '')
    .replace(/\|/g, '\\|')
    .replace(/\n+/g, ' ')
    .replace(/</g, '&lt;')
    .replace(/\{/g, '&#123;')
    .trim();
}

function docPath(locale, slug) {
  return locale === 'ko'
    ? path.join('docs', 'reference', slug + '.md')
    : path.join(
        'i18n',
        locale,
        'docusaurus-plugin-content-docs',
        'current',
        'reference',
        slug + '.md'
      );
}

const claimed = new Set();
const pageProps = new Map();
for (const page of PAGES) {
  const perSection = [];
  for (const section of page.sections) {
    const props = allProps.filter(
      (n) => !claimed.has(n) && section.match(n)
    );
    props.forEach((n) => claimed.add(n));
    perSection.push({section, props});
  }
  pageProps.set(page.slug, perSection);
}

const unclaimed = allProps.filter((n) => !claimed.has(n));

for (const locale of LOCALES) {
  for (const page of PAGES) {
    const lines = [];
    lines.push('---');
    lines.push(`id: ${page.slug}`);
    lines.push(`title: ${page.title[locale]}`);
    lines.push(`sidebar_position: ${page.position}`);
    lines.push('---');
    lines.push('');
    lines.push(`# ${page.title[locale]}`);
    lines.push('');
    lines.push(page.lead[locale]);
    lines.push('');
    lines.push(':::note');
    lines.push(UI_STRINGS.generated[locale]);
    lines.push(':::');
    lines.push('');

    let wrote = 0;
    for (const {section, props} of pageProps.get(page.slug)) {
      // Some sections label their controls under their own text keys rather
      // than prop.<shaderProperty>, so they carry an explicit key list.
      const extra = (section.extraKeys || []).filter((k) => text[k]);
      if (!props.length && !extra.length) continue;
      const entry = text[section.key];
      const heading = entry ? entry.label[locale] : section.key;
      lines.push(`## ${heading}`);
      lines.push('');
      if (entry && entry.tip) {
        lines.push(entry.tip[locale]);
        lines.push('');
      }
      lines.push(
        `| ${UI_STRINGS.control[locale]} | ${UI_STRINGS.meaning[locale]} | ${UI_STRINGS.property[locale]} |`
      );
      lines.push('|---|---|---|');
      for (const name of props) {
        const e = text['prop.' + name];
        lines.push(
          `| **${escapeCell(e.label[locale])}** | ${escapeCell(
            e.tip ? e.tip[locale] : ''
          )} | \`${name}\` |`
        );
      }
      for (const key of extra) {
        const e = text[key];
        lines.push(
          `| **${escapeCell(e.label[locale])}** | ${escapeCell(
            e.tip ? e.tip[locale] : ''
          )} | |`
        );
      }
      lines.push('');
      wrote += props.length + extra.length;
    }

    if (!wrote) continue;
    const out = docPath(locale, page.slug);
    fs.mkdirSync(path.dirname(out), {recursive: true});
    fs.writeFileSync(out, lines.join('\n'));
  }
}

console.log(
  `properties with labels: ${allProps.length}  placed: ${claimed.size}  unplaced: ${unclaimed.length}`
);
if (unclaimed.length) {
  console.log('unplaced -> ' + unclaimed.join(', '));
}
