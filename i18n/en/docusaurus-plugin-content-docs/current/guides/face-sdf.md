---
id: face-sdf
title: Face SDF and Face SDF Studio
sidebar_position: 13
---

# Face SDF and Face SDF Studio

**After reading this guide,** you will understand the difference between Face Shading and face SDF and connect a prepared SDF map directly in the Inspector to tune directional face shadows.

## Distinguish These First

| Feature | What it does | Required data |
|---|---|---|
| **Face Shading** | Handles face normals, form-shadow boundaries, and cast behavior differently from the body | Face-area mask or proxy |
| **Face SDF** | Controls the order in which the nose, cheeks, and eye sockets are covered according to light direction | Face SDF map, optionally front-view UV7 |
| **Face SDF Studio** | Separate add-on for layer editing, preview, UV7 projection, and final SDF baking | Unreleased; not required |

Face Shading works without an SDF. First clean up the face with [Face Shading](/guides/character#페이스-셰이딩), then add an SDF when you need animated-like shadow transitions as the light moves.

:::note[Face SDF Studio is a separate unreleased add-on]
Face SDF Studio is a separate product outside the public MingToon package and is not required for the workflow in this guide. Assign a prepared SDF texture directly in the MingToon Inspector. The guide does not depend on installing Studio, its menus, or integration buttons.

For the other separately sold integrations, see [Mask Maker Integration](/guides/mask-maker) and [Ming Light Controller Integration](/guides/ming-light-controller).
:::

## SDF Map Formats {#sdf-맵-형식}

Choose one of two formats in `SDF Map Format`.

| Format | Channels | Recommended use |
|---|---|---|
| **Packed RGBA** | R=left, G=right, B=up, A=down | MingToon's default format for four-direction lighting |
| **Single Channel Mirrored U** | One R channel; horizontal light from the opposite side mirrors U | Quickly importing an existing single-channel SDF |

Single Channel does not use vertical-light influence. Use Packed RGBA when you need changes from up/down lighting.

### Verify the bake output

Packed RGBA stores four directions in one texture: **R=left · G=right · B=up · A=down**. `Single Channel Mirrored U` reads only R and mirrors U for the opposite horizontal light, so it does not use vertical channels.

With `Baked Front UV7`, the front-view projection is written to the mesh's UV7 (TEXCOORD6). That UV7 is owned by Face SDF on the Renderer, so do not use the same UV7 for a face-normal bake at the same time. Confirm that the Inspector's format and coordinate selections match the values used to prepare the map, then move the horizontal and vertical lighting controls separately to check that the four directions are not swapped.

### Choose Coordinates

- `Base Texture UV (Legacy)` — Reads the existing UV0 as-is.
- `Baked Front UV7` — Projects the Scene front view into UV7. Recommended when the face mesh is split into multiple UV islands or when a stable front reference is needed in VRChat or Warudo.

:::caution[UV7 has only one owner]
Face normals are Live while editing and are automatically baked only into the VRChat upload copy. When Face SDF uses `Baked Front UV7`, SDF owns UV7 and the upload face-normal bake skips that Renderer.

Selecting `Baked Front UV7` on a material that still contains legacy tangent normals in UV7 reads the wrong coordinates. Select `Base Texture UV (Legacy)` instead, or choose `Baked Front UV7` only when the material already has the matching front-projection UV7 payload. If needed, run `Return Face Normals to Live` in MingToon Manager. → [Mesh UV Bake](/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7)
:::

## Connect a Prepared Map in the Inspector {#face-sdf-studio-작업-순서}

You can use a prepared map directly without Face SDF Studio.

1. Enable `Face Shading`.
2. Enable `Use SDF Face Shadow`.
3. Choose `Packed RGBA` or `Single Channel Mirrored U` in `SDF Map Format`.
4. Assign the prepared texture to `Face SDF Map`. Packed RGBA uses RG for left/right and BA for up/down; Single Channel mirrors R for left/right.
5. In `SDF Coordinates`, choose `Base Texture UV (Legacy)`. Select `Baked Front UV7` only when the matching front-projection UV7 payload already exists with the map.
6. Adjust `Horizontal Influence`, `Vertical Influence`, and `SDF Shadow Amount`. Single Channel does not use vertical influence.
7. Adjust `Boundary Offset` and `Boundary Softness` under the actual avatar lighting.
8. Move the horizontal and vertical lighting controls separately and confirm that the four directions are not swapped.

:::tip[Match coordinates to the prepared map]
Inspector `Baked Front UV7` reads an existing UV7 payload prepared with the map; it is not a bake button. If no matching front-projection data exists, use `Base Texture UV (Legacy)`.
:::

:::caution[If the map is empty]
Assign a prepared map or disable `Use SDF Face Shadow`. The gray default does not produce a directional shadow effect.
:::

## Troubleshooting

### Base Pass disappears when Face Shading is enabled

Release builds do not expose internal compilation-diagnostic toggles. Check in this order:

1. Resolve shader and C# compilation errors in the Console.
2. Select the material again to run schema and keyword synchronization.
3. If it is a baked material, restore the authoring material in MingToon Manager and bake again.
4. If it still disappears, submit the error log together with the Unity version and graphics API.

Maintainer variant dumps and technical diagnostics are available only in `MINGTOON_DEV` development builds.

### Left and right move in reverse

Check the Packed RGBA R/G channel layout and the face front direction. Single Channel automatically mirrors U for light from the opposite side; do not mirror the source map itself.

### White zigzags appear on the face boundary

If the form-shadow boundary breaks up, confirm that no older MingToon shader or stale baked copy remains. Return the material to the current authoring shader, then recheck the prepared Face SDF map and coordinates so the latest boundary correction can apply.

## Decide Whether to Use SDF

| Situation | Decision |
|---|---|
| Fixed lighting presentation | Face Shading alone may be enough |
| Avatar moving through a VRChat world | Highly useful because lighting is unpredictable |
| Warudo broadcast | Highly useful when changing light direction |
| Limited authoring time | You can skip it; the rest of the face processing still works normally |

## Related Documents

- [Character Expression — Face Shading](/guides/character#페이스-셰이딩)
- [Mesh UV Bake — Live Face Normals and UV7 Ownership](/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7)
- [Light and Shadow — Face Shadow Adjustment](/guides/light-and-shadow#얼굴의-스치는-그림자)
