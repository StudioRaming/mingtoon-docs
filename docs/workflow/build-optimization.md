---
id: build-optimization
title: 빌드 시 자동 최적화
sidebar_position: 2
---

# 빌드 시 자동 최적화

**이 문서를 읽으면** 업로드·빌드 때 MingToon이 원본을 보존하면서 무엇을 최적화하고, 실패와 복원을 어떻게 확인하는지 알 수 있습니다.

## 한 줄 요약

자동 최적화는 기본으로 켜져 있습니다. VRChat 업로드, Warudo 모드 빌드와 일반 Player 빌드에서 출하 복사본을 가볍게 만들고, 작업용 재질·Renderer는 편집 가능한 상태로 복원합니다.

수동 Bake는 고정 에셋을 직접 만들 때만 사용하세요. 일반 배포는 자동 최적화로 충분합니다.

## 무슨 일이 일어나나

공통 흐름:

1. 출하 대상 Renderer와 AnimationClip이 참조하는 MingToon 재질을 모읍니다.
2. 실제 사용하는 기능과 애니메이션되는 값을 분석합니다.
3. 고정 기능을 상수로 접은 경량 셰이더를 생성하거나 캐시에서 가져옵니다.
4. 출하 동안 재질의 셰이더를 경량본으로 바꿉니다.
5. 플랫폼별 추가 처리를 실행합니다.
6. 종료·실패·도메인 리로드에서 원래 상태를 복원합니다.

생성 셰이더는 편집용과 같은 ShaderLab Properties 계약을 유지합니다. 애니메이션되는 프로퍼티는 동적으로 남고, Renderer에 현재 할당되지 않았지만 AnimationClip만 참조하는 재질도 수집합니다.

### VRChat 아바타에서 추가되는 처리 {#vrchat-추가-처리}

- `Depth Availability = Auto`를 그대로 보존합니다. Force On / Force Off도 작성자 지정값을 유지하며, `업로드 시 깊이 라이트 싣기`는 재질 값을 바꾸지 않는 별도 옵트인입니다.
- 얼굴 노멀을 **업로드 복사본 Mesh**의 UV7에 굽습니다. Face SDF가 UV7을 소유하거나 텍스처 Face Area Mask가 필요한 Renderer는 동일한 결과를 위해 Live 경로를 유지합니다.
- 프로젝트에서 설정한 베이스·노멀·마스크 등 슬롯 종류별 텍스처 해상도 상한을 업로드 복사본에 적용합니다.
- VRC Light Volumes 변형을 아바타 업로드에 자동 포함합니다.
- MingToon 런타임 컴포넌트는 `IEditorOnly`로 표시합니다. exporter 처리 뒤 실제 build clone에서 `RuntimeComponentCount = 0`인지 별도로 검증해야 합니다.

얼굴 노멀 업로드 산출물은 편집용 메시 베이크와 다른 전용 경로를 사용합니다. 같은 캐릭터·같은 UV 채널이어도 편집용 Mesh 에셋을 재사용하거나 덮어쓰지 않습니다.

### 애니메이션되는 값은 건드리지 않습니다 {#애니메이션되는-값은-건드리지-않습니다}

분석기는 AnimationClip, Animator Controller와 컴포넌트의 중첩·배열 필드를 따라갑니다. 런타임 토글이 필요한 기능은 인스펙터의 옵트인을 켜야 베이크에서 상수로 접히지 않습니다.

예:

- `FX 애니메이터로 깊이 효과 전환`
- `FX 메뉴로 그림자 투영 전환`
- VRC Quality Low / Mid / High

옵트인은 전환 가능성을 보존하는 대신 관련 uniform 분기와 코드가 남습니다. 실제로 애니메이션할 재질에만 켜세요.

### 복구 가능한 실패는 격리하고 치명적 실패는 빌드를 멈춥니다

재질·Renderer 복원은 항목별로 예외를 격리합니다. 하나가 실패해도 뒤 항목을 계속 복원하고, 실패한 항목만 다음 복원 시도를 위해 남깁니다. 저장도 MingToon이 변경한 에셋에만 `SaveAssetIfDirty`를 사용하므로 관련 없는 dirty 에셋을 함께 저장하지 않습니다.

일반 재질 하나의 분석·변환 예외처럼 복구 가능한 실패는 해당 재질을 편집용 셰이더로 되돌리고 경고를 남긴 뒤 나머지를 계속합니다.

반면 `BuildFailedException`, 공통 상수 교집합 실패, 복구 실패처럼 결과 정합성을 보장할 수 없는 오류는 전체 빌드를 중단합니다. Console의 원인을 해결하고 원본 복원이 끝났는지 확인한 뒤 다시 빌드하세요.

## 플랫폼별 진입점

