---
id: warudo
title: Warudo
sidebar_position: 3
---

# Warudo

> このページはWARUDOでMingToonキャラクターを使う方のためのものです。
> 深度供給プラグインのインストールと、モッドビルドの確認を扱います。

## 基準バージョン

| 項目 | 値 |
|---|---|
| Unity | **2021.3.45f2** |
| WARUDO Mod SDK | **0.14.3.10** |
| レンダーパイプライン | Built-in (BRP) |

:::danger[VRChatプロジェクトと兼用することはできません]
VRChatはUnity 2022.3.22f1、WARUDOは2021.3.45f2を使います。対象ごとにプロジェクトを分けてください。
:::

---

## カメラ深度のインストール — WARUDO Depth Bridge {#warudo-depth-bridge}

デプスリムライト・デプスシャドウ・インナーアウトライン・SSAOには、WARUDOのカメラの深度テクスチャが必要です。

パッケージには、その深度を供給する独立プラグインのソースが入っています。

### これはキャラクターではなくWARUDO本体にインストールします

:::caution[プレハブに付けるコンポーネントではありません]
このファイルは、WARUDOアプリケーションのPlaygroundで動くグローバルプラグインです。
キャラクターのモッドフォルダーに入れたり、プレハブにコンポーネントとして追加したりしないでください。
:::

### インストール

1. Unityプロジェクトで `Assets/StudioRaming/MingToon/Docs/Warudo/MingToonWarudoDepthBridge.cs.txt` を探します。
2. このファイルをWARUDOのインストールフォルダーの `Warudo_Data/StreamingAssets/Playground` にコピーします。
3. ファイル名末尾の `.txt` を削除して `MingToonWarudoDepthBridge.cs` にします。
4. WARUDOを再起動し、Consoleで `[MingToon Warudo Depth Bridge] installed` のログを確認します。

プラグイン一覧に `MingToon Warudo Depth Bridge` が表示されれば成功です。

![WARUDO 설치 폴더의 Warudo_Data/StreamingAssets/Playground 안에 MingToonWarudoDepthBridge.cs 파일이 놓인 탐색기 화면](/img/placeholder.png)
<!-- CAPTURE: platforms/warudo-01-playground-folder.png | Warudo_Data/StreamingAssets/Playground 폴더에 MingToonWarudoDepthBridge.cs가 있는 탐색기 + 옆에 WARUDO 플러그인 목록 | 1200x700 -->

### 何を供給するのか

プラグインは描画の直前ごとに、アクティブなGameカメラを確認します。

- 各カメラに深度テクスチャを要求します。
- 中央・左目・右目の視点行列をシェーダーのグローバル値として渡します。
- メイン画面だけでなく、アクティブなSpout・NDI・トランジションカメラもカメラごとに処理します。
- カメラが切り替わっても1つをキャッシュせず、実際に描画しているカメラを使います。

プラグインはMingToonのランタイムアセンブリに依存しません。そのため独立したファイルとして提供しています。

### 症状で確認する

| 症状 | 確認すること |
|---|---|
| 深度エフェクトがすべて出ない | Playgroundのパス、 `.cs` 拡張子、 `installed` ログ |
| メイン画面は正常なのにSpout・NDIだけ違う | その出力カメラの `depth enabled for camera=` ログ |
| ノーマルアウトラインだけ見えて内側の線がない | ノーマルアウトラインに深度は不要です。まずBridgeが読み込まれているか |

→ [トラブルシューティング — WARUDO](/troubleshooting#warudo)

---

## WARUDOモッドのビルド

`Warudo > Build Mod` を実行すると、MingToonのビルドフックが自動最適化をかけます。

Unityの一般的なビルドコールバックではなく、UModのprocessor経路を使います。

### 処理の範囲

- UModが書き出すGameObjectからビルドルートを探し、そのキャラクターだけを最適化します。
- 生成したシェーダーとテクスチャをUModのビルドアセット一覧に追加します。
- ビルドが終了または失敗したら、オーサリング用マテリアルを復元します。
- 書き出すルートを判別できない場合は、読み込まれているシーンのMingToonマテリアルにフォールバックし、警告を残します。

### 確認するログ

| ログ | 意味 |
|---|---|
| `[MingToon] Warudo mod build processor entered` | フックが実行されました |
| `[MingToon] Applied auto optimize and registered N generated assets.` | 最適化がかかりました |
| `[MingToon] Restored authored materials.` | オーサリング状態に戻りました |
| `[MingToon] Could not restore authored materials.` | 復元に失敗しました。このビルドは使わないでください |

:::note[手動のBakeは標準の手順ではありません]
WARUDOの書き出しもビルド時の自動最適化を使います。baked マテリアルアセットそのものが必要なときにだけ手動Bakeを使ってください。
:::

→ [手動Bakeと復元](/workflow/bake-and-restore)

### 深度ライト

WARUDOのビルドでも、深度エフェクトを使う場合は深度ライトを一緒に載せます。

MingToonマネージャーの **ビルド時に深度ライトを削除** で強制的に除外できます。
→ [VRChat深度ライト](/platforms/vrchat#vrchat-깊이-라이트)

---

## 照明の違い

- **VRCライトボリューム（テスト用）** はVRChatのワールド用です。WARUDOではオフにして、UnityのLight Probeを使ってください。
- Built-inのポイント・スポットの追加光はForwardAddパスで入ってきます。
- 追加光が強い場合は **追加ライト受信量** と **追加ライト強度** で調整してください。
- カメラを複数使う場合は、出力ごとに深度エフェクトと透明のソートを個別に確認してください。

:::caution[ForwardAddには影のフィルターがかかりません]
WARUDOのBuilt-inでは、追加光が作る影の内部反射にフィルターが適用されません。
詳しい条件は [リムリファレンス](/reference/rim) を見てください。
:::

## 書き出しのチェックリスト

1. Unity 2021.3.45f2とBuilt-inシェーダーを使います。
2. `MingToonWarudoDepthBridge.cs` がPlaygroundにインストールされています。
3. `Warudo > Build Mod` のConsoleに最適化・復元のエラーがありません。
4. メイン画面と実際の配信カメラで深度エフェクトを確認します。
5. シーンの照明を制御しにくい場合は **ベースカラー保持** と **最終最小明るさ** を調整します。

## 次へ

[ビルド時の自動最適化](/workflow/build-optimization) · [深度ベースのエフェクト](/guides/depth-effects) · [ライティングと影](/guides/light-and-shadow)
