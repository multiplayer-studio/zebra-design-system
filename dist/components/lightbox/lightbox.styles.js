import { css } from "lit";
/* Spec: specs/lightbox (Lightbox). The panel is Dialog's surface widened for media
   (control/lg x 16, raw 768px in Figma as the stated default); the stage dims the
   panel behind the content with surface/shade. border/default and radius/none are
   two of the nine names the legacy set shadows, so they bind through the --zebra-
   aliases. The paging slide is 400ms with no motion token (spec issue), as the
   react-baseui and zds builds. The fold uses surface/subtle: surface/sunken has no
   variable (spec issue, figma-only). */
export default css `
  :host {
    --_lightbox-width: var(--lightbox-width, calc(var(--control-lg) * 16));
  }

  dialog {
    box-sizing: border-box;
    flex-direction: column;
    gap: var(--space-sm);
    width: min(var(--_lightbox-width), calc(100vw - 2 * var(--space-page)));
    max-width: none;
    max-height: calc(100dvh - 2 * var(--space-page));
    padding: var(--space-md);
    border: var(--stroke-thin) solid var(--zebra-border-default);
    border-radius: var(--radius-element-md);
    background: var(--surface-overlay);
    color: var(--foreground-primary);
    /* As Dialog: shadow/large on shadow/soft so the panel reads as raised. */
    box-shadow: var(--shadow-large-x) var(--shadow-large-y) var(--shadow-large-blur) var(--shadow-soft);
    outline: none;
  }
  dialog[open] {
    display: flex;
  }
  dialog::backdrop {
    background: var(--overlay-scrim);
  }
  :host(:not([rounded])) dialog {
    border-radius: var(--zebra-radius-none);
  }

  /* ---- toolbar: name, counter, actions ------------------------------------- */
  .toolbar {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
  .name {
    flex: 1 1 auto;
    min-width: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: var(--text-title-medium);
    letter-spacing: var(--title-medium-letter-spacing);
  }
  .counter {
    flex: none;
    color: var(--foreground-secondary);
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
    font-variant-numeric: tabular-nums;
  }
  .actions {
    display: flex;
    flex: none;
    align-items: center;
    gap: var(--space-2xs);
  }

  /* ---- stage ---------------------------------------------------------------- */
  /* The media well: surface/subtle sets the content apart from the panel (the
     Figma binding, settled 2026-11-10); the nav floats at the sides over it. */
  .stage {
    position: relative;
    display: grid;
    place-items: center;
    min-height: calc(var(--control-lg) * 6);
    overflow: hidden;
    border-radius: var(--radius-element-sm);
    background: var(--surface-subtle);
  }
  :host(:not([rounded])) .stage {
    border-radius: var(--zebra-radius-none);
  }
  /* The track holds one full-width slot per item and slides to the current one,
     so paging moves what is already mounted instead of swapping it. Pinned to
     the stage, never sized by its content: sized by content, the tallest slot
     (the 70vh document) inflates it past the stage and every slot centres
     against the oversized box instead of the visible window. */
  .track {
    position: absolute;
    inset: 0;
    display: flex;
  }
  .slot {
    flex: 0 0 100%;
    display: grid;
    place-items: center;
    overflow: hidden;
  }

  .media {
    display: block;
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
    /* Elevation: the content floats over the stage — shadow/medium on
       shadow/soft (the panel itself carries Dialog's shadow/large). */
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
  }
  /* Video fills the stage's width where it can; the height cap contains it. */
  video.media {
    width: 100%;
    height: auto;
  }
  .document {
    width: 100%;
    height: 70vh;
    border: 0;
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
  }

  /* Previous / next: floating at the sides, vertically centred. */
  .prev,
  .next {
    position: absolute;
    top: 50%;
    translate: 0 -50%;
  }
  .prev {
    left: var(--space-sm);
  }
  .next {
    right: var(--space-sm);
  }

  /* ---- unpreviewable: a drawn file sheet ------------------------------------ */
  .unpreviewable {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-3xl) var(--space-xl);
  }
  .sheet {
    position: relative;
    display: grid;
    place-items: center;
    width: calc(var(--control-lg) * 2);
    aspect-ratio: 3 / 4;
    border: var(--stroke-thin) solid var(--zebra-border-default);
    border-radius: var(--radius-element-md);
    border-start-end-radius: 0;
    background: var(--surface-card);
    --icon-color: var(--foreground-secondary);
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
  }
  .sheet::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: var(--space-lg);
    aspect-ratio: 1;
    border-end-start-radius: var(--radius-element-sm);
    border-left: var(--stroke-thin) solid var(--zebra-border-default);
    border-bottom: var(--stroke-thin) solid var(--zebra-border-default);
    background: var(--surface-subtle);
  }
  :host(:not([rounded])) .sheet,
  :host(:not([rounded])) .sheet::before {
    border-radius: var(--zebra-radius-none);
  }
  .no-preview {
    margin: 0;
    color: var(--foreground-secondary);
    font: var(--text-body-medium);
    letter-spacing: var(--body-medium-letter-spacing);
  }

  /* ---- motion ---------------------------------------------------------------- */
  /* One transition on the track's translate and one on the stage's height, so an
     interrupted page glides to the new target instead of restarting. data-animated
     is withheld for the first frame after opening, so only real paging slides;
     reduced motion turns the block off entirely. */
  @media (prefers-reduced-motion: no-preference) {
    dialog {
      --_lightbox-duration: 400ms;
      --_lightbox-ease: cubic-bezier(0.33, 1, 0.68, 1);
      /* The whole panel springs in from the bottom on open (animations/spring),
         with the stage already at the first frame's height. */
      transition: translate var(--animations-spring);
    }
    @starting-style {
      dialog[open] {
        translate: 0 calc(var(--control-lg) * 1.5);
      }
    }
    .stage[data-animated] {
      transition: height var(--_lightbox-duration) var(--_lightbox-ease);
    }
    .stage[data-animated] .track {
      transition: translate var(--_lightbox-duration) var(--_lightbox-ease);
    }
  }
`;
//# sourceMappingURL=lightbox.styles.js.map