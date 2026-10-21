import { css } from "lit";

/**
 * Select — only the deltas. The field reuses Input Field's styles (size,
 * shape, state x flavour, keyed off the host's reflected axes and the state
 * class on `.field`), the label and hint Input's. The list draws Dropdown
 * Menu's panel and Menu Item's rows from the same tokens those components
 * bind. Every value is a semantic token. Kept rule for rule in step with
 * packages/react-baseui select.css (+ the dropdown-menu / menu-item CSS it
 * composes).
 *
 * Spec: specs/select/select.spec.json
 */
export default css`
  /* The assembly is Input's column stack; the field, not the host, carries
     Input Field's minimum width (as on the React field). */
  :host {
    min-inline-size: 0;
  }

  /* ---- field: a <button>, not a text box ------------------------------- */
  /* Reset the UA button styles Input Field's styles do not expect. "font:
     inherit" also normalises the button's UA weight so both packages match. */
  .field {
    inline-size: 100%;
    min-inline-size: calc(6 * var(--control-sm));
    margin: 0;
    font: inherit;
    text-align: start;
    cursor: pointer;
  }
  .field.read-only {
    cursor: default;
  }
  .field.disabled {
    cursor: not-allowed;
  }

  /* Keyboard focus: Input / Select's focus row (border/focus at
     stroke/thick, outside), drawn from :focus-visible because a button,
     unlike a text box, can tell keyboard from pointer. */
  .field:focus-visible:not(.disabled):not(.open) {
    --zds-input-border: transparent;
    --zds-input-outline: var(--stroke-thick) solid var(--border-focus);
  }

  /* ---- display text: placeholder, then the value ------------------------ */
  /* Input Field's text rules (padding 0 space/xs, body/medium, body/small at
     small) on a span instead of an <input>. */
  .value {
    flex: 1 1 auto;
    min-inline-size: 0;
    padding: 0 var(--space-xs);
    color: var(--zds-input-fg);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    font-weight: var(--body-medium-font-weight);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  :host([size="small"]) .value {
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
  }
  /* The placeholder shows at enabled, focus and open (spec issue 5: open
     keeps the placeholder), in foreground/disabled. */
  .value.placeholder {
    color: var(--foreground-disabled);
  }

  .chevron {
    flex: none;
  }

  /* ---- state: open (spec issue 11 — Input / Select's own name) ----------- */
  /* Same tokens as Input Field's selected: border/focus at stroke/thin. */
  .field.open {
    --zds-input-border: var(--border-focus);
  }
  :host([flavour="gradient"]) .field.open {
    --zds-input-border: var(--border-gradient-start);
  }
  /* Ghost: Figma draws open at stroke/base (zero), so only the chevron says
     the list is open (spec issue 10). Following the intent — "the border
     stays at focus weight" — ghost open draws border/focus at stroke/thin,
     the same exception ghost already makes for invalid. */
  :host([flavour="ghost"]) .field.open {
    --zds-input-border-width: var(--stroke-thin);
  }

  /* ---- list: Dropdown Menu, Rounded=true -------------------------------- */
  /* A manual popover in the top layer, placed in viewport coordinates by the
     element: as wide as the field, --space-xs below it (spec issue 13).
     Height is capped at the room left in the viewport and scrolls — Figma
     has no cap, but an uncapped list runs off screen. Resets the UA popover
     box. */
  .list {
    position: fixed;
    inset: auto;
    margin: 0;
    border: 0;
    box-sizing: border-box;
    flex-direction: column;
    gap: var(--space-2xs);
    padding: var(--space-card);
    overflow-y: auto;
    outline: none;
    color: inherit;
    background: var(--surface-menu);
    border-radius: var(--radius-element-md);
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
  }
  .list:popover-open {
    display: flex;
  }
  .list:not(:popover-open) {
    display: none;
  }

  /* ---- rows: Menu Item, Type=Icon, Rounded=true ------------------------- */
  .item {
    flex: none;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    inline-size: 100%;
    block-size: var(--control-md);
    padding: var(--space-xs) var(--space-md);
    gap: var(--space-sm);
    border: var(--stroke-thin) solid transparent;
    border-radius: var(--radius-sm);
    background: var(--zds-menu-item-bg);
    color: var(--interactive-neutral-foreground-default);
    cursor: pointer;
    /* Menu Item's colour-only transitions. */
    transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
    --zds-menu-item-bg: var(--interactive-ghost-background-default);
  }
  .item-leading,
  .item-check {
    flex: none;
  }
  /* The label's own inset separates it from the leading icon and reserves
     room on the trailing side. The list's width is the field's, so a long
     label truncates rather than widening the menu as a free-standing
     Dropdown Menu does. */
  .item-label {
    flex: 1 1 auto;
    min-inline-size: 0;
    padding-inline: var(--space-xs) var(--space-xl);
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /* The check sits where Menu Item's trailing icon does. */
  .item-check {
    margin-inline-start: auto;
  }

  /* hover: the pointer's highlighted row. */
  .item.highlighted:not(.disabled) {
    --zds-menu-item-bg: var(--interactive-ghost-background-hover);
  }
  /* selected (spec issue 6: Menu Item State=selected plus the check-mark). */
  .item.selected:not(.disabled) {
    --zds-menu-item-bg: var(--interactive-ghost-background-selected);
  }
  /* focus: the keyboard's active row — the only bordered state. */
  .item.focus-visible:not(.disabled) {
    --zds-menu-item-bg: var(--interactive-ghost-background-focused);
    border-color: var(--border-focus);
  }
  .item.selected.focus-visible:not(.disabled) {
    --zds-menu-item-bg: var(--interactive-ghost-background-selected);
  }
  /* disabled: only the label's contrast changes. */
  .item.disabled {
    --zds-menu-item-bg: var(--interactive-ghost-background-disabled);
    color: var(--interactive-neutral-foreground-disabled);
    cursor: not-allowed;
  }
`;
