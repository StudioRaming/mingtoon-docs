// Emits the property reference pages for all three locales from the MingToon
// Unity source. The labels and the explanations are the ones the inspector
// itself shows, as a source snapshot: rename a control in
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
const BRP_SHADER = path.join(SRC, 'Shaders/MingToonBRP.shader');
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
      {key: 'section.surface', match: (n) => /^_(MainTex|Color$|ColorBlend|Base(Channel|Invert|Tint)|MingBaseAdjustMask)/.test(n)},
      {key: 'section.surface_rendering', extraKeys: ['surface.depth_prepass','surface.two_sided_dual_pass'], match: (n) => /^_(2DShadowCasterEnabled|Cutoff|AlphaMask|AlphaToCoverage|TransparentDepthPrepass|TwoSidedDualPass|CameraDepthContribution|MingBlendPreset|MingSurfaceMode|MingAlphaToCoverage|Cull|ZWrite|ZTest|SrcBlend|DstBlend|BlendOp|ColorMask|FlipBackfaceNormal|OutlineColorMask)/.test(n)},
      {key: 'surface.alpha_fades', match: (n) => /^_(Ming)?(AlphaDistanceFade|AlphaFresnel|AlphaFade|AlphaDirectional|AlphaViewMask)/.test(n) || n === '_SurfaceAlphaEffectsEnabled'},
      {key: 'section.base_adjust', extraKeys: ['texture_module.hsvg.hue','texture_module.hsvg.saturation','texture_module.hsvg.value','texture_module.hsvg.gamma'], match: (n) => /^_(BaseMapOpacity|BaseHSVG|BaseHueColorSpace|BaseGradation|BaseAdjustMask)/.test(n)},
      {key: 'section.view_clip_guard', match: (n) => n.startsWith('_MingViewClipGuard')},
      {key: 'section.stencil', match: (n) => n.startsWith('_Stencil')},
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
      {key: 'section.master_adjust', match: (n) => /^_(Ming)?(RimMaster|ShadowMaster|OutputMaster|EdgeRimMaster|EdgeRimBrightness|LightBrightness)/.test(n)},
      {key: 'section.lighting', match: (n) => /^_(LitBrightness|IndirectStrength|BaseColorPreservation|LightColorInfluence|AdditionalLight|MingAdditional|MingMinimum|MingMaximum|MingFinal|MingVirtualLight|MingLightVolumes|EnvironmentColorInfluence|LightResponse|LightBrightness|LightVolumes|ShadowAmbientInfluence)/.test(n)},
      {key: 'section.form_shadow', match: (n) => /^_(FormShadow|MingShadowBorder|ShadowBorder)/.test(n)},
      {key: 'section.shadow_color', match: (n) => /^_(MingUnifiedShadow|ShadowColor|MingShadowColor|MingShadowAmbient)/.test(n)},
      {key: 'section.cast_shadow', match: (n) => /^_(CastShadow|CastProjection|SelfShadow|MingFaceCast|LinkDepthShadowToCastShadow)/.test(n)},
      {key: 'shadow.pattern.group', match: (n) => n.startsWith('_ShadowPattern') || n === '_UnifiedShadowEnabled'},
      {key: 'section.performance', match: (n) => /^_PerfDistance/.test(n)},
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
      {key: 'section.rim_shade', match: (n) => /^_(Ming)?RimShade/.test(n)},
      {key: 'section.fresnel_rim', match: (n) => /^_(Ming)?FresnelRim/.test(n)},
      {key: 'section.backlight', match: (n) => /^_(Ming)?Backlight/.test(n)},
      {key: 'section.shadow_reflection', match: (n) => /^_(Ming)?ShadowReflection/.test(n)},
      {key: 'section.front_light', match: (n) => /^_(Ming)?FrontLight/.test(n)},
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
      {key: 'section.depth', match: (n) => /^_(DepthWidth|DepthWidthMode|DepthDistanceScale|DepthBias|DepthSoftness|DepthEffects|MingDepth|Ming2DShadowCaster)/.test(n)},
      {
        title: {ko: '런타임 전환', en: 'Runtime Switching', ja: '実行時の切り替え'},
        match: (n) => /^_Ming(VrcQualityMenuEnabled|VrcQualityTier|CastShadowRuntimeToggle)$/.test(n),
      },
      {key: 'section.depth_rim', match: (n) => n.startsWith('_DepthRim') || n === '_EdgeRimLightResponseFloor'},
      {key: 'section.depth_shadow', match: (n) => n.startsWith('_DepthShadow') || n === '_2DShadowCasterEnabled' || n === '_DepthAvailabilityMode' || n.startsWith('_ScreenSpaceShadow')},
      {key: 'section.ssao', match: (n) => /^_(Ming)?Ssao/.test(n)},
      {key: 'section.translucency', match: (n) => n.startsWith('_Translucency')},
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
      {key: 'section.stack', match: (n) => /^_(Ming)?Stack/.test(n)},
      {key: 'section.normal_layers', match: (n) => /^_(Ming)?Normal/.test(n)},
      {key: 'section.matcap_layers', match: (n) => /^_(Ming)?Matcap/.test(n)},
      {key: 'section.pbr', match: (n) => /^_(MingPbr|Metallic|Smoothness|MaskMap|WorkflowMode|Pbr|Region)/.test(n) && !n.startsWith('_PbrReflection')},
      {key: 'section.reflection', match: (n) => /^_(Reflection|PbrReflection)/.test(n)},
      // Region Mask first: its per-region deltas are named _MingRegionToonSpecular*,
      // which the toon specular rule below would otherwise swallow.
      {key: 'section.region_mask', match: (n) => n.startsWith('_MingRegion')},
      {key: 'section.toon_specular', match: (n) => /^_(Ming)?ToonSpecular/.test(n)},
      {key: 'section.emission', match: (n) => /^_(EmissionMap|EmissionIntensity|EmissionEnabled|EmissionShadowVisibility|Emission|MingEmission)/.test(n)},
      {key: 'section.occlusion', match: (n) => /^_(MingOcclusion|OcclusionEnabled)/.test(n)},
      {key: 'section.glitter', match: (n) => /^_(Ming)?Glitter/.test(n)},
    ],
  },
  {
    slug: 'character',
    position: 6,
    title: {ko: '캐릭터 표현', en: 'Character', ja: 'キャラクター表現'},
    lead: {
      ko: '얼굴과 캐릭터 전체를 대상으로 하는 항목입니다. 얼굴과 피부를 역할에 맞게 지정한 뒤 필요한 효과를 조절하세요.',
      en: 'Controls that treat the face and the whole character as their own thing. Assign face and skin roles before adjusting their effects.',
      ja: '顔とキャラクター全体を対象にする項目です。顔と肌を役割に合わせて指定してから、必要な効果を調整してください。',
    },
    sections: [
      {key: 'section.face', match: (n) => n.startsWith('_Face') || (n.startsWith('_MingFace') && !n.startsWith('_MingFaceCast'))},
      {
        key: 'section.character_height',
        match: (n) => /^_(MingHeight|MingCharacterHeight|CharacterHeight|HeightGradient)/.test(n),
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
      ko: '노멀 아웃라인은 메시를 확장해 그리므로 카메라 깊이를 요구하지 않습니다. 화면 깊이를 읽어 표면 안쪽 선까지 그리는 내부 2D 경계는 [깊이 기반 효과](/reference/depth-effects) 그룹에 있습니다.',
      en: 'Normal Outline expands the mesh, so it does not require camera depth. Inner 2D Edge, which reads screen depth to draw lines inside the surface, lives in the [Depth Effects](/reference/depth-effects) group.',
      ja: 'ノーマルアウトラインはメッシュを拡張して描くため、カメラ深度を必要としません。画面深度を読んで表面の内側の線まで描く内部2Dエッジは[深度ベースエフェクト](/reference/depth-effects)グループにあります。',
    },
    sections: [
      {key: 'section.normal_outline', match: (n) => /^_Outline(Hull|Vector|Distance|IncludeFormShadow|Pattern)/.test(n)},
      {key: 'section.outline', match: (n) => /^_(Outline|MingOutline)/.test(n) && !n.startsWith('_OutlineStencil')},
      {key: 'section.stencil', match: (n) => n.startsWith('_OutlineStencil')},
      // Drawn by MingToonShaderGUI.Outline.cs, so it belongs on this page even
      // though the name does not say outline: it is the rim a fallback shader
      // shows where MingToon itself cannot run.
      {key: 'section.fallback', match: (n) => n.startsWith('_FallbackRim')},
    ],
  },
];

