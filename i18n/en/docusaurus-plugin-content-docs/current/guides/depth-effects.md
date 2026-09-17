---
id: depth-effects
title: Depth Effects
sidebar_position: 6
---

# Depth Effects

> This page is for anyone turning on **Depth Effects** for the first time.
> It draws bang shadows and even outlines from screen depth. It takes about 10 minutes.

## What is this

The depth texture is the camera's measurement of what is how far in front.
Five effects drawn from that information live in the **Screen-space Effects** group.

| Inspector section | What it draws |
|---|---|
| **Depth Rim Light** | A light line of even thickness along the whole silhouette |
| **Depth Shadow** | The shadow bangs cast on the forehead |
| **SSAO (Screen Space Occlusion)** | Contact shading in folds and where surfaces meet |
| **SSSSS (Experimental)** | Light bleeding through hair tips and hems |
| **Inner Outline** | Inner Depth Edge. Boundary lines inside the silhouette, such as collars and chins |

## When to use it

- When you want bang shadows to stay steady even as the lighting changes.
- When you want contact shading where clothing meets the body.

:::danger[Check depth before touching any value]
Without depth, raising width or intensity puts nothing on screen.
The inspector tells you directly what is missing at that point.
:::

## Secure depth first {#플랫폼별-깊이-확보}

| Environment | What to do |
|---|---|
| VRChat | Turn on the Photo Camera, or have the world enable Screen Camera depth. Check that Manager's **Remove depth light on build** is off |
| General Unity (BRP) | The MingToon Manager in the scene supplies it automatically in the editor. There is no component to add |
| URP 12 | Run `StudioRaming > MingToon > URP > Install Depth Effects Renderer Feature` |
| Warudo | You need a Warudo camera with Depth on |

On URP you must also enable Depth Texture on the Renderer Data you use.
An avatar cannot force depth on the ordinary VRChat player screen.
So lay a floor with [Rim](/guides/rim) and [Outline](/guides/outline).

### Depth availability {#깊이-가용성}

**Depth Availability** decides how the presence of depth is judged.

- **Auto** is the default. The shader finds it on its own, so leave it here.
- **Force On** lets the author vouch for hosts the automatic check cannot reach.
- **Force Off** blocks depth effects completely.
- **Diagnostic** paints the decision state in color. It is for bug reports.

:::caution[Force On does not enable mirrors]
A mirror camera does not draw its own depth, yet someone else's depth buffer is attached.
Reading it as is makes the character use someone else's silhouette as its own shadow.
:::

### Diagnostic: for reports only {#diagnostic}

It paints which depth the shader was looking at in solid colors. The whole look changes.
Black is no depth, red is not this screen's buffer, and yellow is normal.

![Diagnostic colors compared on a screen without depth and a screen with depth](/img/placeholder.png)
<!-- CAPTURE: guides/depth-effects-06-availability-diagnostic.png | 깊이 가용성을 Diagnostic으로 둔 같은 캐릭터, 깊이 없는 카메라에서 검정(전) / 깊이 켠 카메라에서 노랑(후) 2컷 | 1200x700 -->

## Try it in 30 seconds

1. Select a converted face material.
2. Turn on **Depth Effects**.
3. Check that **Master Width** is 1.
4. Turn on **Depth Shadow**.

