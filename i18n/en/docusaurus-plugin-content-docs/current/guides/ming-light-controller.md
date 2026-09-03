---
id: ming-light-controller
title: Ming Light Controller Integration
sidebar_position: 15
---

# Ming Light Controller Integration

**After reading this guide,** you will know which separately sold product the locked button you just pressed belongs to, what that product unlocks in MingToon, and whether there is a way to reach the same goal without it.

:::note[This button requires a separately sold product]
The MingToon 0.1.7 open beta package does not bundle Mask Maker, Face SDF Studio, or Ming Light Controller. All three are separately sold Editor tools, and MingToon installs, compiles, and runs even with none of them present.

Even when they are not installed, the buttons remain visible in the Inspector, and pressing one takes you to this document. Import the matching product and the same button comes alive in place.
:::

## Distinguish These First

| Product | What it opens in MingToon | Status |
|---|---|---|
| **Ming Light Controller** | The `Master Adjustment` section, `Virtual Light` authoring, and the Manager's MLC install and attach actions | Coming soon |
| **Mask Maker** | The `MM` button on mask slots, `Paint Outline Width in Scene View`, `Start Painting Face Area` | On sale |
| **Face SDF Studio** | Face SDF map creation and baking → [Face SDF and Face SDF Studio](/guides/face-sdf) | On sale |

## What Ming Light Controller Is {#ming-light-controller란}

An Editor-only add-on that builds the Expression Menu (VRChat Expression Menu) for a MingToon avatar. It takes care of the menu side so the wearer can turn shader values directly in game.

**It is coming soon.** A purchase link will go up here once sales begin.

### MingToon Features It Unlocks {#설치하면-열리는-mingtoon-기능}

| Location | Locked feature |
|---|---|
| Inspector · very top | The entire `Master Adjustment` section |
| Inspector · `Lighting` | The `Virtual Light` authoring row |
| MingToon Manager | MLC install and attach actions |

`Master Adjustment` is a higher-level control that applies brightness and tint in one pass to everything that adds light, to all shadows, and to the final output. `Virtual Light` sets, on the material side, the direction, color, and brightness of a light the character carries with it, independent of the scene lighting.

Both are values premised on the wearer turning them at runtime, so they only make sense when a menu that exposes them comes with them. MLC is what builds that menu.

### What Works Without MLC {#mlc-없이도-되는-것}

Every look feature of the shader works exactly as before. None of lighting, shadow, rim, depth effects, or outline requires MLC.

`Master Adjustment` and `Virtual Light` also keep rendering with whatever values remain on the material. What disappears without MLC is the Inspector's **editing UI**, not the shader behavior itself.

:::note[Build policy is not owned by MLC]
MingToon Manager continues to own the Depth Light build policy for VRChat and WARUDO. Installing or removing MLC does not change MingToon's VRC or WARUDO build behavior.
:::

### Parameter Profiles {#파라미터-프로필}

The VRChat Expression Parameters budget is a resource the whole avatar shares. MLC builds the menu with one of two profiles.

| Profile | Synced bits | Item count |
|---|---|---|
| **Smooth** | 84 bits | 22 |
| **Compact** | 41 bits | 51 |

`Auto` picks one of the two to fit the VRC budget left on the avatar.

### Root Menu Layout {#루트-메뉴-구성}

The MLC root menu has 7 slots.

| Slot | Name |
|---|---|
| 1 | Reset |
| 2 | Final Output |
| 3 | Hue/Saturation |
| 4 | Photo Looks |
| 5 | Virtual Light |
| 6 | Master Adjust |
| 7 | Performance |

## Mask Maker {#mask-maker}

A tool that handles mask textures and vertex paint inside the Unity Editor.

**Purchase:** <https://raming.booth.pm/items/8606444> (BOOTH, product name `[Unity] MaskMaker`)

### MingToon Features It Unlocks {#mask-maker-설치하면-열리는-mingtoon-기능}

| Location | Locked feature |
|---|---|
| Inspector · mask texture slots | The `MM` button beside the slot — paints that slot's mask directly in the Scene view |
| Inspector · Normal Outline | `Paint Outline Width in Scene View` |
| Inspector · Face/Hair Shading | `Start Painting Face Area` |

The slots that get an `MM` button are the mask-family texture slots.

### What Works Without Mask Maker {#mask-maker-없이도-되는-것}

Create the mask texture in another tool and assign it to the slot directly. Vertex colors you already painted are still read as-is. Outline pressure and face region each have a separate texture-mask path besides vertex paint.

These are the channels to use when painting vertex colors in an external DCC.

| Purpose | Vertex color channel |
|---|---|
| Outline pressure | Red or alpha |
| Face region | Green |

## Checking the Installation {#설치-확인}

MingToon finds the three products through reflection rather than assembly references. That is why MingToon's own compilation does not break when an add-on is absent, and conversely, if the add-on assembly does not compile, MingToon regards that tool as not installed.

If a button stays locked, first check the Console for compilation errors.

## Related Documents

- [Separately Sold Add-ons](/guides/add-ons)
- [Face SDF and Face SDF Studio](/guides/face-sdf)
- [Light and Shadow — Master Adjustment and Edge Rim](/guides/light-and-shadow#마스터-조정과-가장자리-림)
- [Basic Settings](/guides/basics)
