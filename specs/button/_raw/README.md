# Raw extraction notes

Read-only. Nothing in the Figma file was modified.

File: `hvRmnZZOZrmTW0wf8hbrt5` (The Zebra Design System) · page **Button** `2024:6729` · set `2060:15072` · extracted 2026-09-22.

| Step | Script | INPUT | Output landed in |
|---|---|---|---|
| 1. Discover | `discover.js` | `nodeId: "2024:6729"` | `discover.json` (verbatim) |
| 2. Structure | `extract-structure.js` | `setId: "2060:15072"`, variants filtered to `Flavour=primary, State=default, Disabled=false` (9 of 405) | `../button.spec.json` → `anatomy`, `api`, `variants.bySize`, `variants.byShape`, `subcomponents` |
| 2b. Colour matrix | custom token-only pass over the same set, `Size=small, Shape=rounded` (45 of 405) | — | `colour-matrix.json` (verbatim) and `../button.spec.json` → `variants.byFlavourAndState` |
| 2c. Icon probe | custom read of `2046:15010` and its glyph vector | — | the blocker issue in `../button.spec.json` |
| 3. Intent | `read-metadata.js` | `frameId: "4732:878"` | `../button.spec.json` and `../button.spec.md`, verbatim, in `summary`, `api[*].intent`, `anatomy[*].role`, `states`, `behavior`, `content`, `usage`, `accessibility`, `layoutTheming` |
| 4. Tokens | `export-tokens.js` | union of 88 variable ids + 2 text style ids, run in 4 slices to stay under the tool's response limit | `../button.tokens.json` |
| 5. Screens | `get_screenshot` | set + 9 flavour variants | `../screens/` |

## Why the structure run was sliced

The set has 405 variants (9 Flavour × 3 Size × 3 Shape × 5 State/Disabled). Diffing all of them would produce hundreds of near-identical deltas. The axes are orthogonal — Size and Shape carry every geometric value, Flavour and State/Disabled carry every colour value — so two runs cover the whole set: 9 variants for geometry and 45 for colour. The cross-product of `variants.bySize`, `variants.byShape` and `variants.byFlavourAndState` in the spec reconstructs all 405.

## Extractor health

- `gaps` (visual values with no token or style): **none**
- `bindingDrift` (a token bound on a part in some variants but not others): **none**
- `collisions`, `unresolved`: **none**
- `descriptionDrift`: **7 tokens** — see issue 3 in the spec
