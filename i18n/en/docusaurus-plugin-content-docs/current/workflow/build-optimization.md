---
id: build-optimization
title: Automatic Optimization On Build
sidebar_position: 2
---

# How automatic optimization on build works

> This page is an explanation. If you want to upload right now, see [VRChat](/platforms/vrchat).

## In one line

Automatic optimization is on by default. There is nothing for you to do.

It makes the upload and build copy lighter, and returns your working materials to an editable state.

## Confirming it applied {#제대로-걸렸는지-확인하기}

1. Get the C# and shader errors in the Console to zero.
2. Check the environment conditions with `StudioRaming > MingToon > Validate Project`.
3. Check the candidate count, swap count and face normal bake count in the build log.
4. Open `StudioRaming/MingToonOptimizeReport.txt` next to the project folder.
5. On VRChat, check your own view, a mirror and the Photo Camera separately.

In a VRChat project, `[MingToon] VRChat build hook compiled and registered.` appears in the Console once per session.

![The MingToon Manager's Optimize tab showing the automatic upload optimization settings group](/img/placeholder.png)
<!-- CAPTURE: workflow/build-optimization-01-optimize-tab.png | 밍툰 매니저 「최적화」 탭의 「업로드 자동 최적화 설정」 그룹 전체. 토글 3개가 보이는 상태 | 1200x700 -->

## Where to turn it on and off

All three are under **Automatic upload optimization** in the MingToon Manager's `Optimize` tab. The top toggle also appears under `4. Build & upload automation` in the `Get Started` tab.

| Item | Default | What it does |
|---|---|---|
| **Optimize On Build / Upload (Applies To Everything)** | On | Turns this whole feature on and off. It applies to the entire editor environment |
| **Allow build, shader and mesh hooks in Play mode (opt-in)** | Off | Runs the hooks on the Play build copy as well |
| **Reviewed Texture Rewrites On Build (Opt-In)** | Off | Additionally permits reviewed texture reprocessing |

You also choose a method per avatar. **Build / upload optimization method for this avatar** appears in both tabs.

| Method | When |
|---|---|
| **FastUpload (recommended)** | The default. It uses a shared shader to shorten upload time |
| **Legacy GPU precise optimization** | Only when you need the older per-material bake |

## What happens

1. It collects the MingToon materials referenced by shipping Renderers and AnimationClips.
2. It analyzes which features are actually used and which values are animated.
3. It creates a lightweight shader with fixed features folded to constants, or pulls one from the cache.
4. It swaps the materials' shaders to the lightweight ones for the duration of shipping.
5. It runs the platform-specific extra processing.
6. It returns everything to its original state when it finishes, fails, or a domain reload happens.

Generated shaders keep the same property contract as the editing shaders.

Values that only change during a build are not folded into constants.
A successful build remembers the generated profile and source cache and reuses them on the next build of the same avatar.
How much faster a warm build feels depends on the scene and shader-cache environment.

### Extra processing on VRChat avatars {#vrchat-추가-처리}

- It leaves the **Depth Availability** value alone. Auto ships as Auto.
- It bakes face normals into UV7 of the upload copy's Mesh.
- Renderers whose Face SDF uses UV7 keep the Live path for the same result.
- It applies the per-slot-kind texture resolution limits to the upload copy.
- It turns on the VRC Light Volumes variant automatically.
- It preflights mask input receipts before a manual bake or upload. An unprepared input skips only that mask optimization.
- It marks MingToon runtime components as `IEditorOnly`. Deletion is not guaranteed.

The face normal upload output uses a different path from the editing mesh bake. It does not overwrite the editing Mesh.

### It does not touch animated values {#애니메이션되는-값은-건드리지-않습니다}

The analyzer follows AnimationClips, Animator Controllers and nested fields on components. Features you will switch at run time need the inspector opt-in on so they are not folded to constants.

- **Switch Depth Effects From FX**
- **Switch Shadow Projection From FX**
- **Use VRC Runtime Controls**

An opt-in keeps the switching possible but also keeps the related code. Turn it on only for materials you will actually change.

### The VRChat depth Auto contract {#vrchat-깊이-자동-승격}

`Auto` reads the depth texture and Photo Camera state directly, per camera. The upload hook does not rewrite this value, so Auto ships as Auto.

An avatar that needs depth carries a depth light instead. The material values are not changed.
→ [VRChat depth light](/platforms/vrchat#vrchat-깊이-라이트)

Mirror blocking is separate. Even with Force On, depth modules are off in mirrors.
→ [How far depth effects are guaranteed](/platforms/vrchat#깊이-효과가-어디까지-보장되나)

## Texture resolution limits {#텍스처-최적화}

**Texture Resolution Limits (On Upload)** is a project-wide setting. It is stored in the Editor preferences rather than a scene or prefab, and applies to every character in this project.

You set a maximum resolution per slot kind, such as base, normal, matcap and mask. It only shrinks the upload copy and does not change the original files or their import settings.

### The texture rewrite opt-in

**Reviewed Texture Rewrites On Build (Opt-In)** is off by default. Turn it on to permit surface and normal flattening and reviewed mask repacking.

:::caution[If you turned it on, compare before and after by eye]
Reading, color space, mips and platform compression can change the pixels.
:::

Mathematically lossless deduplication keeps applying even with this option off.

## The constraints that follow

### Recoverable failures are isolated and fatal ones stop the build

A recoverable error, such as analysis failing on one material, returns just that material to editing and leaves a warning. An error that makes result consistency impossible aborts the build.

Saving only applies to assets MingToon changed. It does not save unrelated assets along with them.

### If the editor exited mid-build

Shader swaps and texture rewrites are recorded in a journal on disk. They are recovered automatically at the next domain reload, and if that still fails, check the per-item failures in the Console.

Discard a leftover recovery journal with the menu below.

`StudioRaming > MingToon > Advanced > Discard Pending Generated Shader Recovery Journal`

:::danger[This command only discards recovery information]
It does not revert generated shaders left by an aborted bake. The next bake creates them again.
:::

### When you do need a manual Bake

| Situation | Automatic optimization | Manual Bake |
|---|---|---|
| VRChat upload | Sufficient | Not needed |
| WARUDO mod build | Sufficient | Not needed |
| Handing over baked material assets directly | Not possible | Needed |
| Comparing and approving results in the scene | Not possible | Needed |

## Entry points by platform

| Platform | Entry point |
|---|---|
| VRChat avatar | VRC SDK build callback |
| WARUDO mod | UMod build processor |
| General Player | Unity build preprocess callback |

The VRChat hook runs late. It analyzes the final state after Modular Avatar or VRCFury has processed the materials.

## Related pages

- Cleaning the generated shader cache: `StudioRaming > MingToon > Advanced > Clean Build Optimization Output`
- Fixed distribution assets: [Manual Bake and Restore](/workflow/bake-and-restore)
- Platform checklists: [VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo)
- If you have errors: [Troubleshooting](/troubleshooting#vrchat)
