---
id: character
title: Character Expression
sidebar_position: 8
---

# Character Expression

**After reading this document** you can control nose shadows and forehead shadows, and apply different shading rules to the face than to the body.

Covers the **Character** group in the inspector — `Face Shading` · `Character Height Gradient`. A complete property list is in [Character Expression Reference](/reference/character).

---

## Face Shading {#페이스-셰이딩}

### Why handle the face separately

The face has real geometric curvature in the nose and eyebrows, so using the same form shadow settings as the body **almost always looks messy.** The reason anime-style faces look clean is that the face has different shading rules than the body.

MingToon handles this in two steps.

1. **Which area is the face?** — Define the face region
2. **What do we do differently on the face?** — Normal pressing, boundary adjustment, shadow removal

<!-- SCREENSHOT: Face shading before / after comparison -->

### Step 1: Define the face region

If the head and body are mixed into one material, you need to tell it which part is the face.

#### Method A — Face area mask (recommended) {#방법-a--얼굴-영역-마스크-권장}

1. Turn on `Enable Face Area Mask`.
2. Add a mask texture.
3. Enter channel weights in `Mask Channel (RGBA)`. To use only the G channel, enter `(0, 1, 0, 0)`.
4. If the face is drawn dark in the mask, turn on `Invert Mask`.

Items for refining the boundary:

- `Mask Strength` — **If 0, the mask is ignored and the entire material is treated as the face.** 1 follows the mask exactly.
- `Remap Start` / `Remap End` — Expand the gray range of the mask. Raising the start narrows the face area, lowering the end makes the boundary sharp. **If both are the same, the boundary becomes completely hard.**

#### Method B — Proxy sphere {#방법-b--프록시-구}

Without a mask texture, treat the inside of a virtual sphere as the face.

1. Turn on `Use Proxy Sphere As Face Area`.
2. In the scene view, use the **Face Proxy tool** to adjust `Proxy Sphere Center` and `Proxy Sphere Radius`. This is more precise than typing numbers directly.

:::caution[If the sphere is too large]
The neck and hands are also treated as the face. Shrink it while checking on screen.
:::

:::note[If both are turned on]
`Enable Face Area Mask` takes priority and the proxy sphere options are ignored.
:::

### Step 2: Remove nose shadows {#2단계-코-그림자-없애기}

Press the face normal to erase shading from geometric curvature.

1. Increase `Normal Press Amount`. **If 0, all items below are ignored** and the original mesh normal is used as-is.
2. Choose `Normal Method`.

| Value | Result |
|---|---|
| 0 | **Completely press face normals to face-forward direction**, nose shadow disappears |
| 1 | Smooth curve following the proxy sphere |

To use `Normal Method` at value 1, the proxy sphere center and radius must be set correctly.

You can adjust the direction the face uses as a reference with `Face Fixed Direction`.

### Step 3: Face-only shading boundary {#3단계-얼굴-전용-음영-경계}

- `Face Border` — **Set it lower (minus) than the body to make the face darken later**, keeping it clean like illustration. This is the most commonly adjusted setting.
- `Face Softness` — The blur width of the face region boundary.
- `Remove Default Face Form Shadow` — If 1, **completely removes the form shadow in the face region.** Use this to remove nose and cheek shadows, creating face shading only through 2D shadows or shadow textures.

:::caution[If the form shadow section is off]
`Face Border` and `Face Softness` are not applied.
:::

### Step 4: Forehead shadow {#4단계-앞머리-그림자}

Choose one of two directions.

#### Use real shadows

This is the default. If positioning is off, fine-tune by pushing the face's shadow caster front-to-back with `Real ShadowCaster Offset`.

#### Draw with 2D shadows only

1. Turn off `Face Casts Real-Time Shadows`. The face mesh no longer casts real-time shadows.
2. Draw forehead shadows with [2D Shadow](/guides/depth-effects) or shadow textures.

This is closer to anime-style looks and the forehead shadow shape doesn't shift when lighting changes.

### When real-time shadow speckling appears on the face

Covered in the `Shadow Projection` section under `Face Cast Stabilization`. → [Light & Shadow](/guides/light-and-shadow#얼굴의-스치는-그림자)

### Face SDF — Use without scripts

If you bake the current scene front-view into mesh UV7 in the **Look / Face** step of the **MingToon Manager**, a 4-directional face SDF works with the shader only, no runtime components. This is important for VRChat uploads where scripts must be removed. → [Mesh UV Bakes](/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7)

<!-- SCREENSHOT: Face SDF orthographic baker -->

---

## Character Height Gradient {#캐릭터-높이-그라데이션}

**Bake the height relative to the character root into UV4**, then color it based on that height. Use this to darken the feet or apply color to clothing hems.

:::danger[UV4 must be baked first to work]
The character **entire** root-relative height must be in UV4.x. It's character-level, not mesh-level. → [Mesh UV Bakes — Character Height (UV4)](/guides/mesh-bakes#캐릭터-높이-uv4)
:::

| Item | Function |
|---|---|
| `Low Color` / `High Color` | The two colors |
| `Gradient Direction` | Switch to Top To Bottom and the colors swap positions |
| `Boundary Height` | The height where the two colors mix at 50% |
| `Boundary Softness` | The blur width based on the boundary. **If 0, it cuts sharply** |
| `Curve Exponent` | Transition curve |
| `Influence` | Total application amount |

:::tip[Common usage]
Set `High Color` to white (no change) and `Low Color` to dark only, creating a natural grounded feeling as you go toward the feet.
:::

## Next

[Outline](/guides/outline) · [Mesh UV Bakes](/guides/mesh-bakes)