const UI_STRINGS = {
  control: {ko: '항목', en: 'Control', ja: '項目'},
  meaning: {ko: '설명', en: 'What it does', ja: '説明'},
  property: {ko: '셰이더 프로퍼티', en: 'Shader property', ja: 'シェーダープロパティ'},
  generated: {
    ko: '이 페이지는 인스펙터 문구를 기준으로 하며, 표면 상태의 설명은 현재 렌더 상태 코드와도 대조했습니다. 설치 버전, 표시 모드, 재질 역할과 기능 조건에 따라 실제 보이는 항목이 달라집니다. 먼저 해당 가이드에서 사용 순서를 확인하세요.',
    en: 'This page follows inspector labels, with surface-state explanations checked against the rendering-state code. Availability depends on the installed version, inspector mode, material role and feature conditions.',
    ja: 'このページはインスペクター文言を基準とし、サーフェス状態の説明は現在の描画状態コードとも照合しています。インストール版、表示モード、役割、機能条件によって表示項目が変わります。使い方は対応するガイドから確認してください。',
  },
  other: {ko: '그 밖의 항목', en: 'Other controls', ja: 'その他の項目'},
};

// ------------------------------------------------------------------ emit

const text = readText();

// UI labels are retained; these descriptions follow current SurfaceState code
// where a legacy tooltip is incomplete or no tooltip is registered.
const reviewedSurfaceTips = {
  "prop._AlphaToCoverage": {
    "ko": "MSAA의 샘플 커버리지로 알파 경계를 표현합니다. 현재 표면 상태 코드는 불투명 외 모드에서 사용하며, 켜면 알파 블렌딩을 중복 적용하지 않도록 블렌드 상태를 조정합니다. MSAA가 없는 화면에서는 같은 부드러움을 기대하지 마세요.",
    "en": "Uses MSAA sample coverage for alpha edges. Current surface-state code supports non-Opaque modes and adjusts blending when enabled to avoid applying alpha blending twice. Do not expect the same smoothing in views without MSAA.",
    "ja": "MSAAのサンプルカバレッジでアルファ境界を表現します。現在のサーフェス状態コードでは不透明以外で使い、有効時はアルファブレンドを重複適用しないよう調整します。MSAAのない画面で同じ滑らかさは期待できません。"
  },
  "surface.depth_prepass": {
    "ko": "일반 투명(3000)에서 컬러 없이 깊이를 먼저 기록합니다. 겹침이나 아웃라인 문제를 줄일 수 있지만 뒤쪽 반투명 면을 가릴 수 있으므로 실제 모델에서 확인하세요.",
    "en": "Writes depth without color for Transparent (3000). It can reduce overlap or outline problems but may hide translucent surfaces behind it; compare on the actual model.",
    "ja": "透明(3000)で色を出さず先に深度を書きます。重なりやアウトラインの問題を軽減する一方、奥の半透明面を隠す場合があるため、実モデルで比較してください。"
  },
  "surface.two_sided_dual_pass": {
    "ko": "양면 표면의 뒷면을 앞면보다 먼저 별도 패스로 그립니다. 추가 정점 패스와 드로우 설정 비용이 생깁니다. 표면 모드와 별도로 조합을 확인하세요.",
    "en": "Draws the far side of a two-sided surface in a separate pass before the near side. It adds vertex-pass and draw-setup work. Check the combination with your surface mode.",
    "ja": "両面サーフェスの裏面を表面より先に別パスで描きます。頂点パスとドロー設定の処理が追加されます。サーフェスモードとの組み合わせを確認してください。"
  }
};
for (const [key, tip] of Object.entries(reviewedSurfaceTips)) {
  if (text[key]) text[key].tip = tip;
}

