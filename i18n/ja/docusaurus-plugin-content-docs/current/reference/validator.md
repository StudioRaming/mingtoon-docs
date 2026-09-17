---
id: validator
title: Validate Projectコード
sidebar_position: 8
---

# トラブルシューティング: Validate Projectコード

`StudioRaming > MingToon > Validate Project` を実行すると、コードの付いた行が出ます。
このページでそのコードを探してください。検査は報告するだけで、何も修正しません。

コードは3つのまとまりに分かれます。

- **自分の環境の問題** — Unity、ビルドターゲット、パイプライン。自分で設定を変えて直します。
- **自分のマテリアルの問題** — 値が1つ間違っています。インスペクターで直します。
- **インストールの破損** — ファイルがない、または手が加えられた状態です。再インストールして直します。

各項目の最後の行は、そのコードを無視してよいかを示します。

---

## 自分の環境の問題

### MING-ENV-UNITY-VERSION {#ming-env-unity-version}

**エラー** — 今使っているUnityが、MingToonがビルド・テストしているLTSストリームではありません。

1. Unity Hubでサポート対象ストリームのエディターをインストールします。
2. そのエディターでこのプロジェクトを開き直します。
3. 対応バージョンは [対応環境](/platforms/compatibility) で確認してください。

無視してよいか: いいえ。別のストリームではシェーダーのコンパイルが変わり、ルックが変わったり壊れたりします。

### MING-VRC-UNITY-VERSION {#ming-vrc-unity-version}

**警告** — VRChat SDKはありますが、SDKが検証したUnityバージョンではありません。

