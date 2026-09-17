---
id: intro
title: About MingToon
sidebar_label: About
slug: /
---

# MingToon

> This page explains what MingToon is.
> To start right away, go to [Installation](/getting-started/installation).

## In one line

MingToon is a character toon shader for VRChat and Warudo avatars.
It handles face shadows, surface color and texture, and silhouettes in one inspector.
Build materials one at a time, then align the whole avatar with MingToon Manager.

## If this is your first time, follow this order

1. [Installation](/getting-started/installation) — match the Unity version and add the package.
2. [Getting Started with Manager](/getting-started/first-material) — convert one avatar.
3. [Basic Settings](/guides/basics) — set color and brightness.
4. [Light and Shadow](/guides/light-and-shadow) — refine the shadow boundary.

## What changes

![A side-by-side render of the same avatar face before and after conversion](/img/placeholder.png)
<!-- CAPTURE: intro/intro-01-before-after.png | 같은 아바타의 상반신을 변환 전 원본 셰이더와 변환 후 MingToon으로 나란히 렌더한 2분할 | 1200x700 -->

### Shadows are split into three kinds

The shadow made by surface curvature is **Form Shadow**.
The shadow cast by a real-time light is **Shadow Projection**.
The shadow drawn from the depth the camera measures is **Depth Shadow**.
For details, see [Light and Shadow](/guides/light-and-shadow) and [Depth Effects](/guides/depth-effects).

### Color and texture stack in layers

Textures, normal maps, and MatCaps (a single sphere image that fakes a highlight) are layered on top of each other.
Masks (black-and-white images where white marks the area the effect applies to) split the coverage.
For details, see [Detail Maps](/guides/detail-maps), [Shadow Pattern (Screentone)](/guides/shadow-pattern), and [Outline](/guides/outline).

### It gets lighter automatically on upload

While editing, you use a heavy shader that can turn every feature on.
When you run a VRC SDK upload or a WARUDO mod build, only the features you use remain.
For details, see [Automatic Optimization On Build](/workflow/build-optimization).

## Inspector groups and documents

| Inspector group | Document |
|---|---|
| Base Color & Transparency | [Basic Settings](/guides/basics) · [Basic Settings Reference](/reference/basics) |
| Shadows | [Light and Shadow](/guides/light-and-shadow) · [Reference](/reference/light-and-shadow) |
| Rim & Fill Lights | [Rim](/guides/rim) · [Reference](/reference/rim) |
| Screen-space Effects | [Depth Effects](/guides/depth-effects) · [Reference](/reference/depth-effects) |
| Emission & Effects · Material & Gloss | [Detail Maps](/guides/detail-maps) · [Reference](/reference/detail-maps) |
| Face & Outlines | [Character Rendering](/guides/character) · [Outline](/guides/outline) |

:::info[The current release is a BRP open beta]
Only the Built-in Render Pipeline core is distributed.
VRChat client behavior and actual uploads are still being verified.
Read [Current Limitations and Release](/limitations) first.
:::

<details><summary>Open beta terms and license</summary>Commercial use of the current open beta is prohibited. <a href="/legal/beta-license">License and commercial use</a></details>

## Where to get help

[Open beta signup](https://studioraming.github.io/mingtoon-site/ko/download/) · [BOOTH product](https://raming.booth.pm/items/8810209) · [Official Discord server](https://discord.gg/Zsj6pkWKKs)

Send bugs to the bug report channel on Discord.
Including the five items below makes reproduction faster.

1. Unity version and target platform (VRChat PC / Warudo / general Unity)
2. Render pipeline (BRP / URP 12.x)
3. MingToon version (the value shown under **Update settings** on the Get Started tab of Manager)
4. The full Console log
5. Steps to reproduce
