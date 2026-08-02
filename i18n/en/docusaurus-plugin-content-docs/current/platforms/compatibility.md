---
id: compatibility
title: Supported Environments
sidebar_position: 2
---

# Supported Environments

**After reading this guide** you can determine whether your environment supports MingToon and what you need to prepare.

## Unity Version {#unity-버전}

:::danger[Varies by target. Cannot share one project]
| Target | Unity | Why |
|---|---|---|
| **VRChat PC** (primary target) | **2022.3.22f1** | Current VRChat SDK baseline. MingToon's VRChat hooks and runtime compile only under `UNITY_2022_3_OR_NEWER` |
| **Warudo** | **2021.3.45f2** | Warudo Mod SDK 0.14.3.10 baseline |
| General Unity | 2021.3 LTS | |
:::

:::note[Validate Project's Unity version judgment]
Supported editor streams are **both 2021.3 and 2022.3**. Neither raises `MING-ENV-UNITY-VERSION` errors.

If VRC SDK is present but the editor is not on 2022.3 stream, `MING-VRC-UNITY-VERSION` **warning** appears. VRChat integration code compiles only on that stream, **but other targets are unaffected.** → [Validator Code](/reference/validator#ming-vrc-unity-version)
:::

## Hardware Requirements (Mandatory) {#하드웨어-요구-사항-필수}

All MingToon passes declare `#pragma target 4.5` (shader model 4.5).

:::danger[Unmet conditions fail silently]
On platforms that don't meet shader model 4.5, the entire SubShader is skipped. The result is **materials render magenta (pink), and no other error message appears**. Without checking this condition first, you cannot diagnose from logs alone.
:::

| Category | Supported |
|---|---|
| Windows / macOS / Linux (DirectX 11+ · Vulkan · Metal) | ✅ |
| Android / Quest | ❌ |
| iOS | ❌ |
| WebGL | ❌ |

If the current build target does not meet the requirement, `Tools > Studio Raming > MingToon > Validate Project` reports an error.

## Environment Compatibility

| Environment | Status | Actions Needed |
|---|---|---|
| **VRChat PC** (Unity 2022.3.22f1, BRP) | Primary target · Manual review · Uncertified | → [VRChat](/platforms/vrchat) |
| **VRChat Quest** | Not directly supported | See below |
| **Warudo 0.14.3.10** (Unity 2021.3.45f2, BRP) | Field verification pending | → [Warudo](/platforms/warudo) |
| Unity 2021.3 **BRP** (general) | Primary verification target · Release certification pending | Set standard lighting/shadows, then prepare Depth Texture if using depth effects |
| Unity 2021.3 **URP 12.x** | Optional verification target · Uncertified | Install MingToon URP shaders and required Renderer Features |
| VRChat + URP | Not supported | Switch to BRP build |

:::danger[URP 13+ is out of scope]
URP is **Unity 2021.3 + URP 12.x only** right now. Even if it appears to work, do not consider it supported. VRChat does not use URP.
:::

## VRChat Quest {#vrchat-quest}

MingToon is not a mobile shader target. If Quest support is needed, **convert separately** to a mobile shader the SDK allows, and review what features are lost. We do not provide an automatic conversion path.

## Texture Import Settings Backend Differences

Only relevant when planning to use both BRP and URP together. If VRChat is your only target, skip this.

- **BRP** samples layer textures using the `_MainTex` sampler. Therefore, the `_MainTex` import Filter/Wrap settings **apply to all layers**.
- **URP** uses a fixed inline sampler (Linear/Repeat). Individual texture Filter/Wrap settings are **ignored**.

As a result, the two backends look different only when `_MainTex` is **imported as Clamp or Point**.

:::tip[If using both backends together]
Keep `_MainTex` at its default (**Bilinear / Repeat**).
:::

This is an intentional URP pass-structure constraint. If each layer texture had a dedicated sampler, you would exceed sampler slots; if they shared the `_MainTex` sampler, passes that don't use `_MainTex` would fail to compile.

## Post Processing Stack v2 (Optional)

BRP PPv2 is optional and MingToon works completely without it. VRChat avatars follow the world's post-processing, so PPv2 is mainly for scene preview and photography. See [Installation](/getting-started/installation#선택-사항-post-processing-stack-v2) for setup.
