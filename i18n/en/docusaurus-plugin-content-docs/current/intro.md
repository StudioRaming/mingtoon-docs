---
id: intro
title: About MingToon
sidebar_label: About
slug: /
---

# MingToon

**A character toon shader connecting facial shading, clothing detail, and silhouette.**

MingToon brings together the direction of facial shadows, the way light and shadow overlap, and the colour and texture of surfaces. Build the face, hair, and clothing material by material, then use MingToon Manager to adjust the look across the avatar.

[Start with installation](/getting-started/installation) · [Convert a lilToon avatar](/workflow/liltoon-conversion) · [Check current limitations](/limitations)

:::note[Current public version: 0.1.8 BRP Open Beta]
The current download is the Built-in Render Pipeline (BRP) core beta. Check the [installation guide](/getting-started/installation) for the environment required by VRChat, Warudo, or general Unity use. VRChat client behaviour and successful upload are still being verified. Commercial use of the current Open Beta is prohibited.

[Join the Open Beta](https://studioraming.github.io/mingtoon-site/en/download/) · [BOOTH product](https://raming.booth.pm/items/8810209) · [Licenses and included tools](/legal/beta-license)
:::

## Build your character's look

### Design facial shadows for the light direction

A face SDF is a texture that defines the shape of shading on a face. MingToon's Packed RGBA format stores **left, right, up, and down in one texture**, letting you adjust shading for light from the sides and from above or below. A face region mask and normal compression help define where the treatment applies.

A compatibility mode supports existing single-channel SDFs. Existing SDF and vertex data can be used on core materials; the authoring tools Face SDF Studio and scene-view painting are separate add-ons.

→ [Face SDF setup](/guides/face-sdf) · [Add-on contents](/guides/add-ons)

### Control colour and edges where shadows overlap

Combine **form shadows** from surface curvature, **cast shadows** from real-time lights, and **2D shadows** that read camera depth. Shape shading around bangs, hands, and sleeves, then use unified shadow controls to adjust the colour of overlapping areas. Overall shadow brightness and colour controls are also available.

The same camera depth supports 2D rim light, inner 2D edges, depth translucency, and SSAO. These handle silhouettes, internal edges, light through thin areas, and contact darkening respectively. **These effects require available camera depth.** If they are missing, check the depth setup and target environment first. Some environments may require a depth-enabling assist light.

→ [Light and Shadow](/guides/light-and-shadow) · [Depth Effects and requirements](/guides/depth-effects)

### Layer colour, texture, and reflection

Texture, normal, and Matcap layers use masks to separate their areas of influence. Set up skin colour, hair highlights, and clothing patterns independently, then add hybrid PBR, toon specular, glitter, or emission where needed.

Colour correction and overall brightness and tint controls help bring several materials into the same mood. Shadow patterns create halftone or line-work effects, with patterns attached to the surface or fixed to the screen. Finish the silhouette with outline and rim controls.

→ [Detail Maps](/guides/detail-maps) · [Shadow Pattern](/guides/shadow-pattern) · [Outline](/guides/outline) · [Rim](/guides/rim)

### Carry edited materials into a build configuration

Combine the features needed while authoring the look. Supported build optimization paths analyze feature usage and animation dependencies to generate shaders that retain the required features. Baking separates colour information that can be stored in textures from responses that must continue to react to lighting and the view.

Actual cost and results depend on the retained features, avatar, and world. **Check appearance and required animations after optimization.** Verified GPU performance figures are not currently published.

→ [Automatic Optimization On Build](/workflow/build-optimization) · [Shader Structure](/internals/shader-structure)

## From setup to a finished avatar

| Step | What to do | Guide |
|---|---|---|
| 1. Prepare | Check the target platform's Unity environment and install. | [Installation](/getting-started/installation) |
| 2. Set up materials | Convert existing lilToon materials or create a first material. | [Conversion](/workflow/liltoon-conversion) · [First Material](/getting-started/first-material) |
| 3. Assign roles and style | Use Manager to assign face and bare-skin roles, then adjust shadows, colour, and texture. | [MingToon Manager](/workflow/character-manager) · [Basics](/guides/basics) |
| 4. Check and build | Check depth requirements, appearance, and animations, then follow the target platform's build workflow. | [Optimization](/workflow/build-optimization) · [VRChat](/platforms/vrchat) |

## Core and additional tools

The BRP core handles material rendering and settings. **URP is excluded from the current BRP Open Beta and included with every commercial license.** See [Add-ons](/guides/add-ons) for authoring tools such as Face SDF Studio and Mask Maker.

Ming Light Controller (MLC) is installed separately. It applies to an upload clone and connects virtual light, brightness, and colour controls to VRChat expression menus. The Modular Avatar path is designed to preserve existing menus, parameters, and FX; successful client upload is still being verified. MLC is included in the Personal Streaming and Personal Creator Early Access Founders Editions, and contents may change after full release.

→ [Ming Light Controller](/guides/ming-light-controller) · [Licenses and included tools](/legal/beta-license)

## Implementation foundations and credits

MingToon connects public graphics techniques and adapted implementations to its layer, face, depth-effect, and build structures. See [Third-Party Credits and Licenses](/legal/third-party-credits) for the adapted scope, original copyright, and licenses, including selected lilToon UV, colour-correction, and glitter calculations and selected NonToon shadow processing.

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
