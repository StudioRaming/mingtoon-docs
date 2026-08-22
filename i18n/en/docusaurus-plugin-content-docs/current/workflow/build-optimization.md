---
id: build-optimization
title: Automatic Build Optimization
sidebar_position: 2
---

# Automatic Build Optimization

**After reading this guide,** you will know what MingToon optimizes during upload or build while preserving originals, and how to verify failures and restoration.

## In One Sentence

Automatic optimization is enabled by default. It makes shipping copies lighter during VRChat upload, Warudo mod builds, and regular Player builds, then restores authoring Materials and Renderers to an editable state.

Use Manual Bake only when you need fixed assets directly. Automatic optimization is sufficient for normal distribution.

## What Happens

Common flow:

1. Collect MingToon materials referenced by shipping Renderers and AnimationClips.
2. Analyze features actually in use and values that are animated.
3. Generate a lightweight shader with fixed features folded into constants, or retrieve it from cache.
4. Swap materials to the lightweight shader for shipping.
5. Run platform-specific processing.
6. Restore the original state on completion, failure, or domain reload.

Generated shaders retain the same ShaderLab Properties contract as the authoring shader. Animated properties stay dynamic, and materials referenced only by an AnimationClip are collected even when they are not currently assigned to a Renderer.

### Additional VRChat Avatar Processing {#vrchat-추가-처리}

- Preserves `Depth Availability = Auto`. Author-selected Force On and Force Off values are also preserved, and `Include Depth Light on Upload` is a separate opt-in that does not rewrite the material value.
- Bakes face normals into UV7 of the **upload-copy Mesh**. Renderers remain on the Live path when Face SDF owns UV7 or a texture Face Area Mask is required, preserving the same result.
- Applies project-configured texture resolution caps by slot type—such as base, normal, and mask—to the upload copy.
- Automatically includes VRC Light Volumes variants in avatar uploads.
- Marks MingToon runtime components as `IEditorOnly`. After exporter processing, verify separately that `RuntimeComponentCount = 0` on the actual build clone.

Face-normal upload output uses a dedicated path separate from authoring mesh bakes. Even for the same character and UV channel, it neither reuses nor overwrites authoring Mesh assets.

### Animated Values Are Preserved {#애니메이션되는-값은-건드리지-않습니다}

The analyzer follows AnimationClips, Animator Controllers, and nested or array fields in components. Features that must switch at runtime require the Inspector opt-in so baking does not fold them into constants.

Examples:

- `Animate Depth Effects with FX Animator`
- `Switch Shadow Projection from FX Menu`
- VRC Quality Low / Mid / High

Opting in preserves switchability but retains the related uniform branch and code. Enable it only on materials you will actually animate.

### Recoverable Failures Are Isolated; Fatal Failures Stop the Build

Material and Renderer restoration isolates exceptions per entry. If one entry fails, restoration continues for later entries, leaving only the failed item for the next attempt. Saving also uses `SaveAssetIfDirty` only on assets MingToon changed, so unrelated dirty assets are not saved with them.

A recoverable failure, such as an analysis or conversion exception in one ordinary material, restores that material to the authoring shader, leaves a warning, and continues with the rest.

By contrast, errors that cannot guarantee a coherent result—such as `BuildFailedException`, failure to determine the shared constant intersection, or restoration failure—stop the entire build. Resolve the Console error and confirm that originals have been restored before building again.

## Platform Entry Points

| Platform | Entry Point |
|---|---|
| **VRChat avatar/world** | VRC SDK build callback |
| **Warudo mod** | UMod build processor |
| **Regular Player** | Unity build preprocess callback |

The VRChat hook runs late so it analyzes the actual final state after tools such as Modular Avatar and VRCFury have processed materials.

### VRChat Depth Auto Contract {#vrchat-깊이-자동-승격}

`Auto` directly reads the bound camera depth texture and VRChat Photo Camera state for each camera. The upload hook does not rewrite this value: Auto ships as Auto, while Force On and Force Off remain exactly as authored. Use Force On only when the author guarantees host depth that automatic detection cannot see.

`Include Depth Light on Upload` is a separate opt-in. It adds a shadow-casting Directional Light to the upload copy so the camera creates a real depth buffer, while the material remains Auto. It is off by default and carries performance and world-lighting cost. → [VRChat Depth Light](/platforms/vrchat#vrchat-깊이-라이트)

Mirror safety blocking is separate. Even under Force On, depth modules are disabled in mirrors so they cannot read another camera's depth. → [VRChat Depth](/platforms/vrchat#깊이-효과가-어디까지-보장되나)

## Texture Optimization {#텍스처-최적화}

`Texture Optimization` in MingToon Manager is a project-wide setting. It is stored in Editor preferences rather than a Scene or Prefab and applies to every character shipped from the project.

### Resolution Caps by Slot

Set a maximum resolution for slot types such as base, normal, MatCap, and mask. Only the upload copy is resized; the source TextureImporter and source file are unchanged.

### Reviewed Texture Rewrites On Build (Opt-In)

Off by default. Allows surface/normal flattening and reviewed RGBA mask repacking. Because readback, color space, mips, and platform compression can change pixels, compare before-and-after captures whenever it is enabled.

Even while this option is off, mathematically lossless duplicate-sample and identity-mask removal still applies.

## Verify That It Ran {#제대로-걸렸는지-확인하기}

1. Reduce C# and shader errors in the Console to zero.
2. In MingToon Manager's `Readiness Check`, inspect the cache version, generated shaders, and whether originals changed.
3. Check candidate, swap, depth-state preservation, Upload Depth Light, texture-rewrite, and face-normal-bake counts in the build log.
4. Review per-material results in `StudioRaming/MingToonOptimizeReport.txt`.
5. For VRChat, check your own view, mirrors, and Photo Camera separately.

## Menu Options

Release builds show only user-facing items under `Tools > Studio Raming > MingToon`.

- **Optimize Shaders On Build** — on by default. Controls automatic shader optimization.
- **Reviewed Texture Rewrites On Build (Opt-In)** — off by default. Allows reviewed texture rewrites.
- **Clean Build Optimization Output** — clears the generated-shader cache.

`Debug: Tint Optimized Shaders Red`, variant dump/record tools, and internal performance-measurement menus do not appear in release packages. They are available only in `MINGTOON_DEV` development builds.

## If the Editor Closed During a Build

Shader swaps and texture rewrites use a disk journal and recover on the next domain reload. Upload face-normal baking normally ends by destroying the build clone; if live shared materials remain, MingToon restores and saves their original floats and keywords per target.

If Manager status continues to show `Restore Required`, run `Restore After Interrupted Build` and inspect per-entry failures in the Console.

## Next

- Fixed distribution assets: [Manual Bake and Restore](/workflow/bake-and-restore)
- Platform checklists: [VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo)
