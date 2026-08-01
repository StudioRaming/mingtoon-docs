---
id: depth-effects
title: 2D depth effects
sidebar_position: 5
---

# 2D depth effects

Screen-space effects that read the camera depth texture. Without depth they vanish entirely, so confirm depth before touching any value here.

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
