# 参考資料

MingToon の反射、ノーマルマップの合成、影のフィルタリング、色処理で使用する標準的な技法の参考資料です。各項目に使用する機能と適用範囲を記載しています。トゥーン表現のための調整を含むため、引用したモデルの全体をそのまま再現するものではありません。

## GGX マイクロファセット分布 {#ggx}

**使用箇所：** PBR の直接光反射におけるハイライト分布。表面の粗さに応じた基本形状に GGX 分布を使用し、トゥーンハイライトの設定で形状を調整します。この参考資料は反射分布に関するもので、論文の透過モデル全体を指すものではありません。

Bruce Walter, Stephen R. Marschner, Hongsong Li, Kenneth E. Torrance (2007), [*Microfacet Models for Refraction through Rough Surfaces* — 著者公開の論文と資料](https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.html)。

## Schlick のフレネル近似 {#schlick}

**使用箇所：** 視線角度に応じた PBR 反射の変化。正面からの反射率と斜めからの反射率をつなぐ Schlick 型の応答を使用します。指数の既定値は 5 で、マテリアル設定で変更するとトゥーン表現向けの変形になります。

Christophe Schlick (1994), [*An Inexpensive BRDF Model for Physically-based Rendering* — 出版社の論文ページ](https://onlinelibrary.wiley.com/doi/10.1111/1467-8659.1330233)。

## Reoriented Normal Mapping (RNM) {#rnm}

**使用箇所：** ノーマルマップのレイヤー合成。追加するノーマルを既存のノーマルの方向に合わせて合成し、表面の向きとディテールを保ちます。MingToon ではレイヤー強度の調整と数値安定化処理を加えています。

Colin Barré-Brisebois, Stephen Hill (2012), [*Blending in Detail* — 著者による技術記事](https://blog.selfshadow.com/publications/blending-in-detail/)。

## Interleaved Gradient Noise (IGN) {#ign}

**使用箇所：** 影フィルターのサンプル方向の分散とアルファディザリング。少ないサンプル数で繰り返し模様を目立ちにくくするためのノイズ列です。表面に固定するディザリングなど、座標の配置は機能に合わせて調整しています。

Jorge Jimenez (2014), [*Next Generation Post Processing in Call of Duty: Advanced Warfare* — 著者の発表資料](https://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare/)。同じノイズ列と出典表記は [Unity 公式の Random.hlsl (v10.10.1)](https://github.com/Unity-Technologies/Graphics/blob/v10.10.1/com.unity.render-pipelines.core/ShaderLibrary/Random.hlsl#L94-L102)でも確認できます。

## 影の可視性フィルタリングと PCF {#pcf}

**使用箇所：** キャストシャドウの境界を柔らかくする処理。URP のシャドウマップ経路では、複数の深度比較結果をまとめる Percentage-Closer Filtering (PCF) の原理を使用します。BRP のスクリーンスペース経路では、Unity が計算した影の可視性を再サンプリングします。サンプル配置とフィルター半径は MingToon の表現に合わせて調整しています。

William T. Reeves, David H. Salesin, Robert L. Cook (1987), *Rendering Antialiased Shadows with Depth Maps*。元の技法と GPU 実装の解説：Michael Bunnell, Fabio Pellacini, [*GPU Gems*, Chapter 11: Shadow Map Antialiasing — NVIDIA 公式資料](https://developer.nvidia.com/gpugems/gpugems/part-ii-lighting-and-shadows/chapter-11-shadow-map-antialiasing)。

## 球面調和関数（SH）による環境光 {#sh}

**使用箇所：** Unity ライトプローブによる間接光。表面方向に応じた滑らかな環境光を SH で評価する Unity の機能を使用します。以下の論文は、低次 SH による拡散照明の理論的背景です。MingToon の照明合成全体や Light Volumes 全体を説明するものではありません。

Ravi Ramamoorthi, Pat Hanrahan (2001), [*An Efficient Representation for Irradiance Environment Maps* — 著者公開の論文と資料](https://graphics.stanford.edu/papers/envmap/)。

## Reinhard 型の明るさ圧縮 {#reinhard}

**使用箇所：** 明るさの上限に対するソフトニー。上限付近の明るさを滑らかに圧縮するために、Reinhard 型の有理関数曲線を使用します。MingToon では設定した境界を超える明るさに適用し、論文の露出推定や画面全体のトーンマッピングは行いません。

Erik Reinhard, Michael Stark, Peter Shirley, Jim Ferwerda (2002), [*Photographic Tone Reproduction for Digital Images* — University of Utah の論文 PDF](https://www-old.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf)。

## 標準的な色の合成モード {#blending}

**使用箇所：** テクスチャとエフェクトレイヤーの Normal、Multiply、Screen、Overlay 合成。通常の 0–1 の色範囲では標準的な合成式に対応します。HDR カラー向けの拡張処理を含むため、範囲外の値までウェブの合成標準と同じ結果になるという意味ではありません。

W3C, [*Compositing and Blending Level 1*, §10 — 合成モードの公式定義](https://www.w3.org/TR/compositing-1/#blending)。

## 関連ドキュメント {#related}

同梱する外部コンポーネントの著作権表記とライセンスは、[サードパーティのクレジット](/legal/third-party-credits)で確認できます。
