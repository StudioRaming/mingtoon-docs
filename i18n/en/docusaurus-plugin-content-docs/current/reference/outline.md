---
id: outline
title: Outline
sidebar_position: 7
---

# Outline

These fields draw a contour by expanding the mesh. They do not use camera depth.

This page is a table for looking up values. If you want the order to turn things on in, see the [Outline guide](/guides/outline).

The headings and order follow the inspector's section names and display order exactly.

The fields inside map and mask slots are the same in every slot.

Channel, remap, feather and mask UV are written once in the [Shared Texture Slot UI](/guides/texture-modules).

## Normal Outline {#노멀-아웃라인}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Normal Outline** | Toggle | - | On | Draws the line by expanding the mesh along its normals, in one additional pass |
| **Outline Color** | Color | - | 0.75, 0.6, 0.6, 1 | Color of the Normal Outline |
| **Outline Color Blend** | Enum | Normal / Multiply | Multiply | How the outline tint is combined with its base color |
| **Outline Tint Strength** | Float | 0 ~ 1 | 1 | Tint strength for the selected blend mode on the outline base color |
| **Follow Base Map** | Toggle | - | Off | Uses the RGB from the base map and all texture layers composited together as the… |
| **Follow Alpha** | Toggle | - | On | On, the outline uses the source surface alpha |
| **Outline Width** | Float | 0 ~ 10 | 1 | Outline width |
| **Switch to vertex color alpha (VertexAlpha)** | Enum | Constant / VertexAlpha / VertexRed / WidthMask / OutlineNormalUV8 | Constant | Which painted channel modulates line width |
| **Apply to Normal Outline** | Toggle | - | On | Applies the painted pressure to the Normal Outline width |
| **Apply to Inner Outline** | Toggle | - | Off | Also applies the painted pressure to the Inner Depth Edge width |
| **Pressure Contrast** | Float | -4 ~ 4 | 2 | Raises the pressure value to a power, widening the difference in line weight |
| **Inner Line Suppression Offset** | Float | 0 ~ 1 | 0.004 | Higher values move only the outline raster-depth criterion away from the camera |
| **Protect Outline From DOF** | Toggle | - | On | Makes the outline write depth so depth-of-field blur cannot erase the line |
| **Far-Distance Minimum Pixels** | Float | 0 ~ 4 | 0.95 | Keeps the outline from thinning below this many screen pixels at distance |
| **Width Mode** | Enum | PixelStable / WorldSpace | WorldSpace | PixelStable keeps the line a constant thickness on screen regardless of… |
| **Normal Source** | Enum | MeshNormal / VertexColorTS / UV8TS | MeshNormal | Which direction the outline is pushed along |
| **Authored Vector Direction** | Toggle | - | Off | Sources the outline push direction from a texture |
| **Vector Scale** | Float | -10 ~ 10 | 1 | Strength of the authored direction vector; negative values flip it |
| **Depth Bias** | Float | -0.1 ~ 0.1 | 0 | Pulls the whole Normal Outline toward or away from the camera to rescue an… |
| **Apply Lighting** | Toggle | - | On | Applies form shadow, rim, and front light to the outline |
| **Front Light Color** | Color | - | White | Color mixed into the front light when Apply Lighting is on |
| **Front Light Strength** | Float | 0 ~ 1 | 0 | How much front light color is mixed using saturate(N·L), the clamped dot product… |

## Related pages

- [Outline usage guide](/guides/outline)
- [Shared Texture Slot UI](/guides/texture-modules) — the channel, remap and UV fields inside map and mask slots
- [Troubleshooting](/troubleshooting)
