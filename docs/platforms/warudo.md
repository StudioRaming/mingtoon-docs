---
id: warudo
title: Warudo
sidebar_position: 3
---

# Warudo

**이 문서를 읽으면** Warudo 모드 빌드에서 MingToon이 어떻게 걸리는지, 깊이 효과를 쓰려면 무엇이 더 필요한지 알게 됩니다.

:::caution[현재 상태]
Warudo는 **테스트 대상이며 실기 검증이 완료되지 않았습니다.** 주 대상은 [VRChat](/platforms/vrchat)입니다.
:::

## 기준 버전

| 항목 | 값 |
|---|---|
| Unity | **2021.3.45f2** |
| Warudo Mod SDK | **0.14.3.10** |
| 렌더 파이프라인 | Built-in (BRP) |

:::danger[VRChat 프로젝트와 겸할 수 없습니다]
VRChat은 Unity **2022.3.22f1**, Warudo는 **2021.3.45f2** 입니다. 같은 프로젝트로 둘 다 대응할 수 없으니 대상별로 나누세요.
:::

BRP 커스텀 셰이더는 지원됩니다.

## 빌드

`Warudo > Build Mod`를 실행하면 [빌드 시 자동 최적화](/workflow/build-optimization)가 자동으로 걸립니다. 별도 설정은 필요 없습니다.

:::note[왜 별도 훅이 필요했나]
`Warudo/Build Mod`는 UMod 자체 파이프라인(`ModToolsUtil.StartBuild`)을 쓰기 때문에 Unity의 빌드 콜백(`IPreprocessBuildWithReport`)이 **울리지 않습니다.** 그래서 예전에는 모드가 최적화되지 않은 재질로 조용히 나갔습니다. 지금은 UMod의 확장 지점에 프로세서와 포스트 프로세서를 등록해 처리합니다.
:::

### 빌드 범위

모드 빌드는 씬 전체가 아니라 **빌드 대상 프리팹**만 최적화합니다. 씬을 훑으면 작업자가 열어 둔 관계없는 재질까지 스왑되고, 정작 빌드되는 프리팹이 씬에 없으면 통째로 놓칠 수 있기 때문입니다.

빌드 후 Console에서 `MING_WARUDO_BUILD` 로그와 최적화 요약을 확인하세요.

## 깊이 효과

깊이 림 · 2D 그림자 · 내부 2D 경계는 카메라 깊이 텍스처를 읽습니다. **Depth를 켠 Warudo 카메라**가 필요합니다.

:::caution[아바타 번들만으로는 호스트 카메라를 바꾸지 못할 수 있습니다]
공개 호스트 플러그인 / Playground depth bridge 또는 **동등한 카메라 설정**이 필요합니다.

동봉된 Unity 카메라 훅(`Docs/Warudo/MingToonWarudoDepthBridge.cs.txt`)은 best-effort이며, 사용하는 **모든 main/output 카메라에서 개별적으로** 테스트해야 합니다.
:::

### 확인 순서

1. 모드를 로드한 뒤 깊이 효과가 보이는지 봅니다.
2. 안 보이면 [깊이 기반 효과 진단 순서](/guides/depth-effects#안-보일-때-진단-순서)를 밟습니다.
3. 깊이를 확보할 수 없는 구성이라면, 깊이가 필요 없는 **노멀 아웃라인**과 **림 라이트 / 림 셰이드**로 실루엣을 대신 잡습니다.

카메라를 여러 개 쓰는 구성(메인 + 출력)이라면 각 카메라마다 따로 확인하세요. 한쪽에서만 깊이가 잡히는 경우가 흔합니다.

## 알아 둘 것

- Unity 버전을 **2021.3.45f2**로 맞추세요. Mod SDK 기준선입니다.
- 셰이더 모델 4.5 요구 사항은 여기서도 동일합니다. → [지원 환경](/platforms/compatibility#하드웨어-요구-사항-필수)
- 씬 조명을 통제할 수 없는 연출이라면 `베이스 색 유지`와 `최종 최소 밝기`를 올려 두세요. → [조명과 그림자](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)
