---
description: Look up Zebra Design System components — what exists, when to use one, its API and rules
argument-hint: [component name or what you're trying to build]
---

The user wants component guidance for: $ARGUMENTS

Answer from this plugin's component catalog (the `docs/components/` folder inside this plugin — start at its README.md index), not from memory:

- If they named a component, read its catalog page and give the short version: what it's for, the key props, the do/don't that matters most, and anything from States or Accessibility they're likely to trip on.
- If they described a need ("something to pick one of five options"), scan the index, propose the best-fitting component(s), and say why — including when the answer is "compose these two" rather than a single component.
- If nothing fits, say so plainly and suggest the nearest composition; never invent a component that isn't in the catalog.

If the project has the packages installed, prefer the AGENTS.md in `node_modules/@zebra-design-system/*` for API details — it matches the installed version, while this catalog matches the plugin version (see `docs/versions.json`).
