import { css } from "lit";

/* Spec: specs/navigation-rail (Collapsible Menu Item). The header is a Sub Menu Item row: default when closed, the
   pressed ghost fill with radius/sm top corners when open. The rows sit on surface/subtle, space/sm padding and
   space/2xs apart, radius/sm bottom corners. Rows reveal by height on animations/smooth. */
export default css`
  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
    -webkit-tap-highlight-color: transparent;
    --_radius: var(--zebra-radius-none);
    --caret-indicator-motion: var(--animations-smooth);
  }

  :host([rounded]) {
    --_radius: var(--radius-sm);
  }

  .header {
    all: unset;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-width: 0;
    min-height: var(--control-lg);
    padding: var(--space-2xs) var(--space-md);
    border-radius: var(--_radius);
    cursor: pointer;
    background-color: var(--_bg);
    color: var(--_fg);
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    --_bg: transparent;
    --_fg: var(--foreground-primary);
    --icon-color: currentColor;
    --icon-size: var(--control-icon-sm);
  }

  .lead {
    display: flex;
    flex: 1;
    align-items: center;
    gap: var(--space-md);
    min-width: 0;
  }

  .icon {
    display: inline-flex;
    flex: none;
    line-height: 0;
  }

  .label {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .caret {
    flex: none;
  }

  @media (hover: hover), (hover: none) and (pointer: fine) {
    :host(:not([disabled])) .header:hover {
      --_bg: var(--interactive-ghost-background-hover);
    }
  }

  :host([open]) .header {
    --_bg: var(--interactive-ghost-background-pressed);
    --_fg: var(--interactive-neutral-foreground-default);
    border-radius: var(--_radius) var(--_radius) 0 0;
  }

  :host([disabled]) .header {
    cursor: not-allowed;
    --_fg: var(--foreground-disabled);
    color: var(--_fg);
    --icon-color: var(--_fg);
  }

  .header:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: calc(var(--stroke-thick) * -1);
  }

  .panel {
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    transition:
      grid-template-rows var(--animations-smooth),
      visibility 0s linear 250ms;
  }

  :host([open]) .panel {
    grid-template-rows: 1fr;
    visibility: visible;
    transition: grid-template-rows var(--animations-smooth);
  }

  .clip {
    min-height: 0;
    overflow: hidden;
  }

  .children {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
    padding: var(--space-sm);
    background-color: var(--surface-subtle);
    border-radius: 0 0 var(--_radius) var(--_radius);
  }

  @media (prefers-reduced-motion: reduce) {
    .panel,
    :host([open]) .panel {
      transition: none;
    }
  }
`;
