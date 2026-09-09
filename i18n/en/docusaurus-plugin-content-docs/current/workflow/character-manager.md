---
id: character-manager
title: MingToon Manager
sidebar_position: 1
---

# MingToon Manager

[Start with MingToon Manager](/getting-started/first-material)

**Add the component → assign Face Mesh and Skin Mesh → choose a look → choose colours or existing values → convert → Quick Settings.**

Keep Manager on the avatar root. After editing, uploading through VRC SDK or building the WARUDO mod automatically runs optimization baking.

[Follow the steps](/getting-started/first-material). Always keep Manager on the avatar root, including when editing its outfit. Use Manager to check updates too. **If installed through VCC, update MingToon in VCC.** Check the installation method before following update guidance in Manager. Leave face and skin roles empty when the outfit has neither.

Face SDF Studio is not yet released and is not required for this onboarding.

**After reading this document**, you can manage an avatar from start to finish — conversion · look · mesh bake · optimization · upload validation — all in one component.

Not one material at a time; **all avatar-level work** happens here.

## Attachment

Select the **root object** of the character you want to convert and

`GameObject > Studio Raming > MingToon > Add MingToon Manager`

You can also find `MingToon Manager` in Add Component. **Attach it to the root before proceeding with conversion.**

<!-- SCREENSHOT: MingToon Manager inspector overview -->

## Inspector Layout

The three workspaces are **Get Started · Look & Bake · Optimize**.

| Workspace | Task |
|---|---|
| Get Started | Assign Face/Skin, choose a factory look and color policy, convert or reapply to current materials, access MLC, build/upload and restore |
| Look & Bake | Choose a conversion look or material settings preset, bake/rebake a scope, and edit mesh channels and details |
| Optimize | Review automatic optimization and processing options |

The shared material-selection row above the tabs selects MingToon materials by role and is reachable from every workspace. For reapplication, also check **whole character / selected materials only**. Material settings presets target MingToon materials on this character. Follow the displayed distinction between global and per-character settings.

## Status Panel {#상태-패널}

When you open the manager, you see the current status first. Use `Refresh` to re-check.

| Display | Meaning |
|---|---|
| `MingToon N · Convertible N · Excluded N · Other N` | Material composition |
| `Shading` — `editable N · baked N` | Which materials are baked |
| `Face slots` | See below |
| `Optimize On Build / Upload` | Whether the hook is on |
| `Optimization scope` | See below |

:::danger[Face module keywords are mismatched]
`Face slots: M out of N face module keywords are out of sync with material values. Baking in this state will lose face shading.`

Click the `Sync Face Module` button to fix it. **Resolve before baking.**
:::

:::caution[Optimization scope is stale]
`Optimization scope covers only M out of N renderers. Cache is stale; the rest upload without optimization.`

After adding or removing clothing, press `Refresh Child Renderers`.
:::

---

## Get Started: conversion {#1--변환}

### Which shaders can be converted

**lilToon materials convert most completely.** You can convert from other shaders like Standard, URP Lit, etc.; in those cases, base color · texture · normal · emission · occlusion and render state are transferred, and the rest use MingToon defaults.

The inspector shows which rule it reads by: `Source schema: lilToon` or `Source schema: standard Unity material conventions`.

### Non-convertible slots {#변환되지-않는-슬롯}

Some materials are **intentionally left untouched in their original state.**

| Category | |
|---|---|
| Particle / VFX | Refraction / gem |
| Fur / shell | Audio-reactive |
| Flipbook / scroll / time-animated | Outline-only / overlay / auxiliary pass |

These are expressions MingToon cannot transfer directly. You can check the count of `Excluded` in the status panel.

:::caution[If all are excluded, the button does nothing]
If you see `N convertible slots are all non-convertible targets`, the convert button won't change anything.
:::

### Face · Skin assignment — most critical step {#얼굴--피부-지정--가장-중요한-단계}

:::danger[Auto does not infer from names]
`Auto` **only reads the face flag directly from the source material**.

Therefore, **if you convert from a shader with no flag, everything stays `Regular`.** Slots meant for faces must be **manually set to `Face`**.
:::

You can lock `Auto` / `Face` / `Skin` / `Regular` per slot, and assign face · eye · eyebrow roles separately within one renderer. The preview shows which of `Face shading` · `Skin look` · `Regular shading` applies.

You can also assign by renderer.

- `Direct Face Renderer`
- `Direct Skin Renderer` — materials in the renderers you specify here receive the **Skin values** from the look preset. **Bare skin only.**
- `Mark Roles on the Named Renderers`

:::caution[If clothing and hair share the same renderer]
Setting it as a skin renderer means clothes also receive Skin values. After conversion, in the per-slot list, **reset clothing slots back to `Regular`.**
:::

:::note[If you select multiple MingToon Managers]
Per-slot judgment is disabled. **Select one at a time.**
:::

### Look preset on convert {#변환-시-룩-프리셋}

