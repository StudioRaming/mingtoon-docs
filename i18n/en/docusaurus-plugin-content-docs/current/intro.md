---
id: intro
title: About MingToon
sidebar_label: About
slug: /
---

# MingToon

MingToon is a **character toon shader + authoring toolkit for VRChat avatars**. Built on Built-in Render Pipeline (BRP), it also works in Warudo and general Unity projects.

Current version: **0.1.3-preview** (closed beta)

## Unity Version — depends on target

:::danger[Check first]
| Target | Unity |
|---|---|
| **VRChat PC** (primary target) | **2022.3.22f1** |
| **Warudo** | **2021.3.45f2** |
| General Unity | 2021.3 LTS |

**Use 2022.3.22f1 if targeting VRChat.** On 2021.3, the VRChat build hook and VRChat runtime do not compile at all, so automatic optimization at upload time does not trigger. You cannot target both VRChat and Warudo with one project.
:::

## Where to start

| Situation | Document |
|---|---|
| **I want to use it on a VRChat avatar** | [VRChat](/platforms/vrchat) |
| First time installing | [Installation](/getting-started/installation) → [First Material](/getting-started/first-material) |
| Learn inspector structure | [Using the Inspector](/guides/inspector) |
| Start creating a look | [Basics](/guides/basics) → [Light and Shadow](/guides/light-and-shadow) |
| Migrate an existing lilToon avatar | [lilToon Conversion](/workflow/liltoon-conversion) |
| Upload an avatar | [Automatic Optimization On Build](/workflow/build-optimization) |
| Depth rim · 2D shadow not showing | [Depth Effects](/guides/depth-effects) |
| Find the meaning of one property | [Property Reference](/reference/basics) |
| Something is wrong | [Troubleshooting](/troubleshooting) |
| Want to understand why it works that way | [Internal Architecture](/internals/shader-structure) |

## Document structure

**Creating Looks** and **Property Reference** correspond 1:1 with the **All Effects** workflow groups in the MingToon inspector. You can find documentation by the section name you see on screen.

| Inspector Group | Document |
|---|---|
| Basic | [Basics](/guides/basics) · [Reference](/reference/basics) |
| Light & Shadow | [Light & Shadow](/guides/light-and-shadow) · [Reference](/reference/light-and-shadow) |
| Rim | [Rim](/guides/rim) · [Reference](/reference/rim) |
| Depth Effects | [Depth Effects](/guides/depth-effects) · [Reference](/reference/depth-effects) |
| Detail Maps | [Detail Maps](/guides/detail-maps) · [Reference](/reference/detail-maps) |
| Character | [Character](/guides/character) · [Reference](/reference/character) |
| Outline | [Outline](/guides/outline) · [Reference](/reference/outline) |

:::note[Reference is generated from source]
Property names and descriptions are taken exactly as **MingToon inspector displays them**. Terminology never drifts between documentation and screen.
:::

## What MingToon does

- **Toon shading** — multi-layer coloring based on layers, masks, and composition; HSVG color adjustment; final min/max brightness control
- **3 shadow types** — form shadow (curvature) · shadow projection (realtime) · 2D shadow (screen depth); and unified shadow combining all three
- **Outline** — normal outline working without depth; vertex painting to draw thickness directly in scene view
- **Rim** — rim light · rim shade · backlight · front light · shadow interior reflection
- **Screentone** — shadow as halftone pattern via [shadow pattern](/guides/shadow-pattern)
- **Face shading** — normal compression; face region mask/proxy sphere; face cast stabilization; SDF baking
- **lilToon conversion** — migrate existing avatar materials to MingToon editable materials
- **Automatic optimization on build** — automatically replaces shader with one using only deployed features at VRChat upload, then restores

## Closed beta notes

:::warning[This distribution is preview]
- No validated GPU performance numbers are published.
- VRChat / Warudo are **test targets** and have not completed release certification.
- Check [current limitations and release](/limitations) before deployment.
:::

Bug reports · questions · feedback: `studioraming@gmail.com`

When reporting, including these speeds up reproduction:

1. Unity version and target platform (VRChat PC / Warudo / general Unity)
2. Render pipeline (BRP / URP 12.x)
3. MingToon version (`0.1.3-preview`)
4. Full Console log
5. Steps to reproduce
