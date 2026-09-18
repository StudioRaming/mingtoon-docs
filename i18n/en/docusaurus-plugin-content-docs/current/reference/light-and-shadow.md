---
id: light-and-shadow
title: Lighting and Shadows
sidebar_position: 2
---

# Lighting and Shadows

These fields shape the impression of a toon look more than anything else. Form shadow and shadow projection are separate sections.

This page is a table for looking up values. If you want the order to turn things on in, see the [Light and Shadow guide](/guides/light-and-shadow).

The headings and order follow the inspector's section names and display order exactly.

The fields inside map and mask slots are the same in every slot.

Channel, remap, feather and mask UV are written once in the [Shared Texture Slot UI](/guides/texture-modules).

## Master Adjust {#마스터-조정}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Everything That Adds Light · Intensity** | Float | 0 ~ 4 | 1 | Scales every light-adding layer at once - Edge Rim, front light, Fresnel rim… |
| **Everything That Adds Light · Base Color** | Color | - | White | Color multiplied into every light-adding layer |
| **Everything That Adds Light · Palette Tint Amount** | Float | 0 ~ 1 | 1 | How much Shared Palette color reaches the highlight group |
| **Everything That Adds Light · Color Pad X** | Float | -1 ~ 1 | 0 | Color-wheel coordinate laid over Base Color |
| **Everything That Adds Light · Color Pad Y** | Float | -1 ~ 1 | 0 | Pairs with Color Pad X to pick a spot on the color wheel |
| **Everything That Adds Light · Brightness** | Float | 0 ~ 1 | 1 | Brightness of the color-pad tint |
| **Edge Rim Multiplier** | Float | 0 ~ 4 | 1 | Multiplies only Depth Rim Light, Fresnel Rim, Edge Rim and the edge layer of SSSSS… |
| **Edge Rim Maximum Multiplier** | Float | 0 ~ 8 | 0 | Ceiling after those four have been added together |
| **Edge Rim Minimum Multiplier** | Float | 0 ~ 1 | 0.5 | The floor on the light response of the rims that follow the light - Edge Rim, Fresnel Rim and Depth Rim Light |
| **Every Shadow · Intensity** | Float | 0 ~ 4 | 1 | One more multiply on the shadowed area after form, AO, rim shade, cast and depth… |
| **Every Shadow · Base Color** | Color | - | White | Color multiplied over the whole shadowed area |
| **Every Shadow · Palette Tint Amount** | Float | 0 ~ 1 | 1 | How much Shared Palette color reaches the shadowed area |
| **Every Shadow · Color Pad X** | Float | -1 ~ 1 | 0 | Color-wheel coordinate laid over the shadow Base Color |
| **Every Shadow · Color Pad Y** | Float | -1 ~ 1 | 0 | Pairs with Color Pad X to pick a spot on the color wheel |
| **Every Shadow · Brightness** | Float | 0 ~ 1 | 1 | Brightness of the color-pad tint |
| **Environment Intensity** | Float | 0 ~ 4 | 1 | Scales everything the world contributes to the character at once - Environment… |
| **Overall Intensity** | Float | 0 ~ 4 | 1 | Brightness multiplier on the finished character after every effect |
| **Overall Saturation** | Float | 0 ~ 10 | 1 | Saturation of the finished character after every effect |
| **Overall Emission Intensity** | Float | 0 ~ 4 | 1 | Multiplies the final combined contribution of both emission layers and MatCap… |
| **Overall Tint** | Color | - | White | Color multiplied into the final output |
| **Final Output · Palette Tint Amount** | Float | 0 ~ 1 | 1 | How much Shared Palette color reaches the finished character |
| **Final Output · Color Pad X** | Float | -1 ~ 1 | 0 | Color-wheel coordinate laid over the output Base Color |
| **Final Output · Color Pad Y** | Float | -1 ~ 1 | 0 | Pairs with Color Pad X to pick a spot on the color wheel |
| **Final Output · Brightness** | Float | 0 ~ 1 | 1 | Brightness of the color-pad tint |
| **Performance Distance (m)** | Float | 1 ~ 50 | 5 | Inside this distance from the camera more of the heavy modules run |
| **Performance Distance Scale** | Float | 0 ~ 2 | 1 | Multiplier on Performance Distance (m) |

