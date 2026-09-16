---
id: liltoon-conversion
title: lilToon Material Conversion
sidebar_position: 1
---

# lilToon Material Conversion

:::tip[Do the Actual Work in MingToon Manager]
Manage Face / Skin / Common roles, conversion looks, output paths, source restoration, and the loss report in one place. → [MingToon Manager](/workflow/character-manager#1--변환)
:::

## What Conversion Does and Does Not Do

- Preserves source materials and creates new authoring MingToon materials.
- Moves base color and texture, HSVG, normals, emission, occlusion, PBR, MatCap, 2nd/3rd layers, and masks where equivalents exist.
- Preserves stencil, render queue, Cull, and surface states such as Opaque / Cutout / Fade / Premultiply.
- Enables PBR, Emission, Surface Stack, Outline, and Alpha Mask modules when the source contains actual data for them.
- Records unmatched features as `lossy` or `unsupported` in the loss report.

:::caution[An Identical Look Is Not Guaranteed]
The two shaders use different formulas and feature semantics. Conversion is an interoperability tool that creates a starting point, not a mathematical replica.
:::

## Recover and Convert Missing Shader Materials {#missing-shader}

0.1.8 can convert pink materials whose shader file is missing by reading serialized property names and values. It recognizes stored patterns from NiloToon, lilToon, and Unity Standard families and shows the evidence for that classification in the preview.

When a shader is missing, its hidden defaults and full keyword semantics cannot all be recovered. After conversion, inspect these items in particular:

- Surface Mode, Blend, Alpha Clip, and Cutoff
- Cull, Render Queue, and Stencil
- Whether Emission, PBR, and Outline are enabled
- Mask channels and inversion

## Procedure

1. Keep the Manager on the avatar root, including outfit-only work.
2. In Get Started, assign Face/Skin targets and review slot roles and exclusions.
3. Choose a factory look first; a new selection defaults to Basic Toon.
4. Choose Neutral or another color preset. Choose Keep Existing Values to retain source colors and protected shadow values.
5. If needed, open advanced conversion settings and check output paths, UV4/UV8 ownership and overwrite options.
6. Convert and read success, failure, exclusion and loss results. For already converted materials, use Apply to Current MingToon Materials.
7. Compare with the source in SceneView/GameView and inspect roles, surface states, textures and shadows.

If conversion fails for some materials, their original slots remain while other convertible materials continue. Read failure, exclusion and loss entries and inspect the remaining original slots. If only the look/color stage fails after a valid conversion, the converted values from before that stage are retained and an error is recorded. Some successful materials do not mean the entire operation succeeded.

## Check After Conversion

- Renderers use the new authoring MingToon materials and source assets remain.
- Opaque / Cutout / Transparent and Blend results match.
- Render Queue, Cull, and Stencil are intentional.
- Texture Tiling / Offset, channels, and inversion match.
- Modules are enabled on materials that need PBR, Emission, Outline, or Alpha Mask.
- Face / Skin roles and face proxies are correct.

Reapplication runs **look → color**. Keep Existing Values restores existing colors and protected shadow band strength, boundaries, widths and blending after the look. Protected character-specific values such as surface identity and face proxies are retained; exact source appearance is not guaranteed.

## Restore Sources

`Restore Original Materials` in MingToon Manager returns current slots to their recorded source GUIDs in one Undo step. It does not automatically delete generated conversion materials or mesh-bake assets.

## Next

[MingToon Manager](/workflow/character-manager) · [Automatic Build Optimization](/workflow/build-optimization) · [Troubleshooting](/troubleshooting)
