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
| **Enable Rim Shade** | Off by default. Adds a shaded band just inside the silhouette to the form-shadow mask. It does not add color; off skips the evaluation. | `_RimShadeEnabled` |
| **Shadow Contribution Intensity** | Range 0-1; default 1. Strength of the shaded band just inside the silhouette. At 0 the whole rim-shade evaluation is skipped, so width and softness change nothing. | `_RimShadeIntensity` |
| **Width** | Range 0-1; default 0.2. 0 leaves no area and 1 uses the whole area. Softness never spreads the result outside this width. | `_RimShadeWidth` |
| **Softness** | Range 0-1; default 0.4. 0 is a hard boundary; 1 is a soft gradient inside the selected width. The width does not change. | `_RimShadeSoftness` |
| **Rim Shade Normal Influence** | Range 0-1; default 1. 0 uses the mesh normal; 1 uses stacked normal maps for the rim-shadow shape. With normal layers off it falls back to the mesh normal. | `_RimShadeNormalInfluence` |

## Rim Light

Configure view-angle-responsive rim lighting.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Fresnel Rim** | On by default. Composites rim light toward silhouette edges viewed at a grazing angle. Off preserves values but skips this pass. | `_FresnelRimEnabled` |
| **Fresnel Rim Color** | HDR rim-light color; default is (26.17, 26.17, 26.17). It is multiplied by Blend Opacity, and very high values can clip to white without bloom. | `_FresnelRimColor` |
| **Fresnel Rim Blend Mode** | Chooses Normal, Multiply, Add, Hue, Screen, Color, or Overlay for the rim. Default Add (2) increases brightness, so high HDR color or opacity can clip or bloom. | `_FresnelRimBlendMode` |
| **Blend Opacity** | How strongly the fresnel rim blends in. Use it to dial the rim's presence down without touching its color or intensity; 0 turns the rim off entirely. | `_FresnelRimBlendOpacity` |
| **Color Purity** | Saturation after the base color and Fresnel-rim tint are composed. 0 Range 0-10; default 1. 0 is grayscale, 1 preserves the composed color, and values above 1 oversaturate it. | `_FresnelRimColorPurity` |
| **Fresnel Rim Intensity** | Range 0-20; default 0.52. Brightness multiplier for the Fresnel rim. At 0 the rim never appears no matter how its color or width is set. | `_FresnelRimIntensity` |
| **Width** | Range 0-1; default 0. 0 leaves no area and 1 uses the whole Fresnel area. Softness never spreads the result outside this width. | `_FresnelRimWidth` |
| **Softness** | Range 0-1; default 0.64. 0 is a hard boundary; 1 uses the selected width for a soft gradient. The width does not change. | `_FresnelRimSoftness` |
| **Light-Side Emphasis** | 0 keeps rim brightness uniform around the form; 1 keeps only the side reached by the resolved main or Virtual Light. The opposite side falls fully to zero so light rotation reads immediately. View Alignment below controls the area's position. | `_FresnelRimLightDirectionInfluence` |
| **View Alignment** | Chooses the axis that places the rim area. 1 is a conventional camera-silhouette Fresnel; 0 locks the band to the resolved main or Virtual Light axis. | `_FresnelRimViewStrength` |
| **Fresnel Rim Visibility In Shadow** | Range 0-1; default 0. 0 keeps the Fresnel rim hidden in shadow; 1 keeps it fully visible in shadow. | `_FresnelRimShadowVisibility` |
| **Base Color Influence** | 0 uses the rim color as authored; 1 multiplies it by the Base Map so each material area gets its own rim tint. | `_FresnelRimBaseColorInfluence` |
| **Scene Light Influence** | 0 keeps the rim at a constant strength regardless of the scene; 1 lets it dim as the scene light dims. | `_FresnelRimSceneLightInfluence` |
| **Fresnel Rim Normal Map Influence** | Range 0-1; default 1. 0 uses the mesh normal only; 1 uses the stacked normal maps fully. | `_FresnelRimNormalInfluence` |
| **Fresnel Rim Distance Compensation** | Range 0-1; default 1. 0 uses the legacy raw width; 1 keeps the Fresnel rim width stable as camera distance changes. | `_FresnelRimDistanceCompensation` |
| **Fresnel Rim Projection Compensation** | Range 0-1; default 1. 0 uses the legacy raw width; 1 keeps the Fresnel rim width stable across FOV and orthographic projection. | `_FresnelRimProjectionCompensation` |

## Backlight

