---
id: vrchat
title: VRChat
sidebar_position: 2
---

# VRChat

**이 문서를 읽으면** VRChat PC 아바타에 MingToon을 올릴 때의 절차와, 깊이 효과가 어디까지 보장되는지 알게 됩니다.

:::caution 현재 상태
VRChat PC는 **수동 검증 대상이며 출시 인증이 완료되지 않았습니다.** 업로드 전에 아래 체크리스트를 직접 통과시키세요.

VRChat **Quest**는 MingToon의 직접 실행 대상이 아닙니다. → [지원 환경](/platforms/compatibility#vrchat-quest)
:::

## 업로드 체크리스트

1. **빌드 훅이 살아 있는지 확인** — 스크립트 리로드 후 Console에 `[MingToon] VRChat build hook compiled and registered.`가 있어야 합니다. 없으면 최적화가 아예 걸리지 않습니다.
2. **MingToon 런타임 `MonoBehaviour`가 0개인지 확인** — 아래 참고.
3. **업로드** — [빌드 시 자동 최적화](/workflow/build-optimization)가 자동으로 걸립니다. 수동 Bake는 필요하지 않습니다.
4. **SDK Builder로 최종 검증**
5. **인게임 확인** — 본인 화면 · 미러 · Photo Camera를 **각각** 봅니다.

## MonoBehaviour 제거

:::danger `IEditorOnly`는 자동 삭제 보증이 아닙니다
`IEditorOnly`는 VRC SDK의 incompatible-script **검사 표식**일 뿐입니다.

공식 Unity 2022.3.22f1 + 현행 SDK의 **실제 avatar build clone**을 열어 MingToon 런타임 `MonoBehaviour`가 0개인지 직접 확인하고, 남아 있으면 업로드 전에 명시적으로 제거하세요.
:::

## 깊이 효과가 어디까지 보장되나

2D 림 · 2D 그림자 · Inner Edge는 카메라 깊이 텍스처를 읽습니다. VRChat에서 이건 **월드 권한**입니다.

| 상황 | 깊이 | 근거 |
|---|---|---|
| **Photo Camera 활성 중** | ✅ | 공식 계약. 호스트가 `_VRChatCameraMode`를 0이 아닌 값으로 넘깁니다 |
| **월드가 Screen Camera depth를 켠 경우** | ✅ | 월드/Udon이 `VRCCameraSettings`로 요청 |
| **일반 플레이어 화면 (기본)** | ❌ | 아바타가 강제할 수 없습니다 |
| **미러 · 스트림 · handheld preview 내부 경로** | ⚠️ | 동일한 결과가 보장되지 않습니다 |

:::danger 아바타로는 해결할 수 없습니다
아바타에 Camera나 Light를 추가하는 것은 **동등한 해결책이 아닙니다.** 성능 비용을 올리거나 아바타 안전 설정에 의해 제거될 수 있습니다.

Screen Camera 설정은 월드/Udon 측 권한입니다.
참고: [VRC Camera Settings (공식 문서)](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/)
:::

### 빌드 시 자동으로 처리되는 것

아바타 업로드에서 MingToon은 `Depth Availability`가 `Auto`인 재질을 `Force On`으로 승격합니다.

`Auto`는 "호스트가 깊이가 있다고 말하면 믿는다"는 뜻인데, 그렇게 말해 주는 `MingDepthTextureProvider`가 `IEditorOnly`라 업로드에서 제거되기 때문에 VRChat에서는 그 신호가 영원히 도착하지 않습니다. 승격이 없으면 **깊이가 실제로 있는 월드에서도 2D 효과가 사라집니다.**

`Force On` / `Force Off`로 직접 지정한 값은 덮어쓰지 않습니다.

자세한 내용: [빌드 시 자동 최적화](/workflow/build-optimization#vrchat-깊이-자동-승격)

### 깊이가 없는 환경을 위한 대비

깊이를 못 쓰는 화면에서도 실루엣을 유지하려면, 깊이가 필요 없는 수단을 함께 켜 두세요.

- **Hull 외곽선** — 깊이 없이 동작합니다
- **림 라이트 (프레넬)** — 깊이 없이 동작합니다

→ [림과 외곽선](/guides/rim-and-outline)

## 다른 빌드 툴과 함께 쓸 때

MingToon의 VRChat 훅은 `callbackOrder = 2000`으로 늦게 실행됩니다. Modular Avatar나 VRCFury가 자기 콜백에서 재질을 다시 쓴 **뒤에** 분석하기 위해서입니다. 별도 설정은 필요 없습니다.

## VRChat + URP

지원하지 않습니다. BRP 제작본으로 전환하세요.

## 알아 둘 것

- **하드웨어 요구 사항** — MingToon은 셰이더 모델 4.5를 요구합니다. 만족하지 못하는 환경에서는 재질이 마젠타로 렌더링되고 다른 오류 메시지는 나오지 않습니다. → [지원 환경](/platforms/compatibility#하드웨어-요구-사항-필수)
- **조명을 통제할 수 없습니다** — `베이스 색 유지`와 `최소 밝기`를 올려 두면 어두운 월드에서 캐릭터가 검게 뭉개지지 않습니다. → [그림자 잡기](/guides/shadow#어두운-씬에서-검게-뭉칠-때)
