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

## Depth Effects Master

Configure ranges and masks for depth-driven effects.

| Control | What it does | Shader property |
|---|---|---|
| **Depth Effects** | Master switch for every depth effect - 2D Rim Light, depth translucency and 2D shadow. Off, all three modules stop. These effects need a camera depth texture to run. | `_DepthEffectsEnabled` |
| **Master Width** | A shared multiplier on the screen offset used by both 2D Rim Light and 2D Shadow. Setting it to 0 here kills both effects no matter how high their own width sliders go. | `_DepthWidth` |
| **Width Mode** | Screen Pixels keeps the offset in screen pixels, so the line looks relatively thicker as the camera pulls back; Distance Stable holds a constant apparent thickness across distance and FOV. With Screen Pixels selected, Distance Scaling does nothing. | `_DepthWidthMode` |
| **Distance Scaling** | Sets the reference distance for the thickness while Width Mode is Distance Stable. Ignored when Width Mode is Screen Pixels. | `_DepthDistanceScale` |
| **Master Bias** | How much screen-depth difference counts as a real front-to-back edge. Lower catches shallow creases and gets noisy; higher drops the line on thin parts. | `_DepthBias` |
| **Master Softness** | Transition width of the depth-edge test. Low gives a hard ink edge, high a soft feathered one. | `_DepthSoftness` |
| **Switch Depth Effects From FX** | Lets an animator - a VRChat FX layer, for example - switch the Depth Effects master on and off. Use it to keep depth effects off in worlds with no depth texture and turn them on only while the camera is up. With this off, the bake folds the master to a constant and the animation does nothing. | `_MingDepthEffectsRuntimeToggle` |

## Runtime Switching

| Control | What it does | Shader property |
|---|---|---|
| **Use VRC Runtime Controls** | Lets the VRChat expression menu control virtual light, palette, master adjustments, photo looks, and quality on this material. Shadow Projection also needs its separate FX switch. With this off, the bake folds those values to constants and menu changes do not reach this material. | `_MingVrcQualityMenuEnabled` |
| **Switch Shadow Projection From FX** | Lets the VRChat expression menu switch 'Shadow Projection' on and off. Upload with the shadow on and turn it off in a crowded instance. Switched off at runtime, the projection feather's samples, the cast composite and the translucency cast term are all skipped per pixel. With this option off, the bake folds 'Shadow Projection' to a constant and the menu does nothing. | `_MingCastShadowRuntimeToggle` |
| **Quality Tier Preview** | The in-game menu moves this value. Change it here to preview what Low and Mid look like in the editor. Leave it on High when you save: this value is the material's own starting state. | `_MingVrcQualityTier` |

## 2D Rim Light

Configure rim effects generated from screen-depth differences.

