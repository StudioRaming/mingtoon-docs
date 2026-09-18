---
id: limitations
title: Current Limitations and Release
sidebar_position: 91
---

# What MingToon does not do right now

> This page is an explanation. To install now, see [Installation](/getting-started/installation).

## In one line

MingToon is a public open beta. Only the Built-in pipeline (BRP) is distributed.

Check the current version under `Update settings` in MingToon Manager. Changes by version are in the [changelog](/changelog).

## What to know before you ship

| Item | Current state |
|---|---|
| **Performance figures** | There are no validated GPU ms or SetPass improvement figures. We make no performance claims |
| **VRChat PC** | The main target. Verification is manual and release certification is not finished |
| **VRChat Quest** | It does not run the MingToon shader directly |
| **WARUDO** | Waiting for verification on real hardware |
| **URP** | Not included in this BRP open beta |
| **Depth effects** | Visible only when the host provides camera depth |
| **lilToon conversion** | An interoperability tool. It does not clone another shader's result |
| **VRC Light Volumes 3** | Legacy v2 buffer compatibility only. Native v3 shadows, clustering and per-light shading are not supported |
| **Light Volume cast shadows** | Still look different from 0.1.10 in v2 and v3 worlds |

→ [Supported Environments](/platforms/compatibility) · [How far depth effects are guaranteed](/platforms/vrchat#깊이-효과가-어디까지-보장되나)

## There are two installation routes

The BRP core installed through VCC is a source package. The BOOTH installer is a DLL distribution route.

Both routes point at the same BRP core version.

## What to check yourself before shipping

Check the following before handing your work to anyone else.

1. The Console has 0 C# and shader errors.
2. You captured the full body and the face of a real avatar separately.
3. The target platform build succeeds.
4. You looked at it on the target platform. For VRChat, check your own view, a mirror, and the Photo Camera separately.

`StudioRaming > MingToon > Validate Project` screens the environment conditions first.

:::note[This part is yours]
We run shader compile regression tests and EditMode tests on every release.
What you check is the result as it appears on a real avatar.
:::

## License

The current open beta does not allow commercial use. The allowed scope and future structure are written in one place only.

→ [License and Commercial Use](/legal/beta-license)

## Beta feedback

Please report bugs in the bug report channel of the [official Discord server](https://discord.gg/Zsj6pkWKKs).

Including the following makes reproduction faster.

1. Unity version and target platform (VRChat PC / WARUDO / general Unity)
2. Render pipeline (BRP / URP 12.x)
3. MingToon version
4. The full Console log
5. Steps to reproduce

To search by symptom first, go to [Troubleshooting](/troubleshooting).
