---
id: validator
title: Validate Project Codes
sidebar_position: 8
---

# Troubleshooting: Validate Project Codes

Run `StudioRaming > MingToon > Validate Project` and you get lines with codes attached.
Find that code on this page. The check only reports; it fixes nothing.

The codes fall into three groups.

- **My environment** — Unity, build target, pipeline. You fix these by changing settings.
- **My material** — one value is wrong. You fix these in the inspector.
- **Broken installation** — a file is missing or has been touched. You fix these by reinstalling.

The last line of each entry tells you whether the code can be ignored.

---

## My environment

### MING-ENV-UNITY-VERSION {#ming-env-unity-version}

**Error** — the Unity you are using is not an LTS stream MingToon builds and tests against.

1. Install an editor on a supported stream in Unity Hub.
2. Reopen this project with that editor.
3. Check the supported versions in [Supported Environments](/platforms/compatibility).

Can you ignore it: no. Shader compilation differs on another stream, so the look changes or breaks.

### MING-VRC-UNITY-VERSION {#ming-vrc-unity-version}

**Warning** — the VRChat SDK is present, but this is not a Unity version the SDK has validated.

1. Check this project's Unity version in VCC.
2. Match it to the [official VRChat Unity guidance](https://creators.vrchat.com/sdk/upgrade/current-unity-version/).
3. Back up before migrating the project.

Can you ignore it: if you will not upload to VRChat, yes.
If you plan to upload, there is no avatar upload support in this state.

### MING-ENV-BUILD-TARGET {#ming-env-build-target}

**Error** — the current build target cannot guarantee shader model 4.5.

1. Open `File > Build Settings`.
2. Set the platform back to Windows, macOS or Linux.

Can you ignore it: no. Build like this and every MingToon material comes out magenta.
For Quest/Android see the [VRChat Compatibility Rules](/internals/vrc-rules).

### MING-PIPELINE-UNSUPPORTED {#ming-pipeline-unsupported}

**Error** — the active render pipeline is neither Built-in nor a supported URP.

1. Check the Render Pipeline Asset in `Project Settings > Graphics`.
2. Check the Render Pipeline Asset on the current Quality level too.
3. This code appears even if it is left in only one of the two places.

Can you ignore it: no. No MingToon material renders on this pipeline.

### MING-URP-VERSION-UNSUPPORTED {#ming-urp-version-unsupported}

**Error** — the installed Universal RP package is outside the supported range.

1. Open `Window > Package Manager > Universal RP`.
2. Change to a version inside the supported range. The range is written in the message.

Can you ignore it: no. The material fails to compile or comes out without an outline.

---

## My material

All six codes come down to one value, and all of them are fixed in the inspector.
The name of the material is prefixed to the message.

### MING-MAT-NON-FINITE {#ming-mat-non-finite}

**Warning** — a material value contains a broken number (NaN, Infinity).

1. Find the field named in the message.
2. Right-click that field and reset it to its default.
3. Check the screen and the bake result again.

Can you ignore it: no. It contaminates all lighting and screen-space computation.

### MING-MAT-COLOR-MASK-ZERO {#ming-mat-color-mask-zero}

**Warning** — **Color Mask** is 0, so this material writes no color to the screen at all.
The mesh is still drawn and occludes what is behind it, but you cannot see it.

1. Open **Surface Rendering** > **Advanced Color Buffer**.
2. Set **Color Mask** back to 15.

Can you ignore it: not unless you deliberately made an occluder-only material.

### MING-MAT-OPAQUE-ZWRITE-OFF {#ming-mat-opaque-zwrite-off}

**Warning** — it is in the opaque queue but does not write depth.

1. Turn on **ZWrite** under **Surface Rendering** > **Advanced Color Buffer**.
2. Or choose the transparent surface mode you originally intended.

Can you ignore it: no. The front-to-back order against other opaque meshes becomes random,
and effects that use camera depth read straight through this mesh.

### MING-MAT-TRANSPARENT-DEPTH-EFFECTS {#ming-mat-transparent-depth-effects}

**Warning** — you turned on depth effects in the transparent queue.

1. Turn off Depth Rim Light and Depth Shadow on this material.
2. Or change the surface mode to opaque or cutout.

Can you ignore it: no. The two effects flicker or read behind this surface.

### MING-MAT-CUTOUT-CUTOFF-ZERO {#ming-mat-cutout-cutoff-zero}

**Warning** — it is cutout but **Alpha Cutoff** is 0, so nothing is clipped.

1. Try raising **Alpha Cutoff** to 0.5.
2. If the hair looks too sparse, lower it to 0.3.

Can you ignore it: no. It casts shadows even from fully transparent parts,
so the mesh makes one solid rectangular shadow.

### MING-MAT-PERF-DISTANCE-ZERO {#ming-mat-perf-distance-zero}

**Warning** — **Performance Distance (m)** × **Performance Distance Scale** is 0, so it draws at the lightest step at every distance.
Depth effects, PBR, two or more matcap layers, additional normal layers, toon specular, glitter and screentone do not appear.

1. Open the `Master Adjust` tab.
2. Raise **Performance Distance Scale** to 1.

Can you ignore it: if you use the paid Ming Light Controller add-on, this is normal.
MLC adjusts this multiplier in game. Otherwise, no.

---

## Scene and URP settings

### MING-URP-DEPTH-FEATURE-MISSING {#ming-urp-depth-feature-missing}

**Error** — the URP Renderer Feature for depth effects is missing or disabled.

1. Run `StudioRaming > MingToon > URP > Install Depth Effects Renderer Feature`.
2. It is needed on **every** Renderer Data in the active URP Asset's renderer list.
3. Leave the feature's checkbox ticked.

Can you ignore it: not if you use depth effects on URP.
The controls keep moving but nothing at all is drawn on screen.

### MING-URP-OUTLINE-FEATURE-MISSING {#ming-urp-outline-feature-missing}

**Error** — the URP Renderer Feature for the outline is missing or disabled.

1. Run `StudioRaming > MingToon > URP > Install Outline Renderer Feature`.
2. Confirm it is attached to the Renderer Data the actual camera uses.

Can you ignore it: not if you use the outline on URP.

### MING-SCENE-NO-CAMERA {#ming-scene-no-camera}

**Warning** — there is no Game camera to inspect in the open scenes.

1. Open the scene you actually work in.
2. Or add one Camera to the current scene.
3. Run the check again.

Can you ignore it: if you ran the check in an empty scene, yes.
Only the depth state could not be checked; everything else was checked normally.

### MING-SCENE-CAMERA-DEPTH-OFF {#ming-scene-camera-depth-off}

**Warning** — the camera that was checked does not request a depth texture.

1. If no material has depth effects on, this is normal.
2. MingToon requests depth from the camera when a material needs it.
3. If depth effects do not show in Play mode, check the material's **Depth Effects** master before the camera.

Can you ignore it: usually yes. If it still does not show after checking step 3 above,
see [Depth Effects](/guides/depth-effects).

### MING-BAKE-GENERATOR-OUTDATED {#ming-bake-generator-outdated}

**Warning** — the bake record was created with an older version.

1. Rebake that avatar from the MingToon Manager.
2. Check the bake state and the restore information first.

Can you ignore it: no. The old result keeps showing on screen,
but it contains none of the fixes made since, and the build preparation check will refuse it.

---

## Broken installation

Every code below has the same cause.
A shader or runtime file is missing, older than the tools, or has been edited directly.

The fix is one thing too.

1. Reimport `Assets/StudioRaming/MingToon` from the release package.
2. Clear every compile error in the Console.
3. Run Validate Project again.

Can you ignore it: none of them. The controls in the inspector keep moving while the screen does not change.

The seven codes only differ in what they say is missing.

### MING-SHADER-MISSING {#ming-shader-missing}

**Error** — the shader file itself could not be found in the project.
On a URP project, also check whether the URP backend folder was imported.

### MING-SHADER-UNSUPPORTED {#ming-shader-unsupported}

**Error** — the shader does not compile in this environment.
Check the compile errors in the Console together with the graphics API.

### MING-SHADER-PASS-MISSING {#ming-shader-pass-missing}

**Error** — the outline, shadow caster or depth prepass passes are missing.
Also check that the material uses a shader matching this project's pipeline.

### MING-SHADER-PROPERTY-MISSING {#ming-shader-property-missing}

**Error** — a field the inspector wants to write is not declared in the shader.
The shader is older than the editor tools, or has been edited directly.

### MING-SHADER-FRESNEL-AREA-RANGE {#ming-shader-fresnel-area-range}

**Error** — the area control fields are not declared in the 0-1 range.

### MING-SHADER-PERF-DISTANCE-RANGE {#ming-shader-perf-distance-range}

**Error** — the range declaration of the performance distance fields differs.
The slider in the Master Adjust tab and Ming Light Controller's dial then fall out of sync.
The two point at different distances.

### MING-RUNTIME-PROVIDER-MISSING {#ming-runtime-provider-missing}

**Error** — the runtime script that turns depth on for the camera is missing or structured differently.
This check only looks at the script. It does not mean the actual camera has no depth.

:::note[Do not edit the shader code by hand]
A project showing the codes above has almost always had a partial update or a directly edited file.
Reverting wholesale to the files of the same release is the fastest fix.
:::

---

Passing the check does not guarantee the actual screen or a successful upload.
After fixing something, check both the check and the real result.

## Related pages

- [Troubleshooting](/troubleshooting)
- [VRChat](/platforms/vrchat)
- [Supported Environments](/platforms/compatibility)
- [VRChat Compatibility Rules](/internals/vrc-rules)
