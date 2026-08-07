---
id: intro
title: About MingToon
sidebar_label: About
slug: /
---

# MingToon

**A character toon shader for VRChat avatars.**

The things you actually reach for when drawing a character — where the shadows fall and what colour they are, how the nose shadow sits on a face, outline weight, whether the silhouette holds up in backlight — are separated so each can be set on its own. Everything from the inspector you build the look in to the step that puts it on an avatar and uploads it ships in one package.

Built on the Built-in Render Pipeline (BRP); it also runs in Warudo and in general Unity projects.

## What you can make with it

- **Three kinds of shadow, handled separately** — the **form shadow** curvature makes, real-time **shadow projection**, and the **2D shadow** that reads screen depth so bangs and hands fall across the body. A unified shadow gathers all three into one colour so overlaps do not go black. → [Light and Shadow](/guides/light-and-shadow)
- **Shadows printed as halftone dots** — the screentone. Stick it to the surface so it travels with the character, or lock it to the screen for an overprinted, printed-page reading. → [Shadow Pattern](/guides/shadow-pattern)
- **The face is treated separately** — normal compression, a face region mask, and a directional SDF, so nose and bang shadows do not wreck an expression. The tool that bakes the SDF is bundled. → [Face SDF](/guides/face-sdf)
- **Outlines drawn without depth** — paint the weight directly with a brush in the scene view. → [Outline](/guides/outline)
- **A silhouette that stands up** — rim light, rim shade, backlight, front light, and shadow interior reflection: the side that keeps a character from sinking into a dark scene. → [Rim](/guides/rim)
- **Detail on top** — texture, normal, and matcap layers, hybrid PBR, toon specular, glitter, and emission. → [Detail Maps](/guides/detail-maps)
- **Colour retuned in one place at the end** — everything that adds light, every shadow, and the final output each take a brightness and a tint, so a change of scene is one adjustment rather than twenty. → [Basics](/guides/basics)

## Getting it onto an avatar

- **lilToon conversion** — moves the materials of an avatar you already built onto MingToon, carrying textures, masks, and the outline width mask with them. → [lilToon Conversion](/workflow/liltoon-conversion)
- **MingToon Manager** — declare which slots are the face and which are bare skin, and work the whole avatar's look from one screen. → [MingToon Manager](/workflow/character-manager)
- **Automatic optimization on build** — the upload swaps in a shader carrying only the features actually used, then restores the authoring one when it is done. You author with everything on; only what ships gets light. → [Automatic Optimization On Build](/workflow/build-optimization)
- **VRChat expression menu** — drive the virtual light and the brightness and colour adjustments from an in-game menu, installed non-destructively through Modular Avatar. → [VRChat](/platforms/vrchat)

## If this is your first time

[Installation](/getting-started/installation) → [First Material](/getting-started/first-material) → [Using the Inspector](/guides/inspector)

Section 1 of the installation page settles the Unity version. It differs by target, and one project cannot serve both VRChat and Warudo.

## Where to start

| Situation | Document |
|---|---|
| **I want to use it on a VRChat avatar** | [VRChat](/platforms/vrchat) |
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
3. MingToon version (shown on the badge at the top right)
4. Full Console log
5. Steps to reproduce