| Control | What it does | Shader property |
|---|---|---|
| **2D Rim Light** | Toggles the 2D Rim Light, drawn from silhouette depth differences. Unlike the normal-based fresnel rim it gives an even-width line along the outline. Needs the camera depth texture. | `_DepthRimEnabled` |
| **Edge Rim Minimum Multiplier** | The floor on the light response of the rims that follow the light - backlight, fresnel rim and 2D Rim Light. Where the maximum above is the ceiling, this is its counterpart floor. 0 is exactly the current behaviour; raising it keeps the silhouette from disappearing completely inside a dark light volume. | `_EdgeRimLightResponseFloor` |
| **2D Rim Light Mask** | Enables a mask that limits the 2D rim to chosen areas - keeping the rim on metal trim only, for example. | `_DepthRimMaskEnabled` |
| **Channel** | Which channel of the rim mask to read. Split channels when several masks share one packed texture. | `_DepthRimMaskChannel` |
| **Invert** | Flips the rim mask black-for-white so the rim applies to the opposite area. | `_DepthRimMaskInvert` |
| **Intensity** | How far the mask cuts the rim. At 1 the rim disappears completely where the mask is black; lower values leave part of it. | `_DepthRimMaskStrength` |
| **Rim Color** | Color of the 2D rim. It is HDR, so raising its intensity can push it into bloom. | `_DepthRimColor` |
| **Color Purity** | Saturation after the base color and 2D-rim tint are composed. 0 Range 0-10; default 1. 0 is grayscale, 1 preserves the composed color, and values above 1 oversaturate it. | `_DepthRimColorPurity` |
| **Scene Light Influence** | How closely the 2D rim follows the scene light. At 1 it follows the scene-light response used by the backlight, so the rim darkens along with the body inside a dark light volume. At 0 it takes only the light's colour and keeps the authored brightness, which leaves the rim glowing over a body that has gone dark. | `_DepthRimSceneLightInfluence` |
| **Rim Width Multiplier** | A 2D-rim-only multiplier on Master Width. The final thickness is Master Width times this value, so raising it does nothing while Master Width is 0. | `_DepthRimWidth` |
| **Rim Intensity** | Brightness multiplier for the 2D rim. At 0 the rim is skipped entirely, so its color and width change nothing. | `_DepthRimIntensity` |
| **Apply Fresnel** | Multiplies the detected 2D rim by a Fresnel area so its inner edge can fade gradually. Off keeps the original 2D rim shape unchanged. | `_DepthRimFresnelEnabled` |
| **Width** | Range 0-1; default 1. 0 leaves no Fresnel area and 1 uses the whole area. Softness never spreads the result outside this width. | `_DepthRimFresnelWidth` |
| **Softness** | Range 0-1; default 1. 0 is a hard boundary; 1 uses the selected width for a soft gradient. The width does not change. | `_DepthRimFresnelSoftness` |
| **Invert Area** | Moves the Fresnel area to the opposite side without changing its width. An edge-facing area moves toward the center. | `_DepthRimFresnelAreaInvert` |
| **Mix Base Color** | 0 draws the rim in the flat color you picked; 1 multiplies it by the Base Map so each material area gets its own rim tint. | `_DepthRimBaseColorMix` |
| **360 Rim** | 0 puts the rim only on the light side; 1 wraps it around the whole silhouette. Raise it for scenes with no directional light or with constantly changing light direction. | `_DepthRim360` |
| **Rim Sample Quality** | Chooses how many depth samples the 2D rim reads per pixel. Standard (2 taps) is the default. Low (1 tap) drops internal-edge suppression, so eye, nose, mouth and clothing boundaries leak rim and its inner boundary shifts by a texel as the camera moves. High (4 taps) walks the same check range more finely and rejects narrower internal edges, at two more depth samples. Rim width is identical on every tier. | `_DepthRimSampleQuality` |
| **Silhouette Start** | How far the surface must turn away from the camera to count as silhouette. This row and the transition softness below have no effect at all while Outer Silhouette Limit in the same group is 0. | `_DepthRimSilhouetteThreshold` |
| **Silhouette Transition** | Transition width of the silhouette test. Ignored while Outer Silhouette Limit in the same group is 0. | `_DepthRimSilhouetteSoftness` |
| **Blend Opacity** | How strongly the rim color blends in. Try lowering this before Intensity when the rim overpowers; at 0 the rim is invisible. | `_DepthRimColorBlendOpacity` |

## 2D Shadow

A lightweight character shadow drawn by shifting the screen-depth silhouette of objects in front away from the light. With Depth Stretch on, an object floating farther off the receiver casts a longer shadow, and with Depth Falloff on that shadow also fades progressively, so it reads as farther back. Sample count and fade distance follow the shared settings in the Depth Common tab.

