---
id: conversion-internals
title: 변환 보고서 읽기
sidebar_position: 4
---

# 변환 보고서 읽기

**이 문서를 읽으면** lilToon 변환 후 Console에 쏟아지는 항목을 코드별로 해석하고, 무엇을 손으로 고쳐야 하는지 정확히 알 수 있습니다.

변환 직후 이런 줄이 나옵니다.

```text
MingToon 변환 완료: 슬롯 12개, 머티리얼 8개, 명시적 손실 5건. 원본은 그대로 보존했습니다.
```

**`명시적 손실` 건수가 0이 아니면 아래를 보세요.**

---

## 심각도 4단계

| 심각도 | 뜻 | 대응 |
|---|---|---|
| `Information` | 정보. 변환은 의도대로 됨 | 읽고 넘어가도 됨 |
| **`Lossy`** | 옮겼지만 **결과가 달라질 수 있음** | 실제 모델에서 확인 필요 |
| **`Unsupported`** | **옮기지 못함** | 직접 다시 만들거나 포기 |
| `Error` | 변환 실패 | 조치 필요 |

집계에 잡히는 것은 `Lossy` · `Unsupported` · `Error` 셋입니다.

---

## 이슈 코드 전체

### 근사 — 옮겼지만 수식이 다름

| 코드 | 무엇이 근사되었나 | 확인할 것 |
|---|---|---|
| `SourceDefaultsReplaced` | 원본의 기본값이 MingToon 기본값으로 대체됨 | 원본이 기본값에 의존하던 룩이면 달라집니다 |
| `ShadowApproximation` | 그림자 수식이 다름 | [형태 그림자 경계·밝기](/guides/light-and-shadow#1-형태-그림자-경계--가장-먼저)를 다시 잡으세요 |
| `OutlineApproximation` | 아웃라인 폭·색 계산이 다름 | 폭 모드와 압력 소스를 확인 |
| `RimApproximation` | 림 수식이 다름 | [림](/guides/rim) |
| `AlphaApproximation` | 알파 처리가 다름 | 표면 모드와 알파 컷오프 |
| `UvApproximation` | UV 변형이 다름 | 텍스처 ST |
| `ValueClamped` | 값이 MingToon 범위로 잘림 | 원본이 범위를 넘는 값을 쓰고 있었습니다 |

:::caution[근사는 "틀렸다"가 아닙니다]
서로 다른 셰이더는 수식과 기능의 의미가 같지 않습니다. 변환은 **상호 운용 도구**이지 수학적 복제가 아닙니다. 근사 항목은 **눈으로 확인하고 값을 다시 잡으라**는 신호입니다.
:::

### 굽기가 필요함 — 런타임에 재현 불가

| 코드 | 원본 기능 | 대안 |
|---|---|---|
| `AnimatedUvRequiresBake` | UV 스크롤/회전 애니메이션 | 텍스처를 미리 굽거나 애니메이션으로 재현 |
| `DecalRequiresBake` | 데칼 | 추가 텍스처로 다시 배치 |
| `DissolveRequiresBake` | 디졸브 | 알파 마스크 + 애니메이션으로 재현 |
| `SecondEmissionRequiresBake` | 2번째 이미션 | 이미션 맵에 합쳐 굽기 |
| `EmissionMaskRequiresBake` | 이미션 마스크 | 이미션 맵에 합쳐 굽기 |

:::note[정적 텍스처로 대체할 수 있는 범위]
이 코드는 변환 시 해당 기능을 그대로 옮기지 못했다는 보고입니다. 정적인 무늬나 색은 텍스처에 합칠 수 있지만, 시간에 따라 움직이는 UV·디졸브·발광은 한 장의 텍스처만으로 보존되지 않습니다. 필요한 움직임을 별도로 재구성하고 결과를 비교하세요.
:::

### 미지원 — 옮길 수 없음

| 코드 | 의미 |
|---|---|
| `SpecialSurfaceUnsupported` | 원본의 특수 표면(퍼, 젤리 등)은 MingToon에 대응이 없습니다 |
| `AudioLinkUnsupported` | AudioLink 연동은 지원하지 않습니다 |
| `FeatureUnsupported` | 그 밖의 미지원 기능. 메시지에 이름이 나옵니다 |

### 자산·판정

| 코드 | 의미 | 조치 |
|---|---|---|
| `MissingTextureSkipped` | 원본이 참조하던 텍스처가 프로젝트에 없음 | 텍스처를 복구하고 재변환 |
| `FaceClassification` | 얼굴 판정 결과 보고 | 아래 참고 |
| `ConversionFailed` | 해당 재질 변환 실패 | 메시지 확인 |
| `SourceExcluded` | 변환 제외 규칙에 해당하는 원본 | 메시지의 제외 근거와 대상으로 선택한 재질을 확인 |

---

## 얼굴 판정 — Auto는 추측하지 않습니다

:::note[Auto 판정의 범위]
Auto는 지원 어댑터가 읽을 수 있는 **원본 재질의 얼굴 플래그**를 확인합니다. 이름이나 셰이더 브랜드만으로 얼굴을 확정하지 않습니다. 플래그가 없고 직접 지정도 없다면 일반 역할로 남을 수 있습니다. Manager의 Face Mesh·Skin Mesh를 먼저 지정하고 판정 근거를 확인하세요.
:::

이름 기반 추측을 없앤 것은 의도된 변경입니다. 이름이 `Face`라고 반드시 얼굴이 아니고 `Body`에 얼굴이 섞여 있을 수도 있는데, 추측이 맞을 때보다 틀릴 때의 비용이 훨씬 큽니다 — 얼굴 셰이딩이 엉뚱한 메시에 걸리면 원인을 찾기 어렵습니다.

### 판정 근거 표시 {#판정-근거-표시}

| 표시 | 의미 | 신뢰도 |
|---|---|---|
| 오브젝트/렌더러 지정 | `얼굴 렌더러 직접 지정`·`피부 렌더러 직접 지정`으로 사람이 지정 | ✅ |
| 재질 직접 지정 · 재질 슬롯 지정 | 슬롯 단위로 사람이 고정 | ✅ |
| 원본 얼굴 플래그 | 원본 셰이더가 얼굴이라고 표시 | ✅ |
| 전체 변환 모드 | 일괄 적용 | ⚠️ |
| 일반 기본값 | 플래그가 없어 Regular로 남음 | ⚠️ **확인 필요** |

### 역할 세 가지

| 역할 | 미리보기 | 받는 프리셋 값 |
|---|---|---|
| `Face` | 얼굴 셰이딩 | 얼굴용 |
| `Skin` | 피부 룩 | 피부용 — **맨살 전용** |
| `Regular` | 일반 셰이딩 | 공용 |

→ [밍툰 매니저](/workflow/character-manager#얼굴--피부-지정--가장-중요한-단계)

표시상의 공용 역할은 내부 보고서에서 `Regular`로 기록될 수 있습니다. 일반 배포판에서도 재질 인스펙터의 역할 행으로 Face·Skin·Common을 직접 바꿀 수 있습니다. 아바타 전체 지정은 Manager에서 유지하세요.

---

## 원본 추적 (provenance)

변환 재질은 **원본 재질의 GUID를 임포터 userData에 기록**합니다. `변환 되돌리기 (MingToon 이전 재질로)`가 이걸로 동작합니다.

기록이 깨지는 경우:

| 감사 메시지 | 의미 | 결과 |
|---|---|---|
| `importer userData written by another tool` | 다른 툴이 이미 userData를 쓰고 있어서, **데이터를 파괴하지 않으려고 GUID를 찍지 않았습니다** | `변환 되돌리기` 사용 불가 |
| `Source material name is ambiguous; reconvert once to stamp its GUID.` | 이름만으로는 원본을 특정할 수 없음 | 한 번 다시 변환하면 GUID가 찍힙니다 |
| `The source material could not be resolved.` | 원본을 찾지 못함 | 원본이 삭제·이동됨 |

복구 결과에 `정확한 원본 GUID가 없거나 원본을 찾지 못한 슬롯: N개` 로 집계됩니다.

:::tip[다른 툴과 함께 쓴다면]
MingToon은 **남의 userData를 덮어쓰지 않습니다.** 대신 추적 기능을 포기합니다. 변환 되돌리기가 필요하면 변환 전에 그 툴의 userData 사용 여부를 확인하세요.
:::

---

## 감사 표 (audit)

변환 감사는 탭 구분 표를 만듭니다.

```text
source  converted  resolution  face  surfaceMode  renderQueue  cull
        surfaceLayers  normalLayers  matcapLayers  occlusion  passes
        keywords  mismatches  losses
```

| 열 | 확인할 것 |
|---|---|
| `resolution` | 원본을 어떻게 찾았는지 |
| `face` | 얼굴 판정 결과 |
| `surfaceMode` · `renderQueue` · `cull` | 렌더 상태가 원본과 맞는지 |
| `surfaceLayers` · `normalLayers` · `matcapLayers` | 레이어가 몇 개로 옮겨졌는지 |
| `passes` · `keywords` | 컴파일되는 코드 모양 |
| `mismatches` | 원본과 다른 항목 |
| `losses` | 손실 항목 |

`renderQueue differs: expected ...` 가 나오면 표면 모드가 원본과 다르게 잡힌 것입니다.

---

## 변환 후 반드시 확인할 것

보고서를 읽은 뒤 **실제 모델에서** 확인하세요. 인스펙터 프리뷰 구체로는 판단할 수 없습니다.

1. **마스크 채널 선택과 반전** — 가장 자주 틀어지는 곳
2. **텍스처 ST** (Tiling / Offset)
3. **AO**
4. **표면 모드** — 특히 머리카락이 컷아웃으로 왔는지
5. **얼굴 재질 판정** — 위 판정 근거 표
6. **레이어 개수** — 원본의 2nd/3rd 표면이 몇 번 레이어로 왔는지

## 관련 문서

- [밍툰 매니저 — 1 · 변환](/workflow/character-manager#1--변환)
- [lilToon 재질 변환](/workflow/liltoon-conversion)
- [텍스처 슬롯 공통 UI](/guides/texture-modules)
