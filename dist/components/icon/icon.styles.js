import { css } from "lit";
import "@zebra-fed/zeta-icons/index.css";
export default [
    css `
    :host([rounded]) {
      --icon-font: "zeta-icons-round";
    }
    :host(:not([rounded])) {
      --icon-font: "zeta-icons-sharp";
    }

    :host,
    slot {
      display: flex;
      flex-shrink: 0;
      max-width: initial;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-weight: normal;
      font-style: normal;
      text-transform: none;
      letter-spacing: normal;
      word-wrap: normal;
      white-space: nowrap;
      direction: ltr;
      text-rendering: optimizeLegibility;
      font-feature-settings: "liga";
      user-select: none;
      transition: all 0.3s ease-in-out;
      /* specs/icon binds no colour: the glyph takes the foreground of whatever embeds it. Zeta does that through
         --icon-color, which the embedding component sets. The fallback stays --main-default rather than currentColor:
         icons inside a native <button> would otherwise take the browser's button text colour (black, even in dark). */
      color: var(--icon-color, var(--main-default));
      font-size: var(--icon-size, var(--spacing-2xl));
      line-height: var(--icon-size, 1);
      font-family: var(--icon-font, "zeta-icons-round");
      width: var(--icon-size, var(--spacing-2xl));
      height: var(--icon-size, var(--spacing-2xl));
      -webkit-text-stroke-width: var(--icon-border-width, 2px);
      -webkit-text-stroke-color: var(--icon-border-color, transparent);
      paint-order: stroke fill;
    }

    @media (prefers-reduced-motion: reduce) {
      :host,
      slot {
        transition: none;
      }
    }

    /* Size: control/icon-xs, -sm, -md and -lg (specs/icon). Width and height both follow, so the icon is always square
       (spec issue "gaps": Figma binds only the height). */
    :host([size="xsmall"]) {
      --icon-size: var(--control-icon-xs);
    }
    :host([size="small"]) {
      --icon-size: var(--control-icon-sm);
    }
    :host([size="medium"]) {
      --icon-size: var(--control-icon-md);
    }
    :host([size="large"]) {
      --icon-size: var(--control-icon-lg);
    }

    /* Framed: a fixed control/target-min box with the glyph centred inside. No fill, no radius, no padding. */
    :host([framed]) {
      box-sizing: border-box;
      width: var(--control-target-min);
      height: var(--control-target-min);
      align-items: center;
      justify-content: center;
    }
    /* xsmall frames to control/xs (24px), as Figma draws it. */
    :host([framed][size="xsmall"]) {
      width: var(--control-xs);
      height: var(--control-xs);
    }

    :host ::slotted(svg) {
      width: var(--icon-size, var(--spacing-2xl));
      height: var(--icon-size, var(--spacing-2xl));
      fill: var(--icon-color, var(--main-default));
    }
  `
];
//# sourceMappingURL=icon.styles.js.map