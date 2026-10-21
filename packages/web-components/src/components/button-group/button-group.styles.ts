import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer. The
 * items are `<zds-button>` / `<zds-icon-button>` and the rules between them
 * `<zds-divider>`; this file only draws the shared surface and rounds the
 * outer ends. Mirrors button-group.css in packages/react-baseui.
 *
 * Spec: specs/button-group/button-group.spec.json
 */
export default css`
  :host {
    display: inline-flex;
    vertical-align: middle;
    /* Reset per group so a sharp group nested in a rounded one stays sharp. */
    --zds-button-group-inner-radius: var(--radius-none);
  }

  :host([hidden]) {
    display: none;
  }

  /* ---- root ------------------------------------------------------------ */
  .group {
    display: inline-flex;
    flex-direction: row;
    align-items: stretch;
    box-sizing: content-box;
    /* Spec issue "slot differs by size": medium overlaps items by
       space/neg/xs, small and large use an untokened 0. No negative gap
       anywhere here — items butt together at space/none, as the metadata says. */
    gap: var(--space-none);
    padding: var(--space-none);
    background: var(--surface-section);
    /* Spec issue "root border width is untokened" (raw 1): bound to
       stroke/thin, the nearest stroke token. A real border, so it takes
       layout space the way Figma's outside stroke takes visual space. */
    border: var(--stroke-thin) solid var(--border-default);
    /* Spec issue "sharp radius is a literal 0": bound to radius/none. */
    border-radius: var(--radius-none);
    /* Never clip: an item's focus ring is drawn outside its bounds and has
       to reach over the group's outline. */
    overflow: visible;
  }

  /* ---- size ------------------------------------------------------------ */
  /* size reaches every item as a property and the items set the height
     (Button's control/sm, -md, -lg). The row also holds that height itself
     (spec: size "controls row height"), so it can't collapse around other
     content. */
  :host([size="small"]) .group { min-height: var(--control-sm); }
  :host([size="medium"]) .group { min-height: var(--control-md); }
  :host([size="large"]) .group { min-height: var(--control-lg); }

  /* ---- shape ----------------------------------------------------------- */
  /* Rounded uses radius/element-sm, Button's own rounded token, so a rounded
     group matches a rounded Button beside it. The spec binds radius/sm on the
     root and the rounded wrappers (spec note: "rounded wrappers use radius/sm
     where Button's own rounded shape uses radius/element-sm"); the two
     resolve to the same value today, element-sm is the component-level intent. */
  :host([shape="rounded"]) .group {
    border-radius: var(--radius-element-sm);
  }
  /* The items sit inside the border: their outer corners take the inner
     radius so the curves stay concentric. Inherited into each item. */
  :host([shape="rounded"]) {
    --zds-button-group-inner-radius: max(var(--radius-none), calc(var(--radius-element-sm) - var(--stroke-thin)));
  }

  /* ---- items ----------------------------------------------------------- */
  ::slotted(*) {
    flex: none;
  }
  /* Divider's vertical height:100% resolves to 0 when the row has no
     definite height; auto lets its own align-self: stretch fill the row.
     (Outer-scope rules win over the divider's :host rule.) */
  zds-divider {
    height: auto;
  }
  /* A focused item's ring sits above its neighbours and the dividers. */
  ::slotted(:focus-within) {
    position: relative;
    z-index: 1;
  }
`;

/**
 * Adopted into each item's own shadow root by the group (see `#adopt` in
 * button-group.ts). Only the outer ends round; inner edges stay square (spec
 * issues "small / sharp uses rounded wrappers" and "medium / rounded is
 * mis-assembled": a sharp group never rounds an item, a rounded one always
 * rounds the first item's start and the last item's end). Shows on hover,
 * press and the focus ring.
 */
export const itemStyles = `
  :host([data-zds-group-start]) button {
    border-start-start-radius: var(--zds-button-group-inner-radius, var(--radius-none));
    border-end-start-radius: var(--zds-button-group-inner-radius, var(--radius-none));
  }
  :host([data-zds-group-end]) button {
    border-start-end-radius: var(--zds-button-group-inner-radius, var(--radius-none));
    border-end-end-radius: var(--zds-button-group-inner-radius, var(--radius-none));
  }
`;
