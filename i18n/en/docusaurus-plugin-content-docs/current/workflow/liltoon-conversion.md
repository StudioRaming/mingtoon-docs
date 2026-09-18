---
id: liltoon-conversion
title: lilToon Material Conversion
sidebar_position: 2
---

# lilToon Material Conversion

> This page is for anyone moving a lilToon avatar to MingToon.
> It covers what conversion carries over, what it cannot, and what to check afterwards. It takes about 15 minutes.

## What is this

Conversion reads the source material and creates a new MingToon authoring material.
The source material file is not deleted and stays as it is.
Only the Renderer slots switch to the new material.

What conversion carries over:

- Base color and textures, HSVG, normals, emission, occlusion, PBR, MatCap
- 2nd and 3rd layers and their masks
- Reflection settings, lilToon backlight, Edge Rim and face-only data
- Render states such as stencil, render queue, visible faces, and surface mode

If the source holds real data, the PBR, emission, outline, and alpha mask modules are turned on too.
Features that cannot be carried over are recorded in the loss report as `lossy` or `unsupported`.

:::caution[The look will not become identical]
The two shaders differ in their formulas and in what their features mean.
Conversion is a tool that creates a starting point, not a cloning tool.
:::

## When to use it

- When moving a whole avatar made with lilToon
- When reviving an avatar that turned pink because the shader files are missing
- When moving only some materials first to compare the result

## Try it in 30 seconds

1. Select the MingToon Manager on the avatar root.
2. Find **2. Choose look → Convert** on the **Get Started** tab.
3. Press **Convert Child Materials to MingToon**.

You succeeded when the result line shows a converted slot count.
If it is 0, see [Slots that are not converted](/workflow/character-manager#변환되지-않는-슬롯).

## How to turn it on

1. Attach Manager to the avatar root. Keep it on the root even when moving only an outfit.
2. Assign the face and bare skin meshes in **1. Assign face & skin renderers**.
3. Pick **Look Preset On Convert** in **2. Choose look → Convert**.
4. Pick **Color Preset** in the same place.
5. Pick **Keep Existing Values** under color to keep the source colors.
6. Press **Convert Child Materials to MingToon** on the same card.
7. Read the succeeded, excluded, failed, and loss items in the result.

If you already have MingToon materials, use **Apply to Current MingToon Materials**.

![A lilToon avatar before conversion next to the MingToon avatar after conversion](/img/placeholder.png)
<!-- CAPTURE: workflow/liltoon-conversion-01-before-after.png | 같은 아바타 전신을 변환 전 lilToon과 변환 후 MingToon으로 나란히 렌더한 2분할 | 1200x700 -->

:::note[The order is convert → look → color]
Convert the source first, apply the look preset, then apply the color preset last.
Source reflection, backlight, Edge Rim and face data are preserved in the source reapply step.
**Keep Existing Values** applies no color preset and keeps the source colors.
:::

If some materials fail, the rest are still processed.
Do not read the presence of successful materials as overall success.
Failed slots keep their source materials attached.

## Recovery conversion for Missing Shader materials {#missing-shader}

You can also convert materials that turned pink because the shader file is missing.
It reads the stored property names and values to identify the NiloToon, lilToon, or Unity Standard family.
The basis for that identification is shown in the conversion preview.

On this route, the hidden defaults and keyword meanings of the original shader cannot all be recovered.
Check the four items below yourself after converting.

1. **Surface Mode** and **Alpha Cutoff**
2. **Visible Faces**, the render queue, and stencil
3. Whether the emission, PBR, and outline modules are on
4. Mask channels and inversion

## Checking after conversion

![The material Inspectors before and after conversion, side by side, comparing surface mode and textures](/img/placeholder.png)
<!-- CAPTURE: workflow/liltoon-conversion-02-slot-check.png | 원본 재질과 변환된 MingToon 재질의 Inspector를 나란히 열어 표면 모드·텍스처·타일링을 대조한 2분할 | 1200x700 -->

- Does the Renderer use the new MingToon material, with the source asset still present
- Do opaque, cutout, semi-transparent, and transparent give the same result as the source
- Are the render queue, visible faces, and stencil as intended
- Are the texture tiling and offset, channels, and inversion the same
- Are PBR, emission, outline, and alpha mask on where they are needed
- Are the face and skin roles and the face proxy correct

How to read the loss report is in [Reading the Conversion Report](/internals/conversion-internals).

## Values you will touch often

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Look Preset On Convert** | The whole look applied right after conversion | Basic Toon High | Switching to Low gives a lighter look with depth effects off |
| **Color Preset** | The color tone laid over the look | Keep Existing Values | Picking another preset replaces the source colors with that tone |
| **None** | Skips the look preset itself | Do not pick it | Picking it leaves only the values read from the source and can look flat |
| **Outline Smooth Normals (UV8)** | Outline continuity on sharp corners | On | Off splits the line at corners |
| **Overwrite Occupied UV Channels** | Whether a UV channel already in use can be reused | Off | On overwrites someone else's data and can break the look |

## Common problems

### Pressing the convert button does nothing
Every readable slot is on the conversion exclusion list. The list is in [Slots that are not converted](/workflow/character-manager#변환되지-않는-슬롯).

### The face is shaded exactly like the body
The face slot is still `Regular`. How to assign it is in [Face and skin assignment](/workflow/character-manager#얼굴--피부-지정--가장-중요한-단계).

### I reverted and the values I had just fixed disappeared too
**Undo Conversion (back to pre-MingToon materials)** is a single Undo step.
It returns only the current slots to the source, and it does not delete the created conversion materials or mesh bakes.

## More detail

[MingToon Manager](/workflow/character-manager) · [Reading the Conversion Report](/internals/conversion-internals) · [Automatic Optimization On Build](/workflow/build-optimization) · [Troubleshooting](/troubleshooting#conversion)
