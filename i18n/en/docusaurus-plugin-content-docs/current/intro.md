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

## What sets it apart from other toon shaders

**What you author with and what gets uploaded are different shaders.**
A toon shader gets heavier as it gains features, so the usual answer is to leave
things off in case you never use them. MingToon has you author with everything
on, then **swaps in a shader carrying only the features that material actually
used** at upload time and restores the authoring one afterwards. What you did not
use is compiled out, so it costs nothing. No pruning features avatar by avatar.
→ [Automatic Optimization On Build](/workflow/build-optimization)

**Three kinds of shadow — and the third is the one others do not have.**
The **form shadow** curvature makes and real-time **shadow projection** exist
elsewhere. MingToon adds the **2D shadow**: it reads camera depth so bangs,
hands, and sleeves fall across the body as a toon shape that a real-time shadow
will not give you. A unified shadow gathers all three into one colour so overlaps
do not go black.
→ [Light and Shadow](/guides/light-and-shadow) · [Depth Effects](/guides/depth-effects)

**Four more effects out of that same single depth read.**
2D rim light (the 2D silhouette line), inner 2D edge, depth translucency for thin
parts holding light, and SSAO darkening creases and contact areas. No extra
light, no post-process pass, no second camera - they share the one camera depth
texture the avatar shader is already reading.
→ [Depth Effects](/guides/depth-effects)

**The face is a subsystem, not a slot.**
It does not stop at one face mask. Alongside normal compression, the face region
mask, and a directional SDF, the product ships **the tool that bakes the SDF
(Face SDF Studio) and scene-view vertex paint for the face area**. The problem
where nose and bang shadows wreck an expression is solved without leaving Unity.
→ [Face SDF](/guides/face-sdf)

**It can look printed.**
The screentone redraws shadow as halftone dots or line work, and you choose
whether the lattice sticks to the surface or locks to the screen. Locked to the
screen, the character slides underneath it - the overprinted, pop-art reading.
→ [Shadow Pattern](/guides/shadow-pattern)

**Adjustable in game.**
The virtual light and the brightness and colour adjustments go out to a VRChat
expression menu, installed non-destructively through Modular Avatar so your
existing menu, parameters, and FX are untouched. → [VRChat](/platforms/vrchat)

<details>
<summary>What else is in the box</summary>

- **Outline** — works anywhere without depth, and the weight is painted with a brush in the scene view. → [Outline](/guides/outline)
- **The rim family** — rim light, rim shade, backlight, front light, shadow interior reflection. → [Rim](/guides/rim)
- **Detail** — texture, normal, and matcap layers, hybrid PBR, toon specular, glitter, emission. → [Detail Maps](/guides/detail-maps)
- **Master adjust** — a brightness and a tint on everything that adds light, on every shadow, and on the final output. A change of scene is one adjustment here. → [Basics](/guides/basics)
- **lilToon conversion** — moves an existing avatar over, textures, masks, and outline width mask included. → [lilToon Conversion](/workflow/liltoon-conversion)
- **MingToon Manager** — declare which slots are the face and which are bare skin, and work the whole avatar's look from one screen. → [MingToon Manager](/workflow/character-manager)

</details>

## The order of work

**Convert** → **assign roles** (face · bare skin) → **look** → **upload**.
An existing lilToon avatar starts at step 1; a material you make from scratch
starts at step 2.

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
| 2D rim light · 2D shadow not showing | [Depth Effects](/guides/depth-effects) |
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
