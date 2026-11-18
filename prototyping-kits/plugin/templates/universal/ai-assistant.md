---
name: AI Assistant
level: template
status: draft
composes: [../../organisms/chat.md, ../../organisms/dialog.md, ../../organisms/global-header.md, ../../organisms/navigation-bar.md, ../../organisms/navigation-rail.md, ../../organisms/right-drawer-panel.md, ../../organisms/top-app-bar.md, ../../molecules/ai-suggestion.md, ../../molecules/connection-status.md, ../../molecules/inline-banner.md, ../../molecules/list-item.md, ../../molecules/message-input.md, ../../molecules/task-list.md, ../../atoms/ai-mark.md, ../../atoms/assist-chip.md, ../../atoms/button.md, ../../atoms/icon-button.md]
---

# AI Assistant

> Ask an AI to answer or do work: a conversation whose composer is the focal organism, answers marked as AI with their sources, plans shown before they run, and Stop always in the same place.

Use it for a product's one assistant entry point, either as a full page for work across the product or as a side panel beside the work ([patterns 9.1](../../patterns/09-ai.md), [9.7](../../patterns/09-ai.md)).

## Anatomy
1. **Header.** [Top App Bar](../../organisms/top-app-bar.md) at compact, title the assistant's name; [Global Header](../../organisms/global-header.md), Rounded off (sharp, full width; [Global Header Usage](../../organisms/global-header.md#usage)) from medium. In side-panel form, the panel's own title row.
2. **Global navigation** (full page only). [Navigation Bar](../../organisms/navigation-bar.md) at compact, [Navigation Rail](../../organisms/navigation-rail.md) from medium.
3. **Scope line.** One line under the title saying what the assistant can do here and what it acts on ("Answers about Store 214's devices. Uses your permissions.") ([patterns 9.7](../../patterns/09-ai.md), [9.92](../../patterns/09-ai.md)). Before a conversation, it also says the AI answers first and a person follows if needed, where hand-over exists ([patterns 9.82](../../patterns/09-ai.md)).
4. **Empty conversation** (before the first message). A short greeting and up to four suggestions directly above the composer ([patterns 1.33](../../patterns/01-screen-composition.md)). Suggestions that send a message are [Assist Chip](../../atoms/assist-chip.md)s, Colour neutral, Discardable off, Leading icon off; suggestions that start an action are [Button](../../atoms/button.md)s flavour outline, size small, with a leading icon. One "says", the other "does" ([patterns 1.37](../../patterns/01-screen-composition.md)).
5. **Conversation.** [Chat](../../organisms/chat.md) variant one-to-one with the assistant sender. History scrolls; the latest message sits directly above the composer ([patterns 1.133](../../patterns/01-screen-composition.md)). Each assistant message:
   - carries an [AI Mark](../../atoms/ai-mark.md) naming what it did ("Answered", "Drafted", "Summarised"), which opens the layered explanation ([patterns 9.8](../../patterns/09-ai.md), [9.19–9.21](../../patterns/09-ai.md));
   - shows sources next to the claims they support, labelled by what they are, a missing source shown as missing ([patterns 9.23–9.24](../../patterns/09-ai.md));
   - streams in place, the view staying at the start of the new output ([patterns 9.46](../../patterns/09-ai.md));
   - carries feedback (positive and negative [Icon Button](../../atoms/icon-button.md)s `like` and `dislike`, flavour subtle, size small) on the latest answer, and on focus or hover for earlier ones ([patterns 9.56](../../patterns/09-ai.md)).
