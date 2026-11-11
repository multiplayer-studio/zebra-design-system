---
name: create-template
description: Write an atomic-design template for the Zebra Design System, a page-level layout doc in templates/<template-name>.md built only from existing atoms, molecules and organisms. Use when the user asks to create, save or write a template, or says yes to an offer to save a prototype's layout as a template. Also use when they ask to turn an existing screen, page or prototype (from this repo or another codebase) into a template.
---

# Create a template

A **template** is the atomic-design level above organisms: a page-level layout (regions, and the components that fill them) with placeholder content. It's a Markdown doc, not a prototype. Prototypes stay in `prototypes/`. Templates belong to the project this kit was made for, and sit flat in `templates/`. `PROTOTYPING.AGENTS.md` (Templates) says when to offer one; this skill says how to write it.

## 1. Gather

1. **The source.** This is a prototype in `prototypes/`, a screen in another codebase, or the user's description. Read all of it first. For a codebase, trace the page from its route down to every child component it renders. Include optional regions, empty and loading states, and anything that only appears on selection or hover.
2. **The template name.** Use a short, hyphenated name for the pattern, not for one screen: `table-page`, not `wifi-presets`.
3. **Existing templates.** Check `templates/`. If one already covers this layout, offer to update it instead of writing a second.

## 2. Map every part to a component

For each region of the source, find the component that fills it in `atoms/`, `molecules/` or `organisms/`, and read that file. For a composite, also read every file in its `composes:` list. Note:
- the exact variant, flavor, size, shape and type the source uses, picked only from what the component file lists;
- whether the component is a draft (`status: draft`, † in `DESIGN.md` §8);
- icon names, which must be keys in `icons.json`.

**Never invent a component.** If a part has no matching component, keep the region in the template, describe its contents using existing components, and state in bold that its container is not a design-system component, so prototypes treat it as a placeholder. Tell the user in your reply too. Where the source uses something close but different (e.g. a status label used as a removable chip), use the right design-system component and say what you swapped.

## 3. Write `templates/<template-name>.md`

Use the format of the component files:

```markdown
---
name: <Title Case Name>
level: template
status: draft
composes: [../organisms/<file>.md, ../molecules/<file>.md, ../atoms/<file>.md]
---

# <Name>

> One sentence: what the page is for and what it holds.

Where it came from (prototype path or source codebase and component), and what kinds of screen use it.

## Anatomy
## Layout
## Responsiveness
## Accessibility
## Usage
```

- **Frontmatter.** `composes:` lists every organism, molecule and atom named anywhere in the doc, with paths relative to the template file. Add a `tokens:` block only for layout values the template itself owns, and write them as references (`'{spacing.spacing-large}'`). Never write a raw value.
- **Anatomy.** Number the regions in reading order. For each, give the component as a link, with its variant, flavor, size and shape (e.g. "[Icon Button](../atoms/icon-button.md) `refresh`, flavor outline, size medium, shape rounded"). Mark optional regions and say when they appear. Include the empty, loading and selection states the source has. End with: "The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them."
- **Layout.** Start with an ASCII wireframe whose numbers match Anatomy. Then describe the page grid, region order, gaps, padding, and which region scrolls. Use only semantic `spacing` and `layout` tokens (`--grid-margin`, `--spacing-*`), written as references. Never use pixels, colours or component tokens.
- **Responsiveness.** Required. Cover:
  - the large-screen layout (the default) and what changes at or below `--breakpoint-mobile-max`;
  - navigation: the global header and left rail on large screens, the top app bar and bottom sheet on handhelds (`DESIGN.md` §6, Adaptive navigation);
  - for each region, whether it stays, stacks, wraps, collapses into a menu, becomes full width or is hidden, and what replaces anything that's hidden;
  - how wide content behaves (e.g. a table scrolls horizontally inside its region, with the first column pinned if the source pins it);
  - touch: on handhelds, controls are at least `--touch-target-min` and recommended `--touch-target-recommended`; call out any composed size that falls below this (e.g. small icon buttons) and how to give it a bigger hit area.

  If the source has no small-screen design, say so, and give the behaviour that follows from `DESIGN.md` §6 as a proposal for the designer to confirm.
- **Accessibility.** Required. Cover:
  - landmarks and headings: which region is `header`, `nav`, `main`, and so on; one `h1` (the page title), and the heading level of each section below it;
  - focus order: it follows the reading order of Anatomy; where focus goes when a region appears or disappears (dialogs, action bars, empty states); nothing traps focus except modal dialogs;
  - keyboard: how to reach and use every interactive region, including menus, tabs, selection and row actions;
  - names and announcements: every icon-only control has an accessible label (name each one); live changes such as result counts, selection counts, loading and errors are announced; the current page or tab is announced;
  - never colour alone: the states in the template (selected, sorted, filtered, status) each have a non-colour cue;
  - anything the composed components already handle, and that the template must not break, as links to their Usage sections, not restated.
- **Usage.** When to use the template and when not to; rules for the content (one primary action per area, how many tabs, etc.); the draft components it uses, with a note that their measurements are placeholders; and "Prototypes using this template:" with paths, or "none yet".

## 4. Check before finishing

- [ ] Every component in the doc exists and is listed in `composes:`, and every `composes:` path resolves.
- [ ] Every variant, size, shape and type is one the component file lists. Every icon is a key in `icons.json`.
- [ ] Layout and Responsiveness use only `spacing` and `layout` token references. There are no raw values.
- [ ] Responsiveness and Accessibility sections are present and specific to this layout, not generic.
- [ ] Missing components and draft components are flagged in the doc and in your reply.
- [ ] Nothing was written to `prototypes/`.

Then tell the user the template's path, give a one-line summary of its regions, and list anything you flagged. Remind them that to share it, they give the file to their project's developer, who adds it to `templates/` in the project repo's design-system folder; from there it reaches the design system and every later kit for the project.
