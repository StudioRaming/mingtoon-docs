---
id: vrchat
title: VRChat
sidebar_position: 1
---

# VRChat

**After reading this guide,** you can upload MingToon to a VRChat PC avatar and verify 0.1.7 automatic baking, Expressions menus, depth effects, and Light Volumes behavior.

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
4. If using the Expressions menu, verify `MingToon Controls` in Gesture Manager.
5. Upload through VRChat SDK Builder. A manual bake is not required.
6. In game, check your own view, mirrors, and Photo Camera separately.

## Do Not Remove MingToon Components

:::danger[Removing Them Manually Loses Optimization Scope]
MingToon runtime components implement `IEditorOnly` for VRC SDK processing, but that marker alone does not guarantee automatic deletion. Manually deleting MingToon Manager from the authoring Scene removes its cached Renderer scope and can leave some materials unoptimized.

Keep the authoring Scene intact, then verify `RuntimeComponentCount = 0` on the actual build clone after SDK processing. If any remain, remove them explicitly from the clone before upload.
:::

Warudo uses the opposite policy and retains scripts. → [Warudo](/platforms/warudo)

## Expressions Menu {#expressions-메뉴}

MingToon Manager can install menus, parameters, and FX non-destructively into the build clone through Modular Avatar. A direct-merge path is also available when Modular Avatar is absent. This is an Avatar SDK/upload feature; world/Udon installation is not provided.

Choose one of two profiles before upload with the Manager's `Use Full Control Menu` option. It is enabled by default.

| Profile | Retained features | Additional features | Synchronization cost |
|---|---|---|---:|
| Full (default) | Core Virtual Light · High/Mid/Low · Shadow Projection · Reset | Palette · Master Adjust · Photo Looks | 21 · 77 bits |
| Lightweight | Core Virtual Light · High/Mid/Low · Shadow Projection · Reset | None | 10 · 31 bits |

Full contains 28 total controls: 21 synchronized parameters and seven local commands.
Lightweight contains 12: 10 synchronized parameters and two local commands. Local
commands use 0 bits. Full synchronization is Bool 13 + Int 2 + Float 6; Lightweight is
Bool 7 + Float 3. Before installation, MingToon checks existing parameter types, the
256-bit budget, and the eight-control-per-menu limit, and rolls back on failure.

Shared menus:

- **Virtual Light** — Enabled, Direction, Intensity, Follow Character, and
  Auto/Replace/Add Mode
- **Quality** — explicit High / Mid / Low buttons plus an independent
  `Shadow Projection` toggle
- **Reset All** — restores the selected profile's 12 or 28 values to their installed
  defaults, not a pre-install authored snapshot

Added only in Full:

- **Palette** — eight colors, Warm / Gold / Mint / Cyan / Blue / Violet / Rose / Red, ×
  four saturation levels, Neutral / Soft / Medium / Full. All 32 combinations are
  compressed into one Int.
- **Master Adjust** — Highlight / Shadow / Final Output each have independent Intensity
  and Tint Off / Low / Mid / Full controls. They share the palette, but each group
  controls its color influence and intensity separately.
- **Photo Looks** — Neutral, Dark World Rescue, Flat Studio, Unlit Reference,
  Warm Portrait, Cool Portrait, No Emission, and No Backlight

With `Place Directly In Expressions Root` off, both profiles spend one root slot on the
`MingToon Controls` folder. Full has eight folder controls; Lightweight has seven. With
root placement on, Full places `Virtual Light`, `Master Adjust`, and `Reset All` at the
root, while Lightweight places `Virtual Light`, `Quality`, and `Reset All`. Both need
three free slots and fall back to folder placement when they do not fit. Switching the
profile and reinstalling removes stale MingToon parameters, FX layers, and generated
menus.

In Full mode, Photo Looks synchronizes the selected user's own avatar, including its
brightness range, light-color influence, Unlit blend, emission, backlight, and color
temperature. Other users see the result applied to that avatar. One user's local menu
cannot control every other avatar in view; that requires world/Udon authority and is
excluded from this avatar feature.

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
- Preserves `Depth Availability = Auto`. Author-selected Force On and Force Off values are also preserved; use the separate `Include Depth Light on Upload` opt-in when the main view needs depth.
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

### VRChat Depth Light (Off by Default) {#vrchat-깊이-라이트}

`Include Depth Light on Upload` is an opt-in workaround that adds one shadow-casting Directional Light to the upload copy to encourage a depth pass in the main view.

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

Lighting differs between worlds. Tune `Preserve Base Color`, final minimum and maximum brightness, scene-light color influence, and the rim's scene-light influence across real world conditions. In 0.1.7, the additional-light cap is an absolute HDR peak rather than a base-color multiplier. → [Light and Shadow](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)

## VRChat + URP

Not supported. Use the Built-in build for VRChat.

## Notes

**Hardware** — Shader Model 4.5 is required. If unavailable, the material may appear magenta. → [Supported Environments](/platforms/compatibility#하드웨어-요구-사항-필수)

**Quest** — Does not run the MingToon shader directly. MingToon Manager's Quest check counts what a replacement loses, such as outlines, translucency, and depth effects.
