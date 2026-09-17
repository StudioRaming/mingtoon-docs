---
id: vTEMPLATE
title: TEMPLATE
sidebar_position: 0
description: <the same sentence as the one-line summary>
---

<!--
===============================================================================
  Patch note template — do not edit and publish this file directly.
  The file name starts with `_`, so it does not appear on the site.
===============================================================================

■ Creating a new version — `node scripts/new-patch-note.mjs 0.1.11`

  This command creates the Korean, English and Japanese files and fills in the
  computed frontmatter. Do not create them by hand. Get sidebar_position wrong
  and the version order flips. Change the date on the first line under the
  title to the actual release date yourself.

■ Rules you must follow

  1. Always fill in all three languages. Korean alone makes the rest fall back
     to Korean.
  2. Keep the section order below. Delete a section entirely if it does not
     apply. The order is: one-line summary, check before updating, new features,
     changed defaults and look changes, fixed, known limitations, footer links.
  3. Each item starts with the change the user sees.
     Do not write changes with no on-screen result, such as caching, shared
     calculations or code cleanup.
       Bad: Fewer repeated calculations - reusable lighting and normal
            calculations are now shared and...
       Good: Re-baking the same avatar has a shorter wait.
  4. A `New features` item starts with an inspector label. No label means it is
     not a new feature.
  5. Write `Fixed` items as symptoms.
       Bad: Improved restore stability
       Good: Cancelling a bake did not return the material to editable
  6. Never write a performance change without a number. With no number, add
     only "How much difference you feel varies by environment".
  7. Do not slip disclaimer paragraphs into the body. Gather them under
     `Known limitations`.
  8. UI labels go in bold exactly as the inspector words them; backticks are
     for menu paths and file names only.
     Canonical labels: Editor/InspectorUx/MingInspectorText.cs in the MingToon source.
  9. Anchors use the Korean original as-is in all three languages. Using an
     anchor that does not exist fails the build.
 10. Admonitions use v3 syntax only. `:::warning[Title]` — brackets required.
     `:::warning` is used once, for "Check before updating" at the top.
 11. Under 60 characters per sentence, under 80 lines per page, no emoji.

■ When you are done

    npm run build
    node scripts/check-translations.mjs en
    node scripts/check-translations.mjs ja
===============================================================================
-->

*Open beta · D Month YYYY*

## In one line

<one sentence on what the user gets from this update. Under 40 characters>

:::warning[Check before updating]
- Backup: <what to back up>
- Re-bake: <whether it needs baking again>
- Re-upload: <whether it needs uploading again>
- Look changes: <what to check>
:::

## New features

- **<inspector label>** — <what became visible>. <where it is>. → [Docs](/path)

## Changed defaults and look changes

- **<label>** default changed from A to B. <how it looks different>.

## Fixed

- Fixed: <symptom sentence>.

## Known limitations

- <what still does not work>. <what you can do instead>.

[Install and update guide](/getting-started/installation) · [Previous patch notes](/changelog/0.1.10#v0110)
