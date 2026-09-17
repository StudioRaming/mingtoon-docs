---
id: validator
title: Validate Project 코드
sidebar_position: 8
---

# 문제 해결: Validate Project 코드

`StudioRaming > MingToon > Validate Project`를 실행하면 코드가 붙은 줄이 나옵니다.
이 페이지에서 그 코드를 찾으세요. 검사는 보고만 하고 아무것도 고치지 않습니다.

코드는 세 묶음입니다.

- **내 환경 문제** — Unity, 빌드 대상, 파이프라인. 내가 설정을 바꿔 고칩니다.
- **내 재질 문제** — 값 하나가 잘못됐습니다. 인스펙터에서 고칩니다.
- **설치 손상** — 파일이 없거나 손댄 상태입니다. 다시 설치해 고칩니다.

각 항목의 마지막 줄은 그 코드를 무시해도 되는지 알려 줍니다.

---

## 내 환경 문제

### MING-ENV-UNITY-VERSION {#ming-env-unity-version}

**오류** — 지금 쓰는 Unity가 MingToon이 빌드·테스트하는 LTS 스트림이 아닙니다.

1. Unity Hub에서 지원 스트림의 에디터를 설치합니다.
2. 그 에디터로 이 프로젝트를 다시 엽니다.
3. 지원 버전은 [지원 환경](/platforms/compatibility)에서 확인하세요.

무시해도 되나: 안 됩니다. 다른 스트림에서는 셰이더 컴파일이 달라져 룩이 바뀌거나 깨집니다.

### MING-VRC-UNITY-VERSION {#ming-vrc-unity-version}

**경고** — VRChat SDK가 있지만 SDK가 검증한 Unity 버전이 아닙니다.

1. VCC에서 이 프로젝트의 Unity 버전을 확인합니다.
2. [VRChat 공식 Unity 안내](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)와 맞춥니다.
3. 프로젝트를 옮기기 전에 백업하세요.

무시해도 되나: VRChat에 업로드하지 않는다면 무시해도 됩니다.
업로드할 계획이면 이 상태에서는 아바타 업로드 지원이 없습니다.

### MING-ENV-BUILD-TARGET {#ming-env-build-target}

**오류** — 지금 빌드 대상이 셰이더 모델 4.5를 보장하지 못합니다.

1. `File > Build Settings`를 엽니다.
2. 플랫폼을 Windows, macOS, Linux 중 하나로 되돌립니다.

무시해도 되나: 안 됩니다. 이대로 빌드하면 MingToon 재질이 전부 마젠타로 나옵니다.
Quest/Android는 [VRChat 호환성 규칙](/internals/vrc-rules)을 보세요.

### MING-PIPELINE-UNSUPPORTED {#ming-pipeline-unsupported}

**오류** — 활성 렌더 파이프라인이 Built-in도, 지원 URP도 아닙니다.

1. `Project Settings > Graphics`의 Render Pipeline Asset을 확인합니다.
2. 현재 Quality 레벨의 Render Pipeline Asset도 같이 확인합니다.
3. 둘 중 한 곳에만 남아 있어도 이 코드가 뜹니다.

무시해도 되나: 안 됩니다. 이 파이프라인에서는 어떤 MingToon 재질도 렌더링되지 않습니다.

### MING-URP-VERSION-UNSUPPORTED {#ming-urp-version-unsupported}

**오류** — 설치된 Universal RP 패키지가 지원 범위 밖입니다.

1. `Window > Package Manager > Universal RP`를 엽니다.
2. 지원 범위 안의 버전으로 바꿉니다. 범위는 메시지에 적혀 있습니다.

무시해도 되나: 안 됩니다. 재질이 컴파일에 실패하거나 아웃라인 없이 나옵니다.

---

## 내 재질 문제

여섯 코드 모두 값 하나가 원인이고, 전부 인스펙터에서 고칩니다.
메시지 앞에 어느 재질인지 이름이 붙습니다.

### MING-MAT-NON-FINITE {#ming-mat-non-finite}

**경고** — 재질 값에 계산이 깨진 숫자(NaN, Infinity)가 들어 있습니다.

1. 메시지에 나온 항목을 찾습니다.
2. 그 항목을 우클릭해 기본값으로 되돌립니다.
3. 화면과 베이크 결과를 다시 확인합니다.

무시해도 되나: 안 됩니다. 조명과 화면 공간 계산 전체가 오염됩니다.

### MING-MAT-COLOR-MASK-ZERO {#ming-mat-color-mask-zero}

