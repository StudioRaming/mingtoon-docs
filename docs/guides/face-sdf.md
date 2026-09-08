---
id: face-sdf
title: 얼굴 SDF와 Face SDF Studio
sidebar_position: 13
---

# 얼굴 SDF와 Face SDF Studio

**이 문서를 읽으면** 페이스 셰이딩과 얼굴 SDF의 차이를 이해하고, 준비한 SDF 맵을 Inspector에서 직접 연결해 방향성 얼굴 그림자를 조정할 수 있습니다.

## 먼저 구분하세요

| 기능 | 하는 일 | 필요한 데이터 |
|---|---|---|
| **페이스 셰이딩** | 얼굴 영역의 노멀, 형태 그림자 경계와 캐스트 동작을 몸과 다르게 처리 | 얼굴 영역 마스크 또는 프록시 |
| **얼굴 SDF** | 광원 방향에 따라 코·볼·눈두덩이 덮이는 순서를 텍스처로 제어 | 얼굴 SDF 맵, 필요하면 정면 UV7 |
| **Face SDF Studio** | 레이어 편집, 미리보기, UV7 투영과 최종 SDF 베이크를 위한 별도 애드온 | 미출시·필수 아님 |

SDF 없이도 페이스 셰이딩은 동작합니다. 먼저 [페이스 셰이딩](/guides/character#페이스-셰이딩)으로 얼굴을 정리하고, 광원이 움직일 때 애니메이션 같은 그림자 전환이 필요할 때 SDF를 더하세요.

:::note[Face SDF Studio는 별도 미출시 애드온입니다]
Face SDF Studio는 공개 MingToon 패키지에 포함되지 않은 별도 제품이며, 이 가이드의 사용 경로에 필요하지 않습니다. 준비한 SDF 텍스처를 MingToon Inspector에 직접 할당하세요. Studio 설치·메뉴·연동 버튼을 전제로 하지 않습니다.

다른 별매 연동은 [Mask Maker 연동](/guides/mask-maker)과 [Ming Light Controller 연동](/guides/ming-light-controller)을 참고하세요.
:::

## SDF 맵 형식 {#sdf-맵-형식}

`SDF 맵 형식`에서 두 방식 중 하나를 고릅니다.

| 형식 | 채널 | 권장 상황 |
|---|---|---|
| **Packed RGBA** | R=왼쪽, G=오른쪽, B=위, A=아래 | 상하 조명까지 쓰는 MingToon 기본 방식 |
| **Single Channel Mirrored U** | R 한 장, 반대쪽 수평광은 U 반전 | 기존 단일 채널 SDF를 빠르게 가져올 때 |

Single Channel은 세로광 영향을 사용하지 않습니다. 상하 방향 변화까지 필요하면 Packed RGBA를 사용하세요.

### 베이크 결과 확인

Packed RGBA는 **R=왼쪽 · G=오른쪽 · B=위 · A=아래**의 네 방향을 한 장에 보관합니다. `Single Channel Mirrored U`는 R만 읽고 반대쪽 수평광에서 U를 반전하므로 상하 채널은 사용하지 않습니다.

`Baked Front UV7`을 선택하면 얼굴 정면 투영 결과가 메시의 UV7(TEXCOORD6)에 기록됩니다. 이 UV7은 해당 Renderer에서 얼굴 SDF가 소유하므로, 같은 UV7에 얼굴 노멀을 베이크하는 작업과 함께 사용하지 마세요. 맵을 준비할 때 사용한 형식·좌표와 Inspector의 선택이 같은지 확인하고, 좌우와 상하 조명을 각각 움직여 네 방향이 뒤바뀌지 않았는지 확인하세요.

### 좌표 선택

- `Base Texture UV (Legacy)` — 기존 UV0를 그대로 읽습니다.
- `Baked Front UV7` — Scene 정면 구도를 UV7에 투영합니다. 얼굴 메시 UV가 여러 조각으로 갈라졌거나 VRChat·Warudo에서 정면 기준을 안정적으로 유지해야 할 때 권장합니다.

:::caution[UV7 소유권은 하나뿐입니다]
얼굴 노멀은 편집 중 Live이며 VRChat 업로드 복사본에만 자동 베이크됩니다. Face SDF가 `Baked Front UV7`을 사용하면 SDF가 UV7을 소유하고 업로드 얼굴 노멀 베이크는 해당 Renderer를 건너뜁니다.

예전 tangent-normal UV7이 남은 재질에서 `Baked Front UV7`을 선택하면 좌표를 잘못 읽습니다. `Base Texture UV (Legacy)`로 되돌리거나, 해당 맵과 함께 준비된 올바른 UV7 payload가 있을 때만 `Baked Front UV7`을 선택하세요. 필요하면 밍툰 매니저의 `얼굴 노멀 실시간으로 되돌리기`를 실행합니다. → [메시 UV 베이크](/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7)
:::

## 준비된 맵을 Inspector에 연결하기 {#face-sdf-studio-작업-순서}

Face SDF Studio 없이도 준비한 맵을 직접 사용할 수 있습니다.

1. `페이스 셰이딩`을 켭니다.
2. `SDF 얼굴 그림자 사용`을 켭니다.
3. `SDF 맵 형식`에서 `Packed RGBA` 또는 `Single Channel Mirrored U`를 고릅니다.
4. `얼굴 SDF 맵`에 준비한 텍스처를 할당합니다. Packed RGBA는 RG를 좌우, BA를 상하 방향에 사용하고, Single Channel은 R을 좌우에 미러링해 사용합니다.
5. `SDF 좌표`에서 `Base Texture UV (Legacy)`를 고릅니다. 맵과 함께 올바른 정면 투영 UV7 payload를 이미 준비한 경우에만 `Baked Front UV7`을 선택합니다.
6. `좌우 영향`·`상하 영향`·`SDF 그림자량`을 조정합니다. Single Channel에서는 상하 영향이 사용되지 않습니다.
7. `경계 이동`과 `경계 부드러움`을 실제 아바타 조명에서 맞춥니다.
8. 좌우와 상하 조명을 각각 움직여 맵의 네 방향이 뒤바뀌지 않았는지 확인합니다.

:::tip[좌표는 준비한 맵과 맞추세요]
Inspector의 `Baked Front UV7`은 맵과 함께 준비한 기존 UV7 payload를 읽는 선택지입니다. 정면 투영 데이터를 준비하지 않았다면 `Base Texture UV (Legacy)`를 사용하세요.
:::

:::caution[맵이 비어 있으면]
준비한 맵을 할당하거나 `SDF 얼굴 그림자 사용`을 끄세요. 회색 기본값은 방향성 그림자 효과를 만들지 않습니다.
:::

## 문제 해결

### 페이스 셰이딩을 켰더니 Base Pass가 사라진다

릴리스 빌드에는 내부 컴파일 진단 토글이 노출되지 않습니다. 다음 순서로 확인하세요.

1. Console의 셰이더·C# 컴파일 오류를 먼저 해결합니다.
2. 재질을 다시 선택해 스키마와 키워드 동기화를 실행합니다.
3. 베이크된 재질이면 밍툰 매니저에서 편집용 재질로 복원한 뒤 다시 베이크합니다.
4. 여전히 사라지면 Unity 버전과 그래픽 API를 포함해 오류 로그를 제출하세요.

유지보수용 변형 덤프와 기술 진단은 `MINGTOON_DEV` 개발 빌드에만 있습니다.

### 좌우가 반대로 움직인다

Packed RGBA의 R/G 채널 배치와 얼굴 정면 방향을 확인하세요. Single Channel은 반대쪽 광원에서 U를 자동 반전하므로, 원본 맵 자체를 좌우 복제하지 않습니다.

### 얼굴 경계에 흰 지그재그가 보인다

형태 그림자 경계가 튄다면 이전 MingToon 셰이더나 오래된 베이크본이 남아 있지 않은지 확인하세요. 재질을 현재 편집 셰이더로 되돌린 뒤 준비한 Face SDF 맵과 좌표를 다시 확인하면 최신 경계 보정이 적용됩니다.

## SDF를 쓸지 판단

| 상황 | 판단 |
|---|---|
| 광원이 고정된 연출 | 페이스 셰이딩만으로 충분할 수 있습니다 |
| VRChat 월드를 돌아다니는 아바타 | 조명이 예측 불가능하므로 효과가 큽니다 |
| Warudo 방송 | 조명 방향을 바꾸며 쓴다면 효과가 큽니다 |
| 작업 시간이 부족함 | 건너뛰어도 나머지 얼굴 처리는 정상 동작합니다 |

## 관련 문서

- [캐릭터 표현 — 페이스 셰이딩](/guides/character#페이스-셰이딩)
- [메시 UV 베이크 — Live 얼굴 노멀과 UV7 소유권](/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7)
- [조명과 그림자 — 얼굴 그림자 조정](/guides/light-and-shadow#얼굴의-스치는-그림자)
