import { css } from "lit";

/**
 * The template paints nothing of its own — "Fill and elevation: None on the
 * template... both belong to the menu" (spec). Everything here is geometry:
 * hugging the trigger, and placing the panel outside those bounds.
 *
 * Positioning approach: `position: absolute` against `:host`, which is
 * `position: relative` and hugs only the trigger (spec: "a layout only
 * reserves the trigger's space"), plus one CSS rule per `position` value and
 * one per applicable `position`×`align` pair — no JavaScript measurement at
 * all. An earlier version used `position: fixed` plus JS-computed `top`/
 * `left` in viewport coordinates (`getBoundingClientRect`, recomputed on
 * open/resize/scroll); see dropdown.ts's class doc for why that broke
 * specifically inside Storybook's Docs page (a `position: fixed` descendant
 * resolves against whichever ancestor introduces a `transform`, not the
 * viewport, and Docs wraps stories in a scaled preview frame that does). This
 * version has no viewport coordinate to get wrong in the first place.
 *
 * Trade-off carried over unchanged from the `fixed` version: `position:
 * absolute` doesn't buy top-layer stacking either, so an ancestor's
 * `overflow: hidden` can still clip the panel. The Popover API (`popover`
 * attribute + `::backdrop`) or CSS anchor positioning would solve that, but
 * neither is used yet — no other component in this package uses `popover` or
 * `anchor-name` (checked: `grep -r "popover\|anchor-name" src/` turns up
 * nothing), so there's no existing browser-support baseline to match, and
 * anchor positioning still needs a fallback path in browsers without it.
 * Revisit if a future component needs top-layer stacking badly enough to
 * justify a feature-detected fallback.
 *
 * Spec: specs/dropdown/dropdown.spec.json
 */
export default css`
  :host {
    /* Hug the trigger only — the open menu reserves no layout space (spec:
       "a layout only reserves the trigger's space"). Also the containing
       block every .panel position is measured against. */
    display: inline-block;
    position: relative;
  }

  :host([hidden]) {
    display: none;
  }

  .trigger {
    display: inline-flex;
  }

  ::slotted([slot="trigger"]) {
    min-width: var(--control-sm);
  }

  .panel {
    position: absolute;
    z-index: 1;
  }

  /* ---- position: which side of :host the panel clears, by --space-sm ---- */
  :host([position="bottom"]) .panel { top: 100%; margin-top: var(--space-sm); }
  :host([position="top"]) .panel { bottom: 100%; margin-bottom: var(--space-sm); }
  :host([position="right"]) .panel { left: 100%; margin-left: var(--space-sm); }
  :host([position="left"]) .panel { right: 100%; margin-right: var(--space-sm); }

  /* ---- align: which cross-axis edge pins to the trigger's -----------------
     Only two of Align's four values apply to any one Position (spec:
     "It has no effect while Position is bottom/top" and vice versa) — the
     other two simply have no rule here, matching that "no effect" exactly
     rather than needing a guard to ignore them. */
  :host([position="bottom"][align="left"]) .panel,
  :host([position="top"][align="left"]) .panel {
    left: 0;
  }
  :host([position="bottom"][align="right"]) .panel,
  :host([position="top"][align="right"]) .panel {
    right: 0;
  }
  :host([position="right"][align="top"]) .panel,
  :host([position="left"][align="top"]) .panel {
    top: 0;
  }
  :host([position="right"][align="bottom"]) .panel,
  :host([position="left"][align="bottom"]) .panel {
    bottom: 0;
  }
`;
