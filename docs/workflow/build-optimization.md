---
id: build-optimization
title: 빌드 시 자동 최적화
sidebar_position: 2
---

# 빌드 시 자동 최적화

**이 문서를 읽으면** 업로드나 빌드를 할 때 MingToon이 자동으로 무엇을 하는지, 그리고 그게 제대로 걸렸는지 확인하는 방법을 알게 됩니다.

## 한 줄 요약

**아무것도 하지 않아도 됩니다.** 기본값으로 켜져 있고, VRChat 업로드 · Warudo 모드 빌드 · 일반 플레이어 빌드에서 자동으로 걸립니다. 빌드가 끝나면 재질은 원래대로 돌아와 계속 편집할 수 있습니다.

:::tip 수동 Bake와 헷갈리지 마세요
[수동 Bake](/workflow/bake-and-restore)는 **새 재질을 만들고 Renderer를 갈아 끼우므로** 작업을 계속하려면 손으로 되돌려야 합니다.

빌드 시 자동 최적화는 **재질의 셰이더 포인터 하나만** 잠깐 바꿉니다. 재질 에셋은 교체되지 않고 Renderer도 건드리지 않으며, 빌드가 끝나는 순간 편집 가능한 상태로 돌아옵니다.

**일반적인 배포에는 자동 최적화만으로 충분합니다.**
:::

## 무슨 일이 일어나나

빌드가 시작되면:

1. 씬(또는 빌드 대상 프리팹)에서 MingToon 재질을 모읍니다.
2. 각 재질이 **실제로 쓰는 기능만** 남긴 전용 셰이더를 만들거나 캐시에서 가져옵니다.
3. `material.shader`를 그 셰이더로 바꿉니다.
4. 빌드가 진행됩니다.
5. 빌드가 끝나면 편집용 셰이더로 되돌립니다.

생성된 셰이더는 편집용과 **같은 ShaderLab Properties 블록**을 갖기 때문에, 작업해 둔 값이 왕복 과정에서 하나도 손실되지 않습니다.

### 애니메이션되는 값은 건드리지 않습니다

분석기가 `AnimationClip`뿐 아니라 컴포넌트의 **중첩/배열 직렬화 필드에 들어 있는 Animator Controller 참조**까지 검사합니다. 애니메이션되는 프로퍼티는 동적으로 남으므로, 런타임에 켜질 기능이 컴파일 단계에서 잘려 나가는 일이 없습니다.

의상 토글처럼 **애니메이션 클립에서만 참조되어 Renderer에 한 번도 올라가지 않는 재질**도 함께 수집합니다.

### 하나가 실패해도 빌드는 계속됩니다

어떤 재질에서 최적화가 실패하면 그 재질만 최적화되지 않은 채로 나가고, 빌드는 그대로 진행됩니다. Console에 `[MingToon] Skipped build optimisation for ...` 경고가 남습니다.

---

## 플랫폼별로 어떻게 걸리나

플랫폼마다 빌드 진입점이 달라서, MingToon은 세 개의 훅을 각각 등록합니다.

| 플랫폼 | 진입점 | 비고 |
|---|---|---|
| **VRChat 아바타/월드 업로드** | `IVRCSDKBuildRequestedCallback` | VRChat 업로드는 `BuildPipeline.BuildPlayer`를 거치지 않아 Unity의 빌드 콜백이 울리지 않습니다 |
| **Warudo 모드 빌드** | UMod 빌드 프로세서 | `Warudo/Build Mod`는 UMod 자체 파이프라인을 쓰므로 Unity 콜백이 울리지 않습니다 |
| **일반 플레이어 빌드** | `IPreprocessBuildWithReport` | |

세 훅 모두 같은 Apply/Restore 쌍을 호출하고, 두 번 호출해도 안전합니다.

### VRChat: 깊이 자동 승격

VRChat **아바타** 빌드에서는 한 가지가 더 일어납니다.

`Depth Availability`가 `Auto`인 재질을 `Force On`으로 올립니다.

이유는 이렇습니다. `Auto`는 "호스트가 깊이 텍스처가 있다고 말하면 믿는다"는 뜻인데, 그렇게 말해 주는 것이 `MingDepthTextureProvider`입니다. 이건 `IEditorOnly` MonoBehaviour라 VRChat이 업로드에서 제거합니다. 그래서 VRChat에서는 그 신호가 영원히 도착하지 않고, `Auto`는 사실상 항상 꺼짐이 됩니다. **깊이 텍스처가 실제로 있는 월드에서도 2D 림과 2D 그림자가 사라지던 원인이 이것입니다.**

