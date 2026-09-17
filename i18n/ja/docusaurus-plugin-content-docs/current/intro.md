---
id: intro
title: MingToon について
sidebar_label: はじめに
slug: /
---

# MingToon

> このページでは MingToon が何であるかを説明します。
> すぐに始めるなら[インストール](/getting-started/installation)へ進んでください。

## 一行でいうと

MingToon は VRChat と Warudo のアバター向けキャラクタートゥーンシェーダーです。
顔の影、表面の色と質感、シルエットを 1 つのインスペクターで扱います。
マテリアルは 1 つずつ作り、アバター全体は MingToon Manager で揃えます。

## はじめてならこの順番で

1. [インストール](/getting-started/installation) — Unity のバージョンを合わせ、パッケージを導入します。
2. [Manager ではじめる](/getting-started/first-material) — アバターを 1 体変換します。
3. [基本設定ガイド](/guides/basics) — 色と明るさを決めます。
4. [ライティングとシャドウ](/guides/light-and-shadow) — 影の境界を整えます。

## 何が変わるのか

![同じアバターの顔を変換前と変換後で並べてレンダリングした比較画像](/img/placeholder.png)
<!-- CAPTURE: intro/intro-01-before-after.png | 같은 아바타의 상반신을 변환 전 원본 셰이더와 변환 후 MingToon으로 나란히 렌더한 2분할 | 1200x700 -->

### 影を 3 種類に分けて使います

表面の凹凸が作る影が**フォームシャドウ**です。
リアルタイムライトが落とす影が**影の投影**です。
カメラが測る前後の情報を読む影が**デプスシャドウ**です。
詳しくは[ライティングとシャドウ](/guides/light-and-shadow)と[深度ベースエフェクト](/guides/depth-effects)をご覧ください。

### 色と質感を層で重ねます

テクスチャ、ノーマルマップ、MatCap（1 枚の球状画像で光沢を模す方式）を重ねます。
マスク（効果を適用する部分だけを白く塗った白黒画像）で範囲を分けます。
詳しくは[ディテールマップ](/guides/detail-maps)、[シャドウパターン（スクリーントーン）](/guides/shadow-pattern)、[アウトライン](/guides/outline)をご覧ください。

### アップロード時に自動で軽くなります

編集中はすべての機能をオンにできる重いシェーダーを使います。
VRC SDK のアップロードや WARUDO モードのビルドを実行すると、使う機能だけを残します。
詳しくは[ビルド時の自動最適化](/workflow/build-optimization)をご覧ください。

## インスペクターのグループと文書

| インスペクターのグループ | 文書 |
|---|---|
| 基本色と透明度 | [基本設定ガイド](/guides/basics) · [基本設定リファレンス](/reference/basics) |
| 影 | [ライティングとシャドウ](/guides/light-and-shadow) · [リファレンス](/reference/light-and-shadow) |
| リムと補助光 | [リム](/guides/rim) · [リファレンス](/reference/rim) |
| スクリーン空間エフェクト | [深度ベースエフェクト](/guides/depth-effects) · [リファレンス](/reference/depth-effects) |
| 発光と特殊効果 · 質感と光沢 | [ディテールマップ](/guides/detail-maps) · [リファレンス](/reference/detail-maps) |
| 顔とアウトライン | [キャラクター表現](/guides/character) · [アウトライン](/guides/outline) |

:::info[現在の配布は BRP オープンベータです]
Built-in Render Pipeline 本体のみを配布します。
VRChat クライアントでの動作と実際のアップロードはまだ検証中です。
[現在の制限とリリース](/limitations)を先にお読みください。
:::

<details><summary>オープンベータの条件とライセンス</summary>現在のオープンベータでの商用利用は禁止されています。<a href="/legal/beta-license">ライセンスおよび商用利用のご案内</a></details>

## 助けを得られる場所

[オープンベータ参加案内](https://studioraming.github.io/mingtoon-site/ko/download/) · [BOOTH 商品](https://raming.booth.pm/items/8810209) · [公式 Discord サーバー](https://discord.gg/Zsj6pkWKKs)

バグは Discord のバグ報告チャンネルへお送りください。
次の 5 つを一緒に書いていただくと再現が早くなります。

1. Unity のバージョンと対象プラットフォーム (VRChat PC / Warudo / 一般 Unity)
2. レンダーパイプライン (BRP / URP 12.x)
3. MingToon のバージョン (Manager のはじめにタブの**更新設定**の表示値)
4. Console ログの全文
5. 再現手順
