---
id: outline
title: Outline
sidebar_position: 7
---

# Outline

Normal Outline expands the mesh, so it works anywhere without camera depth. Inner 2D Edge, which reads screen depth to draw lines inside the surface, lives in the [Depth Effects](/reference/depth-effects) group.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

## Normal Outline

Configure the width, color, and distance correction of the outline expanded along the mesh normals.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Normal Outline** | Draws the line by expanding the mesh along its normals, in one additional pass. It works without a camera depth texture. | `_OutlineHullEnabled` |
| **Outline Width** | Outline width. Tune it while watching the whole character so the silhouette stays clean; per-area differences belong to the Width Mask. | `_OutlineHullWidth` |
| **Outline Color** | Color of the Normal Outline. A darkened relative of the base color reads natural; nearer black reads more comic. | `_OutlineHullColor` |
| **Color Gamma** | Applies gamma to the outline color value axis while preserving hue and saturation. 1 is neutral and alpha, opacity, and width are unchanged. | `_OutlineHullColorGamma` |
| **Follow Surface Alpha** | On, the outline fades in step with the surface - it stops a transparent garment's outline from staying solid and reading as wire hovering where the cloth used to be. Off, the outline keeps its own strength however transparent the surface becomes, which is what a nearly invisible garment needs to hold a readable silhouette. Opaque and Cutout publish full coverage either way, so the row changes nothing there. | `_OutlineHullFollowAlpha` |
| **Apply to Normal Outline** | Applies the painted pressure to the Normal Outline width. With Pressure Source set to Constant, turning it on changes nothing. | `_OutlineHullPressureApply` |
| **Pressure Contrast** | Raises the pressure value to a power, widening the difference in line weight. 0 ignores pressure entirely, 1 is the raw value, and higher values thin the thin parts further. With Pressure Source set to OutlineNormalUV8 this reads as thick along long faces and tapered at points. | `_OutlineHullPressureContrast` |
| **Protect Outline From DOF** | Makes the outline write depth so depth-of-field blur cannot erase the line. Turn it off if the outline reacts badly to other depth-based post effects. | `_OutlineHullDofProtection` |
| **Far-Distance Minimum Pixels** | Keeps the outline from thinning below this many screen pixels at distance. Raise it when far-away lines break up; lower it when they stand out too much. | `_OutlineDistanceMinPixels` |
| **Width Mode** | PixelStable keeps the line a constant thickness on screen regardless of distance; WorldSpace scales it with world size so it thins as the camera pulls back. PixelStable is the safe choice for avatars. | `_OutlineHullWidthMode` |
| **Normal Source** | Which direction the outline is pushed along. MeshNormal uses the raw mesh normal; VertexColorTS and UV8TS read a smoothed outline normal baked into vertex color or UV8. Choosing either on a mesh without that bake breaks the line at hard edges. | `_OutlineHullNormalSource` |
| **Authored Vector Direction** | Sources the outline push direction from a texture. While off, the vector UV and vector scale rows below are ignored and Normal Source decides the direction. | `_OutlineVectorEnabled` |
| **Vector UV** | Which UV set the outline direction texture is sampled with. Ignored while Authored Vector Direction is off. | `_OutlineVectorUVMode` |
| **Vector Scale** | Strength of the authored direction vector; negative values flip it. Ignored while Authored Vector Direction is off. | `_OutlineVectorScale` |
| **Depth Bias** | Pulls the whole Normal Outline toward or away from the camera to rescue an outline buried inside another part. Pulling too far makes the line float in front of the face. | `_OutlineHullZBias` |
| **Include Shading** | Includes form, cast, and 2D shadows plus the 2D rim in the final outline color. Turn it off to keep one lighting-independent line color. | `_OutlineIncludeFormShadow` |
| **Outline Shadow Pattern** | Prints the shadow pattern screentone onto the outline as well, following the Shadow Pattern tab's settings. | `_OutlinePatternEnabled` |
| **Blend Opacity** | How strongly the outline color blends in. At 0 the line is invisible. | `_OutlineHullColorBlendOpacity` |

## section.outline

| Control | What it does | Shader property |
|---|---|---|
| **Outline Master** | Shared gate both Normal Outline and Inner 2D Edge sit behind. While off, neither tab renders. Kept as a compatibility switch for older materials. | `_OutlineEnabled` |

## Stencil Settings

Configure stencil state separately for the general and Normal Outline passes.

| Control | What it does | Shader property |
|---|---|---|
| **Stencil Reference** | Stencil value used by the outline pass. Only touch it when matching another shader's mask; at the defaults the stencil does not affect the render. | `_OutlineStencilRef` |
| **Stencil Read Mask** | Bit mask applied when reading the stencil buffer. Only needed when interoperating with another shader's stencil mask. | `_OutlineStencilReadMask` |
| **Stencil Write Mask** | Bit mask applied when writing the stencil buffer. Only needed when interoperating with another shader's stencil mask. | `_OutlineStencilWriteMask` |
| **Stencil Compare** | How the stencil value is compared to decide which pixels pass. Always means the stencil never masks the outline. Change it only when another shader should clip the outline. | `_OutlineStencilComp` |
| **Stencil Pass** | What to do to the stencil buffer when both the stencil and depth tests pass. The default Keep leaves the buffer untouched. | `_OutlineStencilPass` |
| **Stencil Fail** | What to do to the stencil buffer when the stencil test fails. The default Keep leaves the buffer untouched. | `_OutlineStencilFail` |
| **Stencil ZFail** | What to do when the stencil test passes but the depth test fails. The default Keep leaves the buffer untouched. | `_OutlineStencilZFail` |
