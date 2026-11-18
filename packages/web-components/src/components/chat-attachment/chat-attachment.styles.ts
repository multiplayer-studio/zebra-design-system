import { css } from "lit";

/** File tile, video preview or audio waveform. Spec: specs/chat-message/chat-message.spec.json */
export default css`
  :host {
    position: relative; box-sizing: border-box; display: flex; align-items: center; gap: var(--space-sm);
    max-inline-size: 100%; padding: var(--space-sm) var(--space-xs);
    background: var(--surface-card); border: var(--stroke-thin) solid var(--border-subtle); border-radius: var(--radius-none);
  }
  :host([hidden]) { display: none; }
  :host([rounded]) { border-radius: var(--radius-lg); }
  .tile { flex: none; display: grid; place-items: center; inline-size: var(--control-sm); block-size: var(--control-sm); color: var(--interactive-primary-background-default); }
  .text { flex: 1 1 auto; min-inline-size: 0; display: flex; flex-direction: column; gap: var(--space-2xs); padding-inline-end: var(--space-lg); }
  .name { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font: var(--text-label-medium); color: var(--foreground-primary); }
  .meta, .duration { font: var(--text-body-xsmall); color: var(--foreground-tertiary); font-variant-numeric: tabular-nums; }
  :host([type="video"]) {
    display: grid; place-items: center; inline-size: min(100%, calc(6 * var(--control-lg))); aspect-ratio: 16 / 9;
    padding: 0; border: 0; overflow: hidden; background: var(--surface-subtle); color: var(--foreground-tertiary);
  }
  :host([type="video"]) > * { grid-area: 1 / 1; }
  /* The placeholder glyph sits in the top-start corner, clear of the centred play control (Figma). */
  :host([type="video"]) > .poster { place-self: start; margin: var(--space-sm); }
  :host([type="video"]) :is(video, img) { inline-size: 100%; block-size: 100%; object-fit: cover; }
  :host([type="video"][playing]) .play { opacity: 0; }
  :host([type="video"][playing]:is(:hover, :focus-within)) .play { opacity: 1; }
  .chip {
    align-self: end; justify-self: end; margin: var(--space-xs); padding: var(--space-3xs) var(--space-xs);
    border-radius: var(--radius-pill); background: var(--surface-inverse); color: var(--foreground-inverse); font: var(--text-body-xsmall);
  }
  /* Audio hugs its content by default, capped at its container (spec layout: Hug, capped). */
  :host([type="audio"]) { inline-size: fit-content; padding-inline-end: var(--space-md); }
  /* Audio's play is Icon Button Size=small at control/xs (spec). */
  .audio-play::part(button) { inline-size: var(--control-xs); block-size: var(--control-xs); min-inline-size: var(--control-xs); padding: 0; }
  .wave { display: inline-flex; align-items: center; gap: var(--space-3xs); block-size: var(--control-icon-md); padding-inline-end: var(--space-lg); }
  .wave > span { inline-size: var(--stroke-thick); block-size: calc(var(--zds-level) * 100%); border-radius: var(--radius-pill); background: var(--interactive-primary-background-disabled); }
  .wave > span[data-played] { background: var(--interactive-primary-background-default); }
  /* Download is a text Icon Button whose glyph Figma overrides to foreground/secondary, in every state. */
  .download { color: var(--foreground-secondary); }
  .download::part(button), .download::part(button):is(:hover, :active) { --zds-button-fg: var(--foreground-secondary); }
  /* Play and pause are primary Icon Buttons that Figma overrides to a surface/card fill with an
     interactive/primary/background/default glyph (border at stroke/base, so none shows). Hover and pressed have no
     Figma state; they take the neutral interactive tints. */
  :is(.play, .audio-play)::part(button) {
    --zds-button-bg: var(--surface-card);
    --zds-button-border: var(--surface-card);
    --zds-button-fg: var(--interactive-primary-background-default);
  }
  :is(.play, .audio-play)::part(button):hover { --zds-button-bg: var(--interactive-neutral-background-hover); --zds-button-border: var(--surface-card); --zds-button-fg: var(--interactive-primary-background-default); }
  :is(.play, .audio-play)::part(button):active { --zds-button-bg: var(--interactive-neutral-background-pressed); --zds-button-border: var(--surface-card); --zds-button-fg: var(--interactive-primary-background-default); }
`;