In Get Started, choose the **factory look** first, then the **color preset**. A new selection defaults to **Basic Toon** and **Neutral**; a remembered choice may appear instead. There is no None option to skip the look.

The application order is **look → color**. Choose **Keep Existing Values** in the color selector to retain source-oriented colors. This still applies the look, then restores colors and the protected source-shadow band strength, boundaries, widths, and blending values. It does not reproduce every source-shader behavior or property exactly.

For converted materials, use **Apply to Current MingToon Materials** in Get Started. Check the whole-character or selected-material scope first. With no current MingToon materials there is no reapplication target; convert first.

The look routes values by Face/Skin/Common role and retains protected character-specific values such as surface identity and face proxies. The displayed last-applied preset is an editor-local record, not permanent material history.

If conversion fails for some materials, their original slots remain while other convertible materials continue. Read failure, exclusion and loss entries and inspect the remaining original slots. If only the look/color stage fails after a valid conversion, the converted values from before that stage are retained and an error is recorded. Some successful materials do not mean the entire operation succeeded.

### Mesh Channels to Bake Together {#함께-구울-메쉬-채널}

Bakes only the static channels needed immediately after conversion.

| Channel | Purpose |
|---|---|
| `Outline Smooth Normals (UV8)` | Prevent outline separation at hard edges |
| `Character Height Gradient (UV4)` | Height gradient relative to the character root |
| `Overwrite Occupied UV Channels` | Use only during reconversion after confirming ownership |

Face normals in 0.1.8 are calculated Live while editing, so **conversion no longer bakes UV7 by default.** During VRChat upload, they are baked only into the upload copy. When a texture face-region mask is required or Face SDF owns UV7, the Live path is kept to preserve the result.

Check ownership of UV4, UV7, and UV8 under `UV Channel Usage` first. → [Mesh UV Bakes](/guides/mesh-bakes)

### Recovery

Conversion records Renderers, Meshes, materials, Prefab overrides, and dirty state in a persistent journal. It writes the planned state before each persistent mutation, covering the crash window immediately after a change. The journal is written atomically under `ProjectSettings`; a backup repairs a damaged primary file, and a journal from the older `Library` location is migrated once. Recovery preserves later user changes instead of overwriting them. After eight failed automatic attempts, retry from `Tools > Studio Raming > MingToon > Advanced`.

`Restore Original Materials` **for the current slot only** reverts to the original material. Does not delete converted materials or mesh UV bakes.

:::caution[Restore is one undo step]
Undoing **may also discard direct edits made just before**.
:::

You can check converted pairs with `Audit Converted Pairs`. Finding original records takes time since it scans the whole project; it runs **only when clicked**.

---

## Shared targets and runtime settings {#2--setup}

| Item | Task |
|---|---|
| `Scope` · `Include Inactive Children` | How far down to consider this character |
| `Refresh Child Renderers` | Run after changing clothing |
| `Select All MingToon Materials` | Pass to [bulk editing](/guides/bulk-editing) |
| `Select Face Materials Only` · `Select Face + Skin Only` · `Select Common Only` | Pick by role |

### Editor Runtime Preview

:::caution[Does not ship to VRChat]
These two groups work only in script-retaining environments such as the Editor and Warudo. In VRChat, the components are marked `IEditorOnly`, but automatic deletion is not guaranteed. Verify that the actual build clone contains zero MingToon runtime components after SDK processing, and do not expect these runtime results to define the avatar's appearance.
:::

`Use Look Profile` · `Preview In Edit Mode` · `Look Profile`

### Runtime Face Direction

Turn on `Publish Head Direction` to pass head bone direction to the shader; face shading follows the head.

- `Head Bone` — auto-detect if empty
- `Auto-Detect Head Axes` · `Head Local Forward` · `Head Local Up`

