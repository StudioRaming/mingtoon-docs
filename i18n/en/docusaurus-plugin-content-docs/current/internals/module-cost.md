---
id: module-cost
title: Modules and Performance Cost
sidebar_position: 2
---

# Modules and Performance Cost

The material cost display estimates **relative cost after upload baking**. Expand its details to distinguish the predicted upload cost from the shader you are currently editing.

## Reading the cost panel {#부하-예상-패널-읽기}

| Display | How to read it |
|---|---|
| Upload cost | 1.0x is a new MingToon material baked in the same way |
| While editing | Estimated cost of the editable shader; it can differ from upload cost |
| Selection average / peak | Average and highest material rating, not the total cost of an avatar |
| Unconditional reads / depth / instructions / draws | Estimated contributors, not GPU profiler measurements |
| Texture count / MB | Estimated texture memory, a separate axis from rendering speed |

:::note[A multiple is not a frame-time ratio]
The model is fitted to specific BRP benchmark profiles. Screen coverage, overlap, lights, GPU and render pipeline change actual cost. A 2x material estimate does not mean the whole avatar or game takes twice as long to render.
:::

## What the estimate considers

The current model separates authoring and predicted baked states and accounts for instructions, unconditional texture reads, register usage and passes. The old sum of fixed feature weights and score thresholds no longer describes this display.

Layer count and execution conditions matter together. Having the maximum number of slots does not mean every slot is sampled on every pixel. Likewise, a zero strength does not prove that code can be removed: animation or runtime controls may need it.

Scene-wide work needed to obtain camera depth is not fully included in the material multiple. Compare the first enabled depth effect in the actual scene.

## Investigating a heavy material

1. Save a reference view with fixed camera, distance and lighting.
2. Read the main contributors and disable unused layers or effects one at a time.
3. Check overdraw when large transparent surfaces overlap. Change to Opaque or Cutout only if the intended look permits it.
4. Compare additional-light reception in scenes with many lights; this also changes lighting.
5. Compare depth effects and outlines while preserving the desired silhouette and shadows. Camera depth can be available in VRChat depending on the camera setup.
6. Measure the actual build under the same conditions. A lower estimated rating alone does not confirm a speed improvement.

## Dynamic HSVG

Color adjustments driven by animation or runtime scripts must remain functional after baking. Check animation analysis and bake exclusions. Constant folding and texture rewriting apply only when their individual safety conditions are met.

## Related pages

- [Automatic build optimization](/workflow/build-optimization)
- [What baking removes](/internals/bake-internals)
- [Shader structure and passes](/internals/shader-structure)
