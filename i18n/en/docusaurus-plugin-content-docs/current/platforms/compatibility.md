---
id: compatibility
title: Supported Environments
sidebar_position: 2
---

# Supported Environments

> This page is for people checking whether MingToon works in their environment.

## The 30-second verdict

If all three below are yes, you can use it.

1. It is a PC. Windows, macOS or Linux.
2. You open the project with Unity 2021.3 or 2022.3.
3. If you will upload to VRChat, it is Unity 2022.3.22f1.

If any of them is not, find that row in the tables below.

## Unity version {#unity-버전}

| Target | Unity | Why |
|---|---|---|
| **VRChat PC** | **2022.3.22f1** | It matches the current VRChat SDK. The VRChat integration code only compiles on the 2022.3 stream |
| **WARUDO** | **2021.3.45f2** | It matches WARUDO Mod SDK 0.14.3.10 |
| General Unity | 2021.3 or 2022.3 | Both are supported streams |

:::caution[One project cannot serve both targets]
VRChat and WARUDO use different editor versions. Split the projects by target.
:::

### How Validate Project judges the version

The supported editor streams are both 2021.3 and 2022.3. Either way, the `MING-ENV-UNITY-VERSION` error does not appear.

If the VRC SDK is present but the editor is not on the 2022.3 stream, a `MING-VRC-UNITY-VERSION` warning appears.

That warning means there is no avatar upload support. Other targets are unaffected.
→ [Validate Project Codes](/reference/validator#ming-vrc-unity-version)

## Hardware requirements (required) {#하드웨어-요구-사항-필수}

Every MingToon pass declares shader model 4.5.

| Platform | Supported |
|---|---|
| Windows · macOS · Linux (DirectX 11 or later · Vulkan · Metal) | Supported |
| Android · Quest | Not supported |
| iOS | Not supported |
| WebGL | Not supported |

:::danger[Failing the requirement fails silently]
On a platform that cannot meet shader model 4.5, the whole SubShader drops out.
The only result is materials showing as magenta, with no error message.
:::

If the current build target does not meet the requirement, a `MING-ENV-BUILD-TARGET` error appears. Check with `StudioRaming > MingToon > Validate Project`.

## Compatibility by environment

The status labels mean the following.

- **Main target** — development and regression testing happen in this environment.
- **Awaiting verification** — it was built to work, but on-device confirmation is not finished.
- **Not supported** — behavior is not guaranteed.

| Environment | Status | What you need to do |
|---|---|---|
| **VRChat PC** (2022.3.22f1 · BRP) | Main target | → [VRChat](/platforms/vrchat) |
| **WARUDO 0.14.3.10** (2021.3.45f2 · BRP) | Awaiting verification | → [Warudo](/platforms/warudo) |
| General Unity **BRP** | Awaiting verification | Turn on the camera Depth Texture if you use depth effects |
| Unity 2021.3 **URP 12.x** | Awaiting verification | Install the MingToon URP shaders and Renderer Features |
| **VRChat Quest** | Not supported | See below |
| VRChat + URP | Not supported | Switch to a BRP build |

:::caution[URP 13 and above are out of scope]
URP targets only Unity 2021.3 + URP 12.x. Even if it appears to work, do not treat it as supported.
:::

## VRChat Quest {#vrchat-quest}

MingToon is not a mobile shader target. You cannot upload MingToon shaders to Quest as they are.

If you need Quest support, build it separately with a mobile shader the SDK allows. No automatic conversion path is provided.

The MingToon Manager's Quest check counts what you lose in a replacement. Outlines, translucency and depth effects are the main ones.

## Post Processing Stack v2 (optional)

MingToon works completely without PPv2.

VRChat avatars follow the world's post-processing. PPv2 is mainly for scene checks and capture.
→ [Installation](/getting-started/installation#선택-사항-post-processing-stack-v2)

## Differences that only apply when using BRP and URP together

<details>
<summary>Texture import settings apply differently per backend</summary>

BRP reads layer textures through `_MainTex`'s sampler. So `_MainTex`'s Filter and Wrap settings apply to every layer.

URP uses a fixed inline sampler (Linear · Repeat). The Filter and Wrap settings of individual textures are ignored.

The two backends only look different when `_MainTex` is imported as Clamp or Point.

If you plan to use both backends, leave `_MainTex` at its defaults (Bilinear · Repeat).

This is an intended constraint of the URP pass structure. Giving every layer its own sampler would exceed the sampler slot limit.

</details>

## Next

[VRChat](/platforms/vrchat) · [Warudo](/platforms/warudo) · [Troubleshooting](/troubleshooting#install)
