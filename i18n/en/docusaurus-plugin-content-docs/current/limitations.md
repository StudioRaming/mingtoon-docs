---
id: limitations
title: Current Limitations and Release
sidebar_position: 91
---

# Current Limitations and Release

Based on MingToon `0.1.3-preview`.

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

## Closed beta feedback

`studioraming@gmail.com`

When reporting, including these speeds up reproduction:

1. Unity version and target platform (VRChat PC / Warudo / general Unity)
2. Render pipeline (BRP / URP 12.x)
3. MingToon version (`0.1.3-preview`)
4. Full Console log
5. Steps to reproduce
