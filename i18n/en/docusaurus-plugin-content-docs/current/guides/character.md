---
id: character
title: Character Expression
sidebar_position: 8
---

# Character Expression

**After reading this guide,** you can control nose and bangs shadows and give only the face different shading rules from the body.

This guide covers the Inspector's **Character Expression** group: `Face Shading` and `Character Height Gradient`. The complete property list is in the [Character Expression Reference](/reference/character).

---

## Face Shading {#페이스-셰이딩}

### Why Treat the Face Separately

The nose and brow have real geometric curvature, so using the same form-shadow settings as the body **almost always makes the face look untidy.** Anime-style faces look clean because they use different shading rules from the body.

MingToon handles this in two parts:

1. **Where the face ends** — define the face region
2. **What changes inside the face** — proxy normals, adjust the boundary, and remove shadows

<!-- SCREENSHOT: Face shading before / after comparison -->

### Step 1: Define the Face Region

When the head and body share one material, MingToon needs to know which part is the face.

#### Method A — Face Region Mask (Recommended) {#방법-a--얼굴-영역-마스크-권장}

1. Enable `Use Face Region Mask`.
2. Assign a mask texture.
3. Enter weights in `Mask Channel (RGBA)`. To use only G, enter `(0, 1, 0, 0)`.
4. If the face is painted black in the mask, enable `Invert Mask`.

Controls for refining the boundary:

- `Mask Strength` — **at 0, the mask is ignored and the entire material is treated as the face.** 1 uses the mask as-is.
- `Remap Start` / `Remap End` — redistributes the mask's gray range. Raising Start narrows the face region; lowering End sharpens the boundary. **If they are equal, the boundary becomes completely hard.**

### Paint the Face Region in SceneView {#얼굴-영역을-sceneview에서-칠하기}

You can define the face region with Mesh vertex values instead of creating a mask texture.

1. Enable `Define Face Region with Vertex Paint`.
2. Select `Start Face Region Paint`.
3. Paint the face in SceneView with Paint; hold Shift while painting to erase.
4. Refine the boundary with Harden or Smooth. Use Hard Face to fill one triangle immediately.
5. Isolate the target Renderer with `Show Editing Mesh Only`, and use X symmetry or `L` / `Shift+L` connected-island fill as needed.
6. Choose `Save`, `Discard`, or `Cancel` when finishing.

:::caution[The texture face mask has priority]
When `Use Face Region Mask` is enabled, vertex paint is ignored. Disable the texture-mask toggle when using paint. If the mask remains enabled while its texture is empty, the entire material is treated as the face.
:::

The painted channel can be separated from the outline-pressure channel, allowing both features on the same Mesh.

#### Method B — Proxy Volume {#방법-b--프록시-구}

Without a mask texture, treat the inside of a sphere, cylinder, or capsule as the face.

1. Enable `Use Proxy as Face Region`.
2. Choose Sphere / Cylinder / Capsule under `Proxy Shape`.
3. Use the face-proxy SceneView tool to align center, radius, and axis. For Capsule, also adjust height.
4. Use `Proxy Boundary Softness` to tune the transition width at the neck and hairline.

:::caution[If the volume is too large]
The neck or hands may also be treated as the face. If multiple Face slots share one Renderer, keep their proxy shape, strength, and runtime face frame identical. If they differ, upload baking safely keeps them on the Live path.
:::

:::note[Mask priority]
Texture face mask → vertex paint → proxy volume → entire material. If texture-mask strength is 0, MingToon does not fall through to a lower-priority mask; it treats the entire material as the face.
:::

### Step 2: Remove Nose Shadows {#2단계-코-그림자-없애기}

Replace the face normals with proxy curvature to clean up untidy nose and brow shading caused by geometric relief.

1. Raise Proxy Normal Strength. At 0 the original mesh normal is used; at 1 the proxy target normal is used.
2. Choose Sphere / Cylinder / Capsule and align the center, axis, and height.
3. Set the curvature with the radius. Smaller values are rounder; larger values are flatter.
4. Align the front and up axes with Face Normal Alignment and the fixed direction.
5. If the normal map creates a broad shadow boundary that does not match the SceneView normal lines, lower Shadow Normal Map Influence.

In 0.1.7, this calculation is **live while editing**. Changes to the proxy or strength appear immediately without a separate mesh bake. The upper-left SceneView panel can toggle normal lines and the proxy volume independently; line length and density affect display only, not lighting. On VRChat upload, MingToon creates the UV7 payload only in the upload copy, then restores the scene's original Mesh and material to Live state.

