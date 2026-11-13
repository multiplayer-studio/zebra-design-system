# Testing the kit

This is a **testing kit**: the designer is trying the design system out. Unlike the other prototyping kits, **the designer may edit the design-system docs here**. Every edit they make is the feedback: log each one in `CHANGES.md` and file it to Jira as a Bug or a Story, so the design-system team can bring it into the master docs.

Where this file and `PROTOTYPING.AGENTS.md` disagree, this file wins in this kit.

## What gets filed

**Edits to the design-system docs, and nothing else:** the `DESIGN.md` frontmatter and body, and the component files in `atoms/`, `molecules/` and `organisms/`. For example, a changed token value, a new variant, state, size or token, a new component, or a fix to a doc that was wrong.

**Only documentation changes are logged and filed.** Nothing else is, even when it changed because of a doc edit.

These are not logged or filed:
- **Generated files and the starter:** `tokens.css`, `prototypes/_starter/`, `prototypes/showcase/` and `icons.json`. Regenerating them after a doc edit is housekeeping. Never mention them in an entry or a ticket, and never log a change made to them directly.
- **Changes to a prototype.** That's normal prototyping.
- **Templates.** They reach the design system through the project's repo (see Templates in `PROTOTYPING.AGENTS.md`).
- **Problems you spot without an edit.** When you find one (a missing or wrong token, docs that contradict each other, a component that renders differently from its doc), tell the designer and suggest the doc edit that would fix it. Only an edit the designer approves gets logged and filed.

## Making an edit

Make every edit yourself, when the designer asks for it or approves your suggestion. Follow **docs first, then generated files, then log**, in one piece of work:

1. **Edit the doc.**
   - A new value goes in the `DESIGN.md` frontmatter, in the right semantic group; raw values live nowhere else.
   - Component tokens point at it with a reference.
   - Update the component's tables and prose to match.
   - A new component gets a new file in the right level folder, in the same format as its neighbours, and a row in the `DESIGN.md` §8 index.
2. **Regenerate the generated files.** This kit ships the scripts in `scripts/`. Run them yourself, in this order:
   - `python3 scripts/tokens-css.py` writes `tokens.css`. If it lists token errors (an undefined reference, a component referencing a colour primitive or a component it doesn't compose, a duplicate name), fix the doc edit and rerun it;
   - `python3 scripts/starter-html.py` writes `prototypes/_starter/index.html` and the showcase.

   Never ask the designer to run them; they may need to click **Allow**. If Python 3 isn't installed, don't install it: tell the designer the edit is logged but won't show in prototypes until the next kit, and carry on.
3. **Refresh the prototypes that use it**, with the steps in Refreshing a prototype (`PROTOTYPING.AGENTS.md`).
4. **Log it** (below). Log the doc change only, not steps 2 and 3.

If the designer says they edited a doc by hand, ask what they changed and why, check that it follows the rules above, then regenerate and log it the same way.

## Log it

Add an entry to `CHANGES.md` at the kit root for every edit. Create the file the first time, starting with the `version` from the `DESIGN.md` frontmatter. One entry per edit:

```markdown
## YYYY-MM-DD: <short title>
- Type: fix | token change | new token | new variant | new component | context override
- Files: atoms/button.md, DESIGN.md (frontmatter: colors)   (docs only)
- Change: <what changed, before → after, e.g. "button-container-height-large: '{control.control-lg}' → '{primitives.scale-16}'">
- Why: <the designer's reason, in one or two sentences>
- Prototype: prototypes/<name>/ (ticket: PROJ-123 | none)
- Acceptance criteria: <how the master docs look once a developer has adopted it, e.g. "atoms/button.md lists a `large` size with its height token">
- Jira: unfiled
```

## File it

At the next natural stopping point (after finishing the designer's request, never mid-task), file every entry still marked `Jira: unfiled`:

1. Ask with the question prompt (see Asking the designer in `PROTOTYPING.AGENTS.md`): "File these design-system edits to Jira?" Make it a multi-select with one option per entry (its title), all of them recommended. File the ones the designer keeps, and mark the rest `Jira: dropped`. If there are more than four, ask in batches of four.
2. **Check for a duplicate** with `jira_search_issues`:
   `project = UX AND component = Agentic AND labels = prototyping-feedback AND statusCategory != Done AND text ~ "<two or three key words>"`.
   If an open ticket covers the same change, call `jira_add_comment` on it with this entry's details, and mark the entry `Jira: <KEY> (commented)`.
3. **Otherwise create one ticket per entry** with `jira_create_issue`:
   - `projectKey`: `UX`
   - `issueType`: `Bug` when the doc was wrong (Type `fix`), `Story` for anything that changes or adds to the design
   - `summary`: the entry's title
   - `description`: the `DESIGN.md` version, then the entry's Files, Change, Why and Prototype (with its ticket key, if any). Describe only the doc change.
   - `assignee`: `DE7924`
   - `components`: `["Agentic"]`
   - `labels`: `["prototyping-feedback"]`
   - no priority
   - `customFields`, for a **Bug** only (Jira rejects a Bug without them; leave them off a Story):
     ```json
     {
       "customfield_13003": { "value": "Dog food test" },
       "customfield_13002": { "value": "Common" },
       "customfield_13605": { "value": "Unknown" },
       "customfield_13005": "<the entry's Acceptance criteria>"
     }
     ```
     These are Source, OS Version, Release Found In and Acceptance Criteria. For a Story, put the acceptance criteria at the end of the description instead.

   Mark the entry `Jira: <KEY>`.
4. Tell the designer the keys as links: `https://jira.zebra.com/browse/<KEY>`.

**If the Jira tools aren't available** (no tools, or a call fails with an auth or connection error): leave the entries `Jira: unfiled`, give the designer the setup steps in `PROTOTYPING.JIRA.md` once per conversation, and try again at the next stopping point.
