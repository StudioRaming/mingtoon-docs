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

0.1.8은 셰이더 파일이 없어 분홍색이 된 재질도 직렬화된 프로퍼티 이름과 값을 읽어 변환합니다. NiloToon·lilToon·Unity Standard 계열의 저장 패턴을 판별하고, 판별 근거를 미리보기에 표시합니다.

Missing Shader 상태에서는 원래 셰이더의 숨은 기본값과 키워드 의미를 전부 복구할 수 없습니다. 변환 후 특히 아래를 직접 확인하세요.

- Surface Mode, Blend, Alpha Clip과 Cutoff
- Cull, Render Queue와 Stencil
- Emission·PBR·Outline 사용 여부
- 마스크 채널과 반전

## 절차

1. 의상 작업에서도 Manager를 항상 아바타 루트에 둡니다.
2. 시작하기에서 Face/Skin 대상을 지정하고 슬롯별 역할과 제외 대상을 확인합니다.
3. Factory 룩을 먼저 고릅니다. 처음 선택의 기본값은 Basic Toon입니다.
4. 색감은 Neutral 또는 원하는 색감 프리셋을 고릅니다. 원본 색감과 보존 대상 그림자 값을 유지하려면 Keep Existing Values를 고릅니다.
5. 필요한 경우 변환 고급 설정에서 출력 경로와 UV4·UV8 소유권·덮어쓰기를 확인합니다.
6. 변환을 실행하고 성공·실패·제외·손실 보고서를 확인합니다. 이미 변환된 재질에는 현재 MingToon 재질에 적용하기를 사용합니다.
7. SceneView·GameView에서 원본과 비교하고 역할·표면·텍스처·그림자를 확인합니다.

일부 재질 변환이 실패하면 해당 원본 슬롯을 유지하고 가능한 다른 재질은 계속 처리합니다. 결과의 실패·제외·손실 항목을 읽고 남은 원본 슬롯을 확인하세요. 유효한 변환 뒤 룩·색감 적용만 실패한 경우에는 그 단계 이전의 변환 값을 유지하고 오류를 기록합니다. 성공한 재질이 있다는 사실을 전체 성공으로 해석하지 마세요.

## 변환 후 확인

- Renderer가 새 편집용 MingToon 재질을 사용하고 원본 에셋은 남아 있는가
- Opaque / Cutout / Transparent와 Blend 결과가 같은가
- Render Queue, Cull과 Stencil이 의도대로인가
- 텍스처 Tiling / Offset, 채널과 반전이 같은가
- PBR·이미션·아웃라인·알파 마스크가 필요한 재질에서 모듈이 켜졌는가
- Face / Skin 역할과 얼굴 프록시가 맞는가

재적용은 **룩 → 색감** 순서입니다. Keep Existing Values는 룩 적용 후 기존 색감과 보존 대상인 그림자 밴드 강도·경계·너비·합성 값을 복원합니다. Surface 정체성과 얼굴 프록시 같은 캐릭터별 보존 대상도 유지하지만, 원본 외형의 완전 일치를 보장하지는 않습니다.

## 원본 복구

밍툰 매니저의 `원본 머티리얼 복구`는 기록된 원본 GUID로 현재 슬롯을 한 Undo 단계에서 되돌립니다. 생성된 변환 재질과 메시 bake 에셋은 자동 삭제하지 않습니다.

## 다음

[밍툰 매니저](/workflow/character-manager) · [빌드 시 자동 최적화](/workflow/build-optimization) · [문제 해결](/troubleshooting)
