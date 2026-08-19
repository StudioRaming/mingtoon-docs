---
id: troubleshooting
title: Troubleshooting
sidebar_position: 90
---

# Troubleshooting

Search by symptom. Most issues stem from **"if a parent value is 0 or off, all children are ignored"** structure.

## Nothing applies at all {#아무-값도-안-먹힌다}

Check from top to bottom.

1. **All Effects** — master switch at the top of the inspector. If off, the entire section below is inactive and shows `This section is inactive because All Effects is off.`
2. **Section master toggle** — each section has its own toggle. If off, `Quick Look` shows `(Module Off)`.
3. **Parent values** — see table below.

| Not showing | Check parent value first |
|---|---|
| Base tint | `Tint Opacity` |
| Depth rim / 2D shadow | `Master Width` → each module's `Intensity` |
| PBR highlight · environment reflection | `Specular Strength` |
| Texture/normal/matcap layer | `Layer Count` → each layer's `Opacity`/`Intensity` |
| Rim light | `Intensity` → `Width` |
| Rim shade | `Shadow Contribution Strength` → `Rim Shadow Width` |
| Shadow boundary band | `Boundary Width` → `Boundary Strength` |
| Shadow pattern | `Pattern Strength` |
| Face normal correction | `Normal Press Amount` |
| Face area mask | `Mask Strength` (0 = entire surface treated as face) |
| PBR packed mask channel setup | `Use Packed Mask` |
| Cast shadow brightness · blend | `Receive Strength` |
| Alpha mask | Shows nothing if surface mode is opaque |
| `1st Shadow Brightness`·`Cast Shadow Brightness` | Check `Shadow Color` section is on |

## Material appears pink (magenta)

| Cause | Check | Action |
|---|---|---|
| Render pipeline mismatch | Using URP shader in BRP project or vice versa | Replace with shader from correct backend |
| **Shader Model 4.5 not met** | `Tools > Studio Raming > MingToon > Validate Project` | Support is PC only (DX11+/Vulkan/Metal). Android·Quest·iOS·WebGL not supported |
| URP version out of range | Is it URP 12.x? | Match to Unity 2021.3 + URP 12.x |

:::danger[Other error messages do not appear in this case]
SubShader is entirely rejected, so the log is silent. Pink is the only signal.
:::

## Validate Project points out a Unity version

| Code | When | Meaning |
|---|---|---|
| `MING-ENV-UNITY-VERSION` (error) | Editor is **neither 2021.3 nor 2022.3** | Unsupported stream. Switch to one from Unity Hub |
| `MING-VRC-UNITY-VERSION` (warning) | VRC SDK present but editor is **not 2022.3 stream** | VRChat integration compiles only on 2022.3, so **this project has no avatar upload support.** Other targets unaffected |

2022.3.22f1 is a validated support version so no warnings appear. → [Full Validator code](/reference/validator)

## Depth rim / 2D shadow / inner 2D edge not showing

| Cause | Action |
|---|---|
| `All Effects` or `Depth Effects` is off | Inspector shows `Turn Depth Effects On` button |
| `Master Width` is 0 | Raise it |
| Each module's intensity is 0 | Raise it |
| Surface mode is **transparent** | Change to `Transparent · Outline Depth Ready`. Inspector tells you `Needs the depth-recorded mode` |
| **No camera depth** | [Depth Effects](/guides/depth-effects) platform-specific setup |
| VRChat regular screen | Avatar cannot force it. Check separately in Photo Camera·mirror |
| URP | Install Renderer Feature + enable Depth Texture |
| Warudo | Depth-enabled camera or host depth bridge needed |

If the inspector shows `The host Scene/Game camera does not have a depth texture prepared.`, reopen the Scene view, and if it persists, run `Validate Project`.

## Only inner 2D edge disappeared

| Cause | Action |
|---|---|
| `Inner Edge Outline Apply` is on and vertex color is black | Toggle off or change pressure source |
| Surface mode is transparent | Change to depth-recorded mode |
| No camera depth | See item above |

