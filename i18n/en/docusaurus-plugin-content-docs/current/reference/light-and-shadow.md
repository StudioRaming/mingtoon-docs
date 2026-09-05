---
id: light-and-shadow
title: Light & Shadow
sidebar_position: 2
---

# Light & Shadow

The single biggest lever on a toon look. Form Shadow (light-direction shading) and Shadow Projection (real-time cast shadow) are separate sections - keep them apart.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

## Master Adjust

One multiply and tint each over everything that adds light, over every shadow, and over the finished character.

| Control | What it does | Shader property |
|---|---|---|
| **Intensity** | Scales every light-adding layer at once - backlight, front light, fresnel rim, shadow interior reflection, 2D Rim Light and depth translucency. When a new scene makes them all read too strong or too weak, move this instead of retuning each module. 1 is neutral. | `_RimMasterIntensity` |
| **Base Color** | Color multiplied into every light-adding layer. Use it to lean the overall cast toward the scene while each module keeps its authored color. White is neutral. | `_RimMasterTint` |
| **Palette Tint Amount** | How much Shared Palette color reaches the highlight group. 0 keeps only Base Color; 1 applies the palette fully. | `_RimMasterTintAmount` |
| **Color Pad X** | Color-wheel coordinate laid over Base Color. With both X and Y at 0 nothing changes; the further from center, the stronger the tint toward that hue. | `_RimMasterColorX` |
| **Color Pad Y** | Pairs with Color Pad X to pick a spot on the color wheel. Both at 0 leaves the color unchanged. | `_RimMasterColorY` |
| **Brightness** | Brightness of the color-pad tint. 1 is neutral; lowering it darkens the affected layers even while the pad sits at center. | `_RimMasterColorValue` |
| **Intensity** | One more multiply on the shadowed area after form, AO, rim shade, cast and 2D shadows have composited. Reach for it when shadows overall read too heavy or too shallow - lit surface never moves. | `_ShadowMasterIntensity` |
| **Base Color** | Color multiplied over the whole shadowed area. Use it to lean every shadow cooler or warmer while each layer keeps its authored color. Applied only as far as the surface is shadowed. | `_ShadowMasterTint` |
| **Palette Tint Amount** | How much Shared Palette color reaches the shadowed area. 0 keeps only Base Color; 1 applies the palette fully. | `_ShadowMasterTintAmount` |
| **Color Pad X** | Color-wheel coordinate laid over the shadow Base Color. With both X and Y at 0 nothing changes; the further from center, the stronger the tint toward that hue. | `_ShadowMasterColorX` |
| **Color Pad Y** | Pairs with Color Pad X to pick a spot on the color wheel. Both at 0 leaves the color unchanged. | `_ShadowMasterColorY` |
| **Brightness** | Brightness of the color-pad tint. Lowering it darkens only the shadowed part. 1 is neutral. | `_ShadowMasterColorValue` |
| **Overall Intensity** | Brightness multiplier on the finished character after every effect. The last handle to reach for when the whole character reads too dark or too bright. Applied before fog, so distance never changes it. | `_OutputMasterIntensity` |
| **Overall Tint** | Color multiplied into the final output. Use it as the last lean of the whole character's color toward the scene. White is neutral. | `_OutputMasterTint` |
| **Palette Tint Amount** | How much Shared Palette color reaches the finished character. 0 keeps only Overall Tint; 1 applies the palette fully. | `_OutputMasterTintAmount` |
| **Color Pad X** | Color-wheel coordinate laid over the output Base Color. With both X and Y at 0 nothing changes; the further from center, the stronger the tint toward that hue. | `_OutputMasterColorX` |
| **Color Pad Y** | Pairs with Color Pad X to pick a spot on the color wheel. Both at 0 leaves the color unchanged. | `_OutputMasterColorY` |
| **Brightness** | Brightness of the color-pad tint. Lowering it darkens the entire final output. 1 is neutral. | `_OutputMasterColorValue` |
| **Edge Rim Multiplier** | Multiplies only the four layers that draw on the silhouette: 2D Rim Light, fresnel rim, backlight and the edge layer of depth translucency. One step below the multiplier above, so lowering it leaves front light, the shadow interior reflection and the translucency interior exactly where they are. 1 is neutral. | `_EdgeRimMasterIntensity` |
| **Edge Rim Maximum Multiplier** | Ceiling after those four have been added together. Each effect keeps its own settings - only the sum is held down - so the outline no longer burns to white with all four at maximum. 0 means no ceiling, and that is the default. | `_EdgeRimBrightnessMaximum` |
| **Minimum Final Brightness** | Floor that stops the character going darker than this in any scene. Raise it when dark worlds swallow the character into black. Measured as a multiplier over the completed base color. | `_LightBrightnessMinimum` |
| **Maximum Final Brightness** | Ceiling that stops the character burning brighter than this in bright scenes. At 1 the light's color survives but nothing exceeds the artwork's brightness. Lower it when strong lights blow the character out to white. | `_LightBrightnessMaximum` |

