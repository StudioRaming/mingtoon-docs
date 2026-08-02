---
id: liltoon-conversion
title: lilToon Material Conversion
sidebar_position: 1
---

# lilToon Material Conversion

:::tip[Actual work happens in MingToon Manager]
Face/skin assignment, look preset on convert, mesh channels to bake, source restore — all in one inspector. → [MingToon Manager](/workflow/character-manager#1--변환)

This doc covers **what conversion moves and what it can't**.
:::

**After reading this document** your existing lilToon avatar becomes editable MingToon material, and you know what was lost.

## What conversion does and doesn't

- **Preserves the original.** The new MingToon editable material is created; source stays.
- Moves many base, surface mode, AO, normal, MatCap, layer and mask **values**.

:::caution[Complete look match is not guaranteed]
Different shaders have different math and meaning. Conversion is an **interop tool**, not mathematical reproduction of another shader.
:::

## Procedure

1. Select the **root GameObject** of the avatar or outfit.
2. Run `GameObject > Studio Raming > MingToon > Add MingToon Manager`.
3. **Explicitly assign the Renderer / material slot to use as Face.**
4. Verify conversion output path and options, then convert.
5. **Read all `lossy` / `unsupported` items** in the completion log and compare to source.

<!-- SCREENSHOT: MingToon Manager inspector -->

:::danger[Don't skip step 3]
Auto-detect face is a **fallback only**. Name alone doesn't guarantee complete detection. Wrong face slots cause stabilization to miss meshes or apply to the wrong one.
:::

## After conversion

**This is correct.** Editable MingToon materials appear in the specified output path, Renderers switch to them, and source materials stay.

Read the completion log, then check these on the actual model. Inspector preview sphere can't tell:

- Mask channels and invert
- Texture ST (Tiling / Offset)
- AO
- Surface mode (Opaque / Cutout / Transparent)
- Face slot detection

## Next

Once the look is finalized, go to [Auto-Optimize on Build](/workflow/build-optimization).

## Next

[MingToon Manager](/workflow/character-manager) · [Auto-Optimize on Build](/workflow/build-optimization)
