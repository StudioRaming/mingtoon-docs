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
| **1 · Convert** | Other shaders → MingToon, Face / Skin / Common roles, conversion look |
| **2 · Setup** | Character scope, Editor/Warudo preview, runtime face direction |
| **3 · Details** | Reapply looks, connect Face SDF, UV4/UV8 mesh bakes, return Live face normals |
| **4 · Ship** | Lightweight shaders, texture caps, VRC menus, upload readiness and platform checks |

The status panel at the top recommends the next step for the current material composition. `Texture Optimization` is a separate, project-wide setting rather than a character setting.

**Quick actions** and the **status panel** always remain at the top.

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

### Look preset on convert {#변환-시-룩-프리셋}

Fill in look values at the same time as conversion.

:::danger[The preset overwrites ~500 values]
`The preset overwrites ~500 numeric and color values in the material immediately after conversion. If you've edited values before converting, choose None.`
:::

Materials judged as faces receive face values, those judged as skin receive skin values, and the rest get common values. SDF framing · bake results · texture presence — values that differ per character — are not in the preset.

`Last applied by this editor` is shown, so you can check what was applied later.

### Mesh Channels to Bake Together {#함께-구울-메쉬-채널}

Bakes only the static channels needed immediately after conversion.

| Channel | Purpose |
|---|---|
| `Outline Smooth Normals (UV8)` | Prevent outline separation at hard edges |
| `Character Height Gradient (UV4)` | Height gradient relative to the character root |
| `Overwrite Occupied UV Channels` | Use only during reconversion after confirming ownership |

Face normals in 0.1.7 are calculated Live while editing, so **conversion no longer bakes UV7 by default.** During VRChat upload, they are baked only into the upload copy. When a texture face-region mask is required or Face SDF owns UV7, the Live path is kept to preserve the result.

Check ownership of UV4, UV7, and UV8 under `UV Channel Usage` first. → [Mesh UV Bakes](/guides/mesh-bakes)

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

## 3 · Details

`Standalone Mesh Bakes` are needed only when the stage 1 conversion checkbox was disabled or that bake failed. Already-filled channels are rejected unless `Overwrite` is enabled.

`Character Height UV4` and `Outline Smooth Normals UV8` can be run individually. Face normals are Live by default. If `_FaceNormalBaked` remains from an older conversion and proxy adjustments do not appear, run `Return Face Normals to Live`. It clears the material's baked flag and an incorrect Face SDF UV7 selection in one Undo step. → [Mesh UV Bakes](/guides/mesh-bakes)

---

## Look / Face

Apply look presets to converted materials.

If not yet converted, `No MingToon materials yet. Run step 1 conversion first, then apply look presets here.` is shown.

### Face SDF

`Open Front-View SDF TEXCOORD6 (Unity UV7) Baker`

:::note[Face SDF Studio Is a Separate Product]
When installed, this button opens Studio. When it is not installed, purchase and installation guidance appears. MingToon Face Shading and Base UV face SDF remain usable without Studio.
:::

→ [Face SDF Authoring](/guides/face-sdf)

---

## 4 · Ship {#4--출하}

### Optimization / Bake

:::tip[Most cases can skip this]
VRChat upload and Warudo mod builds automatically apply [Automatic Build Optimization](/workflow/build-optimization), and materials remain editable.
:::

`Lightweight Shader Bake (Editor Only)` · `Preserve Animatable Passes (Safe)`

:::caution[Texture Optimization Is a Project-Wide Setting]
Upload resolution caps by slot type—including base, normal, and mask—and `Reviewed Texture Rewrites On Build (Opt-In)` are stored in Editor preferences. They are not stored in a Scene or Prefab and apply to every character shipped from this project. Only upload copies change; source textures are preserved.
:::

→ [Manual Bake and Restore](/workflow/bake-and-restore)

---

### VRChat Expression Menu {#vrchat-표현식-메뉴}

In a Unity 2022.3 VCC project, `MingToon Manager` prepares the Virtual Light and Master Adjust menus.

1. Select `MingToon Manager` under the Avatar Root.
2. Enable `Non-Destructive Modular Avatar Install`. It is enabled by default.
3. Save the Scene or Prefab and reopen the Manager Inspector.
4. Confirm that `MingToon Controls` appears in Gesture Manager.
5. Upload as usual with the VRChat SDK Builder. Menus, parameters, and FX are merged into the build clone, not the original.

MingToon compiles without Modular Avatar. Reopen the Inspector after installation to use it automatically; for manual merging, turn off the toggle and use `Register VRC Menu with One Click`.

:::caution[Expression Parameters budget]
The final 0.1.7 installation uses **22 synced parameters · 120 bits**. Before changing anything, it checks type conflicts with the existing avatar, the 256-bit budget, and the eight-slot-per-menu limit, and rolls changes back on failure.
:::

Menus include `Virtual Light`, `Master Adjust`, and `Quality`. Quality preserves authored values on High, caps sample counts on Mid, and lowers sample counts further while disabling the Depth Effects Master and projected-shadow feathering on Low. Opted-in materials also show a `Shadow Projection` toggle. Enable `Place Directly in Expressions Root` to flatten controls into the root without a MingToon Controls submenu. `Reset All` returns to authored values from installation without extra network bits.
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
Do not remove MingToon components from the authoring Scene. Deleting Manager removes the cached Renderer list and makes upload optimization lose its scope. These components are marked `IEditorOnly`, but automatic deletion is not guaranteed, so verify `RuntimeComponentCount = 0` on the actual build clone after SDK processing.

Warudo mode follows **a separate script-retaining** rule. This panel only checks.
:::

---

## Full workflow summary

```text
Attach MingToon Manager to the root
        ↓
1 · Convert      Assign roles → choose conversion look → convert → review loss report
        ↓
2 · Setup        Refresh scope → Editor/Warudo preview and face direction
        ↓
3 · Details      Reapply look → connect SDF → bake UV4/UV8 only when needed
        ↓
4 · Ship         Texture caps → VRC menu → automatic/manual bake → readiness check → upload
```

No separate Runtime Root is required for Warudo export. If you use depth effects, install [Warudo Depth Bridge](/platforms/warudo#warudo-depth-bridge) in Playground.
