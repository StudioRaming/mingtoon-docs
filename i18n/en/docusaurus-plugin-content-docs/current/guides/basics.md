---
id: basics
title: Basic Settings
sidebar_position: 2
---

# Basic Settings

> This page is for anyone setting the color and brightness of a converted material for the first time.
> It covers surface mode, base color, and light response in order. It takes about 10 minutes.

## What is this

You decide how transparent the character is, what color it is, and how strongly it reacts to light.
These are split between the **Base Color & Transparency** group and the **Basic Settings** group in the inspector.
Shadow boundaries and outlines are covered in other documents, not here.

## When to use it

- When the character is too dark or blown out right after conversion
- When hair tips look cut off into square edges
- When world light color mixes too strongly into the skin

## Try it in 30 seconds

1. Select a converted body material.
2. Open **Lighting** in the **Basic Settings** group of the inspector.
3. Raise **Minimum Final Brightness** from 0.2 to 0.5.

You succeeded when the dark side lifts.
If nothing changes, see [Using the Inspector](/guides/inspector#전체-효과--가장-위의-마스터-스위치).

## How to turn it on

Decide **Surface Mode** first, then the base color, then the brightness.
If you touch a later step before settling an earlier one, you cannot tell the causes apart.

### 1. Decide the surface mode first {#1-표면-모드부터-정합니다}

Pick the value that fits the part in **Surface Mode** under **Surface Rendering**.

| Display | Parts that use it | Depth and overlap |
|---|---|---|
| Opaque (2000) | Ordinary skin and clothing | Writes depth without alpha blending |
| Cutout (2450) | Hair, eyelashes | Discards pixels thinner than the cutoff; the rest writes depth |
| Semi-Transparent (2499) | Parts that use alpha but need the nearer face to win | Writes depth, so it becomes a target of Depth Shadow |
| Transparent (3000) | Layered cloth, glass | Does not use depth, so layers behind show through |

Switching to Semi-Transparent alone does not guarantee depth effects.
Also check the camera depth setup and the effect module. The steps are in [Depth Effects](/guides/depth-effects).

**Transparent Depth Prepass** appears only on Transparent (3000).
It handles transparent sorting and outlines, and it is a different contract from camera depth.

**Camera Depth Contribution** decides whether other materials read this material as an occluder.
Turning it off removes this material from other materials' Depth Shadow, SSAO, and Depth Rim Light.
This checkbox does not prepare the depth texture for you.
The depth texture is the camera's measurement of what is how far in front.

Choose front faces only, back faces only, or both in **Visible Faces**.
Use both faces for cloth or skirts where both sides must be visible.
If back-face lighting looks wrong, check **Flip Backface Lighting Normal**.
If jagged edges on folded cloth bother you, turn on **Two-Pass Mode**.

### 2. Base color and textures {#2-베이스-색}

**Base Surface** covers textures and color correction.

- **Base Map** — the source texture of the surface.
- **Base Map HSVG** — adjusts hue, saturation, value, and gamma in one place.
- **Hue Rotation Space** — the default OKLab rotates hue while keeping brightness.
- **Base Tint** · **Tint Blend Mode** — the default Multiply keeps the light and shade of the map.
- **Base Map Opacity** — multiplies the surface alpha last.

Turning on **Gradation LUT** remaps color through a horizontal ramp.
Import the ramp texture as sRGB and set the amount with **Gradation Strength**.

#### Correcting color on part of the surface only {#색조보정-범위-마스크}

Turn on **Use Color Adjust Mask** in **Color Adjust Mask** and add a mask.
White applies the correction, black keeps the original, and gray sits between them.

:::caution[The mask uses its own tiling and offset]
Moving the base map does not move the mask with it.
Check by eye that it landed on the area you wanted, such as eyes or skin.
:::

### 3. Brightness and light color

Open **Lighting** in the **Basic Settings** group of the inspector and start from the items below.

If dark places go pure black, raise **Indirect Light Lift** and **Minimum Final Brightness**.
If color blows out in bright places, lower **Lit Brightness** and **Maximum Final Brightness**.
Do not try to fix darkness by raising **Preserve Base Map Color** alone. It does not raise brightness.

Adjust the influence of point and spot lights with **Additional Light Reception**.

![A character whose shape is lost in a dark scene at the default Minimum Final Brightness](/img/placeholder.png)
<!-- CAPTURE: guides/basics-01-brightness-before.png | 어두운 씬에서 최종 최소 밝기 0.2로 렌더해 캐릭터가 거의 검게 묻힌 상태 | 1200x700 -->

![The same scene with Minimum Final Brightness raised so the shape is visible](/img/placeholder.png)
<!-- CAPTURE: guides/basics-02-brightness-after.png | 같은 씬과 같은 카메라에서 최종 최소 밝기만 0.5로 올린 상태 | 1200x700 -->

### 4. Shared maps {#4-공통-맵}

Normal maps handle surface relief, and occlusion maps handle indirect light blocking.
Adding the texture is not enough. You must also turn on the matching module and its strength.
Extra normal layers, MatCaps, emission, and PBR continue in [Detail Maps](/guides/detail-maps).

## Values you will touch often

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Surface Mode** | How transparency and overlap are handled | Opaque (2000) for skin and clothing | Cutout clips the edge, and Transparent shows the layers behind |
| **Lit Brightness** | The brightness multiplier of lit faces | Leave at the default (1) | Raising it blows out bright areas, and lowering it sinks everything |
| **Indirect Light Lift** | How much ambient indirect light lifts dark faces | Leave at the default (1) | Raising it brightens shade, and 0 uses no indirect light |
| **Minimum Final Brightness** | The floor brightness kept no matter how dark it gets | 0.5 in dark worlds (default 0.2) | Raising it keeps the shape visible in dark worlds, and 0 sinks to pure black |
| **Environment Color Influence** | How much environment color bleeds into the surface | Leave at the default (0.3) | Raising it follows the world tint, and 0 keeps the original color |
| **Base Map Opacity** | The value multiplied into the final surface alpha | Leave at the default (1) | Lowering it makes the surface show through, and it has no effect in Opaque mode |
| **Alpha Cutoff** | The alpha boundary to clip at | 0.5 in Cutout | Raising it shaves the edge, and lowering it leaves translucent leftovers |

## Common problems

### I changed the base color and the view stayed the same
Check **Tint Blend Mode**. Multiplying white in Multiply changes nothing.

### I lowered the opacity and it did not become transparent
Opaque (2000) does not blend even if you lower alpha. Change the surface mode first.

### Hair shows through the cheek
Choose between the depth priority of Semi-Transparent (2499) and the layer blending of Transparent (3000) first. Then see [Troubleshooting](/troubleshooting#depth).

## More detail

[Light and Shadow](/guides/light-and-shadow) · [Basic Settings Reference](/reference/basics) · [Using the Inspector](/guides/inspector) · [Ming Light Controller](/guides/ming-light-controller)