## Lighting {#라이팅}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Lit Brightness** | Float | 0 ~ 2 | 1 | Overall brightness multiplier on the lit side |
| **Environment Color Influence** | Float | 0 ~ 1 | 1 | Controls how strongly light-probe and ambient color washes over the surface |
| **Indirect Light Lift** | Float | 0 ~ 2 | 1 | Controls the brightness lift supplied by light-probe and ambient indirect light |
| **Preserve Base Map Color** | Float | 0 ~ 1 | 0.1 | Controls only how much the scene-light hue tints the completed base color |
| **Scene Light Color Influence** | Float | 0 ~ 1 | 1 | How much the scene light's hue tints the character |
| **Main Light Response** | Float | - | 0 | Remaps the main-light brightness ratio through the four-point curve below |
| **Additional Light Final Attenuation Response** | Float | - | 0 | Remaps the final distance-and-shadow attenuation response of point, spot, and… |
| **Response Point 0 (Dark)** | Float | 0 ~ 1 | 0 | Output at input 0 |
| **Response Point 1 (1/3)** | Float | 0 ~ 1 | 0.3333 | Output at input 1/3 |
| **Response Point 2 (2/3)** | Float | 0 ~ 1 | 0.6667 | Output at input 2/3 |
| **Response Point 3 (Bright)** | Float | 0 ~ 1 | 1 | Output at input 1 |
| **Minimum Final Brightness** | Float | 0 ~ 4 | 0.2 | Floor that stops the character going darker than this in any scene |
| **Maximum Final Brightness** | Float | 0 ~ 8 | 1 | Ceiling that stops the character burning brighter than this in bright scenes |
| **Soften Near The Ceiling** | Float | 0 ~ 1 | 0.2 | Controls how smoothly the main and additional scene lights |
| **Added Light Brightness Maximum** | Float | 0 ~ 8 | 3 | Applies a final-output ceiling to every additive effect, including Edge Rim |
| **Additional Light Reception** | Float | 0 ~ 1 | 1 | Directly scales the RGB peak brightness of point, spot, and other additional… |
| **Additional Light Intensity** | Float | 0 ~ 4 | 1 | Final multiplier applied directly to RGB peak brightness without hidden 0.2-0.5… |
| **Additional Light Color Influence** | Float | 0 ~ 1 | 1 | Controls how much additional-light color affects the surface color |
| **Preserve Base Color under Additional Lights** | Float | 0 ~ 1 | 0 | 1 preserves the original base color most; 0 fully applies the additional-light… |
| **Surface Direction and Toon Shading Influence** | Float | 0 ~ 1 | 1 | Controls how closely additional lights follow surface direction and toon-shading… |
| **Additional Light PBR / Toon Blend** | Float | 0 ~ 1 | 1 | At 0, uses a smooth standard diffuse direction response; at 1, uses the… |
| **Additional Light Toon Threshold** | Float | -1 ~ 1 | 0 | Sets the normal-to-light threshold where an additional light enters the lit toon… |
| **Additional Light Toon Softness** | Float | 0.001 ~ 1 | 0.5 | Sets the transition width of the additional-light toon band |
| **Additional Light Effect Influence** | Float | 0 ~ 1 | 1 | Controls additional-light contribution to light-reactive effects such as the… |
| **Additional Light Energy Cap** | Float | 0 ~ 4 | 0.35 | Caps the energy that point, spot and other additional lights add to the final… |
| **VRC Light Volumes (Test)** | Toggle | - | Off | An in-editor test toggle |
| **Volume Intensity** | Float | 0 ~ 4 | 1 | Scales all of the indirect light read from the world's volumes |
| **Darkening Response** | Float | 0 ~ 1 | 0.8 | Controls how much darkening is retained when the volume energy is below neutral… |
| **Brightening Response** | Float | 0 ~ 1 | 1 | Controls how much brightening is retained when the volume energy is above… |
| **Normal Bias** | Float | 0 ~ 0.25 | 0.01 | Pushes the point where the volume is sampled along the surface normal |
| **Point Light Shadows** | Float | 0 ~ 1 | 1 | Sets how much of the world's baked occlusion the volume point lights obey |
| **Volume Specular** | Enum | Off / Dominant / Full | Off | Builds an environment highlight out of the volume's directional component |
| **Volume Specular Intensity** | Float | 0 ~ 4 | 1 | How strong the volume specular is |
| **Virtual Key Light** | Toggle | - | Off | A fake key light for worlds that ship no directional light |
| **Mode** | Float | - | 0 | Auto preserves the color and brightness of world lights, Light Volumes, and… |
| **Follow Character Front** | Toggle | - | Off | On, the key holds the same angle relative to the face however the character… |
| **Yaw** | Float | -180 ~ 180 | 0 | Horizontal angle of the virtual key light |
| **Pitch** | Float | -89 ~ 89 | 20 | Vertical angle of the virtual key light |
| **Light Color** | Color | - | White | Color of the virtual key light |
| **Color Pad X** | Float | -1 ~ 1 | 0 | Color-wheel coordinate laid over Light Color |
| **Color Pad Y** | Float | -1 ~ 1 | 0 | Pairs with Color Pad X to pick a spot on the color wheel |
| **Brightness** | Float | 0 ~ 1 | 1 | Brightness of the color-pad tint |
| **Light Intensity** | Float | 0 ~ 4 | 0.3 | Brightness of the virtual key light |
| **Yaw Offset** | Float | -180 ~ 180 | 0 | Added on top of the yaw above |
| **Pitch Offset** | Float | -89 ~ 89 | 0 | Added on top of the pitch above |

