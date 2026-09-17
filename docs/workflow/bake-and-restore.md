---
id: bake-and-restore
title: 수동 Bake와 복원
sidebar_position: 3
---

# 수동 Bake와 복원

> 이 페이지는 수동 Bake를 처음 쓰는 분을 위한 것입니다.
> 대부분은 읽지 않아도 됩니다. 약 5분 걸립니다.

## 먼저: 대부분의 배포에는 필요 없습니다

| 상황 | 쓸 것 |
|---|---|
| VRChat 업로드 | 자동 최적화. 아무것도 안 해도 됩니다 |
| WARUDO 모드 빌드 | 자동 최적화. 아무것도 안 해도 됩니다 |
| 일반 Player 빌드 | 자동 최적화. 아무것도 안 해도 됩니다 |
| baked 셰이더·재질 에셋을 파일로 전달 | 수동 Bake |
| 최적화 결과를 씬에서 비교하며 승인 | 수동 Bake |
| 자동 훅을 못 쓰는 외부 파이프라인 | 수동 Bake |

:::tip[둘의 차이 한 줄]
자동 최적화는 빌드 동안만 바꾸고 되돌립니다. 수동 Bake는 새 에셋을 만들고 Renderer 슬롯을 실제로 바꿉니다.
:::

→ [빌드 시 자동 최적화](/workflow/build-optimization)

얼굴 노멀 UV7, 아웃라인 UV8, 캐릭터 높이 UV4는 메시 채널 Bake입니다. 이 페이지의 셰이더 Bake와 별개입니다.
→ [메시 UV 베이크](/guides/mesh-bakes)

---

## 실행 전 확인

1. 원본 `.mat`, Animator Controller, AnimationClip을 버전 관리에 기록합니다.
2. `시작하기` 탭의 `1. 얼굴 · 스킨 대상 지정`과 `2. 룩 선택 → 변환`이 끝났는지 봅니다.
3. `룩·베이크` 탭에서 프리셋과 메시 채널 베이크 결과를 확인합니다.
4. 런타임 스크립트가 바꾸는 값은 그 행의 **베이크 제외 (런타임 변경)** 로 표시합니다.

AnimationClip은 자동으로 분석합니다. 따로 표시하지 않아도 됩니다.

:::danger[현재 꺼진 기능은 코드에서 사라집니다]
베이크 시점에 꺼져 있는 기능은 코드에서 제거됩니다.
레이어 수, Alpha Mask, Emission, Occlusion이 여기에 해당합니다.
보존 대상으로 발견되지 않으면 나중에 켜도 동작하지 않습니다.
:::

## Bake 실행

`룩·베이크` 탭 맨 아래 **경량 셰이더 베이크 (에디터 전용)** 을 펼칩니다. 그 안의 **하위 MingToon을 경량 셰이더로 베이크** 를 누릅니다.

![밍툰 매니저 룩·베이크 탭에서 경량 셰이더 베이크 버튼과 그 위의 경고 문구가 보이는 화면](/img/placeholder.png)
<!-- CAPTURE: workflow/bake-and-restore-01-bake-button.png | 밍툰 매니저 「룩·베이크」 탭에서 「경량 셰이더 베이크 (에디터 전용)」 폴드아웃을 펼친 상태. 베이크 버튼과 바로 위 경고 블록이 보이게 | 1200x700 -->

- `Assets/StudioRaming/MingToonGenerated` 아래에 셰이더·재질·텍스처·Manifest가 생깁니다.
- Renderer의 현재 슬롯이 baked 재질로 바뀝니다.
- 취소하거나 중간에 실패하면 그 실행이 만든 에셋과 슬롯 변경을 되돌립니다.
- Console의 `MingToon bake:` 요약에서 처리한 재질 수를 확인합니다.

Prefab 인스턴스에서 실행하면 변경이 인스턴스 override로 남습니다. Prefab 에셋에 반영하려면 Unity의 `Overrides > Apply All`을 따로 쓰세요.

---

## 복원

### 한 baked 재질만 되돌리기

baked 재질을 선택하고 인스펙터 위쪽의 **편집 모드로 복원** 을 누릅니다.

Manifest에 기록된 원본 GUID와 Renderer 슬롯을 씁니다.

### 프로젝트의 수동 Bake 전체 정리

`StudioRaming > MingToon > Advanced > Restore And Clean Bake Output`을 실행합니다.

이 명령은 순서를 보장합니다.

1. Manifest를 따라 Renderer 슬롯을 원본 편집 재질로 되돌립니다.
2. 복원된 씬·Prefab 참조를 저장합니다.
3. 모든 기록 슬롯이 실제 원본을 가리키는지 다시 확인합니다.
4. 복원을 증명한 뒤에만 생성 에셋을 지웁니다.

복원이나 저장이 실패하면 생성 폴더를 지우지 않습니다. 실패 항목을 Console에 남기고 확인을 요구합니다.

:::warning[변환 복원과 Bake 복원은 다릅니다]
`변환 되돌리기 (MingToon 이전 재질로)`는 변환 전 셰이더로 돌아갑니다.
`Restore And Clean Bake Output`은 baked 재질에서 편집용 MingToon 재질로 돌아갑니다.
:::

### 복원 버튼이 비활성일 때

- 베이크 Manifest가 남아 있는지 확인합니다.
- 원본 편집 재질의 GUID가 살아 있는지 확인합니다.
- Bake 이후 Renderer 계층이나 재질 슬롯이 바뀌지 않았는지 확인합니다.
- Console의 오래된 수동 베이크 경고를 확인합니다.

---

## 텍스처 처리 정책

수동 Bake는 업로드의 미리보기입니다. 그래서 텍스처 정책도 업로드와 같은 값을 씁니다.

기준은 밍툰 매니저 `최적화` 탭의 **업로드 시에도 텍스처 재작성 (옵트인)** 하나뿐입니다.

### 손실 없음 (LosslessOnly) — 기본값 {#losslessonly-기본값}

옵트인이 꺼져 있을 때의 동작입니다. 원본 텍스처의 픽셀을 다시 쓰지 않습니다.

수학적으로 항등인 마스크 제거와, 같은 텍스처·같은 UV 식의 공유만 허용합니다.

### 검토된 고품질 (ReviewedHighQuality) {#reviewedhighquality}

옵트인을 켰을 때의 동작입니다. 표면·노멀 평탄화와 마스크 재패킹을 허용합니다.

:::caution[검토된 정적 재질에서만 켜세요]
읽기, 색 공간, mip 재생성, 플랫폼 압축 때문에 픽셀이 달라질 수 있습니다.
baked 전후 결과를 목표 플랫폼에서 직접 비교하세요.
:::

마스크 재패킹은 여러 마스크를 한 텍스처로 합칩니다. 셰이더의 텍스처 샘플 수가 항상 줄지는 않습니다.

## 베이크 제외 (Keep Editable) {#keep-editable}

**베이크 제외 (런타임 변경)** 은 재질 단위 기록입니다.

AnimationClip은 자동으로 분석하므로 표시할 필요가 없습니다.

런타임 스크립트가 바꾸는 값이나 외부 시스템이 이름으로 접근하는 값에 쓰세요.

그룹 전체를 한 번에 빼려면 **이 그룹 전체 베이크 제외** 를 씁니다.

## 다음

[빌드 시 자동 최적화](/workflow/build-optimization) · [VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo) · [문제 해결](/troubleshooting#bake)
