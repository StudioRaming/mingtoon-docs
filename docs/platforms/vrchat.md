---
id: vrchat
title: VRChat
sidebar_position: 1
---

# VRChat

> 이 페이지는 VRChat PC에 MingToon 아바타를 올리는 분을 위한 것입니다.
> 업로드 순서와 깊이 효과가 어디까지 보이는지를 다룹니다.

VRChat PC는 MingToon의 주 대상입니다. Unity **2022.3.22f1** 을 쓰세요.

:::danger[깊이가 없는 화면이 기본입니다]
뎁스 림라이트·뎁스 그림자·SSAO·이너 아웃라인은 카메라 깊이 텍스처를 읽습니다.
VRChat에서 그 깊이는 월드와 호스트가 정합니다. 아바타는 강제할 수 없습니다.
:::

노멀 아웃라인·프레넬 림·형태 그림자·Face SDF를 폴백으로 함께 준비하세요.

## 업로드 체크리스트

1. Console의 C#·셰이더 오류를 0개로 만듭니다.
2. 밍툰 매니저에서 **하위 렌더러 다시 찾기** 를 실행합니다.
3. `StudioRaming > MingToon > Validate Project`를 실행하고 오류를 해결합니다.
4. VRChat SDK Builder로 업로드합니다. 수동 Bake는 필요 없습니다.
5. SDK 처리 뒤 build clone에서 `RuntimeComponentCount = 0`인지 확인합니다.
6. 인게임에서 본인 화면·미러·Photo Camera를 각각 확인합니다.

![밍툰 매니저 시작하기 탭의 4. 빌드 · 업로드 자동처리 섹션이 보이는 화면](/img/placeholder.png)
<!-- CAPTURE: platforms/vrchat-01-build-upload.png | 밍툰 매니저 「시작하기」 탭의 「4. 빌드 · 업로드 자동처리」 섹션 전체. 전체 공통 토글, 이 캐릭터 최적화 방식, 깊이 라이트 설정이 보이는 상태 | 1200x700 -->