## Form Shadow {#형태-그림자}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Form Shadow** | Toggle | - | On | Toggles the form shadow - the toon shading that follows light direction |
| **Normal Map Influence** | Float | 0 ~ 1 | 1 | 0 uses the mesh normal; 1 applies the complete stacked normal result |
| **1st Shadow Border** | Float | -1 ~ 1 | 0 | Where the 1st shadow boundary sits |
| **1st Shadow Blur** | Float | 0.001 ~ 2 | 0.3 | Width of the terminator blur |
| **1st Shadow Blend Amount** | Float | 0 ~ 1 | 1 | How strongly the 1st shadow color blends into the result |
| **Remove Default Face Form Shadow** | Float | 0 ~ 1 | 0 | At 1 the form shadow is erased on the face area entirely |
| **Face Border** | Float | -1 ~ 1 | 0 | Form-shadow threshold used only on the face area |
| **Face Softness** | Float | 0.001 ~ 2 | 0.15 | Blur width of the form-shadow terminator on the face area |
| **Enable 2nd Shadow** | Toggle | - | Off | Adds a second, deeper shadow band for a three-tone cel look |
| **2nd Shadow Border** | Float | -1 ~ 1 | -0.6 | Boundary of the 2nd shadow |
| **2nd Shadow Blur** | Float | 0.001 ~ 2 | 0.8 | Width of the second shadow's edge blur |
| **Front Light Shadow Shift** | Float | 0 ~ 1 | 0.5 | Shifts the form-shadow boundary toward the lit side when view and light face the… |
| **Back Light Shadow Shift** | Float | 0 ~ 1 | 0.5 | Shifts the form-shadow boundary on the back-lit side when view and light oppose… |

