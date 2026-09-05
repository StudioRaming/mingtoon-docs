---
id: intro
title: About MingToon
sidebar_label: About
slug: /
---

:::note[Join the Open Beta]
[Join the Open Beta](https://studioraming.github.io/mingtoon-site/en/download/) — The BOOTH product has not been published yet. Its official product link will be added here after publication. Review the current beta terms and supported environments before downloading.
:::


Every commercial license includes the URP version. MLC is included in the Early Access Founders Editions of Personal Streaming and Personal Creator; contents may change after full release. Commercial use remains prohibited during Open Beta. See [licenses and included add-ons](/legal/beta-license).

# MingToon

**A character toon shader for VRChat avatars.**

MingToon 0.1.7 is the **BRP core open beta**. URP is excluded from the current BRP Open Beta and included with every commercial license. Ming Light Controller (MLC) is installed separately and included in the Personal Streaming and Personal Creator Early Access Founders Editions.

The things you actually reach for when drawing a character — where the shadows fall and what colour they are, how the nose shadow sits on a face, outline weight, whether the silhouette holds up in backlight — are separated so each can be set on its own. Everything from the inspector you build the look in to the step that puts it on an avatar and uploads it ships in one package.

Built on the Built-in Render Pipeline (BRP); it also runs in Warudo and in general Unity projects.

## What sets it apart from other toon shaders

**The build shader is created from the features actually used.**
Author the look with the features you need. On a supported build optimization
path, MingToon analyzes usage and animation dependencies and generates a shader
that keeps the required features. Removed feature operations are omitted, but
actual cost still depends on the features left, the avatar, and the world.
→ [Automatic Optimization On Build](/workflow/build-optimization)

**Three kinds of shadow — and the third is the one others do not have.**
The **form shadow** curvature makes and real-time **shadow projection** exist
elsewhere. MingToon adds the **2D shadow**: it reads camera depth so bangs,
hands, and sleeves fall across the body as a toon shape that a real-time shadow
will not give you. A unified shadow gathers all three into one colour so overlaps
do not go black.
→ [Light and Shadow](/guides/light-and-shadow) · [Depth Effects](/guides/depth-effects)

**Four more effects use the same camera depth texture.**
2D rim light (the 2D silhouette line), inner 2D edge, depth translucency for thin
parts holding light, and SSAO darkening creases and contact areas sample that
texture as needed. There is no extra post-process pass or second camera. Some
environments may need a depth-enabling assist light; check MingToon Manager and the Depth Effects guide. Its
VRChat client behaviour is still unverified.
→ [Depth Effects](/guides/depth-effects)

**The face is a subsystem, not a slot.**
It does not stop at one face mask. Alongside normal compression, the face region mask, and a directional SDF,
the core supports authored SDF and vertex data. Face SDF Studio and scene-view
vertex paint are supplied as separate add-ons; existing SDF and vertex data can
be assigned to core materials. → [Face SDF and add-ons](/guides/face-sdf) ·
[Add-ons](/guides/add-ons)

**It can look printed.**
The screentone redraws shadow as halftone dots or line work, and you choose
whether the lattice sticks to the surface or locks to the screen. Locked to the
screen, the character slides underneath it - the overprinted, pop-art reading.
→ [Shadow Pattern](/guides/shadow-pattern)

**Adjustable in game (MLC is a separate add-on).**
With Ming Light Controller installed separately and applied to an upload clone,
virtual light plus brightness and colour controls can be exposed through a VRChat
expression menu. The Modular Avatar route is designed to preserve existing menu,
parameter, and FX assets; successful client upload is still unverified. →
[Ming Light Controller](/guides/ming-light-controller) · [VRChat](/platforms/vrchat)

<details>
<summary>What else is in the box</summary>

- **Outline** — works anywhere without depth. Scene-view brush painting requires the separate Mask Maker add-on. → [Outline](/guides/outline)
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

## Beta and commercial use

Check [Beta and commercial use](/legal/beta-license) for the current distribution and commercial-use conditions first.

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

## BRP core beta notes

:::warning[This distribution is preview]
- No validated GPU performance numbers are published.
- VRChat / Warudo are **test targets** and have not completed release certification.
- Check [current limitations and release](/limitations) before deployment.
:::

Report bugs in the **bug-report channel** of the [official Discord server](https://discord.gg/Zsj6pkWKKs).

When reporting, including these speeds up reproduction:

1. Unity version and target platform (VRChat PC / Warudo / general Unity)
2. Render pipeline (BRP / URP 12.x)
3. MingToon version (shown on the badge at the top right)
4. Full Console log
5. Steps to reproduce
