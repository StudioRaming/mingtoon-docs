---
id: character
title: Character Rendering
sidebar_position: 8
---

# Character Rendering

> This page is for anyone turning on the **Face Shading Module** for the first time.
> It removes the nose shadow and gives the face its own shading rules. It takes about 8 minutes.

## What is this

A face has real curvature at the nose and the eye sockets.
Using the same shadow settings as the body almost always looks messy.

In 0.1.11 the **Face / Hair Shading** tab runs Face Area → Face Shading → Shadow Mode → Reference and Proxy → Advanced.
The face proxy and SDF also work on hair materials, and dead status folds were removed.

![A face with a nose shadow next to one cleaned up with face shading](/img/placeholder.png)
<!-- CAPTURE: guides/character-01-face-shading-before-after.png | 같은 얼굴 정면, 페이스 셰이딩 끔(전) / 켬(후) 2컷 | 1200x700 -->

## When to use it

- When the nose shadow splits the face under front lighting.
- When you want bang shadows to stay consistent regardless of lighting.

## Try it in 30 seconds

1. Select a converted face material.
2. Turn on the **Face Shading Module**.
3. Raise **Proxy Normal Intensity** to 1.
4. Raise **Face Border** to 0.25. The default is 0.

You succeeded when the blotchy shading on the nose and eye sockets disappears.
If nothing changes, go to [Troubleshooting](/troubleshooting#face).

## Face shading {#페이스-셰이딩}

### Step 1: Define the face area {#방법-a--얼굴-영역-마스크-권장}

A mask is a black-and-white image where white marks the area the effect applies to.

1. Turn on **Enable Face Area Mask** and put a texture into **Face Area Mask**.
2. Put weights into **Mask Channel (RGBA)**. Use `(0, 1, 0, 0)` for G only.
3. Turn on **Invert Mask** if the mask paints the face black.
4. Refine the boundary with **Remap Start** and **Remap End**.

When several of the four methods overlap, only the topmost one is used.

| Rank | Method | Item to turn on |
|---|---|---|
| 1 | Texture face mask | **Enable Face Area Mask** |
| 2 | Vertex paint | **Use Vertex Paint As Face Area** |
| 3 | Proxy volume | **Use Proxy Mesh Normals** |
| 4 | Whole material | All three above turned off |

If **Mask Intensity** is 0, the whole material is treated as face.

### Painting the face area in the SceneView {#얼굴-영역을-sceneview에서-칠하기}

1. Turn on **Use Vertex Paint As Face Area**.
2. Press **Start Painting Face Area**.
3. Paint the face in the SceneView, and hold Shift to erase.
4. Clean up the boundary with Harden or Smooth, then save.
5. Turn **Enable Face Area Mask** off while you use paint.

### Step 2: Remove the nose shadow {#2단계-코-그림자-없애기}

A proxy is an invisible reference shape used only for the shading calculation.

1. Turn on **Use Proxy Mesh Normals**.
2. Pick **Plane** in **Proxy Shape**. It is the first item in the list.
3. Raise **Proxy Normal Intensity**. 0 is the original normal, and 1 is the proxy normal.
4. Match the center and radius with the face proxy tool in the SceneView.
5. Set the transition width at the neck and hairline with **Proxy Edge Softness**.

:::note[The other three shapes are experimental]
**Sphere (Experimental)** · **Cylinder (Experimental)** · **Capsule (Experimental)** do not guarantee results.
:::

### Step 3: The face-only shading boundary {#3단계-얼굴-전용-음영-경계}

- **Face Border** is the adjustment you will use most. The lower it is, the later it darkens.
- Setting **Remove Default Face Form Shadow** to 1 removes the form shadow on the face.
- If the **Form Shadow** section is off, Face Border is not applied.

### Step 4: Bang shadows {#4단계-앞머리-그림자}

The single **Shadow Mode** row in the **Face Shadow Mode** group decides this.

| Value | Result | Where to use it |
|---|---|---|
| **Real Shadows (Same as Body)** | Receives the scene's real-time shadows as they are | When you do not treat the face separately |
| **Depth Shadow (Face Corrected)** | Helps Depth Shadow fall softly on the face | Animation look |
| **Custom** | A state you tuned yourself | Shown automatically when you leave the two combinations above |

![A forehead with the Depth Shadow face correction off next to one with it on](/img/placeholder.png)
<!-- CAPTURE: guides/character-02-bang-shadow-before-after.png | 앞머리가 있는 얼굴 정면, 그림자 방식 리얼 그림자(전) / 뎁스 그림자 얼굴 보정(후) 2컷 | 1200x700 -->

**Depth Shadow (Face Corrected)** needs camera depth to be visible.
Depth is the camera's measurement of what is how far in front.
How to secure it is in [Depth Effects](/guides/depth-effects#플랫폼별-깊이-확보).
If real-time shadows are misaligned, push them into place with **Real ShadowCaster Offset**.
To make the face receive bang shadows better, use **Receiver Depth Pushback**.
That value is on the [Depth Shadow](/guides/depth-effects#2d-그림자) tab.

## Values you will touch often

| Inspector label | What it changes | Suggested starting value | Raise it / lower it |
|---|---|---|---|
| **Proxy Normal Intensity** | How far face normals are replaced by proxy curvature | 1 | 0 is the original normal, and 1 removes the nose shadow |
| **Face Border** | The shading boundary position applied to the face only | 0.25 (default 0) | Raising it darkens earlier, and lowering it darkens later |
| **Face Softness** | The blur width of the face shading boundary | Leave at the default (0.15) | Raising it softens, and lowering it makes a crisp line |
| **Remove Default Face Form Shadow** | How much of the face form shadow is erased | 0 | At 1 the nose and cheek shadows disappear completely |
| **Proxy Edge Softness** | The width over which the face area releases at the proxy boundary | Leave at the default (0.15) | Raising it carries on into the neck, and 0 cuts off sharply |
| **Low Color** | The color bleeding into the lower part of the character | A color darker than the base | White means no change |

## Character height gradient {#캐릭터-높이-그라데이션}

It tints the lower and upper parts differently by height from the character root.
Use it to darken the feet and create a sense of grounding.

1. Turn on **Character Height Gradient**.
2. Set **Low Color** a little darker than the base.
3. Set the blend point and width with **Boundary Height** and **Boundary Softness**.

:::danger[The UV4 height bake comes first]
The height from the whole character root must be in UV4 for the position to be correct.
It is per character, not per mesh.
→ [Mesh UV Bakes](/guides/mesh-bakes#캐릭터-높이-uv4)
:::

## Common problems

### I painted the mask and it does not apply

When the texture mask is on, vertex paint and the proxy are ignored.

### Moving the proxy gets no response

The material may have baked face normals from an older version.
Run **Release Baked Face Normals** in MingToon Manager.

### The neck and hands became face too

The proxy volume is too large. Reduce the radius, or define the area with a mask.

## More detail

- Every item and its range: [Character Rendering Reference](/reference/character)
- Directional face shadows: [Face SDF](/guides/face-sdf)
- Adjusting bang shadow values: [Depth Effects](/guides/depth-effects#2d-그림자)