:::note 직접 정한 값은 건드리지 않습니다
`Force On`(1)과 `Force Off`(2)는 작업자의 의도적인 선택이므로 절대 덮어쓰지 않습니다. 승격은 `Auto`이면서 **깊이 모듈이 실제로 켜져 있는** 재질에만 걸립니다.
:::

월드 빌드에는 걸리지 않습니다. 월드는 자기 카메라와 스크립트를 그대로 갖기 때문입니다.

### VRChat: 다른 툴과의 순서

VRChat 훅은 `callbackOrder = 2000`으로 **늦게** 실행됩니다. Modular Avatar나 VRCFury처럼 자기 빌드 콜백에서 재질을 다시 쓰는 툴이 먼저 끝난 뒤, **실제로 출하될 재질**을 분석하기 위해서입니다.

---

## 제대로 걸렸는지 확인하기

### 1. VRChat 훅이 컴파일되었는지

스크립트 리로드 후 Console에 이 줄이 있어야 합니다.

```text
[MingToon] VRChat build hook compiled and registered.
```

:::danger 이 줄이 없다면
VRChat 훅이 **아예 존재하지 않는 상태**입니다. 조건부 컴파일 가드(`VRC_SDK_VRCSDK3` 정의 + Unity 2022.3 이상)가 false로 평가된 것입니다. VRC SDK가 프로젝트에 제대로 들어와 있는지 확인하세요.
:::

### 2. 빌드 로그

빌드 중 Console에 요약이 남습니다.

```text
[MingToon] Build optimisation: 12 candidate material(s), 12 switched,
0 with texture optimizations, 3 depth availability promotion(s).
```

### 3. 리포트 파일

프로젝트 폴더 옆의 `StudioRaming/MingToonOptimizeReport.txt`에 재질별 결과가 남습니다. 빌드가 끝나도 지워지지 않으므로 나중에 확인할 수 있습니다.

```text
MingToon build optimisation report
time      : ...
candidates: 12
swapped   : 12
depthPromo: True
texRewrite: False

Body_MingEditable  ->  Hidden/StudioRaming/MingToon/Generated/...
Hair_MingEditable  ->  optimized depth-mask(-1 sample)
```

---

## 메뉴 옵션

`Tools > Studio Raming > MingToon` 아래 두 개의 토글이 있습니다.

### Optimize Shaders On Build

**기본값: 켜짐.** 위에서 설명한 셰이더 스왑 전체를 켜고 끕니다. 끌 이유는 거의 없습니다.

### Reviewed Texture Rewrites On Build (Opt-In)

**기본값: 꺼짐.** 이건 더 위험한 쪽입니다.

| | 셰이더 스왑 | 텍스처 재작성 |
|---|---|---|
| 바꾸는 것 | 포인터 하나 | 재질의 텍스처 슬롯들 |
| 되돌리기 | 자명함 | 전부 정확히 되돌려야 함 |
| 빌드 시간 | 거의 없음 | 재질마다 최대 3장을 렌더·재임포트 |

:::caution 켜기 전에
surface/normal flatten과 일반 RGBA mask repack이 허용되므로, 텍스처 readback · 컬러 스페이스 · mip 재생성 · 플랫폼 압축 때문에 **픽셀이 달라질 수 있습니다.** 켠다면 baked 전후 캡처를 비교하세요.
:::

이 옵션이 꺼져 있어도 **손실 없는** 최적화는 계속 걸립니다. depth mask가 수학적으로 항등임을 증명한 경우나, PBR/AO가 같은 Texture 객체·같은 UV 식을 쓰는 경우가 그렇습니다.

### Clean Build Optimisation Output

생성된 셰이더 캐시를 정리합니다. 캐시가 꼬였다고 의심될 때 실행하세요.

### Debug: Tint Optimized Shaders Red

최적화된 셰이더를 붉게 물들여 **어떤 재질이 실제로 스왑되었는지 눈으로 확인**하게 해 줍니다. 최적화가 걸렸는지 의심될 때 켜고 빌드해 보세요. 확인 후 반드시 끄세요.

---

## 에디터가 빌드 도중 죽었다면

되돌리기는 세 곳에서 호출됩니다. 빌드 후 콜백, 그 콜백이 오지 않을 경우를 대비한 지연 호출, 그리고 **도메인 리로드**입니다. 에디터가 빌드 중에 죽어도 다음에 스크립트가 리로드될 때 원래 셰이더로 돌아옵니다.

텍스처 재작성까지 켠 상태였다면 스냅샷이 디스크에 남아 있어 같은 방식으로 복구됩니다.

## 다음

- 더 강한 최적화가 필요하거나 배포용 고정 에셋이 필요하면: [수동 Bake와 복원](/workflow/bake-and-restore)
- 플랫폼별 업로드 체크리스트: [VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo)
