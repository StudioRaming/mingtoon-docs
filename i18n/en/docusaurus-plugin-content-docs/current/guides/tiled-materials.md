---
id: tiled-materials
title: Tiled Material Composer
sidebar_position: 17
---

# Tiled Material Composer

> This page is for people using the **Tiled Material Composer** for the first time.
> It lays different surfaces on the cloth, leather and metal inside one material. It takes about 7 minutes.

## What is this

A whole outfit is often bundled into a single material.

To give the cloth and the metal in it different textures, you would have to fill several slots by hand.

The composer does that work with a single black-and-white four-channel mask.

It uses small repeating textures as they are, so it never rebakes the original artwork.

It does not touch meshes, submeshes or renderers.

:::note[This is not the detail map region mask]
The [region mask](/guides/detail-maps#영역-마스크) adjusts reflection values per area.
The composer lays a different texture on each area.
:::

## When to use it

- When one outfit material mixes cloth, leather and metal
- When you want the same pattern repeated at a different scale per area

## Turn it on in 30 seconds

1. Open `StudioRaming > MingToon > Tiled Material Composer`.
2. Put the target material into **MingToon Material**.
3. Put an RGBA texture into **Packed Region Mask**.
4. Press **Apply Four Logical Regions**.

If the button is pressable, it worked.

If it is gray, one of the two fields above is empty.

![The Tiled Material Composer window with its material field, mask field and four region cards](/img/placeholder.png)
<!-- CAPTURE: guides/tiled-materials-01-window.png | 타일드 머티리얼 컴포저 창 전체 — MingToon 머티리얼/패킹된 지역 마스크 + 01 천 카드 펼침 + 하단 적용 버튼 | 1200x700 -->

## How to use it

1. Prepare the mask. Each of the R, G, B and A channels takes one area.
2. Open the window and add the material and the mask.
3. Check the checkbox to the left of the title on the cards you want to use.
4. Fill in each card's **Mask Channel** and maps.
5. Press **Apply Four Logical Regions**.

There are always four cards, with fixed default names and channels.

| Card | Default name | Default channel |
|---|---|---|
| 01 | Cloth | R |
| 02 | Leather | G |
| 03 | Metal | B |
| 04 | Label | A |

You can change the name and the channel on the card.

## Values you will touch often

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Mask Channel** | The channel this card reads | Leave at default (01 R · 02 G · 03 B · 04 A) | If it differs from the channel you actually painted, nothing shows anywhere |
| **Tiled Surface** | The surface map to repeat on this area | One small pattern | Leave it empty and this area's surface slot is cleared |
| **Surface Tiling** | How many times that map repeats | 8, 8 | Raise it and the pattern gets denser; at 1 it is placed once |
| **Surface Tint** | The color multiplied into the surface color | White | Add a color and only that area takes the tint |
| **Surface Opacity** | How much the surface is layered on (0 to 1) | 1 | Lower it and the original color shows through; at 0 it disappears |
| **Normal Intensity** | The strength of the relief (0 to 2) | 1 | Raise it and the relief is exaggerated; at 0 it goes flat |
| **MatCap Intensity** | The strength of the gloss (0 to 20) | 1 | Raise it and it turns shiny; at 0 it is not evaluated |

## What Apply writes to the material

| Field on the card | Where it goes |
|---|---|
| Surface map · tiling · tint · opacity | The additional texture slot with the same number |
| Normal map · tiling · intensity | The normal layer with the same number |
| MatCap · intensity | The matcap layer with the same number |
| The mask and its channel | The mask slot of all three modules |
| The last number used | Each module's enable switch and layer count |

Apply walks all four cards.

Cards that are off and empty maps clear that slot explicitly.

The whole thing is recorded as a single Undo.

:::caution[The card 01 normal uses the base normal map slot]
The composer does not clear a hand-assigned normal map it did not place.
A normal map sitting there without a mask stays after applying.
:::

## Principles for writing the mask

The brightness of each channel is that area's weight.

If two channels are bright at the same pixel, the two areas overlap and blend.

If the boundary is rough, paint a soft transition into the mask.

The mask is for dividing areas.

It does not automatically split one large illustration into four pieces.

:::caution[Surface mode cannot be split per area]
There is only one surface mode and one render queue per material.
If you need different surface modes, you have to split the material.
:::

## Common problems

| Symptom | Cause | Fix |
|---|---|---|
| The Apply button is gray | The material or the mask is empty | Fill in both fields |
| Only one area does not show | The mask channel differs from the channel you painted | Change the card's mask channel |
| Values remain on an area you removed | You only cleared the map without turning the card off | Turn the card off and apply again |

## More detail

- [Detail Maps](/guides/detail-maps) — checking the layer count and strength after applying
- [Shared Texture Slot UI](/guides/texture-modules) — adjusting each map's tiling
- [Modules and Performance Cost](/internals/module-cost) — the cost of adding layers
