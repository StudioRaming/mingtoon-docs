---
id: shader-structure
title: Shader Structure and Passes
sidebar_position: 1
---

# Shader Structure and Passes

Use this page when investigating surface modes or depth. **The number of declared passes is not the number of draws in a frame.** Baking, feature switches, cameras and lights affect execution; inspect actual draws with Frame Debugger.

## Built-in passes

| Declaration order | Pass | LightMode | Purpose |
|---|---|---|---|
| 1 | `FORWARD_BASE_BACKFACE` | ForwardBase | Backface rendering for the two-sided dual-pass option |
| 2 | `FORWARD_BASE` | ForwardBase | Main light, environment and surface effects |
| 3 | `FORWARD_ADD` | ForwardAdd | Additional pixel-light contribution |
| 4 | `TRANSPARENT_DEPTH_PREPASS` | Always | Transparent depth prepass |
| 5 | `OUTLINE_HULL_DIRECT` | ForwardBase | Mesh-expanded Normal Outline |
| 6 | `SHADOW_CASTER` | ShadowCaster | Light shadows and Built-in camera-depth paths |

This table describes declarations in the BRP editable shader. URP uses separate passes and Renderer Features; do not transfer this order or count to URP. See [Compatibility](/platforms/compatibility).

### Main surface {#2-forward_base}

Most surface effects run in the main pass. Two-sided dual-pass rendering can add backface work. Additional-light cost depends on the affecting lights and rendering path.

### Transparent depth prepass

Transparent mode does not write depth in its color pass. A prepass writes depth without color to reduce some overlap or outline problems. It can hide translucent layers behind it, so **it does not solve every transparency-sorting problem.**

Collapsing inactive triangles does not make vertex processing and draw submission free. Check the generated shader to determine whether baking actually removed a pass.

### Shadows and camera depth {#5-shadow_caster}

Keeping ShadowCaster enabled, contributing to camera depth, and casting a light shadow are separate conditions. The existence of a pass does not put a transparent-queue surface into the camera depth texture.

Camera-depth contribution controls whether other 2D effects can read this surface as an occluder. Distinguish it from color-depth sorting and light-shadow settings.

## What surface mode changes {#표면-모드가-실제로-바꾸는-값}

These are default presets. Alpha To Coverage and advanced buffer settings can change the final state.

| Surface mode | RenderType | Queue | Default blend | ZWrite |
|---|---|---:|---|---|
| Opaque | Opaque | 2000 | One / Zero | On |
| Cutout | TransparentCutout | 2450 | One / Zero | On |
| Semi-Transparent | Opaque | 2499 | SrcAlpha / OneMinusSrcAlpha | On |
| Transparent | Transparent | 3000 | SrcAlpha / OneMinusSrcAlpha | Off |

Semi-Transparent writes depth, so nearer faces can hide those behind them. Transparent is an option for overlapping translucent layers, but sorting still needs inspection. Queue 2499 lies within Built-in's opaque depth collection range; **camera-depth supply and material participation conditions are still required.**

Changing surface mode synchronizes related queue, blend, depth, culling and outline-buffer states. Do not assume all advanced render settings are preserved. Alpha To Coverage also adjusts the blend combination and needs verification with MSAA.

## Shader keywords {#셰이더-키워드}

Module keywords work together with properties. An enabled keyword does not prove that an effect runs or is visible. Check the overall effects toggle, role, strength, textures and camera-depth conditions as appropriate.

### Layer tier keywords {#레이어-티어-키워드}

| Module | Additional tier keywords |
|---|---|
| Texture layers | `_MING_STACK_4`, `_MING_STACK_10` |
| Normal layers | `_MING_NORMAL_2`, `_MING_NORMAL_5` |
| Matcap layers | `_MING_MATCAP_2`, `_MING_MATCAP_5` |

Tiers define the compiled slot range; actual layer count also controls runtime branches. Reducing the count within a tier can change executed work. Do not infer performance from the tier alone.

## Editable and generated shaders

The editable shader keeps code available for changing settings. Generated shaders reduce unused paths while respecting animation and bake exclusions. This does not guarantee that initial imports or new variants never require compilation.

VRChat fallback depends on the `VRCFallback` tag and host policy and does not reproduce every MingToon feature. Transparent fallback can look different. See [VRChat rules](/internals/vrc-rules).

## Related pages

- [Basic settings](/guides/basics)
- [Modules and performance cost](/internals/module-cost)
- [What baking removes](/internals/bake-internals)
