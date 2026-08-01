---
id: shadow
title: Shadow
sidebar_position: 3
---

# Shadow

The single biggest lever on a toon look. Form shadow (the light-direction shading) and cast shadow (real-time projected shadow) are separate sets of controls - keep them apart.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

## Form Shadow

Configure shape-based shade thresholds and softness.

| Control | What it does | Shader property |
|---|---|---|
| **1st Shadow Blur** | Width of the terminator blur. Near 0.001 gives the hard cel edge; above 0.3 becomes a soft gradient. This is the most frequently adjusted control in the product. | `_FormShadowSoftness` |
| **1st Shadow Brightness** | Brightness multiplier on the first form-shadow color. Lower is darker; it has no effect while the Shadow Color module is off. | `_FormShadowBrightness` |
| **2nd Shadow Brightness** | Brightness multiplier on the second form-shadow color. Keep it below the 1st shadow so the two bands read apart. Ignored while Enable 2nd Shadow is off. | `_FormShadow2ndBrightness` |
| **Enable 2nd Shadow** | Adds a second, deeper shadow band for a three-tone cel look. While off, the 2nd brightness and blur rows do nothing. | `_FormShadow2ndEnabled` |
| **2nd Shadow Blur** | Width of the second shadow's edge blur. Keeping it tighter than the 1st shadow makes the inner band read crisply. Ignored while Enable 2nd Shadow is off. | `_FormShadow2ndSoftness` |
| **Use Shadow Boundary** | Enables the colored boundary effect between lit and shadowed regions. Off also skips its boundary work. | `_MingShadowBorderEnabled` |
| **Boundary Overlay Mode** | Whether the boundary color band straddles the terminator or stays inside the shadow side only. On, it crosses into the lit side for a thick colored terminator; off, it stays inside the shadow and reads cleaner. | `_MingShadowBorderOverlay` |
| **Boundary Width** | Width of the colored band laid on the terminator. At 0 nothing is drawn, so the boundary color, blur and strength rows are all ignored. It also needs the Shadow Color module on and either Form Shadow or Cast Shadow active. | `_ShadowBorderWidth` |
| **Boundary Blur** | Blur width at the edge of the boundary band. Ignored while Boundary Width is 0. | `_ShadowBorderBlur` |
| **Boundary Strength** | Opacity of the boundary band. At 0 the band stays invisible no matter how wide it is. | `_ShadowBorderStrength` |
| **Boundary Base Map Mix** | 0 draws the boundary in the flat color you picked; 1 blends it with the Base Map so each material area gets its own boundary tint. Raise it when skin and hair share one material. | `_ShadowBorderBaseColorMix` |

## Shadow Color

Configure toon-shadow colors and blending by band.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Unified Shadow** | Collapses form, cast and 2D shadows onto one final color so overlaps do not double-darken. While it is on, the individual shadow color, blend and brightness controls no longer affect the render; their values are preserved. | `_MingUnifiedShadowEnabled` |
| **Unified Shadow Color** | The single color every shadow converges on. RGB multiplies the base color and the alpha is the amount, so at alpha 0 the shadow stays the plain base color no matter what hue you pick. Unused while Unified Shadow is off. | `_MingUnifiedShadowColor` |

## Shadow Projection

Configure cast shadows projected onto this material and their edge feather.

