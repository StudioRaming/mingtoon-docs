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
| **Fresnel Rim Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Overlay | Chooses Normal, Multiply, Add, Screen, Color, or Overlay for the rim |
| **Blend Opacity** | Float | 0 ~ 1 | 1 | How strongly the fresnel rim blends in |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation after the base color and Fresnel-rim tint are composed |
| **Intensity** | Float | 0 ~ 20 | 1 | Range 0-20; default 1 |
| **Enable Fresnel Rim Mask** | Toggle | - | Off | - |
| **Width** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.5 |
| **Softness** | Float | 0 ~ 1 | 0.2 | Range 0-1; default 0.2 |
| **Light-Side Emphasis** | Float | 0 ~ 1 | 0.8 | 0 keeps rim brightness uniform around the form; 1 keeps only the side reached by… |
| **View Alignment** | Float | 0 ~ 1 | 0.8 | Chooses the axis that places the rim area |
| **Shadow Visibility** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Base Color Influence** | Float | 0 ~ 1 | 0.5 | 0 uses the rim color as authored; 1 multiplies it by the Base Map so each… |
| **Scene Light Influence** | Float | 0 ~ 1 | 1 | 0 keeps the rim at a constant strength regardless of the scene; 1 lets it dim as… |
| **Normal Map Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Distance Compensation** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Projection / FOV Compensation** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |

## Front Light {#프런트-라이트}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Front Light** | Toggle | - | On | On by default |
| **Front Light Color** | Color | - | White | HDR front-light color; default is (1, 1, 1) |
| **Front Light Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Overlay | Chooses Normal, Multiply, Add, Screen, Color, or Overlay for the front light |
| **Blend Opacity** | Float | 0 ~ 1 | 0.1 | How strongly the front light blends into the final color |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation after the base color and front-light tint are composed |
| **Intensity** | Float | 0 ~ 10 | 0.3 | Range 0-10; default 0.3 |
| **Area Size** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.5 |
| **Softness** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.5 |
| **Highlight Core Size** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Highlight Core Intensity** | Float | 0 ~ 2 | 1 | Range 0-2; default 1 |
| **Light Direction Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **View Direction Influence** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Normal Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Shadow Visibility** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Base Color Influence** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Scene Light Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |

## Edge Rim {#엣지-림}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Edge Rim** | Toggle | - | On | Enables the rim that follows the contour |
| **Edge Rim Color** | Color | - | 2, 2, 2, 1 | HDR Edge Rim color |
| **Edge Rim Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Add | Chooses how the rim blends into the surface |
| **Blend Opacity** | Float | 0 ~ 1 | 1 | How strongly the rim blends into the final color |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation after the base color and Edge Rim tint are composed |
| **Intensity** | Float | 0 ~ 10 | 2 | Brightness multiplier for the rim and its backlit boost |
| **Edge Width (Pixels)** | Float | 0 ~ 32 | 0 | Minimum on-screen pixel width for the gradient |
| **Width** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.5 |
| **Softness** | Float | 0 ~ 1 | 0.3 | Range 0-1; default 0.3 |
| **Area Invert** | Toggle | - | Off | Moves the selected area to the opposite side |
| **Directivity** | Float | 0 ~ 1 | 0 | How tightly the rim follows the light |
| **View Intensity** | Float | 0 ~ 1 | 0 | How much the view direction shapes the rim |
| **Light Direction Influence** | Float | 0 ~ 1 | 0 | Removes the rim from the side the light does not reach |
| **Normal Influence** | Float | 0 ~ 1 | 1 | 0 uses the mesh normal; 1 uses the stacked normal maps |
| **Mask Strength** | Float | 0 ~ 1 | 1 | How much the Fresnel Rim mask affects this layer |
| **Contour Tightness** | Float | 0 ~ 1 | 0 | Keeps the rim on curvature contours |
| **Shadow Visibility** | Float | 0 ~ 1 | 0.5 | How much of the rim survives inside shadow |
| **Base Color Influence** | Float | 0 ~ 1 | 0.5 | 0 uses the rim color; 1 fully multiplies it by the Base Map |
| **Scene Light Influence** | Float | 0 ~ 1 | 1 | How much the rim follows scene brightness |
| **Backlit Intensity Boost** | Float | 0 ~ 4 | 0 | Adds brightness while the light is behind the subject |
| **Backlit Width Boost** | Float | 0 ~ 4 | 0 | Widens the rim outward while backlit |

