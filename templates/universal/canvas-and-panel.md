---
name: Canvas and Panel
level: template
status: draft
composes: [../../organisms/bottom-sheet.md, ../../organisms/global-header.md, ../../organisms/map-view.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/right-drawer-panel.md, ../../organisms/top-app-bar.md, ../../molecules/empty-state.md, ../../molecules/filter-selection-bar.md, ../../molecules/list-item.md, ../../molecules/segmented-control.md, ../../atoms/button.md, ../../atoms/filter-chip.md, ../../atoms/icon-button.md, ../../atoms/skeleton.md, ../../atoms/status-label.md]
---

# Canvas and Panel

> Spatial or document work: a large canvas (a map, floor plan, document or camera view) beside a narrower panel listing what to do about it, each panel item linked to its place on the canvas.

Use it for site maps with devices, floor plans with zones, a document under review with its comments, or an image with its findings ([patterns 1.30](../../patterns/01-screen-composition.md)).

## Anatomy
1. **Header.** [Top App Bar](../../organisms/top-app-bar.md) at compact; [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) from medium.
2. **Global navigation.** [Navigation Bar](../../organisms/navigation-bar.md) at compact, [Navigation Rail](../../organisms/navigation-rail.md) from medium. The product may hide it while the canvas is a full-screen task the person entered on purpose ([patterns 2.10](../../patterns/02-navigation-flow.md)).
3. **Canvas toolbar.** Directly above the canvas ([patterns 1.83](../../patterns/01-screen-composition.md)): the view title at the leading end; at the trailing end, view controls as [Icon Button](../../atoms/icon-button.md)s flavour subtle, size medium (`layers`, zoom, `refresh`), and a [Segmented Control](../../molecules/segmented-control.md) flavour text only for switching Map and List where the panel isn't visible. Optional [Filter Selection Bar](../../molecules/filter-selection-bar.md) of [Filter Chip](../../atoms/filter-chip.md)s below it.
4. **Canvas.** [Map View](../../organisms/map-view.md) with markers and clusters, or the product's document or image surface. It takes the larger share of the width and scrolls and zooms inside its own region only ([patterns 5.34](../../patterns/05-sizes-devices.md)). **Where the canvas is a document or image rather than a map, its surface is not a design-system component; prototypes treat it as a placeholder.**
5. **Panel.** [Right Drawer Panel](../../organisms/right-drawer-panel.md) variant persistent from expanded, titled for what it lists ("Devices on this floor", "Findings"). It holds [List Item](../../molecules/list-item.md) rows, each with a leading type mark, the identifier, one line of location or reason, and a trailing [Status Label](../../atoms/status-label.md). Exceptions sit first, by severity then age ([patterns 1.138](../../patterns/01-screen-composition.md)). The panel's one primary action, if any, is a [Button](../../atoms/button.md) flavour primary in its footer.
6. **Selected item detail** (when a panel item or a marker is chosen). The panel row expands or the panel shows that item's detail with back to the list; the marker is highlighted on the canvas ([patterns 1.30](../../patterns/01-screen-composition.md)).

**Linking.** Choosing a panel row highlights and, if needed, pans to its marker; choosing a marker selects and scrolls to its row. Both stay marked while selected ([patterns 2.13](../../patterns/02-navigation-flow.md)).

**States.**
- Loading: the canvas shows its own loading; the panel shows [Skeleton](../../atoms/skeleton.md) rows ([patterns 4.16](../../patterns/04-states-feedback.md)).
- Nothing in view: [Empty State](../../molecules/empty-state.md) type No results, compact on, in the panel, with the active filters still shown.
- Canvas can't load (offline, tiles unavailable): Empty State type Can't show in the canvas region with Retry; the panel's list still works ([patterns 4.34](../../patterns/04-states-feedback.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Expanded and large                                   Compact
┌──────────────────────────────────────────────┐     ┌──────────────────┐
│ 1 Header                                     │     │ 1 Header         │
├───┬──────────────────────────────┬───────────┤     ├──────────────────┤
│ 2 │ 3 Title      [Layers][Zoom]  │ 5 Panel   │     │ 3 Title [Map|List]│
│   ├──────────────────────────────┤ title     │     ├──────────────────┤
│   │                              │ ● Row  ⚠  │     │ 4 Canvas         │
│   │ 4 Canvas        ◉            │ ● Row  ✓  │     │       ◉          │
│   │          ◉            ◉      │ ● Row  ✓  │     │                  │
│   │                              │           │     ├══════════════════┤
│   │                              │ [Primary] │     │ 5 Sheet: rows    │
└───┴──────────────────────────────┴───────────┘     ├──────────────────┤
                                                     │ 2 Navigation bar │
                                                     └──────────────────┘
