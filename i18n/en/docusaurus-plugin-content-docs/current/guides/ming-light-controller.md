---
id: ming-light-controller
title: Using Ming Light Controller
sidebar_position: 15
---

Every commercial license includes the URP version. MLC is included in the Early Access Founders Editions of Personal Streaming and Personal Creator; contents may change after full release. Commercial use remains prohibited during Open Beta. See [licenses and included add-ons](/legal/beta-license).

# Using Ming Light Controller

Ming Light Controller (MLC) is a **separate add-on** that lets users control MingToon material brightness, colour, virtual lighting, and performance settings from a VRChat expression menu. Install it separately from the MingToon BRP beta core. MLC is free only through Studio Raming's official BOOTH page during the open beta and is sold from the start of Early Access. Free distribution does not include a MingToon commercial license and does not permit file sharing or redistribution. This guide covers avatar setup, menu budget checks, Play Mode, and upload checks.

:::note[Settings stay on the original avatar]
The MLC component in Edit Mode stores this avatar's settings. The actual menu, parameters, FX, and required material processing are performed on a Play Mode or upload build clone. Original FX, menus, parameters, and materials are not overwritten. It is normal for no Generated folder to appear while authoring.
:::

## Distinguish these products first

| Product | Role |
|---|---|
| **MingToon BRP beta core** | Material rendering, Inspector and Manager, build optimization |
| **Ming Light Controller** | Per-avatar control settings and in-game expression menu generation |
| **URP add-on** | Separately sold URP support package; excluded from the BRP core |
| **Mask Maker / Face SDF Studio** | Separate authoring tools; see [Separately Sold Add-ons](/guides/add-ons) |

## What Ming Light Controller is {#ming-light-controller란}

MingToon authors the shader look; MLC selects what the wearer can change in game. Each avatar can choose menu features, sync state, initial values, and presets.

### What you need

For VRChat, you need an avatar with MingToon materials, the VRChat Avatars SDK, and NDMF. For avatars that already have menus and FX, use Modular Avatar or a supported VRCFury connection. MLC does not install these dependencies automatically.

Direct Descriptor is available only on an avatar clone with empty FX, expression menu, and parameters. Standalone does not attach a menu to the avatar, so selecting it alone cannot provide in-game controls.

## Quick start

1. Add the MLC component to the avatar root, or select the root and run **GameObject → Studio Raming → Ming Light Controller → Add or Configure Component**.
2. In **Quick Start**, choose a starting preset and leave the profile at **Auto**. Press **Apply** to commit it to the settings.
3. In **Menu Layout**, enable the entries you want and choose their menu locations. Adjust only the required entries in **Selected Item Settings**.
4. In **Budget & Validation**, inspect MLC cost, other feature costs, the total, and whether generation is possible. Resolve red errors and unknown external costs first.
5. In Play Mode, check the generated menu and controls, then upload. If the Play Mode preview option is off, MLC does not create a menu in the preview clone.

A preset is a starting point. You can edit entries after applying it, and the changed configuration becomes the user setting. Apply can be undone. Selecting a preset and pressing **Apply** are separate actions.

### MingToon features unlocked by installation {#설치하면-열리는-mingtoon-기능}

MLC-connected Master Adjustment and Virtual Light authoring, plus the Manager entry points for MLC settings, become available in MingToon. If a button stays locked, check Console compilation errors and the add-on installation.

### What works without MLC {#mlc-없이도-되는-것}

MingToon's lighting, shadow, rim, depth effects, and outline rendering work without MLC. A locked MLC editing UI does not remove values already stored on a material.

Check depth texture availability and platform build policy in MingToon Manager. MLC's performance menu controls prepared depth effects in game. See [Depth Effects](/guides/depth-effects) for the actual conditions.

## Profiles and budget {#파라미터-프로필}

