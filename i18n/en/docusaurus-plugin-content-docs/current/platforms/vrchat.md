---
id: vrchat
title: VRChat
sidebar_position: 1
---

# VRChat

**After reading this guide,** you can upload MingToon to a VRChat PC avatar and verify automatic baking, depth effects, and Light Volumes behavior.

VRChat PC is MingToon's primary target.

:::caution[BRP core Open Beta]
VRChat PC requires manual verification. Before uploading, complete this page's checklist and MingToon Manager's readiness checks yourself. VRChat Quest does not run the MingToon shader directly. → [Supported Environments](/platforms/compatibility#vrchat-quest)
:::

## Unity Version

:::danger[Unity 2022.3.22f1]
This is the currently verified VRChat SDK project version. The VRChat build hook compiles only on the supported 2022.3 stream. Do not share a project with Warudo's Unity 2021.3.45f2 setup.
:::

## Upload Checklist

1. Reduce C# and shader errors in the Console to zero.
2. Run `Rediscover Child Renderers` in MingToon Manager.
3. Run `Readiness Check` and `VRChat Preflight Check`. → [MingToon Manager](/workflow/character-manager#내보내기--검증)
4. If you need Expressions content, verify the configuration authored by you or added by another tool on the final build clone.
5. Upload through VRChat SDK Builder. A manual bake is not required.
6. In game, check your own view, mirrors, and Photo Camera separately.

## Do Not Remove MingToon Components

:::danger[Removing Them Manually Loses Optimization Scope]
MingToon runtime components implement `IEditorOnly` for VRC SDK processing, but that marker alone does not guarantee automatic deletion. Manually deleting MingToon Manager from the authoring Scene removes its cached Renderer scope and can leave some materials unoptimized.

Keep the authoring Scene intact, then verify `RuntimeComponentCount = 0` on the actual build clone after SDK processing. This diagnostic counts authoring MingToon components under the build root; it does not count SDK or runtime components. If any remain, remove them explicitly from the clone before upload.
:::

Warudo uses the opposite policy and retains scripts. → [Warudo](/platforms/warudo)

## VRChat Upload Preparation {#expressions-메뉴}

MingToon Manager does not automatically install VRChat Expressions menus, parameters, or FX. Keep the Manager on the Avatar Root and check conversion, look, optimization, and upload-copy state. Verify Expressions content authored by you or added by other tools on the final build clone created by the VRChat SDK.

1. Under the Avatar Root, run `Rediscover Child Renderers` from `MingToon Manager`.
2. Run `Readiness Check` and `VRChat Preflight Check`, then resolve their errors. → [MingToon Manager](/workflow/character-manager#내보내기--검증)
3. Upload through VRChat SDK Builder. A manual bake is not required for the normal upload path.
4. After SDK processing, verify `RuntimeComponentCount = 0` on the actual build clone. This value counts authoring MingToon components; it is not a count of all SDK or runtime components.
5. After upload, check depth effects and lighting separately in your own view, mirrors, and Photo Camera.

If Expressions content or upload fails, start with the Console and readiness entries in [Troubleshooting](/troubleshooting).

### Quality Tiers and Runtime Switching {#품질-티어와-런타임-전환}

`High` preserves authored values. `Mid` caps the sample counts for 2D Rim, SSAO, and projected shadows. `Low` reduces sample counts further and disables the Depth Effects Master and projected-shadow feathering. Materials must opt in through MingToon Manager to use the quality menu; values that do not opt in are folded into constants during baking for the lowest cost.

- `Animate Depth Effects with FX Animator` — animates the master for all depth effects.
- `Switch Shadow Projection from FX Menu` — uses `Shadow Projection` in the Quality menu to disable only projected shadows. Off skips feathering, cast compositing, and related translucency calculations.

## What Upload Handles Automatically {#빌드-시-자동으로-처리되는-것}

The upload hook modifies only the copy created by the SDK, not original scene assets.

- Optimizes the authoring shader into a lightweight shader.
- Bakes face-normal pressing into UV7 of the upload Mesh, then restores the original Renderer and material.
- Keeps a Renderer on the Live path when Face SDF owns UV7 or a texture Face Area Mask is required, preserving the same result.
- Applies the project's texture-resolution caps by slot type to the upload copy.
- Preserves `Depth Availability = Auto`. Author-selected Force On and Force Off values are also preserved; when the main view needs depth, check the current `Include Depth Light on Upload` option state in Manager before using it.
- Automatically enables VRC Light Volumes variants for avatar upload.
- Marks MingToon runtime components as `IEditorOnly` for exporter processing. Verify separately that the final build clone contains zero of them.

Restoration and saving are isolated per changed Renderer and material. If one entry fails, the others are still restored, and unrelated dirty assets are not saved globally. → [Automatic Build Optimization](/workflow/build-optimization)

## Where Depth Effects Are Guaranteed {#깊이-효과가-어디까지-보장되나}

2D Rim Light, 2D Shadow, SSAO, 2D Translucency, and Inner Outline read the camera depth texture. In VRChat, Screen Camera depth is controlled by the world.

| Situation | Depth |
|---|---|
| **While Photo Camera is active** | Supported |
| **World enables Screen Camera depth** | Supported |
| **Default main player view** | Not guaranteed |
| **Mirror** | Intentionally blocked |

Even under `Force On`, depth modules are disabled for mirror cameras so they cannot read stale depth from the player camera and treat another silhouette as shadow.

World creators can request depth through the Screen Camera settings in the [official VRC Camera Settings documentation](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/). An avatar cannot change this setting.

### VRChat Depth Light {#vrchat-깊이-라이트}

When `Include Depth Light on Upload` is enabled, it adds one shadow-casting Directional Light to the upload copy to encourage a depth pass in the main view. Check its current option state in Manager before upload.

The light is carried as **Important (Render Mode = Important / ForcePixel)**. The Not Important optimisation introduced on 2026-09-05 passed Unity editor probes only. After reports of depth-shadow regressions in specific VRChat worlds, the 2026-09-04 configuration was restored on 2026-09-06. Important can incur a per-light shadow map and a pixel-light slot in addition to the camera depth pass. **Restoring this setting does not establish that the regressions are fixed; the affected worlds still require testing in the actual VRChat client.** The Everything culling mask, remaining light settings, and build-clone-only policy are retained.

:::danger[Cost and Limitations]

1. Adds an extra depth-pass cost to other users' cameras when they view the avatar.
2. Does not work in mirrors.
3. Avatar Safety may disable the light.
4. May affect the avatar performance rank and pixel-light count.
:::

It is safer to treat a depthless main view as the baseline and prepare fallbacks such as normal outlines, rim, form shadows, and Face SDF.

### Face Projected-Shadow Fallback

`Face Projected Shadow Without Depth` is a Face-material opt-in that keeps the face SDF/shadow-texture path on screens where depth modules are unavailable. It is off by default; enable it only on Face materials that truly need a main-view fallback.

## VRC Light Volumes {#vrc-light-volumes}

Built-in VRChat avatars can use indirect light, specular, point-light shadows, normal bias, and strength supplied by Light Volumes.

- Required variants are enabled automatically during avatar upload.
- Worlds without Light Volumes fall back to Unity light probes.
- Values in the Unity Editor are for testing. The world's volume data determines the final result.
- Do not expect the same VRC volume contract in URP or Warudo Built-in.

## Using Other Build Tools

The MingToon hook runs late so it can analyze the final state after tools such as Modular Avatar and VRCFury have processed materials and Animators. Recheck conflicts and omissions in the readiness check.

## Assume You Cannot Control Lighting

Lighting differs between worlds. Tune `Preserve Base Color`, final minimum and maximum brightness, scene-light color influence, and the rim's scene-light influence across real world conditions. In the current version, the additional-light cap is an absolute HDR peak rather than a base-color multiplier. → [Light and Shadow](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)

## VRChat + URP

Not supported. Use the Built-in build for VRChat.

## Notes

**Hardware** — Shader Model 4.5 is required. If unavailable, the material may appear magenta. → [Supported Environments](/platforms/compatibility#하드웨어-요구-사항-필수)

**Quest** — Does not run the MingToon shader directly. MingToon Manager's Quest check counts what a replacement loses, such as outlines, translucency, and depth effects.
