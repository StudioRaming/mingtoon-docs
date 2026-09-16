---
id: installation
title: Installation
sidebar_position: 1
---

:::note[Join the Open Beta]
[Join the Open Beta](https://studioraming.github.io/mingtoon-site/en/download/)
:::


Every commercial license includes the URP version. MLC is included in the Early Access Founders Editions of Personal Streaming and Personal Creator; contents may change after full release. Commercial use remains prohibited during Open Beta. See [licenses and included add-ons](/legal/beta-license).

# Installation

MingToon 0.1.10 Open Beta core targets BRP. URP is excluded from this BRP Open Beta and included with every commercial license.

**After this guide**, you will have a Unity project with MingToon imported without errors.

## 1. Match Unity version first

:::danger[Target determines which Unity version]
| Target | Unity | Rationale |
|---|---|---|
| **VRChat PC** (primary target) | **2022.3.22f1** | Current VRChat SDK baseline |
| **Warudo** | **2021.3.45f2** | Warudo Mod SDK 0.14.3.10 baseline |
| General Unity | 2021.3 LTS | |

**Use 2022.3.22f1 if targeting VRChat.** MingToon's VRChat build hook and VRChat runtime compile only under `UNITY_2022_3_OR_NEWER`. On 2021.3, this code **does not exist at all**, so automatic optimization and VRChat-specific upload processing—including the separate Upload Depth Light opt-in—do not run.
:::

You cannot target both VRChat and Warudo with one project. Split projects by target.

## 2. Choose an installation method

Choose VCC or BOOTH on the [official download page](https://studioraming.github.io/mingtoon-site/en/download/). Prepare VRChat SDK3 (Avatars) first for a VRChat project.

:::caution[Migrating from the older Assets installation]
Back up your project and exit Play mode. Move any materials, textures or presets you saved inside `Assets/StudioRaming/MingToon` to another folder, then **delete only the old MingToon folder** before installing the new package. Do not delete all of `Assets/StudioRaming` or the `MingLightController` folder. This cleanup is needed only when moving from the older Assets installation.
:::

### Install with VCC

1. Select **Add to VCC** on the official download page.
2. Confirm the repository in VCC and open **Manage Project** for your project.
3. Add MingToon, open Unity, and wait for package import and compilation to finish.
4. Use VCC's Manage Project for subsequent updates.

### Install with the BOOTH installer

1. Download the installer `.unitypackage` from the [official BOOTH product](https://raming.booth.pm/items/8810209).
2. Import it in Unity using `Assets > Import Package > Custom Package`.
3. Stay connected to the internet while the DLL installer automatically installs the required MingToon package. No separate install button is needed for the first installation.
4. On later Unity launches, the updater checks for a new version. Installation starts only when you select **Update** in the prompt. **Skip** applies to that version only. Restarting Unity does not automatically install an update.

## 3. Verify installation

Check **Packages > MingToon** in the Project window and the installation path `Packages/com.studioraming.mingtoon`. After Unity finishes importing and compiling, check the Console for errors and confirm that your materials display their MingToon shaders correctly.

Ming Light Controller is a separate package. Install or update MLC separately if you use it. This MingToon release contains the BRP core and does not include the URP add-on.

## Upgrading from an earlier version {#이전-버전에서-올라왔다면}

If you upgraded a project from an earlier version, perform the following two steps **once each**.

:::danger[1. Run schema migration once]
`Tools > Studio Raming > MingToon > Advanced > Migrate Project To Current Schema`

Material schema has moved from **version 10 to 11**. Two new toggles were added: `Enable Fresnel Rim Mask` and `Enable Rim Shade Mask`. Old materials do not have these toggles, so they read as **disabled**. Migration finds masks that are not the default white and enables the toggles.

**Rim masks do not apply to materials until you run this.** Materials with default white masks remain disabled, which is fine.

Migration confirms before running and backs up changed files. When complete, the console reports the count of processed materials, presets, and animation clips in one line, along with the backup path. → [Rim](/guides/rim#림-마스크)
:::

:::caution[2. Bake cache regenerates]
Generated-shader cache version moves from **28 to 38**, invalidating existing bake output. The next build or upload regenerates it automatically, so nothing needs manual deletion, but that one run takes longer.

**VRChat avatars must be re-uploaded for this version's fixes to take effect.** Shaders are bundled in the avatar asset bundle, so already-uploaded avatars continue using the old shader. → [VRChat](/platforms/vrchat)
:::

## 4. VRChat integration check (VRChat target only)

After script reload, Console must show this line:

```text
[MingToon] VRChat build hook compiled and registered.
```

:::danger[If this line is missing]
VRChat build hook **does not exist**. Upload will not trigger automatic optimization or VRChat-specific upload processing. Check:

1. Is Unity version **2022.3.22f1**?
2. Is VRChat SDK3 properly imported into the project? (`VRC_SDK_VRCSDK3` define)
:::

## 5. Project validation

From the menu, run `Tools > Studio Raming > MingToon > Validate Project`.

Mainly checks whether the current build target satisfies Shader Model 4.5. If not, it reports an error, and materials will render magenta. → [Support environment](/platforms/compatibility)

<!-- SCREENSHOT: Validate Project result -->

:::note[Supported editor streams are both 2021.3 and 2022.3]
Neither will raise `MING-ENV-UNITY-VERSION` error.

However, **if VRC SDK is present but editor is 2021.3**, the `MING-VRC-UNITY-VERSION` **warning** appears — "MingToon's VRChat integration compiles only on the 2022.3 stream, so this project has no avatar upload support." This is an accurate warning; if targeting VRChat, switch to 2022.3.22f1.
:::

## 6. Shader selection

| Project | Shader |
|---|---|
| Built-in Render Pipeline (BRP) — includes VRChat·Warudo | `StudioRaming/MingToon/BRP` |
| URP 12.x (Unity 2021.3) | MingToon URP shader |

:::danger[URP is not a VRChat target]
VRChat + URP is not supported. URP targets only Unity 2021.3 + URP 12.x. URP 13 and above, even if they appear to work, are not considered supported.
:::

## Optional: Post Processing Stack v2 {#선택-사항-post-processing-stack-v2}

MingToon works completely without PPv2. All PPv2-related source is excluded by `UNITY_POST_PROCESSING_STACK_V2` symbol, so a clean project needs no `com.unity.postprocessing`.

To enable PPv2 integration:

1. Install PPv2 **3.4.0**.
2. **Player Settings > Scripting Define Symbols**, **directly add** `UNITY_POST_PROCESSING_STACK_V2`.
3. Wait for Unity to recompile.
4. Run `Tools > Studio Raming > MingToon > Create or Repair BRP PPv2 Global Volume`.

:::note
Installing the package alone does not create this symbol. Skipping step 2 means the menu does nothing.
:::

VRChat avatars inherit world post-processing, so PPv2 is mainly for scene preview·capture.

## Next

[First Material](/getting-started/first-material) · [Troubleshooting](/troubleshooting)