| Profile | Selection rule |
|---|---|
| **Auto** | Checks current settings and avatar budget, considering Smooth first and switching to Compact when needed. |
| **Smooth** | Prioritizes continuous-control precision and may use more synced bits. |
| **Compact** | Uses fewer synced bits while changing control steps and local-processing parameter count. |

**Synced bits** and **parameter entry count** are separate limits. A profile with fewer bits does not always have fewer entries. When choosing Compact, check the precision and step description shown in the UI as well as the savings.

Cost depends on enabled features, Saved/Synced settings, the selected profile, and other avatar components. Use the current Inspector calculation rather than fixed numbers in documentation. Auto shows the selected profile, MLC cost, external cost, and combined total.

:::caution[Unknown does not mean available]
If the cost created by another component cannot be read, the full budget cannot be guaranteed. Showing an MLC estimate does not mean the whole avatar is within its limits. Inspect the integration state that caused the unknown result, then validate again.
:::

## Menu configuration {#루트-메뉴-구성}

The recommended starting set is Reset, Final Output, Hue/Saturation, Photo Looks, Virtual Light, Master Adjust, and Performance. The final tree changes with features added or removed and with submenus. Check slot counts in the menu-tree display.

- **Enabled**: include the feature in the menu and generated target.
- **Saved**: keep the value for the next use.
- **Synced**: synchronize the value to other users; this affects budget.
- Ranges and initial values for continuous controls and toggles are shown for the selected entry.

### Commands run when pressed

Commands such as Reset and performance presets run as events when their button is pressed. They do not expose fixed values, pins, or restore values like continuous controls do, so command details do not show those value controls.

If an older configuration left an invalid pinned command value, a warning and **Repair Command Value Settings** button appear. The button cleans up command value settings while preserving Saved/Synced selection. It can be undone. Validate generation again after repairing the warning.

## Templates and reuse

You can move the current configuration to another avatar with a template file or copy and paste. Preset Apply and template import change the selected settings, so confirm the target before committing. Unreadable files and invalid content produce an error and are not treated as a successful apply.

## What to check in Play Mode and upload

Generation runs on the avatar clone created by NDMF. The selected connection attaches menus, parameters, and FX to the clone, while the original component remains authoring settings. If a required integration is unavailable, MLC reports it rather than installing into the original.

Before upload, open the menu and check control direction, initial values, Reset, and required Saved/Synced behaviour. Passing editor tests does not verify two-user synchronization in the actual VRChat client. See [Limitations](/limitations) for the current validation scope.

If older versions left Generated assets or MLC attachments, use the dedicated cleanup action shown by the tool. Do not bulk-delete folders whose ownership cannot be confirmed.

## Mask Maker {#mask-maker}

Mask Maker is a separate tool for creating masks and vertex paint. It is not required to generate MLC expression menus.

### MingToon features unlocked by installation {#mask-maker-설치하면-열리는-mingtoon-기능}

The MM button on mask slots, Scene View outline-width painting, and face-area painting are its integration points. See [Separately Sold Add-ons](/guides/add-ons) for installation and scope.

### What works without Mask Maker {#mask-maker-없이도-되는-것}

Assign a mask texture made in another tool, or use vertex colours that are already prepared. See [Face SDF and Face SDF Studio](/guides/face-sdf) for Face SDF authoring.

## Checking installation {#설치-확인}

- If the menu does not appear, check Play Mode preview, the selected connection, and compilation of the SDK, NDMF, and connection add-on.
- If Direct Descriptor stops because of an existing menu or FX, use Modular Avatar or a supported VRCFury path.
- Treat an unknown external cost as unresolved; do not treat the total as final.
- Repair invalid command pins with the command repair button.
- It is normal for authoring to leave the original without FX or menus; inspect the Play Mode/upload clone.

## Related documents

- [MingToon Manager](/workflow/character-manager)
- [Separately Sold Add-ons](/guides/add-ons)
- [Automatic Optimization on Build](/workflow/build-optimization)
- [VRChat](/platforms/vrchat)
- [Troubleshooting](/troubleshooting)
