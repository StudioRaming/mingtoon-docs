---
id: character-manager
title: MingToon Manager
sidebar_position: 1
---

# MingToon Manager

**After reading this document**, you can manage an avatar from start to finish — conversion · look · mesh bake · optimization · upload validation — all in one component.

Not one material at a time; **all avatar-level work** happens here.

## Attachment

Select the **root object** of the character you want to convert and

`GameObject > Studio Raming > MingToon > Add MingToon Manager`

You can also find `MingToon Manager` in Add Component. **Attach it to the root before proceeding with conversion.**

<!-- SCREENSHOT: MingToon Manager inspector overview -->

## Inspector Layout

| Stage | Task |
|---|---|
| **1 · Convert** | Different shader → MingToon, face/skin assignment, mesh channel bake |
| **2 · Setup** | Target scope, editor runtime preview, runtime face direction |
| **3 · Advanced** | Individual mesh bakes, etc. |
| **Look / Face** | Apply look presets |
| **Optimize / Bake** | Lightweight shader bake |
| **Export / Validate** | Upload readiness check · VRChat preflight · Quest check |

**Quick actions** and **status panel** always appear at the top.

---

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

## 1 · Convert {#1--변환}

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

### Look preset on convert

Fill in look values at the same time as conversion.

:::danger[The preset overwrites ~500 values]
`The preset overwrites ~500 numeric and color values in the material immediately after conversion. If you've edited values before converting, choose None.`
:::

Materials judged as faces receive face values, those judged as skin receive skin values, and the rest get common values. SDF framing · bake results · texture presence — values that differ per character — are not in the preset.

`Last applied by this editor` is shown, so you can check what was applied later.

### Mesh channels to bake together {#함께-구울-메쉬-채널}

Automatically bakes checked channels right after conversion.

| Channel | Purpose |
|---|---|
| `Outline Smooth Normals (UV8)` | Prevent outline breaks at sharp edges |
| `Face Front-View Normals (UV7)` | Keep face shadows clean at nose/eyelids |
| `Character Height Gradient (UV4)` | Height-based color gradient |
| `Overwrite Occupied UV Channels` | **Enable only when re-converting** |

Leave defaults and it bakes automatically. → [Mesh UV Bake](/guides/mesh-bakes)

:::caution[UV7 cannot be shared]
`UV7 is used by both face normal bake and face SDF projection. Only one can own it, so if you plan to use SDF, turn off face normal bake.`
:::

`UV Channel Occupancy` shows which of `UV4 · UV7 · UV8` are free or in use.

### Recovery

`Restore Original Materials` **for the current slot only** reverts to the original material. Does not delete converted materials or mesh UV bakes.

:::caution[Restore is one undo step]
Undoing **may also discard direct edits made just before**.
:::

You can check converted pairs with `Audit Converted Pairs`. Finding original records takes time since it scans the whole project; it runs **only when clicked**.

---

## 2 · Setup

| Item | Task |
|---|---|
| `Scope` · `Include Inactive Children` | How far down to consider this character |
| `Refresh Child Renderers` | Run after changing clothing |
| `Select All MingToon Materials` | Pass to [bulk editing](/guides/bulk-editing) |
| `Select Face + Skin Only` · `Select Common Only` | Pick by role |

### Editor Runtime Preview

:::caution[Does not ship to VRChat]
`This group works only in script-retaining environments like the editor and Warudo. This component is removed on VRChat upload, so results made here do not ship to the avatar.`
:::

`Use Look Profile` · `Preview In Edit Mode` · `Look Profile`

### Runtime Face Direction

Turn on `Publish Head Direction` to pass head bone direction to the shader; face shading follows the head.

- `Head Bone` — auto-detect if empty
- `Auto-Detect Head Axes` · `Head Local Forward` · `Head Local Up`

