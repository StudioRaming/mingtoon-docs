---
id: depth-effects
title: Depth Effects
sidebar_position: 6
---

# Depth Effects

**After reading this document** you will be able to diagnose why Depth Rim, 2D Shadow, and Inner 2D Edge are not visible, and learn how to ensure depth is available on each platform.

This document covers the **Depth Effects** group in the inspector — `Depth`, `Depth Rim`, `2D Shadow`, and `Inner 2D Edge`. For a complete list of all parameters, see [Depth Effects Reference](/reference/depth-effects).

## What Uses Depth

All four sections in this group read **camera depth texture**. Without depth, no amount of adjustment will make anything appear on screen.

:::danger[Check depth before adjusting values]
The inspector tells you the status directly.

- `Depth Effects is off, so this module does not draw.` → `Turn Depth Effects On`
- `This effect only appears on cameras with Depth enabled.`
- `2D Depth Rim and 2D Shadow require an opaque or cutout material that records depth. Depth Effects are disabled in the transparent queue.`
- `The active Scene/Game camera's depth texture is not ready.`

It's pointless to adjust width or intensity while these messages appear.
:::

:::note[Why Inner 2D Edge is here]
Although it looks like an outline, it reads screen depth, so it belongs **in this group, not the outline group**. It's common to look for it in outlines and not find it.
:::

---

## Platform-Specific Depth Setup {#플랫폼별-깊이-확보}

### VRChat (Primary Target)

| Situation | Depth |
|---|---|
| **Photo Camera active** | ✅ Official contract enables host depth |
| **World has Screen Camera depth enabled** | ✅ |
| **Normal player screen (default)** | ❌ Avatar cannot force it |
| **Inside mirror · stream paths** | ⚠️ Not guaranteed |

Screen Camera settings are **world/Udon authority**. Adding a Camera or Light to the avatar is not an equivalent solution and may increase performance cost or be removed by avatar safety settings.

On upload, MingToon automatically promotes `Depth Availability` from `Auto` to `Force On`. See [VRChat](/platforms/vrchat) for details.

:::tip[Backup for screens without depth]
The rim light and rim shade from [Rim](/guides/rim) and the normal outline from [Outline](/guides/outline) **do not require depth**. Don't rely solely on depth-based effects — lay a floor for silhouettes with these two.
:::

### Standard Unity (BRP) {#일반-unity-brp}

Add the `Studio Raming/MingToon/Depth Texture Provider` component to the scene. It provides the necessary depth flags and camera matrices before the active Game Camera renders, and preserves existing camera flags.

### URP 12

1. Run `Tools > Studio Raming > MingToon > URP > Install Depth Effects Renderer Feature`.
2. If you also use outlines, run `Tools > Studio Raming > MingToon > URP > Install Outline Renderer Feature`.
3. Enable **Depth Texture** in the URP Renderer Data you're using.

### Warudo

You need a Warudo camera with Depth enabled. In some cases, a host camera cannot be changed with just an avatar bundle. → [Warudo](/platforms/warudo)

---

## Diagnosis Checklist

Check items from top to bottom.

