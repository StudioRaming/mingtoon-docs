---
id: validator
title: Validate Project 코드
sidebar_position: 8
---

# Validate Project

Tools > Studio Raming > MingToon > Validate Project에서 나온 코드로 찾으세요. 검사는 결과를 보고하며 자동 수정하지 않습니다. **경고와 오류의 분류는 현재 Validator 코드 기준**입니다. 경고도 실제 룩이나 빌드에 영향을 줄 수 있으므로 내용을 확인하세요.

## MING-ENV-UNITY-VERSION {#ming-env-unity-version}

**오류.** Unity가 지원 스트림 2021.3·2022.3 밖입니다. 대상 플랫폼에 맞는 지원 에디터를 사용하세요.

## MING-VRC-UNITY-VERSION {#ming-vrc-unity-version}

**경고.** VRC SDK가 감지됐지만 MingToon의 VRChat 연동에 맞는 Unity 스트림이 아닙니다. 패키지 규칙은 2022.3.22f1을 기준으로 기록되어 있습니다. 프로젝트 이동 전 VCC와 현재 SDK의 Unity 안내를 확인하세요.

## MING-ENV-BUILD-TARGET {#ming-env-build-target}

**오류.** 현재 빌드 대상이 지원 범위 밖입니다. Windows·macOS·Linux 데스크톱 대상과 그래픽 API를 확인하세요. Android/Quest·iOS·WebGL은 MingToon 직접 출력 대상이 아닙니다.

## MING-PIPELINE-UNSUPPORTED {#ming-pipeline-unsupported}

**오류.** 활성 파이프라인이 Built-in 또는 지원 URP가 아닙니다. Graphics와 현재 Quality의 Render Pipeline Asset을 확인하세요.

## MING-URP-VERSION-UNSUPPORTED {#ming-urp-version-unsupported}

**오류.** 설치된 URP 버전이 백엔드의 지원 범위 밖입니다. 지원 환경 문서와 설치된 백엔드의 요구 버전을 맞추세요.

## MING-SHADER-MISSING {#ming-shader-missing}

**오류.** 필요한 셰이더를 찾지 못했습니다. 설치 경로·백엔드·Console 컴파일 오류를 확인하고 설치한 패키지 관리 경로로 복구하세요.

## MING-SHADER-UNSUPPORTED {#ming-shader-unsupported}

**오류.** 셰이더가 현재 환경에서 지원되지 않습니다. 셰이더 컴파일 오류, GPU·Graphics API와 파이프라인 일치를 확인하세요.

## MING-SHADER-PASS-MISSING {#ming-shader-pass-missing}

**오류.** 백엔드가 요구하는 패스가 빠져 있습니다. 보고된 패스와 설치 버전을 확인하고 셰이더·에디터 파일을 같은 릴리스로 복구하세요.

## MING-SHADER-PROPERTY-MISSING {#ming-shader-property-missing}

**오류.** 에디터가 기대하는 프로퍼티가 없습니다. 부분 업데이트나 서로 다른 버전의 파일 혼합을 확인하세요.

## MING-SHADER-FRESNEL-AREA-RANGE {#ming-shader-fresnel-area-range}

**오류.** 영역 조절 프로퍼티가 기대하는 Range(0, 1) 규약과 다릅니다. 보고된 프로퍼티와 릴리스 셰이더를 비교해 복구하세요.

## MING-SHADER-PERF-DISTANCE-RANGE {#ming-shader-perf-distance-range}

**오류.** 성능 거리 범위가 잘못됐습니다. _PerfDistanceMax는 Range(1, 50), _PerfDistanceScale은 Range(0, 2)여야 합니다. 일치하는 릴리스 파일로 복구하세요.

## MING-MAT-NON-FINITE {#ming-mat-non-finite}

**경고.** 재질 수치에 NaN 또는 Infinity가 있습니다. 보고된 프로퍼티를 유한한 값으로 되돌린 후 렌더링·베이크를 확인하세요.

## MING-MAT-COLOR-MASK-ZERO {#ming-mat-color-mask-zero}

