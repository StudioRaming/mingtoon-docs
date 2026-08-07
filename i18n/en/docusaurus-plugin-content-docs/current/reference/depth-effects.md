---
id: depth-effects
title: Depth Effects
sidebar_position: 4
---

# Depth Effects

Screen-space effects that read the camera depth texture. Without depth they vanish entirely, so confirm depth before touching any value here. Inner 2D Edge lives in this group too.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

## Depth

Configure ranges and masks for depth-driven effects.

| Control | What it does | Shader property |
|---|---|---|
| **Master Width** | A shared multiplier on the screen offset used by both 2D Depth Rim and 2D Shadow. Setting it to 0 here kills both effects no matter how high their own width sliders go. | `_DepthWidth` |
| **Width Mode** | Screen Pixels keeps the offset in screen pixels, so the line looks relatively thicker as the camera pulls back; Distance Stable holds a constant apparent thickness across distance and FOV. With Screen Pixels selected, Distance Scaling does nothing. | `_DepthWidthMode` |
| **Distance Scaling** | Sets the reference distance for the thickness while Width Mode is Distance Stable. Ignored when Width Mode is Screen Pixels. | `_DepthDistanceScale` |
| **Master Bias** | How much screen-depth difference counts as a real front-to-back edge. Lower catches shallow creases and gets noisy; higher drops the line on thin parts. | `_DepthBias` |
| **Master Softness** | Transition width of the depth-edge test. Low gives a hard ink edge, high a soft feathered one. | `_DepthSoftness` |
| **Cast MingToon 2D Projected Shadow** | Controls whether this material writes to MingToon's camera-depth field. Turn it off on glasses or accessories to exclude Opaque, Cutout, and Transparent surfaces from the 2D projected-shadow caster. Normal color rendering, transparent depth priming, and Unity real-time ShadowCaster shadows all stay enabled, so self-sorting and outlines look exactly as they did with the switch on. A disabled material is absent from the depth it reads, so its own Depth Rim, Inner 2D Edge, 2D Shadow, and translucency cannot see behind it. If the glasses themselves need a rim, use Fresnel Rim, which reads no depth. | `_Ming2DShadowCasterEnabled` |

## Depth Rim

Configure rim effects generated from screen-depth differences.

| Control | What it does | Shader property |
|---|---|---|
| **Rim Width Multiplier** | A 2D-rim-only multiplier on Master Width. The final thickness is Master Width times this value, so raising it does nothing while Master Width is 0. | `_DepthRimWidth` |
| **Rim Intensity** | Brightness multiplier for the 2D rim. At 0 the rim is skipped entirely, so its color and width change nothing. | `_DepthRimIntensity` |
| **Mix Base Color** | 0 draws the rim in the flat color you picked; 1 multiplies it by the Base Map so each material area gets its own rim tint. | `_DepthRimBaseColorMix` |
| **360 Rim** | 0 puts the rim only on the light side; 1 wraps it around the whole silhouette. Raise it for scenes with no directional light or with constantly changing light direction. | `_DepthRim360` |
| **Silhouette Start** | How far the surface must turn away from the camera to count as silhouette. This row and the transition softness below have no effect at all while Outer Silhouette Limit in the same group is 0. | `_DepthRimSilhouetteThreshold` |
| **Silhouette Transition** | Transition width of the silhouette test. Ignored while Outer Silhouette Limit in the same group is 0. | `_DepthRimSilhouetteSoftness` |

## 2D Shadow

Configure a lightweight character shadow from the screen-depth silhouette of objects in front.

| Control | What it does | Shader property |
|---|---|---|
| **Shadow Brightness** | Brightness multiplier on the 2D shadow color; lower is darker. When 2D and cast shadows are unified, this becomes the brightness of the merged layer. | `_DepthShadowBrightness` |
| **Face 2D Shadow Assist** | Off by default. After defining the face area, enable this to suppress self-overlap from MingToon's camera-depth projected shadow there. Other effects sharing that depth, such as depth rim and inner edge, can change too. | `_DepthShadowFaceAssistEnabled` |

## SSAO (Screen Space Occlusion)

Re-reads the camera depth texture per pixel to darken creases and contact areas. It is not multiplied with the occlusion map: it joins after the toon band and the screentone, taking whichever is darker. Where no depth texture is available it disappears silently.

