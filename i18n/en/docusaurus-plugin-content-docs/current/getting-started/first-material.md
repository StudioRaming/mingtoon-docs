---
id: first-material
title: Getting Started with Manager
sidebar_position: 2
---

# Getting Started with Manager

> When you finish this page, one avatar is running on MingToon materials.
> It takes about 15 minutes.

## Before you start

- A project that finished [Installation](/getting-started/installation)
- One avatar placed in the scene
- A project backup

## 1. Add Manager to the avatar root

1. Select the topmost object of the avatar in the Hierarchy.
2. Press `GameObject > MingToon > Add MingToon Manager` from the menu.

You are fine when MingToon Manager appears in the Inspector with three tabs.
The tabs are **Get Started** · **Look & Bake** · **Optimize**.

![The Inspector with MingToon Manager on the avatar root and three tabs visible](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-01-add-manager.png | Hierarchy에서 아바타 루트를 고른 상태로 Inspector에 MingToon Manager와 시작하기·룩·베이크·최적화 탭이 보이는 화면 | 1200x700 -->

:::caution[Do not delete it when you are done]
Manager remembers how far upload optimization should treat this as one avatar.
Keep it on the avatar root even when you only edit an outfit.
:::

## 2. Assign the face and skin renderers

Find **1. Assign face & skin renderers** on the **Get Started** tab.

1. Put the face mesh into **Direct Face Renderer**.
2. Put the bare skin mesh into **Direct Skin Renderer**.
3. Press **Mark Roles on the Named Renderers**.

You are fine when the slot list shows `Face` and `Skin`.
Leave the hair and clothing slots as `Regular`.

![The Get Started tab with Face and Skin roles shown in the slot list](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-02-face-skin.png | 시작하기 탭의 "1. 얼굴 · 스킨 대상 지정" 카드에서 슬롯 목록에 Face·Skin·Regular가 표시된 상태 | 1200x700 -->

Leave both fields empty if you only convert hair and clothing.
For details on role assignment, see [Role assignment in detail](/workflow/character-manager#얼굴--피부-지정--가장-중요한-단계).

## 3. Choose the conversion presets

Find **2. Choose look → Convert** on the same tab.

1. Pick **Basic Toon High** in **Look Preset On Convert**.
2. Pick **Keep Existing Values** in **Color Preset**.

Basic Toon High is the reference look that turns depth effects on.
Pick Basic Toon Low for a lighter result.
Keep Existing Values leaves the color and shadow values read from the source untouched.

![Look Preset On Convert and Color Preset selected](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-03-presets.png | 시작하기 탭의 "2. 룩 선택 → 변환" 카드에서 변환 시 룩 프리셋이 베이직툰 High, 색감 프리셋이 기존값 사용인 상태 | 1200x700 -->

## 4. Run the conversion

Press **Convert Child Materials to MingToon** inside the same **2. Choose look → Convert** card.

The source materials are not deleted.
New MingToon authoring materials are created, and only the slots change.

![The result line shown after pressing the convert button](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-04-convert.png | "2. 룩 선택 → 변환" 카드의 하위 재질을 MingToon으로 변환 버튼과 그 아래 변환 결과 줄이 보이는 상태 | 1200x700 -->

## 5. Check the conversion result

Read the `Converted slots` · `Excluded slots` · `Failed slots` counts on the result line.
If failed slots is above 0, check those materials first.
Excluded slots are families like particles that are left alone on purpose.

![The result panel showing converted, excluded, and failed slot counts](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-05-result.png | 변환 결과 패널에 변환된 슬롯·제외한 슬롯·실패한 슬롯 개수가 표시된 상태 | 1200x700 -->

Which materials get excluded is listed in [Slots that are not converted](/workflow/character-manager#변환되지-않는-슬롯).

## 6. Refine in Quick Settings

Select one face material and open **Quick Settings** in the Inspector.

If a row shows `(Module Off)`, press **Turn This Module On** next to it first.

1. Lower **1st Shadow Blur** to 0.05. The default is 0.3.
2. Raise **Outline Width** to 2. The default is 1.
3. Move the saturation in **Base Map HSVG** in steps of 0.05.

You succeeded when the shadow boundary sharpens and the outline thickens.

![A face with the shadow boundary and outline adjusted in Quick Settings](/img/placeholder.png)
<!-- CAPTURE: getting-started/first-material-06-quick-settings.png | 빠른 설정 카드를 펼치고 1차 그림자 번짐과 아웃라인 폭을 조정한 얼굴 클로즈업 | 1200x700 -->

## Check that it worked

- The avatar is not magenta (pink).
- The face slot shows `Face`.
- Failed slots is 0.
- Changing a value in Quick Settings updates the view immediately.

If any item does not match, go to [Troubleshooting](/troubleshooting#conversion).

When you finish editing, run the VRC SDK upload or the WARUDO mod build as usual.
Automatic optimization runs at that point. You do not need to press a manual Bake first.

## What to read next

[Basic Settings](/guides/basics) · [Using the Inspector](/guides/inspector) · [MingToon Manager](/workflow/character-manager)
