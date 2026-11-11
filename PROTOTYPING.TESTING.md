# Testing the kit

This is a **testing kit**: the designer is trying the design system out. Besides building prototypes, log every bug in the kit to `CHANGES.md` and file each one to Jira, so the design-system team can fix it.

## What counts

A **kit bug** is something in this kit that is wrong or missing, so you can't follow the docs faithfully. For example:
- a token that is wrong, missing, or doesn't match its doc;
- docs that contradict each other or leave a question unanswered;
- a broken `prototypes/_starter/index.html` or `tokens.css`;
- a component that renders differently from its doc;
- an icon, variant, state or component the design needs that the system doesn't have.

You can spot one yourself while building, and the designer can report one ("the tabs look wrong"). A designer's own design preference, or a change to their prototype, is not a kit bug.

## Log it

As soon as you find one, add an entry to `CHANGES.md` at the kit root. Create the file the first time, starting with the `version` from the `DESIGN.md` frontmatter. One entry per bug:

```markdown
## YYYY-MM-DD: <short title>
- Type: bug | missing
- Files: atoms/button.md, tokens.css
- Prototype: prototypes/<name>/ (ticket: PROJ-123 | none)
- Prompt: <what the designer asked for when it came up>
- Expected: <what the docs say should happen>
- Actual: <what happened instead>
- Jira: unfiled
```

Keep building; don't stop the designer's task for it. Work around the bug as `PROTOTYPING.AGENTS.md` says (flag it, never patch a token or a generated file).

## File it

At the next natural stopping point (after finishing the designer's request, never mid-task), file every entry still marked `Jira: unfiled`:

1. Say in one line: "Filing 2 kit bugs to Jira: <title>, <title>." File them unless the designer says no to one; mark that one `Jira: dropped`.
2. **Check for a duplicate** with `jira_search_issues`:
   `project = UX AND component = Agentic AND labels = prototyping-feedback AND statusCategory != Done AND text ~ "<two or three key words>"`.
   If an open ticket describes the same problem, call `jira_add_comment` on it with this entry's details, and mark the entry `Jira: <KEY> (commented)`.
3. **Otherwise create one ticket per entry** with `jira_create_issue`:
   - `projectKey`: `UX`
   - `issueType`: `Bug` if something is broken, `Story` if something is missing
   - `summary`: the entry's title
   - `description`: the `DESIGN.md` version, then the entry's Files, Prototype (and its ticket key, if any), Prompt, Expected and Actual
   - `assignee`: `DE7924`
   - `components`: `["Agentic"]`
   - `labels`: `["prototyping-feedback"]`
   - no priority

   Mark the entry `Jira: <KEY>`.
4. Tell the designer the keys as links: `https://jira.zebra.com/browse/<KEY>`.

**If the Jira tools aren't available** (no tools, or a call fails with an auth or connection error): leave the entries `Jira: unfiled`, give the designer the setup steps in `PROTOTYPING.JIRA.md` once per conversation, and try again at the next stopping point.