Configure the independent band produced by light behind the surface.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Backlight** | On by default. Adds an accent when the main light is behind the surface. Off preserves values but skips this module's color contribution and pixel work. | `_BacklightEnabled` |
| **Backlight Color** | HDR backlight color; default is (2, 2, 2). It is multiplied by Strength, and high values can clip to white without bloom. | `_BacklightColor` |
| **Backlight Blend Mode** | Chooses Normal, Multiply, Add, Hue, Screen, Color, or Overlay for the backlight. Default Add preserves the previous additive result. | `_BacklightBlendMode` |
| **Blend Opacity** | How strongly the backlight blends into the final color. It reduces presence without changing color or intensity; 0 turns it off. | `_BacklightBlendOpacity` |
| **Color Purity** | Saturation after the base color and backlight tint are composed. 0 Range 0-10; default 1. 0 is grayscale, 1 preserves the composed color, and values above 1 oversaturate it. | `_BacklightColorPurity` |
| **Backlight Intensity** | Range 0-10; default 0.29. Multiplies backlight brightness; at 0 the backlight is invisible, so color and border changes cannot be seen. | `_BacklightStrength` |
| **Width** | Range 0-1; default 0.34. 0 leaves no area and 1 uses the whole area. Softness never spreads the result outside this width. | `_BacklightBorder` |
| **Softness** | Range 0-1; default 0.5. 0 is a hard boundary; 1 is a soft gradient inside the selected width. The width does not change. | `_BacklightSoftness` |
| **Backlight Directivity** | Range 0-1; default 0.5. How strictly the effect follows light direction. 0 spreads broadly; 1 reacts more narrowly to the back-facing condition. | `_BacklightDirectivity` |
| **Backlight View Intensity** | Range 0-1; default 1. View-direction influence on the backlight shape. 0 is stable as the camera moves; 1 changes the edge response more strongly. | `_BacklightViewStrength` |
| **Backlight Normal Influence** | Range 0-1; default 1. 0 uses the mesh normal; 1 uses stacked normal maps for the backlight edge. With normal layers off, 1 has no extra effect. | `_BacklightNormalInfluence` |
| **Backlight Shadow Visibility** | Range 0-1; default 0.5. How much backlight survives in shadow. 0 hides it in shadow; 1 keeps it visible regardless of the shadow mask. | `_BacklightShadowVisibility` |
| **Backlight Base Color Influence** | Range 0-1; default 0.5. 0 uses the authored backlight color; 1 fully multiplies it by the Base Map. | `_BacklightBaseColorInfluence` |
| **Backlight Scene Light Influence** | Range 0-1; default 1. How much scene-light brightness dims the backlight. 0 keeps a constant stylized light; 1 follows scene brightness. | `_BacklightSceneLightInfluence` |

## Shadow Interior Reflection

Configure a Fresnel reflection band visible only inside shadow.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Shadow Interior Reflection** | On by default. Adds a reflection band only inside regions darkened by lighting, cast shadows, or 2D shadows. Off skips the entire effect, including its shadow gate. | `_ShadowReflectionEnabled` |
| **Shadow Interior Reflection Color** | HDR color for the shadow-interior reflection; default is (3.81, 3.81, 3.81). Blend Opacity and Intensity also apply, and high values can clip without bloom. | `_ShadowReflectionColor` |
| **Shadow Reflection Blend Mode** | Chooses Normal, Multiply, Add, Hue, Screen, Color, or Overlay for the shadow reflection. Default Add (2) adds brightness; the shadow gate and opacity still limit where it appears. | `_ShadowReflectionBlendMode` |
| **Blend Opacity** | How strongly the shadow interior reflection layer blends in. Lower it when the bounce light inside shadows reads too strong; 0 turns it off. | `_ShadowReflectionBlendOpacity` |
| **Color Purity** | Saturation after the base color and shadow-reflection tint are composed. 0 Range 0-10; default 1. 0 is grayscale, 1 preserves the composed color, and values above 1 oversaturate it. | `_ShadowReflectionColorPurity` |
| **Shadow Interior Reflection Intensity** | Range 0-20; default 0.5. Brightness multiplier for the reflection inside shadow regions; at 0 it adds no color even when the shadow shape is configured. | `_ShadowReflectionIntensity` |
| **Width** | Range 0-1; default 0.9. 0 leaves no area and 1 uses the whole area. Softness never spreads the result outside this width. | `_ShadowReflectionWidth` |
| **Softness** | Range 0-1; default 0.5. 0 is a hard boundary; 1 is a soft gradient inside the selected width. The width does not change. | `_ShadowReflectionSoftness` |
| **Shadow Reflection Normal Influence** | Range 0-1; default 1. 0 uses the mesh normal; 1 uses stacked normal maps for the reflection shape. With normal layers off it falls back to the mesh normal. | `_ShadowReflectionNormalInfluence` |
| **Shadow Reflection Threshold** | Range 0-1; default 0.8. Reflection begins in shadow regions past this threshold; higher limits it to deeper shadow. | `_ShadowReflectionShadowThreshold` |
| **Shadow Reflection Shadow Softness** | Range 0.001-1; default 0.5. Transition width between lit pixels and the shadow-only reflection; higher blends the boundary over a wider area. | `_ShadowReflectionShadowSoftness` |
| **Shadow Reflection Base Color Influence** | Range 0-1; default 0.7. 0 uses reflection color alone; 1 fully multiplies it by the Base Map. | `_ShadowReflectionBaseColorInfluence` |
| **Shadow Reflection Scene Light Influence** | Range 0-1; default 1. How scene-light brightness dims the reflection; 0 keeps a constant stylized light. | `_ShadowReflectionSceneLightInfluence` |
| **Shadow Reflection Light-Side Emphasis** | Range 0-1; default 1. 0 keeps reflected brightness uniform around the form; 1 keeps only the side reached by the main and additional lights. It selects the bright side rather than moving the area. | `_ShadowReflectionLightDirectionInfluence` |
| **Shadow Reflection Ambient Influence** | Range 0-1; default 1. 0 ignores ambient probe/SH color; 1 applies the Light Probe and ambient SH color fully inside the shadow reflection. | `_ShadowReflectionAmbientInfluence` |
| **Shadow Reflection Additional Light Influence** | Range 0-1; default 1. 0 ignores additional point or spot lights; 1 applies each point or spot light's direction, color, shadowing, and attenuation fully. | `_ShadowReflectionAdditionalLightInfluence` |
| **Visibility in Cast Shadow** | 0 hides the interior reflection inside the cast shadow; 1 keeps it fully visible (default). Lower it when the highlight should not shine inside a projected shadow. This also applies to reflection contributed by point/spot additional lights in WARUDO (Built-in). 2D shadow and SSAO are not recomputed in the additional-light pass. | `_ShadowReflectionCastShadowVisibility` |

