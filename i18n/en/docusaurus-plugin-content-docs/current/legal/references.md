# References

These references cover standard techniques used in MingToon's reflections, normal-map blending, shadow filtering, and color processing. Each entry identifies the relevant feature and the scope of its use. MingToon includes adjustments for toon rendering; these features do not reproduce every part of the cited models.

## GGX microfacet distribution {#ggx}

**Used in:** The highlight distribution for direct PBR reflections. GGX provides the underlying shape as surface roughness changes, with toon-highlight controls adjusting that shape. This reference concerns the reflection distribution, rather than the paper's complete transmission model.

Bruce Walter, Stephen R. Marschner, Hongsong Li, Kenneth E. Torrance (2007), [*Microfacet Models for Refraction through Rough Surfaces* — author-hosted paper and materials](https://www.cs.cornell.edu/~srm/publications/EGSR07-btdf.html).

## Schlick Fresnel approximation {#schlick}

**Used in:** The viewing-angle response of PBR reflections. A Schlick-shaped response connects reflectance at normal incidence with reflectance at grazing angles. The default exponent is 5; changing it in the material produces a stylized variation.

Christophe Schlick (1994), [*An Inexpensive BRDF Model for Physically-based Rendering* — publisher's paper page](https://onlinelibrary.wiley.com/doi/10.1111/1467-8659.1330233).

## Reoriented Normal Mapping (RNM) {#rnm}

**Used in:** Normal-map layer blending. Detail normals are reoriented to the accumulated normal so that surface direction and detail are retained together. MingToon adds layer-strength controls and numerical safeguards.

Colin Barré-Brisebois, Stephen Hill (2012), [*Blending in Detail* — the authors' technical article](https://blog.selfshadow.com/publications/blending-in-detail/).

## Interleaved Gradient Noise (IGN) {#ign}

**Used in:** Varying shadow-filter sample directions and alpha dithering. This noise sequence helps reduce visible repetition with small sample counts. Coordinate placement is adapted to each feature, including surface-anchored dithering.

Jorge Jimenez (2014), [*Next Generation Post Processing in Call of Duty: Advanced Warfare* — the author's presentation materials](https://www.iryoku.com/next-generation-post-processing-in-call-of-duty-advanced-warfare/). The sequence and its attribution also appear in [Unity's official Random.hlsl (v10.10.1)](https://github.com/Unity-Technologies/Graphics/blob/v10.10.1/com.unity.render-pipelines.core/ShaderLibrary/Random.hlsl#L94-L102).

## Shadow visibility filtering and PCF {#pcf}

**Used in:** Softening cast-shadow boundaries. The URP shadow-map path uses the Percentage-Closer Filtering (PCF) principle of combining multiple depth-comparison results. The BRP screen-space path resamples shadow visibility already evaluated by Unity. Sample placement and filter radius are adjusted for MingToon's rendering.

William T. Reeves, David H. Salesin, Robert L. Cook (1987), *Rendering Antialiased Shadows with Depth Maps*. For the original technique and a GPU implementation, see Michael Bunnell and Fabio Pellacini, [*GPU Gems*, Chapter 11: Shadow Map Antialiasing — NVIDIA's official publication](https://developer.nvidia.com/gpugems/gpugems/part-ii-lighting-and-shadows/chapter-11-shadow-map-antialiasing).

## Spherical-harmonic (SH) ambient lighting {#sh}

**Used in:** Indirect lighting from Unity light probes. MingToon uses Unity's SH evaluation for smoothly varying ambient light over surface directions. The paper below provides the theoretical background for low-order SH diffuse lighting; it does not describe MingToon's complete lighting composition or all of Light Volumes.

Ravi Ramamoorthi, Pat Hanrahan (2001), [*An Efficient Representation for Irradiance Environment Maps* — author-hosted paper and materials](https://graphics.stanford.edu/papers/envmap/).

## Reinhard-shaped brightness compression {#reinhard}

**Used in:** The soft knee of the brightness limit. A Reinhard-shaped rational curve smoothly compresses brightness near the limit. MingToon applies it to the excess above a configured knee; it does not perform the paper's exposure estimation or full-screen tone mapping.

Erik Reinhard, Michael Stark, Peter Shirley, Jim Ferwerda (2002), [*Photographic Tone Reproduction for Digital Images* — University of Utah paper PDF](https://www-old.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf).

## Standard color blend modes {#blending}

**Used in:** Normal, Multiply, Screen, and Overlay blending for texture and effect layers. These correspond to standard blend expressions within the usual 0–1 color range. MingToon extends the handling of HDR colors, so results outside that range are not claimed to match web compositing standards.

W3C, [*Compositing and Blending Level 1*, §10 — official blend-mode definitions](https://www.w3.org/TR/compositing-1/#blending).

## Related documentation {#related}

Copyright notices and licenses for included external components are listed in [Third-party credits](/legal/third-party-credits).
