---
id: ming-light-controller
title: Ming Light Controller 연동
sidebar_position: 15
---

# Ming Light Controller 연동

**이 문서를 읽으면** 방금 누른 잠긴 버튼이 어떤 별매 제품에 속하는지 알고, 그 제품이 MingToon에서 무엇을 열어 주는지, 없이도 같은 목적을 달성할 방법이 있는지 판단할 수 있습니다.

:::note[이 버튼은 별매 제품이 있어야 동작합니다]
MingToon 0.1.7 오픈베타 패키지에는 Mask Maker, Face SDF Studio, Ming Light Controller가 동봉되지 않습니다. 셋 다 별도로 판매되는 Editor 도구이고, MingToon은 셋이 전부 없어도 설치되고 컴파일되고 동작합니다.

설치하지 않은 상태에서도 버튼은 인스펙터에 그대로 보이며, 누르면 이 문서로 이동합니다. 해당 제품을 임포트하면 같은 버튼이 그 자리에서 살아납니다.
:::

## 먼저 구분하세요

| 제품 | MingToon에서 여는 것 | 상태 |
|---|---|---|
| **Ming Light Controller** | `마스터 조정` 섹션, `가상 광원` 오소링, Manager의 MLC 설치·부착 액션 | 출시 예정 |
| **Mask Maker** | 마스크 슬롯의 `MM` 버튼, `씬 뷰에서 외곽선 두께 칠하기`, `얼굴 영역 페인트 시작` | 판매 중 |
| **Face SDF Studio** | 얼굴 SDF 맵 제작·베이크 → [얼굴 SDF와 Face SDF Studio](/guides/face-sdf) | 판매 중 |

## Ming Light Controller란 {#ming-light-controller란}

MingToon 아바타의 표현 메뉴(VRChat Expression Menu)를 만들어 주는 Editor 전용 애드온입니다. 셰이더 값을 착용자가 인게임에서 직접 돌릴 수 있도록 메뉴 쪽을 담당합니다.

**출시 예정입니다.** 판매가 시작되면 이 자리에 구매 링크가 올라갑니다.

### 설치하면 열리는 MingToon 기능 {#설치하면-열리는-mingtoon-기능}

| 위치 | 잠긴 기능 |
|---|---|
| 인스펙터 · 최상단 | `마스터 조정` 섹션 전체 |
| 인스펙터 · `라이팅` | `가상 광원` 오소링 행 |
| MingToon Manager | MLC 설치·부착 액션 |

`마스터 조정`은 빛을 더하는 것 전부 · 그림자 전부 · 최종 출력에 각각 밝기와 틴트를 한 번에 거는 상위 조절입니다. `가상 광원`은 씬 조명과 무관하게 캐릭터가 들고 다니는 광원의 방향·색·밝기를 재질 쪽에서 정하는 기능입니다.

둘 다 착용자가 런타임에 돌리는 것을 전제로 한 값이라, 그 값을 노출할 메뉴가 함께 있어야 의미가 있습니다. 그 메뉴를 만드는 쪽이 MLC입니다.

### MLC 없이도 되는 것 {#mlc-없이도-되는-것}

셰이더의 룩 기능은 전부 그대로 동작합니다. 조명·그림자·림·깊이 효과·아웃라인 어느 것도 MLC를 요구하지 않습니다.

`마스터 조정`과 `가상 광원`도 재질에 값이 남아 있으면 그 값대로 계속 렌더링됩니다. MLC가 없을 때 사라지는 것은 인스펙터의 **편집 UI**이지, 셰이더 동작 자체가 아닙니다.

:::note[빌드 정책은 MLC 소유가 아닙니다]
VRChat·WARUDO의 Depth Light 빌드 정책은 MingToon Manager가 계속 소유합니다. MLC를 설치하거나 제거해도 MingToon의 VRC·WARUDO 빌드 동작은 달라지지 않습니다.
:::

### 파라미터 프로필 {#파라미터-프로필}

VRChat Expression Parameters 예산은 아바타 전체가 나눠 쓰는 자원입니다. MLC는 두 프로필 중 하나로 메뉴를 만듭니다.

| 프로필 | 동기화 비트 | 항목 수 |
|---|---|---|
| **Smooth** | 84비트 | 22개 |
| **Compact** | 41비트 | 51개 |

`Auto`는 아바타에 남은 VRC 예산에 맞춰 둘 중 하나를 고릅니다.

### 루트 메뉴 구성 {#루트-메뉴-구성}

MLC 루트 메뉴는 7칸입니다.

| 칸 | 이름 |
|---|---|
| 1 | Reset |
| 2 | Final Output |
| 3 | Hue/Saturation |
| 4 | Photo Looks |
| 5 | Virtual Light |
| 6 | Master Adjust |
| 7 | Performance |

## Mask Maker {#mask-maker}

마스크 텍스처와 버텍스 페인트를 Unity 에디터 안에서 처리하는 도구입니다.

**구매:** <https://raming.booth.pm/items/8606444> (BOOTH, 제품명 `[Unity] MaskMaker`)

### 설치하면 열리는 MingToon 기능 {#mask-maker-설치하면-열리는-mingtoon-기능}

| 위치 | 잠긴 기능 |
|---|---|
| 인스펙터 · 마스크 텍스처 슬롯 | 슬롯 옆 `MM` 버튼 — 그 슬롯의 마스크를 씬뷰에서 직접 그립니다 |
| 인스펙터 · 노멀 아웃라인 | `씬 뷰에서 외곽선 두께 칠하기` |
| 인스펙터 · 페이스/헤어 셰이딩 | `얼굴 영역 페인트 시작` |

`MM` 버튼이 붙는 슬롯은 마스크 계열 텍스처 슬롯입니다.

### Mask Maker 없이도 되는 것 {#mask-maker-없이도-되는-것}

마스크 텍스처를 다른 도구에서 만들어 슬롯에 직접 넣으면 됩니다. 이미 칠해 둔 버텍스 컬러도 그대로 읽힙니다. 아웃라인 압력과 얼굴 영역은 버텍스 페인트 말고 텍스처 마스크 경로가 따로 있습니다.

외부 DCC에서 버텍스 컬러를 칠할 때 쓰는 채널은 다음과 같습니다.

| 용도 | 버텍스 컬러 채널 |
|---|---|
| 아웃라인 압력 | 빨강 또는 알파 |
| 얼굴 영역 | 초록 |

## 설치 확인 {#설치-확인}

MingToon은 세 제품을 어셈블리 참조가 아니라 리플렉션으로 찾습니다. 애드온이 없어도 MingToon 쪽 컴파일이 깨지지 않는 이유이고, 반대로 애드온 어셈블리가 컴파일되지 않으면 MingToon은 그 도구를 설치되지 않은 것으로 봅니다.

버튼이 계속 잠겨 있다면 Console에 컴파일 오류가 있는지 먼저 확인하세요.

## 관련 문서

- [별매 애드온](/guides/add-ons)
- [얼굴 SDF와 Face SDF Studio](/guides/face-sdf)
- [조명과 그림자 — 마스터 조정과 가장자리 림](/guides/light-and-shadow#마스터-조정과-가장자리-림)
- [기본 설정](/guides/basics)
