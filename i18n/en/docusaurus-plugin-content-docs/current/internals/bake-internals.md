---
id: bake-internals
title: What Baking Removes
sidebar_position: 3
---

# What baking erases

> This page is an explanation. To run a bake right now, see [Automatic Optimization On Build](/workflow/build-optimization).

## In one line

Baking finds the parts of a material that will never change again and erases that code.
Anything it judges could still change is kept. That is why some materials optimize less.

## What happens

It goes through three stages.

1. Find **what moves** in this material.
2. Keep only what does not move, and settle the **code shape**.
3. Materials with the same code shape **share one shader**.

Stage 3 is why materials with different textures and colors still use the same shader.
The code shape holds only the surface mode, cull mode, module on/off, layer count, blend mode and whether it is a face.
Numbers and textures are deliberately left out.

### Stage 1 — finding what moves {#1단계--애니메이션-의존성-분석}

MingToon only **reads** animation. It never rewrites clips, controllers or materials.

It scans four places. Material-value curves in animation clips, the controller assigned to the Animator,
controller references held inside components, and object-reference curves that swap the material itself, such as an outfit toggle.

:::caution[This matters most on VRChat avatars]
Look at the controllers in the Avatar Descriptor's Playable Layers.
Those controllers may not be assigned to the Animator.
Their material curves still run after upload, so they always go on the preserve list.
:::

Animating just the R channel of a color leaves the whole color as a moving value.
When several avatars share one material, the results from all of them are combined.

Anything you marked yourself with **Keep This Group Editable At Bake** also stays.
Use it for values you will not animate but will change from a script later.

If the analysis fails, it does not assume "there is no animation".
That material stays editable and one line is written to the Console.

### Stage 2 — what actually disappears

| What disappears | Condition |
|---|---|
| An unused pass | That feature is off and is not animated |
| Fresnel Rim, the 2nd form shadow, all depth effects | Same as above |
| Calculations in a texture module that is off | |
| Calculations in slots beyond the layer count | It only shrinks once a tier boundary is crossed |
| Texture reads for a mask proven to be all white | The result does not change |
| Calculations on fixed numbers | They fold into constants |

### Stage 3 — re-baking textures {#텍스처-최적화}

The default stays **within the range that does not rewrite original pixels**.
It drops one sample when a mask proves to be an identity, or when PBR and AO read the same texture with the same UV.

Turn on `Reviewed Texture Rewrites On Build` and it also flattens surface and normal layers and repacks masks.
That path can genuinely change pixels.

:::danger[Why pixels change]
It re-reads the textures, converts color space, regenerates mips and re-applies platform compression.
Once it is on, compare captures before and after the bake yourself.
:::

On failure it restores exactly that one material.
The restore values are written to disk first, so recovery works even if the editor dies partway.
If even the restore fails, the build stops.

## Why only this material did not optimize {#왜-이-재질만-최적화가-안-됐나}

Check `StudioRaming/MingToonOptimizeReport.txt` and the Console.

| Entry | Meaning |
|---|---|
| `SKIPPED: animation dependency analysis failed` | The analysis failed, so it was left editable |
| `SKIPPED:` followed by a message | That material errored and the build carried on |
| No line at all | It was never in scope |

The last case is usually one of three.
It is outside the scene or prefab scope, it is already baked, or it was never restored from a previous build.

## What that constrains

- The collection scope differs by build type. A player build scans the scene; a Warudo mod build scans only the target prefab.
- Outlines come in only two kinds: expanding the mesh, and reading camera depth. There is no separate runtime for screen-space compositing.
- A baked material's values can no longer be changed. To fix the look, restore it to editable and bake again.

## Related pages

- [Automatic Optimization On Build](/workflow/build-optimization)
- [Manual Bake and Restore](/workflow/bake-and-restore)
- [Modules and Performance Cost](/internals/module-cost)
