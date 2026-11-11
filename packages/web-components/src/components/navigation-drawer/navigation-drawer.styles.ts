import { css } from "lit";

/**
 * Every value here is a semantic token, except the default width, which has
 * no token (spec warn). Rows, groups, the header and the action bring their
 * own styles.
 *
 * Spec: specs/navigation-drawer/navigation-drawer.spec.json
 */
export default css`
  :host {
    /* No width token exists: 320px by default. A modal drawer always leaves
       control/lg of page visible. */
    --_width: min(var(--zds-navigation-drawer-width, 320px), 100vw - var(--control-lg));
    display: block;
    color: var(--foreground-primary);
  }
  :host([hidden]) {
    display: none;
  }

  /* ---- panel --------------------------------------------------------------- */
  /* Hugs its content, never shorter than the drawer: nothing inside scrolls
     on its own. The page (standard) or the drawer as one surface (modal)
     scrolls it. */
  .panel {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    inline-size: var(--_width);
    min-block-size: 100%;
    padding: 0 var(--space-md) var(--space-card);
    background: inherit;
  }

  /* The only frozen part: sticky at the top, on the drawer's own surface. */
  .header {
    position: sticky;
    inset-block-start: 0;
    z-index: 1;
    display: flex;
    flex: none;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-md);
    margin-inline: calc(-1 * var(--space-md));
    padding: var(--space-card) var(--space-md) var(--space-none);
    background: var(--_surface);
  }
  .header[data-empty] {
    position: static;
    margin-block-end: calc(-1 * var(--space-md));
  }
  .action {
    inline-size: 100%;
  }
  ::slotted([slot="header"]) {
    inline-size: 100%;
  }

  /* No internal scroll and no pinned footer: the footer follows the menu, and
     the menu takes the free height when the content is short. */
  .menu,
  .footer {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-2xs);
  }
  .menu {
    flex: 1 0 auto;
  }
  .footer {
    flex: none;
  }

  /* ---- modal --------------------------------------------------------------- */
  /* A native <dialog> at the screen's edge, raised like Dialog. The backdrop is
     the <zds-scrim> before it (tone scrim); the native ::backdrop only catches
     the click. No corner radius in either shape. */
  dialog.drawer {
    --_surface: var(--surface-overlay);
    position: fixed;
    inset-block: 0;
    inset-inline: 0 auto;
    box-sizing: border-box;
    inline-size: var(--_width);
    max-inline-size: none;
    block-size: 100dvh;
    max-block-size: none;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: var(--radius-none);
    background: var(--_surface);
    color: inherit;
    box-shadow: var(--shadow-large-x) var(--shadow-large-y) var(--shadow-large-blur) var(--shadow-soft);
    /* The whole drawer scrolls as one surface, header sticky, no scrollbar. */
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
    outline: none;
  }
  dialog.drawer::-webkit-scrollbar {
    display: none;
  }
  :host([side="end"]) dialog.drawer {
    inset-inline: auto 0;
  }
  dialog.drawer[open] {
    display: flex;
  }
  dialog.drawer::backdrop {
    background: transparent;
  }
  dialog.drawer > .panel {
    flex: none;
  }

  /* ---- standard ------------------------------------------------------------ */
  /* In the layout on surface/section, the rail's surface. Closed, it narrows to
     nothing; the panel keeps its width and is clipped, so nothing reflows. */
  .standard {
    --_surface: var(--surface-section);
    display: flex;
    min-block-size: 100%;
    inline-size: var(--_width);
    overflow: clip;
    background: var(--_surface);
  }
  :host([side="end"]) .standard {
    justify-content: flex-end;
  }
  .standard > .panel {
    flex: none;
  }
  :host(:not([open])) .standard {
    inline-size: 0;
    visibility: hidden;
  }

  /* ---- motion -------------------------------------------------------------- */
  /* No Figma motion; a code decision. Modal slides from its edge, standard
     widens, both on animations/smooth. None under reduced motion. */
  @media (prefers-reduced-motion: no-preference) {
    /* Out as well as in: display and overlay transition discretely, so the
       closing drawer stays in the top layer while it slides away. */
    dialog.drawer {
      transition: translate var(--animations-smooth), display var(--animations-smooth) allow-discrete, overlay var(--animations-smooth) allow-discrete;
    }
    dialog.drawer:not([open]) {
      translate: -100% 0;
    }
    :host([side="end"]) dialog.drawer:not([open]),
    :host(:dir(rtl)) dialog.drawer:not([open]) {
      translate: 100% 0;
    }
    :host(:dir(rtl)[side="end"]) dialog.drawer:not([open]) {
      translate: -100% 0;
    }
    @starting-style {
      dialog.drawer[open] {
        translate: -100% 0;
      }
      :host([side="end"]) dialog.drawer[open],
      :host(:dir(rtl)) dialog.drawer[open] {
        translate: 100% 0;
      }
      :host(:dir(rtl)[side="end"]) dialog.drawer[open] {
        translate: -100% 0;
      }
    }
    .standard {
      transition: inline-size var(--animations-smooth), visibility var(--animations-smooth) allow-discrete;
    }
  }
`;
