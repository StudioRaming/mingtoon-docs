---
id: face-sdf
title: Face SDF and Face SDF Studio
sidebar_position: 13
---

# Face SDF and Face SDF Studio

> This page is for anyone turning on **Enable Face SDF Shadow** for the first time.
> It makes face shadows sweep like animation as the light rotates. It takes about 7 minutes.

## What is this

An SDF is an image that pre-draws the order in which face shadows move.
As the light turns sideways, the area next to the nose is covered first, then the rest in order.
The transition is far cleaner than using the face curvature directly.

![A face with SDF off next to one with SDF on, with the light turned sideways](/img/placeholder.png)
<!-- CAPTURE: guides/face-sdf-01-before-after.png | 광원을 왼쪽 45도에 둔 같은 얼굴, SDF 끔(전) / 켬(후) 2컷 | 1200x700 -->

Tell these three apart first.

| Feature | What it does | What it needs |
|---|---|---|
| **Face Shading Module** | Treats the face area with different rules from the body | A face mask or a proxy |
| **Enable Face SDF Shadow** | Controls the order of coverage by light direction | A face SDF map |
| Face SDF Studio | A separate add-on that makes maps | Unreleased. Not needed for this page |

## When to use it

- When you roam VRChat worlds and the lighting direction is unpredictable.
- When you change the lighting direction during a Warudo broadcast.
- When the nose shadow is fine from the front but falls apart from the side.

## Try it in 30 seconds

1. Select the face material and turn on the **Face Shading Module**.
2. Turn on **Enable Face SDF Shadow**.
3. Put your prepared texture into **Face SDF Map**.
4. Set **Boundary Softness** to 0.04.

You succeeded when the shadow sweeps in order as you turn the light left and right.
If nothing changes, go to [Troubleshooting](/troubleshooting#face).

## Where do I get a map

MingToon does not make maps for you. There are three routes.

| Route | Description |
|---|---|
| External production | Draw a front-facing grayscale face map yourself or commission one |
| Existing SDF-only | Bring a single-channel SDF made for another toon shader as it is |
| Face SDF Studio | A separate unreleased add-on. Use the two routes above until it ships |

## SDF map formats {#sdf-맵-형식}

Pick one of two methods in **Map Format**. The default is **Packed RGBA**.

| Format | Channels | Recommended situation |
|---|---|---|
| **Packed RGBA** | R is left, G is right, B is up, A is down | The default method that also uses vertical lighting |
| **Single Channel Mirrored U** | One R channel. The other side flips left and right | When bringing in an existing single-channel SDF |

**Single Channel Mirrored U** does not use the vertical directions.
Pick **Packed RGBA** if you also need vertical lighting changes.

## Connecting your map in the Inspector {#face-sdf-studio-작업-순서}

1. Turn on the **Face Shading Module**.
2. Turn on **Enable Face SDF Shadow**.
3. Pick **Map Format** to match your map.
4. Assign the texture to **Face SDF Map**.
5. Pick **SDF Coordinates**. If you did not prepare a UV7, it is **Base Texture UV (Legacy)**.
6. Adjust **Horizontal Influence** · **Vertical Influence** · **SDF Shadow Amount**.
7. Set **Boundary Offset** and **Boundary Softness** under the actual avatar lighting.

:::caution[The default for SDF Coordinates is Baked Front UV7]
If you did not prepare front projection data along with the map, this value reads the wrong coordinates.
Switch to **Base Texture UV (Legacy)** in that case.
:::

## Checking the four directions

If the map directions are swapped, the shadow moves the wrong way.
Move the light to four directions and check each one.

1. Put the light to the left of the face. The right side must darken first.
2. Put the light to the right of the face. The left side must darken first.
3. Raise the light. Below the chin must darken first.
4. Lower the light. The forehead must darken first.

Turning on **SDF Test Preview** ignores the lighting and shows the map itself in black and white.
**Maximum** in **Test Preview Channel** shows the alignment of all four channels at once.

## Values you will touch often {#자주-만지는-값}

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Boundary Softness** | The width over which light crosses into shadow | Leave at the default (0.04) | Raising it softens, and lowering it too far exposes compression noise |
| **Boundary Offset** | The point at which the shadow starts | Leave at the default (0) | Raising it darkens earlier, and lowering it darkens later |
| **Horizontal Influence** | How much it reacts to left and right lighting | Leave at the default (1) | At 0 the left-right change disappears |
| **Vertical Influence** | How much it reacts to up and down lighting | Leave at the default (1) | It is not used in the single-channel format |
| **SDF Shadow Amount** | The final strength of the dark SDF area | Leave at the default (1) | At 0 the SDF shadow is hidden |
| **Global Horizontal Scale** | The horizontal size of the map | Leave at the default (0.5) | Use it to match the left-right width of the eyes and nose |
| **SDF Mask Intensity** | How far ears and the back of the head are excluded | Leave at the default (1) | At 0 the mask is ignored |

## Common problems

### Left and right move the wrong way

Check the R and G layout of **Packed RGBA**. R is left and G is right.
Also check that **Face Forward (Object Space)** matches the avatar.

### The same face repeats like tiling

The Wrap Mode of the map texture is Repeat.
Change it to Clamp in the import settings.

### I picked UV7 and the coordinates got tangled

Only one thing can use UV7 on the same Renderer.
If the face SDF uses UV7, the face normal bake skips that Renderer.
If old data remains, run **Release Baked Face Normals** in MingToon Manager.

## More detail

- Setting up the face area and proxy first: [Character Rendering](/guides/character#페이스-셰이딩)
- UV7 ownership rules: [Mesh UV Bakes](/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7)
- Choosing a face shadow mode: [Character Rendering](/guides/character#4단계-앞머리-그림자)
- Every item and its range: [Character Rendering Reference](/reference/character)
