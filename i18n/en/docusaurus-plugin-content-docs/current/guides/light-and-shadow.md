---
id: light-and-shadow
title: Light and Shadow
sidebar_position: 3
---

# Light and Shadow

**After reading this guide**, you'll learn to distinguish three types of shadows and understand the order to adjust them so they don't conflict with each other.

This covers the **Light and Shadow** group in the inspector — `Lighting` · `Shadow Color` · `Form Shadow` · `Shadow Projection`. See [Light and Shadow Reference](/reference/light-and-shadow) for the full list of items.

## First: There Are Three Types of Shadows

What MingToon calls "shadows" actually refers to three distinct types. If you don't distinguish between them, you'll keep adjusting the wrong sliders.

| Type | Inspector Section | What Creates It |
|---|---|---|
| **Form Shadow** | Form Shadow | Surface normal and light direction. Shading created by the character's own contours. **The core of the toon look** |
| **Cast Shadow** | Shadow Projection | Unity's real-time shadow map. Shadows cast by other objects and the character itself |
| **2D Shadow** | 2D Shadow ([Depth-Based Effects](/guides/depth-effects)) | Camera depth texture. Calculated in screen space |

<!-- SCREENSHOT: Comparison with each of the three shadow types individually enabled -->

## Workflow Order

1. Form Shadow boundary → 2. Shadow Color → 3. 2nd Shadow stage → 4. Shadow Projection → 5. Face exceptions → 6. Boundary decoration

---

## 1. Form Shadow Boundary — Adjust First {#1-형태-그림자-경계--가장-먼저}

**`1st Shadow Blur` is the value you'll adjust most frequently in MingToon.** This is where the look's character is defined.

| Value | Result |
|---|---|
| Near 0.001 | Sharp, crisp boundaries like cell animation |
| 0.05 ~ 0.15 | Slightly soft, illustration-like feel |
| 0.3 or higher | Soft gradient |

First, adjust only this value to determine your desired character, then move to the rest. `1st Shadow Softness` in the Quick Setup is the same value.

## 2. Shadow Color {#2-그림자-색상}

Lowering `1st Shadow Brightness` darkens the shadow. However:

:::caution[If the `Shadow Color` section is disabled]
`1st Shadow Brightness` won't be applied. The same applies to cast shadows — if this section is disabled, the shadow simply darkens and `Cast Shadow Brightness` is ignored.
:::

### Unified Shadow — Problem of Shadows Becoming Black at Overlaps {#통합-그림자--겹칠-때-새까매지는-문제}

When Form, Cast, and 2D shadows overlap in the same spot, they darken three times and become muddy black. Enable **`Use Unified Shadow`** in the `Shadow Color` section, and all three will **converge to the same color and tone**, eliminating this problem.

:::note[What is preserved / ignored in unified mode]
- **Preserved** — Form settings for shadow boundaries, shadow patterns (screen tone)
- **Ignored** — Individual shadow colors, blend, and brightness controls (values themselves are saved, so they return when disabled)

The **alpha of `Unified Shadow Color`** determines the application amount. If alpha is 0, shadows remain as the base color regardless of color choice.
:::

To match individual shadow values to unified values, use `Copy Unified Values To Individual Shadows`.

## 3. 2nd Shadow — 3-Stage Cell Shading {#3-2차-그림자--3단-셀-음영}

Enable `Enable 2nd Shadow` to add one more stage at the darkest area.

- `2nd Shadow Brightness` should be **lower than 1st** so the stage distinction is visible.
- Setting `2nd Shadow Blur` **narrower than 1st** makes the inner stage more distinct.

## 4. Shadow Projection (Cast Shadow) {#4-그림자-투영-캐스트-섀도우}

Real-time shadows are the most troublesome part of toon rendering. Start with the `Cast Shadow Receive` group.

If `Receive Strength` is **0, cast shadows disappear completely**, and brightness, blend, and indirect lift adjustments below won't appear in the result either.

### When shadows don't look toon-like

Raising `PBR / Toon Blend` to 1 replaces Unity's default soft falloff with hard toon bands. Band width is controlled by `Cast Toon Band Softness`.

### Splotchy shadows {#얼룩덜룩한-그림자}

If you see dirty splotches on clothes or the body:

1. Enable `Suppress Self Cast Shadow`.
2. Adjust `Self Shadow Caster Bias` between **0.01~0.03**.

