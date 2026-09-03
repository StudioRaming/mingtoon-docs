---
id: module-cost
title: Modules and Performance Cost
sidebar_position: 2
---

# Modules and Performance Cost

**After reading this document**, you'll understand how the `Material Load Estimate` number appears in the inspector and make informed decisions about what to reduce first in heavy avatars.

:::warning[This Value Is Not GPU Milliseconds]
The inspector states the same.

> This is a relative estimate, not actual GPU milliseconds. **It varies depending on screen occupancy, overdraw, and affected light count.**

MingToon does not publish verified GPU performance numbers in this preview. Below is a **relative indicator for comparing materials with each other**.
:::

---

## Reading the Load Estimate Panel {#부하-예상-패널-읽기}

`Material Load Estimate`

```text
[Light]  8 selected average 42 / max 118
Texture cost 14 · Depth cost 2 · Expected draws 3 · ALU index 31
Major cost: screen depth sample · additional light pass
```

| Display | Meaning |
|---|---|
| **Tier** | One of 4 levels below |
| `N selected average X / max Y` | When multiple materials are selected, shows both average and **worst-case** values |
| `Texture cost` | Number of texture samples |
| `Depth cost` | Number of screen depth samples |
| `Expected draws` | Number of passes this material creates |
| `ALU index` | Relative computation amount |
| `Major cost` | Items that raised the score significantly |

### Tier Boundaries

| Tier | Score |
|---|---|
| **Light** | 0 – 34 |
| **Standard** | 35 – 84 |
| **Heavy** | 85 – 149 |
| **Very Heavy** | 150 or more |

---

## Score Calculation Formula

This is the calculation formula directly from the source.

```text
Score = texture samples
       + depth samples × 3
       + max(pass count − 1, 0) × 8
       + ALU index
       + (if using additional light pass)         +12
       + (if URP additional light)                +6
       + (if transparent overdraw risk)          +15
       + (if using screen depth)                 +12
       + min(dynamic HSVG count × 2, 20)
```

What to understand here:

:::tip[What the Weights Tell You]
1. **One pass costs 8 points.** The first pass is free, but each additional one counts. Outline, additional light, and transparent prepass each add one.
2. **Additional light pass costs 8 + 12 = 20 points.** The most expensive single item.
3. **Depth samples are 3 times the cost of texture samples.** Plus, using screen depth adds 12 more points.
4. **Transparent overdraw risk 15 points.** Overusing transparency will be caught here.
5. **Dynamic HSVG accumulates up to 20 points max.**
:::

### Conditions That Increase Passes

| Condition | Pass +1 |
|---|---|
| `Receive Additional Lights` + `Additional Light Intensity` both > 0 (Built-in) | ✅ |
| Using outline + `Use Classic Hull` | ✅ |
| Surface mode is transparent + `Transparent Depth Prepass` | ✅ |

---

## Cost Per Module

These are values declared in the module catalog of the source. Order is execution order within the shader.

| Module | Texture | Depth | Extra Pass | ALU |
|---|---:|---:|---:|---:|
| Base Surface | 0 | 0 | 0 | 0 |
| Texture Layers | **20** | 0 | 0 | 8 |
| Normal Layers | **10** | 0 | 0 | 8 |
| Lighting | 0 | 0 | **1** | 7 |
| Shadow Color | 0 | **4** | 0 | **12** |
| PBR Surface | 2 | 0 | 0 | **12** |
| MatCap Layers | **10** | 0 | 0 | 9 |
| Emission | 1 | 0 | 0 | 3 |
| Occlusion | 1 | 0 | 0 | 2 |
| Rim Light (includes 2D Rim Light) | 2 | 1 | 0 | 7 |
| Backlight | 0 | 0 | 0 | 4 |
| Front Light | 0 | 0 | 0 | 4 |
| Glitter | 0 | 0 | 0 | **36** |
| Shadow Interior Reflection | 1 | 0 | 0 | 8 |
| Character Height Gradient | 1 | 0 | 0 | **1** |
| Face Shading | 6 | 1 | 0 | 8 |
| Outline | 4 | 2 | **3** | 10 |

:::note[These Values Are Module **Maximums**]
The 20 for Texture Layers is the upper bound when using all 10 layers with masks on each. The actual score counts only what's actually enabled in the material.
:::

### What To Observe Here

| Observation | Practical Meaning |
|---|---|
| **Glitter ALU 36** — single module maximum | Voronoi calculation is expensive. Use sparkle only on parts where it's essential |
| **Outline's extra 3 passes** | The outline family can create up to 3 passes |
| **Layer family's texture 10~20** | The biggest saving is keeping layer count to only what you actually use |
| **Character Height ALU 1** | Essentially free. No need to economize. |
| **Shadow depth 4** | Shadow accounts for most of the depth budget |
| **Backlight/Front Light ALU 4** | Very cheap. Room to use these instead of Rim Light |

---

## What To Disable First When Heavy

Ordered by score contribution.

1. **Disable Receive Additional Lights** (−20 points roughly) — The biggest savings if the character only needs main light for your shot.
2. **Convert transparent to cutout or opaque** (−15 points) — Eliminates transparent overdraw risk and reduces prepass by one.
3. **Disable depth-based effects** (−12 points + depth samples × 3) — Not guaranteed to show in VRChat screen anyway. → [Where depth effects are guaranteed](/platforms/vrchat#깊이-효과가-어디까지-보장되나)
4. **Reduce layer count to actual usage** — Especially crossing [tier boundaries](/internals/shader-structure#레이어-티어-키워드) reduces the compiled code itself.
5. **Disable Glitter** — Highest ALU cost.
6. **Bake dynamic HSVG as static** — HSVG that doesn't animate folds to a constant.

:::tip[Don't Casually Disable Outline]
Saves 8 pass points, but it's the toon aesthetic's identity and **one of the few means that work without depth**. Review 1~5 first.
:::

---

## Dynamic HSVG

`Dynamic HSVG N` is the count of color corrections that **are animated or can be changed by script, so they cannot fold to constants**.

Build-time optimization freezes values that aren't animated into shader constants, erasing computation. Animated values stay as uniforms. → [Automatic optimization on build](/workflow/build-optimization#애니메이션되는-값은-건드리지-않습니다)

**If you have no plan to animate HSVG**, don't leave it as a fluctuating value. Costs 2 points each, up to 20 maximum.

---

## Viewing Multiple Materials At Once

Using `MingToon Manager`'s `Select All MingToon Materials` or `Select All MingToon Materials in Scene` shows **average and worst-case** together.

:::tip[Look at the Worst Case, Not Average]
Even if the whole avatar is light, if one material is `Very Heavy`, frames drop when that part covers the screen. Check the tier next to `max` first, find that material, and fix it.
:::

## Related Documents

- [Shader Structure and Passes](/internals/shader-structure) — What passes actually are
- [What Baking Removes](/internals/bake-internals) — What disappears at compile time
- [Automatic Optimization on Build](/workflow/build-optimization)
