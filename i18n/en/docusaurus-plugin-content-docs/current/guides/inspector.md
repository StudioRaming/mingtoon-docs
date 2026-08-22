---
id: inspector
title: Inspector Guide
sidebar_position: 1
---

# Inspector Guide

**After reading this guide,** you will understand the MingToon inspector's view modes, sticky toolbar, group structure, and multi-material editing rules.

## Material Roles {#머티리얼-역할}

`Face`, `Skin`, and `Common` roles determine which slot values a look preset applies. In release builds, assign them per renderer and material slot in `1 · Convert` of MingToon Manager. Only development builds show the maintainer role-override row at the top of the inspector.

When selected materials have different roles, the field shows a mixed state. Changing the role applies it to every selected material.

## View Modes {#보기-모드}

| Mode | Shows | Use It For |
|---|---|---|
| **Simple** | Surface, lighting, key maps, and representative shadow, rim, face, and depth controls | Establishing a look after conversion, quick adjustments |
| **Full Setup** | Every user-facing workflow group and advanced render states | Full authoring and troubleshooting |
| **Bulk Setup** | Safe values that can be applied across multiple selected materials | Unifying an entire avatar |

`Simple` is a condensed view of the feature set. Switch to `Full Setup` when a required control is missing. Maintainer features such as `Diagnostics`, internal technical names, and variant dumps do not appear in release builds; they are available only in `MINGTOON_DEV` development builds.

## Sticky Toolbar {#고정-툴바}

The toolbar remains at the top while you scroll down the inspector.

| Tool | Purpose |
|---|---|
| **Search** | Finds controls by aliases in Korean, English, and Japanese, not only the current language |
| **Favorites Only** | Shows only favorite sections and rows. Available in Full Setup |
| **Collapse All / Expand All** | Closes or opens all workflow groups and sections at once |
| **Changed Only** | Keeps only rows that differ from shader defaults and automatically opens their sections |
| **Copy / Paste** | Moves material settings to other materials |
| **Language** | Switches between 한국어 / English / 日本語 |

`Changed Only` is a diagnostic tool for finding values that you or a preset may have changed. It also distinguishes a texture's default fallback from an actually assigned texture. If nothing is changed, `No Changed Values` is shown.

The colored navigation bar below the toolbar represents the position of each workflow group. Select a color segment to jump to that group.

## Full Setup Workflow Groups {#전체-설정의-워크플로-그룹}

| Order | Group | Main Sections | Documentation |
|---|---|---|---|
| 1 | **Basic Setup** | Master Adjustment · Surface Rendering · Lighting | [Basic Setup](/guides/basics) · [Light and Shadow](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때) |
| 2 | **Detail Maps** | Surface Maps · Normal · MatCap · Emission · Occlusion · Glitter | [Detail Maps](/guides/detail-maps) |
| 3 | **Shadow** | Shadow Color · Shaped Shadow · Shadow Projection · Pattern | [Light and Shadow](/guides/light-and-shadow) |
| 4 | **Character Expression** | Face Shading · Character Height | [Character Expression](/guides/character) |
| 5 | **PBR** | PBR Surface · Toon Specular · Region Masks | [Detail Maps](/guides/detail-maps#pbr-표면) |
| 6 | **Depth-Based Effects** | Master · 2D Rim · 2D Translucency · 2D Shadow · SSAO · Inner Outline | [Depth-Based Effects](/guides/depth-effects) |
| 7 | **Rim** | Rim Shade · Rim Light · Front/Back Light · Inner Reflection | [Rim](/guides/rim) |
| 8 | **Advanced** | Stencil · Rendering Options | [Property Reference](/reference/basics) |

## Overall Effect and Section Masters {#전체-효과--가장-위의-마스터-스위치}

When `Overall Effect` is off, child effects are inactive and changing their values does not change the result. The inspector explains the cause and shows a `Turn On Overall Effect` button.

Each section also has its own master. A disabled section shows `(Module Off)`, and when search finds a child row you can use `Turn On This Module`.

:::danger[When a value does not respond]
Check `Overall Effect` → the relevant section master → required platform prerequisites, in that order. For a depth effect, also check [Depth Availability](/guides/depth-effects#깊이-가용성).
:::

## Quick Settings {#빠른-설정}

`Quick Settings` gathers commonly adjusted values such as shadow boundaries, 2D rim, outline, and emission. These are duplicate controls for the real values, so changes here synchronize with the original section immediately.

A disabled module shows `(Module Off)`, while selected materials with different values show `(Mixed State)`.

## Editing Multiple Materials {#여러-재질-동시-편집}

Rows whose values differ show `Mixed Values`. Changing that row writes the same value to every selected material.

Use the face-proxy SceneView editor only with compatible Face materials under the same character root. If selections from different roots are mixed, editing does not start, preventing incorrect synchronization. Use `Select Face Materials Only` in MingToon Manager first for a safe selection.

## Presets {#프리셋}

`Material Presets` save and apply look values. When multiple materials are selected, the preset is applied to all of them.

0.1.7 presets preserve character-specific identity including:

- Surface Mode, Cutout/Fade/Premultiply state, and render queue
- Alpha mask and cutoff
- Face proxy center, radius, shape, axis, and height
- Already assigned character-specific textures and their tiling/offset

Values deferred before application and the reason for each deferral are shown in the panel. Face / Skin / Common values in role-aware presets are selected from the material roles recorded in MingToon Manager.

## Copy / Paste {#복사--붙여넣기}

After selecting `Copy`, choose the paste scope:

- `All`
- `Values Only (Exclude Textures)`
- `Textures Only`
- `Keywords Only`
- `Render Queue Only`

Paste applies to every selected target and supports Undo.

## Material Cost {#재질-부하}

The headline number is the estimated cost of the **post-bake shader that will be uploaded**. The authoring shader is heavier because it keeps every authoring feature available. The detail table separates the current authoring state from the expected post-bake state.

## Edit Performance and Development Tools {#편집-성능에-대해}

The authoring shader keeps its authoring paths available so you do not wait for a new variant every time a toggle changes. Unused-feature removal and constant folding happen during [Automatic Build Optimization](/workflow/build-optimization).

Release packages do not expose variant dump/record tools, the technical diagnostics panel, or Depth Debug Post Process registration that users do not need. They reappear only in builds where product developers define `MINGTOON_DEV`.

## Next

[Basic Setup](/guides/basics) · [MingToon Manager](/workflow/character-manager) · [Bulk Editing](/guides/bulk-editing)
