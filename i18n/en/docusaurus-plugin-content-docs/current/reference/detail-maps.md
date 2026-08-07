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
| **Enable Surface Stack** | Off by default. Composites multiple textures into the surface color in order. Each active layer adds texture, mask, and blend work. | `_MingStackEnabled` |
| **Surface Stack Layer Count** | Range 0-10; default 0. Slots beyond the count are never evaluated; increasing the count accumulates texture, mask, and blend cost. | `_MingStackLayerCount` |
| **Blend Mode** | How this stack layer combines with the result below it. Normal covers it completely; Multiply keeps the shading underneath and only recolors. | `_MingStackBlendMode` |
| **Opacity** | How much this layer is applied. At 0 the layer is skipped, so an assigned texture never shows; slots beyond the layer count are skipped too. | `_MingStackOpacity` |

## Normal Layers

Configure layered normal maps and blend strengths.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Normal Layers** | Off by default. Enables stacked normal maps for lighting, rims, and other modules. Each active layer adds texture and composite work; a layer count of 0 produces no result. | `_MingNormalEnabled` |
| **Normal Layer Count** | Range 0-5; default 0. Only this many normal slots are evaluated; slots beyond the count are never sampled. Each added layer costs more texture, mask, and composite work. | `_MingNormalLayerCount` |
| **Normal Map** | Normal map for this layer. Slots beyond the layer count are never evaluated, so check the layer count first if an assigned map does nothing. | `_MingNormalMap` |
| **Normal Strength** | How strongly this layer blends into the final normal. At 0 an assigned texture has no effect. | `_MingNormalStrength` |

## MatCap Layers

Configure MatCap textures, blending, and projection.

| Control | What it does | Shader property |
|---|---|---|
| **Enable MatCap Layers** | Off by default. Composites view-based MatCap layers onto the surface. Each active layer adds texture and blend work; a layer count of 0 changes nothing. | `_MingMatcapEnabled` |
| **MatCap Layer Count** | Range 0-5; default 0. Slots beyond the count are not evaluated; every active layer adds map, mask, and blend cost. | `_MingMatcapLayerCount` |
| **MatCap Metallic Areas Only** | Off by default. Restricts every MatCap layer to areas with high PBR metallic value. With PBR or a metallic mask off there is little to gate against. | `_MingMatcapMetallicOnly` |
| **MatCap Reflection Desaturation** | Range 0-1; default 0.25. Drains color from MatCap so the Base Map stays readable; 1 removes almost all hue. | `_MingMatcapDesaturation` |
| **MatCap Map** | A lighting and material image painted on a sphere. It is projected from the view, so highlights follow the camera as it orbits. | `_MingMatcapMap` |
| **Blend Mode** | How the MatCap combines with the surface. Add and Screen suit a bright sheen; Multiply suits darkening material detail. | `_MingMatcapBlendMode` |
| **Contrast** | Contrast of the MatCap image. 1 is the source; raising it splits highlight from shade for a harder cel feel. | `_MingMatcapContrast` |
| **Strength** | How much this layer is applied. At 0 the layer is skipped entirely, so changing its map or blend mode does nothing. Slots beyond the layer count are skipped as well. | `_MingMatcapStrength` |
| **MatCap / Mesh UV Projection** | 0 projects the MatCap from the view, 1 pins it to the mesh UV. At 1 the pattern stays glued to the surface as the camera moves, which suits tattoos and painted detail. | `_MingMatcapProjectionBlend` |

## PBR Surface

Configure metallic, smoothness, specular, and environment reflections.

