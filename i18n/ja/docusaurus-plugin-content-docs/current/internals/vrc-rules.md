---
id: vrc-rules
title: VRChat 互換性規則
sidebar_position: 5
---

# VRChat 互換性規則

**このドキュメントを読むと** MingToon が VRChat アップロードに対して検査するルール全体が分かり、アップロード前に何が引っかかるかを事前に判断できます。

MingToon は VRChat 規則を**バージョンが付けられたルールセット**として持っています。

| 項目 | 値 |
|---|---|
| ルールバージョン | `2026.07` |
| 検証済み Unity バージョン | `2022.3.22f1` |
| 根拠 | [VRChat Shader Fallback System](https://creators.vrchat.com/avatars/shader-fallback-system/) |

---

## Fallback シェーダ {#fallback-셰이더}

MingToon BRP シェーダは SubShader タグにこのように宣言します。

```text
VRCFallback = toonstandardoutline
```

:::tip[相手がシェーダを隠してもルックが残ります]
VRChat で相手が **Shaders を Hidden** に設定すると、私のアバターは fallback シェーダで見えます。`toonstandardoutline` が指定されているので**トゥーンシェーディングとアウトラインが維持されます。** Standard に落ちるシェーダよりもはるかに元のテイストに近いです。
:::

:::danger[透明なマテリアルは fallback でアウトラインが失われます]
分析器が `TransparentFallbackUsesUnlit` で警告します。

> Toon の Transparent/Fade fallback は **Transparent Unlit に置き換えられてトゥーン照明とアウトラインが維持されません。**

髪の毛のようにシルエットが重要なパーツは**カットアウト**を使う方が fallback 状況では遥かに良いです。 → [基本設定](/guides/basics#1-표면-모드부터-정합니다)
:::

### 標準 alias

Fallback が値を受け継ぐには、シェーダが Unity 標準プロパティ名を持っている必要があります。MingToon が検査する alias リスト:

```text
_MainTex      _Color        _BumpMap    _BumpScale
_OcclusionMap _OcclusionStrength
_EmissionMap  _EmissionColor
_Cutoff       _Mode
_SrcBlend     _DstBlend     _ZWrite
```

ない場合は `MissingStandardAlias` — `標準 fallback alias がありません: {名前}`

**正常な状態の MingToon マテリアルでは出ません。** 出ている場合、シェーダが破損しているか手動で修正されています。

---

## アップロード可能な MonoBehaviour

VRChat アバターに残せるコンポーネントのみをホワイトリストで持っています。

```text
VRCAvatarDescriptor    VRCConstraint
VRCContactReceiver     VRCContactSender
VRCHeadChop            VRCIKFollower
VRCPhysBone            VRCPhysBoneCollider
VRCPipelineManager     VRCRaycast
VRCSpatialAudioSource  VRCStation
```

リスト外のコンポーネントがある場合は `CustomMonoBehaviourNotUploadable`:

> 任意の MonoBehaviour はアバタアップロード対象に含めることができません。**PC Baked/Script-Free 結果から削除してください。**

`<Missing Script>` も個数で集計されます。

:::danger[MingToon 自身のコンポーネントは手動で削除しないでください]
`MingToonManager` と `MingDepthTextureProvider` は**VRChat アップロードで自動的に削除されます。**

**MingToon マネージャを手動で削除するとキャッシュされたレンダラリストが一緒に消えて、アップロード最適化が範囲を失います。** 最適化されていないマテリアルがそのままアップロードされます。

この検査は **MingToon ではない他のスクリプト**を検出するためのものです。 → [MingToon マネージャ — エクスポート / 検証](/workflow/character-manager#내보내기--검증)
:::

---

## 全イシューコード

### PC

| コード | 重大度 | 意味 |
|---|---|---|
| `PcRequiresBakedShader` | エラー | PC アップロード用 MingToon マテリアルは Baked 版である必要があります |
| `CustomMonoBehaviourNotUploadable` | エラー | ホワイトリスト外のコンポーネント |
| `MissingStandardAlias` | 警告 | 標準 fallback alias 不足 |
| `TransparentFallbackUsesUnlit` | 警告 | 透明 fallback が Unlit になる |
| `CameraDependentFeatureNotPortable` | 警告 | 画面/カメラ依存エフェクトは VRChat カメラ構成に依存する |
| `UnityVersionNotValidated` | 警告 | エディタが検証済みバージョンと異なる |
| `UnsupportedRenderBackend` | エラー | **URP バックエンド/マテリアルは VRChat 出力に使用できません。** Built-in エディション版または Built-in Baked を使用してください |

:::tip[`PcRequiresBakedShader` が出ても手動ベイクの必要はありません]
[ビルド時自動最適化](/workflow/build-optimization)がアップロード時点でマテリアルを生成シェーダにスワップして終わったら戻します。この分析器は**静的状態**を見るツールなので、編集状態で実行すると当然この項目が出ます。
:::

### Quest / Android

| コード | 意味 |
|---|---|
| `QuestMingToonNotSupported` | Quest/Android には MingToon シェーダを**直接アップロードできません。** `VRChat/Mobile/Toon Standard` 変換版を別途用意してください |
| `QuestRequiresMobileShader` | Quest/Android マテリアルは現在の SDK の`VRChat/Mobile/` シェーダである必要があります |
| `QuestRequiresToonStandardConversion` | Toon Standard への変換が必要 |
| `QuestOutlineNotSupported` | **Quest Toon Standard 変換はアウトラインを維持しません** |
| `QuestToonStandardRequiresOpaque` | Quest Toon Standard 変換対象は**不透明である必要があります** |

:::danger[Quest 対応は別途作業です]
MingToon はモバイルシェーダターゲットではなく、自動変換パスも提供しません。Quest バージョンを作成する予定なら、**アウトラインが消え半透明が使えない**という前提でルックを別途設計してください。
:::

---

## 深度エフェクトに対する公式声明

MingToon はこの点をコードに明示的に記述しています。

```text
CanAvatarForceMainCameraDepth = false
```

> 深度エフェクトは **VRChat Photo Camera** と **Screen Camera depth texture がオンの世界**で保証されます。
> アバタは世界制御なしにプレイヤーメインカメラの深度を強制できません。
> **アバタに Camera または Light を追加することは同等の解決策ではなく**、性能コストが上がったり、アバタ安全設定によって削除される可能性があります。

参照: [VRC Camera Settings](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/)

インスペクタにも同じ案内が出ます。

> VRC アップロードビルドには任意ユーザースクリプトが残ってはならないため、SDK build clone で MingToon コンポーネントが 0 個か確認してください。2D シャドウと 2D 深度リムは**カメラ深度テクスチャが提供される環境でのみ**同じように見え、アバタ単独で保証されていません。

> VRC では **Classic Hull はマテリアルだけで動作します。** 内部 2D エッジはカメラ深度テクスチャが提供されるときのみ同じように見えます。

---

## 実務的な結論

VRChat アバタを作成するときルックを設計する順序:

1. **深度なしで成立するルックを先に作ります** — フォームシャドウ・シャドウプロジェクション・ノーマルアウトライン・リムライト / リムシェード
2. **深度ベースエフェクトはボーナスとして追加します** — Photo Camera と深度がオンの世界でのみ見えます
3. **髪の毛はカットアウトを優先考慮します** — fallback でアウトラインが生き残ります
4. **アップロード前にランタイムコンポーネント 0 個を確認します**
5. **自分の画面・ミラー・Photo Camera をそれぞれ確認します**

## 関連ドキュメント

- [VRChat](/platforms/vrchat)
- [シェーダ構造とパス](/internals/shader-structure)
- [Validate Project コード](/reference/validator)
