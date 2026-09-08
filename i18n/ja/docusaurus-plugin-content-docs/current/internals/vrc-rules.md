---
id: vrc-rules
title: VRChat 互換性規則
sidebar_position: 5
---

# VRChat 互換性規則

このページはMingToonパッケージの静的検査規則を説明します。規則バージョンと検証Unityはパッケージ内の基準で、VRChat全体の最新許可リストやアップロード成功の証明ではありません。現在のSDK環境は[VRChat公式Unity案内](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)を確認してください。

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

:::note[Fallbackの確認]
`toonstandardoutline`はホストが代替シェーダーを選ぶためのタグです。MingToonの色・影・効果がすべて保持される意味ではありません。透明の代替経路と実際のSafety設定でも確認してください。
:::

:::note[透明の警告と実際のタグを区別します]
`TransparentFallbackUsesUnlit`はMingToonの静的解析による警告です。公式規則では**Toon + Transparent/Fade**がTransparent Unlitへ進みますが、**toonstandardoutlineは組み合わせ不可の別タグ**です。この警告を全透明MingToonマテリアルの確定結果として読まないでください。実際のoverride tagとSafety状態を確認します。[VRChat公式fallback規則](https://creators.vrchat.com/avatars/shader-fallback-system/)
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
PipelineManager     VRCRaycast
VRCSpatialAudioSource  VRCStation
```

リスト外のコンポーネントがある場合は `CustomMonoBehaviourNotUploadable`:

> 任意の MonoBehaviour はアバタアップロード対象に含めることができません。**PC Baked/Script-Free 結果から削除してください。**

`<Missing Script>` も個数で集計されます。

:::note[Managerをアバタールートに残します]
編集中はアバタールートのMingToonManagerを維持し、通常のSDKアップロードを使います。静的な事前検査とSDK処理後の複製検査は別です。複製からMingToon編集用ランタイムコンポーネントが除去されたかを確認します。SDKが許可するコンポーネントまで削除する意味ではありません。
:::

---

## 全イシューコード

### PC

| コード | 重大度 | 意味 |
|---|---|---|
| `PcRequiresBakedShader` | エラー | PC アップロード用 MingToon マテリアルは Baked 版である必要があります |
| `CustomMonoBehaviourNotUploadable` | エラー | ホワイトリスト外のコンポーネント |
| `MissingStandardAlias` | 警告 | 標準 fallback alias 不足 |
| `TransparentFallbackUsesUnlit` | 警告 | 透明表面の静的警告。実際のfallbackタグの挙動は上記参照 |
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

## 深度効果の条件

`CanAvatarForceMainCameraDepth = false`は、アバターがホストカメラの深度を一律に保証できないという基準です。Photo Camera、ワールド設定、その他の深度供給条件を分けて確認します。深度があっても、キュー、深度への参加、品質、距離設定で結果が変わります。

Managerのアップロード時に深度ライトを含める設定を有効にすると、アップロード複製へ補助Directional Lightを追加します。導入版や既存アバターの設定によって状態が異なる場合があるため、実際の値を確認してください。Avatar Safety、ワールド、ライト設定の影響を受け、全ユーザーの深度を保証しません。[VRChat深度ライト](/platforms/vrchat#vrchat-깊이-라이트)を読んでから、自分の画面、ミラー、Photo Cameraを比較してください。

## 実務的な結論

VRChat アバタを作成するときルックを設計する順序:

1. **深度なしで成立するルックを先に作ります** — フォームシャドウ・シャドウプロジェクション・ノーマルアウトライン・リムライト / リムシェード
2. **深度の供給条件を確認して効果を追加します** — 画面ごとの差を比較します
3. **髪のアルファと輪郭を確認します** — 適切なモードを選び、実際のfallbackでも比較します
4. **SDK処理後の複製にMingToon編集用コンポーネントが残っていないか確認します**
5. **自分の画面・ミラー・Photo Camera をそれぞれ確認します**

## 関連ドキュメント

- [VRChat](/platforms/vrchat)
- [シェーダ構造とパス](/internals/shader-structure)
- [Validate Project コード](/reference/validator)
