# Spec writing guidance

Rules for writing or updating a spec so it stays buildable and lean. Found by the 2026-11-07 noise review ([spec-noise-corrections.md](spec-noise-corrections.md)); they extend, not replace, the zebra-figma-component-spec skill.

A spec earns a sentence only if it changes what someone builds or which variant they pick. Everything else is cost: it goes stale, it buries the tables, and it makes the next update slower.

## Rules

1. **extractionNote is one or two sentences** stating the slice the structure and colour were read over. No dates, no re-extraction history — git holds that.
2. **Issues list only what is still wrong in Figma.** When something is fixed, delete the entry. Code-implementation status ("built in <zds-button>", "pixel-identical") never belongs in a Figma spec.
3. **Say each thing once.** Per-value intent lives in `api.*.intent` and one md block. Other sections add only what that block doesn't: mechanics, exceptions, drift. If a sentence restates fields already listed, cut it.
4. **No intent row that only negates the prop name.** "No icon before the label." carries nothing; leave the `false` row of a boolean blank, in the metadata frame too.
5. **No resolved px outside measurements.** The token name is the value. A layout row that restates the size table with px added is a second source of truth — delete it or fix the metadata frame it was quoted from. Measurements keep their `Px` suffix and stay rare.
6. **Quote metadata only where it adds intent.** A quote that restates the structured anatomy facts beside it is dropped, verbatim rule notwithstanding — the rule protects meaning, not duplication.
7. **No per-spec rationale.** Why screenshots aren't stored, why values are tokens — that lives in the skill. Every spec uses the same one-line banner: *"Values are token names; they resolve in [tokens/](../../tokens/). Literals are measurements (suffixed Px) and the exceptions in Issues."*
8. **Bookkeeping must agree with itself.** One count per fact, shared notes stated once, issue numbers in order or absent, no column ("Duration") that is "—" in every row.
9. **Keep the load-bearing parts whole:** API table with defaults, variant tables (the deltas), structured anatomy, token lists, deep links, live issues. Brevity never trims a token name or an exception.

## When updating

Per the house rule, an update to a spec or metadata frame is as short as possible: one plain sentence per changed point, added where that fact already lives — never a new narrative section, never a dated note about the update itself.
