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
    slug: 'surface',
    position: 1,
    title: {
      ko: '표면과 텍스처',
      en: 'Surface and textures',
      ja: 'サーフェスとテクスチャ',
    },
    lead: {
      ko: '베이스 색, 투명 처리, 그 위에 쌓는 텍스처 레이어까지 — 캐릭터의 "칠"에 해당하는 항목들입니다.',
      en: 'Base colour, transparency, and the texture layers stacked on top - everything that makes up the painted surface.',
      ja: 'ベースカラー、透明処理、その上に重ねるテクスチャレイヤー — キャラクターの「塗り」にあたる項目です。',
    },
    sections: [
      {key: 'section.surface', match: (n) => /^_(MainTex|Color|ColorBlend|Cutoff|Base(Channel|Invert|Tint))/.test(n)},
      {key: 'section.surface_rendering', match: (n) => /^_(AlphaMask|MingSurfaceMode|Cull|ZWrite|ZTest|SrcBlend|DstBlend|BlendOp|ColorMask|FlipBackfaceNormal)/.test(n)},
      {key: 'section.common_maps', match: (n) => /^_(BumpMap|BumpScale|OcclusionMap|OcclusionStrength)/.test(n)},
      {key: 'section.stack', match: (n) => n.startsWith('_MingStack')},
      {key: 'section.normal_layers', match: (n) => n.startsWith('_MingNormal')},
    ],
  },
  {
    slug: 'lighting',
    position: 2,
    title: {
      ko: '라이팅과 재질감',
      en: 'Lighting and material response',
      ja: 'ライティングと質感',
    },
    lead: {
      ko: '캐릭터가 씬 조명에 어떻게 반응할지, 그리고 금속·광택·맷캡 같은 재질감을 정하는 항목들입니다.',
      en: 'How the character responds to scene light, plus the metal, gloss and MatCap controls that give it material.',
      ja: 'キャラクターがシーンのライトにどう反応するか、そして金属・光沢・MatCapなどの質感を決める項目です。',
    },
    sections: [
      {key: 'section.lighting', match: (n) => /^_(LitBrightness|IndirectStrength|BaseColorPreservation|LightColorInfluence|MingAdditional|MingMinimum|MingMaximum|MingFinal)/.test(n)},
      {key: 'section.pbr', match: (n) => /^_(MingPbr|Metallic|Smoothness|MaskMap|WorkflowMode)/.test(n)},
      {key: 'section.matcap_layers', match: (n) => n.startsWith('_MingMatcap')},
      {key: 'section.emission', match: (n) => /^_(EmissionMap|EmissionIntensity|MingEmission)/.test(n)},
      {key: 'section.occlusion', match: (n) => n.startsWith('_MingOcclusion')},
    ],
  },
  {
    slug: 'shadow',
    position: 3,
    title: {ko: '그림자', en: 'Shadow', ja: '影'},
    lead: {
      ko: '툰 룩의 인상을 가장 크게 좌우하는 부분입니다. 형태 그림자(빛의 방향으로 생기는 명암)와 캐스트 그림자(실시간으로 드리우는 그림자)는 서로 다른 항목이니 구분해서 보세요.',
      en: 'The single biggest lever on a toon look. Form shadow (the light-direction shading) and cast shadow (real-time projected shadow) are separate sets of controls - keep them apart.',
      ja: 'トゥーンの印象を最も大きく左右する部分です。フォームシャドウ（光の向きによる陰影）とキャストシャドウ（実時間で落ちる影）は別項目なので区別して見てください。',
    },
    sections: [
      {key: 'section.form_shadow', match: (n) => /^_(FormShadow|MingShadowBorder|ShadowBorder)/.test(n)},
      {key: 'section.shadow_color', match: (n) => /^_(MingUnifiedShadow|ShadowColor|MingShadowColor)/.test(n)},
      {key: 'section.cast_shadow', match: (n) => /^_(CastShadow|SelfShadow|MingFaceCast|LinkDepthShadowToCastShadow)/.test(n)},
      {key: 'shadow.pattern.group', match: (n) => n.startsWith('_ShadowPattern')},
      {key: 'section.shadow_reflection', match: (n) => n.startsWith('_MingShadowReflection')},
    ],
  },
  {
    slug: 'rim-and-highlights',
    position: 4,
    title: {ko: '림과 강조광', en: 'Rims and accent light', ja: 'リムとアクセント光'},
    lead: {
      ko: '실루엣을 살리고 캐릭터를 배경에서 떼어 놓는 항목들입니다. 여러 종류가 겹쳐서 켜지면 금세 과해지므로 하나씩 확인하며 올리세요.',
      en: 'These lift the silhouette and separate the character from the background. They stack fast, so raise one at a time.',
      ja: 'シルエットを立て、キャラクターを背景から切り離す項目です。重ねるとすぐ過剰になるので、ひとつずつ確認しながら上げてください。',
    },
    sections: [
      {key: 'section.fresnel_rim', match: (n) => n.startsWith('_MingFresnelRim')},
      {key: 'section.rim_shade', match: (n) => n.startsWith('_MingRimShade')},
      {key: 'section.backlight', match: (n) => n.startsWith('_MingBacklight')},
      {key: 'section.front_light', match: (n) => n.startsWith('_MingFrontLight')},
      {key: 'section.glitter', match: (n) => n.startsWith('_MingGlitter')},
    ],
  },
  {
    slug: 'depth-effects',
    position: 5,
    title: {ko: '2D 깊이 효과', en: '2D depth effects', ja: '2D深度エフェクト'},
    lead: {
      ko: '카메라 깊이 텍스처를 읽어 화면 공간에서 그리는 효과입니다. 깊이가 없는 환경에서는 통째로 보이지 않으므로, 값을 만지기 전에 깊이부터 확인하세요.',
      en: 'Screen-space effects that read the camera depth texture. Without depth they vanish entirely, so confirm depth before touching any value here.',
      ja: 'カメラ深度テクスチャを読んで画面空間で描くエフェクトです。深度がない環境では丸ごと出ないので、値を触る前にまず深度を確認してください。',
    },
    sections: [
      {key: 'section.depth', match: (n) => /^_(DepthWidth|DepthWidthMode|DepthDistanceScale|DepthBias|DepthSoftness|MingDepth)/.test(n)},
      {key: 'section.depth_rim', match: (n) => n.startsWith('_DepthRim')},
      {key: 'section.depth_shadow', match: (n) => n.startsWith('_DepthShadow')},
    ],
  },
  {
    slug: 'face',
    position: 6,
    title: {ko: '얼굴', en: 'Face', ja: '顔'},
    lead: {
      ko: '얼굴은 코와 눈두덩이 만드는 그림자 때문에 몸과 같은 설정으로는 거의 항상 지저분해집니다. 이 항목들은 얼굴 전용 처리를 위한 것입니다.',
      en: 'A face almost never survives the body settings: the nose and brow throw shadows that read as dirt. These controls exist to treat the face separately.',
      ja: '顔は鼻や眉の落とす影のせいで、体と同じ設定ではほぼ必ず汚れます。これらは顔専用の処理のための項目です。',
    },
    sections: [{key: 'section.face', match: (n) => n.startsWith('_Face')}],
  },
  {
    slug: 'outline',
    position: 7,
    title: {ko: '외곽선', en: 'Outline', ja: 'アウトライン'},
    lead: {
      ko: '두 가지 방식이 있습니다. Hull은 메시를 확장해 그리므로 어디서나 동작하고, Inner Edge는 화면 깊이를 읽어 표면 안쪽 선까지 그리지만 깊이가 필요합니다.',
      en: 'Two methods. Hull expands the mesh and works anywhere; Inner Edge reads screen depth and can draw lines inside the surface, but it needs that depth.',
      ja: '方式が2つあります。Hullはメッシュを拡張して描くのでどこでも動作し、Inner Edgeは画面深度を読んで表面の内側の線まで描けますが深度が必要です。',
    },
    sections: [
      {key: 'section.outline', match: (n) => /^_Outline(Hull|Vector|Include|Stencil|Color)/.test(n)},
      {key: 'section.inner_outline', match: (n) => n.startsWith('_OutlineInnerEdge')},
    ],
  },
  {
    slug: 'character-height',
    position: 8,
    title: {
      ko: '캐릭터 높이 그라데이션',
      en: 'Character height gradient',
      ja: 'キャラクター高さグラデーション',
    },
    lead: {
      ko: '캐릭터 루트를 기준으로 한 높이를 UV4에 구워 두고, 그 높이로 아래쪽 색을 물들입니다. 발밑을 어둡게 깔거나 옷자락에 색을 넣을 때 씁니다.',
      en: 'Bakes a root-relative height into UV4 and grades the lower body by it - a floor-side darkening, or colour creeping up a hem.',
      ja: 'キャラクタールート基準の高さをUV4に焼き込み、その高さで下部を染めます。足元を暗く敷いたり裾に色を入れるときに使います。',
    },
    sections: [
      {key: 'section.character_height', match: (n) => /^_(MingHeight|HeightGradient)/.test(n)},
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
      if (!props.length) continue;
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
      lines.push('');
      wrote += props.length;
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
