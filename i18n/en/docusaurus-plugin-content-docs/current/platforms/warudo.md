---
id: warudo
title: Warudo
sidebar_position: 3
---

# Warudo

> This page is for people using a MingToon character in WARUDO.
> It covers installing the depth supply plugin and checking the mod build.

## Reference versions

| Item | Value |
|---|---|
| Unity | **2021.3.45f2** |
| WARUDO Mod SDK | **0.14.3.10** |
| Render pipeline | Built-in (BRP) |

:::danger[It cannot share a project with VRChat]
VRChat uses Unity 2022.3.22f1 and WARUDO uses 2021.3.45f2. Split the projects by target.
:::

---

## Installing camera depth — WARUDO Depth Bridge {#warudo-depth-bridge}

Depth rim light, depth shadow, the inner outline and SSAO need the WARUDO camera's depth texture.

The package includes the source of a standalone plugin that supplies that depth.

### This installs into WARUDO itself, not into the character

:::caution[It is not a component you attach to a prefab]
This file is a global plugin that runs in the WARUDO application's Playground.
Do not put it in the character mod folder or add it to a prefab as a component.
:::

### Installation

1. In the Unity project, find `Assets/StudioRaming/MingToon/Docs/Warudo/MingToonWarudoDepthBridge.cs.txt`.
2. Copy this file into `Warudo_Data/StreamingAssets/Playground` in the WARUDO install folder.
3. Remove the trailing `.txt` from the file name so it becomes `MingToonWarudoDepthBridge.cs`.
4. Restart WARUDO and confirm the `[MingToon Warudo Depth Bridge] installed` log in the Console.

If `MingToon Warudo Depth Bridge` shows in the plugin list, it worked.

![File Explorer with MingToonWarudoDepthBridge.cs inside Warudo_Data/StreamingAssets/Playground in the WARUDO install folder](/img/placeholder.png)
<!-- CAPTURE: platforms/warudo-01-playground-folder.png | Warudo_Data/StreamingAssets/Playground 폴더에 MingToonWarudoDepthBridge.cs가 있는 탐색기 + 옆에 WARUDO 플러그인 목록 | 1200x700 -->

### What it supplies

The plugin checks the active Game camera right before every render.

- It requests a depth texture on each camera.
- It passes the center, left-eye and right-eye view matrices as shader globals.
- It handles not only the main screen but also active Spout, NDI and transition cameras, per camera.
- Even when cameras change, it does not cache one and uses the camera actually rendering.

The plugin does not depend on the MingToon runtime assembly. That is why it ships as a standalone file.

### Checking by symptom

| Symptom | What to check |
|---|---|
| All depth effects are empty | The Playground path, the `.cs` extension, the `installed` log |
| The main screen is fine but Spout and NDI differ | The `depth enabled for camera=` log for that output camera |
| Only the normal outline shows and there are no inner lines | The normal outline does not need depth. Start from whether the Bridge loaded |

→ [Troubleshooting — WARUDO](/troubleshooting#warudo)

---

## WARUDO mod build

Running `Warudo > Build Mod` makes MingToon's build hook apply automatic optimization.

It uses UMod's processor path, not Unity's general build callbacks.

### Scope

- It finds the build root among the GameObjects UMod exports and optimizes only that character.
- It adds the generated shaders and textures to the UMod build asset list.
- It restores the authoring materials when the build finishes or fails.
- If it cannot determine the export root, it falls back to the MingToon materials in the loaded scenes and leaves a warning.

### Logs to check

| Log | Meaning |
|---|---|
| `[MingToon] Warudo mod build processor entered` | The hook ran |
| `[MingToon] Applied auto optimize and registered N generated assets.` | The optimization was applied |
| `[MingToon] Restored authored materials.` | It returned to the authoring state |
| `[MingToon] Could not restore authored materials.` | Restore failed. Do not use this build |

:::note[A manual Bake is not the standard procedure]
WARUDO export also uses automatic optimization on build. Use a manual Bake only when you need the baked material assets themselves.
:::

→ [Manual Bake and Restore](/workflow/bake-and-restore)

### Depth light

A WARUDO build also carries the depth light when it uses depth effects.

You can force it out with **Remove depth light on build** in the MingToon Manager.
→ [VRChat depth light](/platforms/vrchat#vrchat-깊이-라이트)

---

## Lighting differences

- **VRC Light Volumes (Test)** is for VRChat worlds. Turn it off in WARUDO and use Unity Light Probes.
- Built-in point and spot additional lights come in through the ForwardAdd pass.
- If additional lights are strong, adjust with **Additional Light Receive** and **Additional Light Intensity**.
- If you use several cameras, check depth effects and transparency sorting per output.

:::caution[ForwardAdd does not get the shadow filter]
In WARUDO Built-in, the in-shadow reflection created by additional lights is not filtered.
For the detailed conditions, see the [Rim reference](/reference/rim).
:::

## Export checklist

1. Use Unity 2021.3.45f2 and the Built-in shaders.
2. `MingToonWarudoDepthBridge.cs` is installed in Playground.
3. The `Warudo > Build Mod` Console has no optimization or restore errors.
4. Check depth effects on the main screen and on the actual output camera.
5. If the scene lighting is hard to control, adjust **Preserve Base Map Color** and **Minimum Final Brightness**.

## Next

[Automatic Optimization On Build](/workflow/build-optimization) · [Depth Effects](/guides/depth-effects) · [Light and Shadow](/guides/light-and-shadow)
