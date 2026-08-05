---
id: face-sdf
title: Face SDF and Face SDF Studio
sidebar_position: 13
---

# Face SDF and Face SDF Studio

**After reading this document**, you will understand the difference between Face Shading and face SDF, and create directional face shadows in the included Face SDF Studio for use on materials.

## Distinguish These First

| Feature | What it does | Required data |
|---|---|---|
| **Face Shading** | Handles face normals, form-shadow boundaries, and cast behavior differently from the body | Face-area mask or proxy |
| **Face SDF** | Controls the order in which the nose, cheeks, and eye sockets are covered according to light direction | Face SDF map, optionally front-view UV7 |
| **Face SDF Studio** | Layer editing, preview, UV7 projection, and final SDF baking | Editor-only tool |

Face Shading works without an SDF. First clean up the face with [Face Shading](/guides/character#페이스-셰이딩), then add an SDF when you need animated-like shadow transitions as the light moves.

:::note[Studio is included in 0.1.4]
No separate package is required. Open it from `Tools > Studio Raming > Face SDF Studio > Open`. Studio is Editor-only; the final result consists of a texture and an optional duplicate Mesh, so no runtime scripts are added.
:::

## SDF Map Formats {#sdf-맵-형식}

Choose one of two formats in `SDF Map Format`.

| Format | Channels | Recommended use |
|---|---|---|
| **Packed RGBA** | R=left, G=right, B=up, A=down | MingToon's default format for four-direction lighting |
| **Single Channel Mirrored U** | One R channel; horizontal light from the opposite side mirrors U | Quickly importing an existing single-channel SDF |

Single Channel does not use vertical-light influence. Use Packed RGBA when you need changes from up/down lighting.

### Choose Coordinates

- `Base Texture UV (Legacy)` — Reads the existing UV0 as-is.
- `Baked Front UV7` — Projects the Scene front view into UV7. Recommended when the face mesh is split into multiple UV islands or when a stable front reference is needed in VRChat or Warudo.

:::caution[UV7 cannot be owned by both features]
The face front-view normal bake and Face SDF front projection use the same UV7. If you bake UV7 in Face SDF Studio, disable the Manager's automatic `Face Front-View Normal (UV7)` bake. → [Mesh UV Bake](/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7)
:::

## Face SDF Studio Workflow {#face-sdf-studio-작업-순서}

### 1. Preparation · Front UV7

1. Open `Tools > Studio Raming > Face SDF Studio > Open`.
2. Select the face Renderer and material slot.
3. Use the saved authoring profile when it matches automatically; use `Create New Profile (Optional)` only when new settings are actually needed.
4. In MingToon, select `MingToon Directional RGBA4` or the required single-channel format.
5. When using `Baked Front UV7`, if the source Mesh has no UV7, align the Scene view to the face front, then bake and apply a duplicate Mesh from the UV7 bake card.

:::tip[The front view becomes the coordinate system]
The Scene view camera direction is the UV7 projection reference. Do not bake with the chin raised or head turned; align the eye and nose centerline with the screen center.
:::

### 2. Create · Preview · Bake the SDF

Combine base shading and per-part layers into one texture.

| Layer | Role | Notes |
|---|---|---|
| **Base** | Overall face-light transition | Always used |
| **Nose** | Bridge and nostrils | Optional |
| **Cheek** | Cheeks and cheekbones | Automatically mirrored from screen-right |
| **Lip** | Around the lips | Optional |
| **Eye Socket** | Eye sockets | Automatically mirrored from screen-right |

Use `Include` on each card to decide whether Nose, Cheek, Lip, and Eye Socket are composited into the final result. Changes to texture, size, position, flip, softness, and intensity are immediately reflected in the temporary material with `Auto Refresh` enabled.

All layers and the final `SDF Size (Center Based)` and `SDF Position (Center Based)` use a center pivot. Adjust size first, then align the eye and nose centerlines with small position values.

### 3. Preview All Directions

Click `Start Temporary Preview`, then move the two lighting sliders.

- Left/right: -180° to 180°
- Up/down: -178° to 178°
- `Ming Threshold Offset` — The overall light-to-shadow transition point, not the map position
- `Boundary Softness` — Width of the transition from light to shadow

:::tip[If the whole face changes at once]
Raise `Boundary Softness` before moving the map. Change size or position only when the transition point is misaligned with the actual face center.
:::

Preview does not save the original material slot. The original slot is restored when preview stops, the window closes, scripts reload, or Play Mode changes.

### 4. Output and Apply

- `Bake Texture` — Creates only a PNG.
- `Confirm and Apply to Target Material` — Creates a PNG and assigns it to the current face material.

Applying also sets the SDF map and coordinates, Face Shading/SDF toggles, boundary, softness, and shadow amount. Material changes can be undone with Unity Undo, but generated PNGs remain.

## Final Inspector Adjustments

1. Enable `Face Shading`.
2. Enable `Use SDF Face Shadow`.
3. Confirm that `Face SDF Map` is not empty.
4. Confirm that `SDF Map Format` and `Face Map Coordinates` match the authoring choices.
5. Adjust `Boundary Offset`, `Boundary Softness`, and `SDF Shadow Amount` under the actual avatar lighting.

When `Face SDF Map` is empty, the Inspector shows a warning and an Open Face SDF Studio button.

## Troubleshooting

### Base Pass disappears when Face Shading is enabled

0.1.4 automatically restores BRP `ForwardBase` and URP `UniversalForwardOnly` for older materials. If it still disappears:

1. Disable MingToon Inspector's development option `Advanced Diagnostics: Force Compile All Editor Features (Optional)`. It is off by default.
2. Select the material again to run keyword and base-pass migration.
3. Check shader compilation errors in the Console.

This diagnostic option fixes maximum features in one variant and can exceed D3D11's 64 texture-resource limit per stage. Do not enable it for normal authoring.

### Left and right move in reverse

Check the Packed RGBA R/G channel layout and the face front direction. Single Channel automatically mirrors U for light from the opposite side; do not mirror the source map itself.

### White zigzags appear on the face boundary

0.1.4 limits the screen-derivative width of form-shadow boundaries. Confirm that no older MingToon shader or bake component remains, switch the material back to the 0.1.4 authoring shader, and bake again.

## Decide Whether to Use SDF

| Situation | Decision |
|---|---|
| Fixed lighting presentation | Face Shading alone may be enough |
| Avatar moving through a VRChat world | Highly useful because lighting is unpredictable |
| Warudo broadcast | Highly useful when changing light direction |
| Limited authoring time | You can skip it; the rest of the face processing still works normally |

## Related Documents

- [Character Expression — Face Shading](/guides/character#페이스-셰이딩)
- [Mesh UV Bake — Face Front-View Normal](/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7)
- [Light and Shadow — Grazing shadow on face](/guides/light-and-shadow#얼굴의-스치는-그림자)
