---
id: add-ons
title: Optional Add-ons and Integrations
sidebar_position: 13
---

# Optional Add-ons and Integrations

**Purpose:** Understand the boundary between the MingToon core and optional authoring or runtime tools. MingToon shaders and inspector work without an add-on; a locked button is an integration point for the corresponding tool.

## Feature boundaries

| Tool | Integration visible from MingToon | What still works without it |
|---|---|---|
| **Mask Maker** | **MM** buttons on supported mask slots and some vertex-paint launchers | Assign mask textures and vertex colors made elsewhere |
| **Face SDF Studio** | Face SDF authoring and preview entry points | Assign an existing Face SDF texture and use face shading |
| **Ming Light Controller** | Master Adjust / virtual-light entry points and avatar menu configuration | Tune MingToon materials and use the core build and bake features |

This table describes the integration shape in the current source. The source does not establish each tool's public version, price, or distribution status. Face SDF Studio is currently unreleased, so these docs do not make its purchase or installation a prerequisite.

## Check an integration

1. If you installed an add-on, wait for Unity compilation and reopen the inspector.
2. Check whether the integration button is enabled.
3. If it remains locked, check Console errors, the bridge API load state, the selected target, and the slot.
4. Without an add-on, use the slot's texture and value fields instead of the locked button.

MingToon discovers optional integrations through their bridge surface rather than a fixed compile-time assembly dependency. A missing bridge therefore does not by itself mean that the core shader failed to install or compile.

## Related docs

- [Mask Maker integration](/guides/mask-maker)
- [Face SDF](/guides/face-sdf)
- [Ming Light Controller](/guides/ming-light-controller)
- [Character Manager](/workflow/character-manager)