```
- The canvas runs the full width of the content area without the page margin cap ([patterns 5.11](../../patterns/05-sizes-devices.md)); the toolbar above it uses the page margin.
- Panel rows are separated by `--space-md`; the panel's content is padded `--space-lg`.
- The page doesn't scroll. The canvas pans and zooms in its region; the panel scrolls on its own.

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): the canvas fills the content area. The panel becomes a [Bottom Sheet](../../organisms/bottom-sheet.md) content type generic, Height behaviour expandable: it opens part-way showing the first rows over the canvas and pulls up to full height ([patterns 5.17–5.18](../../patterns/05-sizes-devices.md)). Choosing a marker opens that item in the sheet. The toolbar's Map and List segmented control swaps the canvas for the list as a whole screen, which is also the alternative for small markers ([patterns 6.20](../../patterns/06-accessibility.md), [10.93–10.94](../../patterns/10-data-display.md)). [Navigation Bar](../../organisms/navigation-bar.md) at the bottom; toolbar actions beyond two move to overflow.
- **Medium** (from `--breakpoint-medium-min`): the canvas fills the content area; the panel is a [Right Drawer Panel](../../organisms/right-drawer-panel.md) variant modal opened from the toolbar, keeping the canvas visible behind it ([patterns 1.114](../../patterns/01-screen-composition.md)). [Navigation Rail](../../organisms/navigation-rail.md) Expanded false.
- **Expanded** (from `--breakpoint-expanded-min`): canvas and persistent panel side by side, the panel at about a third ([patterns 1.99](../../patterns/01-screen-composition.md)). The Map and List control is hidden because both are visible.
- **Large** (from `--breakpoint-large-min`): the rail is Expanded true; extra width goes to the canvas, never to the panel.
- **Touch.** Every target meets `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)). Markers smaller than `--control-target-min` are reached through the list ([patterns 6.20](../../patterns/06-accessibility.md)); clusters expand on tap. Toolbar icon buttons at size medium have a hit area of at least `--control-target-min`. Panning and zooming have on-screen controls as well as gestures ([patterns 6.82–6.83](../../patterns/06-accessibility.md)).

## Accessibility
- **Landmarks and headings.** `header`, `nav`, and `main` holding the canvas region (labelled with the view title) and the panel as a labelled `complementary` region. The view title is the `h1`; the panel title is `h2`.
- **Focus order.** Toolbar, then the panel's list, then the canvas. Opening a marker's item moves focus to that row or its detail heading; closing the sheet or panel returns focus to the marker or control that opened it ([patterns 6.29](../../patterns/06-accessibility.md)).
- **Keyboard.** The panel list is one stop with arrow keys between rows. The canvas is one stop; arrow keys pan, plus and minus zoom, and Tab moves through markers in the panel's order. Everything on the canvas can be done from the list ([patterns 6.37](../../patterns/06-accessibility.md)).
- **Names and announcements.** Icon buttons are named "Layers", "Zoom in", "Zoom out", "Refresh". Markers carry the item's identifier and status. Selection changes and the number of items in view are announced politely.
- **Never colour alone.** Marker status has a shape or glyph as well as colour; the selected marker and row have a ring or selected state, not only a tint ([patterns 6.11](../../patterns/06-accessibility.md)).
- See [Map View](../../organisms/map-view.md) and [Bottom Sheet](../../organisms/bottom-sheet.md) Usage for their own keyboard and gesture rules.

## Usage
- Use it when the place or position of things matters to the task. When it doesn't, a list or [List Detail](list-detail.md) is clearer.
- The canvas is the focal element; the panel holds at most one primary action.
- A multi-phase operation on something in the canvas stays on this screen; only the phase and progress change ([patterns 1.31](../../patterns/01-screen-composition.md)).
- Drafts: [Map View](../../organisms/map-view.md), [List Item](../../molecules/list-item.md), [Right Drawer Panel](../../organisms/right-drawer-panel.md), [Filter Selection Bar](../../molecules/filter-selection-bar.md), [Empty State](../../molecules/empty-state.md) and [Skeleton](../../atoms/skeleton.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
