---
id: bulk-editing
title: Editing Multiple Materials
sidebar_position: 12
---

# Editing Multiple Materials

> This page is for people using **Bulk Settings** for the first time.
> You write the same value into many materials on an avatar at once. It takes about 5 minutes.

## What is this

It is common for one avatar to carry more than twenty materials.

You should not have to drag the same slider twenty times to change the outline color.

Bulk Settings gathers the materials that match your filters and writes values to all of them at once.

## When to use it

- When you want the outline color across the whole avatar in one tone
- When you want to move the shadow boundary on every outfit together

## Turn it on in 30 seconds

1. Select the MingToon Manager.
2. Change the inspector view to **Bulk Settings**.
3. Set **Scope** to `MingToon Manager`.
4. Check that **Preview Material Count** is greater than 1.

If you see a number, it worked.

If it is 0, see [common problems](#흔한-문제) below.

![The Bulk Settings panel's scope and filter rows and the preview material count](/img/placeholder.png)
<!-- CAPTURE: guides/bulk-editing-01-panel.png | 일괄 설정 보기의 범위/비활성 오브젝트 포함/머티리얼 종류/표면 종류 행 + 미리보기 머티리얼 수 + 공통 외형 그룹 | 1200x700 -->

## How to use it

1. Set **Scope** and the two filters.
2. Check **Preview Material Count**.
3. Press **Refresh Preview** if you changed the outfit or the scene.
4. If you need it, use **Select Preview Materials** to put the result into your selection.
5. Open a group under **Common Look** and change the values.

Only MingToon materials remain in the targets, and the same material is only included once.

A value applied to many materials can be reverted with a single Undo.

## Scope and filters

| Inspector label | Values you can pick |
|---|---|
| **Scope** | Selected objects / MingToon Manager / Active scene / All loaded scenes |
| **Include Inactive** | Also finds outfits that are turned off |
| **Material Kind** | All / Normal / Face |
| **Surface Kind** | All / Opaque / Cutout / Transparent |

Set **Scope** to `MingToon Manager` and it only searches under that manager.

When editing an avatar or an outfit, pick the manager at the top of the avatar.

## Values you will touch often

**Common Look** is split into four groups.

Each row is only written to materials that have that property.

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Overall Intensity** | The final brightness of the whole character | Leave at default (1) | Raise it and everything brightens; lower it and everything darkens |
| **Base Tint** | The color layered over the base map | White | Add a color and every selected material takes on that tint |
| **Shadow Border** | Where the boundary between lit and shaded sits | Leave at default (0) | Raise it and the shade widens; lower it and it narrows |
| **Shadow Softness** | How wide the boundary blurs | Leave at default (0.3) | Raise it for a soft blur; lower it for a crisp line |
| **Outline Color** | The color of the line | Darker than the base | The closer to black, the stronger the cartoon look |
| **Outline Width** | The thickness of the line | Leave at default (1) | Raise it and it thickens; at 0 it disappears |
| **Overall Emission Intensity** | The strength of all glow | Leave at default (1) | At 0 the glow disappears |

If there are too many rows, put part of a name into **Search Properties**.

While searching, the matching group expands automatically.

## Material presets {#머티리얼-프리셋}

Save a set of values as an asset and reuse it on another avatar.

1. Expand **Preset Capture & Management**.
2. Save the current material's values with **Save User Preset**.
3. On another material, pick it from the **Preset** list.
4. Press **Apply**.

:::caution[Some values a preset does not overwrite]
Surface rendering and layer contents belong to the material itself and are left as they are.
Textures, tiling and offset are not touched either.
:::

A preset only holds numbers and colors.

The render queue and the RenderType tag are left alone.

Applying one can be reverted with Undo.

## Copy / paste

Use this when you only want to move one value or one tab.

Right-click a property or a layer header and a menu appears.

The detailed rules are in [copy / paste values](/guides/texture-modules#값-복사--붙여넣기).

## Common problems {#흔한-문제}

| Symptom | Cause | Fix |
|---|---|---|
| The preview count is 0 | The scope points outside the manager | Pick the manager at the top of the avatar |
| The row you want does not show | The selected material does not have that property | Widen the filter to All and search again |
| The value only landed on some | Materials without that property are skipped | Split by kind filter and apply twice |

After changing an outfit or a scene, press **Refresh Preview** first.

## More detail

- [Using the Inspector](/guides/inspector) — view modes and where Bulk Settings lives
- [MingToon Manager](/workflow/character-manager) — setting the character scope
- [Shared Texture Slot UI](/guides/texture-modules) — the rules of the copy menu