Normal outline works without camera depth. **If normal outline is visible but only inner 2D edge is missing, it's a depth problem.**

## Cannot find outline

`Inner 2D Edge` is **in Depth Effects group, not Outline**, because it reads screen depth.

## Normal outline completely disappeared

| Cause | Action |
|---|---|
| **On a mesh with black-imported vertex color, `Pressure Source` is `VertexRed`** | Change pressure source or check vertex color |
| `Hull Pressure Contrast` is 0 | Pressure is completely ignored |
| `Color Mask` is 0 | Set to 15 (full RGBA) |

## Outline breaks at sharp edges

`Normal Source` is `VertexColorTS` or `UV8TS` but the mesh has **sharp outline normals that were not smoothed**. Change to `MeshNormal`.

## Cannot paint outline width in Scene view {#씬-뷰에서-아웃라인-두께를-칠할-수-없다}

| Inspector says | Action |
|---|---|
| `Pressure Source must be Vertex Alpha or Vertex Red.` | Use `Switch to Vertex Alpha` button |
| `No renderer using this material exists below the current selection.` | Select MingToon Manager (or an object below it) |
| `Vertex painting is available when a single material is selected.` | Select only one |
| `...Play mode end does not restore the painted data. Unity does not undo it after exiting Play.` | Exit Play mode and restart |
| `There is no paintable mesh.` | Check if renderer has a mesh, and if that mesh includes the submesh this material draws |
| `Renderer has no mesh.` | Assign mesh to Mesh Filter or Skinned Mesh Renderer's Mesh slot |
| `Renderer has no Mesh Filter...` | Add Mesh Filter to the same object, or select object with Skinned Mesh Renderer |
| `Cannot read vertices from mesh '{...}'...` | Reimport the model |
| `Mesh '{...}' was generated at runtime...` | Save as mesh asset, then assign that asset to renderer |
| `...still cannot read even after reimport...` | Check if model file is read-only |
| `Could not write editable mesh copy to '{...}'...` | Check folder write permission and disk space |
| `Could not create '{...}' folder for editable mesh copy...` | Check project folder write permission |
| `Cannot open model importer for '{...}'...` | Verify model file is in project and import succeeded |

### Painted outline direction broke

`Pressure Source` is **Vertex Red** and `Normal Source` is **VertexColorTS**, overwriting the same vertex color. Inspector warns before painting.

