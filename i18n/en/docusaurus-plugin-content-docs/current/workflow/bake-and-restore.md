---
id: bake-and-restore
title: Manual Bake and Restore
sidebar_position: 3
---

# Manual Bake and Restore

**After reading this document** you can determine when manual Bake is needed, safely perform it, and restore it to an editable state.

## First: Most cases don't need it

:::tip[For typical uploads and deployments, automatic optimization on build is sufficient]
[Automatic optimization on build](/workflow/build-optimization) changes shaders only during the build and restores them when done. Materials and Renderers remain unchanged.

Manual Bake **creates new materials and replaces Renderer slots.** You'll need to manually restore them if you want to continue working.
:::

Cases where manual Bake is used:

- When you need to hand over the baked results themselves as an asset
- When you need to reduce more aggressively than automatic optimization and verify the results visually while working
- When there's a deployment requirement for materials with no scripts at all

---

## Procedure {#절차}

1. Check the conversion/editing results in the MingToon Manager component inspector.
2. If animation or runtime material changes are needed, enable **Preserve Animatable Passes (Safe)**. Static avatars can be reduced more aggressively.
3. Run Bake.
4. Generated shaders, baked materials, and a manifest are created under `Assets/StudioRaming/MingToonGenerated`, and Renderer slots are replaced with baked materials.

<!-- SCREENSHOT: Bake area in MingToon Manager inspector -->

:::danger[Backup before Bake]
Put the original `.mat` files and animations into version control or copy them separately. If the manifest is lost or the Renderer/slot configuration changes, automatic restoration becomes impossible.
:::

## Restore

When you select a baked material, you can use the **restore button at the top** of the inspector to reconnect the recorded original editable material.

:::caution[If the restore button is inactive]
Check the following:

- Is the bake manifest still present?
- Is the GUID of the original editable material still valid?
- Has the Renderer hierarchy or material slot configuration changed since Bake?
:::

---

## What gets optimized away

The bake generator can compile-time exclude the following features that aren't actually used from the baked shader.

- Fresnel Rim
- 2nd Form Shadow
- Depth Effects
- 2D Rim
- 2D Shadow

In addition to `AnimationClip`, it checks Animator Controller references in nested/array serialization fields of components, and **preserves only the modules needed for properties that are actually animated**.

For outlines, only directly rendered Hull and Inner Edge reading camera depth are supported; no separate runtime for screen composition is used.

---

## Texture Bake Policy

### LosslessOnly (default) {#losslessonly-기본값}

**Does not rewrite** the texel of the original texture. Only applies lossless structural optimization.

- When depth mask is mathematically proven to be identity
- When PBR/AO use the same Texture object and same UV formula

### ReviewedHighQuality {#reviewedhighquality}

:::caution[Only explicitly select for reviewed static materials]
Allows surface/normal flatten and general RGBA mask repack. Therefore, **pixels may differ** due to imported texture readback, color space, mip regeneration, and platform compression.

Animation dependency and `Keep Editable` conditions are still checked, but **you must directly compare animated results and target platform mip/compression look via pre- and post-bake captures.**
:::

General mask repack merges mask slots into shared texture assets, but **does not reduce the number of shader samples.**

---

## Keep Editable {#keep-editable}

You can mark specific properties per material to exclude them from optimization targets. Use this for values not animated but potentially changed by script later.

## Next

[VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo) upload checklist
