---
id: basics
title: Basic Settings
sidebar_position: 2
---

# Basic Settings

**After reading this guide,** you can correctly select Surface Mode and control base color and transparency.

Covers the **Basic Settings** group in the Inspector — `Basic Surface` · `Surface Rendering` · `Common Maps`. Complete item list is in [Basic Settings Reference](/reference/basics).

## 1. Start with Surface Mode {#1-표면-모드부터-정합니다}

Choose **Surface Mode** before adding the base map. Changing it later shifts the render queue and can disable depth-based effects entirely.

| Surface Mode | Use Case | Notes |
|---|---|---|
| **Opaque** | Body, clothes, most parts | Depth is fully recorded and all effects work |
| **Cutout** | Hair, eyelashes, cut-out parts | Alpha Cutoff 0.3~0.6 is typical. Near 0, translucent edges look dirty |
| **Transparent · Outline Depth Ready** | Parts needing both transparency and depth effects | Records depth, so 2D shadow, depth rim, and inner 2D boundary all work. **Use this first if transparency is needed.** |
| **Transparent** | Full transparency | Does not record depth; **all depth-based modules are disabled** |

:::note[What Surface Mode Changes]
Adjusts render state, default render queue, and internal outline buffer state together. **Alpha Cutoff, outline ON/OFF, and appearance values are preserved**, so your work doesn't disappear when changing modes.
:::

:::danger[Depth Module Enabled but in Transparent Mode]
The Inspector alerts you next to Surface Mode: "Depth Recording Mode is required". Switch to `Transparent · Outline Depth Ready`.
:::

### Hair Showing Through Cheeks {#머리카락이-볼을-뚫고-보일-때}

Enable **`Transparent Depth Prepass`** in `Surface Rendering`. This records surface depth before drawing color, preventing hair strands behind the cheeks from appearing above them. Use `Prepass Alpha Cutoff` to set at which alpha to record.

### Visible Faces {#표시할-면}

| Value | Result |
|---|---|
| **Front Faces Only (Standard)** | Default |
| **Back Faces Only** | |
| **Off (Double-Sided)** | Skirts, cloth |
| **Flip (Double-Sided + Reversed Outline)** | When double-sided and outline direction needs reversal |

If backfaces appear unnaturally dark on double-sided materials, try enabling `Flip Backface Lighting Normal`.

## 2. Base Color {#2-베이스-색}

1. Add character texture to **Base Map**.
2. Adjust color using **Base Map HSVG**. Faster than rebaking texture and easy to compare results against original.
3. When applying tint with **Base Tint**, these three items work as a set.

| Item | Role |
|---|---|
| Base Tint | Color to overlay |
| Tint Blend Mode | `Multiply` preserves map contrast while tinting · `Normal` covers map for solid color |
| Tint Opacity | **If 0, the two items above are ignored entirely** |

:::note[Color Changed but No Effect]
Check if Tint Opacity is 0 first. MingToon has this "parent zero ignores children" pattern in several places. Reference tables indicate which values are parents.
:::

### Apply color adjustments to specific areas only {#색조보정-범위-마스크}

`Base Map HSVG` applies across the entire material by default. To restrict it to specific areas — **changing only the eyes while leaving the face untouched** — use the `Color Adjust Mask` group right below.

1. Enable `Use Color Adjust Mask`. **Default is off**, and when off, adjustments apply across the whole material as before.
2. Add a grayscale image to `Mask`. **White applies the adjustment, black keeps the original**, and gray blends proportionally.
3. If multiple masks are packed in one texture, use `Mask Channel` to select which channel to read.
4. If the areas to adjust are drawn black in the mask, enable `Invert Mask`.

Masks read with the same UV and tiling as the base map. If the base map is tiled, the mask tiles with it.

:::note[Materials converted from lilToon]
lilToon's color adjustment mask arrives here. It reads as a grayscale mask with channel fixed to R. If the original had no mask, this row appears disabled. → [lilToon Material Conversion](/workflow/liltoon-conversion)
:::

## 3. Specify Transparency with a Separate Texture {#3-투명도를-텍스처로-따로-지정하기}

To control transparency with a separate image instead of the base map's alpha, use **Alpha Mask**.

1. Enable `Enable Alpha Mask`.
2. Add a grayscale image to `Mask Image`.
3. Select which channel to read in `Mask Channel`. If multiple masks are packed in one texture, choose R/G/B/A; for RGB brightness, use `Luma`.
4. If areas to erase are white in the mask, enable `Invert Mask`.

Use `Remap Start`·`Remap End`·`Feather` to redistribute the mask's gray range, and `Gradient` to create directional fades.

:::caution[Invisible if Surface Mode is Opaque]
Alpha Mask only works in Cutout or Transparent modes.
:::

## 4. Common Maps {#4-공통-맵}

Frequently used maps also exposed in Simple mode.

- **Normal Map** — Surface detail. If `Normal Strength` is 0, the map has no effect; 1 is full strength. Corresponds to Normal Layer 01, so it's ignored if the [Normal Layer](/guides/detail-maps#노멀-레이어) module is disabled.
- **Occlusion Map** — Darkens areas where indirect light is hard to reach. **Does not affect direct light**, so strong frontal lighting hides the effect. If `Occlusion Strength` is 0, the map has no effect.

Emission, PBR, and Matcap are covered in [Detail Maps](/guides/detail-maps).

## Next

[Light and Shadow](/guides/light-and-shadow) — Most of the toon look is determined there.
