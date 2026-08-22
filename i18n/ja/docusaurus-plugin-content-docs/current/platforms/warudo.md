---
id: warudo
title: Warudo
sidebar_position: 3
---

# Warudo

**このドキュメントを終えると** Warudo Modビルド最適化とカメラ深度供給を、それぞれ正しい場所へインストールできます。

:::caution[対応状況]
Warudoは対応対象ですが、実機回帰テストの範囲はVRChatより狭いです。最終ModをWarudoで直接開き、メイン出力と使用するSpout・NDIカメラをすべて確認してください。
:::

## 基準バージョン

| 項目 | 値 |
|---|---|
| Unity | **2021.3.45f2** |
| Warudo Mod SDK | **0.14.3.10** |
| レンダーパイプライン | Built-in (BRP) |

:::danger[VRChatプロジェクトと兼用できません]
VRChatはUnity **2022.3.22f1**、Warudoは**2021.3.45f2**を使用します。対象ごとにプロジェクトを分けてください。
:::

---

## カメラ深度の導入 — WARUDO Depth Bridge {#warudo-depth-bridge}

2D深度リム・2Dシャドウ・インナー2Dエッジ・SSAOなどの画面深度エフェクトには、Warudoカメラの深度テクスチャが必要です。0.1.7パッケージには、これを供給する独立したWarudoプラグインソースが含まれます。

### インストール

1. Unityプロジェクトで`Assets/StudioRaming/MingToon/Docs/Warudo/MingToonWarudoDepthBridge.cs.txt`を探します。
2. このファイルをWarudoインストールフォルダーの`Warudo_Data/StreamingAssets/Playground`へコピーします。
3. ファイル名末尾の`.txt`を外し、`MingToonWarudoDepthBridge.cs`にします。
4. WarudoのPlaygroundプラグインが再読み込みされたら、Consoleで`[MingToon Warudo Depth Bridge] installed`ログを確認します。

:::important[キャラクタープレハブへ付けるコンポーネントではありません]
このファイルはWarudoアプリケーションのPlaygroundで実行されるグローバルプラグインです。キャラクターModフォルダーへ入れたり、プレハブへコンポーネントを追加したりしないでください。以前の`MingToonWarudoRoot`方式の案内は0.1.7ドキュメントで廃止されました。
:::

### 供給するもの

プラグインはレンダー直前ごとに有効な`Game`カメラを確認します。

- 各カメラへ`DepthTextureMode.Depth`を要求します。
- 中央・左・右目のworld-to-view行列をシェーダーグローバル値として渡します。
- メイン画面だけでなく、有効なSpout・NDI・切り替えカメラもカメラごとに処理します。
- カメラが変わっても`Camera.main`一つをキャッシュせず、実際のレンダーカメラを使います。

プラグインはMingToonランタイムアセンブリへ依存しません。Warudoプロジェクトがasmdef配下のスクリプトをModへ含めない条件でも動くよう、独立ファイルとして提供されます。

### 症状から確認

| 症状 | 確認 |
|---|---|
| 深度エフェクトがすべて空 | Playgroundパスと`.cs`拡張子、`installed`ログを確認 |
| メイン画面は正常だがSpout・NDI出力だけ異なる | 該当出力カメラの`depth enabled for camera=...`ログを確認 |
| ノーマルアウトラインだけ見え、内部線がない | ノーマルアウトラインには深度が不要なので、まずBridgeのロード有無を確認 |

---

## Warudo Modビルド

`Warudo > Build Mod`を実行すると、MingToonのUModビルドフックが自動最適化を適用します。Unity標準の`IPreprocessBuildWithReport`ではなく、UModのprocessor/post-processor経路を使います。

### 処理範囲

- 可能ならUModが書き出すGameObjectアセットからビルドルートを探し、**そのキャラクターだけ**を最適化します。
- 生成したシェーダーとテクスチャをUModビルドアセット一覧へ追加します。
- ビルド終了または失敗後にオーサリング用マテリアルを復元します。
- 書き出すルートを判別できない場合は、ロード済みシーンのMingToonマテリアルへフォールバックし、Consoleへ警告します。

Consoleで`[MingToon] Auto optimize`のサマリーと、ビルド後の`[MingToon] Restored authored materials.`を確認してください。エラーや復元失敗があれば、そのビルドは使用せず原因を先に解決してください。

:::note[手動Bakeは基本手順ではありません]
Warudo書き出しもビルド時の自動最適化を使います。bakedマテリアルアセット自体が必要な特殊な場合を除き、[手動Bake](/workflow/bake-and-restore)を先に実行する必要はありません。
:::

---

## ライティングの違い

- `VRC Light Volumes`はVRChatワールド用です。Warudoでは無効にし、Unity Light Probeとシーン照明を使ってください。
- Built-inのポイント・スポット追加光はForwardAddパスへ入ります。マテリアルの`追加光を受ける`、`追加光強度`、トゥーン境界設定で調整します。
- WARUDO（Built-in）では、ポイント・スポット追加光が作るシャドウ内部反射に`キャストシャドウ内の表示量`と`2Dシャドウ内の表示量`フィルターは適用されません。
- 複数カメラを使う場合は、各出力で深度エフェクトと透明ソートを個別に確認してください。

## 書き出しチェックリスト

- Unity 2021.3.45f2とBuilt-inシェーダーを使いました。
- `MingToonWarudoDepthBridge.cs`をWarudo Playgroundへインストールしました。
- `Warudo > Build Mod`のConsoleに最適化・復元エラーがありません。
- メイン画面と実際の送出カメラで2D深度リム・2Dシャドウ・内部境界を確認しました。
- シーン照明を制御しにくい場合は`ベース色保持`と`最終最小明るさ`を調整しました。

## 次へ

[ビルド時の自動最適化](/workflow/build-optimization)・[深度ベースエフェクト](/guides/depth-effects)・[ライティングとシャドウ](/guides/light-and-shadow)