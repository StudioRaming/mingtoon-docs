---
id: vrchat
title: VRChat
sidebar_position: 1
---

# VRChat

**이 문서를 읽으면** VRChat PC 아바타에 MingToon을 올리고, 0.1.7의 자동 베이크·Expressions 메뉴·깊이 효과·Light Volumes 동작을 확인할 수 있습니다.

VRChat PC는 MingToon의 주 대상입니다.

:::caution[BRP 본체 Open Beta]
VRChat PC는 수동 검증 대상입니다. 업로드 전에 이 페이지의 체크리스트와 밍툰 매니저의 준비 상태 검사를 직접 통과시키세요. VRChat Quest는 MingToon 셰이더의 직접 실행 대상이 아닙니다. → [지원 환경](/platforms/compatibility#vrchat-quest)
:::

## Unity 버전

:::danger[Unity 2022.3.22f1]
현재 검증된 VRChat SDK 프로젝트 버전입니다. VRChat 빌드 훅은 지원하는 2022.3 스트림에서만 컴파일됩니다. Warudo용 Unity 2021.3.45f2 프로젝트와 같은 프로젝트를 공유하지 마세요.
:::

## 업로드 체크리스트

1. Console의 C#·셰이더 오류를 0개로 만듭니다.
2. 밍툰 매니저에서 `하위 렌더러 다시 찾기`를 실행합니다.
3. `준비 상태 검사`와 `VRChat 사전 점검`을 실행합니다. → [밍툰 매니저](/workflow/character-manager#내보내기--검증)
4. Expressions 메뉴를 쓴다면 Gesture Manager에서 `MingToon Controls`를 확인합니다.
5. VRChat SDK Builder로 업로드합니다. 수동 Bake는 필수가 아닙니다.
6. 인게임에서 본인 화면·미러·Photo Camera를 각각 확인합니다.

## MingToon 컴포넌트는 지우지 마세요

:::danger[직접 제거하면 최적화 범위를 잃습니다]
MingToon 런타임 컴포넌트는 VRC SDK에서 `IEditorOnly`로 표시되지만 자동 삭제는 보장되지 않습니다. 저작 씬의 밍툰 매니저를 손으로 지우면 캐시된 Renderer 범위가 사라져 일부 재질이 최적화되지 않을 수 있습니다.

저작 씬은 유지하고, SDK 처리 뒤 실제 build clone에서 `RuntimeComponentCount = 0`인지 검증하세요. 남아 있다면 업로드 전에 clone에서 명시적으로 제거해야 합니다.
:::

Warudo는 스크립트를 유지하는 반대 규칙을 사용합니다. → [Warudo](/platforms/warudo)

## Expressions 메뉴 {#expressions-메뉴}

밍툰 매니저는 Modular Avatar로 메뉴·파라미터·FX를 build clone에 비파괴 설치할 수
있습니다. Modular Avatar가 없다면 직접 병합 방식도 사용할 수 있습니다.

Manager의 `전체 조정 메뉴 사용`으로 업로드 전에 두 프로필 중 하나를 고릅니다.

| 프로필 | 유지되는 기능 | 추가 기능 | 동기화 비용 |
|---|---|---|---:|
| 전체(기본) | Virtual Light 핵심 · High/Mid/Low · Shadow Projection · Reset | Palette · Master Adjust · Photo Looks | 21개 · 77비트 |
| 가벼운 메뉴 | Virtual Light 핵심 · High/Mid/Low · Shadow Projection · Reset | 없음 | 10개 · 31비트 |

전체 메뉴는 총 28개(동기화 21개 + 로컬 7개), 가벼운 메뉴는 총 12개(동기화
10개 + 로컬 2개)입니다. 로컬 명령은 0비트입니다. 설치 전에 기존 파라미터 타입,
256비트 예산, 메뉴당 8칸을 검사하고 실패하면 되돌립니다.

공통 메뉴:

- **Virtual Light** — Enabled, Direction, Intensity, Follow Character,
  Auto/Replace/Add Mode
- **Quality** — 명시적인 High / Mid / Low 버튼과 독립적인 `Shadow Projection`
- **Reset All** — 현재 프로필의 12개 또는 28개 값을 설치 기본값으로 복원

전체 메뉴에서만 추가:

- **Palette** — Warm / Gold / Mint / Cyan / Blue / Violet / Rose / Red 8색 ×
  Neutral / Soft / Medium / Full 4단계 채도. 32조합을 Int 한 개에 압축합니다.
- **Master Adjust** — Highlight / Shadow / Final Output의 강도와 Tint
  Off / Low / Mid / Full. 팔레트는 공유하지만 색 영향량과 강도는 각 그룹이
  따로입니다.
- **Photo Looks** — Neutral, Dark World Rescue, Flat Studio, Unlit Reference,
  Warm Portrait, Cool Portrait, No Emission, No Backlight

`Expressions 루트에 직접 배치`를 끄면 두 프로필 모두 루트 슬롯 하나짜리
`MingToon Controls` 폴더를 씁니다. 켜면 전체 프로필은
`Virtual Light`·`Master Adjust`·`Reset All`, 가벼운 프로필은
`Virtual Light`·`Quality`·`Reset All`을 루트에 놓습니다. 세 칸이 없으면
폴더 방식으로 돌아갑니다. 프로필을 바꿔 다시 설치하면 이전 MingToon
파라미터·FX 레이어·생성 메뉴를 정리합니다.

Photo Looks는 전체 프로필에서 자기 아바타의 밝기 범위·광색 영향·Unlit 혼합·발광·
백라이트·색온도를 묶어 동기화합니다. 다른 사용자는 그 아바타에 적용된 결과를 봅니다.
내 화면의 다른 아바타 전부를 동시에 바꾸는 기능은 월드/Udon 권한이 필요하므로
포함하지 않습니다.
### 품질 티어와 런타임 전환 {#품질-티어와-런타임-전환}

`High`는 저작값을 유지하고, `Mid`는 2D 림·SSAO·투영 그림자 샘플 수를 제한합니다. `Low`는 샘플 수를 더 낮추고 깊이 효과 마스터와 투영 그림자 페더를 끕니다. 티어는 저작값을 덮어쓰지 않는 상한입니다. 품질 메뉴를 쓸 재질은 밍툰 매니저에서 옵트인해야 하며, 옵트인하지 않은 값은 베이크에서 상수로 접혀 가장 가볍습니다.

- `FX 애니메이터로 깊이 효과 전환` — 깊이 효과 전체 마스터를 애니메이션합니다.
- `FX 메뉴로 그림자 투영 전환` — Quality 메뉴의 `Shadow Projection`으로 투영 그림자만 끕니다. OFF에서는 페더·캐스트 합성·관련 투과광 계산을 건너뜁니다.
## 업로드에서 자동으로 처리되는 것 {#빌드-시-자동으로-처리되는-것}

업로드 훅은 원본 씬 에셋이 아니라 SDK가 만든 복사본만 변경합니다.

- 편집용 셰이더를 경량 셰이더로 최적화합니다.
- Face 노멀 누름을 업로드 Mesh의 UV7에 굽고 종료 후 원본 Renderer·재질을 복원합니다.
- Face SDF가 UV7을 소유하거나 텍스처 Face Area Mask가 필요한 Renderer는 동일한 결과를 위해 Live 경로를 유지합니다.
- 프로젝트에서 설정한 슬롯 종류별 텍스처 해상도 상한을 업로드 복사본에 적용합니다.
- `Depth Availability = Auto`를 그대로 보존합니다. Force On / Force Off도 작성자 지정값을 유지하며, 일반 화면 깊이가 필요하면 별도 옵트인 `업로드 시 깊이 라이트 싣기`를 사용합니다.
- VRC Light Volumes 변형을 아바타 업로드에서 자동 활성화합니다.
- MingToon 런타임 컴포넌트는 exporter 처리를 위해 `IEditorOnly`로 표시됩니다. 최종 build clone에는 0개인지 별도로 검증해야 합니다.

복원과 저장은 변경한 Renderer·재질별로 격리됩니다. 한 항목이 실패해도 나머지를 복원하며, 관련 없는 dirty 에셋을 전역 저장하지 않습니다. → [빌드 시 자동 최적화](/workflow/build-optimization)

## 깊이 효과가 어디까지 보장되나 {#깊이-효과가-어디까지-보장되나}

2D 림라이트·2D 그림자·SSAO·2D 투과광·이너 아웃라인은 카메라 깊이 텍스처를 읽습니다. VRChat에서 Screen Camera depth는 월드 권한입니다.

| 상황 | 깊이 |
|---|---|
| **Photo Camera 활성 중** | 지원 |
| **월드가 Screen Camera depth를 켠 경우** | 지원 |
| **일반 플레이어 화면 기본 상태** | 보장 안 됨 |
| **미러** | 의도적으로 차단 |

미러 카메라가 플레이어 카메라의 오래된 깊이를 읽어 남의 실루엣을 그림자로 쓰지 않도록 `Force On`이어도 깊이 모듈을 끕니다.

월드 제작자는 [VRC Camera Settings 공식 문서](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/)의 Screen Camera 설정으로 깊이를 요청할 수 있습니다. 아바타가 이 설정을 직접 바꿀 수는 없습니다.

### VRChat 깊이 라이트 (기본 꺼짐) {#vrchat-깊이-라이트}

`업로드 시 깊이 라이트 싣기`는 업로드 복사본에 그림자를 켠 Directional Light 하나를 추가해 일반 화면에서도 깊이 패스를 유도하는 옵트인 우회로입니다.

:::danger[비용과 제한]

1. 아바타를 보는 다른 사용자의 카메라에 추가 깊이 패스 비용이 생깁니다.
2. 미러에서는 동작하지 않습니다.
3. Avatar Safety가 라이트를 끌 수 있습니다.
4. 아바타 퍼포먼스 랭크와 픽셀 라이트 수에 영향을 줄 수 있습니다.
:::

깊이 없는 일반 화면을 기본으로 잡고 노멀 아웃라인·림·형태 그림자·Face SDF 같은 폴백을 함께 준비하는 편이 안전합니다.

### 얼굴 투영 그림자 폴백

Face 재질의 `깊이 없음에서도 얼굴 투영 그림자` 옵트인은 깊이 모듈이 내려간 화면에서도 얼굴 SDF/그림자 텍스처 경로를 유지합니다. 기본 꺼짐이며, 일반 화면 폴백이 꼭 필요한 Face 재질에만 켜세요.

## VRC Light Volumes {#vrc-light-volumes}

Built-in VRChat 아바타는 Light Volumes가 제공하는 간접광, 스페큘러, 포인트 라이트 그림자, 노멀 바이어스와 강도를 사용할 수 있습니다.

- 아바타 업로드에서는 필요한 변형이 자동 활성화됩니다.
- Light Volumes가 없는 월드에서는 Unity 조명 프로브로 폴백합니다.
- Unity Editor의 값은 테스트용입니다. 최종 결과는 월드의 볼륨 데이터가 결정합니다.
- URP와 Warudo Built-in에서는 같은 VRC 볼륨 계약을 기대하지 마세요.

## 다른 빌드 툴과 함께 쓸 때

MingToon 훅은 Modular Avatar·VRCFury 같은 도구가 재질과 Animator를 처리한 뒤 최종 상태를 분석하도록 늦은 순서에 실행됩니다. 준비 상태 검사에서 충돌과 누락을 다시 확인하세요.

## 조명을 통제할 수 없다는 전제

월드마다 조명이 다릅니다. `베이스 색 유지`, 최종 최소·최대 밝기, 씬 조명 색 영향과 림의 씬 조명 영향을 실제 월드 범위에 맞추세요. 추가광 상한은 0.1.7에서 베이스 색 배수가 아니라 절대 HDR 피크입니다. → [조명과 그림자](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)

## VRChat + URP

지원하지 않습니다. VRChat용 Built-in 제작본을 사용하세요.

## 알아 둘 것

**하드웨어** — Shader Model 4.5가 필요합니다. 만족하지 못하면 재질이 마젠타로 보일 수 있습니다. → [지원 환경](/platforms/compatibility#하드웨어-요구-사항-필수)

**Quest** — MingToon 셰이더를 직접 실행하지 않습니다. 밍툰 매니저의 Quest 점검은 아웃라인·반투명·깊이 효과처럼 대체본에서 잃는 항목을 셉니다.
