---
id: conversion-internals
title: 변환 보고서 읽기
sidebar_position: 4
---

# 변환 보고서 읽기

**이 문서를 읽으면** lilToon 변환 후 Console에 쏟아지는 항목을 코드별로 해석하고, 무엇을 손으로 고쳐야 하는지 정확히 알 수 있습니다.

변환 직후 이런 줄이 나옵니다.

```text
MingToon 변환 완료: 슬롯 12개, 머티리얼 8개, 손실·미지원 기능 5건. 원본은 그대로 보존했습니다.
```

**`손실·미지원 기능` 건수가 0이 아니면 아래를 보세요.**

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
| `DecalRequiresBake` | 데칼 | 텍스처 레이어로 다시 배치 |
| `DissolveRequiresBake` | 디졸브 | 알파 마스크 + 애니메이션으로 재현 |
| `SecondEmissionRequiresBake` | 2번째 이미션 | 이미션 맵에 합쳐 굽기 |
| `EmissionMaskRequiresBake` | 이미션 마스크 | 이미션 맵에 합쳐 굽기 |

:::tip[이 다섯 개는 전부 "텍스처로 미리 구우면 된다"는 뜻입니다]
런타임에 계산하던 것을 정적 텍스처로 바꾸면 대부분 시각적으로 동일하게 재현됩니다. 애니메이션이 필요하다면 AnimationClip으로 옮기세요.
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

---

## 얼굴 판정 — Auto는 추측하지 않습니다

:::danger[Auto는 원본 재질의 얼굴 플래그만 읽습니다]
인스펙터가 그대로 말합니다.

> Auto는 **원본 재질이 직접 가진 얼굴 플래그만** 읽습니다. **이름으로 추측하지 않으니** 플래그가 없는 셰이더는 계속 Regular로 남고, 얼굴로 쓸 슬롯은 **직접 Face로 지정해야 합니다.**

즉 **lilToon처럼 얼굴 플래그를 가진 셰이더에서 변환할 때만 Auto가 얼굴을 찾아냅니다.** Standard나 URP Lit에서 변환하면 전부 `Regular`로 나옵니다.
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

---

## 원본 추적 (provenance)

변환 재질은 **원본 재질의 GUID를 임포터 userData에 기록**합니다. `원본 머티리얼 복구`가 이걸로 동작합니다.

기록이 깨지는 경우:

| 감사 메시지 | 의미 | 결과 |
|---|---|---|
| `importer userData written by another tool` | 다른 툴이 이미 userData를 쓰고 있어서, **데이터를 파괴하지 않으려고 GUID를 찍지 않았습니다** | `원본 복구` 사용 불가 |
| `Source material name is ambiguous; reconvert once to stamp its GUID.` | 이름만으로는 원본을 특정할 수 없음 | 한 번 다시 변환하면 GUID가 찍힙니다 |
| `The source material could not be resolved.` | 원본을 찾지 못함 | 원본이 삭제·이동됨 |

복구 결과에 `정확한 원본 GUID가 없거나 원본을 찾지 못한 슬롯: N개` 로 집계됩니다.

:::tip[다른 툴과 함께 쓴다면]
MingToon은 **남의 userData를 덮어쓰지 않습니다.** 대신 추적 기능을 포기합니다. 원본 복구가 필요하면 변환 전에 그 툴의 userData 사용 여부를 확인하세요.
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
| `surfaceLayers` ·
ormalLayers` · `matcapLayers` | 레이어가 몇 개로 옮겨졌는지 |
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
5. **얼굴 슬롯 판정** — 위 판정 근거 표
6. **레이어 개수** — 원본의 2nd/3rd 표면이 몇 번 레이어로 왔는지

## 관련 문서

- [밍툰 매니저 — 1 · 변환](/workflow/character-manager#1--변환)
- [lilToon 재질 변환](/workflow/liltoon-conversion)
- [텍스처 슬롯 공통 UI](/guides/texture-modules)
