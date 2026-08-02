---
id: build-optimization
title: Automatic Optimization On Build
sidebar_position: 2
---

# Automatic Optimization On Build

**After reading this document** you'll understand what MingToon automatically does during upload or build, and how to verify it worked correctly.

## One-Line Summary

**You don't need to do anything.** It's enabled by default and runs automatically on VRChat upload, Warudo mod build, and regular player build. After the build completes, materials return to their original state so you can continue editing.

:::tip[Don't confuse this with manual Bake]
[Manual Bake](/workflow/bake-and-restore) **creates new materials and swaps renderers**, so you must manually undo to continue working.

Automatic build optimization **only swaps a single shader pointer on the material**. The material asset is not replaced, renderers are untouched, and materials return to an editable state the instant the build finishes.

**Manual optimization alone is sufficient for typical deployment.**
:::

## What Happens

When a build starts:

1. Materials using MingToon are collected from the scene (or build-target prefab).
2. A specialized shader containing **only the features actually used** is created or retrieved from cache for each material.
3. `material.shader` is swapped to that shader.
4. The build proceeds.
5. When the build completes, the editable shader is restored.

The generated shader has **the same ShaderLab Properties block** as the editable version, so no values are lost during the round-trip.

### Animated Values Are Never Touched {#애니메이션되는-값은-건드리지-않습니다}

The analyzer checks not only `AnimationClip` but also **Animator Controller references in nested/array serialization fields on components**. Animated properties are dynamically preserved, so runtime-activated features never get compiled away at the optimization stage.

It also collects materials that **are referenced only in animation clips and never appear on any renderer**, like costume toggles.

### Build Continues If One Fails

If optimization fails on any material, only that material ships unoptimized, and the build continues. Console logs `[MingToon] Skipped build optimisation for ...` warning.

---

## How It Hooks By Platform

Build entry points vary by platform, so MingToon registers three hooks separately.

| Platform | Entry Point | Notes |
|---|---|---|
| **VRChat avatar/world upload** | `IVRCSDKBuildRequestedCallback` | VRChat upload bypasses `BuildPipeline.BuildPlayer`, so Unity's build callbacks don't fire |
| **Warudo mod build** | UMod build processor | `Warudo/Build Mod` uses UMod's own pipeline, so Unity callbacks don't fire |
| **Regular player build** | `IPreprocessBuildWithReport` | |

All three hooks call the same Apply/Restore pair, and calling twice is safe.

### VRChat: Automatic Depth Promotion {#vrchat-깊이-자동-승격}

One extra thing happens during VRChat **avatar** builds.

Materials with `Depth Availability` set to `Auto` are promoted to `Force On`.

Here's why. `Auto` means "if the host says it has a depth texture, trust it." The component that reports this is `MingDepthTextureProvider`—an `IEditorOnly` MonoBehaviour that VRChat strips from uploads. So that signal never arrives on VRChat, and `Auto` effectively becomes always off. **This is why 2D rim and 2D shadows disappeared even in worlds that actually have depth textures.**

:::note[User-set values are never touched]
`Force On` (1) and `Force Off` (2) are intentional author choices, so we never override them. Promotion only applies to materials where `Auto` is set **and the depth module is actually enabled**.
:::

Does not apply to world builds. Worlds retain their own camera and scripts.

### VRChat: Ordering With Other Tools

The VRChat hook runs **late** with `callbackOrder = 2000`. Tools like Modular Avatar and VRCFury that rewrite materials in their own build callbacks finish first, so we analyze the **materials that will actually ship**.

---

## Verify It Worked {#제대로-걸렸는지-확인하기}

### 1. VRChat Hook Compiled

After a script reload, the Console should contain this line:

```text
[MingToon] VRChat build hook compiled and registered.
```

:::danger[If this line is missing]
The VRChat hook **doesn't exist at all**. The conditional-compilation guard (`VRC_SDK_VRCSDK3` defined + Unity 2022.3+) evaluated to false. Verify that VRC SDK is properly in your project.
:::

### 2. Build Log

A summary appears in Console during build:

```text
[MingToon] Build optimisation: 12 candidate material(s), 12 switched,
0 with texture optimizations, 3 depth availability promotion(s).
```

### 3. Report File

Material-by-material results are saved to `StudioRaming/MingToonOptimizeReport.txt` next to the project folder. It persists after the build, so you can check it later.

```text
MingToon build optimisation report
time      : ...
candidates: 12
swapped   : 12
depthPromo: True
texRewrite: False

Body_MingEditable  ->  Hidden/StudioRaming/MingToon/Generated/...
Hair_MingEditable  ->  optimized depth-mask(-1 sample)
```

---

## Menu Options

Two toggles live under `Tools > Studio Raming > MingToon`.

### Optimize Shaders On Build {#optimize-shaders-on-build}

**Default: on.** Controls the entire shader-swap feature described above. Rarely has reason to be off.

### Reviewed Texture Rewrites On Build (Opt-In)

**Default: off.** This one is riskier.

| | Shader Swap | Texture Rewrite |
|---|---|---|
| What changes | One pointer | Material's texture slots |
| Restoration | Obvious | Must reverse everything exactly |
| Build time | Nearly nothing | Up to 3 renders/reimports per material |

:::caution[Before enabling]
Surface/normal flatten and regular RGBA mask repacking are allowed, so **pixels may differ** due to readback, color space, mip regeneration, and platform compression. If you enable it, compare captures before/after the bake.
:::

Even if this is off, **lossless** optimizations continue. Cases like depth masks that prove mathematically identical, or PBR/AO using the same Texture object and UV expression.

### Clean Build Optimisation Output

Clears the generated shader cache. Run this if you suspect the cache is corrupted.

### Debug: Tint Optimized Shaders Red

Tints optimized shaders red so you can **visually see which materials actually got swapped**. Turn on and build if you suspect optimization didn't run. Must turn off after confirming.

---

## If the Editor Crashed During Build

Restoration is called from three places: build callback, a delayed call in case that callback doesn't arrive, and **domain reload**. Even if the editor crashes mid-build, materials return to the original shader the next time scripts reload.

If texture rewrites were enabled, snapshots remain on disk and recover the same way.

## Next

- For stronger optimization or fixed assets for distribution: [Manual Bake and Restore](/workflow/bake-and-restore)
- Platform-specific upload checklists: [VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo)
