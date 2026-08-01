---
id: shader-structure
title: 셰이더 구조와 패스
sidebar_position: 1
---

# 셰이더 구조와 패스

**이 문서를 읽으면** MingToon이 한 프레임에 실제로 무엇을 몇 번 그리는지 알고, 표면 모드가 왜 그렇게 동작하는지 근본적으로 이해하게 됩니다.

여기부터는 룩을 만드는 데 반드시 필요한 내용은 아닙니다. 다만 **원인을 모르겠는 현상**이 생겼을 때 답이 여기 있습니다.

## SubShader

```text
Tags {
  Queue              = Geometry
  RenderType         = Opaque
  IgnoreProjector    = False
  MingToonFamily     = 1
  MingToonSurfaceKind = BRP
  VRCFallback        = toonstandardoutline
}
LOD 300
```

| 태그 | 의미 |
|---|---|
| `MingToonFamily` · `MingToonSurfaceKind` | MingToon 툴이 자기 재질을 식별하는 표식. 백엔드 전환·베이크·일괄 편집이 이걸로 대상을 찾습니다 |
| **`VRCFallback = toonstandardoutline`** | VRChat이 셰이더를 숨길 때 대체로 쓰는 셰이더입니다 → 아래 참고 |
| `IgnoreProjector = False` | 프로젝터 영향을 받습니다 |

:::note VRCFallback이 중요한 이유
VRChat에서 상대가 **Shaders를 Hidden으로 설정**하면 내 아바타는 fallback 셰이더로 보입니다. MingToon은 `toonstandardoutline`을 지정해 두었으므로 **그 상황에서도 툰 셰이딩과 아웃라인이 남습니다.** Standard로 떨어지는 셰이더보다 원본에 가깝게 보입니다.
:::

렌더 상태는 전부 프로퍼티로 열려 있습니다 — `_Cull` `_ZWrite` `_SrcBlend` `_DstBlend` `_BlendOp` `_ZTest` `_ColorMask`. 표면 모드가 이 값들을 한꺼번에 맞춥니다.

---

## 패스 다섯 개

| 순서 | 패스 이름 | LightMode | 언제 그려지나 |
|---|---|---|---|
| 1 | `TRANSPARENT_DEPTH_PREPASS` | `Always` | 투명 계열에서만 실제 삼각형을 그림 |
| 2 | `FORWARD_BASE` | `ForwardBase` | 주광 + 환경광. 본체 |
| 3 | `FORWARD_ADD` | `ForwardAdd` | 추가 광원마다 한 번씩 |
| 4 | `OUTLINE_HULL_DIRECT` | `ForwardBase` | 노멀 아웃라인 |
| 5 | `SHADOW_CASTER` | `ShadowCaster` | 그림자 맵 + 카메라 깊이 텍스처 |

{/* SCREENSHOT: Frame Debugger에서 본 MingToon 패스 순서 */}

### 1. TRANSPARENT_DEPTH_PREPASS

**해결하는 문제** — 투명 패스는 삼각형을 **깊이 순이 아니라 인덱스 순으로** 그립니다. 그래서 한 메시 안에서도 뺨 뒤에 있는 머리카락 가닥이 버퍼에서 뒤쪽에 있으면 뺨 위에 그려집니다. **블렌드 상태로는 절대 못 고칩니다. 조각을 정렬하는 것은 깊이뿐입니다.**

이 패스가 **컬러를 막고 표면 깊이만 먼저 기록**하고, 이후 컬러 패스가 그 깊이에 대해 테스트합니다.

아웃라인 헐도 같은 기록으로 고쳐집니다. 헐은 표면을 확대한 사본이라서, 버퍼가 비어 있으면 눈과 입 위에 칠할 이유가 없었습니다. 이제 표면이 그 픽셀을 소유합니다.

:::note 불투명·컷아웃은 비용을 내지 않습니다
프래그먼트에서 잘라내는 방식이 아닙니다. 그러면 정점 단계는 메시 전체에 대해 여전히 돌아갑니다. **삼각형을 축퇴(degenerate) 위치로 접어서** 아예 래스터화되지 않게 합니다.
:::

:::tip LightMode가 `ForwardBase`가 아니라 `Always`인 이유
`Material.SetShaderPassEnabled`는 **패스 이름이 아니라 LightMode 태그**로 동작합니다. 프리패스가 `ForwardBase`였다면 이 패스만 끄는 순간 표면 패스와 아웃라인 패스까지 함께 꺼집니다. `Always`는 같은 포워드 루프가 선언 순서대로 렌더링하고, 다른 패스가 쓰지 않는 태그이므로 **혼자 켜고 끌 수 있습니다.**
:::

