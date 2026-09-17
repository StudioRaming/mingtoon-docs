---
id: first-material
title: Manager로 처음 시작하기
sidebar_position: 2
---

# Manager로 처음 시작하기

> 이 페이지를 끝내면 아바타 한 대가 MingToon 재질로 바뀝니다.
> 약 15분 걸립니다.

## 시작 전 준비

- [설치](/getting-started/installation)를 마친 프로젝트
- 씬에 올려 둔 아바타 하나
- 프로젝트 백업

## 1. 아바타 루트에 Manager 추가

1. Hierarchy에서 아바타의 맨 위 오브젝트를 고릅니다.
2. 메뉴에서 `GameObject > MingToon > Add MingToon Manager`를 누릅니다.

Inspector에 MingToon Manager가 나타나고 탭 세 개가 보이면 정상입니다.
탭 이름은 **시작하기** · **룩·베이크** · **최적화**입니다.

![아바타 루트에 MingToon Manager가 붙고 탭 세 개가 보이는 Inspector](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-01-add-manager.png | Hierarchy에서 아바타 루트를 고른 상태로 Inspector에 MingToon Manager와 시작하기·룩·베이크·최적화 탭이 보이는 화면 | 1200x700 -->

:::caution[작업이 끝나도 지우지 마세요]
Manager는 업로드 최적화가 어디까지를 이 아바타로 볼지 기억합니다.
의상만 편집할 때도 아바타 맨 위에 둡니다.
:::

## 2. 얼굴과 피부 렌더러 지정

**시작하기** 탭의 **1. 얼굴 · 스킨 대상 지정**을 찾습니다.

1. **얼굴 렌더러 직접 지정**에 얼굴 메시를 넣습니다.
2. **피부 렌더러 직접 지정**에 맨살 메시를 넣습니다.
3. **지정한 렌더러에 역할 표시**를 누릅니다.

슬롯 목록에 `Face`와 `Skin`이 표시되면 정상입니다.
머리카락과 의상 슬롯은 `Regular`로 둡니다.

![슬롯 목록에 Face와 Skin 역할이 표시된 시작하기 탭](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-02-face-skin.png | 시작하기 탭의 "1. 얼굴 · 스킨 대상 지정" 카드에서 슬롯 목록에 Face·Skin·Regular가 표시된 상태 | 1200x700 -->

헤어와 의상만 변환한다면 두 칸을 비워 두세요.
자세한 역할 지정은 [역할 지정 상세](/workflow/character-manager#얼굴--피부-지정--가장-중요한-단계)를 보세요.

## 3. 변환 프리셋 고르기

같은 탭의 **2. 룩 선택 → 변환**을 찾습니다.

1. **변환 시 룩 프리셋**에서 **베이직툰 High**를 고릅니다.
2. **색감 프리셋**에서 **기존값 사용**을 고릅니다.

베이직툰 High는 깊이 효과를 켜는 기준 룩입니다.
가볍게 가려면 베이직툰 Low를 고르세요.
기존값 사용은 원본에서 읽은 색과 그림자 값을 그대로 둡니다.

![변환 시 룩 프리셋과 색감 프리셋이 선택된 화면](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-03-presets.png | 시작하기 탭의 "2. 룩 선택 → 변환" 카드에서 변환 시 룩 프리셋이 베이직툰 High, 색감 프리셋이 기존값 사용인 상태 | 1200x700 -->

## 4. 변환 실행

같은 **2. 룩 선택 → 변환** 안의 **하위 재질을 MingToon으로 변환**을 누릅니다.

원본 재질은 지워지지 않습니다.
편집용 MingToon 재질이 새로 만들어지고 슬롯만 바뀝니다.

![변환 버튼을 누른 뒤 결과 줄이 표시된 화면](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-04-convert.png | "2. 룩 선택 → 변환" 카드의 하위 재질을 MingToon으로 변환 버튼과 그 아래 변환 결과 줄이 보이는 상태 | 1200x700 -->

## 5. 변환 결과 확인

결과 줄에서 `변환된 슬롯` · `제외한 슬롯` · `실패한 슬롯` 개수를 읽습니다.
실패한 슬롯이 0보다 크면 그 재질을 먼저 확인하세요.
제외한 슬롯은 파티클처럼 일부러 건드리지 않는 계열입니다.

![변환된 슬롯과 제외·실패 슬롯 개수가 표시된 결과 패널](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-05-result.png | 변환 결과 패널에 변환된 슬롯·제외한 슬롯·실패한 슬롯 개수가 표시된 상태 | 1200x700 -->

어떤 재질이 제외되는지는 [변환되지 않는 슬롯](/workflow/character-manager#변환되지-않는-슬롯)에 있습니다.

## 6. 빠른 설정에서 다듬기

얼굴 재질 하나를 고르고 Inspector의 **빠른 설정**을 엽니다.

행에 `(모듈 꺼짐)`이 보이면 옆의 **이 모듈 켜기**를 먼저 누릅니다.

1. **1차 그림자 번짐**을 0.05로 내립니다. 기본값은 0.3입니다.
2. **아웃라인 폭**을 2로 올립니다. 기본값은 1입니다.
3. **베이스맵 HSVG**의 채도를 0.05씩 움직여 봅니다.

그림자 경계가 또렷해지고 외곽선이 굵어지면 성공입니다.

![빠른 설정에서 그림자 경계와 아웃라인을 조정한 얼굴](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-06-quick-settings.png | 빠른 설정 카드를 펼치고 1차 그림자 번짐과 아웃라인 폭을 조정한 얼굴 클로즈업 | 1200x700 -->

## 잘 됐는지 확인

- 아바타가 마젠타(분홍색)가 아닙니다.
- 얼굴 슬롯이 `Face`로 표시됩니다.
- 실패한 슬롯이 0개입니다.
- 빠른 설정에서 값을 바꾸면 화면이 바로 바뀝니다.

어긋나는 항목이 있으면 [문제 해결](/troubleshooting#conversion)로 가세요.

편집을 마치면 평소처럼 VRC SDK 업로드나 WARUDO 모드 빌드를 실행하세요.
자동 최적화가 그때 걸립니다. 수동 Bake를 먼저 누를 필요는 없습니다.

## 다음에 읽을 문서

[기본 설정](/guides/basics) · [인스펙터 사용법](/guides/inspector) · [MingToon Manager](/workflow/character-manager)