## Shadow Projection {#그림자-투영}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Shadow Projection** | Toggle | - | On | Whether the character receives projected (cast) shadows from other objects and… |
| **Receive Intensity** | Float | 0 ~ 1 | 1 | How much real-time cast shadow this surface receives |
| **PBR / Toon Blend** | Float | 0 ~ 1 | 0 | 0 keeps Unity's soft shadow falloff; 1 snaps it into a hard toon band |
| **Unify With Depth Shadow** | Toggle | - | Off | Ties the depth shadow to the cast-shadow color so overlapping areas do not… |
| **Enable Projection Feather** | Toggle | - | Off | Disables the additional projection-edge samples when off |
| **Cast Edge Feather Quality** | Enum | Light3Tap / Standard5Tap / High9Tap | Light3Tap | Light uses 3 taps, Standard 5, and High 9: one center tap plus a golden-angle… |
| **Projection Feather Radius** | Float | 0 ~ 20 | 0.5 | Sets the feather radius as a camera-stable width: it is distance-corrected so… |
| **Projection Feather Intensity** | Float | 0 ~ 100 | 100 | Controls projection-edge feather amount from 0 to 100 percent |
| **Cast Toon Band Softness** | Float | 0.001 ~ 1 | 0.001 | Adjusts the PBR-to-toon transition width of the cast-shadow band |
| **Suppress Self Cast Shadow** | Toggle | - | Off | Reduces the real-time shadow a mesh casts onto itself |
| **Self Shadow Caster Bias** | Float | 0 ~ 0.1 | 0 | How far the shadow caster is pushed off the surface |
| **Cast Indirect Lift** | Float | 0 ~ 1 | 0 | Adds the ambient (SH) light back into cast shadows as an additive floor, so they… |
| **Suppress Backlit Silhouette** | Toggle | - | On | Skips cast shadow on faces turned away from the light |
| **Backlit Suppression Offset** | Float | 0 ~ 1 | 0.25 | How far past the form-shadow boundary, toward the dark side, backlit suppression… |

## Shadow Color {#그림자-색상}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Shadow Color** | Toggle | - | On | Master switch for shadow coloring |
| **Shadow Ambient Influence** | Float | 0 ~ 1 | 0.2 | Applies the scene ambient SH color once to every final shadow family |
| **Enable Unified Shadow** | Toggle | - | On | Collapses form, cast and depth shadows onto one final color so overlaps do not… |
| **Screen-Space Shadow Overlap Depth (0 = fully merged)** | Float | 0 ~ 1 | 0.5 | Extra depth applied only where Depth Shadow or SSAO overlaps another shadow |
| **Use Shadow Color Map** | Toggle | - | Off | Distributes the unified shadow color with a UV map, for cases like hair… |
| **Color Map Amount** | Float | 0 ~ 1 | 1 | 0 uses the single unified shadow color; 1 multiplies the texture color in full |
| **1st Shadow Color** | Color | - | White | Color of the 1st form shadow |
| **1st Shadow Brightness** | Float | 0 ~ 1 | 0.8 | Brightness multiplier on the first form-shadow color |
| **2nd Shadow Color** | Color | - | White | Color of the 2nd, deeper form shadow |
| **2nd Shadow Brightness** | Float | 0 ~ 1 | 0.6 | Brightness multiplier on the second form-shadow color |
| **Cast Shadow Tint** | Color | - | White | Tint applied to received cast shadows |
| **Cast Shadow Brightness** | Float | 0 ~ 1 | 0.8 | Brightness multiplier on the cast-shadow color |
| **Depth Shadow Color** | Color | - | White | Color of the depth shadow - the depth-based shadow hair drops on the face |
| **Shadow Brightness** | Float | 0 ~ 1 | 0.6 | Brightness multiplier on the depth shadow color; lower is darker |
| **SSAO Tint** | Color | - | White | A color multiplied into the occluded areas only |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation of the shadow color SSAO inherits, taken after the tint is multiplied… |
| **Color Brightness** | Float | 0 ~ 4 | 1 | Brightness multiplier for the SSAO color after Purity |
| **Color Gamma** | Float | 0.1 ~ 3 | 1 | Gamma applied to the SSAO color after Purity and Brightness |
| **Rim Shade Color** | Color | - | White | Color painted only where Rim Shade covers |
| **Blend Opacity** | Float | 0 ~ 1 | 0 | How much of the Rim Shade color is applied |
| **Brightness** | Float | 0 ~ 1 | 0.8 | Brightness of the Rim Shade color |
| **Use Shadow Boundary** | Toggle | - | On | Enables the colored boundary effect between lit and shadowed regions |
| **Boundary Color** | Color | - | 1, 0.53, 0.31, 1 | Color laid along the 1st shadow boundary - typically a faint warm red on skin… |
| **Boundary Overlay Mode** | Toggle | - | Off | Whether the boundary color band straddles the terminator or stays inside the… |
| **Boundary Width** | Float | 0 ~ 2 | 0.5 | Width of the colored band laid on the terminator |
| **Boundary Blur** | Float | 0.001 ~ 2 | 0.5 | Blur width at the edge of the boundary band |
| **Boundary Intensity** | Float | 0 ~ 1 | 0.3 | Opacity of the boundary band |
| **Boundary Base Map Mix** | Float | 0 ~ 1 | 0.5 | 0 draws the boundary in the flat color you picked; 1 blends it with the Base Map… |

