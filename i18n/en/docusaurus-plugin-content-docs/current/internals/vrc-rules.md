---
id: vrc-rules
title: VRChat Compatibility Rules
sidebar_position: 5
---

# VRChat Compatibility Rules

These are all the rules MingToon checks statically for VRChat upload.
They let you see what will be flagged before you upload.

This list is the baseline recorded in the package, not VRChat's complete current allowlist.
Check the [official VRChat Unity guidance](https://creators.vrchat.com/sdk/upgrade/current-unity-version/) for the current SDK environment.

| Item | Value |
|---|---|
| Rule version | 2026.07 |
| Validated Unity version | 2022.3.22f1 |
| Reference | [VRChat Shader Fallback System](https://creators.vrchat.com/avatars/shader-fallback-system/) |

## Practical conclusion {#실무-결론}

This is the order to design the look of a VRChat avatar in.

1. **Build a look that works without depth first.** Form shadow, shadow projection, Normal Outline, rim light, rim shade.
2. **Add depth effects afterwards.** Raise them while comparing how they read on each camera.
3. **Check the hair's alpha and silhouette.** Choose a surface mode and also look at it in the fallback state.
4. **Check that the upload clone has zero MingToon runtime components.**
5. **Check your own view, a mirror and the Photo Camera separately.**

## Fallback shader {#fallback-셰이더}

MingToon Built-in shaders declare this in the SubShader tag.

```text
VRCFallback = toonstandardoutline
```

`toonstandardoutline` is a tag the host uses to pick a replacement shader.
It does not mean MingToon's colors, shadows and effects are preserved.

:::note[Do not read the transparent fallback warning as a confirmed outcome]
`TransparentFallbackUsesUnlit` is a warning from MingToon's analyzer.
By the official documentation it covers the case of Toon combined with Transparent/Fade.
That combination uses the Transparent Unlit path.
`toonstandardoutline` is a standalone tag, separate from that combination.
Check the actual result against the material's override tag and Safety state.
:::

### Standard aliases

For fallback to inherit values, the shader has to carry Unity's standard names.
It checks 13 aliases.

```text
_MainTex       _Color         _BumpMap    _BumpScale
_OcclusionMap  _OcclusionStrength
_EmissionMap   _EmissionColor
_Cutoff        _Mode
_SrcBlend      _DstBlend      _ZWrite
```

If one is missing, a `MissingStandardAlias` warning is raised.
It does not appear on a healthy MingToon material. If it does, the shader is corrupted or was hand-modified.

## Uploadable components

MingToon holds an allowlist of components an avatar may keep. There are 12.

```text
VRCAvatarDescriptor    VRCConstraint
VRCContactReceiver     VRCContactSender
VRCHeadChop            VRCIKFollower
VRCPhysBone            VRCPhysBoneCollider
PipelineManager        VRCRaycast
VRCSpatialAudioSource  VRCStation
```

A component outside the list raises `CustomMonoBehaviourNotUploadable`.
`<Missing Script>` counts too.

:::caution[Automatic removal is not guaranteed]
MingToon runtime components are marked `IEditorOnly` for VRChat.
That mark does not guarantee the SDK will delete them.
So you have to check the build clone yourself, after the SDK has processed it.
Look for zero MingToon components in that clone.
While editing, leave MingToon Manager on the avatar root and upload as usual.
:::

## Issue codes

### PC

| Code | Severity | Meaning |
|---|---|---|
| `PcRequiresBakedShader` | Error | Materials for PC upload must be the baked variant |
| `CustomMonoBehaviourNotUploadable` | Error | There is a component outside the allowlist |
| `UnsupportedRenderBackend` | Error | The URP backend and URP materials cannot be used for VRChat output |
| `MissingStandardAlias` | Warning | A standard fallback alias is missing |
| `TransparentFallbackUsesUnlit` | Warning | A static warning for transparent surfaces. See the explanation above |
| `CameraDependentFeatureNotPortable` | Warning | Effects that rely on the screen or camera depend on VRChat's camera setup |
| `UnityVersionNotValidated` | Warning | The editor differs from the validated version |

:::tip[A manual bake is not needed even if `PcRequiresBakedShader` appears]
[Automatic Optimization On Build](/workflow/build-optimization) swaps the materials at the moment of upload and restores them when it finishes.
This analyzer looks at the static state, so running it while editing naturally raises this item.
:::

### Quest and Android

| Code | Meaning |
|---|---|
| `QuestMingToonNotSupported` | MingToon shaders cannot be uploaded to Quest directly |
| `QuestRequiresMobileShader` | Quest materials must use a `VRChat/Mobile/` shader |
| `QuestRequiresToonStandardConversion` | Conversion to `VRChat/Mobile/Toon Standard` is required |
| `QuestOutlineNotSupported` | Quest conversion does not preserve outlines |
| `QuestToonStandardRequiresOpaque` | A Quest conversion target must be opaque |

:::danger[Quest support is separate work]
MingToon is not a mobile shader target and provides no automatic conversion path.
If you plan a Quest version, design the look separately, assuming outlines disappear and semi-transparency is unavailable.
:::

## Conditions for depth effects

An avatar on its own cannot guarantee depth on the host camera.
Check the Photo Camera, world settings and other depth-supply conditions separately.
Even with depth available, queue, camera depth participation, quality and distance settings change the result.

The Manager's **Remove depth light on build** is off by default.
Left off, it puts a helper Directional Light into the upload clone only when depth effects are actually used.
Turned on, it forces that light out, so depth effects can disappear from the screen.
Avatar Safety, the world and light settings all affect it, so depth is not guaranteed on every view.
Read [VRChat depth light](/platforms/vrchat#vrchat-깊이-라이트) first, then compare your own view, a mirror and the Photo Camera.

## Related pages

- [VRChat](/platforms/vrchat)
- [Validate Project Codes](/reference/validator)
- [Shader Structure and Passes](/internals/shader-structure)
