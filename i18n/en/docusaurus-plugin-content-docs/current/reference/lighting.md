---
id: lighting
title: Lighting and material response
sidebar_position: 2
---

# Lighting and material response

How the character responds to scene light, plus the metal, gloss and MatCap controls that give it material.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

## Lighting

Configure direct and indirect lighting response.

| Control | What it does | Shader property |
|---|---|---|
| **Preserve Base Map Color** | How closely the Base Map keeps its authored color when the scene light is dim. At 1 the artwork color survives any light intensity; at 0 it tracks the light exactly. Keep it high for worlds with unpredictable lighting such as VRChat. | `_BaseColorPreservation` |
| **Scene Light Color Influence** | How much the scene light's hue tints the character. At 0 every light reads as white; at 1 a red light turns the character red. This controls hue only, not brightness. | `_LightColorInfluence` |
| **Lit Brightness** | Overall brightness multiplier on the lit side. 1 is neutral; raising it easily blows the lit areas out to white. | `_LitBrightness` |
| **Indirect Light Lift** | Lifts the form shadow by the amount of ambient and probe light so dark scenes do not crush to black. It is only evaluated while Form Shadow is on; cast shadows have their own Cast Indirect Lift. | `_IndirectStrength` |

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

## MatCap Layers

Configure MatCap textures, blending, and projection.

| Control | What it does | Shader property |
|---|---|---|
| **MatCap Map** | A lighting and material image painted on a sphere. It is projected from the view, so highlights follow the camera as it orbits. | `_MingMatcapMap` |
| **Blend Mode** | How the MatCap combines with the surface. Add and Screen suit a bright sheen; Multiply suits darkening material detail. | `_MingMatcapBlendMode` |
| **Contrast** | Contrast of the MatCap image. 1 is the source; raising it splits highlight from shade for a harder cel feel. | `_MingMatcapContrast` |
| **Strength** | How much this layer is applied. At 0 the layer is skipped entirely, so changing its map or blend mode does nothing. Slots beyond the layer count are skipped as well. | `_MingMatcapStrength` |
| **MatCap / Mesh UV Projection** | 0 projects the MatCap from the view, 1 pins it to the mesh UV. At 1 the pattern stays glued to the surface as the camera moves, which suits tattoos and painted detail. | `_MingMatcapProjectionBlend` |

## Emission

Configure self-illumination color, texture, and intensity.

| Control | What it does | Shader property |
|---|---|---|
| **Emission Intensity** | Multiplier on the glow brightness. Without a bloom post-process in the scene, raising it only clips to white instead of blooming. | `_EmissionIntensity` |
| **Emission Map** | Texture that marks the self-illuminated areas. It is multiplied by the Emission Color, so a black color means nothing glows even with a texture assigned. | `_EmissionMap` |
| **Emission Color** | The glow color. It is HDR, so values above 1 can drive bloom; black is equivalent to no emission. | `_MingEmissionTint` |