## Front Light

Configure an independent front-facing accent light.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Front Light** | On by default. Adds an independent accent on front-facing surfaces using the current light and view. Off skips this effect's pixel work. | `_FrontLightEnabled` |
| **Front Light Color** | HDR front-light color; default is (1, 1, 1). Final output is also affected by Strength and the surface blend. | `_FrontLightColor` |
| **Front Light Blend Mode** | Chooses Normal, Multiply, Add, Hue, Screen, Color, or Overlay for the front light. The default is Add for a bright accent. | `_FrontLightBlendMode` |
| **Blend Opacity** | How strongly the front light blends into the final color. It reduces presence without changing color or intensity; 0 turns it off. | `_FrontLightBlendOpacity` |
| **Color Purity** | Saturation after the base color and front-light tint are composed. 0 Range 0-10; default 1. 0 is grayscale, 1 preserves the composed color, and values above 1 oversaturate it. | `_FrontLightColorPurity` |
| **Front Light Intensity** | Range 0-10; default 0.2. Multiplies the front-light accent; at 0 the remaining area and color controls have no visible contribution. | `_FrontLightStrength` |
| **Area Size** | Range 0-1; default 0.25. 0 is off and 1 makes the full front-facing area available to the accent. On rounded forms it closely tracks the projected radius of the circular accent. | `_FrontLightSize` |
| **Softness** | Range 0-1; default 0.35. 0 gives a hard outer edge; 1 fades across the selected area. The outer Area Size boundary never moves. | `_FrontLightSoftness` |
| **Highlight Core Size** | Range 0-1; default 0.4. Relative size of the brighter core inside the outer area. 0 removes the core region. | `_FrontLightCoreSize` |
| **Highlight Core Intensity** | Range 0-2; default 0.25. Extra brightness in the core. 0 disables only the core boost while preserving the outer area. | `_FrontLightCoreIntensity` |
| **Light Direction Influence** | Range 0-1; default 0.5. Weight of the main light direction in the cap axis. It is independent of View Direction Influence; raising it moves the cap toward the Directional Light at the same view weight. | `_FrontLightLightDirectionInfluence` |
| **View Direction Influence** | Range 0-1; default 0.5. Weight of the camera view direction in the cap axis. At 0 the cap stays on the main-light axis as the camera orbits; raising it moves the cap toward camera-facing at the same light weight. Setting both direction weights to 0 disables Front Light. | `_FrontLightViewDirectionInfluence` |
| **Front Light Normal Influence** | Range 0-1; default 1. 0 uses mesh normals; 1 uses stacked normal maps. With normal layers off, there is no difference. | `_FrontLightNormalInfluence` |
| **Front Light Shadow Visibility** | Range 0-1; default 0.3. How much the front-light accent remains inside shadow. | `_FrontLightShadowVisibility` |
| **Front Light Base Color Influence** | Range 0-1; default 0.5. 0 uses the authored accent color; 1 fully multiplies it by the Base Map. | `_FrontLightBaseColorInfluence` |
| **Front Light Scene Light Influence** | Range 0-1; default 1. How scene-light brightness affects the accent; 0 keeps a constant stylized light. | `_FrontLightSceneLightInfluence` |
