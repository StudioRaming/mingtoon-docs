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
| **Everything That Adds Light - Intensity** | Float | 0 ~ 4 | 1 | Every layer that adds light (backlight, front light, Fresnel rim, shadow |
| **Everything That Adds Light - Base Color** | Color | - | White | The color multiplied into every layer that adds light |
| **Everything That Adds Light - Palette Tint Amount** | Float | 0 ~ 1 | 1 | How much the shared palette color is mixed into the highlight family |
| **Everything That Adds Light - Color Pad X** | Float | -1 ~ 1 | 0 | The color wheel coordinate laid over the base color |
| **Everything That Adds Light - Color Pad Y** | Float | -1 ~ 1 | 0 | Pairs with Color Pad X to set a position on the color wheel |
| **Everything That Adds Light - Brightness** | Float | 0 ~ 1 | 1 | The brightness of the color made with the color pad |
| **Edge Rim Multiplier** | Float | 0 ~ 4 | 1 | Depth rim light, Fresnel rim, backlight and SSSSS (Experimental) |
| **Edge Rim Maximum Multiplier** | Float | 0 ~ 8 | 0 | The ceiling after all four above are added together |
| **Edge Rim Minimum Multiplier** | Float | 0 ~ 1 | 0 | The rims that follow the lighting, that is backlight, Fresnel rim and depth rim light, when dark |
| **Every Shadow - Intensity** | Float | 0 ~ 4 | 1 | After form, AO, rim shade, cast and depth shadow are all combined, only the shaded part |
| **Every Shadow - Base Color** | Color | - | White | The color multiplied into the whole shadow area |
| **Every Shadow - Palette Tint Amount** | Float | 0 ~ 1 | 1 | How much the shared palette color is mixed into the shadow area |
| **Every Shadow - Color Pad X** | Float | -1 ~ 1 | 0 | The color wheel coordinate laid over the shadow base color |
| **Every Shadow - Color Pad Y** | Float | -1 ~ 1 | 0 | Pairs with Color Pad X to set a position on the color wheel |
| **Every Shadow - Brightness** | Float | 0 ~ 1 | 1 | The brightness of the color made with the color pad |
| **Environment Intensity** | Float | 0 ~ 4 | 1 | Adjusts all the light the world gives the character at once |
| **Overall Intensity** | Float | 0 ~ 4 | 1 | The brightness multiplier of the whole final character after every effect |
| **Overall Saturation** | Float | 0 ~ 10 | 1 | The saturation of the whole final character after every effect |
| **Overall Emission Intensity** | Float | 0 ~ 4 | 1 | Applied once to the final contribution of the two emission layers and MatCap emission combined |
| **Overall Tint** | Color | - | White | The color multiplied into the whole final output |
| **Final Output - Palette Tint Amount** | Float | 0 ~ 1 | 1 | How much the shared palette color is mixed into the whole final character |
| **Final Output - Color Pad X** | Float | -1 ~ 1 | 0 | The color wheel coordinate laid over the final output's base color |
| **Final Output - Color Pad Y** | Float | -1 ~ 1 | 0 | Pairs with Color Pad X to set a position on the color wheel |
| **Final Output - Brightness** | Float | 0 ~ 1 | 1 | The brightness of the color made with the color pad |
| **Performance Distance (m)** | Float | 1 ~ 50 | 5 | With the camera inside this distance, more of the heavy modules turn on |
| **Performance Distance Scale** | Float | 0 ~ 2 | 1 | The multiplier applied to Performance Distance (m) |

## Lighting {#라이팅}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Lit Brightness** | Float | 0 ~ 2 | 1 | The brightness multiplier of every lit face |
| **Environment Color Influence** | Float | 0 ~ 1 | 0.3 | How much the environment color read from light probes and ambient soaks into the surface |
| **Indirect Light Lift** | Float | 0 ~ 2 | 1 | How much the indirect brightness of light probes and ambient lifts the dark faces |
| **Preserve Base Map Color** | Float | 0 ~ 1 | 0.5 | How much of the lighting tint to remove when the finished base color and the scene light color are mixed |
| **Scene Light Color Influence** | Float | 0 ~ 1 | 1 | Sets how much of the scene light's color is reflected on the character |
| **Main Light Response** | Float | - | 0 | Remaps the main light's brightness ratio through the four-point curve below |
| **Additional Light Final Attenuation Response** | Float | - | 0 | The final distance and shadow attenuation response of additional lights such as point and spot, on the same curve |
| **Response Point 0 (Dark)** | Float | 0 ~ 1 | 0 | The output at input 0 |
| **Response Point 1 (1/3)** | Float | 0 ~ 1 | 1/3 | The output at input 1/3 |
| **Response Point 2 (2/3)** | Float | 0 ~ 1 | 2/3 | The output at input 2/3 |
| **Response Point 3 (Bright)** | Float | 0 ~ 1 | 1 | The output at input 1 |
| **Minimum Final Brightness** | Float | 0 ~ 4 | 0.2 | The floor that keeps the character from going darker than this, however dark the scene |
| **Maximum Final Brightness** | Float | 0 ~ 8 | 1 | The ceiling that keeps the character from burning brighter than this in a bright scene |
| **Soften Near The Ceiling** | Float | 0 ~ 1 | 0.2 | How much, as the main light and additional real lights approach the brightness ceiling |
| **Added Light Brightness Maximum** | Float | 0 ~ 8 | 3 | Every additive effect (rim, backlight, front light, shadow interior reflection, translucency |
| **Additional Light Reception** | Float | 0 ~ 1 | 1 | The RGB peak brightness of additional lights such as point and spot, without hidden extra attenuation |
| **Additional Light Intensity** | Float | 0 ~ 4 | 1 | The final multiplier applied directly to the RGB peak brightness, without the hidden 0.2-0.5 attenuation |
| **Additional Light Color Influence** | Float | 0 ~ 1 | 1 | How much the additional lights' color is reflected in the surface color |
| **Preserve Base Color under Additional Lights** | Float | 0 ~ 1 | 0 | 1 = maximum preservation of the original base color, 0 = full reflection of the additional light color |
| **Surface Direction and Toon Shading Influence** | Float | 0 ~ 1 | 1 | How much the additional lights follow the surface direction and the toon shading boundary |
| **Additional Light PBR / Toon Blend** | Float | 0 ~ 1 | 1 | At 0 it uses a soft standard diffuse directional response; at 1 the toon band |
| **Additional Light Toon Threshold** | Float | -1 ~ 1 | 0 | The normal and light direction boundary where additional lights switch into the lit toon region |
| **Additional Light Toon Softness** | Float | 0.001 ~ 1 | 0.5 | The transition width of the additional light toon threshold |
| **Additional Light Effect Influence** | Float | 0 ~ 1 | 1 | How much additional lights contribute to light-reactive effects such as the depth rim backlight boost |
| **Additional Light Energy Cap** | Float | 0 ~ 4 | 0.35 | The ceiling on the energy additional lights such as point and spot add to the final surface brightness |
| **VRC Light Volumes (Test)** | Toggle | - | Off | A toggle for checking in the editor |
| **Volume Intensity** | Float | 0 ~ 4 | 1 | Multiplied into all the indirect light read from the volumes the world placed |
| **Darkening Response** | Float | 0 ~ 1 | 0.5 | How much of the darkening to reflect when the volume's brightness is below the neutral value of 1 |
| **Brightening Response** | Float | 0 ~ 1 | 1 | How much of the brightening to reflect when the volume's brightness is above the neutral value of 1 |
| **Normal Bias** | Float | 0 ~ 0.25 | 0 | Pushes the point where the volume is read along the surface normal |
| **Point Light Shadows** | Float | 0 ~ 1 | 1 | Sets how closely volume point lights follow the occlusion data the world baked |
| **Volume Specular** | Enum | Off / Dominant / Full | Off | Builds an environment highlight from the volume's directional component |
| **Volume Specular Intensity** | Float | 0 ~ 4 | 1 | The strength of the volume specular |
| **Virtual Key Light** | Toggle | - | Off | A fake key light for worlds without a directional light |
| **Mode** | Float | - | 0 | Auto = preserves the color and brightness of the world light, light volumes and probes |
| **Follow Character Front** | Toggle | - | Off | Turn it on and the light keeps the same angle relative to the face as the character turns |
| **Yaw** | Float | -180 ~ 180 | 0 | The horizontal angle of the virtual key light |
| **Pitch** | Float | -89 ~ 89 | 20 | The vertical angle of the virtual key light |
| **Light Color** | Color | - | White | The color of the virtual key light |
| **Color Pad X** | Float | -1 ~ 1 | 0 | The color wheel coordinate laid over the light color |
| **Color Pad Y** | Float | -1 ~ 1 | 0 | Pairs with Color Pad X to set a position on the color wheel |
| **Brightness** | Float | 0 ~ 1 | 1 | The brightness of the color made with the color pad |
| **Light Intensity** | Float | 0 ~ 4 | 0.3 | The brightness of the virtual key light |
| **Yaw Offset** | Float | -180 ~ 180 | 0 | Added to the Yaw above |
| **Pitch Offset** | Float | -89 ~ 89 | 0 | Added to the Pitch above |

## Form Shadow {#형태-그림자}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Form Shadow** | Toggle | - | On | Turns the form shadow (toon shading) cast by the light direction on and off |
| **Normal Map Influence** | Float | 0 ~ 1 | 1 | 0 = the mesh's own normals, 1 = the full stacked normal maps |
| **1st Shadow Border** | Float | -1 ~ 1 | 0 | Where the 1st shadow starts |
| **1st Shadow Blur** | Float | 0.001 ~ 2 | 0.3 | The blur width of the shading boundary |
| **1st Shadow Blend Amount** | Float | 0 ~ 1 | 1 | The ratio at which the 1st shadow color is mixed into the result |
| **Remove Default Face Form Shadow** | Float | 0 ~ 1 | 0 | At 1 it erases the form shadow in the face area completely |
| **Face Border** | Float | -1 ~ 1 | 0 | The form shadow boundary applied only to the face area |
| **Face Softness** | Float | 0.001 ~ 2 | 0.15 | The blur width of the form shadow boundary in the face area |
| **Enable 2nd Shadow** | Toggle | - | Off | Adds a second shadow step on the darkest side for three-band cel shading |
| **2nd Shadow Border** | Float | -1 ~ 1 | -0.6 | Where the 2nd shadow boundary sits |
| **2nd Shadow Blur** | Float | 0.001 ~ 2 | 0.8 | The blur width of the 2nd shadow boundary |
| **Front Light Shadow Shift** | Float | 0 ~ 1 | 0.5 | The form shadow boundary on the side where the view and light directions agree (V·L > 0), shifted toward front lighting |
| **Back Light Shadow Shift** | Float | 0 ~ 1 | 0.5 | The form shadow on the side where the view and light directions oppose (V·L &lt; 0), shifted toward backlighting |

## Shadow Projection {#그림자-투영}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Shadow Projection** | Toggle | - | On | Whether to receive the projected shadows (cast shadows) other objects or the character itself throw |
| **Receive Intensity** | Float | 0 ~ 1 | 1 | Sets how much of the real-time shadows other objects and the character itself cast is received |
| **PBR / Toon Blend** | Float | 0 ~ 1 | 0 | At 0 it falls off softly like Unity's default shadow; at 1 it snaps to a toon band |
| **Unify With Depth Shadow** | Toggle | - | Off | Ties the depth shadow to the same color as the cast shadow so that where the two overlap |
| **Enable Projection Feather** | Toggle | - | Off | Turn it off and no extra projection boundary samples are used |
| **Cast Edge Feather Quality** | Enum | Light3Tap / Standard5Tap / High9Tap | Light3Tap | 3 taps for low-end, 5 for standard, 9 for high-end |
| **Projection Feather Radius** | Float | 0 ~ 20 | 0.5 | The radius over which the projection boundary is softened |
| **Projection Feather Intensity** | Float | 0 ~ 100 | 100 | Adjusts how much projection boundary feathering applies, from 0 to 100% |
| **Cast Toon Band Softness** | Float | 0.001 ~ 1 | 0.001 | Adjusts the width of the cast shadow's PBR-to-toon transition band |
| **Suppress Self Cast Shadow** | Toggle | - | Off | Reduces the real-time shadow the mesh casts onto itsel |
| **Self Shadow Caster Bias** | Float | 0 ~ 0.1 | 0 | Sets how far the shadow caster is pushed off the surface |
| **Cast Indirect Lift** | Float | 0 ~ 1 | 0 | Adds ambient light (SH) as an additive floor to the cast shadow, so in a bright environment |
| **Suppress Backlit Silhouette** | Toggle | - | On | Does not draw cast shadows on faces turned away from the light |
| **Backlit Suppression Offset** | Float | 0 ~ 1 | 0.25 | Where backlit silhouette suppression starts erasing the cast shadow, relative to the form shadow |

## Shadow Color {#그림자-색상}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Shadow Color** | Toggle | - | On | Turns all the processing that tints shadows on and off |
| **Shadow Ambient Influence** | Float | 0 ~ 1 | 0.2 | Applies the scene's ambient SH color once to every shadow family |
| **Use Unified Shadow** | Toggle | - | On | Collects form, cast and depth shadows into one final color so overlaps do not get excessively |
| **Screen-Space Shadow Overlap Depth (0 = fully merged)** | Float | 0 ~ 1 | 1 | Only where the depth shadow and SSAO overlap other shadows, this deepens them further |
| **Use Shadow Color Map** | Toggle | - | Off | Distributes the unified shadow color through a UV map |
| **Color Map Amount** | Float | 0 ~ 1 | 1 | At 0 it uses only the single unified shadow color; at 1 the texture color is used |
| **1st Shadow Color** | Color | - | White | The color of the 1st form shadow |
| **1st Shadow Brightness** | Float | 0 ~ 1 | 0.8 | The brightness multiplier of the 1st form shadow color |
| **2nd Shadow Color** | Color | - | White | The color of the 2nd (deeper) form shadow |
| **2nd Shadow Brightness** | Float | 0 ~ 1 | 0.6 | The brightness multiplier of the 2nd form shadow color |
| **Cast Shadow Tint** | Color | - | White | The color applied to received cast shadows |
| **Cast Shadow Brightness** | Float | 0 ~ 1 | 0.8 | The brightness multiplier of the cast shadow color |
| **Depth Shadow Color** | Color | - | White | The color of the depth shadow |
| **Shadow Brightness** | Float | 0 ~ 1 | 0.6 | The brightness multiplier of the depth shadow color |
| **SSAO Tint** | Color | - | White | The color multiplied only where occlusion landed |
| **Color Purity** | Float | 0 ~ 10 | 1 | The purity after the tint is multiplied into the shadow color SSAO inherited |
| **Color Brightness** | Float | 0 ~ 4 | 1 | The brightness multiplier of the SSAO color after purity is applied |
| **Color Gamma** | Float | 0.1 ~ 3 | 1 | The gamma of the SSAO color, applied after purity and brightness |
| **Rim Shade Color** | Color | - | White | The color painted only on the rim shade area |
| **Blend Opacity** | Float | 0 ~ 1 | 0 | How much of the rim shade color to apply |
| **Brightness** | Float | 0 ~ 1 | 0.8 | The brightness of the rim shade color |
| **Use Shadow Boundary** | Toggle | - | On | Turns the whole color boundary effect between the lit area and the shadow on or off |
| **Boundary Color** | Color | - | 1, 0.53, 0.31, 1 | The color laid on the 1st shadow boundary line |
| **Boundary Overlay Mode** | Toggle | - | Off | Whether the boundary color band straddles both sides of the shading boundary or stays inside the shadow side |
| **Boundary Width** | Float | 0 ~ 2 | 0.5 | The width of the color band laid on the shading boundary |
| **Boundary Blur** | Float | 0.001 ~ 2 | 0.5 | The blur width at the edge of the boundary color band |
| **Boundary Intensity** | Float | 0 ~ 1 | 0.3 | The opacity of the boundary color band |
| **Boundary Base Map Mix** | Float | 0 ~ 1 | 0.5 | At 0 the boundary color you set comes out flat; at 1 it mixes with the base map color |

## Shadow Pattern (Screentone) {#그림자-패턴-스크린톤}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Shadow Pattern** | Toggle | - | Off | Applies screentone (halftone) to the form shadow and the depth shadow |
| **Use Shape Tile** | Toggle | - | Off | Changes the dot shape to a tile image |
| **Shape Tile** | Texture | - | None | The 5 built-in tiles (halftone, fine halftone, lines, crosshatch, stipple) are |
| **Pattern Target** | Enum | Form / Depth / Both | Form | Applies it to the form shadow, the depth shadow, or both |
| **Pattern Space** | Enum | Mesh / Screen | Mesh | Mesh sticks the pattern to the surface so it moves wi |
| **Pattern Style** | Enum | Recolor / Overlay | Recolor | Recolor redraws the shadow area in the screentone shape so the lines take the shadow color |
| **Ink Color** | Color | - | 0.16, 0.13, 0.15, 1 | The ink color the screentone lines are printed in, in the overlay style |
| **Blend Opacity** | Float | 0 ~ 1 | 1 | The ratio at which the ink color is mixed |
| **Pattern Density** | Float | 0.25 ~ 120 | 120 | The number of cells filling one unit of mesh projection |
| **Distance Compensation** | Float | 0 ~ 1 | 1 | At 1 the pattern cell count is fully locked to the mesh |
| **FOV / Projection Compensation** | Float | 0 ~ 1 | 0.5 | At 1 the pattern on the same part of the mesh holds even as the perspective FOV and orthographic camera size change |
| **Pattern Rotation** | Float | 0 ~ 360 | 78 | The angle of the pattern grid |
| **Pattern Edge Softness** | Float | 0 ~ 0.5 | 0.14 | The blur width at the edge of the dots |
| **Pattern Intensity** | Float | 0 ~ 1 | 1 | The ratio for mixing the original soft shadow with the patterned shadow |
| **Keep Pattern in Full Shadow** | Toggle | - | On | Turn it off and the dots merge as the shadow deepens until it fills with flat color |
| **Full Shadow Fill** | Float | 0.1 ~ 1 | 1 | The closer to 1 the closer to flat color; the lower it is, the more the pattern in the darkest areas |

## Related pages

- [Light and Shadow usage guide](/guides/light-and-shadow)
- [Shared Texture Slot UI](/guides/texture-modules) — the channel, remap and UV fields inside map and mask slots
- [Troubleshooting](/troubleshooting)
