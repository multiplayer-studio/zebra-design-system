# Pipeline reference

## The codepoint contract

`codepoints.json` is the only stateful output, and the only one that must be
committed:

```json
{
  "glyphs": {
    "alarm": { "codepoint": 57344, "setId": "2046:6771", "figmaName": "Alarm",
               "category": "Action", "retired": false }
  },
  "nextCodepoint": 58068
}
```

Rules the script enforces:

- An existing glyph keeps its codepoint forever. New glyphs take the next free
  slot from `nextCodepoint`.
- Icons are tracked by Figma `setId`, not by name. Rename an icon in Figma and
  the glyph keeps its name *and* its codepoint; the rename is reported so a
  human can decide whether to add an alias.
- An icon that disappears from the page is marked `retired: true`. Its codepoint
  is never reissued, because content published against the old font still
  references it.
- Deleting `codepoints.json` renumbers everything. There is no recovery except
  from version control, which is why it is committed.

## Why two families rather than two codepoint ranges

`rounded` and `sharp` use the *same* codepoints in different families. Switching
style is then `font-family`, which is a CSS concern, and never a content change.
If they had separate codepoints, every call site would have to know which style
it was in.

## Coordinate conversion

SVG is Y-down from the top-left; fonts are Y-up from the baseline. Each path is
scaled from the icon's viewBox to a 1000-unit em and flipped:

```js
svgpath(d).scale(k, -k).translate(0, 1000)
```

A non-square viewBox is rejected rather than stretched — an icon that is 25×24
would be silently squashed, and the fix belongs in Figma.

## What a font cannot carry

- **Strokes.** A glyph is a filled outline. `stroke="…"` must be outlined in
  Figma first (Outline Stroke). Rejected.
- **More than one colour.** Flattened to a single fill, and reported.
- **Embedded images.** Rejected.
- **Gradients.** Not detected as such; they flatten to a solid fill. Check the
  preview if an icon is known to use one.

## The failure no check catches

Fill rule. Figma exports compound paths that assume `evenodd`; TrueType glyph
outlines use a non-zero winding rule with direction-dependent contours. A
counter (the hole in a ring, the middle of an `o`) can come out solid. The font
is valid, the metrics are right, and nothing errors — the glyph is just wrong.

`preview.html` exists for exactly this. Scan it for solid blobs where a shape
should be hollow, and if you find one, reverse the inner contour in the source
SVG or fix the icon in Figma.

## Batching and the network

- The `images` endpoint is called in batches of 80 ids. Larger batches hit URL
  length limits.
- The returned URLs are S3, and at this volume a few will fail transiently. The
  downloader retries four times with backoff; failures past that are counted and
  reported rather than silently dropping a glyph.
- Nothing passes through the conversation — discovery, export and download are
  all network-to-disk, so page size does not cost context.
