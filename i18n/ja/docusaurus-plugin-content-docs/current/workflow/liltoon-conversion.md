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

0.1.8ではシェーダーファイルがなくピンク色になったマテリアルも、シリアライズ済みのプロパティ名と値を読み取って変換します。NiloToon・lilToon・Unity Standard系の保存パターンを判別し、その根拠をプレビューへ表示します。

Missing Shader状態では、元シェーダーの隠しデフォルト値とキーワードの意味をすべて復元することはできません。変換後は特に次を直接確認してください。

- Surface Mode、Blend、Alpha ClipとCutoff
- Cull、Render QueueとStencil
- Emission・PBR・Outlineの使用有無
- マスクチャンネルと反転

## 手順

1. 衣装だけの作業でもManagerは常にアバタールートに置きます。
2. 「はじめに」でFace/Skin対象を指定し、スロットの役割と除外対象を確認します。
3. 先にFactoryルックを選びます。新しい選択の既定値はBasic Toonです。
4. Neutralまたはほかの色調プリセットを選びます。元の色調と保護対象の影値を維持するにはKeep Existing Valuesを選びます。
5. 必要に応じて変換の詳細設定で出力先、UV4・UV8の所有権と上書きを確認します。
6. 変換し、成功・失敗・除外・損失の結果を確認します。変換済みには現在のMingToonマテリアルに適用を使います。
7. SceneView・GameViewで元と比較し、役割・サーフェス・テクスチャ・影を確認します。

一部マテリアルの変換に失敗した場合、その元スロットを維持し、変換可能なほかのマテリアルは処理を続けます。失敗・除外・損失の結果と残った元スロットを確認してください。有効な変換後にルック・色調の段階だけ失敗した場合は、その段階の前の変換値を保持し、エラーを記録します。一部の成功を全体の成功と判断しないでください。

## 変換後の確認

- Rendererが新しい編集用MingToonマテリアルを使用し、元アセットが残っているか
- Opaque / Cutout / TransparentとBlendの結果が同じか
- Render Queue、Cull、Stencilが意図どおりか
- テクスチャのTiling / Offset、チャンネル、反転が同じか
- PBR・エミッション・アウトライン・アルファマスクが必要なマテリアルでモジュールが有効か
- Face / Skinの役割と顔プロキシが合っているか

再適用は **ルック → 色調** の順です。Keep Existing Valuesはルック適用後に既存の色調と保護対象の影バンド強度・境界・幅・合成値を復元します。サーフェスの識別情報や顔プロキシなどの保護対象も維持しますが、元の外見の完全一致は保証しません。

## 原本復元

MingToon Managerの`元のマテリアルを復元`は、記録された元GUIDを使って現在のスロットを1つのUndo段階で戻します。生成された変換マテリアルとメッシュbakeアセットは自動削除しません。

## 次へ

[MingToon Manager](/workflow/character-manager)・[ビルド時の自動最適化](/workflow/build-optimization)・[トラブルシューティング](/troubleshooting)・[トラブルシューティング](/troubleshooting)
