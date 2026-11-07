# Output layout

## Folders

```
<root>/                            # default: tokens/ at the repo root
├── manifest.json                  # collections, modes, extension graph, text styles, warnings
├── fonts.json                     # every font family and weight the tokens need
├── fonts/                         # fetch-fonts.mjs: woff2 files, fonts.css, manifest.json
├── _dump/                         # compact source data the builder reads (incl. text-styles.json)
├── base/
│   ├── text-styles.json           # one typography token per Figma text style, aliasing its variables
│   └── <collection-slug>/
│       └── <mode-slug>.json       # every variable in that collection, at that mode
└── extensions/
    └── <extension-slug>/
        ├── manifest.json          # parent, root, mode map, override counts
        └── <parent-collection-slug>/
            └── <mode-slug>.json   # ONLY the variables this extension overrides
```

**Two extensions can share a name.** A `target` extending `primitives` and a `target` extending `palette` are different collections with the same name. The `<parent-collection-slug>` subfolder is what disambiguates them, which is why it is part of the path rather than a field inside the file.

**An extension need not override every mode.** If `companion` overrides `brand/primary/default` in Light but not Dark, that token appears in `light.json` and is simply absent from `dark.json` — Dark inherits the parent. Absence is meaningful here, not an omission.

**Slugs** are the Figma name lowercased with spaces and `/` turned into `-`: `Desktop Compact` → `desktop-compact`, `Palette` → `palette`. Slugs are for filenames only; the names inside the JSON stay verbatim.

**Why one folder per extension.** An extension is a coherent set of overrides that travels together — a brand, a product surface, a contrast profile. Keeping it in its own folder means a consumer picks base + one extension folder per layer without a build step having to unpick which of a merged file's tokens were really overridden.

**Why overrides only.** A merged extension file cannot be diffed against its base and cannot answer "what does this brand actually change?". It also goes stale silently: a token added to the base never reaches a merged extension file until the next export. Layering base-then-extension at read time has neither problem. If a consumer needs a flattened file, that is a build output, not an extraction output.

## The DTCG leaf

```json
{
  "$type": "color",
  "$value": "{primitives.color.brand.main.60}",
  "$description": "Primary brand color (theme.color.brand.primary)",
  "$extensions": {
    "com.figma": {
      "id": "VariableID:72:332",
      "collection": "palette",
      "mode": "Light",
      "resolvedType": "COLOR",
      "scopes": ["FRAME_FILL", "SHAPE_FILL"],
      "codeSyntax": { "WEB": "--brand-primary" },
      "aliasOf": "VariableID:98:12"
    }
  }
}
```

- `$type` — `color`, `dimension`, `number`, `fontFamily`, `fontWeight`, `string`, `boolean`. Derived from `resolvedType` first, then scopes, then the name (primitive collections often carry no scopes at all, so a bare `scale/1` still types as a dimension).
- `$value` — a literal (`"#1f69ff"`, `"4px"`, `500`, `"IBM Plex Sans"`) or an alias.
- `$description` — present only when the Figma variable has one.
- `$extensions["com.figma"]` — everything Figma knows that DTCG has no home for. `codeSyntax` and `hiddenFromPublishing` appear only when set; `aliasOf` only when the value is an alias.

In an **extension** file the block is slightly different: `overrides` names the base token being replaced, `extension` names the extension, and `parentMode` names the base mode this mode inherits from.

```json
"$extensions": {
  "com.figma": {
    "id": "VariableID:72:332",
    "overrides": "palette.brand.primary.default",
    "extension": "Companion",
    "mode": "Light",
    "parentMode": "Light",
    "resolvedType": "COLOR",
    "scopes": []
  }
}
```

## Aliases

`{<collection name>.<dotted variable name>}` — the collection name is part of the reference because two collections may hold the same path. `primitives` / `color/brand/main/60` becomes `{primitives.color.brand.main.60}`.

