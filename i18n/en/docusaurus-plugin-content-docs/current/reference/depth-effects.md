---
id: depth-effects
title: Depth Effects
sidebar_position: 4
---

# Depth Effects

These fields read the camera depth texture and draw in screen space. Without depth, none of them show at all.

This page is a table for looking up values. If you want the order to turn things on in, see the [Depth Effects guide](/guides/depth-effects).

The headings and order follow the inspector's section names and display order exactly.

The fields inside map and mask slots are the same in every slot.

Channel, remap, feather and mask UV are written once in the [Shared Texture Slot UI](/guides/texture-modules).

## Depth Effects Master {#깊이-효과-마스터}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Depth Effects** | Toggle | - | Off | Master switch for every depth effect - Depth Rim Light… |
| **Depth Availability** | Enum | Auto / Force On / Force Off / Diagnostic | Auto | How the shader decides whether a depth texture exists |
| **Master Width** | Float | 0 ~ 16 | 1 | A shared multiplier on the screen offset used by both Depth… |
| **Width Mode** | Enum | Screen Pixels / Distance Stable | Distance Stable | Screen Pixels keeps the offset in screen pixels, so the line… |
| **Distance Scaling** | Float | 0 ~ 4 | 1 | Sets the reference distance for the thickness while Width… |
| **Near-Camera Width Reduction** | Float | 0 ~ 1 | 1 | Reduces excessive depth-effect width when the camera is very… |
| **Master Bias** | Float | 0 ~ 1 | 0.02 | How much screen-depth difference counts as a real… |
| **Master Softness** | Float | 0.0001 ~ 1 | 0.08 | Transition width of the depth-edge test |

## Depth Rim Light {#뎁스-림라이트}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Depth Rim Light** | Toggle | - | Off | Toggles the Depth Rim Light, drawn from silhouette depth… |
| **Depth Rim Light Mask** | Toggle | - | Off | Enables a mask that limits the depth rim to chosen areas -… |
| **Rim Color** | Color | - | White | Color of the depth rim |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation after the base color and depth-rim tint are… |
| **Scene Light Influence** | Float | 0 ~ 1 | 1 | How closely the depth rim follows the scene light |
| **Rim Width Multiplier** | Float | 0 ~ 10 | 2 | A depth-rim-only multiplier on Master Width |
| **Rim Intensity** | Float | 0 ~ 8 | 1 | Brightness multiplier for the depth rim |
| **Apply Fresnel** | Toggle | - | On | Multiplies the detected depth rim by a Fresnel area so its… |
| **Width** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 1 |
| **Softness** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Invert Area** | Toggle | - | Off | Moves the Fresnel area to the opposite side without changing… |
| **Backlight Intensity Boost** | Float | 0 ~ 4 | 1 | 0 preserves the base result; stronger camera-to-main-light… |
| **Backlight Width Boost** | Float | 0 ~ 4 | 0.2 | Controls how much the depth rim widens under backlighting |
| **Visibility in Cast Shadow** | Float | 0 ~ 1 | 0.5 | 0 hides the rim in cast shadow; 1 keeps it fully visible |
| **Visibility in Depth Shadow** | Float | 0 ~ 1 | 0 | 0 hides the rim in depth shadow; 1 keeps it fully visible |
| **Mix Base Color** | Float | 0 ~ 1 | 0.5 | 0 draws the rim in the flat color you picked; 1 multiplies… |
| **360 Rim** | Float | 0 ~ 1 | 0.3 | 0 puts the rim only on the light side; 1 wraps it around the… |
| **Internal Edge Suppression** | Toggle | - | On | Keeps the rim only when neighboring depth samples agree… |
| **Internal Edge Check Range** | Float | 0 ~ 1 | 0.2 | Controls the neighboring area used to reject false internal… |
| **Depth Rim Sample Quality** | Enum | Low1Tap / Standard2Tap / High4Tap | Standard2Tap | How many depth samples the depth rim spends per pixel |
| **Outer Silhouette Limit** | Float | 0 ~ 1 | 1 | Suppresses front-facing internal rim using the original mesh… |
| **Silhouette Start** | Float | 0 ~ 1 | 0.12 | How far the surface must turn away from the camera to count… |
| **Silhouette Transition** | Float | 0.001 ~ 0.25 | 0.04 | Transition width of the silhouette test |

