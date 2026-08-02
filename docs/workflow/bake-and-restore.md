---
id: bake-and-restore
title: 수동 Bake와 복원
sidebar_position: 3
---

# 수동 Bake와 복원

**이 문서를 읽으면** 언제 수동 Bake가 필요한지 판단하고, 안전하게 실행한 뒤 편집 상태로 되돌릴 수 있습니다.

## 먼저: 대부분의 경우 필요 없습니다

:::tip[일반적인 업로드·배포에는 빌드 시 자동 최적화로 충분합니다]
[빌드 시 자동 최적화](/workflow/build-optimization)는 빌드 동안만 셰이더를 바꾸고 끝나면 되돌립니다. 재질 에셋도 Renderer도 그대로입니다.

수동 Bake는 **새 재질을 만들고 Renderer 슬롯을 갈아 끼웁니다.** 작업을 계속하려면 손으로 되돌려야 합니다.
:::

수동 Bake를 쓰는 경우:

- baked 결과물 자체를 에셋으로 넘겨야 할 때
- 자동 최적화보다 공격적으로 줄이고, 그 결과를 눈으로 확인하며 작업해야 할 때
- 스크립트가 전혀 없는 재질만 남겨야 하는 배포 조건이 있을 때

---

## 절차 {#절차}

1. `MingToon Manager` 컴포넌트 인스펙터에서 변환/편집 결과를 확인합니다.
2. 애니메이션이나 런타임 재질 변경이 필요하면 **`동적 패스 보존`** 을 켭니다. 정적 아바타는 더 공격적으로 줄일 수 있습니다.
3. Bake를 실행합니다.
4. `Assets/StudioRaming/MingToonGenerated` 아래에 생성 셰이더 · baked 재질 · manifest가 만들어지고 Renderer 슬롯이 baked 재질로 교체됩니다.

<!-- SCREENSHOT: MingToon Manager 인스펙터의 Bake 영역 -->

:::danger[Bake 전에 백업하세요]
원본 `.mat`과 애니메이션을 버전 관리에 넣거나 별도로 복사해 두세요. manifest가 없어지거나 Renderer/슬롯 구성이 바뀌면 자동 복원이 불가능해집니다.
:::

## 복원

baked 재질을 선택하면 인스펙터 **위쪽의 복원 버튼**으로 기록된 원본 편집용 재질을 다시 연결할 수 있습니다.

:::caution[복원 버튼이 비활성이라면]
아래를 확인하세요.

- bake manifest가 남아 있는가
- 원본 편집 재질의 GUID가 살아 있는가
- Bake 이후 Renderer 계층이나 재질 슬롯 구성이 바뀌지 않았는가
:::

---

## 무엇이 잘려 나가나

베이크 생성기는 **실제로 쓰지 않는** 아래 기능을 baked 셰이더에서 컴파일 타임에 제외할 수 있습니다.

- Fresnel Rim
- 2차 Form Shadow
- Depth Effects
- 2D Rim
- 2D Shadow

`AnimationClip`뿐 아니라 컴포넌트의 중첩/배열 직렬화 필드에 들어 있는 Animator Controller 참조까지 검사해서, **실제로 애니메이션되는 프로퍼티에 필요한 모듈만** 보존합니다.

외곽선은 직접 렌더링되는 Hull과 카메라 깊이를 읽는 Inner Edge만 지원하며, 화면 합성용 별도 런타임은 사용하지 않습니다.

---

## 텍스처 Bake 정책

### LosslessOnly (기본값) {#losslessonly-기본값}

원본 텍스처의 texel을 **다시 쓰지 않습니다.** 손실 없는 구조 최적화만 적용합니다.

- depth mask가 수학적으로 항등임을 증명한 경우
- PBR/AO가 같은 Texture 객체·같은 UV 식을 쓰는 경우

### ReviewedHighQuality {#reviewedhighquality}

:::caution[검토된 정적 재질에서만 명시적으로 선택하세요]
surface/normal flatten과 일반 RGBA mask repack을 허용합니다. 따라서 imported texture readback, color space, mip 재생성, 플랫폼 압축 때문에 **픽셀이 달라질 수 있습니다.**

Animation dependency와 `Keep Editable` 조건은 계속 검사하지만, **애니메이션 결과와 목표 플랫폼의 mip/압축 룩을 baked 전후 캡처로 직접 비교해야 합니다.**
:::

일반 mask repack은 mask slot을 공유 texture 에셋으로 합치지만, **shader sample 수를 줄이지는 않습니다.**

---

## Keep Editable {#keep-editable}

특정 프로퍼티를 최적화 대상에서 제외하고 싶으면 재질 단위로 표시할 수 있습니다. 애니메이션되지는 않지만 나중에 스크립트로 바꿀 값에 씁니다.

## 다음

[VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo) 업로드 체크리스트
