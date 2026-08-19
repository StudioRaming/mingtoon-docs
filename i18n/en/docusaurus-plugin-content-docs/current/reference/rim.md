---
id: rim
title: Rim
sidebar_position: 3
---

# Rim

This group lifts the silhouette and separates the character from the background. They stack fast, so raise one at a time.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

## Rim Shade

Configure the shaded band along silhouettes.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Rim Shade** | Off by default. Adds a shaded band just inside the silhouette to the form-shadow mask. It does not add color; off skips the evaluation. | `_MingRimShadeEnabled` |
| **Shadow Contribution Strength** | Range 0-1; default 1. Strength of the shaded band just inside the silhouette. At 0 the whole rim-shade evaluation is skipped, so width, falloff and softness change nothing. | `_MingRimShadeIntensity` |
| **Rim Falloff** | Range 0.01-32; default 0.3. Higher values pull the shaded band into a thinner strip at the silhouette. | `_MingRimShadePower` |
| **Rim Shadow Width** | Range 0-1; default 0.2. Where the shaded band starts. At 0 no band appears. | `_MingRimShadeWidth` |
| **Edge Softness** | Range 0.001-2; default 0.4. Width of the shaded band's edge blur. Low reads like an inked line. | `_MingRimShadeSoftness` |
| **Rim Shade Normal Influence** | Range 0-1; default 1. 0 uses the mesh normal; 1 uses stacked normal maps for the rim-shadow shape. With normal layers off it falls back to the mesh normal. | `_MingRimShadeNormalInfluence` |

## Rim Light

Configure view-angle-responsive rim lighting.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Fresnel Rim** | On by default. Composites rim light toward silhouette edges viewed at a grazing angle. Off preserves values but skips this pass. | `_MingFresnelRimEnabled` |
| **Fresnel Rim Color** | HDR rim-light color; default is (26.17, 26.17, 26.17). It is multiplied by Blend Opacity, and very high values can clip to white without bloom. | `_MingFresnelRimColor` |
| **Fresnel Rim Blend Mode** | Chooses Normal, Multiply, Add, Hue, Screen, Color, or Overlay for the rim. Default Add (2) increases brightness, so high HDR color or opacity can clip or bloom. | `_MingFresnelRimBlendMode` |
| **Blend Opacity** | How strongly the fresnel rim blends in. Use it to dial the rim's presence down without touching its color or intensity; 0 turns the rim off entirely. | `_MingFresnelRimBlendOpacity` |
| **Intensity** | Range 0-20; default 0.52. Brightness multiplier for the Fresnel rim. At 0 the rim never appears no matter how its color or width is set. | `_MingFresnelRimIntensity` |
| **Fresnel Power** | Range 0.01-32; default 0.54. Higher values push the rim into a thinner band right at the silhouette. It works together with Width; lower values spread it out softly. 2-8 is the usual band. | `_MingFresnelRimPower` |
| **Width** | Range 0-1; default 0. Where the rim starts. At 0 no rim appears; near 1 the whole surface lights up. | `_MingFresnelRimWidth` |
| **Softness** | Range 0.001-2; default 0.64. Width of the rim's edge blur. Low gives a hard cel band, high a soft gradient. | `_MingFresnelRimSoftness` |
| **Fresnel Rim Distance Compensation** | Range 0-1; default 1. 0 uses the legacy raw width; 1 keeps the Fresnel rim width stable as camera distance changes. | `_MingFresnelRimDistanceCompensation` |
| **Fresnel Rim Projection Compensation** | Range 0-1; default 1. 0 uses the legacy raw width; 1 keeps the Fresnel rim width stable across FOV and orthographic projection. | `_MingFresnelRimProjectionCompensation` |
| **Fresnel Rim Normal Map Influence** | Range 0-1; default 1. 0 uses the mesh normal only; 1 uses the stacked normal maps fully. | `_MingFresnelRimNormalInfluence` |
| **Light Direction Influence** | 0 wraps the rim around the whole silhouette from the camera's view; 1 keeps it only on the lit side. With no directional light in the scene there is no difference. | `_MingFresnelRimLightDirectionInfluence` |
| **Fresnel Rim View Strength** | Whether the view or the light decides where the rim sits. 1 rings the silhouette as the camera sees it, exactly as before, so the rim moves with the camera. 0 follows the light direction alone, so the rim stays put while the camera orbits. | `_MingFresnelRimViewStrength` |
| **Fresnel Rim Visibility In Shadow** | Range 0-1; default 0. 0 keeps the Fresnel rim hidden in shadow; 1 keeps it fully visible in shadow. | `_MingFresnelRimShadowVisibility` |
| **Base Color Influence** | 0 uses the rim color as authored; 1 multiplies it by the Base Map so each material area gets its own rim tint. | `_MingFresnelRimBaseColorInfluence` |
| **Scene Light Influence** | 0 keeps the rim at a constant strength regardless of the scene; 1 lets it dim as the scene light dims. | `_MingFresnelRimSceneLightInfluence` |

