---
id: validator
title: Validate Project コード
sidebar_position: 8
---

# Validate Project

Tools > Studio Raming > MingToon > Validate Projectのコードから探してください。検査は結果を報告し、自動修正しません。**以下の重要度は現在のValidatorソースに対応します。** 警告も見た目やビルドに影響する場合があります。

## MING-ENV-UNITY-VERSION {#ming-env-unity-version}

**エラー.** Unityが対応する2021.3・2022.3ストリーム外です。対象に合う対応エディターを使用してください。

## MING-VRC-UNITY-VERSION {#ming-vrc-unity-version}

**警告.** VRC SDKが検出されましたが、UnityストリームがMingToonのVRChat連携と一致しません。パッケージ規則は2022.3.22f1を記録しています。移行前にVCCと現在のSDK案内を確認してください。

## MING-ENV-BUILD-TARGET {#ming-env-build-target}

**エラー.** ビルド対象が対応範囲外です。Windows・macOS・Linuxのデスクトップ対象とGraphics APIを確認してください。Android/Quest・iOS・WebGLはMingToonの直接出力対象ではありません。

## MING-PIPELINE-UNSUPPORTED {#ming-pipeline-unsupported}

**エラー.** 有効なパイプラインがBuilt-inまたは対応URPではありません。Graphicsと現在のQualityのRender Pipeline Assetを確認してください。

## MING-URP-VERSION-UNSUPPORTED {#ming-urp-version-unsupported}

**エラー.** URPのバージョンがバックエンドの対応範囲外です。インストール済みバックエンドの要件と対応環境ガイドを合わせてください。

## MING-SHADER-MISSING {#ming-shader-missing}

**エラー.** 必要なシェーダーが見つかりません。インストール先、バックエンド、Consoleのコンパイルエラーを確認し、使用した導入方法で修復してください。

## MING-SHADER-UNSUPPORTED {#ming-shader-unsupported}

**エラー.** 現在の環境でシェーダーがサポートされていません。コンパイルエラー、GPU・Graphics API、パイプラインの一致を確認してください。

## MING-SHADER-PASS-MISSING {#ming-shader-pass-missing}

**エラー.** バックエンドが要求するパスがありません。報告されたパスを確認し、シェーダーとエディターファイルを同じリリースに復旧してください。

## MING-SHADER-PROPERTY-MISSING {#ming-shader-property-missing}

**エラー.** エディターが期待するプロパティがありません。部分更新や異なるリリースの混在を確認してください。

## MING-SHADER-FRESNEL-AREA-RANGE {#ming-shader-fresnel-area-range}

**エラー.** 領域調整が期待されるRange(0, 1)と異なります。報告されたプロパティをリリース版と比較して修復してください。

## MING-SHADER-PERF-DISTANCE-RANGE {#ming-shader-perf-distance-range}

**エラー.** 性能距離の範囲が不正です。_PerfDistanceMaxはRange(1, 50)、_PerfDistanceScaleはRange(0, 2)です。同じリリースのファイルで修復してください。

## MING-MAT-NON-FINITE {#ming-mat-non-finite}

**警告.** マテリアル値がNaNまたはInfinityです。報告されたプロパティを有限値に戻してから描画とベイクを確認してください。

## MING-MAT-COLOR-MASK-ZERO {#ming-mat-color-mask-zero}

**警告.** Color Maskが0で色チャンネルを書きません。意図した特殊設定でなければ高度なカラーバッファー設定でRGBA(15)に戻してください。

## MING-MAT-OPAQUE-ZWRITE-OFF {#ming-mat-opaque-zwrite-off}

**警告.** 不透明キューでZWriteがオフです。遮蔽関係が崩れる場合があるため、モードを再適用するか意図した深度設定か確認してください。

## MING-MAT-TRANSPARENT-DEPTH-EFFECTS {#ming-mat-transparent-depth-effects}

**警告.** 透明キューで深度効果が有効です。実際のカメラで自己深度とソートを確認してください。必要なら効果を無効にするか半透明・カットアウトなどへ変更し、奥のレイヤーが隠れないかも確認します。

## MING-MAT-CUTOUT-CUTOFF-ZERO {#ming-mat-cutout-cutoff-zero}

**警告.** カットアウト閾値が0で透明テクセルが残る場合があります。アルファを確認して閾値を上げます。0.5は比較の開始値です。

## MING-MAT-PERF-DISTANCE-ZERO {#ming-mat-perf-distance-zero}

**警告.** 性能距離×倍率が0で、全距離で最軽量段階になります。複数の効果が表示されない場合があります。MLCで制御する意図があるか確認し、そうでなければ倍率を上げてください。

## MING-URP-DEPTH-FEATURE-MISSING {#ming-urp-depth-feature-missing}

**エラー.** URP深度Renderer Featureがないか無効です。対応バックエンドを導入し、有効なURP AssetのRenderer Dataを確認してInstall Depth Effects Renderer Featureを使用してください。

## MING-URP-OUTLINE-FEATURE-MISSING {#ming-urp-outline-feature-missing}

**エラー.** URPアウトラインRenderer Featureがないか無効です。カメラが使うRenderer DataとInstall Outline Renderer Featureを確認してください。

## MING-BAKE-GENERATOR-OUTDATED {#ming-bake-generator-outdated}

**警告.** Manifestの生成器が古い版です。描画できても新しい修正は未反映の場合があります。対象アバターのベイク状態と復元情報を確認して再ベイクしてください。

## MING-RUNTIME-PROVIDER-MISSING {#ming-runtime-provider-missing}

**エラー.** 深度プロバイダーの型や必須メソッドがないか構造が異なります。導入ファイルとコンパイルエラーを確認します。このコードは型の検査で、全カメラの深度欠如を証明するものではありません。

## MING-SCENE-NO-CAMERA {#ming-scene-no-camera}

**警告.** 検査対象の読み込み済みGameカメラがありません。対象シーンを開いて再確認してください。

## MING-SCENE-CAMERA-DEPTH-OFF {#ming-scene-camera-depth-off}

**警告.** 検査したGameカメラが深度を要求していません。一般Unity/WARUDOでは深度プロバイダーを確認し、VRChatではプラットフォームガイドのホストカメラ条件に従ってください。

検査通過は実際の画面やアップロード成功を保証しません。修正後は対象の検査と実際の作業結果を確認してください。

[VRChat](/platforms/vrchat) · [URP / Compatibility](/platforms/compatibility) · [Basic](/guides/basics)
