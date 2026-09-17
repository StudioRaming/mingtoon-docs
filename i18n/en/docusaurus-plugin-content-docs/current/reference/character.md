---
id: character
title: Character Rendering
sidebar_position: 6
---

# Character Rendering

These fields target the face and the character as a whole.

This page is a table for looking up values. If you want the order to turn things on in, see the [Character Rendering guide](/guides/character).

The headings and order follow the inspector's section names and display order exactly.

The fields inside map and mask slots are the same in every slot.

Channel, remap, feather and mask UV are written once in the [Shared Texture Slot UI](/guides/texture-modules).

## Face / Hair Shading {#페이스헤어-셰이딩}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Face Shading Module** | Toggle | - | Off | Enables the face-only shading module |
| **Forward Direction (Object Space)** | Float | Four values | 0, 0, 1, 0 | The direction the face looks, in object space |
| **Remove Default Face Form Shadow** | Float | 0 ~ 1 | 0 | At 1 the form shadow is erased on the face area entirely |
| **Face Border** | Float | -1 ~ 1 | 0 | Form-shadow threshold used only on the face area |
| **Face Softness** | Float | 0.001 ~ 2 | 0.15 | Blur width of the form-shadow terminator on the face area |
| **Use Vertex Paint As Face Area** | Toggle | - | Off | Off by default |
| **Enable Face Area Mask** | Toggle | - | Off | Marks which part of a combined head and body material is the face |
| **Face Area Mask** | Texture | - | None | Defines the face area in base UV |
| **Face Depth Shadow Assist** | Toggle | - | Off | Off by default |
| **Face Casts Real-Time Shadows** | Toggle | - | On | Whether this material's face area casts real-time shadows |
| **Enable Face SDF Shadow** | Toggle | - | Off | Off by default |
| **SDF Coordinates** | Float | - | 1 | Base Texture UV (0) follows existing UV islands |
| **Global Horizontal Scale** | Float | 0.1 ~ 4 | 0.5 | Horizontal scale around the texture center |
| **Global Vertical Scale** | Float | 0.1 ~ 4 | 0.5 | Vertical scale around the texture center |
| **Global Horizontal Position** | Float | -1 ~ 1 | 0 | Moves the scaled SDF horizontally |
| **Global Vertical Position** | Float | -1 ~ 1 | 0 | Moves the scaled SDF vertically |
| **SDF Test Preview** | Toggle | - | Off | Off by default |
| **Preview Channel** | Enum | R / G / B / A / Maximum | Maximum | R=left, G=right, B=up and A=down |
| **Map Format** | Enum | Packed RGBA / Single Channel Mirrored U | Packed RGBA | Packed RGBA (0, default) stores left/right in R/G and up/down in B/A |
| **Single-Channel SDF Map (R/Grayscale, Mirrored Left/Right)** | Texture | - | None | Four-Direction SDF Map (RG Left/Right, BA Up/Down) |
| **Horizontal Influence** | Float | 0 ~ 1 | 1 | Horizontal light response |
| **Vertical Influence** | Float | 0 ~ 1 | 1 | Vertical light response |
| **SDF Shadow Amount** | Float | 0 ~ 1 | 1 | Final SDF dark-region strength |
| **Boundary Offset** | Float | -1 ~ 1 | 0 | Moves when the shadow starts |
| **Boundary Softness** | Float | 0.001 ~ 0.5 | 0.04 | Lit-to-shadow transition width |
| **Enable SDF Applicability Mask** | Toggle | - | Off | Off by default |
| **SDF Applicability Mask (Base UV; Exclude Ears/Back)** | Texture | - | None | Sampled in base UV |
| **Map and Intensity · Mask Intensity** | Float | 0 ~ 1 | 1 | Mask limiting strength |
| **Proxy Shape** | Enum | Sphere / Cylinder / Capsule / Plane | Plane | Plane (3, default) applies one resolved face-forward normal across the whole… |
| **Use Proxy Mesh Normals** | Toggle | - | Off | Transfers smooth normals from the actual proxy Mesh to face vertices |
| **Proxy Center** | Float | Four values | 0, 0, 0, 1 | Object-space center of the actual sphere, cylinder or capsule proxy Mesh |
| **Proxy Radius** | Float | 0.001 ~ 2 | 0.12 | Radius of the actual proxy Mesh |
| **Proxy Edge Softness** | Float | 0 ~ 1 | 0.15 | How far the face area fades out across the selected proxy volume's edge, as a… |
| **Proxy Axis (0 = Auto)** | Float | Four values | 0, 1, 0, 0 | Length direction for Cylinder and Capsule |
| **Proxy Length** | Float | 0.001 ~ 4 | 0.3 | For Cylinder this is the full cylinder height |
| **Mask Channel (RGBA)** | Float | Four values | 0, 1, 0, 0 | Per-channel weights used to read the mask texture |
| **Mask Mapping · Mask Intensity** | Float | 0 ~ 1 | 1 | At 0 the mask texture is ignored and the whole material is treated as face; at 1… |
| **Invert Mask** | Toggle | - | Off | Flips the face area mask black-for-white |
| **Remap Start** | Float | 0 ~ 1 | 0 | Start of the range the mask gray values are re-spread over |
| **Remap End** | Float | 0 ~ 1 | 1 | End of the range the mask gray values are re-spread over |
| **Real ShadowCaster Offset** | Float | -0.05 ~ 0.05 | 0 | Pushes the face area's shadow caster along its normal to adjust how much the… |

## Character Height Gradient {#캐릭터-높이-그라데이션}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Character Height Gradient** | Toggle | - | Off | Enables the gradient that tints the character differently by height - typically… |
| **Low Color** | Color | - | 0.67, 0.5, 0.47, 1 | Color tinting the lower part of the character |
| **High Color** | Color | - | White | Color tinting the upper part of the character |

## Related pages

- [Character Rendering usage guide](/guides/character)
- [Shared Texture Slot UI](/guides/texture-modules) — the channel, remap and UV fields inside map and mask slots
- [Troubleshooting](/troubleshooting)
