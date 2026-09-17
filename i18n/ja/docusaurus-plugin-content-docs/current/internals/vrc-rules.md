---
id: vrc-rules
title: VRChat互換性ルール
sidebar_position: 5
---

# VRChat互換性ルール

MingToonがVRChatアップロードに対して静的に検査するルールのすべてです。
アップロード前に、何が引っかかるかを事前に確認できます。

この一覧はパッケージに記録された基準であり、VRChat全体の最新の許可リストではありません。
現在のSDK環境は[VRChat公式Unityガイド](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)で確認してください。

| 項目 | 値 |
|---|---|
| ルールバージョン | 2026.07 |
| 検証済みUnityバージョン | 2022.3.22f1 |
| 根拠 | [VRChat Shader Fallback System](https://creators.vrchat.com/avatars/shader-fallback-system/) |

## 実務的な結論 {#실무-결론}

VRChatアバターのルックを設計する順序です。

1. **深度なしで成立するルックを先に作ります。** 形状シャドウ、投影シャドウ、ノーマルアウトライン、リムライト、リムシェード。
2. **デプス効果はあとから乗せます。** 画面ごとに見えるかどうかを比べながら足してください。
3. **髪のアルファとシルエットを確認します。** サーフェスモードを選び、fallback状態でも確認します。
4. **アップロード用の複製にMingToonのランタイムコンポーネントが0個であることを確認します。**
5. **自分の画面、ミラー、Photo Cameraをそれぞれ確認します。**

## Fallbackシェーダー {#fallback-셰이더}

MingToonのBuilt-inシェーダーは、SubShaderタグで次のように宣言します。

```text
VRCFallback = toonstandardoutline
```

`toonstandardoutline`は、ホストが代替シェーダーを選ぶときに使うタグです。
MingToonの色、影、効果が保持されるという意味ではありません。

:::note[透明fallbackの警告を確定した結果として読まないでください]
`TransparentFallbackUsesUnlit`はMingToonの分析ツールによる警告です。
公式ドキュメントの基準では、ToonとTransparent/Fadeを組み合わせた場合が該当します。
その組み合わせはTransparent Unlit経路を使います。
`toonstandardoutline`は、その組み合わせとは別の単独のタグです。
実際の結果は、マテリアルのoverride tagとSafetyの状態で確認してください。
:::

### 標準alias

Fallbackが値を引き継ぐには、シェーダーがUnity標準の名前を持っている必要があります。
検査するaliasは13個です。

```text
_MainTex       _Color         _BumpMap    _BumpScale
_OcclusionMap  _OcclusionStrength
_EmissionMap   _EmissionColor
_Cutoff        _Mode
_SrcBlend      _DstBlend      _ZWrite
```

なければ`MissingStandardAlias`の警告が出ます。
正常なMingToonマテリアルでは出ません。出る場合は、シェーダーが破損しているか手作業で修正されています。

## アップロードできるコンポーネント

アバターに残せるコンポーネントを許可リストとして持っています。12個です。

```text
VRCAvatarDescriptor    VRCConstraint
VRCContactReceiver     VRCContactSender
VRCHeadChop            VRCIKFollower
VRCPhysBone            VRCPhysBoneCollider
PipelineManager        VRCRaycast
VRCSpatialAudioSource  VRCStation
```

リスト外のコンポーネントがあると`CustomMonoBehaviourNotUploadable`が出ます。
`<Missing Script>`も個数に数えます。

:::caution[自動削除は保証されません]
MingToonのランタイムコンポーネントは、VRChatで`IEditorOnly`として表示されます。
表示したからといって、SDKが必ず削除する保証はありません。
そのため、SDKの処理が終わったbuild cloneを自分で確認する必要があります。
そのcloneにMingToonのコンポーネントが0個かどうかを確認してください。
編集中はアバタールートのMingToonマネージャーをそのまま残し、いつもどおりアップロードしてください。
:::

## イシューコード

### PC

| コード | 深刻度 | 意味 |
|---|---|---|
| `PcRequiresBakedShader` | エラー | PCアップロード用のマテリアルはベイク済みのバリアントである必要があります |
| `CustomMonoBehaviourNotUploadable` | エラー | 許可リスト外のコンポーネントがあります |
| `UnsupportedRenderBackend` | エラー | URPバックエンドとURPマテリアルはVRChat出力には使えません |
| `MissingStandardAlias` | 警告 | 標準のfallback aliasがありません |
| `TransparentFallbackUsesUnlit` | 警告 | 透明表面についての静的な警告です。上の説明を参照してください |
| `CameraDependentFeatureNotPortable` | 警告 | 画面・カメラに依存する効果は、VRChatのカメラ構成に左右されます |
| `UnityVersionNotValidated` | 警告 | エディターが検証済みバージョンと異なります |

:::tip[`PcRequiresBakedShader`が出ても手動Bakeは不要です]
[ビルド時の自動最適化](/workflow/build-optimization)が、アップロードの瞬間にマテリアルを差し替え、終わったら戻します。
この分析ツールは静的な状態を見るためのもので、編集状態で実行すれば当然この項目が出ます。
:::

### QuestとAndroid

| コード | 意味 |
|---|---|
| `QuestMingToonNotSupported` | QuestにはMingToonシェーダーを直接アップロードできません |
| `QuestRequiresMobileShader` | Questのマテリアルは`VRChat/Mobile/`シェーダーである必要があります |
| `QuestRequiresToonStandardConversion` | `VRChat/Mobile/Toon Standard`への変換が必要です |
| `QuestOutlineNotSupported` | Quest変換はアウトラインを維持しません |
| `QuestToonStandardRequiresOpaque` | Quest変換の対象は不透明である必要があります |

:::danger[Quest対応は別の作業です]
MingToonはモバイルシェーダーのターゲットではなく、自動変換の経路も提供しません。
Questバージョンを作る予定なら、アウトラインが消え、半透明が使えないという前提でルックを別に設計してください。
:::

## デプス効果の条件

アバター単独では、ホストのカメラ深度を保証できません。
Photo Camera、ワールド設定、ほかの深度供給条件をそれぞれ確認してください。
深度があっても、キュー、カメラ深度への参加、品質、距離設定によって結果は変わります。

マネージャーの **ビルド時に深度ライトを削除** は、オフのままが既定です。
オフにしておくと、深度効果を実際に使うときだけアップロード用の複製に補助のDirectional Lightを入れます。
オンにするとそのライトを強制的に外すため、深度効果が画面から消えることがあります。
Avatar Safety、ワールド、ライト設定の影響を受けるため、すべての画面で深度を保証するわけではありません。
[VRChatの深度ライト](/platforms/vrchat#vrchat-깊이-라이트)を先に読み、自分の画面、ミラー、Photo Cameraを比較してください。

## 関連ページ

- [VRChat](/platforms/vrchat)
- [Validate Projectのコード](/reference/validator)
- [シェーダー構造とパス](/internals/shader-structure)
