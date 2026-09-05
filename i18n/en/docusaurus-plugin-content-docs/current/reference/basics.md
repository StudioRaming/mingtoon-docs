---
id: basics
title: Basic
sidebar_position: 1
---

# Basic

Base colour, surface mode and the everyday maps - the first things you touch on a new material.

:::note
The names and explanations on this page are pulled straight from what the MingToon inspector displays, so they always match the tool.
:::

## Base Surface

Configure the base texture, color, and UV transform.

| Control | What it does | Shader property |
|---|---|---|
| **Base Map** | The main color texture. Its alpha channel is only used when Surface Mode is Cutout or Transparent. | `_MainTex` |
| **Base Tint** | A color laid over the Base Map. Tint Blend Mode decides how it combines; Base Map Opacity independently controls the final surface alpha. | `_Color` |
| **Tint Blend Mode** | How Base Tint combines with the Base Map. The default Multiply keeps the map's shading and only recolors it; Normal replaces the map with a flat color. | `_ColorBlendMode` |
| **Alpha Cutoff** | Only has an effect when Surface Mode is Cutout. Pixels whose alpha is below this value are discarded. 0.3-0.6 works for hair and lashes; near 0 leaves ragged semi-transparent fringes. | `_Cutoff` |
| **Tint Blend Strength** | Advanced compatibility setting. It affects only the selected Base Tint/Map blend result; it does not control final surface alpha. | `_ColorBlendOpacity` |

## Surface Rendering

Configure surface type, culling, and alpha handling.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Alpha Mask** | Combines a separate image with the Base Map alpha using the selected blend mode. While off, all mask settings below are ignored, and an Opaque Surface Mode hides the result even when it is on. | `_AlphaMaskEnabled` |
| **Mask Image** | Grayscale image used as the alpha source. It is ignored while Enable Alpha Mask is off. | `_AlphaMask` |
| **Alpha Blend Mode** | How the mask combines with the Base alpha. Multiply is MingToon's legacy default; Replace, Add, and Subtract support lilToon-compatible alpha results. | `_AlphaMaskBlendMode` |
| **Mask Value Scale** | Multiplies the mask after channel, invert, remap, feather, and gradient processing. The default 1 preserves the existing look. | `_AlphaMaskScale` |
| **Mask Value Offset** | Added after Mask Value Scale. The final mask is clamped to 0-1; the default 0 preserves the existing look. | `_AlphaMaskOffset` |
| **Alpha Mask Strength** | How strongly the mask changes final transparency. 0 preserves the Base Map alpha; 1 applies the mask fully with the selected blend mode. | `_AlphaMaskStrength` |
| **Color Mask** | Which color channels the outline pass writes. 15 is full RGBA; 0 means the outline is never written to the screen at all. | `_OutlineColorMask` |
| **Mask Channel** | Which channel of the mask image to read. Pick R/G/B/A when several masks are packed into one texture; Luma uses the RGB brightness. | `_AlphaMaskChannel` |
| **Invert Mask** | Flips the mask black-for-white. Use it when the mask was painted white where the surface should disappear. | `_AlphaMaskInvert` |

## Alpha Fades

