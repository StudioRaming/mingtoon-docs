---
id: vrc-rules
title: VRChat Compatibility Rules
sidebar_position: 5
---

# VRChat Compatibility Rules

This page documents the static rules stored in the MingToon package. Its rule version and validated Unity version are package baselines, not a complete current VRChat allowlist or proof of upload success. Check the [official VRChat Unity guidance](https://creators.vrchat.com/sdk/upgrade/current-unity-version/) for the current SDK environment.

**After reading this document** you know all the rules MingToon checks for VRChat upload, and can predict what will fail before uploading.

MingToon carries VRChat rules as a **versioned rule set**.

| Item | Value |
|---|---|
| Rule version | `2026.07` |
| Validated Unity version | `2022.3.22f1` |
| Reference | [VRChat Shader Fallback System](https://creators.vrchat.com/avatars/shader-fallback-system/) |

---

## Fallback Shader {#fallback-셰이더}

MingToon BRP shaders declare this in the SubShader tag:

```text
VRCFallback = toonstandardoutline
```

:::note[Checking fallback]
`toonstandardoutline` is a tag used by the host to choose a replacement shader. It does not preserve every MingToon color, shadow or effect. Verify the transparent fallback path and actual Safety settings as well.
:::

:::note[Separate the transparency warning from the actual tag]
`TransparentFallbackUsesUnlit` is a MingToon static-analyzer warning. The official rules route **Toon + Transparent/Fade** to Transparent Unlit, while **toonstandardoutline is a separate, non-combinable tag**. Do not read this warning as a confirmed outcome for every transparent MingToon material. Inspect the actual material override tag and Safety state. [Official VRChat fallback rules](https://creators.vrchat.com/avatars/shader-fallback-system/)
:::

### Standard Aliases

For fallback to inherit values, the shader must use Unity standard property names. MingToon checks this alias list:

```text
_MainTex      _Color        _BumpMap    _BumpScale
_OcclusionMap _OcclusionStrength
_EmissionMap  _EmissionColor
_Cutoff       _Mode
_SrcBlend     _DstBlend     _ZWrite
```

If missing: `MissingStandardAlias` — `missing standard fallback alias: {name}`

**Does not appear on healthy MingToon materials**. If present, the shader is corrupted or hand-modified.

---

## Uploadable MonoBehaviours

VRChat avatars only allow components on the allowlist:

```text
VRCAvatarDescriptor    VRCConstraint
VRCContactReceiver     VRCContactSender
VRCHeadChop            VRCIKFollower
VRCPhysBone            VRCPhysBoneCollider
PipelineManager     VRCRaycast
VRCSpatialAudioSource  VRCStation
```

Components outside this list trigger `CustomMonoBehaviourNotUploadable`:

> Custom MonoBehaviours cannot be included in avatar upload targets. **Remove them from PC Baked/Script-Free results.**

`<Missing Script>` is counted too.

:::note[Keep the Manager on the avatar root]
Keep MingToonManager on the avatar root while editing and use the normal SDK upload. Static preflight and inspection of the processed SDK clone are different checks. Verify that MingToon authoring runtime components are removed from that clone; this does not mean deleting all SDK-allowed components.
:::

---

## Complete Issue Code Reference

### PC

| Code | Severity | Meaning |
|---|---|---|
| `PcRequiresBakedShader` | Error | PC upload MingToon materials must use Baked variant |
| `CustomMonoBehaviourNotUploadable` | Error | Component outside allowlist |
| `MissingStandardAlias` | Warning | Standard fallback alias missing |
| `TransparentFallbackUsesUnlit` | Warning | Static transparency warning; see actual fallback-tag behavior above |
| `CameraDependentFeatureNotPortable` | Warning | Screen/camera-dependent effects depend on VRChat camera setup |
| `UnityVersionNotValidated` | Warning | Editor differs from validated version |
| `UnsupportedRenderBackend` | Error | **URP backend/materials cannot be used for VRChat export**. Use Built-in or Built-in Baked |

:::tip[No need for manual bake even if `PcRequiresBakedShader` appears]
[Auto-optimize on build](/workflow/build-optimization) swaps materials to generated shaders at upload, then restores them. This analyzer is a **static-state tool**, so it naturally reports this item when run in edit mode.
:::

### Quest / Android

| Code | Meaning |
|---|---|
| `QuestMingToonNotSupported` | MingToon shaders **cannot be uploaded directly to Quest/Android**. Prepare a separate `VRChat/Mobile/Toon Standard` conversion |
| `QuestRequiresMobileShader` | Quest/Android materials must use the current SDK's `VRChat/Mobile/` shaders |
| `QuestRequiresToonStandardConversion` | Conversion to Toon Standard is required |
| `QuestOutlineNotSupported` | **Toon Standard conversion on Quest does not preserve outlines** |
| `QuestToonStandardRequiresOpaque` | Toon Standard conversion target must be **opaque** |

:::danger[Quest support is separate work]
MingToon is not a mobile-shader target and provides no auto-conversion path. If planning a Quest version, **assume outlines disappear and transparency is unavailable** and design look separately.
:::

---

## Conditions for depth effects

`CanAvatarForceMainCameraDepth = false` records that an avatar cannot universally guarantee depth on host cameras. Check Photo Camera, world settings and other depth-supply conditions separately. Even with depth available, queue, depth participation, quality and distance settings affect the result.

Enabling the Manager option to include a depth light on upload adds a helper Directional Light to the upload clone. Check its actual state, which can depend on the installed version and existing avatar settings. Avatar Safety, the world and light settings affect it; it does not guarantee depth for every viewer. Read [VRChat depth light](/platforms/vrchat#vrchat-깊이-라이트), then compare the player view, mirror and Photo Camera.

## Practical Conclusion

When designing look for a VRChat avatar, follow this order:

1. **Build look that works without depth first** — form shadow · shadow projection · normal outline · rim light / rim shade
2. **Add depth effects after checking their conditions** — compare their behavior across camera views
3. **Check hair alpha and silhouette** — choose a suitable surface mode and compare the actual fallback
4. **Check the processed SDK clone for leftover MingToon authoring components**
5. **Check your own screen · mirror · Photo Camera separately**

## Related Documents

- [VRChat](/platforms/vrchat)
- [Shader Structure and Passes](/internals/shader-structure)
- [Validate Project Code](/reference/validator)
