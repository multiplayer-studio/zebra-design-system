import { css } from "lit";

/* Spec: specs/navigation-drawer. Every value is a Zebra semantic token except the default width, 320px, which has no
   token (spec warn). Modal is raised like Dialog: surface/overlay at shadow/large over a zeta-scrim. Standard sits on
   surface/section, the rail's surface. No corner radius in either shape; `rounded` only reaches the parts inside. */
export default css`
  :host {
    --_width: min(var(--navigation-drawer-width, 320px), 100vw - var(--control-lg));
    display: block;
    color: var(--foreground-primary);
  }

  /* :host dialog, not dialog: Contourable rounds every direct child (:host > *); the drawer is never rounded. */
  :host zeta-scrim {
    border-radius: var(--zebra-radius-none);
  }
  :host dialog {
    box-sizing: border-box;
    inline-size: var(--_width);
    max-inline-size: none;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: var(--zebra-radius-none);
    background: var(--_surface);
    color: inherit;
    outline: none;
  }

  /* ---- modal: fixed at the screen's edge; the whole drawer scrolls as one surface, no scrollbar ---- */
  :host(:not([modal="false"])) dialog {
    --_surface: var(--surface-overlay);
    position: fixed;
    inset-block: 0;
    inset-inline: 0 auto;
    block-size: 100dvh;
    max-block-size: none;
    box-shadow: var(--shadow-large-x) var(--shadow-large-y) var(--shadow-large-blur) var(--shadow-soft);
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
  }
  :host(:not([modal="false"])) dialog::-webkit-scrollbar {
    display: none;
  }
  :host(:not([modal="false"])[anchor="right"]) dialog {
    inset-inline: auto 0;
  }
  :host(:not([modal="false"])) dialog[open] {
    display: flex;
  }
  /* The zeta-scrim before the dialog is the backdrop; the native one only catches the click. */
  dialog::backdrop {
    background: transparent;
  }

  /* ---- standard: in the layout; closed, it narrows to nothing so the content takes the space ---- */
  :host([modal="false"]) {
    block-size: 100%;
  }
  :host([modal="false"]) dialog {
    --_surface: var(--surface-section);
    position: static;
    display: flex;
    min-block-size: 100%;
    overflow: clip;
  }
  :host([modal="false"][anchor="right"]) dialog {
    justify-content: flex-end;
  }
  :host([modal="false"]) dialog:not([open]) {
    inline-size: 0;
    visibility: hidden;
  }

  /* ---- panel: hugs its content, never shorter than the drawer; nothing inside scrolls on its own ---- */
  .panel {
    box-sizing: border-box;
    display: flex;
    flex: none;
    flex-direction: column;
    gap: var(--space-md);
    inline-size: var(--_width);
    min-block-size: 100%;
    padding: 0 var(--space-md) var(--space-card);
  }

  /* The only frozen part: sticky at the top, on the drawer's surface. */
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

  /* The footer follows the menu; the menu takes the free height when the content is short. */
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

  /* ---- motion: slide in and out from the edge (modal), widen (standard), on animations/smooth ---- */
  @media (prefers-reduced-motion: no-preference) {
    :host([showAnimation]:not([modal="false"])) dialog {
      transition:
        translate var(--animations-smooth),
        display var(--animations-smooth) allow-discrete,
        overlay var(--animations-smooth) allow-discrete;
    }
    :host(:not([modal="false"])) dialog:not([open]) {
      translate: -100% 0;
    }
    :host(:not([modal="false"])[anchor="right"]) dialog:not([open]) {
      translate: 100% 0;
    }
    @starting-style {
      :host(:not([modal="false"])) dialog[open] {
        translate: -100% 0;
      }
      :host(:not([modal="false"])[anchor="right"]) dialog[open] {
        translate: 100% 0;
      }
    }
    :host([showAnimation][modal="false"]) dialog {
      transition:
        inline-size var(--animations-smooth),
        visibility var(--animations-smooth) allow-discrete;
    }
  }
`;
