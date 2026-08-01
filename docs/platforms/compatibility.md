---
id: compatibility
title: 지원 환경
sidebar_position: 2
---

# 지원 환경

**이 문서를 읽으면** 내 환경에서 MingToon을 쓸 수 있는지, 쓰려면 무엇을 준비해야 하는지 판단할 수 있습니다.

## Unity 버전

:::danger 대상마다 다릅니다. 한 프로젝트로 겸할 수 없습니다
| 대상 | Unity | 왜 |
|---|---|---|
| **VRChat PC** (주 대상) | **2022.3.22f1** | 현행 VRChat SDK 기준. MingToon의 VRChat 훅·런타임이 `UNITY_2022_3_OR_NEWER`에서만 컴파일됩니다 |
| **Warudo** | **2021.3.45f2** | Warudo Mod SDK 0.14.3.10 기준 |
| 일반 Unity | 2021.3 LTS | |
:::

:::caution Validate Project의 Unity 버전 판정
현재 빌드의 검증기는 `MING-ENV-UNITY-VERSION` 규칙을 **2021.3.x 기준으로만** 판정합니다. VRChat에 필요한 2022.3.22f1에서 오류로 표시되지만 **VRChat 대상에서는 2022.3.22f1이 올바른 버전입니다.** 알려진 불일치이며 수정 예정입니다.
:::

## 하드웨어 요구 사항 (필수)

MingToon의 모든 패스는 `#pragma target 4.5`(셰이더 모델 4.5)를 선언합니다.

:::danger 조건을 못 맞추면 조용히 실패합니다
셰이더 모델 4.5를 만족하지 못하는 플랫폼에서는 SubShader가 통째로 탈락합니다. 결과는 **재질이 마젠타(분홍색)로 렌더링되고, 다른 오류 메시지는 나오지 않는 것**입니다. 로그만 보고는 원인을 찾을 수 없으므로 이 조건을 먼저 확인하세요.
:::

| 구분 | 지원 |
|---|---|
| Windows / macOS / Linux (DirectX 11 이상 · Vulkan · Metal) | ✅ |
| Android / Quest | ❌ |
| iOS | ❌ |
| WebGL | ❌ |

현재 빌드 타깃이 조건을 만족하지 않으면 `Tools > Studio Raming > MingToon > Validate Project`가 오류로 보고합니다.

## 환경별 호환성

| 환경 | 상태 | 필요한 조치 |
|---|---|---|
| **VRChat PC** (Unity 2022.3.22f1, BRP) | 주 대상 · 수동 검증 · 미인증 | → [VRChat](/platforms/vrchat) |
| **VRChat Quest** | 직접 지원 안 함 | 아래 참고 |
| **Warudo 0.14.3.10** (Unity 2021.3.45f2, BRP) | 실기 검증 대기 | → [Warudo](/platforms/warudo) |
| Unity 2021.3 **BRP** (일반) | 주 검증 대상 · 출시 검증 대기 | 일반 조명/그림자 설정 후, 깊이 효과 사용 시 Depth Texture 준비 |
| Unity 2021.3 **URP 12.x** | 선택 검증 대상 · 미인증 | MingToon URP 셰이더 및 필요한 Renderer Feature 설치 |
| VRChat + URP | 지원 안 함 | BRP 제작본으로 전환 |

:::danger URP 13 이상은 지원 범위가 아닙니다
URP는 **Unity 2021.3 + URP 12.x**만 현재 대상입니다. 동작하는 것처럼 보여도 지원으로 간주하지 마세요. VRChat은 URP를 쓰지 않습니다.
:::

## VRChat Quest

MingToon은 모바일 셰이더 타깃이 아닙니다. Quest 대응이 필요하면 SDK가 허용하는 모바일 셰이더로 **별도 변환**하고, 어떤 기능이 사라지는지 검토하세요. 자동 변환 경로는 제공하지 않습니다.

## 텍스처 임포트 설정의 백엔드 차이

BRP와 URP를 함께 쓸 계획일 때만 해당합니다. VRChat만 대상이라면 읽지 않아도 됩니다.

- **BRP**는 레이어 텍스처를 `_MainTex`의 샘플러로 샘플링합니다. 따라서 `_MainTex`의 Filter/Wrap 임포트 설정이 **모든 레이어에 적용**됩니다.
- **URP**는 고정 인라인 샘플러(Linear/Repeat)를 사용합니다. 개별 텍스처의 Filter/Wrap 설정은 **무시**됩니다.

결과적으로 두 백엔드는 `_MainTex`를 **Clamp 또는 Point로 임포트한 경우에만** 다르게 보입니다.

:::tip 두 백엔드를 함께 쓸 계획이면
`_MainTex`를 기본값(**Bilinear / Repeat**)으로 유지하세요.
:::

이는 URP 패스 구조상 의도된 제약입니다. 레이어 텍스처마다 전용 샘플러를 두면 샘플러 슬롯 한도를 넘고, `_MainTex` 샘플러를 공유하면 `_MainTex`를 쓰지 않는 패스에서 컴파일이 실패합니다.

## Post Processing Stack v2 (선택)

BRP PPv2는 선택 사항이고 MingToon은 PPv2 없이도 완전히 동작합니다. VRChat 아바타는 월드의 후처리를 따르므로 PPv2는 주로 씬 확인·촬영용입니다. 설정은 [설치](/getting-started/installation#선택-사항-post-processing-stack-v2)를 보세요.
