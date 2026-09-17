---
id: installation
title: インストール
sidebar_position: 1
---

# インストール

> このページを終えると、MingToon がエラーなく入った Unity プロジェクトができます。
> 約 15 分かかります。

## 始める前の準備

- Unity Hub と下の表に合う Unity バージョン、そして作業するプロジェクトのバックアップ
- VRChat が対象なら VRChat SDK3 (Avatars)

## 1. Unity のバージョンを合わせます

| 対象 | Unity |
|---|---|
| VRChat PC | 2022.3.22f1 |
| Warudo | 2021.3.45f2 |
| 一般 Unity | 2021.3 LTS |

VRChat が対象なら 2022.3.22f1 を使ってください。
MingToon の VRChat ビルドフックは 2022.3 以上でのみコンパイルされます。
2021.3 のプロジェクトにはアップロード時の自動最適化がまったくありません。
1 つのプロジェクトで VRChat と Warudo の両方には対応できないので、分けてください。

![Unity Hub のプロジェクト一覧でエディターバージョンが 2022.3.22f1 と表示された画面](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-01-unity-version.png | Unity Hub 프로젝트 목록에서 대상 프로젝트의 Editor Version 칸이 2022.3.22f1인 상태 | 1200x700 -->

## 2. パッケージをインストールします

[公式ダウンロード案内](https://studioraming.github.io/mingtoon-site/ko/download/)で VCC または BOOTH を選びます。

VCC でインストールする場合:

1. ダウンロード案内で **VCC に追加**を押します。
2. VCC でリポジトリの追加を確認します。
3. 対象プロジェクトの **Manage Project** を開きます。
4. MingToon を追加して Unity を開きます。

BOOTH インストーラーでインストールする場合:

1. [BOOTH 商品](https://raming.booth.pm/items/8810209)でインストーラーの `.unitypackage` を入手します。
2. Unity で `Assets > Import Package > Custom Package` からインポートします。
3. インターネットに接続したまま待ちます。インストーラーが本体を自動で取得します。

![Unity が MingToon パッケージをインポートしコンパイルを終えた Project ウィンドウ](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-02-import-done.png | Project 창에 MingToon 패키지가 들어오고 진행 바가 사라진 직후 상태 | 1200x700 -->

VCC でインストールした場合は、更新も VCC で行います。
BOOTH インストーラーは Unity を起動したときに新しいバージョンを案内します。

## 3. シェーダーが入ったか確認します

マテリアルを 1 つ選び、Inspector 最上部のシェーダー一覧を開きます。
`StudioRaming/MingToon/MingToon BRP` が見えれば正常です。
URP シェーダーは今回の BRP オープンベータには含まれていません。

![Inspector のシェーダードロップダウンに MingToon BRP 項目が見える画面](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-03-shader-list.png | 재질 Inspector의 Shader 드롭다운을 펼쳐 StudioRaming/MingToon/MingToon BRP가 보이는 상태 | 1200x700 -->

## 4. VRChat 連携を確認します

VRChat が対象の場合のみ該当します。リロードが終わったあと、Console に次の行があるはずです。

```text
[MingToon] VRChat build hook compiled and registered.
```

![Console ウィンドウに MingToon のビルドフック登録ログが 1 行出た画面](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-04-hook-log.png | Console 창에서 [MingToon] VRChat build hook compiled and registered. 한 줄이 보이는 상태 | 1200x700 -->

:::danger[この行がない場合]
VRChat ビルドフックがない状態です。
アップロードしても自動最適化がかかりません。
:::

## 5. プロジェクトを検証します

メニューから `StudioRaming > MingToon > Validate Project` を実行します。
ビルドターゲットがシェーダーモデル 4.5 を満たせない場合は `MING-ENV-BUILD-TARGET` エラーが出ます。
その状態で進めると、マテリアルがマゼンタ（ピンク色）になります。
エディターが 2021.3 で VRC SDK がある場合は `MING-VRC-UNITY-VERSION` 警告が出ます。

![Validate Project の実行結果ウィンドウ](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-05-validate.png | Validate Project를 실행해 결과 목록이 표시된 창 | 1200x700 -->

## うまくいったかの確認

- Console に赤いエラーがありません。
- シェーダー一覧に `StudioRaming/MingToon/MingToon BRP` があります。
- VRChat が対象ならビルドフックのログが出ています。
- `Validate Project` の結果にエラーがありません。

4 つのうち 1 つでも合わなければ[トラブルシューティング](/troubleshooting#install)へ進んでください。

## 以前のバージョンから上げた場合 {#이전-버전에서-올라왔다면}

ベイクキャッシュが一度作り直されます。
手で消すものはなく、次のビルドやアップロードがその分だけ長くかかります。
VRChat のアバターは再アップロードしないと今回のバージョンが反映されません。
シェーダーがアバターに一緒に載るためです。条件は [VRChat](/platforms/vrchat) にあります。

## 任意: Post Processing Stack v2 {#선택-사항-post-processing-stack-v2}

MingToon は PPv2 がなくても完全に動作します。シーン確認と撮影用です。

1. PPv2 **3.4.0** をインストールします。
2. **Player Settings > Scripting Define Symbols** に `UNITY_POST_PROCESSING_STACK_V2` を手動で追加します。
3. Unity が再コンパイルを終えるまで待ちます。
4. `StudioRaming > MingToon > Create or Repair BRP PPv2 Global Volume` を実行します。

2 番を飛ばすと、4 番のメニューは何もしません。

## 次に読む文書

[Manager ではじめる](/getting-started/first-material) · [対応環境](/platforms/compatibility) · [トラブルシューティング](/troubleshooting#install)
