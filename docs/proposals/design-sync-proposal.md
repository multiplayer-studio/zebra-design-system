# Figma-to-Code Sync: Proposal & Open Questions

## The ask

We're building a pipeline that keeps Figma and our component libraries (React, Flutter, and later native Android) in sync, so that any developer at Zebra can contribute components with AI assistance. The technical foundations are working, but the hard questions are about ownership and process rather than code, and right now one person is answering them. I'm asking the project team and design to weigh in on the open questions below, and to help decide who owns each one.

## Where we are

- **Tokens:** Figma variables are fetched and built into CSS and Dart. Components reference tokens rather than hard-coded values, so a colour or spacing change in Figma reaches code with no component edits.
- **Specs:** every Figma component is exported as structured JSON (every variant, with the raw value and token behind each property) plus a readable Markdown description. This is the contract between design and code.
- **AI skills:** Claude Code skills turn a Figma link into a component that follows our conventions. A local test run built 14 base-ui components, each with a Storybook story, for $9.34 (about 67 cents per component). It needed only two follow-up prompts to get right, one for icon buttons and one for gradient border radius, and both fixes were written back into the skills so the skills get better with each run.
- **Automation:** a GitHub workflow regenerates specs when design changes merge and can use AI to open PRs that patch components. Auto-merge is off. This proposal recommends scaling the AI patching back (see below).

## Proposed direction

1. **Anyone in the company can contribute, with AI help.** The specs and AI skills are there so any developer at Zebra, on any team, can build or update a component that follows our conventions. They're not a bot that changes code on its own.
2. **Figma owns how components look; code owns how they behave.** When the two disagree on looks, it goes back to design as a change request. Neither side overrides the other without saying so.
3. **Token changes flow through automatically.** Colour, spacing and type changes regenerate the CSS and Dart outputs (Kotlin later) with no component edits and no AI.
4. **Structural changes arrive as a PR showing the spec diff.** When the specs change, the pipeline could open a PR automatically that shows what changed (e.g. "Button gained `Flavour=warning`") and a developer implements it with AI assistance. AI doesn't patch code unattended.
5. **Nothing merges without human review.** Auto-merge stays off until we have automated visual comparison against Figma.
6. **One web library: base-ui (React).** zeta-web's only consumer is a React app, and base-ui is easier to maintain and work with in a React app. We keep maintaining zeta-web, plan to move that app over (timing to be agreed), and put new web work into base-ui.
7. **Targets: React, then Flutter, then native Android.** Flutter tokens are already exported. The components are the work.
8. **Clear ownership of review and conventions.** If anyone can contribute, someone has to own the conventions, the contribution guide and final review. Today that's one person, which is part of why this proposal asks for more people. Until there are more reviewers, contribution is limited by review capacity.

## Open questions

| # | Question | Why it matters | Who should answer |
|---|---|---|---|
| 1 | What's the process for code-side changes to reach design: a ticket, a Figma comment, a regular review? | Without a route back, each sync can quietly undo fixes made in code, and Figma drifts from what actually ships. | Design lead + developers |
| 2 | Who writes the behaviour spec (keyboard, focus, ARIA, events), and where does it live? | Figma only describes how a component looks. Anything generated from it alone looks right but behaves differently in every technology. | Developers, with design input |
| 3 | How do designers signal that a change is ready to sync: a published library version, a branch merge, or a manual trigger? | The pipeline can't tell a finished change from work in progress, so an unfinished design can end up in code. | Design team |
| 4 | Which Figma naming rules will design commit to? | Property names are effectively an API. Renaming one in Figma breaks the pipeline or silently changes components. | Design team + developers |
| 5 | When will a native Android library actually be needed, and who will use it? | It's a third library to build and maintain. Timing decides whether the specs and tokens need to support it now. | Product / project leads |
| 6 | Is AI-drafted, human-reviewed code good enough for our quality bar, and how do we measure that? | The direction above depends on AI drafts being a good starting point. We need an agreed way to check, not just a feeling. | Developers + project leads |
| 7 | How do we version breaking changes and tell the apps that use the libraries? | A renamed variant in Figma can become a breaking change in React and Flutter at the same time. | Developers + consuming app teams |
| 8 | What's the budget for AI use (local and CI), and who owns it? | The test run cost $9.34 for 14 components. Cost grows with contributors and libraries. | Project leads |

## Risks

- **One maintainer.** Every library, skill and review currently goes through one person. If they're unavailable, everything stops.
- **Sync readiness.** Unfinished Figma work can reach code, and code-side fixes can fail to reach Figma. Both sides need a clear signal (see questions 1 and 3).
- **AI drift.** AI-written code without proper review becomes inconsistent across components and libraries over time.

## Next steps

1. Agree the look/behaviour ownership split with the design team.
2. Pilot: a developer who isn't involved in the design system builds one component with the AI skills, and we record where they get stuck.
3. Build Button in Flutter from the existing specs and tokens to prove the second target.
4. The project team agrees an owner for each open question at a follow-up session.
