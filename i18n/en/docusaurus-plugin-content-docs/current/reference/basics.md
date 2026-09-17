---
id: basics
title: Basic Settings
sidebar_position: 1
---

# Basic Settings

These are the first fields you touch when you make a material. They cover base color, surface mode, transparency and stencil.

This page is a table for looking up values. If you want the order to turn things on in, see the [Basic Settings guide](/guides/basics).

The headings and order follow the inspector's section names and display order exactly.

The fields inside map and mask slots are the same in every slot.

Channel, remap, feather and mask UV are written once in the [Shared Texture Slot UI](/guides/texture-modules).

## Base Surface {#기본-표면}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Base Map** | Texture | - | None | The main color texture |
| **Base Tint** | Color | - | White | A color laid over the Base Map |
| **Tint Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Multiply | How Base Tint combines with the Base Map |
| **Base Map Opacity** | Float | 0 ~ 1 | 1 | Multiplies the Base Map alpha at the final surface step |
| **Use Color Adjust Mask** | Toggle | - | Off | Applies the Base HSVG adjustment only where the mask is… |
| **Base Color Adjustment Mask** | Texture | - | None | - |
| **Gradation LUT** | Toggle | - | Off | Re-maps the Base Map's colours through per-channel R/G/B… |
| **Gradation LUT** | Texture | - | None | A horizontal ramp texture |
| **Gradation Strength** | Float | 0 ~ 1 | 0 | How far the ramp result is mixed over the source colour |

## Surface Rendering {#표면-렌더링}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Camera Depth Contribution** | Toggle | - | On | Controls whether this material is written to the… |
| **Flip Backface Lighting Normal** | Toggle | - | On | - |
| **Blend Operation** | Enum | Add / Subtract / ReverseSubtract / Min / Max | Add | - |
| **Two-Pass Mode** | Toggle | - | Off | - |
| **Transparent Depth Prepass** | Toggle | - | Off | - |
| **Depth Test** | Enum | Disabled / Never / Less / Equal / LessEqual / Greater / NotEqual / GreaterEqual / Always | LessEqual | - |

## Alpha & Cutout {#알파와-컷아웃}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Alpha & Cutout Effects** | Toggle | - | On | Enables or bypasses alpha mask, cutoff, soft cutout… |
| **Cutout Threshold** | Float | 0 ~ 1 | 0 | When Enable Cutout is on, pixels with alpha below this… |
| **Soft Cutout** | Toggle | - | Off | Smooths the stair-stepped edge of a cutout using the… |
| **Edge Sharpness** | Float | 0.25 ~ 4 | 1 | How wide the softened band is |
| **Enable Alpha Mask** | Toggle | - | Off | Combines a separate image with the Base Map alpha using the… |
| **Mask Image** | Texture | - | None | Grayscale image used as the alpha source |
| **Alpha Blend Mode** | Enum | Multiply / Replace / Add / Subtract | Multiply | How the mask combines with the Base alpha |
| **Mask Value Scale** | Float | - | 1 | Multiplies the mask after channel, invert, remap, feather… |
| **Mask Value Offset** | Float | - | 0 | Added after Mask Value Scale |
| **Camera Depth Cutoff** | Float | 0 ~ 1 | 0.5 | Where the transparent surface's silhouette in the camera… |
| **Enable Distance Fade** | Toggle | - | Off | Fades the surface out by how far it is from the camera |
| **Near - Fully Gone At** | Float | 0 ~ 5 | 0 | Closer than this the surface is fully gone |
| **Near - Fully Visible At** | Float | 0 ~ 5 | 0 | Farther than this the surface is fully there |
| **Far - Starts Fading At** | Float | 0 ~ 200 | 200 | Past this distance the surface starts fading |
| **Far - Fully Gone At** | Float | 0 ~ 200 | 200 | Farther than this the surface is fully gone |
| **Enable Fresnel Alpha** | Toggle | - | Off | Varies transparency with how squarely the surface faces the… |
| **Alpha Fades · Opacity Facing Camera** | Float | 0 ~ 1 | 1 | Opacity where the surface faces the camera head on |
| **Opacity At Silhouette** | Float | 0 ~ 1 | 0 | Opacity at the silhouette edge |
| **Edge Falloff** | Float | 0.1 ~ 10 | 3 | How fast the value travels from facing to edge |
| **Enable Directional View Alpha** | Toggle | - | Off | Adjusts surface opacity from the camera direction in the… |
| **Opacity by View Direction · Front Opacity** | Float | 0 ~ 1 | 1 | Opacity when viewed from the selected frame's front |
| **Back Opacity** | Float | 0 ~ 1 | 1 | Opacity when viewed from the selected frame's back |
| **Left Opacity** | Float | 0 ~ 1 | 1 | Opacity when viewed from the selected frame's left |
| **Right Opacity** | Float | 0 ~ 1 | 1 | Opacity when viewed from the selected frame's right |
| **Up Opacity** | Float | 0 ~ 1 | 1 | Opacity when viewed from the selected frame's up direction |
| **Down Opacity** | Float | 0 ~ 1 | 1 | Opacity when viewed from the selected frame's down direction |
| **Directional Transition Softness** | Float | 0 ~ 1 | 0.5 | Width used to blend the six direction endpoints |
| **Direction Frame** | Enum | Object / Face Provider | Object | Object uses the mesh-local axes |
| **Forward Axis (Local)** | Float | Four values | 0, 0, 1, 0 | Local axis treated as front in the Object frame |
| **Up Axis (Local)** | Float | Four values | 0, 1, 0, 0 | Local axis treated as up in the Object frame |
| **View Region Mask Strength** | Float | 0 ~ 1 | 0 | How strongly the four-region mask affects directional alpha |
| **View Region Mask Weights** | Float | Four values | 1, 1, 1, 1 | Weights for the four channels of the shared Region Mask |
| **Invert View Region Mask** | Toggle | - | Off | Inverts the resolved region result |
| **Enable Region Mask** | Toggle | - | Off | Off by default |
| **Region Mask (RGBA = 4 Regions)** | Texture | - | None | - |
| **Smoothness ±** | Float | Four values | 0, 0, 0, 0 | Tightens or loosens the highlight in this region |
| **Metallic ±** | Float | Four values | 0, 0, 0, 0 | Range -1-1; default 0 |
| **Environment Reflection ±** | Float | Four values | 0, 0, 0, 0 | This is how a world reflection is kept off skin and |
| **Toon Specular Intensity ±** | Float | Four values | 0, 0, 0, 0 | Range -8-8; default 0 |
| **Toon Specular Smoothness ±** | Float | Four values | 0, 0, 0, 0 | Range -1-1; default 0 |

