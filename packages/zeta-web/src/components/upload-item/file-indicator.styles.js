import { css } from "lit";

/* File Indicator — a control/lg tile at radius/sm on surface/shade, the badge centred. */
export default css`
  :host {
    position: relative;
    flex: none;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: var(--control-lg);
    block-size: var(--control-lg);
    border-radius: var(--radius-sm);
    isolation: isolate;
  }
  :host(:not([rounded])) {
    border-radius: var(--zebra-radius-none);
  }
  /* surface/shade at Figma's literal 0.1 paint opacity (spec issue: no token for it). */
  :host::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: var(--surface-shade);
    opacity: 0.1;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    padding-inline: var(--space-xs);
    border-radius: var(--radius-xs);
    font: var(--text-body-xsmall);
    letter-spacing: var(--body-xsmall-letter-spacing);
    color: var(--foreground-secondary);
    --icon-size: var(--control-icon-sm);
  }
`;
