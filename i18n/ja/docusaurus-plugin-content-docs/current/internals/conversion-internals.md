---
id: conversion-internals
title: 変換レポートの読み方
sidebar_position: 4
---

# 変換レポートリファレンス

lilToonマテリアルを変換すると、Consoleに次のような行が出ます。

```text
MingToon変換完了: スロット12個、マテリアル8個、明示的な損失5件。元のマテリアルはそのまま保存しました。
```

`明示的な損失`が0でない場合は、以下でコードを探してください。
変換の手順は[lilToonマテリアルの変換](/workflow/liltoon-conversion)にあります。

## 深刻度

| 深刻度 | 意味 | 集計 |
|---|---|---|
| Information | 変換が意図どおりに行われました | されない |
| Lossy | 移行はできましたが結果が変わる可能性があります | される |
| Unsupported | 移行できませんでした | される |
| Error | 変換が失敗しました | される |

## イシューコード

19個すべてです。アルファベット順です。

| コード | 深刻度 | 意味 | 確認すること |
|---|---|---|---|
| AlphaApproximation | Lossy | アルファ処理の式が異なります | サーフェスモードとアルファカットオフ |
| AnimatedUvRequiresBake | Unsupported | UVスクロール・回転のアニメーションを移行できませんでした | アニメーションで作り直してください |
| AudioLinkUnsupported | Unsupported | AudioLink連携には対応していません | 代替手段なし |
| ConversionFailed | Error | このマテリアルの変換が失敗しました | メッセージ本文 |
| DecalRequiresBake | Unsupported | デカールを移行できませんでした | 追加のテクスチャレイヤーで配置し直してください |
| DissolveRequiresBake | Unsupported | ディゾルブを移行できませんでした | アルファマスクとアニメーションで再現してください |
| EmissionMaskRequiresBake | Unsupported | エミッションマスクを移行できませんでした | エミッションマップに統合して焼いてください |
| FaceClassification | Information | 顔判定の結果報告です | 下の判定根拠の表 |
| FeatureUnsupported | Unsupported | そのほかの未対応機能です | メッセージに名前が出ます |
| MissingTextureSkipped | Lossy | 元が使っていたテクスチャがプロジェクトにありません | テクスチャを復旧してから再変換してください |
| OutlineApproximation | Lossy | アウトラインの幅・色の計算が異なります | 幅モードと圧力ソース |
| RimApproximation | Lossy | リムの式が異なります | [リム](/guides/rim) |
| SecondEmissionRequiresBake | Unsupported | 2番目のエミッションを移行できませんでした | エミッションマップに統合して焼いてください |
| ShadowApproximation | Lossy | 影の式が異なります | [形状シャドウの境界](/guides/light-and-shadow#1-형태-그림자-경계--가장-먼저) |
| SourceDefaultsReplaced | Lossy | 元の既定値がMingToonの既定値に変わりました | 元が既定値に依存したルックだった場合は変わります |
| SourceExcluded | Information | 変換除外ルールに該当した元マテリアルです | メッセージの除外根拠 |
| SpecialSurfaceUnsupported | Unsupported | ファー・ジェリーのような特殊表面には対応がありません | 代替手段なし |
| UvApproximation | Lossy | UV変形が異なります | テクスチャのTilingとOffset |
| ValueClamped | Lossy | 値がMingToonの範囲に丸められました | 元が範囲を超える値を使っていました |

:::caution[近似は間違いという意味ではありません]
シェーダーが違えば、同じ名前の機能でも式が異なります。
変換は相互運用のためのツールであり、数学的な複製ではありません。
近似の項目は、目で見て値を取り直してくださいという合図です。
:::

## 顔判定

Autoは、元のマテリアルが宣言した顔フラグだけを読みます。
名前やシェーダーのブランドから顔を推測することはありません。

名前が`Face`でも顔ではないことがあり、`Body`に顔が混ざっていることもあります。
推測が外れると、顔シェーディングが見当違いのメッシュにかかり、原因を突き止めにくくなります。

### 判定根拠の表示 {#판정-근거-표시}

| 表示 | 意味 | 確認の要否 |
|---|---|---|
| 顔レンダラーの直接指定 | 人がレンダラーを指定しました | いいえ |
| 肌レンダラーの直接指定 | 人がレンダラーを指定しました | いいえ |
| マテリアルの直接指定 | 人がマテリアルを指定しました | いいえ |
| マテリアルスロット指定 | 人がスロット単位で固定しました | いいえ |
| 元の顔フラグ | 元のシェーダーが顔だと表示していました | いいえ |
| 全体変換モード | 一括で適用しました | はい |
| 通常の既定値 | フラグがないため通常のまま残りました | はい |

### 3つの役割

| 役割 | プレビュー | 受け取るプリセット |
|---|---|---|
| Face | 顔シェーディング | 顔用 |
| Skin | 肌のルック | 肌用、素肌専用 |
| Regular | 通常シェーディング | 共用 |

マテリアルインスペクターの役割の行で、3つのいずれかに変更できます。
アバター全体の指定は[MingToonマネージャー](/workflow/character-manager#얼굴--피부-지정--가장-중요한-단계)で行います。

:::note[プリセット抽出の画面では共通と呼びます]
Regularの役割は、ルックプリセットを抽出するウィンドウでは`共通`スロットとして表示されます。
役割ドロップダウンのRegularと同じものです。
:::

## 元マテリアルの追跡

変換されたマテリアルは、元のマテリアルのGUIDを記録します。
**変換を元に戻す（MingToon以前のマテリアルへ）** は、この記録によって動作します。

| 監査メッセージ | 意味 | 結果 |
|---|---|---|
| `importer userData written by another tool` | 別のツールがすでにその領域を使っています | 元に戻す機能は使えません |
| `Source material name is ambiguous; reconvert once to stamp its GUID.` | 名前だけでは元マテリアルを特定できませんでした | 一度再変換すれば記録されます |
| `The source material could not be resolved.` | 元マテリアルが見つかりませんでした | 元が削除されたか移動されました |

復旧結果には`正確な元GUIDがない、または元を解決できないスロット: N個`として集計されます。

:::tip[ほかのツールと併用する場合]
MingToonは他者の記録を上書きしません。その代わり、元に戻す機能を諦めます。
元に戻す機能が必要な場合は、変換前にそのツールが同じ領域を使っていないか確認してください。
:::

## 監査表の列

監査表はタブ区切りの18列です。

| 列 | 入る内容 |
|---|---|
| `source` · `converted` | 元と変換結果のアセットパス |
| `resolution` | 元マテリアルをどう特定したか |
| `face` | 顔判定の結果 (`Face` または `Regular`) |
| `surfaceMode` · `renderQueue` · `cull` | レンダーステートの変換前後 |
| `outlineCull` | アウトラインのカルモードの変換前後 |
| `stencil` · `outlineStencil` | 通常パスとアウトラインパスのステンシルの変換前後 |
| `surfaceLayers` · `normalLayers` · `matcapLayers` | レイヤーが何枚として移行されたか |
| `occlusion` | オクルージョンの設定 |
| `passes` · `keywords` | パス数とキーワード数の変換前後 |
| `mismatches` | 元と異なる形で設定された項目 |
| `losses` | 損失の項目 |

`renderQueue differs: expected ...`が出た場合は、サーフェスモードが元と異なる形で設定されたということです。

## 変換後に確認すること

実際のモデルで確認してください。インスペクターのプレビュー球では判断できません。

1. マスクのチャンネル選択と反転 — 最もよくずれます
2. テクスチャのTilingとOffset
3. オクルージョン
4. サーフェスモード — 特に髪がカットアウトで来ているか
5. 顔マテリアルの判定 — 上の判定根拠の表
6. レイヤー数 — 元の2nd・3rdサーフェスが何番のレイヤーで来たか

## 関連ページ

- [lilToonマテリアルの変換](/workflow/liltoon-conversion)
- [MingToonマネージャー — 1 · 変換](/workflow/character-manager#1--변환)
- [テクスチャスロット共通UI](/guides/texture-modules)
