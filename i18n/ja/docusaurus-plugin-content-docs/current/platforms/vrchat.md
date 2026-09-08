---
id: vrchat
title: VRChat
sidebar_position: 1
---

# VRChat

**このドキュメントを読むと** VRChat PCアバターへMingToonを導入し、自動ベイク・深度エフェクト・Light Volumesの動作を確認できます。

VRChat PCはMingToonの主な対象です。

:::caution[BRP本体オープンベータ]
VRChat PCは手動検証の対象です。アップロード前に、このページのチェックリストとMingToon Managerの準備状態チェックを自分で通過させてください。VRChat QuestはMingToonシェーダーを直接実行する対象ではありません。→ [対応環境](/platforms/compatibility#vrchat-quest)
:::

## Unityバージョン

:::danger[Unity 2022.3.22f1]
現在検証済みのVRChat SDKプロジェクトバージョンです。VRChatビルドフックは対応する2022.3ストリームでのみコンパイルされます。Warudo用Unity 2021.3.45f2プロジェクトと同じプロジェクトを共有しないでください。
:::

## アップロードチェックリスト

1. ConsoleのC#・シェーダーエラーを0件にします。
2. MingToon Managerで`子Rendererを再検索`を実行します。
3. `準備状態を検査`と`VRChat事前チェック`を実行します。→ [MingToon Manager](/workflow/character-manager#내보내기--검증)
4. Expressions構成が必要な場合は、自分で作成した、または別のツールが追加した構成を最終build cloneで確認します。
5. VRChat SDK Builderからアップロードします。手動Bakeは必須ではありません。
6. ゲーム内で自分の画面・ミラー・Photo Cameraをそれぞれ確認します。

## MingToonコンポーネントを削除しないでください

:::danger[直接削除すると最適化範囲を失います]
MingToonランタイムコンポーネントはVRC SDKで`IEditorOnly`としてマークされますが、自動削除は保証されません。オーサリングSceneのMingToon Managerを手動で削除すると、キャッシュ済みRenderer範囲が失われ、一部のマテリアルが最適化されない場合があります。

オーサリングSceneは維持し、SDK処理後の実際のbuild cloneで`RuntimeComponentCount = 0`か検証してください。この診断値はビルドルート配下のオーサリング用MingToonコンポーネントだけを数え、SDKやランタイムのコンポーネントは数えません。残っている場合は、アップロード前にcloneから明示的に削除する必要があります。
:::

Warudoではスクリプトを維持する逆のルールを使います。→ [Warudo](/platforms/warudo)

## VRChatアップロード準備 {#expressions-메뉴}

MingToon ManagerはVRChatのExpressionsメニュー・パラメーター・FXを自動でインストールしません。ManagerはAvatar Rootに残し、変換・ルック・最適化とアップロード用コピーの状態を確認してください。自分で作成した、または他のツールが追加したExpressions構成は、VRChat SDKが作成した最終build cloneで確認します。

1. Avatar Rootの`MingToon Manager`から`子Rendererを再検索`を実行します。
2. `準備状態を検査`と`VRChat事前チェック`を実行し、エラーを解消します。→ [MingToon Manager](/workflow/character-manager#내보내기--검증)
3. VRChat SDK Builderからアップロードします。通常のアップロード手順では手動Bakeは必要ありません。
4. SDK処理後、実際のbuild cloneで`RuntimeComponentCount = 0`を確認します。この値はオーサリング用MingToonコンポーネント数であり、SDKやランタイムの全コンポーネント数ではありません。
5. アップロード後、自分の画面・ミラー・Photo Cameraで深度エフェクトと照明をそれぞれ確認します。

Expressions構成やアップロードで問題がある場合は、[トラブルシューティング](/troubleshooting)のConsoleと準備状態の項目から確認してください。

### 品質ティアとランタイム切り替え {#품질-티어와-런타임-전환}

`High`はオーサリング値をそのまま維持し、`Mid`は2Dリム・SSAO・投影シャドウのサンプル数を制限します。`Low`はサンプル数をさらに下げ、深度エフェクトマスターと投影シャドウフェザーを無効にします。品質メニューを使うマテリアルはMingToon Managerでオプトインする必要があります。オプトインしていない値はベイク時に定数へ畳み込まれ、最も軽くなります。

- `FX Animatorで深度エフェクトを切り替え` — 深度エフェクト全体のマスターをアニメーションします。
- `FXメニューでシャドウ投影を切り替え` — Qualityメニューの`Shadow Projection`で投影シャドウだけをOFFにします。OFFではフェザー・キャスト合成・関連する透過光計算をスキップします。

## アップロード時に自動処理されるもの {#빌드-시-자동으로-처리되는-것}

アップロードフックは元のシーンアセットではなく、SDKが作成したコピーだけを変更します。

- 編集用シェーダーを軽量シェーダーへ最適化します。
- Faceノーマル平坦化をアップロードMeshのUV7へベイクし、終了後に元のRenderer・マテリアルを復元します。
- Face SDFがUV7を所有するか、テクスチャFace Area Maskが必要なRendererは、同じ結果を保つためLive経路を維持します。
- プロジェクトで設定したスロット種別ごとのテクスチャ解像度上限をアップロード用コピーへ適用します。
- `Depth Availability = Auto`をそのまま保持します。Force On / Force Offも作成者の指定値を維持します。通常画面で深度が必要な場合は、Managerで`アップロード時に深度ライトを含める`の現在の状態を確認してから使います。
- VRC Light Volumesバリアントをアバターアップロード時に自動有効化します。
- MingToonランタイムコンポーネントはexporter処理のため`IEditorOnly`としてマークされます。最終build cloneで0件か別途検証する必要があります。

復元と保存は変更したRenderer・マテリアルごとに分離されます。一つの項目が失敗しても残りを復元し、無関係なdirtyアセットを一括保存しません。→ [ビルド時の自動最適化](/workflow/build-optimization)

## 深度エフェクトはどこまで保証されるか {#깊이-효과가-어디까지-보장되나}

2Dリムライト・2Dシャドウ・SSAO・2D透過光・インナーアウトラインはカメラ深度テクスチャを読みます。VRChatでScreen Camera depthを有効にする権限はワールド側にあります。

| 状況 | 深度 |
|---|---|
| **Photo Camera使用中** | 対応 |
| **ワールドがScreen Camera depthを有効化** | 対応 |
| **通常プレイヤー画面のデフォルト状態** | 保証されない |
| **ミラー** | 意図的に遮断 |

ミラーカメラがプレイヤーカメラの古い深度を読み、他人のシルエットをシャドウとして使わないよう、`Force On`でも深度モジュールを無効にします。

ワールド制作者は[VRC Camera Settings公式ドキュメント](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/)のScreen Camera設定から深度を要求できます。アバターがこの設定を直接変更することはできません。

### VRChat深度ライト {#vrchat-깊이-라이트}

`アップロード時に深度ライトを含める`が有効な場合、アップロード用コピーへシャドウを有効にしたDirectional Lightを1つ追加し、通常画面でも深度パスを誘導します。アップロード前にManagerで現在のオプション状態を確認してください。

このライトは **Important（Render Mode = Important / ForcePixel）** として載せます。2026-09-05に導入したNot Important最適化で確認したのはUnityエディターのプローブのみです。その後、特定のVRChatワールドで深度シャドウの不具合が報告されたため、2026-09-06に9月4日の設定へ戻しました。Importantではカメラ深度パスに加え、ライトごとのシャドウマップとピクセルライト枠のコストが発生する場合があります。**設定を戻しただけでは修正の確認にはならず、影響を受けたワールドで実際のVRChatクライアントによる再検証が必要です。** カリングマスクEverything、その他のライト設定、ビルドクローンにのみ適用する方針は維持します。

:::danger[コストと制限]

1. アバターを見る他ユーザーのカメラに追加深度パスのコストが発生します。
2. ミラーでは動作しません。
3. Avatar Safetyによってライトが無効になる場合があります。
4. アバターPerformance RankとPixel Light数へ影響する場合があります。
:::

深度のない通常画面を基準にし、ノーマルアウトライン・リム・フォームシャドウ・Face SDFなどのフォールバックも一緒に用意するほうが安全です。

### 顔投影シャドウのフォールバック

Faceマテリアルの`深度なしでも顔投影シャドウ`オプトインは、深度モジュールが無効になった画面でも顔SDF/シャドウテクスチャ経路を維持します。デフォルトはOFFで、通常画面フォールバックが本当に必要なFaceマテリアルだけ有効にしてください。

## VRC Light Volumes {#vrc-light-volumes}

Built-inのVRChatアバターでは、Light Volumesが提供する間接光、スペキュラー、ポイントライトシャドウ、ノーマルバイアスと強度を使用できます。

- アバターアップロードでは必要なバリアントが自動有効化されます。
- Light VolumesのないワールドではUnity Light Probeへフォールバックします。
- Unity Editorの値はテスト用です。最終結果はワールドのボリュームデータで決まります。
- URPとWarudo Built-inで同じVRCボリューム契約を期待しないでください。

## 他のビルドツールと併用する場合

MingToonフックは、Modular Avatar・VRCFuryなどのツールがマテリアルとAnimatorを処理した後の最終状態を解析できるよう、遅い順序で実行されます。準備状態チェックで競合と欠落を再確認してください。

## 照明を制御できない前提

ワールドごとに照明は異なります。`ベース色保持`、最終最小・最大明るさ、シーンライト色影響、リムのシーンライト影響を実際のワールド範囲に合わせてください。現在の追加光上限はベースカラー倍率ではなく絶対HDRピークです。→ [ライティングとシャドウ](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)

## VRChat + URP

対応していません。VRChat用のBuilt-in版を使用してください。

## 注意事項

**ハードウェア** — Shader Model 4.5が必要です。満たさない場合、マテリアルがマゼンタ表示になることがあります。→ [対応環境](/platforms/compatibility#하드웨어-요구-사항-필수)

**Quest** — MingToonシェーダーを直接実行しません。MingToon ManagerのQuestチェックは、アウトライン・半透明・深度エフェクトなど代替版で失われる項目を数えます。
