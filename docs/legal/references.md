---
id: references
title: 참고자료
sidebar_position: 3
---

# 참고자료

MingToon의 반사, 노멀맵 합성, 그림자 필터링과 색상 처리에 사용되는 표준 기법의 참고자료입니다. 각 항목은 사용되는 기능과 적용 범위를 함께 설명합니다. 툰 표현을 위한 조정이 포함되므로, 모든 기능이 아래 논문의 전체 모델을 그대로 재현하는 것은 아닙니다.

## GGX 미세면 분포 {#ggx}

**사용 부분:** PBR 직접광 반사의 하이라이트 분포. 표면의 거칠기에 따라 하이라이트가 퍼지는 기본 형태에 GGX 분포를 사용하고, 툰 하이라이트 설정으로 그 모양을 조정합니다. 이 항목은 반사 분포에 대한 참고자료이며 논문의 투과 모델 전체를 의미하지 않습니다.

Bruce Walter, Stephen R. Marschner, Hongsong Li, Kenneth E. Torrance (2007), [*Microfacet Models for Refraction through Rough Surfaces* — 저자 제공 논문 및 자료](https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.html).

## Schlick 프레넬 근사 {#schlick}

**사용 부분:** PBR 반사의 시선 각도에 따른 변화. 정면 반사율에서 비스듬한 각도의 반사율로 이어지는 Schlick 형태를 사용합니다. 기본 지수는 5이며, 재질 설정으로 지수를 변경하면 툰 표현을 위한 변형이 됩니다.

Christophe Schlick (1994), [*An Inexpensive BRDF Model for Physically-based Rendering* — 출판사 논문 페이지](https://onlinelibrary.wiley.com/doi/10.1111/1467-8659.1330233).

## Reoriented Normal Mapping (RNM) {#rnm}

**사용 부분:** 노멀맵 레이어 합성. 추가 노멀의 방향을 기존 노멀에 맞춰 합성하여 표면 방향과 디테일을 함께 유지합니다. MingToon은 여기에 레이어 강도 조절과 수치 안정화 처리를 적용합니다.

Colin Barré-Brisebois, Stephen Hill (2012), [*Blending in Detail* — 저자 기술 문서](https://blog.selfshadow.com/publications/blending-in-detail/).

## Interleaved Gradient Noise (IGN) {#ign}

**사용 부분:** 그림자 필터의 샘플 방향 분산과 알파 디더링. 적은 샘플로 반복 무늬가 두드러지는 현상을 줄이는 데 사용하는 노이즈 수열입니다. 표면에 고정되는 디더링 등 좌표 배치는 기능에 맞게 조정합니다.

Jorge Jimenez (2014), [*Next Generation Post Processing in Call of Duty: Advanced Warfare* — 저자 발표 자료](https://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare/). 같은 수열과 출처 표기는 [Unity 공식 Random.hlsl (v10.10.1)](https://github.com/Unity-Technologies/Graphics/blob/v10.10.1/com.unity.render-pipelines.core/ShaderLibrary/Random.hlsl#L94-L102)에서도 확인할 수 있습니다.

## 그림자 가시성 필터링과 PCF {#pcf}

**사용 부분:** 캐스트 섀도우의 부드러운 경계. URP 그림자맵 경로에서는 여러 깊이 비교 결과를 모으는 Percentage-Closer Filtering (PCF) 원리를 사용합니다. BRP 화면 공간 경로는 Unity가 계산한 그림자 가시성을 다시 샘플링합니다. 필터의 샘플 배치와 반경은 MingToon의 표현에 맞게 조정합니다.

William T. Reeves, David H. Salesin, Robert L. Cook (1987), *Rendering Antialiased Shadows with Depth Maps*. 원 기법과 GPU 구현 설명: Michael Bunnell, Fabio Pellacini, [*GPU Gems*, Chapter 11: Shadow Map Antialiasing — NVIDIA 공식 자료](https://developer.nvidia.com/gpugems/gpugems/part-ii-lighting-and-shadows/chapter-11-shadow-map-antialiasing).

## 구면조화함수(SH) 환경광 {#sh}

**사용 부분:** Unity 라이트 프로브를 통한 간접광. 표면 방향에 따른 부드러운 환경광을 SH로 평가하는 Unity 기능을 사용합니다. 아래 논문은 저차 SH로 확산 조명을 표현하는 이론적 배경입니다. MingToon의 전체 조명 합성이나 Light Volumes 전부를 설명하는 자료는 아닙니다.

Ravi Ramamoorthi, Pat Hanrahan (2001), [*An Efficient Representation for Irradiance Environment Maps* — 저자 제공 논문 및 자료](https://graphics.stanford.edu/papers/envmap/).

## Reinhard 형태의 밝기 압축 {#reinhard}

**사용 부분:** 밝기 상한의 소프트 니. 상한에 가까운 밝기를 부드럽게 압축할 때 Reinhard 형태의 유리함수 곡선을 사용합니다. MingToon은 이 곡선을 설정한 경계 위의 초과 밝기에 적용하며, 논문의 노출 추정이나 전체 화면 톤 매핑을 수행하지 않습니다.

Erik Reinhard, Michael Stark, Peter Shirley, Jim Ferwerda (2002), [*Photographic Tone Reproduction for Digital Images* — University of Utah 논문 PDF](https://www-old.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf).

## 표준 색상 합성 모드 {#blending}

**사용 부분:** 텍스처와 효과 레이어의 Normal, Multiply, Screen, Overlay 합성. 일반적인 0–1 색상 범위에서는 표준 합성식에 대응합니다. HDR 색상을 위한 확장 처리가 포함되므로 범위를 넘는 값의 결과까지 웹 합성 표준과 같다는 뜻은 아닙니다.

W3C, [*Compositing and Blending Level 1*, §10 — 공식 합성 모드 정의](https://www.w3.org/TR/compositing-1/#blending).

## 관련 문서 {#related}

포함된 외부 구성요소의 저작권 표시와 라이선스는 [서드파티 크레딧](/legal/third-party-credits)에서 확인할 수 있습니다.
