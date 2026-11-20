import { css } from "lit";
import "@zebra-design-system/icons/icons.css";

/* Spec: specs/avatar. Only medium is token-bound (control/lg, stroke/thick, label/large font size); every other step
   is the authored Figma value. Badges and initials are a third of the avatar and the ring a 24th, the ratios measured
   across all nine sizes (spec issues).  */
export default css`
  :host {
    --computed-avatar-size: var(--avatar-size, var(--control-lg));
    --badge-size: calc(var(--computed-avatar-size) / 3);
    display: block;
    position: relative;
    width: var(--computed-avatar-size);
    min-width: var(--computed-avatar-size);
    height: var(--computed-avatar-size);
    --icon-size: calc(var(--computed-avatar-size) * 0.5);
  }

  :host([size="xxxs"]) {
    --avatar-size: 24px;
    --ring-weight: 1px;
    --initials-size: 8px;
  }

  :host([size="xxs"]) {
    --avatar-size: 32px;
    --ring-weight: 1.33px;
    --initials-size: 10.67px;
  }

  :host([size="xs"]) {
    --avatar-size: 36px;
    --ring-weight: 1.5px;
    --initials-size: 12px;
  }

  :host([size="s"]) {
    --avatar-size: 40px;
    --ring-weight: 1.67px;
    --initials-size: 13.33px;
  }

  :host([size="m"]) {
    --avatar-size: var(--control-lg);
  }

  /* Figma measures large at 60px; the metadata's 64px disagrees (spec issue). */
  :host([size="l"]) {
    --avatar-size: 60px;
    --ring-weight: 2.5px;
    --initials-size: 20px;
  }

  :host([size="xl"]) {
    --avatar-size: 80px;
    --ring-weight: 3.33px;
    --initials-size: 26.67px;
  }

  :host([size="xxl"]) {
    --avatar-size: 120px;
    --ring-weight: 5px;
    --initials-size: 40px;
  }

  :host([size="xxxl"]) {
    --avatar-size: 200px;
    --ring-weight: 8.33px;
    --initials-size: 66.67px;
  }

  .avatar {
    border-radius: var(--radius-pill);
    overflow: hidden;
    /* Raw white: the spec records no token on the initials fill (spec issue). */
    color: var(--avatar-initials-color, #ffffff);
    font-family: var(--label-large-font-family);
    font-size: var(--initials-size, var(--label-large-font-size));
    font-weight: var(--label-large-font-weight);
    line-height: 1;
    background-color: var(--avatar-color, var(--_swatch, var(--chart-series-4)));
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    text-transform: uppercase;
  }

  :host([swatch-color="blue"]) {
    --_swatch: var(--chart-series-1);
  }
  :host([swatch-color="sea"]) {
    --_swatch: var(--chart-series-9);
  }
  :host([swatch-color="yellow"]) {
    --_swatch: var(--chart-series-7);
  }
  :host([swatch-color="orange"]) {
    --_swatch: var(--chart-series-11);
  }
  :host([swatch-color="green"]) {
    --_swatch: var(--chart-series-6);
  }
  :host([swatch-color="burgundy"]) {
    --_swatch: var(--chart-series-5);
  }

  ::slotted(img) {
    height: 100%;
    width: 100%;
    display: flex;
    object-fit: cover;
  }

  ::slotted(zeta-icon) {
    --icon-color: var(--foreground-inverse);
  }

  /* The ring sits outside the content circle, the confirmed intent; Figma's raw stroke is inside-aligned. */
  .ring {
    position: absolute;
    inset: calc(var(--ring-weight, var(--stroke-thick)) * -1);
    border: var(--ring-weight, var(--stroke-thick)) solid var(--avatar-border-color, var(--zebra-border-default));
    border-radius: var(--radius-pill);
    pointer-events: none;
  }

  /* Every badge has a foreground/inverse rim (Figma's "void" layer) a 16th of its size; only Offline recolours it. */
  .badge,
  .slotted-status {
    position: absolute;
    right: 0;
  }

  .badge {
    all: unset;
    position: absolute;
    right: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--badge-size);
    height: var(--badge-size);
    border-radius: var(--radius-pill);
    border: calc(var(--badge-size) / 16) solid var(--foreground-inverse);
    color: var(--foreground-inverse);
    --icon-size: calc(var(--badge-size) * 0.625);
    --icon-color: var(--foreground-inverse);
  }

  .close {
    top: 0;
    background: var(--chart-series-12);
    cursor: pointer;
  }

  .close:focus-visible {
    outline: var(--stroke-thick) solid var(--border-focus);
    outline-offset: var(--stroke-thick);
  }

  .status,
  .slotted-status {
    bottom: 0;
  }

  .glyph {
    font-family: "ZdsIcons-Rounded";
    font-size: calc(var(--badge-size) * 0.625);
    line-height: 1;
  }

  :host([status="available"]) .status {
    background: var(--chart-positive);
  }
  :host([status="away"]) .status {
    background: var(--chart-series-8);
  }
  :host([status="busy"]) .status {
    background: var(--chart-negative);
  }
  :host([status="dnd"]) .status {
    background: var(--chart-series-4);
  }
  :host([status="on-shift"]) .status {
    background: var(--chart-series-1);
  }
  :host([status="offline"]) .status {
    background: var(--foreground-inverse);
    border-color: var(--foreground-secondary);
    color: var(--foreground-secondary);
  }
`;
