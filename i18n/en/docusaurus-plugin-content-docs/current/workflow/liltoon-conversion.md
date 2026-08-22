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

0.1.7 can convert pink materials whose shader file is missing by reading serialized property names and values. It recognizes stored patterns from NiloToon, lilToon, and Unity Standard families and shows the evidence for that classification in the preview.

When a shader is missing, its hidden defaults and full keyword semantics cannot all be recovered. After conversion, inspect these items in particular:

- Surface Mode, Blend, Alpha Clip, and Cutoff
- Cull, Render Queue, and Stencil
- Whether Emission, PBR, and Outline are enabled
- Mask channels and inversion

## Procedure

1. Add MingToon Manager to the avatar or clothing root.
2. Check source schemas and excluded slots in the conversion preview.
3. Explicitly assign Face / Skin / Common roles per slot. Auto trusts only direct flags stored in the source.
4. Choose the conversion look preset and output path.
5. Check existing UV4 and UV8 ownership and overwrite options.
6. Run conversion and read every item in the loss report.
7. Compare the actual character with the source in both SceneView and GameView.

Slots with no one-to-one equivalent—such as particles, refraction, fur/shell, audio response, flipbook, overlay, and auxiliary passes—intentionally keep their source materials.

## Check After Conversion

- Renderers use the new authoring MingToon materials and source assets remain.
- Opaque / Cutout / Transparent and Blend results match.
- Render Queue, Cull, and Stencil are intentional.
- Texture Tiling / Offset, channels, and inversion match.
- Modules are enabled on materials that need PBR, Emission, Outline, or Alpha Mask.
- Face / Skin roles and face proxies are correct.

Even after reapplying a look preset, 0.1.7 preserves character-specific values such as Surface identity and the face proxy.

## Restore Sources

`Restore Original Materials` in MingToon Manager returns current slots to their recorded source GUIDs in one Undo step. It does not automatically delete generated conversion materials or mesh-bake assets.

## Next

[MingToon Manager](/workflow/character-manager) · [Automatic Build Optimization](/workflow/build-optimization)
