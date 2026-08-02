---
id: texture-modules
title: Common Texture Slot UI
sidebar_position: 11
---

# Common Texture Slot UI

**After reading this document** you'll understand all the adjustment items that attach to **every** texture slot in MingToon in one go.

Base map, normal, mask, MatCap, emission, layers — different names, but the **structure below is identical**. Learn it once and the rest slots read themselves.

```text
Texture Slot
├─ Texture Adjustments     ← Channel Source · Invert · HSVG · Tint order
└─ Mask Details            ← Mask Map · Channel · Invert · Remap · Feather · Gradient
```

---

## Texture Adjustments

### Channel Source {#채널-소스}

**Which channel to read** from this texture.

| Value | Reads |
|---|---|
| `Full RGBA` | Color as-is |
| `R` / `G` / `B` / `A` | Single channel |

Use when you've packed multiple masks into one image. The mask slot adds `Full RGBA (Luminance)` to read RGB brightness.

### Invert Source Colors

Flip the black and white of the read value. **Use when a mask is drawn white where you need to erase**, so you can use it as-is.

### HSVG {#hsvg}

| Item | Default |
|---|---|
| `Hue` | 0 |
| `Saturation` | 1 |
| `Value` | 1 |
| `Gamma` | 1 |

Only values that differ from the default affect the result. The inspector shows each item's default as a tooltip and includes the note `Neutral HSVG: Hue 0, Saturation 1, Value 1, Gamma 1.`

:::tip[Instead of rebaking the texture]
When you want to tweak colors slightly, HSVG is much faster than editing the texture, and comparing to the original is easier.
:::

### Apply Tint After HSVG

Decide whether to multiply the tint color **before** or **after** HSVG adjustment. The same value produces different results depending on order.

---

## Mask Details {#마스크-세부-설정}

Restrict where the effect applies. Most modules can have their own mask.

| Item | Purpose |
|---|---|
| `Mask Map` | Grayscale image |
| `Mask Channel` | R / G / B / A / Full RGBA(Luminance) |
| `Invert` | Flip black and white |
| `Remap Start` · `Remap End` | Stretch the mask's gray range |
| `Boundary Blur` | Feather width at the edge |

### How to use Remap {#리맵을-쓰는-법}

Use when the mask is blurry or grabs too wide.

- Raise `Remap Start` → Range gets **narrower**
- Lower `Remap End` → Edge becomes **sharper**
- **Set both equal for a completely hard edge** (binary mask)

### Gradient

Create directional fade without a mask image.

| Item | Purpose |
|---|---|
| `Gradient Mode` | Linear / Radial etc. |
| `Angle` | Direction |
| `Start` · `End` | Fade range |
| `Center (UV)` | Reference point when radial |

---

## Layer Slots

Common to Texture Layers, Normal Layers, and MatCap Layers.

### Layer Count {#레이어-수}

| Display | Meaning |
|---|---|
| `0 (Disabled)` | This module calculates nothing |
| `1 Layer` | |
| `N Layers` | |

:::danger[Slots below the count set here don't compute]
If you add texture but see nothing, **it's almost always that the layer count is too low**. The inspector tooltip says the same thing.
:::

### Reorder layers

Each layer has `Up` / `Down` buttons.

:::caution[Changing blend order changes the result]
This isn't just organizing. Putting `Normal` above `Multiply` is completely different from the reverse.
:::

---

## Copy / Paste values {#값-복사--붙여넣기}

Right-click any item to bring up the menu.

| Menu | Scope |
|---|---|
| `Copy Value` / `Paste Value` | One item |
| `Copy Layer Values` / `Paste Layer Values` | One whole layer |
| `Copy Tab Values` / `Paste Tab Values` | One whole section |
| `Copy Property Name` | Shader property name (for animation) |

Paste result logs: `Value paste: 8 applied, 2 skipped.`

:::note[When skipping happens]
- **Layers** — `Copy a layer of the same module type first.` You can't paste a MatCap layer into a Normal layer.
- **Value type** — `The copied value type is not compatible.` You can't paste color into a slider.
- **No target** — `No compatible destination property was found.`
:::

All pastes are one Undo unit.

## Related docs

- [Basics](/guides/basics) — Base Map · Alpha Mask
- [Detail Maps](/guides/detail-maps) — Layers · PBR · MatCap
- [Bulk Editing](/guides/bulk-editing) — Multiple materials at once