→ [밍툰 매니저](/workflow/character-manager#내보내기--검증)

## MingToon 컴포넌트는 지우지 마세요

:::caution[자동 삭제는 보장되지 않습니다]
VRC SDK는 MingToon 런타임 컴포넌트를 `IEditorOnly`로 봅니다. 그 표시가 삭제를 보장하지는 않습니다.
저작 씬의 매니저를 손으로 지우면 최적화 범위가 사라집니다.
:::

`RuntimeComponentCount`는 저작용 MingToon 컴포넌트만 셉니다. build clone에 남아 있으면 업로드 전에 clone에서 직접 제거하세요.

WARUDO는 스크립트를 유지하는 반대 규칙을 씁니다. → [Warudo](/platforms/warudo)

## Expressions 메뉴 {#expressions-메뉴}

밍툰 매니저는 Expressions 메뉴·파라미터·FX를 자동 설치하지 않습니다. 직접 만든 구성은 SDK Builder의 최종 build clone에서 확인하세요.

인게임 메뉴가 필요하면 별매 애드온을 씁니다. → [Ming Light Controller](/guides/ming-light-controller)

### 품질 티어와 런타임 전환 {#품질-티어와-런타임-전환}

품질 티어는 저작값을 덮어쓰지 않는 상한입니다. 기본값은 High입니다.

| 티어 | 하는 일 |
|---|---|
| **High** | 저작값을 그대로 씁니다. 상한이 없습니다 |
| **Mid** | 뎁스 림·SSAO·투영 페더의 샘플 수를 낮춥니다 |
| **Low** | 깊이 효과 전체와 투영 페더를 끕니다 |

메뉴로 쓸 재질은 **VRC 런타임 제어 사용** 을 켜야 합니다. 켜지 않은 재질은 베이크에서 High로 접혀 가장 가볍습니다.

- **FX 애니메이터로 깊이 효과 전환** — 깊이 효과 마스터를 애니메이션합니다.
- **FX 메뉴로 그림자 투영 전환** — 메뉴에서 투영 그림자만 끕니다.

## 업로드에서 자동으로 처리되는 것 {#빌드-시-자동으로-처리되는-것}

업로드 훅은 원본 씬 에셋을 건드리지 않습니다. SDK가 만든 복사본만 바꿉니다.

- 편집용 셰이더를 경량 셰이더로 바꿉니다.
- 얼굴 노멀을 업로드 Mesh의 UV7에 굽고, 끝나면 원본을 복원합니다.
- 프로젝트에 설정한 슬롯별 텍스처 해상도 상한을 복사본에 적용합니다.
- **깊이 가용성** 값은 그대로 둡니다. Auto는 Auto로 출하됩니다.
- VRC Light Volumes 변형을 자동으로 켭니다.

한 항목이 실패해도 나머지는 복원합니다. 관련 없는 에셋을 전역 저장하지 않습니다.

→ [빌드 시 자동 최적화](/workflow/build-optimization)

## 깊이 효과가 어디까지 보장되나 {#깊이-효과가-어디까지-보장되나}

| 상황 | 깊이 |
|---|---|
| Photo Camera 활성 중 | 지원 |
| 월드가 Screen Camera depth를 켠 경우 | 지원 |
| 일반 플레이어 화면 기본 상태 | 보장 안 됨 |
| 미러 | 의도적으로 차단 |

미러 카메라는 플레이어 카메라의 오래된 깊이를 읽습니다. 남의 실루엣이 그림자로 나오지 않도록 미러에서는 깊이 모듈을 끕니다.

월드 제작자는 [VRC Camera Settings 문서](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/)의 Screen Camera 설정으로 깊이를 켤 수 있습니다.

### 누구에게 보일지 정하기

기본값은 본인과 친구에게만 보이는 것입니다. `시작하기` 탭의 **비친구에게도 깊이 효과 보이기** 를 켜면 모두에게 보입니다. 상대방의 렌더링 부하가 커집니다.

인게임에서 깊이 효과를 끄면 이 설정과 상관없이 꺼집니다.

### VRChat 깊이 라이트 {#vrchat-깊이-라이트}

깊이 효과를 쓰는 아바타는 업로드 복사본에 Directional Light 하나를 싣습니다. 그림자를 켠 이 라이트가 카메라의 깊이 패스를 유도합니다.

| 항목 | 현재 값 |
|---|---|
| Render Mode | Not Important |
| 컬링 레이어 | StereoLeft(15)와 MirrorReflection(18) |
| 적용 범위 | 빌드 클론만. 씬·프리팹·재질은 그대로 |

:::caution[비용은 나를 보는 사람이 냅니다]
깊이 패스는 카메라마다 한 번이지만, 그 패스가 월드의 모든 렌더러를 다시 그립니다.
미러에서는 동작하지 않고, Avatar Safety가 라이트를 끌 수 있습니다.
:::

`시작하기` 탭 `4. 빌드 · 업로드 자동처리` 의 **빌드 시 깊이 라이트 제거하기** 를 켜면 강제로 뺍니다. 깊이 마스터가 꺼져 있거나 깊이 효과가 전부 꺼져 있으면 이 토글과 상관없이 빠집니다.

### 얼굴 투영 그림자 폴백

Face 재질의 **깊이 꺼짐 시 투영 그림자** 는 기본 꺼짐입니다. 켜면 깊이가 없는 화면에서도 얼굴에 투영 그림자가 남습니다.

## VRC Light Volumes {#vrc-light-volumes}

Built-in VRChat 아바타는 Light Volumes를 쓸 수 있습니다. 간접광·스페큘러·포인트 라이트 그림자가 들어옵니다.

- 아바타 업로드에서 필요한 변형이 자동으로 켜집니다.
- Light Volumes가 없는 월드에서는 Unity 조명 프로브로 돌아갑니다.
- 인스펙터의 **VRC 라이트 볼륨 (테스트용)** 은 에디터 확인용입니다.
- 최종 결과는 월드의 볼륨 데이터가 정합니다.

## 다른 빌드 툴과 함께 쓸 때

MingToon 훅은 늦은 순서로 실행됩니다. Modular Avatar나 VRCFury가 재질과 Animator를 처리한 뒤의 최종 상태를 분석합니다. 업로드 뒤 Console 오류와 build clone을 다시 확인하세요.

## 조명을 통제할 수 없다는 전제

월드마다 조명이 다릅니다. **베이스 색 유지**, **최종 최소 밝기**, **최종 최대 밝기**, **씬 조명 색상 영향** 을 실제 월드 범위에 맞추세요.
→ [조명과 그림자](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)

## 알아 둘 것

**하드웨어** — 셰이더 모델 4.5가 필요합니다. 못 맞추면 재질이 마젠타로 보입니다.
→ [하드웨어 요구 사항](/platforms/compatibility#하드웨어-요구-사항-필수)

**Quest** — MingToon 셰이더를 직접 실행하지 않습니다.
→ [VRChat Quest](/platforms/compatibility#vrchat-quest)

**URP** — VRChat은 URP를 쓰지 않습니다. Built-in 제작본을 쓰세요.
