---
id: inspector
title: Using the Inspector
sidebar_position: 1
---

# Using the Inspector

> This page is for anyone opening the MingToon inspector for the first time.
> It covers where things are and what to check first when a value does nothing. It takes about 5 minutes.

## What is this

Selecting a MingToon material switches the Inspector to the MingToon screen.
A toolbar sits at the top, with a navigation bar split into color segments below it.
Below that, groups and sections are stacked and collapsed.

## When to use it

- When you changed a value and the view stayed the same
- When you cannot find the name of an item you saw on screen
- When you need to fix several materials at once

## Try it in 30 seconds

1. Select one converted material.
2. Switch the view mode in the toolbar to **Full**.
3. Type `Blur` into **Search** in the toolbar.
4. Lower **1st Shadow Blur** to 0.05 in the results.

You succeeded when the shadow boundary sharpens.
If nothing changes, see [All Effects and section masters](#전체-효과--가장-위의-마스터-스위치) below.

## The three view modes {#보기-모드}

| Mode | What you see | When |
|---|---|---|
| **Simple** | Surface, lighting, key maps, and the main items of shadow, rim, face, and depth | Setting the look right after conversion |
| **Full** | Every workflow group and the advanced render states | Serious editing, troubleshooting |
| **Bulk** | Values that are safe to apply to several materials at once | Unifying a whole avatar |

Simple is a shortened screen. Switch to Full if the item you need is missing.
Search finds Korean, English, and Japanese names.

![The inspector in Simple mode and Full mode side by side](/img/placeholder.png)
<!-- CAPTURE: guides/inspector-01-view-modes.png | 같은 재질을 간단 모드와 전체 설정 모드로 연 Inspector 2분할 | 1200x700 -->

## The navigation bar and groups {#이동-막대와-그룹}

Press a segment of the color bar below the toolbar to jump to that group.
The bar holds six groups in order.

| Order | Group | Document |
|---|---|---|
| 1 | **Base Color & Transparency** | [Basic Settings](/guides/basics) |
| 2 | **Shadows** | [Light and Shadow](/guides/light-and-shadow) |
| 3 | **Emission & Effects** | [Detail Maps](/guides/detail-maps) |
| 4 | **Material & Gloss** | [Detail Maps](/guides/detail-maps) |
| 5 | **Face & Outlines** | [Character Rendering](/guides/character) · [Outline](/guides/outline) |
| 6 | **Rim & Fill Lights** | [Rim](/guides/rim) |

Full has three more groups.
The inspector's **Basic Settings** group and **Screen-space Effects** · **Advanced Rendering** do not appear on the bar.
Scroll or use search to reach them. Depth items are in [Depth Effects](/guides/depth-effects).

## All Effects and section masters {#전체-효과--가장-위의-마스터-스위치}

**All Effects** turns every MingToon effect on and off at once.
Turning it off leaves only alpha, cutout, and the shadow caster silhouette.
While it is off, the rows it affects are shown as disabled.

Each section also has its own master.
Rows in a section that is off get `(Module Off)` appended.
If you found such a row through search, press **Turn This Module On** next to it.

![The same character with All Effects off and on](/img/placeholder.png)
<!-- CAPTURE: guides/inspector-02-all-effects-before-after.png | 같은 캐릭터를 전체 효과 끔·켬으로 렌더한 2분할 | 1200x700 -->

## Quick Settings {#빠른-설정}

**Quick Settings** collects the values you touch most often into one card.
They are the same values as in their original sections, so both move together.
If the selected materials hold different values, `(Mixed State)` is shown.

## Values you will touch often

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **All Effects** | The top-level switch for every MingToon effect | On | Turning it off leaves only alpha and the silhouette, and removes the rest |
| **Simple** | How many items the inspector shows | On right after conversion | Switching to Full reveals every group |
| **Search** | Find an item by name | Empty | Typing switches the view to Full automatically |
| **Changed Only** | Show only rows that differ from the factory default | Off | On leaves only the values you and the presets changed |
| **Favorites Only** | Show only starred sections and rows | Off | On hides every section without a star |
| **Collapse All** | Tidy up groups and sections at once | Only when needed | **Expand All** reverses it |
| **Language** | The display language of item names | Korean | Switching to English or Japanese leaves values untouched |

**Changed Only** works in the Full view only.
If nothing changed, `Nothing Changed` is shown.

## Several materials at once

Rows whose values differ are shown as mixed values.
Fixing such a row writes the same value into every selected material.
The **Face·Skin·Regular** role at the top of the material changes too.

Use **Copy Material** to pick up and **Paste Material** to move.
Right-click the paste button to choose the kind.

- **Paste All**
- **Paste Values Only (No Textures)**
- **Paste Textures Only**
- **Paste Keywords Only**
- **Paste Render Queue Only**

Pasting applies to every selected target and is reversed with Undo.

:::caution[Face proxies only within the same character]
When you edit a face proxy in the Scene view, select Face materials from one avatar only.
Editing does not start if different avatars are mixed.
:::

## Common problems

### I changed a value and the view stayed the same
Check **All Effects** first, then that section's master, then the prerequisites it needs.

### I cannot find a slider from the screen in the documentation
Type its name into **Search** in the toolbar. It searches all three languages.

### Only the effects that use depth are missing
Check [Depth availability](/guides/depth-effects#깊이-가용성) first.

## More detail

[Basic Settings](/guides/basics) · [Editing Multiple Materials](/guides/bulk-editing) · [MingToon Manager](/workflow/character-manager) · [Troubleshooting](/troubleshooting#performance)
