---
id: vrc-rules
title: VRChat 호환성 규칙
sidebar_position: 5
---

# VRChat 호환성 규칙

**이 문서를 읽으면** MingToon이 VRChat 업로드에 대해 검사하는 규칙 전체를 알고, 업로드 전에 무엇이 걸릴지 미리 판단할 수 있습니다.

MingToon은 VRChat 규칙을 **버전이 찍힌 규칙 세트**로 들고 있습니다.

| 항목 | 값 |
|---|---|
| 규칙 버전 | `2026.07` |
| 검증 Unity 버전 | `2022.3.22f1` |
| 근거 | [VRChat Shader Fallback System](https://creators.vrchat.com/avatars/shader-fallback-system/) |

---

## Fallback 셰이더

MingToon BRP 셰이더는 SubShader 태그에 이렇게 선언합니다.

```text
VRCFallback = toonstandardoutline
```

:::tip[상대가 셰이더를 숨겨도 룩이 남습니다]
VRChat에서 상대가 **Shaders를 Hidden**으로 설정하면 내 아바타는 fallback 셰이더로 보입니다. `toonstandardoutline`이 지정되어 있으므로 **툰 셰이딩과 아웃라인이 유지됩니다.** Standard로 떨어지는 셰이더보다 원본에 훨씬 가깝습니다.
:::

:::danger[투명 재질은 fallback에서 아웃라인을 잃습니다]
분석기가 `TransparentFallbackUsesUnlit`으로 경고합니다.

> Toon의 Transparent/Fade fallback은 **Transparent Unlit으로 대체되어 툰 조명과 아웃라인을 유지하지 않습니다.**

머리카락처럼 실루엣이 중요한 파츠는 **컷아웃**을 쓰는 편이 fallback 상황에서 훨씬 낫습니다. → [기본 설정](/guides/basics#1-표면-모드부터-정합니다)
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
VRCPipelineManager     VRCRaycast
VRCSpatialAudioSource  VRCStation
```

목록 밖의 컴포넌트가 있으면 `CustomMonoBehaviourNotUploadable`:

> 임의 MonoBehaviour는 아바타 업로드 대상에 포함할 수 없습니다. **PC Baked/Script-Free 결과에서 제거하세요.**

`<Missing Script>`도 개수로 집계됩니다.

:::note[MingToon 자신의 런타임 컴포넌트도 여기 걸립니다]
`MingToonManager`와 `MingDepthTextureProvider`는 `IEditorOnly`지만, 그건 **SDK의 검사 표식일 뿐 자동 삭제 보증이 아닙니다.**

`MingToon Manager`의 **5 · 내보내기 / 검증**에서 하위 런타임 컴포넌트가 0개인지 확인하세요. → [MingToon Manager](/workflow/character-manager#5--내보내기--검증)
:::

---

## 이슈 코드 전체

### PC

| 코드 | 심각도 | 의미 |
|---|---|---|
| `PcRequiresBakedShader` | 오류 | PC 업로드용 MingToon 머티리얼은 Baked 변형이어야 합니다 |
| `CustomMonoBehaviourNotUploadable` | 오류 | 허용 목록 밖 컴포넌트 |
| `MissingStandardAlias` | 경고 | 표준 fallback alias 누락 |
| `TransparentFallbackUsesUnlit` | 경고 | 투명 fallback이 Unlit이 됨 |
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

## 깊이 효과에 대한 공식 입장

MingToon은 이 점을 코드에 명시적으로 박아 두었습니다.

```text
CanAvatarForceMainCameraDepth = false
```

> 깊이 효과는 **VRChat Photo Camera**와 **Screen Camera depth texture를 켠 월드**에서 보장됩니다.
> 아바타는 월드 제어 없이 플레이어 메인 카메라의 깊이를 강제할 수 없습니다.
> **아바타에 Camera나 Light를 추가하는 것은 동등한 해결책이 아니며**, 성능 비용을 올리거나 아바타 안전 설정에 의해 제거될 수 있습니다.

참고: [VRC Camera Settings](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/)

인스펙터에도 같은 안내가 나옵니다.

> VRC 업로드 빌드에는 임의 사용자 스크립트가 남지 않아야 하므로 SDK build clone에서 MingToon 컴포넌트가 0개인지 확인하세요. 2D 그림자와 2D 뎁스 림은 **카메라 깊이 텍스처가 제공되는 환경에서만** 동일하게 보이며, 아바타 단독으로 보장되지 않습니다.

> VRC에서 **Classic Hull은 재질만으로 동작합니다.** 내부 2D 경계는 카메라 깊이 텍스처가 제공될 때만 동일하게 보입니다.

---

## 실무 결론

VRChat 아바타를 만들 때 룩을 설계하는 순서:

1. **깊이 없이 성립하는 룩을 먼저 만듭니다** — 형태 그림자 · 그림자 투영 · 노멀 아웃라인 · 림 라이트 / 림 셰이드
2. **깊이 기반 효과는 보너스로 얹습니다** — Photo Camera와 깊이를 켠 월드에서만 보입니다
3. **머리카락은 컷아웃을 우선 고려합니다** — fallback에서 아웃라인이 살아남습니다
4. **업로드 전 런타임 컴포넌트 0개를 확인합니다**
5. **본인 화면 · 미러 · Photo Camera를 각각 확인합니다**

## 관련 문서

- [VRChat](/platforms/vrchat)
- [셰이더 구조와 패스](/internals/shader-structure)
- [Validate Project 코드](/reference/validator)
