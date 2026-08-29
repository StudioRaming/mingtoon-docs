# Third-Party Credits and Licenses / 서드파티 차용 및 라이선스 / サードパーティ表記とライセンス

이 문서는 MingToon이 코드·수식·구현 방식을 수정 또는 차용한 공개 프로젝트와
그 적용 범위를 설명합니다. 아래 구성요소의 원 저작권과 원 라이선스는 그대로
유지됩니다. MingToon 자체 작성 부분에는 MingToon EULA가 적용되며, 이 문서는
원 라이선스가 부여한 권리를 제한하지 않습니다.

This document identifies open-source projects from which MingToon adapted or
modified code, expressions, or implementation behaviour. Their original
copyright and license terms remain in force. MingToon's independently written
surrounding code is covered by the MingToon EULA; that EULA does not narrow the
rights granted by the licenses reproduced below.

本書は、MingToon がコード・数式・実装方式を改変または採用した公開プロジェクトと、
その適用範囲を示します。各コンポーネントの著作権と原ライセンスは維持されます。
MingToon が独自に作成した周辺コードには MingToon EULA が適用されますが、
以下のライセンスが付与する権利を制限するものではありません。

---

## lilToon

- Project: lilToon 2.3.4 (`jp.lilxyzw.liltoon`)
- Author: lilxyzw
- Copyright: Copyright (c) 2020-present lilxyzw
- License: MIT License
- Upstream: https://github.com/lilxyzw/lilToon

### 차용·변경 범위

MingToon의 lilToon 재질 변환기와 선택형 UV 라우터는 lilToon의 프로퍼티 의미와
일부 셰이더 알고리즘을 밍툰 구조에 맞게 수정·차용합니다. 대상은 HSVG 색 보정,
UV0~UV3 선택, ST, 스크롤·회전, 데칼 위치·복제·반전, 스프라이트 시트 프레임 선택,
메인·2nd·3rd 표면 레이어와 두 발광 레이어의 독립 마스크 변환입니다.

이 구현은 밍툰의 BRP·URP 공용 모듈과 변환 데이터 모델에 맞춰 다시 구성한 변경판입니다.
원본 lilToon이라고 표시하지 않으며, 사용하지 않는 재질은 해당 선택형 경로를 켜지 않습니다.
AnimationClip 커브 재작성, Fur, Gem, 굴절은 이 차용 범위에 포함되지 않습니다.

### Adapted and modified scope

MingToon's lilToon material converter and optional UV router adapt lilToon's
property semantics and selected shader algorithms to MingToon's architecture.
The covered behaviour includes HSVG correction; UV0-UV3 selection; ST,
scrolling and rotation; decal placement, copy and flip modes; sprite-sheet
frame selection; and independent-mask conversion for the main, 2nd and 3rd
surface layers and both emission layers.

This is a modified implementation rebuilt around MingToon's shared BRP/URP
modules and conversion data model. It is not represented as the original
lilToon implementation, and materials that do not enable this optional path do
not use it. AnimationClip curve rewriting, Fur, Gem and refraction are outside
this adapted scope.

### 採用・変更範囲

MingToon の lilToon マテリアル変換と任意の UV ルーターは、lilToon の
プロパティ仕様と一部のシェーダーアルゴリズムを MingToon の構造に合わせて
改変・採用しています。対象は HSVG 色補正、UV0〜UV3 選択、ST、スクロール・回転、
デカールの配置・複製・反転、スプライトシートのフレーム選択、メイン・2nd・3rd
表面レイヤーと2つの発光レイヤーに対する独立マスク変換です。

これは MingToon の BRP・URP 共通モジュールと変換データモデルに合わせて再構成した
変更版です。元の lilToon 実装として表示せず、この任意経路を有効にしないマテリアルは
使用しません。AnimationClip カーブの書き換え、Fur、Gem、屈折は対象外です。

### lilToon MIT License (original text)

```text
MIT License

Copyright (c) 2020-present lilxyzw

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## NonToon / lilxyzw shader core

- Project: NonToon 0.1.3 (`jp.lilxyzw.nontoon`) and `jp.lilxyzw.shadercore`
- Author: lilxyzw
- Copyright: Copyright (c) 2026-present lilxyzw
- License: zlib License
- Upstream: https://github.com/lilxyzw/NonToon

### 차용·변경 범위

MingToon은 NonToon의 셰도우 캐스터 필 바이어스 카메라 방향 변조식과,
그림자맵 감쇠를 직사광에만 곱하고 SH 환경광을 가산 바닥으로 되돌리는 수광 구조를
수정·차용했습니다. 밍툰의 통합 그림자·레이어 합성, BRP·URP 패스 구조, 상수와
기본값에 맞게 변경했으며 원본 NonToon이라고 표시하지 않습니다.

### Adapted and modified scope

MingToon adapts NonToon's camera-facing modulation for the shadow-caster fill
bias and its lighting structure in which shadow-map attenuation multiplies the
direct-light term while SH ambient is restored as an additive floor. The
expressions are modified for MingToon's unified/layer shadow composites,
BRP/URP pass structure, constants and defaults, and are not represented as the
original NonToon implementation.

### 採用・変更範囲

MingToon は NonToon のシャドウキャスターフィルバイアスに対するカメラ方向変調式と、
シャドウマップ減衰を直接光にのみ乗算し、SH 環境光を加算の下限として戻す受光構造を
改変して採用しています。MingToon の統合／レイヤーシャドウ合成、BRP・URP パス構造、
定数と既定値に合わせた変更版であり、元の NonToon 実装として表示しません。

### NonToon zlib License (original text)

```text
Copyright (c) 2026-present lilxyzw

This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from the use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

   1. The origin of this software must not be misrepresented; you must not
      claim that you wrote the original software. If you use this software
      in a product, an acknowledgment in the product documentation would be
      appreciated but is not required.

   2. Altered source versions must be plainly marked as such, and must not be
      misrepresented as being the original software.

   3. This notice may not be removed or altered from any source distribution.
```

---

누락된 서드파티 차용이 보이면 `studioraming@gmail.com`으로 알려주세요.

Report a missing third-party attribution to `studioraming@gmail.com`.

記載漏れがある場合は `studioraming@gmail.com` までご連絡ください。
