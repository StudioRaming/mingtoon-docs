---
id: detail-maps
title: Detail Maps
sidebar_position: 5
---

# Detail Maps

These are the layers and material qualities stacked on top of the base. For the layer families you have to raise the layer count first.

This page is a table for looking up values. If you want the order to turn things on in, see the [Detail Maps guide](/guides/detail-maps).

The headings and order follow the inspector's section names and display order exactly.

The fields inside map and mask slots are the same in every slot.

Channel, remap, feather and mask UV are written once in the [Shared Texture Slot UI](/guides/texture-modules).

## Additional Textures (up to 10) {#추가-텍스처-최대-10장}

Up to 10 surface layers. Adding a layer repeats the fields below once per layer.

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Surface Stack** | Toggle | - | Off | Off by default |
| **Surface Stack Layer Count** | Int | 0 ~ 10 | 0 | Range 0-10; default 0 |
| **Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Multiply | How this stack layer combines with the result below it |
| **Opacity** | Float | 0 ~ 1 | 1 | How much this layer is applied |

## Normal Maps (up to 5) {#노말맵-최대-5장}

Up to 5 normal layers. Adding a layer repeats the fields below once per layer.

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Normal Layers** | Toggle | - | Off | Off by default |
| **Normal Layer Count** | Int | 0 ~ 5 | 0 | Range 0-5; default 0 |

## MatCap (up to 5) {#매트캡-최대-5장}

Up to 5 matcap layers. Adding a layer repeats the fields below once per layer.

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable MatCap Layers** | Toggle | - | Off | Off by default |
| **MatCap Layer Count** | Int | 0 ~ 5 | 0 | Range 0-5; default 0 |
| **Metallic Areas Only** | Toggle | - | Off | Off by default |
| **Reflection Desaturation** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **MatCap Normal Map** | Texture | - | None | MatCap Normal Map |
| **MatCap Map** | Texture | - | None | A lighting and material image painted on a sphere |
| **Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Screen | How the MatCap combines with the surface |
| **Strength** | Float | 0 ~ 20 | 0.74 | How much this layer is applied |
| **MatCap Emission Intensity** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Base Color Influence** | Float | 0 ~ 1 | 0 | 0 ignores base color; at 1, darker base colors weaken the effect |
| **Normal Map Influence** | Float | 0 ~ 1 | 1 | 0 uses the mesh normal; 1 applies the complete stacked normal result |
| **MatCap Normal Map Intensity** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Form / AO Shadow Visibility** | Float | 0 ~ 1 | 0.28 | At 0, hides the MatCap in form shadow and ambient occlusion; at 1, keeps it… |
| **Cast / Depth Shadow Visibility** | Float | 0 ~ 1 | 0.28 | At 0, hides the MatCap in cast and depth shadows; at 1, keeps it fully visible… |
| **Light Brightness Link** | Float | 0 ~ 1 | 1 | 0 keeps current brightness; at 1, darker main light reduces MatCap contribution |
| **MatCap / Mesh UV Projection** | Float | 0 ~ 1 | 0 | 0 projects the MatCap from the view, 1 pins it to the mesh UV |
| **MatCap Rotation** | Float | -180 ~ 180 | 0 | Range -180-180 degrees; default 0 |
| **MatCap Circle Radius** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **MatCap Circle Feather** | Float | 0 ~ 1 | 0.25 | Range 0-1; default 0.25 |

## PBR Surface {#pbr-표면}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable PBR Surface** | Toggle | - | Off | Off by default |
| **Workflow** | Enum | Specular / Metallic | Metallic | Metallic derives the reflection color from the metallic value; Specular lets you… |
| **Metallic** | Float | 0 ~ 1 | 0 | 0 is dielectric, 1 is metal |
| **Smoothness** | Float | 0 ~ 1 | 0.5 | Higher values give smaller, sharper reflections |
| **Specular Intensity** | Float | 0 ~ 2 | 1 | Range 0-2; default 1 |
| **Use Packed Mask** | Toggle | - | Off | Reads metallic, occlusion and smoothness from one packed texture by channel |
| **PBR Packed Mask** | Texture | - | None | Default packing is R = metallic, G = occlusion, A = smoothness |
| **Metallic Channel** | Enum | R / G / B / A | R | Which channel of the packed mask holds metallic |
| **Invert Metallic** | Toggle | - | Off | Flips the sampled metallic value |
| **Occlusion Channel** | Enum | R / G / B / A | G | Which channel of the packed mask holds reflection occlusion |
| **Invert Occlusion** | Toggle | - | Off | Flips the sampled reflection-occlusion value |
| **Reflection Occlusion** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Smoothness Channel** | Enum | R / G / B / A | A | Which channel of the packed mask holds smoothness |
| **Roughness / Invert** | Toggle | - | Off | Turn this on when the texture stores roughness instead of smoothness; the… |
| **Use Specular Color Map (RGB)** | Toggle | - | Off | Sources the specular color from a texture |
| **Invert Specular Color Map** | Toggle | - | Off | Inverts the RGB of the specular color map |
| **Direct Highlight Intensity** | Float | 0 ~ 4 | 1 | Range 0-4; default 1 |
| **Visible In Shadow** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Normal Map Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Highlight Toon Amount** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Highlight Toon Threshold** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.5 |

