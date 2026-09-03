---
id: shader-structure
title: Shader Structure and Passes
sidebar_position: 1
---

# Shader Structure and Passes

**After reading this document**, you'll understand what MingToon actually draws and how many times per frame, and grasp the fundamental reason why surface modes behave as they do.

This isn't essential for creating looks. But when **you see something that doesn't make sense**, the answer is here.

## SubShader

```text
Tags {
  Queue              = Geometry
  RenderType         = Opaque
  IgnoreProjector    = False
  MingToonFamily     = 1
  MingToonSurfaceKind = BRP
  VRCFallback        = toonstandardoutline
}
LOD 300
```

| Tag | Meaning |
|---|---|
| `MingToonFamily` · `MingToonSurfaceKind` | Identifiers that MingToon tools use to recognize their materials. Backend switching, baking, and bulk editing all use these to find targets |
| **`VRCFallback = toonstandardoutline`** | The shader VRChat uses as a fallback when shaders are hidden → see below |
| `IgnoreProjector = False` | The material receives projector influence |

:::note[Why VRCFallback matters]
When someone in VRChat **sets Shaders to Hidden**, my avatar appears as the fallback shader. MingToon specifies `toonstandardoutline`, so **in that situation, toon shading and outlines remain.** It looks closer to the original than a shader that falls back to Standard.
:::

All render states are exposed as properties — `_Cull` `_ZWrite` `_SrcBlend` `_DstBlend` `_BlendOp` `_ZTest` `_ColorMask`. Surface mode adjusts all of these values at once.

---

## Five Passes

| Order | Pass Name | LightMode | When Drawn |
|---|---|---|---|
| 1 | `TRANSPARENT_DEPTH_PREPASS` | `Always` | Draws actual triangles only for transparent variants |
| 2 | `FORWARD_BASE` | `ForwardBase` | Main light + ambient. The body. |
| 3 | `FORWARD_ADD` | `ForwardAdd` | Once per additional light source |
| 4 | `OUTLINE_HULL_DIRECT` | `ForwardBase` | Normal outline |
| 5 | `SHADOW_CASTER` | `ShadowCaster` | Shadow map + camera depth texture |

<!-- SCREENSHOT: Pass order in MingToon as seen in Frame Debugger -->

### 1. TRANSPARENT_DEPTH_PREPASS

**Problem it solves** — The transparent pass draws triangles **in index order, not depth order**. So even within a single mesh, a strand of hair behind the cheek will draw on top of the cheek if it's later in the buffer. **You cannot fix this with blend state. Only depth sorting sorts fragments.**

This pass **blocks color and records surface depth first**, and the later color passes test against that depth.

The outline hull is also fixed by the same recording. The hull is an enlarged copy of the surface, so if the buffer were empty, there'd be no reason to paint over the eyes and mouth. Now the surface owns those pixels.

:::note[Opaque and cutout pay no cost]
It's not clipping fragments at the shader stage. Then the vertex stage would still run over the entire mesh. **We fold triangles into degenerate positions** so they don't rasterize at all.
:::

:::tip[Why LightMode is `Always` not `ForwardBase`]
`Material.SetShaderPassEnabled` works on **the LightMode tag, not the pass name**. If the prepass were `ForwardBase`, toggling just this pass would turn off the surface pass and outline pass together. `Always` is a tag the same forward loop declares in order, and no other pass uses it, so **you can turn it on and off alone.**
:::

The alpha mask keyword (`_MING_ALPHA_MASK`) compiles in this pass too. Otherwise, holes cut by the mask would record depth and block what's behind.

### 2. FORWARD_BASE {#2-forward_base}

The body. Nearly every module calculates here. The pass with the most keywords that compile.

### 3. FORWARD_ADD

**Drawn once for each additional light (point/spot).** This is where draw calls multiply in light-rich worlds.

Turn off `Additional Light Receive` to remove this pass's contribution. → [Light & Shadow](/guides/light-and-shadow#추가-광원)

### 4. OUTLINE_HULL_DIRECT

Normal outline. **Exactly one extra pass** here.

LightMode is `ForwardBase` so it runs with the main light pass, but it has its own `_OutlineHullCull` (default Front) · `_OutlineHullSrcBlend` · `_OutlineHullDstBlend` · `_OutlineHullZWrite` · its own stencil set. So you can control render state independently from the surface.

### 5. SHADOW_CASTER {#5-shadow_caster}

Writes the shadow map. **But this pass is not just for shadows.**

:::danger[Both transparent modes keep the ShadowCaster pass on]
Built-in **fills `_CameraDepthTexture` through this pass.** That's the texture read by 2D shadow, 2D rim light, and inner 2D edge.

If you turn off the pass, the character disappears from its own depth, which is why transparent materials had to disable these modules entirely before.

Now instead, the fragment side **suppresses light shadow rendering only**, so something that never cast shadows doesn't start casting them.
:::

This is why the `Transparent · Outline Depth Ready` mode exists.

---

## What Surface Mode Actually Changes {#표면-모드가-실제로-바꾸는-값}

