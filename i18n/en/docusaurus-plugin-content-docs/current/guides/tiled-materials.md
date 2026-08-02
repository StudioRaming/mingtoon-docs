---
id: tiled-materials
title: Tiled Material Composer
sidebar_position: 14
---

# Tiled Material Composer

**After reading this document** you can fit four different material feels into one material slot using an RGBA mask, distinguishing cloth, leather, metal, and label on clothing without adding draw calls.

`Tools > Studio Raming > MingToon > Tiled Material Composer`

## Problem it solves

Say a piece of clothing mixes fabric, leather, and metal trim. Normally you'd split it into three materials. That means **three draw calls**, affecting your avatar's performance tier.

The composer instead uses **an RGBA mask to distinguish up to four logical regions** within one slot.

```text
Mask R channel  →  Region 1 (e.g., cloth)
Mask G channel  →  Region 2 (e.g., leather)
Mask B channel  →  Region 3 (e.g., metal)
Mask A channel  →  Region 4 (e.g., label)
```

The default region names are `Cloth`, `Leather`, `Metal`, `Label`.

<!-- SCREENSHOT: Tiled Material Composer window -->

---

## Why texture memory doesn't grow

This is the core of the tool.

> The mask is **low-frequency**, and surface and normal maps stay as **small repeating textures.**

| | Resolution | Why |
|---|---|---|
| **Region mask** | Can be low | Only says where fabric is and where leather is. Soft boundaries don't hurt |
| **Surface · Normal map** | Small tile | Fabric weave, leather grain — **repeating patterns** — use small images on loop |

So instead of painting the whole outfit in 4K, **low-res mask + small repeating textures** carry the same information.

:::danger[These textures don't flatten even in Reviewed High Quality bake]
Stretching repeating tile across all UVs and baking it flattens the resolution-economy and loses the overhead advantage. The baker knows and skips them. → [What bake removes](/internals/bake-internals#텍스처-최적화)
:::

---

## Procedure

1. Slot the target material into `MingToon Material`.
2. Put the RGBA mask into `Packed Region Mask`.
3. Set up each of the four regions.
4. Click `Apply Four Logical Regions`.

Miss any one of three and it blocks with `material, mask and region are required`.

### Per-region items

| Item | Purpose |
|---|---|
| `Mask Channel` | Which channel this region reads (R/G/B/A) |
| Surface texture · Tint | Goes into texture layers |
| `Normal Strength` | Goes into normal layers |
| `MatCap Strength` | Goes into MatCap layers |

### What it becomes

Clicking `Apply` makes the composer directly configure the material's layer modules.

| Region setting | Becomes |
|---|---|
| Surface texture · Tint · Mask | **Texture Layers** (`_MingStack*`) |
| Normal map · Strength · Mask | **Normal Layers** (`_MingNormal*`) |
| MatCap · Strength · Mask | **MatCap Layers** (`_MingMatcap*`) |

The module's `Enable` toggle and `Layer Count` adjust too.

:::note[Afterward it's just normal layered material]
The composer is a **setup tool** that populates layers, not a special runtime or mode. After apply, edit in [Detail Maps](/guides/detail-maps) and [Common Texture Slot UI](/guides/texture-modules) as usual.
:::

---

## When making the mask

| Recommend | Why |
|---|---|
| Paint channels **non-overlapping** | One pixel in two regions means two blended layers |
| Boundaries **slightly soft** | Hard cutoff shows steps. Leverage the low-frequency advantage |
| **Turn off sRGB** | Mask is weight, not color |
| Compression is taste | Low-frequency masks rarely show compression artifacts |

:::tip[Don't need all four regions]
Leave channels empty. Two regions still cut draw calls.
:::

---

## When to use and when not

| Situation | Verdict |
|---|---|
| One outfit piece with multiple materials feels | ✅ Exactly this tool's job |
| Need to lower avatar performance tier | ✅ Material count shrinks |
| Non-repeating large illustration (art texture) | ❌ Tiling doesn't apply. Keep the base map as-is |
| Each region needs different surface mode | ❌ One material = one surface mode. Split materials |

:::caution[Can't split surface mode]
You can't put opaque cloth and transparent lace in one slot. Surface mode, cull mode, render queue are per-material properties. → [Shader structure and passes](/internals/shader-structure#표면-모드가-실제로-바꾸는-값)
:::

## Related docs

- [Detail Maps](/guides/detail-maps) — Layer modules
- [Common Texture Slot UI](/guides/texture-modules) — Mask channels · Remap
- [Modules and cost](/internals/module-cost) — Layer tiers and cost