Action: Change `Pressure Source` to **Vertex Alpha**, or [move outline normal to UV8](/guides/mesh-bakes#아웃라인-스무스-노멀-uv8).

### Outline of other objects changed too

Multiple renderers are **sharing the same mesh asset**. Vertex painting modifies the mesh asset directly.

Action: Duplicate the mesh and assign it only to that renderer, then paint again.

## Changed render pipeline and all materials broke

When pipeline changes, `MingToon Render Pipeline Mismatch` dialog appears and asks whether to batch-convert MingToon materials in the project to the matching backend. Scenes loaded in editor are also inspected.

:::caution[Cannot inspect unloaded scenes and AssetBundles]
You must open those separately and convert them.
:::

If you missed the dialog, a warning remains in the material inspector where you can run it again anytime.

Conversion is **blocked** in these cases:

| Reason | Action |
|---|---|
| `Material is embedded in another asset.` | Extract from subasset |
| `Material is in a read-only package.` | Copy outside package |
| `Material is read-only or not checked out.` | Clear read-only flag or check out from version control |

## Conversion/bake failed

| Message | Action |
|---|---|
| `Could not find a convertible material slot under this root.` | Check MingToon Manager is attached correctly, `Refresh Child Renderers` pressed |
| `Cannot find original MingToon shader '{...}', cannot bake.` | Installation incomplete. Re-import package |
| `Failed to import generated MingToon shader '{...}'.` | Check project folder write permission, retry |
| `Generated MingToon shader '{...}' has a compile error.` | Verify MingToon include folder is at original path. This result is not cached, so fix the path and rebake to regenerate |
| `Multiple MingToon Managers selected.` | Select one at a time |

## Cast shadow is blotchy

| Location | Action |
|---|---|
| Cloth wrinkles·overall body | `Suppress Self Cast Shadow` on, `Self Shadow Caster Bias` 0.01~0.03 |
| Face | `Face Cast Stabilization` on, adjust `Stabilization Strength`·`Grazing Light Range` |
| Vertical direction | `Vertical Correction Strength`·`Vertical Threshold (Lower = Wider)` |
| Boundary looks stepped | `Enable Projection Feather` + `Projection Feather Radius`·`Strength` |
| Overall jitter | Light's shadow map resolution · bias/normal bias · cascade in that order |

:::note[Feather cannot recover missing information]
Fuzzing low-resolution shadow map details that were never there won't bring them back.
:::

## Shadow is pitch black where it overlaps

Turn on `Use Unified Shadow` in the `Shadow Color` section. Form·cast·2D shadow converge to the same color and tone. → [Light & Shadow](/guides/light-and-shadow#통합-그림자--겹칠-때-새까매지는-문제)

## Turned on unified shadow and individual shadow colors no longer work

This is normal. In unified mode, individual shadow color·blend·brightness do not reflect in results. Values are preserved, so turning it off restores them. To align individual values to unified values, use `Copy Unified Values To Individual Shadows`.

## Backlit body silhouette overlaps character

Turn on `Suppress Backlit Silhouette`.

## Character clumps black in dark world

| Property | Action |
|---|---|
| `Base Color Preservation` | Raise it |
| `Minimum Final Brightness` | Raise it |
| `Indirect Light Lift` | Raise it |
| `Cast Indirect Lift` | Raise it |

Blown out white in bright world? Lower `Maximum Final Brightness`.

## Shadow pattern not printing at all

| Cause | Action |
|---|---|
| `Use Shape Tile` is on but tile slot is empty | Empty slots read as **white**, and white exceeds no threshold. Use inspector's built-in tile button |
| `Pattern Strength` is 0 | Raise it |
| Target doesn't match | Check `Pattern Target` |

## Pattern dots don't react to tone and stay same size

You loaded an **already-binarized dot pattern** as tile. Tile must be a threshold map, not a picture. → [Shadow Pattern](/guides/shadow-pattern#타일은-그림이-아니라-임계값-맵입니다)

## Hair pokes through cheek

Set surface mode to `Transparent · Outline Depth Ready` and turn on `Transparent Depth Prepass`.

## Look changed after conversion

Read `lossy` / `unsupported` items in conversion log first, then compare these with the original:

- Mask channel selection and inversion
- Texture ST (Tiling / Offset)
- AO
- Surface mode
- Face slot detection

## Baked material restore button is grayed out

| Check |
|---|
| Bake manifest still present? |
| Source editable material GUID still valid? |
| Renderer hierarchy / material slots unchanged since bake? |

## Uploaded but optimization doesn't seem to have applied

1. Is Unity version **2022.3.22f1**? On 2021.3, VRChat hook does not compile.
2. Does Console have `[MingToon] VRChat build hook compiled and registered.`?
3. Is `Tools > Studio Raming > MingToon > Optimize Shaders On Build` checked?
4. Check `StudioRaming/MingToonOptimizeReport.txt` next to project folder.

→ [Automatic Optimization On Build](/workflow/build-optimization#제대로-걸렸는지-확인하기)

## Inspector feels heavy while authoring {#작업-중-인스펙터가-무겁다}

This is normal. The editable shader compiles all features and maximum layer count upfront and maintains them, so toggling features doesn't cause recompilation waits or blue placeholder colors. Lightweighting applies only [at build time](/workflow/build-optimization).

## Still not resolved

Send these to `studioraming@gmail.com`:

1. Unity version and target platform (VRChat PC / Warudo / general Unity)
2. Render pipeline (BRP / URP 12.x)
3. MingToon version
4. Full Console log
5. Steps to reproduce
