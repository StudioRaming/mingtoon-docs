---
id: vrc-rules
title: VRChat 호환성 규칙
sidebar_position: 5
---

# VRChat 호환성 규칙

MingToon이 VRChat 업로드에 대해 정적으로 검사하는 규칙 전부입니다.
업로드 전에 무엇이 걸릴지 미리 볼 수 있습니다.

이 목록은 패키지에 기록된 기준이며, VRChat 전체의 최신 허용 목록이 아닙니다.
현재 SDK 환경은 [VRChat 공식 Unity 안내](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)에서 확인하세요.

| 항목 | 값 |
|---|---|
| 규칙 버전 | 2026.07 |
| 검증 Unity 버전 | 2022.3.22f1 |
| 근거 | [VRChat Shader Fallback System](https://creators.vrchat.com/avatars/shader-fallback-system/) |

## 실무 결론 {#실무-결론}

VRChat 아바타의 룩을 설계하는 순서입니다.

1. **깊이 없이 성립하는 룩을 먼저 만듭니다.** 형태 그림자, 그림자 투영, 노멀 아웃라인, 림 라이트, 림 셰이드.
2. **뎁스 효과는 나중에 얹습니다.** 화면마다 보이는지 비교하면서 올리세요.
3. **머리카락의 알파와 실루엣을 확인합니다.** 표면 모드를 고르고 fallback 상태에서도 봅니다.
4. **업로드 복제본에 MingToon 런타임 컴포넌트가 0개인지 확인합니다.**
5. **본인 화면, 미러, Photo Camera를 각각 확인합니다.**

## Fallback 셰이더 {#fallback-셰이더}

MingToon Built-in 셰이더는 SubShader 태그에 이렇게 선언합니다.

```text
VRCFallback = toonstandardoutline
```

`toonstandardoutline`은 호스트가 대체 셰이더를 고를 때 쓰는 태그입니다.
MingToon의 색, 그림자, 효과가 보존된다는 뜻이 아닙니다.

:::note[투명 fallback 경고를 확정 결과로 읽지 마세요]
`TransparentFallbackUsesUnlit`은 MingToon 분석기의 경고입니다.
공식 문서 기준으로 Toon과 Transparent/Fade를 조합한 경우입니다.
그 조합은 Transparent Unlit 경로를 씁니다.
`toonstandardoutline`은 그 조합과 별개인 단독 태그입니다.
실제 결과는 재질의 override tag와 Safety 상태에서 확인하세요.
:::

### 표준 alias

Fallback이 값을 이어받으려면 셰이더가 Unity 표준 이름을 갖고 있어야 합니다.
검사하는 alias는 13개입니다.

```text
_MainTex       _Color         _BumpMap    _BumpScale
_OcclusionMap  _OcclusionStrength
_EmissionMap   _EmissionColor
_Cutoff        _Mode
_SrcBlend      _DstBlend      _ZWrite
```

없으면 `MissingStandardAlias` 경고가 납니다.
정상적인 MingToon 재질에서는 나오지 않습니다. 나온다면 셰이더가 손상됐거나 손으로 수정된 것입니다.

## 업로드할 수 있는 컴포넌트

아바타에 남길 수 있는 컴포넌트를 허용 목록으로 갖고 있습니다. 12개입니다.

```text
VRCAvatarDescriptor    VRCConstraint
VRCContactReceiver     VRCContactSender
VRCHeadChop            VRCIKFollower
VRCPhysBone            VRCPhysBoneCollider
PipelineManager        VRCRaycast
VRCSpatialAudioSource  VRCStation
```

목록 밖의 컴포넌트가 있으면 `CustomMonoBehaviourNotUploadable`이 납니다.
`<Missing Script>`도 개수로 셉니다.

:::caution[자동 삭제는 보장되지 않습니다]
MingToon 런타임 컴포넌트는 VRChat에서 `IEditorOnly`로 표시됩니다.
표시했다고 SDK가 반드시 지운다는 보장은 없습니다.
그래서 SDK 처리가 끝난 build clone을 직접 확인해야 합니다.
그 clone에 MingToon 컴포넌트가 0개인지 보세요.
편집 중에는 아바타 루트의 밍툰 매니저를 그대로 두고 평소대로 업로드하세요.
:::

## 이슈 코드

### PC

| 코드 | 심각도 | 뜻 |
|---|---|---|
| `PcRequiresBakedShader` | 오류 | PC 업로드용 재질은 베이크된 변형이어야 합니다 |
| `CustomMonoBehaviourNotUploadable` | 오류 | 허용 목록 밖의 컴포넌트가 있습니다 |
| `UnsupportedRenderBackend` | 오류 | URP 백엔드와 URP 재질은 VRChat 출력에 쓸 수 없습니다 |
| `MissingStandardAlias` | 경고 | 표준 fallback alias가 없습니다 |
| `TransparentFallbackUsesUnlit` | 경고 | 투명 표면의 정적 경고입니다. 위 설명을 보세요 |
| `CameraDependentFeatureNotPortable` | 경고 | 화면·카메라에 기대는 효과는 VRChat 카메라 구성에 좌우됩니다 |
| `UnityVersionNotValidated` | 경고 | 에디터가 검증 버전과 다릅니다 |

:::tip[`PcRequiresBakedShader`가 떠도 수동 Bake는 필요 없습니다]
[빌드 시 자동 최적화](/workflow/build-optimization)가 업로드 순간에 재질을 바꾸고 끝나면 되돌립니다.
이 분석기는 정적 상태를 보는 도구라 편집 상태에서 돌리면 당연히 이 항목이 뜹니다.
:::

### Quest와 Android

| 코드 | 뜻 |
|---|---|
| `QuestMingToonNotSupported` | Quest에는 MingToon 셰이더를 직접 업로드할 수 없습니다 |
| `QuestRequiresMobileShader` | Quest 재질은 `VRChat/Mobile/` 셰이더여야 합니다 |
| `QuestRequiresToonStandardConversion` | `VRChat/Mobile/Toon Standard`로 변환이 필요합니다 |
| `QuestOutlineNotSupported` | Quest 변환은 아웃라인을 유지하지 않습니다 |
| `QuestToonStandardRequiresOpaque` | Quest 변환 대상은 불투명이어야 합니다 |

:::danger[Quest 대응은 별도 작업입니다]
MingToon은 모바일 셰이더 타깃이 아니고 자동 변환 경로도 제공하지 않습니다.
Quest 버전을 만들 계획이라면 아웃라인이 사라지고 반투명을 못 쓴다는 전제로 룩을 따로 설계하세요.
:::

## 뎁스 효과의 조건

아바타 혼자서는 호스트 카메라의 깊이를 보장하지 못합니다.
Photo Camera, 월드 설정, 다른 깊이 공급 조건을 각각 확인하세요.
깊이가 있어도 큐, 카메라 깊이 참여, 품질, 거리 설정에 따라 결과가 달라집니다.

매니저의 **빌드 시 깊이 라이트 제거하기** 는 꺼 두는 것이 기본입니다.
꺼 두면 깊이 효과를 실제로 쓸 때만 업로드 복제본에 보조 Directional Light를 넣습니다.
켜면 그 라이트를 강제로 빼므로 깊이 효과가 화면에서 사라질 수 있습니다.
Avatar Safety, 월드, 광원 설정에 영향을 받으므로 모든 화면에서 깊이를 보장하지는 않습니다.
[VRChat 깊이 라이트](/platforms/vrchat#vrchat-깊이-라이트)를 먼저 읽고 본인 화면, 미러, Photo Camera를 비교하세요.

## 관련 페이지

- [VRChat](/platforms/vrchat)
- [Validate Project 코드](/reference/validator)
- [셰이더 구조와 패스](/internals/shader-structure)
