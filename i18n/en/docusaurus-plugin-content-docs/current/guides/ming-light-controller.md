---
id: ming-light-controller
title: Using Ming Light Controller
sidebar_position: 16
---

# Using Ming Light Controller

> This page is for people attaching MLC for the first time.
> You make brightness and color changeable from an in-game menu. It takes about 15 minutes.

## What is this {#ming-light-controller란}

Ming Light Controller (MLC) is a separate add-on. You install it apart from MingToon BRP itself.

Building the shader look is MingToon's job. Choosing what the wearer can change in game is MLC's job.

| Product | Role |
|---|---|
| **MingToon BRP core** | Material rendering, the inspector and manager, build optimization |
| **Ming Light Controller** | Per-avatar control settings and in-game expression menu generation |

## Before you start

- An avatar with MingToon materials
- VRChat Avatars SDK
- NDMF — a shared framework that attaches things to a copy of the avatar
- Modular Avatar, or supported VRCFury, if the avatar already has menus or an FX layer

MLC does not install these dependencies for you.

## Turn it on in 30 seconds

1. Add the MLC component to the avatar root.
   `GameObject > Studio Raming > Ming Light Controller > Add or Configure Component`
2. In **Quick Start**, choose a starting preset and leave the profile on Auto. Press **Apply**.
3. In **Menu Layout**, turn on the items you want and set the menu location.
4. In **Budget & Validation**, check the total and whether generation is possible.

If there are no red errors on the budget screen, it worked.

If red errors remain, see [what to check in Play Mode and on upload](#설치-확인).

After resolving the errors, confirm the menu opens in Play Mode and then upload.

![The MLC inspector's Budget & Validation panel showing MLC cost, external cost, total and whether generation is possible](/img/placeholder.png)
<!-- CAPTURE: guides/ming-light-controller-01-budget.png | MLC 인스펙터 「예산·검증」 패널 전체. MLC 비용 / 외부 비용 / 합계 / 생성 가능 여부 줄이 모두 보이는 상태 | 1200x700 -->

Choosing a preset and pressing **Apply** are two different things. After applying you can still edit each item, and Undo reverses it.

## Choosing an attachment method

The attachment method sets how the menu MLC builds is attached to the avatar.

| Method | When to use it |
|---|---|
| **Modular Avatar** | An avatar that already has menus or an FX layer. The safest option |
| **VRCFury** | When a supported provider is installed |
| **Direct Descriptor** | Only on a copy whose FX, menus and parameters are **empty** |
| **Standalone** | Does not attach a menu to the avatar. Pick only this and there is no in-game control |

`Auto` works down the list and picks the first one it can use. If you pick VRCFury without a supported provider, it shows an error. It does not quietly switch to another method.

:::caution[Write Defaults does not bulk-change your existing FX]
The states MLC creates are written with Write Defaults off.
The Modular Avatar attachment asks to match the avatar's own setting, so check the final result yourself.
:::

## Profiles and budget {#파라미터-프로필}

A VRChat avatar has a fixed number of bits available for syncing. The profile sets how those bits are spent.

| Profile | How to choose |
|---|---|
| **Auto** | Looks at your current settings and budget and considers Smooth first. If it does not fit, it switches to Compact |
| **Smooth** | Prioritizes precision on continuous controls. Uses more bits |
| **Compact** | Uses fewer bits. The control steps get coarser in exchange |

Sync bits and the parameter item count are two different limits. Few bits does not mean few items.

The cost depends on which features are active, on the save and sync settings, and on other components. Judge from the current calculation in the **Budget & Validation** panel, not from a fixed number in the docs.

:::caution[Unconfirmed does not mean confirmed usable]
If the cost of another component cannot be read, the overall budget cannot be guaranteed.
Seeing an MLC estimate does not mean the whole avatar is within the limit.
:::

## Menu layout {#루트-메뉴-구성}

The recommended layout is the seven below. It is a starting point, and adding or removing items changes the final layout.

`Reset` · `Final Output` · `Hue/Saturation` · `Photo Looks` · `Virtual Light` · `Master Adjust` · `Performance`

For each item you decide three things.

- **Enabled** — put this feature into the menu.
- **Saved** — keep the value the next time the avatar is worn.
- **Synced** — other people see it too. It spends budget.

### Commands run when pressed

Commands like Reset or a performance preset are events that run once when the button is pressed. They do not take a fixed value or a restore value the way continuous controls do.

If an old configuration still has an incorrect command fixed value, a warning and a **Repair Command Value Settings** button appear. Undo reverses it.

## MingToon features this unlocks {#설치하면-열리는-mingtoon-기능}

The Master Adjust and virtual light editing UI in the MingToon inspector, and the MLC settings entry point in the manager, become available. If the buttons stay locked, check the Console for compile errors and confirm the add-on is installed.

## What works without MLC {#mlc-없이도-되는-것}

Lighting, shadows, rim, depth effects and outline rendering all work without MLC. Master Adjust values saved in a material keep rendering; only the editing UI is hidden.

Securing the depth texture and the build policy belong to the MingToon Manager. Delete MLC and the build behavior is unchanged. → [VRChat depth light](/platforms/vrchat#vrchat-깊이-라이트)

## What to check in Play Mode and on upload {#설치-확인}

:::note[Only the settings are stored on the original avatar]
The actual menus, parameters and FX are created in Play Mode or on the upload copy.
It is normal that no Generated folder appears on the original while you edit.
:::

Before uploading, check that the menu opens, the control directions, the initial values and the Reset behavior.

| Symptom | What to check |
|---|---|
| The menu does not appear | The Play Mode preview option, the attachment method you picked, the SDK and NDMF compile state |
| Direct Descriptor aborted | There are existing menus or FX. Switch to Modular Avatar |
| External cost is unconfirmed | Do not treat the total as final |
| Command fixed-value error | Clean it up with that command's repair button |

Testing in the editor alone does not verify two-user syncing on the real client. → [Current Limitations and Release](/limitations)

## Distribution and price

MLC is distributed free only during the open beta and is sold from the Early Access release onward. The free distribution does not include a MingToon commercial license, and sharing or redistributing the files is prohibited.

MingToon is currently the only supported shader. lilToon and Poiyomi support is planned, and MLC is not a tool that converts shaders.

[Official BOOTH store page](https://raming.booth.pm/items/8810346) · [License and Commercial Use](/legal/beta-license)

## Other tools {#mask-maker}

Mask Maker is a separate tool for creating masks and vertex paint. It is not required for MLC menu generation.
→ [Mask Maker Integration](/guides/mask-maker) · [Paid Add-ons and Integration](/guides/add-ons)

## Related pages

- [MingToon Manager](/workflow/character-manager)
- [Automatic Optimization On Build](/workflow/build-optimization)
- [VRChat](/platforms/vrchat)
- [Troubleshooting](/troubleshooting#vrchat)
