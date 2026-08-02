---
id: intro
title: MingToon について
sidebar_label: はじめに
slug: /
---

# MingToon

MingToon は **VRChat アバター用キャラクター向けトゥーンシェーダー + 制作ツールセット** です。Built-in Render Pipeline(BRP) ベースで、Warudo と一般的な Unity プロジェクトでも使用できます。

現在のバージョン: **0.1.3-preview** (クローズドベータ)

## Unity バージョン — ターゲットごとに異なります

:::danger[最初に確認してください]
| ターゲット | Unity |
|---|---|
| **VRChat PC** (主要対象) | **2022.3.22f1** |
| **Warudo** | **2021.3.45f2** |
| 一般 Unity | 2021.3 LTS |

**VRChat を対象とする場合は 2022.3.22f1 を使用してください。** 2021.3 では、VRChat ビルドフック と VRChat 実行時がまったくコンパイルされないため、アップロード時の自動最適化が機能しません。1 つのプロジェクトで VRChat と Warudo を共存させることはできません。
:::

## どこから読み始めるか

| 状況 | ドキュメント |
|---|---|
| **VRChat アバターに使いたい** | [VRChat](/platforms/vrchat) |
| 初めてインストールする | [インストール](/getting-started/installation) → [最初のマテリアル作成](/getting-started/first-material) |
| インスペクター構造を学ぶ | [インスペクター使用法](/guides/inspector) |
| ルックを作成し始める | [基本設定](/guides/basics) → [照明とシャドウ](/guides/light-and-shadow) |
| 既存の lilToon アバターを移行する | [lilToon 変換](/workflow/liltoon-conversion) |
| アバターをアップロードする | [ビルド時の自動最適化](/workflow/build-optimization) |
| 深度リム・2D シャドウが見えない | [深度ベースエフェクト](/guides/depth-effects) |
| 単一項目の意味を探す | [項目リファレンス](/reference/basics) |
| 何か問題がある | [トラブルシューティング](/troubleshooting) |
| その動作の理由を理解したい | [内部動作](/internals/shader-structure) |

## ドキュメント構造

**ルック作成** と **項目リファレンス** は MingToon インスペクターの **すべての設定** ワークフローグループと 1:1 で対応しています。画面に表示されるセクション名と同じドキュメントを見つけることができます。

| インスペクターグループ | ドキュメント |
|---|---|
| 基本設定 | [基本設定](/guides/basics) · [リファレンス](/reference/basics) |
| 照明とシャドウ | [照明とシャドウ](/guides/light-and-shadow) · [リファレンス](/reference/light-and-shadow) |
| リム | [リム](/guides/rim) · [リファレンス](/reference/rim) |
| 深度ベースエフェクト | [深度ベースエフェクト](/guides/depth-effects) · [リファレンス](/reference/depth-effects) |
| ディテールマップ | [ディテールマップ](/guides/detail-maps) · [リファレンス](/reference/detail-maps) |
| キャラクター表現 | [キャラクター表現](/guides/character) · [リファレンス](/reference/character) |
| アウトライン | [アウトライン](/guides/outline) · [リファレンス](/reference/outline) |

:::note[リファレンスはソースから生成されます]
項目名と説明は **MingToon インスペクターが実際に表示するテキストをそのまま** 引用しています。ドキュメントと画面の用語は一致しています。
:::

## MingToon が行うこと

- **トゥーンシェーディング** — レイヤー・マスク・合成ベースの多層着色、HSVG 色調整、最終最小/最大明るさ制御
- **3 種類のシャドウ** — フォームシャドウ(曲率) · シャドウプロジェクション(リアルタイム) · 2D シャドウ(スクリーン深度)、およびこれらを統合するユニバーサルシャドウ
- **アウトライン** — 深度不要で動作するノーマルアウトライン、シーンビューで厚さを直接ペイントするバーテックスペイント
- **リム** — リムライト · リムシェード · バックライト · フロントライト · シャドウ内部反射
- **スクリーントーン** — シャドウを [シャドウパターン](/guides/shadow-pattern) で表現したハーフトーンドット
- **フェイスシェーディング** — ノーマルプッシュ、フェイス領域マスク/プロキシスフィア、フェイスキャスト安定化、SDF オーソライジング
- **lilToon 変換** — 既存アバターマテリアルを MingToon 編集マテリアルに移行
- **ビルド時の自動最適化** — VRChat アップロード時に実際に使用する機能だけを残したシェーダーに自動置換後、復元

## クローズドベータ通知

:::warning[このディストリビューションは preview です]
- 検証済みの GPU パフォーマンス数値は公開されていません。
- VRChat / Warudo は **テスト対象** であり、リリース認証は完了していません。
- デプロイ前に [現在の制限とリリース](/limitations) を確認してください。
:::

バグ・質問・フィードバック: `studioraming@gmail.com`

報告の際は以下を記載していただくと、再現が早くなります。

1. Unity バージョンとターゲットプラットフォーム (VRChat PC / Warudo / 一般 Unity)
2. レンダーパイプライン (BRP / URP 12.x)
3. MingToon バージョン (`0.1.3-preview`)
4. Console ログの全文
5. 再現手順
