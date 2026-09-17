---
id: intro
title: MingToon 소개
sidebar_label: 소개
slug: /
---

# MingToon

> 이 페이지는 MingToon이 무엇인지 설명합니다.
> 바로 시작하려면 [설치](/getting-started/installation)로 가세요.

## 한 줄 요약

MingToon은 VRChat과 Warudo 아바타를 위한 캐릭터 툰 셰이더입니다.
얼굴 그림자, 표면의 색과 질감, 실루엣을 한 인스펙터에서 다룹니다.
재질은 하나씩 만들고, 아바타 전체는 MingToon Manager로 맞춥니다.

## 처음이라면 이 순서로

1. [설치](/getting-started/installation) — Unity 버전을 맞추고 패키지를 넣습니다.
2. [Manager로 처음 시작하기](/getting-started/first-material) — 아바타 한 대를 변환합니다.
3. [기본 설정 가이드](/guides/basics) — 색과 밝기를 잡습니다.
4. [조명과 그림자](/guides/light-and-shadow) — 그림자 경계를 다듬습니다.

## 무엇이 달라지나

![같은 아바타 얼굴을 변환 전과 변환 후로 나란히 렌더한 비교 이미지](/img/placeholder.png)
<!-- CAPTURE: intro/intro-01-before-after.png | 같은 아바타의 상반신을 변환 전 원본 셰이더와 변환 후 MingToon으로 나란히 렌더한 2분할 | 1200x700 -->

### 그림자를 세 종류로 나눠 씁니다

표면의 굴곡이 만드는 그림자는 **형태 그림자**입니다.
실시간 라이트가 드리우는 그림자는 **그림자 투영**입니다.
카메라가 재는 앞뒤 정보를 읽는 그림자는 **뎁스 그림자**입니다.
자세한 것은 [조명과 그림자](/guides/light-and-shadow)와 [깊이 기반 효과](/guides/depth-effects)를 보세요.

### 색과 질감을 층으로 쌓습니다

텍스처, 노멀맵, 맷캡(구슬 그림 한 장으로 광택을 흉내 내는 방식)을 겹칩니다.
마스크(효과를 적용할 부분만 흰색으로 칠한 흑백 이미지)로 범위를 나눕니다.
자세한 것은 [디테일 맵](/guides/detail-maps), [그림자 패턴 (스크린톤)](/guides/shadow-pattern), [아웃라인](/guides/outline)을 보세요.

### 업로드할 때 자동으로 가벼워집니다

편집 중에는 모든 기능을 켤 수 있는 무거운 셰이더를 씁니다.
VRC SDK 업로드나 WARUDO 모드 빌드를 실행하면 쓰는 기능만 남깁니다.
자세한 것은 [빌드 시 자동 최적화](/workflow/build-optimization)를 보세요.

## 인스펙터 그룹과 문서

| 인스펙터 그룹 | 문서 |
|---|---|
| 기본 색상과 투명도 | [기본 설정 가이드](/guides/basics) · [기본 설정 레퍼런스](/reference/basics) |
| 그림자 | [조명과 그림자](/guides/light-and-shadow) · [레퍼런스](/reference/light-and-shadow) |
| 림과 보조광 | [림](/guides/rim) · [레퍼런스](/reference/rim) |
| 화면 공간 효과 | [깊이 기반 효과](/guides/depth-effects) · [레퍼런스](/reference/depth-effects) |
| 발광과 특수 효과 · 재질과 광택 | [디테일 맵](/guides/detail-maps) · [레퍼런스](/reference/detail-maps) |
| 얼굴과 외곽선 | [캐릭터 표현](/guides/character) · [아웃라인](/guides/outline) |

:::info[현재 배포는 BRP 오픈 베타입니다]
Built-in Render Pipeline 본체만 배포합니다.
VRChat 클라이언트 동작과 실제 업로드는 아직 검증 중입니다.
[현재 제한과 릴리스](/limitations)를 먼저 읽어 주세요.
:::

<details><summary>오픈 베타 조건과 라이선스</summary>현재 오픈 베타의 상업 이용은 금지됩니다. <a href="/legal/beta-license">라이선스 및 상업 사용 안내</a></details>

## 도움 받을 곳

[오픈 베타 참여 안내](https://studioraming.github.io/mingtoon-site/ko/download/) · [BOOTH 상품](https://raming.booth.pm/items/8810209) · [공식 Discord 서버](https://discord.gg/Zsj6pkWKKs)

버그는 Discord의 버그 제보 채널로 보내 주세요.
아래 다섯 가지를 같이 적으면 재현이 빨라집니다.

1. Unity 버전과 대상 플랫폼 (VRChat PC / Warudo / 일반 Unity)
2. 렌더 파이프라인 (BRP / URP 12.x)
3. MingToon 버전 (Manager 시작하기 탭의 **업데이트 설정** 표시값)
4. Console 로그 전문
5. 재현 순서
