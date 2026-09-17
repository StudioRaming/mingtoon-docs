---
id: first-material
title: Manager ではじめる
sidebar_position: 2
---

# Manager ではじめる

> このページを終えると、アバター 1 体が MingToon マテリアルに変わります。
> 約 15 分かかります。

## 始める前の準備

- [インストール](/getting-started/installation)を終えたプロジェクト
- シーンに置いたアバター 1 体
- プロジェクトのバックアップ

## 1. アバタールートに Manager を追加

1. Hierarchy でアバターの最上位オブジェクトを選びます。
2. メニューから `GameObject > MingToon > Add MingToon Manager` を押します。

Inspector に MingToon Manager が現れ、タブが 3 つ見えれば正常です。
タブ名は**はじめに** · **外観・ベイク** · **最適化**です。

![アバタールートに MingToon Manager が付き、タブが 3 つ見える Inspector](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-01-add-manager.png | Hierarchy에서 아바타 루트를 고른 상태로 Inspector에 MingToon Manager와 시작하기·룩·베이크·최적화 탭이 보이는 화면 | 1200x700 -->

:::caution[作業が終わっても削除しないでください]
Manager は、アップロード最適化がどこまでをこのアバターと見なすかを記憶します。
衣装だけを編集するときも、アバターの最上位に置いておきます。
:::

## 2. 顔と肌の Renderer を指定

**はじめに**タブの **1. 顔・スキンの対象を指定**を探します。

1. **顔Rendererを直接指定**に顔メッシュを入れます。
2. **肌Rendererを直接指定**に素肌メッシュを入れます。
3. **指定したRendererに役割を付与**を押します。

スロット一覧に `Face` と `Skin` が表示されれば正常です。
髪と衣装のスロットは `Regular` のままにします。

![スロット一覧に Face と Skin の役割が表示されたはじめにタブ](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-02-face-skin.png | 시작하기 탭의 "1. 얼굴 · 스킨 대상 지정" 카드에서 슬롯 목록에 Face·Skin·Regular가 표시된 상태 | 1200x700 -->

髪と衣装だけを変換する場合は、2 つの欄を空のままにしてください。
詳しい役割の指定は[役割指定の詳細](/workflow/character-manager#얼굴--피부-지정--가장-중요한-단계)をご覧ください。

## 3. 変換プリセットを選ぶ

同じタブの **2. ルックを選択 → 変換**を探します。

1. **変換時のルックプリセット**で**ベーシックトゥーン High** を選びます。
2. **色調プリセット**で**既存の値を使用**を選びます。

ベーシックトゥーン High は深度エフェクトをオンにする基準ルックです。
軽くしたい場合はベーシックトゥーン Low を選んでください。
既存の値を使用は、元のマテリアルから読み取った色と影の値をそのまま残します。

![変換時のルックプリセットと色調プリセットが選択された画面](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-03-presets.png | 시작하기 탭의 "2. 룩 선택 → 변환" 카드에서 변환 시 룩 프리셋이 베이직툰 High, 색감 프리셋이 기존값 사용인 상태 | 1200x700 -->

## 4. 変換を実行

同じ **2. ルックを選択 → 変換**の中の**子マテリアルをMingToonへ変換**を押します。

元のマテリアルは削除されません。
編集用の MingToon マテリアルが新しく作られ、スロットだけが変わります。

![変換ボタンを押したあとに結果の行が表示された画面](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-04-convert.png | "2. 룩 선택 → 변환" 카드의 하위 재질을 MingToon으로 변환 버튼과 그 아래 변환 결과 줄이 보이는 상태 | 1200x700 -->

## 5. 変換結果を確認

結果の行から `変換済みスロット` · `除外スロット` · `失敗スロット` の個数を読みます。
失敗スロットが 0 より大きい場合は、そのマテリアルを先に確認してください。
除外スロットは、パーティクルのように意図的に触らない系統です。

![変換済みスロットと除外・失敗スロットの個数が表示された結果パネル](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-05-result.png | 변환 결과 패널에 변환된 슬롯·제외한 슬롯·실패한 슬롯 개수가 표시된 상태 | 1200x700 -->

どのマテリアルが除外されるかは[変換されないスロット](/workflow/character-manager#변환되지-않는-슬롯)にあります。

## 6. クイック設定で整える

顔マテリアルを 1 つ選び、Inspector の**クイック設定**を開きます。

行に `(モジュールOFF)` が見えたら、隣の**このモジュールをオン**を先に押します。

1. **1段目の影のぼかし**を 0.05 に下げます。既定値は 0.3 です。
2. **アウトライン幅**を 2 に上げます。既定値は 1 です。
3. **ベースマップ HSVG** の彩度を 0.05 ずつ動かしてみます。

影の境界がはっきりし、輪郭線が太くなれば成功です。

![クイック設定で影の境界とアウトラインを調整した顔](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-06-quick-settings.png | 빠른 설정 카드를 펼치고 1차 그림자 번짐과 아웃라인 폭을 조정한 얼굴 클로즈업 | 1200x700 -->

## うまくいったかの確認

- アバターがマゼンタ（ピンク色）ではありません。
- 顔スロットが `Face` と表示されます。
- 失敗スロットが 0 個です。
- クイック設定で値を変えると画面がすぐ変わります。

合わない項目があれば[トラブルシューティング](/troubleshooting#conversion)へ進んでください。

編集を終えたら、いつもどおり VRC SDK のアップロードや WARUDO モードのビルドを実行してください。
自動最適化はそのときにかかります。手動 Bake を先に押す必要はありません。

## 次に読む文書

[基本設定ガイド](/guides/basics) · [インスペクターの使い方](/guides/inspector) · [MingToon Manager](/workflow/character-manager)
