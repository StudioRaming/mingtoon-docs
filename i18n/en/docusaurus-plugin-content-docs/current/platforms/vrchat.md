---
id: vrchat
title: VRChat
sidebar_position: 1
---

# VRChat

**After reading this guide** you will understand the steps for uploading MingToon to VRChat PC avatars and where depth effects are guaranteed to work.

VRChat PC is MingToon's **primary target**.

:::caution[Current Status]
By closed beta standards, VRChat PC is **under manual review and release certification is not complete.** Pass the checklist below yourself before uploading.

VRChat **Quest** is not a direct target for MingToon. → [Supported Environments](/platforms/compatibility#vrchat-quest)
:::

## Unity Version

:::danger[2022.3.22f1]
This is the current VRChat SDK baseline. MingToon's VRChat build hooks and runtime only compile under `UNITY_2022_3_OR_NEWER`, so **this code does not exist at all on 2021.3.** Uploads proceed, but automatic optimization and depth promotion do not trigger.

**You cannot use the same project for both Warudo (2021.3.45f2) and VRChat.** Split by target.
:::

## Upload Checklist

1. **Verify build hook** — After script reload, Console should show `[MingToon] VRChat build hook compiled and registered.` Without it, optimization does not apply at all.
2. **Run readiness check** — MingToon Manager's `Run Readiness Check`. → [Upload Readiness](/workflow/character-manager#내보내기--검증)
3. **Upload** — [Automatic optimization on build](/workflow/build-optimization) applies automatically. **Manual bake is not required.**
4. **Final verification with SDK Builder**
5. **In-game confirmation** — Check your view · mirror · Photo Camera **each separately**.

<!-- SCREENSHOT: VRChat SDK Builder screen -->

## Do Not Remove MingToon Components

:::danger[Removing by hand loses optimization scope]
MingToon runtime components are **automatically removed on VRChat upload.** You do not need to delete them manually.

**Removing MingToon Manager loses the cached renderer list, and upload optimization loses that scope.** Unoptimized materials upload as-is.
:::

If other non-MingToon scripts remain, they are cleanup targets. MingToon Manager's `VRChat Preflight` counts **components VRChat does not allow** and reports them.

:::note[Warudo is different]
Warudo mode follows **different rules that preserve scripts.** → [Warudo](/platforms/warudo#스크립트-정책이-vrchat과-다릅니다)
:::

## Where Depth Effects Are Guaranteed {#깊이-효과가-어디까지-보장되나}

Depth rim · 2D shadow · Inner 2D Edge all read the camera depth texture. In VRChat, this is **a world permission**.

| Situation | Depth | Basis |
|---|---|---|
| **Photo Camera active** | ✅ | Official contract. Host passes `_VRChatCameraMode` as non-zero |
| **World has Screen Camera depth enabled** | ✅ | World/Udon requests via `VRCCameraSettings` |
| **Regular player view (default)** | ❌ | Avatar cannot force it |
| **Mirror · stream · handheld preview internal path** | ⚠️ | Same result is not guaranteed |

:::danger[Depth authority lies with the world]
Screen Camera settings are a world/Udon responsibility. Avatars cannot change this setting.

There is an opt-in workaround: add a light to the avatar to trigger the depth pass. However, the cost is paid by all viewers. See [VRChat Depth Light](#vrchat-깊이-라이트) below for details before enabling.

Reference: [VRC Camera Settings (official docs)](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/)
:::

### VRChat Depth Light (default off) {#vrchat-깊이-라이트}

In VRChat an avatar cannot change camera settings, so the screen effects that read depth (`2D Depth Rim`, `2D Depth Shadow`) stay off outside the photo camera. **Carrying one light on the avatar** makes the camera draw depth and turns them on.

Turn on `Carry Depth Light on Upload` in the MingToon Manager's `VRChat Depth Light` group. **It is off by default.**

- When on, one light is added to the **VRChat upload only**. Your scene and Warudo builds are untouched.
- No material's `Depth Availability` value is changed; `Auto` finds the depth on its own. → [Depth Availability](/guides/depth-effects#깊이-가용성)

:::danger[Read the cost first]
1. This light adds a depth pass that redraws the whole world one extra time **on the frame of everyone who can see you**. They pay for it, not you.
2. **It does not work in mirrors.** Depth seen inside a mirror belongs to another camera, and MingToon turns depth off there on purpose.
3. **VRChat's avatar safety settings can switch this light off**, and the effects go with it.
4. One more light **lowers the avatar performance rank**, and it occupies a pixel light slot, so a world's own lighting can be pushed out.
:::

That is why off is the default. Look at making the silhouette hold without depth first.

### Automatically Handled at Build {#빌드-시-자동으로-처리되는-것}

On avatar upload, MingToon promotes materials with `Depth Availability` set to `Auto` to `Force On`.

`Auto` means "trust the host if it says depth is available," but because the `MingDepthTextureProvider` providing that signal is `IEditorOnly` and gets stripped on upload, that signal never arrives in VRChat. Without the promotion, **2D effects disappear even in worlds that actually have depth.**

Values explicitly set to `Force On` / `Force Off` are not overwritten.

:::note[Promotion excludes mirrors]
`Force On` means "enable even where host cannot report, **except mirrors**". Mirror cameras do not draw their own depth, so depth effects shut down inside mirrors regardless of this setting. → [Depth Availability](/guides/depth-effects#깊이-가용성)
:::

Details: [Automatic Optimization on Build](/workflow/build-optimization#vrchat-깊이-자동-승격)

### Making Silhouettes Stand Without Depth

For regular player views, assume depth is unavailable and build the look with **depth-independent tools**.

| Tool | Guide |
|---|---|
| **Normal Outline** | [Outline](/guides/outline) |
| **Rim Light · Rim Shade** | [Rim](/guides/rim) |
| **Form Shadow · Shadow Projection** | [Light & Shadow](/guides/light-and-shadow) |
| **Shadow Pattern (applied to form shadow)** | [Shadow Pattern](/guides/shadow-pattern) |

It is realistic to treat depth-based effects as a **bonus that looks better in Photo Camera**.

## Using With Other Build Tools

MingToon's VRChat hook runs late with `callbackOrder = 2000`. This analyzes materials **after** Modular Avatar or VRCFury has rewritten them in their own callbacks. No special configuration needed.

## Controlling Lighting Is Not an Option

Lighting varies completely between worlds. Raising these ensures your character holds up anywhere.

| Item | Why |
|---|---|
| `Preserve Base Map Color` (Simple mode: Base Color Preservation) | Keep original colors in dark worlds |
| `Minimum Final Brightness` | No dark crushing |
| `Maximum Final Brightness` | No blown-out highlights in overexposed worlds |
| Keep `Scene Light Color Influence` low | Character doesn't tint in colored-light worlds |
| Keep Rim's `Scene Light Influence` low | Rim stays consistent everywhere |

→ [Light & Shadow](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)

## VRChat + URP

Not supported. Switch to BRP build.

## Things to Know

**Hardware Requirements** — MingToon requires shader model 4.5. Environments that don't meet this render materials as magenta with no other error message. → [Supported Environments](/platforms/compatibility#하드웨어-요구-사항-필수)

**Validate Project** — 2022.3.22f1 raises no Unity-version errors or warnings. Conversely, **if a 2021.3 project has VRC SDK**, the `MING-VRC-UNITY-VERSION` warning reports "avatar upload support unavailable." → [Validator Code](/reference/validator)