1. **Overall Effects** — Is the master off? ([Inspector Usage](/guides/inspector#전체-효과--가장-위의-마스터-스위치))
2. **Depth Effects** section master toggle
3. **Surface Mode** — If transparent (does not record depth), all are disabled. Switch to `Transparent · Outline Depth Ready`
4. **Master Width** — If 0, no amount of raising individual module width will produce anything
5. **Each module's intensity** — If `Rim Intensity` is 0, rim calculation is skipped
6. **Camera depth** — Platform-specific items above
7. If issues persist, run `Tools > Studio Raming > MingToon > Validate Project`

---

## Depth — Shared Values {#깊이--공통-값}

Values **shared** by `Depth Rim` and `2D Shadow`. Set these first, then move to individual modules.

| Parameter | Function |
|---|---|
| `Master Width` | Multiplier applied to screen offset for both modules. **If 0, nothing appears** |
| `Width Mode` | `Screen Pixels` uses screen pixels as reference · `Distance Stable` maintains constant thickness despite distance/FOV changes |
| `Distance Scaling` | Reference distance for `Distance Stable`. Ignored if `Screen Pixels` |
| `Master Bias` | Only depth differences exceeding this value count as edges. **Lower** creates dirty lines on shallow curves, **higher** makes thin areas lose their lines |
| `Master Softness` | Low produces sharp ink lines, high creates soft, blurred edges |

:::tip[Use Distance Stable for avatars]
In environments where camera distance constantly changes, `Distance Stable` keeps thickness consistent.
:::

---

## Depth Rim (2D Rim) {#깊이-림-2d-림}

Final thickness = `Master Width` × `Rim Width Multiplier`.

- `Rim Intensity` — **If 0, calculation is skipped.** Changing color and width has no effect.
- `Mix Base Color` — 0 = solid color rim, 1 = multiply base map color for per-area variation.
- `360 Rim` — 0 = light direction only, 1 = wraps entire silhouette.
- `2D Rim Direction` — Direction the rim shifts.

:::tip[For environments without lighting or with frequently changing direction]
Raising `360 Rim` provides stability.
:::

`Silhouette Start` and `Silhouette Transition` are **not reflected at all if Outer Silhouette Limit in the same group is 0**.

`Quick Setup`'s `2D Rim Width` and `2D Rim Intensity` map to this section's values.

---

## 2D Shadow {#2d-그림자}

Creates shadow by pushing character silhouette in screen space. Mainly used to draw shadows cast by bangs on the forehead without real-time shadows.

### Basics

| Parameter | Function |
|---|---|
| `Shadow Brightness` | Lower = darker. If [integrated with cast shadow](/guides/light-and-shadow#2d-그림자와-색이-따로-놀-때), this value is used as the brightness of the integrated layer |
| `Additional Depth Bias` | Module-specific value added to Master Bias |

### Direction

`Silhouette Shift Direction` — Determines which way to push the silhouette.

| Value | Result |
|---|---|
| `Along Light Projection` | Push direction matches light source. Physically natural |
| `Opposite Light Projection` | Opposite direction. For deliberate reversal |

Enable `2D Shadow Light Follow` to track scene lights, or disable to keep fixed.

:::tip[For worlds with unpredictable lighting]
Disable direction tracking and keep it fixed for stability. Prevents bangs shadows from ending up on the wrong side from world to world.
:::

Fine-tune shadow position with `2D Shadow Vertical Offset` and `2D Shadow Depth Offset`.

### Face-Specific Assist

Face has separate parameters.

| Parameter | Function |
|---|---|
| `Face 2D Shadow Assist` | Enhance 2D shadow in the face region |
| `Face Fixed Direction` | Lock the direction the face uses as reference |
| `Face Self-Surface Suppression` | Suppress shadow clinging to the face's own surface |

→ [Character Expression](/guides/character#4단계-앞머리-그림자)

### Sticking & Falloff {#눌어붙음과-감쇠}

| Parameter | Function |
|---|---|
| `Body Surface Guard` | Prevents shadow from clinging to the body surface itself |
| `2D Shadow Cast Reach` | How far shadow stretches from silhouette |
| `Distance Fade Range` (in `Distance Fade & Border` group) | Reduces effect with distance |

:::caution[If shadow clings to the body like splotches]
Raise `Body Surface Guard` first. If still present, raise `Master Bias` or `Additional Depth Bias`.
:::

---

## SSAO (Screen Space Occlusion) {#ssao-화면-공간-차폐}

Darkens creases and the places where things meet: under the neck and jaw, armpits, cloth folds, and where feet touch the floor.

:::tip[This is occlusion, not shadow]
It applies to a material with `Form Shadow` off as well. It joins **after** the toon band and the screentone, so it cannot step the shadow boundary or get printed as halftone dots a second time.
:::

### How it combines with the occlusion map

It is not multiplied. The two are computed separately and **whichever is darker wins**. Where the map already painted the area dark, SSAO does not add more; SSAO only contributes the occlusion a map cannot know about - the one that comes from the actual pose and from nearby objects.

### The order to set it in

| Control | What it does |
|---|---|
| `SSAO Radius` | How far the occlusion search reaches. **World metres, not screen pixels**: 0.001-0.1 is 1mm-10cm. Default 0.05 (5cm) |
| `SSAO Intensity` | Strength. At 0 the image matches the effect being off while the calculation still runs, so turn `SSAO Enabled` off when you are not using it |
| `SSAO Power` | Tightens the darkening curve |
| `SSAO Quality` | Depth samples per pixel (4/8/12/16). A uniform loop rather than four keyword variants, so it adds no variants |

On something character-sized, **lower quality with a larger radius** usually reads better than the reverse.

### Holding still across distance and FOV

With `SSAO Distance Compensation` at 1, its default, the same crease gets the same thickness of shading whether the camera comes close or pulls back, and through a change of field of view. FOV cancels out on its own with no separate control. Lower it to 0 and the radius shortens inside one metre, the older behaviour.

`SSAO Far Distance` is where the effect is gone completely. The fade starts at **75% of that value**, so 12 means it begins thinning at 9m and is gone at 12m. 0 disables it.

### Light direction, mask, colour

- `SSAO Light Direction Influence` — leans the search disc toward the key light. At 0 the occlusion is uniform and light-independent; raising it gathers the occlusion on the side the light does not reach. The lean falls off on its own as the light approaches the camera axis.
- `SSAO Mask Strength` — borrows the `2D Shadow Mask (Shared)` rather than declaring a texture of its own. Channel, invert, and HSVG come from the 2D shadow mask, and **editing it from either screen edits the same one texture.**
- `SSAO Tint` · `SSAO Brightness` · `SSAO Saturation` — apply **only to the darkness SSAO itself introduced**. Anywhere form, cast, or 2D shadow already darkened is untouched. At the defaults the result is identical.

:::caution[No depth, no effect - silently]
It is not a light, not a provider, and not a post-process pass. [Getting depth per platform](#플랫폼별-깊이-확보) above applies unchanged: it appears where the 2D depth shadow appears. With no depth, occlusion is pinned to 1 (no occlusion), so the look does not break.
:::

## Depth Translucency {#깊이-투과광}

Makes **thin areas like hair tips or clothing edges** look as if they're glowing with light.

:::tip[This module is not tied to Master Width]
It reads depth **twice** toward the light source to directly measure how much light passes through the character. So it works **independently** of Depth Rim and 2D Shadow. It appears even if `Master Width` is 0.
:::

### 1. How to Measure Thinness {#1-얇음을-어떻게-잴지}

| Parameter | Function |
|---|---|
| `Translucency Strength` | Overall brightness multiplier. **If 0, calculation is skipped** |
| `Measure Width` | How far to look in the light direction. Large = thick areas also glow, small = only very thin edges glow |
| `Depth Range` | If there's this much (m) empty space behind, consider it completely open |
| `Shell Floor` | See below |

:::caution[If clothing behind hair brightens as if it's the background]
Raise `Depth Range`. A nearby surface is being read as "open space".
:::

:::danger[Hollow clothing must have Shell Floor set]
Skirts and cloaks have **wide screen width but very thin actual fabric**.

- Hollow shells like skirts/cloaks → **0.8 or so**. Always treat as thin regardless of measurement
- Solid areas like skin/hands → **0**. Trust measurement
:::

### 2. How Light Spreads

| Parameter | Function |
|---|---|
| `Density` | Higher = light stays in very thin areas (dense material feel), lower = spreads widely |
| `Exposure Softness` | Changes response curve only. **Does not move edge position** |
| `Channel Spread` | Recreates how red scatters deeper than blue. Different per-channel falloff creates the unique blur of skin and hair that **cannot be made with tint alone**. 0 = all channels identical |

### 3. At What Angle It Glows

| Parameter | Function |
|---|---|
| `Backlight Falloff` | Higher = narrow and strong only at precise backlighting |
| `Front Light Floor` | Remains bright in front light |
| `Normal Bend` | Bends light direction toward surface normal, making light leak along curves even without precise backlighting |
| `View Bend` | Bends light direction toward camera |
| `Scene Light Influence` | 0 = only specified color, 1 = receive scene lighting color as-is |

:::danger[Don't set `Front Light Floor` to 0]
Translucency strengthens in backlighting but **does not disappear in front light**. Setting to 0 makes skin not look like skin.
:::

:::tip[If hair card planes flicker]
Planes can't trust normals, so `Normal Bend` alone causes light to flicker on and off. **`View Bend` prevents that.**
:::

### 4. Two Layers Make Color

Edge and center layers exist separately. **Setting one to 0 makes the remaining single layer identical to single-layer mode.**

| | Edge Layer | Center Layer |
|---|---|---|
| Brightens | Outside silhouette | Inside silhouette |
| Intensity | `Edge Intensity` | `Center Intensity` |
| Falloff | `Edge Falloff` | `Center Falloff` |
| Color | `Edge HSVG` → `Edge Tint` | `Center HSVG` → `Center Tint` |

:::tip[Color correction derives from base color]
Not absolute color but **created from base map color**. So blonde hair glows yellow, dark hair glows dim — **the entire character matches one setting.**

The default tips the center layer red-warm with higher saturation, creating the feel of bright white edges and warm-glowing center (typical hair).

Neutral value `(0,1,1,1)` skips correction.
:::

---

## Inner 2D Edge {#내부-2d-경계}

Draws **inside-surface** edge lines by screen depth difference. Can be used even on meshes where normal outlines break due to missing geometry.

:::danger[Does not work if Surface Mode is Transparent]
If translucency is needed, use `Transparent · Outline Depth Ready`.
:::

Adjustment parameters:

- `Depth Bias` — Only depth differences larger than this count as edges. **Lower** creates noise on gentle curves, **higher** makes thin areas lose their lines.
- `Softness` — 0 = hard line, 1 = entire line width fades completely from edge to inside end.
- `Camera Distance / FOV Stabilization` — Line thickness stays consistent despite camera movement.

:::caution[If Inner 2D Edge disappears completely]
Check the `Apply to Inner Edge Outline` toggle. This toggle is in the Normal Outline group but **continues to affect Inner 2D Edge even if Normal Outline is off**. If enabled on meshes with black vertex color, Inner 2D Edge disappears entirely.
:::

---

## Transparent Surfaces and Depth

Surface Mode splits two ways, differing in **whether depth is recorded**.

- **Transparent · Outline Depth Ready** — **Inside** the depth texture range. 2D Shadow, Depth Rim, and Inner 2D Edge all work. **If translucency is needed, review this option first.**
- **Transparent** — **Outside** that range. Depth-based modules stay off. Enabling them compares against what's behind the character.

Opaque and cutout are unaffected and always have complete depth.

## Next

[Detail Maps](/guides/detail-maps)
