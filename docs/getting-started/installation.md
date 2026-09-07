---
id: installation
title: 설치
sidebar_position: 1
---

:::note[오픈 베타 참여 안내]
[오픈 베타 참여 안내](https://studioraming.github.io/mingtoon-site/ko/download/)
:::


모든 상업 라이선스에는 URP 버전이 포함됩니다. Personal Streaming·Personal Creator의 Early Access Founders Edition에는 MLC가 포함되며, 정식 출시 이후 구성은 변경될 수 있습니다. 현재 오픈 베타의 상업 이용은 금지됩니다. [라이선스 및 포함 구성](/legal/beta-license)을 확인하세요.

# 설치

MingToon 0.1.8 오픈 베타 본체는 BRP 대상입니다. URP는 현재 BRP 오픈 베타에 포함되지 않으며, 모든 상업 라이선스에 포함됩니다.

**이 문서를 마치면** MingToon이 오류 없이 임포트된 Unity 프로젝트를 갖게 됩니다.

## 1. Unity 버전을 먼저 맞춥니다

:::danger[대상에 따라 Unity 버전이 다릅니다]
| 대상 | Unity | 근거 |
|---|---|---|
| **VRChat PC** (주 대상) | **2022.3.22f1** | 현행 VRChat SDK 기준 |
| **Warudo** | **2021.3.45f2** | Warudo Mod SDK 0.14.3.10 기준 |
| 일반 Unity | 2021.3 LTS | |

**VRChat 대상이면 반드시 2022.3.22f1을 쓰세요.** MingToon의 VRChat 빌드 훅과 VRChat 런타임은 `UNITY_2022_3_OR_NEWER` 조건에서만 컴파일됩니다. 2021.3에서는 이 코드가 **아예 존재하지 않아** 업로드 시 자동 최적화와 VRChat 전용 업로드 처리(별도 깊이 라이트 옵트인 포함)가 실행되지 않습니다.
:::

한 프로젝트로 VRChat과 Warudo를 동시에 대응할 수는 없습니다. 대상별로 프로젝트를 나누세요.

## 2. 설치 방법 선택

[공식 다운로드 안내](https://studioraming.github.io/mingtoon-site/ko/download/)에서 VCC 또는 BOOTH를 선택하세요. VRChat 대상 프로젝트에는 VRChat SDK3 (Avatars)를 먼저 준비합니다.

:::caution[기존 Assets 설치본에서 이전하기]
프로젝트를 백업하고 Play 모드를 종료하세요. `Assets/StudioRaming/MingToon` 안에 직접 저장한 재질·텍스처·프리셋을 다른 폴더로 옮긴 뒤, **기존 MingToon 폴더만 삭제**하고 새 패키지를 설치합니다. `Assets/StudioRaming` 전체나 `MingLightController` 폴더는 삭제하지 마세요. 이 정리는 이전 Assets 설치본에서 옮길 때만 필요합니다.
:::

### VCC로 설치

1. 공식 다운로드 안내에서 **VCC에 추가**를 누릅니다.
2. VCC에서 저장소 추가를 확인하고 대상 프로젝트의 **Manage Project**를 엽니다.
3. MingToon을 추가한 뒤 Unity를 열고 패키지 임포트와 컴파일이 끝날 때까지 기다립니다.
4. 이후 업데이트는 VCC의 Manage Project에서 진행합니다.

### BOOTH 설치기로 설치

1. [공식 BOOTH 상품](https://raming.booth.pm/items/8810209)에서 설치기 `.unitypackage`를 받습니다.
2. Unity에서 `Assets > Import Package > Custom Package`로 설치기를 임포트합니다.
3. 인터넷에 연결된 상태에서 기다리면 DLL 설치기가 필요한 MingToon 패키지를 자동 설치합니다. 첫 설치에는 별도의 설치 버튼이 필요하지 않습니다.
4. 이후 Unity 시작 시 새 버전을 확인합니다. 안내창에서 **업데이트**를 눌렀을 때 설치하며, **건너뛰기**는 해당 버전에만 적용됩니다. Unity 재시작만으로 업데이트를 자동 설치하지 않습니다.

## 3. 설치 확인

Project 창의 **Packages > MingToon**과 `Packages/com.studioraming.mingtoon` 설치 경로를 확인하세요. Unity가 임포트와 컴파일을 마친 뒤 Console의 오류를 확인하고, 사용하는 재질에 MingToon 셰이더가 정상 표시되는지 확인합니다.

Ming Light Controller는 별도 패키지입니다. 사용하는 경우 MLC도 별도로 설치·업데이트하세요. 이번 MingToon 배포는 BRP 본체이며 URP 애드온을 포함하지 않습니다.

## 이전 버전에서 올라왔다면 {#이전-버전에서-올라왔다면}

0.1.6으로 작업하던 프로젝트를 0.1.7로 올렸다면, 아래 두 가지를 **한 번씩** 해 두어야 합니다.

:::danger[1. 스키마 마이그레이션을 한 번 실행하세요]
`Tools > Studio Raming > MingToon > Advanced > Migrate Project To Current Schema`

머티리얼 스키마가 **10에서 11로** 올라갔습니다. `림라이트 마스크 사용` · `림 그림자 마스크 사용` 두 토글이 새로 생겼는데, 이전 재질에는 이 토글이 없어 **꺼진 상태로 읽힙니다.** 마이그레이션이 흰색 기본값이 아닌 마스크를 찾아 토글을 켜 줍니다.

**돌리기 전까지 해당 재질의 림 마스크는 적용되지 않습니다.** 마스크가 기본 흰색인 재질은 꺼진 채로 남으며, 그 편이 더 쌉니다.

실행 전 확인을 받고, 변경된 파일은 백업됩니다. 완료되면 콘솔에 처리한 머티리얼·프리셋·애니메이션 클립 수와 백업 경로가 한 줄로 남습니다. → [림](/guides/rim#림-마스크)
:::

:::caution[2. 베이크 캐시가 다시 생성됩니다]
생성 셰이더 캐시 버전이 **28에서 38로** 올라가 기존 베이크 산출물이 무효가 됩니다. 다음 빌드/업로드에서 자동으로 다시 구워지므로 손으로 지울 것은 없지만, 그 한 번은 시간이 더 걸립니다.

**VRChat 아바타는 재업로드해야 이번 버전의 수정이 반영됩니다.** 셰이더는 아바타 에셋번들에 동봉되므로, 이미 올라간 아바타는 예전 셰이더를 계속 씁니다. → [VRChat](/platforms/vrchat)
:::

## 4. VRChat 연동 확인 (VRChat 대상만)

스크립트 리로드가 끝난 뒤 Console에 아래 줄이 있어야 합니다.

```text
[MingToon] VRChat build hook compiled and registered.
```

:::danger[이 줄이 없다면]
VRChat 빌드 훅이 **아예 존재하지 않는 상태**입니다. 업로드해도 자동 최적화와 VRChat 전용 업로드 처리가 실행되지 않습니다. 확인할 것:

1. Unity 버전이 **2022.3.22f1** 인지
2. VRChat SDK3가 프로젝트에 제대로 들어와 있는지 (`VRC_SDK_VRCSDK3` 정의)
:::

## 5. 프로젝트 검증

메뉴에서 `Tools > Studio Raming > MingToon > Validate Project`를 실행합니다.

주로 확인하는 것은 **현재 빌드 타깃이 셰이더 모델 4.5를 만족하는지**입니다. 만족하지 못하면 오류로 보고하고, 그 상태로 진행하면 재질이 마젠타(분홍색)로 렌더링됩니다. → [지원 환경](/platforms/compatibility)

<!-- SCREENSHOT: Validate Project 결과 -->

:::note[지원 에디터 스트림은 2021.3과 2022.3 둘 다입니다]
어느 쪽이든 `MING-ENV-UNITY-VERSION` 오류는 나오지 않습니다.

다만 **VRC SDK가 들어 있는데 에디터가 2021.3이면** `MING-VRC-UNITY-VERSION` **경고**가 뜹니다 — "MingToon의 VRChat 연동이 2022.3 스트림에서만 컴파일되므로 이 프로젝트에는 아바타 업로드 지원이 없습니다." 정확한 경고이며, VRChat 대상이면 2022.3.22f1로 옮기라는 뜻입니다.
:::

## 6. 셰이더 선택

| 프로젝트 | 셰이더 |
|---|---|
| Built-in Render Pipeline (BRP) — VRChat·Warudo 포함 | `StudioRaming/MingToon/BRP` |
| URP 12.x (Unity 2021.3) | MingToon URP 셰이더 |

:::danger[URP는 VRChat 대상이 아닙니다]
VRChat + URP는 지원하지 않습니다. URP는 Unity 2021.3 + URP 12.x만 대상이며, URP 13 이상은 동작하는 것처럼 보여도 지원으로 간주하지 마세요.
:::

## 선택 사항: Post Processing Stack v2 {#선택-사항-post-processing-stack-v2}

MingToon은 PPv2 없이도 완전히 동작합니다. PPv2 관련 소스는 전부 `UNITY_POST_PROCESSING_STACK_V2` 심볼로 제외되어 있어, 깨끗한 프로젝트에 `com.unity.postprocessing`을 설치할 필요가 없습니다.

PPv2 연동을 쓰려면:

1. PPv2 **3.4.0**을 설치합니다.
2. **Player Settings > Scripting Define Symbols**에 `UNITY_POST_PROCESSING_STACK_V2`를 **직접 추가**합니다.
3. Unity가 재컴파일을 마칠 때까지 기다립니다.
4. `Tools > Studio Raming > MingToon > Create or Repair BRP PPv2 Global Volume`을 실행합니다.

:::note
패키지를 설치하는 것만으로는 이 심볼이 생기지 않습니다. 2번 단계를 건너뛰면 메뉴가 아무 일도 하지 않습니다.
:::

VRChat 아바타는 월드의 후처리를 따르므로, PPv2는 주로 씬 확인·촬영용입니다.

## 다음

[첫 재질 만들기](/getting-started/first-material)
