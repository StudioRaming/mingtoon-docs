---
id: add-ons
title: 별매 애드온과 연동
sidebar_position: 14
---

# 별매 애드온과 연동

> 이 페이지는 잠긴 버튼을 눌러 여기로 온 분을 위한 것입니다.
> 그 버튼이 무엇이고, 없이도 되는지 한 번에 알 수 있습니다.

## 결론부터

MingToon 본체는 애드온이 하나도 없어도 설치되고, 컴파일되고, 동작합니다.

애드온은 데이터를 **만드는** 쪽만 담당합니다. 그 데이터를 **읽는** 쪽은 항상 MingToon 셰이더입니다.

그래서 외부 도구로 만든 텍스처나 버텍스 컬러를 넣으면 같은 결과가 나옵니다.

## 세 가지 도구

| 도구 | 무엇을 만드나 | 없으면 무엇으로 대신하나 |
|---|---|---|
| **Mask Maker** | 씬 뷰에서 마스크와 버텍스 컬러를 직접 칠합니다 | 외부 도구에서 만든 마스크 텍스처를 슬롯에 직접 넣습니다 |
| **Face SDF Studio** | 얼굴 그림자 SDF 맵을 만듭니다 | 이미 가진 SDF 텍스처를 슬롯에 넣습니다 |
| **Ming Light Controller** | VRChat 표현 메뉴와 파라미터를 만듭니다 | 인스펙터에서 값을 직접 조절합니다 |

- [Mask Maker 연동](/guides/mask-maker) — `MM` 버튼과 버텍스 페인트
- [얼굴 SDF와 Face SDF Studio](/guides/face-sdf) — SDF 맵 형식과 연결
- [Ming Light Controller 사용하기](/guides/ming-light-controller) — 인게임 메뉴 생성

## 잠긴 버튼은 왜 그대로 보이나요

버튼을 회색으로 지우면 그런 기능이 있다는 사실 자체가 사라집니다.

그래서 버튼은 그대로 두고, 누르면 그 도구의 문서로 보냅니다.

:::note[어셈블리 참조가 아닙니다]
MingToon은 세 도구를 컴파일 시점에 참조하지 않습니다. 실행 중에 이름으로 찾습니다.
셋이 전부 없어도 MingToon의 설치·컴파일·동작에는 영향이 없습니다.
:::

## 설치했는데 버튼이 계속 잠겨 있어요

1. Unity의 컴파일이 끝날 때까지 기다린 뒤 인스펙터를 다시 엽니다.
2. Console에 컴파일 오류가 없는지 확인합니다.
3. 재질을 하나만 선택했는지 확인합니다. 여러 개를 고르면 눌리지 않는 버튼이 있습니다.
4. 그 슬롯이 해당 도구의 대상인지 확인합니다. 대상이 아니면 버튼 자체가 붙지 않습니다.

## 구매와 배포 상태

각 도구의 판매 페이지와 현재 배포 상태는 해당 문서에 적혀 있습니다.

Face SDF Studio는 아직 발매 전입니다. 구매를 전제로 한 절차로 안내하지 않습니다.

## 관련 문서

- [Mask Maker 연동](/guides/mask-maker)
- [얼굴 SDF와 Face SDF Studio](/guides/face-sdf)
- [Ming Light Controller 사용하기](/guides/ming-light-controller)
- [밍툰 매니저](/workflow/character-manager)
