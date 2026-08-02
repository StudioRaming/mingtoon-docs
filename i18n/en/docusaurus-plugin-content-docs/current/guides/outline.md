---
id: outline
title: Outline
sidebar_position: 9
---

# Outline

**After reading this document** you can set up normal outlines and paint thickness per part to control their width.

This covers the **Outline** group in the inspector — `Normal Outline`. For a complete list, see [Outline Reference](/reference/outline).

:::note[Inner 2D Edge is elsewhere]
`Inner 2D Edge`, which draws lines inside the surface, reads screen depth and therefore lives in the **Depth Effects** group. → [Depth Effects](/guides/depth-effects#내부-2d-경계)
:::

## Normal Outline {#노멀-아웃라인}

This method expands the mesh by flipping it inside-out. It draws in a single additional pass and **works without depth texture**, so it's safe in any environment. It's the only way to hold the silhouette in places like VRChat desktop where depth is unavailable.

### Basic setup {#기본-설정}

1. Enable `Enable Classic Hull`.
2. Choose a `Width Mode`.

| Width Mode | Behavior | Recommended |
|---|---|---|
| `PixelStable` | Screen-pixel based. Thickness stays constant regardless of distance | **For avatars** |
| `WorldSpace` | World-space based. Thins out as you move away | Fixed-camera cinematics |

3. Adjust `Outline Width` and `Outline Color`. (Also available in `Quick Look`)

**This is correct.** A line appears outside the character silhouette.

<!-- SCREENSHOT: Normal outline enabled -->

---

## Vary line width by part {#선-굵기를-부위마다-다르게}

### Choose a pressure source {#압력-소스-고르기}

`Pressure Source` selects which paint channel controls thickness.

| Source | Reads |
|---|---|
| `VertexRed` | Vertex Color R |
| `VertexAlpha` | Vertex Color A |
| `WidthMask` | Width Mask texture |
| `OutlineNormalUV8` | Outline normal baked to UV8. Long faces thick, vertices thin |

:::danger[The line disappeared entirely]
This happens when `VertexRed` is chosen on a **mesh with vertex colors imported as black**. If pressure is 0, width becomes 0. Change the pressure source or check the vertex colors.
:::

`Hull Pressure Contrast` exaggerates thickness difference. **At 0, pressure is completely ignored**; 1 is the original, and higher values make thin areas even thinner.

Use `Apply to Hull Outline` / `Apply to Inner Edge Outline` to decide which outlines receive pressure.

:::caution[`Apply to Inner Edge Outline` works even with Normal Outline off]
This toggle is in the Normal Outline group but continues to affect [Inner 2D Edge](/guides/depth-effects#내부-2d-경계). If enabled on a mesh with black vertex colors, the entire inner edge disappears.
:::

### Paint directly in the scene view {#씬-뷰에서-직접-칠하기}

You can paint thickness by hand.

#### Setup

1. Set `Pressure Source` to **Vertex Alpha** or **Vertex Red**. Otherwise the inspector shows `Pressure Source must be Vertex Alpha or Vertex Red to control thickness via vertex painting.` with a `Switch to Vertex Alpha` button.
2. The renderer using this material must be **under the current selection**. Select the MingToon Manager.
3. Select **only one** material.

:::danger[Don't proceed if a channel conflict warning appears]
If `Pressure Source` is **Vertex Red** and `Normal Source` is **VertexColorTS**, both read the same vertex color. If you paint this way, **the outline direction stored in RGB gets overwritten**, and the depth-effect mask also reads the red channel.

The inspector warns you and offers a `Paint Anyway` button. Before proceeding, do one of these:
- Change `Pressure Source` to **Vertex Alpha**
- Move outline normal to **UV8TS** → [Mesh UV Bake](/guides/mesh-bakes#아웃라인-스무스-노멀-uv8)
:::

#### Painting

Click `Paint Outline Width in Scene View` to bring up a scene-view overlay.

| Control | Action |
|---|---|
| Drag | Paint |
| **Shift** + Drag | Erase |
| `[` `]` | Brush size |
| Esc | Finish |

Adjustable values in the overlay:

| Item | Purpose |
|---|---|
| `Radius` | Brush size |
| `Intensity` | Amount painted per stroke |
| `Falloff` | Softness at brush edge |
| `Paint Through Backfaces` | Also paint vertices on the back face, out of view |

The current channel always displays as `Channel: Vertex Red (Shift = erase)`, and when Vertex Red is used, it also shows `Red is also read by the depth-effect mask.`

When done, click `Finish Outline Painting` or press Esc.

<!-- SCREENSHOT: Scene view outline thickness painting overlay -->

#### Things to know

:::danger[Vertex painting writes directly to the mesh asset on disk]
- **Blocked in Play mode.** Unity won't undo it. Exit Play and restart.
- **Other renderers using the same mesh change too.** The inspector lists which mesh assets are affected. To apply only to this renderer, **first duplicate the mesh and assign it to this renderer** before painting.
:::

:::note[Imported meshes automatically get a copy]
The original FBX is untouched; an editable copy is created and assigned to the renderer.

If Undo restores the original mesh while painting, painting stops (`Undo restored the original mesh of '{mesh}', so the copy you were painting is no longer used.`). Just start again.
:::

See [Troubleshooting](/troubleshooting#씬-뷰에서-아웃라인-두께를-칠할-수-없다) for cases where painting doesn't work.

---

## Lines break at sharp edges {#각진-부분에서-선이-끊길-때}

The `Normal Source` is the cause.

| Source | Condition |
|---|---|
| `MeshNormal` | Mesh normal as-is. Lines separate at hard edges |
| `VertexColorTS` / `UV8TS` | Valid **only when smooth outline normals are baked to vertex color or UV8** |

:::danger[If you choose `VertexColorTS`/`UV8TS` on an unbaked mesh]
Lines actually break **more** at sharp corners. Without baking, use `MeshNormal`.
:::

You can also specify direction as a texture. Enable `Authored Vector Direction` and set `Vector UV` and `Vector Scale`. Negative scale flips direction. When off, these are ignored and `Normal Source` controls direction.

## Lines disappear into other parts

Use `Depth Bias` to pull the entire hull toward the camera. **Pull too much and the lines float in front of the face.**

If unnecessary lines appear inside the body, use `Inner Line Suppression Offset` to push the hull back toward the surface.

## Make outline color follow lighting {#아웃라인-색이-조명을-따라가게}

Enable `Include Shading` to reflect form, cast, and 2D shadows plus 2D rim into the outline color. Disable to keep a uniform color regardless of lighting.

## When overlapping other shaders

Adjust `Stencil Settings` only when coordinating with masks from other shaders. By default, stencil doesn't affect the outline.

`Color Mask` at 0 prevents the outline from writing to the screen at all. The default 15 is full RGBA.

## Next

[lilToon Conversion](/workflow/liltoon-conversion) or [Auto-Optimize on Build](/workflow/build-optimization)
