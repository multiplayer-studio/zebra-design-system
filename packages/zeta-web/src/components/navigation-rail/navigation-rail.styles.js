import { css } from "lit";

/* Spec: specs/navigation-rail. On surface/section with no fill of its own. The icon rail is 72px narrow (control/lg
   items plus space/md either side) and 200px wide (measured, no token), space/card by space/md padding, space/md
   between header, menu and footer, space/xxs between items. The panel hugs its rows from 240px (owner decision) and
   carries the only vertical border, stroke/thin on border/default (spec warn: Figma's width is unbound). */
export default css`
  :host {
    display: flex;
    height: 100%;
    width: min-content;
  }

  .root {
    display: flex;
    height: 100%;
    background-color: var(--surface-section);
    color: var(--foreground-primary);
  }

  .rail {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    width: calc(var(--control-lg) + var(--space-md) * 2);
    height: 100%;
    padding: var(--space-card) var(--space-md);
    overflow: hidden;
    container-type: inline-size;
    --_wide-width: min(200px, var(--navigation-rail-max-width, 200px));
  }

  :host([expanded]) .rail {
    width: var(--_wide-width);
  }

  .root[data-ready] .rail {
    transition: width var(--animations-smooth);
  }

  .header,
  .menu,
  .footer {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
    min-width: 0;
  }

  .header {
    gap: var(--space-md);
  }

  .header[hidden],
  .footer[hidden],
  .panel[hidden],
  .sub-menu[hidden] {
    display: none;
  }

  .menu {
    flex: 1;
    overflow: hidden;
  }

  /* The action is always the rail's content width (control/lg when narrow). Its label shrinks to nothing first, so
     the glyph stays centred, and its spacing grows back only once there is room for it. */
  .action {
    width: 100cqi;
  }

  .action::part(button) {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  }

  .action::part(label) {
    min-width: 0;
    overflow: hidden;
    padding-inline: clamp(0px, (100cqi - var(--control-lg)) / 4, var(--space-sm));
  }

  /* While wide, and all the way through narrowing, the content keeps its wide layout and the rail's width clips it,
     so glyphs stay put and only the labels are eaten. */
  .rail.wide > .header,
  .rail.wide > .menu,
  .rail.wide > .footer {
    min-width: calc(var(--_wide-width) - var(--space-md) * 2);
  }

  .panel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: max-content;
    min-width: min(240px, var(--navigation-rail-sub-menu-max-width, 240px));
    max-width: var(--navigation-rail-sub-menu-max-width, none);
    height: 100%;
    border-inline-start: var(--stroke-thin) solid var(--zebra-border-default);
  }

  .sub-menu {
    display: flex;
    flex-direction: column;
    gap: var(--space-xxs);
    padding: var(--space-sm);
    overflow-y: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    .root[data-ready] .rail {
      transition: none;
    }
  }
`;
