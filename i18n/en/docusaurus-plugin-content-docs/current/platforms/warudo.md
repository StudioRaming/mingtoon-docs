---
id: warudo
title: Warudo
sidebar_position: 3
---

# Warudo

**By the end of this guide** you can export with face shadows and depth effects working correctly in Warudo mode.

:::caution[Current Status]
Warudo is **under test and field verification is not complete.**
:::

## Reference Versions

| Item | Value |
|---|---|
| Unity | **2021.3.45f2** |
| Warudo Mod SDK | **0.14.3.10** |
| Render Pipeline | Built-in (BRP) |

:::danger[Cannot share a project with VRChat]
VRChat uses Unity **2022.3.22f1**, Warudo uses **2021.3.45f2**. You cannot support both from the same project — split by target.
:::

---

## Required Before Export — WARUDO Runtime Root {#내보내기-전-필수--warudo-runtime-root}

**Skipping this step means no face shadows or depth effects.**

Warudo does **not carry over editor scripts.** Therefore you need something separate to pass camera depth and head direction to the shader at runtime. That role is played by `MingToonWarudoRoot.cs`.

### Steps

1. **Place the included `MingToonWarudoRoot.cs` file in your character mod folder.**
   It must be in the **same folder** as your avatar assets. It needs to build alongside them.
2. Add the component to the character **root object**.
   `Add Component → Studio Raming / MingToon / WARUDO Runtime Root`
3. Build and export the mod normally.

<!-- SCREENSHOT: MingToonWarudoRoot.cs in mod folder with component attached -->

:::note[Almost no configuration needed]
It auto-detects the head bone — first looks for humanoid `Head`, then searches by `Head` / `J_Bip_C_Head` name.

If auto-detection fails, manually assign it in the `Head Bone` field.
:::

### What It Passes

This component passes the following to the shader every frame.

| Value | Purpose |
|---|---|
| Camera `DepthTextureMode.Depth` | Depth rim · 2D shadow · Inner 2D Edge |
| View camera position / matrix (VR: left/right eye each) | Screen-space calculations |
| Head forward · up · head center (world space) | Face shading direction |

It is an **independent file that does not depend** on MingToon editor runtime (`MingToonManager` etc.). So just place the one source file in the mod folder.

### Troubleshooting by Symptom

| Symptom | Cause |
|---|---|
| **Face shadow doesn't move and is fixed** | Component not attached or head bone not found |
| **Depth rim or 2D shadow not showing at all** | `.cs` file is not in mod folder |

:::info[Coming in the future]
Warudo plans **an update to toggle camera depth on.** When that lands, depth effects will work without this component.

**Until then, the above steps are required.**
:::

---

## Build

Running `Warudo > Build Mod` automatically applies [Automatic Optimization on Build](/workflow/build-optimization). No special configuration needed.

:::note[Why a separate hook was needed]
`Warudo/Build Mod` uses UMod's own pipeline (`ModToolsUtil.StartBuild`), so Unity's build callback (`IPreprocessBuildWithReport`) **does not fire.** Previously mods silently built with unoptimized materials. Now we register a processor and post-processor at UMod's extension points to handle it.
:::

### Build Scope

Mod builds optimize only the **build-target prefab**, not the entire scene. Sweeping the scene would swap unrelated materials left open by the author, and missing a prefab not in the scene would silently skip it.

Check Console after build for `MING_WARUDO_BUILD` logs and the optimization summary.

---

## Script Policy Differs from VRChat {#스크립트-정책이-vrchat과-다릅니다}

| | VRChat | Warudo |
|---|---|---|
| MingToon runtime components | **Automatically removed** on upload | **Preserved** |
| Runtime data supply | Depends on host (Photo Camera · world) | **`WARUDO Runtime Root` supplies directly** |

Warudo preserves scripts, so [MingToon Manager's](/workflow/character-manager) **editor runtime preview** (look profiles etc.) actually works here.

---

## Things to Know

- Set Unity version to **2021.3.45f2**. This is the Mod SDK baseline.
- Shader model 4.5 requirement is the same here. → [Supported Environments](/platforms/compatibility#하드웨어-요구-사항-필수)
- For staging where you cannot control scene lighting, raise `Preserve Base Map Color` and `Minimum Final Brightness`. → [Light & Shadow](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)
- If using multiple cameras (main + output), check depth effects separately for each.
