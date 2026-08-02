---
id: vrchat
title: VRChat
sidebar_position: 1
---

# VRChat

**이 문서를 읽으면** VRChat PC 아바타에 MingToon을 올릴 때의 절차와, 깊이 효과가 어디까지 보장되는지 알게 됩니다.

VRChat PC는 MingToon의 **주 대상**입니다.

:::caution[현재 상태]
클로즈 베타 기준 VRChat PC는 **수동 검증 대상이며 출시 인증이 완료되지 않았습니다.** 업로드 전에 아래 체크리스트를 직접 통과시키세요.

VRChat **Quest**는 MingToon의 직접 실행 대상이 아닙니다. → [지원 환경](/platforms/compatibility#vrchat-quest)
:::

## Unity 버전

:::danger[2022.3.22f1]
현행 VRChat SDK 기준입니다. MingToon의 VRChat 빌드 훅과 VRChat 런타임은 `UNITY_2022_3_OR_NEWER` 조건에서만 컴파일되므로, **2021.3에서는 이 코드가 아예 존재하지 않습니다.** 업로드는 되지만 자동 최적화도 깊이 승격도 걸리지 않습니다.

Warudo용 2021.3.45f2 프로젝트와 **같은 프로젝트를 쓸 수 없습니다.** 대상별로 나누세요.
:::

## 업로드 체크리스트

1. **빌드 훅 확인** — 스크립트 리로드 후 Console에 `[MingToon] VRChat build hook compiled and registered.` 가 있어야 합니다. 없으면 최적화가 아예 걸리지 않습니다.
2. **업로드 준비 점검 실행** — 밍툰 매니저의 `준비 상태 검사`. → [준비 상태 검사](/workflow/character-manager#내보내기--검증)
3. **업로드** — [빌드 시 자동 최적화](/workflow/build-optimization)가 자동으로 걸립니다. **수동 Bake는 필요하지 않습니다.**
4. **SDK Builder로 최종 검증**
5. **인게임 확인** — 본인 화면 · 미러 · Photo Camera를 **각각** 봅니다.

{/* SCREENSHOT: VRChat SDK Builder 화면 */}

## MingToon 컴포넌트는 지우지 마세요

:::danger[직접 제거하면 최적화 범위를 잃습니다]
MingToon 런타임 컴포넌트는 **VRChat 업로드에서 자동으로 제거됩니다.** 손으로 지울 필요가 없습니다.

**밍툰 매니저를 지우면 캐시된 렌더러 목록이 함께 사라지고, 업로드 최적화가 그 범위를 잃습니다.** 최적화되지 않은 재질이 그대로 올라갑니다.
:::

MingToon이 아닌 다른 스크립트가 남아 있다면 그건 정리 대상입니다. 밍툰 매니저의 `VRChat 사전 점검`이 **VRChat이 허용하지 않는 컴포넌트**를 세어서 알려 줍니다.

:::note[Warudo는 반대입니다]
Warudo 모드는 **스크립트를 유지하는** 별도 규칙을 따릅니다. → [Warudo](/platforms/warudo#스크립트-정책이-vrchat과-다릅니다)
:::

## 깊이 효과가 어디까지 보장되나

깊이 림 · 2D 그림자 · 내부 2D 경계는 카메라 깊이 텍스처를 읽습니다. VRChat에서 이건 **월드 권한**입니다.

| 상황 | 깊이 | 근거 |
|---|---|---|
| **Photo Camera 활성 중** | ✅ | 공식 계약. 호스트가 `_VRChatCameraMode`를 0이 아닌 값으로 넘깁니다 |
| **월드가 Screen Camera depth를 켠 경우** | ✅ | 월드/Udon이 `VRCCameraSettings`로 요청 |
| **일반 플레이어 화면 (기본)** | ❌ | 아바타가 강제할 수 없습니다 |
| **미러 · 스트림 · handheld preview 내부 경로** | ⚠️ | 동일한 결과가 보장되지 않습니다 |

:::danger[아바타로는 해결할 수 없습니다]
아바타에 Camera나 Light를 추가하는 것은 **동등한 해결책이 아닙니다.** 성능 비용을 올리거나 아바타 안전 설정에 의해 제거될 수 있습니다.

Screen Camera 설정은 월드/Udon 측 권한입니다.
참고: [VRC Camera Settings (공식 문서)](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/)
:::

### 빌드 시 자동으로 처리되는 것

아바타 업로드에서 MingToon은 `Depth Availability`가 `Auto`인 재질을 `Force On`으로 승격합니다.

`Auto`는 "호스트가 깊이가 있다고 말하면 믿는다"는 뜻인데, 그렇게 말해 주는 `MingDepthTextureProvider`가 `IEditorOnly`라 업로드에서 제거되기 때문에 VRChat에서는 그 신호가 영원히 도착하지 않습니다. 승격이 없으면 **깊이가 실제로 있는 월드에서도 2D 효과가 사라집니다.**

`Force On` / `Force Off`로 직접 지정한 값은 덮어쓰지 않습니다.

자세한 내용: [빌드 시 자동 최적화](/workflow/build-optimization#vrchat-깊이-자동-승격)

### 깊이 없이도 실루엣이 서게 만들기

일반 플레이어 화면에서는 깊이가 없다고 가정하고 룩을 잡는 편이 안전합니다. **깊이가 필요 없는 수단**으로 바닥을 깔아 두세요.

| 수단 | 문서 |
|---|---|
| **노멀 아웃라인** | [아웃라인](/guides/outline) |
| **림 라이트 · 림 셰이드** | [림](/guides/rim) |
| **형태 그림자 · 그림자 투영** | [조명과 그림자](/guides/light-and-shadow) |
| **그림자 패턴 (형태 그림자에 적용)** | [그림자 패턴](/guides/shadow-pattern) |

깊이 기반 효과는 **Photo Camera에서 더 좋아 보이는 보너스**로 취급하는 것이 현실적입니다.

## 다른 빌드 툴과 함께 쓸 때

MingToon의 VRChat 훅은 `callbackOrder = 2000`으로 늦게 실행됩니다. Modular Avatar나 VRCFury가 자기 콜백에서 재질을 다시 쓴 **뒤에** 분석하기 위해서입니다. 별도 설정은 필요 없습니다.

## 조명을 통제할 수 없다는 전제

월드마다 조명이 완전히 다릅니다. 아래를 올려 두면 어떤 월드에서도 캐릭터가 무너지지 않습니다.

| 항목 | 이유 |
|---|---|
| `베이스 색 유지` (간단 모드: 베이스 색상 보존) | 어두운 월드에서 원화 색 유지 |
| `최종 최소 밝기` | 검게 뭉개지지 않게 |
| `최종 최대 밝기` | 과노출 월드에서 하얗게 날아가지 않게 |
| `씬 조명 색 영향`을 낮게 | 색 조명 월드에서 캐릭터가 물들지 않게 |
| 림의 `씬 조명 영향`을 낮게 | 어디서나 림이 일정하게 |

→ [조명과 그림자](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)

## VRChat + URP

지원하지 않습니다. BRP 제작본으로 전환하세요.

## 알아 둘 것

**하드웨어 요구 사항** — MingToon은 셰이더 모델 4.5를 요구합니다. 만족하지 못하는 환경에서는 재질이 마젠타로 렌더링되고 다른 오류 메시지는 나오지 않습니다. → [지원 환경](/platforms/compatibility#하드웨어-요구-사항-필수)

**Validate Project** — 2022.3.22f1에서는 Unity 버전 관련 오류나 경고가 나오지 않습니다. 반대로 **2021.3 프로젝트에 VRC SDK가 들어 있으면** `MING-VRC-UNITY-VERSION` 경고로 "아바타 업로드 지원이 없다"고 알려 줍니다. → [Validator 코드](/reference/validator)