1. VCCでこのプロジェクトのUnityバージョンを確認します。
2. [VRChat公式のUnity案内](https://creators.vrchat.com/sdk/upgrade/current-unity-version/) に合わせます。
3. プロジェクトを移す前にバックアップしてください。

無視してよいか: VRChatにアップロードしないなら無視して構いません。
アップロードする予定なら、この状態ではアバターのアップロードはサポート対象外です。

### MING-ENV-BUILD-TARGET {#ming-env-build-target}

**エラー** — 今のビルドターゲットがシェーダーモデル4.5を保証できません。

1. `File > Build Settings` を開きます。
2. プラットフォームをWindows、macOS、Linuxのいずれかに戻します。

無視してよいか: いいえ。このままビルドすると、MingToonのマテリアルがすべてマゼンタで出ます。
Quest/Androidは [VRChat互換性ルール](/internals/vrc-rules) を見てください。

### MING-PIPELINE-UNSUPPORTED {#ming-pipeline-unsupported}

**エラー** — アクティブなレンダーパイプラインが、Built-inでもサポート対象のURPでもありません。

1. `Project Settings > Graphics` のRender Pipeline Assetを確認します。
2. 現在のQualityレベルのRender Pipeline Assetも併せて確認します。
3. どちらか一方に残っているだけでも、このコードが出ます。

無視してよいか: いいえ。このパイプラインでは、どのMingToonマテリアルも描画されません。

### MING-URP-VERSION-UNSUPPORTED {#ming-urp-version-unsupported}

**エラー** — インストールされているUniversal RPパッケージがサポート範囲外です。

1. `Window > Package Manager > Universal RP` を開きます。
2. サポート範囲内のバージョンに変更します。範囲はメッセージに記載されています。

無視してよいか: いいえ。マテリアルがコンパイルに失敗するか、アウトラインなしで出ます。

---

## 自分のマテリアルの問題

6つのコードはすべて値1つが原因で、すべてインスペクターで直します。
メッセージの前に、どのマテリアルかの名前が付きます。

### MING-MAT-NON-FINITE {#ming-mat-non-finite}

**警告** — マテリアルの値に、計算が壊れた数値（NaN、Infinity）が入っています。

1. メッセージに出ている項目を探します。
2. その項目を右クリックして既定値に戻します。
3. 画面とベイクの結果を再確認します。

無視してよいか: いいえ。照明とスクリーンスペースの計算全体が汚染されます。

### MING-MAT-COLOR-MASK-ZERO {#ming-mat-color-mask-zero}

**警告** — **カラーマスク** が0のため、このマテリアルが画面に何の色も記録しません。
メッシュは描画され後ろを隠しますが、見えはしません。

1. **サーフェス描画** > **高度なカラーバッファ** を開きます。
2. **カラーマスク** を15に戻します。

無視してよいか: 遮蔽専用のマテリアルを意図的に作ったのでなければ、いいえ。

### MING-MAT-OPAQUE-ZWRITE-OFF {#ming-mat-opaque-zwrite-off}

**警告** — 不透明キューなのに深度を記録していません。

1. **サーフェス描画** > **高度なカラーバッファ** で **ZWrite** をオンにします。
2. または、本来意図した透明のサーフェスモードを選びます。

無視してよいか: いいえ。他の不透明メッシュとの前後関係がランダムになり、
カメラ深度を使う効果が、このメッシュを通り抜けて読み取ります。

### MING-MAT-TRANSPARENT-DEPTH-EFFECTS {#ming-mat-transparent-depth-effects}

**警告** — 透明キューで深度エフェクトをオンにしています。

1. このマテリアルでデプスリムライトとデプスシャドウをオフにします。
2. または、サーフェスモードを不透明かカットアウトに変えます。

無視してよいか: いいえ。2つの効果がちらついたり、この表面の後ろ側を読み取ったりします。

### MING-MAT-CUTOUT-CUTOFF-ZERO {#ming-mat-cutout-cutoff-zero}

**警告** — カットアウトなのに **アルファカットオフ** が0のため、何も切り取られません。

1. **アルファカットオフ** を0.5に上げてみます。
2. 髪が疎になりすぎる場合は0.3まで下げます。

無視してよいか: いいえ。完全に透明な部分まで影を落とすため、
メッシュが四角い塊の影を作ります。

### MING-MAT-PERF-DISTANCE-ZERO {#ming-mat-perf-distance-zero}

**警告** — **パフォーマンス距離 (m)** × **パフォーマンス距離倍率** が0のため、すべての距離で最も軽い段階で描画されます。
深度エフェクト、PBR、MatCapの2層以上、ノーマルの追加層、トゥーンスペキュラー、グリッター、スクリーントーンが出ません。

1. `マスター調整` タブを開きます。
2. **パフォーマンス距離倍率** を1に上げます。

無視してよいか: 別売アドオンのMing Light Controllerを使う構成なら正常です。
MLCがゲーム内でこの倍率を調整するためです。それ以外ではいいえ。

---

## シーンとURPの設定

### MING-URP-DEPTH-FEATURE-MISSING {#ming-urp-depth-feature-missing}

**エラー** — 深度エフェクト用のURP Renderer Featureがないか、オフになっています。

1. `StudioRaming > MingToon > URP > Install Depth Effects Renderer Feature` を実行します。
2. アクティブなURP AssetのRenderer Listにある **すべての** Renderer Dataに必要です。
3. 機能のチェックボックスはオンのままにしておきます。

無視してよいか: URPで深度エフェクトを使うなら、いいえ。
コントロールは動き続けますが、画面には何も描画されません。

### MING-URP-OUTLINE-FEATURE-MISSING {#ming-urp-outline-feature-missing}

**エラー** — アウトライン用のURP Renderer Featureがないか、オフになっています。

1. `StudioRaming > MingToon > URP > Install Outline Renderer Feature` を実行します。
2. 実際のカメラが使うRenderer Dataに付いているか確認します。

無視してよいか: URPでアウトラインを使うなら、いいえ。

### MING-SCENE-NO-CAMERA {#ming-scene-no-camera}

**警告** — 検査するGameカメラが、開いているシーンにありません。

1. 実際に作業しているシーンを開きます。
2. または、現在のシーンにCameraを1つ追加します。
3. もう一度検査します。

無視してよいか: 空のシーンで検査したなら無視して構いません。
深度の状態だけが確認できなかっただけで、他の項目は正常に検査されています。

### MING-SCENE-CAMERA-DEPTH-OFF {#ming-scene-camera-depth-off}

**警告** — 検査したカメラが深度テクスチャを要求していません。

1. 深度エフェクトをオンにしたマテリアルが1つもなければ、これが正常です。
2. MingToonはマテリアルが必要とするときにカメラへ深度を要求します。
3. Playモードで深度エフェクトが見えない場合は、カメラよりもマテリアルの **深度エフェクト** マスターを先に確認してください。

無視してよいか: ほとんどの場合そうです。上の3番を確認しても出ない場合は
[深度ベースのエフェクト](/guides/depth-effects) を見てください。

### MING-BAKE-GENERATOR-OUTDATED {#ming-bake-generator-outdated}

**警告** — ベイクの記録が以前のバージョンで作られています。

1. MingToonマネージャーで、該当するアバターを再ベイクします。
2. ベイクの状態と復元情報を先に確認してください。

無視してよいか: いいえ。画面には以前の結果が表示され続けますが、
その間に修正された内容が1つも入っておらず、ビルド準備の検査で拒否されます。

---

## インストールの破損

以下のコードはすべて原因が同じです。
シェーダーやランタイムのファイルがない、ツールより古い、または直接修正された状態です。

対処も1つです。

1. リリースパッケージから `Assets/StudioRaming/MingToon` を再インポートします。
2. Consoleのコンパイルエラーをすべてなくします。
3. Validate Projectを再実行します。

無視してよいか: すべていいえ。インスペクターのコントロールは動き続けるのに、画面は変わりません。

7つのコードは、それぞれ何がないという意味なのかだけが異なります。

### MING-SHADER-MISSING {#ming-shader-missing}

**エラー** — シェーダーファイル自体をプロジェクトで見つけられませんでした。
URPプロジェクトなら、URPバックエンドのフォルダーがインポートされているかも確認してください。

### MING-SHADER-UNSUPPORTED {#ming-shader-unsupported}

**エラー** — シェーダーがこの環境でコンパイルされません。
ConsoleのコンパイルエラーとグラフィックスAPIを併せて確認してください。

### MING-SHADER-PASS-MISSING {#ming-shader-pass-missing}

**エラー** — アウトライン、影の投下、深度プリパスのパスがありません。
マテリアルがこのプロジェクトのパイプラインに合うシェーダーを使っているかも確認してください。

### MING-SHADER-PROPERTY-MISSING {#ming-shader-property-missing}

**エラー** — インスペクターが記録しようとする項目が、シェーダーに宣言されていません。
シェーダーがエディターツールより古いか、直接修正された状態です。

### MING-SHADER-FRESNEL-AREA-RANGE {#ming-shader-fresnel-area-range}

**エラー** — 領域調整の項目が0～1の範囲で宣言されていません。

### MING-SHADER-PERF-DISTANCE-RANGE {#ming-shader-perf-distance-range}

**エラー** — パフォーマンス距離の項目の範囲宣言が異なります。
こうなると、マスター調整タブのスライダーとMing Light Controllerのダイヤルがずれます。
2つが互いに違う距離を指してしまいます。

### MING-RUNTIME-PROVIDER-MISSING {#ming-runtime-provider-missing}

**エラー** — カメラに深度をオンにするランタイムスクリプトがないか、構造が異なります。
この検査はスクリプトだけを見ます。実際のカメラに深度がないという意味ではありません。

:::note[シェーダーコードは手で修正しないでください]
上のコードが出るプロジェクトは、ほぼ必ず部分的なアップデートをしたか、ファイルを直接編集した場合です。
同じリリースのファイルでまるごと戻すのが最も速い方法です。
:::

---

検査を通っても、実際の画面とアップロードの成功が保証されるわけではありません。
修正したあとは、検査と実際の結果を併せて確認してください。

## 関連ページ

- [トラブルシューティング](/troubleshooting)
- [VRChat](/platforms/vrchat)
- [対応環境](/platforms/compatibility)
- [VRChat互換性ルール](/internals/vrc-rules)
