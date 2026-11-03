import { css } from "lit";

/* Spec: specs/tooltip. A bubble on surface/inverse with space/xxs by space/sm padding, label/small on
   foreground/inverse, radius/sm (radius/none when sharp) and Shadow/medium. The pointer is an 8 by 4 surface/inverse
   triangle outside the bubble, centred on the edge named by point (the edge facing the trigger); rounded rounds its
   tip. The pointer has no size token and holds its size under condensed (spec warn). A long label wraps inside a
   max width (spec warn). */
export default css`
  :host {
    display: inline-block;
    width: fit-content;
    --_fill: var(--surface-inverse);
  }

  .container {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    max-width: 240px;
    padding: var(--space-xxs) var(--space-sm);
    border-radius: var(--zebra-radius-none);
    background-color: var(--_fill);
    box-shadow:
      var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft),
      var(--shadow-small-x) var(--shadow-small-y) var(--shadow-small-blur) var(--shadow-soft);
  }

  /* Outranks Contourable's :host > * radius. */
  :host([rounded]) .container {
    border-radius: var(--radius-sm);
  }
  :host(:not([rounded])) .container {
    border-radius: var(--zebra-radius-none);
  }

  slot {
    display: block;
    font: var(--text-label-small);
    letter-spacing: var(--label-small-letter-spacing);
    color: var(--foreground-inverse);
    text-align: center;
    overflow-wrap: anywhere;
    --icon-color: var(--foreground-inverse);
    --icon-size: var(--label-small-line-height);
  }

  .point {
    position: absolute;
    fill: var(--_fill);
  }

  .point path {
    fill: inherit;
  }

  :host([point="bottom"]) .point {
    top: 100%;
    left: calc(50% - 4px);
  }

  :host([point="top"]) .point {
    bottom: 100%;
    left: calc(50% - 4px);
    transform: rotate(180deg);
  }

  :host([point="left"]) .point {
    right: calc(100% - 2px);
    top: calc(50% - 2px);
    transform: rotate(90deg);
  }

  :host([point="right"]) .point {
    left: calc(100% - 2px);
    top: calc(50% - 2px);
    transform: rotate(-90deg);
  }
`;
