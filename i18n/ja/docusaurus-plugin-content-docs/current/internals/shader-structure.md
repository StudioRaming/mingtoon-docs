---
id: shader-structure
title: シェーダー構造とパス
sidebar_position: 1
---

# シェーダー構造とパス

**このドキュメントを読むと** MingToonが1フレームの中で実際に何を何回描画するのかを理解し、サーフェスモードがなぜそのように機能するのかの根本的な理解が得られます。

ここからは、ルックを作成するのに必ず必要な内容ではありません。ただし **原因がわからない現象**が生じたときに、答えがここにあります。

## SubShader

```text
Tags {
  Queue              = Geometry
  RenderType         = Opaque
  IgnoreProjector    = False
  MingToonFamily     = 1
  MingToonSurfaceKind = BRP
  VRCFallback        = toonstandardoutline
}
LOD 300
```

| タグ | 意味 |
|---|---|
| `MingToonFamily` · `MingToonSurfaceKind` | MingToonツールが自身のマテリアルを識別するマーカー。バックエンド切り替え、ベイク、一括編集がこれで対象を見つけます |
| **`VRCFallback = toonstandardoutline`** | VRChatがシェーダーを隠すときにフォールバックとして使用するシェーダーです → 下記を参照 |
| `IgnoreProjector = False` | プロジェクター影響を受けます |

:::note[VRCFallbackが重要な理由]
VRChatで相手が **Shadersを Hiddenに設定**すると、私のアバターはフォールバックシェーダーで表示されます。MingToonは `toonstandardoutline` を指定しているので、**その状況でもトゥーンシェーディングとアウトラインが残ります。** Standardに落ちるシェーダーより元のルックに近く見えます。
:::

レンダー状態はすべてプロパティで開かれています — `_Cull` `_ZWrite` `_SrcBlend` `_DstBlend` `_BlendOp` `_ZTest` `_ColorMask`。サーフェスモードがこれらの値をまとめて設定します。

---

## 5つのパス

| 順序 | パス名 | LightMode | いつ描画されるか |
|---|---|---|---|
| 1 | `TRANSPARENT_DEPTH_PREPASS` | `Always` | 透明系のみで実際の三角形を描画 |
| 2 | `FORWARD_BASE` | `ForwardBase` | 主光源 + 環境光。本体 |
| 3 | `FORWARD_ADD` | `ForwardAdd` | 追加光源ごとに1回ずつ |
| 4 | `OUTLINE_HULL_DIRECT` | `ForwardBase` | 法線アウトライン |
| 5 | `SHADOW_CASTER` | `ShadowCaster` | シャドウマップ + カメラ深度テクスチャ |

<!-- SCREENSHOT: Frame Debuggerで見たMingToonのパス順序 -->

### 1. TRANSPARENT_DEPTH_PREPASS

**解決する問題** — 透明パスは三角形を **深度順ではなくインデックス順で** 描画します。だから1つのメッシュ内でも、頬の後ろにある髪の毛がバッファの後ろにあれば、頬の上に描画されます。**ブレンド状態では絶対に直せません。フラグメントを整列するのは深度だけです。**

このパスが **カラーをブロックして表面深度だけを最初に記録**し、その後カラーパスがその深度に対してテストします。

アウトラインハルも同じ記録で修正されます。ハルは表面を拡大したコピーなので、バッファが空なら目と口の上に描く理由はありませんでした。今は表面がそのピクセルを所有します。

:::note[不透明・カットアウトはコストを出しません]
フラグメントで切り出すやり方ではありません。そうすると頂点ステージはメッシュ全体で依然として実行されます。**三角形を退化（degenerate）位置に折りたたんで** まったくラスタライズされないようにします。
:::

:::tip[LightModeが `ForwardBase` ではなく `Always` である理由]
`Material.SetShaderPassEnabled`は **パス名ではなくLightModeタグで** 機能します。プリパスが `ForwardBase` だったら、このパスだけをオフにした瞬間に表面パスとアウトラインパスも一緒にオフになります。`Always` は同じフォワードループが宣言順に描画し、他のパスが使用しないタグなので、**単独でオン・オフできます。**
:::

