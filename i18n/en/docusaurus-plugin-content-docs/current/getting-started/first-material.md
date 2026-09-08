---
id: first-material
title: Start with MingToon Manager
sidebar_position: 2
---

# Start with MingToon Manager

**Keep MingToon Manager on the root of every avatar you work on with MingToon.** It manages target meshes, conversion, looks, and update checks. This guide starts with adding Manager after installation, then converting and refining materials in Quick Settings. Complete [installation](/getting-started/installation) first. Face SDF Studio is not yet released and is not needed for this workflow.

## 1. Add Manager to the avatar root first

In Hierarchy, select the **root object of the avatar** you are working on. Find **MingToon Manager** in Add Component and add it. Keep Manager on the avatar root even when working only on its outfit. Check that the target meshes are beneath this object, and work with one Manager selected. Keep the component after conversion and use it to check updates and work status.

**If installed through VCC, update MingToon in VCC.** Check the installation method before following update guidance in Manager.

## 2. Assign Face Mesh and Skin Mesh

In Manager's Setup, assign the face mesh as **Face** and bare-skin meshes as **Skin**. Use the face and skin renderer assignment fields and check the per-slot role preview. Do not assign all eyes, eyelashes, clothing, or hair as face or skin.

When converting only an outfit without a face or bare skin, leave those assignments empty. If one Renderer combines skin and clothing, separate their slot roles and keep clothing as **Regular**. Roles determine which materials receive the preset's face, skin, or common values.

→ [Role assignment details](/workflow/character-manager)

## 3. Choose a look preset

Choose a starting look in **Look Preset On Convert**. Start with a preset close to the desired mood, then refine its values after conversion. Select **None** to start from imported source settings without applying a look preset.

## 4. Choose a colour tone or existing material values

| Starting point | Selection |
|---|---|
| Create a new mood with preset colours | Choose a tone in **Color Preset** |
| Start with the original material's colours | Select **Keep Existing Values** |

**Keep Existing Values** preserves **converted source colours, shadow bands, and blending settings**. It is separate from **None**, which disables the look preset. The colour preset applies after the look; selecting it alone does not edit materials.

## 5. Press Convert

Check the meshes, roles, look, and colour selection, then press **Convert**. After completion, check that editable MingToon materials are assigned to the target. If the result lists excluded or failed slots, inspect those materials and reasons before continuing.

## 6. Refine the look in Quick Settings

Select converted materials and open **Quick Settings** in their Inspector. Manager's material selection tools help select just the face, skin, or other materials you need. Start by adjusting face, skin, and clothing separately; select multiple materials when you want the same values on all of them.

Work through **colour and brightness → shadow edges → outline → rim, gloss, and emission**, moving one control at a time and watching the model. Use search or Full Settings for controls absent from Quick Settings. You do not need to enable every feature below.

## Frequently adjusted parameters

| Desired change | Controls to find first | What to watch |
|---|---|---|
| Overall colour | Base Map HSVG | Adjust hue, saturation, value, and gamma gradually; check skin and clothing |
| Brightness in dark areas | Base Colour Preservation · Final Minimum Brightness | Check lost colour in dim light and overly faint shadows |
| Shadow edges | 1st Shadow Softness | Lower for a sharper edge, higher for a softer transition |
| Shadow colour | Shadow Colour | Tune skin, hair, and clothing separately |
| Outline | Outline Width · Outline Colour | Check both close-up and full-body views |
| Edge lighting | Rim Light · 2D Rim | Check silhouette emphasis; 2D rim also requires camera depth |
| Surface gloss | Matcap · Toon Specular | Check for excessive highlights on hair and clothing |
| Self-lit details | Emission | Limit it to intended areas and adjust colour and intensity |

If a value has no visible effect, check **overall effects → the module toggle → the feature's requirements**. Depth-based features such as 2D rim and 2D shadow need the setup described in [Depth Effects](/guides/depth-effects).

## 7. Upload or build after editing

Once the materials look the way you want, **upload the avatar through VRC SDK** or **build the WARUDO mod**. Automatic optimization baking runs during that workflow; a separate manual Bake is not the starting requirement. **Keep MingToon Manager on the avatar root** and check its automatic build/upload optimization status.

See [Automatic Optimization On Build](/workflow/build-optimization) and your target platform guide. See [Current Limitations](/limitations) for the beta's verification boundaries.

## Continue from here

[Quick Settings and search](/guides/inspector) · [Light and Shadow](/guides/light-and-shadow) · [Detail Maps](/guides/detail-maps) · [Manager details](/workflow/character-manager)