## Lighting

Configure direct and indirect lighting response.

| Control | What it does | Shader property |
|---|---|---|
| **Yaw** | Horizontal angle of the virtual key light. Set it while watching where the shading falls on the face. In-game nudges belong to Yaw Offset, not here. In a world with no light and flat ambient, this angle sets the shadow direction even with the virtual light off. | `_MingVirtualLightYaw` |
| **Pitch** | Vertical angle of the virtual key light. Lighting from above reads natural; from below reads like horror lighting. In-game nudges belong to Pitch Offset. In a world with no light and flat ambient, this angle sets the shadow direction even with the virtual light off. | `_MingVirtualLightPitch` |
| **Light Color** | Color of the virtual key light. It lights the character in place of - or on top of - the world light, so start white and lean it only slightly toward the scene's mood. | `_MingVirtualLightColor` |
| **Color Pad X** | Color-wheel coordinate laid over Light Color. With both X and Y at 0 nothing changes; the further from center, the stronger the tint toward that hue. | `_MingVirtualLightColorX` |
| **Color Pad Y** | Pairs with Color Pad X to pick a spot on the color wheel. Both at 0 leaves the color unchanged. | `_MingVirtualLightColorY` |
| **Brightness** | Brightness of the color-pad tint. It multiplies with Light Intensity, so usually leave it at 1 and adjust Light Intensity instead. | `_MingVirtualLightColorValue` |
| **Light Intensity** | Brightness of the virtual key light. In Replace mode this is the key light's whole brightness; in Add mode it is how much sits on top of the world light. | `_MingVirtualLightIntensity` |
| **Lit Brightness** | Overall brightness multiplier on the lit side. 1 is neutral; raising it easily blows the lit areas out to white. | `_LitBrightness` |
| **Environment Color Influence** | Controls how strongly light-probe and ambient color washes over the surface. At 0 it adds no environment hue; at 1 it uses as much environment color as possible without raising brightness. Indirect-light brightness is controlled separately below. | `_EnvironmentColorInfluence` |
| **Indirect Light Lift** | Controls the brightness lift supplied by light-probe and ambient indirect light. At 0 it adds no indirect brightness; at 1 it uses the environment at its authored strength. How much its color tints the surface is controlled separately by Environment Color Influence. | `_IndirectStrength` |
| **Preserve Base Map Color** | Controls only how much the scene-light hue tints the completed base color. At 0 the light hue is fully applied; at 1 the base color is preferred. It never preserves or changes lighting energy. | `_BaseColorPreservation` |
| **Scene Light Color Influence** | How much the scene light's hue tints the character. At 0 every light reads as white; at 1 a red light turns the character red. This controls hue only, not brightness. | `_LightColorInfluence` |
| **Main Light Response** | Remaps the main-light brightness ratio through the four-point curve below. Off preserves the original light calculation. | `_LightResponseApplyMain` |
| **Additional Light Final Attenuation Response** | Remaps the final distance-and-shadow attenuation response of point, spot, and other additional lights with the same curve. A physically zero attenuation outside the light range never comes back. Vertex additional-light variants receive distance attenuation only because URP does not provide per-light shadow attenuation in that path. | `_LightResponseApplyAdditional` |
| **Response Point 0 (Dark)** | Output at input 0. The value is safely constrained to 0~1. | `_LightResponseCurvePoint0` |
| **Response Point 1 (1/3)** | Output at input 1/3. Values below the previous point are raised automatically to keep the curve monotonic. | `_LightResponseCurvePoint1` |
| **Response Point 2 (2/3)** | Output at input 2/3. Raise it to retain bright regions sooner. | `_LightResponseCurvePoint2` |
| **Response Point 3 (Bright)** | Output at input 1. The default 1 passes bright light through unchanged. | `_LightResponseCurvePoint3` |
| **Additional Light Receive** | How much point, spot and other additional lights reach the character. Lower it when stray world lights make the character flare; 0 ignores additional lights entirely. | `_AdditionalLightReceive` |
| **Additional Light Intensity** | Brightness multiplier on the additional light that was received. Additional Light Receive decides whether it comes in; adjust this when what comes in is too strong or too weak. The light's color is untouched. | `_AdditionalLightIntensity` |
| **Preserve Base Color under Additional Lights** | 1 preserves the original base color most; 0 fully applies the additional-light color. | `_AdditionalLightBasePreservation` |
| **Additional Light Energy Cap** | Caps the energy that point, spot and other additional lights add to the final surface brightness. The default 0.35 is a safe starting point that keeps strong colored lights from pushing highlights to white. It limits brightness contribution only; Additional Light Color Influence still preserves the light's hue. | `_AdditionalLightBrightnessMaximum` |
| **VRC Light Volumes (Test)** | An in-editor test toggle. A VRChat upload turns the module on automatically regardless of this value, reading the VRC Light Volumes the world placed instead of Unity light probes. In a world without volumes it falls back to probes and the picture is unchanged. Turning it on in the editor compiles one more variant and adds a Texture3D read, so enable it only to preview the look in a volume world. Built-in only; the row does not appear on a URP material. | `_LightVolumesEnabled` |
| **Volume Intensity** | Scales all of the indirect light read from the world's volumes. 1 is exactly what the world baked; raising it reads as that room's ambient getting stronger. In a world without volumes the shader falls back to probes, so no value here changes the picture. | `_LightVolumesIntensity` |
| **Darkening Response** | Controls how much darkening is retained when the volume energy is below neutral 1. At 0 darkening is ignored; at 1 the world's baked darkness is used unchanged. The default 0.5 keeps half of the departure from neutral. | `_LightVolumesDarkening` |
| **Brightening Response** | Controls how much brightening is retained when the volume energy is above neutral 1. At 0 extra brightness is ignored; at 1 the world's baked brightness is used unchanged. This is independent of Darkening Response. | `_LightVolumesBrightening` |
| **Normal Bias** | Pushes the point where the volume is sampled along the surface normal. Raise it when a face pressed against a wall or floor picks up a dark grid cell and blotches. Too much makes the shading look detached from the surface, so stop at the smallest value that clears the blotching. | `_LightVolumesNormalBias` |
| **Point Light Shadows** | Sets how much of the world's baked occlusion the volume point lights obey. 1 is the default behavior; 0 lets the point lights through with no shadowing at all. In a world that baked no occlusion this makes no difference at any value. | `_LightVolumesPointShadows` |
| **Volume Specular** | Builds an environment highlight out of the volume's directional component. It needs PBR Surface on, and works independently of Reflection Strength, so a toon material that keeps reflection at 0 can still use it. Dominant is the cheap tier that uses a single direction; Full evaluates all three color axes. It is a soft highlight and does not pass through toon banding. | `_LightVolumesSpecularMode` |
| **Volume Specular Intensity** | How strong the volume specular is. It has no effect while Volume Specular is off. | `_LightVolumesSpecularStrength` |
| **Shadow Ambient Influence** | How much the shadow takes on the ambient light's hue. Raise it when a sunset world leaves the shadows looking pasted on. It borrows color only, not brightness, and applies only where the surface is shadowed. | `_ShadowAmbientInfluence` |