**경고** — **컬러 마스크** 가 0이라 이 재질이 화면에 아무 색도 기록하지 않습니다.
메시는 그려지고 뒤를 가리지만 보이지는 않습니다.

1. **표면 렌더링** > **고급 컬러 버퍼** 를 엽니다.
2. **컬러 마스크** 를 15로 되돌립니다.

무시해도 되나: 가림막 전용 재질을 일부러 만든 게 아니라면 안 됩니다.

### MING-MAT-OPAQUE-ZWRITE-OFF {#ming-mat-opaque-zwrite-off}

**경고** — 불투명 큐인데 깊이를 기록하지 않습니다.

1. **표면 렌더링** > **고급 컬러 버퍼** 에서 **ZWrite** 를 켭니다.
2. 또는 원래 의도한 투명 표면 모드를 고릅니다.

무시해도 되나: 안 됩니다. 다른 불투명 메시와의 앞뒤가 무작위가 되고,
카메라 깊이를 쓰는 효과가 이 메시를 통과해 읽습니다.

### MING-MAT-TRANSPARENT-DEPTH-EFFECTS {#ming-mat-transparent-depth-effects}

**경고** — 투명 큐에서 깊이 효과를 켰습니다.

1. 이 재질에서 뎁스 림라이트와 뎁스 그림자를 끕니다.
2. 또는 표면 모드를 불투명이나 컷아웃으로 바꿉니다.

무시해도 되나: 안 됩니다. 두 효과가 깜빡이거나 이 표면 뒤쪽을 읽습니다.

### MING-MAT-CUTOUT-CUTOFF-ZERO {#ming-mat-cutout-cutoff-zero}

**경고** — 컷아웃인데 **알파 컷오프** 가 0이라 아무것도 잘리지 않습니다.

1. **알파 컷오프** 를 0.5로 올려 봅니다.
2. 머리카락이 너무 성기면 0.3까지 내립니다.

무시해도 되나: 안 됩니다. 완전히 투명한 부분까지 그림자를 드리워
메시가 사각형 통짜 그림자를 만듭니다.

### MING-MAT-PERF-DISTANCE-ZERO {#ming-mat-perf-distance-zero}

**경고** — **성능 거리 (m)** × **성능 거리 배율** 이 0이라 모든 거리에서 가장 가벼운 단계로 그립니다.
깊이 효과, PBR, 맷캡 2층 이상, 노멀 추가 층, 툰 스페큘러, 글리터, 스크린톤이 나오지 않습니다.

1. `마스터 조정` 탭을 엽니다.
2. **성능 거리 배율** 을 1로 올립니다.

무시해도 되나: 별매 애드온 Ming Light Controller를 쓰는 구성이면 정상입니다.
MLC가 인게임에서 이 배율을 조절하기 때문입니다. 그 외에는 안 됩니다.

---

## 씬과 URP 설정

### MING-URP-DEPTH-FEATURE-MISSING {#ming-urp-depth-feature-missing}

**오류** — 깊이 효과용 URP Renderer Feature가 없거나 꺼져 있습니다.

1. `StudioRaming > MingToon > URP > Install Depth Effects Renderer Feature`를 실행합니다.
2. 활성 URP Asset의 Renderer List에 있는 **모든** Renderer Data에 필요합니다.
3. 기능의 체크박스를 켠 상태로 둡니다.

무시해도 되나: URP에서 깊이 효과를 쓴다면 안 됩니다.
컨트롤은 계속 움직이지만 화면에는 아무것도 그려지지 않습니다.

### MING-URP-OUTLINE-FEATURE-MISSING {#ming-urp-outline-feature-missing}

**오류** — 아웃라인용 URP Renderer Feature가 없거나 꺼져 있습니다.

1. `StudioRaming > MingToon > URP > Install Outline Renderer Feature`를 실행합니다.
2. 실제 카메라가 쓰는 Renderer Data에 붙었는지 확인합니다.

무시해도 되나: URP에서 아웃라인을 쓴다면 안 됩니다.

### MING-SCENE-NO-CAMERA {#ming-scene-no-camera}

**경고** — 검사할 Game 카메라가 열린 씬에 없습니다.

1. 실제 작업하는 씬을 엽니다.
2. 또는 현재 씬에 Camera를 하나 추가합니다.
3. 다시 검사합니다.

무시해도 되나: 빈 씬에서 검사했다면 무시해도 됩니다.
깊이 상태만 확인하지 못했을 뿐, 다른 항목은 정상적으로 검사됐습니다.

### MING-SCENE-CAMERA-DEPTH-OFF {#ming-scene-camera-depth-off}

