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
| **Enable Surface Stack** | Off by default. Composites multiple textures into the surface color in order. Each active layer adds texture, mask, and blend work. | `_StackEnabled` |
| **Surface Stack Layer Count** | Range 0-10; default 0. Slots beyond the count are never evaluated; increasing the count accumulates texture, mask, and blend cost. | `_StackLayerCount` |

## Normal Layers

Configure layered normal maps and blend strengths.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Normal Layers** | Off by default. Enables stacked normal maps for lighting, rims, and other modules. Each active layer adds texture and composite work; a layer count of 0 produces no result. | `_NormalEnabled` |
| **Normal Layer Count** | Range 0-5; default 0. Only this many normal slots are evaluated; slots beyond the count are never sampled. Each added layer costs more texture, mask, and composite work. | `_NormalLayerCount` |

## MatCap Layers

Configure MatCap textures, blending, and projection.

| Control | What it does | Shader property |
|---|---|---|
| **Enable MatCap Layers** | Off by default. Composites view-based MatCap layers onto the surface. Each active layer adds texture and blend work; a layer count of 0 changes nothing. | `_MatcapEnabled` |
| **MatCap Layer Count** | Range 0-5; default 0. Slots beyond the count are not evaluated; every active layer adds map, mask, and blend cost. | `_MatcapLayerCount` |
| **MatCap Metallic Areas Only** | Off by default. Restricts every MatCap layer to areas with high PBR metallic value. With PBR or a metallic mask off there is little to gate against. | `_MatcapMetallicOnly` |
| **MatCap Reflection Desaturation** | Range 0-1; default 0.25. Drains color from MatCap so the Base Map stays readable; 1 removes almost all hue. | `_MatcapDesaturation` |
| **MatCap Normal Map** | One normal map shared by all five MatCap slots. It disturbs only the normal used to project the MatCap, so the surface shading stays where it is while the highlight distorts. Each slot sets how far it follows with MatCap Normal Map Strength; with every slot at 0 the map is never read. It is shared rather than per slot because of the texture binding budget - five maps would spend five slots on what one can do. | `_MatcapNormalMap` |

## PBR Surface

Configure metallic, smoothness, and direct-light specular.