Spaces in a Figma name survive into the reference (`{typography.label.large.font family}`). That is deliberate: this folder mirrors Figma. Sanitising names for CSS custom properties belongs to whatever builds CSS from these files.

An alias at an opacity (Figma's "variable with opacity") keeps the plain reference as `$value` and adds `aliasOpacity` (0–1) under `$extensions["com.figma"]`. Read the two together; the reference alone is the colour at full strength.

An alias that cannot be resolved is written as `{unresolved:<variable id>}` and the id is listed in the manifest's `unresolvedAliases`.

## Collisions

If a variable is named `a/b` and another `a/b/c`, the leaf that would be shadowed is moved to `$root` inside the group and the path is listed in the manifest's `collisions`.

## manifest.json

```json
{
  "fileKey": "hvRmnZZOZrmTW0wf8hbrt5",
  "fileName": "The Zebra Design System",
  "extractedAt": "2026-09-22",
  "collections": [
    { "name": "palette", "slug": "palette", "id": "VariableCollectionId:...",
      "modes": ["Light", "Dark"], "defaultMode": "Light", "variableCount": 180,
      "isExtension": false, "files": ["base/palette/light.json", "base/palette/dark.json"] }
  ],
  "extensions": [
    { "name": "Companion", "slug": "companion", "parent": "palette", "root": "palette",
      "overrideCount": 42, "modeMap": [{ "mode": "Light", "parentMode": "Light" }],
      "files": ["extensions/companion/palette/light.json"] }
  ],
  "counts": { "collections": 5, "extensions": 0, "tokens": 412, "files": 11 },
  "warnings": []
}
```

`warnings` carries anything that was observed and not fixed: empty collections, remote collections whose variables cannot be read from this file, unresolved aliases, collisions, and variables with no value in a given mode.

## Known quirks in this file (observed 2026-09-22)

These are recorded so a future run recognises them as known, not new:

- **`fill/transparent` collides with `fill/transparent/*`.** `palette` has both a leaf named `fill/transparent` and a group `fill/transparent/{elevate,emphasis,obsure}`. The leaf is moved to `$root` inside the group and the path is listed in the manifest's warnings. (`obsure` is also a typo for `obscure` in Figma — left verbatim.)
- **Orphan mode ids.** 25 `primitives` variables carry a value for mode `2201:1`, which the collection no longer declares. Skipped and reported.
- **`stroke/base` resolves to 0px** while its description says `= 1px`. Several dimension tokens have descriptions that disagree with their values; descriptions are copied verbatim and not corrected.
- **`size` and `typography` do not vary by mode.** Almost every token in both collections resolves identically across all four modes, so the dump collapses them to `{"*": …}`. The per-mode files are still written in full.

## Text styles

`base/text-styles.json` holds one DTCG `typography` token per Figma text style, nested by its name
(`label/large` → `label.large`). Each of its five parts aliases the variable the style binds, so a style never
carries a second copy of a value and follows the typography collection's breakpoint modes for free:

```json
{
  "$type": "typography",
  "$value": {
    "fontFamily": "{typography.label.large.font family}",
    "fontWeight": "{typography.label.large.font weight}",
    "fontSize": "{typography.label.large.font size}",
    "lineHeight": "{typography.label.large.line height}",
    "letterSpacing": "{typography.label.large.letter spacing}"
  },
  "$extensions": { "com.figma": { "id": "S:…", "key": "…", "fontStyle": "Medium", "textCase": "ORIGINAL", "leadingTrim": "NONE" } }
}
```

A part with no bound variable keeps Figma's literal and is listed under `unbound` and in the manifest warnings.

## Fonts

`fonts.json` lists each family the tokens name, whether a text style uses it, the weights the styles need and every
weight token declared. Figma cannot export font files, so `fetch-fonts.mjs` downloads what Google Fonts serves into
`fonts/<family-slug>/` (a variable font is one file covering every weight) and writes `fonts/fonts.css`. A family
Google does not serve is listed under `selfHost` in `fonts/manifest.json`; its files go in by hand.
