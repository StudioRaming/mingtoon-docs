---
id: intro
title: MingToon 소개
sidebar_label: 소개
slug: /
---

:::note[오픈 베타 참여 안내]
[오픈 베타 참여 안내](https://studioraming.github.io/mingtoon-site/ko/download/) — 아직 BOOTH 상품이 게시되지 않았습니다. 게시 후 이 페이지에 공식 상품 링크를 연결합니다. 다운로드 전에 현재 베타의 이용 조건과 지원 범위를 확인해 주세요.
:::


모든 상업 라이선스에는 URP 버전이 포함됩니다. Personal Streaming·Personal Creator의 Early Access Founders Edition에는 MLC가 포함되며, 정식 출시 이후 구성은 변경될 수 있습니다. 현재 오픈 베타의 상업 이용은 금지됩니다. [라이선스 및 포함 구성](/legal/beta-license)을 확인하세요.

# MingToon

**VRChat 아바타를 위한 캐릭터 툰 셰이더**입니다.

MingToon 0.1.7은 **BRP 본체 오픈 베타**입니다. URP는 현재 BRP 오픈 베타에 포함되지 않으며, 모든 상업 라이선스에 포함됩니다. Ming Light Controller(MLC)는 별도로 설치하며 Personal Streaming·Personal Creator의 Early Access Founders Edition에 포함됩니다.

캐릭터를 그릴 때 실제로 손대는 것들 — 그림자가 지는 자리와 색, 얼굴에 코 그림자가 어떻게 놓이는지, 아웃라인 굵기, 역광에서 실루엣이 서는지 — 을 각각 따로 잡을 수 있게 나눠 두었습니다. 룩을 만드는 인스펙터부터 아바타에 실어 업로드하는 단계까지 한 벌로 들어 있습니다.

Built-in Render Pipeline(BRP) 기반이고, Warudo와 일반 Unity 프로젝트에서도 씁니다.

## 다른 툰 셰이더와 무엇이 다른가

**빌드용 셰이더는 실제 사용 기능을 기준으로 만들어집니다.**
필요한 기능으로 룩을 만든 뒤, 지원되는 빌드 최적화 경로에서 사용 여부와 애니메이션 의존성을
분석해 필요한 기능을 유지한 전용 셰이더를 생성합니다. 제거된 기능의 연산은 빠지지만 실제
비용은 남긴 기능과 아바타·월드에 따라 달라집니다.
→ [빌드 시 자동 최적화](/workflow/build-optimization)

**그림자가 셋입니다. 특히 세 번째가 다릅니다.**
굴곡이 만드는 **형태 그림자**와 실시간 **그림자 투영**은 다른 셰이더에도 있습니다.
MingToon에는 **2D 그림자**가 더 있습니다 — 카메라 깊이를 읽어 앞머리·손·소매가 몸 위에
드리우는 그림자를, 실시간 그림자로는 나오지 않는 툰 형태로 그립니다. 셋이 겹쳐
새까매지지 않게 한 색으로 모으는 통합 그림자도 함께 있습니다.
→ [조명과 그림자](/guides/light-and-shadow) · [깊이 기반 효과](/guides/depth-effects)

**같은 깊이 한 장으로 네 가지를 더 합니다.**
2D 림라이트(2D 실루엣 선), 내부 2D 경계, 얇은 부위가 빛을 머금는 깊이 투과광, 접히는 곳을
어둡게 하는 SSAO. 효과마다 필요한 깊이 샘플을 같은 카메라 깊이 텍스처에서 읽습니다. 새 포스트 프로세스 패스나 별도 카메라는 쓰지 않지만, 일부 환경에서는 깊이를 확보하는 보조 광원이 필요할 수 있습니다. 설정은 MingToon Manager와 깊이 기반 효과 문서에서 확인하세요. VRChat 클라이언트에서의 동작은 아직 검증 중입니다.
→ [깊이 기반 효과](/guides/depth-effects)

**얼굴이 부속이 아니라 하나의 시스템입니다.**
얼굴 마스크 슬롯 하나로 끝내지 않습니다. 노멀 누름, 얼굴 영역 마스크, 방향성 SDF에
더해 얼굴 영역 마스크와 방향성 SDF를 지원합니다. SDF를 굽는 Face SDF Studio와 씬 뷰 버텍스
페인트는 별도 애드온에서 제공합니다. 이미 만든 SDF·버텍스 데이터는 본체 재질에 사용할 수 있습니다.
→ [얼굴 SDF와 애드온](/guides/face-sdf) · [별매 애드온](/guides/add-ons)

**인쇄물 느낌을 낼 수 있습니다.**
그림자를 망점·선화로 찍는 스크린톤이 있고, 격자를 표면에 붙일지 화면에 고정할지
고릅니다. 화면에 고정하면 캐릭터가 그 아래로 지나가는 팝아트 인쇄 느낌이 됩니다.
→ [그림자 패턴](/guides/shadow-pattern)

**인게임에서 조절합니다 (MLC 별도 애드온).**
Ming Light Controller를 별도로 설치하고 업로드 복제본에 적용하면 가상 라이트와 밝기·색 조정을 VRChat 표현 메뉴로 뺄 수 있습니다. Modular Avatar 경로는 기존 메뉴·파라미터·FX를 보존하도록 설계되어 있지만, 실제 업로드 성공은 아직 검증 중입니다. → [Ming Light Controller](/guides/ming-light-controller) · [VRChat](/platforms/vrchat)

<details>
<summary>그 밖에 들어 있는 것</summary>

- **아웃라인** — 깊이 없이 어디서나 동작합니다. 씬 뷰 붓 페인트는 별도 Mask Maker 애드온이 필요합니다. → [아웃라인](/guides/outline)
- **림 계열** — 림 라이트 · 림 셰이드 · 백라이트 · 프런트 라이트 · 그림자 내부 반사. → [림](/guides/rim)
- **디테일** — 텍스처 · 노멀 · 맷캡 레이어, 하이브리드 PBR, 툰 스페큘러, 글리터, 이미션. → [디테일 맵](/guides/detail-maps)
- **마스터 조정** — 빛을 더하는 것 전부 · 그림자 전부 · 최종 출력에 각각 밝기와 틴트. 씬이 바뀌면 여기서 한 번에 맞춥니다. → [기본 설정](/guides/basics)
- **lilToon 변환** — 기존 아바타를 텍스처·마스크·아웃라인 폭 마스크째로 옮깁니다. → [lilToon 변환](/workflow/liltoon-conversion)
- **밍툰 매니저** — 어느 슬롯이 얼굴이고 어디가 맨살인지 지정하고, 아바타 전체의 룩을 한 화면에서 다룹니다. → [밍툰 매니저](/workflow/character-manager)

</details>

## 작업 순서

**변환** → **역할 지정**(얼굴 · 맨살) → **룩** → **업로드**.
기존 lilToon 아바타는 1단계부터, 새로 만드는 재질은 2단계부터 시작합니다.

## 베타와 상업 사용

현재 배포·상업 사용 조건은 [베타 및 상업 사용 안내](/legal/beta-license)에서 먼저 확인하세요.

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
| 2D 림라이트·2D 그림자가 안 보인다 | [깊이 기반 효과](/guides/depth-effects) |
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

## BRP 본체 베타 안내

:::warning[이 배포판은 preview입니다]
- 검증된 GPU 성능 수치를 공개하지 않습니다.
- VRChat / Warudo는 **테스트 대상**이며 출시 인증이 완료된 상태가 아닙니다.
- 배포 전 [현재 제한과 릴리스](/limitations)를 확인하세요.
:::

버그 제보는 [공식 Discord 서버](https://discord.gg/Zsj6pkWKKs)의 **버그 제보 채널**을 이용해 주세요.

제보할 때 아래를 함께 적어 주시면 재현이 빨라집니다.

1. Unity 버전과 대상 플랫폼 (VRChat PC / Warudo / 일반 Unity)
2. 렌더 파이프라인 (BRP / URP 12.x)
3. MingToon 버전 (화면 오른쪽 위 배지에 표시됩니다)
4. Console 로그 전문
5. 재현 순서