6. **Plan and progress** (for work with several steps). A [Task List](../../molecules/task-list.md) inside the assistant's message: the plan first, with Approve (Button flavour primary), Edit step and Stop; once approved it becomes the progress, each step waiting, running, needs approval, failed, retried or done ([patterns 9.37–9.38](../../patterns/09-ai.md)). Work that costs money, reaches other people, affects safety or can't be undone shows a full preview with Confirm and Cancel first ([patterns 9.34–9.35](../../patterns/09-ai.md)).
7. **Proposed changes** (when the assistant changes a value in the product). [AI Suggestion](../../molecules/ai-suggestion.md) with accept, reject and undo, shown next to what it would change ([patterns 9.10–9.12](../../patterns/09-ai.md)).
8. **Follow-ups.** Up to three [Assist Chip](../../atoms/assist-chip.md)s between the latest answer and the composer ([patterns 1.133](../../patterns/01-screen-composition.md)).
9. **Composer.** [Message Input](../../molecules/message-input.md), the screen's focal organism ([patterns 1.33–1.35](../../patterns/01-screen-composition.md)). Every mode happens inside it: empty, typing, attachment open, listening, generating (Send becomes Stop in the same place), error with a way forward ([patterns 9.47](../../patterns/09-ai.md)). Context and scope controls go in its More Tools Slot, each labelled.
10. **Notices** (when needed). [Inline Banner](../../molecules/inline-banner.md) inside the conversation column for a limit, an offline condition or a failure, saying what's affected and what to do now ([patterns 9.50–9.54](../../patterns/09-ai.md)). Where the product works offline, [Connection Status](../../molecules/connection-status.md) in the shell shows the connection ([patterns 4.50](../../patterns/04-states-feedback.md)).
11. **Conversation list** (optional, large). Earlier conversations as [List Item](../../molecules/list-item.md) rows in a leading column, newest first, with a new-conversation [Button](../../atoms/button.md) flavour outline at its top.

**States.**
- Working: the assistant shows it's running at once, in the place its answer will appear, naming the work ("Checking 12 devices") ([patterns 9.44–9.45](../../patterns/09-ai.md)).
- Stopped: says what stopped, what was done and what happens to finished parts ([patterns 9.39](../../patterns/09-ai.md)).
- Failed or declined: says what failed and why in plain words, and offers another way, including doing it without AI ([patterns 9.50–9.52](../../patterns/09-ai.md)). After repeated failures it offers a person ([patterns 9.55](../../patterns/09-ai.md)).
- Confirmation pending: a [Dialog](../../organisms/dialog.md) is not used; the confirmation lives in the message, and never runs while the person is away ([patterns 9.97](../../patterns/09-ai.md)).

The composed components govern their own colours, states, sizes, radius and focus rings. The template only places them.

## Layout
```
Large (full page)                                      Compact
┌──────────────────────────────────────────────────┐   ┌──────────────────┐
│ 1 Header                                         │   │ 1 Assistant      │
├───┬───────────┬──────────────────────────────────┤   ├──────────────────┤
│ 2 │ 11 [New]  │ 3 Scope line                     │   │ 3 Scope line     │
│   │  Conv. ▌  │ 5  ┌ you ──────────────┐         │   │ 5 messages       │
│   │  Conv.    │    └───────────────────┘         │   │   …              │
│   │  Conv.    │ 5 ✦ Answered                     │   │   ✦ latest       │
│   │           │   answer text [source]           │   │ 8 [chip][chip]   │
│   │           │ 6 Plan: ✓ step ● step ○ step     │   ├──────────────────┤
│   │           │ 8 [Follow-up][Follow-up]         │   │ 9 Composer  [➤]  │
│   │           │ 9 [ Composer              ➤ ]    │   ├──────────────────┤
│   │           │                    ← capped →    │   │ 2 Navigation bar │
└───┴───────────┴──────────────────────────────────┘   └──────────────────┘
```
- The conversation column is capped at `--container-reading` and centred in the space beside the conversation list ([patterns 5.11](../../patterns/05-sizes-devices.md)).
- Messages sit `--space-lg` apart; parts within a message (mark, text, sources, feedback) `--space-sm`. Follow-ups sit `--space-md` above the composer.
- Before a conversation, the greeting, suggestions and composer sit together as the most prominent block of the column. Once there's a conversation, the history scrolls and the composer is pinned at the bottom of the column ([patterns 1.33](../../patterns/01-screen-composition.md)).

