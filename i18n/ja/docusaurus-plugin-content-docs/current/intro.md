---
id: intro
title: MingToon について
sidebar_label: はじめに
slug: /
---

# MingToon

**顔の陰影から衣装の質感、シルエットまで、つなげて作るキャラクター向けトゥーンシェーダー。**

MingToon は顔の影の方向、光と影の重なり方、表面の色と質感を組み合わせて調整します。顔・髪・衣装をマテリアルごとに作り込み、MingToon Manager でアバター全体の見た目を整えられます。

[インストールから始める](/getting-started/installation) · [lilToon アバターを変換する](/workflow/liltoon-conversion) · [現在の制限を確認する](/limitations)

:::note[現在の公開版：0.1.8 BRP オープンベータ]
現在のダウンロードは Built-in Render Pipeline（BRP）本体のベータ版です。VRChat・Warudo・一般的な Unity 向けの環境は[インストールガイド](/getting-started/installation)で確認してください。VRChat クライアントでの動作と実際のアップロードは検証中です。現在のオープンベータは商用利用禁止です。

[オープンベータ参加案内](https://studioraming.github.io/mingtoon-site/ja/download/) · [BOOTH 商品](https://raming.booth.pm/items/8810209) · [ライセンスと同梱構成](/legal/beta-license)
:::

## MingToon で作る表現

### 光の方向に合わせて顔の影を設計する

フェイス SDF は、顔に現れる影の形を決めるテクスチャです。MingToon の Packed RGBA 方式は**左・右・上・下の4方向を1枚に保存**し、横からの光と上下からの光に応じた陰影を調整します。フェイス領域マスクとノーマルプッシュを組み合わせて、適用する範囲を決めます。

既存の単一チャンネル SDF を使う互換モードもあります。作成済みの SDF とバーテックスデータは本体マテリアルに使用でき、制作ツールの Face SDF Studio とシーンビューのペイントは別売りアドオンです。

→ [フェイス SDF の設定](/guides/face-sdf) · [アドオン構成](/guides/add-ons)

### 影が重なる場所の色と境界を調整する

表面の起伏による**フォームシャドウ**、リアルタイムライトの**投影シャドウ**、カメラ深度を読む**2Dシャドウ**を組み合わせます。前髪・手・袖の周囲に陰影を作り、統合シャドウで重なる部分の色を調整できます。影全体の明るさと色を整える機能もあります。

同じカメラ深度を使って、2Dリムライト、内部2Dエッジ、深度透過光、SSAO を加えられます。それぞれシルエット、内部の境界、薄い部分を通る光、接触部の暗さを扱います。**カメラ深度の確保が必要な効果**なので、表示されない場合は深度設定と対象環境を確認してください。環境によっては深度を確保する補助ライトが必要です。

→ [ライトとシャドウ](/guides/light-and-shadow) · [深度ベースの効果と利用条件](/guides/depth-effects)

### 色・質感・反射をレイヤーで重ねる

テクスチャ、ノーマル、Matcap のレイヤーとマスクで適用範囲を分けます。肌の色、髪の光沢、衣装の柄を個別に構成し、ハイブリッド PBR・トゥーンスペキュラー・グリッター・エミッションで必要な表面表現を加えられます。

色補正と全体の明るさ・ティント調整で、複数マテリアルの雰囲気を揃えます。シャドウパターンは網点や線画のような印刷表現を作り、表面への固定と画面への固定を選べます。アウトラインとリム系の調整でシルエットを仕上げます。

→ [ディテールマップ](/guides/detail-maps) · [シャドウパターン](/guides/shadow-pattern) · [アウトライン](/guides/outline) · [リム](/guides/rim)

### 編集したマテリアルをビルド用の構成につなげる

ルックの制作時は必要な機能を組み合わせます。対応するビルド最適化経路では、機能の使用状況とアニメーション依存を分析し、必要な機能を残したシェーダーを生成します。ベイクは、テクスチャに保存できる色情報と、照明・視点に応じて反応を続ける必要がある部分を分けて処理します。

実際のコストと結果は、残す機能や対象アバター・ワールドによって変わります。**最適化後も外観と必要なアニメーションを確認してください。** 検証済みの GPU 性能数値は現在公開していません。

→ [ビルド時の自動最適化](/workflow/build-optimization) · [シェーダーの内部構造](/internals/shader-structure)

## アバターを仕上げるまでの流れ

| 段階 | 作業 | ガイド |
|---|---|---|
| 1. 準備 | 対象プラットフォームの Unity 環境を確認してインストールします。 | [インストール](/getting-started/installation) |
| 2. マテリアル構成 | 既存の lilToon マテリアルを変換するか、最初のマテリアルを作ります。 | [変換](/workflow/liltoon-conversion) · [最初のマテリアル](/getting-started/first-material) |
| 3. 役割とルック | Manager で顔・素肌の役割を指定し、影・色・質感を整えます。 | [MingToon Manager](/workflow/character-manager) · [基本設定](/guides/basics) |
| 4. 確認とビルド | 深度効果の条件、外観、アニメーションを確認し、対象プラットフォームの手順に従います。 | [最適化](/workflow/build-optimization) · [VRChat](/platforms/vrchat) |

## 本体と追加ツール

BRP 本体はマテリアルの表現と設定を担当します。**URP は現在の BRP オープンベータに含まれず、すべての商用ライセンスに含まれます。** Face SDF Studio や Mask Maker などの制作ツールは[アドオン案内](/guides/add-ons)で確認できます。

Ming Light Controller（MLC）は別途インストールするツールです。アップロード用クローンに適用し、バーチャルライトと明るさ・色の調整を VRChat の表現メニューにつなげます。Modular Avatar 経路は既存のメニュー・パラメーター・FX を保持する設計で、実際のクライアントへのアップロードは検証中です。Personal Streaming・Personal Creator の Early Access Founders Edition には MLC が含まれ、正式リリース後に構成が変わる場合があります。

→ [Ming Light Controller](/guides/ming-light-controller) · [ライセンスと同梱構成](/legal/beta-license)

## 実装の基盤とクレジット

MingToon は公開されているグラフィックス技法と改変・採用した実装を、レイヤー・顔・深度効果・ビルドの構造につなげています。lilToon の一部の UV・色補正・グリッター計算、NonToon の一部のシャドウ処理を含む採用範囲と原著作権・ライセンスは、[サードパーティ表記とライセンス](/legal/third-party-credits)で確認できます。

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
