# Spec noise review — correction list

Reviewed 2026-11-07, all 48 spec folders. Nothing was changed; each item below is a correction to apply.
The companion rules are in [spec-writing-guidance.md](spec-writing-guidance.md).

Tooling reads only `component.source` and `api` from the JSON (visual-audit, api-coverage, figma-status, catalog). Everything else is read by people and by Claude during builds, so prose that doesn't help build or choose a variant is pure cost.

## The patterns

**P1 — extractionNote is a process diary.** 30 specs carry notes over 400 chars (input 1989, button 1277, select 1243) narrating how and when each re-extraction was sliced ("Re-extracted 2026-10-18 the same way… plus a full scan…"). A builder needs one sentence: what slice the structure and colour were read over. Extraction history is git's job.
*Correction: cut each to one or two sentences stating the slice; delete the dated history.*

**P2 — issues used as a changelog.** 12 specs keep resolved items and code-implementation status in `issues`: button's "Code: gradient transition built… Web and React were compared in a browser: pixel-identical", "Resolved 2026-10-29: the flavours are renamed". A spec's issues list is what is still wrong in Figma. Done work lives in git and in the component's own code.
*Correction: delete resolved entries and all "Code:" status entries; keep only live blockers/warns/notes about the file.*

**P3 — the same intent text three times.** The per-value intent sits verbatim in `api.*.intent` (JSON), again in the md's "Per-value intent (verbatim)" section, and a third time paraphrased across "Content & slots", "States" and "Layout & theming intents" (button's icon-slot mechanics appear in four places). One verbatim copy is the rule; three is drift waiting to happen.
*Correction: md keeps one per-value intent block; the other md sections state only what that block doesn't (mechanics, exceptions).*

**P4 — zero-information intent rows.** 15 specs carry intent strings that only negate the prop name: "No icon before the label.", "The control accepts input.". They add bytes, not meaning.
*Correction: drop them from the spec; fix upstream by not writing them in the metadata frame (the `false` row of a boolean needs no sentence).*

**P5 — resolved px restated despite the token banner.** Nearly every md opens with "values are token names, resolved values live in tokens/" and then the "Layout & theming intents" table restates them resolved: "36px at small (control/sm)", "4px (radius/element-sm)", "label/small, which is IBM Plex Sans Medium at 12 over a 16px line". That is the second source of truth the banner forbids, and it goes stale when a palette or ramp changes.
*Correction: where a layout row only restates the size/shape tables with px added, delete the row; where the px came from the metadata frame, fix the frame. Affects ~35 specs.*

**P6 — anatomy facts followed by a quote saying the same.** Each md anatomy entry lists the structured facts (direction, padding, fill, radius, hug) and then quotes the metadata sentence restating exactly those facts (tooltip's Bubble: facts, then "A horizontal auto-layout that hugs the label and carries the fill, the corner radius and the shadow."). The quote earns its place only when it says something the fields can't.
*Correction: keep the quote only where it adds intent; otherwise the structured line stands alone.*

**P7 — boilerplate rationale restated per spec.** Button's Visual reference section re-argues why screenshots aren't stored ("a stored PNG goes stale silently, where a link never does") — that reasoning lives in the extraction skill and doesn't help build anything. The "Values are token names" banner also exists in three wordings.
*Correction: visual reference is links only; one standard one-line banner for every spec.*

**P8 — duplicated and stale bookkeeping.** Identical `_boxNote`/`_note` strings repeated on sibling parts (button's leading and trailing icon, bySize note restating the icon pinning a third time); issue numbering out of order (button runs …9, 10a, 18, 19, 10, 11… 23 — 9 specs); conflicting variant counts inside one file (button's extractionNote says 495, then "all 405 variants" three times). Stale numbers are worse than verbose ones.
*Correction: state a shared note once; renumber or drop issue numbers; make counts agree.*

Minor: the States tables carry a Duration column that is "—" in every row of every spec. Drop the column until something fills it.

## Per-spec flags

Figures are json/md size. Flags: EN = P1 extractionNote (chars), ST = P2 status issues (count), ZI = P4 empty intents, PX = P5 px literals in the layout table, V = P3 "(verbatim)" duplicate block in md, N# = P8 numbering disorder, DN = P8 duplicate notes, RB = P7 rationale boilerplate.

| Spec | Size | Flags |
|---|---|---|
| button | 68K/36K | EN 1277, ST 3, ZI 3, PX 21, V, N#, DN, RB |
| icon-button | 51K/30K | EN 963, ST 2, ZI 1, PX 10, V, N# |
| select | 75K/40K | EN 1243, ZI 1, PX 6, V, N# |
| search | 41K/21K | EN 979, ST 1, ZI 1, PX 7, DN |
| accordion | 46K/25K | EN 908, PX 8, V, N# |
| table | 73K/43K | EN 674, ZI 5, PX 11, V |
| input | 67K/33K | EN 1989, ZI 1, PX 6 |
| navigation-rail | 70K/34K | EN 1090, PX 20 |
| avatar | 33K/20K | EN 820, PX 26, V |
| card | 44K/20K | EN 1164, V, N# |
| progress-bar | 24K/14K | EN 464, ST 1, ZI 1, PX 12 |
| assist-chip | 27K/15K | EN 621, ZI 1, PX 11 |
| stepper-input | 21K/10K | ST 1, ZI 1, PX 17 |
| icon | 21K/14K | EN 527, PX 19, N# |
| dropdown | 45K/22K | ZI 1, PX 6, N# |
| system-banner-desktop | 27K/19K | ST 1, PX 13, V |
| system-banner-mobile | 25K/18K | ST 1, PX 8, V |
| dialog | 35K/15K | PX 14 |
| switch | 26K/14K | ST 1, PX 11 |
| navigation-rail-item | 28K/16K | EN 616, ZI 1, PX 11 |
| sub-menu-item | 29K/17K | EN 606, ZI 1, PX 11 |
| navigation-item | 17K/10K | EN 517, ZI 1, PX 10 |
| input-chip | 18K/12K | PX 10 |
| filter-chip | 18K/12K | PX 9 |
| navigation-bar | 25K/14K | EN 650, ZI 1, PX 8 |
| radio-button | 21K/12K | EN 550, ST 1, PX 7 |
| tooltip | 18K/10K | PX 7 |
| stepper | 61K/32K | PX 5, N# |
| snackbar | 29K/21K | ST 1, V |
| segmented-control | 34K/19K | EN 540, N# |
| slider | 35K/18K | EN 497, ST 1, PX 3 |
| screen-header-bar | 24K/13K | EN 517, PX 3 |
| notification-item | 29K/18K | EN 601, ZI 1 |
| inline-banner | 25K/12K | ZI 2 |
| avatar-rail | 25K/15K | EN 586 |
| button-group | 30K/15K | EN 513 |
| badges/priority-pill | 19K/13K | EN 476 |
| checkbox | 23K/15K | EN 475 |
| bottom-sheet | 31K/20K | DN 2 |
| global-header | 27K/17K | DN 1 |
| badges/label | 15K/11K | PX 4 |
| pagination | 18K/9K | PX 3 |
| progress-circle | 19K/12K | PX 3 |

Clean (no flags): breadcrumb, phone-input, top-app-bar, badges/status-label, badges/notification-indicator — these still carry P3/P6/P7 in milder form; the flags above are the measurable signatures only.

## What to keep

The variant tables (size, shape, flavour × state), the API table with defaults, the anatomy's structured facts, token lists, deep links, and live issues are exactly what builds a component — none of that is in scope. The per-value intent is useful and verbatim-by-rule; the correction is the triplication, not the text.
