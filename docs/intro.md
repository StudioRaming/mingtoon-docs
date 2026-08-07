---
id: intro
title: MingToon 소개
sidebar_label: 소개
slug: /
---

# MingToon

**VRChat 아바타를 위한 캐릭터 툰 셰이더**입니다.

캐릭터를 그릴 때 실제로 손대는 것들 — 그림자가 지는 자리와 색, 얼굴에 코 그림자가 어떻게 놓이는지, 아웃라인 굵기, 역광에서 실루엣이 서는지 — 을 각각 따로 잡을 수 있게 나눠 두었습니다. 룩을 만드는 인스펙터부터 아바타에 실어 업로드하는 단계까지 한 벌로 들어 있습니다.

Built-in Render Pipeline(BRP) 기반이고, Warudo와 일반 Unity 프로젝트에서도 씁니다.

## 무엇을 만들 수 있나

- **그림자를 세 종류로 나눠 잡습니다** — 굴곡이 만드는 **형태 그림자**, 실시간 **그림자 투영**, 화면 깊이를 읽어 앞머리와 손이 몸 위에 드리우는 **2D 그림자**. 셋이 겹쳐 새까매지지 않도록 한 색으로 모으는 통합 그림자도 있습니다. → [조명과 그림자](/guides/light-and-shadow)
- **그림자를 망점으로 찍습니다** — 스크린톤. 표면에 붙여 캐릭터와 함께 움직이게 하거나, 화면에 고정해 인쇄물에 겹쳐 찍은 것처럼 만듭니다. → [그림자 패턴](/guides/shadow-pattern)
- **얼굴은 따로 다룹니다** — 노멀 누름, 얼굴 영역 마스크, 방향성 SDF. 코와 앞머리 그림자가 표정을 망치지 않게 잡고, 굽는 도구까지 동봉되어 있습니다. → [얼굴 SDF](/guides/face-sdf)
- **아웃라인을 깊이 없이 그립니다** — 굵기는 씬 뷰에서 붓으로 직접 칠합니다. → [아웃라인](/guides/outline)
- **실루엣을 세웁니다** — 림 라이트 · 림 셰이드 · 백라이트 · 프런트 라이트 · 그림자 내부 반사. 어두운 씬에서 캐릭터가 배경에 묻히지 않게 하는 쪽입니다. → [림](/guides/rim)
- **디테일을 얹습니다** — 텍스처 · 노멀 · 맷캡 레이어, 하이브리드 PBR, 툰 스페큘러, 글리터, 이미션. → [디테일 맵](/guides/detail-maps)
- **색은 마지막에 한 번에 조정합니다** — 빛을 더하는 것 전부 · 그림자 전부 · 최종 출력, 세 묶음에 각각 밝기와 틴트를 걸어 씬이 바뀔 때 전체를 다시 맞춥니다. → [기본 설정](/guides/basics)

## 아바타에 싣기까지

- **lilToon 변환** — 이미 만들어 둔 아바타의 재질을 MingToon 재질로 옮깁니다. 텍스처·마스크·아웃라인 폭 마스크를 들고 갑니다. → [lilToon 변환](/workflow/liltoon-conversion)
- **밍툰 매니저** — 어느 슬롯이 얼굴이고 어디가 맨살인지 지정하고, 아바타 전체의 룩을 한 화면에서 다룹니다. → [밍툰 매니저](/workflow/character-manager)
- **빌드 시 자동 최적화** — 업로드할 때 실제로 쓰는 기능만 남긴 셰이더로 자동 교체하고, 끝나면 편집용으로 되돌립니다. 작업은 전부 켜 두고 하고, 올라가는 것만 가벼워집니다. → [빌드 시 자동 최적화](/workflow/build-optimization)
- **VRChat 표현 메뉴** — 가상 라이트와 밝기·색 조정을 인게임 메뉴에서 돌립니다. Modular Avatar로 비파괴 설치됩니다. → [VRChat](/platforms/vrchat)

## 처음이라면

[설치](/getting-started/installation) → [첫 재질 만들기](/getting-started/first-material) → [인스펙터 사용법](/guides/inspector)

설치 문서 1절이 Unity 버전을 정합니다. 대상에 따라 다르고, 한 프로젝트로 VRChat과 Warudo를 겸할 수 없습니다.

## 어디부터 읽을까

| 상황 | 문서 |
|---|---|
| **VRChat 아바타에 쓰려고 한다** | [VRChat](/platforms/vrchat) |
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
3. MingToon 버전 (화면 오른쪽 위 배지에 표시됩니다)
4. Console 로그 전문
5. 재현 순서
