---
id: compatibility
title: 対応環境
sidebar_position: 2
---

# 対応環境

> このページは、自分の環境でMingToonが使えるか確認したい方のためのものです。

## 30秒で判定

次の3つがすべて「はい」なら使えます。

1. PCです。Windows・macOS・Linuxのいずれかです。
2. Unity 2021.3または2022.3でプロジェクトを開きます。
3. VRChatにアップロードするなら、Unity 2022.3.22f1です。

1つでも違う場合は、下の表で該当する項目を見てください。

## Unityバージョン {#unity-버전}

| 対象 | Unity | 理由 |
|---|---|---|
| **VRChat PC** | **2022.3.22f1** | 現行のVRChat SDKに準拠します。VRChat連携コードは2022.3ストリームでのみコンパイルされます |
| **WARUDO** | **2021.3.45f2** | WARUDO Mod SDK 0.14.3.10に準拠します |
| 一般のUnity | 2021.3または2022.3 | どちらもサポート対象のストリームです |

:::caution[1つのプロジェクトで2つの対象を兼ねることはできません]
VRChatとWARUDOはエディターのバージョンが異なります。対象ごとにプロジェクトを分けてください。
:::

### Validate Projectがバージョンを判定する方法

対応するエディターストリームは2021.3と2022.3の両方です。どちらでも `MING-ENV-UNITY-VERSION` エラーは出ません。

VRC SDKがあるのにエディターが2022.3ストリームでない場合は、 `MING-VRC-UNITY-VERSION` 警告が出ます。

この警告は、アバターのアップロードがサポート対象外という意味です。他の対象は影響を受けません。
→ [Validate Projectコード](/reference/validator#ming-vrc-unity-version)

## ハードウェア要件（必須） {#하드웨어-요구-사항-필수}

MingToonのすべてのパスはシェーダーモデル4.5を宣言します。

| プラットフォーム | 対応 |
|---|---|
| Windows · macOS · Linux（DirectX 11以上 · Vulkan · Metal） | 対応 |
| Android · Quest | 非対応 |
| iOS | 非対応 |
| WebGL | 非対応 |

:::danger[条件を満たさないと静かに失敗します]
シェーダーモデル4.5を満たせないプラットフォームでは、SubShaderがまるごと脱落します。
結果はマテリアルがマゼンタで表示されるだけで、エラーメッセージは出ません。
:::

現在のビルドターゲットが条件を満たさない場合は `MING-ENV-BUILD-TARGET` エラーが出ます。 `StudioRaming > MingToon > Validate Project` で確認してください。

## 環境ごとの互換性

状態表記の意味は次のとおりです。

- **主対象** — 開発と回帰検証をこの環境で行います。
- **検証待ち** — 動作するように作ってありますが、実機での確認が終わっていません。
- **非対応** — 動作を保証しません。

| 環境 | 状態 | 必要な対応 |
|---|---|---|
| **VRChat PC**（2022.3.22f1 · BRP） | 主対象 | → [VRChat](/platforms/vrchat) |
| **WARUDO 0.14.3.10**（2021.3.45f2 · BRP） | 検証待ち | → [Warudo](/platforms/warudo) |
| 一般のUnity **BRP** | 検証待ち | 深度エフェクトを使う場合はカメラのDepth Textureをオンにします |
| Unity 2021.3 **URP 12.x** | 検証待ち | MingToon URPシェーダーとRenderer Featureのインストール |
| **VRChat Quest** | 非対応 | 下記を参照 |
| VRChat + URP | 非対応 | BRPの制作物へ切り替え |

:::caution[URP 13以上はサポート範囲外です]
URPはUnity 2021.3 + URP 12.xのみが対象です。動作しているように見えても、サポート対象とは見なさないでください。
:::

## VRChat Quest {#vrchat-quest}

MingToonはモバイルシェーダーを対象にしていません。QuestにMingToonシェーダーをそのままアップロードすることはできません。

Quest対応が必要な場合は、SDKが許可するモバイルシェーダーで別途作成してください。自動変換の経路は提供していません。

MingToonマネージャーのQuestチェックは、代替版で失われる項目を数えます。アウトライン、半透明、深度エフェクトが代表的です。

## Post Processing Stack v2（任意）

MingToonはPPv2なしでも完全に動作します。

VRChatのアバターはワールドのポストプロセスに従います。PPv2は主にシーンの確認と撮影に使います。
→ [インストール](/getting-started/installation#선택-사항-post-processing-stack-v2)

## BRPとURPを併用するときにだけ該当する違い

<details>
<summary>テクスチャのインポート設定がバックエンドごとに異なって適用されます</summary>

BRPはレイヤーテクスチャを `_MainTex` のサンプラーで読み取ります。そのため `_MainTex` のFilterとWrapの設定がすべてのレイヤーに適用されます。

URPは固定のインラインサンプラー（Linear · Repeat）を使います。個々のテクスチャのFilterとWrapの設定は無視されます。

2つのバックエンドは、 `_MainTex` をClampまたはPointでインポートした場合にのみ違って見えます。

2つのバックエンドを併用する予定なら、 `_MainTex` を既定値（Bilinear · Repeat）にしておいてください。

これはURPのパス構造上、意図した制約です。レイヤーごとに専用サンプラーを置くと、サンプラースロットの上限を超えます。

</details>

## 次へ

[VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo) · [トラブルシューティング](/troubleshooting#install)
