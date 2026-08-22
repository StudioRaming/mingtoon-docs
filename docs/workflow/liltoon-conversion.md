---
id: liltoon-conversion
title: lilToon 재질 변환
sidebar_position: 1
---

# lilToon 재질 변환

:::tip[실제 작업은 밍툰 매니저에서 합니다]
Face / Skin / Common 역할, 변환 룩, 출력 경로, 원본 복구와 손실 보고서를 한곳에서 처리합니다. → [밍툰 매니저](/workflow/character-manager#1--변환)
:::

## 변환이 하는 일과 하지 않는 일

- 원본 재질은 보존하고 편집용 MingToon 재질을 새로 만듭니다.
- 베이스 색·텍스처, HSVG, 노멀, 이미션, 오클루전, PBR, 맷캡, 2nd/3rd 레이어와 마스크를 가능한 범위에서 옮깁니다.
- 스텐실, 렌더 큐, Cull과 Opaque / Cutout / Fade / Premultiply 같은 표면 상태를 보존합니다.
- 소스에 실제 데이터가 있으면 PBR·이미션·서페이스 스택·아웃라인·알파 마스크 모듈도 함께 켭니다.
- 대응할 수 없는 기능은 손실 보고서에 `lossy` 또는 `unsupported`로 남깁니다.

:::caution[룩의 완전 일치는 보장하지 않습니다]
두 셰이더의 수식과 기능 의미는 다릅니다. 변환은 출발점을 만드는 상호 운용 도구이며 수학적 복제 기능이 아닙니다.
:::

## Missing Shader 재질 복구 변환 {#missing-shader}

0.1.7은 셰이더 파일이 없어 분홍색이 된 재질도 직렬화된 프로퍼티 이름과 값을 읽어 변환합니다. NiloToon·lilToon·Unity Standard 계열의 저장 패턴을 판별하고, 판별 근거를 미리보기에 표시합니다.

Missing Shader 상태에서는 원래 셰이더의 숨은 기본값과 키워드 의미를 전부 복구할 수 없습니다. 변환 후 특히 아래를 직접 확인하세요.

- Surface Mode, Blend, Alpha Clip과 Cutoff
- Cull, Render Queue와 Stencil
- Emission·PBR·Outline 사용 여부
- 마스크 채널과 반전

## 절차

1. 아바타 또는 의상의 루트에 MingToon Manager를 붙입니다.
2. 변환 미리보기에서 소스 스키마와 제외 슬롯을 확인합니다.
3. Face / Skin / Common 역할을 슬롯별로 명시합니다. Auto는 원본이 가진 직접 플래그만 신뢰합니다.
4. 변환 룩 프리셋과 출력 경로를 고릅니다.
5. 기존 UV4·UV8 소유권과 덮어쓰기 옵션을 확인합니다.
6. 변환을 실행하고 손실 보고서의 모든 항목을 읽습니다.
7. 실제 캐릭터를 SceneView·GameView에서 원본과 비교합니다.

파티클·굴절·퍼/쉘·오디오 반응·플립북·오버레이·보조 패스처럼 1:1 대응이 없는 슬롯은 의도적으로 원본을 유지합니다.

## 변환 후 확인

- Renderer가 새 편집용 MingToon 재질을 사용하고 원본 에셋은 남아 있는가
- Opaque / Cutout / Transparent와 Blend 결과가 같은가
- Render Queue, Cull과 Stencil이 의도대로인가
- 텍스처 Tiling / Offset, 채널과 반전이 같은가
- PBR·이미션·아웃라인·알파 마스크가 필요한 재질에서 모듈이 켜졌는가
- Face / Skin 역할과 얼굴 프록시가 맞는가

룩 프리셋을 다시 적용해도 0.1.7은 Surface 정체성과 얼굴 프록시처럼 캐릭터별 값을 보존합니다.

## 원본 복구

밍툰 매니저의 `원본 머티리얼 복구`는 기록된 원본 GUID로 현재 슬롯을 한 Undo 단계에서 되돌립니다. 생성된 변환 재질과 메시 bake 에셋은 자동 삭제하지 않습니다.

## 다음

[밍툰 매니저](/workflow/character-manager) · [빌드 시 자동 최적화](/workflow/build-optimization)
