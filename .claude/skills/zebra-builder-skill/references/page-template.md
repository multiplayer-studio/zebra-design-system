# Page template

The shape every page story follows.
`stories/AvailabilityOptimizerPage.stories.tsx` is a worked example: a
handheld flow with a camera, a bottom sheet, a dialog and toasts.

## File header

A block comment saying what the page is, the Figma node it comes from, and
**every departure from Figma**, one line each. The same list goes into the
build report.

```tsx
/* A mock desktop flow, not a component: <what it is>, from Figma's <section>
   (<file>, node <id>). Every control is a library component; Figma's local
   parts are composed here from those and semantic tokens.

   Where the page departs from Figma:
   - Text colour: Figma binds palette ink/high; the page uses foreground/primary.
   - Dialogs: Figma hides the header icon; page CSS hides it.
   - Undesigned paths: … */
```

## Pieces

```tsx
const IMAGE = new URL("./assets/<page>/<name>.png", import.meta.url).href;

type Text = "body-xsmall" | "body-small" | "body-medium" | "label-medium" | "label-large" | "title-medium" | "title-large" | "heading-small" | "heading-medium";
const t = (role: Text): React.CSSProperties => ({ font: `var(--text-${role})`, letterSpacing: `var(--${role}-letter-spacing)`, margin: 0 });

// Scoped workarounds and state styles. One rule per line, a comment on each workaround.
const PAGE_CSS = [
  // Figma hides <part>; <Component> always draws it inline, so !important.
  ".xx-dialog .zds-dialog__icon{display:none!important}",
  ".xx-option:hover{background:var(--interactive-neutral-background-hover)}",
].join("");
```

- **One small component per Figma local component**, named after it, with
  Figma's states as props (`selected`, `disabled`) and hover in `PAGE_CSS`.
- **Frame size** is the Figma frame's own width and height, and a brand
  extension on the frames becomes a class on the root (`ext-companion`). The root is `position: relative; overflow: hidden` so overlays
  and toasts position inside it.
- **Overlays:**
  - Dialogs use `<Dialog inline>` over a scrim of `var(--overlay-scrim)`, with
    the rest of the page wrapped in `<div inert={modal != null} style={{ display: "contents" }}>`.
  - Toasts use `<Snackbar inline>`, absolutely positioned where Figma places
    them, with `inline-size: auto` when Figma hugs them.
- **State machine:**
  - One `screen` state, plus the state of each choice.
  - Footer buttons are derived per screen, with Next disabled until Figma
    enables it.
  - Timed states (scanning, connecting) run on `setTimeout` inside `useEffect`
    and are cleaned up.
- **Branches** (errors, failures, alternate states) are reachable in the flow
  where possible. Otherwise they get their own story, via an arg such as
  `offline` or `signedOut`.
- **Placeholders** in Figma copy, such as "[name]", are filled with the live value.

## Motion

Figma shows end states; the page animates between them. Keep a closing
overlay mounted for its exit animation, and render each kind of overlay in one
slot, so stepping from one sheet to the next swaps the content in place
instead of sliding a new sheet in.

```tsx
/** Keeps a closing overlay mounted for its exit animation (250ms; none with reduced motion). */
function useExit<T>(value: T | null): [T | null, boolean] {
  const [shown, setShown] = React.useState(value);
  const [closing, setClosing] = React.useState(false);
  React.useEffect(() => {
    if (value != null) { setShown(value); setClosing(false); return; }
    if (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(null); return; }
    setClosing(true);
    const id = setTimeout(() => { setShown(null); setClosing(false); }, 250);
    return () => clearTimeout(id);
  }, [value]);
  return [value ?? shown, closing && value == null];
}

const [shownSheet, sheetClosing] = useExit(sheet);
{shownSheet ? <SideSheet closing={sheetClosing} {...sheetView(shownSheet)} /> : null}
```

```ts
// In PAGE_CSS: enter on mount, a separate -out keyframe on [data-closing].
"@keyframes xx-fade{from{opacity:0}}@keyframes xx-fade-out{to{opacity:0}}",
"@keyframes xx-slide{from{transform:translateX(100%)}}@keyframes xx-slide-out{to{transform:translateX(100%)}}",
"@keyframes xx-pop{from{opacity:0;transform:translateY(8px) scale(.98)}}@keyframes xx-pop-out{to{opacity:0;transform:translateY(8px) scale(.98)}}",
".xx-scrim{animation:xx-fade var(--animations-smooth) both}[data-closing].xx-scrim{animation-name:xx-fade-out}",
".xx-sheet{animation:xx-slide var(--animations-smooth) both}[data-closing] .xx-sheet{animation-name:xx-slide-out}",
".xx-pop{animation:xx-pop var(--animations-smooth) both}[data-closing] .xx-pop,[data-closing].xx-pop{animation-name:xx-pop-out}",
"@media (prefers-reduced-motion:reduce){.xx-scrim,.xx-sheet,.xx-pop{animation:none!important}}",
```

A bottom sheet built in the page rises with `translateY(100%)` in place of
`translateX`; the library Bottom Sheet animates itself. A toast's positioning
wrapper keeps its own `transform`, so put `.xx-pop` on an inner div.

A collapsible rail is controlled:

```tsx
const [railOpen, setRailOpen] = React.useState(true);
<GlobalHeader onMenuClick={() => setRailOpen((o) => !o)} … />
<div style={{ flex: "none", display: "flex" }}>        {/* no fixed width */}
  <NavigationRail expanded={railOpen} onExpandedChange={setRailOpen} … />
</div>
<main style={{ flex: 1, minInlineSize: 0 }}>…</main>
```

Anything in the rail's footer must fit the narrow rail too.

## Stories

```tsx
const meta: Meta<typeof Page> = {
  title: "Experimental/Pages/<Name>",
  component: Page,
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: "<figma url>" },
    docs: { description: { component: "**Experimental mock flow.** <the path through it, the branches and how to reach them, and the components used>." } },
  },
};
export const Flow: Story = {};
export const <Branch>: Story = { args: { … } };
export const Dark: Story = { args: { theme: "mode-dark" } };
```
