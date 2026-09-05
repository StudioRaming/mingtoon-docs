---
id: intro
title: MingToon について
sidebar_label: はじめに
slug: /
---

:::note[オープンベータ参加案内]
[オープンベータ参加案内](https://studioraming.github.io/mingtoon-site/ja/download/) — BOOTH商品はまだ公開されていません。公開後、このページに公式商品リンクを追加します。 ダウンロード前に、現在のベータ版の利用条件と対応範囲をご確認ください。
:::


すべての商用ライセンスにURPバージョンが含まれます。Personal Streaming・Personal CreatorのEarly Access Founders EditionにはMLCが含まれ、正式リリース後に構成が変更される場合があります。現在のオープンベータでは商用利用は禁止です。[ライセンスと同梱構成](/legal/beta-license)をご確認ください。

# MingToon

MingToon 0.1.7 は **BRP本体のオープンベータ**です。URPは本体とは別売りのアドオンで、Ming Light Controller（MLC）も別売りのアドオンです。

**VRChat アバターのためのキャラクター向けトゥーンシェーダー**です。

キャラクターを描くときに実際に触るもの — 影が落ちる位置とその色、顔に鼻の影がどう乗るか、アウトラインの太さ、逆光でシルエットが立つかどうか — を、それぞれ別々に決められるように分けてあります。ルックを作るインスペクターから、アバターに載せてアップロードする段階までが一式で入っています。

Built-in Render Pipeline(BRP) ベースで、Warudo と一般的な Unity プロジェクトでも使えます。

## 他のトゥーンシェーダーと何が違うか

**ビルド用シェーダーは実際に使う機能を基準に作られます。**
必要な機能でルックを作り、対応するビルド最適化経路で使用状況とアニメーション依存を分析して、
必要な機能を残した専用シェーダーを生成します。削除された機能の演算は省かれますが、実際の
コストは残した機能とアバター・ワールドによって変わります。
→ [ビルド時の自動最適化](/workflow/build-optimization)

**影が3種類あります。特に3つ目が違います。**
起伏が作る**フォームシャドウ**とリアルタイムの**シャドウプロジェクション**は他にもあります。
MingToon にはさらに **2Dシャドウ**があります — カメラ深度を読み、前髪・手・袖が体に落とす影を、
リアルタイム影では出せないトゥーンの形で描きます。3つが重なって真っ黒にならないよう1色に
まとめる統合シャドウも一緒にあります。
→ [ライトとシャドウ](/guides/light-and-shadow) · [深度ベースの効果](/guides/depth-effects)

**同じカメラ深度テクスチャを使う4つの効果。**
2Dリムライト（2Dのシルエット線）、内部2Dエッジ、薄い部位が光を含む深度透過光、折り目や接地部を
暗くするSSAOが、必要な深度サンプルを共有テクスチャから読みます。ポストプロセスパスや別カメラは
使いませんが、環境によっては深度を確保する補助ライトが必要な場合があります。設定はMingToon Managerと深度ベースの効果ガイドで確認してください。VRChat
クライアントでの動作はまだ未検証です。
→ [深度ベースの効果](/guides/depth-effects)

**顔はスロットではなく、ひとつのシステムです。**
フェイスマスク1枚では終わりません。ノーマルプッシュ、フェイス領域マスク、方向性 SDF に対応しています。SDFを焼くFace SDF Studioと
シーンビューのバーテックスペイントは別売りアドオンで提供されます。既存のSDFやバーテックスデータは
本体マテリアルへ割り当てられます。→ [フェイス SDFとアドオン](/guides/face-sdf) ·
[別売りアドオン](/guides/add-ons)

**印刷物のような見た目にできます。**
影を網点や線画で刷るスクリーントーンがあり、格子を表面に貼るか画面に固定するかを選べます。
画面に固定すると、キャラクターがその下を通るポップアート印刷のような見え方になります。
→ [シャドウパターン](/guides/shadow-pattern)

**ゲーム内で調整できます（MLC別売アドオン）。**
Ming Light Controllerを別途インストールし、アップロード用クローンに適用すると、バーチャルライトと
明るさ・色の調整をVRChatの表現メニューへ出せます。Modular Avatar経路は既存のメニュー・
パラメーター・FXを保持する設計ですが、クライアントへのアップロード成功はまだ未検証です。
→ [Ming Light Controller](/guides/ming-light-controller) · [VRChat](/platforms/vrchat)

<details>
<summary>ほかに入っているもの</summary>

- **アウトライン** — 深度なしでどこでも動作します。シーンビューのブラシペイントには別売りの Mask Maker アドオンが必要です。→ [アウトライン](/guides/outline)
- **リム系** — リムライト・リムシェード・逆光・正面光・シャドウ内部リフレクション。→ [リム](/guides/rim)
- **ディテール** — テクスチャ・ノーマル・マットキャップレイヤー、ハイブリッド PBR、トゥーンスペキュラー、グリッター、エミッション。→ [ディテールマップ](/guides/detail-maps)
- **マスター調整** — 光を足すもの全部・影全部・最終出力にそれぞれ明るさとティント。シーンが変わったらここで一度に合わせます。→ [基本設定](/guides/basics)
- **lilToon 変換** — 既存のアバターをテクスチャ・マスク・アウトライン幅マスクごと移します。→ [lilToon 変換](/workflow/liltoon-conversion)
- **MingToon マネージャー** — どのスロットが顔でどこが素肌かを指定し、アバター全体のルックを1画面で扱います。→ [MingToon マネージャー](/workflow/character-manager)

</details>

## 作業の流れ

**変換** → **役割の指定**(顔・素肌) → **ルック** → **アップロード**。
既存の lilToon アバターは1から、新しく作るマテリアルは2から始めます。

## ベータと商用利用

現在の配布・商用利用条件は、まず[ベータと商用利用](/legal/beta-license)で確認してください。

## はじめてなら

[インストール](/getting-started/installation) → [最初のマテリアル](/getting-started/first-material) → [インスペクターの使い方](/guides/inspector)

インストールページの1節が Unity バージョンを決めます。ターゲットごとに異なり、1つのプロジェクトで VRChat と Warudo を兼ねることはできません。

## どこから読み始めるか

| 状況 | ドキュメント |
|---|---|
| **VRChat アバターに使いたい** | [VRChat](/platforms/vrchat) |
| ルックを作り始める | [基本設定](/guides/basics) → [ライトとシャドウ](/guides/light-and-shadow) |
| 既存の lilToon アバターを移行する | [lilToon 変換](/workflow/liltoon-conversion) |
| アバターをアップロードする | [ビルド時の自動最適化](/workflow/build-optimization) |
| 2Dリムライト・2Dシャドウが表示されない | [深度ベースの効果](/guides/depth-effects) |
| 項目ひとつの意味を調べる | [項目リファレンス](/reference/basics) |
| 何かおかしい | [トラブルシューティング](/troubleshooting) |
| なぜそう動くのか知りたい | [内部動作](/internals/shader-structure) |

## ドキュメント構成

**ルック作成**と**項目リファレンス**は、MingToon インスペクターの**全設定**ワークフローグループと1:1で対応します。画面で見たセクション名のままドキュメントを探せます。

| インスペクターグループ | ドキュメント |
|---|---|
| 基本設定 | [基本設定](/guides/basics) · [リファレンス](/reference/basics) |
| ライトとシャドウ | [ライトとシャドウ](/guides/light-and-shadow) · [リファレンス](/reference/light-and-shadow) |
| リム | [リム](/guides/rim) · [リファレンス](/reference/rim) |
| 深度ベースの効果 | [深度ベースの効果](/guides/depth-effects) · [リファレンス](/reference/depth-effects) |
| ディテールマップ | [ディテールマップ](/guides/detail-maps) · [リファレンス](/reference/detail-maps) |
| キャラクター表現 | [キャラクター表現](/guides/character) · [リファレンス](/reference/character) |
| アウトライン | [アウトライン](/guides/outline) · [リファレンス](/reference/outline) |

:::note[リファレンスはソースから生成されます]
項目名と説明は **MingToon インスペクターが実際に表示する文言をそのまま**取り込んでいます。ドキュメントと画面で用語がずれることはありません。
:::

## BRP本体ベータ通知

:::warning[このディストリビューションは preview です]
- 検証済みの GPU パフォーマンス数値は公開されていません。
- VRChat / Warudo は **テスト対象** であり、リリース認証は完了していません。
- デプロイ前に [現在の制限とリリース](/limitations) を確認してください。
:::

バグの報告は[公式Discordサーバー](https://discord.gg/Zsj6pkWKKs)の**バグ報告チャンネル**をご利用ください。

報告の際は以下を記載していただくと、再現が早くなります。

1. Unity バージョンとターゲットプラットフォーム (VRChat PC / Warudo / 一般 Unity)
2. レンダーパイプライン (BRP / URP 12.x)
3. MingToon バージョン (画面右上のバッジに表示されます)
4. Console ログの全文
5. 再現手順