| Control | What it does | Shader property |
|---|---|---|
| **Enable PBR Surface** | Off by default. Enables the metallic, smoothness, and reflection-based surface path. It changes the toon-light result and can add normal and environment-reflection work. | `_MingPbrEnabled` |
| **Workflow** | Metallic derives the reflection color from the metallic value; Specular lets you author the specular color directly. With Specular selected the Metallic slider no longer affects the result. | `_WorkflowMode` |
| **Use Packed Mask** | Reads metallic, occlusion and smoothness from one packed texture by channel. While off, the channel and invert rows below are ignored and only the Metallic and Smoothness sliders are used. | `_MingPbrMaskMapEnabled` |
| **PBR Packed Mask** | Default packing is R = metallic, G = occlusion, A = smoothness. Use the channel rows below if your texture packs them differently. | `_MaskMap` |
| **Metallic** | 0 is dielectric, 1 is metal. With a packed mask it is multiplied by the mask, so areas where the mask is black never become metal. | `_Metallic` |
| **Smoothness** | Higher values give smaller, sharper reflections. 0.3-0.6 suits a toon look; near 1 the highlight shrinks to a dot. | `_Smoothness` |
| **Specular Strength** | Range 0-2; default 1. Strength of the specular response. At 0 both the direct highlight and the environment reflection disappear, so raising Smoothness or the reflection sliders does nothing. | `_MingPbrSpecularStrength` |
| **Metallic Channel** | Which channel of the packed mask holds metallic. Ignored while Use Packed Mask is off. | `_MingPbrMetallicChannel` |
| **Invert Metallic** | Flips the sampled metallic value. Use it when the mask was painted white for non-metal. | `_MingPbrMetallicInvert` |
| **PBR Occlusion Channel** | Which channel of the packed mask holds reflection occlusion. It never reaches the image while Reflection Occlusion is 0. | `_MingPbrOcclusionChannel` |
| **Invert PBR Occlusion** | Flips the sampled reflection-occlusion value. Ignored while Reflection Occlusion is 0. | `_MingPbrOcclusionInvert` |
| **Reflection Occlusion** | Range 0-1; default 0. How much the packed mask's occlusion channel suppresses environment reflection. At 0 the channel and invert settings never show up in the render. | `_MingPbrOcclusionStrength` |
| **Smoothness Channel** | Which channel of the packed mask holds smoothness. Ignored while Use Packed Mask is off. | `_MingPbrSmoothnessChannel` |
| **Use Roughness (Invert)** | Turn this on when the texture stores roughness instead of smoothness; the channel is used as 1 minus its value. | `_MingPbrSmoothnessInvert` |
| **Use Specular Color Map (RGB)** | Sources the specular color from a texture. While off, the specular map and its invert row are ignored. With the Metallic workflow the reflection color comes from metallic instead, so the effect is limited. | `_MingPbrSpecularMapEnabled` |
| **Invert Specular Color Map** | Inverts the RGB of the specular color map. Ignored while Use Specular Color Map is off. | `_MingPbrSpecularInvert` |
| **Direct Highlight Strength** | Range 0-4; default 1. Strength of the highlight coming straight from the light. At 0 the highlight is skipped entirely, so raising Smoothness produces no shine. | `_MingPbrDirectStrength` |
| **Environment Reflection Strength** | Range 0-4; default 0. How much the reflection probe or skybox shows up. With no probe in the scene, raising this changes almost nothing. | `_MingPbrReflectionStrength` |
| **Visible In Shadow** | Range 0-1; default 0. How much of the PBR highlight survives inside shadow. 0 hides it completely in shadow, 1 keeps it fully visible regardless. | `_MingPbrShadowVisibility` |
| **Normal Map Influence** | Range 0-1; default 1. 0 uses the mesh normal only, 1 uses the stacked normal maps in full. With no normal map assigned the value makes no difference. | `_MingPbrNormalInfluence` |
| **Highlight Toon Amount** | Range 0-1; default 0. Steps the GGX highlight falloff into a toon shape. 0 keeps the physical lobe; higher values add an edge and make Threshold relevant. | `_MingPbrDirectToonAmount` |
| **Highlight Toon Threshold** | Range 0-1; default 0.5. Chooses where the lobe becomes the highlight shape. Lower is wider, higher is tighter; ignored when Toon Amount is 0. | `_MingPbrDirectToonThreshold` |
| **Reflection Blur Bias** | Range -1-1; default 0. Blurs or sharpens environment reflection beyond physical smoothness. Negative sharpens it for eyes or wet surfaces. | `_MingPbrReflectionSmoothnessBias` |
| **Reflection Desaturation** | Range 0-1; default 0. Drains color from environment reflection. 1 keeps brightness with little hue, which protects the material's authored color. | `_MingPbrReflectionDesaturation` |
| **Reflection Tint** | HDR tint for environment reflection; default is (1, 1, 1). It combines with Desaturation, and high values can clip the reflection to white. | `_MingPbrReflectionTint` |
| **PBR Fresnel Power** | Range 1-8; default 5. Falloff of grazing-angle reflection. Lower spreads edge brightness inward; higher keeps it near the silhouette. | `_MingPbrFresnelPower` |

