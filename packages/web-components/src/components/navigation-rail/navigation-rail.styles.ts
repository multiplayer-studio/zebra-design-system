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
    /* Figma's measured widths; no width tokens exist, so they are literals,
       named once. Wide rail: 176px items + padding. Panel: hugs its list,
       never narrower than Figma's 240px minimum. */
    /* rail-max-width / sub-menu-max-width set --zds-navigation-rail-max-width
       and --zds-navigation-rail-sub-menu-max-width on the host; unset, there
       is no cap. A cap below a minimum lowers the minimum, so the cap always
       applies. */
    --zds-navigation-rail-wide-width: min(200px, var(--zds-navigation-rail-max-width, 200px));
    --zds-navigation-rail-panel-max-width: var(--zds-navigation-rail-sub-menu-max-width, calc(infinity * 1px));
    --zds-navigation-rail-panel-min-width: min(240px, var(--zds-navigation-rail-panel-max-width));
    /* Lets the panel animate to and from its content width (width: max-content). */
    interpolate-size: allow-keywords;
    /* Every opening and closing in the rail uses animations/smooth (owner
       decision), the caret included: zds-caret-indicator reads this hook
       (it inherits into slotted content and shadow roots) and keeps its own
       spring everywhere else. */
    --zds-caret-indicator-motion: var(--animations-smooth);
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
    /* Clip at the content edge where supported, so wide content held
       through a collapse leaves nothing in the padding at the end. */
    overflow: clip;
    overflow-clip-margin: content-box;
  }
  :host([expanded]) .rail {
    width: var(--zds-navigation-rail-wide-width);
  }

  .header {
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
  }
  /* The content's form follows [data-wide], not [expanded]: the rail holds
     the wide layout until a collapse has finished. */
  .root[data-wide] .header {
    align-items: stretch;
  }
  .action {
    flex: none;
  }
  .root[data-wide] .action {
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
  .root[data-wide] :is(.menu, .footer) {
    align-items: stretch;
  }
  :is(.menu, .footer) ::slotted(zds-divider) {
    align-self: stretch;
  }
  /* Wide content is laid out at its final width whatever the rail's current
     width, so the animating rail clips it (no reflow, no wrapping). */
  .root[data-wide] :is(.header, .menu, .footer) {
    min-width: calc(var(--zds-navigation-rail-wide-width) - 2 * var(--space-md));
  }

  /* ---- sub menu panel --------------------------------------------------- */
  /* Hug: one column as wide as the widest of the header and the rows (at
     least the 240px minimum), every one stretched to it, so rows share one
     width. The column keeps that size while the panel's own width animates,
     so the moving edge clips the content rather than reflowing it. Rows:
     the header, then the list, which shrinks and scrolls when the rail is
     short. */
  .panel {
    box-sizing: border-box;
    display: grid;
    flex: none;
    grid-template-columns: max-content;
    grid-template-rows: auto minmax(0, max-content);
    align-content: start; /* spare height stays below the list, not in the header */
    gap: var(--space-none);
    width: max-content;
    /* The one vertical border, on the leading edge. Figma's width is a raw
       1px (spec warn "Unbound border widths"): stroke/thin. */
    border-inline-start: var(--stroke-thin) solid var(--border-default);
    overflow: hidden;
  }
  /* Closed (no sub menu slot filled): zero-width and out of the
     accessibility tree, so the overall width follows. Its height is the
     rail's, never zero. */
  .panel:not([data-open]) {
    width: 0;
    border-inline-start-width: 0;
    visibility: hidden;
  }
  /* The panel's two grid items: the slotted header (only that slot — the
     rows in the sub-menu slot are the list's children, not the panel's) and
     the list. */
  .panel > .sub-menu,
  .panel > slot[name="sub-menu-header"]::slotted(*) {
    grid-row: 1;
    /* Border-box, so the list's padding sits inside the minimum and the cap. */
    box-sizing: border-box;
    min-width: calc(var(--zds-navigation-rail-panel-min-width) - var(--stroke-thin));
    /* The cap clamps each item's contribution to the hugged column, so the
       column stops at it and labels truncate rather than being clipped. */
    max-width: calc(var(--zds-navigation-rail-panel-max-width) - var(--stroke-thin));
  }
  .panel > .sub-menu { grid-row: 2; }
  .sub-menu {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding: var(--space-sm);
    overflow-y: auto;
  }

  /* ---- motion: animations/smooth (owner decision) ----------------------- */
  /* Only once the rail has painted ([data-ready]), so nothing animates on
     the first render; each transition runs once per change, never
     continuously. */
  .root[data-ready] .rail {
    transition: width var(--animations-smooth);
  }
  .root[data-ready] .panel {
    transition:
      width var(--animations-smooth),
      border-inline-start-width var(--animations-smooth),
      visibility var(--animations-smooth);
  }
  @media (prefers-reduced-motion: reduce) {
    .root[data-ready] :is(.rail, .panel) {
      transition: none;
    }
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
      /* Never widens the sub menu (owner decision): its content does not
         count toward the panel's hugged width, and it stretches to the width
         the panel's other content (min 240px) gives it. Its labels truncate. */
      contain: inline-size;
      /* Shape=rounded (the default) is radius/sm, sharp radius/none — the
         rail's shape, code-only (owner decision). One value for the open
         group's corners, the header's top corners (via the row) and the
         children's. */
      --zds-collapsible-menu-item-radius: var(--radius-sm);
      /* The caret turns on animations/smooth with the rows (owner
         decision), inside a rail or not. */
      --zds-caret-indicator-motion: var(--animations-smooth);
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
    /* Open and close: the rows' height on animations/smooth (owner
       decision). The element measures the rows into
       --collapsible-panel-height (auto at rest), marks the first and last
       frames with [data-starting-style] / [data-ending-style], and holds
       hidden until the transition ends — Base UI Collapsible's contract, so
       these rules match the React build's. No transition on first render. */
    .panel {
      height: var(--collapsible-panel-height);
      overflow: hidden;
      transition: height var(--animations-smooth);
    }
    .panel:is([data-starting-style], [data-ending-style]) {
      height: 0;
    }
    @media (prefers-reduced-motion: reduce) {
      .panel {
        transition: none;
      }
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