| Control | What it does | Shader property |
|---|---|---|
| **Enable PBR Surface** | Off by default. Enables the metallic, smoothness, and reflection-based surface path. It changes the toon-light result and can add normal and environment-reflection work. | `_PbrEnabled` |
| **Workflow** | Metallic derives the reflection color from the metallic value; Specular lets you author the specular color directly. With Specular selected the Metallic slider no longer affects the result. | `_WorkflowMode` |
| **Use Packed Mask** | Reads metallic, occlusion and smoothness from one packed texture by channel. While off, the channel and invert rows below are ignored and only the Metallic and Smoothness sliders are used. | `_PbrMaskMapEnabled` |
| **PBR Packed Mask** | Default packing is R = metallic, G = occlusion, A = smoothness. Use the channel rows below if your texture packs them differently. | `_MaskMap` |
| **Metallic** | 0 is dielectric, 1 is metal. With a packed mask it is multiplied by the mask, so areas where the mask is black never become metal. | `_Metallic` |
| **Smoothness** | Higher values give smaller, sharper reflections. 0.3-0.6 suits a toon look; near 1 the highlight shrinks to a dot. | `_Smoothness` |
| **Specular Intensity** | Range 0-2; default 1. Strength of the specular response. At 0 both the direct highlight and the environment reflection disappear, so raising Smoothness or the reflection sliders does nothing. | `_PbrSpecularStrength` |
| **Enable Region Mask** | Off by default. Splits one RGBA texture into four region masks for per-region material adjustments. It adds a mask sample and adjustment math; mismatched UVs misalign the boundaries. | `_RegionMaskEnabled` |
| **Region Metallic Delta** | Range -1-1; default 0. Per-R/G/B/A metallic delta added to the material value. Large positive values can push a region abruptly toward metal. | `_RegionMetallic` |
| **Region Reflection Delta** | Range -4-4; default 0. Per-region environment-reflection delta. Negative suits skin or cloth; positive emphasizes hard surfaces. | `_RegionReflection` |
| **Region Toon Specular Intensity Delta** | Range -8-8; default 0. Per-region toon-specular strength delta. Large values can over-brighten highlights and clip. | `_RegionSpecularStrength` |
| **Region Toon Specular Smoothness Delta** | Range -1-1; default 0. Per-region toon-specular smoothness delta. Positive is sharper; negative spreads the highlight. | `_RegionSpecularSmoothness` |
| **Metallic Channel** | Which channel of the packed mask holds metallic. Ignored while Use Packed Mask is off. | `_PbrMetallicChannel` |
| **Invert Metallic** | Flips the sampled metallic value. Use it when the mask was painted white for non-metal. | `_PbrMetallicInvert` |
| **PBR Occlusion Channel** | Which channel of the packed mask holds reflection occlusion. It never reaches the image while Reflection Occlusion is 0. | `_PbrOcclusionChannel` |
| **Invert PBR Occlusion** | Flips the sampled reflection-occlusion value. Ignored while Reflection Occlusion is 0. | `_PbrOcclusionInvert` |
| **Reflection Occlusion** | Range 0-1; default 0. How much the packed mask's occlusion channel suppresses environment reflection. At 0 the channel and invert settings never show up in the render. | `_PbrOcclusionStrength` |
| **Smoothness Channel** | Which channel of the packed mask holds smoothness. Ignored while Use Packed Mask is off. | `_PbrSmoothnessChannel` |
| **Use Roughness (Invert)** | Turn this on when the texture stores roughness instead of smoothness; the channel is used as 1 minus its value. | `_PbrSmoothnessInvert` |
| **Use Specular Color Map (RGB)** | Sources the specular color from a texture. While off, the specular map and its invert row are ignored. With the Metallic workflow the reflection color comes from metallic instead, so the effect is limited. | `_PbrSpecularMapEnabled` |
| **Invert Specular Color Map** | Inverts the RGB of the specular color map. Ignored while Use Specular Color Map is off. | `_PbrSpecularInvert` |
| **Direct Highlight Intensity** | Range 0-4; default 1. Strength of the highlight coming straight from the light. At 0 the highlight is skipped entirely, so raising Smoothness produces no shine. | `_PbrDirectStrength` |
| **Visible In Shadow** | Range 0-1; default 0. How much of the PBR highlight survives inside shadow. 0 hides it completely in shadow, 1 keeps it fully visible regardless. | `_PbrShadowVisibility` |
| **Normal Map Influence** | Range 0-1; default 1. 0 uses the mesh normal only, 1 uses the stacked normal maps in full. With no normal map assigned the value makes no difference. | `_PbrNormalInfluence` |
| **Highlight Toon Amount** | Range 0-1; default 0. Steps the GGX highlight falloff into a toon shape. 0 keeps the physical lobe; higher values add an edge and make Threshold relevant. | `_PbrDirectToonAmount` |
| **Highlight Toon Threshold** | Range 0-1; default 0.5. Chooses where the lobe becomes the highlight shape. Lower is wider, higher is tighter; ignored when Toon Amount is 0. | `_PbrDirectToonThreshold` |
| **Environment Reflection Intensity** | Range 0-4; default 0. How much the reflection probe or skybox shows up. With no probe in the scene, raising this changes almost nothing. | `_PbrReflectionStrength` |
| **Reflection Blur Bias** | Range -1-1; default 0. Blurs or sharpens environment reflection beyond physical smoothness. Negative sharpens it for eyes or wet surfaces. | `_PbrReflectionSmoothnessBias` |
| **Reflection Desaturation** | Range 0-1; default 0. Drains color from environment reflection. 1 keeps brightness with little hue, which protects the material's authored color. | `_PbrReflectionDesaturation` |
| **Reflection Tint** | HDR tint for environment reflection; default is (1, 1, 1). It combines with Desaturation, and high values can clip the reflection to white. | `_PbrReflectionTint` |
| **PBR Fresnel Power** | Range 1-8; default 5. Falloff of grazing-angle reflection. Lower spreads edge brightness inward; higher keeps it near the silhouette. | `_PbrFresnelPower` |

