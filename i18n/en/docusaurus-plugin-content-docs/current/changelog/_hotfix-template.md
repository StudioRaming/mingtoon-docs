---
id: vHOTFIX-TEMPLATE
title: HOTFIX TEMPLATE
sidebar_position: 0
description: <the same sentence as the one-line summary>
---

<!--
===============================================================================
  Hotfix note template — do not edit and publish this file directly.
  The file name starts with `_`, so it does not appear on the site.
===============================================================================

■ What a hotfix is

  A fix redistributed as the same version's package without raising the version
  number. Keep it out of the release notes and stack the rounds on one hotfix
  page per version. The file name is `<version>-hotfix.md`, the same name in
  all three languages. A new round always goes at the top of the page.

■ frontmatter

  id:               v<version>-hotfix
  title:            <version> 핫픽스   (English: <version> Hotfix / Japanese: <version> ホットフィックス)
  sidebar_position: the release note's value minus 0.5
                    (0.1.7 is -107, so its hotfix is -107.5)
  slug:             /changelog/<version>-hotfix
  description:      the same sentence as the one-line summary

■ Rules you must follow

  1. Always fill in all three languages. Korean alone makes the rest fall back
     to Korean.
  2. Move the hotfix items out of the release note and onto this page.
     Leave only one line at the end of the release note, linking to the hotfix
     page.
  3. `Check before updating` lists only re-uploads, reconversions and values to
     restore by hand.
     Do not write both "a re-upload is needed" and "it is not needed" in one
     list. Name the materials involved and state it once.
  4. Write each item as a symptom sentence. Add at most one line of cause.
  5. Announce guidance that changed in a later version, such as the install
     path, in a single `:::note[As of now]` block.
  6. UI labels exactly as the inspector words them; anchors from the Korean
     original as-is.
     Under 60 characters per sentence, under 80 lines per page, no emoji.
  7. Commit a round that has not shipped yet, but do not push it.
     The site deploys the moment you push.

■ When you are done

    npm run build
    node scripts/check-translations.mjs en
    node scripts/check-translations.mjs ja
===============================================================================
-->

*X.Y.Z hotfix N · D Month YYYY · package version stays X.Y.Z*

## In one line

<one sentence on what the user gets from this hotfix. Under 40 characters>

:::warning[Check before updating]
- How to get it: download the same X.Y.Z package again and overwrite.
- Re-upload: <name the materials involved. If none, "Not needed.">
- Reconversion: <name the materials involved. If none, "Not needed.">
:::

:::info[How to read a hotfix]
This is a fix redistributed as the same package without raising the version number.
Check `Docs/PATCH_NOTES_X.Y.Z.md` inside the package to see which rounds it contains.
:::

## Fixed

- Fixed: <symptom sentence>.
- <one line of cause or action. Only when needed.>

## Known limitations

- <what still does not work>. <what you can do instead>.

[Install and update guide](/getting-started/installation) · [X.Y.Z patch notes](/changelog/X.Y.Z)
