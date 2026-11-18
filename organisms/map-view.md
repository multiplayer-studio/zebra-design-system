---
name: Map View
level: organism
status: draft
composes: [../molecules/list-item.md, ../molecules/segmented-control.md, ../molecules/empty-state.md, ../atoms/icon-button.md, ../atoms/tooltip.md, ../atoms/icon.md, ../atoms/skeleton.md]
tokens:
  # container
  map-view-container-background: '{colors.color-fill-sunken}'
  map-view-container-border-color: '{colors.color-line-default}'
  map-view-container-border-width: '{stroke.stroke-thin}'
  map-view-container-radius-rounded: '{radius.radius-element-md}'
  map-view-container-radius-sharp: '{radius.radius-none}'
  map-view-container-min-height: '{primitives.scale-container-0}'
  # list panel
  map-view-list-width: '{primitives.scale-container-0}'
  map-view-list-background: '{colors.color-fill-default}'
  map-view-list-border-color: '{colors.color-line-subtle}'
  # floating controls and key (a backing surface over the map)
  map-view-overlay-background: '{colors.color-fill-elevated}'
  map-view-overlay-border-color: '{colors.color-fill-transparent}'
  map-view-overlay-border-width: '{stroke.stroke-thin}'
  map-view-overlay-radius: '{radius.radius-element-md}'
  map-view-overlay-shadow: '{shadow.shadow-small}'
  map-view-overlay-padding: '{space.space-sm}'
  map-view-overlay-gap: '{space.space-2xs}'
  map-view-overlay-inset: '{space.space-md}'
  # marker
  map-view-marker-size: '{control.control-sm}'
  map-view-marker-target-size: '{control.control-target-min}'
  map-view-marker-background: '{colors.color-fill-default}'
  map-view-marker-border-color: '{colors.color-line-strong}'
  map-view-marker-border-width: '{stroke.stroke-thin}'
  map-view-marker-radius: '{radius.radius-pill}'
  map-view-marker-icon-size: '{icon.icon-size-small}'
  map-view-marker-icon-foreground: '{colors.color-ink-high}'
  map-view-marker-icon-foreground-warning: '{colors.color-status-warning-default}'
  map-view-marker-icon-foreground-error: '{colors.color-status-error-default}'
  map-view-marker-border-color-selected: '{colors.color-line-selection}'
  map-view-marker-border-width-selected: '{stroke.stroke-thick}'
  map-view-marker-background-selected: '{colors.color-fill-selection}'
  map-view-marker-foreground-stale: '{colors.color-ink-medium}'
  # cluster
  map-view-cluster-size: '{control.control-md}'
  map-view-cluster-background: '{colors.color-fill-inverse}'
  map-view-cluster-foreground: '{colors.color-ink-inverse}'
  map-view-cluster-font: '{typography.type-label-medium}'
  map-view-cluster-border-color: '{colors.color-fill-default}'
  map-view-cluster-border-width: '{stroke.stroke-thick}'
  # shaded regions (amount: one colour, low to high; never data-1 or data-11)
  map-view-region-background-low: '{colors.color-fill-sunken}'
  map-view-region-background-high: '{colors.color-data-2}'
  # key
  map-view-key-title-font: '{typography.type-label-small}'
  map-view-key-label-font: '{typography.type-body-xsmall}'
  map-view-key-foreground: '{colors.color-ink-high}'
  map-view-key-swatch-size: '{primitives.scale-6}'
  # last updated
  map-view-note-font: '{typography.type-body-xsmall}'
  map-view-note-foreground: '{colors.color-ink-medium}'
  # focus
  map-view-focus-ring-width: '{stroke.stroke-thick}'
  map-view-focus-ring-color: '{colors.color-line-focus}'
---

# Map View

> A map of located things, with status markers that cluster when dense, floating map controls and a key, kept in step with a list of the same items.