## Backlight {#백라이트}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Backlight** | Toggle | - | Off | Enables lilToon-style wrapped backlight |
| **Backlight Color** | Color | - | 0.85, 0.8, 0.7, 1 | HDR backlight color |
| **Use Color Map** | Toggle | - | Off | Uses a texture for the backlight color |
| **Color Map** | Texture | - | None | Backlight color map |
| **Backlight Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Add | Chooses how the backlight blends into the surface |
| **Blend Opacity** | Float | 0 ~ 1 | 1 | How strongly the backlight blends into the final color |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation after the base color and backlight tint are composed |
| **Intensity** | Float | 0 ~ 10 | 1 | Backlight brightness multiplier |
| **Mask Strength** | Float | 0 ~ 1 | 1 | How much the Fresnel Rim mask affects the backlight |
| **Width** | Float | 0 ~ 1 | 0.35 | Boundary where the backlight band starts |
| **Softness** | Float | 0 ~ 1 | 0.05 | Blur of the backlight boundary |
| **Backlight Directivity** | Float | 0 ~ 32 | 5 | Exponent for how tightly the band follows light behind the subject |
| **View Wrap** | Float | 0 ~ 1 | 1 | How far the light wraps around the surface |
| **Normal Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Shadow Visibility** | Float | 0 ~ 1 | 0 | How much of the backlight survives inside shadow |
| **Base Color Influence** | Float | 0 ~ 1 | 0 | 0 uses the backlight color; 1 multiplies it by the Base Map |
| **Scene Light Influence** | Float | 0 ~ 1 | 1 | How much the backlight follows scene brightness |
| **Backface Mask** | Float | 0 ~ 1 | 1 | On, the backlight is not drawn on back faces |

## Shadow Interior Reflection {#그림자-내부-반사}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Shadow Interior Reflection** | Toggle | - | On | On by default |
| **Shadow Interior Reflection Color** | Color | - | 1.5, 1.5, 1.5, 1 | HDR color for the shadow-interior reflection; default is (3.81, 3.81, 3.81) |
| **Shadow Reflection Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Add | Chooses Normal, Multiply, Add, Screen, Color, or Overlay for the shadow… |
| **Blend Opacity** | Float | 0 ~ 1 | 1 | How strongly the shadow interior reflection layer blends in |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation after the base color and shadow-reflection tint are composed |
| **Intensity** | Float | 0 ~ 20 | 0.5 | Brightness multiplier |
| **Width** | Float | 0 ~ 1 | 0.8 | Range 0-1; default 0.8 |
| **Softness** | Float | 0 ~ 1 | 0.8 | Range 0-1; default 0.8 |
| **Normal Map Influence** | Float | 0 ~ 1 | 1 | 0 uses the mesh normal; 1 uses the fully stacked normal maps for the reflection… |
| **Shadow Threshold** | Float | 0 ~ 1 | 0.8 | The reflection appears in shadow beyond this threshold; Shadow Softness smooths… |
| **Shadow Softness** | Float | 0.001 ~ 1 | 1 | Transition width between the lit surface and the shadow-only reflection |
| **Base Color Influence** | Float | 0 ~ 1 | 0.7 | 0 uses the reflection color alone; 1 fully multiplies it by the Base Map color |
| **Scene Light Influence** | Float | 0 ~ 1 | 1 | 0 keeps the reflection independent of scene brightness; 1 dims it with scene… |
| **Light-Side Emphasis** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Ambient Color Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Additional Light Influence** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 1 |
| **Visibility in Cast Shadow** | Float | 0 ~ 1 | 1 | 0 hides the interior reflection inside the cast shadow; 1 keeps it fully visible… |
| **Visibility in Depth Shadow** | Float | 0 ~ 1 | 0 | 0 hides the interior reflection inside the depth shadow (default); 1 keeps it… |
| **Use Mask** | Toggle | - | Off | When off, the shader skips the mask texture fetch |

## Related pages

- [Rim usage guide](/guides/rim)
- [Shared Texture Slot UI](/guides/texture-modules) — the channel, remap and UV fields inside map and mask slots
- [Troubleshooting](/troubleshooting)
