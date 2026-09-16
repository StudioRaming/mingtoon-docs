---
id: vrc-rules
title: VRChat 호환성 규칙
sidebar_position: 5
---

# VRChat 호환성 규칙

이 페이지는 MingToon 패키지의 정적 검사 규칙을 설명합니다. 규칙 버전과 검증 Unity는 패키지에 기록된 기준이며, VRChat 전체의 최신 허용 목록이나 실제 업로드 성공을 대신하지 않습니다. 현재 SDK 환경은 [VRChat 공식 Unity 안내](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)에서 확인하세요.

**이 문서를 읽으면** MingToon이 VRChat 업로드에 대해 검사하는 규칙 전체를 알고, 업로드 전에 무엇이 걸릴지 미리 판단할 수 있습니다.

MingToon은 VRChat 규칙을 **버전이 찍힌 규칙 세트**로 들고 있습니다.

| 항목 | 값 |
|---|---|
| 규칙 버전 | `2026.07` |
| 검증 Unity 버전 | `2022.3.22f1` |
| 근거 | [VRChat Shader Fallback System](https://creators.vrchat.com/avatars/shader-fallback-system/) |

---

## Fallback 셰이더 {#fallback-셰이더}

MingToon BRP 셰이더는 SubShader 태그에 이렇게 선언합니다.

```text
VRCFallback = toonstandardoutline
```

:::note[Fallback에서 확인할 것]
`toonstandardoutline`은 호스트가 대체 셰이더를 선택할 때 사용하는 태그입니다. MingToon의 모든 색·그림자·효과가 보존된다는 뜻은 아닙니다. 투명 모드의 대체 경로와 실제 Safety 설정에서도 결과를 확인하세요.
:::

:::note[투명 fallback 경고와 실제 태그를 구분하세요]
`TransparentFallbackUsesUnlit`은 MingToon 정적 분석기의 경고 코드입니다. 공식 문서에서 **Toon + Transparent/Fade** 조합은 Transparent Unlit 경로를 사용하지만, **toonstandardoutline은 조합할 수 없는 별도 태그**입니다. MingToon BRP에 선언된 태그만 보고 이 경고를 모든 투명 재질의 확정 결과로 읽어서는 안 됩니다. 실제 재질의 override tag와 Safety 상태를 확인하세요. [VRChat 공식 fallback 규칙](https://creators.vrchat.com/avatars/shader-fallback-system/)
:::

### 표준 alias

Fallback이 값을 이어받으려면 셰이더가 Unity 표준 프로퍼티 이름을 갖고 있어야 합니다. MingToon이 검사하는 alias 목록:

```text
_MainTex      _Color        _BumpMap    _BumpScale
_OcclusionMap _OcclusionStrength
_EmissionMap  _EmissionColor
_Cutoff       _Mode
_SrcBlend     _DstBlend     _ZWrite
```

없으면 `MissingStandardAlias` — `표준 fallback alias가 없습니다: {이름}`

**정상 상태의 MingToon 재질에서는 나오지 않습니다.** 나온다면 셰이더가 손상됐거나 손으로 수정된 것입니다.

---

## 업로드 가능한 MonoBehaviour

VRChat 아바타에 남길 수 있는 컴포넌트만 허용 목록으로 갖고 있습니다.

```text
VRCAvatarDescriptor    VRCConstraint
VRCContactReceiver     VRCContactSender
VRCHeadChop            VRCIKFollower
VRCPhysBone            VRCPhysBoneCollider
PipelineManager     VRCRaycast
VRCSpatialAudioSource  VRCStation
```

목록 밖의 컴포넌트가 있으면 `CustomMonoBehaviourNotUploadable`:

> 임의 MonoBehaviour는 아바타 업로드 대상에 포함할 수 없습니다. **PC Baked/Script-Free 결과에서 제거하세요.**

`<Missing Script>`도 개수로 집계됩니다.

:::note[Manager는 아바타 루트에 유지합니다]
편집 중 아바타 루트의 MingToonManager를 유지한 채 정상 SDK 업로드를 진행합니다. 정적 사전 점검과 SDK 처리가 끝난 복제본 검사는 서로 다릅니다. 업로드 복제본에서는 MingToon 편집용 런타임 컴포넌트가 제거됐는지 확인하며, VRC SDK가 허용하는 컴포넌트까지 전부 지우라는 뜻은 아닙니다.
:::

---

## 이슈 코드 전체

### PC

| 코드 | 심각도 | 의미 |
|---|---|---|
| `PcRequiresBakedShader` | 오류 | PC 업로드용 MingToon 머티리얼은 Baked 변형이어야 합니다 |
| `CustomMonoBehaviourNotUploadable` | 오류 | 허용 목록 밖 컴포넌트 |
| `MissingStandardAlias` | 경고 | 표준 fallback alias 누락 |
| `TransparentFallbackUsesUnlit` | 경고 | 투명 표면의 정적 경고. 실제 fallback 태그에 따른 결과는 위 설명 참고 |
| `CameraDependentFeatureNotPortable` | 경고 | 화면/카메라 의존 효과는 VRChat 카메라 구성에 좌우됨 |
| `UnityVersionNotValidated` | 경고 | 에디터가 검증 버전과 다름 |
| `UnsupportedRenderBackend` | 오류 | **URP 백엔드/재질은 VRChat 출력에 쓸 수 없습니다.** Built-in 편집본이나 Built-in Baked를 쓰세요 |

:::tip[`PcRequiresBakedShader`가 나와도 수동 Bake를 할 필요는 없습니다]
[빌드 시 자동 최적화](/workflow/build-optimization)가 업로드 순간 재질을 생성 셰이더로 스왑하고 끝나면 되돌립니다. 이 분석기는 **정적 상태**를 보는 도구이므로 편집 상태에서 실행하면 당연히 이 항목이 뜹니다.
:::

### Quest / Android

| 코드 | 의미 |
|---|---|
| `QuestMingToonNotSupported` | Quest/Android에는 MingToon 셰이더를 **직접 업로드할 수 없습니다.** `VRChat/Mobile/Toon Standard` 변환본을 별도로 준비하세요 |
| `QuestRequiresMobileShader` | Quest/Android 재질은 현재 SDK의 `VRChat/Mobile/` 셰이더여야 합니다 |
| `QuestRequiresToonStandardConversion` | Toon Standard로 변환이 필요 |
| `QuestOutlineNotSupported` | **Quest Toon Standard 변환은 아웃라인을 유지하지 않습니다** |
| `QuestToonStandardRequiresOpaque` | Quest Toon Standard 변환 대상은 **Opaque여야 합니다** |

:::danger[Quest 대응은 별도 작업입니다]
MingToon은 모바일 셰이더 타깃이 아니고 자동 변환 경로도 제공하지 않습니다. Quest 버전을 만들 계획이라면 **아웃라인이 사라지고 반투명을 못 쓴다**는 전제로 룩을 따로 설계하세요.
:::

---

## 깊이 효과의 조건

코드의 `CanAvatarForceMainCameraDepth = false`는 아바타가 호스트 카메라의 깊이를 일괄 보장하지 못한다는 기준입니다. Photo Camera, 월드 설정과 다른 깊이 공급 조건을 구분해 확인하세요. 깊이가 있어도 큐·카메라 깊이 참여·품질·거리 설정에 따라 효과가 달라질 수 있습니다.

Manager의 `빌드 시 깊이 라이트 싣기` 옵션을 켜면 업로드 복제본에 보조 Directional Light를 추가합니다. 설치 버전과 기존 아바타 설정에 따라 옵션 상태가 다를 수 있으니 실제 값을 확인하세요. Avatar Safety, 월드와 광원 설정에 영향을 받으며 모든 사용자 화면에서 깊이를 보장하지 않습니다. [VRChat 깊이 라이트](/platforms/vrchat#vrchat-깊이-라이트)를 먼저 읽고 본인 화면·미러·Photo Camera를 비교하세요.

## 실무 결론

VRChat 아바타를 만들 때 룩을 설계하는 순서:

1. **깊이 없이 성립하는 룩을 먼저 만듭니다** — 형태 그림자 · 그림자 투영 · 노멀 아웃라인 · 림 라이트 / 림 셰이드
2. **깊이 기반 효과는 제공 조건을 확인하며 추가합니다** — 화면별로 효과가 달라지는지 비교합니다
3. **머리카락의 알파와 실루엣을 확인합니다** — 적절한 표면 모드를 고르고 실제 fallback에서도 비교합니다
4. **SDK 처리 후 복제본에 MingToon 편집용 컴포넌트가 남지 않는지 확인합니다**
5. **본인 화면 · 미러 · Photo Camera를 각각 확인합니다**

## 관련 문서

- [VRChat](/platforms/vrchat)
- [셰이더 구조와 패스](/internals/shader-structure)
- [Validate Project 코드](/reference/validator)
