---
id: mask-maker
title: Mask Maker Integration
sidebar_position: 15
---

# Mask Maker Integration

> This page is for people who got here by pressing the `MM` button or a paint button.
> We tell you how to do it without the tool first.

## Turn it on in 30 seconds

If you already installed Mask Maker, follow these steps to make one.

1. Pick exactly one converted material.
2. Press the `MM` button to the right of the **Mask Image** slot.
3. Paint the part you want it applied to in the Scene view.
4. Save, and the mask texture goes into that slot.

If the texture you just painted lands in the slot, it worked.

If the `MM` button does not show, see [the MM button on mask slots](#mm-버튼).

## Doing it without Mask Maker

Masks and vertex colors can all be supplied through other paths.

| What you want | Without Mask Maker |
|---|---|
| A mask texture | Make it in an external tool and put it straight into the slot |
| Outline width control | Set **Pressure Source** to `WidthMask` and use a **Width Mask** texture |
| Marking the face area | Use a **Face Area Mask** texture |
| Vertex colors already painted | They are read as-is. Values painted in an external DCC work too |

### Vertex color channels at a glance

| Purpose | Channel |
|---|---|
| Outline width (pressure) | Red (R) or alpha (A) |
| Face area | Green (G) |

**Pressure Source** decides which channel is read.

## What Mask Maker unlocks

Mask Maker is an editor tool sold separately. It is not bundled with the MingToon open beta package.

| Location | Button | What it does |
|---|---|---|
| Mask texture slot | `MM` | Paints that slot's mask directly in the Scene view |
| `Normal Outline` | **Paint Outline Width in Scene View** | Paints the vertex colors that control line thickness |
| `Face/Hair Shading` | **Start Painting Face Area** | Paints the range treated as the face into vertex colors |

![The inspector with an MM button attached to the right of a mask texture slot](/img/placeholder.png)
<!-- CAPTURE: guides/mask-maker-01-mm-button.png | 인스펙터의 마스크 텍스처 슬롯 한 개를 확대한 화면. 슬롯 오른쪽 MM 버튼이 보이는 상태 | 1200x700 -->

### The MM button on mask slots {#mm-버튼}

`MM` only attaches to mask-type texture slots.

**Mask Image**, **PBR Packed Mask**, **Face Area Mask** and **SDF Applicability Mask** are the main ones.

If you see `MM` next to a slot, it is supported. If you do not, that slot is not a target.

:::tip[Use it with only one material selected]
`MM` edits one slot on one material. It will not press with several materials selected.
:::

### Painting outline width

Start from the `Normal Outline` tab. The painted values go into vertex color red (R) or alpha (A).

If **Pressure Source** is not yet a vertex channel, the inspector tells you first. It shows a **Switch to vertex color alpha (VertexAlpha)** button.

→ [Outline](/guides/outline#씬-뷰에서-직접-칠하기)

### Painting the face area

Start from the `Face/Hair Shading` tab. The painted values go into vertex color green (G).

You need this information to treat the face range differently from the body.
→ [Face shading](/guides/character#페이스-셰이딩)

:::caution[Vertex painting edits the mesh asset directly]
Other renderers sharing the same mesh change with it.
To paint one separately, duplicate the mesh first.
:::

## Purchase

<https://raming.booth.pm/items/8606444> (BOOTH · `[Unity] MaskMaker`)

## Other add-ons {#ming-light-controller}

The boundaries of the three add-ons and how to confirm installation are collected in one place.
→ [Paid Add-ons and Integration](/guides/add-ons)

- Creating face SDF maps: [Face SDF and Face SDF Studio](/guides/face-sdf)
- Generating in-game expression menus: [Using Ming Light Controller](/guides/ming-light-controller)

Mask Maker is not required for Ming Light Controller's menu generation. The two are independent.

## Related pages

- [Paid Add-ons and Integration](/guides/add-ons)
- [Outline](/guides/outline)
- [Character Rendering](/guides/character#페이스-셰이딩)
- [Shared Texture Slot UI](/guides/texture-modules#마스크-세부-설정)
