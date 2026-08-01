---
id: intro
title: MingToon 소개
sidebar_label: 소개
slug: /
---

# MingToon

MingToon은 Unity 2021.3 LTS용 **캐릭터 툰 셰이더 + 제작 툴셋**입니다. 주 대상은 Built-in Render Pipeline(BRP)이며, Unity 2021.3 + URP 12.x용 선택 백엔드가 함께 들어 있습니다.

현재 버전: **0.1.2-preview** (클로즈 베타)

## 어디부터 읽을까

| 상황 | 문서 |
|---|---|
| 처음 설치한다 | [설치](/getting-started/installation) → [첫 재질 만들기](/getting-started/first-material) |
| 룩을 만들기 시작한다 | [표면과 텍스처](/guides/surface) → [그림자 잡기](/guides/shadow) |
| 기존 lilToon 아바타를 옮긴다 | [lilToon 변환](/workflow/liltoon-conversion) |
| 아바타를 업로드한다 | [빌드 시 자동 최적화](/workflow/build-optimization) |
| 2D 그림자·림이 안 보인다 | [Camera Depth와 2D 효과](/guides/camera-depth) |
| 항목 하나의 의미를 찾는다 | [항목 레퍼런스](/reference/surface) |
| 뭔가 이상하다 | [문제 해결](/troubleshooting) |

## 문서 구조

- **시작하기** — 설치부터 첫 재질까지
- **룩 만들기** — 인스펙터를 실제로 어떤 순서로 만지는지. 작업 흐름 위주
- **내보내기** — 변환 · 빌드 최적화 · Bake
- **플랫폼** — VRChat / Warudo에서 무엇이 되고 안 되는지
- **항목 레퍼런스** — 모든 항목의 의미. **MingToon 인스펙터가 실제로 표시하는 문구를 소스에서 그대로 가져옵니다**

## MingToon이 하는 일

- **툰 셰이딩** — 레이어·마스크·합성 기반 다층 채색, HSVG 색 조정, 최소/최대 밝기 제어
- **그림자 3종** — 형태 그림자(굴곡) · 캐스트 그림자(실시간) · 2D 그림자(화면 깊이), 그리고 이들을 하나로 모으는 통합 그림자
- **외곽선** — 깊이 없이 동작하는 Hull, 깊이를 읽어 안쪽 선까지 그리는 Inner Edge
- **림** — 프레넬 림 라이트, 실루엣 안쪽 림 셰이드, 백라이트·프런트 라이트·글리터
- **스크린톤** — 그림자를 하프톤 망점으로 표현하는 [그림자 패턴](/guides/shadow-pattern)
- **얼굴 전용 처리** — 노멀 누름, 얼굴 영역 마스크/프록시 구, 얼굴 캐스트 안정화, SDF 오소링
- **lilToon 변환** — 기존 아바타 재질을 MingToon 편집용 재질로 이관
- **빌드 시 자동 최적화** — VRChat 업로드·Warudo 모드 빌드·플레이어 빌드에서 실제 쓰는 기능만 남긴 셰이더로 자동 교체 후 복원

## 클로즈 베타 안내

:::warning 이 배포판은 preview입니다
- 검증된 GPU 성능 수치를 공개하지 않습니다.
- VRChat / Warudo는 **테스트 대상**이며 출시 인증이 완료된 상태가 아닙니다.
- 배포 전 [현재 제한과 릴리스](/limitations)를 확인하세요.
:::

버그·질문·피드백: `studioraming@gmail.com`

제보할 때 아래를 함께 적어 주시면 재현이 빨라집니다.

1. Unity 버전과 렌더 파이프라인(BRP / URP 12.x)
2. 대상 플랫폼(일반 Unity / VRChat PC / Warudo)
3. MingToon 버전 (`0.1.2-preview`)
4. Console 로그 전문
5. 재현 순서
