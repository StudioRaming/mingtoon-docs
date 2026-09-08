---
id: bulk-editing
title: Edit Several Materials at Once
sidebar_position: 12
---

# Edit Several Materials at Once

**Purpose:** Apply one value to several MingToon materials, or save and reuse a look preset. The first action is to open **Bulk Settings**, choose a scope and filters, and check **Preview Material Count**.

There are three tools:

| Tool | Best for |
|---|---|
| **Bulk Settings panel** | Applying common values across a selected, Manager, or scene scope |
| **Material preset** | Saving and reusing a values-focused look |
| **Copy / Paste** | Moving one property, layer, or tab to compatible targets |

## Bulk Settings panel {#일괄-설정-패널}

Switch the inspector **View** to **Bulk Settings**. The panel first finds unique MingToon materials in the current scope, then shows common properties.

### Scope and filters

| Control | Choices and meaning |
|---|---|
| **Scope** | Selected Objects, MingToon Manager, Active Scene, Loaded Scenes |
| **Include Inactive Objects** | Includes disabled clothing and objects; default is on |
| **Material Kind** | All, Standard, Face |
| **Surface Kind** | All, Opaque, Cutout, Transparent |

For the **MingToon Manager** scope, **Character Root** is the Manager assigned to the avatar root; its child renderers are searched. For avatar or outfit editing, choose the Manager on the avatar root. The Face filter uses the material tag **MingToonSurfaceKind=Face**; Standard is the inverse. Surface filtering reads _MingSurfaceMode: 0=Opaque, 1=Cutout, and 2 or higher=Transparent.

### Preview and apply {#적용}

1. Set the scope, inactive-object option, and filters.
2. Read **Preview Material Count**.
3. Press **Refresh** after changing clothing or scenes.
4. Optionally press **Select** to put the result into the Unity selection.
5. Open a **Common Look** group and edit a value.

Only MingToon materials remain, and duplicates are included once. A multi-material edit is one Undo unit. Each row writes only to selected materials that declare that property, so a row can apply to part of the selection.

### Common Look groups

The panel currently has **Base Lighting**, **Shadows**, **Stylization**, and **Outline / Emission** groups. Base Lighting can include all effects, base tint, **Base Map Opacity**, output intensity/tint/saturation, color preservation, light color influence, brightness limits, normal strength, and smoothness. Shadow, style, outline, and emission properties appear only when the target shader declares them.

**Property Search** matches the property name, displayed label, or registered aliases. Groups expand while searching. If there are no matches, clear the search or inspect the selected materials.

## Material presets {#머티리얼-프리셋}

**Save User Preset** stores the current MingToon look as an asset. To apply one, choose a **Factory** or **User** preset from the dropdown and press **Apply**. For multiple targets, read the target count and scope before confirming an overwrite.

The default capture and apply are values-focused. They store floats, colors, and vectors classified as look values by the current shader. Material render queue and other material-identity state are not written by a look preset. The panel's default preset keeps each target's textures. Only an explicitly requested texture capture stores and applies non-empty textures with their Tiling / Offset.

Expand **Capture Scope** to save the whole material or selected tabs. An empty tab selection means the whole material. **Shadow Color** and **Fresnel** checkboxes decide whether those values are included on apply. Selecting a preset and pressing Apply are separate actions, and Apply can be undone.

## Copy / Paste

Right-click a property or layer header for value, layer, and tab menus. Only compatible properties are written; a layer from another module or an incompatible value type is skipped. Check applied/skipped counts in the Console log. See [Common Texture Slot UI](/guides/texture-modules#값-복사--붙여넣기) for the menu list.

## When nothing is found or visible

- If the preview count is zero, check scope, the avatar-root Manager, Include Inactive, and the Face/Surface filters in that order.
- If a row is absent, check whether at least one selected material declares that property.
- If a change is not visible, check the mixed-value state, the module enable toggle, layer count, and strength.
- If a preset does not apply, check the selected preset, target count, and any schema error dialog.

## Related docs

- [Character Manager](/workflow/character-manager)
- [Common Texture Slot UI](/guides/texture-modules)
- [Detail Maps](/guides/detail-maps)
