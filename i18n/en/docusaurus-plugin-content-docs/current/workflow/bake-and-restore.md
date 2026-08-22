---
id: bake-and-restore
title: Manual Bake and Restore
sidebar_position: 3
---

# Manual Bake and Restore

**After reading this guide,** you can decide when a manual lightweight-shader bake is necessary and safely restore its result.

## First: Most Releases Do Not Need It

:::tip[Use automatic build-time optimization for normal uploads and exports]
[Automatic Build Optimization](/workflow/build-optimization) temporarily optimizes only the required materials immediately before a build, then restores the authoring state after success or failure. Manual Bake creates new Shader, Material, Texture, and Manifest assets and actually replaces Renderer slots.
:::

Manual Bake is needed only in limited situations:

- when the baked Shader and Material must be delivered as standalone assets
- when the optimized result must be compared and approved directly in the Scene
- when baked output must be handed to an external pipeline that cannot use the automatic build hook

Face-normal UV7, outline UV8, and character-height UV4 are **mesh-channel bakes**, separate from the lightweight shader Bake in this guide. → [Mesh UV Bakes](/guides/mesh-bakes)

---

## Before Running

1. Record the original `.mat` files, Animator Controller, and AnimationClips in version control.
2. Confirm conversion, roles, look, and mesh-channel results in stages 1–3 of MingToon Manager.
3. Enable `Preserve Animatable Passes (Safe)` when an Animator or AnimationClip may enable a pass later.
4. For properties changed at runtime by a script but absent from AnimationClips, mark that row `Keep Editable (Runtime Change)`.

:::caution[Code may be removed based on current values]
If layer counts or features such as Alpha Mask, Emission, and Occlusion are currently off and are not found among preserved dependencies, their code is removed from the baked shader. Enabling them later from animation or a script may no longer work.
:::

## Bake

Run `Bake Child MingToon Materials to Lightweight Shaders` in stage 4 of MingToon Manager.

- Generated shaders, baked materials, required textures, and a Manifest are created under `Assets/StudioRaming/MingToonGenerated`.
- Current Renderer slots are replaced with baked materials.
- If the operation is cancelled or an intermediate stage fails, assets and slot changes made by that run are rolled back.
- After completion, check processed materials and optimization counts in the `MingToon bake:` Console summary.

When run on a Prefab instance, Mesh and material-slot changes remain as instance overrides. To write the result to the Prefab asset, use Unity's `Overrides > Apply All` separately.

---

## Restore

### One Baked Material

Select the baked material and choose `Restore to Edit Mode` at the top of the Inspector. It uses the original GUID and Renderer slot recorded in the Manifest.

### Clean Up All Manual Bakes in the Project

Run `Tools > Studio Raming > MingToon > Advanced > Restore And Clean Bake Output`.

The command guarantees this order:

1. Follow the Manifest to restore Renderer slots to original authoring materials.
2. Save restored Scene and Prefab references.
3. Verify again that every recorded slot actually points to its original.
4. Delete generated assets only after restoration has been proven.

If restoration or saving fails, the generated folder is not deleted first. Failed entries remain in the Console for manual inspection.

:::warning[Conversion Restore and Bake Restore Are Different]
`Undo Conversion (Return to Pre-MingToon Materials)` in stage 1 of MingToon Manager returns to materials from the shader before conversion. `Restore And Clean Bake Output` returns from baked materials to the current authoring MingToon materials.
:::

### When the Restore Button Is Disabled

- Confirm that the Bake Manifest remains.
- Confirm that the original authoring material GUID still exists.
- Confirm that the Renderer hierarchy and material-slot layout have not changed since the bake.
- Check the Console for stale manual-bake warnings.

---

## Texture Bake Policy

### LosslessOnly — Default {#losslessonly-기본값}

Does not rewrite texels in source textures. It allows only lossless structural optimizations, such as mathematically identity mask removal and sharing the same texture with the same UV expression.

### ReviewedHighQuality {#reviewedhighquality}

:::caution[Choose Only for Reviewed Static Materials]
Allows surface/normal flattening and general RGBA mask repacking. Pixels may change because of imported-texture readback, color space, mip regeneration, or platform compression.

Animation dependencies and `Keep Editable` conditions are still checked, but you must compare before and after baking on the target platform.
:::

General mask repacking can merge several masks into one shared texture asset, but it does not always reduce shader texture-sample count.

## Keep Editable {#keep-editable}

`Keep Editable (Runtime Change)` is stored per material. AnimationClips are analyzed automatically, so use it mainly for values changed by runtime scripts or accessed by name from an external system.

## Next

[Automatic Build Optimization](/workflow/build-optimization) · [VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo)
