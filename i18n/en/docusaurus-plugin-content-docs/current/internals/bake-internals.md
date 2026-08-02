---
id: bake-internals
title: What Bake Removes
sidebar_position: 3
---

# What Bake Removes

**After reading this guide,** you'll understand what criteria bake and build optimization use to remove code, and you can answer yourself: "Why wasn't just this material optimized?"

---

## Two Phases

```text
1) Animation dependency analysis    What must not be touched
        ↓
2) Feature set (FeatureSet) result  What code looks like
        ↓
   Materials with same structure profile share generated shader
```

---

## Step 1 — Animation Dependency Analysis {#1단계--애니메이션-의존성-분석}

> This analyzer **never rewrites clips, controllers, or materials.** It only reads.

What it scans:

| Target | Notes |
|---|---|
| Material property curves in `AnimationClip` | |
| Controller assigned to `Animator` | |
| **Controller references in nested/array serialized fields of components** | See below |
| Materials designated by object reference curves in `AnimationClip` | Costume toggles |

:::danger[Critical for VRChat Avatars]
It also finds controllers owned by Avatar/Exporter components. **VRChat Avatar Descriptor's Playable Layer** is the critical case — those controllers may **not** be assigned to the Animator, yet after upload the material curves actually run. Therefore they must be marked for preservation.

MingToon finds this without taking a compile-time dependency on the VRChat SDK.
:::

### When multiple roots use the same material

When multiple hierarchies reference one shared material, each report is merged by **union**.

> Taking the first one is not safe. A later root may animate a property that was static in the earlier root.

### When analysis fails

**We don't treat it as "no animation."** We create a conservative failure mark, merge it into every material under that root, and skip all destructive and constant-folding operations.

This appears in the Console:

```text
[MingToon] Animation analysis failed for {root}; leaving its materials editable.
```

The report records it as `SKIPPED: animation dependency analysis failed`.

### Property name normalization

Convert renderer material animation paths to shader property names. **Remove component channels (`.r`, `.x`, etc) but keep suffixes like `_ST` for tiling/offset**.

That is, if you animate just the R channel of a color, the entire color stays dynamic.

### Keep Editable — Manual override

Items marked as "Keep This Group Editable At Bake" fold into the report.

:::note[Present in Both Lists]
The two halves of bake read different lists:
- **Texture baker** → `AlwaysPreservedPropertyNames`
- **Feature analyzer** → list for shader strip decision

Use this for values that aren't animated but will later be changed by script.
:::

---

## Step 2 — Feature Set

A **structural snapshot** of the material.

:::tip[What's Included and What's Not]
- **Included** — surface mode, cull mode, on/off of each module, layer count, blend mode, whether it's a face, SDF usage, backend ID
- **Deliberately excluded** — **numeric look values and texture asset identity**

This is why **materials with the same code structure share one generated shader.** Different textures and colors don't matter.
:::

### Mask identity bits

`OptionalWhiteMaskIdentityBits` holds bits that prove "this mask is mathematically white (= identity)."

| Bit | Target |
|---|---|
| 0 | Fresnel rim mask |
| 1 | Shadow interior reflection mask |
| 2–6 | MatCap masks 01–05 |
| 7 | Rim shade mask |

**When identity is proven, that mask's texture sample disappears entirely.** This optimization is lossless.

### Dynamic state

Flags like `AllEffectsDynamic` mean **that value is animated.** Dynamic items don't fold to constants; they stay as uniforms.

---

## Step 3 — Structure Profile and Constant Intersection {#3단계--구조-프로파일과-상수-교집합}

Materials with the same **structure profile** (code shape of generated shader) intersect constants only with each other.

```text
Profile A: 3 materials  →  12 shared numeric constants
Profile B: 5 materials  →  4 shared numeric constants
```

:::note[Why Split by Profile]
If you did lilToon-style constant folding directly, one material with a different value or animation would **block safe constants on its neighboring materials.**

By splitting profiles, a material with a different value stays uniform within its profile, and **a material with different code shape cannot block a neighbor's constant folding.**
:::

`MaterialConstants` is intentionally excluded from profile identification — the constants themselves would split the profile, creating a cycle.

`CanonicalLiteral` is already an immutable HLSL expression, so **profile identity is not affected by editor locale** (avoiding the regional decimal-point problem).

---

## What Actually Gets Removed

| Target | Condition |
|---|---|
| Unused **passes** | The feature is off and not animated |
| Fresnel rim · 2nd-order form shadow · depth effect · depth rim · 2D shadow | Same as above |
| Inactive **texture module** math | |
| **Slot math exceeding layer count** | Crossing tier boundaries actually shrinks code |
| **Texture samples** of masks proved identity | |
| **Math** of static numerics | Folded to constants |

Outline supports only **directly-rendered hull** and **camera-depth-reading inner 2D edge**, with no separate screen-composition runtime.

---

## Texture Optimization {#텍스처-최적화}

The default is **`LosslessOnly`**. Original texture texels are **never rewritten.**

| Lossless proof | Content |
|---|---|
| depth mask identity | `optimized depth-mask(-1 sample)` |
| PBR/AO shared sample | Same Texture object · same UV equation → `pbr/ao(-1 shared sample)` |

Enabling `ReviewedHighQuality` (or build menu's `Reviewed Texture Rewrites On Build`) adds:

| Rewrite | Risk |
|---|---|
| surface flatten | Pixels may change |
| normal flatten | Pixels may change |
| generic RGBA mask repack | Merge slots into shared texture. **Doesn't reduce shader sample count** |

:::danger[Why Pixels Change]
imported texture readback · color space · mip regeneration · platform compression. You must directly compare captures before and after bake.
:::

### Perfect rollback on failure

Before texture optimization, we **snapshot the entire property block** of the material. Even lossless proofs change hidden structural flags.

The snapshot is **saved to disk**, so the editor can recover if it dies during build.

On failure:

1. Precisely roll back that material only → `Texture baking failed and was rolled back exactly for {material}`
2. If rollback is incomplete, attempt full recovery
3. If that also fails, **halt the build** (`BuildFailedException`)

---

## Why Wasn't Just This Material Optimized

Check the report (`StudioRaming/MingToonOptimizeReport.txt`) and Console.

| Record | Cause |
|---|---|
| `SKIPPED: animation dependency analysis failed` | Analysis failed. Conservatively kept editable |
| `SKIPPED: {message}` | Exception on that material. Build continues |
| No line at all | Not collected — outside scene/prefab scope or already on generated shader |

:::note[Already-Swapped Materials Are Skipped]
Only editable MingToon materials are targeted. Materials created by manual bake or not restored from a previous build are left alone.
:::

---

## Collection Scope

| Scenario | Scope |
|---|---|
| Player build | Scans **scenes.** Scenes are the build |
| Warudo mod build | **Build-target prefabs only** |

:::danger[Why Scanning the Scene When Building One Prefab Is Wrong]
In one measured mod build, the prefab used 7 materials, yet 41 materials the author had open **were swapped.** Worse, if that prefab isn't in the scene, **only what's actually shipped goes out unoptimized.**
:::

## Related Documents

- [Automatic Optimization on Build](/workflow/build-optimization)
- [Manual Bake and Restore](/workflow/bake-and-restore)
- [Modules and Performance Cost](/internals/module-cost)