When a texture face-region mask is active, the SceneView normal lines also follow UV0, Tiling/Offset, HSVG, channel selection, inversion, and remapping. If the GPU sample or UV data cannot be read, MingToon hides the lines and reports the reason in the panel instead of drawing a misleading preview.

:::caution[If moving the proxy has no effect]
The material may have face normals baked into UV7 by an older version. Run `Return Face Normals to Live` in MingToon Manager. A texture face-region mask needs per-pixel sampling, so it remains on the Live path even during upload.
:::

### Step 3: Face-Only Shading Boundary {#3단계-얼굴-전용-음영-경계}

- `Face Boundary` — range 0–1, default 0.25. Values **closer to 0 make the face darken later**; values closer to 1 make it darken earlier. This is the most frequently adjusted control.
- `Face Softness` — blend width at the face-region boundary.
- `Remove Default Form Shadow` — at 1, **completely removes form shadow in the face region.** Use it to remove nose and cheek shadows and build face shading only with 2D Shadow or a shadow texture.

:::caution[If the Form Shadow section is off]
`Face Boundary` and `Face Softness` do not apply.
:::

### Step 4: Bangs Shadow {#4단계-앞머리-그림자}

Choose **how to draw shadows made by bangs and accessories on the face**. At the top of Face Shading, the `Face Shadow Mode` group presents one `Shadow Mode` row.

| Value | Result | Use Case |
|---|---|---|
| **Real Shadow, Same as Body** | Receives the scene's real-time shadows directly | When the face does not need separate handling |
| **Soft 2D Shadow (Face Corrected)** | Also enables an auxiliary face push so [2D Shadow](/guides/depth-effects#2d-그림자) fades softly on the face | Anime looks. The bangs-shadow shape stays stable as lighting changes |
| **Custom** | Related values have been adjusted manually | Appears automatically when values leave the two combinations above |

:::note[One row controls several values]
The values needed for this choice were previously split across two tabs. Selecting a mode sets `Use Face Self Cast` and the face auxiliary push in the Depth tab **together in one operation**. It is one Undo step and applies to all selected materials.

Editing those values directly changes the selector to `Custom`. This does not mean the state is invalid; it only means the values are not one of the preset combinations.
:::

`Soft 2D Shadow (Face Corrected)` requires [camera depth](/guides/depth-effects#플랫폼별-깊이-확보). On screens without depth, no shadow remains on the face. If VRChat's standard screen is your target, prepare a face shadow texture as well.

If the real-time shadow is misaligned with the face, use `Real Shadow Caster Offset` to make a fine adjustment by pushing the face-region shadow caster along the normal.

### Face Cast Adjustment

The nonfunctional `Uniform Face Cast` and `Face Cast Stabilization` controls were removed in 0.1.7. Adjust bangs shadows with `Shadow Mode`, `Real Shadow Caster Offset`, the 2D Shadow face assist, and Face SDF. → [Light and Shadow](/guides/light-and-shadow#얼굴의-스치는-그림자)

### Face SDF — Use It Without Scripts

When the separate Face SDF Studio product is installed, it can create four-direction Packed RGBA or Single Channel face SDF maps. Base UV works on its own; selecting `Baked Front UV7` fixes the projected front coordinates. → [Face SDF and Face SDF Studio](/guides/face-sdf)

:::tip[Set up Face Shading first]
SDF changes the order in which shadow covers the face. It cannot replace correct face-region selection, proxy normals, or `Face Boundary` setup.
:::

<!-- SCREENSHOT: Face SDF Studio -->

---

## Character Height Gradient {#캐릭터-높이-그라데이션}

**Bake height relative to the character root into UV4**, then tint the character by that height. Use it to darken the feet or add color to a clothing hem.

:::danger[UV4 must be baked first]
UV4.x must contain height relative to the **entire character** root. It is character-level, not mesh-level. → [Mesh UV Bakes — Character Height (UV4)](/guides/mesh-bakes#캐릭터-높이-uv4)
:::

| Property | Purpose |
|---|---|
| `Lower Color` / `Upper Color` | The two colors |
| `Gradient Direction` | Switching to top → bottom swaps the positions of the colors |
| `Boundary Height` | Height where the two colors are mixed equally |
| `Boundary Softness` | Spread around the boundary. **At 0, the transition is hard** |
| `Curve Exponent` | Transition curve |
| `Influence` | Overall amount |

:::tip[Common use]
Leave `Upper Color` white (no change) and darken only `Lower Color` to create a natural grounded feel toward the feet.
:::

## Next

[Outline](/guides/outline) · [Mesh UV Bakes](/guides/mesh-bakes)
