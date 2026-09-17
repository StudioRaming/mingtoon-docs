---
id: compatibility
title: 지원 환경
sidebar_position: 2
---

# 지원 환경

> 이 페이지는 내 환경에서 MingToon이 되는지 확인하려는 분을 위한 것입니다.

## 30초 판정

아래 세 가지가 전부 예이면 쓸 수 있습니다.

1. PC입니다. Windows·macOS·Linux 중 하나입니다.
2. Unity 2021.3 또는 2022.3으로 프로젝트를 엽니다.
3. VRChat에 올릴 거라면 Unity 2022.3.22f1입니다.

하나라도 아니면 아래 표에서 해당 항목을 보세요.

## Unity 버전 {#unity-버전}

| 대상 | Unity | 이유 |
|---|---|---|
| **VRChat PC** | **2022.3.22f1** | 현행 VRChat SDK 기준입니다. VRChat 연동 코드가 2022.3 스트림에서만 컴파일됩니다 |
| **WARUDO** | **2021.3.45f2** | WARUDO Mod SDK 0.14.3.10 기준입니다 |
| 일반 Unity | 2021.3 또는 2022.3 | 둘 다 지원 스트림입니다 |

:::caution[한 프로젝트로 두 대상을 겸할 수 없습니다]
VRChat과 WARUDO는 에디터 버전이 다릅니다. 대상별로 프로젝트를 나누세요.
:::

### Validate Project가 버전을 판정하는 방식

지원 에디터 스트림은 2021.3과 2022.3 둘 다입니다. 어느 쪽이든 `MING-ENV-UNITY-VERSION` 오류는 나오지 않습니다.

VRC SDK가 있는데 에디터가 2022.3 스트림이 아니면 `MING-VRC-UNITY-VERSION` 경고가 뜹니다.

이 경고는 아바타 업로드 지원이 없다는 뜻입니다. 다른 대상은 영향을 받지 않습니다.
→ [Validate Project 코드](/reference/validator#ming-vrc-unity-version)

## 하드웨어 요구 사항 (필수) {#하드웨어-요구-사항-필수}

MingToon의 모든 패스는 셰이더 모델 4.5를 선언합니다.

| 플랫폼 | 지원 |
|---|---|
| Windows · macOS · Linux (DirectX 11 이상 · Vulkan · Metal) | 지원 |
| Android · Quest | 지원 안 함 |
| iOS | 지원 안 함 |
| WebGL | 지원 안 함 |

:::danger[조건을 못 맞추면 조용히 실패합니다]
셰이더 모델 4.5를 못 맞추는 플랫폼에서는 SubShader가 통째로 탈락합니다.
결과는 재질이 마젠타로 보이는 것뿐이고, 오류 메시지는 나오지 않습니다.
:::

현재 빌드 타깃이 조건을 못 맞추면 `MING-ENV-BUILD-TARGET` 오류가 나옵니다. `StudioRaming > MingToon > Validate Project`로 확인하세요.

## 환경별 호환성

상태 표기의 뜻은 아래와 같습니다.

- **주 대상** — 개발과 회귀 검증을 이 환경에서 합니다.
- **검증 대기** — 동작하도록 만들었지만 실기 확인이 끝나지 않았습니다.
- **지원 안 함** — 동작을 보장하지 않습니다.

| 환경 | 상태 | 필요한 조치 |
|---|---|---|
| **VRChat PC** (2022.3.22f1 · BRP) | 주 대상 | → [VRChat](/platforms/vrchat) |
| **WARUDO 0.14.3.10** (2021.3.45f2 · BRP) | 검증 대기 | → [Warudo](/platforms/warudo) |
| 일반 Unity **BRP** | 검증 대기 | 깊이 효과를 쓰면 카메라 Depth Texture를 켭니다 |
| Unity 2021.3 **URP 12.x** | 검증 대기 | MingToon URP 셰이더와 Renderer Feature 설치 |
| **VRChat Quest** | 지원 안 함 | 아래 참고 |
| VRChat + URP | 지원 안 함 | BRP 제작본으로 전환 |

:::caution[URP 13 이상은 지원 범위가 아닙니다]
URP는 Unity 2021.3 + URP 12.x만 대상입니다. 동작하는 것처럼 보여도 지원으로 보지 마세요.
:::

## VRChat Quest {#vrchat-quest}

MingToon은 모바일 셰이더 타깃이 아닙니다. Quest에 MingToon 셰이더를 그대로 올릴 수 없습니다.

Quest 대응이 필요하면 SDK가 허용하는 모바일 셰이더로 따로 만드세요. 자동 변환 경로는 제공하지 않습니다.

밍툰 매니저의 Quest 점검은 대체본에서 잃는 항목을 셉니다. 아웃라인, 반투명, 깊이 효과가 대표적입니다.

## Post Processing Stack v2 (선택)

MingToon은 PPv2 없이도 완전히 동작합니다.

VRChat 아바타는 월드의 후처리를 따릅니다. PPv2는 주로 씬 확인과 촬영에 씁니다.
→ [설치](/getting-started/installation#선택-사항-post-processing-stack-v2)

## BRP와 URP를 함께 쓸 때만 해당하는 차이

<details>
<summary>텍스처 임포트 설정이 백엔드마다 다르게 적용됩니다</summary>

BRP는 레이어 텍스처를 `_MainTex`의 샘플러로 읽습니다. 그래서 `_MainTex`의 Filter와 Wrap 설정이 모든 레이어에 적용됩니다.

URP는 고정 인라인 샘플러(Linear · Repeat)를 씁니다. 개별 텍스처의 Filter와 Wrap 설정은 무시됩니다.

두 백엔드는 `_MainTex`를 Clamp 또는 Point로 임포트한 경우에만 다르게 보입니다.

두 백엔드를 함께 쓸 계획이면 `_MainTex`를 기본값(Bilinear · Repeat)으로 두세요.

이는 URP 패스 구조상 의도한 제약입니다. 레이어마다 전용 샘플러를 두면 샘플러 슬롯 한도를 넘습니다.

</details>

## 다음

[VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo) · [문제 해결](/troubleshooting#install)
