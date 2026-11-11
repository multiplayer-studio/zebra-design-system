import { css } from "lit";

/**
 * Every value here is a semantic token from the generated CSS layer, keyed
 * off the host's `shape` / `inline` attributes and data-* on the stage.
 * Mirrors packages/react-baseui/src/components/lightbox/lightbox.css.
 *
 * Spec: specs/lightbox/lightbox.spec.json
 */
export default css`
  :host {
    display: inline-block;
    vertical-align: top;
  }
  :host([hidden]) {
    display: none;
  }

  /* ---- backdrop (as Dialog's: a <zds-scrim> at tone scrim) ---------------- */
  dialog::backdrop {
    background: transparent;
  }

  /* ---- panel --------------------------------------------------------------- */
  .panel {
    /* Wider than Dialog: media wants room. Override --zds-lightbox-width to
       taste; never wider than the viewport less --space-page each side. */
    --zds-lightbox-width: calc(var(--control-lg) * 16);

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    inline-size: min(var(--zds-lightbox-width), 100vw - 2 * var(--space-page));
    max-inline-size: none;
    max-block-size: calc(100dvh - 2 * var(--space-page));
    padding: var(--space-md);
    border: var(--stroke-thin) solid var(--border-default);
    border-radius: var(--radius-element-md);
    background: var(--surface-overlay);
    color: var(--foreground-primary);
    /* As Dialog: shadow/large on shadow/soft so the panel reads as raised. */
    box-shadow: var(--shadow-large-x) var(--shadow-large-y) var(--shadow-large-blur) var(--shadow-soft);
    outline: none;
  }
  dialog.panel {
    position: fixed;
    inset: 0;
    margin: auto;
    block-size: fit-content;
  }
  dialog.panel:not([open]) {
    display: none;
  }
  .panel.inline {
    position: relative;
  }
  :host([shape="sharp"]) .panel {
    border-radius: var(--radius-none);
  }

  /* ---- toolbar: name, counter, actions ------------------------------------- */
  .toolbar {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
  .name {
    flex: 1 1 auto;
    min-inline-size: 0;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--title-medium-font-family), system-ui, sans-serif;
    font-size: var(--title-medium-font-size);
    font-weight: var(--title-medium-font-weight);
    line-height: var(--title-medium-line-height);
    letter-spacing: var(--title-medium-letter-spacing);
  }
  .counter {
    flex: none;
    color: var(--foreground-secondary);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    line-height: var(--body-medium-line-height);
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
    min-block-size: calc(var(--control-lg) * 6);
    overflow: hidden;
    border-radius: var(--radius-element-sm);
    background: var(--surface-subtle);
  }
  :host([shape="sharp"]) .stage {
    border-radius: var(--radius-none);
  }
  /* The track holds one full-width slot per item and slides to the current
     one, so paging moves what is already mounted instead of swapping it —
     nothing reloads, nothing flickers. Each slot centres its content.
     Pinned to the stage, not sized by its content: a percentage height here
     would resolve against the grid row, which the tallest slot (the 70vh
     document) inflates past the stage — the track then overflows and every
     slot centres against the oversized box instead of the visible window. */
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
    max-inline-size: 100%;
    max-block-size: 70vh;
    object-fit: contain;
    /* Elevation: the content floats over the stage, as the dropdown and
       snackbar are raised — shadow/medium on shadow/soft (the panel itself
       carries Dialog's shadow/large). */
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
  }
  /* Video fills the stage's width where it can; the height cap contains it,
     and object-fit keeps the picture's own ratio inside the player box. */
  video.media {
    inline-size: 100%;
    block-size: auto;
  }
  .document {
    inline-size: 100%;
    block-size: 70vh;
    border: 0;
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
  }

  /* Previous / next: floating at the sides, vertically centred. */
  .prev,
  .next {
    position: absolute;
    inset-block-start: 50%;
    translate: 0 -50%;
  }
  .prev {
    inset-inline-start: var(--space-sm);
  }
  .next {
    inset-inline-end: var(--space-sm);
  }

  /* ---- unpreviewable: a drawn file sheet ------------------------------------ */
  .unpreviewable {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-3xl) var(--space-xl);
  }
  /* The sheet: a portrait card with a folded corner, the file's glyph centred.
     Drawn, not an asset, so it themes with the tokens. */
  .sheet {
    position: relative;
    display: grid;
    place-items: center;
    inline-size: calc(var(--control-lg) * 2);
    aspect-ratio: 3 / 4;
    border: var(--stroke-thin) solid var(--border-default);
    border-start-end-radius: 0;
    border-radius: var(--radius-element-md);
    background: var(--surface-card);
    color: var(--foreground-secondary);
    box-shadow: var(--shadow-medium-x) var(--shadow-medium-y) var(--shadow-medium-blur) var(--shadow-soft);
  }
  .sheet::before {
    /* The fold: a sunken triangle over the clipped corner. spec issue
       "figma-only": surface/sunken has no variable, so surface/subtle. */
    content: "";
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    inline-size: var(--space-lg);
    aspect-ratio: 1;
    border-end-start-radius: var(--radius-element-sm);
    border-inline-start: var(--stroke-thin) solid var(--border-default);
    border-block-end: var(--stroke-thin) solid var(--border-default);
    background: var(--surface-subtle);
  }
  :host([shape="sharp"]) .sheet,
  :host([shape="sharp"]) .sheet::before {
    border-radius: var(--radius-none);
  }
  .no-preview {
    margin: 0;
    color: var(--foreground-secondary);
    font-family: var(--body-medium-font-family), system-ui, sans-serif;
    font-size: var(--body-medium-font-size);
    line-height: var(--body-medium-line-height);
    letter-spacing: var(--body-medium-letter-spacing);
  }

  /* ---- motion ---------------------------------------------------------------- */
  /* Paging is one transition on the track's translate (the old frame leaves as
     the new one arrives, in whichever direction the paging went), and one on
     the stage's height, which follows the current frame. Transitions, not
     keyed animations, so an interrupted page glides to the new target instead
     of restarting, and nothing remounts. Timing literals as Message Input and
     Switch, because tokens/ has no motion collection. data-animated carries
     the \`animated\` prop and is withheld for the first frame after opening, so
     only real paging slides; reduced motion turns the block off entirely. */
  @media (prefers-reduced-motion: no-preference) {
    .panel {
      /* Slower than the small controls' 250ms: the frames are large and travel
         far, and the slide reads as a scene change rather than a flick. */
      --zds-lightbox-duration: 400ms;
      --zds-lightbox-ease: cubic-bezier(0.33, 1, 0.68, 1);
      /* The whole panel springs in from the bottom on open (animations/spring),
         with the stage already at the first frame's height. */
      transition: translate var(--animations-spring);
    }
    @starting-style {
      dialog.panel[open] {
        translate: 0 calc(var(--control-lg) * 1.5);
      }
    }
    .stage[data-animated] {
      transition: block-size var(--zds-lightbox-duration) var(--zds-lightbox-ease);
    }
    .stage[data-animated] .track {
      transition: translate var(--zds-lightbox-duration) var(--zds-lightbox-ease);
    }
  }
`;