## Form Shadow

Configure shape-based shade thresholds and softness.

| Control | What it does | Shader property |
|---|---|---|
| **Form Shadow** | Toggles the form shadow - the toon shading that follows light direction. Off, the character loses its shading bands and only cast and 2D shadows remain. | `_FormShadowEnabled` |
| **1st Shadow Border** | Where the 1st shadow boundary sits. Raising it spreads the shadow toward the lit side; lowering it pulls it back. The first value to touch when the shadow covers too much or too little. | `_FormShadowMidPoint` |
| **1st Shadow Blur** | Width of the terminator blur. Near 0.001 gives the hard cel edge; above 0.3 becomes a soft gradient. This is the most frequently adjusted control in the product. | `_FormShadowSoftness` |
| **1st Shadow Color** | Color of the 1st form shadow. A calm color slightly darker than the base reads softer than plain black. While Unified Shadow mode is on, the unified color is used instead. | `_FormShadowColor` |
| **1st Shadow Brightness** | Brightness multiplier on the first form-shadow color. Lower is darker; it has no effect while the Shadow Color module is off. | `_FormShadowBrightness` |
| **Enable 2nd Shadow** | Adds a second, deeper shadow band for a three-tone cel look. While off, the 2nd brightness and blur rows do nothing. | `_FormShadow2ndEnabled` |
| **2nd Shadow Color** | Color of the 2nd, deeper form shadow. Usually darker than the 1st. Visible only while the 2nd shadow is enabled. | `_FormShadow2ndColor` |
| **2nd Shadow Brightness** | Brightness multiplier on the second form-shadow color. Keep it below the 1st shadow so the two bands read apart. Ignored while Enable 2nd Shadow is off. | `_FormShadow2ndBrightness` |
| **Blend Opacity** | How strongly the 1st shadow color blends into the result. Lower it when the shadow color covers too heavily; at 0 the color is not applied at all. | `_FormShadowColorBlendOpacity` |
| **2nd Shadow Border** | Boundary of the 2nd shadow. Keep it on the darker side of the 1st boundary so the two bands separate cleanly. | `_FormShadow2ndMidPoint` |
| **2nd Shadow Blur** | Width of the second shadow's edge blur. Keeping it tighter than the 1st shadow makes the inner band read crisply. Ignored while Enable 2nd Shadow is off. | `_FormShadow2ndSoftness` |
| **Front Light Shadow Shift** | Shifts the form-shadow boundary toward the lit side when view and light face the same way (V·L > 0). Range 0-1, default 0; the gap between both bands is preserved. | `_FormShadowFrontLightShift` |
| **Back Light Shadow Shift** | Shifts the form-shadow boundary on the back-lit side when view and light oppose (V·L &lt; 0). Range 0-1, default 0; the gap between both bands is preserved. | `_FormShadowBackLightShift` |
| **Use Shadow Boundary** | Enables the colored boundary effect between lit and shadowed regions. Off also skips its boundary work. | `_ShadowBorderEnabled` |
| **Boundary Color** | Color laid along the 1st shadow boundary - typically a faint warm red on skin terminators. Set its Blend Opacity to 0 to turn it off. | `_ShadowBorderColor` |
| **Boundary Overlay Mode** | Whether the boundary color band straddles the terminator or stays inside the shadow side only. On, it crosses into the lit side for a thick colored terminator; off, it stays inside the shadow and reads cleaner. | `_ShadowBorderOverlay` |
| **Boundary Width** | Width of the colored band laid on the terminator. At 0 nothing is drawn, so the boundary color, blur and strength rows are all ignored. It also needs the Shadow Color module on and either Form Shadow or Cast Shadow active. On the 2D shadow the band lands only where the silhouette itself is soft - a blurred edge, the depth ramp - so a fully covered area keeps exactly the form shadow's core colour. | `_ShadowBorderWidth` |
| **Boundary Blur** | Blur width at the edge of the boundary band. Ignored while Boundary Width is 0. | `_ShadowBorderBlur` |
| **Boundary Intensity** | Opacity of the boundary band. At 0 the band stays invisible no matter how wide it is. On the 2D shadow the band lands only on the silhouette's soft edge, so a fully covered area's colour does not depend on this value. | `_ShadowBorderStrength` |
| **Boundary Base Map Mix** | 0 draws the boundary in the flat color you picked; 1 blends it with the Base Map so each material area gets its own boundary tint. Raise it when skin and hair share one material. | `_ShadowBorderBaseColorMix` |
| **Blend Opacity** | How strongly the 2nd shadow color blends into the result. At 0 the color is not applied at all. | `_FormShadow2ndColorBlendOpacity` |
| **Blend Opacity** | How strongly the boundary color blends in. At 0 the boundary color is fully off. | `_ShadowBorderColorBlendOpacity` |

