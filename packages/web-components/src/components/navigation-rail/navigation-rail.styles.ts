import { css } from "lit";
import { rowStyles } from "../sub-menu-item/sub-menu-item.styles.js";

/**
 * The Navigation Rail family — rail, Navigation Header, Sub Menu Header and
 * Collapsible Menu Item. Every value is a semantic token from the generated
 * CSS layer, except the three widths and one height Figma measures but never
 * binds (commented where used). Mirrors packages/react-baseui
 * navigation-rail.css rule for rule.
 *
 * Spec: specs/navigation-rail/navigation-rail.spec.json
 */

/* ======================================================================== */
/* Navigation Rail                                                          */
/* ======================================================================== */
export const railStyles = css`
  :host {
    display: flex;
    box-sizing: border-box;
    /* Locked mode (owner decision): the host carries .mode-dark / .mode-light
       for the tokens; color-scheme keeps the UA's own parts (the menu's
       scrollbar) in the same mode. */
    color-scheme: dark;
    /* Fills its parent's height (spec warn "Height": Figma draws 991px
       fixed). With no definite parent height it hugs its content. */
    height: 100%;
  }
  :host([inverse]) {
    color-scheme: light;
  }
  :host([hidden]) {
    display: none;
  }
  [hidden] {
    display: none !important;
  }

  .root {
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    align-items: stretch;
    gap: var(--space-none);
    padding: var(--space-none);
    /* The only fill: rail and panel both show this surface through. */
    background: var(--surface-section);
    color: var(--foreground-primary);
  }

  /* ---- main rail -------------------------------------------------------- */
  .rail {
    box-sizing: border-box;
    display: flex;
    flex: none;
    flex-direction: column;
    gap: var(--space-md);
    padding: var(--space-card) var(--space-md);
    /* Narrow: the 48px (control/lg) items plus space/md either side =
       Figma's 72px. (The Dev Deviation frame records an older 64px
       collapsed-only build; Figma and the tokens say 72.) */
    width: calc(var(--control-lg) + 2 * var(--space-md));
    overflow: hidden; /* clips (spec) */
  }
  :host([expanded]) .rail {
    /* Wide: Figma's measured 200px (176px items + padding). No width token
       exists; carried as a literal. */
    width: 200px;
  }

  .header {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }
  :host([expanded]) .header {
    align-items: stretch;
  }
  .action {
    flex: none;
  }
  :host([expanded]) .action {
    width: 100%; /* the wide Button fills (spec) */
  }

  /* The menu list absorbs the height left between header and footer, so the
     footer stays pinned. Basis auto (its content), never 0: with no definite
     rail height a 0 basis would collapse it. It scrolls when a fixed-height
     rail runs out of room. */
  .menu,
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
  }
  .menu {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    /* The Menu Slot's extra space/xs inline padding (narrow only, spec warn
       "Menu Slot padding") belongs to a Figma-only per-Label slot split;
       the menu is one list here. */
  }
  .footer {
    flex: none;
  }
  :host([expanded]) :is(.menu, .footer) {
    align-items: stretch;
  }
  :is(.menu, .footer) ::slotted(zds-divider) {
    align-self: stretch;
  }

  /* ---- sub menu panel --------------------------------------------------- */
  .panel {
    box-sizing: border-box;
    display: flex;
    flex: none;
    flex-direction: column;
    gap: var(--space-none);
    /* Figma's fixed 240px (min 240px); no width token exists. */
    width: 240px;
    /* The one vertical border, on the leading edge. Figma's width is a raw
       1px (spec warn "Unbound border widths"): stroke/thin. */
    border-inline-start: var(--stroke-thin) solid var(--border-default);
    overflow: hidden;
  }
  .sub-menu {
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-sm);
    overflow-y: auto;
  }
`;

/* ======================================================================== */
/* Navigation Header                                                        */
/* ======================================================================== */
export const headerStyles = css`
  :host {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-none);
    padding: var(--space-none);
    min-width: var(--control-lg);
    /* Figma's 56px has no token: control/lg plus space/sm is the same value. */
    min-height: calc(var(--control-lg) + var(--space-sm));
    color: var(--foreground-primary);
  }
  :host([hidden]) {
    display: none;
  }
  :host([expanded]) {
    justify-content: space-between;
    width: 100%;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    min-width: 0;
    padding-inline: var(--space-xs);
  }
  .logo {
    height: var(--control-target-min);
  }
  /* The mark and the action keep their size; only the title gives way. */
  .brand > :not(.title),
  zds-icon-button {
    flex: none;
  }
  .title {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
  }
`;

/* ======================================================================== */
/* Sub Menu Header                                                          */
/* ======================================================================== */
export const subMenuHeaderStyles = css`
  :host {
    box-sizing: border-box;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    padding-inline: var(--space-lg);
    /* Figma fixes it at 72px tall; no token exists. The same sum as the
       narrow rail: control/lg + 2 × space/md. */
    min-height: calc(var(--control-lg) + 2 * var(--space-md));
    /* Raw 1px in Figma (spec warn): stroke/thin. */
    border-bottom: var(--stroke-thin) solid var(--border-default);
    color: var(--foreground-primary);
  }
  :host([hidden]),
  [hidden] {
    display: none !important;
  }
  .lead {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    min-width: 0;
  }
  /* Type=sub page: the back Icon Button sits space/sm from the title (spec,
     changed 2026-10-21); Type=default keeps space/md. */
  :host([type="sub-page"]) .lead {
    gap: var(--space-sm);
  }
  .icon,
  .back {
    flex: none;
  }
  .title {
    margin: 0;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--label-medium-font-family), system-ui, sans-serif;
    font-size: var(--label-medium-font-size);
    font-weight: var(--label-medium-font-weight);
    line-height: var(--label-medium-line-height);
    letter-spacing: var(--label-medium-letter-spacing);
  }
  .actions {
    display: flex;
    flex: none;
    align-items: center;
    gap: var(--space-xs);
  }
`;

/* ======================================================================== */
/* Collapsible Menu Item                                                    */
/* ======================================================================== */
export const collapsibleStyles = [
  rowStyles,
  css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-none);
      width: 100%;
      min-width: 0;
      /* Shape=rounded (the default) is radius/sm, sharp radius/none — the
         rail's shape, code-only (owner decision). One value for the open
         group's corners, the header's top corners (via the row) and the
         children's. */
      --zds-collapsible-menu-item-radius: var(--radius-sm);
    }
    :host([shape="sharp"]) {
      --zds-collapsible-menu-item-radius: var(--radius-none);
    }
    :host([hidden]) {
      display: none;
    }
    :host([open]) {
      border-radius: var(--zds-collapsible-menu-item-radius);
      overflow: hidden;
    }
    /* Open, the header reads as pressed (Figma State=active) with the radius
       on its top corners only — the token alone, no extra paint opacity
       (spec warn "Double alpha"). */
    :host([open]) .row.header:not([data-disabled]) {
      --zds-sub-menu-item-bg: var(--interactive-ghost-background-pressed);
      border-end-start-radius: var(--radius-none);
      border-end-end-radius: var(--radius-none);
    }
    .panel[hidden] {
      display: none;
    }
    .children {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      padding: var(--space-sm);
      background: var(--surface-menu);
      border-end-start-radius: var(--zds-collapsible-menu-item-radius);
      border-end-end-radius: var(--zds-collapsible-menu-item-radius);
    }
  `,
];
