---
id: mask-maker
title: Mask Maker Integration
sidebar_position: 14
---

# Mask Maker Integration

**After reading this guide,** you will understand which buttons Mask Maker unlocks inside MingToon, how to achieve the same goals when it is not installed, and where to get the product.

## The Button You Just Pressed Requires a Separate Product

Mask Maker is an Editor tool sold separately. It is not bundled with the MingToon open beta package.

MingToon itself installs, compiles, and runs without Mask Maker. The side that **reads** masks is the MingToon shader; Mask Maker only handles the side that **creates** those masks.

**Purchase:** <https://raming.booth.pm/items/8606444> (BOOTH · `[Unity] MaskMaker`)

:::note[MingToon does not reference add-ons as assemblies]
MingToon finds Mask Maker, Face SDF Studio, and Ming Light Controller only through reflection, not through assembly references. That is why MingToon installs, compiles, and runs normally even when all three are absent.

Install one and the corresponding button comes alive on the spot. If it is not installed, the button still appears, and pressing it brings you to this document.
:::

## MingToon Features That Mask Maker Unlocks

| Location | Button | What it does |
|---|---|---|
| Inspector · Mask texture slot | `MM` | Paints that slot's mask directly in the Scene view |
| Inspector · `Normal Outline` | `Paint Outline Width in Scene View` | Paints the vertex color that controls line thickness |
| Inspector · `Face/Hair Shading` | `Start Face Area Paint` | Paints the range treated as the face into vertex color |

### The `MM` Button on Mask Slots {#mm-버튼}

It is attached only next to mask-type texture slots. For example, slots such as `Mask Image`, `PBR Packed Mask`, `Face Area Mask`, and `SDF Apply Mask`. If `MM` is visible next to a slot, that slot is supported; if it is not visible, that slot is not a target.

:::tip[Use it with only one material selected]
`MM` edits one slot of one material in the Scene view. It cannot be pressed while multiple materials are selected together.
:::

### `Normal Outline` — Painting Outline Width

Start from the `Normal Outline` tab. Painted values go into the **red (R) or alpha (A)** channel of vertex color, and `Pressure Source` in the same tab decides which channel is read.

If `Pressure Source` is not a vertex channel yet, the Inspector first shows a guidance message and a `Switch to Vertex Color Alpha (VertexAlpha)` button.

### `Face/Hair Shading` — Face Area Paint

Start from the `Face/Hair Shading` tab. Painted values go into the **green (G)** channel of vertex color. This range information is required in order to treat the face area differently from the body. → [Character Expression — Face Shading](/guides/character#페이스-셰이딩)

## How to Do It Without Mask Maker

Both features have a separate texture mask path. Mask Maker is only a tool that lets you create that data inside Unity; it is not the only input path.

| What you want to do | Without Mask Maker |
|---|---|
| Mask texture | Create it in an external tool and assign it directly to the matching Inspector slot |
| Outline width control | Set `Pressure Source` to `WidthMask` and use a width mask texture |
| Face area assignment | Use a `Face Area Mask` texture |
| Vertex color already painted | It is read as-is. Values painted in an external DCC and imported are also valid |

### Vertex Color Channel Summary

| Purpose | Channel |
|---|---|
| Outline width (pressure) | Red (R) or alpha (A) |
| Face area | Green (G) |

## Other Add-ons Locked Alongside It

The full list of the three add-ons and the procedure for confirming installation are in [Separately Sold Add-ons](/guides/add-ons).

### Face SDF Studio

A separately sold tool that creates face shadow maps driven by light direction. Face Shading works without it, and an SDF texture you already have can be assigned directly to the slot. → [Face SDF and Face SDF Studio](/guides/face-sdf)

### Ming Light Controller {#ming-light-controller}

MLC is a separate add-on that turns MingToon controls into VRChat expression menus. Check distribution instructions on the [official BOOTH product page](https://raming.booth.pm/items/8810346) and install it separately from MingToon. Mask Maker is not required to generate MLC menus.

Installing MLC unlocks the linked Master Adjust and Virtual Light editing controls and the Manager entry point for MLC settings. Configure MLC on the avatar root, choose menu items, and check the current Inspector budget and validation results. Smooth/Compact/Auto costs depend on enabled features and Saved/Synced settings, so do not rely on fixed numbers. Auto does not guarantee unknown external costs.

Reset, Final Output, Hue/Saturation, Photo Looks, Virtual Light, Master Adjust, and Performance are a starting configuration; the final menu depends on your settings. Edit Mode stores configuration; inspect generated results during Play Mode/upload processing. Follow [Using MLC](/guides/ming-light-controller) for dependencies and steps.

#### What Works Without MLC

All look features of the shader work as they are. Even when values for `Master Adjust` and `Virtual Light` remain on the material, only the editing UI is hidden in the Inspector; the shader behavior itself does not disappear.

The Depth Light build policy for VRChat and WARUDO is still owned by MingToon Manager, not by MLC. Removing MLC does not change MingToon's VRChat or WARUDO build behavior.

## Related Documents

- [Separately Sold Add-ons](/guides/add-ons)
- [Face SDF and Face SDF Studio](/guides/face-sdf)
- [Outline](/guides/outline)
- [Character Expression — Face Shading](/guides/character#페이스-셰이딩)
