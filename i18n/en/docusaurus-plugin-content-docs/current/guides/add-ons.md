---
id: add-ons
title: Paid Add-ons and Integration
sidebar_position: 14
---

# Paid Add-ons and Integration

> This page is for people who got here by pressing a locked button.
> You can find out in one read what that button is and whether you need it.

## The short answer

MingToon itself installs, compiles and runs with no add-ons at all.

Add-ons only handle **creating** data. The side that **reads** that data is always the MingToon shader.

So textures or vertex colors made with an external tool give the same result.

## The three tools

| Tool | What it creates | What to use instead |
|---|---|---|
| **Mask Maker** | Paints masks and vertex colors directly in the Scene view | Put a mask texture made in an external tool straight into the slot |
| **Face SDF Studio** | Creates face shadow SDF maps | Put an SDF texture you already have into the slot |
| **Ming Light Controller** | Creates VRChat expression menus and parameters | Adjust the values directly in the inspector |

- [Mask Maker Integration](/guides/mask-maker) — the `MM` button and vertex paint
- [Face SDF and Face SDF Studio](/guides/face-sdf) — SDF map format and hookup
- [Using Ming Light Controller](/guides/ming-light-controller) — generating in-game menus

## Why do locked buttons still show

Graying a button out erases the fact that the feature exists at all.

So the button stays, and pressing it sends you to that tool's documentation.

:::note[These are not assembly references]
MingToon does not reference the three tools at compile time. It finds them by name at run time.
With all three absent, MingToon's installation, compilation and behavior are unaffected.
:::

## I installed it and the button is still locked

1. Wait for Unity to finish compiling, then reopen the inspector.
2. Check the Console for compile errors.
3. Check that you selected only one material. Some buttons will not press with several selected.
4. Check that the slot is a target of that tool. If it is not, the button is not attached at all.

## Purchase and release status

Each tool's store page and current release status are written in its own document.

Face SDF Studio has not been released yet. We do not guide you through a purchase-based procedure for it.

## Related pages

- [Mask Maker Integration](/guides/mask-maker)
- [Face SDF and Face SDF Studio](/guides/face-sdf)
- [Using Ming Light Controller](/guides/ming-light-controller)
- [MingToon Manager](/workflow/character-manager)