## Shadow Pattern (Screentone) {#그림자-패턴-스크린톤}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Shadow Pattern** | Toggle | - | Off | Applies a screentone to the form shadow, the depth shadow, or both |
| **Use Shape Tile** | Toggle | - | Off | Swaps the shape drawn inside each cell for a tile image |
| **Shape Tile** | Texture | - | None | The five shipped tiles - dots, fine dots, lines, crosshatch, stipple - are in… |
| **Pattern Target** | Enum | Form / Depth / Both | Form | Apply the pattern to form shadow, depth shadow, or both |
| **Pattern Space** | Enum | Mesh / Screen | Mesh | Mesh sticks the pattern to the surface so it travels with the character |
| **Pattern Style** | Enum | Recolor / Overlay | Recolor | Recolor redraws the shadow coverage as the screentone shape, so the strokes take… |
| **Ink Color** | Color | - | 0.16, 0.13, 0.15, 1 | Ink color the screentone strokes print with in Overlay style |
| **Blend Opacity** | Float | 0 ~ 1 | 1 | How strongly the ink color blends in |
| **Pattern Density** | Float | 0.25 ~ 120 | 120 | How many cells fill one mesh-projection unit |
| **Distance Compensation** | Float | 0 ~ 1 | 1 | At 1 the cell count is fully locked to the mesh |
| **FOV / Projection Compensation** | Float | 0 ~ 1 | 0.5 | At 1 the same mesh region keeps its pattern density across perspective FOV and… |
| **Pattern Rotation** | Float | 0 ~ 360 | 78 | Angle of the pattern grid |
| **Pattern Edge Softness** | Float | 0 ~ 0.5 | 0.14 | The blur width at the mark's edge |
| **Pattern Intensity** | Float | 0 ~ 1 | 1 | Mix between the original smooth shadow and the patterned one |
| **Keep Pattern in Full Shadow** | Toggle | - | On | Off lets the dots merge into a solid fill as shadow deepens |
| **Full Shadow Fill** | Float | 0.1 ~ 1 | 1 | Closer to 1 approaches a solid fill; lower values leave more of the pattern… |

## Related pages

- [Light and Shadow usage guide](/guides/light-and-shadow)
- [Shared Texture Slot UI](/guides/texture-modules) — the channel, remap and UV fields inside map and mask slots
- [Troubleshooting](/troubleshooting)