## Depth Shadow {#뎁스-그림자}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Depth Shadow** | Toggle | - | Off | Toggles the depth-based depth shadow |
| **Depth Shadow Mask** | Toggle | - | Off | Enables a mask that limits the depth shadow to chosen areas… |
| **Shadow Width** | Float | 0 ~ 10 | 3 | Thickness of the band drawn by shifting the front object's… |
| **Shadow Intensity** | Float | 0 ~ 1 | 1 | Controls the final amount of the depth silhouette shadow |
| **Depth Shadow Bias** | Float | 0 ~ 1 | 0.03 | Minimum gap between a blocker and the comparison receiver: 1… |
| **Receiver Depth Pushback** | Float | 0 ~ 0.1 | 0 | While Depth Shadow is enabled, pushes back both this… |
| **Follow Light Direction** | Float | 0 ~ 1 | 1 | 0 uses only manual offsets; 1 fully follows the light's… |
| **Face Fixed Direction** | Float | 0 ~ 1 | 0 | 0 follows the real light; 1 uses the face's local Up… |
| **Suppress Backlit Silhouette** | Toggle | - | Off | Skips the depth shadow on faces turned away from the light |
| **Depth Stretch** | Float | 0 ~ 4 | 0.75 | Widens the one shadow sheet the more the front object floats… |
| **Depth Curve** | Float | 0 ~ 1 | 0 | How a part's depth translates into width, blur and fade |
| **Depth Falloff** | Float | 0 ~ 1 | 0.5 | Lightens the shadow the further back in the character it… |
| **Depth Extra Blur** | Float | 0 ~ 4 | 0 | Adds spread the farther the front object floats |
| **Angle Width Floor** | Float | 0 ~ 1 | 0.35 | How far the shadow's width may shrink when the light lines… |
| **Angle Length Floor** | Float | 0 ~ 1 | 0.35 | How far the length the depth gradient adds may shrink at the… |
| **Softness** | Float | 0.001 ~ 0.05 | 0.05 | How far past the bias the depth gap must go before the… |
| **Blur** | Float | 0 ~ 0.02 | 0 | Softens the edge of the finished shadow by this radius in… |
| **Blur Taps** | Enum | Taps4 / Taps8 / Taps16 | Taps4 | How many depth samples build the spread |
| **Vertical Offset (Down +)** | Float | -4 ~ 4 | 0 | Screen-vertical offset independent of light and camera… |

## SSAO (Screen Space Occlusion) {#ssao-화면-공간-차폐}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **SSAO Enabled** | Toggle | - | Off | Reads the camera depth texture radially to soften creases… |
| **SSAO Intensity** | Float | 0 ~ 2 | 1 | How strong the effect is |
| **SSAO Contrast** | Float | 0.5 ~ 4 | 1 | Contrast of the occlusion |
| **SSAO Bias** | Float | 0 ~ 1 | 0.4 | Slack that keeps the receiver's own surface from counting as… |
| **SSAO Radius** | Float | 0.001 ~ 0.05 | 0.005 | World-space search radius (0.001-0.05 m) |
| **Contact Falloff** | Float | 0.25 ~ 4 | 1 | How close an occluder has to be to count, given as a… |
| **Depth Shadow Mask (shared)** | Toggle | - | Off | Enables a mask that limits the depth shadow to chosen areas… |
| **SSAO Mask Intensity** | Float | 0 ~ 1 | 0 | Restricts where the occlusion lands by borrowing the Depth… |
| **SSAO Tint** | Color | - | White | A color multiplied into the occluded areas only |
| **Color Purity** | Float | 0 ~ 10 | 1 | Saturation of the shadow color SSAO inherits, taken after… |
| **Color Brightness** | Float | 0 ~ 4 | 1 | Brightness multiplier for the SSAO color after Purity |
| **Color Gamma** | Float | 0.1 ~ 3 | 1 | Gamma applied to the SSAO color after Purity and Brightness |

## Inner Outline {#이너-아웃라인}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Inner Depth Edge** | Toggle | - | Off | Draws interior edges from screen-depth differences |
| **Inner Edge Mask** | Toggle | - | Off | Enables a mask limiting the inner edge to chosen areas - use… |
| **Inner Edge Color** | Color | - | 0.6, 0.45, 0.45, 1 | Color of the inner depth edge, drawn on depth steps inside… |
| **Color Gamma** | Float | 0.1 ~ 3 | 1 | Applies gamma to the inner-outline color value axis while… |
| **Width** | Float | 0 ~ 10 | 0.3 | Width of the inner depth edge |
| **Apply to Inner Outline** | Toggle | - | Off | Also applies the painted pressure to the Inner Depth Edge… |
| **Pressure Source** | Enum | Constant / VertexAlpha / VertexRed / WidthMask / OutlineNormalUV8 | Constant | Which painted channel modulates line width |
| **Depth Bias** | Float | 0 ~ 1 | 0.02 | Only depth differences larger than this count as an edge |
| **Softness** | Float | 0.0001 ~ 1 | 0.02 | Spatial feather across the inner edge |
| **Camera Distance / FOV Stabilization** | Float | 0 ~ 1 | 1 | 0 uses the legacy resolution-normalized pixel radius |

