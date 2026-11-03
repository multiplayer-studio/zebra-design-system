import { css } from "lit";

/* Spec: specs/navigation-rail (Sub Menu Header). 72px tall (measured, no token), space/lg inline padding, a stroke/thin
   bottom border on border/default (spec warn: Figma's width is unbound). Glyph to title space/md, back button to title
   space/sm, actions at space/xxs. */
export default css`
  :host {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-sm);
    min-height: 72px;
    padding: 0 var(--space-lg);
    border-bottom: var(--stroke-thin) solid var(--zebra-border-default);
  }

  .lead {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    min-width: 0;
  }

  :host([type="sub-page"]) .lead {
    gap: var(--space-sm);
  }

  .icon {
    display: inline-flex;
    line-height: 0;
    --icon-size: var(--control-icon-md);
    --icon-color: var(--foreground-primary);
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-primary);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: var(--space-xxs);
  }

  .actions[hidden] {
    display: none;
  }
`;
