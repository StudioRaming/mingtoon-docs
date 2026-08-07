---
id: detail-maps
title: Detail Maps
sidebar_position: 7
---

# Detail Maps

**After reading this guide**, you can layer textures on top of the base and apply material texture with PBR, MatCap, and Emission.

This covers the **Detail Maps** group in the Inspector — `Texture Layers` · `Normal Layers` · `MatCap Layers` · `Occlusion` · `Emission` · `Glitter` · `PBR Surface`. For a complete reference, see [Detail Maps Reference](/reference/detail-maps).

## Common Pitfall in All Layer Sections

:::danger[Increase Layer Count First]
Slots positioned after `Layer Count` **skip calculation entirely.** If you add a texture but see nothing, nine times out of ten the Layer Count is too low.

The same result occurs when each layer's `Opacity` (or `Intensity` for MatCap) is set to 0.
:::

Texture Layers, Normal Layers, and MatCap Layers all work the same way.

---

## Texture Layers {#텍스처-레이어}

Blends additional textures on top of the base. Used for tattoos, logos, partial coloring, and weathering effects.

For each layer:

- `Blend Mode` — `Normal` fully covers, `Multiply` preserves the tone below while only blending the color.
- `Opacity` — At 0, the layer calculation is skipped.
- You can use a mask to limit the applied area.

---

## Normal Layers {#노멀-레이어}

Stacks multiple normal maps. Layer 01 is the same slot as `Normal Map` in [Basics](/guides/basics#4-공통-맵).

- `Normal Map` — Slots positioned after Layer Count are not calculated.
- `Normal Strength` — The intensity with which this layer blends into the final normal. At 0, the texture has no effect.

---

## MatCap Layers {#맷캡-레이어}

Projects a lighting and material image painted on a sphere based on the camera's viewpoint. As the camera rotates, the highlight follows.

| Item | Function |
|---|---|
| `MatCap Map` | Sphere image |
| `Blend Mode` | `Add` and `Screen` create bright highlights; `Multiply` creates dark material texture |
| `Contrast` | 1 is original. Increasing sharpens the division between highlights and dark areas, strengthening the cel feel |
| `Intensity` | At 0, the layer calculation is skipped |
| `MatCap / Mesh UV Projection` | **At 0, camera-based; at 1, fixed to mesh UV** |

:::tip[Tattoos and Face Painting]
Set `MatCap / Mesh UV Projection` to 1 so the pattern sticks to the surface and doesn't move when the camera rotates.
:::

---

## PBR Surface {#pbr-표면}

In toon style, PBR is not "use or don't use" but rather **how much and where to apply it**. It's typically used only for metal accessories, enamel shoes, and wet lips.

Adjustment order:

1. **Workflow** — Choose `Metallic` (generates reflection color from metallic value) or `Specular` (specify reflection color directly). When Specular is selected, the metallic slider has no effect.
2. **Specular Strength** — **At 0, both direct highlights and environment reflections disappear.** If smoothness doesn't change the look, check here first.
3. **Smoothness** — 0.3–0.6 works well for toon style. Close to 1 makes highlights pinpoint-sized.
4. **Visible In Shadow** — How much highlight to retain in shadowed areas. At 0, it disappears completely inside shadows. Lower values look cleaner in toon style.
5. **Direct Highlight Strength** — At 0, highlight calculation is skipped entirely.
6. **Environment Reflection Strength** — Has little effect if the scene has no Reflection Probe.
7. **Normal Map Influence** — At 0, uses mesh normal only; at 1, directly reflects stacked normal maps.

### Packed Mask {#패킹-마스크}

Reads metallic, occlusion, and smoothness from a single texture by channel. Default layout is **R=Metallic, G=Occlusion, A=Smoothness**; if using a different texture, adjust channel settings.

- If you're using a roughness map, enable `Use Roughness (Invert)`.
- If `Reflection Occlusion` is 0, the PBR occlusion channel and invert settings won't affect the result.

:::caution[When Packed Mask is Off]
The channel and invert settings below **are completely ignored**, and only the metallic and smoothness slider values are used.
:::

---

## Toon Specular {#툰-스페큘러}

Adds light-direction highlights without enabling full PBR, suitable for cel highlights on hair, eyes, or cloth.

1. Enable `Toon Specular`.
2. Choose Isotropic or Anisotropic under `Shape Method`.
3. Set size and brightness with `Intensity` and `Smoothness`.
4. Refine the cel boundary with `Threshold` and `Softness`.
5. For hair, adjust Anisotropic direction and Shift.
6. Optionally limit the range with masks and gradients.

| Method | Suitable for |
|---|---|
| **Isotropic** | Rounded highlights on eyes, metal buttons, or wet skin |
| **Anisotropic** | Long flowing highlights on hair, silk, or brushed surfaces |

:::tip[Can be used with PBR]
Use PBR for environment reflections and material response, and Toon Specular for direct-light cel highlights. Raising both too high can blow out overlapping highlights.
:::

## Region Mask {#영역-마스크}

Divides parts of one material into four RGBA regions and adjusts surface response independently.

1. Enable `Use Region Mask`.
2. Assign an RGBA texture to `Region Mask`.
3. Adjust metallic, smoothness, environment reflection, and Toon Specular intensity/smoothness offsets for each R/G/B/A region.

:::caution[Use with PBR or Toon Specular]
Region Mask adjusts surface response. With both PBR and Toon Specular disabled there is nothing to adjust.
:::

### Starter presets

0.1.4 includes `MetalHybrid` · `SkinSubtle` · `EyeGlossy` · `ClothSheen` · `HairAnisotropic` · `MetalCel` · `CharacterParts` starter presets.

---
## Emission {#이미션}

Map × Color × Intensity.

- If `Emission Color` is **black, the map won't glow even if present.** It's HDR, so you can exceed 1 to trigger bloom.
- `Emission Intensity` — Without bloom post-processing in the scene, increasing the value won't blur; it just saturates to white.

`Emission Intensity` is also available in Quick Settings.

---

## Occlusion {#오클루전}

A grayscale map that darkens areas where indirect light is hard to reach. **It does not affect direct light**, so it's less visible when the mesh receives strong lighting from the front.

If `Occlusion Strength` is 0, adding the map produces no change.

---

## Glitter {#글리터}

Voronoi particle sparkle. Configure distance stabilization, viewpoint sensitivity, light angle, and size/color randomization.

Start with the toggle, color, and intensity, then fine-tune the details.

### Changing the particle shape {#입자-모양-바꾸기}

Turn on `Enable Shape Map` and put a texture in `Shape Map`, and each particle's silhouette becomes that picture. Six ship in `Textures/Glitter/`: **Star, Bloom, Sparkle, Heart, Hex, and Flower**.

- `Shape Channel` picks which channel carries the silhouette. The default is A; use A for a PNG with alpha, or R / Luma for a black-and-white image.
- `Rotation Randomize` turns each particle to a different angle. The default is 1; lower it to 0 **only when a directional shape such as a heart should stand upright**.

:::caution[Leave a margin when drawing your own]
The square of the shape map is laid **inside** the round particle. Fill it to the edge and the corners get clipped. The background must be black (or alpha 0).
:::

### One mask carrying both the region and the colour {#마스크-한-장으로-영역과-색}

Turn on `Use Color Too` in the `Mask` group and the same mask texture is read as full RGBA: **alpha is where the sparkle appears and RGB tints the particles**. It costs no extra texture sample.

While it is on, the `Channel` selector is fixed to alpha - once RGB leaves as colour, alpha is the only channel left to pick the region with.

## Next

[Character Expression](/guides/character)
