---
id: ming-light-controller
title: Ming Light Controller 사용하기
sidebar_position: 16
---

# Ming Light Controller 사용하기

> 이 페이지는 MLC를 처음 붙여 보는 분을 위한 것입니다.
> 인게임 메뉴로 밝기와 색을 바꾸게 만듭니다. 약 15분 걸립니다.

## 이게 뭔가요 {#ming-light-controller란}

Ming Light Controller(MLC)는 별도 애드온입니다. MingToon BRP 본체와 따로 설치합니다.

셰이더 룩을 만드는 일은 MingToon에서 합니다. 착용자가 인게임에서 바꿀 항목을 고르는 일은 MLC에서 합니다.

| 제품 | 역할 |
|---|---|
| **MingToon BRP 본체** | 재질 렌더링, 인스펙터와 매니저, 빌드 최적화 |
| **Ming Light Controller** | 아바타별 조절 설정과 인게임 표현 메뉴 생성 |

## 시작 전 준비

- MingToon 재질이 있는 아바타
- VRChat Avatars SDK
- NDMF — 아바타 사본에 무언가를 붙여 주는 공용 프레임워크입니다
- 기존 메뉴·FX가 있는 아바타라면 Modular Avatar 또는 지원되는 VRCFury

MLC는 이 의존성을 자동 설치하지 않습니다.

## 30초 만에 켜 보기

1. 아바타 루트에 MLC 컴포넌트를 추가합니다.
   `GameObject > Studio Raming > Ming Light Controller > Add or Configure Component`
2. **빠른 시작** 에서 시작 프리셋을 고르고 프로필을 자동(Auto)으로 둡니다. **적용** 을 누릅니다.
3. **메뉴 구성** 에서 쓸 항목을 켜고 메뉴 위치를 정합니다.
4. **예산·검증** 에서 합계와 생성 가능 여부를 확인합니다.

