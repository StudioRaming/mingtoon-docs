---
id: references
title: 参考資料
sidebar_position: 3
---

# 参考資料

MingToonの反射、ノーマルマップ合成、シャドウフィルタリングと色処理に使用される標準技法の参考資料です。各項目では、使用される機能と適用範囲を併せて説明します。トゥーン表現のための調整が含まれるため、すべての機能が以下の論文のモデル全体をそのまま再現しているわけではありません。

## GGX 微小面分布 {#ggx}

**使用箇所:** PBR直接光の反射におけるハイライト分布。表面の粗さに応じてハイライトが広がる基本形状にGGX分布を使用し、トゥーンハイライトの設定でその形を調整します。この項目は反射分布についての参考資料であり、論文の透過モデル全体を意味するものではありません。

Bruce Walter, Stephen R. Marschner, Hongsong Li, Kenneth E. Torrance (2007), [*Microfacet Models for Refraction through Rough Surfaces* — 著者提供の論文および資料](https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.html).

## Schlick のフレネル近似 {#schlick}

**使用箇所:** PBR反射の視線角度による変化。正面反射率から斜めの角度の反射率へつながるSchlickの形を使用します。既定の指数は5で、マテリアル設定で指数を変更するとトゥーン表現のための変形になります。

Christophe Schlick (1994), [*An Inexpensive BRDF Model for Physically-based Rendering* — 出版社の論文ページ](https://onlinelibrary.wiley.com/doi/10.1111/1467-8659.1330233).

## Reoriented Normal Mapping (RNM) {#rnm}

**使用箇所:** ノーマルマップのレイヤー合成。追加ノーマルの向きを既存のノーマルに合わせて合成し、表面の向きとディテールを同時に保ちます。MingToonはここにレイヤー強度の調整と数値安定化の処理を加えます。

Colin Barré-Brisebois, Stephen Hill (2012), [*Blending in Detail* — 著者の技術文書](https://blog.selfshadow.com/publications/blending-in-detail/).

## Interleaved Gradient Noise (IGN) {#ign}

**使用箇所:** シャドウフィルターのサンプル方向の分散とアルファディザリング。少ないサンプルで繰り返し模様が目立つ現象を抑えるために使用するノイズ数列です。表面に固定されるディザリングなど、座標の配置は機能に合わせて調整します。

Jorge Jimenez (2014), [*Next Generation Post Processing in Call of Duty: Advanced Warfare* — 著者の発表資料](https://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare/). 同じ数列と出典の表記は[Unity公式のRandom.hlsl (v10.10.1)](https://github.com/Unity-Technologies/Graphics/blob/v10.10.1/com.unity.render-pipelines.core/ShaderLibrary/Random.hlsl#L94-L102)でも確認できます。

## シャドウ可視性のフィルタリングとPCF {#pcf}

**使用箇所:** キャストシャドウの柔らかい境界。URPのシャドウマップ経路では、複数の深度比較の結果をまとめるPercentage-Closer Filtering (PCF)の原理を使用します。BRPのスクリーンスペース経路では、Unityが計算したシャドウ可視性を再サンプリングします。フィルターのサンプル配置と半径は、MingToonの表現に合わせて調整します。

William T. Reeves, David H. Salesin, Robert L. Cook (1987), *Rendering Antialiased Shadows with Depth Maps*. 原技法とGPU実装の解説: Michael Bunnell, Fabio Pellacini, [*GPU Gems*, Chapter 11: Shadow Map Antialiasing — NVIDIA公式資料](https://developer.nvidia.com/gpugems/gpugems/part-ii-lighting-and-shadows/chapter-11-shadow-map-antialiasing).

## 球面調和関数(SH)による環境光 {#sh}

**使用箇所:** Unityのライトプローブを通じた間接光。表面の向きに応じた柔らかい環境光をSHで評価するUnityの機能を使用します。以下の論文は、低次のSHで拡散照明を表現する理論的な背景です。MingToonの照明合成全体やLight Volumesのすべてを説明する資料ではありません。

Ravi Ramamoorthi, Pat Hanrahan (2001), [*An Efficient Representation for Irradiance Environment Maps* — 著者提供の論文および資料](https://graphics.stanford.edu/papers/envmap/).

## Reinhard 型の明度圧縮 {#reinhard}

**使用箇所:** 明度上限のソフトニー。上限に近い明度を滑らかに圧縮する際に、Reinhard型の有理関数カーブを使用します。MingToonはこのカーブを、設定した境界を超える明度に適用し、論文の露出推定や画面全体のトーンマッピングは行いません。

Erik Reinhard, Michael Stark, Peter Shirley, Jim Ferwerda (2002), [*Photographic Tone Reproduction for Digital Images* — University of Utah の論文PDF](https://www-old.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf).

## 標準の色合成モード {#blending}

**使用箇所:** テクスチャと効果レイヤーのNormal, Multiply, Screen, Overlay合成。一般的な0–1の色範囲では標準の合成式に対応します。HDRカラーのための拡張処理が含まれるため、範囲を超える値の結果までウェブの合成標準と同じという意味ではありません。

W3C, [*Compositing and Blending Level 1*, §10 — 公式の合成モード定義](https://www.w3.org/TR/compositing-1/#blending).

## 関連文書 {#related}

同梱された外部コンポーネントの著作権表示とライセンスは、[サードパーティクレジット](/legal/third-party-credits)で確認できます。
