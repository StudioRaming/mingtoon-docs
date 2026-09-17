---
id: rim
title: Rim
sidebar_position: 3
---

# Rim

These fields bring out the silhouette and separate the character from the background. Stack them and it gets overdone fast.

This page is a table for looking up values. If you want the order to turn things on in, see the [Rim guide](/guides/rim).

The headings and order follow the inspector's section names and display order exactly.

The fields inside map and mask slots are the same in every slot.

Channel, remap, feather and mask UV are written once in the [Shared Texture Slot UI](/guides/texture-modules).

## Rim Shade {#림-셰이드}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Rim Shade** | Toggle | - | Off | Off by default |
| **Shadow Contribution Intensity** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Width** | Float | 0 ~ 1 | 0.2 | Range 0-1; default 0.2 |
| **Softness** | Float | 0 ~ 1 | 0.4 | Range 0-1; default 0.4 |
| **Normal Map Influence** | Float | 0 ~ 1 | 1 | 0 = mesh normal, 1 = fully stacked normal maps |
| **Enable Rim Shade Mask** | Toggle | - | Off | - |

## Rim Light {#림-라이트}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Fresnel Rim** | Toggle | - | On | On by default |
| **Fresnel Rim Color** | Color | - | 2.67, 2.67, 2.67, 1 | HDR rim-light color; default is (26.17, 26.17, 26.17) |
| **Fresnel Rim Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Overlay | Chooses Normal, Multiply, Add, Screen, Color, or Overlay for… |
| **Blend Opacity** | Float | 0 ~ 1 | 1 | How strongly the fresnel rim blends in |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation after the base color and Fresnel-rim tint are… |
| **Intensity** | Float | 0 ~ 20 | 1 | Range 0-20; default 0.52 |
| **Enable Fresnel Rim Mask** | Toggle | - | Off | - |
| **Width** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0 |
| **Softness** | Float | 0 ~ 1 | 0.2 | Range 0-1; default 0.64 |
| **Light-Side Emphasis** | Float | 0 ~ 1 | 0.8 | 0 keeps rim brightness uniform around the form; 1 keeps only… |
| **View Alignment** | Float | 0 ~ 1 | 0.8 | Chooses the axis that places the rim area |
| **Shadow Visibility** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Base Color Influence** | Float | 0 ~ 1 | 0.5 | 0 uses the rim color as authored; 1 multiplies it by the… |
| **Scene Light Influence** | Float | 0 ~ 1 | 0.5 | 0 keeps the rim at a constant strength regardless of the… |
| **Normal Map Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Distance Compensation** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Projection / FOV Compensation** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |

## Front Light {#프런트-라이트}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Front Light** | Toggle | - | On | On by default |
| **Front Light Color** | Color | - | White | HDR front-light color; default is (1, 1, 1) |
| **Front Light Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Overlay | Chooses Normal, Multiply, Add, Screen, Color, or Overlay for… |
| **Blend Opacity** | Float | 0 ~ 1 | 0.1 | How strongly the front light blends into the final color |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation after the base color and front-light tint are… |
| **Intensity** | Float | 0 ~ 10 | 0.3 | Range 0-10; default 0.2 |
| **Area Size** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.25 |
| **Softness** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.6 |
| **Highlight Core Size** | Float | 0 ~ 1 | 1 | Range 0-1; default 0.4 |
| **Highlight Core Intensity** | Float | 0 ~ 2 | 1 | Range 0-2; default 0.25 |
| **Light Direction Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 0.5 |
| **View Direction Influence** | Float | 0 ~ 1 | 0 | Range 0-1; default 0.5 |
| **Normal Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Shadow Visibility** | Float | 0 ~ 1 | 1 | Range 0-1; default 0.3 |
| **Base Color Influence** | Float | 0 ~ 1 | 0 | Range 0-1; default 0.5 |
| **Scene Light Influence** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 1 |

## Backlight {#백라이트}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Backlight** | Toggle | - | On | On by default |
| **Backlight Color** | Color | - | 2, 2, 2, 1 | HDR backlight color; default is (2, 2, 2) |
| **Backlight Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Overlay | Chooses Normal, Multiply, Add, Screen, Color, or Overlay for… |
| **Blend Opacity** | Float | 0 ~ 1 | 1 | How strongly the backlight blends into the final color |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation after the base color and backlight tint are… |
| **Intensity** | Float | 0 ~ 10 | 2 | Range 0-10; default 0.29 |
| **Width** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.34 |
| **Softness** | Float | 0 ~ 1 | 0.3 | Range 0-1; default 0.5 |
| **Directivity** | Float | 0 ~ 1 | 1 | Range 0-1; default 0.5 |
| **View Intensity** | Float | 0 ~ 1 | 0 | Range 0-1; default 1 |
| **Normal Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Shadow Visibility** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.5 |
| **Base Color Influence** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.5 |
| **Scene Light Influence** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 1 |

## Shadow Interior Reflection {#그림자-내부-반사}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Shadow Interior Reflection** | Toggle | - | On | On by default |
| **Shadow Interior Reflection Color** | Color | - | 1.5, 1.5, 1.5, 1 | HDR color for the shadow-interior reflection; default is (3… |
| **Shadow Reflection Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Add | Chooses Normal, Multiply, Add, Screen, Color, or Overlay for… |
| **Blend Opacity** | Float | 0 ~ 1 | 1 | How strongly the shadow interior reflection layer blends in |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation after the base color and shadow-reflection tint… |
| **Intensity** | Float | 0 ~ 20 | 0.5 | Brightness multiplier |
| **Width** | Float | 0 ~ 1 | 0.8 | Range 0-1; default 0.9 |
| **Softness** | Float | 0 ~ 1 | 0.8 | Range 0-1; default 0.5 |
| **Normal Map Influence** | Float | 0 ~ 1 | 1 | 0 uses the mesh normal; 1 uses the fully stacked normal maps… |
| **Shadow Threshold** | Float | 0 ~ 1 | 0.8 | The reflection appears in shadow beyond this threshold;… |
| **Shadow Softness** | Float | 0.001 ~ 1 | 1 | Transition width between the lit surface and the shadow-only… |
| **Base Color Influence** | Float | 0 ~ 1 | 0.7 | 0 uses the reflection color alone; 1 fully multiplies it by… |
| **Scene Light Influence** | Float | 0 ~ 1 | 1 | 0 keeps the reflection independent of scene brightness; 1… |
| **Light-Side Emphasis** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Ambient Color Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Additional Light Influence** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 1 |
| **Visibility in Cast Shadow** | Float | 0 ~ 1 | 1 | 0 hides the interior reflection inside the cast shadow; 1… |
| **Use Mask** | Toggle | - | Off | When off, the shader skips the mask texture fetch |

## Related pages

- [Rim usage guide](/guides/rim)
- [Shared Texture Slot UI](/guides/texture-modules) — the channel, remap and UV fields inside map and mask slots
- [Troubleshooting](/troubleshooting)
