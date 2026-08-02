---
id: bulk-editing
title: Multiple Materials at Once
sidebar_position: 12
---

# Multiple Materials at Once

**After reading this document** you can match the whole avatar's look in one action and avoid accidentally destroying values.

Three approaches:

| Approach | Use for |
|---|---|
| **Bulk Settings Panel** | Common values across the whole avatar at once. Undo in one step too |
| **Material Presets** | Save and reuse an entire look |
| **Copy / Paste** | Move at the section, layer, or value level |

---

## Bulk Settings Panel {#일괄-설정-패널}

Change the inspector **View** to `Bulk` to bring it up.

> Preview deduplicated MingToon materials and apply presets and common appearance values as **a single Undo unit**.

<!-- SCREENSHOT: Bulk settings panel -->

### 1. Set scope

| Scope | Target |
|---|---|
| `Selected Objects` | Below current selection |
| `MingToon Manager` | Under MingToon Manager's management |
| `Active Scene` | Entire current scene |
| `Loaded Scenes` | All open scenes |

Enable `Include Inactive` to include disabled costume parts. **Turn this on for avatars with clothing toggles.** Otherwise, clothes that are currently off will have a different look.

### 2. Filters

| Filter | Value |
|---|---|
| `Material Kind` | All / Standard / **Face** |
| `Surface Kind` | All / Opaque / Cutout / Transparent |

:::tip[Adjust face separately]
Set `Material Kind` to `Face` to grab only face materials. Faces need different values than the body, so this filter is often needed.
:::

### 3. Preview

See how many matched with `Preview Material Count`, and check which ones actually matched using `Select Preview Materials` in the Project panel.

If you've changed clothes, click `Refresh Preview` first.

If `No MingToon materials match the current scope and filters.` appears, widen the scope or filters.

### 4. Apply common appearance

`Common Look` exposes only items you can **safely** apply to multiple materials. Four groups:

| Group | Items |
|---|---|
| **Base & Lighting** | All Effects · Base Tint · Base Color Preservation · Light Color Influence · Minimum Brightness · Maximum Brightness |
| **Shadows** | Shadow Border · Shadow Softness · Shadow Strength · Use Unified Shadow · Unified Shadow Color · Unified Shadow HSVG · Use Shadow Boundary · Boundary Width / Blur / Strength · Cast Shadow Receive |
| **Stylization** | 2D Rim Width · 2D Rim Intensity · 2D Shadow Width / Strength · 2D Shadow Cast Reach · Face 2D Shadow Assist · 2D Shadow Light Follow · Face Self-Surface Suppression · 2D Shadow Vertical / Depth Offset · Distance Fade Range · Face Shading |
| **Outline & Emission** | Outline Color · Outline Width · Emission Intensity |

Filter with `Search Properties`; if nothing matches, `No safe bulk properties match the search and selected materials.` appears.

:::tip[Fastest way to unify avatar tone]
1. Scope = `MingToon Manager`, enable `Include Inactive`
2. `Material Kind` = `Standard`
3. Unify `Shadow Softness`, `Base Color Preservation`, `Minimum Brightness`
4. Switch `Material Kind` to `Face` and adjust face separately
:::

---

## When you just select multiple materials {#여러-재질을-그냥-선택했을-때}

You can edit without the bulk panel by selecting multiple materials in the Project panel. The inspector shows guidance above:

- `Editing N materials together. Changes apply to compatible properties.`
- `Editing N different MingToon shaders together. Only common properties display.` — when mixing BRP and URP materials, or if some are baked

Items with different values show as **`Mixed Values`**.

:::danger[Touching mixed values is irreversible]
The instant you touch that field, **the same value overwrites all selected materials**, and the original different values vanish. Only Undo gets them back. Always verify what's mixed before writing.
:::

In `Quick Look`, items with split values get `(Mixed State)` appended.

---

## Material Presets {#머티리얼-프리셋}

Save an entire look and reapply it. The name changes based on selection — `Material Presets` / `Character Material Presets` / `Bulk Material Presets`.

### Apply {#적용}

1. Pick from the `Preset` dropdown. `Factory Preset` is bundled; `User Preset` you saved yourself.
2. `Apply Selected Preset (N Materials)`.

:::note[What presets change and preserve]
- **Apply** — All numbers · colors · vectors · render state
- **Preserve** — If the target material's texture differs from the shader default, **keep that texture and tiling/offset as-is**

So you can unify the look while keeping different textures per character.
:::

### Save {#저장}

Use `Save User Preset` to bake the current material's values into an asset. `Save Source: {material}` shows what was saved from.

Pick `Advanced / Direct Assignment` to slot an asset directly into the `Preset Asset` field.

---

## Copy / Paste

Right-click menu on any item. Details live in [Common Texture Slot UI](/guides/texture-modules#값-복사--붙여넣기).

| Menu | Scope |
|---|---|
| `Copy Value` / `Paste Value` | One item |
| `Copy Layer Values` / `Paste Layer Values` | One whole layer |
| `Copy Tab Values` / `Paste Tab Values` | One whole section |
| `Copy Property Name` | Shader property name |

---

## Find all scene materials

Use `Select All MingToon Materials in Scene` to grab every MingToon material in the current scene at once. Useful in scenes without a MingToon Manager.
