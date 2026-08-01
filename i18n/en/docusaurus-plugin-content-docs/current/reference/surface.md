---
id: surface
title: Surface and textures
sidebar_position: 1
---

# Surface and textures

Base colour, transparency, and the texture layers stacked on top - everything that makes up the painted surface.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

## Base Surface

Configure the base texture, color, and UV transform.

| Control | What it does | Shader property |
|---|---|---|
| **Base Map** | The main color texture. Its alpha channel is only used when Surface Mode is Cutout or Transparent. | `_MainTex` |
| **Base Tint** | A color laid over the Base Map. Tint Blend Mode decides how it combines and Tint Opacity decides how strongly, so at Opacity 0 changing this color does nothing. | `_Color` |
| **Alpha Cutoff** | Only has an effect when Surface Mode is Cutout. Pixels whose alpha is below this value are discarded. 0.3-0.6 works for hair and lashes; near 0 leaves ragged semi-transparent fringes. | `_Cutoff` |
| **Tint Blend Mode** | How Base Tint combines with the Base Map. The default Multiply keeps the map's shading and only recolors it; Normal replaces the map with a flat color. | `_ColorBlendMode` |
| **Tint Opacity** | How strongly Base Tint is applied. At 0 both the Base Tint color and its blend mode are ignored. | `_ColorBlendOpacity` |

## Surface Rendering

Configure surface type, culling, and alpha handling.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Alpha Mask** | Drives transparency from a separate image instead of the Base Map alpha. While off, the mask image, channel and invert rows below do nothing, and an Opaque Surface Mode hides the result even when it is on. | `_AlphaMaskEnabled` |
| **Mask Image** | Grayscale image used as the alpha source. It is ignored while Enable Alpha Mask is off. | `_AlphaMask` |
| **Mask Channel** | Which channel of the mask image to read. Pick R/G/B/A when several masks are packed into one texture; Luma uses the RGB brightness. | `_AlphaMaskChannel` |
| **Invert Mask** | Flips the mask black-for-white. Use it when the mask was painted white where the surface should disappear. | `_AlphaMaskInvert` |

## Common Maps

Quickly configure frequently used normal, emission, occlusion, PBR, and MatCap maps.

| Control | What it does | Shader property |
|---|---|---|
| **Normal Map** | Normal map that fakes surface relief. This is normal layer 01; it has no effect while the Normal module is off. | `_BumpMap` |
| **Normal Strength** | How pronounced the normal map relief is. 0 renders flat even with a map assigned, 1 is the authored strength, above 1 exaggerates it. | `_BumpScale` |
| **Occlusion Map** | Grayscale map that darkens areas indirect light cannot reach. It does not touch direct light, so the effect is hard to see under strong front lighting. | `_OcclusionMap` |
| **Occlusion Strength** | How much of the occlusion map is applied. At 0 an assigned map changes nothing. | `_OcclusionStrength` |

## Texture Layers

Composite additional surface texture layers.

| Control | What it does | Shader property |
|---|---|---|
| **Blend Mode** | How this stack layer combines with the result below it. Normal covers it completely; Multiply keeps the shading underneath and only recolors. | `_MingStackBlendMode` |
| **Opacity** | How much this layer is applied. At 0 the layer is skipped, so an assigned texture never shows; slots beyond the layer count are skipped too. | `_MingStackOpacity` |

## Normal Layers

Configure layered normal maps and blend strengths.

| Control | What it does | Shader property |
|---|---|---|
| **Normal Map** | Normal map for this layer. Slots beyond the layer count are never evaluated, so check the layer count first if an assigned map does nothing. | `_MingNormalMap` |
| **Normal Strength** | How strongly this layer blends into the final normal. At 0 an assigned texture has no effect. | `_MingNormalStrength` |
