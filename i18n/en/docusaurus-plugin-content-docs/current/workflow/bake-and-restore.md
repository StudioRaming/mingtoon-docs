---
id: bake-and-restore
title: Manual Bake and Restore
sidebar_position: 3
---

# Manual Bake and Restore

> This page is for people using a manual Bake for the first time.
> Most people never need to read it. It takes about 5 minutes.

## First: most distributions do not need this

| Situation | What to use |
|---|---|
| VRChat upload | Automatic optimization. Nothing to do |
| WARUDO mod build | Automatic optimization. Nothing to do |
| General Player build | Automatic optimization. Nothing to do |
| Handing over baked shader and material assets as files | Manual Bake |
| Comparing and approving optimization results in the scene | Manual Bake |
| An external pipeline that cannot use the automatic hooks | Manual Bake |

:::tip[The difference in one line]
Automatic optimization changes things only during the build and reverts them. A manual Bake creates new assets and actually changes the Renderer slots.
:::

→ [Automatic Optimization On Build](/workflow/build-optimization)

Face normal UV7, outline UV8 and character height UV4 are mesh channel bakes. They are separate from the shader Bake on this page.
→ [Mesh UV Bakes](/guides/mesh-bakes)

---

## Before you run it

1. Record the original `.mat`, Animator Controllers and AnimationClips in version control.
2. See whether `1. Assign face & skin renderers` and `2. Choose look → Convert` in the `Get Started` tab are done.
3. Check the presets and the mesh channel bake results in the `Look & Bake` tab.
4. Mark values that a runtime script changes with **Keep Editable At Bake** on that row.

AnimationClips are analyzed automatically. You do not have to mark them.

:::danger[Features currently off disappear from the code]
Features that are off at bake time are removed from the code.
Layer counts, Alpha Mask, Emission and Occlusion are among them.
If they are not found as something to preserve, turning them on later will not work.
:::

## Running the Bake {#bake-실행}

Expand **Lightweight Shader Bake (Editor Only)** at the bottom of the `Look & Bake` tab. Press **Bake Child MingToon Materials to Lightweight Shaders** inside it.

![The MingToon Manager's Look & Bake tab showing the lightweight shader bake button and the warning above it](/img/placeholder.png)
<!-- CAPTURE: workflow/bake-and-restore-01-bake-button.png | 밍툰 매니저 「룩·베이크」 탭에서 「경량 셰이더 베이크 (에디터 전용)」 폴드아웃을 펼친 상태. 베이크 버튼과 바로 위 경고 블록이 보이게 | 1200x700 -->

- Shaders, materials, textures and a manifest are created under `Assets/StudioRaming/MingToonGenerated`.
- The Renderer's current slots are changed to the baked materials.
- If you cancel or it fails partway, the assets and slot changes that run created are reverted.
- Check the number of materials processed in the Console's `MingToon bake:` summary.

Run it on a Prefab instance and the changes remain as instance overrides. To apply them to the Prefab asset, use Unity's `Overrides > Apply All` separately.

---

## Restoring

### Reverting one baked material

Select the baked material and press **Restore Editable Material** near the top of the inspector.

It uses the original GUID and Renderer slot recorded in the manifest.

### Cleaning up every manual Bake in the project

Run `StudioRaming > MingToon > Advanced > Restore And Clean Bake Output`.

This command guarantees an order.

1. It follows the manifest and returns Renderer slots to the original editing materials.
2. It saves the restored scene and Prefab references.
3. It re-verifies that every recorded slot points at the real original.
4. It deletes the generated assets only after restoration is proven.

If restoring or saving fails, it does not delete the generated folder. It leaves the failed items in the Console and asks for confirmation.

:::warning[Conversion restore and Bake restore are different]
`Undo Conversion (back to pre-MingToon materials)` returns to the pre-conversion shaders.
`Restore And Clean Bake Output` returns from baked materials to editing MingToon materials.
:::

### When the restore button is disabled

- Check whether the bake manifest is still there.
- Check whether the original editing material's GUID is still alive.
- Check whether the Renderer hierarchy or material slots changed after the Bake.
- Check the Console for stale manual bake warnings.

---

## Texture handling policy

A manual Bake is a preview of the upload. So the texture policy uses the same values as upload.

The only reference is **Reviewed Texture Rewrites On Build (Opt-In)** in the MingToon Manager's `Optimize` tab.

### Lossless only (LosslessOnly) — the default {#losslessonly-기본값}

This is the behavior with the opt-in off. It does not rewrite the pixels of the original textures.

It only permits mathematically identity mask removal and sharing of the same texture with the same UV expression.

### Reviewed high quality (ReviewedHighQuality) {#reviewedhighquality}

This is the behavior with the opt-in on. It permits surface and normal flattening and mask repacking.

:::caution[Turn it on only for reviewed static materials]
Reading, color space, mip regeneration and platform compression can change the pixels.
Compare the results before and after the bake on your target platform yourself.
:::

Mask repacking merges several masks into one texture. It does not always reduce the shader's texture sample count.

## Keep Editable At Bake {#keep-editable}

**Keep Editable At Bake** is a per-material record.

AnimationClips are analyzed automatically, so they do not need marking.

Use it on values that a runtime script changes, or that an external system accesses by name.

To exclude a whole group at once, use **Keep This Group Editable At Bake**.

## Next

[Automatic Optimization On Build](/workflow/build-optimization) · [VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo) · [Troubleshooting](/troubleshooting#bake)
