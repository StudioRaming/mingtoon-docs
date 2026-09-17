---
id: references
title: References
sidebar_position: 3
---

# References

References for the standard techniques used in MingToon's reflections, normal map compositing, shadow filtering and color processing. Each entry also states which feature uses it and the scope of that use. Adjustments for toon rendering are included, so not every feature reproduces the full model of the paper below it.

## GGX microfacet distribution {#ggx}

**Where it is used:** the highlight distribution of PBR direct-light reflection. The GGX distribution gives the basic shape of how a highlight spreads with surface roughness, and the toon highlight settings then adjust that shape. This entry is a reference for the reflection distribution and does not imply the paper's full transmission model.

Bruce Walter, Stephen R. Marschner, Hongsong Li, Kenneth E. Torrance (2007), [*Microfacet Models for Refraction through Rough Surfaces* — paper and materials from the authors](https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.html).

## Schlick Fresnel approximation {#schlick}

**Where it is used:** how PBR reflection changes with view angle. It uses the Schlick form that runs from the head-on reflectance to the reflectance at grazing angles. The default exponent is 5; changing the exponent in the material settings makes it a variation for toon rendering.

Christophe Schlick (1994), [*An Inexpensive BRDF Model for Physically-based Rendering* — publisher's paper page](https://onlinelibrary.wiley.com/doi/10.1111/1467-8659.1330233).

## Reoriented Normal Mapping (RNM) {#rnm}

**Where it is used:** normal map layer compositing. It composites an additional normal by reorienting it onto the existing normal, keeping both the surface direction and the detail. MingToon adds layer strength control and numerical stabilization on top of it.

Colin Barré-Brisebois, Stephen Hill (2012), [*Blending in Detail* — technical article from the authors](https://blog.selfshadow.com/publications/blending-in-detail/).

## Interleaved Gradient Noise (IGN) {#ign}

**Where it is used:** scattering the sample directions of the shadow filter, and alpha dithering. It is a noise sequence used to reduce visible repeating patterns when only a few samples are taken. Coordinate placement, such as dithering that sticks to the surface, is adjusted to fit each feature.

Jorge Jimenez (2014), [*Next Generation Post Processing in Call of Duty: Advanced Warfare* — presentation from the author](https://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare/). The same sequence and attribution can also be found in [Unity's official Random.hlsl (v10.10.1)](https://github.com/Unity-Technologies/Graphics/blob/v10.10.1/com.unity.render-pipelines.core/ShaderLibrary/Random.hlsl#L94-L102).

## Shadow visibility filtering and PCF {#pcf}

**Where it is used:** the soft border of cast shadows. The URP shadow map path uses the Percentage-Closer Filtering (PCF) principle of gathering several depth comparisons. The BRP screen-space path resamples the shadow visibility Unity has already computed. The filter's sample placement and radius are adjusted to fit MingToon's rendering.

William T. Reeves, David H. Salesin, Robert L. Cook (1987), *Rendering Antialiased Shadows with Depth Maps*. For the original technique and an explanation of the GPU implementation: Michael Bunnell, Fabio Pellacini, [*GPU Gems*, Chapter 11: Shadow Map Antialiasing — official NVIDIA material](https://developer.nvidia.com/gpugems/gpugems/part-ii-lighting-and-shadows/chapter-11-shadow-map-antialiasing).

## Spherical harmonics (SH) ambient light {#sh}

**Where it is used:** indirect light through Unity light probes. It uses Unity's feature that evaluates smooth ambient light per surface direction with SH. The paper below is the theoretical background for representing diffuse lighting with low-order SH. It does not describe MingToon's whole lighting composite or all of Light Volumes.

Ravi Ramamoorthi, Pat Hanrahan (2001), [*An Efficient Representation for Irradiance Environment Maps* — paper and materials from the authors](https://graphics.stanford.edu/papers/envmap/).

## Reinhard-style brightness compression {#reinhard}

**Where it is used:** the soft knee of the brightness ceiling. A Reinhard-style rational curve compresses brightness smoothly as it approaches the ceiling. MingToon applies this curve to brightness above a configured threshold, and does not perform the paper's exposure estimation or full-screen tone mapping.

Erik Reinhard, Michael Stark, Peter Shirley, Jim Ferwerda (2002), [*Photographic Tone Reproduction for Digital Images* — paper PDF from the University of Utah](https://www-old.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf).

## Standard color blend modes {#blending}

**Where it is used:** Normal, Multiply, Screen and Overlay blending of texture and effect layers. Within the usual 0-1 color range it matches the standard blend formulas. Extended handling for HDR colors is included, so this does not mean results for out-of-range values match the web compositing standard.

W3C, [*Compositing and Blending Level 1*, §10 — official blend mode definitions](https://www.w3.org/TR/compositing-1/#blending).

## Related documents {#related}

Copyright notices and licenses for the external components included in MingToon are in [Third-Party Credits](/legal/third-party-credits).
