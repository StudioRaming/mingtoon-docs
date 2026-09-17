---
id: troubleshooting
title: Troubleshooting
sidebar_position: 90
---

# Troubleshooting

Look up your symptom as it is. Most of the time there is one cause. If a higher value is 0 or off, every value below it is ignored.

[Installation](#install) · [Conversion](#conversion) · [Shadows](#shadow) · [Depth effects](#depth) · [Outline](#outline) · [Face](#face) · [VRChat](#vrchat) · [WARUDO](#warudo) · [Performance](#performance) · [Bake and restore](#bake)

![The All Effects switch at the top of the inspector with a section master toggle below it](/img/placeholder.png)
<!-- CAPTURE: troubleshooting/troubleshooting-01-master-chain.png | 인스펙터 상단 전체 효과 스위치 + 한 섹션의 마스터 토글 + 그 안의 강도 슬라이더가 한 화면에 보이는 상태 | 1200x700 -->

## No value has any effect {#아무-값도-안-먹힌다}

Check in order from the top.

1. Turn on **All Effects**. While it is off, every section is disabled.
2. Turn on that section's master toggle. While it is off, `Quick Settings` appends `(Module Off)`.
3. Raise that feature's higher value from the table below.

| What is missing | The higher value to check first |
|---|---|
| Base tint | **Tint Blend Strength** |
| The whole surface is too transparent or too opaque | **Base Map Opacity** |
| Depth Rim Light · Depth Shadow | **Master Width**, then each module's intensity |
| PBR highlights and environment reflections | **Specular Intensity** |
| Extra texture layers | **Surface Stack Layer Count** |
| Normal map layers | **Normal Layer Count** |
| MatCap layers | **MatCap Layer Count** |
| The shadow boundary band | **Boundary Width**, then **Boundary Intensity** |
| Shadow pattern | **Pattern Intensity** |
| Face normal correction | **Proxy Normal Intensity** |
| Face area mask | **Mask Intensity**. At 0 the whole material counts as face |
| Channel settings of the PBR packed mask | **Use Packed Mask** |
| Cast shadow brightness and blending | **Receive Intensity** |
| Alpha mask | It is invisible even when on if the surface mode is **Opaque (2000)** |

## Installation {#install}

### Materials look pink (magenta)

| Cause | Action |
|---|---|
| Render pipeline mismatch | Swap to the matching backend shader |
| Below shader model 4.5 | Run `StudioRaming > MingToon > Validate Project`. PC only is supported |
| URP version out of range | Match Unity 2021.3 + URP 12.x |

:::danger[In this case no error message appears at all]
The whole SubShader drops out, so the log stays quiet. Pink is the only signal.
:::

### Validate Project flags the Unity version

| Code | When it appears | Meaning |
|---|---|---|
| `MING-ENV-UNITY-VERSION` (error) | The editor is neither 2021.3 nor 2022.3 | An unsupported stream |
| `MING-VRC-UNITY-VERSION` (warning) | The VRC SDK is present but it is not 2022.3 | This project has no avatar upload support |
| `MING-ENV-BUILD-TARGET` (error) | The build target cannot meet shader model 4.5 | Android, Quest, iOS, WebGL. Switch back to Windows |

2022.3.22f1 is a fully supported version, so nothing is flagged. → [Validate Project Codes](/reference/validator)

### I switched the render pipeline and every material broke

The switch dialog converts the project's MingToon materials to the matching backend in bulk. If you miss the dialog, you can run it again from the warning in the material inspector.

| Why the switch is blocked | Action |
|---|---|
| The material is contained in another asset | Extract it from the sub-asset |
| The material is inside a read-only package | Copy it outside the package |
| The material is read-only or not checked out | Clear read-only or check it out |

Materials in closed scenes and AssetBundles cannot be inspected. Open them separately and convert.

## Conversion {#conversion}

### The look differs from the source after conversion

Read the `lossy` and `unsupported` items in the conversion log first. Then compare mask channels and inversion, and texture Tiling and Offset. Also check that AO, surface mode, and the face material decision match the source. → [Reading the Conversion Report](/internals/conversion-internals)

### Conversion or baking fails

| Message | Action |
|---|---|
| No convertible material slots were found | Check where MingToon Manager sits, then **Refresh Child Renderers** |
| The MingToon source shader was not found | The installation is incomplete. Reimport the package |
| The generated shader could not be imported | Check write permission on the project folder and retry |
| The generated shader has a compile error | Check that the MingToon include folder is in its original path |
| Multiple MingToon Managers are selected | Select only one at a time |

## Shadows {#shadow}

### Only the overlapping areas are pure black

Turn on **Enable Unified Shadow** in the `Shadow Color` section. Form, cast, and depth shadows collapse into one color. → [Light and Shadow](/guides/light-and-shadow#통합-그림자--겹칠-때-새까매지는-문제)

It is normal for individual shadow colors to stop working after you turn it on. The values remain, so turning it off brings them back.

### Cast shadows are blotchy

| Location | Action |
|---|---|
| Cloth folds and the body in general | Turn on **Suppress Self Cast Shadow** and set **Self Shadow Caster Bias** between 0.01 and 0.03 |
| The boundary is stair-stepped | Turn on **Enable Projection Feather** and adjust **Projection Feather Radius** · **Projection Feather Intensity** |
| Shimmering overall | Check the light's shadow map resolution, bias, and cascades in that order |
| A character shape overlaps the body in backlight | Turn on **Suppress Backlit Silhouette** |

:::note[Feathering cannot bring back information that is not there]
Detail that was never in a low-resolution shadow map does not return when you soften it.
:::

### No shadow pattern is printed at all

| Cause | Action |
|---|---|
| **Use Shape Tile** is on but the tile slot is empty | An empty slot reads as white, and no density can cross white. Use a bundled tile |
| **Pattern Intensity** is 0 | Raise it |
| The target does not match | Check **Pattern Target** |
| Dots do not react to tone and stay the same size | You loaded a binarized dot picture. A tile must be a [threshold map](/guides/shadow-pattern#타일은-그림이-아니라-임계값-맵입니다) |

### The character crushes to black in a dark world

Raise **Preserve Base Map Color**, **Minimum Final Brightness**, **Indirect Light Lift**, and **Cast Indirect Lift** in that order. If it blows out to white in a bright world, lower **Maximum Final Brightness**.

## Depth effects {#depth}

### Depth Rim Light or Depth Shadow is not visible

| Cause | Action |
|---|---|
| **All Effects** or **Depth Effects** is off | The inspector shows a button to turn it on |
| **Master Width** is 0 | Raise it |
| Each module's intensity is 0 | Raise it |
| The surface mode is **Transparent (3000)** | Change it to **Semi-Transparent (2499)** |
| **Camera Depth Contribution** is off | Turn it on |
| The ordinary VRChat screen | An avatar cannot force it → [VRChat](/platforms/vrchat#깊이-효과가-어디까지-보장되나) |
| URP | Install the Renderer Feature and enable Depth Texture |
| WARUDO | Install the Depth Bridge → [Warudo](/platforms/warudo#warudo-depth-bridge) |

If the inspector says the depth texture is not ready, follow that guidance. If raising **SSAO Radius** does not widen it, you have hit the limit. The range is 0.001 to 0.05 m.

### Only the inner outline disappeared

**Enable Inner Depth Edge** is in the `Inner Outline` section. That section is inside the `Screen-space Effects` group.

| Cause | Action |
|---|---|
| **Apply to Inner Outline** is on and the vertex color is black | Turn the toggle off, or change **Pressure Source** |
| The surface mode is **Transparent (3000)** | Change it to **Semi-Transparent (2499)** |
| No camera depth | See the item above |

The normal outline is drawn without depth. If only the normal outline is visible, the problem is depth.

### Hair shows through the cheek

Change the surface mode to **Semi-Transparent (2499)**. This mode blends alpha while still writing depth.

**Transparent Depth Prepass** is for **Transparent (3000)** only. Turning it on in Semi-Transparent (2499) changes nothing.

## Outline {#outline}

### The whole normal outline disappeared

| Cause | Action |
|---|---|
| The vertex color is black and **Pressure Source** is VertexRed | Change the pressure source or check the vertex color |
| **Pressure Contrast** is 0 | Pressure is ignored completely. Raise it |
| **Color Mask** is 0 | Return it to 15 |
| **Outline Master** is off | Turn it on. The inner outline uses this gate too |

### The outline breaks at sharp corners

**Normal Source** is VertexColorTS or UV8TS on a mesh with no baked smoothed outline normals. Change it to MeshNormal. → [Outline Smooth Normals UV8](/guides/mesh-bakes#아웃라인-스무스-노멀-uv8)

### I cannot paint outline thickness in the Scene view {#씬-뷰에서-아웃라인-두께를-칠할-수-없다}

The inspector tells you the reason in a sentence. The action for each message is in [Painting directly in the Scene view](/guides/outline#씬-뷰에서-직접-칠하기).

### I painted and the result got worse

If **Pressure Source** is Vertex Red and **Normal Source** is VertexColorTS, they overwrite the same channel. Change the pressure source to Vertex Alpha, or move the outline normals to UV8.

If other objects changed too, several renderers share the same mesh asset. Duplicate the mesh, assign it to that renderer only, and paint again.

## Face {#face}

### I painted the face mask and it does not work

If **Mask Intensity** is 0, the mask is ignored and the whole material counts as face. Raise it above 0. The mask priority is texture, vertex paint, proxy, then whole material. → [Face shading](/guides/character#페이스-셰이딩)

### There is no shadow on the face at all

If **Depth Availability** is `Force Off`, Depth Shadow is never drawn. The automatic face correction removes projected shadows from the face. Turning on **Projected Shadow When Depth Off** on the Face material falls back to projected shadows when depth is absent.

## VRChat {#vrchat}

### I uploaded and optimization does not seem to have run

1. Check that the Unity version is 2022.3.22f1. The VRChat hook does not compile on 2021.3.
2. Check that the Console contains `[MingToon] VRChat build hook compiled and registered.`
3. Check that **Optimize On Build / Upload (Applies To Everything)** is on in the `Optimize` tab of MingToon Manager.
4. Open `StudioRaming/MingToonOptimizeReport.txt` next to the project folder.

→ [Checking that it ran](/workflow/build-optimization#제대로-걸렸는지-확인하기)

### I can see depth effects but others cannot

That is the default. Depth effects are visible only to you and your friends. Turning on **Show depth effects to non-friends** in the `Get Started` tab of Manager shows them to everyone. In exchange, the load on the other person grows.

Not appearing in mirrors is also intended. It stops a mirror from using someone else's silhouette as a shadow. → [How far depth effects are guaranteed](/platforms/vrchat#깊이-효과가-어디까지-보장되나)

## WARUDO {#warudo}

### Every depth effect is empty in WARUDO

The Depth Bridge is not installed. Check the Playground path, the `.cs` extension, and the `installed` log. → [WARUDO Depth Bridge](/platforms/warudo#warudo-depth-bridge)

If only the main screen is correct and the Spout or NDI output differs, check that camera's `depth enabled for camera=` log. No log means the camera was not processed.

## Performance {#performance}

### The inspector is heavy while I work {#작업-중-인스펙터가-무겁다}

That is normal. The authoring shader compiles and keeps every feature and the maximum layer count at once. Because of that, you do not wait for a compile each time you turn a feature on. Lightening is applied [only at build time](/workflow/build-optimization).

### People say my avatar is too heavy

Turning every depth effect off also drops the depth light from the build automatically. That is the lightest path. → [VRChat depth light](/platforms/vrchat#vrchat-깊이-라이트)

## Bake and restore {#bake}

### The restore button on a baked material is disabled

Check that the bake Manifest is still there. The GUID of the original authoring material must also be alive. Also check that the Renderer hierarchy and material slots are unchanged since the bake. → [Manual Bake and Restore](/workflow/bake-and-restore)

### A feature I turned on after baking does not work

Features that were off at bake time and were not found as preservation targets are removed from the code. Mark values you will turn on later from a script with **Keep Editable At Bake**.

## If this still does not solve it

Post the following in the bug report channel of the [official Discord server](https://discord.gg/Zsj6pkWKKs).

1. Unity version and target platform (VRChat PC / WARUDO / general Unity)
2. Render pipeline (BRP / URP 12.x)
3. MingToon version
4. The full Console log
5. Steps to reproduce