| Control | What it does | Shader property |
|---|---|---|
| **SSAO Enabled** | Re-reads the camera depth texture per pixel to darken creases and contact areas. The result folds in where the occlusion map lands, so it reads as part of the shadow; while off the calculation is compiled out and costs nothing. | `_MingSsaoEnabled` |
| **SSAO Intensity** | How strong the effect is. At 0 the image matches the effect being off while the calculation still runs, so turn SSAO Enabled off when you are not using it. | `_MingSsaoIntensity` |
| **SSAO Power** | Contrast of the occlusion. Raising it keeps only the deeply recessed areas and erases the faint occlusion. | `_MingSsaoPower` |
| **SSAO Radius** | How far the occlusion search reaches, in metres (0.001-0.1 is 1mm-10cm). It is world size rather than screen pixels, so the thickness holds as the camera pulls back or the field of view changes - but only while `SSAO Distance Compensation` is 1, its default. Lower it and the radius shrinks inside one metre. | `_MingSsaoRadius` |
| **SSAO Quality** | Depth samples per pixel: Low 4, Medium 8, High 12, Ultra 16. The cost is paid per visible fragment, not once per material. At character scale, lowering quality and raising the radius usually looks better than the reverse. | `_MingSsaoQuality` |
| **SSAO Bias** | Metres of slack that stops a surface from counting itself as its own occluder. Raise it slightly when a flat surface goes blotchy; lower it when creases read flat. | `_MingSsaoBias` |
| **SSAO Fade Range** | How close an occluder has to be, in metres, to count. Past this range the weight falls smoothly to zero, so a distant wall does not darken the whole silhouette. | `_MingSsaoFadeRange` |
| **SSAO Far Distance** | The distance, in metres, at which the effect is fully gone. The fade begins at 75% of it, so 12 starts thinning at 9m and reaches zero at 12m. 0 disables the distance fade. | `_MingSsaoFarDistance` |
| **SSAO Distance Compensation** | At 1 the radius is held at a true world size, so the same crease reads the same shape wherever the camera stands and whatever the field of view. At 0 the old near-camera taper returns and the radius shrinks inside one metre. | `_MingSsaoDistanceCompensation` |
| **SSAO Light Direction Influence** | 0 is a uniform occlusion that ignores the light. Raising it leans the search range toward the light, so the occlusion gathers on the side the light cannot reach. The lean shrinks by itself as the light comes to face the camera, so a front light does not push the shading to one side. | `_MingSsaoLightDirectionInfluence` |
| **SSAO Mask Strength** | Restricts where the occlusion lands by borrowing the 2D Shadow Mask as it is. 0 uses no mask; raising it removes the occlusion wherever the mask covers. The channel, invert and HSVG are the ones set on the 2D Shadow Mask. | `_MingSsaoMaskStrength` |
| **SSAO Tint** | A colour multiplied into the occluded areas only. White tints nothing and leaves the shadow colour the material already resolved exactly as it was. | `_MingSsaoColor` |
| **SSAO Brightness** | How much further the occluded areas are darkened. 1 adds no darkening; lowering it deepens those areas alone. | `_MingSsaoBrightness` |
| **SSAO Saturation** | Saturation of the occluded areas. 1 leaves them alone, 0 drains them to grey, and above 1 the colour deepens there and nowhere else. | `_MingSsaoSaturation` |

## Depth Translucency

