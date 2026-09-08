---
id: basics
title: Basic Settings
sidebar_position: 2
---

# Basic Settings

After [starting with Manager](/getting-started/first-material), select the converted material you want to refine. **Keep MingToon Manager on the avatar root.** This guide follows the current inspector's surface, colour, and lighting controls. Check your installed version if names differ. **Update VCC installations through VCC.**

## Find the control for your change

| Desired change | Open first | Main controls |
|---|---|---|
| Darker or brighter appearance | Lighting → Core Light Response / Lighting Brightness Limits | Lit Brightness · Indirect Light Lift · Minimum/Maximum Final Brightness |
| Excessive world-light colour | Lighting → Core Light Response | Environment Color Influence · Preserve Base Map Color |
| Texture colour | Detail Maps → Surface Maps | Base HSVG · Hue Rotation Space · Base Tint |
| Cutout or transparency | Surface Rendering / Alpha & Cutout | Surface Mode · Base Map Opacity · Alpha Cutoff |
| Backfaces and overlapping cloth | Surface Rendering | Visible Faces · Two-Sided Dual Pass |
| Contribute as a depth occluder | Surface Rendering | Camera Depth Contribution |

Start with Quick Settings, then search or open **Full Setup** for individual controls. **Face, Skin, and Common can be assigned at the top of the material inspector in release builds too.** Editing a role or value with multiple materials selected applies it to all selected targets.

## Separate brightness from lighting colour

Start with the four controls in **Core Light Response**.

| Control | Changes | Starting point |
|---|---|---|
| Lit Brightness | Brightness multiplier on the lit side | 1 is neutral; watch for highlights losing colour as it increases |
| Environment Color Influence | Light-probe and ambient hue | Lower it when environment colour overwhelms skin or clothing; independent of brightness |
| Indirect Light Lift | How indirect light lifts dark areas | 0 adds no indirect brightness; 1 uses its authored strength |
| Preserve Base Map Color | Lighting hue mixed into the completed base colour | Higher favours base colour; **does not preserve or increase brightness** |

For overly dark areas, check **Indirect Light Lift** and **Lighting Brightness Limits → Minimum Final Brightness**. For washed-out bright areas, adjust **Lit Brightness** and **Maximum Final Brightness**. Preserve Base Map Color alone does not solve insufficient brightness.

Use **Additional Light Reception** for point and spot light influence. Advanced settings expose more colour and response-curve controls. → [Light and Shadow](/guides/light-and-shadow)

## Base colour and textures {#2-베이스-색}

Use **Surface Maps** for the base texture and colour adjustments. For a converted material, check existing assignments before replacing textures.

| Control | Purpose |
|---|---|
| Base Map | Original surface texture |
| Base HSVG | Hue, saturation, value, and gamma adjustment |
| Hue Rotation Space | HSV or OKLab. Keep HSV when preserving a look authored with it |
| Base Tint · Tint Blend Mode | Multiply keeps texture shading; Normal replaces it with the selected colour |
| Base Map Opacity | Multiplies final base alpha; **surface opacity independent of tint strength** |

The older description of tint opacity does not describe the current **Base Map Opacity** control. Tint Blend Strength is an advanced compatibility setting for colour blending; it does not change final surface alpha. To show transparency, also choose the appropriate surface mode below.

### Gradation LUT

Enable **Gradation LUT** and assign a horizontal ramp to remap the base colour per channel. Import the LUT as sRGB and use **Gradation Strength** for its contribution. Begin with HSVG and tint, adding a LUT when needed.

### Limit colour adjustment to a region {#색조보정-범위-마스크}

Enable **Color Adjust Mask → Use Color Adjust Mask** and assign the mask. White applies adjustment, black retains the original colour, and gray blends between them. Select a channel for a packed texture and invert when needed.

The mask has **its own tiling and offset**. Do not assume changing Base Map tiling also aligns the mask; check the intended regions, such as eyes or skin.

## Choose Surface Mode {#1-표면-모드부터-정합니다}

