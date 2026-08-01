---
id: installation
title: 설치
sidebar_position: 1
---

# 설치

**이 문서를 마치면** MingToon이 오류 없이 임포트된 Unity 프로젝트를 갖게 됩니다.

## 준비물

- Unity **2021.3 LTS** (Warudo 대상이라면 정확히 `2021.3.45f2`)
- MingToon `.unitypackage`
- 가능하면 **새 프로젝트** — 아래 주의 참고

:::caution 개발 프로젝트에 덮어쓰지 마세요
이 배포물은 UPM 패키지가 아니라 **소스 `.unitypackage`** 입니다. 기존 MingToon 소스가 있는 프로젝트에 다시 임포트하면 클래스와 셰이더가 중복되어 컴파일이 깨집니다. 최종 패키지는 항상 빈 검증 프로젝트에서 시험하세요.
:::

## 절차

1. Unity 2021.3 프로젝트를 엽니다. 가능하면 새 프로젝트를 만드세요.
2. `.unitypackage`를 프로젝트 창에 드래그하거나 `Assets > Import Package > Custom Package`로 임포트합니다.
3. 임포트 대화상자에서 **모든 항목을 선택한 채로** Import를 누릅니다.
4. Unity가 컴파일을 마칠 때까지 기다립니다.
5. **Console을 열어 오류가 0건인지 확인합니다.** C# 오류든 셰이더 오류든, 하나라도 남아 있으면 다음 단계로 넘어가지 마세요.

{/* SCREENSHOT: Import Package 대화상자 */}

**이렇게 되면 정상입니다.** Project 창에 `Assets/StudioRaming/MingToon/`이 생기고, Console에 빨간 오류가 없습니다.

## 프로젝트 검증

메뉴에서 `Tools > Studio Raming > MingToon > Validate Project`를 실행합니다.

이 검사는 현재 빌드 타깃이 MingToon의 하드웨어 요구 사항(셰이더 모델 4.5)을 만족하는지 확인합니다. 만족하지 못하면 **오류로 보고**합니다. 이 상태로 진행하면 재질이 마젠타(분홍색)로 렌더링됩니다. 자세한 내용은 [지원 환경](/platforms/compatibility)을 보세요.

{/* SCREENSHOT: Validate Project 결과 */}

## 셰이더 선택

| 프로젝트 | 셰이더 |
|---|---|
| Built-in Render Pipeline (BRP) | `StudioRaming/MingToon/BRP` |
| URP 12.x (Unity 2021.3) | MingToon URP 셰이더 |

:::danger URP 13 이상은 지원 범위가 아닙니다
URP는 **Unity 2021.3 + URP 12.x**만 현재 대상입니다. URP 13 이상에서 동작하는 것처럼 보여도 지원으로 간주하지 마세요.
:::

## 선택 사항: Post Processing Stack v2

MingToon은 PPv2 없이도 완전히 동작합니다. PPv2 관련 소스는 전부 `UNITY_POST_PROCESSING_STACK_V2` 심볼로 제외되어 있어, 깨끗한 프로젝트에 `com.unity.postprocessing`을 설치할 필요가 없습니다.

PPv2 연동을 쓰려면:

1. PPv2 **3.4.0**을 설치합니다.
2. **Player Settings > Scripting Define Symbols**에 `UNITY_POST_PROCESSING_STACK_V2`를 **직접 추가**합니다.
3. Unity가 재컴파일을 마칠 때까지 기다립니다.
4. `Tools > Studio Raming > MingToon > Create or Repair BRP PPv2 Global Volume`을 실행합니다.

:::note
패키지를 설치하는 것만으로는 이 심볼이 생기지 않습니다. 2번 단계를 건너뛰면 메뉴가 아무 일도 하지 않습니다.
:::

## 다음

[첫 재질 만들기](/getting-started/first-material)로 이동합니다.
