---
id: detail-maps
title: Detail Maps
sidebar_position: 7
---

# Detail Maps

> This page is for people turning on **detail maps** for the first time.
> You layer patterns, bumps and gloss on top of the base color. It takes about 5 minutes.

## What is this

With only a base map, cloth and metal look the same.

Detail maps add layers on top of it for patterns, bumps and gloss.

## When to use it

- When you want to put a logo or pattern on an outfit
- When you want only the metal trim to shine

## Turn it on in 30 seconds

1. Pick one converted material.
2. Turn on **Enable Surface Stack**.
3. Raise **Surface Stack Layer Count** to 1.
4. Put an image into **Additional Texture** on layer 01.

If the image you added shows on top of the base color, it worked.

If nothing changes, go to [conversion troubleshooting](/troubleshooting#conversion).

![A pattern placed in Additional Texture layer 01, layered over the outfit](/img/placeholder.png)
<!-- CAPTURE: guides/detail-maps-01-surface-stack.png | 표면 스택 사용 켜짐 + 레이어 수 1 + 레이어 01에 문양 텍스처가 들어간 인스펙터와 결과 | 1200x700 -->

## How to turn them on — all three modules follow the same order {#켜는-법--세-모듈이-모두-같은-순서}

1. Turn on the module's enable switch.
2. Raise the layer count to the number you need.
3. Put a map into that numbered slot and set its strength.

| Module | Enable switch | Layer count field | Maximum |
|---|---|---|---|
| Additional Texture | **Enable Surface Stack** | **Surface Stack Layer Count** | 10 |
| Normal Maps | **Enable Normal Layers** | **Normal Layer Count** | 5 |
| MatCap | **Enable MatCap Layers** | **MatCap Layer Count** | 5 |

:::danger[You added a map but nothing shows]
Slots past the layer count are skipped entirely.
The result is the same when strength or opacity is 0.
:::

The layer count list only shows 0 to 2 at first.

To use more, press the **Use More Layers (up to N)** button next to the list.

N differs per module. Surface stack is 10, normal is 5, matcap is 5.

## Values you will touch often

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Opacity** | How much one additional texture is layered on | 1 | Lower it and the color below shows through; at 0 the slot is not evaluated |
| **Normal Intensity** | How strong the bumps look | 1 | Raise it and the relief is exaggerated; at 0 it goes flat |
| **Strength** | The gloss amount of one matcap | Leave at default (0.74) | Raise it and it turns shiny; at 0 the slot is not evaluated |
| **Smoothness** | How tightly the reflection gathers | Leave at default (0.5) | Raise it and highlights shrink to points |
| **Specular Intensity** | The strength of all PBR reflection | Leave at default (1) | At 0 the highlights and environment reflection both disappear |
| **Toon Specular Intensity** | The brightness of the cel highlight | Leave at default (0.5) | Raise it and it burns out to white |
| **Occlusion Intensity** | How much the occlusion map darkens | 1 | At 0 adding a map changes nothing |

Every field and its range is in the [Detail Maps reference](/reference/detail-maps).

## Two ways to make gloss

### PBR Surface {#pbr-표면}

Use this when you need physical reflection, like metal, enamel or wet lips.

Turn on **Enable PBR Surface** and choose a **Workflow**.

Metallic builds the reflection color from **Metallic**; Specular specifies the color directly.

Turn on **Use Packed Mask** to read per channel from a single texture.

The default layout is R for metallic, G for occlusion, A for smoothness.

:::caution[If you turn Use Packed Mask off]
Every channel and invert setting below is ignored.
Only the metallic and smoothness slider values are used.
:::

### Toon Specular {#툰-스페큘러}

This adds only a light-direction highlight without turning on all of PBR.

It suits hair, eyes and the thin sheen on cloth.

Turn on **Enable Toon Specular** and choose a **Toon Specular Mode**.

Isotropic makes a round highlight, like an eye or a metal button.

Anisotropic makes a long flowing band, like hair.

Shape it with **Toon Specular Threshold** and **Toon Specular Softness**.

#### A different highlight color per area {#하이라이트-색을-부위마다-다르게}

Change **Toon Specular Color Source** to `Mask Texture Color`.

The RGB colors you painted into the mask then become the highlight colors.

**Toon Specular Mask Color Amount** sets how much is mixed in.

The mask is already being read, so this costs no extra texture read.

## Region Mask {#영역-마스크}

Split the areas inside one material into four RGBA regions and adjust each separately.

1. Turn on **Enable Region Mask**.
2. Put an RGBA texture into the region mask slot.
3. Raise each region's adjustment a little at a time from 0.

:::caution[There has to be something to adjust]
The region mask adjusts surface response.
If PBR Surface and Toon Specular are both off, nothing happens.
:::

![Four RGBA channels of a region mask dividing an outfit into cloth, leather, metal and label](/img/placeholder.png)
<!-- CAPTURE: guides/detail-maps-02-region-mask.png | 영역 마스크 사용 켜짐 + RGBA 마스크 텍스처와 네 영역 보정 슬라이더 | 1200x700 -->

## Glow and sparkle {#발광과-반짝임}

Turn on **Enable Emission** and set the map, color and intensity.

If **Emission Color** is black, it will not glow even with a map.

For **Enable Glitter**, set **Glitter Color** first and then **Glitter Intensity**.

### Changing the particle shape {#입자-모양-바꾸기}

Turn on **Enable Shape Map** and put a texture into **Shape Map**.

`Textures/Glitter/` contains 6 shapes such as stars and hearts.

**Shape Channel** defaults to A; use R or luminance for black-and-white images.

To stand a directional shape upright, lower **Rotation Randomize** to 0.

## Master Adjust and performance distance {#마스터-조정과-성능-거리}

**Performance Distance (m)** and **Performance Distance Scale** are shader features.

You can always edit them without the paid add-on.

The boundary is the two values multiplied, and beyond it only basic shading remains.

The rest of the Master Adjust rows come from Ming Light Controller.

## Common problems

| Symptom | Cause | Fix |
|---|---|---|
| Added a map but it does not show | The layer count is lower than that slot number | Raise the layer count |
| No highlight at all | Specular Intensity is 0 | Set Specular Intensity back to 1 |
| The glow does not show | Emission Color is black | Raise the color closer to white |

## More detail

- [Detail Maps reference](/reference/detail-maps) — every field and range
- [Shared Texture Slot UI](/guides/texture-modules) — mask, HSVG and UV controls
- [Tiled Material Composer](/guides/tiled-materials) — region masks from one window
