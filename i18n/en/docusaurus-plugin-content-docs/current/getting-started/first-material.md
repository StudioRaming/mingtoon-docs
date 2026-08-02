---
id: first-material
title: Creating Your First Material
sidebar_position: 2
---

# Creating Your First Material

**By the end of this guide** you will create one MingToon material, apply it to a model, and visually confirm that toon shading is actually enabled. Takes about 5 minutes.

This guide covers **one material**. If you want to migrate a whole avatar at once, go to [lilToon Conversion](/workflow/liltoon-conversion).

## 1. Creating a Material

1. In the Project panel, right-click → `Create > Material`.
2. Select the created material and open the shader dropdown at the top of the Inspector.
3. Select `StudioRaming > MingToon > BRP`.

**This is correct.** The Inspector changes from the generic Standard shader UI to the MingToon-specific inspector.

<!-- SCREENSHOT: Shader selection dropdown -->

:::tip[Material is pink?]
The shader did not compile. Most commonly the render pipeline does not match, or the build target does not satisfy shader model 4.5. → [Troubleshooting](/troubleshooting)
:::

## 2. Choosing a Surface Mode

Set the surface mode **before** adding a base map. Changing it later shifts the render queue, causing depth-based effects to turn off entirely.

| Part | Surface Mode |
|---|---|
| Body, clothing | **Opaque** |
| Hair, eyelashes | **Cutout** (`Alpha Cutoff` 0.3~0.6) |
| Translucent and needs depth effect | **Transparent · Outline Depth Ready** |

See details in [Basics](/guides/basics#1-표면-모드부터-정합니다).

## 3. Adding a Base Texture

1. Confirm the Inspector view mode is **Simple**.
2. Add your character texture to the **Base Map** slot.
3. Drag the material onto the model's Renderer to apply it.

**This is correct.** The character appears in the scene with texture color, and **sharp-edged shadows** form based on light direction. This sharp boundary is the signal that toon shading is on. If you see only soft gradients, the shader is still Standard.

<!-- SCREENSHOT: Scene view after base map applied -->

## 4. Dialing In Shadow and Brightness

In Simple mode, adjusting only these changes the look significantly.

| Item | What it does | When first tuning |
|---|---|---|
| **Base Map HSVG** | Hue/Saturation/Value/Gamma correction of base color | Adjust tone without changing the original texture |
| **1st Shadow Softness** (Quick Look) | Edge softness width of the shadow boundary | **Tune this first.** 0.001 = cell, 0.3+ = gradient |
| **Base Color Preservation** | How much of the original color to keep even in darkness | High for VRChat world variance |
| **Minimum Final Brightness** | Never go darker than this | Prevents characters disappearing in dark worlds |

:::tip[Especially important in VRChat]
World lighting is beyond the avatar creator's control. Raising `Base Color Preservation` and `Minimum Final Brightness` ensures your character survives any world. → [Light & Shadow](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)
:::

## 5. Enabling Outlines

1. Switch the view mode to **Full**.
2. In the **Outline** group's `Normal Outline` section, enable `Enable Classic Hull`.
3. Adjust `Outline Width` and `Outline Color`. (Also available in `Quick Look`)

**This is correct.** A line appears around the character silhouette.

<!-- SCREENSHOT: Normal outline enabled -->

Normal outline does not need camera depth, so it works everywhere. In contrast, **Inner 2D Edge** for drawing inner lines like clothing wrinkles reads the camera depth texture, requiring [separate setup](/guides/depth-effects).

## 6. Next Steps

| Want to | See |
|---|---|
| Master the Inspector | [Inspector Guide](/guides/inspector) |
| Seriously tune shadows | [Light & Shadow](/guides/light-and-shadow) |
| Manga screentone shadows | [Shadow Pattern](/guides/shadow-pattern) |
| Fine-tune the face | [Character](/guides/character) |
| Convert whole avatar | [lilToon Conversion](/workflow/liltoon-conversion) |
| Upload to VRChat | [VRChat](/platforms/vrchat) |