## Reflection

Configure main-light, additional-light, and environment reflection plus its color mask and cubemap independently of the PBR surface.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Reflection** | Enables main-light, additional-light, and environment reflection plus the reflection color map and cubemap independently of the PBR surface. Off skips this module's reflection work and texture samples. | `_ReflectionEnabled` |
| **Main Light Specular** | Applies the reflection color and mask to the main light's direct highlight, matching lilToon's Apply Specular. When PBR Surface is also enabled, the shared PBR lobe owns the result and this switch is inactive. | `_ReflectionApplySpecular` |
| **Additional Light Specular** | Applies reflection to direct highlights from point, spot, and other additional lights, matching lilToon's Apply Specular FA. When PBR Surface is also enabled, the shared PBR lobe owns the result and this switch is inactive. | `_ReflectionApplySpecularAdditional` |
| **Environment Reflection** | Applies reflection probes, skybox reflection, and the material cubemap, matching lilToon's Apply Reflection. When PBR Surface is also enabled, the shared PBR environment lobe owns the result and this switch is inactive. | `_ReflectionApplyEnvironment` |
| **Dielectric Reflectance** | Range 0-1; default 0.04. Dielectric reflectance (F0) used by Reflection-only materials and the dielectric portion of the Metallic workflow. Areas near Metallic 1 transition to the surface color. | `_ReflectionReflectance` |
| **Use Reflection Color Map** | Multiplies Reflection Color by the texture's RGB and alpha. When off, the texture sample and its Tiling/Offset are unused. | `_ReflectionColorTexEnabled` |
| **Reflection Color / Mask** | RGB tint and A mask corresponding to lilToon's Reflection Color Tex. Its Tiling/Offset is independent and is not shared with the surface maps. | `_ReflectionColorTex` |
| **Reflection Color** | HDR post-lobe colour, matching lilToon's Reflection Color. It tints both the direct highlight and environment reflection; alpha controls how much both lobes are applied. Default is white and opaque (1). | `_ReflectionColor` |
| **Apply Surface Transparency** | Multiplies surface alpha into the reflection colour alpha. It is off by default to preserve existing MingToon materials; the lilToon converter carries the source toggle explicitly. | `_ReflectionApplyTransparency` |
| **Reflection Blend Mode** | How the reflection colour is composited onto the surface. Add preserves the existing PBR sum; Multiply, Screen and the other modes reproduce converted lilToon layer compositing. | `_ReflectionBlendMode` |
| **Reflection Cubemap** | Material cubemap sampled when the reflection probe is empty or Override Reflection Probe is on. The default black texture leaves existing materials unchanged. | `_ReflectionCubeTex` |
| **Cubemap Tint** | HDR tint applied to the material cubemap. It defaults to black, so no extra reflection appears until a cubemap is intentionally configured. | `_ReflectionCubeColor` |
| **Override Reflection Probe** | Uses the material cubemap even when a scene reflection probe exists. When off, the probe wins and the cubemap is used only as an empty-probe fallback. | `_ReflectionCubeOverride` |
| **Cubemap Light Influence** | Controls how much the resolved main-light colour and intensity affect the material cubemap. 0 keeps its source colour; 1 applies the lighting fully. | `_ReflectionCubeEnableLighting` |

## Toon Specular

