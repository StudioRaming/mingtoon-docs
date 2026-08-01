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
| **Shadow Contribution Strength** | Strength of the shaded band just inside the silhouette. At 0 the whole rim-shade evaluation is skipped, so width, falloff and softness change nothing. | `_MingRimShadeIntensity` |
| **Rim Falloff** | Higher values pull the shaded band into a thinner strip at the silhouette. | `_MingRimShadePower` |
| **Rim Shadow Width** | Where the shaded band starts. At 0 no band appears. | `_MingRimShadeWidth` |
| **Edge Softness** | Width of the shaded band's edge blur. Low reads like an inked line. | `_MingRimShadeSoftness` |

## Rim Light

Configure view-angle-responsive rim lighting.

| Control | What it does | Shader property |
|---|---|---|
| **Intensity** | Brightness multiplier for the Fresnel rim. At 0 the rim never appears no matter how its color or width is set. | `_MingFresnelRimIntensity` |
| **Fresnel Power** | Higher values push the rim into a thinner band right at the silhouette. It works together with Width; lower values spread it out softly. 2-8 is the usual band. | `_MingFresnelRimPower` |
| **Width** | Where the rim starts. At 0 no rim appears; near 1 the whole surface lights up. | `_MingFresnelRimWidth` |
| **Softness** | Width of the rim's edge blur. Low gives a hard cel band, high a soft gradient. | `_MingFresnelRimSoftness` |
| **Light Direction Influence** | 0 wraps the rim around the whole silhouette from the camera's view; 1 keeps it only on the lit side. With no directional light in the scene there is no difference. | `_MingFresnelRimLightDirectionInfluence` |
| **Base Color Influence** | 0 uses the rim color as authored; 1 multiplies it by the Base Map so each material area gets its own rim tint. | `_MingFresnelRimBaseColorInfluence` |
| **Scene Light Influence** | 0 keeps the rim at a constant strength regardless of the scene; 1 lets it dim as the scene light dims. | `_MingFresnelRimSceneLightInfluence` |