You succeeded when a bang shadow appears on the forehead.
If nothing changes, go to [Troubleshooting](/troubleshooting#depth).

## The depth effects master {#깊이--공통-값}

The switch that turns all five modules on and off, plus their shared values, live here.

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Depth Effects** | The master switch of all five modules | On | Off turns all five modules off |
| **Master Width** | The shared multiplier of Depth Rim Light and Depth Shadow | Leave at the default (1) | At 0, raising each module's width shows nothing |
| **Master Bias** | The smallest depth difference accepted as a front-back boundary | Leave at the default (0.02) | Lowering it attaches lines to shallow curvature and looks messy |
| **Master Softness** | The transition width of the depth boundary decision | Leave at the default (0.08) | Lowering it gives a hard ink line, and raising it gives a bled boundary |
| **Width Mode** | What the thickness is measured against | Leave at the default (Distance Stable) | Screen Pixels thickens the line as you move away |

## Depth Rim Light {#깊이-림-2d-림}

It draws a light line of even thickness outside the silhouette.

1. Check that **Depth Effects** is on.
2. Turn on **Depth Rim Light**.
3. Set **Rim Intensity** to 1.
4. Set **Rim Width Multiplier** to 2.

You succeeded when an even line of light follows the silhouette.

![A silhouette with Depth Rim Light off next to one with it on](/img/placeholder.png)
<!-- CAPTURE: guides/depth-effects-02-depth-rim-before-after.png | 어두운 배경의 캐릭터 상반신, 뎁스 림라이트 끔(전) / 켬(후) 2컷 | 1200x700 -->

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Rim Intensity** | The brightness multiplier of the line | Leave at the default (1) | At 0, changing color and width shows nothing |
| **Rim Width Multiplier** | The dedicated multiplier applied to Master Width | Leave at the default (2) | If Master Width is 0, raising this is useless |
| **360 Rim** | Whether it wraps the whole silhouette | 1 | At 0 it appears only on the light side, and at 1 it wraps everything |
| **Scene Light Influence** | How closely it follows the scene brightness | 0.3 | At 0 the line stays even in dark worlds |
| **Rim Sample Quality** | How many depth samples are read per pixel | Leave at the default (Standard) | Low catches eyes, nose, and mouth as rim too |

## Depth Shadow {#2d-그림자}

It pushes the silhouette of the object in front away from the light to draw a shadow band.

1. Turn on **Depth Shadow** on the face material.
2. Set **Shadow Width** to 3.
3. Set **Shadow Intensity** to 1.
4. Set **Depth Shadow Bias** to 0.03.

You succeeded when a bang-shaped shadow appears on the forehead.

![A forehead with Depth Shadow off next to one with it on](/img/placeholder.png)
<!-- CAPTURE: guides/depth-effects-04-depth-shadow-before-after.png | 앞머리가 있는 얼굴 정면 클로즈업, 뎁스 그림자 끔(전) / 켬(후) 2컷 | 1200x700 -->

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Shadow Width** | The thickness of the pushed band | Leave at the default (3) | Raising it stretches below the forehead, and lowering it sticks to the mesh |
| **Shadow Intensity** | The final amount of shadow applied | Leave at the default (1) | At 0, raising the width shows nothing |
| **Depth Shadow Bias** | The smallest gap between the front object and the receiving surface | Leave at the default (0.03) | 0.03 is 3 mm. Lowering it sticks the shadow to the face |
| **Depth Stretch** | How much the shadow widens with the floating distance | Leave at the default (0.75) | At 0, width alone decides the shadow |
| **Depth Falloff** | How much further parts fade out | Leave at the default (0.5) | At 1 the furthest shadow disappears completely |
| **Softness** | The width over which the boundary becomes full shadow | Leave at the default (0.05) | Lowering it snaps, and raising it fades shallow contacts |
| **Depth Curve** | The curve shared by width, blur, and falloff | Leave at the default (0) | At 0 it is proportional to depth, and raising it changes only the far side |

### Sticking and falloff {#눌어붙음과-감쇠}

If the shadow sticks to its own face, raise **Depth Shadow Bias**.
If it still remains, raise **Receiver Depth Pushback** on the face material. It sits right below the bias.
Use it only on receiving materials such as face and body, and leave hair and clothing at 0.

:::caution[A Receiver Depth Pushback above 0 blocks projected shadows]
The projected shadows that material receives are turned off automatically.
Turning Depth Shadow off or returning the value to 0 restores the original settings.
:::

## SSSSS (Experimental) {#깊이-투과광}

It makes thin parts look as though they hold light. It is still experimental.

1. Turn on **Enable Translucency** on the hair material.
2. Set **Translucency Intensity** to 1.
3. Set **Measure Width** to 6.
4. Move the light behind the character.

You succeeded when the hair tips glow red.

![Hair tips in backlight with translucency off next to the same tips with it on](/img/placeholder.png)
<!-- CAPTURE: guides/depth-effects-05-sssss-before-after.png | 광원을 캐릭터 뒤에 둔 머리끝 클로즈업, 투과광 사용 끔(전) / 켬(후) 2컷 | 1200x700 -->

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Translucency Intensity** | The brightness multiplier of the whole translucency | Leave at the default (1) | At 0 the calculation is skipped |
| **Measure Width** | How far toward the light it looks | Leave at the default (6) | Set it large and even thick parts are judged thin |
| **Shell Floor** | The lower bound that treats hollow clothing as thin | 0.8 for skirts and capes | At 0 the measured value is used as is |
| **Front Light Floor** | The translucency ratio left under front light | 0.2 | At 0 skin stops looking like skin |

## SSAO (Screen Space Occlusion) {#ssao-화면-공간-차폐}

It softly darkens folds and places where surfaces meet.

1. Turn on **SSAO Enabled** on the body material.
2. Set **SSAO Intensity** to 1.
3. Set **SSAO Radius** to 0.005.
4. Set **SSAO Contrast** to 1.

You succeeded when the place where clothing meets the body darkens.

![A collar with SSAO off next to the same collar with it on](/img/placeholder.png)
<!-- CAPTURE: guides/depth-effects-03-ssao-before-after.png | 옷깃과 목이 만나는 부분 클로즈업, SSAO 끔(전) / 켬(후) 2컷 | 1200x700 -->

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **SSAO Intensity** | The strength of the effect | Leave at the default (1) | At 0 it is invisible, but the calculation still runs |
| **SSAO Radius** | The distance over which occlusion is searched | Leave at the default (0.005) | Growing it makes contact shading wider and softer |
| **SSAO Contrast** | The contrast of the occlusion | Leave at the default (1) | Raising it leaves only deeply carved places |
| **Quality** | How many depth samples SSAO reads per pixel | Leave at the default (Low) | Low 4 · Standard 8 · High 16 |
| **SSAO Tint** | The color multiplied only into occluded places | White | White leaves the existing shadow color alone |

## Inner Depth Edge {#내부-2d-경계}

It lives in the **Inner Outline** section. It draws lines on depth steps inside the silhouette.

1. Check that **Outline Master** is on.
2. Turn on **Enable Inner Depth Edge**.
3. Set **Width** to 0.3.
4. Set **Inner Edge Color** dark.

You succeeded when lines appear on collars and under the chin.

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Width** | The thickness of the inner boundary line | Leave at the default (0.3) | Keeping it thinner than the normal outline is usual |
| **Depth Bias** | The smallest depth difference accepted as a boundary | Leave at the default (0.02) | Lowering it attaches lines to gentle curvature and looks messy |
| **Inner Edge Color** | The color of the inner boundary line | A color darker than the base | The closer to black, the stronger the comic style |
| **Outline Master** | The gate shared with the normal outline | On | While off, neither tab is drawn |

## Common problems

### No depth effect is visible at all

1. Check that the **All Effects** master and **Depth Effects** are on.
2. Check that **Master Width** is not 0.
3. Check that each module's intensity is not 0.
4. Review [Secure depth first](#플랫폼별-깊이-확보) above.

### Setting the surface mode to Transparent turns everything off

Transparent (3000) does not write depth.
Change the surface mode to **Semi-Transparent (2499)** in [Basic Settings](/guides/basics).
Semi-Transparent (2499) blends alpha while still writing depth.

### The shadow does not follow the body inside a mirror

In mirrors the depth modules step down no matter which value you pick.

## More detail

- Every item and its range: [Depth Effects Reference](/reference/depth-effects)
- Choosing a face shadow mode: [Character Rendering](/guides/character#4단계-앞머리-그림자)
- When you are worried about performance: [Troubleshooting](/troubleshooting#performance)