## Responsiveness
- **Compact** (below `--breakpoint-medium-min`): margins `--space-page`. The composer is pinned to the bottom, above the [Navigation Bar](../../organisms/navigation-bar.md), and rides on the keyboard when it opens, keeping the field and Send together ([patterns 5.54–5.55](../../patterns/05-sizes-devices.md)). The conversation list moves behind an icon button in the Top App Bar. In side-panel form the assistant opens full screen with back ([patterns 1.114](../../patterns/01-screen-composition.md)).
- **Medium** (from `--breakpoint-medium-min`): margins `--grid-margin`, [Navigation Rail](../../organisms/navigation-rail.md) Expanded false. Side-panel form is a [Right Drawer Panel](../../organisms/right-drawer-panel.md) variant modal over the work.
- **Expanded** (from `--breakpoint-expanded-min`): side-panel form is a Right Drawer Panel variant persistent beside the work, which stays visible and usable ([patterns 9.1](../../patterns/09-ai.md)).
- **Large** (from `--breakpoint-large-min`): the rail is Expanded true; the full page shows the conversation list as a leading column.
- **Touch.** Every target meets `--control-target-min` ([patterns 6.16](../../patterns/06-accessibility.md)). Feedback icon buttons at size small and suggestion chips need a hit area of at least `--control-target-min`. The composer's controls follow [Message Input](../../molecules/message-input.md).

## Accessibility
- **Landmarks and headings.** `header`, `nav`, `main` holding the conversation as a log region labelled with the assistant's name; the conversation list is a `nav` labelled "Conversations". The assistant's name is the `h1`; messages are not headings.
- **Focus order.** Scope line, conversation, follow-ups, composer. On arrival focus goes to the composer. Sending keeps focus in the composer; Stop takes the place of Send so the same stop works ([patterns 9.47](../../patterns/09-ai.md)). Plan approvals are reached by Tab within their message.
- **Keyboard.** Enter sends, Shift+Enter adds a line; Escape stops generating when the composer has focus. Sources and AI Marks open their layers with Enter and close with Escape.
- **Names and announcements.** Send is "Send message", Stop "Stop generating", feedback "Good answer" and "Bad answer", attach "Add attachment". Streaming answers announce when they start and when they finish, never each fragment ([patterns 6.59](../../patterns/06-accessibility.md)). Each step's status change in a running plan is announced politely.
- **Never colour alone.** AI output is marked by the AI Mark's icon and words, never colour ([patterns 9.20](../../patterns/09-ai.md)); plan statuses have words and glyphs.
- The assistant never presents itself as a person ([patterns 9.88](../../patterns/09-ai.md)).

## Usage
- Use it when conversation is the job. AI help on one field or item is an [AI Suggestion](../../molecules/ai-suggestion.md) at that field, not this template ([patterns 9.2](../../patterns/09-ai.md)). AI output outside a conversation is a decision card next to what it refers to ([patterns 1.32](../../patterns/01-screen-composition.md)).
- The narrower the task, the more of the prompt becomes controls in the composer ([patterns 1.36](../../patterns/01-screen-composition.md)).
- Every task the person is accountable for can also be finished without AI ([patterns 9.9](../../patterns/09-ai.md)).
- On a shared device, conversations leave the screen when the person changes ([patterns 9.61](../../patterns/09-ai.md)).
- Drafts: [AI Mark](../../atoms/ai-mark.md), [AI Suggestion](../../molecules/ai-suggestion.md), [Task List](../../molecules/task-list.md), [Connection Status](../../molecules/connection-status.md), [List Item](../../molecules/list-item.md), [Chat](../../organisms/chat.md) and [Right Drawer Panel](../../organisms/right-drawer-panel.md) are draft; their measurements are placeholders.

Prototypes using this template: none yet.
