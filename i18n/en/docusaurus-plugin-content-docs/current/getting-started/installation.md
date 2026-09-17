---
id: installation
title: Installation
sidebar_position: 1
---

# Installation

> When you finish this page, you have a Unity project with MingToon installed and no errors.
> It takes about 15 minutes.

## Before you start

- Unity Hub, a Unity version from the table below, and a backup of the project you will work on
- VRChat SDK3 (Avatars) if you target VRChat

## 1. Match the Unity version

| Target | Unity |
|---|---|
| VRChat PC | 2022.3.22f1 |
| Warudo | 2021.3.45f2 |
| General Unity | 2021.3 LTS |

Use 2022.3.22f1 if you target VRChat.
The MingToon VRChat build hook only compiles on 2022.3 or later.
A 2021.3 project has no upload optimization at all.
One project cannot cover both VRChat and Warudo, so split them.

![Unity Hub project list showing editor version 2022.3.22f1](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-01-unity-version.png | Unity Hub 프로젝트 목록에서 대상 프로젝트의 Editor Version 칸이 2022.3.22f1인 상태 | 1200x700 -->

## 2. Install the package

Choose VCC or BOOTH on the [official download page](https://studioraming.github.io/mingtoon-site/ko/download/).

To install with VCC:

1. Press **Add to VCC** on the download page.
2. Confirm the repository in VCC.
3. Open **Manage Project** for the target project.
4. Add MingToon and open Unity.

To install with the BOOTH installer:

1. Download the installer `.unitypackage` from the [BOOTH product](https://raming.booth.pm/items/8810209).
2. Import it in Unity with `Assets > Import Package > Custom Package`.
3. Stay connected to the internet and wait. The installer downloads the core automatically.

![The Project window after Unity imported the MingToon package and finished compiling](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-02-import-done.png | Project 창에 MingToon 패키지가 들어오고 진행 바가 사라진 직후 상태 | 1200x700 -->

If you installed with VCC, update in VCC as well.
The BOOTH installer tells you about new versions when you open Unity.

## 3. Check that the shader arrived

Select one material and open the shader list at the top of the Inspector.
You are fine if `StudioRaming/MingToon/MingToon BRP` is there.
The URP shader is not included in this BRP open beta.

![The Inspector shader dropdown showing the MingToon BRP entry](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-03-shader-list.png | 재질 Inspector의 Shader 드롭다운을 펼쳐 StudioRaming/MingToon/MingToon BRP가 보이는 상태 | 1200x700 -->

## 4. Check the VRChat integration

This applies only to VRChat targets. After the reload finishes, the Console must contain the line below.

```text
[MingToon] VRChat build hook compiled and registered.
```

![The Console window showing one MingToon build hook registration log line](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-04-hook-log.png | Console 창에서 [MingToon] VRChat build hook compiled and registered. 한 줄이 보이는 상태 | 1200x700 -->

:::danger[If this line is missing]
The VRChat build hook is not present.
Uploading will not run the automatic optimization.
:::

## 5. Validate the project

Run `StudioRaming > MingToon > Validate Project` from the menu.
If the build target cannot meet shader model 4.5, you get a `MING-ENV-BUILD-TARGET` error.
Continuing in that state makes materials render magenta (pink).
If the editor is 2021.3 and the VRC SDK is present, you get a `MING-VRC-UNITY-VERSION` warning.

![The result window after running Validate Project](/img/placeholder.png)
<!-- CAPTURE: getting-started/installation-05-validate.png | Validate Project를 실행해 결과 목록이 표시된 창 | 1200x700 -->

## Check that it worked

- The Console has no red errors.
- The shader list contains `StudioRaming/MingToon/MingToon BRP`.
- The build hook log is present if you target VRChat.
- `Validate Project` reports no errors.

If any of the four does not match, go to [Troubleshooting](/troubleshooting#install).

## If you upgraded from an earlier version {#이전-버전에서-올라왔다면}

The bake cache is rebuilt once.
There is nothing to delete by hand, but the next build or upload takes that much longer.
A VRChat avatar must be uploaded again for this version to apply.
The shader ships with the avatar. The conditions are in [VRChat](/platforms/vrchat).

## Optional: Post Processing Stack v2 {#선택-사항-post-processing-stack-v2}

MingToon works fully without PPv2. This is for scene checks and capture.

1. Install PPv2 **3.4.0**.
2. Add `UNITY_POST_PROCESSING_STACK_V2` manually to **Player Settings > Scripting Define Symbols**.
3. Wait until Unity finishes recompiling.
4. Run `StudioRaming > MingToon > Create or Repair BRP PPv2 Global Volume`.

If you skip step 2, the menu in step 4 does nothing.

## What to read next

[Getting Started with Manager](/getting-started/first-material) · [Supported Environments](/platforms/compatibility) · [Troubleshooting](/troubleshooting#install)