| Surface Mode | RenderType | Render Queue | Src/Dst Blend | ZWrite | Outline Buffer |
|---|---|---|---|---|---|
| **Opaque** | `Opaque` | 2000 (Geometry) | One / Zero | On | Normal |
| **Cutout** | `TransparentCutout` | 2450 (AlphaTest) | One / Zero | On | Normal |
| **Transparent · Outline Depth Ready** | **`Opaque`** | **2499** | SrcAlpha / OneMinusSrcAlpha | On | **Stable Mode** |
| **Transparent** | `Transparent` | 3000 | SrcAlpha / OneMinusSrcAlpha | Off | Normal |

:::tip[Queue 2499 and RenderType Opaque are the key]
- **2499** — Inside the opaque range (under 2500). Both pipelines' range for generating the camera depth texture ends here.
- **RenderType is `Opaque`** — The pass that fills the depth texture selects targets by this tag.

Thanks to these two, depth-based modules all stay alive even while alpha-blending.
:::

In `Transparent · Outline Depth Ready`, the outline hull's blend also changes to **One / Zero** (stable mode). Prevents the hull from looking semi-transparent where it overlaps. In regular transparent, it's SrcAlpha / OneMinusSrcAlpha.

:::note[What surface mode doesn't change]
`Alpha Cutoff`, outline on/off, and all appearance values stay put. Only render state, default queue, and internal outline buffer state align.
:::

---

## Shader Keywords {#셰이더-키워드}

MingToon compiles most modules as **`shader_feature_local_fragment`**. You can turn them on and off independently per material, and they only affect the fragment stage.

### Module Keywords

| Keyword | Module |
|---|---|
| `_MING_FACE_SHADING` · `_MING_FACE_NORMAL_BAKED` | Face Shading / UV7 Bake in use |
| `_MING_STACK` | Texture Layers |
| `_MING_NORMAL_LAYERS` | Normal Layers |
| `_MING_MATCAP` | MatCap |
| `_MING_PBR` | PBR Surface |
| `_MING_EMISSION` · `_MING_OCCLUSION` | Emission / Occlusion |
| `_MING_FRESNEL_RIM` · `_MING_RIM_SHADE` | Rim Light / Rim Shade |
| `_MING_BACKLIGHT` · `_MING_FRONT_LIGHT` | Backlight / Front Light |
| `_MING_GLITTER` · `_MING_GLITTER_MASK` | Glitter / Dedicated Mask |
| `_MING_SHADOW_REFLECTION` | Shadow Interior Reflection |
| `_MING_FORM_SHADOW` · `_MING_FORM_SHADOW_2ND` | Form Shadow 1st / 2nd |
| `_MING_SHADOW_PATTERN` · `_MING_SHADOW_PATTERN_TILE` | Shadow Pattern / Shape Tile |
| `_MING_DEPTH_SHADOW` · `_MING_DEPTH_SHADOW_MASK` | 2D Shadow / Mask |
| `_MING_DEPTH_RIM` · `_MING_DEPTH_RIM_MASK` | 2D Rim Light / Mask |
| `_MING_INNER_EDGE_MASK` | Inner 2D Edge Mask |
| `_MING_ALPHA_MASK` | Alpha Mask |
| `_ALPHATEST_ON` | Cutout |

### Layer Tier Keywords {#레이어-티어-키워드}

Layer counts compile as **tiers**, not continuous values.

| Module | Tier |
|---|---|
| Texture Layers | (none) → `_MING_STACK_4` → `_MING_STACK_10` |
| Normal Layers | (none) → `_MING_NORMAL_2` → `_MING_NORMAL_5` |
| MatCap Layers | (none) → `_MING_MATCAP_2` → `_MING_MATCAP_5` |

:::tip[Cutting layer count from 5 to 4 might not reduce cost]
Within the same tier, the compiled code is identical. **Only crossing a tier boundary** (e.g., texture layer 4 → 5) actually changes anything. Baking looks at actual usage and re-picks the tier.
:::

### Variant Explosion Prevention

`#pragma skip_variants` removes unused Unity built-in variants.

- Prepass: lightmap · lightprobe · vertex lighting · all shadow variants · DIRECTIONAL/POINT/SPOT
- FORWARD_BASE: `LIGHTMAP_ON` `DIRLIGHTMAP_COMBINED` `DYNAMICLIGHTMAP_ON`

Character shaders don't use lightmaps, so these variants aren't needed.

---

## Editable Shader vs Generated Shader

| | Editable | Generated (Bake/Build) |
|---|---|---|
| Keywords | **All features + max tiers compiled once upfront** | Only what's actually used |
| While Editing | Toggling needs no compile wait | — |
| Property Block | | **Identical** |

:::note[Heavy during editing is normal]
The editable shader stays fully compiled, so when you toggle features on and off, you don't get blue placeholder colors or compile halts.

The generated shader has **the same ShaderLab Properties block** as the editable one, so [automatic optimization at build time](/workflow/build-optimization) can swap just the shader pointer without losing any of the values you've set.
:::

## Related Documents

- [Module & Performance Cost](/internals/module-cost)
- [What Baking Removes](/internals/bake-internals)
- [Basics — Start with Surface Mode](/guides/basics#1-표면-모드부터-정합니다)