| Control | What it does | Shader property |
|---|---|---|
| **Alpha & Cutout Effects** | Enables or bypasses alpha mask, cutoff, soft cutout, distance, Fresnel, and directional alpha transforms as one group. Off uses identity for these transforms only; Surface Mode and Render Queue are unchanged. | `_SurfaceAlphaEffectsEnabled` |
| **Enable Distance Fade** | Fades the surface out by how far it is from the camera. Use it to keep your own head or accessories out of your own view in first person, or to make something disappear with distance. Nothing changes the moment you switch it on - the shipped ranges hide nothing, so set the distances below. An Opaque Surface Mode hides the result. | `_AlphaDistanceFadeEnabled` |
| **Enable Fresnel Alpha** | Varies transparency with how squarely the surface faces the camera. Use it to make only the silhouette see-through, or the reverse. It reads the mesh's own facing rather than a normal map, so it follows the silhouette. An Opaque Surface Mode hides the result. | `_AlphaFresnelEnabled` |
| **Near - Fully Gone At** | Closer than this the surface is fully gone. Metres. 0 means the near fade is unused. | `_AlphaFadeNearStart` |
| **Near - Fully Visible At** | Farther than this the surface is fully there. The gap between the two near values is where it fades. Equal values give a hard switch at that distance. | `_AlphaFadeNearEnd` |
| **Far - Starts Fading At** | Past this distance the surface starts fading. Metres. At the top of the slider the far fade is unused. | `_AlphaFadeFarStart` |
| **Far - Fully Gone At** | Farther than this the surface is fully gone. Equal to the start distance gives a hard switch there. | `_AlphaFadeFarEnd` |
| **Opacity Facing Camera** | Opacity where the surface faces the camera head on. 1 leaves it as authored, 0 is fully transparent. | `_AlphaFresnelFacing` |
| **Opacity At Silhouette** | Opacity at the silhouette edge. Lower than the facing value makes the rim see-through; higher leaves only the rim. The two values decide the direction, which is why there is no mode to pick. | `_AlphaFresnelEdge` |
| **Edge Falloff** | How fast the value travels from facing to edge. Higher confines the edge value to very grazing angles and narrows the band; lower spreads it wide. | `_AlphaFresnelPower` |
| **Enable Directional View Alpha** | Adjusts surface opacity from the camera direction in the mesh-local axes or Face Provider frame. Set front, back, side, and vertical values in the details below. | `_AlphaDirectionalEnabled` |
| **Front Opacity** | Opacity when viewed from the selected frame's front. 1 keeps the surface opaque; 0 makes it fully transparent. | `_AlphaDirectionalFront` |
| **Back Opacity** | Opacity when viewed from the selected frame's back. | `_AlphaDirectionalBack` |
| **Left Opacity** | Opacity when viewed from the selected frame's left. | `_AlphaDirectionalLeft` |
| **Right Opacity** | Opacity when viewed from the selected frame's right. | `_AlphaDirectionalRight` |
| **Up Opacity** | Opacity when viewed from the selected frame's up direction. | `_AlphaDirectionalUp` |
| **Down Opacity** | Opacity when viewed from the selected frame's down direction. | `_AlphaDirectionalDown` |
| **Directional Transition Softness** | Width used to blend the six direction endpoints. Raise it for a softer transition; lower it for a sharper boundary. | `_AlphaDirectionalSoftness` |
| **Direction Frame** | Object uses the mesh-local axes. Face Provider uses the face frame supplied by MLC and safely falls back to Object when it is unavailable. | `_AlphaDirectionalFrame` |
| **Up Axis (Local)** | Local axis treated as up in the Object frame. The shader orthogonalizes it against the front axis automatically. | `_AlphaDirectionalUpOS` |
| **View Region Mask Strength** | How strongly the four-region mask affects directional alpha. 0 ignores the mask; 1 applies its resolved region result fully. | `_AlphaViewMaskStrength` |
| **View Region Mask Weights** | Weights for the four channels of the shared Region Mask. X/Y/Z/W control regions one through four. | `_AlphaViewMaskRegions` |
| **Invert View Region Mask** | Inverts the resolved region result. Use it when you want to keep masked-out areas and limit masked-in areas. | `_AlphaViewMaskInvert` |

## section.base_adjust

| Control | What it does | Shader property |
|---|---|---|
| **Base Map Opacity** | Multiplies the Base Map alpha at the final surface step. It controls overall surface opacity independently from Tint Blend Strength. | `_BaseMapOpacity` |
| **Soft Cutout** | Smooths the stair-stepped edge of a cutout using the screen's own anti-aliasing. It shows most on meshes that cut a lot away - hair cards, lace, eyelash planes. Only available while the Surface Mode is Cutout, and switched off automatically when you leave it. | `_AlphaToCoverage` |
| **Edge Sharpness** | How wide the softened band is. 1 is one screen pixel; raising it narrows the band and sharpens the edge, lowering it widens and blurs. Raise it if hair tips look washed out. | `_AlphaToCoverageSharpness` |
| **Hue Rotation Space** | Which space the Hue (H) of the HSVG above rotates in. OKLab turns the hue while holding lightness and chroma steady, so moving a skin or hair colour stays predictable. HSV is the legacy behaviour; a material already dialled in under HSV keeps its colour by staying there. | `_BaseHueColorSpace` |
| **Gradation LUT** | Re-maps the Base Map's colours through per-channel R/G/B ramps. Off reads no ramp texture at all. | `_BaseGradationEnabled` |
| **Gradation LUT** | A horizontal ramp texture. Each channel's source level is the horizontal coordinate the new colour is read from. Import it as sRGB. | `_BaseGradationTex` |
| **Gradation Strength** | How far the ramp result is mixed over the source colour. At 0 the result matches the source even with a ramp assigned. | `_BaseGradationStrength` |
| **Mask Channel** | Which channel of the adjust mask to read. Split channels when several masks share one packed texture. | `_BaseAdjustMaskChannel` |
| **Invert Mask** | Flips the adjust mask black-for-white so the HSVG adjustment applies to the opposite area. | `_BaseAdjustMaskInvert` |
| **Camera Depth Cutoff** | Where the transparent surface's silhouette in the camera depth texture is cut. The 2D shadow, depth rim and inner edge all read that silhouette, so a low value lets barely-visible pixels cast shadow while a high one drops parts you can actually see out of depth. Separate from Alpha Cutoff, which cuts the visible alpha. | `_TransparentDepthPrepassCutoff` |

