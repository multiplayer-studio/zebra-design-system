import { css } from "lit";

/* Spec: specs/navigation-rail (Navigation Header). Collapsed: the mark centred in a control/lg column. Expanded: mark
   and label/medium title at space/sm, the action at the far end. */
export default css`
  :host {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: var(--control-lg);
    padding: var(--space-none);
  }

  /* Start-aligned and clipped, so while the rail widens the gear waits off the end instead of sitting on the mark. */
  :host([expanded]) {
    justify-content: flex-start;
    overflow: hidden;
  }

  zeta-icon-button {
    flex: none;
    margin-inline-start: auto;
  }

  .brand {
    display: flex;
    align-items: center;
    flex: 1 1 0;
    gap: var(--space-sm);
    padding: 0 var(--space-2xs);
  }

  ::slotted([slot="mark"]) {
    flex: none;
  }

  :host([type="logo"]) ::slotted([slot="mark"]) {
    height: var(--control-target-min);
  }

  .title {
    min-width: 0;
    width: 0;
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: var(--text-label-medium);
    letter-spacing: var(--label-medium-letter-spacing);
    color: var(--foreground-primary);
  }
`;