## Reflection {#반사}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Reflection** | Toggle | - | Off | Enables main-light, additional-light, and environment reflection plus the… |
| **Main Light Specular** | Toggle | - | On | Applies the reflection color and mask to the main light's direct highlight… |
| **Additional Light Specular** | Toggle | - | On | Applies reflection to direct highlights from point, spot, and other additional… |
| **Environment Reflection** | Toggle | - | On | Applies reflection probes, skybox reflection, and the material cubemap, matching… |
| **Environment Reflection Intensity** | Float | 0 ~ 4 | 0 | Range 0-4; default 0 |
| **Reflection Blur Bias** | Float | -1 ~ 1 | 0 | Range -1-1; default 0 |
| **Reflection Desaturation** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Reflection Tint** | Color | - | White | HDR tint for environment reflection; default is (1, 1, 1) |
| **Dielectric Reflectance** | Float | 0 ~ 1 | 0.04 | Range 0-1; default 0.04 |
| **Use Reflection Color Map** | Toggle | - | Off | Multiplies Reflection Color by the texture's RGB and alpha |
| **Reflection Color / Mask** | Texture | - | None | RGB tint and A mask corresponding to lilToon's Reflection Color Tex |
| **Reflection Color** | Color | - | White | HDR post-lobe colour, matching lilToon's Reflection Color |
| **Apply Surface Transparency** | Toggle | - | Off | Multiplies surface alpha into the reflection colour alpha |
| **Reflection Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Add | How the reflection colour is composited onto the surface |
| **Use Cubemap** | Toggle | - | On | Whether the material's own cubemap feeds the reflection |
| **Reflection Cubemap** | Texture | - | None | Material cubemap sampled when the reflection probe is empty or Override… |
| **Cubemap Tint** | Color | - | Black | HDR tint applied to the material cubemap |
| **Override Reflection Probe** | Toggle | - | Off | Uses the material cubemap even when a scene reflection probe exists |
| **Cubemap Light Influence** | Float | 0 ~ 1 | 1 | Controls how much the resolved main-light colour and intensity affect the… |
| **Fresnel Power** | Float | 1 ~ 8 | 5 | Range 1-8; default 5 |

## Toon Specular {#툰-스페큘러}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Toon Specular** | Toggle | - | Off | Off by default |
| **Toon Specular Color** | Color | - | White | White by default |
| **Toon Specular Blend Mode** | Enum | Normal / Multiply / Add / Screen / Color / Overlay | Add | Add by default |
| **Blend Opacity** | Float | 0 ~ 1 | 1 | How strongly the toon specular highlight blends in |
| **Intensity** | Float | 0 ~ 8 | 0.5 | Range 0-8; default 0.5 |
| **Highlight Color Source** | Enum | Single Color / Mask Texture Color | Single Color | Single Color uses only the color you set |
| **Mask Color Amount** | Float | 0 ~ 1 | 1 | At 0 the highlight keeps the color you set; at 1 the mask color is applied in… |
| **Enable Toon Specular Mask** | Toggle | - | On | On by default |
| **Mode** | Enum | Isotropic / Anisotropic | Isotropic | Isotropic by default |
| **Smoothness** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.5 |
| **Threshold** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.5 |
| **Softness** | Float | 0.001 ~ 1 | 0.05 | Range 0.001-1; default 0.05 |
| **Anisotropic Shift** | Float | -1 ~ 1 | 0 | Range -1 to 1; default 0 |
| **Normal Map Influence** | Float | 0 ~ 1 | 1 | 0 = mesh normal, 1 = fully stacked normal maps |
| **Shadow Visibility** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Base Color Influence** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Scene Light Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |

