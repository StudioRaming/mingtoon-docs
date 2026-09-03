---
id: add-ons
title: Separately Sold Add-ons
sidebar_label: Separately Sold Add-ons
---

# Separately Sold Add-ons

MingToon installs, compiles and renders without any of the add-ons below. Each add-on supplies only the authoring job that needs it, such as mask painting, face-SDF creation, or VRChat runtime-menu authoring. MingToon detects them without a hard assembly reference, so adding or removing one later does not disable the shader itself.

## Mask Maker

A separate tool for painting and organizing MingToon masks while viewing the material and mesh. → [Mask Maker guide](/guides/mask-maker)

## Face SDF Studio

A separate tool for creating face-shadow SDF textures that respond to light direction. An existing SDF texture can be assigned directly to a MingToon material without this tool. → [Face SDF and Face SDF Studio](/guides/face-sdf)

## Ming Light Controller (MLC)

A separate add-on that non-destructively authors VRChat avatar lighting and look-control menus, parameters and FX configuration. The MingToon shader and the VRChat/WARUDO Build Depth Light choice still work without MLC. → [Ming Light Controller guide](/guides/ming-light-controller)

## Confirming installation

1. Import the add-on and wait for Unity to finish compiling.
2. Reopen the matching button in the MingToon inspector or Manager.
3. If it still shows the installation notice, resolve Console compile errors first.

