# @zebra-design-system/patterns

## 0.3.0

### Minor Changes

- Compositions are reference ideas, never rules, and the set starts again from empty. The seven screen recipes and the organisms drafted in 0.2.0 are removed, with their rows in `zebra.md`; `graph.json` ships with no recipes until new compositions are added. The spacing steps stay. The `zebra-ux-patterns`, `zebra-ux-audit` and `zebra-prototype` skills use a composition as a starting point to adapt when there is one, and compose from the numbered rules when there is none. An audit never reports a difference from a composition as a finding.

### Patch Changes

- READMEs: in the repository, the `zebra-pattern-ingest` skill adds rules and keeps the pattern files and compositions organised. No rule changed.

## 0.2.0

### Minor Changes

- Compositions: seven screen recipes by the person's job, the organisms they are built from and the spacing steps between them, as hand-edited Markdown in `compositions/`. Packaging writes them to `graph.json` with the Zebra binding, and guards every organism, neighbour, spacing step and rule number they name.