## Emission {#이미션}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Emission** | Toggle | - | Off | Off by default |
| **Emission Map** | Texture | - | None | Texture that marks the self-illuminated areas |
| **Emission Color** | Color | - | White | The glow color |
| **Emission Blend Mode** | Enum | Normal / Add / Screen / Multiply | Add | How the glow is composited onto the surface beneath it - the same four modes as… |
| **Emission Blend Strength** | Float | 0 ~ 1 | 1 | How much of the blend above is applied |
| **Glow Map · Intensity** | Float | 0 ~ 16 | 1 | Multiplier on the glow brightness |
| **Base Color Influence** | Float | 0 ~ 1 | 0 | Mixes the base map's colour into the glow |
| **Glow Map · Visibility in Shadow** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Glow Map · Map Alpha Masks Intensity** | Toggle | - | On | Uses the emission map's alpha channel as a per-pixel intensity mask |
| **Emission Scroll Speed** | Float | Four values | 0, 0, 0, 0 | Scrolls the emission map over time |
| **Enable Emission Layer 2** | Toggle | - | Off | Turn on a second emission map when different areas need different glow colors |
| **Emission Blend Mode (Layer 2)** | Enum | Normal / Add / Screen / Multiply | Add | How layer 2's glow is composited onto the surface beneath it |
| **Emission Blend Strength (Layer 2)** | Float | 0 ~ 1 | 1 | How much of layer 2's blend is applied |
| **Glow Map Layer 2 · Intensity** | Float | 0 ~ 16 | 1 | - |
| **Base Color Influence (Layer 2)** | Float | 0 ~ 1 | 0 | Mixes the base map's colour into layer 2's glow |
| **Glow Map Layer 2 · Visibility in Shadow** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Glow Map Layer 2 · Map Alpha Masks Intensity** | Toggle | - | On | Uses the emission map's alpha channel as a per-pixel intensity mask |
| **Emission Scroll Speed (Layer 2)** | Float | Four values | 0, 0, 0, 0 | Scrolls emission layer 2 over time |

## Occlusion {#오클루전}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Occlusion** | Toggle | - | Off | Off by default |
| **Occlusion Map** | Texture | - | None | Grayscale map that darkens areas indirect light cannot reach |
| **Occlusion Intensity** | Float | 0 ~ 1 | 1 | How much of the occlusion map is applied |

## Glitter {#글리터}

| Inspector label | Type | Range | Default | What it does |
|---|---|---|---|---|
| **Enable Glitter** | Toggle | - | Off | Off by default |
| **Color** | Color | - | White | HDR sparkle color; default is (1, 1, 1) |
| **Intensity** | Float | 0 ~ 8 | 8 | Range 0-8; default 8 |
| **Enable Glitter Mask** | Toggle | - | Off | Off by default |
| **Application Mask · Use Color Too** | Toggle | - | Off | Off by default |
| **Use Glitter MatCap** | Toggle | - | Off | Off by default |
| **MatCap Texture** | Texture | - | None | The glitter-only matcap |
| **MatCap Limit · Use Color Too** | Toggle | - | Off | Off by default |
| **Invert** | Toggle | - | Off | Off by default |
| **MatCap Limit · Strength** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Enable Shape Map** | Toggle | - | Off | Off by default |
| **Shape Map** | Texture | - | None | The silhouette of a single particle |
| **Shape Channel** | Enum | R / G / B / A / Luma | A | Default is A |
| **Rotation Randomize** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Scale** | Float | 1 ~ 512 | 379 | Range 1-512; default 379 |
| **Particle Size** | Float | 0 ~ 1 | 0.39 | Range 0-1; default 0.39 |
| **Size Randomize** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Particle Contrast** | Float | 0.25 ~ 128 | 50 | Range 0.25-128; default 50 |
| **Post Contrast** | Float | 0.1 ~ 8 | 1 | Range 0.1-8; default 1 |
| **Sensitivity** | Float | 0.01 ~ 64 | 0.25 | Range 0.01-64; default 0.25 |
| **Speed** | Float | 0 ~ 4 | 0.3 | Range 0-4; default 0.3 |
| **View Parallax** | Float | 0 ~ 1 | 0.52 | Range 0-1; default 0.52 |
| **Normal Influence** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Light Angle** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Light Direction** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Color Randomize** | Float | 0 ~ 1 | 1 | Range 0-1; default 1 |
| **Shadow Visibility** | Float | 0 ~ 1 | 0.54 | Range 0-1; default 0.54 |
| **Base Color Influence** | Float | 0 ~ 1 | 0 | Range 0-1; default 0 |
| **Scene Light Influence** | Float | 0 ~ 1 | 0.5 | Range 0-1; default 0.5 |

## Related pages

- [Detail Maps usage guide](/guides/detail-maps)
- [Shared Texture Slot UI](/guides/texture-modules) — the channel, remap and UV fields inside map and mask slots
- [Troubleshooting](/troubleshooting)
