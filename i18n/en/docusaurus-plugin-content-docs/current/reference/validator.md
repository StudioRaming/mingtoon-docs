---
id: validator
title: Validate Project Code
sidebar_position: 8
---

# Validate Project Code

All codes reported by `Tools > Studio Raming > MingToon > Validate Project`. Search by code.

:::note[This check is read-only]
It doesn't fix or delete anything. Reports only; you take action.
:::

<!-- SCREENSHOT: Validate Project results window -->

---

## Environment

### MING-ENV-UNITY-VERSION

**Error.** The editor stream is outside the supported range.

Supported streams are **2021.3** and **2022.3** both. Outside this range, shader compilation results differ and looks may break or change.

**Fix** — Open the project in 2021.3 or 2022.3 editor from Unity Hub. Per-target recommendations are in [Supported Platforms](/platforms/compatibility#unity-버전).

### MING-VRC-UNITY-VERSION {#ming-vrc-unity-version}

**Warning.** VRC SDK is present but the editor isn't the VRChat-validated stream (2022.3.22f1).

> MingToon's VRChat integration **compiles only in 2022.3 stream**, so this project has **no avatar upload support.** Other targets are unaffected.

**Fix** — For a VRChat avatar project, move to 2022.3.22f1. If VRChat isn't your target, ignore this.

Reference: [VRChat Current Unity Version](https://creators.vrchat.com/sdk/upgrade/current-unity-version/)

### MING-ENV-BUILD-TARGET

**Error.** The current build target doesn't guarantee Shader Model 4.5.

All MingToon passes declare `#pragma target 4.5`. On these targets, **the SubShader is rejected entirely and all MingToon materials render magenta in the build.**

**Fix** — Go to `File > Build Settings` and change the platform back to Windows / macOS / Linux. Android/Quest, iOS, WebGL are unsupported.

---

## Render Pipeline

### MING-PIPELINE-UNSUPPORTED

**Error.** Unsupported render pipeline asset. MingToon supports only Built-in RP and version-pinned URP backends, so **no MingToon material renders here.**

**Fix** — Point a URP asset in `Project Settings > Graphics` and the active Quality level, or leave it empty for Built-in.

### MING-URP-VERSION-UNSUPPORTED

**Error.** The installed Universal RP package is out of supported range. The URP backend compiles for that range, so outside it, materials fail to compile or render without outlines.

**Fix** — In `Window > Package Manager > Universal RP`, install a supported version, or revert the project to Built-in.

---

## Shader

### MING-SHADER-MISSING

**Error.** MingToon shader not found in the project. No material can render with it.

**Fix** — Reimport `Assets/StudioRaming/MingToon/Shaders` and read shader compile errors in Console. For URP projects, also check that the URP backend folder imported.

### MING-SHADER-UNSUPPORTED

**Error.** This editor or GPU doesn't support the shader, so **all materials using it render magenta.**

**Fix** — Select the shader asset and read compile error at the top of the inspector. Check `Project Settings > Player > Other Settings > Graphics APIs` supports Shader Model 4.5 (Direct3D11 or higher).

### MING-SHADER-PASS-MISSING

**Error.** The shader lacks a render pass this backend requires.

:::danger[Silently stops]
**Outline, cast shadow, and depth prepass stop rendering, but controls stay editable.** Changing values does nothing.
:::

**Fix** — Recover `Assets/StudioRaming/MingToon/Shaders` from the release package and verify materials use shaders matching the project's render pipeline.

### MING-SHADER-PROPERTY-MISSING

**Error.** The shader doesn't declare a property this editor version requires. Missing blend-mode properties mean **the blend mode and opacity dropdowns next to color do nothing.**

**Fix** — Recover the Shaders folder from the release package and validate again.

---

## Material

### MING-MAT-NON-FINITE

**Error.** The material has non-finite numbers (NaN / Infinity). Can corrupt all lighting and screen-space math.

**Fix** — Restore that property to a normal value before rendering or baking. The report names it.

### MING-MAT-COLOR-MASK-ZERO

**Error.** `_ColorMask` is 0, so the **mesh renders and occludes but writes nothing to screen.**

**Fix** — In `Surface Rendering > Advanced Color Buffer`, set `Color Mask` back to RGBA(15).

### MING-MAT-OPAQUE-ZWRITE-OFF

**Error.** Opaque render queue but not recording depth (`_ZWrite` is 0). **Sorting vs other opaques becomes random, and all camera depth effects read through this mesh.**

**Fix** — In `Surface Rendering > Advanced Color Buffer`, turn `Depth Write` On, or pick the transparent surface mode you actually want.

### MING-MAT-TRANSPARENT-DEPTH-EFFECTS

**Error.** Using camera depth effects in transparent queue. Sorting and self-depth become unstable, so **depth rim and 2D shadow flicker or read surfaces behind.**

**Fix** — Turn off both modules on this material, or switch surface mode to Opaque / Cutout. If transparency is needed, use `Transparent · Outline Depth Ready`. → [Basics](/guides/basics#1-표면-모드부터-정합니다)

### MING-MAT-CUTOUT-CUTOFF-ZERO

**Error.** Cutout but `Alpha Cutoff` is 0, so **nothing cuts.** Fully transparent texels record shadow depth, so the **mesh casts a solid rectangular shadow.**

**Fix** — Raise `Alpha Cutoff` above 0 (0.5 is a common start). Or pick a different surface mode.

---

## URP Renderer Features

### MING-URP-DEPTH-FEATURE-MISSING

**Error.** URP material uses depth rim or 2D shadow but the Renderer Feature is missing, so **both effects draw nothing.** Three cases:

| Situation | Fix |
|---|---|
| MingToon URP backend assembly didn't load | Install URP version in supported range |
| Active URP asset has no renderer data | Add Universal Renderer Data to Renderer List on URP asset, then run the menu below |
| Renderer data has the feature disabled | `Tools > Studio Raming > MingToon > URP > Install Depth Effects Renderer Feature` |

:::caution[All renderers in the active URP asset need the feature]
Install on one renderer only and the effect won't draw on others while controls stay editable.
:::

### MING-URP-OUTLINE-FEATURE-MISSING

**Error.** Same structure as above, target is the outline pass. **Outline doesn't draw.**

**Fix** — `Tools > Studio Raming > MingToon > URP > Install Outline Renderer Feature`.

---

## Runtime

### MING-RUNTIME-PROVIDER-MISSING

**Error.** Built-in RP depth provider not found or changed shape. No camera gets depth texture request, so **depth rim, 2D shadow, depth-based outline stay empty regardless of settings.**

| Detail | Means |
|---|---|
| No type | MingToon runtime script missing or compile failed |
| Not Component-derived | Runtime was modified |
| Required method missing | Runtime was modified |

**Fix** — Reimport `Assets/StudioRaming/MingToon/Runtime` and clear compile errors. If you edited it, recover from the release package.

---

## Scene / Camera

### MING-SCENE-NO-CAMERA

No Game camera loaded, so 2D effects can't verify the camera depth state.

**Fix** — Open the actual working scene or create a LookDev scene, then validate again.

### MING-SCENE-CAMERA-DEPTH-OFF

Game camera has depth texture off.

**Fix** — Place `Studio Raming/MingToon/Depth Texture Provider` in the scene. → [Depth Effects](/guides/depth-effects#플랫폼별-깊이-확보)

---

## Screen looks wrong but no code appears

Validator checks only **statically verifiable** things. These can happen even after validation passes.

| Symptom | Doc |
|---|---|
| Changing values has no effect | [Troubleshooting — Nothing works](/troubleshooting#아무-값도-안-먹힌다) |
| Depth effects missing in VRChat desktop | [VRChat](/platforms/vrchat#깊이-효과가-어디까지-보장되나) |
| Outline breaks at sharp edges | [Mesh UV Bake](/guides/mesh-bakes#아웃라인-스무스-노멀-uv8) |
