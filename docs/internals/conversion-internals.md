---
id: conversion-internals
title: 변환 보고서 읽기
sidebar_position: 4
---

# 변환 보고서 레퍼런스

lilToon 재질을 변환하면 Console에 이런 줄이 나옵니다.

```text
MingToon 변환 완료: 슬롯 12개, 머티리얼 8개, 명시적 손실 5건. 원본은 그대로 보존했습니다.
```

`명시적 손실`이 0이 아니면 아래에서 코드를 찾으세요.
변환 순서는 [lilToon 재질 변환](/workflow/liltoon-conversion)에 있습니다.

## 심각도

| 심각도 | 뜻 | 집계 |
|---|---|---|
| Information | 변환이 의도대로 됐습니다 | 안 됨 |
| Lossy | 옮겼지만 결과가 달라질 수 있습니다 | 됨 |
| Unsupported | 옮기지 못했습니다 | 됨 |
| Error | 변환이 실패했습니다 | 됨 |

## 이슈 코드

19개 전부입니다. 알파벳 순서입니다.

| 코드 | 심각도 | 뜻 | 확인할 것 |
|---|---|---|---|
| AlphaApproximation | Lossy | 알파 처리 수식이 다릅니다 | 표면 모드와 알파 컷오프 |
| AnimatedUvRequiresBake | Unsupported | UV 스크롤·회전 애니메이션을 옮기지 못했습니다 | 애니메이션으로 다시 만드세요 |
| AudioLinkUnsupported | Unsupported | AudioLink 연동은 지원하지 않습니다 | 대안 없음 |
| ConversionFailed | Error | 이 재질의 변환이 실패했습니다 | 메시지 본문 |
| DecalRequiresBake | Unsupported | 데칼을 옮기지 못했습니다 | 추가 텍스처 레이어로 다시 배치 |
| DissolveRequiresBake | Unsupported | 디졸브를 옮기지 못했습니다 | 알파 마스크와 애니메이션으로 재현 |
| EmissionMaskRequiresBake | Unsupported | 이미션 마스크를 옮기지 못했습니다 | 이미션 맵에 합쳐 굽기 |
| FaceClassification | Information | 얼굴 판정 결과 보고입니다 | 아래 판정 근거 표 |
| FeatureUnsupported | Unsupported | 그 밖의 미지원 기능입니다 | 메시지에 이름이 나옵니다 |
| MissingTextureSkipped | Lossy | 원본이 쓰던 텍스처가 프로젝트에 없습니다 | 텍스처를 복구하고 다시 변환 |
| OutlineApproximation | Lossy | 아웃라인 폭·색 계산이 다릅니다 | 폭 모드와 압력 소스 |
| RimApproximation | Lossy | 림 수식이 다릅니다 | [림](/guides/rim) |
| SecondEmissionRequiresBake | Unsupported | 두 번째 이미션을 옮기지 못했습니다 | 이미션 맵에 합쳐 굽기 |
| ShadowApproximation | Lossy | 그림자 수식이 다릅니다 | [형태 그림자 경계](/guides/light-and-shadow#1-형태-그림자-경계--가장-먼저) |
| SourceDefaultsReplaced | Lossy | 원본 기본값이 MingToon 기본값으로 바뀌었습니다 | 원본이 기본값에 기대던 룩이면 달라집니다 |
| SourceExcluded | Information | 변환 제외 규칙에 걸린 원본입니다 | 메시지의 제외 근거 |
| SpecialSurfaceUnsupported | Unsupported | 퍼·젤리 같은 특수 표면은 대응이 없습니다 | 대안 없음 |
| UvApproximation | Lossy | UV 변형이 다릅니다 | 텍스처의 Tiling과 Offset |
| ValueClamped | Lossy | 값이 MingToon 범위로 잘렸습니다 | 원본이 범위를 넘는 값을 쓰고 있었습니다 |

:::caution[근사는 틀렸다는 뜻이 아닙니다]
셰이더가 다르면 같은 이름의 기능도 수식이 다릅니다.
변환은 상호 운용 도구이지 수학적 복제가 아닙니다.
근사 항목은 눈으로 보고 값을 다시 잡으라는 신호입니다.
:::

## 얼굴 판정

Auto는 원본 재질이 선언한 얼굴 플래그만 읽습니다.
이름이나 셰이더 브랜드로 얼굴을 추측하지 않습니다.

이름이 `Face`라고 얼굴이 아니고 `Body`에 얼굴이 섞여 있기도 합니다.
추측이 틀리면 얼굴 셰이딩이 엉뚱한 메시에 걸리고 원인을 찾기 어렵습니다.

### 판정 근거 표시 {#판정-근거-표시}

| 표시 | 뜻 | 확인 필요 |
|---|---|---|
| 얼굴 렌더러 직접 지정 | 사람이 렌더러를 지정했습니다 | 아니요 |
| 피부 렌더러 직접 지정 | 사람이 렌더러를 지정했습니다 | 아니요 |
| 재질 직접 지정 | 사람이 재질을 지정했습니다 | 아니요 |
| 재질 슬롯 지정 | 사람이 슬롯 단위로 고정했습니다 | 아니요 |
| 원본 얼굴 플래그 | 원본 셰이더가 얼굴이라고 표시했습니다 | 아니요 |
| 전체 변환 모드 | 일괄로 적용했습니다 | 예 |
| 일반 기본값 | 플래그가 없어 일반으로 남았습니다 | 예 |

### 역할 세 가지

| 역할 | 미리보기 | 받는 프리셋 |
|---|---|---|
| Face | 얼굴 셰이딩 | 얼굴용 |
| Skin | 피부 룩 | 피부용, 맨살 전용 |
| Common | 일반 셰이딩 | 공용 |

재질 인스펙터의 역할 행에서 셋 중 하나로 바꿀 수 있습니다.
아바타 전체 지정은 [밍툰 매니저](/workflow/character-manager#얼굴--피부-지정--가장-중요한-단계)에서 합니다.

:::note[보고서 파일에는 Regular로 적힙니다]
공용 역할은 내부 보고서와 감사 표에서 `Regular`라는 이름으로 기록됩니다.
화면의 Common과 같은 것입니다.
:::

## 원본 추적

변환된 재질은 원본 재질의 GUID를 기록합니다.
**변환 되돌리기 (MingToon 이전 재질로)** 가 이 기록으로 동작합니다.

| 감사 메시지 | 뜻 | 결과 |
|---|---|---|
| `importer userData written by another tool` | 다른 툴이 이미 그 자리를 쓰고 있습니다 | 되돌리기를 쓸 수 없습니다 |
| `Source material name is ambiguous; reconvert once to stamp its GUID.` | 이름만으로 원본을 특정하지 못했습니다 | 한 번 다시 변환하면 기록됩니다 |
| `The source material could not be resolved.` | 원본을 찾지 못했습니다 | 원본이 지워졌거나 옮겨졌습니다 |

복구 결과에 `정확한 원본 GUID가 없거나 원본을 찾지 못한 슬롯: N개`로 집계됩니다.

:::tip[다른 툴과 함께 쓴다면]
MingToon은 남의 기록을 덮어쓰지 않습니다. 대신 되돌리기를 포기합니다.
되돌리기가 필요하면 변환 전에 그 툴이 같은 자리를 쓰는지 확인하세요.
:::

## 감사 표의 열

감사 표는 탭으로 나뉜 18개 열입니다.

| 열 | 담는 내용 |
|---|---|
| `source` · `converted` | 원본과 변환 결과의 에셋 경로 |
| `resolution` | 원본을 어떻게 찾았는지 |
| `face` | 얼굴 판정 결과 (`Face` 또는 `Regular`) |
| `surfaceMode` · `renderQueue` · `cull` | 렌더 상태의 변환 전후 |
| `outlineCull` | 아웃라인 컬 모드의 변환 전후 |
| `stencil` · `outlineStencil` | 일반 패스와 아웃라인 패스의 스텐실 변환 전후 |
| `surfaceLayers` · `normalLayers` · `matcapLayers` | 레이어가 몇 장으로 옮겨졌는지 |
| `occlusion` | 오클루전 설정 |
| `passes` · `keywords` | 패스 수와 키워드 수의 변환 전후 |
| `mismatches` | 원본과 다르게 잡힌 항목 |
| `losses` | 손실 항목 |

`renderQueue differs: expected ...`가 나오면 표면 모드가 원본과 다르게 잡힌 것입니다.

## 변환 후 확인할 것

실제 모델에서 확인하세요. 인스펙터의 미리보기 구체로는 판단할 수 없습니다.

1. 마스크 채널 선택과 반전 — 가장 자주 틀어집니다
2. 텍스처의 Tiling과 Offset
3. 오클루전
4. 표면 모드 — 특히 머리카락이 컷아웃으로 왔는지
5. 얼굴 재질 판정 — 위 판정 근거 표
6. 레이어 개수 — 원본의 2nd·3rd 표면이 몇 번 레이어로 왔는지

## 관련 페이지

- [lilToon 재질 변환](/workflow/liltoon-conversion)
- [밍툰 매니저 — 1 · 변환](/workflow/character-manager#1--변환)
- [텍스처 슬롯 공통 UI](/guides/texture-modules)