예산 화면에 빨간 오류가 없으면 성공입니다.
빨간 오류가 남아 있으면 [Play Mode와 업로드에서 확인할 것](#설치-확인)을 보세요.
오류를 해결한 뒤 Play Mode에서 메뉴가 열리는지 확인하고 업로드합니다.

![MLC 인스펙터의 예산·검증 패널에서 MLC 비용, 외부 비용, 합계와 생성 가능 여부가 보이는 화면](/img/placeholder.png)
<!-- CAPTURE: guides/ming-light-controller-01-budget.png | MLC 인스펙터 「예산·검증」 패널 전체. MLC 비용 / 외부 비용 / 합계 / 생성 가능 여부 줄이 모두 보이는 상태 | 1200x700 -->

프리셋을 고르는 것과 **적용** 을 누르는 것은 다릅니다. 적용한 뒤에도 각 항목을 고칠 수 있고, Undo로 되돌릴 수 있습니다.

## 연결 방식 고르기

연결 방식은 MLC가 만든 메뉴를 아바타에 어떻게 붙일지 정합니다.

| 방식 | 언제 쓰나 |
|---|---|
| **Modular Avatar** | 기존 메뉴·FX가 있는 아바타. 가장 안전합니다 |
| **VRCFury** | 지원 provider가 설치돼 있을 때 |
| **Direct Descriptor** | 기존 FX·메뉴·파라미터가 **비어 있는** 사본에만 |
| **Standalone** | 아바타에 메뉴를 붙이지 않습니다. 이것만 고르면 인게임 조절이 안 됩니다 |

`자동(Auto)`은 위에서부터 차례로 찾아 쓸 수 있는 것을 고릅니다. VRCFury를 골랐는데 지원 provider가 없으면 오류를 표시합니다. 조용히 다른 방식으로 바꾸지 않습니다.

:::caution[Write Defaults는 기존 FX를 일괄 변경하지 않습니다]
MLC가 만드는 상태는 Write Defaults가 꺼진 채로 작성됩니다.
Modular Avatar 연결은 아바타 쪽 방식에 맞추도록 요청하므로, 최종 결과를 직접 확인하세요.
:::

## 프로필과 예산 {#파라미터-프로필}

VRChat 아바타는 동기화에 쓸 수 있는 비트 수가 정해져 있습니다. 프로필은 그 비트를 어떻게 쓸지 정합니다.

| 프로필 | 선택 기준 |
|---|---|
| **Auto** | 현재 설정과 예산을 보고 Smooth를 먼저 검토합니다. 모자라면 Compact로 바꿉니다 |
| **Smooth** | 연속 조절의 정밀도를 우선합니다. 비트를 더 씁니다 |
| **Compact** | 비트를 줄입니다. 대신 조절 단계가 거칠어집니다 |

동기화 비트와 파라미터 항목 수는 서로 다른 한도입니다. 비트가 적다고 항목 수도 적은 것은 아닙니다.

비용은 활성 기능과 저장·동기화 설정, 다른 컴포넌트에 따라 달라집니다. 문서의 고정 숫자가 아니라 **예산·검증** 패널의 현재 계산값으로 판단하세요.

:::caution[미확인은 사용 가능 확정이 아닙니다]
다른 컴포넌트의 비용을 읽지 못하면 전체 예산을 보장할 수 없습니다.
MLC 추정치가 보여도 아바타 전체가 한도 안이라는 뜻은 아닙니다.
:::

## 메뉴 구성 {#루트-메뉴-구성}

추천 구성은 아래 일곱 가지입니다. 출발점이며, 추가하거나 빼면 최종 구성이 달라집니다.

`Reset` · `Final Output` · `Hue/Saturation` · `Photo Looks` · `Virtual Light` · `Master Adjust` · `Performance`

각 항목마다 세 가지를 정합니다.

- **사용(Enabled)** — 이 기능을 메뉴에 넣습니다.
- **저장(Saved)** — 다음에 아바타를 입었을 때 값을 유지합니다.
- **동기화(Synced)** — 다른 사람에게도 보입니다. 예산을 씁니다.

### 명령은 누를 때 실행합니다

Reset이나 성능 프리셋 같은 명령은 버튼을 눌렀을 때 한 번 실행되는 이벤트입니다. 연속 조절 항목처럼 고정값이나 복원값을 지정하지 않습니다.

예전 설정에 잘못된 명령 고정값이 남아 있으면 경고와 **명령 값 설정 복구** 버튼이 나타납니다. Undo로 되돌릴 수 있습니다.

## 설치하면 열리는 MingToon 기능 {#설치하면-열리는-mingtoon-기능}

MingToon 인스펙터의 마스터 조정·가상 조명 편집 UI와 매니저의 MLC 설정 진입점이 열립니다. 버튼이 계속 잠겨 있으면 Console의 컴파일 오류와 애드온 설치 상태를 확인하세요.

## MLC 없이도 되는 것 {#mlc-없이도-되는-것}

조명·그림자·림·깊이 효과·아웃라인 렌더링은 MLC 없이 전부 동작합니다. 재질에 저장된 마스터 조정 값도 계속 렌더링되고, 편집 UI만 보이지 않습니다.

깊이 텍스처 확보와 빌드 정책은 MingToon 매니저가 소유합니다. MLC를 지워도 빌드 동작은 그대로입니다. → [VRChat 깊이 라이트](/platforms/vrchat#vrchat-깊이-라이트)

## Play Mode와 업로드에서 확인할 것 {#설치-확인}

:::note[원본 아바타에는 설정만 저장합니다]
실제 메뉴·파라미터·FX는 Play Mode나 업로드용 사본에서 만들어집니다.
편집 중에 원본에 Generated 폴더가 생기지 않는 것은 정상입니다.
:::

업로드 전에 메뉴 열기, 조절 방향, 초기값, Reset 동작을 확인하세요.

| 증상 | 확인할 것 |
|---|---|
| 메뉴가 안 뜸 | Play Mode 미리보기 옵션, 선택한 연결 방식, SDK·NDMF 컴파일 상태 |
| Direct Descriptor가 중단됨 | 기존 메뉴나 FX가 있습니다. Modular Avatar로 바꾸세요 |
| 외부 비용이 미확인 | 합계가 확정된 것으로 보지 마세요 |
| 명령 고정값 오류 | 해당 명령의 복구 버튼으로 정리합니다 |

에디터 테스트만으로 실제 클라이언트의 두 사용자 동기화까지 검증되지는 않습니다. → [현재 제한과 릴리스](/limitations)

## 배포와 가격

MLC는 오픈 베타 기간에만 무료로 배포하고 Early Access 출시부터 유료 판매합니다. 무료 배포에는 MingToon 상업 라이선스가 포함되지 않으며, 파일 공유와 재배포는 금지합니다.

지원 셰이더는 현재 MingToon 하나입니다. lilToon과 Poiyomi는 향후 지원 예정이며, MLC는 셰이더를 변환하는 도구가 아닙니다.

[공식 BOOTH 상품 페이지](https://raming.booth.pm/items/8810346) · [라이선스 및 포함 구성](/legal/beta-license)

## 다른 도구 {#mask-maker}

Mask Maker는 마스크와 버텍스 페인트를 만드는 별도 도구입니다. MLC 메뉴 생성에 필요하지 않습니다.
→ [Mask Maker 연동](/guides/mask-maker) · [별매 애드온](/guides/add-ons)

## 관련 문서

- [밍툰 매니저](/workflow/character-manager)
- [빌드 시 자동 최적화](/workflow/build-optimization)
- [VRChat](/platforms/vrchat)
- [문제 해결](/troubleshooting#vrchat)
