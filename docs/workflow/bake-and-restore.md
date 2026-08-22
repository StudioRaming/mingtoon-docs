---
id: bake-and-restore
title: 수동 Bake와 복원
sidebar_position: 3
---

# 수동 Bake와 복원

**이 문서를 읽으면** 수동 경량 셰이더 Bake가 필요한 경우를 구분하고, 결과를 안전하게 복원할 수 있습니다.

## 먼저: 대부분의 배포에는 필요 없습니다

:::tip[일반 업로드·내보내기는 빌드 시 자동 최적화를 사용하세요]
[빌드 시 자동 최적화](/workflow/build-optimization)는 빌드 직전에 필요한 재질만 임시 최적화하고, 성공·실패 뒤 저작 상태를 복원합니다. 수동 Bake는 새 Shader·Material·Texture·Manifest 에셋을 만들고 Renderer 슬롯을 실제로 교체합니다.
:::

수동 Bake가 필요한 경우는 제한적입니다.

- baked Shader·Material 자체를 별도 에셋으로 전달해야 할 때
- 최적화 결과를 Scene에서 직접 비교하며 승인해야 할 때
- 자동 빌드 훅을 사용할 수 없는 외부 파이프라인에 baked 결과를 넘길 때

얼굴 노멀 UV7, 아웃라인 UV8, 캐릭터 높이 UV4는 **메시 채널 Bake**이며 이 문서의 경량 셰이더 Bake와 별개입니다. → [메시 UV 베이크](/guides/mesh-bakes)

---

## 실행 전 확인

1. 원본 `.mat`, Animator Controller, AnimationClip을 버전 관리에 기록합니다.
2. 밍툰 매니저의 1~3단계에서 변환·역할·룩·메시 채널 결과를 먼저 확인합니다.
3. Animator나 AnimationClip이 나중에 켤 수 있는 패스를 남기려면 `애니메이션 가능 패스 보존 (안전)`을 켭니다.
4. 스크립트가 런타임에 바꾸지만 AnimationClip에는 나타나지 않는 프로퍼티는 해당 행의 `베이크 제외 (런타임 변경)`로 표시합니다.

:::caution[현재 값만 보고 코드를 제거할 수 있습니다]
레이어 수와 Alpha Mask·Emission·Occlusion 같은 기능이 현재 꺼져 있고 보존 대상으로 발견되지 않으면 baked 셰이더에서 관련 코드가 제거됩니다. 나중에 애니메이션이나 스크립트로 켜도 동작하지 않을 수 있습니다.
:::

## Bake

밍툰 매니저의 4단계에서 `하위 MingToon을 경량 셰이더로 베이크`를 실행합니다.

- `Assets/StudioRaming/MingToonGenerated` 아래에 생성 셰이더·baked 재질·필요한 텍스처·Manifest가 만들어집니다.
- Renderer의 현재 슬롯이 baked 재질로 교체됩니다.
- 취소되거나 중간 단계가 실패하면 그 실행에서 만든 에셋과 슬롯 변경을 롤백합니다.
- 완료 후 Console의 `MingToon bake:` 요약에서 처리한 재질과 최적화 수를 확인합니다.

Prefab 인스턴스에서 실행하면 메시와 재질 슬롯 변경이 인스턴스 override로 남습니다. 결과를 Prefab 에셋에 반영하려면 Unity의 `Overrides > Apply All`을 별도로 사용하세요.

---

## 복원

### 한 baked 재질만

baked 재질을 선택하고 인스펙터 위쪽의 `편집 모드로 복원`을 누릅니다. Manifest에 기록된 원본 GUID와 Renderer 슬롯을 사용합니다.

### 프로젝트의 수동 Bake 전체를 정리

`Tools > Studio Raming > MingToon > Advanced > Restore And Clean Bake Output`을 실행합니다.

이 명령은 순서를 보장합니다.

1. Manifest를 따라 Renderer 슬롯을 원본 편집 재질로 복원합니다.
2. 복원된 씬·Prefab 참조를 저장합니다.
3. 모든 기록 슬롯이 실제 원본을 가리키는지 다시 확인합니다.
4. 복원을 증명한 뒤에만 생성 에셋을 삭제합니다.

복원이나 저장에 실패하면 생성 폴더를 먼저 지우지 않습니다. 실패한 항목을 Console에 남기고 수동 확인을 요구합니다.

:::warning[변환 복원과 Bake 복원은 다릅니다]
밍툰 매니저 1단계의 `변환 되돌리기 (MingToon 이전 재질로)`는 변환 전 셰이더 재질로 돌아갑니다. `Restore And Clean Bake Output`은 baked 재질에서 현재 편집용 MingToon 재질로 돌아갑니다.
:::

### 복원 버튼이 비활성일 때

- Bake Manifest가 남아 있는지 확인합니다.
- 원본 편집 재질의 GUID가 살아 있는지 확인합니다.
- Bake 후 Renderer 계층이나 재질 슬롯 구성이 바뀌지 않았는지 확인합니다.
- Console의 stale manual bake 경고를 확인합니다.

---

## 텍스처 Bake 정책

### LosslessOnly — 기본값 {#losslessonly-기본값}

원본 텍스처의 texel을 다시 쓰지 않습니다. 수학적으로 항등인 마스크 제거와 동일 텍스처·동일 UV 식의 공유처럼 손실 없는 구조 최적화만 허용합니다.

### ReviewedHighQuality {#reviewedhighquality}

:::caution[검토된 정적 재질에서만 선택하세요]
surface/normal flatten과 일반 RGBA mask repack을 허용합니다. imported texture readback, color space, mip 재생성, 플랫폼 압축 때문에 픽셀이 달라질 수 있습니다.

Animation dependency와 `베이크 제외` 조건은 계속 검사하지만, baked 전후 결과를 목표 플랫폼에서 직접 비교해야 합니다.
:::

일반 mask repack은 여러 마스크를 공유 텍스처 에셋으로 합칠 수 있지만 셰이더의 텍스처 샘플 수를 항상 줄이는 것은 아닙니다.

## Keep Editable {#keep-editable}

`베이크 제외 (런타임 변경)`은 재질 단위 기록입니다. AnimationClip은 자동 분석되므로, 주로 런타임 스크립트가 바꾸는 값이나 외부 시스템이 이름으로 접근하는 값에 사용하세요.

## 다음

[빌드 시 자동 최적화](/workflow/build-optimization) · [VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo)
