---
id: installation
title: 설치
sidebar_position: 1
---

# 설치

> 이 페이지를 끝내면 MingToon이 오류 없이 들어간 Unity 프로젝트가 생깁니다.
> 약 15분 걸립니다.

## 시작 전 준비

- Unity Hub와 아래 표에 맞는 Unity 버전, 그리고 작업할 프로젝트의 백업
- VRChat 대상이라면 VRChat SDK3 (Avatars)

## 1. Unity 버전을 맞춥니다

| 대상 | Unity |
|---|---|
| VRChat PC | 2022.3.22f1 |
| Warudo | 2021.3.45f2 |
| 일반 Unity | 2021.3 LTS |

VRChat 대상이면 2022.3.22f1을 쓰세요.
MingToon의 VRChat 빌드 훅은 2022.3 이상에서만 컴파일됩니다.
2021.3 프로젝트에는 업로드 자동 최적화가 아예 없습니다.
한 프로젝트로 VRChat과 Warudo를 함께 대응할 수 없으니 나누세요.

![Unity Hub 프로젝트 목록에서 에디터 버전이 2022.3.22f1로 표시된 화면](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-01-unity-version.png | Unity Hub 프로젝트 목록에서 대상 프로젝트의 Editor Version 칸이 2022.3.22f1인 상태 | 1200x700 -->

## 2. 패키지를 설치합니다

[공식 다운로드 안내](https://studioraming.github.io/mingtoon-site/ko/download/)에서 VCC 또는 BOOTH를 고릅니다.

VCC로 설치할 때:

1. 다운로드 안내에서 **VCC에 추가**를 누릅니다.
2. VCC에서 저장소 추가를 확인합니다.
3. 대상 프로젝트의 **Manage Project**를 엽니다.
4. MingToon을 추가하고 Unity를 엽니다.

BOOTH 설치기로 설치할 때:

1. [BOOTH 상품](https://raming.booth.pm/items/8810209)에서 설치기 `.unitypackage`를 받습니다.
2. Unity에서 `Assets > Import Package > Custom Package`로 임포트합니다.
3. 인터넷에 연결한 채로 기다립니다. 설치기가 본체를 자동으로 받습니다.

![Unity가 MingToon 패키지를 임포트하고 컴파일을 마친 Project 창](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-02-import-done.png | Project 창에 MingToon 패키지가 들어오고 진행 바가 사라진 직후 상태 | 1200x700 -->

VCC로 설치했다면 업데이트도 VCC에서 합니다.
BOOTH 설치기는 Unity를 켤 때 새 버전을 안내합니다.

## 3. 셰이더가 들어왔는지 봅니다

재질 하나를 고르고 Inspector 맨 위의 셰이더 목록을 엽니다.
`StudioRaming/MingToon/MingToon BRP`가 보이면 정상입니다.
URP 셰이더는 이번 BRP 오픈 베타에 들어 있지 않습니다.

![Inspector 셰이더 드롭다운에 MingToon BRP 항목이 보이는 화면](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-03-shader-list.png | 재질 Inspector의 Shader 드롭다운을 펼쳐 StudioRaming/MingToon/MingToon BRP가 보이는 상태 | 1200x700 -->

## 4. VRChat 연동을 확인합니다

VRChat 대상만 해당합니다. 리로드가 끝난 뒤 Console에 아래 줄이 있어야 합니다.

```text
[MingToon] VRChat build hook compiled and registered.
```

![Console 창에 MingToon 빌드 훅 등록 로그가 한 줄 찍힌 화면](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-04-hook-log.png | Console 창에서 [MingToon] VRChat build hook compiled and registered. 한 줄이 보이는 상태 | 1200x700 -->

:::danger[이 줄이 없다면]
VRChat 빌드 훅이 없는 상태입니다.
업로드해도 자동 최적화가 걸리지 않습니다.
:::

## 5. 프로젝트를 검증합니다

메뉴에서 `StudioRaming > MingToon > Validate Project`를 실행합니다.
빌드 타깃이 셰이더 모델 4.5를 못 맞추면 `MING-ENV-BUILD-TARGET` 오류가 납니다.
그 상태로 진행하면 재질이 마젠타(분홍색)로 나옵니다.
에디터가 2021.3이고 VRC SDK가 있으면 `MING-VRC-UNITY-VERSION` 경고가 뜹니다.

![Validate Project 실행 결과 창](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-05-validate.png | Validate Project를 실행해 결과 목록이 표시된 창 | 1200x700 -->

## 잘 됐는지 확인

- Console에 빨간 오류가 없습니다.
- 셰이더 목록에 `StudioRaming/MingToon/MingToon BRP`가 있습니다.
- VRChat 대상이면 빌드 훅 로그가 찍혀 있습니다.
- `Validate Project` 결과에 오류가 없습니다.

넷 중 하나라도 어긋나면 [문제 해결](/troubleshooting#install)로 가세요.

## 이전 버전에서 올라왔다면 {#이전-버전에서-올라왔다면}

베이크 캐시가 한 번 다시 만들어집니다.
손으로 지울 것은 없고, 다음 빌드나 업로드가 그만큼 오래 걸립니다.
VRChat 아바타는 다시 올려야 이번 버전이 반영됩니다.
셰이더가 아바타에 같이 실리기 때문입니다. 조건은 [VRChat](/platforms/vrchat)에 있습니다.

## 선택 사항: Post Processing Stack v2 {#선택-사항-post-processing-stack-v2}

MingToon은 PPv2 없이도 완전히 동작합니다. 씬 확인과 촬영용입니다.

1. PPv2 **3.4.0**을 설치합니다.
2. **Player Settings > Scripting Define Symbols**에 `UNITY_POST_PROCESSING_STACK_V2`를 직접 추가합니다.
3. Unity가 재컴파일을 마칠 때까지 기다립니다.
4. `StudioRaming > MingToon > Create or Repair BRP PPv2 Global Volume`을 실행합니다.

2번을 건너뛰면 4번 메뉴가 아무 일도 하지 않습니다.

## 다음에 읽을 문서

[Manager로 처음 시작하기](/getting-started/first-material) · [지원 환경](/platforms/compatibility) · [문제 해결](/troubleshooting#install)
