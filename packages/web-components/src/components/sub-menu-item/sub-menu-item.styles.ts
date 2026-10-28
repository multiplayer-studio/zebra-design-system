import { css } from "lit";

/**
 * The row, shared with zds-collapsible-menu-item's header. Every value is a
 * semantic token from the generated CSS layer. Keyed off data attributes on
 * the inner row, mirroring packages/react-baseui sub-menu-item.css rule for
 * rule.
 *
 * Spec: specs/sub-menu-item/sub-menu-item.spec.json
 */
export const rowStyles = css`
  .row {
    /* reset the <a> / <button> UA styles so both render identically */
    appearance: none;
    margin: 0;
    border: none;
    font: inherit;
    font-weight: inherit;
    text-decoration: none;
    text-align: start;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    /* --- geometry ----------------------------------------------------- */
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    width: 100%; /* fills its slot (Figma draws it fixed at 184px) */
    /* Figma's min width is a raw 48px; control/lg is the same intent. */
    min-width: var(--control-lg);
    min-height: var(--control-lg);
    padding: var(--space-xxs) var(--space-md);
    /* Shape=rounded (the default); sharp is below. */
    border-radius: var(--radius-sm);

    /* --- colour: state axis ------------------------------------------ */
    background: var(--zds-sub-menu-item-bg);
    color: var(--zds-sub-menu-item-fg);
    --zds-sub-menu-item-bg: transparent; /* Figma: no fill */
    --zds-sub-menu-item-fg: var(--foreground-primary);
  }

  /* ---- shape: the rail's, code-only (owner decision) -------------------- */
  .row[data-shape="sharp"] {
    border-radius: var(--radius-none);
  }

  /* ---- nested ----------------------------------------------------------- */
  .row[data-nested] {
    padding-inline-start: var(--space-xl);
    --zds-sub-menu-item-fg: var(--foreground-secondary);
  }

  /* ---- icon and title --------------------------------------------------- */
  .lead {
    display: flex;
    flex: 1 1 auto;
    align-items: center;
    gap: var(--space-md);
    min-width: 0;
  }
  .icon {
    flex: none;
  }
  .label {
    /* One line, end-truncated. The metadata says the row "neither truncates
       nor wraps"; following Figma's single line, truncation is what keeps a
       long name inside the fixed-width panel. */
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
  }
  .row[data-nested] .label {
    font-family: var(--indicator-medium-font-family), system-ui, sans-serif;
    font-size: var(--indicator-medium-font-size);
    font-weight: var(--indicator-medium-font-weight);
    line-height: var(--indicator-medium-line-height);
    letter-spacing: var(--indicator-medium-letter-spacing);
  }

  /* ---- badge + caret ---------------------------------------------------- */
  .badge,
  .caret {
    flex: none;
  }

  .sr {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border: 0;
  }

  /* ---- state: hover / active (pressed) — CSS, never props --------------- */
  /* Ghost tokens alone (spec warn "Double alpha"). */
  .row:hover:not([data-disabled]) {
    --zds-sub-menu-item-bg: var(--interactive-ghost-background-hover);
  }
  .row:active:not([data-disabled]) {
    --zds-sub-menu-item-bg: var(--interactive-ghost-background-pressed);
    --zds-sub-menu-item-fg: var(--interactive-neutral-foreground-default);
  }

  /* ---- state: selected -------------------------------------------------- */
  .row[data-selected] {
    --zds-sub-menu-item-bg: var(--interactive-ghost-background-selected);
    --zds-sub-menu-item-fg: var(--interactive-ghost-foreground-default);
  }

  /* ---- disabled --------------------------------------------------------- */
  .row[data-disabled] {
    --zds-sub-menu-item-bg: transparent;
    --zds-sub-menu-item-fg: var(--foreground-disabled);
    cursor: default;
  }

  /* ---- focus: not modelled in Figma (spec) ------------------------------ */
  .row:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(-1 * var(--stroke-thick));
  }
`;

export default [
  css`
    :host {
      display: flex;
      width: 100%;
      /* As a grid/flex item the host must be allowed below its label's
         nowrap width, or the label never truncates. */
      min-width: 0;
    }
    :host([hidden]) {
      display: none;
    }
  `,
  rowStyles,
];
