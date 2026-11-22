# Using @zebra-design-system/patterns

Rules for how screens are composed and behave. They name no component and no
token, so they apply to any component system, Zebra or not.

- Start at `dist/manifest.json`. It is generated at packaging time and
  lists every pattern file (title, summary, sections, rule count) and every
  reference file. Never assume a file name: read the list from it.
- `dist/README.md` says which patterns a task needs.
- Pattern files are named NN-name.md. Each holds numbered rules; the bold
  sentence is the rule. A rule that starts "By default" may be overridden.
  Accessibility minimums (06) come before every other rule.
- `dist/terms.md` defines the words the rules use. `dist/zebra.md` maps
  them to Zebra components and tokens: read it only in a project built with
  a Zebra library. `dist/devices.md` lists Zebra devices.
- `dist/compositions/` holds compositions: reference ideas, never rules,
  for how a screen or an area of one can be put together. Use one as a
  starting point and adapt it; only the numbered rules are meant to be
  followed. Start at its README. The set may be empty. `dist/graph.json`
  is the same content as data, generated at packaging time: entry, recipes,
  edges between recipes, organisms, spacing steps and the Zebra binding.
- Refer to a rule by its number: `patterns 4.21` is rule 21 of file 04.
  Cite only numbers that exist.
- Run `npx zebra-patterns-skills` once to install the Claude Code skills
  `zebra-ux-patterns` (apply) and `zebra-ux-audit` (audit) into the
  project's .claude/skills. A Zebra library's `npx zebra-skills` installs
  them too.
