---
id: light-and-shadow
title: Light and Shadow
sidebar_position: 3
---

# Light and Shadow

> This page is for anyone setting up **Form Shadow** for the first time.
> It makes the light and shade boundary on the character look like cel animation. It takes about 5 minutes.

## What is this

MingToon has three kinds of shadow.
Each uses different sliders, so tell them apart first.

| Kind | Inspector section | What creates it |
|---|---|---|
| Form shadow | **Form Shadow** | The character's own curvature. The core of the toon look |
| Projected shadow | **Shadow Projection** | Real-time shadows cast by other objects and by itself |
| Depth shadow | **Depth Shadow** | Bang shadows drawn from screen depth |

![A character with only Form Shadow on, next to one with all three shadows on](/img/placeholder.png)
<!-- CAPTURE: guides/light-and-shadow-01-three-shadows.png | 같은 캐릭터 상반신, 형태 그림자만 / 투영 그림자만 / 뎁스 그림자만 켠 3컷 | 1200x700 -->

## When to use it

- When light and shade is blurry right after conversion and you want a sharp boundary.
- When overlapping shadows clump into pure black.
- When the character sinks into black in a dark world.

## Try it in 30 seconds

1. Select a converted body material.
2. Turn on **Form Shadow**.
3. Lower **1st Shadow Blur** to 0.01.
4. Lower **1st Shadow Brightness** to 0.7.

You succeeded when the light and shade boundary falls into a single line.
If nothing changes, go to [Troubleshooting](/troubleshooting#shadow).

![A face at 1st Shadow Blur 0.3 next to the same face at 0.01](/img/placeholder.png)
<!-- CAPTURE: guides/light-and-shadow-02-blur-before-after.png | 같은 얼굴, 1차 그림자 번짐 0.3(전) / 0.01(후) 2컷 | 1200x700 -->

## How to turn it on

### 1. Start with the form shadow boundary {#1-형태-그림자-경계--가장-먼저}

**1st Shadow Blur** is the value you will touch most often in this product.
Near 0.001 it is cel animation, and above 0.3 it is a gradient.
Set the character of the look with this one value, then move on.

### 2. Collect shadow colors into one {#통합-그림자--겹칠-때-새까매지는-문제}

When the three shadows overlap in one place, it darkens three times.
Turning on **Enable Unified Shadow** in the **Shadow Color** section collapses them into one color.
The alpha of **Unified Shadow Color** is the amount applied. Alpha 0 changes nothing.

:::note[What unifying keeps and what it ignores]
The shape of the shadow boundary and the [shadow pattern](/guides/shadow-pattern) are kept as they are.
Per-layer color, blend, and brightness values are not applied to the render, only preserved.
:::

### 3. Different shadow colors per part {#그림자-컬러맵}

To make hair red and skin yellow, turn on **Shadow Color Map**.
White is the reference value, so nothing changes right after you turn it on.
You must raise **Color Map Amount** for the painted color to appear.

:::caution[It is not read while Unified Shadow is off]
With Unified Shadow off, the shader does not read this texture at all.
Each layer already has its own color, so there is nothing to distribute.
:::

### 4. Refine the projected shadow {#4-그림자-투영-캐스트-섀도우}

If **Receive Intensity** in the **Shadow Projection** section is 0, every value below it is ignored.
Set this value to 1 first.
If the shadow flows too softly, raise **PBR / Toon Blend** to 1 to cut it into toon bands.

### 5. Handling dark worlds {#라이팅--어두운-씬에서-검게-뭉칠-때}

Avatar creators cannot control the lighting of a VRChat world.
**Indirect Light Lift** in the **Lighting** section lifts dark faces.
The 0.1.11 defaults are **Environment Color Influence** 1, **Preserve Base Map Color** 0.1 and **Minimum Final Brightness** 0.2.
If colored lighting is too strong, lower **Scene Light Color Influence** to bring it closer to white.

## Values you will touch often

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **1st Shadow Blur** | The blur width of the light and shade boundary | 0.01 | Raising it bleeds softly, and lowering it makes an ink line |
| **1st Shadow Brightness** | The brightness multiplier of the 1st shadow color | 0.7 | Lowering it darkens, and 1 leaves the base color as it is |
| **Enable Unified Shadow** | Collects the three shadows into one color | On | On stops overlaps from darkening, and off brings per-layer colors back |
| **Receive Intensity** | How much projected shadow is received | Leave at the default (1) | 0 removes the projected shadow and every value below it |
| **Self Shadow Caster Bias** | Pushes self shadows off the surface | 0.02 | Raising it removes blotches, and raising it too far lifts contact shadows |
| **Indirect Light Lift** | How much ambient light lifts dark faces | Leave at the default (1) | Raising it clumps less in dark worlds, and 0 sinks to black |
| **Boundary Width** | The width of the color band laid on the light and shade boundary | 0.5 | Raising it thickens the band, and 0 draws no band at all |

## Common problems

### A character-shaped shadow overlaps the body in backlight {#역광에서-몸에-캐릭터-모양-그림자가-겹칠-때}

Your own silhouette appears once more on faces turned away from the light.
Turn on **Suppress Backlit Silhouette** in **Shadow Projection**.
Set the point where erasing starts with **Backlit Suppression Offset**.

### Depth Shadow and its color do not match {#2d-그림자와-색이-따로-놀-때}

Only the bang shadow looks off in color.
Turn on **Unify With Depth Shadow** in **Shadow Projection**.
The two shadows then use the same color, and overlaps do not darken twice.

### A shadow sweeps across the face {#얼굴의-스치는-그림자}

The face needs different rules from the body.
Choose **Shadow Mode** in [Character Rendering](/guides/character#4단계-앞머리-그림자).
If it gets worse, see [Troubleshooting](/troubleshooting#face).

## More detail

- Every item and its range: [Light and Shadow Reference](/reference/light-and-shadow)
- Turning shadows into comic halftone: [Shadow Pattern (Screentone)](/guides/shadow-pattern)
- Making bang shadows: [Depth Effects](/guides/depth-effects#2d-그림자)
- Face-only shading: [Character Rendering](/guides/character#페이스-셰이딩)