Configure a lightweight toon-style highlight without enabling PBR.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Toon Specular** | Off by default. Adds a highlight shaped by the light direction. It is the lighter choice when a surface needs gloss but not the whole PBR path. | `_ToonSpecularEnabled` |
| **Toon Specular Color** | White by default. It is HDR, so values above 1 are allowed. The blend mode defaults to Add. | `_ToonSpecularColor` |
| **Toon Specular Blend Mode** | Add by default. Screen, Overlay, Hue, and Color are formulas defined over 0-1, so an HDR color or an intensity above 1 may not give the shape you intended. | `_ToonSpecularBlendMode` |
| **Blend Opacity** | How strongly the toon specular highlight blends in. Try lowering this before Strength when the highlight overpowers; at 0 the module is effectively off. | `_ToonSpecularBlendOpacity` |
| **Toon Specular Intensity** | Range 0-8; default 1. How bright the highlight is. It clips toward white as it rises, so shape the highlight with threshold and softness and use this only for brightness. | `_ToonSpecularStrength` |
| **Toon Specular Color Source** | Single Color by default, which uses only the color you set. Switch to Mask Texture Color and the colors painted into the Toon Specular Mask multiply into the highlight color, so a single highlight can change color from one area to the next the way hair does. With no mask assigned the map is white, so nothing changes, and the mask's channel, invert, and remap controls keep masking intensity exactly as before. | `_ToonSpecularTintMode` |
| **Toon Specular Mask Color Amount** | Range 0-1; default 1. Meaningful only while the color source is Mask Texture Color. At 0 the highlight keeps the color you set; at 1 the mask color is applied in full. Lower it when dark areas of the mask drag the highlight down with them. | `_ToonSpecularTintStrength` |
| **Toon Specular Mode** | Isotropic by default. Isotropic is a round highlight; Anisotropic is a band across the strand direction, which is the hair highlight that slides as the head turns. | `_ToonSpecularMode` |
| **Toon Specular Smoothness** | Range 0-1; default 0.5. How tight the lobe is. Roughly: 0.2 cloth, 0.45 skin, 0.7 polished metal or gems, 0.9 wet lips and enamel. | `_ToonSpecularSmoothness` |
| **Toon Specular Threshold** | Range 0-1; default 0.5. How much of the lobe survives as the highlight shape. It is independent of Smoothness, so either is usable alone. | `_ToonSpecularThreshold` |
| **Toon Specular Softness** | Range 0.001-1; default 0.05. 0.001 is a hard cel highlight, 1 is the raw lobe. This is the dial from cel to physical. | `_ToonSpecularSoftness` |
| **Toon Specular Anisotropic Shift** | Range -1 to 1; default 0. Meaningful only in Anisotropic mode. It slides the band along the normal, away from the strand root, which is what places the ring on the head. | `_ToonSpecularAnisoShift` |
| **Toon Specular Normal Map Influence** | Range 0-1; default 1. 0 uses the mesh normal only; 1 uses the stacked normal maps fully. | `_ToonSpecularNormalInfluence` |
| **Toon Specular Visibility In Shadow** | Range 0-1; default 0. 0 hides it in shadow, 1 keeps it fully visible there. A specular is a reflection of the light source, so 0 is the physical answer and anything above it is a stylistic one. | `_ToonSpecularShadowVisibility` |
| **Toon Specular Base Color Influence** | Range 0-1; default 0. At 0 the highlight keeps the color you set; raising it tints the highlight with the base color underneath. Raise it when the gloss should follow the material color, as on metal. | `_ToonSpecularBaseColorInfluence` |
| **Toon Specular Scene Light Influence** | Range 0-1; default 1. At 1 the highlight follows the color and brightness of the scene light; at 0 it stays exactly the color you set regardless of the scene. Lower it when the gloss should read the same in every world. | `_ToonSpecularSceneLightInfluence` |

## Emission

