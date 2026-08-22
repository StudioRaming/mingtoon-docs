---
id: warudo
title: Warudo
sidebar_position: 3
---

# Warudo

**After finishing this guide,** you can install Warudo mod-build optimization and camera-depth delivery in their correct, separate locations.

:::caution[Support Status]
Warudo is supported, but its on-device regression coverage is narrower than VRChat's. Open the final mod in Warudo and check the main output plus every Spout and NDI camera you use.
:::

## Reference Versions

| Item | Value |
|---|---|
| Unity | **2021.3.45f2** |
| Warudo Mod SDK | **0.14.3.10** |
| Render Pipeline | Built-in (BRP) |

:::danger[Do Not Share a VRChat Project]
VRChat uses Unity **2022.3.22f1**, while Warudo uses **2021.3.45f2**. Keep separate projects for each target.
:::

---

## Camera Depth Setup — WARUDO Depth Bridge {#warudo-depth-bridge}

Screen-depth effects such as 2D Depth Rim, 2D Shadow, Inner 2D Boundary, and SSAO require a depth texture from the Warudo camera. The 0.1.7 package includes the source for an independent Warudo plugin that provides it.

### Installation

1. In the Unity project, locate `Assets/StudioRaming/MingToon/Docs/Warudo/MingToonWarudoDepthBridge.cs.txt`.
2. Copy it to `Warudo_Data/StreamingAssets/Playground` under the Warudo installation folder.
3. Remove `.txt` from the filename so it becomes `MingToonWarudoDepthBridge.cs`.
4. After Warudo reloads the Playground plugin, confirm `[MingToon Warudo Depth Bridge] installed` in the Console.

:::important[This Is Not a Character-Prefab Component]
This file is a global plugin that runs from the Warudo application's Playground. Do not place it in the character mod folder or add a component to the prefab. Instructions for the old `MingToonWarudoRoot` approach are retired in the 0.1.7 documentation.
:::

### What It Provides

Immediately before rendering, the plugin checks every active `Game` camera.

- Requests `DepthTextureMode.Depth` on each camera.
- Sends center-, left-, and right-eye world-to-view matrices to global shader values.
- Handles active Spout, NDI, and transition cameras individually, not only the main screen.
- Uses the camera that is actually rendering instead of caching a single `Camera.main` when cameras change.

The plugin does not depend on the MingToon runtime assembly. It ships as a standalone file so it still works when a Warudo project excludes scripts under an asmdef from the mod.

### Diagnose by Symptom

| Symptom | Check |
|---|---|
| Every depth effect is empty | Confirm the Playground path, the `.cs` extension, and the `installed` log |
| Main screen works but Spout or NDI differs | Check the `depth enabled for camera=...` log for that output camera |
| Normal Outline works but inner lines do not | Normal Outline needs no depth, so check whether the Bridge loaded first |

---

## Building a Warudo Mod

Running `Warudo > Build Mod` makes MingToon's UMod build hook apply automatic optimization. It uses UMod's processor/post-processor path, not Unity's regular `IPreprocessBuildWithReport`.

### Scope

- When possible, finds the build root from the GameObject assets exported by UMod and optimizes **only that character**.
- Adds generated shaders and textures to the UMod build asset list.
- Restores authoring materials after the build finishes or fails.
- If the export root cannot be determined, falls back to MingToon materials in loaded scenes and warns in the Console.

Confirm the `[MingToon] Auto optimize` summary and `[MingToon] Restored authored materials.` after the build. If an error or restoration failure appears, do not use that build; resolve the cause first.

:::note[Manual Bake Is Not the Default Workflow]
Warudo export also uses automatic build-time optimization. Unless you specifically need baked material assets, you do not need to run [Manual Bake](/workflow/bake-and-restore) first.
:::

---

## Lighting Differences

- `VRC Light Volumes` is for VRChat worlds. Disable it in Warudo and use Unity Light Probes and scene lighting.
- Built-in point and spot additional lights use the ForwardAdd pass. Adjust them with the material's `Receive Additional Lights`, `Additional Light Strength`, and toon-boundary settings.
- In WARUDO Built-in, `Visible in Cast Shadow` and `Visible in 2D Shadow` do not filter the inner-reflection contribution made by point and spot additional lights.
- When using several cameras, verify depth effects and transparent sorting separately in each output.

## Export Checklist

- Used Unity 2021.3.45f2 and the Built-in shader.
- Installed `MingToonWarudoDepthBridge.cs` in Warudo Playground.
- The `Warudo > Build Mod` Console contains no optimization or restoration errors.
- Checked 2D Depth Rim, 2D Shadow, and Inner Boundary in the main view and actual broadcast cameras.
- Adjusted `Preserve Base Color` and `Minimum Final Brightness` if scene lighting is difficult to control.

## Next

[Automatic Build Optimization](/workflow/build-optimization) · [Depth-Based Effects](/guides/depth-effects) · [Light and Shadow](/guides/light-and-shadow)
