---
id: tiled-materials
title: 타일드 머티리얼 컴포저
sidebar_position: 16
---

# 타일드 머티리얼 컴포저

**용도:** 하나의 물리적 재질 슬롯 안에서 RGBA 영역 마스크로 최대 네 개의 논리 영역을 표면·노멀·맷캡 레이어에 연결합니다. 옷의 천·가죽·금속처럼 반복되는 표면을 나누고 싶을 때 사용하세요.

메뉴는 **StudioRaming > MingToon > Tiled Material Composer**입니다. 이 도구는 메시, 서브메시, Renderer를 수정하지 않습니다.

## 첫 설정

1. **MingToon Material**에 대상 재질을 넣습니다.
2. **Packed Region Mask**에 R/G/B/A 영역을 담은 Texture2D를 넣습니다.
3. 네 영역 카드에서 사용할 영역을 **Enabled**로 두고, 각 카드의 채널과 맵을 설정합니다.
4. **Apply Four Logical Regions**를 누릅니다.

Apply 버튼은 대상 재질과 패킹 마스크가 모두 있을 때 활성화됩니다. 네 영역 카드는 창이 항상 네 개를 만들며, 별도의 region 입력을 채우지 않아도 됩니다.

기본 채널은 영역 1=R, 2=G, 3=B, 4=A이고 이름은 Cloth, Leather, Metal, Label입니다. 채널과 이름은 카드에서 바꿀 수 있습니다.

## 영역 카드의 항목

| 항목 | 범위 또는 효과 |
|---|---|
| **Enabled** | 끄면 해당 영역의 표면·노멀·맷캡 슬롯을 Apply 때 비웁니다 |
| **Mask Channel** | R, G, B, A 중 이 영역이 읽을 채널 |
| **Surface Texture** | 영역에 반복할 표면 맵 |
| **Surface Tiling** | 그 표면 맵의 UV 반복 |
| **Surface Tint** | 영역 표면 색에 곱할 색 |
| **Surface Opacity** | 표면 레이어의 적용량(0~1) |
| **Normal Map / Normal Strength** | 노멀 맵과 강도(0~2) |
| **Matcap Map / Matcap Strength** | 맷캡 맵과 강도(0~20) |

맵을 비워도 같은 슬롯이 Apply 때 정리됩니다. 예를 들어 Normal Map만 비우면 해당 영역의 노멀 슬롯이 지워지고 표면·맷캡 설정은 별도로 처리됩니다.

## Apply가 재질에 쓰는 것

Apply는 네 카드를 모두 순회하고, Enabled이며 맵이 있는 항목을 해당 레이어 슬롯에 씁니다. 빈 맵과 비활성 카드는 명시적으로 지웁니다.

| 카드 값 | MingToon 대상 |
|---|---|
| 표면 맵·Tiling·Tint·Opacity·패킹 마스크·채널 | 텍스처 스택 |
| 노멀 맵·Tiling·강도·패킹 마스크·채널 | 노멀 레이어 |
| 맷캡 맵·강도·패킹 마스크·채널 | 맷캡 레이어 |
| 사용된 마지막 슬롯 번호 | 각 모듈의 사용 토글과 레이어 수 |

첫 번째 노멀 카드는 MingToon 기본 **Bump Map** 슬롯을 사용합니다. 비활성화된 첫 카드의 기존 Bump Map은 컴포저가 만든 영역 마스크가 없으면 보존될 수 있으므로, 기존 수동 노멀을 지우려면 대상 슬롯을 별도로 확인하세요. Apply는 Undo 한 단위로 기록됩니다.

## 마스크 작성 원칙

마스크의 각 채널은 해당 영역의 가중치입니다. 같은 픽셀에서 여러 채널이 밝으면 영역 레이어가 겹쳐 합성됩니다. 영역이 겹치면 의도한 결과인지 확인하고, 경계가 거칠면 마스크에 부드러운 전이를 그리세요.

표면·노멀 맵은 카드의 Tiling을 사용합니다. 마스크는 컴포저가 패킹 텍스처를 읽는 기준으로 쓰이며, 큰 일러스트 한 장을 네 조각으로 자동 분할하는 기능은 아닙니다. 재질별 Surface Mode·렌더 큐를 영역마다 나눌 수 없으므로 서로 다른 표면 모드가 필요하면 재질을 분리해야 합니다.

## 적용 후 확인

Apply 뒤에는 [디테일 맵](/guides/detail-maps)에서 Stack, Normal, MatCap 레이어 수와 강도를 확인하고, [텍스처 슬롯 공통 UI](/guides/texture-modules)에서 각 맵의 Tiling / Offset을 조정하세요. 컴포저는 별도의 런타임 모드를 만들지 않고 일반 레이어 프로퍼티를 기록합니다.

## 버튼이 비활성화되거나 결과가 없을 때

- Apply가 비활성화되어 있으면 대상 재질과 Packed Region Mask를 모두 지정했는지 확인합니다.
- 한 영역이 보이지 않으면 카드가 **Enabled**인지, 해당 맵이 채워졌는지, Mask Channel이 실제로 칠한 채널인지 확인합니다.
- Apply 후 다른 영역의 기존 값이 남으면 그 카드의 Enabled와 맵을 비운 상태에서 다시 Apply합니다.
- 결과가 잘못 겹치면 마스크 채널 중복과 경계를 확인합니다.
- 레이어가 보이지 않으면 해당 모듈의 레이어 수가 마지막 사용 슬롯까지 올라갔는지 확인합니다.

## 관련 문서

- [디테일 맵](/guides/detail-maps)
- [텍스처 슬롯 공통 UI](/guides/texture-modules)
- [모듈과 성능 비용](/internals/module-cost)
