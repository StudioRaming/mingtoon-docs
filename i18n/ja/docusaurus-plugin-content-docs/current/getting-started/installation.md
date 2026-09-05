---
id: installation
title: インストール
sidebar_position: 1
---

:::note[オープンベータ参加案内]
[オープンベータ参加案内](https://studioraming.github.io/mingtoon-site/ja/download/) — BOOTH商品はまだ公開されていません。公開後、このページに公式商品リンクを追加します。 ダウンロード前に、現在のベータ版の利用条件と対応範囲をご確認ください。
:::


すべての商用ライセンスにURPバージョンが含まれます。Personal Streaming・Personal CreatorのEarly Access Founders EditionにはMLCが含まれ、正式リリース後に構成が変更される場合があります。現在のオープンベータでは商用利用は禁止です。[ライセンスと同梱構成](/legal/beta-license)をご確認ください。

# インストール

**このドキュメントを完了すると、** MingToonがエラーなくインポートされたUnityプロジェクトが手に入ります。

## 1. まずUnityのバージョンを合わせます

:::danger[対象によってUnityバージョンが異なります]
| 対象 | Unity | 根拠 |
|---|---|---|
| **VRChat PC** (主要な対象) | **2022.3.22f1** | 現在のVRChat SDK基準 |
| **Warudo** | **2021.3.45f2** | Warudo Mod SDK 0.14.3.10基準 |
| 一般的なUnity | 2021.3 LTS | |

**VRChat対象の場合は必ず2022.3.22f1を使用してください。** MingToonのVRChat ビルドフックとVRChat ランタイムは、`UNITY_2022_3_OR_NEWER` 条件でのみコンパイルされます。2021.3では、このコードが**全く存在しない**ため、アップロード時の自動最適化も、深度ライトなどのアップロード処理も実行されません。
:::

1つのプロジェクトでVRChatとWarudoを同時に対応させることはできません。対象ごとにプロジェクトを分けてください。

## 2. 準備物

- 上の表に合ったUnityエディタ
- MingToon `.unitypackage`
- VRChat対象の場合、現在の**VRChat SDK3 (Avatars)**
- 可能であれば**新しいプロジェクト** — 下の注意参照

:::caution[開発プロジェクトに上書きしないでください]
このディストリビューションはUPMパッケージではなく、**ソース`.unitypackage`** です。既存のMingToonソースがあるプロジェクトに再度インポートすると、クラスとシェーダーが重複してコンパイルが破損します。最終パッケージは常に空の検証プロジェクトでテストしてください。
:::

## 3. インポート

1. 対象に合ったUnityバージョンでプロジェクトを開きます。
2. VRChat対象の場合は、**まずVRChat SDKをインポート**します。MingToonのVRChat連携コードがコンパイルされるには、SDKが先に存在する必要があります。
3. MingToon `.unitypackage`をプロジェクトウィンドウにドラッグするか、`Assets > Import Package > Custom Package`でインポートします。
4. インポートダイアログで**すべてのアイテムを選択したまま**Importをクリックします。
5. Unityがコンパイルを完了するまで待ちます。
6. **Consoleを開いてエラーが0件であることを確認します。** C#エラーでもシェーダーエラーでも、何か残っていれば次のステップに進まないでください。

<!-- SCREENSHOT: Import Package ダイアログ -->

**このようになれば正常です。** Projectウィンドウに`Assets/StudioRaming/MingToon/`が生成され、Consoleに赤いエラーがありません。

## 以前のバージョンからアップグレードした場合 {#이전-버전에서-올라왔다면}

0.1.6で作業していたプロジェクトを0.1.7へアップグレードした場合、以下の2つを**それぞれ1回ずつ**実行する必要があります。

:::danger[1. スキーマ マイグレーションを1回実行してください]
`Tools > Studio Raming > MingToon > Advanced > Migrate Project To Current Schema`

マテリアルスキーマが**10から11に**アップグレードされました。`リムライトマスクを使用` · `リム影マスクを使用`という2つの新しいトグルが追加されましたが、以前のマテリアルにはこれらのトグルがないため**オフ状態で読み込まれます。** マイグレーションは白色のデフォルト値ではないマスクを見つけて、トグルをオンにします。

**実行するまで、該当するマテリアルのリムマスクは適用されません。** マスクがデフォルトの白色のマテリアルはオフのままで、その方が良いです。

実行前に確認を受け、変更されたファイルはバックアップされます。完了するとコンソールに処理されたマテリアル・プリセット・アニメーション クリップの数とバックアップパスが1行に表示されます。 → [リム](/guides/rim#림-마스크)
:::

:::caution[2. ベイクキャッシュが再生成されます]
生成シェーダーキャッシュのバージョンが**28から38に**アップグレードされ、既存のベイク出力は無効になります。次のビルド/アップロード時に自動的に再度焼き込みされるため、手動で削除する必要はありませんが、その1回は時間がかかります。

**VRChat アバターは再度アップロードする必要があります。このバージョンの修正が反映されます。** シェーダーはアバター AssetBundle に含まれているため、既にアップロードされたアバターは古いシェーダーを使用し続けます。 → [VRChat](/platforms/vrchat)
:::

## 4. VRChat連携確認 (VRChat対象のみ)

スクリプトリロード後、Consoleに次の行があるはずです。

```text
[MingToon] VRChat build hook compiled and registered.
```

:::danger[この行がない場合]
VRChat ビルドフックが**全く存在しない状態**です。アップロードしても自動最適化と、深度ライトなどのアップロード処理は実行されません。確認すべきこと:

1. Unityバージョンが**2022.3.22f1**であるか
2. VRChat SDK3がプロジェクトに正しく入っているか (`VRC_SDK_VRCSDK3` 定義)
:::

## 5. プロジェクト検証

メニューから`Tools > Studio Raming > MingToon > Validate Project`を実行します。

主に確認するのは、**現在のビルドターゲットがシェーダーモデル4.5を満たすかどうか**です。満たさない場合はエラーとして報告され、その状態で続行するとマテリアルがマゼンタ(ピンク色)でレンダリングされます。 → [サポート環境](/platforms/compatibility)

<!-- SCREENSHOT: Validate Project 結果 -->

:::note[サポートするエディターストリームは2021.3と2022.3の両方です]
どちらでも`MING-ENV-UNITY-VERSION`エラーは出ません。

ただし**VRC SDKが入っているのにエディターが2021.3の場合**、`MING-VRC-UNITY-VERSION` **警告**が表示されます — 「MingToonのVRChat連携は2022.3ストリームでのみコンパイルされるため、このプロジェクトではアバター アップロードサポートがありません。」これは正確な警告であり、VRChat対象の場合は2022.3.22f1に移動する必要があることを意味します。
:::

## 6. シェーダーの選択

| プロジェクト | シェーダー |
|---|---|
| Built-in Render Pipeline (BRP) — VRChat・Warudo含む | `StudioRaming/MingToon/BRP` |
| URP 12.x (Unity 2021.3) | MingToon URPシェーダー |

:::danger[URPはVRChat対象ではありません]
VRChat + URPはサポートされていません。URPはUnity 2021.3 + URP 12.xのみを対象とし、URP 13以上は動作しているように見えても、サポートとは見なさないでください。
:::

## オプション: Post Processing Stack v2 {#선택-사항-post-processing-stack-v2}

MingToonはPPv2なしで完全に動作します。PPv2関連のソースはすべて`UNITY_POST_PROCESSING_STACK_V2` シンボルで除外されているため、きれいなプロジェクトに`com.unity.postprocessing`をインストールする必要はありません。

PPv2連携を使用する場合:

1. PPv2 **3.4.0**をインストールします。
2. **Player Settings > Scripting Define Symbols**に`UNITY_POST_PROCESSING_STACK_V2`を**直接追加**します。
3. Unityが再コンパイルを完了するまで待ちます。
4. `Tools > Studio Raming > MingToon > Create or Repair BRP PPv2 Global Volume`を実行します。

:::note
パッケージをインストールするだけではこのシンボルは生成されません。ステップ2をスキップするとメニューは何もしません。
:::

VRChatアバターはワールドのポストプロセッシングに従うため、PPv2は主にシーン確認・撮影用です。

## 次へ

[最初のマテリアルを作成する](/getting-started/first-material)
