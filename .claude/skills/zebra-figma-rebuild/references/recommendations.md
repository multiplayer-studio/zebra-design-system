# Recommendations: better options, offered after the faithful rebuild

The rebuild reproduces the old design. Recommendations are where you say what the Zebra system would do better —
never baked silently into the rebuild. Look at the finished rebuild (and the source) with these lenses, and
keep only findings that are specific to these screens and that you can point at.

| Lens | Look for |
|---|---|
| Accessibility | text or icons under contrast (4.5:1 body, 3:1 large text and UI); state shown by colour alone; targets under `control/target-min`; missing focus or error states for things you can type in or press |
| System fit | a pattern the library already has a better component for (rows that should be Cards or a Table, a home-made tab strip, a toggle drawn as a checkbox); the same thing done two ways across screens |
| Hierarchy | more than one primary action per view; competing title sizes; a key action hidden in a menu; long, unscannable copy |
| Spacing and alignment | spacing that snapped to two different `space/*` steps for the same relationship; ragged left edges; cramped cards |
| States and edge cases | a list with no empty, loading or error state; truncation of long names; no disabled state where an action can't run |
| Consistency across screens | the same item styled differently between screens; labels that change wording |
| Theming | anything that only works in light mode; images that need a dark variant |

## How to present them

After the build report, list at most six, most valuable first. One short line each — what, why, effort:

```
Recommendations
1. Use Card for the printer rows — the library's card gives hover/selected states the old rows draw by hand. Small.
2. One primary action — "Connect New Printer" stays primary, "Refresh" becomes an Icon Button. Small.
3. Add an empty state to My Printers — today a user with no printers sees a blank page. Medium (new screen).
```

Then ask with AskUserQuestion (multiSelect) which to implement, offering up to four of them by short label;
the user can type others in "Other". In the same call, ask where: **on a copy beside the rebuild**
(recommended: keeps the faithful rebuild for comparison; name the copy "<screen> · Recommended") or **in place**.

## Implementing the chosen ones

- Same rules as the rebuild: Zebra components, semantic tokens, Zebra text styles. Run the audit again after.
- Look at every new state before reporting it. Product photos usually have white backgrounds: a tinted
  selected or hover fill turns them into white boxes, so show those states with the border
  (`selection/border` at `stroke/thick`) and keep the card on `surface/card`.
- A recommendation that needs a screen the source doesn't have (an empty state) is built as a new frame next to
  the screen it belongs to, named for its state.
- Report what changed per recommendation in one line, with the node link.