| Control | What it does | Shader property |
|---|---|---|
| **2D Shadow** | Toggles the depth-based 2D shadow. Its signature use is the bangs shadow hair drops on the face. Needs the camera depth texture. Its identity is one hard sheet that even distant blockers drop like a projected shadow; soft contact shading belongs to SSAO - used together, SSAO re-darkens the contact areas on top. | `_DepthShadowEnabled` |
| **Cast MingToon 2D Projected Shadow** | Controls whether this material writes to MingToon's camera-depth field. Turn it off on glasses or accessories to exclude Opaque, Cutout, and Transparent surfaces from the 2D projected-shadow caster. Normal color rendering, transparent depth priming, and Unity real-time ShadowCaster shadows all stay enabled, so self-sorting and outlines look exactly as they did with the switch on. A disabled material is absent from the depth it reads, so its own 2D Rim Light, Inner 2D Edge, 2D Shadow, and translucency cannot see behind it. If the glasses themselves need a rim, use Fresnel Rim, which reads no depth. | `_2DShadowCasterEnabled` |
| **2D Shadow Mask** | Enables a mask that limits the 2D shadow to chosen areas - use it to erase the shadow where it is not wanted. | `_DepthShadowMaskEnabled` |
| **Channel** | Which channel of the 2D shadow mask to read. Split channels when several masks share one packed texture. | `_DepthShadowMaskChannel` |
| **Invert** | Flips the 2D shadow mask black-for-white so the shadow applies to the opposite area. | `_DepthShadowMaskInvert` |
| **2D Shadow Color** | Color of the 2D shadow - the depth-based shadow hair drops on the face. Keep its tone in line with the other shadow colors. | `_DepthShadowColor` |
| **Screen-Space Shadow Overlap Depth** | Extra depth applied only where 2D Shadow or SSAO overlaps another shadow. At 0 it merges into the same unified shadow color; raising it multiplies the overlap so the shape remains visible. | `_DepthShadowColorBlendOpacity` |
| **Shadow Brightness** | Brightness multiplier on the 2D shadow color; lower is darker. When 2D and cast shadows are unified, this becomes the brightness of the merged layer. | `_DepthShadowBrightness` |
| **Depth Availability** | How the shader decides whether a depth texture exists. Keep Auto. Force On is for hosts the automatic probes cannot see, when you can vouch for the buffer yourself; Force Off blocks depth effects entirely; Diagnostic paints the detection state on screen. | `_DepthAvailabilityMode` |
| **Shared Quality** | Depth-sample tier shared by the 2D Shadow tail and SSAO: Low 4, Standard 8, High 16. Each effect reads this many samples on its own. | `_ScreenSpaceShadowQuality` |
| **Shared Fade Distance** | Camera distance where 2D Shadow and SSAO fade together. They soften over the final 25 percent; zero means unlimited. | `_ScreenSpaceShadowFadeDistance` |
| **Face 2D Shadow Assist** | Off by default. After defining the face area, enable this to suppress self-overlap from MingToon's camera-depth projected shadow there. Other effects sharing that depth, such as 2D Rim Light and inner edge, can change too. | `_DepthShadowFaceAssistEnabled` |
| **Intensity** | How far the mask cuts the 2D shadow. At 1 the shadow disappears completely where the mask is black; lower values leave part of it. | `_DepthShadowMaskStrength` |
| **Depth Curve** | How the depth push grows with distance. At 0 the shadow moves in direct proportion to how far the object floats. Raising it keeps a nearby floating object almost in place and pushes only a far one farther and farther - the near stays put, the far recedes. | `_DepthShadowDepthCurve` |
| **Blur** | Softens the edge of the finished shadow by this radius in metres, in every direction. The radius comes from this value alone. Applied last, after the shadow is composed, so it spreads past the shadow's own size, smoothed as per-pixel noise (the centre read plus a four-tap rotating disc). Independent of the shared quality tier. The Shadow Boundary band lands only where the silhouette has been softened like this, so raising Blur widens that accent with it. At 0 it costs no extra depth samples. | `_DepthShadowBlur` |
| **2D Shadow Bias** | The front object must stand at least this far in front of the receiver to count as a shadow. 1 is 10 cm and 0.03 is 3 mm. At 0 only the depth-precision allowance remains. This value is subtracted from every blocker alike, so raising it removes shallow contact first: a nose stands further off the receiver plane than a fringe resting on the forehead, so by the value that erases the nose that fringe shadow is already gone. To clear the face's own relief, reach for Receiver Depth Pushback instead - it displaces only the material it is authored on, so the gap an unpushed strand of hair makes survives. | `_DepthShadowSelfReject` |