## Anatomy
1. Container — a `--map-view-container-border-width` `--map-view-container-border-color` frame with `--map-view-container-radius-rounded` corners, at least `--map-view-container-min-height` tall (draft placeholder). `--map-view-container-background` shows while the base map loads. The base map (tiles, roads, floor plan) comes from the product's map library and isn't tokenised here.
2. List panel — a list of the same items beside the map at expanded, `--map-view-list-width` wide on `--map-view-list-background`, separated by a `--map-view-container-border-width` `--map-view-list-border-color` rule. Each row is a [List Item](../molecules/list-item.md): name, status and when its position was last updated. At compact and medium the list and map are two views of one collection, switched by a [Segmented Control](../molecules/segmented-control.md) (Map | List) ([patterns 10.91](../patterns/10-data-display.md), [10.93](../patterns/10-data-display.md)).
3. Marker — a `--map-view-marker-size` circle (`--map-view-marker-radius`) on `--map-view-marker-background` with a `--map-view-marker-border-width` `--map-view-marker-border-color` edge, holding a `--map-view-marker-icon-size` [Icon](../atoms/icon.md) for the item's kind or status. Its hit area is `--map-view-marker-target-size`. Each marker is a button.
4. Cluster — a `--map-view-cluster-size` circle on `--map-view-cluster-background` with a `--map-view-cluster-border-width` `--map-view-cluster-border-color` ring, showing the count in `--map-view-cluster-font` `--map-view-cluster-foreground`. Choosing it zooms in to split it.
5. Map controls — a column of [Icon Buttons](../atoms/icon-button.md), subtle, on an overlay surface at the trailing edge: zoom in (`zoom_in`), zoom out (`zoom_out`), my location (`my_location`), layers (`layers`, optional).
6. Key (optional) — an overlay surface at the leading bottom corner: a title in `--map-view-key-title-font` and, for each class, a `--map-view-key-swatch-size` swatch or the marker glyph beside its label in `--map-view-key-label-font` `--map-view-key-foreground`. A shaded map lists the lowest value, the highest and each class boundary ([patterns 10.94](../patterns/10-data-display.md)).
7. Overlay surface (controls and key) — `--map-view-overlay-background` with `--map-view-overlay-radius` corners, `--map-view-overlay-shadow`, a transparent `--map-view-overlay-border-width` `--map-view-overlay-border-color` border that shows in forced colours, padded `--map-view-overlay-padding`, parts `--map-view-overlay-gap` apart, `--map-view-overlay-inset` from the map's edges.
8. Tooltip — a [Tooltip](../atoms/tooltip.md) on marker hover or focus: the place or item name and its value or status.
9. Note — "Positions updated 10:42" in `--map-view-note-font` `--map-view-note-foreground`, in the key or under the map. Positions older than the product's freshness limit are marked out of date ([patterns 4.60](../patterns/04-states-feedback.md)).

## Variants
| Type | Shows | Use |
|---|---|---|
| markers (default) | one marker per located thing, clustering when dense | devices, stores, vehicles, people |
| tracked | one marker per asset, clustering off | each asset is followed individually ([patterns 10.93](../patterns/10-data-display.md)) |
| shaded | regions shaded by a rate, from `--map-view-region-background-low` (closest to the background) to `--map-view-region-background-high` (strongest contrast), class steps mixed between them, with the key | rates per region, never counts ([patterns 10.92](../patterns/10-data-display.md)) |

Shading shows an amount, so it uses one data colour from closest to the background to strongest contrast, in every theme ([patterns 10.66](../patterns/10-data-display.md)). Shape: rounded (default) → `--map-view-container-radius-rounded`; sharp → `--map-view-container-radius-sharp`. In the AAA modes the component is always sharp (DESIGN.md §5).

## States
| Part | State | Treatment |
|---|---|---|
| Marker | enabled | `--map-view-marker-icon-foreground` glyph for the item's kind |
| | warning / error | the severity glyph (`warning`, `error`) in `--map-view-marker-icon-foreground-warning` / `--map-view-marker-icon-foreground-error`; the tooltip and list row carry the word ([patterns 10.40](../patterns/10-data-display.md)) |
| | stale | glyph `--map-view-marker-foreground-stale`, and the tooltip and row read "Last seen 3 h ago" ([patterns 10.79](../patterns/10-data-display.md)) |
| | hover / focused | Tooltip shows; focused adds the `--map-view-focus-ring-width` `--map-view-focus-ring-color` ring |
| | selected | `--map-view-marker-border-width-selected` `--map-view-marker-border-color-selected` ring and `--map-view-marker-background-selected`; its list row is selected too, and the reverse |
| Cluster | hover / focused | focused takes the same ring; a cluster holding a warning or error item shows that severity's glyph beside the count |
| Map | loading | the frame on `--map-view-container-background`; the list shows [Skeleton](../atoms/skeleton.md) rows |
| | empty | an [Empty State](../molecules/empty-state.md), compact, over the map: "No devices in this area" |
| | error / offline | Empty State, Can't show, with Retry; the list keeps its last data and its time |

