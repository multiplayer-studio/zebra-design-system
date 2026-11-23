---
description: Give this project its own colours and font on the Zebra Design System — a generated theme that works in every mode
argument-hint: [brand colour, font, or what should change]
---

The user wants to theme this project: $ARGUMENTS

Use the `zebra-theme` skill from this plugin and follow it from step 1. The theming tool ships with this plugin at `tools/zebra-theme/bin/zebra-theme.mjs`, so it runs even when the Zebra packages are not installed in the project; when they are installed, the skill uses the project's own copy.

If no colour, font or source was given, ask what should change with the question prompt, as the skill's step 2 says. Never write theme values by hand.