## Region Mask

Split highlight and surface response by region within one material.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Region Mask** | Off by default. Splits one RGBA texture into four region masks for per-region material adjustments. It adds a mask sample and adjustment math; mismatched UVs misalign the boundaries. | `_MingRegionMaskEnabled` |
| **Region Metallic Delta** | Range -1-1; default 0. Per-R/G/B/A metallic delta added to the material value. Large positive values can push a region abruptly toward metal. | `_MingRegionMetallic` |
| **Region Reflection Delta** | Range -4-4; default 0. Per-region environment-reflection delta. Negative suits skin or cloth; positive emphasizes hard surfaces. | `_MingRegionReflection` |
| **Region Toon Specular Strength Delta** | Range -8-8; default 0. Per-region toon-specular strength delta. Large values can over-brighten highlights and clip. | `_MingRegionSpecularStrength` |
| **Region Toon Specular Smoothness Delta** | Range -1-1; default 0. Per-region toon-specular smoothness delta. Positive is sharper; negative spreads the highlight. | `_MingRegionSpecularSmoothness` |

## Emission

Configure self-illumination color, texture, and intensity.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Emission** | Off by default. Adds self-emission from the map and HDR color after lighting. It can bloom or clip highlights; when off, the map and intensity are ignored. | `_EmissionEnabled` |
| **Emission Intensity** | Multiplier on the glow brightness. Without a bloom post-process in the scene, raising it only clips to white instead of blooming. | `_EmissionIntensity` |
| **Emission Map** | Texture that marks the self-illuminated areas. It is multiplied by the Emission Color, so a black color means nothing glows even with a texture assigned. | `_EmissionMap` |
| **Emission Color** | The glow color. It is HDR, so values above 1 can drive bloom; black is equivalent to no emission. | `_MingEmissionTint` |
| **Emission Visibility In Shadow** | Range 0-1; default 1. 0 follows shadow visibility and hides emission in full shadow; 1 bypasses shadow visibility so emission stays fully bright. | `_EmissionShadowVisibility` |

## Occlusion

Configure indirect-light occlusion and strength.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Occlusion** | Off by default. Uses the occlusion map to darken areas blocked from indirect light. It does not replace direct-light or shadow modules; off skips map and strength calculation. | `_OcclusionEnabled` |

## Glitter

