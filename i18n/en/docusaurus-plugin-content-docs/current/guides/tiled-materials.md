---
id: tiled-materials
title: Tiled Material Composer
sidebar_position: 16
---

# Tiled Material Composer

**Purpose:** Connect up to four logical regions from one RGBA region mask to Texture Stack, Normal, and MatCap layers in one physical material slot. Use it when repeating surface details such as cloth, leather, and metal need separate treatment.

Open **StudioRaming > MingToon > Tiled Material Composer**. The tool does not edit meshes, submeshes, or renderers.

## First setup

1. Assign the target to **MingToon Material**.
2. Assign a Texture2D containing the R/G/B/A regions to **Packed Region Mask**.
3. In each of the four cards, leave the region **Enabled** and set its channel and maps.
4. Press **Apply Four Logical Regions**.

The Apply button is enabled when the material and packed mask are assigned. The window always creates four region cards, so there is no separate region input to fill.

The defaults are region 1=R, 2=G, 3=B, and 4=A, named Cloth, Leather, Metal, and Label. Change names and channels per card.

## Region card controls

| Control | Range or effect |
|---|---|
| **Enabled** | When off, clears that region's surface, normal, and MatCap slots on Apply |
| **Mask Channel** | R, G, B, or A read by this region |
| **Surface Texture** | Repeating surface map |
| **Surface Tiling** | UV repeat for that surface map |
| **Surface Tint** | Color multiplied into the surface layer |
| **Surface Opacity** | Surface layer amount, 0 to 1 |
| **Normal Map / Normal Strength** | Normal map and strength, 0 to 2 |
| **Matcap Map / Matcap Strength** | MatCap map and strength, 0 to 20 |

Clearing a map also clears that slot on the next Apply. For example, clearing only Normal Map removes that region's normal slot while surface and MatCap are processed independently.

## What Apply writes

Apply visits all four cards. Enabled cards with maps write to their layer slot; empty maps and disabled cards are explicitly cleared.

| Card values | MingToon target |
|---|---|
| Surface map, Tiling, Tint, Opacity, packed mask, channel | Texture Stack |
| Normal map, Tiling, strength, packed mask, channel | Normal layer |
| MatCap map, strength, packed mask, channel | MatCap layer |
| Highest used slot number | Each module's enable toggle and layer count |

The first normal card uses MingToon's base **Bump Map** slot. If that card is disabled, an existing hand-authored Bump Map can survive when the composer did not own a region mask for it; inspect the target slot separately when you need to remove a manual normal. Apply is one Undo unit.

## Mask authoring

Each mask channel is an area weight. If multiple channels are bright at one pixel, their layer effects overlap and composite. Check that overlaps are intentional and soften hard boundaries in the mask when needed.

Surface and normal maps use the card's Tiling. The packed mask is the selector for the composer; it does not automatically split one large illustration into four pieces. Surface Mode and render queue are material-wide, so regions that need different surface modes require separate materials.

## After Apply

Use [Detail Maps](/guides/detail-maps) to check Stack, Normal, and MatCap layer counts and strengths, and [Common Texture Slot UI](/guides/texture-modules) to adjust each map's Tiling / Offset. The composer records ordinary layer properties; it does not create a separate runtime mode.

## If Apply is disabled or a result is missing

- If Apply is disabled, assign both the target material and Packed Region Mask.
- If a region is missing, check Enabled, its map field, and whether Mask Channel matches the painted channel.
- If an old region remains, disable the card or clear its maps and Apply again.
- If regions overlap unexpectedly, inspect duplicate mask channels and their boundaries.
- If a layer is invisible, raise that module's layer count through the last used slot.

## Related docs

- [Detail Maps](/guides/detail-maps)
- [Common Texture Slot UI](/guides/texture-modules)
- [Module Cost](/internals/module-cost)
