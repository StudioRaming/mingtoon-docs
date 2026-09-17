---
id: conversion-internals
title: Reading the Conversion Report
sidebar_position: 4
---

# Conversion report reference

Converting a lilToon material prints a line like this to the Console.

```text
MingToon Conversion Complete: 12 slots, 8 materials, 5 explicit losses. Sources preserved as they were.
```

If `explicit losses` is not 0, find the code below.
The conversion procedure is in [lilToon Material Conversion](/workflow/liltoon-conversion).

## Severity

| Severity | Meaning | Counted |
|---|---|---|
| Information | The conversion went as intended | No |
| Lossy | Carried across, but the result may differ | Yes |
| Unsupported | Could not be carried across | Yes |
| Error | The conversion failed | Yes |

## Issue codes

All 19 of them, in alphabetical order.

| Code | Severity | Meaning | What to check |
|---|---|---|---|
| AlphaApproximation | Lossy | The alpha formula differs | Surface Mode and Alpha Cutoff |
| AnimatedUvRequiresBake | Unsupported | UV scroll and rotation animation could not be carried across | Rebuild it with animation |
| AudioLinkUnsupported | Unsupported | AudioLink integration is not supported | No alternative |
| ConversionFailed | Error | This material failed to convert | The message body |
| DecalRequiresBake | Unsupported | The decal could not be carried across | Place it again as an extra texture layer |
| DissolveRequiresBake | Unsupported | Dissolve could not be carried across | Reproduce it with an alpha mask and animation |
| EmissionMaskRequiresBake | Unsupported | The emission mask could not be carried across | Bake it into the emission map |
| FaceClassification | Information | A report of the face classification result | The reason table below |
| FeatureUnsupported | Unsupported | Some other unsupported feature | The message names it |
| MissingTextureSkipped | Lossy | A texture the source used is not in the project | Restore the texture and convert again |
| OutlineApproximation | Lossy | The outline width and color formula differs | Width mode and pressure source |
| RimApproximation | Lossy | The rim formula differs | [Rim](/guides/rim) |
| SecondEmissionRequiresBake | Unsupported | The second emission could not be carried across | Bake it into the emission map |
| ShadowApproximation | Lossy | The shadow formula differs | [Form shadow border](/guides/light-and-shadow#1-형태-그림자-경계--가장-먼저) |
| SourceDefaultsReplaced | Lossy | Source defaults were replaced by MingToon defaults | It will look different if the source relied on those defaults |
| SourceExcluded | Information | The source was caught by a conversion exclusion rule | The exclusion reason in the message |
| SpecialSurfaceUnsupported | Unsupported | Special surfaces such as fur and jelly have no counterpart | No alternative |
| UvApproximation | Lossy | UV transforms differ | Tiling and Offset on the texture |
| ValueClamped | Lossy | The value was clamped to MingToon's range | The source was using a value outside that range |

:::caution[An approximation does not mean it is wrong]
When shaders differ, features with the same name use different formulas.
Conversion is an interoperability tool, not a mathematical copy.
An approximation entry is a signal to look at it and set the values again.
:::

## Face classification

Auto reads only the face flag the source material declares.
It does not guess a face from a name or a shader brand.

A material named `Face` is not necessarily a face, and `Body` sometimes has the face mixed in.
A wrong guess puts face shading on the wrong mesh, and the cause is hard to find.

### Classification reason {#판정-근거-표시}

| Reason | Meaning | Needs checking |
|---|---|---|
| Direct Face Renderer | A person named the renderer | No |
| Direct Skin Renderer | A person named the renderer | No |
| Material override | A person named the material | No |
| Material-slot override | A person pinned it per slot | No |
| Source face flag | The source shader marked it as a face | No |
| Global conversion mode | It was applied in bulk | Yes |
| Regular default | There was no flag, so it stayed Regular | Yes |

### The three roles

| Role | Preview | Preset it receives |
|---|---|---|
| Face | Face shading | Face values |
| Skin | Skin look | Skin values, bare skin only |
| Regular | Regular shading | Shared values |

Switch between the three on the role row in the material inspector.
Set it for a whole avatar in [MingToon Manager](/workflow/character-manager#얼굴--피부-지정--가장-중요한-단계).

:::note[The preset capture window calls it Common]
The Regular role appears as the `Common` slot in the window that captures look presets.
It is the same thing as Regular in the role dropdown.
:::

## Source tracking

A converted material records the GUID of its source material.
**Undo Conversion (back to pre-MingToon materials)** runs on that record.

| Audit message | Meaning | Result |
|---|---|---|
| `importer userData written by another tool` | Another tool already occupies that field | Undo cannot be used |
| `Source material name is ambiguous; reconvert once to stamp its GUID.` | The source could not be identified by name alone | Convert once more and it gets recorded |
| `The source material could not be resolved.` | The source was not found | It was deleted or moved |

The restore result totals this as `Slots without an exact source GUID or a resolvable source: N`.

:::tip[If you use another tool alongside]
MingToon does not overwrite another tool's record. It gives up the undo instead.
If you need the undo, check before converting whether that tool uses the same field.
:::

## Columns in the audit table

The audit table is 18 tab-separated columns.

| Column | What it holds |
|---|---|
| `source` · `converted` | Asset paths of the source and the converted result |
| `resolution` | How the source was resolved |
| `face` | The face classification result (`Face` or `Regular`) |
| `surfaceMode` · `renderQueue` · `cull` | Render state before and after conversion |
| `outlineCull` | Outline cull mode before and after conversion |
| `stencil` · `outlineStencil` | Stencil on the regular pass and the outline pass, before and after |
| `surfaceLayers` · `normalLayers` · `matcapLayers` | How many layers were carried across |
| `occlusion` | Occlusion settings |
| `passes` · `keywords` | Pass count and keyword count, before and after |
| `mismatches` | Items that came out different from the source |
| `losses` | Lost items |

`renderQueue differs: expected ...` means the surface mode came out different from the source.

## What to check after converting

Check it on the real model. The preview sphere in the inspector cannot tell you.

1. Mask channel selection and inversion — this goes wrong most often
2. Tiling and Offset on textures
3. Occlusion
4. Surface Mode — especially whether hair came across as Cutout
5. Face material classification — the reason table above
6. Layer count — which layer the source's 2nd and 3rd surfaces landed on

## Related pages

- [lilToon Material Conversion](/workflow/liltoon-conversion)
- [MingToon Manager — 1 · Convert](/workflow/character-manager#1--변환)
- [Shared texture slot UI](/guides/texture-modules)
