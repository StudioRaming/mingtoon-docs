---
id: shadow-pattern
title: Shadow Pattern (Screentone)
sidebar_position: 4
---

# Shadow Pattern (Screentone)

**After reading this document** you'll be able to turn shadows into halftone dots like manga screentones and create your own custom-shaped tiles.

This covers `Shadow Pattern (Screentone)` in the `Lighting and Shadows` group. The full list of items is in the [Lighting and Shadows Reference](/reference/light-and-shadow).

## How It Works

Form shadows and 2D shadows are rendered as halftone dots. As the shadow gets deeper, the dots **grow larger** — just like real printed halftones.

The grid is drawn **by calculation alone** and fixed to the screen. So:

- You don't need to add textures.
- There's no preparation step.
- The pattern won't flicker when the camera moves.

This is the state you get by enabling `Enable Shadow Pattern`.

<!-- SCREENSHOT: Shadow pattern on / off comparison -->

:::note[Works together with unified shadows]
The shadow pattern remains intact even when [unified shadows](/guides/light-and-shadow#통합-그림자--겹칠-때-새까매지는-문제) are enabled.
:::

## Runtime Values {#런타임-값}

| Item | Function |
|---|---|
| **Pattern Target** | Form shadow, 2D shadow, or both |
| **Pattern Style** | `Recolor` — redraw the shadow coverage itself. Dots use the shadow color as-is<br />`Overlay` — keep the shadow as-is and layer it with ink color |
| **Pattern Density** | Number of cells filling the screen width. Based on screen **height**, so the same size appears regardless of resolution |
| **Pattern Rotation** | Grid angle |
| **Pattern Edge Softness** | Softness of dot edges |
| **Pattern Strength** | How strongly the pattern is applied. **0 means nothing shows** |
| **Distance Compensation** | Adjust dot size as distance changes |
| **FOV / Projection Compensation** | Compensation when FOV changes |
| **Keep Pattern in Full Shadow** | Whether to retain dots in the darkest areas. Adjust the amount with `Full Shadow Fill` |

:::caution[On the 2D shadow, `Overlay` falls back to `Recolor`]
With `Pattern Style` set to `Overlay` and `Pattern Target` set to `Depth2D`, the pattern still prints, but it takes the shadow colour instead of the `Ink Color`. `Overlay` lays line work over finished shading, and only the form shadow path has that compositing point. It has always worked this way; the inspector now says so when you pick that combination.

To keep `Overlay`, set `Pattern Target` to `Form` or `Both`.
:::

:::tip[Rotation angle]
**Around 45 degrees** looks natural like printed halftones. **0 degrees** often creates moire because it aligns with the screen pixel grid.
:::

## Pattern Space - stuck to the surface, or locked to the screen {#패턴-기준}

`Pattern Space` - **default `Mesh`**

| Value | Where the lattice lives |
|---|---|
| `Mesh` | On the surface, **travelling with the character.** Raise an arm and its dots come along |
| `Screen` | Locked to the viewport, with **the character sliding underneath.** The overprinted screentone / pop-art reading |

The shape tile, the density, and the rotation are the same in both. All that changes is what the lattice is attached to.

On `Screen` the pattern cannot bend or shimmer when the field of view or the camera angle changes. The coordinate is divided by the short axis so cells stay square, which keeps the density the same at any aspect ratio.

### The compensation sliders reverse meaning between the two

`Distance Compensation` and `Projection / FOV Compensation` **work in both.** Their direction is what flips.

- On `Mesh` they **remove** camera stability. At 0 the pattern is welded to the surface; at 1 it compensates size against camera movement.
- On `Screen` they **add** camera stability. At 1, the default, the mark size and density you set up close are what you get from across the room and at any field of view. At 0 the lattice is welded to the pixel grid and nothing the camera does moves it at all.

:::tip[Author up close, check from far away]
`Screen` with `Distance Compensation` at 1 is exactly that combination. Before 0.1.5 these two sliders were locked out on `Screen` and could not be used.
:::

## Shape Tile {#패턴-모양-타일}

`Use Shape Tile` — **off by default**

- **When off**, computed circular dots are used and textures are never read.
- **When on**, only the **shape** drawn inside each cell changes to a tile image. Grid, density, and tone response stay the same.

### Included Tiles

There are 5 types in the `Assets/StudioRaming/MingToon/Textures/Patterns` folder, and you can load them directly with the inspector buttons.

| Button | Shape |
|---|---|
| **Dots** | Standard halftone |
| **Fine Dots** | Fine halftone |
| **Line** | Parallel lines |
| **Crosshatch** | Cross hatching |
| **Stipple** | Stipple |

<!-- SCREENSHOT: Results of each of the 5 tile types -->

:::danger[Empty tile slot means the pattern won't show at all]
An empty slot reads as **white**, and white is a threshold that can't be exceeded at any density. The inspector warns about this and shows the built-in tile buttons together.
:::

### Tiles Are Threshold Maps, Not Images {#타일은-그림이-아니라-임계값-맵입니다}

If you misunderstand this part, you will definitely fail when making your own tiles.

Each texel in the tile contains **the density at which that texel becomes ink**. It's not "a picture of a pattern." So a single tile expresses **everything from the first dot to completely filled** as the shadow deepens.

:::danger[If you put in an already-binarized dot pattern]
You'll get **the same size dots** regardless of shadow depth. It won't respond to tone.
:::

### Import Settings When Making Your Own

| Setting | Value | Reason |
|---|---|---|
| `sRGB (Color Texture)` | **Off** | sRGB conversion distorts the tone curve |
| Compression | **Off** | Block compression squashes gradients and creates artifacts in the pattern |

All brightness levels must occupy **the same number of texels**. This way, when dots become smaller than the sampling limit, they converge back to the original density.

### Why There's No Tiling / Offset

One cell is exactly one repetition of the tile. Therefore, density is controlled by `Pattern Density` and direction by `Pattern Rotation`. This is why the slot has no Tiling/Offset.

## Next

[Rim](/guides/rim)
