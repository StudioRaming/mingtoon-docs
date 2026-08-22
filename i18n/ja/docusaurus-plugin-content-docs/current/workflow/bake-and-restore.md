---
id: bake-and-restore
title: 手動Bakeと復元
sidebar_position: 3
---

# 手動Bakeと復元

**このドキュメントを読むと** 手動の軽量シェーダーBakeが必要な場合を判断し、結果を安全に復元できます。

## 最初に：ほとんどの配布では不要です

:::tip[通常のアップロード・書き出しはビルド時の自動最適化を使ってください]
[ビルド時の自動最適化](/workflow/build-optimization)はビルド直前に必要なマテリアルだけを一時最適化し、成功・失敗後にオーサリング状態を復元します。手動Bakeは新しいShader・Material・Texture・Manifestアセットを作り、Rendererスロットを実際に置き換えます。
:::

手動Bakeが必要な場合は限定的です。

- baked Shader・Material自体を別アセットとして渡す場合
- 最適化結果をScene内で直接比較して承認する場合
- 自動ビルドフックを使えない外部パイプラインへbaked結果を渡す場合

顔ノーマルUV7、アウトラインUV8、キャラクター高さUV4は**メッシュチャンネルBake**であり、このドキュメントの軽量シェーダーBakeとは別です。→ [メッシュUVベイク](/guides/mesh-bakes)

---

## 実行前の確認

1. 元の`.mat`、Animator Controller、AnimationClipをバージョン管理へ記録します。
2. MingToon Managerのステップ1～3で、変換・役割・ルック・メッシュチャンネルの結果を先に確認します。
3. AnimatorやAnimationClipが後から有効にする可能性のあるパスを残すには、`アニメーション可能パスを保持（安全）`を有効にします。
4. スクリプトがランタイムで変更するもののAnimationClipには現れないプロパティは、その行の`ベイク除外（ランタイム変更）`で指定します。

:::caution[現在値だけを見てコードが削除される場合があります]
レイヤー数やAlpha Mask・Emission・Occlusionなどの機能が現在無効で、保持対象として検出されない場合は、bakedシェーダーから関連コードが削除されます。後からアニメーションやスクリプトで有効にしても動かない場合があります。
:::

## Bake

MingToon Managerのステップ4で`子階層のMingToonを軽量シェーダーへベイク`を実行します。

- `Assets/StudioRaming/MingToonGenerated`配下へ生成シェーダー・bakedマテリアル・必要なテクスチャ・Manifestが作成されます。
- Rendererの現在のスロットがbakedマテリアルへ置き換わります。
- キャンセルまたは途中段階で失敗した場合は、その実行で作成したアセットとスロット変更をロールバックします。
- 完了後、Consoleの`MingToon bake:`サマリーで処理したマテリアルと最適化数を確認します。

Prefabインスタンスで実行すると、Meshとマテリアルスロットの変更がインスタンスoverrideとして残ります。結果をPrefabアセットへ反映する場合は、Unityの`Overrides > Apply All`を別途使用してください。

---

## 復元

### 1つのbakedマテリアルだけ

bakedマテリアルを選択し、Inspector上部の`編集モードへ復元`を押します。Manifestに記録された元GUIDとRendererスロットを使います。

### プロジェクト内の手動Bakeをすべて整理

`Tools > Studio Raming > MingToon > Advanced > Restore And Clean Bake Output`を実行します。

このコマンドは次の順序を保証します。

1. Manifestに従ってRendererスロットを元の編集用マテリアルへ復元します。
2. 復元したScene・Prefab参照を保存します。
3. 記録された全スロットが実際に原本を参照しているか再確認します。
4. 復元を証明できた後にだけ生成アセットを削除します。

復元または保存に失敗した場合、生成フォルダーを先に削除しません。失敗した項目をConsoleへ残し、手動確認を求めます。

:::warning[変換復元とBake復元は異なります]
MingToon Managerのステップ1にある`変換を戻す（MingToon以前のマテリアルへ）`は、変換前シェーダーのマテリアルへ戻ります。`Restore And Clean Bake Output`はbakedマテリアルから現在の編集用MingToonマテリアルへ戻ります。
:::

### 復元ボタンが無効な場合

- Bake Manifestが残っているか確認します。
- 元の編集用マテリアルGUIDが有効か確認します。
- Bake後にRenderer階層やマテリアルスロット構成が変わっていないか確認します。
- Consoleのstale manual bake警告を確認します。

---

## テクスチャBakeポリシー

### LosslessOnly — デフォルト {#losslessonly-기본값}

元テクスチャのtexelを書き直しません。数学的に同一なマスク削除や、同一テクスチャ・同一UV式の共有など、ロスレスな構造最適化だけを許可します。

### ReviewedHighQuality {#reviewedhighquality}

:::caution[レビュー済みの静的マテリアルだけで選択してください]
surface/normal flattenと一般RGBA mask repackを許可します。imported texture readback、color space、mip再生成、プラットフォーム圧縮によってピクセルが変わる場合があります。

Animation dependencyと`ベイク除外`条件は引き続き検査しますが、baked前後の結果を対象プラットフォームで直接比較する必要があります。
:::

一般mask repackは複数マスクを共有テクスチャアセットへまとめられますが、シェーダーのテクスチャサンプル数が必ず減るとは限りません。

## Keep Editable {#keep-editable}

`ベイク除外（ランタイム変更）`はマテリアル単位の記録です。AnimationClipは自動解析されるため、主にランタイムスクリプトが変更する値や、外部システムが名前でアクセスする値へ使用してください。

## 次へ

[ビルド時の自動最適化](/workflow/build-optimization)・[VRChat](/platforms/vrchat)・[Warudo](/platforms/warudo)