## Backlight

Configure the independent band produced by light behind the surface.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Backlight** | On by default. Adds an accent when the main light is behind the surface. Off preserves values but skips this module's color contribution and pixel work. | `_MingBacklightEnabled` |
| **Backlight Color** | HDR backlight color; default is (2, 2, 2). It is multiplied by Strength, and high values can clip to white without bloom. | `_MingBacklightColor` |
| **Backlight Strength** | Range 0-10; default 0.29. Multiplies backlight brightness; at 0 the backlight is invisible, so color and border changes cannot be seen. | `_MingBacklightStrength` |
| **Backlight Border** | Range 0-1; default 0.66. Sets where backlight starts: higher covers more of the surface, lower keeps it near the silhouette. | `_MingBacklightBorder` |
| **Backlight Softness** | Range 0.001-1; default 0.5. Width of the border transition. Low is a hard cel band; high spreads a softer gradient. | `_MingBacklightSoftness` |
| **Backlight Directivity** | Range 0-1; default 0.5. How strictly the effect follows light direction. 0 spreads broadly; 1 reacts more narrowly to the back-facing condition. | `_MingBacklightDirectivity` |
| **Backlight View Strength** | Range 0-1; default 1. View-direction influence on the backlight shape. 0 is stable as the camera moves; 1 changes the edge response more strongly. | `_MingBacklightViewStrength` |
| **Backlight Normal Influence** | Range 0-1; default 1. 0 uses the mesh normal; 1 uses stacked normal maps for the backlight edge. With normal layers off, 1 has no extra effect. | `_MingBacklightNormalInfluence` |
| **Backlight Shadow Visibility** | Range 0-1; default 0.5. How much backlight survives in shadow. 0 hides it in shadow; 1 keeps it visible regardless of the shadow mask. | `_MingBacklightShadowVisibility` |
| **Backlight Base Color Influence** | Range 0-1; default 0.5. 0 uses the authored backlight color; 1 fully multiplies it by the Base Map. | `_MingBacklightBaseColorInfluence` |
| **Backlight Scene Light Influence** | Range 0-1; default 1. How much scene-light brightness dims the backlight. 0 keeps a constant stylized light; 1 follows scene brightness. | `_MingBacklightSceneLightInfluence` |

## Shadow Interior Reflection