## SSAO (Screen Space Occlusion)

Re-reads the camera depth texture per pixel to darken creases and contact areas. It is a multiplicative overlay laid on AFTER the form, cast and 2D shadows are all painted, so a contact area deepens even inside an existing shadow. Radius and bias are world-sized, so the shape holds as camera distance and field of view change. Sample count and fade distance follow the shared settings in the Depth Common tab; the camera receiver pushback is shared with the 2D Shadow tab. Where no depth texture is available it disappears silently.

| Control | What it does | Shader property |
|---|---|---|
| **SSAO Enabled** | Reads the camera depth texture radially to soften creases and contact areas. Contact shading remains visible over form, cast and 2D shadows. While off the calculation is compiled out and costs nothing. | `_SsaoEnabled` |
| **SSAO Intensity** | How strong the effect is. At 0 the image matches the effect being off while the calculation still runs, so turn SSAO Enabled off when you are not using it. | `_SsaoIntensity` |
| **SSAO Contrast** | Contrast of the occlusion. Raising it keeps only the deeply recessed areas and erases the faint occlusion. | `_SsaoPower` |
| **SSAO Radius** | World-space search radius (0.001-0.05 m). This is the primary blur width: larger values make contact shading broader and softer. | `_SsaoRadius` |
| **SSAO Bias** | Slack that keeps the receiver's own surface from counting as occlusion, as a share of the SSAO radius (0.4 = 40 percent of the radius). Being radius-relative, the look holds as camera distance and radius change. A floor sized to the depth texel is applied automatically, so flat surfaces stay clean even at 0. Lower it when shallow creases disappear; raise it when curved surfaces show marks. | `_SsaoBias` |
| **Contact Falloff** | How close an occluder has to be to count, given as a MULTIPLE of `SSAO Radius`. At 1 the reach is one radius, at 2 it is two, and past that the weight falls to zero, so a distant wall does not darken the whole silhouette. Being a multiple rather than metres, it keeps its proportion when you change the radius. | `_SsaoFadeRange` |
| **SSAO Mask Intensity** | Restricts where the occlusion lands by borrowing the 2D Shadow Mask as it is. 0 uses no mask; raising it removes the occlusion wherever the mask covers. The channel, invert and HSVG are the ones set on the 2D Shadow Mask. | `_SsaoMaskStrength` |
| **SSAO Tint** | A color multiplied into the occluded areas only. White tints nothing and leaves the shadow color the material already resolved exactly as it was. | `_SsaoColor` |
| **Color Purity** | Saturation of the shadow color SSAO inherits, taken after the tint is multiplied into it. Range 0-10; default 1. 0 is grayscale, 1 preserves the tinted color, and values above 1 oversaturate it. It runs first of the three, ahead of Brightness and Gamma. | `_SsaoColorPurity` |
| **Color Brightness** | Brightness multiplier for the SSAO color after Purity. Range 0-4; default 1 preserves the existing look. It runs before Gamma. | `_SsaoColorBrightness` |
| **Color Gamma** | Gamma applied to the SSAO color after Purity and Brightness. It bends the value axis only and preserves hue and saturation. Range 0.1-3; default 1 is neutral. | `_SsaoColorGamma` |

## 2D Translucency