:::note[Warudo export needs a separate component]
This setting is for editor and Warudo environments. **When building in Warudo mode, attach `WARUDO Runtime Root` separately.** → [Warudo](/platforms/warudo#내보내기-전-필수--warudo-runtime-root)
:::

---

## 3 · Advanced

`Standalone Mesh Bakes` — only needed if you unchecked the bake in step 1 conversion or a bake failed. Already-filled channels are rejected unless `Overwrite` is on.

`Character Height UV4` · `Outline Smooth Normal UV8` · face front-view normal can be run individually. → [Mesh UV Bake](/guides/mesh-bakes)

---

## Look / Face

Apply look presets to converted materials.

If not yet converted, `No MingToon materials yet. Run step 1 conversion first, then apply look presets here.` is shown.

### Face SDF

`Open Front-View SDF TEXCOORD6 (Unity UV7) Baker`

:::note[Separate package]
If `Face SDF Baker is not installed`, you must install a **separate editor package** from Studio Raming before this button opens.
:::

→ [Face SDF Authoring](/guides/face-sdf)

---

## Optimize / Bake

:::tip[Most cases can skip this]
VRChat upload and Warudo mode build automatically apply [build-time optimization](/workflow/build-optimization), and materials stay editable.
:::

`Lightweight Shader Bake (Editor Only)` · `Preserve Animatable Passes (Safe)`

:::caution[Texture rewrites are separate]
`The check below applies only to bakes run directly in this panel.` The auto one on upload is `Reviewed Texture Rewrites On Build (Opt-In)`, and can be restored from `Tools > Studio Raming > MingToon` menu.
:::

→ [Manual Bake and Restore](/workflow/bake-and-restore)

---

## VRChat Expression Menu {#vrchat-표현식-메뉴}

In a Unity 2022.3 VCC project, `MingToon Manager` prepares the Virtual Light and Master Adjust menus.

1. Select `MingToon Manager` under the Avatar Root.
2. Enable `Non-Destructive Modular Avatar Install`. It is enabled by default.
3. Save the Scene or Prefab and reopen the Manager Inspector.
4. Confirm that `MingToon Controls` appears in Gesture Manager.
5. Upload as usual with the VRChat SDK Builder. Menus, parameters, and FX are merged into the build clone, not the original.

MingToon compiles without Modular Avatar. Reopen the Inspector after installation to use it automatically; for manual merging, turn off the toggle and use `Register VRC Menu with One Click`.

:::caution[Expression Parameters budget]
This feature uses **21 synced parameters · 154 bits**. Before installation, it checks type conflicts with the existing avatar, the 256-bit budget, and the eight-slot-per-menu limit, and reverts changes on failure.
:::

Menus are divided into `MingToon Controls > Virtual Light` and `Master Adjust > Highlight / Shadow / Final Output`. `Reset All` restores the direction, mode, color, brightness, and intensity of Virtual Light and the three Master Adjust groups to installation defaults without using extra parameters or network bits.
## Export / Validate {#내보내기--검증}

### Upload Readiness {#업로드-준비-점검}

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

:::note[Depth promotion notice]
`On upload, N material(s) change depth mode from Auto to Force On. On VRChat avatars, Auto never turns on.` → [Build-time Optimization](/workflow/build-optimization#vrchat-깊이-자동-승격)
:::

### VRChat Preflight

`Rule version · validated Unity` is shown, and checks:

- **Missing standard properties** — fallback needs them to inherit values. Update with `Sync Fallback Properties`.
- **Component count** VRChat disallows

→ [VRChat Compatibility Rules](/internals/vrc-rules)

### Quest / Android

`MingToon does not support Quest (Android) builds.` If you plan a Quest variant, **assume all features below are missing.**

`Lost on Quest` — counts actual instances: `outline N · transparent N · depth effects N`.

### Script Removal Check

:::danger[Do not delete MingToon components manually]
`MingToon runtime components are removed automatically on VRChat upload, so do not delete them. Deleting this manager loses the cached renderer list, and upload optimization loses its scope.`

Warudo mode follows **a separate script-retaining** rule. This panel only checks.
:::

---

## Full workflow summary

```text
Attach MingToon Manager to root
        ↓
1 · Convert      Assign face/skin slots → look preset → bake UV8/UV7/UV4 together → convert
        ↓         Read loss report
2 · Setup        If changed clothing, refresh renderers
        ↓
Look / Face      Adjust looks per-material (look authoring docs)
        ↓
Optimize         Usually skip — build-time optimization is enough
        ↓
Validate         Run readiness check → VRChat preflight → upload
```

If exporting to Warudo, add a [WARUDO Runtime Root](/platforms/warudo#내보내기-전-필수--warudo-runtime-root) step here.