알파 마스크 키워드(`_MING_ALPHA_MASK`)를 이 패스도 컴파일합니다. 안 그러면 마스크로 뚫은 구멍이 깊이를 기록해 뒤쪽을 가립니다.

### 2. FORWARD_BASE

본체입니다. 거의 모든 모듈이 여기서 계산됩니다. 컴파일되는 키워드가 가장 많은 패스입니다.

### 3. FORWARD_ADD

**추가 광원(포인트/스폿) 하나마다 한 번씩** 더 그려집니다. 광원이 많은 월드에서 드로우콜이 늘어나는 지점입니다.

`추가 광원 받기`를 끄면 이 패스의 기여가 사라집니다. → [조명과 그림자](/guides/light-and-shadow#추가-광원)

### 4. OUTLINE_HULL_DIRECT

노멀 아웃라인. **추가 패스 한 번**이 정확히 여기입니다.

LightMode가 `ForwardBase`라서 주광 패스와 함께 돌지만, 자체 `_OutlineHullCull`(기본 Front) · `_OutlineHullSrcBlend` · `_OutlineHullDstBlend` · `_OutlineHullZWrite` · 자체 스텐실 세트를 갖습니다. 그래서 표면과 독립적으로 렌더 상태를 잡을 수 있습니다.

### 5. SHADOW_CASTER

그림자 맵을 씁니다. **그런데 이 패스는 그림자만을 위한 것이 아닙니다.**

:::danger 두 투명 모드 모두 ShadowCaster 패스를 켠 채로 둡니다
Built-in은 **`_CameraDepthTexture`를 이 패스를 통해 채웁니다.** 그 텍스처가 바로 2D 그림자·깊이 림·내부 2D 경계가 읽는 것입니다.

패스를 끄면 캐릭터가 자기 깊이에서 사라지고, 그래서 예전에는 투명 재질에서 이 모듈들을 통째로 꺼야 했습니다.

지금은 대신 프래그먼트 쪽에서 **광원 그림자 렌더링만 억제**하므로, 원래 그림자를 안 드리우던 것이 새로 드리우지는 않습니다.
:::

이것이 `투명 · 아웃라인용 깊이 기록` 모드가 성립하는 이유입니다.

---

## 표면 모드가 실제로 바꾸는 값

| 표면 모드 | RenderType | 렌더 큐 | Src/Dst Blend | ZWrite | 아웃라인 버퍼 |
|---|---|---|---|---|---|
| **불투명** | `Opaque` | 2000 (Geometry) | One / Zero | On | 일반 |
| **컷아웃** | `TransparentCutout` | 2450 (AlphaTest) | One / Zero | On | 일반 |
| **투명 · 아웃라인용 깊이 기록** | **`Opaque`** | **2499** | SrcAlpha / OneMinusSrcAlpha | On | **안정 모드** |
| **투명** | `Transparent` | 3000 | SrcAlpha / OneMinusSrcAlpha | Off | 일반 |

:::tip 큐 2499와 RenderType Opaque가 핵심입니다
- **2499** — 불투명 구간(2500 미만) 안쪽입니다. 두 파이프라인이 카메라 깊이 텍스처를 만드는 범위가 여기까지입니다.
- **RenderType이 `Opaque`** — 깊이 텍스처를 채우는 패스가 이 태그로 대상을 고릅니다.

이 둘 덕분에 알파 블렌딩을 하면서도 깊이 기반 모듈이 전부 살아 있습니다.
:::

`투명 · 아웃라인용 깊이 기록`에서는 아웃라인 헐의 블렌드도 **One / Zero**로 바뀝니다(안정 모드). 헐이 반투명하게 겹쳐 보이는 것을 막습니다. 일반 투명에서는 SrcAlpha / OneMinusSrcAlpha입니다.

:::note 표면 모드를 바꿔도 보존되는 것
`알파 컷오프`, 아웃라인 ON/OFF, 그리고 모든 외형 값은 그대로 남습니다. 렌더 상태·기본 큐·내부 아웃라인 버퍼 상태만 맞춥니다.
:::

---

## 셰이더 키워드

MingToon은 대부분의 모듈을 **`shader_feature_local_fragment`** 로 컴파일합니다. 재질마다 독립적으로 켜고 끌 수 있고, 프래그먼트 단계에만 영향을 줍니다.

### 모듈 키워드

| 키워드 | 모듈 |
|---|---|
| `_MING_FACE_SHADING` · `_MING_FACE_NORMAL_BAKED` | 페이스 셰이딩 / UV7 베이크 사용 |
| `_MING_STACK` | 텍스처 레이어 |
| `_MING_NORMAL_LAYERS` | 노멀 레이어 |
| `_MING_MATCAP` | 맷캡 |
| `_MING_PBR` | PBR 표면 |
| `_MING_EMISSION` · `_MING_OCCLUSION` | 이미션 / 오클루전 |
| `_MING_FRESNEL_RIM` · `_MING_RIM_SHADE` | 림 라이트 / 림 셰이드 |
| `_MING_BACKLIGHT` · `_MING_FRONT_LIGHT` | 백라이트 / 프런트 라이트 |
| `_MING_GLITTER` · `_MING_GLITTER_MASK` | 글리터 / 전용 마스크 |
| `_MING_SHADOW_REFLECTION` | 그림자 내부 반사 |
| `_MING_FORM_SHADOW` · `_MING_FORM_SHADOW_2ND` | 형태 그림자 1차 / 2차 |
| `_MING_SHADOW_PATTERN` · `_MING_SHADOW_PATTERN_TILE` | 그림자 패턴 / 모양 타일 |
| `_MING_DEPTH_SHADOW` · `_MING_DEPTH_SHADOW_MASK` | 2D 그림자 / 마스크 |
| `_MING_DEPTH_RIM` · `_MING_DEPTH_RIM_MASK` | 깊이 림 / 마스크 |
| `_MING_INNER_EDGE_MASK` | 내부 2D 경계 마스크 |
| `_MING_ALPHA_MASK` | 알파 마스크 |
| `_ALPHATEST_ON` | 컷아웃 |

### 레이어 티어 키워드

레이어 수는 **연속 값이 아니라 티어**로 컴파일됩니다.

| 모듈 | 티어 |
|---|---|
| 텍스처 레이어 | (없음) → `_MING_STACK_4` → `_MING_STACK_10` |
| 노멀 레이어 | (없음) → `_MING_NORMAL_2` → `_MING_NORMAL_5` |
| 맷캡 레이어 | (없음) → `_MING_MATCAP_2` → `_MING_MATCAP_5` |

:::tip 레이어 수를 5에서 4로 줄여도 비용이 안 줄 수 있습니다
같은 티어 안이면 컴파일되는 코드가 같습니다. **티어 경계**(예: 텍스처 레이어 4 → 5)를 넘길 때 실제로 달라집니다. 베이크는 실제 사용 개수를 보고 티어를 다시 고릅니다.
:::

### 변형 폭발을 막는 장치

`#pragma skip_variants`로 쓰지 않는 Unity 내장 변형을 제거합니다.

- 프리패스: 라이트맵 · 라이트프로브 · 정점 조명 · 모든 그림자 변형 · DIRECTIONAL/POINT/SPOT
- FORWARD_BASE: `LIGHTMAP_ON` `DIRLIGHTMAP_COMBINED` `DYNAMICLIGHTMAP_ON`

캐릭터 셰이더는 라이트맵을 쓰지 않으므로 이 변형들이 필요 없습니다.

---

## 편집용 셰이더 vs 생성 셰이더

| | 편집용 | 생성(베이크/빌드) |
|---|---|---|
| 키워드 | **모든 기능 + 최대 티어를 처음 한 번에 컴파일** | 실제 쓰는 것만 |
| 작업 중 | 토글해도 컴파일 대기 없음 | — |
| 프로퍼티 블록 | | **동일** |

:::note 작업 중 무거운 것이 정상입니다
편집용 셰이더가 전부 컴파일된 상태를 유지하는 덕분에, 기능 토글을 켜고 끌 때 파란 자리표시 색이나 변형 컴파일 멈춤이 생기지 않습니다.

생성 셰이더가 편집용과 **같은 ShaderLab Properties 블록**을 갖기 때문에, [빌드 시 자동 최적화](/workflow/build-optimization)가 셰이더 포인터만 바꿔도 작업해 둔 값이 하나도 손실되지 않습니다.
:::

## 관련 문서

- [모듈과 성능 비용](/internals/module-cost)
- [베이크가 제거하는 것](/internals/bake-internals)
- [기본 설정 — 표면 모드](/guides/basics#1-표면-모드부터-정합니다)
