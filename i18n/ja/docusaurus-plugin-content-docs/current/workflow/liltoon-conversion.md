---
id: liltoon-conversion
title: lilToonマテリアル変換
sidebar_position: 1
---

# lilToonマテリアル変換

:::tip[実際の作業はMingToon Managerで行います]
Face / Skin / Commonの役割、変換ルック、出力先、原本復元、損失レポートを一箇所で処理します。→ [MingToon Manager](/workflow/character-manager#1--변환)
:::

## 変換で行うこと・行わないこと

- 元のマテリアルを保持し、編集用MingToonマテリアルを新規作成します。
- ベースカラー・テクスチャ、HSVG、ノーマル、エミッション、オクルージョン、PBR、MatCap、2nd/3rdレイヤーとマスクを可能な範囲で移行します。
- ステンシル、レンダーキュー、Cullと、Opaque / Cutout / Fade / Premultiplyなどのサーフェス状態を保持します。
- ソースに実データがあれば、PBR・エミッション・サーフェススタック・アウトライン・アルファマスクの各モジュールも有効にします。
- 対応できない機能は損失レポートへ`lossy`または`unsupported`として残します。

:::caution[ルックの完全一致は保証しません]
2つのシェーダーでは数式と機能の意味が異なります。変換は出発点を作る相互運用ツールであり、数学的な複製機能ではありません。
:::

## Missing Shaderマテリアルの復旧変換 {#missing-shader}

0.1.7ではシェーダーファイルがなくピンク色になったマテリアルも、シリアライズ済みのプロパティ名と値を読み取って変換します。NiloToon・lilToon・Unity Standard系の保存パターンを判別し、その根拠をプレビューへ表示します。

Missing Shader状態では、元シェーダーの隠しデフォルト値とキーワードの意味をすべて復元することはできません。変換後は特に次を直接確認してください。

- Surface Mode、Blend、Alpha ClipとCutoff
- Cull、Render QueueとStencil
- Emission・PBR・Outlineの使用有無
- マスクチャンネルと反転

## 手順

1. アバターまたは衣装のルートへMingToon Managerを追加します。
2. 変換プレビューでソーススキーマと除外スロットを確認します。
3. Face / Skin / Commonの役割をスロットごとに指定します。Autoはソースが持つ直接フラグだけを信頼します。
4. 変換ルックプリセットと出力先を選びます。
5. 既存UV4・UV8の所有権と上書きオプションを確認します。
6. 変換を実行し、損失レポートの全項目を読みます。
7. 実際のキャラクターをSceneView・GameViewで原本と比較します。

パーティクル・屈折・ファー/シェル・オーディオ反応・フリップブック・オーバーレイ・補助パスのように1:1対応しないスロットは、意図的に原本を維持します。

## 変換後の確認

- Rendererが新しい編集用MingToonマテリアルを使用し、元アセットが残っているか
- Opaque / Cutout / TransparentとBlendの結果が同じか
- Render Queue、Cull、Stencilが意図どおりか
- テクスチャのTiling / Offset、チャンネル、反転が同じか
- PBR・エミッション・アウトライン・アルファマスクが必要なマテリアルでモジュールが有効か
- Face / Skinの役割と顔プロキシが合っているか

ルックプリセットを再適用しても、0.1.7はSurfaceの識別情報と顔プロキシなどキャラクター固有の値を保持します。

## 原本復元

MingToon Managerの`元のマテリアルを復元`は、記録された元GUIDを使って現在のスロットを1つのUndo段階で戻します。生成された変換マテリアルとメッシュbakeアセットは自動削除しません。

## 次へ

[MingToon Manager](/workflow/character-manager)・[ビルド時の自動最適化](/workflow/build-optimization)