Configure Voronoi particle sparkle with stable distance response, view sensitivity, light angle, and randomized size or color.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Glitter** | Off by default. Adds Voronoi particle sparkle. It evaluates procedural pattern and light response per pixel, so check the cost on low-end hardware or many characters. | `_MingGlitterEnabled` |
| **Glitter Color** | HDR sparkle color; default is (1, 1, 1). Final color also depends on Strength and Base Color Influence. | `_MingGlitterColor` |
| **Glitter Strength** | Range 0-8; default 8. Brightness multiplier; at 0 the pattern contributes no visible sparkle. | `_MingGlitterStrength` |
| **Enable Glitter Mask** | Off by default. Limits glitter to a separate mask. Off ignores the mask texture, channel, and invert controls and saves the mask sample. | `_MingGlitterMaskEnabled` |
| **Use Color Too** | Off by default. On, the same mask texture is read as full RGBA: alpha is the region and RGB tints the particles. It costs no extra texture sample. While on, the channel selector is fixed to alpha. | `_MingGlitterMaskUseColor` |
| **Enable Shape Map** | Off by default. On, each particle's silhouette is replaced by a texture (star, heart, and so on). Off keeps the round particle and does not read the shape map. | `_MingGlitterShapeEnabled` |
| **Shape Map** | The silhouette of a single particle. The square is laid inside the particle, so leave a margin rather than filling to the edge. The background must be black (or alpha 0). | `_MingGlitterMap` |
| **Shape Channel** | Default is A. Picks which channel of the shape map carries the silhouette. Use A for a PNG with alpha, or R / Luma for a black-and-white image. | `_MingGlitterShapeChannel` |
| **Rotation Randomize** | Range 0-1; default 1. How far each particle is turned from the next. At 0 every particle faces the same way and the result reads as a stamped pattern; at 1 the angle is spread evenly over a full turn. Lower it only when a directional shape such as a heart should stand upright. | `_MingGlitterShapeRotation` |
| **Glitter Density** | Range 1-512; default 379. Sets particle-cell detail. Higher values make finer sparkles but can increase shimmer, aliasing, and procedural pattern work. | `_MingGlitterDensity` |
| **Glitter Particle Size** | Range 0-1; default 0.39. Screen coverage of each particle; higher makes larger sparkles, lower makes smaller points. | `_MingGlitterSize` |
| **Glitter Size Randomize** | Range 0-1; default 1. Randomizes particle size. 0 is uniform; 1 is more organic but less predictable. | `_MingGlitterScaleRandomize` |
| **Glitter Particle Contrast** | Range 0.25-128; default 50. Contrast inside each particle. Higher is crisper but can increase stepping and shimmer. | `_MingGlitterContrast` |
| **Glitter Post Contrast** | Range 0.1-8; default 1. Applies contrast after the particle pattern. 1 is neutral; higher removes dim pixels sooner. | `_MingGlitterPostContrast` |
| **Glitter View Sensitivity** | Range 0.01-64; default 0.25. Sensitivity to view changes; higher values make sparkle shift more as the camera moves. | `_MingGlitterSensitivity` |
| **Glitter Speed** | Range 0-4; default 0.3. Animates the view-dependent sparkle. 0 is static; higher values change faster and can make flicker more noticeable. | `_MingGlitterSpeed` |
| **Glitter View Parallax** | Range 0-1; default 0.52. How particles slide with view movement; higher adds depth but can shimmer more. | `_MingGlitterViewParallax` |
| **Glitter Normal Influence** | Range 0-1; default 1. Uses mesh and stacked-normal direction for sparkle. With normal layers off, 1 still falls back to the mesh normal. | `_MingGlitterNormalInfluence` |
| **Glitter Light Angle** | Range 0-1; default 1. Influence of the particle-to-light angle on sparkle brightness. | `_MingGlitterLightAngle` |
| **Glitter Light Direction** | Range 0-1; default 1. How strongly sparkle follows light direction; lower values make it more view-driven. | `_MingGlitterLightDirection` |
| **Glitter Color Randomize** | Range 0-1; default 1. Randomizes per-particle color. 0 is a single color; 1 is varied but more complex. | `_MingGlitterColorRandomize` |
| **Glitter Shadow Visibility** | Range 0-1; default 0.54. How much glitter remains in shadow; 0 hides it, 1 ignores the shadow gate. | `_MingGlitterShadowVisibility` |
| **Glitter Base Color Influence** | Range 0-1; default 0. 0 keeps the glitter color; 1 multiplies it by the Base Map. | `_MingGlitterBaseColorInfluence` |
| **Glitter Scene Light Influence** | Range 0-1; default 0.5. How scene-light brightness dims the glitter. | `_MingGlitterSceneLightInfluence` |