Configure self-illumination color, texture, and intensity.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Emission** | Off by default. Adds self-emission from the map and HDR color after lighting. It can bloom or clip highlights; when off, the map and intensity are ignored. | `_EmissionEnabled` |
| **Emission Intensity** | Multiplier on the glow brightness. Without a bloom post-process in the scene, raising it only clips to white instead of blooming. | `_EmissionIntensity` |
| **Emission Map** | Texture that marks the self-illuminated areas. It is multiplied by the Emission Color, so a black color means nothing glows even with a texture assigned. | `_EmissionMap` |
| **Emission Color** | The glow color. It is HDR, so values above 1 can drive bloom; black is equivalent to no emission. | `_EmissionTint` |
| **Emission Blend Mode** | How the glow is composited onto the surface beneath it. Add is the ordinary light-adding glow; Multiply, Screen and the rest reproduce a converted material's compositing. | `_EmissionBlendMode` |
| **Emission Blend Strength** | How much of the blend above is applied. At 0 the glow does not show; at 1 it applies fully. | `_EmissionBlendOpacity` |
| **Base Color Influence** | Mixes the base map's colour into the glow. At 0 the glow keeps its own colour; at 1 it follows the surface beneath. Use it so a glow tracks a recoloured outfit. | `_EmissionMainColorInfluence` |
| **Emission Visibility In Shadow** | Range 0-1; default 1. 0 follows shadow visibility and hides emission in full shadow; 1 bypasses shadow visibility so emission stays fully bright. | `_EmissionShadowVisibility` |
| **Emission Scroll Speed** | Scrolls the emission map over time. X and Y are the horizontal and vertical UV movement per second; Z and W are unused. At 0 the map is still. | `_EmissionScroll` |
| **Emission Blend Mode (Layer 2)** | How layer 2's glow is composited onto the surface beneath it. | `_EmissionBlendMode02` |
| **Emission Blend Strength (Layer 2)** | How much of layer 2's blend is applied. At 0 it does not show. | `_EmissionBlendOpacity02` |
| **Base Color Influence (Layer 2)** | Mixes the base map's colour into layer 2's glow. At 0 the glow keeps its own colour. | `_EmissionMainColorInfluence02` |
| **Emission Scroll Speed (Layer 2)** | Scrolls emission layer 2 over time. X and Y are the horizontal and vertical UV movement per second; Z and W are unused. At 0 the map is still. | `_EmissionScroll02` |

## Occlusion

Configure indirect-light occlusion and strength.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Occlusion** | Off by default. Uses the occlusion map to darken areas blocked from indirect light. It does not replace direct-light or shadow modules; off skips map and strength calculation. | `_OcclusionEnabled` |

## Glitter

