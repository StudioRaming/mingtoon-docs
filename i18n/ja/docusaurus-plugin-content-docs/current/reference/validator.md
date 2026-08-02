---
id: validator
title: Validate Project コード
sidebar_position: 8
---

# Validate Project コード

`Tools > Studio Raming > MingToon > Validate Project` が報告するコード全体です。コードで検索してください。

:::note[この検査は読み取り専用です]
何も修正や削除をしません。報告のみで対応は人が行います。
:::

<!-- SCREENSHOT: Validate Project 結果ウィンドウ -->

---

## 環境

### MING-ENV-UNITY-VERSION

**エラー。** エディタストリームがサポート範囲外です。

サポートストリームは **2021.3** と **2022.3** の両方です。その他のストリームではシェーダコンパイル結果が異なり、ルックが変わるまたは破損する可能性があります。

**対応** — Unity Hub から 2021.3 または 2022.3 エディタでプロジェクトを開いてください。ターゲット別の推奨は[サポート環境](/platforms/compatibility#unity-버전)にあります。

### MING-VRC-UNITY-VERSION {#ming-vrc-unity-version}

**警告。** VRC SDK が含まれているのにエディタが VRChat SDK 検証済みバージョン(2022.3.22f1)のストリームではありません。

> MingToon の VRChat 連携は**2022.3 ストリームでのみコンパイル**されるため、このプロジェクトには**アバタアップロードサポートがありません。** その他のターゲットは影響を受けません。

**対応** — VRChat アバタを作成するプロジェクトなら 2022.3.22f1 に移してください。VRChat が対象でなければ無視してかまいません。

参照: [VRChat 現在の Unity バージョン](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)

### MING-ENV-BUILD-TARGET

**エラー。** 現在のビルドターゲットがシェーダモデル 4.5 を保証していません。

MingToon の全パスは `#pragma target 4.5` を宣言します。このようなターゲットでは **SubShader が完全に脱落し、ビルドで全 MingToon マテリアルがマゼンタで描画されます。**

**対応** — `File > Build Settings` でプラットフォームを Windows / macOS / Linux に戻してください。Android/Quest・iOS・WebGL はサポートされていません。

---

## レンダーパイプライン

### MING-PIPELINE-UNSUPPORTED

**エラー。** サポートされていないレンダーパイプラインアセットです。MingToon は Built-in RP とバージョンが固定された URP バックエンドのみをサポートするため、**ここでは MingToon マテリアルは描画されません。**

**対応** — `Project Settings > Graphics` と活性 Quality レベルに URP アセットを指定するか、その項目を空にして Built-in を使用してください。

### MING-URP-VERSION-UNSUPPORTED

**エラー。** インストールされた Universal RP パッケージがサポート範囲外です。URP バックエンドがその範囲に合わせてコンパイルされるため、範囲外ではマテリアルがコンパイルに失敗するか、アウトラインなしで描画される可能性があります。

**対応** — `Window > Package Manager > Universal RP` で範囲内のバージョンをインストールするか、プロジェクトを Built-in に戻してください。

---

## シェーダ

### MING-SHADER-MISSING

**エラー。** MingToon シェーダがプロジェクトで見つかりません。どのマテリアルもこのシェーダで描画できません。

**対応** — `Assets/StudioRaming/MingToon/Shaders` を再度インポートし、Console のシェーダコンパイルエラーを読んでください。URP プロジェクトなら URP バックエンドフォルダがインポートされているかも確認します。

### MING-SHADER-UNSUPPORTED

**エラー。** このエディタまたは GPU がシェーダをサポートしていないため、**そのシェーダを使用するすべてのマテリアルがマゼンタで描画されます。**

**対応** — シェーダアセットを選択してインスペクタ上部のコンパイルエラーを読み、`Project Settings > Player > Other Settings > Graphics APIs` がシェーダモデル 4.5 をサポートしているか確認してください(Direct3D11 以上)。

### MING-SHADER-PASS-MISSING

**エラー。** シェーダにこのバックエンドが要求するレンダーパスがありません。

:::danger[静かに消えます]
**アウトライン・キャスト影・深度プリパスの描画が止まるのに、その項目のコントロールは編集可能なままです。** 値を変更しても何も起こらない原因になります。
:::

**対応** — リリースパッケージから `Assets/StudioRaming/MingToon/Shaders` を復旧し、マテリアルがプロジェクトレンダーパイプラインに合ったシェーダを使用しているか確認してください。

### MING-SHADER-PROPERTY-MISSING

**エラー。** シェーダがこのバージョンのエディタが要求するプロパティを宣言していません。色ブレンドプロパティがないと、**色隣のブレンドモードと不透明度が何もしません。**

**対応** — リリースパッケージから Shaders フォルダを復旧してから再検証してください。

---

## マテリアル

### MING-MAT-NON-FINITE

**エラー。** マテリアルに有限でない数値(NaN / Infinity)が含まれています。照明と画面空間計算全体を汚染する可能性があります。

**対応** — 描画またはベイク前にそのプロパティを正常値に戻してください。レポートにプロパティ名が出ます。

### MING-MAT-COLOR-MASK-ZERO

**エラー。** `_ColorMask` が 0 なので**メッシュが描画され遮蔽されますが、画面には何も描画されません。**

**対応** — `サーフェス描画 > 고급 컬러 버퍼`で`カラーマスク`を RGBA(15)に戻してください。

### MING-MAT-OPAQUE-ZWRITE-OFF

**エラー。** 不透明レンダキューなのに深度を記録していません(`_ZWrite` が 0)。他の不透明メッシュと**ソートがランダムになり、すべてのカメラ深度エフェクトがこのメッシュを通して読みます。**

**対応** — `サーフェス描画 > 고급 컬러 버퍼`で`深度書き込み`を On にするか、実際に望む透明サーフェスモードを選択してください。

### MING-MAT-TRANSPARENT-DEPTH-EFFECTS

**エラー。** 透明キューでカメラ深度エフェクトを使用しています。ソート順と自己深度が不安定なため**深度リムと 2D シャドウがちらついたり背後のサーフェスを読みます。**

**対応** — このマテリアルで 2 つのモジュールをオフにするか、サーフェスモードを不透明 / カットアウトに変更してください。半透明が必要なら `透明・アウトライン用深度記録` が使えます。 → [基本設定](/guides/basics#1-표면-모드부터-정합니다)

### MING-MAT-CUTOUT-CUTOFF-ZERO

**エラー。** カットアウトなのに`アルファカットオフ`が 0 なので**何もカットされません。** 完全に透明なテクセルまで影深度が記録され**メッシュが矩形の単一影を落とします。**

**対応** — `アルファカットオフ` を 0 より上げてください(0.5 が一般的な開始点)。または別のサーフェスモードを選択します。

---

## URP レンダラ機能

### MING-URP-DEPTH-FEATURE-MISSING

**エラー。** URP マテリアルが深度リムまたは 2D シャドウを使用しているのに必要な Renderer Feature がなく、**2 つのエフェクトが何も描画されません。** 3 つのケースがあります。

| 状況 | 対応 |
|---|---|
| MingToon URP バックエンドアセンブリがロードされていない | サポート範囲内の URP バージョンをインストールしてください |
| 活性 URP アセットに renderer data がない | URP アセットの Renderer List に Universal Renderer Data を追加してから以下のメニューを実行 |
| renderer data で機能が非活性 | `Tools > Studio Raming > MingToon > URP > Install Depth Effects Renderer Feature` |

:::caution[活性 URP アセットの**すべて**のレンダラに機能が必要です]
1 つのレンダラにのみインストールすると他のレンダラではエフェクトが描画されず、コントロールは編集可能なままです。
:::

### MING-URP-OUTLINE-FEATURE-MISSING

**エラー。** 上記と同じ構造ですが対象はアウトラインパスです。**アウトラインが描画されません。**

**対応** — `Tools > Studio Raming > MingToon > URP > Install Outline Renderer Feature`.

---

## ランタイム

### MING-RUNTIME-PROVIDER-MISSING

**エラー。** Built-in RP 深度提供者が見つからないか形状が変わっています。どのカメラも深度テクスチャをリクエストされないため、**深度リム・2D シャドウ・深度ベースアウトラインが設定に無関係に空です。**

| 詳細 | 意味 |
|---|---|
| タイプなし | MingToon ランタイムスクリプトがないか、コンパイルに失敗 |
| Component 派生でない | ランタイムが修正されている |
| 必須メソッドなし | ランタイムが修正されている |

**対応** — `Assets/StudioRaming/MingToon/Runtime` を再度インポートしてコンパイルエラーをクリアしてください。修正した場合、リリースパッケージから復旧してください。

---

## シーン / カメラ

### MING-SCENE-NO-CAMERA

ロードされた Game カメラがなく、2D エフェクトが依存するカメラ深度状態を確認できませんでした。

**対応** — 実際に作業しているシーンを開くか LookDev シーンを作成してから再検証してください。

### MING-SCENE-CAMERA-DEPTH-OFF

Game カメラで深度テクスチャがオフになっています。

**対応** — シーンに `Studio Raming/MingToon/Depth Texture Provider` を配置してください。 → [深度ベースエフェクト](/guides/depth-effects#플랫폼별-깊이-확보)

---

## コードが出ないのに画面がおかしいとき

Validator は**静的に確認できるもののみ**を見ます。以下は検証を通過しても発生する可能性があります。

| 症状 | ドキュメント |
|---|---|
| 値を変更しても反応がない | [トラブルシューティング — 値が効かない](/troubleshooting#아무-값도-안-먹힌다) |
| VRChat 通常画面で深度エフェクトがない | [VRChat](/platforms/vrchat#깊이-효과가-어디까지-보장되나) |
| アウトラインが角ばった部分で切れる | [メッシュ UV ベイク](/guides/mesh-bakes#아웃라인-스무스-노멀-uv8) |
