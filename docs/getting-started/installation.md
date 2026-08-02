---
id: installation
title: 설치
sidebar_position: 1
---

# 설치

**이 문서를 마치면** MingToon이 오류 없이 임포트된 Unity 프로젝트를 갖게 됩니다.

## 1. Unity 버전을 먼저 맞춥니다

:::danger[대상에 따라 Unity 버전이 다릅니다]
| 대상 | Unity | 근거 |
|---|---|---|
| **VRChat PC** (주 대상) | **2022.3.22f1** | 현행 VRChat SDK 기준 |
| **Warudo** | **2021.3.45f2** | Warudo Mod SDK 0.14.3.10 기준 |
| 일반 Unity | 2021.3 LTS | |

**VRChat 대상이면 반드시 2022.3.22f1을 쓰세요.** MingToon의 VRChat 빌드 훅과 VRChat 런타임은 `UNITY_2022_3_OR_NEWER` 조건에서만 컴파일됩니다. 2021.3에서는 이 코드가 **아예 존재하지 않아** 업로드 시 자동 최적화도, 깊이 승격도 걸리지 않습니다.
:::

한 프로젝트로 VRChat과 Warudo를 동시에 대응할 수는 없습니다. 대상별로 프로젝트를 나누세요.

## 2. 준비물

- 위 표에 맞는 Unity 에디터
- MingToon `.unitypackage`
- VRChat 대상이면 현행 **VRChat SDK3 (Avatars)**
- 가능하면 **새 프로젝트** — 아래 주의 참고

:::caution[개발 프로젝트에 덮어쓰지 마세요]
이 배포물은 UPM 패키지가 아니라 **소스 `.unitypackage`** 입니다. 기존 MingToon 소스가 있는 프로젝트에 다시 임포트하면 클래스와 셰이더가 중복되어 컴파일이 깨집니다. 최종 패키지는 항상 빈 검증 프로젝트에서 시험하세요.
:::

## 3. 임포트

1. 대상에 맞는 Unity 버전으로 프로젝트를 엽니다.
2. VRChat 대상이면 **VRChat SDK를 먼저 임포트**합니다. SDK가 먼저 있어야 MingToon의 VRChat 연동 코드가 컴파일됩니다.
3. MingToon `.unitypackage`를 프로젝트 창에 드래그하거나 `Assets > Import Package > Custom Package`로 임포트합니다.
4. 임포트 대화상자에서 **모든 항목을 선택한 채로** Import를 누릅니다.
5. Unity가 컴파일을 마칠 때까지 기다립니다.
6. **Console을 열어 오류가 0건인지 확인합니다.** C# 오류든 셰이더 오류든, 하나라도 남아 있으면 다음 단계로 넘어가지 마세요.

<!-- SCREENSHOT: Import Package 대화상자 -->

**이렇게 되면 정상입니다.** Project 창에 `Assets/StudioRaming/MingToon/`이 생기고, Console에 빨간 오류가 없습니다.

## 4. VRChat 연동 확인 (VRChat 대상만)

스크립트 리로드가 끝난 뒤 Console에 아래 줄이 있어야 합니다.

```text
[MingToon] VRChat build hook compiled and registered.
```

:::danger[이 줄이 없다면]
VRChat 빌드 훅이 **아예 존재하지 않는 상태**입니다. 업로드해도 자동 최적화와 깊이 승격이 걸리지 않습니다. 확인할 것:

1. Unity 버전이 **2022.3.22f1** 인지
2. VRChat SDK3가 프로젝트에 제대로 들어와 있는지 (`VRC_SDK_VRCSDK3` 정의)
:::

## 5. 프로젝트 검증

메뉴에서 `Tools > Studio Raming > MingToon > Validate Project`를 실행합니다.

주로 확인하는 것은 **현재 빌드 타깃이 셰이더 모델 4.5를 만족하는지**입니다. 만족하지 못하면 오류로 보고하고, 그 상태로 진행하면 재질이 마젠타(분홍색)로 렌더링됩니다. → [지원 환경](/platforms/compatibility)

<!-- SCREENSHOT: Validate Project 결과 -->

:::note[지원 에디터 스트림은 2021.3과 2022.3 둘 다입니다]
어느 쪽이든 `MING-ENV-UNITY-VERSION` 오류는 나오지 않습니다.

다만 **VRC SDK가 들어 있는데 에디터가 2021.3이면** `MING-VRC-UNITY-VERSION` **경고**가 뜹니다 — "MingToon의 VRChat 연동이 2022.3 스트림에서만 컴파일되므로 이 프로젝트에는 아바타 업로드 지원이 없습니다." 정확한 경고이며, VRChat 대상이면 2022.3.22f1로 옮기라는 뜻입니다.
:::

## 6. 셰이더 선택

| 프로젝트 | 셰이더 |
|---|---|
| Built-in Render Pipeline (BRP) — VRChat·Warudo 포함 | `StudioRaming/MingToon/BRP` |
| URP 12.x (Unity 2021.3) | MingToon URP 셰이더 |

:::danger[URP는 VRChat 대상이 아닙니다]
VRChat + URP는 지원하지 않습니다. URP는 Unity 2021.3 + URP 12.x만 대상이며, URP 13 이상은 동작하는 것처럼 보여도 지원으로 간주하지 마세요.
:::

## 선택 사항: Post Processing Stack v2 {#선택-사항-post-processing-stack-v2}

MingToon은 PPv2 없이도 완전히 동작합니다. PPv2 관련 소스는 전부 `UNITY_POST_PROCESSING_STACK_V2` 심볼로 제외되어 있어, 깨끗한 프로젝트에 `com.unity.postprocessing`을 설치할 필요가 없습니다.

PPv2 연동을 쓰려면:

1. PPv2 **3.4.0**을 설치합니다.
2. **Player Settings > Scripting Define Symbols**에 `UNITY_POST_PROCESSING_STACK_V2`를 **직접 추가**합니다.
3. Unity가 재컴파일을 마칠 때까지 기다립니다.
4. `Tools > Studio Raming > MingToon > Create or Repair BRP PPv2 Global Volume`을 실행합니다.

:::note
패키지를 설치하는 것만으로는 이 심볼이 생기지 않습니다. 2번 단계를 건너뛰면 메뉴가 아무 일도 하지 않습니다.
:::

VRChat 아바타는 월드의 후처리를 따르므로, PPv2는 주로 씬 확인·촬영용입니다.

## 다음

[첫 재질 만들기](/getting-started/first-material)
