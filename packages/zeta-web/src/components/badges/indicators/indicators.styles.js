import { css } from "lit";

/* Two specs share this element: specs/badges/icon-indicator (type="icon") and specs/notification-indicator
   (type="notification"). Both are fully round, sized per Size, with no visible ring by default. */
export default css`
  :host {
    width: fit-content;
    display: block;
  }

  .container {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-pill);
    overflow: hidden;
  }

  /* ---- Notification ------------------------------------------------------------------------------------------
     One fixed destructive fill. The border is bound to border/inverse at stroke/base (zero), a theming hook a
     high-contrast set can raise. */
  :host([type="notification"]) .container {
    background-color: var(--interactive-destructive-background-default);
    border: var(--stroke-base) solid var(--border-inverse);
    color: var(--foreground-on-strong);
    font: var(--text-indicator-medium);
    letter-spacing: var(--indicator-medium-letter-spacing);
  }

  /* small: a plain 8 dot with no count. The 8 and 16 squares have no size tokens (spec issue). */
  :host([type="notification"]) .container.small {
    width: 8px;
    height: 8px;
  }

  /* medium: a fixed 16 square holding a single digit. */
  :host([type="notification"]) .container.medium {
    width: 16px;
    height: 16px;
  }

  /* large: hugs the count from a control/icon-lg minimum, 20 tall with the count centred. */
  :host([type="notification"]) .container.large {
    min-width: var(--control-icon-lg);
    height: 20px;
    padding: 0 var(--space-2xs);
    white-space: nowrap;
  }

  /* ---- Icon ----------------------------------------------------------------------------------------------------
     A foreground/secondary circle with an on-strong glyph. The 12 and 24 glyph sizes are scaled Icons with no
     size token (spec issue). */
  :host([type="icon"]) .container {
    background-color: var(--foreground-secondary);
    color: var(--foreground-on-strong);
    --icon-color: var(--foreground-on-strong);
  }
  :host([type="icon"]) .container.small {
    width: var(--control-icon-sm);
    height: var(--control-icon-sm);
    --icon-size: 12px;
  }
  :host([type="icon"]) .container.medium {
    width: var(--control-icon-md);
    height: var(--control-icon-md);
    --icon-size: var(--control-icon-sm);
  }
  :host([type="icon"]) .container.large {
    width: var(--control-icon-lg);
    height: var(--control-icon-lg);
    --icon-size: 24px;
  }
  :host([type="icon"]) zeta-icon,
  :host([type="icon"]) ::slotted(zeta-icon) {
    --icon-color: var(--foreground-on-strong);
    color: var(--foreground-on-strong);
  }
`;