## SSSSS (Experimental) {#sssss-실험적}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Translucency** | Toggle | - | Off | Makes thin parts - hair tails, cloth hems - read as if they… |
| **Measure Width** | Float | 0 ~ 10 | 6 | How far along the light this pixel looks to measure the… |
| **Depth Range** | Float | 0.01 ~ 2 | 0.35 | A gap this deep in metres counts as fully open |
| **Shell Floor** | Float | 0 ~ 1 | 0 | A hollow garment - a skirt, a cape, a veil - is wide on… |
| **Transmission Intensity** | Float | 0 ~ 4 | 1 | Overall brightness multiplier for the transmitted light |
| **Edge Intensity** | Float | 0 ~ 20 | 1 | Strength of the layer that lights only the outer silhouette |
| **Edge Layer · Width** | Float | 0 ~ 1 | 0.8 | Range 0-1; default 0.8 |
| **Edge Layer · Softness** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Edge Layer · Invert Area** | Toggle | - | Off | Swaps the inside and outside of the edge rim's generated… |
| **Edge Layer · Color** | Color | - | White | HDR color multiplied into the edge transmission |
| **Edge Layer · Color Purity** | Float | 0 ~ 10 | 0.25 | Saturation after the base color, edge tint, and HSVG are… |
| **Edge Brightness** | Float | 0 ~ 4 | 1.6 | Brightness multiplier after edge Color Purity |
| **Edge Gamma** | Float | 0.1 ~ 3 | 1 | Edge-color gamma applied after Purity and Brightness |
| **Center Intensity** | Float | 0 ~ 20 | 1 | Strength of the layer that lights the interior |
| **Center Layer · Width** | Float | 0 ~ 1 | 0.8 | Range 0-1; default 0.8 |
| **Center Layer · Softness** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Center Layer · Invert Area** | Toggle | - | Off | Swaps the inside and outside of the center rim's generated… |
| **Center Layer · Color** | Color | - | White | HDR color multiplied into the center transmission |
| **Center Layer · Color Purity** | Float | 0 ~ 10 | 1.6 | Saturation after the base color, center tint, and HSVG are… |
| **Center Brightness** | Float | 0 ~ 4 | 1 | Brightness multiplier after center Color Purity |
| **Center Gamma** | Float | 0.1 ~ 3 | 1 | Center-color gamma applied after Purity and Brightness |
| **Backlight Falloff** | Float | 0.5 ~ 16 | 2 | How precisely the camera and the light must oppose each… |
| **Front Light Floor** | Float | 0 ~ 1 | 0.2 | How much transmitted light survives in full front light |
| **Normal Bend** | Float | 0 ~ 1 | 0.2 | Bends the light vector toward the surface normal so a curved… |
| **View Bend** | Float | 0 ~ 1 | 0.35 | Bends the light vector toward the camera |
| **Normal Influence** | Float | 0 ~ 1 | 1 | How much the normal map shapes the transmission |
| **Width by Thickness** | Float | 0 ~ 1 | 0.85 | Sets how much the band narrows where the surface is thick |
| **Brightness by Thickness** | Float | 0 ~ 1 | 0.5 | Sets how far the thick areas are darkened |
| **Saturation by Thickness** | Float | 0 ~ 1 | 0.35 | Sets how much saturation is removed where the surface is… |
| **Scene Light Influence** | Float | 0 ~ 1 | 1 | 0 ignores the scene light color and uses only the authored… |
| **Cast Shadow Influence** | Float | 0 ~ 1 | 0.5 | How much a projected shadow dims the transmitted light |
| **Exposure Softness** | Float | 0 ~ 1 | 0.25 | Eases the two knees of the ramp normalized by Depth Range |
| **Density** | Float | 0.25 ~ 8 | 1.5 | How steeply thinness turns into brightness |
| **Channel Spread** | Float | 0 ~ 1 | 0.3 | Reproduces red scattering deeper into the surface than blue |

## Related pages

- [Depth Effects usage guide](/guides/depth-effects)
- [Shared Texture Slot UI](/guides/texture-modules) — the channel, remap and UV fields inside map and mask slots
- [Troubleshooting](/troubleshooting)