:::danger[If you raise the bias too much]
Splotches disappear, but contact shadows lift and shadows on thin areas break. Adjust gradually.
:::

### Grazing shadows on the face {#얼굴의-스치는-그림자}

When light grazes a gentle surface like the face, stair-step splotches appear. In the `Cast Tone / Face Stabilization` group:

1. Enable `Face Cast Stabilization`.
2. Raise `Stabilization Strength`. **Raising too much fades intended shadows like bangs.**
3. Use `Grazing Light Range` to set the angle range where stabilization applies. Higher = wider range.
4. For vertical splotches, use `Vertical Correction Strength` and `Vertical Threshold (Lower = Wider)`. Lower threshold = wider application.
5. If the boundary is still rough, use `Hard Edge Cleanup`.

### When shadow boundaries are jagged like steps {#그림자-경계가-계단처럼-각질-때}

Enable `Enable Projection Feather` in the `Projection Feather` group and adjust `Projection Feather Radius` and `Projection Feather Strength`. Use `Cast Edge Feather Quality` to set the sample count.

:::note[Feathering can't recover missing information]
Details that don't exist in the low-resolution shadow map won't come back by softening. First check the light's shadow map resolution, bias/normal bias, and cascade.
:::

### When shadows are too strong or weak per scene

Raising `Cast Indirect Lift` makes cast shadows lighter in areas with bright ambient light. This naturally absorbs lighting differences for avatars moving between indoor and outdoor scenes.

### When character-shaped shadow overlaps on the body in backlight {#역광에서-몸에-캐릭터-모양-그림자가-겹칠-때}

Enable `Suppress Backlit Silhouette` to prevent cast shadows on faces away from the light.

### When 2D shadow and cast shadow have different colors {#2d-그림자와-색이-따로-놀-때}

Enable `Unify With 2D Shadow` so the 2D shadow uses the same color as the cast shadow, and prevents double darkening where they overlap.

## 5. Face Gets Special Treatment

→ [Character Expression](/guides/character)

## 6. Boundary Decoration — Last Step {#6-경계-장식--마지막에}

A visual effect that overlays a color band on shading boundaries. Do this after the look is finalized.

1. Enable `Use Shadow Boundary`.
2. Raise `Boundary Width`. **If 0, all items below are ignored.**
3. `Boundary Strength` is opacity. At 0, even if you raise width, it won't show.
4. `Boundary Overlay Mode` — when enabled, thick color boundary extends to lit area; when disabled, it stays inside shadow for a neater look.

:::tip[If skin and hair are mixed in one material]
Raise `Boundary Base Map Mix`. At 0, boundary is solid color; at 1, it mixes with base map color for different boundary colors per area.
:::

:::caution[Conditions when boundary is invisible]
The `Shadow Color` section must be enabled, and **at least one of Form or Cast shadows must be actually working**.
:::

---

## Lighting — When Dark Scenes Turn Muddy Black {#라이팅--어두운-씬에서-검게-뭉칠-때}

VRChat worlds don't let avatar creators control lighting. Items in the `Lighting` section are your defense line.

| Item | What It Does |
|---|---|
| `Preserve Base Map Color` <br />(Quick Mode: Preserve Base Color) | How much the base map color is kept close to original despite dark lighting. **Keep high in environments where lighting is unpredictable** |
| `Scene Light Color Influence` <br />(Quick Mode: Light Color Influence) | At 0, any colored light looks white. Handles **color only, not brightness** |
| `Indirect Light Lift` | Lifts form shadows by the amount of ambient light. Only calculated when form shadow is enabled |
| `Minimum Final Brightness` | Never goes below this, no matter how dark |
| `Maximum Final Brightness` | Never exceeds this, no matter how bright. Guards against overexposed worlds |

`Lit Brightness` is a multiplier for the entire lit side. 1 is the baseline; raising it makes lit areas clip to white easily.

### Additional Lights {#추가-광원}

Response to point/spot lights is separate:

- `Additional Light Receive` · `Additional Light Intensity` (Quick Mode)
- `Additional Light PBR / Toon Blend` · `Additional Light Toon Threshold` · `Additional Light Toon Softness` (Full Settings)

To maintain the same tone as the key light, adjust the toon threshold for additional lights as well.

## Next

- Make shadows into comic screen tones: [Shadow Pattern](/guides/shadow-pattern)
- Screen-space 2D shadows: [Depth-Based Effects](/guides/depth-effects)