Configure a Fresnel reflection band visible only inside shadow.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Shadow Interior Reflection** | On by default. Adds a reflection band only inside regions darkened by lighting, cast shadows, or 2D shadows. Off skips the entire effect, including its shadow gate. | `_MingShadowReflectionEnabled` |
| **Shadow Interior Reflection Color** | HDR color for the shadow-interior reflection; default is (3.81, 3.81, 3.81). Blend Opacity and Intensity also apply, and high values can clip without bloom. | `_MingShadowReflectionColor` |
| **Shadow Reflection Blend Mode** | Chooses Normal, Multiply, Add, Hue, Screen, Color, or Overlay for the shadow reflection. Default Add (2) adds brightness; the shadow gate and opacity still limit where it appears. | `_MingShadowReflectionBlendMode` |
| **Blend Opacity** | How strongly the shadow interior reflection layer blends in. Lower it when the bounce light inside shadows reads too strong; 0 turns it off. | `_MingShadowReflectionBlendOpacity` |
| **Shadow Interior Reflection Intensity** | Range 0-20; default 0.5. Brightness multiplier for the reflection inside shadow regions; at 0 it adds no color even when the shadow shape is configured. | `_MingShadowReflectionIntensity` |
| **Shadow Reflection Falloff** | Range 0.01-32; default 3.9. Higher values pull the reflection into a thinner band at the silhouette edge. | `_MingShadowReflectionPower` |
| **Shadow Reflection Width** | Range 0-1; default 0.9. Width of the reflection band inside shadow; 0 removes the band, near 1 covers more of the shadow interior. | `_MingShadowReflectionWidth` |
| **Shadow Reflection Softness** | Range 0.001-1; default 0.5. Edge transition width; low is a hard band, high is a softer gradient. | `_MingShadowReflectionSoftness` |
| **Shadow Reflection Normal Influence** | Range 0-1; default 1. 0 uses the mesh normal; 1 uses stacked normal maps for the reflection shape. With normal layers off it falls back to the mesh normal. | `_MingShadowReflectionNormalInfluence` |
| **Shadow Reflection Threshold** | Range 0-1; default 0.8. Reflection begins in shadow regions past this threshold; higher limits it to deeper shadow. | `_MingShadowReflectionShadowThreshold` |
| **Shadow Reflection Shadow Softness** | Range 0.001-1; default 0.5. Transition width between lit pixels and the shadow-only reflection; higher blends the boundary over a wider area. | `_MingShadowReflectionShadowSoftness` |
| **Shadow Reflection Base Color Influence** | Range 0-1; default 0.7. 0 uses reflection color alone; 1 fully multiplies it by the Base Map. | `_MingShadowReflectionBaseColorInfluence` |
| **Shadow Reflection Scene Light Influence** | Range 0-1; default 1. How scene-light brightness dims the reflection; 0 keeps a constant stylized light. | `_MingShadowReflectionSceneLightInfluence` |
| **Shadow Reflection Light Direction Influence** | Range 0-1; default 1. 0 ignores light direction and leaves the reflected rim unshaped; 1 follows main and additional light directions to place it on the lit side. | `_MingShadowReflectionLightDirectionInfluence` |
| **Shadow Reflection Ambient Influence** | Range 0-1; default 1. 0 ignores ambient probe/SH color; 1 applies the Light Probe and ambient SH color fully inside the shadow reflection. | `_MingShadowReflectionAmbientInfluence` |
| **Shadow Reflection Additional Light Influence** | Range 0-1; default 1. 0 ignores additional point or spot lights; 1 applies each point or spot light's direction, color, shadowing, and attenuation fully. | `_MingShadowReflectionAdditionalLightInfluence` |

## Front Light

Configure an independent front-facing accent light.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Front Light** | On by default. Adds an independent accent on front-facing surfaces using the current light and view. Off skips this effect's pixel work. | `_MingFrontLightEnabled` |
| **Front Light Color** | HDR front-light color; default is (1, 1, 1). Final output is also affected by Strength and the surface blend. | `_MingFrontLightColor` |
| **Front Light Strength** | Range 0-10; default 0.2. Multiplies the front-light accent; at 0 the remaining border and color controls have no visible contribution. | `_MingFrontLightStrength` |
| **Front Light Border** | Range 0-1; default 0.9. Sets where the front-light accent starts. Higher covers more; lower keeps it near the center-facing area. | `_MingFrontLightBorder` |
| **Front Light Softness** | Range 0.001-1; default 0.17. Border transition width. Low is a crisp cel band; high makes a softer transition. | `_MingFrontLightSoftness` |
| **Front Light Directivity** | Range 0-1; default 0.5. How strictly the accent follows the light direction and front-facing condition. | `_MingFrontLightDirectivity` |
| **Front Light View Strength** | Range 0-1; default 0.65. View-direction influence on the front-light area; higher values change it more as the camera moves. | `_MingFrontLightViewStrength` |
| **Front Light Normal Influence** | Range 0-1; default 1. 0 uses mesh normals; 1 uses stacked normal maps. With normal layers off, there is no difference. | `_MingFrontLightNormalInfluence` |
| **Front Light Shadow Visibility** | Range 0-1; default 0.3. How much the front-light accent remains inside shadow. | `_MingFrontLightShadowVisibility` |
| **Front Light Base Color Influence** | Range 0-1; default 0.5. 0 uses the authored accent color; 1 fully multiplies it by the Base Map. | `_MingFrontLightBaseColorInfluence` |
| **Front Light Scene Light Influence** | Range 0-1; default 1. How scene-light brightness affects the accent; 0 keeps a constant stylized light. | `_MingFrontLightSceneLightInfluence` |
