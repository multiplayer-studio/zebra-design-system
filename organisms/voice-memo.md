---
name: Voice Memo
level: organism
status: draft
composes: [../organisms/bottom-sheet.md, ../atoms/icon-button.md, ../atoms/fab.md, ../atoms/button.md]
tokens:
  # none yet: the sheet, scrim and actions are governed by the composed Bottom Sheet, FAB, Icon Button and Button
---

# Voice Memo

> A slide-up sheet that appears when recording a voice message in chat. It shows the recording time, waveform, and buttons to stop, send, or cancel the memo.

This page is a composition guide built from existing Zeta atoms and molecules. Measurements to be defined.

## Anatomy
1. Sheet — slide-up surface: a [Bottom Sheet](bottom-sheet.md), which governs its surface, top radius, scrim and motion.
2. Recording time — elapsed timer.
3. Waveform — live audio level visualisation.
4. Actions — stop ([FAB](../atoms/fab.md)), send ([Icon Button](../atoms/icon-button.md), flavor primary, shape full), cancel ([Button](../atoms/button.md), flavor text). Each governs its own colours, states and focus ring.

## Variants
To be defined.

## States
recording → stopped (review) → sent / cancelled.

## Spacing & Sizing
Measurements to be defined. Stated so far: the Bottom Sheet surface `--bottom-sheet-container-background` with `--bottom-sheet-container-radius` top corners, scrim `--bottom-sheet-scrim-background`. Spacing and borders will use the Zeta semantic scales once defined.

## Usage
- Opened from the [Chat](chat.md) composer microphone.
- Show recording state with text/icon (timer, red dot) plus colour; announce start/stop to assistive tech.
- Interactive parts inherit the atoms' accessibility: touch targets ≥ `--button-touch-target-size-minimum`–`--button-touch-target-size-recommended`, Button focus ring `--button-focus-ring-width` `--button-focus-ring-color`; never rely on colour alone.

## Stitch Prompt
Draw a white sheet sliding up from the bottom of a chat screen with `--bottom-sheet-container-radius` rounded top corners. It shows a red recording dot and a running timer "0:12", a horizontal live audio waveform in blue, and a row of actions: a Cancel text button on the left, a round stop button in the centre and a blue send button on the right.
