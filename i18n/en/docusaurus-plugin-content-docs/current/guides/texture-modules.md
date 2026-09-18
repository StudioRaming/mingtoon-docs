---
id: texture-modules
title: Shared Texture Slot UI
sidebar_position: 11
---

# Shared Texture Slot UI

> This page is a reference. There is no set reading order.
> Every texture slot in MingToon uses the same layout. Learn it once here.

One slot is four blocks from top to bottom.

1. The map row — texture, color, tiling and offset
2. **Texture Adjustments** — channels and color correction
3. **UV & Motion** — which UV to read and how to move it
4. The mask row and **Mask Details**

![One expanded texture slot with its four blocks numbered in the inspector](/img/placeholder.png)
<!-- CAPTURE: guides/texture-modules-01-slot-anatomy.png | 노멀 레이어 슬롯 하나를 전부 펼친 인스펙터 + 맵 행/텍스처 세부 설정/UV·움직임/마스크 네 덩어리에 1~4 번호 콜아웃 | 1200x700 -->

## The map row

| Inspector label | Type | What it does |
|---|---|---|
| **Color** | Color | The color multiplied into this map |
| **Unassigned** | — | Shows the map is empty |
| **Clear Texture** | — | Clears this slot's map |
| **UV · Tiling · Offset** | — | Expands the UV transform for this map only |

:::caution[The map's tiling and the mask's tiling are separate]
The two do not change together automatically.
You can repeat a surface map 30 times while placing the mask only once.
:::

## Texture Adjustments

### Channel Source {#채널-소스}

| Inspector label | Type | Values | What it does |
|---|---|---|---|
| **Channel Source** | Enum | R / G / B / A | Reads only one when you packed several kinds of information into one image |
| **Invert Source Colors** | Toggle | — | Flips the color that was read |
| **Apply Tint After HSVG** | Toggle | — | Sets whether the color is multiplied before or after color correction |
| **Use Grayscale** | Toggle | — | Skips saturation adjustment on this matcap |

### HSVG {#hsvg}

| Inspector label | Type | Default | What it does |
|---|---|---:|---|
| **Hue** | Float | 0 | Rotates the color around the color wheel |
| **Saturation** | Float | 1 | 0 is grayscale; above 1 is oversaturated |
| **Value** | Float | 1 | Overall brightness |
| **Gamma** | Float | 1 | Adjusts the brightness of the midtones |

With all four at their defaults, the original color comes through unchanged.

If the result looks wrong, set them back to 0, 1, 1, 1 and compare with the original.

## UV & Motion {#uv-router}

| Inspector label | Type | Values or default | What it does |
|---|---|---|---|
| **UV Channel** | Enum | UV0 (default) / UV1 / UV2 / UV3 | Which UV set of the mesh to read |
| **Scroll Speed (X/Y)** | Float | 0, 0 | How many tiles it flows per second |
| **Base Rotation (°)** | Float | 0 | Rotates around the UV center |
| **Rotation Speed (°/s)** | Float | 0 | Degrees of rotation per second |

Only choose `UV1` to `UV3` when the author told you extra UVs were included.

Expand **Sprite Sheet / Atlas** to play back a grid texture.

Set **Columns / Rows**, **Frame / Play Count** and **Playback Speed (FPS)**.

If **Frame / Play Count** is 0, the atlas is not used.

Expand **Decal & Mirroring** to place a logo at one spot.

You have to turn on **Use as Decal** first before the other fields come alive.

**Flip the Copied Side** only works once **Copy to Other Side** is on.

## Mask Details {#마스크-세부-설정}

| Inspector label | Type | Values or default | What it does |
|---|---|---|---|
| **Mask Map** | Texture | Empty | Leave it empty and it applies to the whole material |
| **Mask Channel** | Enum | R / G / B / A / Luma | The channel to read from the mask |
| **Invert** | Toggle | Off | Reverses the area it applies to |
| **Feather / Softness** | Float | 0 | Blurs the mask boundary |

### How to use remapping {#리맵을-쓰는-법}

Values below **Remap Start** become 0. Raise it and the applied area narrows.

Values above **Remap End** become 1. Lower it and the boundary gets abrupt.

Set the two to the same value and the boundary becomes completely hard.

Turn on **Gradient Mode** to use a directional gradient without a texture.

While it is off, **Angle**, **Start**, **End** and **Center (UV)** are ignored.

## Layer slots {#레이어-수}

| Module | Shader maximum |
|---|---:|
| Additional Texture | 10 |
| Normal Maps | 5 |
| MatCap | 5 |

The layer count list only shows 0 to 2 at first.

To use more, press the **Use More Layers (up to N)** button.

N differs per module. Surface stack is 10, normal is 5, matcap is 5.

This display limit does not reduce the shader's actual maximum.

Each layer card has **+ Add layer**, enable, move up/down and delete in one place.
Turning a layer off keeps the slot and skips its work; turning it back on restores the stored values.

**Original texture import settings** at the top of the texture view groups the selected materials'
**Max size**, **Quality** and format by texture type. It does not change an importer until you apply.

:::caution[Layer order changes the result]
Compositing stacks in order from the bottom up.
After reordering, check each slot's strength again.
:::

## Copy / paste values {#값-복사--붙여넣기}

Right-click a property or a layer header to get the copy menu.

You can copy one value, one layer, or one tab at a time.

Paste applies only compatible fields and is recorded as a single Undo.

Mismatched fields are skipped, like pasting a matcap value onto a normal layer.

The counts applied and skipped appear in the Console log.

## Check this when nothing shows

1. See whether the map slot is empty.
2. See whether that module's layer count and strength are not 0.
3. See whether the map and mask tiling match the UV you intended.
4. See whether a parent switch such as **Use as Decal** is on.
5. Set HSVG back to its defaults and compare.

## Related pages

- [Basic Settings guide](/guides/basics) — base map and surface mode
- [Detail Maps](/guides/detail-maps) — layers, PBR and matcap
- [Editing Multiple Materials](/guides/bulk-editing) — the same value across many
