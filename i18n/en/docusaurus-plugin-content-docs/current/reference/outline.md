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

Configure the width, color, and distance correction of the mesh-normal hull outline.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Classic Hull** | An inverted-hull outline drawn as one additional pass. It works without a camera depth texture. | `_OutlineHullEnabled` |
| **Width Mode** | PixelStable keeps the line a constant thickness on screen regardless of distance; WorldSpace scales it with world size so it thins as the camera pulls back. PixelStable is the safe choice for avatars. | `_OutlineHullWidthMode` |
| **Hull Pressure Contrast** | Raises the pressure value to a power, widening the difference in line weight. 0 ignores pressure entirely, 1 is the raw value, and higher values thin the thin parts further. With Pressure Source set to OutlineNormalUV8 this reads as thick along long faces and tapered at points. | `_OutlineHullPressureContrast` |
| **Normal Source** | Which direction the hull is pushed along. MeshNormal uses the raw mesh normal; VertexColorTS and UV8TS read a smoothed outline normal baked into vertex color or UV8. Choosing either on a mesh without that bake breaks the line at hard edges. | `_OutlineHullNormalSource` |
| **Authored Vector Direction** | Sources the outline push direction from a texture. While off, the vector UV and vector scale rows below are ignored and Normal Source decides the direction. | `_OutlineVectorEnabled` |
| **Vector UV** | Which UV set the outline direction texture is sampled with. Ignored while Authored Vector Direction is off. | `_OutlineVectorUVMode` |
| **Vector Scale** | Strength of the authored direction vector; negative values flip it. Ignored while Authored Vector Direction is off. | `_OutlineVectorScale` |
| **Depth Bias** | Pulls the whole hull toward or away from the camera to rescue an outline buried inside another part. Pulling too far makes the line float in front of the face. | `_OutlineHullZBias` |
| **Include Shading** | Includes form, cast, and 2D shadows plus the 2D rim in the final outline color. Turn it off to keep one lighting-independent line color. | `_OutlineIncludeFormShadow` |
| **Apply to Hull Outline** | Applies the painted pressure to the Hull outline width. With Pressure Source set to Constant, turning it on changes nothing. | `_OutlineHullPressureApply` |

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