## Shadow Color

Configure toon-shadow colors and blending by band.

| Control | What it does | Shader property |
|---|---|---|
| **Shadow Color** | Master switch for shadow coloring. Off, the colors authored for form, cast and 2D shadows - and the boundary color - are not applied. | `_ShadowColorEnabled` |
| **Unified Shadow Color** | The single color every shadow converges on. RGB multiplies the base color and the alpha is the amount, so at alpha 0 the shadow stays the plain base color no matter what hue you pick. Unused while Unified Shadow is off. | `_MingUnifiedShadowColor` |
| **Gamma** | Applies gamma to the shadow value axis after chroma and level while preserving hue and saturation. 1 is neutral; above 1 lifts midtones, while below 1 deepens them. | `_MingUnifiedShadowGamma` |

## Shadow Projection

Configure cast shadows projected onto this material and their edge feather.

| Control | What it does | Shader property |
|---|---|---|
| **Shadow Projection** | Whether the character receives projected (cast) shadows from other objects and itself. Off, scene shadows never land on the character. | `_CastShadowEnabled` |
| **Receive Intensity** | How much real-time cast shadow this surface receives. At 0 cast shadows vanish and the brightness, blend and indirect-lift rows below stop showing any result. | `_CastShadowReceiveStrength` |
| **PBR / Toon Blend** | 0 keeps Unity's soft shadow falloff; 1 snaps it into a hard toon band. The band's width comes from Cast Toon Band Softness. | `_CastShadowToonBlend` |
| **Unify With 2D Shadow** | Ties the 2D shadow to the cast-shadow color so overlapping areas do not darken twice. While on, the cast-shadow color is used in place of the 2D shadow color. | `_LinkDepthShadowToCastShadow` |
| **Suppress Self Cast Shadow** | Reduces the real-time shadow a mesh casts onto itself. Turn it on when faces or cloth folds get blotchy shadow acne. While off, the bias row below is ignored. | `_SelfShadowCasterBiasEnabled` |
| **Self Shadow Caster Bias** | How far the shadow caster is pushed off the surface. Large values remove acne but detach contact shadows and drop the shadow on thin parts. 0.01-0.03 is a safe band. It fades automatically under backlight to protect the contact silhouette, and applies to directional lights only. Ignored while Suppress Self Cast Shadow is off. | `_SelfShadowCasterBias` |
| **Cast Indirect Lift** | Adds the ambient (SH) light back into cast shadows as an additive floor, so they cannot punch to black in a bright environment. Attenuation multiplies only the direct light while ambient adds on top, so it works identically in Unified Shadow mode; in a scene with no ambient it adds nothing. | `_CastShadowIndirectLift` |
| **Suppress Backlit Silhouette** | Skips cast shadow on faces turned away from the light. It removes the second character-shaped silhouette that otherwise appears on the body under backlight. | `_CastShadowBackfaceSuppression` |
| **Backlit Suppression Offset** | How far past the form-shadow boundary, toward the dark side, backlit suppression starts erasing the cast shadow. Half of 1st Shadow Blur is added on top, so the cast shadow's fade-out edge always hides inside the form shadow. At 0 the seam can show right next to the lit area. | `_CastShadowBackfaceSuppressionOffset` |
| **Cast Shadow Tint** | Tint applied to received cast shadows. Matching it to the 1st shadow color keeps the two from clashing where they overlap. Ignored while Unified Shadow mode is on. | `_CastShadowColor` |
| **Cast Shadow Brightness** | Brightness multiplier on the cast-shadow color. While the Shadow Color module is off, cast shadows are a plain darkening and this value is ignored. | `_CastShadowBrightness` |
| **Blend Opacity** | How strongly the cast shadow tint blends into the result. At 0 the tint is not applied at all. | `_CastShadowColorBlendOpacity` |

