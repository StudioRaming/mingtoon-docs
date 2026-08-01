---
id: liltoon-conversion
title: lilToon 재질 변환
sidebar_position: 1
---

# lilToon 재질 변환

**이 문서를 마치면** 기존 lilToon 아바타가 MingToon 편집용 재질로 바뀌고, 무엇이 손실되었는지 알게 됩니다.

## 변환이 하는 일과 하지 않는 일

- **원본 재질을 보존합니다.** 새로 만들어지는 것은 편집용 MingToon 재질입니다.
- 베이스, 표면 모드, AO, 노멀, 맷캡, 레이어와 마스크의 **많은 값**을 옮깁니다.

:::caution 룩의 완전 일치는 보장하지 않습니다
서로 다른 셰이더는 수식과 기능의 의미가 같지 않습니다. 변환은 **상호 운용 도구**이지 다른 셰이더를 수학적으로 복제하는 기능이 아닙니다.
:::

## 절차

1. 아바타 또는 의상의 **최상위 GameObject**를 선택합니다.
2. `GameObject > Studio Raming > MingToon > Add Character Controller`를 실행합니다.
3. **얼굴로 사용할 Renderer / 머티리얼 슬롯을 명시적으로 지정합니다.**
4. 변환 출력 경로와 옵션을 확인한 뒤 변환합니다.
5. 완료 로그의 `lossy` / `unsupported` 항목을 **전부 읽고** 원본과 비교합니다.

{/* SCREENSHOT: Add Character Controller 인스펙터 */}

:::danger 3번 단계를 건너뛰지 마세요
얼굴 자동 판정은 **보조 수단**입니다. 이름만으로 완전한 판정을 보장하지 않습니다. 얼굴 슬롯이 잘못 잡히면 얼굴 그림자 안정화가 엉뚱한 메시에 걸리거나, 정작 얼굴에 안 걸립니다.
:::

## 변환 후 확인

**이렇게 되면 정상입니다.** 지정한 출력 경로에 MingToon 편집용 재질이 생기고, Renderer 슬롯이 그 재질로 교체되며, 원본 재질은 그대로 남아 있습니다.

완료 로그를 읽은 뒤 실제 모델에서 아래를 확인하세요. 인스펙터 프리뷰 구체로는 판단할 수 없습니다.

- 마스크 채널과 반전
- 텍스처 ST (Tiling / Offset)
- AO
- 표면 모드 (Opaque / Cutout / Transparent)
- 얼굴 슬롯 판정

## 다음

룩을 다 잡았으면 [빌드 시 자동 최적화](/workflow/build-optimization)으로 배포 준비를 합니다.