アルファマスクキーワード（`_MING_ALPHA_MASK`）もこのパスでコンパイルされます。そうしないと、マスクで開けた穴が深度を記録して後ろを隠します。

### 2. FORWARD_BASE {#2-forward_base}

本体です。ほぼすべてのモジュールがここで計算されます。コンパイルされるキーワードが最も多いパスです。

### 3. FORWARD_ADD

**追加光源（ポイント/スポット）1つごとに1回ずつ** さらに描画されます。光源が多い世界ではドローコールが増える地点です。

`追加ライト受信量` をオフにすると、このパスの寄与が消えます。→ [ライトとシャドウ](/guides/light-and-shadow#추가-광원)

### 4. OUTLINE_HULL_DIRECT

法線アウトライン。**追加パス1回** がここで正確に実行されます。

LightModeが `ForwardBase` なので主光源パスと一緒に実行されますが、独自の `_OutlineHullCull`（デフォルト Front） · `_OutlineHullSrcBlend` · `_OutlineHullDstBlend` · `_OutlineHullZWrite` · 独自ステンシルセットを持ちます。そのため表面とは独立してレンダー状態を制御できます。

### 5. SHADOW_CASTER {#5-shadow_caster}

シャドウマップを使用します。**ただしこのパスはシャドウだけのためではありません。**

:::danger[2つの透明モードとも ShadowCaster パスをオンのままにしてください]
Built-inは **`_CameraDepthTexture` をこのパスを通して埋めます。** そのテクスチャが、2Dシャドウ、2Dリムライト、内側2Dエッジが読み込むものです。

パスをオフにするとキャラクターが自身の深度から消え、だから以前は透明なマテリアルではこれらのモジュール全体をオフにする必要がありました。

今は代わりにフラグメント側で **光源シャドウレンダリングだけを抑制** するので、元々シャドウを落とさなかったものが新たに落とすことはありません。
:::

これが `透明・アウトライン用深度書き込み` モードが成立する理由です。

---

## サーフェスモードが実際に変更する値 {#표면-모드가-실제로-바꾸는-값}

| サーフェスモード | RenderType | レンダーキュー | Src/Dst Blend | 深度書き込み | アウトラインバッファ |
|---|---|---|---|---|---|
| **不透明** | `Opaque` | 2000 (Geometry) | One / Zero | On | 通常 |
| **カットアウト** | `TransparentCutout` | 2450 (AlphaTest) | One / Zero | On | 通常 |
| **透明・アウトライン用深度書き込み** | **`Opaque`** | **2499** | SrcAlpha / OneMinusSrcAlpha | On | **安定モード** |
| **透明** | `Transparent` | 3000 | SrcAlpha / OneMinusSrcAlpha | Off | 通常 |

:::tip[キュー2499とRenderType Opaqueが鍵です]
- **2499** — 不透明区間（2500未満）の内側です。2つのパイプラインがカメラ深度テクスチャを作成する範囲がここまでです。
- **RenderTypeが `Opaque`** — 深度テクスチャを埋めるパスがこのタグで対象を選びます。

この2つのおかげで、アルファブレンディングをしながらも深度ベースのモジュールすべてが機能します。
:::

`透明・アウトライン用深度書き込み` ではアウトラインハルのブレンドも **One / Zero** に変わります（安定モード）。ハルが半透明に重なって見えるのを防ぎます。通常の透明では SrcAlpha / OneMinusSrcAlpha です。

:::note[サーフェスモードを変更しても保持されるもの]
`アルファカットオフ`、アウトラインON/OFF、およびすべての外観値はそのまま残ります。レンダー状態、既定キュー、内部アウトラインバッファ状態だけ設定されます。
:::

---

## シェーダーキーワード {#셰이더-키워드}

MingToonはほとんどのモジュールを **`shader_feature_local_fragment`** でコンパイルします。マテリアルごとに独立してオン・オフでき、フラグメントステージにのみ影響します。

### モジュールキーワード

| キーワード | モジュール |
|---|---|
| `_MING_FACE_SHADING` · `_MING_FACE_NORMAL_BAKED` | フェイスシェーディング / UV7ベイク使用 |
| `_MING_STACK` | テクスチャレイヤー |
| `_MING_NORMAL_LAYERS` | 法線レイヤー |
| `_MING_MATCAP` | MatCap |
| `_MING_PBR` | PBRサーフェス |
| `_MING_EMISSION` · `_MING_OCCLUSION` | エミッション / オクルージョン |
| `_MING_FRESNEL_RIM` · `_MING_RIM_SHADE` | リムライト / リムシェード |
| `_MING_BACKLIGHT` · `_MING_FRONT_LIGHT` | バックライト / フロントライト |
| `_MING_GLITTER` · `_MING_GLITTER_MASK` | グリッター / 専用マスク |
| `_MING_SHADOW_REFLECTION` | 影内部リフレクション |
| `_MING_FORM_SHADOW` · `_MING_FORM_SHADOW_2ND` | フォームシャドウ 1段目 / 2段目 |
| `_MING_SHADOW_PATTERN` · `_MING_SHADOW_PATTERN_TILE` | シャドウパターン / 形状タイル |
| `_MING_DEPTH_SHADOW` · `_MING_DEPTH_SHADOW_MASK` | 2Dシャドウ / マスク |
| `_MING_DEPTH_RIM` · `_MING_DEPTH_RIM_MASK` | 2Dリムライト / マスク |
| `_MING_INNER_EDGE_MASK` | 内側2Dエッジマスク |
| `_MING_ALPHA_MASK` | アルファマスク |
| `_ALPHATEST_ON` | カットアウト |

### レイヤーティアキーワード {#레이어-티어-키워드}

レイヤー数は **連続値ではなくティア** でコンパイルされます。

| モジュール | ティア |
|---|---|
| テクスチャレイヤー | (なし) → `_MING_STACK_4` → `_MING_STACK_10` |
| 法線レイヤー | (なし) → `_MING_NORMAL_2` → `_MING_NORMAL_5` |
| MatCapレイヤー | (なし) → `_MING_MATCAP_2` → `_MING_MATCAP_5` |

:::tip[レイヤー数を5から4に減らしてもコストは減らないかもしれません]
同じティア内ならコンパイルコードは同じです。**ティア境界**（例：テクスチャレイヤー 4 → 5）を越えるときに実際に変わります。ベイクは実際の使用数を見てティアを再度選びます。
:::

### 変形爆発を防ぐ機構

`#pragma skip_variants` で使わないUnity組み込み変形を削除します。

- プリパス：ライトマップ · ライトプローブ · 頂点照明 · すべてのシャドウ変形 · DIRECTIONAL/POINT/SPOT
- FORWARD_BASE：`LIGHTMAP_ON` `DIRLIGHTMAP_COMBINED` `DYNAMICLIGHTMAP_ON`

キャラクターシェーダーはライトマップを使わないので、これらの変形は不要です。

---

## 編集用シェーダー vs 生成シェーダー

| | 編集用 | 生成（ベイク/ビルド） |
|---|---|---|
| キーワード | **すべての機能 + 最大ティアを一度にコンパイル** | 実際に使うもののみ |
| 作業中 | トグルしてもコンパイル待機なし | — |
| プロパティブロック | | **同一** |

:::note[作業中に重いのは正常です]
編集用シェーダーがすべてコンパイル状態を維持するおかげで、機能トグルをオン・オフするときに青いプレースホルダー色や変形コンパイル停止が生じません。

生成シェーダーが編集用と **同じShaderLab Propertiesブロック** を持つため、[ビルド時の自動最適化](/workflow/build-optimization)はシェーダーポインタだけ変更してもセットアップ済みの値は一切損失しません。
:::

## 関連ドキュメント

- [モジュールとパフォーマンスコスト](/internals/module-cost)
- [ベイクが削除するもの](/internals/bake-internals)
- [基本設定 — サーフェスモード](/guides/basics#1-표면-모드부터-정합니다)
