import { css } from "lit";
/**
 * Every value is a semantic token. Size: control/icon-sm, -md, -lg circles,
 * the glyph the circle less space/3xs each side (12 / 16 / 24; the outer two
 * have no icon token — spec warn).
 *
 * Spec: specs/badges/icon-indicator.spec.json
 */
export default css `
    :host {
      --zds-indicator-box: var(--control-icon-md);
      display: inline-flex;
      vertical-align: middle;
    }
    :host([hidden]) {
      display: none;
    }
    :host([size="small"]) {
      --zds-indicator-box: var(--control-icon-sm);
    }
    :host([size="large"]) {
      --zds-indicator-box: var(--control-icon-lg);
    }
    .root {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      inline-size: var(--zds-indicator-box);
      block-size: var(--zds-indicator-box);
      border-radius: var(--radius-pill);
      background: var(--zds-icon-indicator-fill, var(--foreground-secondary));
      color: var(--zds-icon-indicator-foreground, var(--foreground-inverse));
    }
    /* The glyph is the box less space/3xs each side (12 / 16 / 24). */
    zds-icon {
      --zds-icon-box: calc(var(--zds-indicator-box) - 2 * var(--space-3xs));
    }
  `;