| Control | What it does | Shader property |
|---|---|---|
| **Receive Strength** | How much real-time cast shadow this surface receives. At 0 cast shadows vanish and the brightness, blend and indirect-lift rows below stop showing any result. | `_CastShadowReceiveStrength` |
| **PBR / Toon Blend** | 0 keeps Unity's soft shadow falloff; 1 snaps it into a hard toon band. The band's width comes from Cast Toon Band Softness. | `_CastShadowToonBlend` |
| **Unify With 2D Shadow** | Ties the 2D shadow to the cast-shadow color so overlapping areas do not darken twice. While on, the cast-shadow color is used in place of the 2D shadow color. | `_LinkDepthShadowToCastShadow` |
| **Suppress Self Cast Shadow** | Reduces the real-time shadow a mesh casts onto itself. Turn it on when faces or cloth folds get blotchy shadow acne. While off, the bias row below is ignored. | `_SelfShadowCasterBiasEnabled` |
| **Self Shadow Caster Bias** | How far the shadow caster is pushed off the surface. Large values remove acne but detach contact shadows and drop the shadow on thin parts. 0.01-0.03 is a safe band. Ignored while Suppress Self Cast Shadow is off. | `_SelfShadowCasterBias` |
| **Cast Indirect Lift** | Fades cast shadows where ambient light is strong, so indoor and outdoor lighting differences absorb naturally. Near 1 cast shadows almost disappear in bright scenes. | `_CastShadowIndirectLift` |
| **Suppress Backlit Silhouette** | Skips cast shadow on faces turned away from the light. It removes the second character-shaped silhouette that otherwise appears on the body under backlight. | `_CastShadowBackfaceSuppression` |
| **Cast Shadow Brightness** | Brightness multiplier on the cast-shadow color. While the Shadow Color module is off, cast shadows are a plain darkening and this value is ignored. | `_CastShadowBrightness` |
| **Face Cast Stabilization** | Cleans up the blotches that appear when real-time shadow grazes a soft surface such as a face. While off, the strength and grazing-threshold rows below are ignored; with Cast Shadow itself off, turning this on changes nothing. | `_MingFaceCastStabilizationEnabled` |
| **Stabilization Strength** | How strongly face cast stabilization is applied. Too high also fades intended shadows such as the bangs shadow. Ignored while Face Cast Stabilization is off. | `_MingFaceCastStabilizationStrength` |
| **Grazing Angle Threshold** | How far the light must fall away from the face-forward axis to count as grazing. Raising it applies the correction across a wider range of light angles; near 0 it only kicks in at near-perfect side light. Ignored while Face Cast Stabilization is off. | `_MingFaceCastGrazingThreshold` |

## Shadow Pattern (Screentone)

| Control | What it does | Shader property |
|---|---|---|
| **Enable Shadow Pattern** | Applies a screentone to the form shadow, the 2D shadow, or both. The lattice follows the mesh/rest-pose frame, keeping the same mark count on a surface region across camera distance and FOV changes. | `_ShadowPatternEnabled` |
| **Pattern Target** | Selects form shadow, 2D shadow, or both. Real-time cast-shadow sampling itself is not patterned by this selector. | `_ShadowPatternTarget` |
| **Pattern Density** | How many cells fill one mesh-projection unit. One cell is one tile repeat, so enabling a shape tile never changes surface density. | `_ShadowPatternScale` |
| **Distance Compensation** | At 1 the cell count is fully locked to the mesh. Lower values approach the former fixed-screen-density response while the pattern phase still follows the mesh. | `_ShadowPatternDistanceCompensation` |
| **FOV / Projection Compensation** | At 1 the same mesh region keeps its pattern density across perspective FOV and orthographic-size changes. At 0 camera projection changes affect density. | `_ShadowPatternProjectionCompensation` |
| **Pattern Rotation** | Angle of the pattern grid. Around 45 degrees reads like printed halftone; 0 aligns with the pixel grid and tends to moire. | `_ShadowPatternRotation` |
| **Pattern Edge Softness** | The blur width at the mark's edge. The width actually used is the larger of this and the pixel footprint, so the edge never breaks into stair-steps as the camera pulls back. Near 0 can look stair-stepped up close; 0.02-0.1 is the comfortable band. | `_ShadowPatternSoftness` |
| **Pattern Strength** | Mix between the original smooth shadow and the patterned one. At 0 no pattern is visible at all. | `_ShadowPatternStrength` |
| **Keep Pattern In Full Shadow** | Keeps part of the cell open even in the deepest shadow. While off, the fill-level row below is ignored and deep shadow fills solid. | `_ShadowPatternFullShadowEnabled` |
| **Full Shadow Fill** | Closer to 1 approaches a solid fill; lower values leave more of the pattern visible at the darkest point. Ignored while Keep Pattern In Full Shadow is off. | `_ShadowPatternFullShadowLevel` |
| **Use Shape Tile** | Swaps the shape drawn inside each cell for a tile image. While off the analytic round dot is used and no texture is read at all, so the module costs exactly what it did before. | `_ShadowPatternTileEnabled` |
| **Shape Tile** | The five shipped tiles - dots, fine dots, lines, crosshatch, stipple - are in Assets/StudioRaming/MingToon/Textures/Patterns. A tile is a threshold map, not a picture of a pattern: each texel holds the tone at which it turns to ink, which is how one tile covers everything from the first speck to solid. Author your own with sRGB off and every level occupying the same texel count. One lattice cell is one tile repeat, so there is no Tiling/Offset. | `_ShadowPatternTile` |
