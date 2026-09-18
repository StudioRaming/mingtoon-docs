---
id: outline
title: Outline
sidebar_position: 9
---

# Outline

> This page is for people turning on the **normal outline** for the first time.
> It draws a comic-style contour outside the character silhouette. It takes about 3 minutes.

## What is this

It draws one more slightly inflated shell of the mesh, leaving a line on the silhouette.

It does not read the depth texture, so it draws on a normal VRChat screen too.

## When to use it

- When you want the avatar to read as sharp and cartoon-like
- When the character silhouette gets lost against a bright background

## Turn it on in 30 seconds

1. Pick one converted material.
2. Turn on **Enable Normal Outline**.
3. Leave **Outline Width** at 1.
4. Change **Outline Color** to something darker than the base.

If you see a line outside the silhouette, it worked.

If there is no line at all, go to [outline troubleshooting](/troubleshooting#outline).

![The character's upper body side by side with the normal outline off and on](/img/placeholder.png)
<!-- CAPTURE: guides/outline-01-before-after.png | 같은 캐릭터 상반신 2컷 — 왼쪽 노멀 아웃라인 사용 꺼짐, 오른쪽 켜짐에 폭 1 | 1200x700 -->

## Normal Outline {#노멀-아웃라인}

### Basic setup {#기본-설정}

1. Turn on **Enable Normal Outline**.
2. Choose a **Width Mode**.
3. Set **Outline Width** and **Outline Color**.

**Width Mode** defaults to `WorldSpace`, and the line thins out with distance.

`PixelStable` works in screen pixels, so the thickness stays the same at any distance.

`PixelStable` is the safe choice for avatars.

:::caution[URP needs the Renderer Feature]
A URP project needs the feature on every renderer in the active URP asset.
Without it every value still edits, but not a single pixel of line is drawn.
`StudioRaming > MingToon > URP > Install Outline Renderer Feature`
:::

**Outline Master** is the shared switch for the normal outline and Inner Depth Edge.

If it is off, neither tab draws.

## Values you will touch often

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Outline Width** | The thickness of the line | Leave at default (1) | Raise it and it thickens; at 0 it disappears |
| **Outline Color** | The color of the line | Darker than the base | The closer to black, the stronger the cartoon look |
| **Outline Tint Strength** | How much the color blend mode takes effect | Leave at default (1) | Lower it to 0 and the blended color has no influence |
| **Pressure Contrast** | The size of the per-area thickness difference | Leave at default (2) | Raise it and thin areas get thinner; at 0 pressure is ignored |
| **Far-Distance Minimum Pixels** | The minimum thickness the line keeps at a distance | Leave at default (0.95) | Raise it and the line survives at a distance; at 0 it looks broken up |
| **Depth Bias** | How far the whole line is pushed forward or back | 0 | Raise it and buried lines emerge; raise it too far and it floats in front of the face |
| **Protect Outline From DOF** | Keeps depth-of-field blur from erasing the line | Leave at default (on) | Turn it off and the line smears away in worlds with depth of field on |

Every field and its range is in the [Outline reference](/reference/outline).

**Protect Outline From DOF** behaves the same on BRP and URP.

The only place the backends differ is whether the Renderer Feature above is installed.

## A different line thickness per area {#선-굵기를-부위마다-다르게}

### Choosing a pressure source {#압력-소스-고르기}

**Pressure Source** sets which channel controls the thickness. The default is `Constant`.

| Value | What it reads |
|---|---|
| `Constant` | Reads nothing and uses the width as-is |
| `VertexAlpha` | Vertex color A |
| `VertexRed` | Vertex color R |
| `WidthMask` | The width mask texture |
| `OutlineNormalUV8` | The value baked into UV8. Long faces get thicker, corners get thinner |

Which lines the pressure applies to is set separately by **Apply to Normal Outline** and
**Apply to Inner Outline**.

:::caution[Apply to Inner Outline works even with the normal outline off]
This toggle sits in the normal outline group but keeps acting on Inner Depth Edge.
Leave it on for a mesh with black vertex colors and the inner lines vanish completely.
:::

### Painting directly in the Scene view {#씬-뷰에서-직접-칠하기}

1. Set **Pressure Source** to `VertexAlpha` or `VertexRed`.
2. Put the renderer that uses this material under your selection. Picking the MingToon Manager works.
3. Select only one material.
4. Press **Paint Outline Width in Scene View**.

Drag to paint, and hold Shift while dragging to erase.

Change the brush size with `[` and `]`, and finish with Esc.

Adjust **Radius**, **Strength**, **Falloff** and **Paint Through Backfaces** in the overlay.

![The outline width painting overlay in the Scene view over a painted mesh](/img/placeholder.png)
<!-- CAPTURE: guides/outline-02-vertex-paint.png | 씬 뷰 아웃라인 두께 페인팅 오버레이 + 반경/강도/감쇠 행 + 칠한 자리의 굵기 차이 | 1200x700 -->

:::danger[Vertex painting writes the mesh asset straight to disk]
It is blocked in Play mode, because Unity will not undo it for you.
Other renderers using the same mesh change as well.
:::

To affect only this renderer, duplicate the mesh, assign it, and then paint.

If **Pressure Source** is `VertexRed` and **Normal Source** is `VertexColorTS`,
the two read the same channel. Change the pressure source to `VertexAlpha`.

## When the line breaks at sharp corners {#각진-부분에서-선이-끊길-때}

The cause is **Normal Source**. The default is `MeshNormal`.

`VertexColorTS` and `UV8TS` are only correct when smoothed values were baked in advance.

Choosing `UV8TS` on an unbaked mesh makes the line break up even more.

How to bake UV8 is in [Mesh UV Bakes](/guides/mesh-bakes#아웃라인-스무스-노멀-uv8).

### When the line leaves the shape on hair and skirts {#헤어스커트에서-선이-형태를-벗어날-때}

A model with normals transferred from a sphere or cylinder has shading normals that differ from its shape.

Turn on **Compute For Edited-Normal Models** when you bake UV8.
→ [Models with edited normals](/guides/mesh-bakes#노멀을-편집한-모델용으로-계산)

You can also give the direction with a texture directly.

Turn on **Authored Vector Direction** and set **Vector UV** and **Vector Scale**.

If stray lines appear inside the body, raise **Inner Line Suppression Offset**.

## Making the outline color follow the lighting {#아웃라인-색이-조명을-따라가게}

Turn on **Apply Lighting** and form shadow, rim and front light apply to the line as well.

It leaves the impression of a thick line darkening with the light.

Turn it off and the line keeps a uniform color independent of lighting.

**Front Light Color** and **Front Light Strength** let you give the lit side its own color.

If **Front Light Strength** is 0, the front light color has no effect.

To print screentone on the line too, turn on **Outline Shadow Pattern**.

In VRC Light Volume worlds the line brightness follows the volume level.
BRP reads the volume once per vertex and passes only that scalar to the fragment, so it adds no per-pixel volume sample.

## More detail

- [Outline reference](/reference/outline) — every field and range
- [Mesh UV Bakes](/guides/mesh-bakes) — baking UV8 smooth normals
- [Outline troubleshooting](/troubleshooting#outline) — when the line does not show or breaks
