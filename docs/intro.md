---
id: intro
title: MingToon 소개
sidebar_label: 소개
slug: /
---

# MingToon

MingToon은 **VRChat 아바타용 캐릭터 툰 셰이더 + 제작 툴셋**입니다. Built-in Render Pipeline(BRP) 기반이며, Warudo와 일반 Unity 프로젝트에서도 쓸 수 있습니다.

현재 버전: **0.1.2-preview** (클로즈 베타)

## Unity 버전 — 대상에 따라 다릅니다

:::danger[먼저 확인하세요]
| 대상 | Unity |
|---|---|
| **VRChat PC** (주 대상) | **2022.3.22f1** |
| **Warudo** | **2021.3.45f2** |
| 일반 Unity | 2021.3 LTS |

**VRChat 대상이면 2022.3.22f1을 쓰세요.** 2021.3에서는 VRChat 빌드 훅과 VRChat 런타임이 아예 컴파일되지 않아 업로드 시 자동 최적화가 걸리지 않습니다. 한 프로젝트로 VRChat과 Warudo를 겸할 수 없습니다.
:::

## 어디부터 읽을까

| 상황 | 문서 |
|---|---|
| **VRChat 아바타에 쓰려고 한다** | [VRChat](/platforms/vrchat) |
| 처음 설치한다 | [설치](/getting-started/installation) → [첫 재질 만들기](/getting-started/first-material) |
| 인스펙터 구조를 익힌다 | [인스펙터 사용법](/guides/inspector) |
| 룩을 만들기 시작한다 | [기본 설정](/guides/basics) → [조명과 그림자](/guides/light-and-shadow) |
| 기존 lilToon 아바타를 옮긴다 | [lilToon 변환](/workflow/liltoon-conversion) |
| 아바타를 업로드한다 | [빌드 시 자동 최적화](/workflow/build-optimization) |
| 깊이 림·2D 그림자가 안 보인다 | [깊이 기반 효과](/guides/depth-effects) |
| 항목 하나의 의미를 찾는다 | [항목 레퍼런스](/reference/basics) |
| 뭔가 이상하다 | [문제 해결](/troubleshooting) |
| 왜 그렇게 동작하는지 알고 싶다 | [내부 동작](/internals/shader-structure) |

## 문서 구조

**룩 만들기**와 **항목 레퍼런스**는 MingToon 인스펙터의 **전체 설정** 워크플로 그룹과 1:1로 대응합니다. 화면에서 본 섹션 이름 그대로 문서를 찾을 수 있습니다.

| 인스펙터 그룹 | 문서 |
|---|---|
| 기본 설정 | [기본 설정](/guides/basics) · [레퍼런스](/reference/basics) |
| 조명과 그림자 | [조명과 그림자](/guides/light-and-shadow) · [레퍼런스](/reference/light-and-shadow) |
| 림 | [림](/guides/rim) · [레퍼런스](/reference/rim) |
| 깊이 기반 효과 | [깊이 기반 효과](/guides/depth-effects) · [레퍼런스](/reference/depth-effects) |
| 디테일 맵 | [디테일 맵](/guides/detail-maps) · [레퍼런스](/reference/detail-maps) |
| 캐릭터 표현 | [캐릭터 표현](/guides/character) · [레퍼런스](/reference/character) |
| 아웃라인 | [아웃라인](/guides/outline) · [레퍼런스](/reference/outline) |

:::note[레퍼런스는 소스에서 생성됩니다]
항목 이름과 설명은 **MingToon 인스펙터가 실제로 표시하는 문구를 그대로** 가져옵니다. 문서와 화면의 용어가 어긋나지 않습니다.
:::

## MingToon이 하는 일

- **툰 셰이딩** — 레이어·마스크·합성 기반 다층 채색, HSVG 색 조정, 최종 최소/최대 밝기 제어
- **그림자 3종** — 형태 그림자(굴곡) · 그림자 투영(실시간) · 2D 그림자(화면 깊이), 그리고 이들을 하나로 모으는 통합 그림자
- **아웃라인** — 깊이 없이 동작하는 노멀 아웃라인, 씬 뷰에서 두께를 직접 칠하는 버텍스 페인팅
- **림** — 림 라이트 · 림 셰이드 · 백라이트 · 프런트 라이트 · 그림자 내부 반사
- **스크린톤** — 그림자를 하프톤 망점으로 표현하는 [그림자 패턴](/guides/shadow-pattern)
- **페이스 셰이딩** — 노멀 누름, 얼굴 영역 마스크/프록시 구, 얼굴 캐스트 안정화, SDF 오소링
- **lilToon 변환** — 기존 아바타 재질을 MingToon 편집용 재질로 이관
- **빌드 시 자동 최적화** — VRChat 업로드에서 실제 쓰는 기능만 남긴 셰이더로 자동 교체 후 복원

## 클로즈 베타 안내

:::warning[이 배포판은 preview입니다]
- 검증된 GPU 성능 수치를 공개하지 않습니다.
- VRChat / Warudo는 **테스트 대상**이며 출시 인증이 완료된 상태가 아닙니다.
- 배포 전 [현재 제한과 릴리스](/limitations)를 확인하세요.
:::

버그·질문·피드백: `studioraming@gmail.com`

제보할 때 아래를 함께 적어 주시면 재현이 빨라집니다.

1. Unity 버전과 대상 플랫폼 (VRChat PC / Warudo / 일반 Unity)
2. 렌더 파이프라인 (BRP / URP 12.x)
3. MingToon 버전 (`0.1.2-preview`)
4. Console 로그 전문
5. 재현 순서