Measures how far light travelled through the character along the light, so thin parts read as if they were holding the light.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Translucency** | Makes thin parts - hair tails, cloth hems - read as if they were holding the light. It reads depth twice along the light to measure how far the light travelled through the character, so it works on its own with the 2D Depth Rim off. | `_TranslucencyEnabled` |
| **Measure Width** | How far along the light this pixel looks to measure the distance the light travelled. Larger values let thicker parts count as thin; smaller values light only the very tips. | `_TranslucencyWidth` |
| **Depth Range** | A gap this deep in metres counts as fully open. Raise it when a surface only a little further back - cloth standing behind hair - is mistaken for background and lights up. | `_TranslucencyDepthRange` |
| **Shell Floor** | A hollow garment - a skirt, a cape, a veil - is wide on screen so it measures as thick, while the cloth itself is under a millimetre. Give such a material about 0.8 and it always counts as thin regardless of the measurement. Leave solid parts like skin and hands at 0 and let the measurement decide. | `_TranslucencyShellFloor` |
| **Translucency Strength** | Overall brightness multiplier for the transmitted light. At 0 the whole module is skipped. | `_TranslucencyStrength` |
| **Edge Intensity** | Strength of the layer that lights only the outer silhouette. Set it to 0 and the result is exactly a single centre layer. | `_TranslucencyEdgeIntensity` |
| **Edge Falloff** | How tightly the edge layer gathers at the silhouette. Higher values hug the outline more thinly. | `_TranslucencyEdgePower` |
| **Edge HSVG** | Derives the edge layer's colour from the base colour instead of an absolute one, so blonde hair, dark hair and skin all read correctly from one setting. The neutral (0,1,1,1) skips the adjustment entirely. | `_TranslucencyEdgeHSVG` |
| **Edge Tint** | Multiplied onto the edge colour after the HSVG adjustment. White changes nothing. | `_TranslucencyEdgeTint` |
| **Center Intensity** | Strength of the layer that lights the interior. Set it to 0 and the result is exactly a single edge layer. | `_TranslucencyCenterIntensity` |
| **Center Falloff** | How tightly the centre layer gathers on camera-facing surfaces. | `_TranslucencyCenterPower` |
| **Center HSVG** | Derives the centre layer's colour from the base colour. The default rotates the hue toward red and raises saturation, giving hair a near-white outer edge over a warm glowing interior. | `_TranslucencyCenterHSVG` |
| **Center Tint** | Multiplied onto the centre colour after the HSVG adjustment. White changes nothing. | `_TranslucencyCenterTint` |
| **Backlight Falloff** | How precisely the camera and the light must oppose each other for the effect to peak. Higher values confine the peak to a narrow, exactly backlit band; how much survives in front light is set by Front Light Floor. | `_TranslucencyLightPower` |
| **Front Light Floor** | How much transmitted light survives in full front light. Scattering only gets stronger when backlit; it does not switch off, and at 0 skin stops reading as skin. | `_TranslucencyAmbient` |
| **Normal Bend** | Bends the light vector toward the surface normal so a curved strand keeps transmitting slightly off the exact backlight axis. At 0 only the plain backlight response remains. | `_TranslucencyDistortion` |
| **View Bend** | Bends the light vector toward the camera. On flat hair cards, whose normals say nothing about the volume they stand for, the normal bend alone makes the light flicker on and off as the card turns; this is what stops that. | `_TranslucencyViewBend` |
| **Scene Light Influence** | 0 ignores the scene light colour and uses only the authored colour; 1 takes the light fully. Worlds differ wildly, so both ends are needed. | `_TranslucencySceneLightInfluence` |
| **Exposure Softness** | Eases the two knees of the ramp normalised by Depth Range. At 0 it is exactly a straight ramp. It reshapes the response curve only and never moves where the boundary sits. | `_TranslucencySoftness` |
| **Density** | How steeply thinness turns into brightness. Higher values leave light only where the character is very thin, which reads as a denser material; lower values spread it wide. | `_TranslucencyDensity` |
| **Channel Spread** | Reproduces red scattering deeper into the surface than blue. Each channel decays at its own rate, so the region each one lights is a different size - a look no tint can stand in for. 0 makes all three channels identical. | `_TranslucencyChannelSpread` |

## Inner 2D Edge

Configure the screen-depth edge drawn inside the visible surface.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Inner 2D Edge** | Draws interior edges from screen-depth differences. It needs no extra geometry, so it works on meshes where the hull breaks, but it requires the camera depth texture and does nothing on a Transparent surface. | `_OutlineInnerEdgeEnabled` |
| **Pressure Source** | Which painted channel modulates line width. VertexRed reads vertex color R, VertexAlpha reads A, WidthMask reads the width mask texture. Choosing VertexRed on a mesh imported with black vertex colors makes the line vanish entirely. | `_OutlineHullPressureSource` |
| **Apply to Inner Edge Outline** | Also applies the painted pressure to the Inner 2D Edge width. This toggle and Pressure Source live in the Classic Hull group, but this one keeps affecting the inner edge even with the hull turned off - on a mesh with black vertex colors it makes the inner edge disappear completely. | `_OutlineInnerEdgePressureApply` |
| **Depth Bias** | Only depth differences larger than this count as an edge. Lower catches gentle creases and turns noisy; higher drops the line on thin parts. | `_OutlineInnerEdgeBias` |
| **Softness** | Spatial feather across the inner edge. 0 keeps a hard line; 1 fades continuously across the full width down to zero. | `_OutlineInnerEdgeSoftness` |
