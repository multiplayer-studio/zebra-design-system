import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer, so an
 * `.ext-*` / `.mode-*` class on any ancestor re-themes the bar with no
 * re-render. The metadata calls the gap, radius, stroke and size "not token
 * bound"; they are (spec warn), and are bound here.
 *
 * Sections follow the spec: root, then the shared square (_controls and
 * _indicators), the Outline × Rounded variant table, then the state table.
 * Colour is routed through three local custom properties, set per state and
 * consumed once on the button.
 *
 * Colour-only 120ms transitions match Button (the spec defines no motion of
 * its own, and the two sit side by side in tables and toolbars).
 *
 * Spec: specs/pagination/pagination.spec.json
 */
export default css`
  :host {
    display: inline-flex;
    vertical-align: middle;
  }

  :host([hidden]) {
    display: none;
  }

  /* ---- root: horizontal, hugs, gap space/sm ---------------------------- */
  nav {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-none);
  }

  /* ---- _controls / _indicators: the shared square ---------------------- */
  button {
    /* UA reset */
    margin: 0;
    appearance: none;
    font: inherit;
    background: none;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
    box-sizing: border-box;
    inline-size: var(--control-sm);
    block-size: var(--control-sm);

    border-style: solid;
    border-width: var(--zds-pagination-border-width);
    border-radius: var(--zds-pagination-radius);

    background: var(--zds-pagination-bg);
    border-color: var(--zds-pagination-border);
    color: var(--zds-pagination-fg);

    cursor: pointer;
    transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
  }

  .control {
    padding: var(--space-sm);
  }

  .indicator {
    padding: var(--space-none);
    font-family: var(--body-small-font-family), system-ui, sans-serif;
    font-size: var(--body-small-font-size);
    font-weight: var(--body-small-font-weight);
    line-height: var(--body-small-line-height);
    letter-spacing: var(--body-small-letter-spacing);
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  /* ---- variants: outline × rounded ------------------------------------- */
  :host {
    --zds-pagination-border-width: var(--stroke-base);
    --zds-pagination-radius: var(--radius-none);
  }
  :host([outline]) {
    --zds-pagination-border-width: var(--stroke-thin);
  }
  :host([rounded]) {
    --zds-pagination-radius: var(--radius-sm);
  }

  /* ---- state: enabled -------------------------------------------------- */
  button {
    --zds-pagination-bg: var(--interactive-neutral-background-default);
    --zds-pagination-border: var(--interactive-neutral-border-default);
    --zds-pagination-fg: var(--foreground-primary);
  }

  /* ---- state: hover ---------------------------------------------------- */
  button:hover:not(:disabled) {
    --zds-pagination-bg: var(--interactive-neutral-background-hover);
  }
  :host([outline]) button:hover:not(:disabled) {
    --zds-pagination-border: var(--interactive-neutral-border-hover);
  }

  /* ---- state: pressed -------------------------------------------------- */
  /* Round outline indicators draw border/default in Figma; every other
     part uses interactive/neutral/border/pressed (spec warn "Odd pressed
     border"), so all use it here. */
  button:active:not(:disabled) {
    --zds-pagination-bg: var(--interactive-neutral-background-pressed);
    --zds-pagination-border: var(--interactive-neutral-border-pressed);
  }

  /* ---- state: focus ---------------------------------------------------- */
  /* An inset ring, so focus never shifts layout or grows the square. */
  button:focus-visible {
    outline: none;
    --zds-pagination-bg: var(--interactive-neutral-background-default);
    box-shadow: inset 0 0 0 var(--stroke-thick) var(--border-focus);
  }

  /* ---- state: disabled ------------------------------------------------- */
  /* Outline indicators use interactive/primary/border/disabled in Figma;
     everything else interactive/neutral/border/disabled (spec warn "Odd
     disabled border"), so all use the neutral one here. */
  button:disabled {
    cursor: not-allowed;
    --zds-pagination-bg: var(--interactive-neutral-background-disabled);
    --zds-pagination-border: var(--interactive-neutral-border-disabled);
    --zds-pagination-fg: var(--foreground-disabled);
  }

  /* ---- state: selected (indicator, aria-current) ----------------------- */
  /* Holds through hover and press: the current page is not a target. */
  .indicator[aria-current="page"],
  .indicator[aria-current="page"]:hover,
  .indicator[aria-current="page"]:active {
    --zds-pagination-bg: var(--interactive-inverse-background-selected);
    --zds-pagination-border: var(--interactive-inverse-border-default);
    --zds-pagination-fg: var(--foreground-inverse);
  }
  /* Selected drops the border on outline indicators (spec note). */
  :host([outline]) .indicator[aria-current="page"],
  :host([outline]) .indicator[aria-current="page"]:hover,
  :host([outline]) .indicator[aria-current="page"]:active {
    --zds-pagination-border: transparent;
  }
`;
