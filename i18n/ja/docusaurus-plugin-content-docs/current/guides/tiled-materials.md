---
id: tiled-materials
title: タイルドマテリアルコンポーザー
sidebar_position: 16
---

# タイルドマテリアルコンポーザー

**用途:** 1つの物理マテリアルスロットで、RGBAリージョンマスクから最大4つの論理領域をTexture Stack、Normal、MatCapレイヤーへ接続します。布・革・金属など、繰り返し表面を別々に扱いたい場合に使います。

**StudioRaming > MingToon > Tiled Material Composer**を開きます。このツールはメッシュ、サブメッシュ、Rendererを編集しません。

## 最初の設定

1. 対象を**MingToon Material**に指定します。
2. R/G/B/A領域を持つTexture2Dを**Packed Region Mask**に指定します。
3. 4つのカードで領域を**Enabled**のままにし、チャンネルとマップを設定します。
4. **Apply Four Logical Regions**を押します。

Applyボタンはマテリアルとパックマスクが設定されると有効になります。ウィンドウは常に4枚の領域カードを作るため、別のregion入力を埋める必要はありません。

既定は領域1=R、2=G、3=B、4=Aで、名前はCloth、Leather、Metal、Labelです。カードごとに名前とチャンネルを変更できます。

## 領域カードの項目

| 項目 | 範囲または効果 |
|---|---|
| **Enabled** | オフにしてApplyすると、その領域の表面・ノーマル・MatCapスロットを消去 |
| **Mask Channel** | その領域が読むR/G/B/A |
| **Surface Texture** | 繰り返す表面マップ |
| **Surface Tiling** | 表面マップのUV繰り返し |
| **Surface Tint** | 表面レイヤーへ掛ける色 |
| **Surface Opacity** | 表面レイヤーの量、0～1 |
| **Normal Map / Normal Strength** | ノーマルマップと強度、0～2 |
| **Matcap Map / Matcap Strength** | MatCapマップと強度、0～20 |

マップを空にしても次のApplyでそのスロットが消去されます。Normal Mapだけを空にすれば、その領域のノーマルだけが消去され、表面とMatCapは別に処理されます。

## Applyが書き込む先

Applyは4枚すべてのカードを処理します。Enabledでマップがある項目はレイヤースロットへ書き込み、空のマップと無効カードは明示的に消去します。

| カードの値 | MingToonの対象 |
|---|---|
| 表面マップ、Tiling、Tint、Opacity、パックマスク、チャンネル | Texture Stack |
| ノーマルマップ、Tiling、強度、パックマスク、チャンネル | Normalレイヤー |
| MatCapマップ、強度、パックマスク、チャンネル | MatCapレイヤー |
| 最後に使ったスロット番号 | 各モジュールの有効化とレイヤー数 |

最初のノーマルカードはMingToonの基本**Bump Map**スロットを使います。最初のカードを無効にした場合、コンポーザーがその領域マスクを所有していなければ手動Bump Mapが残ることがあります。手動ノーマルを消す場合は対象スロットを別途確認してください。Applyは1つのUndo単位です。

## マスクを作るとき

各チャンネルは領域の重みです。同じピクセルで複数チャンネルが明るいと、レイヤー効果が重なって合成されます。重なりが意図したものか確認し、必要なら境界を滑らかにします。

表面・ノーマルマップはカードのTilingを使います。パックマスクはコンポーザーの選択用で、大きなイラスト1枚を自動的に4分割するものではありません。Surface Modeとレンダーキューはマテリアル単位なので、領域ごとに違うモードが必要ならマテリアルを分けます。

## Apply後

[ディテールマップ](/guides/detail-maps)でStack、Normal、MatCapのレイヤー数と強度を確認し、[テクスチャスロット共通UI](/guides/texture-modules)で各マップのTiling / Offsetを調整します。コンポーザーは通常のレイヤープロパティを書き込むだけで、別のランタイムモードは作りません。

## Applyが無効、または結果がない場合

- Applyが無効なら、対象マテリアルとPacked Region Maskの両方を指定します。
- 領域が見えないなら、Enabled、マップ、Mask Channelが実際に塗ったチャンネルと一致するか確認します。
- 古い領域が残るなら、カードを無効にするかマップを空にして再度Applyします。
- 想定外に重なるなら、重複するマスクチャンネルと境界を確認します。
- レイヤーが見えないなら、最後に使ったスロットまでそのモジュールのレイヤー数を上げます。

## 関連文書

- [ディテールマップ](/guides/detail-maps)
- [テクスチャスロット共通UI](/guides/texture-modules)
- [モジュールと性能コスト](/internals/module-cost)
