import { css } from "lit";

/**
 * Spec: specs/avatar-rail/avatar-rail.spec.json
 *
 * Every size is medium scaled by diameter / 48, the Avatar's own method, so
 * only medium binds tokens (space/neg/xl, control/lg, stroke/thick,
 * label/large) and every other step is the same ratio of the diameter:
 * overlap -1/4, cutout and counter ring 1/24, count text 1/3 with a 1/2
 * line height (spec note "bindingDrift"). The diameter ladder repeats
 * `<zds-avatar>`'s so the counter lines up with the avatars beside it.
 */
export default css`
  :host {
    display: inline-flex;
    vertical-align: middle;
    --zds-avatar-rail-gap: calc(var(--zds-avatar-rail-size) / -4);
    --zds-avatar-rail-stroke: calc(var(--zds-avatar-rail-size) / 24);
  }

  :host([hidden]) {
    display: none;
  }

  .rail {
    display: inline-flex;
    align-items: center;
  }

  ::slotted(zds-avatar),
  .overflow {
    position: relative;
    flex: none;
  }

  /* The overlap: each position after the first pulls back a quarter
     diameter, the counter included. */
  ::slotted(zds-avatar:not(:first-child)),
  .overflow {
    margin-inline-start: var(--zds-avatar-rail-gap);
  }

  /* The cutout: a border/inverse ring outside each avatar, so overlapped
     circles read as separate. The avatar's own ring is off (parent owned). */
  ::slotted(zds-avatar) {
    border-radius: var(--radius-pill);
    box-shadow: 0 0 0 var(--zds-avatar-rail-stroke) var(--border-inverse);
  }

  /* The counter: drawn by the rail, not an Avatar. It keeps a border/default
     ring inside and takes no cutout, as built in Figma; under end stacking it
     paints over the last avatar with nothing between them (spec warn
     "overflow vs avatars", open). */
  .overflow {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--zds-avatar-rail-size);
    height: var(--zds-avatar-rail-size);
    border-radius: var(--radius-pill);
    background: var(--feedback-neutral-background-subtle);
    border: var(--zds-avatar-rail-stroke) solid var(--border-default);
    color: var(--foreground-primary);
    overflow: hidden;
  }

  .count {
    font-family: var(--label-large-font-family), system-ui, sans-serif;
    font-weight: var(--label-large-font-weight);
    letter-spacing: var(--label-large-letter-spacing);
    font-size: calc(var(--zds-avatar-rail-size) / 3);
    line-height: calc(var(--zds-avatar-rail-size) / 2);
    white-space: nowrap;
  }

  /* ---- size --------------------------------------------------------- */
  :host,
  :host([size="xxxsmall"]) { --zds-avatar-rail-size: 24px; }
  :host([size="xxsmall"]) { --zds-avatar-rail-size: 32px; }
  :host([size="xsmall"]) { --zds-avatar-rail-size: 36px; }
  :host([size="small"]) { --zds-avatar-rail-size: 40px; }
  :host([size="medium"]) {
    --zds-avatar-rail-size: var(--control-lg);
    --zds-avatar-rail-gap: var(--space-neg-xl);
    --zds-avatar-rail-stroke: var(--stroke-thick);
  }
  :host([size="medium"]) .count {
    font-size: var(--label-large-font-size);
    line-height: var(--label-large-line-height);
  }
  :host([size="large"]) { --zds-avatar-rail-size: 60px; }
  :host([size="xlarge"]) { --zds-avatar-rail-size: 80px; }
  :host([size="xxlarge"]) { --zds-avatar-rail-size: 120px; }
  :host([size="xxxlarge"]) { --zds-avatar-rail-size: 200px; }
`;