const order = readInspectorOrder();

function readBrpProperties() {
  const src = fs.readFileSync(BRP_SHADER, 'utf8');
  return new Set([...src.matchAll(/^\s*(?:\[[^\]]*\]\s*)*(_[A-Za-z0-9]+)\s*\(/gm)].map((m) => m[1]));
}

const brpProperties = readBrpProperties();
const omitted = [];

// Labelled properties form a source reference; visibility depends on inspector mode and runtime conditions.
const allProps = Object.keys(text)
  .filter((k) => k.startsWith('prop._'))
  .map((k) => k.slice('prop.'.length))
  .filter((name) => {
    if (/^_MingAvatarInteriorShield/.test(name)) {
      omitted.push(`${name} [experimentalNotPublic]`);
      return false;
    }
    if (!brpProperties.has(name)) {
      omitted.push(`${name} [absentBRPProperty]`);
      return false;
    }
    return true;
  })
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

// A labelled property is included only when it is declared by the current BRP
// shader and is public. Retired/localisation-only properties absent from BRP,
// and hidden experimental properties, are omitted with an explicit reason.
// Do not add a catch-all "Other" page: an unclassified control needs a real
// section rule and must remain visible in this diagnostic.

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
    lines.push(({ko: '사용 순서: ', en: 'Start with the guide: ', ja: '使い方: '})[locale] + '[' + page.title[locale] + '](/guides/' + page.slug + ')');
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
      const entry = section.key ? text[section.key] : null;
      const heading = section.title
        ? section.title[locale]
        : entry
          ? entry.label[locale]
          : section.key;
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
        const e = text[name === '_2DShadowCasterEnabled' ? 'surface.camera_depth' : 'prop.' + name];
        lines.push(
          `| **${escapeCell(e.label[locale])}** | ${escapeCell(
            e.tip ? e.tip[locale] : ''
          )} | \`${name}\` |`
        );
      }
      for (const key of extra) {
        const e = text[key];
        const extraProperty = ({'surface.depth_prepass':'_TransparentDepthPrepass','surface.two_sided_dual_pass':'_TwoSidedDualPass','surface.alpha_to_coverage_msaa':'_AlphaToCoverage'})[key];
        lines.push(
          `| **${escapeCell(e.label[locale])}** | ${escapeCell(
            e.tip ? e.tip[locale] : ''
          )} | ${extraProperty ? '\`' + extraProperty + '\`' : ''} |`
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
  `properties with BRP labels: ${allProps.length}  placed: ${claimed.size}  unplaced: ${unclaimed.length}`
);
if (omitted.length) console.log('omitted -> ' + omitted.join(', '));
if (unclaimed.length) {
  console.log('unplaced -> ' + unclaimed.join(', '));
  process.exitCode = 1;
}
