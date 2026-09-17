---
id: shadow-pattern
title: Shadow Pattern (Screentone)
sidebar_position: 4
---

# Shadow Pattern (Screentone)

> This page is for anyone turning on **Enable Shadow Pattern** for the first time.
> It turns shadows into the halftone dots of a comic screentone. It takes about 4 minutes.

## What is this

It turns shadows into the dense dots of a printed comic.
The deeper the shadow, the larger the dots.
You can also use lines or crosshatching instead of dots.

![A character with the shadow pattern off next to one with it on](/img/placeholder.png)
<!-- CAPTURE: guides/shadow-pattern-01-on-off.png | 같은 캐릭터 상반신, 그림자 패턴 끈 상태(전) / 켠 상태(후) 2컷 | 1200x700 -->

## When to use it

- When you want a black-and-white comic panel look.
- When the shadow area is wide and looks like a flat block.
- When you want a pop-art feel printed over the artwork.

## Try it in 30 seconds

1. Select a converted body material.
2. Turn on **Enable Shadow Pattern**.
3. Lower **Pattern Density** to 40.
4. Set **Pattern Rotation** to 45.

You succeeded when tilted halftone dots appear in the shadow areas.
If nothing changes, go to [Troubleshooting](/troubleshooting#shadow).

## How to turn it on

1. Turn on **Enable Shadow Pattern**. The default is off.
2. Choose **Pattern Target**. **Form** is the form shadow, and **Depth** is the depth shadow.
3. Set the dot size with **Pattern Density**.
4. Check **Pattern Intensity**. At 0, nothing is visible.
5. To use a shape other than dots, turn on **Use Shape Tile**.

:::tip[Rotation looks natural around 45 degrees]
At 0 degrees the grid tends to overlap the screen pixel grid and create moire.
The default of 78 degrees avoids the grid for the same reason.
:::

## Pattern space: stick to the surface or fix to the screen {#패턴-기준}

**Pattern Space** decides what the grid is attached to. The default is **Mesh**.

| Value | Where the grid lives |
|---|---|
| **Mesh** | Stuck to the surface, moving with the character. Raise an arm and the dots follow |
| **Screen** | Fixed to the screen, with the character passing underneath |

**Distance Compensation** and **FOV / Projection Compensation** work in opposite directions in the two spaces.
In Mesh they subtract camera stability, and in Screen they add it.
At 1 in Screen, the size you set up close is kept at a distance.

![The same raised-arm pose in Mesh space and Screen space](/img/placeholder.png)
<!-- CAPTURE: guides/shadow-pattern-02-mesh-vs-screen.png | 팔을 든 같은 포즈, 패턴 기준 Mesh(전) / Screen(후) 2컷 | 1200x700 -->

## Mesh space needs a rest pose anchor

With Mesh space on a Skinned Mesh, the pattern slides over the skin.
You must bake a rest pose anchor so it stays attached during animation.
Baking turns authoring settings into upload settings, and you cannot change the values afterwards.

1. Select MingToon Manager.
2. Press the **Bake Rest Pose Anchor** button the inspector shows.

The baker creates a duplicate mesh holding the rest pose and turns anchor use on.
Renderers rejected because of a conflict with an existing channel are listed separately in the Console.
Screen space needs no anchor.

## Shape tiles {#패턴-모양-타일}

**Use Shape Tile** is off by default.
Left off, a calculated round halftone is used and no texture is read.
Turned on, only the shape inside the cell changes, while the grid and density stay the same.

The five bundled tiles can be assigned directly from inspector buttons.

| Button | Shape |
|---|---|
| **Dots** | Standard halftone |
| **Fine Dots** | Fine halftone |
| **Lines** | Parallel lines |
| **Crosshatch** | Crosshatching |
| **Stipple** | Stipple |

### A tile is a threshold map, not a picture {#타일은-그림이-아니라-임계값-맵입니다}

If you misunderstand this when making your own tile, it will always fail.
Each point of the tile holds the density at which that spot turns to ink.
That is how one tile covers everything from the first dot to full coverage.

If you feed in a dot pattern that is already black-and-white, it does not react to tone.
The same size of dot appears no matter how deep the shadow gets.

There are two import settings when you make your own.

| Setting | Value | Why |
|---|---|---|
| `sRGB (Color Texture)` | Off | sRGB conversion distorts the tone curve |
| `Compression` | Off | Block compression crushes the gradient and creates blotches |

Every brightness step must occupy the same number of dots.
One cell is exactly one repeat of the tile, so the slot has no Tiling/Offset.

## Values you will touch often {#자주-만지는-값}

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Pattern Density** | How many cells fill one mesh unit | 40 | Raising it packs the dots, and lowering it enlarges them |
| **Pattern Rotation** | The angle of the grid | 45 | Around 0 degrees it overlaps the screen grid and creates blotches |
| **Pattern Intensity** | The mix ratio between the original shadow and the pattern | Leave at the default (1) | Lowering it fades the pattern, and 0 hides it |
| **Pattern Edge Softness** | The blur width of the dot edge | Leave at the default (0.14) | Raising it smears the dots, and 0 breaks them into stair steps |
| **Distance Compensation** | Size compensation as the camera moves away | Leave at the default (1) | The direction is opposite in Mesh and Screen |
| **Ink Color** | The color of the lines printed in the Overlay style | Black | It is not used in the Recolor style |
| **Full Shadow Fill** | How much the darkest area is filled with solid color | Leave at the default (1) | Lowering it leaves dots even in the darkest area |

## Common problems

### No pattern is printed at all

An empty **Shape Tile** slot is read as white.
White is a threshold that no density can cross.
The inspector warns you about this and shows the bundled tile buttons alongside.

### I chose Overlay but the ink color does not show

When **Pattern Target** is **Depth**, **Overlay** falls back to **Recolor**.
The pattern is printed, but it uses the shadow color instead of the ink color.
To use the ink color, set the target to **Form** or **Both**.

### The pattern slides over the skin during animation

You are in Mesh space without a rest pose anchor.
Finish the anchor bake procedure above first.

## More detail

- Every item and its range: [Light and Shadow Reference](/reference/light-and-shadow)
- Setting up the shadow itself first: [Light and Shadow](/guides/light-and-shadow)
- Using it with unified shadow: [Unified Shadow](/guides/light-and-shadow#통합-그림자--겹칠-때-새까매지는-문제)
