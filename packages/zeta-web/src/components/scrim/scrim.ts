import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./scrim.styles.js";

/**
 * The barrier between a raised surface and the page behind it. It fills its nearest positioned ancestor edge to edge,
 * with one fill and nothing else.
 *
 * `zeta-dialog`, `zeta-lightbox` and a modal `zeta-bottom-sheet` render it as their backdrop. With the `popover`
 * attribute it joins the top layer and covers the viewport; the owner shows it just before its own modal. Use it
 * directly only under a custom overlay, one per open surface. It is hidden from assistive technology, never takes focus and holds no content. A click on it
 * bubbles as a normal `click`, so the owner decides whether to close.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8221-400
 * @storybook ?path=/story/components-scrim--scrim
 */
@customElement("zeta-scrim")
export class ZetaScrim extends LitElement {
  /** `scrim` dims the page behind; `modal` hides it completely. */
  @property({ type: String, reflect: true }) tone: "scrim" | "modal" = "scrim";

  private internals = this.attachInternals();

  constructor() {
    super();
    this.internals.ariaHidden = "true";
  }

  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-scrim": ZetaScrim;
  }
}
