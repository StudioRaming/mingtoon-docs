---
id: character
title: Character
sidebar_position: 6
---

# Character

Controls that treat the face and the whole character as their own thing. A face almost never survives the body settings - the nose and brow throw shadows that read as dirt.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

## Face / Hair Shading

Configure face masks and shade direction. The proxy volume and the SDF also work on hair.

| Control | What it does | Shader property |
|---|---|---|
| **Face Shading Module** | Enables the face-only shading module. Turn it on for face materials only - a body material shaded by face rules looks wrong. | `_FaceShadingEnabled` |
| **Enable Face Area Mask** | Marks which part of a combined head and body material is the face. While off, the channel, strength, invert and remap rows below are all ignored. | `_FaceAreaMaskEnabled` |
| **Vertex-Painted Face Area** | Off by default. Uses values stored by the face vertex-paint tool as the face area. An enabled texture face mask takes priority. | `_FaceAreaVertexMaskEnabled` |
| **Use Proxy Mesh Normals** | Transfers smooth normals from the actual proxy Mesh to face vertices. Off keeps the original mesh normals. An enabled face-area texture or vertex mask limits the transfer coverage; otherwise the proxy volume defines it. | `_FaceAreaProxyMaskEnabled` |
| **Face Border** | Form-shadow threshold used only on the face area. Range 0 to 1; default 0.25. Lower values delay face darkening, while higher values darken it earlier. Ignored while Form Shadow is off. | `_FaceFormShadowMidPoint` |
| **Face Softness** | Blur width of the form-shadow terminator on the face area. Ignored while Form Shadow is off. | `_FaceFormShadowSoftness` |
| **Proxy Center** | Object-space center of the actual sphere, cylinder or capsule proxy Mesh. Moving it on any axis can change the triangle hit by a face vertex and its interpolated normal. The Face Proxy Scene tool displays this same Mesh. | `_FaceProxyCenterOS` |
| **Proxy Radius** | Radius of the actual proxy Mesh. Changing it can alter both the projected hit position and the triangle-interpolated normal for each face vertex. When the proxy is also used as the face area, it changes the classification radius too, so an oversized value can include the neck or hands. | `_FaceProxyRadiusOS` |
| **Proxy Edge Softness** | How far the face area fades out across the selected proxy volume's edge, as a fraction of the radius. The face area swaps the form shadow's border and blur for the face values and presses the shading normal with the same coverage, so a small value leaves a hard shading band around the ears and jaw. The radius itself does not move; only the width of the crossing changes. | `_FaceProxyEdgeSoftness` |
| **Proxy Shape** | Sphere (0, default) is a closed sphere, Cylinder (1) a finite closed cylinder, and Capsule (2) a straight body capped by hemispheres. All three use the same projected-face and interpolated-vertex-normal transfer. | `_FaceProxyShape` |
| **Proxy Axis** | Length direction for Cylinder and Capsule. A zero vector automatically uses the face-up direction resolved by Manager/runtime. A non-zero value is an axis in renderer object space. | `_FaceProxyAxisOS` |
| **Proxy Length** | For Cylinder this is the full cylinder height. For Capsule it is the straight body length between the hemispheres, so total length is this value + 2 × Radius. It is unused for Sphere. Range 0.001 to 4; default 0.3. | `_FaceProxyHeightOS` |
| **Enable Face SDF Shadow** | Off by default. Produces directional SDF face form shadow. It adds texture sampling and shader work, so enable it only on face materials that need it. | `_FaceSdfEnabled` |
| **SDF Coordinates** | Base Texture UV (0) follows existing UV islands. Baked Front UV7 (1, default) uses a continuous front projection. When SDF owns UV7, baked face normals safely fall back to geometry normals. | `_FaceMapUvMode` |
| **Baked Face Normal State** | Hidden output managed by Manager. At 1 it uses UV7 baked normals; missing data or SDF ownership of UV7 falls back to geometry normals. Do not edit directly. | `_FaceNormalBaked` |
| **Remove Default Face Form Shadow** | At 1 the form shadow is erased on the face area entirely. Use it when the face shading should come only from the 2D shadow or a painted shadow map. | `_FaceFormShadowLift` |
| **Face Area Mask** | Defines the face area in base UV. White is face and black is not; it is not sampled while its toggle is off. The default white texture classifies the whole material as face. | `_FaceAreaMask` |
| **Face Casts Real-Time Shadows** | Whether this material's face area casts real-time shadows. Turning it off removes only the shadows the face itself casts onto other surfaces such as the neck or clothing. Bangs shadows are cast by the hair material, so this toggle does not remove them. Camera-depth writes are kept, so the 2D shadow and 2D Rim Light keep working. | `_FaceShadowCasterEnabled` |
| **Projected Shadow When Depth Off** | Face 2D Shadow Assist takes the projected shadow off the face so the 2D shadow can take it over. Turn this on and the projected shadow comes back to the face whenever the Depth Effects master is off or Depth Availability is Force Off. While depth is on, nothing changes. | `_FaceDepthOffProjectedShadowEnabled` |
| **Real ShadowCaster Offset** | Pushes the face area's shadow caster along its normal to adjust how much the real-time shadow overlaps the face itself. Applied only while Face 2D Shadow Assist is on. It does not move the bangs shadow - the hair material casts that. | `_FaceShadowCasterOffset` |
| **Mask Channel (RGBA)** | Per-channel weights used to read the mask texture. Enter (0, 1, 0, 0) to read the green channel only. | `_FaceAreaMaskChannel` |
| **Mask Intensity** | At 0 the mask texture is ignored and the whole material is treated as face; at 1 the mask is used exactly as painted. | `_FaceAreaMaskStrength` |
| **Invert Mask** | Flips the face area mask black-for-white. Use it when the mask was painted with the face in black. | `_FaceAreaMaskInvert` |
| **Remap Start** | Start of the range the mask gray values are re-spread over. Raising it shrinks the area counted as face. Equal start and end give a fully hard edge. | `_FaceAreaMaskRemapStart` |
| **Remap End** | End of the range the mask gray values are re-spread over. Lowering it sharpens the face boundary. Equal start and end give a fully hard edge. | `_FaceAreaMaskRemapEnd` |
| **Proxy Normal Intensity** | Blends once between the original mesh normal and the normal projected and interpolated from the proxy Mesh. 0 uses the original normal, 1 uses the transferred normal, and a soft face-area mask scales that blend. The editor preview and upload store this as the final baked weight, so changing it is reflected by rebuilding the preview or the next build. | `_FaceNormalFlattenAmount` |
| **Shadow Normal Map Influence** | How much stacked normal-map detail is mixed back into form-shadow boundaries where the custom face normal is active. At 0 the band follows the same proxy direction as the Scene needles; at 1 it uses the full stacked normal. Normal maps for specular and other effects remain unchanged. | `_FaceShadowNormalMapInfluence` |
| **Global Horizontal Scale** | Horizontal scale around the texture center. Range 0.1 to 4; default 0.5. It multiplies slot Tiling, so adjust one transform layer at a time. | `_FaceMapScaleX` |
| **Global Vertical Scale** | Vertical scale around the texture center. Range 0.1 to 4; default 0.5. It combines with slot Tiling and outside pixels do not repeat. | `_FaceMapScaleY` |
| **Global Horizontal Position** | Moves the scaled SDF horizontally. Range -1 to 1; default 0. Align the eye and nose centerline in small steps. | `_FaceMapOffsetX` |
| **Global Vertical Position** | Moves the scaled SDF vertically. Range -1 to 1; default 0. If it looks tiled, verify that texture Wrap Mode is Clamp. | `_FaceMapOffsetY` |
| **SDF Test Preview** | Off by default. Shows raw SDF as unlit grayscale to diagnose alignment and channels. Final baked shaders strip this diagnostic path. | `_FaceSdfTestMode` |
| **Test Preview Channel** | R=left, G=right, B=up and A=down. Maximum (4, default) shows the largest channel for a quick overall alignment check. | `_FaceSdfTestChannel` |
| **SDF Map Format** | Packed RGBA (0, default) stores left/right in R/G and up/down in B/A. Single Channel Mirrored U (1) reuses one R grayscale SDF with mirrored U and ignores vertical influence. | `_FaceSdfMode` |
| **Face SDF Map** | Boundary-order texture; default is gray. Packed reads RG left/right and BA up/down; single-channel reads R. Clamp and Bilinear are recommended. This adds a texture sample. | `_FaceSdfMap` |
| **Horizontal Influence** | Horizontal light response. Range 0 to 1; default 1. Zero removes horizontal response; one uses the map fully. | `_FaceSdfHorizontalStrength` |
| **Vertical Influence** | Vertical light response. Range 0 to 1; default 1. Applies only to Packed RGBA B/A and is ignored in single-channel grayscale mode. | `_FaceSdfVerticalStrength` |
| **SDF Shadow Amount** | Final SDF dark-region strength. Range 0 to 1; default 1. Zero hides it; one uses the computed result fully. | `_FaceSdfShadowAmount` |
| **Boundary Offset** | Moves when the shadow starts. Range -1 to 1; default 0. This is a lighting threshold, not map position, so tune in small steps. | `_FaceSdfThresholdOffset` |
| **Boundary Softness** | Lit-to-shadow transition width. Range 0.001 to 0.5; default 0.04. Extremely low values reveal texture-resolution and compression noise. | `_FaceSdfSoftness` |
| **Enable SDF Applicability Mask** | Off by default. Excludes ears, back of head, or other non-SDF areas with a base-UV mask. This is separate from the face-area mask. | `_FaceSdfMaskEnabled` |
| **SDF Applicability Mask** | Sampled in base UV. White receives SDF; black keeps original shading. It is not sampled while its toggle is off. | `_FaceSdfMask` |
| **SDF Mask Intensity** | Mask limiting strength. Range 0 to 1; default 1. Zero ignores the mask; one uses its painted values fully. | `_FaceSdfMaskStrength` |

## Character Height Gradient

Grade the lower character color from one root-space height baked into UV4.

| Control | What it does | Shader property |
|---|---|---|
| **Character Height Gradient** | Enables the gradient that tints the character differently by height - typically sinking the feet into a slightly darker tone. Accurate placement needs the UV4 height bake. | `_CharacterHeightGradientEnabled` |
| **Low Color** | Color tinting the lower part of the character. White leaves it unchanged; use a slightly darker color to sink the feet. | `_CharacterHeightLowColor` |
| **High Color** | Color tinting the upper part of the character. White leaves it unchanged. | `_CharacterHeightHighColor` |
| **Low Color** |  | |
| **High Color** |  | |
| **Gradient Direction** | Switching to top-down swaps where the two colors land. | |
| **Boundary Height** | The height where the two colors mix evenly. | |
| **Boundary Softness** | How wide the transition spreads around the boundary. 0 is a hard edge. | |
| **Curve Exponent** |  | |
| **Influence** |  | |
| **Requires whole-character root-space height in UV4.x.** |  | |
