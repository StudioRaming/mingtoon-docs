---
id: limitations
title: 현재 제한과 릴리스
sidebar_position: 91
---

모든 상업 라이선스에는 URP 버전이 포함됩니다. Personal Streaming·Personal Creator의 Early Access Founders Edition에는 MLC가 포함되며, 정식 출시 이후 구성은 변경될 수 있습니다. 현재 오픈 베타의 상업 이용은 금지됩니다. [라이선스 및 포함 구성](/legal/beta-license)을 확인하세요.

# 현재 제한과 릴리스

MingToon `0.1.7` 공개 오픈 베타 기준입니다. BRP 본체의 현재 배포 범위를 설명합니다. URP는 별도 판매 애드온입니다.

## 배포 전에 알아야 할 것

- 이 베타에는 **검증된 GPU ms · SetPass 개선 수치가 포함되어 있지 않습니다.** 성능 주장을 하지 않습니다.
- **VRChat PC는 수동 검증 대상이며 출시 인증이 완료되지 않았습니다.**
- **VRChat Quest는 MingToon 직접 실행 대상이 아닙니다.**
- Warudo는 **실기 검증 대기** 상태입니다.
- URP는 BRP 본체에 포함되지 않는 별도 판매 애드온이며, 이 문서의 BRP 지원 범위와 분리됩니다.
- 2D 림라이트 · 2D 그림자 · 내부 2D 경계는 **호스트의 카메라 깊이 제공에 의존**합니다. VRChat 일반 플레이어 화면에서는 아바타가 깊이를 강제할 수 없습니다.
- lilToon 변환은 **상호 운용 도구**이며 다른 셰이더의 결과를 수학적으로 복제하지 않습니다.
- 현재 배포 범위와 실제 검증 상태는 베타 릴리스 후보 기준입니다. 성능 수치와 업로드 성공을 보장하지 않습니다.

## 직접 통과시켜야 하는 검증

MingToon으로 만든 결과물을 배포하기 전에, 아래를 각각 확인하세요.

1. BRP / URP 셰이더 컴파일
2. EditMode 테스트
3. 실제 아바타의 **전신 + 얼굴** 캡처
4. 대상 플랫폼 빌드
5. 대상 플랫폼에서의 실기 확인 — VRChat이면 **본인 화면 · 미러 · Photo Camera를 각각**

## 릴리스 빌더

패키지 빌더는 **positive allowlist**로만 내보냅니다.

| 포함 | 제외 |
|---|---|
| Runtime / Editor / Shaders | Tests |
| 존재하는 공개 Preset | 내부 리뷰 · 연구 · 증거 · 벤치마크 |
| README, 매뉴얼, manifest | 생성된 프로젝트 산출물 |
| 승인된 LICENSE 또는 EULA | 저장소 메타데이터 |

SHA-256 manifest가 함께 기록됩니다.

:::note
사용자가 승인한 MingToon 전용 LICENSE/EULA가 없으면 패키지 빌드는 차단됩니다.
:::

## 베타 피드백

버그 제보는 [공식 Discord 서버](https://discord.gg/Zsj6pkWKKs)의 **버그 제보 채널**을 이용해 주세요.

제보에 아래를 포함해 주시면 재현이 빨라집니다.

1. Unity 버전과 대상 플랫폼 (VRChat PC / Warudo / 일반 Unity)
2. 렌더 파이프라인 (BRP / URP 12.x)
3. MingToon 버전 (`0.1.7`)
4. Console 로그 전문
5. 재현 순서
