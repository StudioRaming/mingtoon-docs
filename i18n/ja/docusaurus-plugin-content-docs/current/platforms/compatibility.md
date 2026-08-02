---
id: compatibility
title: 対応環境
sidebar_position: 2
---

# 対応環境

**このドキュメントを読むと、** 自分の環境で MingToon を使用できるかどうか、使用する場合に何を準備する必要があるかを判断できます。

## Unity バージョン {#unity-버전}

:::danger[ターゲットごとに異なります。1 つのプロジェクトで兼用できません]
| ターゲット | Unity | 理由 |
|---|---|---|
| **VRChat PC** (主要ターゲット) | **2022.3.22f1** | 現行 VRChat SDK 基準。MingToon の VRChat フック・ランタイムは `UNITY_2022_3_OR_NEWER` でのみコンパイルされます |
| **Warudo** | **2021.3.45f2** | Warudo Mod SDK 0.14.3.10 基準 |
| 一般 Unity | 2021.3 LTS | |
:::

:::note[Validate Project の Unity バージョン判定]
サポートされたエディター ストリームは **2021.3 と 2022.3 両方** です。どちらでも `MING-ENV-UNITY-VERSION` エラーは表示されません。

VRC SDK があるのにエディターが 2022.3 ストリームでない場合、`MING-VRC-UNITY-VERSION` **警告** が表示されます。VRChat 統合コードがそのストリームでのみコンパイルされるためであり、**その他のターゲットは影響を受けません。** → [Validator コード](/reference/validator#ming-vrc-unity-version)
:::

## ハードウェア要件 (必須) {#하드웨어-요구-사항-필수}

MingToon のすべてのパスは `#pragma target 4.5` (シェーダー モデル 4.5) を宣言します。

:::danger[条件を満たさないと静かに失敗します]
シェーダー モデル 4.5 を満たさないプラットフォームでは、SubShader 全体が削除されます。結果は **材質がマゼンタ (ピンク色) でレンダリングされ、その他のエラー メッセージは表示されない** ことです。ログだけを見ていては原因が特定できないため、まずこの条件を確認してください。
:::

| 区分 | サポート |
|---|---|
| Windows / macOS / Linux (DirectX 11 以上・Vulkan・Metal) | ✅ |
| Android / Quest | ❌ |
| iOS | ❌ |
| WebGL | ❌ |

現在のビルド ターゲットが条件を満たさない場合、`Tools > Studio Raming > MingToon > Validate Project` がエラーとして報告します。

## 環境別互換性

| 環境 | ステータス | 必要な対応 |
|---|---|---|
| **VRChat PC** (Unity 2022.3.22f1, BRP) | 主要ターゲット・手動検証・未認証 | → [VRChat](/platforms/vrchat) |
| **VRChat Quest** | 直接サポートなし | 下記を参照 |
| **Warudo 0.14.3.10** (Unity 2021.3.45f2, BRP) | 実機検証待ち | → [Warudo](/platforms/warudo) |
| Unity 2021.3 **BRP** (一般) | 主要検証対象・リリース検証待ち | 一般的なライティング/シャドウ設定の後、深度効果を使用する場合は Depth Texture を準備 |
| Unity 2021.3 **URP 12.x** | オプション検証対象・未認証 | MingToon URP シェーダーおよび必要な Renderer Feature をインストール |
| VRChat + URP | サポートなし | BRP 製成版に切り替え |

:::danger[URP 13 以上はサポート範囲外です]
URP は **Unity 2021.3 + URP 12.x** のみが現在のターゲットです。動作しているように見えても、サポート対象とは見なしてください。VRChat は URP を使用していません。
:::

## VRChat Quest {#vrchat-quest}

MingToon はモバイル シェーダー ターゲットではありません。Quest 対応が必要な場合、SDK が許可するモバイル シェーダーに **個別に変換** し、どの機能が失われるかを検討してください。自動変換パスは提供されていません。

## テクスチャ インポート設定のバックエンド差異

BRP と URP を一緒に使用する計画がある場合のみ対象です。VRChat のみがターゲットの場合は、読む必要はありません。

- **BRP** はレイヤー テクスチャを `_MainTex` のサンプラーでサンプリングします。したがって `_MainTex` の Filter/Wrap インポート設定が **すべてのレイヤーに適用** されます。
- **URP** は固定インライン サンプラー (Linear/Repeat) を使用します。個別テクスチャの Filter/Wrap 設定は **無視** されます。

結果として、両バックエンドは `_MainTex` を **Clamp または Point でインポートした場合のみ** 異なります。

:::tip[両バックエンドを一緒に使用する計画がある場合]
`_MainTex` をデフォルト値 (**Bilinear / Repeat**) に保持してください。
:::

これは URP パス構造上、意図された制約です。レイヤー テクスチャごとに専用サンプラーを持つとサンプラー スロット制限を超え、`_MainTex` サンプラーを共有するとコンパイルが失敗します。

## Post Processing Stack v2 (オプション)

BRP PPv2 はオプションであり、MingToon は PPv2 なしでも完全に動作します。VRChat アバターはワールドのポスト処理に従うため、PPv2 は主にシーン確認・撮影用です。設定は [インストール](/getting-started/installation#선택-사항-post-processing-stack-v2) を参照してください。
