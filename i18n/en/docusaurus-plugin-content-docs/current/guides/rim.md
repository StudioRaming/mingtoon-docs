---
id: rim
title: Rim
sidebar_position: 5
---

# Rim

**After reading this guide,** you'll understand five methods to preserve silhouette and learn which to enable first.

This guide covers the **Rim** group in the Inspector: `Rim Shade` · `Rim Light` · `Backlight` · `Shadow Interior Reflection` · `Front Light`. For a complete item list, see [Rim Reference](/reference/rim).

## Choose What to Enable First

| Section | Where It Appears | Use Case |
|---|---|---|
| **Rim Shade** | Inside silhouette, **darkened** | Volume. Shadow applied to edges in illustration |
| **Rim Light** | Inside silhouette, **brightened** | Backlight feel, separating character from background |
| **Backlight** | Backlit band created by key light behind surface | When preserving key light direction |
| **Front Light** | Face toward camera | Front emphasis |
| **Shadow Interior Reflection** | Inside shadow only | Keep shadow from becoming flat black |

:::caution[Combining them gets excessive quickly]
Enable one at a time and check as you adjust. Especially if you raise Rim Light and Backlight together, the silhouette will blow out to white.
:::

All five of these **require no camera depth.** Since they work in any environment, you can use them to maintain silhouette in VRChat's standard view where depth isn't available. The depth-reading `Depth Rim` is covered in [Depth-Based Effects](/guides/depth-effects).

---

## Rim Light {#림-라이트}

A bright edge light that responds to viewing angle. Order of adjustments:

1. `Intensity` — **If it's 0, changing color and width won't show anything on screen.** Start here.
2. `Width` — Where the rim starts. 0 means it won't show, close to 1 means the entire surface brightens.
3. `Fresnel Power` — Higher values concentrate it thinly toward the silhouette edge. Close to 1 is sharpest.
4. `Softness` — Lower for solid cel-shaded bands, higher for gradients.

Items to match your environment:

| Item | 0 | 1 |
|---|---|---|
| `Light Direction Influence` | Rim appears across entire silhouette based on camera | Remains only where the light source is |
| `Base Color Influence` | Uses the specified rim color as-is | Multiplies by base map color, creating different rim colors per material |
| `Scene Light Influence` | Always same intensity regardless of scene brightness | Rim darkens as scene lighting darkens |

:::tip[If you can't control lighting]
Keep `Light Direction Influence` and `Scene Light Influence` low. This keeps the rim consistent no matter which world you enter. If there's no directional light in the scene, `Light Direction Influence` won't make a difference anyway.
:::

<!-- SCREENSHOT: Rim Light intensity comparison -->

---

## Rim Shade {#림-셰이드}

Creates volume by adding a **dark band inside the silhouette**.

- `Shadow Contribution Strength` — **If it's 0, calculation is skipped entirely,** so changing width, falloff, or softness won't have any effect.
- `Rim Shadow Width` — Where the band starts. 0 means it won't appear.
- `Rim Falloff` — Higher values make it cling thinly to the edge.
- `Edge Softness` — Lower for ink-drawn line sharpness.

:::tip[Try this before Rim Light]
Darkening is more stable than brightening in unpredictable lighting environments. There's no risk of blowing out to white.
:::

---

## Backlight · Front Light · Glitter {#백라이트--프런트-라이트--글리터}

Each is a lightweight module with only **toggle + color + intensity**, three items total.

| Module | Function |
|---|---|
| **Backlight** | Independent backlit band created by key light behind the surface |
| **Front Light** | Front emphasis light added to the face toward camera |
| **Glitter** | Voronoi particle sparkle. Distance stabilization, view sensitivity, light angle, size and color randomization ([Detail Maps](/guides/detail-maps) group) |

Backlight depends on the scene's key light direction, so it won't appear in worlds without directional light. If you need a backlit feel in such environments, lower the `Light Direction Influence` on Rim Light instead.

---

## Shadow Interior Reflection {#그림자-내부-반사}

A Fresnel reflection band **visible only inside shadows** (Inspector label: `Shadow-Only Effect`). Prevents shadows from becoming flat black shapes. Most effective on dark clothing or high-contrast characters.

### Reflection Appearance

First, create the band itself. Same structure as Rim Light.

| Item | Function |
|---|---|
| `Reflection Color` | Band color |
| `Intensity` | **If it's 0, nothing shows.** Start here |
| `Fresnel Power` | Higher concentrates it thinly toward silhouette edge |
| `Width` | Where the band starts |
| `Edge Softness` | Boundary blur |
| `Normal Map Influence` | How much to follow the normal map |

### Shadow Region

**Defines what counts as "inside shadow."** Items unique to this module.

| Item | Function |
|---|---|
| `Shadow Threshold` | Reflection appears below this brightness level |
| `Shadow Region` | Transition width of that detection |

:::tip[If reflection bleeds into bright areas]
Lower `Shadow Threshold`. Conversely, if you want it only in deep shadows, lower it more.
:::

### Environment Response

Items that keep the band from looking out of place in uncontrolled lighting.

| Item | 0 | 1 |
|---|---|---|
| `Base Color Influence` | Uses specified reflection color as-is | Multiplies by base map color |
| `Scene Light Influence` | Ignores scene brightness | Follows lighting |
| `Light Direction Influence` | Ignores direction | Only where light source is |
| `Ambient Color Influence` | Ignores ambient color | Reflects ambient color |
| `Additional Light Influence` | Ignores point/spot lights | Reflects them |

### Dedicated Mask

Enable `Use Mask` to assign a mask for this effect alone. Mask configuration follows [Texture Slot Common UI](/guides/texture-modules#마스크-세부-설정).

## Next

[Depth-Based Effects](/guides/depth-effects)
