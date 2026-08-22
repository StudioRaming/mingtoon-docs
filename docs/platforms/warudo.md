---
id: warudo
title: Warudo
sidebar_position: 3
---

# Warudo

**이 문서를 마치면** Warudo 모드 빌드 최적화와 카메라 깊이 공급을 각각 올바른 위치에 설치할 수 있습니다.

:::caution[지원 상태]
Warudo는 지원 대상이지만 실기 회귀 검증 범위가 VRChat보다 좁습니다. 최종 모드를 Warudo에서 직접 열어 메인 출력과 사용하는 Spout·NDI 카메라를 모두 확인하세요.
:::

## 기준 버전

| 항목 | 값 |
|---|---|
| Unity | **2021.3.45f2** |
| Warudo Mod SDK | **0.14.3.10** |
| 렌더 파이프라인 | Built-in (BRP) |

:::danger[VRChat 프로젝트와 겸할 수 없습니다]
VRChat은 Unity **2022.3.22f1**, Warudo는 **2021.3.45f2**를 사용합니다. 대상별 프로젝트를 나누세요.
:::

---

## 카메라 깊이 설치 — WARUDO Depth Bridge {#warudo-depth-bridge}

2D 뎁스 림·2D 그림자·내부 2D 경계·SSAO 같은 화면 깊이 효과에는 Warudo 카메라의 깊이 텍스처가 필요합니다. 0.1.7 패키지는 이를 공급하는 독립 Warudo 플러그인 소스를 포함합니다.

### 설치

1. Unity 프로젝트에서 `Assets/StudioRaming/MingToon/Docs/Warudo/MingToonWarudoDepthBridge.cs.txt`를 찾습니다.
2. 이 파일을 Warudo 설치 폴더의 `Warudo_Data/StreamingAssets/Playground`로 복사합니다.
3. 파일 이름 끝의 `.txt`를 제거해 `MingToonWarudoDepthBridge.cs`로 만듭니다.
4. Warudo의 Playground 플러그인이 다시 로드된 뒤 Console에서 `[MingToon Warudo Depth Bridge] installed` 로그를 확인합니다.

:::important[캐릭터 프리팹에 붙이는 컴포넌트가 아닙니다]
이 파일은 Warudo 애플리케이션의 Playground에서 실행되는 전역 플러그인입니다. 캐릭터 모드 폴더에 넣거나 프리팹에 컴포넌트를 추가하지 마세요. 예전 `MingToonWarudoRoot` 방식의 안내는 0.1.7 문서에서 폐기됐습니다.
:::

### 무엇을 공급하나

플러그인은 렌더 직전마다 활성 `Game` 카메라를 확인합니다.

- 각 카메라에 `DepthTextureMode.Depth`를 요청합니다.
- 중앙·왼쪽·오른쪽 눈의 world-to-view 행렬을 셰이더 전역값으로 전달합니다.
- 메인 화면뿐 아니라 활성 Spout·NDI·전환 카메라도 카메라별로 처리합니다.
- 카메라가 바뀌어도 `Camera.main` 하나를 캐시하지 않고 실제 렌더 카메라를 사용합니다.

플러그인은 MingToon 런타임 어셈블리에 의존하지 않습니다. Warudo 프로젝트가 asmdef 아래 스크립트를 모드에 포함하지 않는 조건에서도 동작하도록 독립 파일로 제공됩니다.

### 증상으로 확인

| 증상 | 확인 |
|---|---|
| 깊이 효과가 전부 비어 있음 | Playground 경로와 `.cs` 확장자, `installed` 로그 확인 |
| 메인 화면은 정상인데 Spout·NDI 출력만 다름 | 해당 출력 카메라의 `depth enabled for camera=...` 로그 확인 |
| 노멀 아웃라인만 보이고 내부 선은 없음 | 노멀 아웃라인은 깊이가 필요 없으므로 Bridge 로드 여부를 먼저 확인 |

---

## Warudo 모드 빌드

`Warudo > Build Mod`를 실행하면 MingToon의 UMod 빌드 훅이 자동 최적화를 적용합니다. Unity의 일반 `IPreprocessBuildWithReport`가 아니라 UMod의 processor/post-processor 경로를 사용합니다.

### 처리 범위

- 가능한 경우 UMod가 내보내는 GameObject 에셋에서 빌드 루트를 찾아 **그 캐릭터만** 최적화합니다.
- 생성된 셰이더와 텍스처를 UMod 빌드 에셋 목록에 추가합니다.
- 빌드 종료나 실패 뒤에는 저작용 재질을 복원합니다.
- 내보낼 루트를 판별할 수 없을 때는 로드된 씬의 MingToon 재질로 폴백하고 Console에 경고합니다.

Console에서 `[MingToon] Auto optimize` 요약과 빌드 뒤 `[MingToon] Restored authored materials.`를 확인하세요. 오류나 복원 실패가 있으면 그 빌드는 사용하지 말고 원인을 먼저 해결하세요.

:::note[수동 Bake는 기본 절차가 아닙니다]
Warudo 내보내기도 빌드 시 자동 최적화를 사용합니다. baked 재질 에셋 자체가 필요한 특수한 경우가 아니면 [수동 Bake](/workflow/bake-and-restore)를 먼저 실행할 필요가 없습니다.
:::

---

## 조명 차이

- `VRC Light Volumes`는 VRChat 월드용입니다. Warudo에서는 끄고 Unity Light Probe와 씬 조명을 사용하세요.
- Built-in의 포인트·스폿 추가광은 ForwardAdd 패스로 들어옵니다. 재질의 `추가광 수신`, `추가광 강도`, 툰 경계 설정으로 조정합니다.
- WARUDO(Built-in)에서는 포인트·스폿 추가광이 만드는 그림자 내부반사에 `캐스트 섀도우 안 표시량`과 `2D 섀도우 안 표시량` 필터가 적용되지 않습니다.
- 카메라를 여러 개 쓰면 각 출력에서 깊이 효과와 투명 정렬을 따로 확인하세요.

## 내보내기 체크리스트

- Unity 2021.3.45f2와 Built-in 셰이더를 사용했습니다.
- `MingToonWarudoDepthBridge.cs`가 Warudo Playground에 설치됐습니다.
- `Warudo > Build Mod` Console에 최적화·복원 오류가 없습니다.
- 메인 화면과 실제 송출 카메라에서 2D 뎁스 림·2D 그림자·내부 경계를 확인했습니다.
- 씬 조명을 통제하기 어렵다면 `베이스 색 유지`와 `최종 최소 밝기`를 조정했습니다.

## 다음

[빌드 시 자동 최적화](/workflow/build-optimization) · [깊이 기반 효과](/guides/depth-effects) · [조명과 그림자](/guides/light-and-shadow)
