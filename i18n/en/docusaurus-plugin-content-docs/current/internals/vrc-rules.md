---
id: vrc-rules
title: VRChat Compatibility Rules
sidebar_position: 5
---

# VRChat Compatibility Rules

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

:::tip[Look survives even if opponent hides shaders]
In VRChat, if the other player sets **Shaders to Hidden**, my avatar renders as fallback. Since `toonstandardoutline` is specified, **toon shading and outline are preserved**. Much closer to original than shaders that fall through to Standard.
:::

:::danger[Transparent materials lose outline in fallback]
The analyzer warns `TransparentFallbackUsesUnlit`.

> Toon's Transparent/Fade fallback is **replaced by Transparent Unlit, losing toon lighting and outline**.

For parts where silhouette is critical, like hair, **cutout is better** than transparent for fallback scenarios. → [Basic Setup](/guides/basics#1-표면-모드부터-정합니다)
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
VRCPipelineManager     VRCRaycast
VRCSpatialAudioSource  VRCStation
```

Components outside this list trigger `CustomMonoBehaviourNotUploadable`:

> Custom MonoBehaviours cannot be included in avatar upload targets. **Remove them from PC Baked/Script-Free results.**

`<Missing Script>` is counted too.

:::danger[Do not manually remove MingToon's own components]
`MingToonManager` and `MingDepthTextureProvider` are **automatically removed on VRChat upload**.

**Manually deleting the MingToon Manager loses the cached renderer list, causing upload optimization to lose scope**. Materials upload unoptimized.

This check is **for other scripts, not MingToon**. → [MingToon Manager — Export / Validate](/workflow/character-manager#내보내기--검증)
:::

---

## Complete Issue Code Reference

### PC

| Code | Severity | Meaning |
|---|---|---|
| `PcRequiresBakedShader` | Error | PC upload MingToon materials must use Baked variant |
| `CustomMonoBehaviourNotUploadable` | Error | Component outside allowlist |
| `MissingStandardAlias` | Warning | Standard fallback alias missing |
| `TransparentFallbackUsesUnlit` | Warning | Transparent fallback becomes Unlit |
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

## Official Position on Depth Effects

MingToon states this explicitly in code:

```text
CanAvatarForceMainCameraDepth = false
```

> Depth effects are **guaranteed on VRChat Photo Camera** and **worlds with screen camera depth texture enabled**.
> An avatar cannot force the main camera depth without world control.
> **Adding Camera or Light to the avatar is not an equivalent solution**, raises performance cost, and may be removed by avatar safety settings.

Reference: [VRC Camera Settings](https://creators.vrchat.com/worlds/udon/vrc-graphics/vrc-camera-settings/)

The same note appears in the inspector:

> VRC upload builds cannot contain arbitrary user scripts, so verify zero MingToon components in the SDK build clone. 2D shadow and 2D depth rim **only look identical when camera depth texture is provided**, not guaranteed by avatar alone.

> **On VRChat, Classic Hull works with material only**. Internal 2D edge is identical only when camera depth texture is provided.

---

## Practical Conclusion

When designing look for a VRChat avatar, follow this order:

1. **Build look that works without depth first** — form shadow · shadow projection · normal outline · rim light / rim shade
2. **Depth-based effects are a bonus** — only visible on Photo Camera and worlds with depth enabled
3. **Hair: prioritize cutout** — outline survives in fallback
4. **Verify zero runtime components before upload**
5. **Check your own screen · mirror · Photo Camera separately**

## Related Documents

- [VRChat](/platforms/vrchat)
- [Shader Structure and Passes](/internals/shader-structure)
- [Validate Project Code](/reference/validator)