## shadow.pattern.group

| Control | What it does | Shader property |
|---|---|---|
| **Enable Shadow Pattern** | Applies a screentone to the form shadow, the 2D shadow, or both. The lattice follows the mesh/rest-pose frame, keeping the same mark count on a surface region across camera distance and FOV changes. | `_ShadowPatternEnabled` |
| **Enable Unified Shadow** | Collapses form, cast and 2D shadows onto one final color so overlaps do not double-darken. While it is on, the individual shadow color, blend and brightness controls no longer affect the render; their values are preserved. | `_UnifiedShadowEnabled` |
| **Pattern Target** | Selects form shadow, 2D shadow, or both. Real-time cast-shadow sampling itself is not patterned by this selector. | `_ShadowPatternTarget` |
| **Pattern Style** | Recolor redraws the shadow coverage as the screentone shape, so the strokes take the shadow color. Overlay keeps the shadow as authored and prints the pattern on top in the Ink Color. | `_ShadowPatternStyle` |
| **Ink Color** | Ink color the screentone strokes print with in Overlay style. Recolor style reuses the shadow color instead, so this color is not used there. | `_ShadowPatternColor` |
| **Blend Opacity** | How strongly the ink color blends in. Lower it for a subtler tone; at 0 the ink is invisible. | `_ShadowPatternColorBlendOpacity` |
| **Pattern Density** | How many cells fill one mesh-projection unit. One cell is one tile repeat, so enabling a shape tile never changes surface density. | `_ShadowPatternScale` |
| **Distance Compensation** | At 1 the cell count is fully locked to the mesh. Lower values approach the former fixed-screen-density response while the pattern phase still follows the mesh. | `_ShadowPatternDistanceCompensation` |
| **FOV / Projection Compensation** | At 1 the same mesh region keeps its pattern density across perspective FOV and orthographic-size changes. At 0 camera projection changes affect density. | `_ShadowPatternProjectionCompensation` |
| **Pattern Rotation** | Angle of the pattern grid. Around 45 degrees reads like printed halftone; 0 aligns with the pixel grid and tends to moire. | `_ShadowPatternRotation` |
| **Pattern Edge Softness** | The blur width at the mark's edge. The width actually used is the larger of this and the pixel footprint, so the edge never breaks into stair-steps as the camera pulls back. Near 0 can look stair-stepped up close; 0.02-0.1 is the comfortable band. | `_ShadowPatternSoftness` |
| **Pattern Intensity** | Mix between the original smooth shadow and the patterned one. At 0 no pattern is visible at all. | `_ShadowPatternStrength` |
| **Keep Pattern In Full Shadow** | Keeps part of the cell open even in the deepest shadow. While off, the fill-level row below is ignored and deep shadow fills solid. | `_ShadowPatternFullShadowEnabled` |
| **Full Shadow Fill** | Closer to 1 approaches a solid fill; lower values leave more of the pattern visible at the darkest point. Ignored while Keep Pattern In Full Shadow is off. | `_ShadowPatternFullShadowLevel` |
| **Use Shape Tile** | Swaps the shape drawn inside each cell for a tile image. While off the analytic round dot is used and no texture is read at all, so the module costs exactly what it did before. | `_ShadowPatternTileEnabled` |
| **Shape Tile** | The five shipped tiles - dots, fine dots, lines, crosshatch, stipple - are in Assets/StudioRaming/MingToon/Textures/Patterns. A tile is a threshold map, not a picture of a pattern: each texel holds the tone at which it turns to ink, which is how one tile covers everything from the first speck to solid. Author your own with sRGB off and every level occupying the same texel count. One lattice cell is one tile repeat, so there is no Tiling/Offset. | `_ShadowPatternTile` |

## section.performance

| Control | What it does | Shader property |
|---|---|---|
| **Performance Distance (m)** | Inside this distance from the camera more of the heavy modules run. Within 0.4x of it (near) everything runs; from 0.4x up to this distance (mid) the modules stay on and only the sample-count ceiling drops one step; beyond it (far) the camera-depth effects, PBR, matcap, extra normal layers, rim, back/front light, toon specular, glitter, screen tone and shadow interior reflection switch off and only the base shading is left. Combined with the existing VRC Quality Tier by taking the lower of the two, so a tier you already lowered stays the ceiling. The real threshold is this value multiplied by Performance Distance Scale. | `_PerfDistanceMax` |
| **Performance Distance Scale** | Multiplier on Performance Distance (m). 1 is the default, 0 pins the material to the cheapest state at any distance, and raising it widens the near look by the same factor. This is the value the separately sold Ming Light Controller (MLC) add-on drives from an in-game menu - turn it down to 0 in a crowded instance to cut lag, raise it for photos to keep the near look further out. | `_PerfDistanceScale` |
