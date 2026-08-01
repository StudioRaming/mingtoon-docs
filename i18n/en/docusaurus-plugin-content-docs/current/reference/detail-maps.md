---
id: detail-maps
title: Detail Maps
sidebar_position: 5
---

# Detail Maps

The layers and material response stacked on the base. Every layered section shares one trap: a slot past the layer count is skipped entirely.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

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

## MatCap Layers

Configure MatCap textures, blending, and projection.

| Control | What it does | Shader property |
|---|---|---|
| **MatCap Map** | A lighting and material image painted on a sphere. It is projected from the view, so highlights follow the camera as it orbits. | `_MingMatcapMap` |
| **Blend Mode** | How the MatCap combines with the surface. Add and Screen suit a bright sheen; Multiply suits darkening material detail. | `_MingMatcapBlendMode` |
| **Contrast** | Contrast of the MatCap image. 1 is the source; raising it splits highlight from shade for a harder cel feel. | `_MingMatcapContrast` |
| **Strength** | How much this layer is applied. At 0 the layer is skipped entirely, so changing its map or blend mode does nothing. Slots beyond the layer count are skipped as well. | `_MingMatcapStrength` |
| **MatCap / Mesh UV Projection** | 0 projects the MatCap from the view, 1 pins it to the mesh UV. At 1 the pattern stays glued to the surface as the camera moves, which suits tattoos and painted detail. | `_MingMatcapProjectionBlend` |

## PBR Surface

Configure metallic, smoothness, specular, and environment reflections.

| Control | What it does | Shader property |
|---|---|---|
| **Workflow** | Metallic derives the reflection color from the metallic value; Specular lets you author the specular color directly. With Specular selected the Metallic slider no longer affects the result. | `_WorkflowMode` |
| **Use Packed Mask** | Reads metallic, occlusion and smoothness from one packed texture by channel. While off, the channel and invert rows below are ignored and only the Metallic and Smoothness sliders are used. | `_MingPbrMaskMapEnabled` |
| **PBR Packed Mask** | Default packing is R = metallic, G = occlusion, A = smoothness. Use the channel rows below if your texture packs them differently. | `_MaskMap` |
| **Metallic** | 0 is dielectric, 1 is metal. With a packed mask it is multiplied by the mask, so areas where the mask is black never become metal. | `_Metallic` |
| **Smoothness** | Higher values give smaller, sharper reflections. 0.3-0.6 suits a toon look; near 1 the highlight shrinks to a dot. | `_Smoothness` |
| **Specular Strength** | Strength of the specular response. At 0 both the direct highlight and the environment reflection disappear, so raising Smoothness or the reflection sliders does nothing. | `_MingPbrSpecularStrength` |
| **Metallic Channel** | Which channel of the packed mask holds metallic. Ignored while Use Packed Mask is off. | `_MingPbrMetallicChannel` |
| **Invert Metallic** | Flips the sampled metallic value. Use it when the mask was painted white for non-metal. | `_MingPbrMetallicInvert` |
| **PBR Occlusion Channel** | Which channel of the packed mask holds reflection occlusion. It never reaches the image while Reflection Occlusion is 0. | `_MingPbrOcclusionChannel` |
| **Invert PBR Occlusion** | Flips the sampled reflection-occlusion value. Ignored while Reflection Occlusion is 0. | `_MingPbrOcclusionInvert` |
| **Reflection Occlusion** | How much the packed mask's occlusion channel suppresses environment reflection. At 0 the channel and invert settings never show up in the render. | `_MingPbrOcclusionStrength` |
| **Smoothness Channel** | Which channel of the packed mask holds smoothness. Ignored while Use Packed Mask is off. | `_MingPbrSmoothnessChannel` |
| **Use Roughness (Invert)** | Turn this on when the texture stores roughness instead of smoothness; the channel is used as 1 minus its value. | `_MingPbrSmoothnessInvert` |
| **Use Specular Color Map (RGB)** | Sources the specular color from a texture. While off, the specular map and its invert row are ignored. With the Metallic workflow the reflection color comes from metallic instead, so the effect is limited. | `_MingPbrSpecularMapEnabled` |
| **Invert Specular Color Map** | Inverts the RGB of the specular color map. Ignored while Use Specular Color Map is off. | `_MingPbrSpecularInvert` |
| **Direct Highlight Strength** | Strength of the highlight coming straight from the light. At 0 the highlight is skipped entirely, so raising Smoothness produces no shine. | `_MingPbrDirectStrength` |
| **Environment Reflection Strength** | How much the reflection probe or skybox shows up. With no probe in the scene, raising this changes almost nothing. | `_MingPbrReflectionStrength` |
| **Visible In Shadow** | How much of the PBR highlight survives inside shadow. 0 hides it completely in shadow, 1 keeps it fully visible regardless. | `_MingPbrShadowVisibility` |
| **Normal Map Influence** | 0 uses the mesh normal only, 1 uses the stacked normal maps in full. With no normal map assigned the value makes no difference. | `_MingPbrNormalInfluence` |

## Emission

Configure self-illumination color, texture, and intensity.

| Control | What it does | Shader property |
|---|---|---|
| **Emission Intensity** | Multiplier on the glow brightness. Without a bloom post-process in the scene, raising it only clips to white instead of blooming. | `_EmissionIntensity` |
| **Emission Map** | Texture that marks the self-illuminated areas. It is multiplied by the Emission Color, so a black color means nothing glows even with a texture assigned. | `_EmissionMap` |
| **Emission Color** | The glow color. It is HDR, so values above 1 can drive bloom; black is equivalent to no emission. | `_MingEmissionTint` |
