---
id: module-cost
title: Modules and Performance Cost
sidebar_position: 2
---

# What the cost readout measures

> This page is an explanation. To actually make things lighter, see [Automatic Optimization On Build](/workflow/build-optimization).

## In one line

The cost readout in the inspector is an **estimate of the relative cost of the baked material after upload**.
It is measured against a new MingToon material baked the same way, set at 1.0x.

## What this number can and cannot do

| What it can do | What it cannot do |
|---|---|
| Compare which material is heavier within the same avatar | Convert into how many times longer a frame takes |
| Check whether the estimated cost dropped after turning a module off | Stand in for GPU milliseconds or SetPass counts |
| Compare estimated texture memory between materials | Judge the whole avatar's cost from the highest value |

The model is tuned to one specific Built-in benchmark environment.
Screen coverage, overdraw, light count, GPU and render pipeline all change the real cost.

## Reading the cost panel {#부하-예상-패널-읽기}

The cost panel shows five lines.

| Line | How to read it |
|---|---|
| Cost after upload | The estimate for the baked state. This is the value that actually ships |
| Cost while authoring (editor) | The estimate for the current editable shader. It differs from the value above |
| Selection average / peak | The average and the highest grade across the materials you selected |
| Unconditional texture reads / depth / instructions / draws | A breakdown for finding the cause of the cost. Not profiler measurements |
| Texture count / MB | Estimated texture memory. Separate from rendering speed |

![The cost estimate panel showing cost after upload and the expanded breakdown](/img/placeholder.png)
<!-- CAPTURE: internals/module-cost-01-panel.png | 재질 인스펙터 하단의 부하 예상 패널을 펼친 상태, 다섯 줄이 모두 보이게 | 1000x520 -->

The model calculates the authoring state and the estimated baked state separately.
Instruction count, always-executed texture reads, register usage and pass count go into it.

For layers it looks at the number actually used and the execution conditions, not the slot count.
Ten slots does not make it count ten reads per pixel.
Conversely, a strength of 0 does not make the code disappear. Values that can change at runtime are kept.

## What that constrains

- The scene-wide cost of making camera depth available is not part of the material multiplier. Compare the change in a real scene the first time you turn a depth effect on.
- Color correction driven by animation or a script has to keep working after the bake, so it does not fold into a constant. That much estimated cost stays.
- A lower estimated grade alone does not confirm an improvement. Compare real builds at the same camera, distance and lighting.

## Related pages

- [Automatic Optimization On Build](/workflow/build-optimization)
- [What Baking Removes](/internals/bake-internals)
- [Shader Structure and Passes](/internals/shader-structure)