**경고.** 컬러 마스크가 0이라 컬러 채널을 쓰지 않습니다. 의도한 특수 설정이 아니라면 표면 렌더링의 고급 컬러 버퍼에서 RGBA(15)로 복구하세요.

## MING-MAT-OPAQUE-ZWRITE-OFF {#ming-mat-opaque-zwrite-off}

**경고.** 불투명 큐에서 ZWrite가 꺼져 있습니다. 다른 표면과 가림 관계가 어긋날 수 있으므로 표면 모드를 다시 선택하거나 의도한 깊이 설정인지 확인하세요.

## MING-MAT-TRANSPARENT-DEPTH-EFFECTS {#ming-mat-transparent-depth-effects}

**경고.** 일반 투명 큐에서 깊이 효과가 켜져 있습니다. 자기 깊이와 정렬을 실제 카메라에서 확인하세요. 필요하면 효과를 끄거나 반투명·컷아웃 등 적절한 표면 모드로 바꾸되 뒤쪽 레이어가 가려지는지도 확인합니다.

## MING-MAT-CUTOUT-CUTOFF-ZERO {#ming-mat-cutout-cutoff-zero}

**경고.** 컷아웃 임계값이 0이라 투명 텍셀도 남을 수 있습니다. 텍스처 알파를 확인하고 컷오프를 올리세요. 0.5는 비교용 시작점입니다.

## MING-MAT-PERF-DISTANCE-ZERO {#ming-mat-perf-distance-zero}

**경고.** 성능 거리×배율이 0이라 모든 거리에서 가장 가벼운 단계가 적용됩니다. 여러 효과가 보이지 않을 수 있습니다. MLC가 제어할 의도된 값인지 확인하고, 그렇지 않다면 성능 거리 배율을 올리세요.

## MING-URP-DEPTH-FEATURE-MISSING {#ming-urp-depth-feature-missing}

**오류.** 깊이 효과용 URP Renderer Feature가 없거나 비활성입니다. 지원 URP 백엔드 설치 후 활성 URP Asset의 Renderer Data들을 확인하고 Install Depth Effects Renderer Feature 메뉴를 사용하세요.

## MING-URP-OUTLINE-FEATURE-MISSING {#ming-urp-outline-feature-missing}

**오류.** 아웃라인용 URP Renderer Feature가 없거나 비활성입니다. 실제 카메라가 쓰는 Renderer Data와 Install Outline Renderer Feature 메뉴를 확인하세요.

## MING-BAKE-GENERATOR-OUTDATED {#ming-bake-generator-outdated}

**경고.** Manifest의 생성기 버전이 현재보다 오래됐습니다. 이전 결과가 보이더라도 새 수정은 반영되지 않았을 수 있습니다. 해당 아바타의 베이크 상태와 복원 정보를 확인한 뒤 다시 베이크하세요.

## MING-RUNTIME-PROVIDER-MISSING {#ming-runtime-provider-missing}

**오류.** 깊이 공급자 타입이나 필수 메서드가 없거나 예상 구조와 다릅니다. 설치 파일과 컴파일 오류를 확인하세요. 이 코드는 타입 검증이며 모든 실제 카메라에서 깊이가 없음을 증명하지는 않습니다.

## MING-SCENE-NO-CAMERA {#ming-scene-no-camera}

**경고.** 검사할 로드된 Game 카메라가 없습니다. 실제 대상 씬을 열고 다시 확인하세요.

## MING-SCENE-CAMERA-DEPTH-OFF {#ming-scene-camera-depth-off}

**경고.** 검사한 Game 카메라가 깊이 텍스처를 요청하지 않습니다. 일반 Unity/WARUDO는 깊이 공급자 설정을 확인하세요. VRChat은 플랫폼 문서의 호스트 카메라 조건을 따릅니다.

검사 통과는 실제 화면·업로드 성공을 보장하지 않습니다. 문제를 수정한 뒤 해당 검사와 실제 작업 결과를 함께 확인하세요.

[VRChat](/platforms/vrchat) · [URP / Compatibility](/platforms/compatibility) · [Basic](/guides/basics)