Measures how far light travelled through the character along the light, so thin parts read as if they were holding the light.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Translucency** | Makes thin parts - hair tails, cloth hems - read as if they were holding the light. It reads depth twice along the light to measure how far the light travelled through the character, so it works on its own with the 2D Rim Light off. | `_TranslucencyEnabled` |
| **Measure Width** | How far along the light this pixel looks to measure the distance the light travelled. Larger values let thicker parts count as thin; smaller values light only the very tips. | `_TranslucencyWidth` |
| **Depth Range** | A gap this deep in metres counts as fully open. Raise it when a surface only a little further back - cloth standing behind hair - is mistaken for background and lights up. | `_TranslucencyDepthRange` |
| **Shell Floor** | A hollow garment - a skirt, a cape, a veil - is wide on screen so it measures as thick, while the cloth itself is under a millimetre. Give such a material about 0.8 and it always counts as thin regardless of the measurement. Leave solid parts like skin and hands at 0 and let the measurement decide. | `_TranslucencyShellFloor` |
| **Translucency Intensity** | Overall brightness multiplier for the transmitted light. At 0 the whole module is skipped. | `_TranslucencyStrength` |
| **Edge Intensity** | Strength of the layer that lights only the outer silhouette. Set it to 0 and the result is exactly a single center layer. | `_TranslucencyEdgeIntensity` |
| **Width** | Range 0-1; default 0.8. 0 leaves no area and 1 uses the whole area. Softness never spreads the result outside this width. | `_TranslucencyEdgeWidth` |
| **Softness** | Range 0-1; default 1. 0 is a hard boundary; 1 is a soft gradient inside the selected width. The width does not change. | `_TranslucencyEdgeSoftness` |
| **Invert Area** | Swaps the inside and outside of the edge rim's generated area. It is applied before Width and Softness. | `_TranslucencyEdgeAreaInvert` |
| **Edge Color** | HDR color multiplied into the edge transmission. White leaves the derived colour unchanged. | `_TranslucencyEdgeColor` |
| **Color Purity** | Saturation after the base color, edge tint, and HSVG are composed. 0 Range 0-10; default 1. 0 is grayscale, 1 preserves the composed color, and values above 1 oversaturate it. | `_TranslucencyEdgeColorPurity` |
| **Edge Brightness** | Brightness multiplier after edge Color Purity. The default 1 preserves the existing look. | `_TranslucencyEdgeColorBrightness` |
| **Edge Gamma** | Edge-color gamma applied after Purity and Brightness. The default 1 is neutral. | `_TranslucencyEdgeColorGamma` |
| **Center Intensity** | Strength of the layer that lights the interior. Set it to 0 and the result is exactly a single edge layer. | `_TranslucencyCenterIntensity` |
| **Width** | Range 0-1; default 0.8. 0 leaves no area and 1 uses the whole area. Softness never spreads the result outside this width. | `_TranslucencyCenterWidth` |
| **Softness** | Range 0-1; default 1. 0 is a hard boundary; 1 is a soft gradient inside the selected width. The width does not change. | `_TranslucencyCenterSoftness` |
| **Invert Area** | Swaps the inside and outside of the center rim's generated area. It is applied before Width and Softness. | `_TranslucencyCenterAreaInvert` |
| **Center Color** | HDR color multiplied into the center transmission. White leaves the derived colour unchanged. | `_TranslucencyCenterColor` |
| **Color Purity** | Saturation after the base color, center tint, and HSVG are composed. 0 Range 0-10; default 1. 0 is grayscale, 1 preserves the composed color, and values above 1 oversaturate it. | `_TranslucencyCenterColorPurity` |
| **Center Brightness** | Brightness multiplier after center Color Purity. The default 1 preserves the existing look. | `_TranslucencyCenterColorBrightness` |
| **Center Gamma** | Center-color gamma applied after Purity and Brightness. The default 1 is neutral. | `_TranslucencyCenterColorGamma` |
| **Backlight Falloff** | How precisely the camera and the light must oppose each other for the effect to peak. Higher values confine the peak to a narrow, exactly backlit band; how much survives in front light is set by Front Light Floor. | `_TranslucencyLightPower` |
| **Front Light Floor** | How much transmitted light survives in full front light. Scattering only gets stronger when backlit; it does not switch off, and at 0 skin stops reading as skin. | `_TranslucencyAmbient` |
| **Normal Bend** | Bends the light vector toward the surface normal so a curved strand keeps transmitting slightly off the exact backlight axis. At 0 only the plain backlight response remains. | `_TranslucencyDistortion` |
| **View Bend** | Bends the light vector toward the camera. On flat hair cards, whose normals say nothing about the volume they stand for, the normal bend alone makes the light flicker on and off as the card turns; this is what stops that. | `_TranslucencyViewBend` |
| **Normal Influence** | How much the normal map shapes the transmission. 0 uses the mesh normal only. Lower it when a strong normal map breaks the glow into surface noise. | `_TranslucencyNormalInfluence` |
| **Scene Light Influence** | 0 ignores the scene light color and uses only the authored color; 1 takes the light fully. Worlds differ wildly, so both ends are needed. | `_TranslucencySceneLightInfluence` |
| **Exposure Softness** | Eases the two knees of the ramp normalized by Depth Range. At 0 it is exactly a straight ramp. It reshapes the response curve only and never moves where the boundary sits. | `_TranslucencySoftness` |
| **Density** | How steeply thinness turns into brightness. Higher values leave light only where the character is very thin, which reads as a denser material; lower values spread it wide. | `_TranslucencyDensity` |
| **Channel Spread** | Reproduces red scattering deeper into the surface than blue. Each channel decays at its own rate, so the region each one lights is a different size - a look no tint can stand in for. 0 makes all three channels identical. | `_TranslucencyChannelSpread` |