Only conditions that need a response are marked; a normal marker carries no status colour ([patterns 10.41](../patterns/10-data-display.md)). Panning and zooming follow the person's gesture. Programmatic moves (centring on a selected item) are a cut under reduced motion.

## Spacing & Sizing
Measurements are provisional: the component has no Figma source yet. `--map-view-container-min-height` and `--map-view-list-width` are draft placeholders on the closest existing step.

| Part | Value |
|---|---|
| Container | fills its width; at least `--map-view-container-min-height` tall |
| List panel | `--map-view-list-width` at expanded; full width as its own view at compact and medium |
| Marker | `--map-view-marker-size` drawn, `--map-view-marker-target-size` hit area |
| Cluster | `--map-view-cluster-size` |
| Overlays | `--map-view-overlay-padding`, `--map-view-overlay-gap` between controls, `--map-view-overlay-inset` from the edges |

## Properties
| Property | Options | Default |
|---|---|---|
| Type | markers, tracked, shaded | markers |
| List | beside (expanded), switch (compact, medium), off | beside / switch by size class |
| Clustering | on / off | on (off for tracked) |
| Map controls | zoom, my location, layers (each on / off) | zoom, my location |
| Key | on / off | on for shaded |
| Shape | rounded, sharp | rounded |
| Items | name, position, kind, status, last updated | — |
| State | default, loading, empty, error | default |

## Usage
- Use a map only when where things are matters more than their values; for exact comparison, give a table or chart, or offer one beside it ([patterns 10.91](../patterns/10-data-display.md)).
- Markers show counts and located things; shading shows rates ([patterns 10.92](../patterns/10-data-display.md)).
- Keep the list and map in step: selecting a marker selects its row, and selecting a row centres and selects its marker ([patterns 10.93](../patterns/10-data-display.md)).
- Turn clustering off where each asset is tracked individually.
- Show when positions were last updated, and mark estimates as approximate ([patterns 10.104](../patterns/10-data-display.md)).
- Composed parts (List Item, Icon Button, Segmented Control, Tooltip, Empty State, Skeleton) bring their own states, sizes and focus rings.

## Accessibility
- The list is the map's text alternative: every marker's item is in it with the same name, status and time, reachable without the map.
- The map is one focusable region named for what it shows ("Device locations, Store 12"); inside it, Tab moves through markers in list order, and arrow keys pan when the map itself is focused.
- Markers and clusters are buttons named in full ("Printer 4, needs attention, updated 10:42"; "Cluster, 12 devices, 1 offline"). Selection is exposed with `aria-pressed`.
- Status is a glyph and a word, never colour alone; the stale state is in words.
- Zoom and pan have buttons and keys; no pinch or drag is the only way ([patterns 6.82](../patterns/06-accessibility.md), [6.83](../patterns/06-accessibility.md)).
- Markers meet the touch minimum through their hit area, even where the drawn circle is smaller; the list is their other way in ([patterns 6.20](../patterns/06-accessibility.md)).

## Claude Prompt
Draw a store floor map in a frame with a thin `--map-view-container-border-color` border and `--map-view-container-radius-rounded` corners. On the left at expanded, a white list panel `--map-view-list-width` wide of device rows, each with a name, a status word and "Updated 10:42". On the map, small white circular markers with a thin grey edge and a printer glyph; one marker shows an amber warning glyph (`--map-view-marker-icon-foreground-warning`); the selected marker has a thick blue ring (`--map-view-marker-border-color-selected`) and its list row is highlighted. A dark circle (`--map-view-cluster-background`) reads "12". At the right edge, a white floating column (`--map-view-overlay-background`, `--map-view-overlay-shadow`) of zoom in, zoom out and my-location icon buttons. At the bottom left, a small key on the same surface and a grey note "Positions updated 10:42".
