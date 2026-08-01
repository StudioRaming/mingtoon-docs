---
id: face
title: Face
sidebar_position: 6
---

# Face

A face almost never survives the body settings: the nose and brow throw shadows that read as dirt. These controls exist to treat the face separately.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

## Face Shading

Configure face-specific masks and shade direction.

| Control | What it does | Shader property |
|---|---|---|
| **Remove Default Face Form Shadow** | At 1 the form shadow is erased on the face area entirely. Use it when the face shading should come only from the 2D shadow or a painted shadow map. | `_FaceFormShadowLift` |
| **Face Border** | Form-shadow threshold used only on the face area. Pushing it lower, toward -1, makes the face darken later and stay illustration-clean. Ignored while Form Shadow is off. | `_FaceFormShadowMidPoint` |
| **Face Softness** | Blur width of the form-shadow terminator on the face area. Ignored while Form Shadow is off. | `_FaceFormShadowSoftness` |
| **Use Proxy Sphere As Face Area** | Treats everything inside the proxy sphere as face, with no mask texture. The mask wins when Enable Face Area Mask is on, so this option is ignored then. | `_FaceAreaProxyMaskEnabled` |
| **Enable Face Area Mask** | Marks which part of a combined head and body material is the face. While off, the channel, strength, invert and remap rows below are all ignored. | `_FaceAreaMaskEnabled` |
| **Proxy Sphere Center** | Center of the virtual sphere that stands in for the head. The Face Proxy scene tool is the accurate way to place it. Unused while Normal Press Amount is 0. | `_FaceProxyCenterOS` |
| **Proxy Sphere Radius** | Radius of the virtual sphere. When the proxy sphere is used instead of a face mask, everything inside it counts as face, so an oversized radius classifies the neck and hands as face too. | `_FaceProxyRadiusOS` |
| **Mask Channel (RGBA)** | Per-channel weights used to read the mask texture. Enter (0, 1, 0, 0) to read the green channel only. | `_FaceAreaMaskChannel` |
| **Mask Strength** | At 0 the mask texture is ignored and the whole material is treated as face; at 1 the mask is used exactly as painted. | `_FaceAreaMaskStrength` |
| **Invert Mask** | Flips the face area mask black-for-white. Use it when the mask was painted with the face in black. | `_FaceAreaMaskInvert` |
| **Remap Start** | Start of the range the mask gray values are re-spread over. Raising it shrinks the area counted as face. Equal start and end give a fully hard edge. | `_FaceAreaMaskRemapStart` |
| **Remap End** | End of the range the mask gray values are re-spread over. Lowering it sharpens the face boundary. Equal start and end give a fully hard edge. | `_FaceAreaMaskRemapEnd` |
| **Face Casts Real-Time Shadows** | Whether the face mesh casts real-time shadows. Turning it off stops bangs from casting a real shadow on the face, which is what you want when the forehead shadow should come only from the 2D shadow. | `_FaceShadowCasterEnabled` |
| **Real ShadowCaster Offset** | Pushes the face's shadow caster forward or back to fine-tune where the bangs shadow lands. Ignored while Face Casts Real-Time Shadows is off. | `_FaceShadowCasterOffset` |
| **Normal Method** | 0 presses the face normal flat toward the forward direction, erasing the nose shadow; 1 follows the proxy sphere for a gentle curve. It has no effect while Normal Press Amount is 0. | `_FaceNormalMode` |
| **Normal Press Amount** | How strongly the face normal override is applied. At 0 the Normal Method, proxy sphere center and proxy sphere radius are all ignored and the raw mesh normal is used. | `_FaceNormalFlattenAmount` |
