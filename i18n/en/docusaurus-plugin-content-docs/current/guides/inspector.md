---
id: inspector
title: Inspector Guide
sidebar_position: 1
---

# Inspector Guide

**After reading this guide,** you'll understand the MingToon inspector structure, quickly find the settings you need, and safely apply them across multiple materials.

## View Mode {#보기-모드}

Choose one of three options from **View** at the top of the inspector.

| Mode | Shows | When |
|---|---|---|
| **Simple** | Base map HSVG, core elements of normal · emission · occlusion · PBR · matcap, lighting, final min/max brightness | Locking in tone, checking conversion results |
| **Full** | All workflow groups below | Full work |
| **Bulk** | Only values used across multiple materials | Adjust entire avatar at once |

<!-- SCREENSHOT: View Mode toggle toolbar -->

## Full Setup Workflow Groups {#전체-설정의-워크플로-그룹}

**Full** is organized in the order below. The "Creating a Look" section in this documentation follows the same order.

| Group | Sections Inside | Documentation |
|---|---|---|
| **Basic Setup** | Base Surface · Surface Rendering · Shared Maps | [Basic Setup](/guides/basics) |
| **Light & Shadow** | Lighting · Shadow Color · Shaped Shadow · Shadow Projection | [Light & Shadow](/guides/light-and-shadow) |
| **Rim** | Rim Shade · Rim Light · Backlight · Interior Shadow Reflection · Front Light | [Rim](/guides/rim) |
| **Depth-Based Effects** | Depth · Depth Rim · 2D Shadow · Interior 2D Boundary | [Depth-Based Effects](/guides/depth-effects) |
| **Detail Maps** | Texture Layer · Normal Layer · Matcap Layer · Occlusion · Emission · Glitter · PBR Surface | [Detail Maps](/guides/detail-maps) |
| **Character** | Face Shading · Character Height Gradient | [Character](/guides/character) |
| **Outline** | Normal Outline | [Outline](/guides/outline) |
| **Output and Diagnostics** | Advanced Rendering · Stencil Setup · Technical Info | — |

:::note[Interior 2D Boundary is not in the Outline group]
It's in the **Depth-Based Effects** group because it reads screen depth. It's common to miss it when looking in the Outline group.
:::

## Overall Effect — Master Switch at the Top {#전체-효과--가장-위의-마스터-스위치}

When `Overall Effect` is off, all sections below become inactive, and **changing any value has no effect on screen.**

The inspector will show `This section is inactive because Overall Effect is off.` and display a `Turn On Overall Effect` button.

:::danger[Start here when nothing works]
If you're adjusting values but seeing no response, check `Overall Effect` first. Each section also has its own master toggle; disabled sections show `(Module Off)`.
:::

## Quick Settings {#빠른-설정}

`Quick Settings` is a dedicated area for frequently adjusted values.

- Primary Shadow Boundary · Primary Shadow Softness · Primary Shadow Blend
- 2D Rim Width · 2D Rim Strength
- Outline Width · Outline Color
- Emission Strength

If the corresponding module is off, `(Module Off)` appears next to the item with a `Turn On This Module` button. When multiple materials are selected and values differ, `(Mixed State)` is displayed.

## Finding Settings

| Tool | Purpose |
|---|---|
| **Search** | Filter by property name. Korean/English/Japanese aliases are registered, so "외곽선", "outline", "윤곽선" all find Outline |
| **Favorites Only** | Show only frequently used items. Register with `Add to Favorites` next to each item |
| **Language** | Inspector label language. Korean / English / 日本語 |
| **Diagnostics** | Status information for the current material |

When search or favorites filtering returns no results, `No results found` is displayed.

## Editing Multiple Materials

Items with different values are marked as **`Mixed Values`**.

:::caution[Check Mixed Values first]
Touching that field **overwrites the same value on all selected materials,** erasing the original differences. See what's in mixed state before editing.
:::

## Presets

Save and load entire looks with `Material Presets`. When multiple materials are selected, this becomes `Bulk Material Presets`.

Presets apply all numeric, color, vector, and render state settings. **If the target material's texture differs from the shader default, that texture and tiling/offset are preserved,** so you can maintain different textures per character while unifying the look.

`Factory Presets` are bundled; `User Presets` are ones you save yourself.

## Copy / Paste

Use `Copy` and `Paste` to move section values to other materials.

## About Edit Performance

The edit shader **compiles all features and maximum layer count once upfront and maintains them.** This means toggling features on and off produces no blue placeholder color or pending compilation flashing.

Unused feature removal and optimization are applied only [when building](/workflow/build-optimization). **Heavy performance while working is normal.**

## Next

[Basic Setup](/guides/basics)
