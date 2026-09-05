---
id: add-ons
title: 別売アドオン
sidebar_label: 別売アドオン
---

すべての商用ライセンスにURPバージョンが含まれます。Personal Streaming・Personal CreatorのEarly Access Founders EditionにはMLCが含まれ、正式リリース後に構成が変更される場合があります。現在のオープンベータでは商用利用は禁止です。[ライセンスと同梱構成](/legal/beta-license)をご確認ください。

# 別売アドオン

MingToon 本体は、以下のアドオンがなくてもインストール・コンパイル・描画できます。各アドオンは、マスク制作、顔 SDF 制作、VRChat ランタイムメニュー制作など、必要なオーサリング機能だけを追加します。MingToon はアセンブリを直接参照せずに導入状況を確認するため、あとから追加・削除してもシェーダー本体は動作します。

## Mask Maker

マテリアルとメッシュを確認しながら MingToon 用マスクを描画・整理する別ツールです。→ [Mask Maker ガイド](/guides/mask-maker)

## Face SDF Studio

ライト方向に応じて変化する顔シャドウ用 SDF テクスチャを作成する別ツールです。作成済みの SDF テクスチャは、このツールがなくても MingToon マテリアルへ直接設定できます。→ [顔 SDF と Face SDF Studio](/guides/face-sdf)

## Ming Light Controller (MLC)

VRChat アバターのライティング・ルック操作メニュー、パラメーター、FX 構成を非破壊で作成する別アドオンです。MLC がなくても MingToon シェーダーと VRChat・WARUDO のビルド深度ライト選択機能は動作します。→ [Ming Light Controller ガイド](/guides/ming-light-controller)

## インストール確認

1. アドオンをインポートし、Unity のコンパイル完了を待ちます。
2. MingToon Inspector または Manager の該当ボタンを開き直します。
3. 案内表示のままなら、まず Console のコンパイルエラーを解消してください。
