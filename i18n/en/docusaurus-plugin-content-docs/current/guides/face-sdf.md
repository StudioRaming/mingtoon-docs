---
id: face-sdf
title: Face SDF Authoring
sidebar_position: 13
---

# Face SDF Authoring

**After reading this document** you can create a face where shadows **glide smoothly** across as the light moves around it, like animation.

## The problem SDF solves

If you mute face normals to kill nose shadow ([Character Expression Step 2](/guides/character#2단계-코-그림자-없애기)), the face cleans up but becomes **completely flat**. As the light moves sideways, no shadow boundary forms.

SDF takes a different approach. **Predraw the order face shadows cover** in a texture, then the shader cuts through that texture by threshold based on light angle. That's how face shadows glide smoothly over the nose as light moves in animation.

<!-- SCREENSHOT: SDF shadow movement by light angle -->

---

## Distinguish two things

MingToon has **two** face-related bakes. Easy to mix up.

| | Face Front-View Normal (UV7) | Face SDF Texture |
|---|---|---|
| **What** | **Vertex data** baked into mesh | **Texture** you paint |
| **Where** | `MingToon Manager` → Look / Face | Face SDF Authoring window |
| **Role** | Shader learns the face's forward direction | Defines shadow coverage order |
| **Doc** | [Mesh UV Bake](/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7) | This doc |

:::tip[Use both usually]
UV7 makes 4-directional SDF work **without runtime script**. The SDF texture defines shadow shape. For avatars going to VRChat/Warudo, bake UV7 first, then make the SDF texture.
:::

---

## Layered Face SDF editing

The authoring window works by **drawing per-region then combining at the end**.

> Edit base shading, nose, cheek, lips, and eye socket separately. **Preview and final bake use one RGBA image.**

### Five layers

| Layer | Covers | Notes |
|---|---|---|
| **Base Shading** | Broad sweep of the whole face shadow | **Required** — bake rejects without it |
| **Nose Detail** | Nose ridge and nostril shadow | |
| **Cheek Detail** | Highlight and underside shading | **Draw right side only, left auto-mirrors** |
| **Lips** | Around the mouth | |
| **Eye Socket** | Eyelid shadow | **Draw right side only, left auto-mirrors** |

:::note[Mirror means "viewer's right"]
The window guides with:

> Position the viewer's right eye socket and the left will **auto-mirror around the face center**.

Half the work, guaranteed symmetry.
:::

### Per-layer adjustments {#레이어별-조정-항목}

| Item | Purpose |
|---|---|
| `Texture` | Image for this layer |
| `Scale` | Size |
| `Position` | Placement |
| `Invert` | Flip black and white |
| `Blur Amount` | Edge softness |
| `Timing Strength` | **How much this layer shifts forward/backward in shadow progression order** |

:::tip[`Timing Strength` is the core of SDF]
SDF carries **"when it covers"**, not **"how dark"**. Adjust timing to decide whether nose covers first, or cheeks, or eye sockets. Light-sweep order changes.

In animation looks, the typical order is **nose → cheeks → eye sockets → whole face**.
:::

---

## Workflow

1. **Load default layer set** — Start with the bundled layers.
2. Add the `Base Shading` texture. **Bake rejects without it** (`Base Shading texture is required.`).
3. Position the per-region layers and match `Scale` and `Position`.
4. Adjust `Timing Strength` to set coverage order.
5. **Live preview** to verify.
6. Set `Output Size` and bake.

### Live preview

`Refresh Live Preview Immediately` reflects the current state right now. While updating, it shows `Updating live preview...`

:::tip[Rotate the directional light in scene view]
A still frame can't tell if timing is right. Spin the direction light left and right and watch shadows glide smoothly. That's the only reason to use SDF.
:::

### Authoring profile

Save your current layer setup with `Create Layer Authoring Profile`. Reuse the same setup on other characters or edit again later.

---

## Output

| Item | Content |
|---|---|
| Final result | **One RGBA image** |
| Authoring path | `.../FaceSDF/Packed/MingFaceSDF_Author_{first 8 chars of GUID}` |
| Preview path | `.../FaceSDF/Preview/MingFaceSDF_Preview_{...}` |
| Material slot | `_FaceSdfMap` |

Authoring settings encode into `_FaceSdfAuthoringEncoding` and **save with the material**. Reopen the window later and your layer setup restores.

:::caution[Each material splits by GUID]
Duplicate a material and the SDF authoring copy splits with a new GUID too. To share the same SDF across characters, directly assign the texture to `_FaceSdfMap`.
:::

---

## Decide whether to use SDF

| Situation | Verdict |
|---|---|
| Fixed-light cinematics | **Not needed.** Normal mute + face boundary suffice |
| VRChat world-roaming avatar | **High impact.** Unpredictable lighting gains value |
| Warudo stream | **High impact.** When you vary lighting |
| No time to spare | You can skip. The rest of face processing cleans it up enough |

## Related docs

- [Character Expression — Face Shading](/guides/character)
- [Mesh UV Bake — Face Front-View Normal](/guides/mesh-bakes#얼굴-프론트뷰-노멀-uv7)
- [Light & Shadow — Grazing shadow on face](/guides/light-and-shadow#얼굴의-스치는-그림자)
