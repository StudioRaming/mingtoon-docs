---
id: basics
title: Basic Settings
sidebar_position: 2
---

# Basic Settings

**After reading this guide,** you can choose the correct Surface Mode and establish the base color and transparency behavior.

This guide focuses on the Inspector's **Basic Settings** group: `Master Adjustment`, `Surface Rendering`, and `Lighting`. Map layers are covered in [Detail Maps](/guides/detail-maps), and the complete property list is in the [Basic Settings Reference](/reference/basics).

## 1. Choose Surface Mode First {#1-표면-모드부터-정합니다}

Choose **Surface Mode** before assigning the base map. Changing it later moves the render queue and can disable all depth-based effects at once.

| Surface Mode | Use Case | Notes |
|---|---|---|
| **Opaque** | Body, clothing, and most parts | Fully writes depth, so all effects work |
| **Cutout** | Hair, eyelashes, and clipped parts | `Alpha Cutoff` around 0.3–0.6 is usually safe. Near 0, untidy translucent edges remain |
| **Transparent · Outline Depth Ready** | Translucent parts that also need depth effects | Writes depth, so 2D Shadow, 2D Rim Light, and Inner 2D Boundary all work. **Try this first when you need translucency** |
| **Transparent** | Fully translucent surfaces | Does not write depth, so **all depth-based modules are disabled** |

:::note[What Surface Mode changes]
It updates the render state, default render queue, and internal outline-buffer state together. **Alpha Cutoff, outline on/off, and appearance values are preserved**, so changing the mode does not erase your work.
:::

### Render Disabled

`Render Disabled (Do Not Draw This Material)` removes every pass and eliminates the draw call itself. It differs from turning off `Overall Effect`, which leaves the base rendering intact.

This value is a Material pass state, so it cannot be switched at runtime through an AnimationClip or VRC FX. For an in-game toggle, enable or disable the Renderer or GameObject instead. An enabled Render Disabled state is preserved in bakes and upload copies.

:::danger[If a depth module is enabled in Transparent mode]
The Inspector shows `Depth Recording Mode is required` beside Surface Mode. Switch to `Transparent · Outline Depth Ready`.
:::

### Hair Showing Through Cheeks {#머리카락이-볼을-뚫고-보일-때}

Enable **`Transparent Depth Prepass`** under `Surface Rendering`. It writes surface depth before drawing color, preventing hair strands behind the cheek from appearing on top of it. Use `Prepass Alpha Cutoff` to choose the alpha threshold that writes depth.

### Visible Faces {#표시할-면}

| Value | Result |
|---|---|
| **Front Faces Only (Standard)** | Default |
| **Back Faces Only** | |
| **Off (Double-Sided)** | Skirts and cloth |
| **Flip (Double-Sided + Reversed Outline)** | Double-sided materials whose outline direction also needs to be reversed |

If backfaces on a double-sided material look unnaturally dark, try enabling `Flip Backface Lighting Normal`.

## 2. Base Color {#2-베이스-색}

1. Assign the character texture to **Base Map**.
2. Adjust color with **Base Map HSVG**. This is faster than rebaking the texture and makes it easy to compare the converted result with the original.
3. When adding a tint through **Base Color**, these three properties work as a set.

| Property | Role |
|---|---|
| Base Color | Color to apply |
| Tint Blend Mode | `Multiply` keeps the map's light and dark values while tinting; `Normal` covers the map with a flat color |
| Tint Opacity | **At 0, both properties above are ignored entirely** |

:::note[If changing the color has no effect]
Check whether Tint Opacity is 0 first. MingToon uses this “a zero parent value disables all children” structure in several places. The reference tables identify which values are parents.
:::

### Apply Color Adjustment Only to Selected Areas {#색조보정-범위-마스크}

`Base Map HSVG` applies to the entire material by default. To limit it to a region—such as **changing only the eyes while leaving the face untouched**—use the `Color Adjustment Area Mask` group directly below it.

1. Enable `Use Area Mask`. **It is off by default**; while off, adjustment applies to the whole material as before.
2. Assign a grayscale image to `Area Mask`. **White applies adjustment, black preserves the original**, and gray blends by that proportion.
3. If several masks are packed into one texture, choose the channel with `Mask Channel`.
4. If the area to adjust is painted black, enable `Invert Mask`.

The mask uses the same UV and tiling as the base map. If the base map is tiled, the mask follows it.

:::note[For a material converted from lilToon]
lilToon's color-adjustment mask is placed here. Because it is grayscale, the channel is fixed to R. If the original had no mask, this row remains disabled. → [lilToon Material Conversion](/workflow/liltoon-conversion)
:::

## 3. Control Transparency with a Separate Texture {#3-투명도를-텍스처로-따로-지정하기}

Use **Alpha Mask** when transparency should come from a separate image instead of the base map alpha.

1. Enable `Use Alpha Mask`.
2. Assign a grayscale image to `Mask Image`.
3. Choose the read channel under `Mask Channel`. For several masks packed into one texture, select R/G/B/A; choose `Luma` to use RGB brightness.
4. If areas to remove are painted white, enable `Invert Mask`.

`Remap Start`, `Remap End`, and `Feather` redistribute the mask's gray range. Use `Gradient` properties to create a directional fade.

:::caution[It is invisible in Opaque Surface Mode]
Alpha Mask produces a result only in Cutout or Transparent modes.
:::

## 4. Common Maps {#4-공통-맵}

These frequently used maps also appear in Simple mode.

- **Normal Map** — surface relief. At `Normal Strength` 0, the map stays flat; 1 is its original strength. It corresponds to Normal Layer 01, so it is ignored when the [Normal Layer](/guides/detail-maps#노멀-레이어) module is off.
- **Occlusion Map** — darkens areas that indirect light has difficulty reaching. It **does not affect direct light**, so its effect is barely visible under strong frontal light. At `Occlusion Strength` 0, assigning the map changes nothing.

Emission, PBR, and MatCap are covered in [Detail Maps](/guides/detail-maps).

## Next

[Light and Shadow](/guides/light-and-shadow) — most of the toon look's character is decided there.
