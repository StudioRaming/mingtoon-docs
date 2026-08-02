---
id: mesh-bakes
title: Mesh UV Bake
sidebar_position: 10
---

# Mesh UV Bake

**After reading this document** you can solve three problems that can't be fixed with shader values alone by baking data into the mesh.

MingToon uses three UV channels. All are **optional**, but each solves one specific problem.

| Channel | Solves | Without it |
|---|---|---|
| **UV8** | Outline breaks at sharp edges | Can only use `Normal Source` as `MeshNormal` |
| **UV7** | Face SDF needs runtime script | Face shading becomes unstable in script-free deployments like VRChat upload and Warudo mod |
| **UV4** | Height-based color gradient | Height-based character gradient doesn't work at all |

:::tip[Bake all at once during conversion for simplicity]
Check `Mesh Channels To Bake` in the **1 · Convert** step of `MingToon Manager` to automatically bake right after conversion. Since it runs after material conversion, the **face normal baker knows which submeshes are faces.** → [MingToon Manager](/workflow/character-manager#함께-구울-메쉬-채널)
:::

:::caution[Baked UVs for each renderer share one unified mesh asset]
Baking channels multiple times separately still stacks them in the same copy.
:::

---

## Outline Smooth Normal (UV8) {#아웃라인-스무스-노멀-uv8}

**What it does** — Averages normals of vertices at the same position and bakes to UV8. Hard edges that split normals merge into one, so lines don't separate when the hull expands.

UV8.w also stores a **line-width contrast value** — long faces get thick, vertices get thin.

### Procedure

1. Open the `Outline Smooth Normal UV8` group in **3 · Advanced** of `MingToon Manager`.
2. If any mesh already uses UV8, enable `Overwrite Existing UV8`.
3. Click `Bake Whole Character UV8`.
Complete message: `Outline smooth normal bake completed. Hull Normal Source already defaults to UV8TS, so no further changes needed.`

:::tip[Nothing to change on the material side]
`Normal Source` already defaults to **`UV8TS`**. Just bake and sharp corners won't break lines.
:::

:::danger[Rejects meshes without tangents]
If baking fails, configure the model importer to generate tangents, reimport, and try again.
:::

:::note[To use UV8.w]
Set `Pressure Source` to `OutlineNormalUV8` and the baked width-contrast value flows directly into line width. → [Outline](/guides/outline#선-굵기를-부위마다-다르게)
:::

---

## Face Front-View Normal (UV7) {#얼굴-프론트뷰-노멀-uv7}

**What it does** — **Projects the current scene's front view into TEXCOORD6 (Unity UV7)** of the duplicate mesh.

Baking this lets the shader handle 4-directional face SDF alone. **Runtime normal provider component is no longer needed**, so face shading stays stable in script-free VRChat uploads and Warudo mods.

### Procedure

1. `MingToon Manager` → **Look / Face** → `Prepare Face SDF UV (WARUDO / VRC)`.
2. `Open Front-View SDF TEXCOORD6 (Unity UV7) Baker`.
3. Position the scene-view camera to see the **face straight-on**. This moment is what gets baked.
4. Bake.

Completion log: `MingToon baked face lighting normal: N renderer(s), M face vertex(vertices). Original shape normal is preserved.`

**The original shape normal is untouched.** Only the lighting-normal goes into the separate channel.

### Undo

Click `Restore Source Mesh`. Message: `MingToon source meshes restored: N renderer(s).`

:::danger[Restore before moving or reimporting the original model]
If the recorded original mesh can't be found, you'll see a warning like this:

> `Could not find the original mesh recorded in '{mesh}', so renderer '{name}' bakes from the currently assigned mesh. In this state, 'Restore Source Mesh' cannot revert all the way to the original model.`

Proceeding this way breaks the restoration path.
:::

Restoration fails with `N renderer(s) have no recorded original mesh in the project and could not be restored.` You'll need to reimport the original model or manually assign the mesh.

---

## Character Height (UV4) {#캐릭터-높이-uv4}

**What it does** — Bakes the root-space height of the entire **character** into UV4.x on every mesh.

The key point: **Character level, not mesh level**. Even if top and bottom are separate meshes, they share one continuous height axis.

### Procedure (from MingToon Manager)

1. Open the `Character Height UV4` group in `MingToon Manager`.
2. Check the status:
   - `All character meshes are ready for UV4 height baking.` → Proceed
   - `UV4 is already occupied on one or more meshes.` → Decide on `Overwrite Existing UV4`
3. Click `Bake Whole Character UV4`.
4. Use `Apply to All Child MingToon Materials` to align height settings across materials.

### Procedure (from material inspector)

The same feature exists on the material side. In the `UV4 Height Bake` group, use `Bake UV4 For Selected Materials`.

It finds the character in the scene using the selected material. **Even if you select all materials and click, it only runs once per character**.

:::caution[Fails if the character isn't in the scene]
`Could not find any renderer using the selected material in the open scene(s).` → Open the scene or prefab containing the character and try again.
:::

→ [Character Height Gradient Usage](/guides/character#캐릭터-높이-그라데이션)

---

## Decide which channels to bake

| Situation | Channel needed |
|---|---|
| Outline breaks at sharp edges | **UV8** |
| Avatar for VRChat / Warudo with stable face | **UV7** |
| Want to darken the feet or add color to hem | **UV4** |
| None of the above apply | No need to bake |

MingToon works normally without baking. Each channel is **only needed when you use that feature**.
