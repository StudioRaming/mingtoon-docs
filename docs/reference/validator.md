---
id: validator
title: Validate Project 코드
sidebar_position: 8
---

# Validate Project 코드

`Tools > Studio Raming > MingToon > Validate Project`가 보고하는 코드 전체입니다. 코드로 찾으세요.

:::note[이 검사는 읽기만 합니다]
아무것도 고치거나 지우지 않습니다. 보고만 하고 조치는 사람이 합니다.
:::

<!-- SCREENSHOT: Validate Project 결과 창 -->

---

## 환경

### MING-ENV-UNITY-VERSION

**오류.** 에디터 스트림이 지원 범위 밖입니다.

지원 스트림은 **2021.3**과 **2022.3** 둘 다입니다. 그 밖의 스트림에서는 셰이더 컴파일 결과가 달라져 룩이 바뀌거나 깨질 수 있습니다.

**조치** — Unity Hub에서 2021.3 또는 2022.3 에디터로 프로젝트를 여세요. 대상별 권장은 [지원 환경](/platforms/compatibility#unity-버전)에 있습니다.

### MING-VRC-UNITY-VERSION {#ming-vrc-unity-version}

**경고.** VRC SDK가 들어 있는데 에디터가 VRChat SDK 검증 버전(2022.3.22f1)의 스트림이 아닙니다.

> MingToon의 VRChat 연동은 **2022.3 스트림에서만 컴파일**되므로 이 프로젝트에는 **아바타 업로드 지원이 없습니다.** 다른 타깃은 영향을 받지 않습니다.

**조치** — VRChat 아바타를 만들 프로젝트라면 2022.3.22f1로 옮기세요. VRChat이 대상이 아니면 무시해도 됩니다.

참고: [VRChat 현재 Unity 버전](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)

### MING-ENV-BUILD-TARGET

**오류.** 현재 빌드 타깃이 셰이더 모델 4.5를 보장하지 못합니다.

MingToon의 모든 패스가 `#pragma target 4.5`를 선언합니다. 이런 타깃에서는 **SubShader가 통째로 탈락하고 빌드에서 모든 MingToon 재질이 마젠타로 렌더링됩니다.**

**조치** — `File > Build Settings`에서 플랫폼을 Windows / macOS / Linux로 되돌리세요. Android/Quest · iOS · WebGL은 지원하지 않습니다.

---

## 렌더 파이프라인

### MING-PIPELINE-UNSUPPORTED

**오류.** 지원하지 않는 렌더 파이프라인 에셋입니다. MingToon은 Built-in RP와 버전이 고정된 URP 백엔드만 지원하므로 **여기서는 어떤 MingToon 재질도 렌더링되지 않습니다.**

**조치** — `Project Settings > Graphics`와 활성 Quality 레벨에 URP 에셋을 지정하거나, 그 항목을 비워 Built-in을 쓰세요.

### MING-URP-VERSION-UNSUPPORTED

**오류.** 설치된 Universal RP 패키지가 지원 범위 밖입니다. URP 백엔드가 그 범위에 맞춰 컴파일되므로, 밖에서는 재질이 컴파일에 실패하거나 아웃라인 없이 렌더링될 수 있습니다.

**조치** — `Window > Package Manager > Universal RP`에서 범위 안의 버전을 설치하거나 프로젝트를 Built-in으로 되돌리세요.

---

## 셰이더

### MING-SHADER-MISSING

**오류.** MingToon 셰이더를 프로젝트에서 찾지 못했습니다. 어떤 재질도 이 셰이더로 렌더링할 수 없습니다.

**조치** — `Assets/StudioRaming/MingToon/Shaders`를 다시 임포트하고 Console의 셰이더 컴파일 오류를 읽으세요. URP 프로젝트라면 URP 백엔드 폴더가 임포트됐는지도 확인합니다.

### MING-SHADER-UNSUPPORTED

**오류.** 이 에디터나 GPU가 셰이더를 지원하지 않아 **해당 셰이더를 쓰는 모든 재질이 마젠타로 렌더링됩니다.**

**조치** — 셰이더 에셋을 선택해 인스펙터 위쪽의 컴파일 오류를 읽고, `Project Settings > Player > Other Settings > Graphics APIs`가 셰이더 모델 4.5를 지원하는지 확인하세요 (Direct3D11 이상).

### MING-SHADER-PASS-MISSING

**오류.** 셰이더에 이 백엔드가 요구하는 렌더 패스가 없습니다.

:::danger[조용히 사라집니다]
**아웃라인·캐스트 그림자·깊이 선기록이 렌더링을 멈추는데, 그 항목의 컨트롤은 계속 편집 가능한 상태로 남습니다.** 값을 만져도 아무 일이 없는 원인이 됩니다.
:::

**조치** — 릴리스 패키지에서 `Assets/StudioRaming/MingToon/Shaders`를 복구하고, 재질이 프로젝트 렌더 파이프라인에 맞는 셰이더를 쓰는지 확인하세요.

### MING-SHADER-PROPERTY-MISSING

**오류.** 셰이더가 이 버전의 에디터가 요구하는 프로퍼티를 선언하지 않았습니다. 색 합성 프로퍼티가 없으면 **색 옆의 합성 모드와 불투명도가 아무 일도 하지 않습니다.**

**조치** — 릴리스 패키지에서 Shaders 폴더를 복구한 뒤 다시 검증하세요.

---

## 재질

### MING-MAT-NON-FINITE

**오류.** 재질에 유한하지 않은 수치(NaN / Infinity)가 있습니다. 조명과 화면 공간 계산 전체를 오염시킬 수 있습니다.

**조치** — 렌더링이나 베이크 전에 해당 프로퍼티를 정상 값으로 되돌리세요. 보고에 프로퍼티 이름이 나옵니다.

### MING-MAT-COLOR-MASK-ZERO

**오류.** `_ColorMask`가 0이라 **메시가 렌더링되고 가리기는 하는데 화면에 아무것도 그리지 않습니다.**

**조치** — `표면 렌더링 > 고급 컬러 버퍼`에서 `컬러 마스크`를 RGBA(15)로 되돌리세요.

### MING-MAT-OPAQUE-ZWRITE-OFF

**오류.** 불투명 렌더 큐인데 깊이를 기록하지 않습니다(`_ZWrite`가 0). 다른 불투명 메시와 **정렬이 무작위가 되고, 모든 카메라 깊이 효과가 이 메시를 통과해 읽습니다.**

**조치** — `표면 렌더링 > 고급 컬러 버퍼`에서 `깊이 기록`을 On으로 하거나, 실제로 원하는 투명 표면 모드를 고르세요.

### MING-MAT-TRANSPARENT-DEPTH-EFFECTS

**오류.** 투명 큐에서 카메라 깊이 효과를 씁니다. 정렬과 자기 깊이가 불안정해 **깊이 림과 2D 그림자가 깜빡이거나 뒤에 있는 표면을 읽습니다.**

**조치** — 이 재질에서 두 모듈을 끄거나, 표면 모드를 불투명 / 컷아웃으로 바꾸세요. 반투명이 필요하면 `투명 · 아웃라인용 깊이 기록`을 쓰면 됩니다. → [기본 설정](/guides/basics#1-표면-모드부터-정합니다)

### MING-MAT-CUTOUT-CUTOFF-ZERO

**오류.** 컷아웃인데 `알파 컷오프`가 0이라 **아무것도 잘려 나가지 않습니다.** 완전히 투명한 텍셀까지 그림자 깊이를 기록해 **메시가 사각형 통짜 그림자를 드리웁니다.**

**조치** — `알파 컷오프`를 0보다 올리세요(0.5가 일반적인 시작점). 또는 다른 표면 모드를 고릅니다.

---

## URP 렌더러 기능

### MING-URP-DEPTH-FEATURE-MISSING

**오류.** URP 재질이 깊이 림이나 2D 그림자를 쓰는데 필요한 Renderer Feature가 없어 **두 효과가 아무것도 그리지 않습니다.** 세 가지 경우가 있습니다.

| 상황 | 조치 |
|---|---|
| MingToon URP 백엔드 어셈블리가 로드되지 않음 | 지원 범위 안의 URP 버전을 설치하세요 |
| 활성 URP 에셋에 renderer data가 없음 | URP 에셋의 Renderer List에 Universal Renderer Data를 추가한 뒤 아래 메뉴 실행 |
| renderer data에 기능이 비활성 | `Tools > Studio Raming > MingToon > URP > Install Depth Effects Renderer Feature` |

:::caution[활성 URP 에셋의 **모든** 렌더러에 기능이 필요합니다]
한 렌더러에만 설치하면 다른 렌더러에서는 효과가 그려지지 않으면서 컨트롤은 계속 편집 가능한 상태로 남습니다.
:::

### MING-URP-OUTLINE-FEATURE-MISSING

**오류.** 위와 같은 구조이며 대상이 아웃라인 패스입니다. **아웃라인이 그려지지 않습니다.**

**조치** — `Tools > Studio Raming > MingToon > URP > Install Outline Renderer Feature`.

---

## 런타임

### MING-RUNTIME-PROVIDER-MISSING

**오류.** Built-in RP 깊이 공급자를 찾지 못했거나 형태가 바뀌었습니다. 어떤 카메라도 깊이 텍스처를 요청받지 않으므로 **깊이 림 · 2D 그림자 · 깊이 기반 아웃라인이 설정과 무관하게 비어 있습니다.**

| 세부 | 의미 |
|---|---|
| 타입 없음 | MingToon 런타임 스크립트가 없거나 컴파일에 실패 |
| Component 파생 아님 | 런타임이 수정됨 |
| 필수 메서드 없음 | 런타임이 수정됨 |

**조치** — `Assets/StudioRaming/MingToon/Runtime`을 다시 임포트하고 컴파일 오류를 지우세요. 수정한 적이 있으면 릴리스 패키지에서 복구합니다.

---

## 씬 / 카메라

### MING-SCENE-NO-CAMERA

로드된 Game 카메라가 없어 2D 효과가 의존하는 카메라 깊이 상태를 확인할 수 없었습니다.

**조치** — 실제로 작업하는 씬을 열거나 LookDev 씬을 만든 뒤 다시 검증하세요.

### MING-SCENE-CAMERA-DEPTH-OFF

Game 카메라에 깊이 텍스처가 꺼져 있습니다.

**조치** — 씬에 `Studio Raming/MingToon/Depth Texture Provider`를 두세요. → [깊이 기반 효과](/guides/depth-effects#플랫폼별-깊이-확보)

---

## 코드가 안 나오는데 화면이 이상할 때

Validator는 **정적으로 확인 가능한 것만** 봅니다. 아래는 검증을 통과해도 생길 수 있습니다.

| 증상 | 문서 |
|---|---|
| 값을 바꿔도 반응이 없다 | [문제 해결 — 아무 값도 안 먹힌다](/troubleshooting#아무-값도-안-먹힌다) |
| VRChat 일반 화면에서 깊이 효과가 없다 | [VRChat](/platforms/vrchat#깊이-효과가-어디까지-보장되나) |
| 아웃라인이 각진 부분에서 끊긴다 | [메시 UV 베이크](/guides/mesh-bakes#아웃라인-스무스-노멀-uv8) |