**경고** — 검사한 카메라가 깊이 텍스처를 요청하지 않습니다.

1. 깊이 효과를 켠 재질이 하나도 없으면 이게 정상입니다.
2. MingToon은 재질이 필요로 할 때 카메라에 깊이를 요청합니다.
3. Play 모드에서 깊이 효과가 안 보이면 카메라보다 재질의 **깊이 효과** 마스터를 먼저 확인하세요.

무시해도 되나: 대부분 그렇습니다. 위 3번을 확인한 뒤에도 안 나오면
[깊이 기반 효과](/guides/depth-effects)를 보세요.

### MING-BAKE-GENERATOR-OUTDATED {#ming-bake-generator-outdated}

**경고** — 베이크 기록이 예전 버전으로 만들어졌습니다.

1. 밍툰 매니저에서 해당 아바타를 다시 베이크합니다.
2. 베이크 상태와 복원 정보를 먼저 확인하세요.

무시해도 되나: 안 됩니다. 화면에는 예전 결과가 계속 보이지만
그 사이 고쳐진 내용이 하나도 들어 있지 않고, 빌드 준비 검사에서 거부됩니다.

---

## 설치 손상

아래 코드는 전부 원인이 같습니다.
셰이더나 런타임 파일이 없거나, 도구보다 오래됐거나, 직접 수정된 상태입니다.

조치도 하나입니다.

1. 릴리스 패키지에서 `Assets/StudioRaming/MingToon`을 다시 임포트합니다.
2. Console의 컴파일 오류를 전부 없앱니다.
3. Validate Project를 다시 실행합니다.

무시해도 되나: 전부 안 됩니다. 인스펙터의 컨트롤은 계속 움직이는데 화면은 바뀌지 않습니다.

일곱 코드가 각각 무엇이 없다는 뜻인지만 다릅니다.

### MING-SHADER-MISSING {#ming-shader-missing}

**오류** — 셰이더 파일 자체를 프로젝트에서 찾지 못했습니다.
URP 프로젝트라면 URP 백엔드 폴더가 임포트됐는지도 확인하세요.

### MING-SHADER-UNSUPPORTED {#ming-shader-unsupported}

**오류** — 셰이더가 이 환경에서 컴파일되지 않습니다.
Console의 컴파일 오류와 그래픽 API를 함께 확인하세요.

### MING-SHADER-PASS-MISSING {#ming-shader-pass-missing}

**오류** — 아웃라인, 그림자 드리우기, 깊이 선기록 패스가 없습니다.
재질이 이 프로젝트의 파이프라인에 맞는 셰이더를 쓰는지도 확인하세요.

### MING-SHADER-PROPERTY-MISSING {#ming-shader-property-missing}

**오류** — 인스펙터가 기록하려는 항목이 셰이더에 선언돼 있지 않습니다.
셰이더가 에디터 도구보다 오래됐거나 직접 수정된 상태입니다.

### MING-SHADER-FRESNEL-AREA-RANGE {#ming-shader-fresnel-area-range}

**오류** — 영역 조절 항목이 0~1 범위로 선언돼 있지 않습니다.

### MING-SHADER-PERF-DISTANCE-RANGE {#ming-shader-perf-distance-range}

**오류** — 성능 거리 항목의 범위 선언이 다릅니다.
이러면 마스터 조정 탭의 슬라이더와 Ming Light Controller의 다이얼이 어긋납니다.
둘이 서로 다른 거리를 가리킵니다.

### MING-RUNTIME-PROVIDER-MISSING {#ming-runtime-provider-missing}

**오류** — 카메라에 깊이를 켜 주는 런타임 스크립트가 없거나 구조가 다릅니다.
이 검사는 스크립트만 봅니다. 실제 카메라에 깊이가 없다는 뜻은 아닙니다.

:::note[셰이더 코드는 손으로 고치지 마세요]
위 코드가 뜨는 프로젝트는 거의 항상 부분 업데이트를 했거나 파일을 직접 편집한 경우입니다.
같은 릴리스의 파일로 통째로 되돌리는 것이 가장 빠릅니다.
:::

---

검사를 통과해도 실제 화면과 업로드 성공이 보장되지는 않습니다.
고친 뒤에는 검사와 실제 결과를 함께 확인하세요.

## 관련 페이지

- [문제 해결](/troubleshooting)
- [VRChat](/platforms/vrchat)
- [지원 환경](/platforms/compatibility)
- [VRChat 호환성 규칙](/internals/vrc-rules)