## Stencil Settings {#스텐실-설정}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **General Pass · Reference** | Int | 0 ~ 255 | 0 | Reference value (0-255) the general pass compares against… |
| **General Pass · Read Mask** | Int | 0 ~ 255 | 255 | Bit mask applied when comparing the stencil |
| **General Pass · Write Mask** | Int | 0 ~ 255 | 255 | Bit mask applied when writing to the stencil |
| **General Pass · Compare** | Enum | Disabled / Never / Less / Equal / LessEqual / Greater / NotEqual / GreaterEqual / Always | Always | Stencil comparison function |
| **General Pass · Pass** | Enum | Keep / Zero / Replace / IncrementSaturate / DecrementSaturate / Invert / IncrementWrap / DecrementWrap | Keep | Stencil operation when both stencil and depth tests pass |
| **General Pass · Fail** | Enum | Keep / Zero / Replace / IncrementSaturate / DecrementSaturate / Invert / IncrementWrap / DecrementWrap | Keep | Stencil operation when the stencil test fails |
| **General Pass · Z Fail** | Enum | Keep / Zero / Replace / IncrementSaturate / DecrementSaturate / Invert / IncrementWrap / DecrementWrap | Keep | Stencil operation when the stencil test passes but the depth… |
| **Normal Outline Pass · Reference** | Int | 0 ~ 255 | 0 | Stencil value used by the outline pass |
| **Normal Outline Pass · Read Mask** | Int | 0 ~ 255 | 255 | Bit mask applied when reading the stencil buffer |
| **Normal Outline Pass · Write Mask** | Int | 0 ~ 255 | 255 | Bit mask applied when writing the stencil buffer |
| **Normal Outline Pass · Compare** | Enum | Disabled / Never / Less / Equal / LessEqual / Greater / NotEqual / GreaterEqual / Always | Always | How the stencil value is compared to decide which pixels… |
| **Normal Outline Pass · Pass** | Enum | Keep / Zero / Replace / IncrementSaturate / DecrementSaturate / Invert / IncrementWrap / DecrementWrap | Keep | What to do to the stencil buffer when both the stencil and… |
| **Normal Outline Pass · Fail** | Enum | Keep / Zero / Replace / IncrementSaturate / DecrementSaturate / Invert / IncrementWrap / DecrementWrap | Keep | What to do to the stencil buffer when the stencil test fails |
| **Normal Outline Pass · Z Fail** | Enum | Keep / Zero / Replace / IncrementSaturate / DecrementSaturate / Invert / IncrementWrap / DecrementWrap | Keep | What to do when the stencil test passes but the depth test… |
| **Color Mask** | Int | 0 ~ 15 | 15 | Which color channels the outline pass writes |

## Related pages

- [Basic Settings usage guide](/guides/basics)
- [Shared Texture Slot UI](/guides/texture-modules) — the channel, remap and UV fields inside map and mask slots
- [Troubleshooting](/troubleshooting)
