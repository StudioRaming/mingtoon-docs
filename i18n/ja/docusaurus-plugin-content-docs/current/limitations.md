---
id: limitations
title: 現在の制限とリリース
sidebar_position: 91
---

# 現在の制限とリリース

MingToon `0.1.3-preview` 時点の内容です。

## 配布前に知っておくこと

- このpreviewには **検証済みのGPU ms · SetPass改善数値は含まれていません。** 性能に関する主張はしません。
- **VRChat PCは手動検証の対象であり、リリース認証は完了していません。**
- **VRChat QuestはMingToonの直接実行対象ではありません。**
- Warudoは **実機検証待ち** の状態です。
- URPのサポート範囲は **Unity 2021.3 + URP 12.x** に限定され、VRChatはURPを使用しません。
- 深度リム · 2Dシャドウ · 内部2D境界は **ホストによるカメラ深度の提供に依存** します。VRChatの通常のプレイヤー画面では、アバター側から深度を強制することはできません。
- lilToon変換は **相互運用ツール** であり、他のシェーダーの結果を数学的に複製するものではありません。
- 現在の配布は **ソース** であり、DLL難読化された製品版ではありません。

## ご自身で通す必要がある検証

MingToonで作成した成果物を配布する前に、以下をそれぞれ確認してください。

1. BRP / URPシェーダーのコンパイル
2. EditModeテスト
3. 実際のアバターの **全身 + 顔** のキャプチャ
4. 対象プラットフォームのビルド
5. 対象プラットフォームでの実機確認 — VRChatの場合は **自分の画面 · ミラー · Photo Cameraをそれぞれ**

## リリースビルダー

パッケージビルダーは **positive allowlist** のみで書き出します。

| 含む | 除外 |
|---|---|
| Runtime / Editor / Shaders | Tests |
| 存在する公開Preset | 内部レビュー · 研究 · 証跡 · ベンチマーク |
| README、マニュアル、manifest | 生成されたプロジェクト成果物 |
| 承認済みのLICENSEまたはEULA | リポジトリのメタデータ |

SHA-256 manifestが一緒に記録されます。

:::note
ユーザーが承認したMingToon専用のLICENSE/EULAがない場合、パッケージビルドはブロックされます。
:::

## クローズドベータのフィードバック

`studioraming@gmail.com`

ご報告に以下を含めていただけると再現が速くなります。

1. Unityバージョンと対象プラットフォーム (VRChat PC / Warudo / 一般Unity)
2. レンダーパイプライン (BRP / URP 12.x)
3. MingToonバージョン (`0.1.3-preview`)
4. Consoleログ全文
5. 再現手順
