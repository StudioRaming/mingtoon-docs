---
id: validator
title: Validate Project Code
sidebar_position: 8
---

# Validate Project

Find the code reported by Tools > Studio Raming > MingToon > Validate Project. The check reports findings without automatically repairing them. **Severity below follows the current Validator source.** Warnings can still affect the look or build.

## MING-ENV-UNITY-VERSION {#ming-env-unity-version}

**Error.** Unity is outside the supported 2021.3 and 2022.3 streams. Use a supported editor appropriate for the target platform.

## MING-VRC-UNITY-VERSION {#ming-vrc-unity-version}

**Warning.** VRC SDK is detected but the Unity stream does not match MingToon's VRChat integration. The package rule records 2022.3.22f1. Check VCC and the current SDK Unity guidance before migrating a project.

## MING-ENV-BUILD-TARGET {#ming-env-build-target}

**Error.** The build target is unsupported. Check the Windows, macOS or Linux desktop target and graphics API. Android/Quest, iOS and WebGL are not direct MingToon output targets.

## MING-PIPELINE-UNSUPPORTED {#ming-pipeline-unsupported}

**Error.** The active pipeline is neither Built-in nor supported URP. Check the Render Pipeline Asset in Graphics and the current Quality level.

## MING-URP-VERSION-UNSUPPORTED {#ming-urp-version-unsupported}

**Error.** The URP version is outside the backend's supported range. Match the installed backend requirements and compatibility guide.

## MING-SHADER-MISSING {#ming-shader-missing}

**Error.** A required shader was not found. Check installation, backend and Console compilation errors, then repair through the package's installation method.

## MING-SHADER-UNSUPPORTED {#ming-shader-unsupported}

**Error.** The shader is unsupported in this environment. Check compilation errors, GPU/graphics API and pipeline compatibility.

## MING-SHADER-PASS-MISSING {#ming-shader-pass-missing}

**Error.** A backend-required pass is missing. Inspect the named pass and repair shader and editor files to the same release.

## MING-SHADER-PROPERTY-MISSING {#ming-shader-property-missing}

**Error.** A property expected by the editor is missing. Check for partial updates or mixed release files.

## MING-SHADER-FRESNEL-AREA-RANGE {#ming-shader-fresnel-area-range}

**Error.** An area control does not use the expected Range(0, 1). Compare the reported property with the release shader and repair it.

## MING-SHADER-PERF-DISTANCE-RANGE {#ming-shader-perf-distance-range}

**Error.** Performance-distance ranges are invalid. _PerfDistanceMax must be Range(1, 50) and _PerfDistanceScale Range(0, 2). Restore matching release files.

## MING-MAT-NON-FINITE {#ming-mat-non-finite}

**Warning.** A material value is NaN or Infinity. Restore the named property to a finite value before checking rendering or baking.

## MING-MAT-COLOR-MASK-ZERO {#ming-mat-color-mask-zero}

**Warning.** Color Mask is zero, so no color channels are written. Unless intentional, restore RGBA (15) in the advanced color-buffer settings.

## MING-MAT-OPAQUE-ZWRITE-OFF {#ming-mat-opaque-zwrite-off}

**Warning.** ZWrite is off in an opaque queue. Occlusion can be incorrect; reapply the surface mode or verify that the depth state is intentional.

## MING-MAT-TRANSPARENT-DEPTH-EFFECTS {#ming-mat-transparent-depth-effects}

**Warning.** Depth effects are enabled in the transparent queue. Check self-depth and sorting in the actual camera. If needed, disable the effect or use a suitable mode such as Semi-Transparent or Cutout, checking whether rear layers become occluded.

## MING-MAT-CUTOUT-CUTOFF-ZERO {#ming-mat-cutout-cutoff-zero}

**Warning.** Cutout threshold is zero and transparent texels can remain. Check texture alpha and increase cutoff; 0.5 is a starting point for comparison.

## MING-MAT-PERF-DISTANCE-ZERO {#ming-mat-perf-distance-zero}

**Warning.** Performance Distance times Scale is zero, selecting the lightest tier at every distance. Several effects may disappear. Check whether MLC is intended to drive this value; otherwise raise the scale.

## MING-URP-DEPTH-FEATURE-MISSING {#ming-urp-depth-feature-missing}

**Error.** The URP depth Renderer Feature is missing or disabled. Install the supported backend, check Renderer Data in the active URP Asset, and use Install Depth Effects Renderer Feature.

## MING-URP-OUTLINE-FEATURE-MISSING {#ming-urp-outline-feature-missing}

**Error.** The URP outline Renderer Feature is missing or disabled. Check the camera's Renderer Data and Install Outline Renderer Feature.

## MING-BAKE-GENERATOR-OUTDATED {#ming-bake-generator-outdated}

**Warning.** The manifest records an older generator. Existing output may still render without newer fixes. Check that avatar's bake state and restore information, then rebake.

## MING-RUNTIME-PROVIDER-MISSING {#ming-runtime-provider-missing}

**Error.** The depth-provider type or required methods are missing or have an unexpected structure. Check installation and compilation errors. This is a type check, not proof that every camera lacks depth.

## MING-SCENE-NO-CAMERA {#ming-scene-no-camera}

**Warning.** No loaded Game camera was available for inspection. Open the target scene and check again.

## MING-SCENE-CAMERA-DEPTH-OFF {#ming-scene-camera-depth-off}

**Warning.** The inspected Game camera does not request depth. Check the depth provider for general Unity/WARUDO; follow the host-camera conditions in the VRChat guide for avatars.

Passing validation does not guarantee the rendered view or a successful upload. Recheck the affected finding and actual workflow after a fix.

[VRChat](/platforms/vrchat) · [URP / Compatibility](/platforms/compatibility) · [Basic](/guides/basics)