:::note[Warudo Does Not Need a Separate Runtime Root]
Warudo mode retains the MingToon Manager component. Do not attach a separate Runtime Root to the prefab. Depth effects such as 2D Rim, 2D Shadow, and SSAO require the global Playground plugin `MingToonWarudoDepthBridge.cs`, not a character component. → [Warudo Depth Bridge](/platforms/warudo#warudo-depth-bridge)
:::

---

## Look & Bake: details {#3--details}

`Standalone Mesh Bakes` are needed only when the stage 1 conversion checkbox was disabled or that bake failed. Already-filled channels are rejected unless `Overwrite` is enabled.

`Character Height UV4` and `Outline Smooth Normals UV8` can be run individually. Face normals are Live by default. If `_FaceNormalBaked` remains from an older conversion and proxy adjustments do not appear, run `Return Face Normals to Live`. It clears the material's baked flag and an incorrect Face SDF UV7 selection in one Undo step. → [Mesh UV Bakes](/guides/mesh-bakes)

---

## Look / Face

Use **Apply to Current MingToon Materials** in Get Started to reapply the chosen look and color policy. The **Conversion look** surface in Look & Bake also provides reapplication. **Material settings preset** is a separate type: check its target and included values. Selecting an option and pressing Apply are separate actions.

### Face SDF

`Open Front-View SDF TEXCOORD6 (Unity UV7) Baker`

:::note[Face SDF Studio Is a Separate Product]
When installed, this button opens Studio. When it is not installed, purchase and installation guidance appears. MingToon Face Shading and Base UV face SDF remain usable without Studio.
:::

→ [Face SDF Authoring](/guides/face-sdf)

---

## Build and upload preparation {#4--출하}

### Optimization / Bake

:::tip[Most cases can skip this]
VRChat upload and Warudo mod builds automatically apply [Automatic Build Optimization](/workflow/build-optimization), and materials remain editable.
:::

`Lightweight Shader Bake (Editor Only)` · `Preserve Animatable Passes (Safe)`

:::caution[Texture Optimization Is a Project-Wide Setting]
Options marked global apply to every project and character in this Unity Editor environment. Distinguish them from per-character options. Follow the current option descriptions for texture processing and source preservation.
:::

→ [Manual Bake and Restore](/workflow/bake-and-restore)

---

### VRChat Upload Preparation {#vrchat-표현식-메뉴}

MingToon Manager does not install VRChat Expressions menus, parameters, or FX. Keep the Manager on the Avatar Root so it can check conversion, look, and optimization state; automatic optimization is applied only to the build clone created by the VRChat SDK. Existing Expressions content and menus from other tools remain your responsibility to verify.

1. Select `MingToon Manager` under the Avatar Root.
2. Click `Rediscover Child Renderers` to refresh the current clothing and Renderer scope.
3. Run `Readiness Check` and `VRChat Preflight Check`, then resolve their errors.
4. Upload through VRChat SDK Builder. The normal path does not require a manual bake first.
5. On the SDK-created build clone, verify `RuntimeComponentCount = 0`. This diagnostic counts authoring MingToon components under the build root; it does not count SDK or runtime components. Check the final Expressions menus, parameters, and FX authored by you or installed by other tools separately.
6. After upload, check your own view, mirrors, and Photo Camera separately.

If something fails, start with the Console error and upload readiness steps in [Troubleshooting](/troubleshooting).

---

### Export / Validate {#내보내기--검증}

#### Upload Readiness {#업로드-준비-점검}

`Run Readiness Check` — scans hierarchy and manifest, so it **runs only when clicked**.

Results are `Nothing blocks the upload. N warning(s).` or `N error(s) block the upload. N warning(s).`, with inspection scope (`renderers · materials · editable · baked`) shown. Each item's `Show` button takes you straight to that object.

Key diagnostic items:

| Category | Items |
|---|---|
| **Bake** | No bake manifest · No record in manifest · Older generator version · Source changed after bake · Source material not found |
| **Bake Context** | Bake predates character dependency tracking · Animation or look profile changed after bake · Baked manager not found |
| **Generated Shader** | Missing · Mismatch with record · Compile error |
| **Component** | MingToon runtime component present · Component with missing script present |
| **Face SDF** | SDF UV not baked · SDF texture missing · Ready but face module off |
| **Other** | Host needs depth texture · Animation binding uses legacy name |

You can also run [Validate Project](/reference/validator) here with `Run Project Validator`.

:::note[Depth Auto Does Not Change on Upload]
`Auto` directly reads the bound depth texture and Photo Camera state and is not promoted to `Force On` during upload. If the main view needs depth, review the cost of the separate `Include Depth Light on Upload` opt-in. → [Automatic Build Optimization](/workflow/build-optimization#vrchat-깊이-자동-승격)
:::

#### VRChat Preflight

`Rule version · validated Unity` is shown, and checks:

- **Missing standard properties** — fallback needs them to inherit values. Update with `Sync Fallback Properties`.
- **Component count** VRChat disallows

→ [VRChat Compatibility Rules](/internals/vrc-rules)

#### Quest / Android

`MingToon does not support Quest (Android) builds.` If you plan a Quest variant, **assume all features below are missing.**

`Lost on Quest` — counts actual instances: `outline N · transparent N · depth effects N`.

#### Script Removal Check

:::danger[Do Not Delete MingToon Components Manually]
Do not remove MingToon components from the authoring Scene. Deleting Manager removes the cached Renderer list and makes upload optimization lose its scope. These components are marked `IEditorOnly`, but automatic deletion is not guaranteed, so verify `RuntimeComponentCount = 0` on the actual build clone after SDK processing. This value counts authoring MingToon components; it is not a count of all SDK or runtime components.

Warudo mode follows **a separate script-retaining** rule. This panel only checks.
:::

---

## Full workflow summary

Avatar-root Manager → Face/Skin assignment → factory look → Neutral or Keep Existing Values → convert or Apply to Current MingToon Materials → inspect results and scope → quick settings/mesh baking as needed → SDK upload/WARUDO build

Existing MingToon materials can receive the selection without conversion again. Check failed/excluded slots, the target scope and build settings before upload.

No separate Runtime Root is required for Warudo export. If you use depth effects, install [Warudo Depth Bridge](/platforms/warudo#warudo-depth-bridge) in Playground.