Configure Voronoi particle sparkle with stable distance response, view sensitivity, light angle, and randomized size or color.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Glitter** | Off by default. Adds Voronoi particle sparkle. It evaluates procedural pattern and light response per pixel, so check the cost on low-end hardware or many characters. | `_GlitterEnabled` |
| **Glitter Color** | HDR sparkle color; default is (1, 1, 1). Final color also depends on Strength and Base Color Influence. | `_GlitterColor` |
| **Glitter Intensity** | Range 0-8; default 8. Brightness multiplier; at 0 the pattern contributes no visible sparkle. | `_GlitterStrength` |
| **Enable Glitter Mask** | Off by default. Limits glitter to a separate mask. Off ignores the mask texture, channel, and invert controls and saves the mask sample. | `_GlitterMaskEnabled` |
| **Use Color Too** | Off by default. On, the same mask texture is read as full RGBA: alpha is the region and RGB tints the particles. It costs no extra texture sample. While on, the channel selector is fixed to alpha. | `_GlitterMaskUseColor` |
| **Use Glitter MatCap** | Off by default. Limits where glitter shows using a dedicated matcap texture's brightness, judged from the view direction: bright areas show glitter, dark areas hide it. Off never reads the matcap, so it costs nothing. | `_GlitterMatcapMaskEnabled` |
| **MatCap Texture** | The glitter-only matcap. Put a spherical highlight image here and glitter sparkles only where it is bright. Independent from the matcap layers. | `_GlitterMatcapTex` |
| **Use Color Too** | Off by default. On, the matcap's RGB also tints the glitter particles. Off uses only its brightness for the region and leaves the color alone. Either way the texture is read once. | `_GlitterMatcapUseColor` |
| **Invert** | Off by default. On, flips the brightness so glitter shows in the matcap's dark areas instead. | `_GlitterMatcapMaskInvert` |
| **Strength** | Range 0-1; default 1. How strongly the matcap's region limit applies. At 0 only the region limit disappears - the tint from Use Color Too still applies. | `_GlitterMatcapMaskStrength` |
| **Enable Shape Map** | Off by default. On, each particle's silhouette is replaced by a texture (star, heart, and so on). Off keeps the round particle and does not read the shape map. | `_GlitterShapeEnabled` |
| **Shape Map** | The silhouette of a single particle. The square is laid inside the particle, so leave a margin rather than filling to the edge. The background must be black (or alpha 0). | `_GlitterMap` |
| **Shape Channel** | Default is A. Picks which channel of the shape map carries the silhouette. Use A for a PNG with alpha, or R / Luma for a black-and-white image. | `_GlitterShapeChannel` |
| **Rotation Randomize** | Range 0-1; default 1. How far each particle is turned from the next. At 0 every particle faces the same way and the result reads as a stamped pattern; at 1 the angle is spread evenly over a full turn. Lower it only when a directional shape such as a heart should stand upright. | `_GlitterShapeRotation` |
| **Glitter Density** | Range 1-512; default 379. Sets particle-cell detail. Higher values make finer sparkles but can increase shimmer, aliasing, and procedural pattern work. | `_GlitterDensity` |
| **Glitter Particle Size** | Range 0-1; default 0.39. Screen coverage of each particle; higher makes larger sparkles, lower makes smaller points. | `_GlitterSize` |
| **Glitter Size Randomize** | Range 0-1; default 1. Randomizes particle size. 0 is uniform; 1 is more organic but less predictable. | `_GlitterScaleRandomize` |
| **Glitter Particle Contrast** | Range 0.25-128; default 50. Contrast inside each particle. Higher is crisper but can increase stepping and shimmer. | `_GlitterContrast` |
| **Glitter Post Contrast** | Range 0.1-8; default 1. Applies contrast after the particle pattern. 1 is neutral; higher removes dim pixels sooner. | `_GlitterPostContrast` |
| **Glitter View Sensitivity** | Range 0.01-64; default 0.25. Sensitivity to view changes; higher values make sparkle shift more as the camera moves. | `_GlitterSensitivity` |
| **Glitter Speed** | Range 0-4; default 0.3. Animates the view-dependent sparkle. 0 is static; higher values change faster and can make flicker more noticeable. | `_GlitterSpeed` |
| **Glitter View Parallax** | Range 0-1; default 0.52. How particles slide with view movement; higher adds depth but can shimmer more. | `_GlitterViewParallax` |
| **Glitter Normal Influence** | Range 0-1; default 1. Uses mesh and stacked-normal direction for sparkle. With normal layers off, 1 still falls back to the mesh normal. | `_GlitterNormalInfluence` |
| **Glitter Light Angle** | Range 0-1; default 1. Influence of the particle-to-light angle on sparkle brightness. | `_GlitterLightAngle` |
| **Glitter Light Direction** | Range 0-1; default 1. How strongly sparkle follows light direction; lower values make it more view-driven. | `_GlitterLightDirection` |
| **Glitter Color Randomize** | Range 0-1; default 1. Randomizes per-particle color. 0 is a single color; 1 is varied but more complex. | `_GlitterColorRandomize` |
| **Glitter Shadow Visibility** | Range 0-1; default 0.54. How much glitter remains in shadow; 0 hides it, 1 ignores the shadow gate. | `_GlitterShadowVisibility` |
| **Glitter Base Color Influence** | Range 0-1; default 0. 0 keeps the glitter color; 1 multiplies it by the Base Map. | `_GlitterBaseColorInfluence` |
| **Glitter Scene Light Influence** | Range 0-1; default 0.5. How scene-light brightness dims the glitter. | `_GlitterSceneLightInfluence` |
