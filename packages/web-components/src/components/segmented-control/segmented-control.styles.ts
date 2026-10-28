import { css } from "lit";

/** SegmentedControl — every value is a semantic token from the shared token
   layer. Keyed off data-shape / data-flavour / data-indicator / data-sliding /
   data-checked / data-disabled,
   which the element sets inside its shadow root with the same class names as
   packages/react-baseui segmented-control.css (where Base UI sets the
   data-checked / data-disabled), so the two stay rule-for-rule identical.

   Spec: specs/segmented-control/segmented-control.spec.json */
export default css`

/* ---- 1. track ----------------------------------------------------------- */
.zds-segmented-control {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: var(--space-xxs);
  box-sizing: border-box;
  padding: var(--space-xxs);
  vertical-align: middle;
  border-radius: var(--radius-sm);
  background: var(--interactive-neutral-background-pressed);
  /* containing block for the indicator */
  position: relative;

  /* --- motion (the active indicator) ------------------------------------ */
  /* The animations/spring token (size collection): 250ms on
     cubic-bezier(0.34, 1.36, 0.64, 1), shared with Switch. The owner's
     choice, overriding the spec's "0.15s ease-in" (spec issue "Motion values
     have no token" is resolved by the token). Used in the indicator's
     transition below. */
}
:host {
  display: inline-flex;
  vertical-align: middle;
}
:host([hidden]) {
  display: none;
}

/* ---- shape -------------------------------------------------------------- */
.zds-segmented-control[data-shape="sharp"],
.zds-segmented-control[data-shape="sharp"] .zds-segmented-control__segment,
.zds-segmented-control[data-shape="sharp"] .zds-segmented-control__indicator {
  border-radius: var(--radius-none);
}

/* ---- 2. segment (the private _Segmented item) --------------------------- */
.zds-segmented-control__segment {
  --zds-seg-bg: transparent;
  --zds-seg-fg: var(--foreground-secondary);

  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  gap: var(--space-xxs);
  box-sizing: border-box;
  min-height: var(--control-sm);
  /* spec issue "Padding misstated": the metadata says space/md on both sides
     of the default flavour, but Figma binds space/md at the start and
     space/lg at the end, and the measured 80px width only adds up with the
     bound values. The bound tokens are kept — the smaller start padding
     optically balances the glyph's side bearing against the label's end. */
  padding: var(--space-xxs) var(--space-lg) var(--space-xxs) var(--space-md);
  border-radius: var(--radius-sm);
  background: var(--zds-seg-bg);
  color: var(--zds-seg-fg);
  cursor: pointer;
  outline: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  /* positioned so it paints above the absolutely positioned indicator */
  position: relative;
}

/* ---- active indicator (intent only in Figma) ---------------------------- */
/* Spec Motion: "The active background moves in 0.15s ease-in transition
   between item in the control. Active background is not tied to the
   segmented item but bound to the control." (Timing and curve are
   overridden by the owner; see the track's motion block.) One element on the track, sized
   and placed over the chosen segment from --zds-seg-indicator-{x,y,w,h},
   which the component measures. Hidden until the first measurement
   ([data-indicator]); until then the chosen segment carries the fill itself.
   The (stale) _Segmented item metadata still says "no movement" — spec issue
   "Control and segment metadata disagree on motion"; the control wins. */
.zds-segmented-control__indicator {
  display: none;
  position: absolute;
  /* Physical offsets from the track's padding box, measured by the
     component, so RTL needs no mirroring here. */
  top: 0;
  left: 0;
  width: var(--zds-seg-indicator-w, 0);
  height: var(--zds-seg-indicator-h, 0);
  transform: translate(var(--zds-seg-indicator-x, 0), var(--zds-seg-indicator-y, 0));
  border-radius: var(--radius-sm);
  background: var(--interactive-neutral-background-focused);
  pointer-events: none;
}
.zds-segmented-control[data-indicator] .zds-segmented-control__indicator {
  display: block;
}
/* Only a change of chosen option slides ([data-sliding]); the first
   placement lands in place. Timing and curve: see the track's motion block. */
.zds-segmented-control[data-sliding] .zds-segmented-control__indicator {
  transition:
    transform var(--animations-spring),
    width var(--animations-spring),
    height var(--animations-spring);
}
@media (prefers-reduced-motion: reduce) {
  .zds-segmented-control[data-sliding] .zds-segmented-control__indicator {
    transition: none;
  }
}

/* ---- flavour ------------------------------------------------------------ */
/* Text only and icon only bind a space/sm gap that has a single child to
   separate (spec note), so it is not restated here. */
.zds-segmented-control__segment[data-flavour="text-only"],
.zds-segmented-control__segment[data-flavour="icon-only"] {
  padding-inline: var(--space-lg);
}

/* ---- 3. icon & 4. label ------------------------------------------------- */
.zds-segmented-control__icon {
  flex: none;
}
.zds-segmented-control__label {
  white-space: nowrap;
  font-family: var(--label-medium-font-family), system-ui, sans-serif;
  font-size: var(--label-medium-font-size);
  font-weight: var(--label-medium-font-weight);
  line-height: var(--label-medium-line-height);
  letter-spacing: var(--label-medium-letter-spacing);
}

/* ---- state -------------------------------------------------------------- */
/* hover: label to foreground/primary, no fill (as drawn). */
.zds-segmented-control__segment:hover:not([data-disabled]) {
  --zds-seg-fg: var(--foreground-primary);
}
/* pressed (not designed — spec issue "No focus, pressed or disabled
   design"): an unchosen segment takes interactive/neutral/background/hover
   while held, a half-step from the track (…/pressed) toward the chosen fill
   (…/focused), so the press previews the selection it is about to make. */
.zds-segmented-control__segment:active:not([data-disabled]):not([data-checked]) {
  --zds-seg-bg: var(--interactive-neutral-background-hover);
  --zds-seg-fg: var(--foreground-primary);
}
/* active (the chosen segment): label colour; the fill is the track's
   indicator once measured, the segment's own fill before that. */
.zds-segmented-control__segment[data-checked] {
  --zds-seg-bg: var(--interactive-neutral-background-focused);
  --zds-seg-fg: var(--foreground-primary);
  cursor: default;
}
.zds-segmented-control[data-indicator] .zds-segmented-control__segment[data-checked] {
  --zds-seg-bg: transparent;
}
/* focus (not designed — same spec issue): the library's focus ring, a
   stroke/thick border/focus outline as on Button and Radio. It sits in the
   track's space/xs gap and padding, so it never overlaps a neighbour. */
.zds-segmented-control__segment:focus-visible {
  outline: var(--stroke-thick) solid var(--border-focus);
  outline-offset: 0;
}
/* disabled (not designed — same spec issue): the neutral disabled
   foreground, as on Chip and Radio. A disabled chosen segment keeps its fill
   so the control still shows which option is in force. */
.zds-segmented-control__segment[data-disabled] {
  --zds-seg-fg: var(--interactive-neutral-foreground-disabled);
  cursor: not-allowed;
}

@media (forced-colors: active) {
  .zds-segmented-control {
    border: var(--stroke-thin) solid CanvasText;
  }
  /* No sliding indicator here: the chosen segment keeps its own fill. */
  .zds-segmented-control[data-indicator] .zds-segmented-control__indicator {
    display: none;
  }
  .zds-segmented-control .zds-segmented-control__segment[data-checked],
  .zds-segmented-control[data-indicator] .zds-segmented-control__segment[data-checked] {
    --zds-seg-bg: var(--interactive-neutral-background-focused);
    outline: var(--stroke-thin) solid Highlight;
  }
}
`;
