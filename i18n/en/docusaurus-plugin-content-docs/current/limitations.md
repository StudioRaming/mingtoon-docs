---
id: limitations
title: Current Limitations and Release
sidebar_position: 91
---

Every commercial license includes the URP version. MLC is included in the Early Access Founders Editions of Personal Streaming and Personal Creator; contents may change after full release. Commercial use remains prohibited during Open Beta. See [licenses and included add-ons](/legal/beta-license).

# Current Limitations and Release

Based on MingToon `0.1.7`.

## What to know before deployment

- This preview **does not include validated GPU ms or SetPass optimization numbers.** No performance claims are made.
- **VRChat PC is a manual validation target and has not completed release certification.**
- **VRChat Quest is not a direct MingToon execution target.**
- Warudo is in **real-world verification pending** status.
- URP support scope is limited to **Unity 2021.3 + URP 12.x**, and VRChat does not use URP.
- 2D rim light · 2D shadow · inner 2D edge **depend on the host providing camera depth**. On regular VRChat player screens, avatars cannot force depth.
- lilToon conversion is an **interop tool** and does not mathematically replicate results from other shaders.
- Current distribution is **source** not DLL-obfuscated product.

## Validation you must pass yourself

Before deploying results made with MingToon, verify each of the following:

1. BRP / URP shader compilation
2. EditMode test
3. Actual avatar **full-body + face** capture
4. Target platform build
5. Real testing on target platform — if VRChat, **self view · mirror · Photo Camera separately**

## Release builder

The package builder exports **by positive allowlist only**.

| Included | Excluded |
|---|---|
| Runtime / Editor / Shaders | Tests |
| Public Presets | Internal review · research · evidence · benchmark |
| README, manual, manifest | Generated project artifacts |
| Approved LICENSE or EULA | Repository metadata |

SHA-256 manifest is recorded along with it.

:::note
Package build is blocked unless a MingToon-exclusive LICENSE/EULA approved by the user exists.
:::

## Beta feedback

Report bugs in the **bug-report channel** of the [official Discord server](https://discord.gg/Zsj6pkWKKs).

When reporting, including these speeds up reproduction:

1. Unity version and target platform (VRChat PC / Warudo / general Unity)
2. Render pipeline (BRP / URP 12.x)
3. MingToon version (`0.1.7`)
4. Full Console log
5. Steps to reproduce