| 플랫폼 | 진입점 |
|---|---|
| **VRChat 아바타/월드** | VRC SDK 빌드 콜백 |
| **Warudo 모드** | UMod 빌드 프로세서 |
| **일반 Player** | Unity 빌드 전처리 콜백 |

VRChat 훅은 Modular Avatar·VRCFury 같은 도구가 재질을 처리한 뒤 실제 최종 상태를 분석하도록 늦게 실행됩니다.

### VRChat 깊이 Auto 계약 {#vrchat-깊이-자동-승격}

`Auto`는 바인딩된 카메라 깊이 텍스처와 VRChat Photo Camera 상태를 카메라마다 직접 읽습니다. 업로드 훅은 이 값을 다시 쓰지 않으므로 Auto는 Auto로, Force On / Force Off는 작성자가 고른 값 그대로 출하됩니다. Force On은 자동 판정이 못 보는 호스트 깊이를 작성자가 보증할 때만 사용하세요.

`업로드 시 깊이 라이트 싣기`는 별도 옵트인입니다. 업로드 복사본에 그림자를 켠 Directional Light를 추가해 카메라가 실제 depth buffer를 만들게 하며, 재질은 Auto로 남습니다. 기본 꺼짐이고 성능·월드 조명 비용이 있습니다. → [VRChat 깊이 라이트](/platforms/vrchat#vrchat-깊이-라이트)

미러 안전 차단은 별도입니다. Force On이어도 미러가 다른 카메라의 깊이를 읽지 않도록 깊이 모듈을 끕니다. → [VRChat 깊이](/platforms/vrchat#깊이-효과가-어디까지-보장되나)

## 텍스처 최적화 {#텍스처-최적화}

밍툰 매니저의 `텍스처 최적화`는 프로젝트 전체 설정입니다. 씬·프리팹이 아니라 Editor 환경설정에 저장되고, 이 프로젝트에서 출하하는 모든 캐릭터에 적용됩니다.

### 슬롯별 해상도 상한

베이스·노멀·맷캡·마스크 같은 슬롯 종류별 최대 해상도를 정합니다. 업로드 복사본만 리사이즈하고 원본 TextureImporter와 원본 파일은 바꾸지 않습니다.

### Reviewed Texture Rewrites On Build (Opt-In)

기본 꺼짐입니다. Surface/normal flatten과 검토된 RGBA mask repack을 허용합니다. readback, 색 공간, mip과 플랫폼 압축 때문에 픽셀이 달라질 수 있으므로 켠 경우 baked 전후 캡처를 비교하세요.

이 옵션이 꺼져 있어도 수학적으로 손실 없는 중복 샘플·항등 마스크 제거는 계속 적용됩니다.

## 제대로 걸렸는지 확인하기 {#제대로-걸렸는지-확인하기}

1. Console의 C#·셰이더 오류를 먼저 0개로 만듭니다.
2. 밍툰 매니저의 `준비 상태 검사`에서 캐시 버전, 생성 셰이더와 원본 변경 여부를 확인합니다.
3. 빌드 로그의 후보·스왑·깊이 승격·텍스처 재작성·얼굴 노멀 베이크 개수를 확인합니다.
4. `StudioRaming/MingToonOptimizeReport.txt`의 재질별 결과를 확인합니다.
5. VRChat은 본인 화면·미러·Photo Camera를 각각 확인합니다.

## 메뉴 옵션

`Tools > Studio Raming > MingToon`의 정식 빌드에는 사용자용 메뉴만 표시됩니다.

- **Optimize Shaders On Build** — 기본 켜짐. 자동 셰이더 최적화를 제어합니다.
- **Reviewed Texture Rewrites On Build (Opt-In)** — 기본 꺼짐. 검토된 텍스처 재작성을 허용합니다.
- **Clean Build Optimization Output** — 생성 셰이더 캐시를 정리합니다.

`Debug: Tint Optimized Shaders Red`, 변형 덤프·레코드와 내부 성능 측정 메뉴는 정식 패키지에 보이지 않습니다. `MINGTOON_DEV` 개발 빌드에서만 사용할 수 있습니다.

## 에디터가 빌드 도중 종료됐다면

셰이더 스왑과 텍스처 재작성은 디스크 저널을 사용해 다음 도메인 리로드에서 복구합니다. 얼굴 노멀 업로드 bake는 build clone 파괴가 정상 종료 경로이고, 살아 있는 공유 재질이 있으면 원래 float·keyword를 대상별로 복원하고 저장합니다.

매니저의 상태가 계속 `복원 필요`라면 `Restore After Interrupted Build`를 실행하고 Console의 항목별 실패를 확인하세요.

## 다음

- 고정 배포 에셋: [수동 Bake와 복원](/workflow/bake-and-restore)
- 플랫폼 체크리스트: [VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo)
