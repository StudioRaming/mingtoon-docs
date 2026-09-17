---
id: warudo
title: Warudo
sidebar_position: 3
---

# Warudo

> 이 페이지는 WARUDO에서 MingToon 캐릭터를 쓰는 분을 위한 것입니다.
> 깊이 공급 플러그인 설치와 모드 빌드 확인을 다룹니다.

## 기준 버전

| 항목 | 값 |
|---|---|
| Unity | **2021.3.45f2** |
| WARUDO Mod SDK | **0.14.3.10** |
| 렌더 파이프라인 | Built-in (BRP) |

:::danger[VRChat 프로젝트와 겸할 수 없습니다]
VRChat은 Unity 2022.3.22f1, WARUDO는 2021.3.45f2를 씁니다. 대상별로 프로젝트를 나누세요.
:::

---

## 카메라 깊이 설치 — WARUDO Depth Bridge {#warudo-depth-bridge}

뎁스 림라이트·뎁스 그림자·이너 아웃라인·SSAO는 WARUDO 카메라의 깊이 텍스처가 필요합니다.

패키지에 그 깊이를 공급하는 독립 플러그인 소스가 들어 있습니다.

### 이건 캐릭터가 아니라 WARUDO 본체에 설치합니다

:::caution[프리팹에 붙이는 컴포넌트가 아닙니다]
이 파일은 WARUDO 애플리케이션의 Playground에서 도는 전역 플러그인입니다.
캐릭터 모드 폴더에 넣거나 프리팹에 컴포넌트로 추가하지 마세요.
:::

### 설치

1. Unity 프로젝트에서 `Assets/StudioRaming/MingToon/Docs/Warudo/MingToonWarudoDepthBridge.cs.txt`를 찾습니다.
2. 이 파일을 WARUDO 설치 폴더의 `Warudo_Data/StreamingAssets/Playground`로 복사합니다.
3. 파일 이름 끝의 `.txt`를 지워 `MingToonWarudoDepthBridge.cs`로 만듭니다.
4. WARUDO를 다시 시작하고 Console에서 `[MingToon Warudo Depth Bridge] installed` 로그를 확인합니다.

플러그인 목록에 `MingToon Warudo Depth Bridge`가 보이면 성공입니다.

![WARUDO 설치 폴더의 Warudo_Data/StreamingAssets/Playground 안에 MingToonWarudoDepthBridge.cs 파일이 놓인 탐색기 화면](/img/placeholder.png)
<!-- CAPTURE: platforms/warudo-01-playground-folder.png | Warudo_Data/StreamingAssets/Playground 폴더에 MingToonWarudoDepthBridge.cs가 있는 탐색기 + 옆에 WARUDO 플러그인 목록 | 1200x700 -->

### 무엇을 공급하나

플러그인은 렌더 직전마다 활성 Game 카메라를 확인합니다.

- 각 카메라에 깊이 텍스처를 요청합니다.
- 중앙·왼쪽·오른쪽 눈의 시점 행렬을 셰이더 전역값으로 넘깁니다.
- 메인 화면뿐 아니라 활성 Spout·NDI·전환 카메라도 카메라별로 처리합니다.
- 카메라가 바뀌어도 하나를 캐시하지 않고 실제 렌더 카메라를 씁니다.

플러그인은 MingToon 런타임 어셈블리에 의존하지 않습니다. 그래서 독립 파일로 제공합니다.

### 증상으로 확인

| 증상 | 확인할 것 |
|---|---|
| 깊이 효과가 전부 비어 있음 | Playground 경로, `.cs` 확장자, `installed` 로그 |
| 메인 화면은 정상인데 Spout·NDI만 다름 | 그 출력 카메라의 `depth enabled for camera=` 로그 |
| 노멀 아웃라인만 보이고 내부 선이 없음 | 노멀 아웃라인은 깊이가 필요 없습니다. Bridge 로드 여부부터 |

→ [문제 해결 — WARUDO](/troubleshooting#warudo)

---

## WARUDO 모드 빌드

`Warudo > Build Mod`를 실행하면 MingToon의 빌드 훅이 자동 최적화를 겁니다.

Unity의 일반 빌드 콜백이 아니라 UMod의 processor 경로를 씁니다.

### 처리 범위

- UMod가 내보내는 GameObject에서 빌드 루트를 찾아 그 캐릭터만 최적화합니다.
- 생성한 셰이더와 텍스처를 UMod 빌드 에셋 목록에 추가합니다.
- 빌드가 끝나거나 실패하면 저작용 재질을 복원합니다.
- 내보낼 루트를 판별하지 못하면 로드된 씬의 MingToon 재질로 돌아가고 경고를 남깁니다.

### 확인할 로그

| 로그 | 뜻 |
|---|---|
| `[MingToon] Warudo mod build processor entered` | 훅이 실행됐습니다 |
| `[MingToon] Applied auto optimize and registered N generated assets.` | 최적화가 걸렸습니다 |
| `[MingToon] Restored authored materials.` | 저작 상태로 돌아왔습니다 |
| `[MingToon] Could not restore authored materials.` | 복원 실패입니다. 이 빌드는 쓰지 마세요 |

:::note[수동 Bake는 기본 절차가 아닙니다]
WARUDO 내보내기도 빌드 시 자동 최적화를 씁니다. baked 재질 에셋 자체가 필요할 때만 수동 Bake를 쓰세요.
:::

→ [수동 Bake와 복원](/workflow/bake-and-restore)

### 깊이 라이트

WARUDO 빌드도 깊이 효과를 쓰면 깊이 라이트를 함께 싣습니다.

밍툰 매니저의 **빌드 시 깊이 라이트 제거하기** 로 강제 제외할 수 있습니다.
→ [VRChat 깊이 라이트](/platforms/vrchat#vrchat-깊이-라이트)

---

## 조명 차이

- **VRC 라이트 볼륨 (테스트용)** 은 VRChat 월드용입니다. WARUDO에서는 끄고 Unity Light Probe를 쓰세요.
- Built-in의 포인트·스폿 추가광은 ForwardAdd 패스로 들어옵니다.
- 추가광이 세면 **추가 광원 받기** 와 **추가 광원 강도** 로 조절하세요.
- 카메라를 여러 개 쓰면 출력마다 깊이 효과와 투명 정렬을 따로 확인하세요.

:::caution[ForwardAdd에는 그림자 필터가 걸리지 않습니다]
WARUDO Built-in에서 추가광이 만드는 그림자 내부 반사에는 필터가 적용되지 않습니다.
자세한 조건은 [림 레퍼런스](/reference/rim)를 보세요.
:::

## 내보내기 체크리스트

1. Unity 2021.3.45f2와 Built-in 셰이더를 씁니다.
2. `MingToonWarudoDepthBridge.cs`가 Playground에 설치돼 있습니다.
3. `Warudo > Build Mod` Console에 최적화·복원 오류가 없습니다.
4. 메인 화면과 실제 송출 카메라에서 깊이 효과를 확인합니다.
5. 씬 조명을 통제하기 어려우면 **베이스 색 유지** 와 **최종 최소 밝기** 를 조정합니다.

## 다음

[빌드 시 자동 최적화](/workflow/build-optimization) · [깊이 기반 효과](/guides/depth-effects) · [조명과 그림자](/guides/light-and-shadow)
