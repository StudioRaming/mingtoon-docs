---
id: mesh-bakes
title: Mesh UV Bakes
sidebar_position: 10
---

# Mesh UV Bakes

**After reading this guide,** you can distinguish UV4, UV7, and UV8 ownership and understand the difference between 0.1.7 Live face normals and upload-only baking.

| Channel | User Data |
|---|---|
| **UV8** | Outline smooth normals and an optional pressure value |
| **UV7** | Face SDF Baked Front coordinates. An upload face-normal payload can temporarily use the same channel |
| **UV4** | Height relative to the character root |

:::danger[Check existing channels]
UV channels may contain data written by another shader, tool, or model author. Enable `Overwrite` only after confirming ownership. `UV Channel Usage` in MingToon Manager displays UV4, UV7, and UV8.
:::

## Outline Smooth Normals (UV8) {#아웃라인-스무스-노멀-uv8}

Averages the normals of vertices at the same position and stores them in UV8. This reduces hull-outline gaps along hard edges. UV8.w can also contain an optional line-width contrast value.

### Procedure

1. Open `Outline Smooth Normals UV8` under `3 · Details` in MingToon Manager.
2. Check the targets, shared Meshes, and existing UV8 in the status panel.
3. For hair or skirts with edited normals, consider `Calculate for Models with Edited Normals`.
4. Enable overwrite only after confirming ownership of the existing UV8.
5. Run the full-character UV8 bake.

`Normal Source = UV8TS` is the default, so no material change is needed after baking. When `Pressure Source = OutlineNormalUV8`, UV8.w also affects width.

Parts without tangents skip their UV8 step without failing the UV4 and face steps as well. Generate tangents for those parts in the Model Importer, then run the bake again.

### For Models with Edited Normals {#노멀을-편집한-모델용으로-계산}

Enable `Calculate for Models with Edited Normals` to rebuild the outline direction from Mesh faces instead of shading normals transferred from a sphere or cylinder. It does not change the shading normals.

## Live Face Normals and UV7 {#얼굴-프론트뷰-노멀-uv7}

Starting in 0.1.7, the shader calculates proxy face normals live while editing. Changes to proxy center, radius, Sphere/Cylinder/Capsule shape, axis, height, or strength appear immediately without a separate Mesh bake. The radius changes the target-normal curvature, not only the displayed size.

### During VRChat Upload

For every face-normal optimization build root, the VRChat upload hook first **journals the original Mesh and material slots of every Renderer that has a Mesh**. A later upload conversion can replace Meshes even on non-Face Renderers, so recording only Face slots would not fully restore the original arrangement.

Face slots are isolated with transaction-owned temporary materials, and the UV7 face-normal payload is created only on those copies. The scene's original Meshes and materials, and materials shared by another avatar, remain untouched. After upload the complete journal restores the original arrangement, and recovery continues across script reloads or editor restarts. If the user changed a target after the upload mutation, recovery preserves that newer state and leaves the entry pending for a later retry.

The following Renderers skip upload baking and remain on the Live shader path to preserve their result:

- Face SDF owns UV7 through `Baked Front UV7`
- A texture Face Area Mask is enabled with strength greater than 0
- Several Face slots on one Renderer use different proxy targets, strengths, or runtime face frames
- The source Mesh already contains non-MingToon data in UV7

### Return a Legacy Face-Normal Bake

If `_FaceNormalBaked` remains from an older version and moving the proxy no longer changes the result, run `Return Face Normals to Live` in MingToon Manager.

This operation:

- disables the baked float and keyword
- returns `Face Map Coordinates` to Base UV so a tangent-normal payload is not misread as Face SDF coordinates
- does not alter Mesh bytes
- records all materials as one Undo operation and saves only changed assets

The next normal conversion rebuilds from the source Mesh, naturally removing the unused legacy UV7 payload.

### Baked Front UV7 for Face SDF

For Face SDF, UV7 stores **front-projected coordinates**, not normals. When the separate Face SDF Studio product is installed, it can bake SceneView's front view into TEXCOORD6 of a duplicate Mesh.

1. Align the face to the front.
2. Select `Baked Front UV7` in Studio.
3. Bake the duplicate Mesh and apply it to the target Renderer.
4. Confirm that `Face Map Coordinates` on the MingToon material uses the same mode.

An SDF authored for Base UV does not require UV7. → [Face SDF](/guides/face-sdf)

## Character Height (UV4) {#캐릭터-높이-uv4}

Stores height relative to the entire character root in UV4.x on every Mesh. Separate upper- and lower-body Meshes share one continuous axis.

### Procedure in MingToon Manager

1. Open `Character Height UV4` under `3 · Details`.
2. Check existing UV4 data and target Renderers.
3. Enable overwrite only after confirming ownership.
4. Run the full-character UV4 bake.
5. Apply the height settings to all child MingToon materials.

The Material Inspector can also find open characters that use the selected materials and run the bake. Even if several materials refer to the same character, it processes that character only once.

## Decide Which Channel to Bake

| Situation | Choice |
|---|---|
| Outline separates along hard edges | UV8 |
| Face SDF requires front-projected coordinates | UV7 |
| A height gradient is used | UV4 |
| Previewing face-normal proxy changes while editing | Do not bake — Live |
| Optimizing VRChat face normals | Do not bake manually — upload hook |

→ [MingToon Manager](/workflow/character-manager) · [Character Expression](/guides/character)
