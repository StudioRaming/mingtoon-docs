---
id: rim
title: Rim
sidebar_position: 5
---

# Rim

> This page is for anyone turning on **Enable Fresnel Rim** for the first time.
> It brightens or darkens the silhouette edge to separate it from the background. It takes about 5 minutes.

## What is this

There are five ways to lay a band on the silhouette edge.
None of the five read screen depth, so they show up anywhere.

| Inspector section | Where it appears | What it is for |
|---|---|---|
| **Rim Shade** | Inside the silhouette, darker | Sense of volume |
| **Rim Light** | Inside the silhouette, brighter | Backlight feel, background separation |
| **Backlight** | The backlight band when the key light is behind | Bringing out the key light direction |
| **Front Light** | Faces turned toward the camera | Emphasizing the front |
| **Shadow Interior Reflection** | Inside shadows only | Keeping shadows from dying |

![A character with every rim off next to one with only Rim Light on](/img/placeholder.png)
<!-- CAPTURE: guides/rim-01-off-vs-rim-light.png | 어두운 배경의 같은 캐릭터, 림 전부 끔(전) / 림 라이트만 켬(후) 2컷 | 1200x700 -->

## When to use it

- When the character sinks into the background in a dark world.
- When you cannot control the lighting and want a floor under the silhouette.
- When shadows die into a flat black block.

## Try it in 30 seconds

1. Select a converted body material.
2. Check that **Enable Fresnel Rim** is on. The default is on.
3. Raise **Fresnel Rim Intensity** to 3. The default is 1.
4. Lower **Width** to 0.3. The default is 0.5.

You succeeded when a thin band of light appears along the silhouette edge.
If nothing changes, go to [Troubleshooting](/troubleshooting#shadow).

## How to turn it on

1. Turn on one at a time. Stacking them blows the silhouette out to white.
2. Start by raising **Fresnel Rim Intensity**. At 0, changing color and width shows nothing.
3. Set the point where the band starts with **Width**. The lower it is, the thinner it hugs the edge.
4. Set the boundary with **Softness**. Lowering it makes the hard band of a cel look.
5. If brightness jumps between worlds, lower **Scene Light Influence**.

:::tip[Subtracting darkness is safer than adding brightness]
**Rim Shade** is more stable in worlds where lighting is unpredictable.
There is no risk of blowing out to white.
:::

### If you dislike the rim following the camera {#림이-카메라를-따라다니는-게-싫다면}

**View Alignment** decides whether the view or the light sets the rim position.
At 1, the rim slides over the surface as you move the camera.
At 0, it follows only the light direction, so it stays put as you turn the camera.

It is easy to confuse with **Light-Side Emphasis**, but the two decide different things.
Light-Side Emphasis decides which side the rim is left on.
View Alignment decides whether the rim follows the camera.

:::note[It behaves like 1 when there is no directional light]
Without a light direction to work from, it falls back to view alignment.
If the scene has no directional light, lowering this value makes no difference.
:::

### Rim on part of the surface only {#림-마스크}

A mask is a black-and-white image where white marks the area the effect applies to.
You must turn on **Enable Fresnel Rim Mask** for the mask texture to be read.
On the **Rim Shade** side, **Enable Rim Shade Mask** plays the same role.

:::caution[Turn the toggle on before adding the mask]
Both toggles are off by default.
While off, the texture is not read and the settings below appear disabled.
:::

The mask items are laid out the same as in [Common texture slot UI](/guides/texture-modules#마스크-세부-설정).

## Shadow Interior Reflection {#그림자-내부-반사}

A reflection band visible only inside shadows.
It keeps shadows from dying into a flat black block.
The effect is largest on dark clothing and high-contrast characters.

![Dark clothing with Shadow Interior Reflection off next to the same clothing with it on](/img/placeholder.png)
<!-- CAPTURE: guides/rim-02-shadow-interior-reflection.png | 어두운 옷 클로즈업, 그림자 내부 반사 끔(전) / 켬(후) 2컷 | 1200x700 -->

Items that exist only in this module decide how far in counts as inside a shadow.

- Reflection appears from anywhere darker than **Shadow Reflection Threshold**.
- **Visibility in Cast Shadow** is how much reflection is left inside a projected shadow.
- **Visibility in Depth Shadow** is how much reflection is left inside a Depth Shadow.

:::caution[The two values do not apply to WARUDO Built-in additional lights]
The point and spot additional light path has no key light shadow decision.
They apply normally to the key light and to the URP single pass.
:::

## Values you will touch often

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Fresnel Rim Intensity** | The brightness multiplier of the Fresnel rim | Leave at the default (1) | At 0, changing color and width shows nothing |
| **Width** | The point where the Fresnel rim starts | 0.3 (default 0.5) | Raising it brightens further into the surface, and 0 removes it |
| **Softness** | The blur of the Fresnel rim boundary | Leave at the default (0.2) | Lowering it gives a hard band, and raising it gives a gradient |
| **Scene Light Influence** | How closely it follows the scene brightness | 0.3 | At 0 it stays the same strength in any world |
| **Color Purity** | The saturation of the composited rim color | Leave at the default (1) | 0 is achromatic, and above 1 that layer alone becomes oversaturated |
| **Shadow Contribution Intensity** | The strength of the Rim Shade band | 1 | At 0, changing width and softness makes no difference |
| **Shadow Interior Reflection Intensity** | The brightness of the reflection band inside shadows | 0.5 | At 0 it adds no color even if you set up the shape |

## Common problems

### The silhouette blows out to white

In most cases Rim Light and Backlight were raised together.
Turn one off and check with the other one alone.
The sum of the four layers is held down by **Edge Rim Maximum Multiplier** in **Master Adjust**.

### Backlight does not appear in some worlds

Backlight depends on the key light direction of the scene.
It does not appear in a world with no directional light.
In such places, lower **Light-Side Emphasis** on Rim Light instead.

### I added a mask and nothing changed

The mask toggle is off.
Check [Rim on part of the surface only](#림-마스크) above first.

## More detail

- Every item and its range: [Rim Reference](/reference/rim)
- Depth Rim Light, which reads depth: [Depth Effects](/guides/depth-effects)
- The shared multiplier of the four layers: [Light and Shadow](/guides/light-and-shadow)