If the converted appearance already behaves as intended, there is no need to change its mode first. Choose by opacity, cutout, and overlapping-layer needs. **Surface Rendering** and **Alpha & Cutout** edit the same mode value.

| Current label | Use | Depth and overlap |
|---|---|---|
| Opaque (2000) | Ordinary skin and clothing | Writes depth without alpha blending |
| Cutout (2450) | Cut edges in hair or eyelashes | Discards pixels below Alpha Cutoff; the rest write depth |
| Semi-Transparent (2499) | Alpha blending where the nearest surface should win | Writes depth in a camera-depth eligible queue; different from showing every overlapping layer through the others |
| Transparent (3000) | Layered cloth or glass that should show surfaces behind it | The default colour pass writes no depth and uses transparent ordering; not a normal camera-depth-effect target |

The old transparent-with-outline-depth label is now **Semi-Transparent (2499)**. Both transparent modes can retain outlines. Mode changes align render state, default queue, and outline-buffer state while preserving Alpha Cutoff and outline enable/appearance settings.

**Choosing Semi-Transparent does not guarantee every depth effect.** Check camera-depth availability, Camera Depth Contribution, enabled modules, and the actual render queue. → [Depth Effects](/guides/depth-effects)

### Camera Depth Contribution

This decides whether **other materials' 2D shadows, SSAO, and 2D rim read this material as an occluder**. Turning it off excludes that contribution; normal colour rendering and real-time light shadows remain separate. The checkbox does not itself prepare the camera's depth texture.

### Visible faces and two-sided rendering {#표시할-면}

Choose front faces, backfaces, two-sided rendering, or the two-sided/outline-flip combination under **Visible Faces**. Use two-sided rendering for cloth that must show both sides. Check **Flip Backface Lighting Normal** when its backface lighting looks wrong.

**Advanced Color Buffer → Two-Sided Dual Pass** draws a two-sided surface's backfaces separately first. Consider it for folded-cloth overlap issues; it adds a pass, so apply it where needed.

### Troubleshoot transparent overlap {#머리카락이-볼을-뚫고-보일-때}

First choose between the depth priority of **Semi-Transparent (2499)** and layer blending of **Transparent (3000)**. The latter exposes **Transparent Depth Prepass** under **Advanced Color Buffer**. This relates to transparent sorting and outlines; it is distinct from Camera Depth Contribution and real-time light shadows. Do not enable it indiscriminately for every overlap problem.

## Alpha masks and cutout {#3-투명도를-텍스처로-따로-지정하기}

Check the **Alpha & Cutout** section master. For a separate transparency texture, enable **Alpha Mask**, set its texture, channel, inversion, and strength, then adjust **Alpha Cutoff**. Lower alpha does not turn Opaque mode into alpha blending.

**Alpha To Coverage** depends on MSAA. If MSAA is disabled, repeatedly increasing its sharpness will not produce the expected edge smoothing. **Camera Depth Alpha Cutoff**, shown for semi-transparent/transparent modes, adjusts the depth silhouette separately from colour alpha.

Open the distance, Fresnel, or directional alpha groups only when needed. Establish mask, surface opacity, and cutoff first.

## Master Adjust and Performance Distance

Brightness/tint authoring rows in **Master Adjust** appear when MLC is installed; they are absent without it. **Performance Distance** works without an add-on and reduces sample limits and selected effects at distance. If an effect disappears far away, check its distance and scale settings. → [Ming Light Controller](/guides/ming-light-controller)

## Common maps {#4-공통-맵}

Normal maps control surface detail; occlusion maps affect indirect-light occlusion. Check module toggles and strength as well as texture assignments. Continue with normal layers, Matcap, emission, and PBR in [Detail Maps](/guides/detail-maps).

**Render Disabled** stops drawing the material. **All Effects** is the parent switch for stylized effects. Distinguish a missing material from an individual unresponsive effect.

## Next

[Light and Shadow](/guides/light-and-shadow) · [Using the Inspector](/guides/inspector) · [Basic Settings Reference](/reference/basics). After editing, keep Manager on the avatar root and continue with VRC SDK upload or WARUDO mod build.
