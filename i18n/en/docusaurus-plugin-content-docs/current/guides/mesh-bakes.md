---
id: mesh-bakes
title: Mesh UV Bakes
sidebar_position: 10
---

# Mesh UV Bakes

> This page is for people doing a **mesh UV bake** for the first time.
> It fixes outlines breaking at sharp corners. It takes about 5 minutes.

## What is this

A mesh has several coordinate slots used for applying color.

MingToon writes values the shader will read into three of those slots in advance.

Writing them is called baking. Once baked, the values cannot be changed.

## Which slot do I need

| Situation | Slot needed |
|---|---|
| The outline splits at hard edges | UV8 |
| You use the character height gradient | UV4 |
| The face SDF requires front-projection coordinates | UV7 |
| You only want to edit and check the face proxy | Do not bake |
| You want the face to be lighter for a VRChat upload | Do not bake. The upload handles it |

Most people only need to bake UV8.

:::danger[Do not overwrite a slot already in use]
Another shader or the model author may have put values in that slot.
The MingToon Manager's **UV Channel Occupancy** shows UV4, UV7 and UV8.
:::

## Turn it on in 30 seconds

1. Select the MingToon Manager.
2. Expand **Outline Smooth Normal UV8**.
3. Press **Bake UV8 On Its Own (standalone)**.

If the outline that used to break at sharp corners is now continuous, it worked.

If nothing changes, go to [bake troubleshooting](/troubleshooting#bake).

![The MingToon Manager's Outline Smooth Normal UV8 panel and standalone bake button](/img/placeholder.png)
<!-- CAPTURE: guides/mesh-bakes-01-uv8-panel.png | 밍툰 매니저 3단계의 아웃라인 스무스 노멀 UV8 패널 + 상태 표시 + 개별 베이크 버튼 | 1200x700 -->

## Values you will touch often

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Overwrite Existing UV8** | Whether a filled slot may be rewritten | Off | Turn it on to rebake; leave it off and the step fails on that mesh |
| **Compute For Edited-Normal Models** | Recomputes the outline direction from the faces | Leave at default (off) | Turn it on and the line follows the mesh; leave it off and it follows the transferred normals |
| **Outline Smooth Normals (UV8)** | Whether UV8 is baked along with conversion | On | Turn it off and the line splits at sharp corners |
| **Character Height Gradient (UV4)** | Whether UV4 is baked along with conversion | Off | Turn it off and the height gradient turns off with it |
| **Face Front-View Normals (UV7) - normally off** | Whether the face is pre-baked during conversion | Leave at default (off) | Turn it on and moving the proxy no longer changes the screen |
| **Overwrite Occupied UV Channels** | Whether conversion may overwrite existing slots | Off | Turn it on and reconversion passes, and whatever used that slot loses its values |

## Outline Smooth Normals (UV8) {#아웃라인-스무스-노멀-uv8}

It averages the directions of vertices sitting at the same position and writes them into UV8.

**Normal Source** already defaults to `UV8TS`, so you only have to bake.

The fourth value of UV8 also carries a value for line thickness contrast.

### Baking order

1. Open **Outline Smooth Normal UV8** in the MingToon Manager.
2. Check the targets and the existing UV8 in the status panel.
3. Turn on **Compute For Edited-Normal Models** if you need it.
4. Turn on **Overwrite Existing UV8** only if you have confirmed ownership.
5. Press **Bake UV8 On Its Own (standalone)**.

Set **Pressure Source** to `OutlineNormalUV8` and the thickness contrast is used as well.
→ [Choosing a pressure source](/guides/outline#압력-소스-고르기)

:::caution[Meshes without tangents are skipped]
Tangents are needed (mesh data used to compute normal map orientation; enable them in the model import settings).
Only the meshes without them drop out, and the other steps continue. Enable them and run it again.
:::

### Compute For Edited-Normal Models {#노멀을-편집한-모델용으로-계산}

Hair and skirts often have normals transferred from a sphere or cylinder.

Bake them as-is and the line follows the transferred sphere instead of the mesh.

Turn this on and the direction is recomputed from the mesh faces.

The shading is left alone and only the outline follows the mesh.

It defaults to off, so the lines on characters you already baked do not change.

## Face Front-View Normals (UV7) {#얼굴-프론트뷰-노멀-uv7}

The shader computes face proxy normals live while you edit.

Change the **Proxy Shape**, center, radius or axis and you see it immediately without baking.

The first item and default of **Proxy Shape** is `Plane`.

`Sphere (Experimental)`, `Cylinder (Experimental)` and `Capsule (Experimental)` are still experimental.

Try `Plane` first and only test the others when it is not enough.

### When you upload to VRChat

During upload MingToon processes face normals only on a temporary copy.

The original mesh and materials in the scene are left alone.

Renderers whose UV7 is already filled, or that use a face area mask, are skipped.

If moving the proxy does not change the screen, an old bake is still there.

Press **Release Baked Face Normals** in the MingToon Manager.

It stops consuming the stored values and reverts the face map coordinates, without touching the mesh.

## Character Height (UV4) {#캐릭터-높이-uv4}

It writes a height relative to the character root into the UV4 of every mesh.

Even when the top and bottom are separate meshes, they share one continuous axis.

1. Turn on **Character Height Gradient (UV4)** in the MingToon Manager.
2. Check the existing UV4 and the target renderers.
3. Turn on overwrite only if you have confirmed ownership.
4. Run the bake.

:::note[Without a UV4 bake the gradient turns off]
Leave it on over an unbaked UV4 and it looks enabled while doing nothing.
That is why clearing the checkbox turns the height gradient off as well.
:::

## Baking it all during conversion

You can pick this in advance under **Mesh Channels To Bake** in step 1 of the MingToon Manager.

The slots you check are baked automatically right after material conversion finishes.

Leave **Face Front-View Normals (UV7) - normally off** off, exactly as its name says.

If you are reconverting a character you already baked,
turn on **Overwrite Occupied UV Channels** so the step does not fail.

## More detail

- [MingToon Manager](/workflow/character-manager) — the bake entry points and status panel
- [Outline](/guides/outline) — normal source and pressure source
- [Character Rendering](/guides/character) — the face proxy and height gradient
