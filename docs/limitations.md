---
id: limitations
title: 현재 제한과 릴리스
sidebar_position: 91
---

# 지금 MingToon이 하지 않는 것

> 이 페이지는 설명입니다. 지금 설치하려면 [설치](/getting-started/installation)를 보세요.

## 한 줄 요약

MingToon은 공개 오픈 베타입니다. Built-in 파이프라인(BRP)만 배포합니다.

현재 버전은 밍툰 매니저의 `업데이트 설정`에서 확인하세요. 버전별 변경은 [패치노트](/changelog)에 있습니다.

## 배포 전에 알아야 할 것

| 항목 | 현재 상태 |
|---|---|
| **성능 수치** | 검증된 GPU ms·SetPass 개선 수치가 없습니다. 성능 주장을 하지 않습니다 |
| **VRChat PC** | 주 대상입니다. 수동 검증이며 출시 인증은 끝나지 않았습니다 |
| **VRChat Quest** | MingToon 셰이더를 직접 실행하지 않습니다 |
| **WARUDO** | 실기 검증 대기 상태입니다 |
| **URP** | 이번 BRP 오픈 베타에 포함되지 않습니다 |
| **깊이 효과** | 호스트가 카메라 깊이를 줄 때만 보입니다 |
| **lilToon 변환** | 상호 운용 도구입니다. 다른 셰이더 결과를 그대로 복제하지 않습니다 |

→ [지원 환경](/platforms/compatibility) · [깊이 효과가 어디까지 보장되나](/platforms/vrchat#깊이-효과가-어디까지-보장되나)

## 설치 경로가 두 가지입니다

VCC로 설치하는 BRP 코어는 소스 패키지입니다. BOOTH 설치기는 DLL 배포 경로입니다.

두 경로는 같은 BRP 코어 버전을 가리킵니다.

## 배포 전에 직접 확인할 것

여러분이 만든 결과물을 남에게 주기 전에 아래를 확인하세요.

1. Console에 C#·셰이더 오류가 0개입니다.
2. 실제 아바타의 전신과 얼굴을 각각 캡처해 봤습니다.
3. 대상 플랫폼 빌드가 성공합니다.
4. 대상 플랫폼에서 직접 봤습니다. VRChat이면 본인 화면·미러·Photo Camera를 각각 봅니다.

`StudioRaming > MingToon > Validate Project`가 환경 조건을 먼저 걸러 줍니다.

:::note[여기까지가 여러분 몫입니다]
셰이더 컴파일 회귀 테스트와 EditMode 테스트는 우리가 릴리스마다 돌립니다.
여러분이 확인할 것은 실제 아바타에서 보이는 결과입니다.
:::

## 라이선스

현재 오픈 베타는 상업 이용을 허용하지 않습니다. 허용 범위와 향후 구성은 한 곳에만 적어 둡니다.

→ [라이선스 및 포함 구성](/legal/beta-license)

## 베타 피드백

버그 제보는 [공식 Discord 서버](https://discord.gg/Zsj6pkWKKs)의 버그 제보 채널을 이용해 주세요.

아래를 포함하면 재현이 빨라집니다.

1. Unity 버전과 대상 플랫폼 (VRChat PC / WARUDO / 일반 Unity)
2. 렌더 파이프라인 (BRP / URP 12.x)
3. MingToon 버전
4. Console 로그 전문
5. 재현 순서

증상부터 찾아보려면 [문제 해결](/troubleshooting)로 가세요.
