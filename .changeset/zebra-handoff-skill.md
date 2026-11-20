---
"@zebra-design-system/react-baseui": patch
"@zebra-design-system/web-components": patch
---

New `zebra-handoff` skill, installed by `npx zebra-skills`: hands a finished
prototype to developers as a build spec. It compares the page in
`prototypes/<name>/` with its last handoff (a copy kept in its `handoff/marks/`),
confirms the changes with the designer in one dialog, and writes a spec that
names each `zds-*` element as the app's library names it, with its props,
semantic tokens (with their value in each mode), states, behaviour, surfaces
and copy. The first handoff saves which library the app is built with in
`zebra-context/PROJECT.md`. `zebra-prototype` now keeps its page in
`prototypes/<name>/` so it can be handed off.
