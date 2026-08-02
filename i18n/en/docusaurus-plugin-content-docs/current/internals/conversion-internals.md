---
id: conversion-internals
title: Reading Conversion Reports
sidebar_position: 4
---

# Reading Conversion Reports

**After reading this document** you can interpret each log entry from lilToon conversion in the Console by code, and know exactly what to fix manually.

Right after conversion you see a line like this:

```text
MingToon conversion complete: 12 slots, 8 materials, 5 losses/unsupported features. Original preserved.
```

**If `losses/unsupported features` count is not 0, see below.**

---

## Four Severity Levels

| Severity | Meaning | Action |
|---|---|---|
| `Information` | Informational. Conversion worked as intended | Safe to read and skip |
| **`Lossy`** | Moved, but **the result may differ visually** | Check the actual model |
| **`Unsupported`** | **Cannot be moved** | Recreate manually or accept loss |
| `Error` | Conversion failed | Remediation needed |

Counted in the aggregate: `Lossy` · `Unsupported` · `Error` only.

---

## Complete Issue Code Reference

### Approximation — moved, but mathematics differ

| Code | What was approximated | What to check |
|---|---|---|
| `SourceDefaultsReplaced` | Source defaults replaced by MingToon defaults | If the original relied on defaults, appearance will differ |
| `ShadowApproximation` | Shadow math differs | Re-tune [Form Shadow Border & Brightness](/guides/light-and-shadow#1-형태-그림자-경계--가장-먼저) |
| `OutlineApproximation` | Outline width and color calculation differs | Check width mode and pressure source |
| `RimApproximation` | Rim formula differs | See [Rim](/guides/rim) |
| `AlphaApproximation` | Alpha handling differs | Check surface mode and alpha cutoff |
| `UvApproximation` | UV transformation differs | Check texture ST |
| `ValueClamped` | Value clamped to MingToon range | Source was using out-of-range values |

:::caution[Approximation is not "wrong"]
Different shaders have different formula and feature semantics. Conversion is an **interoperability tool**, not mathematical cloning. Approximation entries are **signals to visually confirm and retune values**.
:::

### Baking needed — cannot reproduce at runtime

| Code | Original feature | Alternative |
|---|---|---|
| `AnimatedUvRequiresBake` | UV scroll/rotation animation | Pre-bake texture or reproduce with animation |
| `DecalRequiresBake` | Decal | Reposition as texture layer |
| `DissolveRequiresBake` | Dissolve | Reproduce with alpha mask + animation |
| `SecondEmissionRequiresBake` | 2nd emission pass | Merge and bake into emission map |
| `EmissionMaskRequiresBake` | Emission mask | Merge and bake into emission map |

:::tip[All five mean "pre-bake the texture, and it works"]
What was computed at runtime becomes static texture. Most look visually identical when reproduced this way. If animation is needed, move to AnimationClip.
:::

### Unsupported — cannot move

| Code | Meaning |
|---|---|
| `SpecialSurfaceUnsupported` | Source special surface (fur, jelly, etc.) has no MingToon equivalent |
| `AudioLinkUnsupported` | AudioLink integration is not supported |
| `FeatureUnsupported` | Other unsupported feature. Name appears in message |

### Asset / Judgment

| Code | Meaning | Action |
|---|---|---|
| `MissingTextureSkipped` | Texture referenced by source is not in project | Recover texture and reconvert |
| `FaceClassification` | Face judgment result report | See below |
| `ConversionFailed` | Material conversion failed | Check message |

---

## Face Classification — Auto does not infer

:::danger[Auto reads only the source material's face flag]
The inspector says it plainly.

> Auto reads **only the face flag the source material carries directly**. **It does not infer from names**, so shaders without flags remain Regular, and slots meant for face must be **manually designated as Face.**

In other words, **Auto only finds faces when converting from shaders with face flags, like lilToon**. Converting from Standard or URP Lit yields all `Regular`.
:::

This is intentional. A slot named `Face` is not always a face, and body meshes can contain faces — when approximation is wrong, the cost is much higher. If face shading lands on the wrong mesh, the cause is hard to find.

### Classification Evidence {#판정-근거-표시}

| Indicator | Meaning | Confidence |
|---|---|---|
| Object/Renderer assignment | User designated via `Direct Face Renderer`/`Direct Skin Renderer` | ✅ |
| Material direct or slot assignment | Human-locked per slot | ✅ |
| Source face flag | Source shader marks it as face | ✅ |
| Whole-convert mode | Blanket applied | ⚠️ |
| Regular default | No flag, remains Regular | ⚠️ **verify required** |

### Three Roles

| Role | Preview | Preset values for |
|---|---|---|
| `Face` | Face shading | Face-only |
| `Skin` | Skin look | Skin — **bare skin only** |
| `Regular` | General shading | General use |

→ [MingToon Manager](/workflow/character-manager#얼굴--피부-지정--가장-중요한-단계)

---

## Source Provenance

Converted materials **record the source material's GUID in the importer userData**. `Restore Original Material` operates this way.

Records break in these cases:

| Audit message | Meaning | Result |
|---|---|---|
| `importer userData written by another tool` | Another tool is already using userData, so **we didn't stamp GUID to avoid destroying data** | `Restore` unavailable |
| `Source material name is ambiguous; reconvert once to stamp its GUID.` | Name alone cannot identify source | Re-convert once and GUID is stamped |
| `The source material could not be resolved.` | Source not found | Source deleted/moved |

Recovery aggregates as `slots without precise source GUID or source not found: N`.

:::tip[If using together with other tools]
MingToon **does not overwrite others' userData**. Instead it forgoes tracking. If restore is needed, check whether that tool uses userData before converting.
:::

---

## Audit Table

Conversion audits produce a tab-delimited table:

```text
source  converted  resolution  face  surfaceMode  renderQueue  cull
        surfaceLayers  normalLayers  matcapLayers  occlusion  passes
        keywords  mismatches  losses
```

| Column | What to check |
|---|---|
| `resolution` | How source was located |
| `face` | Face classification result |
| `surfaceMode` · `renderQueue` · `cull` | Whether render state matches source |
| `surfaceLayers` · `normalLayers` · `matcapLayers` | How many layers came over |
| `passes` · `keywords` | Code shape that compiles |
| `mismatches` | Items differing from source |
| `losses` | Loss entries |

If you see `renderQueue differs: expected ...`, surface mode was detected differently than source.

---

## Always Check After Conversion

After reading the report, verify on the **actual model**. Inspector preview sphere cannot be trusted.

1. **Mask channel selection and inversion** — most commonly misaligned
2. **Texture ST** (Tiling / Offset)
3. **AO**
4. **Surface mode** — especially whether hair came in as cutout
5. **Face slot classification** — see evidence table above
6. **Layer count** — whether source 2nd/3rd surfaces came over as how many layers

## Related Documents

- [MingToon Manager — 1 · Convert](/workflow/character-manager#1--변환)
- [lilToon Material Conversion](/workflow/liltoon-conversion)
- [Texture Slot Common UI](/guides/texture-modules)
