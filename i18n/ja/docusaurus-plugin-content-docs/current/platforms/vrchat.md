---
id: vrchat
title: VRChat
sidebar_position: 1
---

# VRChat

**このドキュメントを読むと** VRChat PCアバターへMingToonを導入し、0.1.7の自動ベイク・Expressionsメニュー・深度エフェクト・Light Volumesの動作を確認できます。

VRChat PCはMingToonの主な対象です。

:::caution[クローズドベータ]
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
4. Expressionsメニューを使う場合は、Gesture Managerで`MingToon Controls`を確認します。
5. VRChat SDK Builderからアップロードします。手動Bakeは必須ではありません。
6. ゲーム内で自分の画面・ミラー・Photo Cameraをそれぞれ確認します。

## MingToonコンポーネントを削除しないでください

:::danger[直接削除すると最適化範囲を失います]
MingToonランタイムコンポーネントはVRC SDKで`IEditorOnly`としてマークされますが、自動削除は保証されません。オーサリングSceneのMingToon Managerを手動で削除すると、キャッシュ済みRenderer範囲が失われ、一部のマテリアルが最適化されない場合があります。

オーサリングSceneは維持し、SDK処理後の実際のbuild cloneで`RuntimeComponentCount = 0`か検証してください。残っている場合は、アップロード前にcloneから明示的に削除する必要があります。
:::

Warudoではスクリプトを維持する逆のルールを使います。→ [Warudo](/platforms/warudo)

## Expressionsメニュー {#expressions-메뉴}

MingToon ManagerはModular Avatarを使い、メニュー・パラメーター・FXをbuild cloneへ
非破壊でインストールできます。Modular Avatarがなければ直接マージ方式も使用できます。
これはAvatar SDK / アップロード専用機能で、World/Udonへのインストールは行いません。

アップロード前にManagerの `フル調整メニューを使用` で2つのプロファイルから選びます。
既定はオンです。

| プロファイル | 維持される機能 | 追加機能 | 同期コスト |
|---|---|---|---:|
| フル（既定） | Virtual Light基本操作・High/Mid/Low・Shadow Projection・Reset | Palette・Master Adjust・Photo Looks | 21・77ビット |
| 軽量 | Virtual Light基本操作・High/Mid/Low・Shadow Projection・Reset | なし | 10・31ビット |

フルは合計28個（同期パラメーター21個 + ローカルコマンド7個）、軽量は合計12個
（同期パラメーター10個 + ローカルコマンド2個）です。ローカルコマンドは0ビットです。
同期内訳はフルが Bool 13 + Int 2 + Float 6、軽量が Bool 7 + Float 3 です。
インストール前に既存パラメーターとの型競合、256ビット予算、メニューごとの8枠を検査し、
失敗時は変更をロールバックします。

共通メニュー：

- **Virtual Light** — Enabled、Direction、Intensity、Follow Character、
  Auto/Replace/Add Mode
- **Quality** — 明示的な High / Mid / Low ボタンと、独立した
  `Shadow Projection`
- **Reset All** — 選択中のプロファイルにある12個または28個の値をインストール時の
  既定値へ戻します。インストール前の任意のオーサリング値スナップショットへ
  戻すボタンではありません。

フルだけに追加：

- **Palette** — Warm / Gold / Mint / Cyan / Blue / Violet / Rose / Red の8色 ×
  Neutral / Soft / Medium / Full の4段階。32通りを1つの Int に圧縮します。
- **Master Adjust** — Highlight / Shadow / Final Output は、それぞれ独立した
  Intensity と Tint Off / Low / Mid / Full を持ちます。パレットは共有しますが、
  色の適用量と強度は個別です。
- **Photo Looks** — Neutral、Dark World Rescue、Flat Studio、Unlit Reference、
  Warm Portrait、Cool Portrait、No Emission、No Backlight

`Expressionsルートに直接配置` をオフにすると、どちらのプロファイルもRootの1枠を
`MingToon Controls` フォルダーに使います。フルはフォルダー内に8操作、軽量は7操作です。
オンにすると、フルは `Virtual Light`・`Master Adjust`・`Reset All`、軽量は
`Virtual Light`・`Quality`・`Reset All` をRootへ配置します。どちらも空き3枠が
必要で、収まらない場合はフォルダー方式へ戻ります。プロファイルを切り替えて
再インストールすると、古いMingToonパラメーター・FXレイヤー・生成メニューを削除します。

フルプロファイルのPhoto Looksは、自分のアバターの明るさ範囲・ライトカラー影響・
Unlitブレンド・発光・バックライト・色温度をまとめて同期します。他のユーザーには、
そのアバターへ適用された結果が表示されます。1人のローカルメニューから画面内の
他アバターすべてを操作するにはWorld/Udon権限が必要なため、この機能には含まれません。

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
- `Depth Availability = Auto`をそのまま保持します。Force On / Force Offも作成者の指定値を維持し、通常画面で深度が必要な場合は別オプトインの`アップロード時に深度ライトを含める`を使います。
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

### VRChat深度ライト（デフォルトOFF） {#vrchat-깊이-라이트}

`アップロード時に深度ライトを含める`は、アップロード用コピーへシャドウを有効にしたDirectional Lightを1つ追加し、通常画面でも深度パスを誘導するオプトイン回避策です。

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

ワールドごとに照明は異なります。`ベース色保持`、最終最小・最大明るさ、シーンライト色影響、リムのシーンライト影響を実際のワールド範囲に合わせてください。0.1.7の追加光上限はベースカラー倍率ではなく絶対HDRピークです。→ [ライティングとシャドウ](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)

## VRChat + URP

対応していません。VRChat用のBuilt-in版を使用してください。

## 注意事項

**ハードウェア** — Shader Model 4.5が必要です。満たさない場合、マテリアルがマゼンタ表示になることがあります。→ [対応環境](/platforms/compatibility#하드웨어-요구-사항-필수)

**Quest** — MingToonシェーダーを直接実行しません。MingToon ManagerのQuestチェックは、アウトライン・半透明・深度エフェクトなど代替版で失われる項目を数えます。