---
id: intro
title: MingToon 소개
sidebar_label: 소개
slug: /
---

# MingToon

**얼굴의 음영부터 옷의 질감, 실루엣까지 이어서 만드는 캐릭터 툰 셰이더.**

MingToon은 얼굴 그림자의 방향, 빛과 그림자가 겹치는 방식, 표면의 색과 질감을 함께 조절합니다. 얼굴·머리카락·의상의 룩을 재질별로 만들고, MingToon Manager에서 아바타 전체의 표현을 맞출 수 있습니다.

[Manager로 처음 시작하기](/getting-started/first-material) · [설치부터 시작하기](/getting-started/installation) · [기존 lilToon 아바타 변환하기](/workflow/liltoon-conversion) · [현재 제한 확인하기](/limitations)

:::note[현재 공개 버전: 0.1.10 BRP 오픈 베타]
현재 다운로드는 Built-in Render Pipeline(BRP) 본체 베타입니다. VRChat·Warudo·일반 Unity의 대상별 환경을 [설치 문서](/getting-started/installation)에서 확인하세요. VRChat 클라이언트 동작과 실제 업로드는 검증 중입니다. 현재 오픈 베타의 상업 이용은 금지됩니다.

[오픈 베타 참여 안내](https://studioraming.github.io/mingtoon-site/ko/download/) · [BOOTH 상품](https://raming.booth.pm/items/8810209) · [라이선스와 포함 구성](/legal/beta-license)
:::

## 아바타 하나를 완성하는 작업 순서

**컴포넌트 추가 → Face Mesh·Skin Mesh 지정 → 룩 프리셋 선택 → 색감 또는 기존값 선택 → 변환 → 빠른 설정.**

Manager는 아바타 루트에 유지합니다. 재질 편집을 마친 뒤 VRC SDK 업로드 또는 WARUDO 모드 빌드를 실행하면 자동 최적화 베이크가 진행됩니다.

[이 순서대로 따라 하기](/getting-started/first-material). MingToon으로 작업할 아바타 루트에 Manager를 항상 두세요. 의상만 편집할 때도 같습니다. Manager에서 업데이트도 확인합니다. **VCC로 설치했다면 MingToon 업데이트는 VCC에서 진행합니다.** Manager의 업데이트 안내를 이용할 때도 설치 경로를 먼저 확인하세요. 얼굴·맨살이 없는 의상은 해당 역할을 비워 두고 진행하세요.

## MingToon으로 만드는 표현

### 여러 그림자가 겹칠 때의 색과 경계를 다룹니다

표면의 굴곡이 만드는 **형태 그림자**, 실시간 라이트의 **투영 그림자**, 카메라 깊이를 읽는 **2D 그림자**를 조합합니다. 앞머리·손·소매 주변의 음영을 만들고, 통합 그림자로 겹치는 부분의 색을 조정할 수 있습니다. 그림자 전체의 밝기와 색을 맞추는 조절도 함께 제공합니다.

같은 카메라 깊이를 이용해 2D 림라이트, 내부 2D 경계, 깊이 투과광, SSAO를 더할 수 있습니다. 각각 실루엣, 내부 경계, 얇은 부위의 빛, 접촉부의 어두움을 다룹니다. **카메라 깊이가 확보되어야 하는 효과**이므로, 보이지 않을 때는 깊이 설정과 대상 환경부터 확인하세요. 환경에 따라 깊이 확보용 보조 광원이 필요할 수 있습니다.

→ [조명과 그림자](/guides/light-and-shadow) · [깊이 기반 효과와 설정 조건](/guides/depth-effects)

### 색·질감·반사를 층별로 쌓아 룩을 만듭니다

텍스처, 노멀, Matcap 레이어와 마스크로 적용 영역을 나눕니다. 피부의 색, 머리카락의 광택, 의상의 무늬를 따로 구성하고, 하이브리드 PBR·툰 스페큘러·글리터·이미션으로 필요한 표면 표현을 더할 수 있습니다.

색 보정과 전체 밝기·틴트 조절은 여러 재질의 분위기를 맞추는 데 사용합니다. 그림자 패턴은 망점과 선화 같은 인쇄 표현을 만들며, 패턴을 표면에 붙이거나 화면에 고정할 수 있습니다. 아웃라인과 림 계열을 함께 조절해 실루엣을 마무리합니다.

→ [디테일 맵](/guides/detail-maps) · [그림자 패턴](/guides/shadow-pattern) · [아웃라인](/guides/outline) · [림](/guides/rim)

### 편집한 재질을 빌드용 구성으로 연결합니다

룩을 만드는 단계에서는 필요한 기능을 조합합니다. 지원되는 빌드 최적화 경로에서는 기능 사용 여부와 애니메이션 의존성을 분석해 필요한 기능을 남긴 셰이더를 생성합니다. 베이크 경로는 텍스처에 담을 수 있는 색 정보와 조명·시점에 따라 계속 반응해야 하는 부분을 구분해 처리합니다.

남기는 기능과 대상 아바타·월드에 따라 실제 비용과 결과가 달라집니다. **최적화 후에도 외관과 필요한 애니메이션을 확인하는 단계가 필요합니다.** 검증된 GPU 성능 수치는 현재 공개하지 않습니다.

→ [빌드 시 자동 최적화](/workflow/build-optimization) · [셰이더 내부 구조](/internals/shader-structure)

## 본체와 추가 도구

Face SDF Studio는 아직 미발매인 제작 도구이며, 아래 온보딩에 필요하지 않습니다.

BRP 본체는 재질의 표현과 설정을 담당합니다. **URP는 현재 BRP 오픈 베타에 포함되지 않으며 모든 상업 라이선스에 포함됩니다.** Face SDF Studio와 Mask Maker 등의 제작 도구는 [애드온 안내](/guides/add-ons)에서 확인할 수 있습니다.

Ming Light Controller(MLC)는 별도로 설치하는 도구입니다. 업로드 복제본에 적용해 가상 라이트와 밝기·색 조절을 VRChat 표현 메뉴로 연결합니다. Modular Avatar 경로는 기존 메뉴·파라미터·FX를 보존하도록 설계되어 있으며, 실제 클라이언트 업로드는 검증 중입니다. Personal Streaming·Personal Creator의 Early Access Founders Edition에는 MLC가 포함되고, 정식 출시 이후 구성은 변경될 수 있습니다.

→ [Ming Light Controller](/guides/ming-light-controller) · [라이선스와 포함 구성](/legal/beta-license)

## 구현의 기반과 출처

MingToon은 공개 그래픽 기법과 수정·차용한 구현을 자체 레이어·얼굴·깊이 효과·빌드 구조에 연결합니다. lilToon의 일부 UV·색 보정·글리터 계산과 NonToon의 일부 그림자 처리를 포함한 차용 범위, 원 저작권 및 라이선스는 [서드파티 차용 및 라이선스](/legal/third-party-credits)에서 확인할 수 있습니다.

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

가이드는 작업 목적별로, 항목 레퍼런스는 관련 인스펙터 항목별로 묶었습니다. 인스펙터의 표시 모드와 설치 애드온에 따라 그룹이나 항목 위치가 달라질 수 있으므로 검색도 함께 사용하세요.

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