## Inner Outline

Configure the screen-depth edge drawn inside the visible surface.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Inner 2D Edge** | Draws interior edges from screen-depth differences. It needs no extra geometry, so it works on meshes where the Normal Outline breaks, but it requires the camera depth texture and does nothing on a Transparent surface. | `_OutlineInnerEdgeEnabled` |
| **Pressure Source** | Which painted channel modulates line width. VertexRed reads vertex color R, VertexAlpha reads A, WidthMask reads the width mask texture. Choosing VertexRed on a mesh imported with black vertex colors makes the line vanish entirely. | `_OutlineHullPressureSource` |
| **Inner Edge Mask** | Enables a mask limiting the inner edge to chosen areas - use it to erase unwanted lines on the face. | `_OutlineInnerEdgeMaskEnabled` |
| **Channel** | Which channel of the inner edge mask to read. Split channels when several masks share one packed texture. | `_OutlineInnerEdgeMaskChannel` |
| **Invert** | Flips the inner edge mask black-for-white so the edge applies to the opposite area. | `_OutlineInnerEdgeMaskInvert` |
| **Strength** | How far the mask cuts the inner edge. At 1 the line disappears completely where the mask is black; lower values leave part of it. | `_OutlineInnerEdgeMaskStrength` |
| **Inner Edge Color** | Color of the inner 2D edge, drawn on depth steps inside the silhouette - collar lines, the chin, cloth folds. | `_OutlineInnerEdgeColor` |
| **Color Gamma** | Applies gamma to the inner-outline color value axis while preserving hue and saturation. 1 is neutral and alpha, opacity, and width are unchanged. | `_OutlineInnerEdgeColorGamma` |
| **Width** | Width of the inner 2D edge. Usually kept thinner than the Normal Outline. | `_OutlineInnerEdgeWidth` |
| **Apply to Inner Outline** | Also applies the painted pressure to the Inner 2D Edge width. This toggle and Pressure Source live in the Normal Outline group, but this one keeps affecting the inner edge even with the Normal Outline turned off - on a mesh with black vertex colors it makes the inner edge disappear completely. | `_OutlineInnerEdgePressureApply` |
| **Depth Bias** | Only depth differences larger than this count as an edge. Lower catches gentle creases and turns noisy; higher drops the line on thin parts. | `_OutlineInnerEdgeBias` |
| **Softness** | Spatial feather across the inner edge. 0 keeps a hard line; 1 fades continuously across the full width down to zero. | `_OutlineInnerEdgeSoftness` |
| **Blend Opacity** | How strongly the inner edge color blends in. At 0 the inner edge is invisible. | `_OutlineInnerEdgeColorBlendOpacity` |