## View Clip Guard

Stop a camera pressed up close from cutting the surface open and showing the inside of the head.

| Control | What it does | Shader property |
|---|---|---|
| **View Clip Guard** | Pushes back any surface about to be cut away when a camera comes very close, so the inside of the head cannot be seen through the gap. Turn it on when selfies or close mirrors punch a hole in the face. Off by default, and a material that leaves it off carries no cost after optimization. | `_MingViewClipGuardEnabled` |
| **Clearance** | How far in front of the cut-off boundary, in metres, the surface starts being pushed. Raising it guards with more margin, at the cost of the surface flattening a little sooner. | `_MingViewClipGuardClearance` |
| **Push Limit** | The furthest a single vertex may travel. It is the ceiling that stops the mesh being dragged out when a camera ends up inside the head; lowering it deforms less but stops covering the deepest intrusions. | `_MingViewClipGuardLimit` |
| **Front Facing Only** | Decides whether only surfaces squarely facing the camera are pushed, or ones turned aside and away as well. Higher values move only what faces the camera. Set it too low and interior surfaces such as eyes or the inside of the mouth are pushed too, land level with the outer skin and flicker against it - leaving the outer shell alone to move is the safe setting. | `_MingViewClipGuardFacing` |

## Stencil Settings

Configure stencil state separately for the general and Normal Outline passes.

| Control | What it does | Shader property |
|---|---|---|
| **Reference** | Reference value (0-255) the general pass compares against and writes into the stencil buffer. Change it only when building stencil setups such as eyebrows showing through hair; otherwise leave it at 0. | `_StencilRef` |
| **Read Mask** | Bit mask applied when comparing the stencil. Change it only when several effects partition the stencil bits. | `_StencilReadMask` |
| **Write Mask** | Bit mask applied when writing to the stencil. Change it only when several effects partition the stencil bits. | `_StencilWriteMask` |
| **Compare** | Stencil comparison function. Always draws without any stencil test. Change it only when this material must react to values another material wrote. | `_StencilComp` |
| **Pass** | Stencil operation when both stencil and depth tests pass. Use Replace to leave a mark for other materials to test against. | `_StencilPass` |
| **Fail** | Stencil operation when the stencil test fails. Usually left at Keep. | `_StencilFail` |
| **Z Fail** | Stencil operation when the stencil test passes but the depth test fails. Usually left at Keep. | `_StencilZFail` |

## Common Maps

Quickly configure frequently used normal, emission, occlusion, PBR, and MatCap maps.

| Control | What it does | Shader property |
|---|---|---|
| **Normal Map** | Normal map that fakes surface relief. This is normal layer 01; it has no effect while the Normal module is off. | `_BumpMap` |
| **Normal Intensity** | How pronounced the normal map relief is. 0 renders flat even with a map assigned, 1 is the authored strength, above 1 exaggerates it. | `_BumpScale` |
| **Occlusion Map** | Grayscale map that darkens areas indirect light cannot reach. It does not touch direct light, so the effect is hard to see under strong front lighting. | `_OcclusionMap` |
| **Occlusion Intensity** | How much of the occlusion map is applied. At 0 an assigned map changes nothing. | `_OcclusionStrength` |
