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
| **Base Tint** | A color laid over the Base Map. Tint Blend Mode decides how it combines and Tint Opacity decides how strongly, so at Opacity 0 changing this color does nothing. | `_Color` |
| **Alpha Cutoff** | Only has an effect when Surface Mode is Cutout. Pixels whose alpha is below this value are discarded. 0.3-0.6 works for hair and lashes; near 0 leaves ragged semi-transparent fringes. | `_Cutoff` |
| **Tint Blend Mode** | How Base Tint combines with the Base Map. The default Multiply keeps the map's shading and only recolors it; Normal replaces the map with a flat color. | `_ColorBlendMode` |
| **Tint Opacity** | How strongly Base Tint is applied. At 0 both the Base Tint color and its blend mode are ignored. | `_ColorBlendOpacity` |
| **Mask Channel** | Which channel of the adjust mask to read. Split channels when several masks share one packed texture. | `_MingBaseAdjustMaskChannel` |
| **Invert Mask** | Flips the adjust mask black-for-white so the HSVG adjustment applies to the opposite area. | `_MingBaseAdjustMaskInvert` |

## Surface Rendering

Configure surface type, culling, and alpha handling.

| Control | What it does | Shader property |
|---|---|---|
| **Enable Alpha Mask** | Drives transparency from a separate image instead of the Base Map alpha. While off, the mask image, channel and invert rows below do nothing, and an Opaque Surface Mode hides the result even when it is on. | `_AlphaMaskEnabled` |
| **Mask Image** | Grayscale image used as the alpha source. It is ignored while Enable Alpha Mask is off. | `_AlphaMask` |
| **Mask Channel** | Which channel of the mask image to read. Pick R/G/B/A when several masks are packed into one texture; Luma uses the RGB brightness. | `_AlphaMaskChannel` |
| **Invert Mask** | Flips the mask black-for-white. Use it when the mask was painted white where the surface should disappear. | `_AlphaMaskInvert` |
| **Soft Cutout** | Smooths the stair-stepped edge of a cutout using the screen's own anti-aliasing. It shows most on meshes that cut a lot away - hair cards, lace, eyelash planes. Only available while the Surface Mode is Cutout, and switched off automatically when you leave it. | `_MingAlphaToCoverage` |
| **Edge Sharpness** | How wide the softened band is. 1 is one screen pixel; raising it narrows the band and sharpens the edge, lowering it widens and blurs. Raise it if hair tips look washed out. | `_MingAlphaToCoverageSharpness` |
| **Color Mask** | Which color channels the outline pass writes. 15 is full RGBA; 0 means the outline is never written to the screen at all. | `_OutlineColorMask` |

## Alpha Fades

| Control | What it does | Shader property |
|---|---|---|
| **Enable Distance Fade** | Fades the surface out by how far it is from the camera. Use it to keep your own head or accessories out of your own view in first person, or to make something disappear with distance. Nothing changes the moment you switch it on - the shipped ranges hide nothing, so set the distances below. An Opaque Surface Mode hides the result. | `_MingAlphaDistanceFadeEnabled` |
| **Enable Fresnel Alpha** | Varies transparency with how squarely the surface faces the camera. Use it to make only the silhouette see-through, or the reverse. It reads the mesh's own facing rather than a normal map, so it follows the silhouette. An Opaque Surface Mode hides the result. | `_MingAlphaFresnelEnabled` |
| **Near - Fully Gone At** | Closer than this the surface is fully gone. Metres. 0 means the near fade is unused. | `_MingAlphaFadeNearStart` |
| **Near - Fully Visible At** | Farther than this the surface is fully there. The gap between the two near values is where it fades. Equal values give a hard switch at that distance. | `_MingAlphaFadeNearEnd` |
| **Far - Starts Fading At** | Past this distance the surface starts fading. Metres. At the top of the slider the far fade is unused. | `_MingAlphaFadeFarStart` |
| **Far - Fully Gone At** | Farther than this the surface is fully gone. Equal to the start distance gives a hard switch there. | `_MingAlphaFadeFarEnd` |
| **Opacity Facing Camera** | Opacity where the surface faces the camera head on. 1 leaves it as authored, 0 is fully transparent. | `_MingAlphaFresnelFacing` |
| **Opacity At Silhouette** | Opacity at the silhouette edge. Lower than the facing value makes the rim see-through; higher leaves only the rim. The two values decide the direction, which is why there is no mode to pick. | `_MingAlphaFresnelEdge` |
| **Edge Falloff** | How fast the value travels from facing to edge. Higher confines the edge value to very grazing angles and narrows the band; lower spreads it wide. | `_MingAlphaFresnelPower` |

## Avatar Interior Shield

Covers the inside and separate meshes behind it with a chosen colour after the camera actually crosses a closed surface. Camera distance alone does not trigger it.

| Control | What it does | Shader property |
|---|---|---|
| **Avatar Interior Shield** | Enables interior coverage. Off by default. | `_MingAvatarInteriorShieldEnabled` |
| **Quality** | Fast (0) uses 3 stages, Balanced (1) 4, and Robust (2) 5. More stages also add CPU and draw cost. | `_MingAvatarInteriorShieldQuality` |
| **Penetration Boundary Stability** | Adds a small inward margin to reduce flicker at the crossing boundary. It does not create a distance-based fade before penetration. | `_MingAvatarInteriorShieldStability` |
| **Colour** | Colour used to cover the interior; it is not limited to black. | `_MingAvatarInteriorShieldColor` |
| **Opacity** | Coverage strength. 1 is fully covered and 0 is no coverage. | `_MingAvatarInteriorShieldOpacity` |

Cross-mesh coverage in the Editor and WARUDO requires a `MingToonManager` on the same character root. VRChat keeps local surface coverage only, and Quest is unsupported.

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
| **Normal Strength** | How pronounced the normal map relief is. 0 renders flat even with a map assigned, 1 is the authored strength, above 1 exaggerates it. | `_BumpScale` |
| **Occlusion Map** | Grayscale map that darkens areas indirect light cannot reach. It does not touch direct light, so the effect is hard to see under strong front lighting. | `_OcclusionMap` |
| **Occlusion Strength** | How much of the occlusion map is applied. At 0 an assigned map changes nothing. | `_OcclusionStrength` |
