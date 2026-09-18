---
id: vrchat
title: VRChat
sidebar_position: 1
---

# VRChat

> This page is for people uploading a MingToon avatar to VRChat PC.
> It covers the upload order and how far depth effects are visible.

VRChat PC is MingToon's main target. Use Unity **2022.3.22f1**.

:::danger[A screen without depth is the default]
Depth rim light, depth shadow, SSAO and the inner outline read the camera depth texture.
In VRChat the world and the host decide that depth. An avatar cannot force it.
:::

Prepare the normal outline, Fresnel rim, form shadow and Face SDF as fallbacks.

## Upload checklist

1. Get the C# and shader errors in the Console to zero.
2. Run **Refresh Child Renderers** in the MingToon Manager.
3. Run `StudioRaming > MingToon > Validate Project` and resolve the errors.
4. Upload with the VRChat SDK Builder. No manual Bake is needed.
5. After SDK processing, confirm `RuntimeComponentCount = 0` on the build clone.
6. In game, check your own view, a mirror and the Photo Camera separately.

![The MingToon Manager's Get Started tab showing the 4. Build & upload automation section](/img/placeholder.png)
<!-- CAPTURE: platforms/vrchat-01-build-upload.png | 밍툰 매니저 「시작하기」 탭의 「4. 빌드 · 업로드 자동처리」 섹션 전체. 전체 공통 토글, 이 캐릭터 최적화 방식, 깊이 라이트 설정이 보이는 상태 | 1200x700 -->

→ [MingToon Manager](/workflow/character-manager#내보내기--검증)

## Do not delete MingToon components

:::caution[Automatic deletion is not guaranteed]
The VRC SDK treats MingToon runtime components as `IEditorOnly`. That marking does not guarantee deletion.
Delete the manager in your authoring scene by hand and the optimization scope disappears.
:::

`RuntimeComponentCount` only counts authoring MingToon components. If any remain on the build clone, remove them from the clone before uploading.

WARUDO uses the opposite rule and keeps scripts. → [Warudo](/platforms/warudo)

## Expressions menu {#expressions-메뉴}

The MingToon Manager does not install Expressions menus, parameters or FX for you. Check a layout you built yourself on the SDK Builder's final build clone.

If you need an in-game menu, use the paid add-on. → [Ming Light Controller](/guides/ming-light-controller)

### Quality tiers and runtime switching {#품질-티어와-런타임-전환}

A quality tier is a ceiling that does not overwrite authored values. The default is High.

| Tier | What it does |
|---|---|
| **High** | Uses the authored values as-is. No ceiling |
| **Mid** | Lowers the sample counts for depth rim, SSAO and projection feather |
| **Low** | Turns off all depth effects and the projection feather |

Materials you want on the menu need **Use VRC Runtime Controls** on. Materials without it are folded to High at bake and are the lightest.

- **Switch Depth Effects From FX** — animates the depth effects master.
- **Switch Shadow Projection From FX** — turns off only the projected shadow from the menu.

## What upload handles automatically {#빌드-시-자동으로-처리되는-것}

The upload hook does not touch the original scene assets. It only changes the copy the SDK made.

- It swaps the editing shader for a lightweight shader.
- It bakes face normals into UV7 of the upload Mesh, and restores the original when done.
- It applies the per-slot texture resolution limits set on the project to the copy.
- It leaves the **Depth Availability** value alone. Auto ships as Auto.
- It turns on the VRC Light Volumes variant automatically.

If one item fails, the rest are still restored. It does not globally save unrelated assets.

→ [Automatic Optimization On Build](/workflow/build-optimization)

## How far depth effects are guaranteed {#깊이-효과가-어디까지-보장되나}

| Situation | Depth |
|---|---|
| Photo Camera active | Supported |
| The world turned on Screen Camera depth | Supported |
| A regular player's screen, default state | Not guaranteed |
| Mirrors | Deliberately blocked |

A mirror camera reads the player camera's stale depth. Depth modules are turned off in mirrors so other people's silhouettes do not appear as shadows.

World authors can turn depth on with the Screen Camera setting in the [VRC Camera Settings documentation](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/).

### Choosing who can see it

By default it is visible only to you and your friends. Turn on **Show Depth Effects To Non-Friends** in the `Get Started` tab to make it visible to everyone. It increases the rendering load on the other person.

Turning depth effects off in game turns them off regardless of this setting.

### VRChat depth light {#vrchat-깊이-라이트}

An avatar using depth effects carries one Directional Light on the upload copy. That light, with shadows on, induces the camera's depth pass.

| Field | Current value |
|---|---|
| Render Mode | Not Important |
| Culling layers | StereoLeft(15) and MirrorReflection(18) |
| Scope | The build clone only. Scenes, prefabs and materials are untouched |

:::caution[The cost is paid by whoever is looking at you]
The depth pass runs once per camera, but that pass redraws every renderer in the world.
It does not work in mirrors, and Avatar Safety can turn the light off.
:::

Turn on **Remove depth light on build** under `4. Build & upload automation` in the `Get Started` tab to force it out. If the depth master is off, or all depth effects are off, it is dropped regardless of this toggle.

### Face projected shadow fallback

**Projected Shadow When Depth Off** on a Face material is off by default. Turn it on and the projected shadow remains on the face even on a screen without depth.

## VRC Light Volumes {#vrc-light-volumes}

Built-in VRChat avatars can use Light Volumes. Indirect light, specular and point light shadows come in.

- The required variant is turned on automatically during avatar upload.
- It also reads the legacy v2 buffer published by VRC Light Volumes 3 worlds. This is basic indirect and point-data compatibility.
- Native v3 shadows, clustering and per-light shading are not used yet.
- In worlds without Light Volumes it falls back to Unity light probes.
- **VRC Light Volumes (Test)** in the inspector is for checking in the editor.
- The world's volume data determines the final result.
- Known issue: VRC Light Volume cast-shadow appearance in v2 and v3 worlds still differs from 0.1.10.

## Using it with other build tools

MingToon's hooks run late. They analyze the final state after Modular Avatar or VRCFury has processed materials and Animators. After uploading, check the Console errors and the build clone again.

## Assume you cannot control the lighting

Lighting differs from world to world. Fit **Preserve Base Map Color**, **Minimum Final Brightness**, **Maximum Final Brightness** and **Scene Light Color Influence** to the range of worlds you actually visit.
→ [Light and Shadow](/guides/light-and-shadow#라이팅--어두운-씬에서-검게-뭉칠-때)

## Things to know

**Hardware** — shader model 4.5 is required. Fail that and materials show as magenta.
→ [Hardware requirements](/platforms/compatibility#하드웨어-요구-사항-필수)

**Quest** — it does not run MingToon shaders directly.
→ [VRChat Quest](/platforms/compatibility#vrchat-quest)

**URP** — VRChat does not use URP. Use a Built-in build.
