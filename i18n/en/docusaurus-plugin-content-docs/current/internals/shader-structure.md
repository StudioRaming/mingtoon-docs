---
id: shader-structure
title: Shader Structure and Passes
sidebar_position: 1
---

# How the shader draws one frame

> This page is an explanation. To pick a surface mode right now, see the [Basic Settings Guide](/guides/basics).

## In one line

MingToon splits one material into six passes.
The surface mode changes the render state those passes use, all at once.

:::note[The counts here are the numbers declared in the source]
They are not the number of draws that actually go out in one frame.
Baking, feature toggles, the camera and the lights all change it. Check the real count in Frame Debugger.
:::

## What happens

The Built-in shader declares six passes.

| Order | Pass | What it does |
|---|---|---|
| 1 | FORWARD_BASE_BACKFACE | Draws the far side first in two-sided two-pass |
| 2 | FORWARD_BASE | Main light, ambient light, main surface effects |
| 3 | FORWARD_ADD | Additional lights such as point and spot |
| 4 | TRANSPARENT_DEPTH_PREPASS | Writes depth first, without color |
| 5 | OUTLINE_HULL_DIRECT | The Normal Outline drawn by expanding the mesh |
| 6 | SHADOW_CASTER | Light shadows and Built-in camera depth |

URP has a different pass layout. Do not apply this order or count to it.
In URP, outlines and depth effects are wired up as Renderer Features.
See [Supported Environments](/platforms/compatibility) as well.

### Main surface {#2-forward_base}

Most surface effects are calculated in pass 2. Turn on two-sided two-pass and pass 1 takes the far side.

Ordinary transparency does not write depth in the pass that draws color.
When pass 4 lays down depth first without color, the outline does not punch through its own surface.
In exchange it can hide translucent layers behind it, so it is not a switch that solves every sorting problem.

### Shadows and camera depth {#5-shadow_caster}

Three things are separate conditions.
Pass 6 being alive, this surface entering camera depth, and this surface casting a light shadow.

A surface does not enter camera depth just because the pass exists.
Camera depth participation decides whether another material's depth effects read this surface as an occluder.

## What surface mode actually changes {#표면-모드가-실제로-바꾸는-값}

| Surface mode | RenderType | Queue | Blend | ZWrite | Depth prepass |
|---|---|---:|---|---|---|
| Opaque | Opaque | 2000 | One / Zero | On | None |
| Cutout | TransparentCutout | 2450 | One / Zero | On | None |
| Semi-Transparent | Opaque | 2499 | SrcAlpha / OneMinusSrcAlpha | On | None |
| Transparent | Transparent | 3000 | SrcAlpha / OneMinusSrcAlpha | Off | Yes |

Semi-Transparent blends color and still writes depth.
Queue 2499 sits inside the opaque range, so it sorts front to back.
In that order the nearest face needs depth to win.
This is why two-sided hair does not paint its inner strands over the outer ones.

Transparent sorts back to front and does not write depth.
This mode is for a single material that mixes an opaque body, see-through shorts and a skirt.

## Shader keywords {#셰이더-키워드}

Each module's keyword and properties work together.
A keyword being on does not mean the effect is always visible on screen.
The overall effects toggle, the material role, strength, textures and camera depth are conditions too.

### Layer tier keywords {#레이어-티어-키워드}

| Module | Additional tiers |
|---|---|
| Surface Layer | `_MING_STACK_4`, `_MING_STACK_10` |
| Normal Layer | `_MING_NORMAL_2`, `_MING_NORMAL_5` |
| MatCap Layer | `_MING_MATCAP_2`, `_MING_MATCAP_5` |

The tier sets the slot range that gets compiled. The actual layer count is also used for runtime branching.

## What that constrains

- Cutting layers within the same tier leaves the compiled code the same size. It only shrinks when you cross a tier boundary.
- Even with a path that removes triangles in an inactive pass, vertex processing and draw submission are not free.
- The editable shader keeps code around so values can change. Check the actual reduction in the baked shader.
- VRChat fallback follows the `VRCFallback` tag and host policy, and does not reproduce MingToon's effects.

## Related pages

- [Basic Settings Reference](/reference/basics)
- [Modules and Performance Cost](/internals/module-cost)
- [What Baking Removes](/internals/bake-internals)
- [VRChat Compatibility Rules](/internals/vrc-rules)
