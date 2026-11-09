# Using @zebra-design-system/icons

- Load `icons.css` once in the document; @font-face reaches into shadow roots.
- A glyph inherits `currentColor` and `1em` — never give an icon its own
  colour token.
- `/names` exports the typed `IconName` union; `/codepoints.js` maps
  name → glyph character and family (`rounded`/`sharp` share codepoints —
  the style is a font-family swap, not a different glyph).
- Verify a name exists in `codepoints.json` before using it; a missing name
  renders nothing, silently. `inventory.json` lists icons rejected from the
  font build.
