---
id: texture-modules
title: Common Texture Slot UI
sidebar_position: 11
---

# Common Texture Slot UI

**Purpose:** Learn the repeated adjustment order used by MingToon base maps, masks, normals, MatCaps, and emission slots. Select a material, check the map and its **Tiling / Offset** first, then open **UV Router** and advanced details only when needed.

Read a texture slot in this order:

- Map row: texture, tint when supported, and **Tiling / Offset**
- Optional **UV Router**
- Details: channel, invert, HSVG, and tint order
- Optional mask map transforms, UV Router, channel, remap, feather, and gradient

## Texture Adjustments

### Channel Source {#채널-소스}

Choose which channel the map reads.

| Value | Result |
|---|---|
| **Full RGBA** | Reads the whole color |
| **R / G / B / A** | Reads one channel |

Use a channel when several values are packed into one texture. Mask slots also offer **Luminance**, which turns RGB brightness into the mask value.

### Invert Source Colors

Invert the value that was read. Enable it when the effect should use black areas, or when reusing a mask painted white where you want to erase.

### HSVG {#hsvg}

| Item | Range | Neutral | Effect |
|---|---:|---:|---|
| **Hue** | -1 to 1 | 0 | Rotates hue |
| **Saturation** | 0 to 2 | 1 | Reduces or increases color strength |
| **Value** | 0 to 2 | 1 | Darkens or brightens |
| **Gamma** | 0.1 to 3 | 1 | Changes midtone contrast |

Neutral values keep the authored color. For example, adjust only **Hue** on an eye texture to try a new color without rebaking the file. If the result seems wrong, restore HSVG to 0/1/1/1 and compare with the original.

For slots with a tint, **Apply Tint After HSVG** chooses whether tint is multiplied before or after HSVG. The same tint can produce a different result when the order changes.

## Tiling, Offset, and UV Router {#uv-router}

**Tiling / Offset** directly below the map row belongs to that map. A mask has its own Tiling / Offset, so the two are independent. You can repeat a surface map 30 times while leaving a mask at one full UV pass.

Slots that expose **UV Router** can provide:

- **UV Source:** UV0, UV1, UV2, or UV3
- **Scroll:** X/Y movement
- **Rotation / Rotation Speed:** shown in degrees in the UI
- **Atlas:** grid minimum 1, frame count minimum 0, FPS, frame scale, and center blend
- **Decal:** **Is Decal** must be enabled before left/right, copy, and mirror options are active. **Flip Copy** is disabled while **Should Copy** is off.

If this group is absent, the shader slot has no UV Router properties. Do not treat a missing advanced row on an ordinary UV0 slot as a missing texture.

## Mask Details {#마스크-세부-설정}

### Using mask remap {#리맵을-쓰는-법}

A mask restricts where an effect applies. The mask row also owns its Tiling / Offset and optional UV Router. Its detail controls are:

| Item | Effect |
|---|---|
| **Mask Channel** | Select R/G/B/A or **Luminance** |
| **Invert** | Flip black and white |
| **Remap Start / End** | Re-map the gray input range |
| **Boundary Blur** | Soften the transition |
| **Gradient Mode** | Enables a gradient; Angle, Start, End, and Center(UV) appear only then |
| **Alpha Scale / Offset / Blend Mode** | Compose the final value for supported alpha masks |

Raise **Start** first to narrow the affected range, then lower **End** to sharpen the transition. Equal values approach a hard cut. If Gradient Mode is off, hidden direction and center rows are expected. Alpha blend modes are **Multiply, Replace, Add, and Subtract**.

## Layer Slots {#레이어-수}

The texture stack supports up to 10 layers; normal and MatCap layers support up to 5 each. **Active Layers** set to 0 disables that module. When a map is invisible, first check that the count reaches that slot index. The first layer header opens by default, and **Up / Down** reorders layers.

The inspector may initially expose only two layer choices. If the material already uses more than two, or you press **Show up to N layers**, the popup expands to the module's real maximum. This display limit does not change the shader hard maximum.

:::caution[Layer order changes the result]
Normal above Multiply and Multiply above Normal produce different composites. Recheck each map and its opacity or strength after reordering.
:::

## Copy / Paste values {#값-복사--붙여넣기}

Right-click a property or layer header for value, layer, and tab copy menus. Paste writes compatible properties only and records one Undo unit. A MatCap layer cannot be pasted into a Normal layer, and a color cannot be pasted into a numeric slider; incompatible entries are skipped.

Check the applied/skipped count in the Console log. If a menu or row is missing, check whether search hid the row, whether the slot declares that property, and whether the selected layer type matches.

## When a value is not visible

1. Confirm the map object field is assigned.
2. Check Active Layers and the slot's strength or opacity.
3. Check map and mask Tiling / Offset against the intended UV.
4. Check UV Router, Atlas, and Decal gates.
5. Restore neutral HSVG and the channel actually painted in the mask, then compare.

## Related docs

- [Basics](/guides/basics) — Base Map and alpha
- [Detail Maps](/guides/detail-maps) — Layers, PBR, MatCap
- [Bulk Editing](/guides/bulk-editing) — Apply common values to several materials
