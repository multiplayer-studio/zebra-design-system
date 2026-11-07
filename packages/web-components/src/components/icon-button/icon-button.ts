import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon-button.styles.js";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";
import type { ButtonFlavour, ButtonSize, ButtonShape } from "../button/button.js";

/**
 * Triggers an action from a single glyph, with no text label. Square at
 * every size, and it carries the same nine flavours, three shapes and four
 * states as Button so the two sit together consistently. Nothing on it is
 * readable, so every instance needs an accessible name in code. When the
 * action can carry a word, use Button instead.
 *
 * `label` is that accessible name and is required. The glyph is decorative.
 *
 * The glyph takes the flavour's label colour through Button's styles (spec:
 * "Background and glyph swap to the disabled tokens of their family"). Three
 * Figma bindings that contradict that are not copied (spec warns): subtle's
 * glyph on foreground/primary, and the disabled glyph of positive
 * (destructive token) and negative (primary token).
 *
 * @spec specs/icon-button/icon-button.spec.json
 */
@customElement("zds-icon-button")
export class ZdsIconButton extends LitElement {
  static styles = styles;

  /** How much weight the action carries. The same nine as Button. */
  @property({ type: String, reflect: true }) flavour: ButtonFlavour = "primary";

  /** small (36, under the 40 minimum target), medium or large. */
  @property({ type: String, reflect: true }) size: ButtonSize = "medium";

  /** sharp, rounded or full (a circle). Also picks the glyph family. */
  @property({ type: String, reflect: true }) shape: ButtonShape = "rounded";

  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * The glyph. Defaults to more-horizontal, as in Figma — which reads as an
   * overflow menu, so set it deliberately (spec: How to use).
   */
  @property({ type: String }) icon: IconName = "more-horizontal";

  /** The accessible name, e.g. "Dismiss". Required: there is no visible text. */
  @property({ type: String }) label = "";

  @property({ type: String }) type: "button" | "submit" | "reset" = "button";

  /**
   * For a button that opens a menu or panel: whether it is open, forwarded to
   * the inner button as `aria-expanded`. Unset, no `aria-expanded` at all.
   */
  @property({ attribute: false }) expanded?: boolean;

  protected render() {
    // As Button: the glyph family follows the shape, sharp only on sharp.
    const iconStyle = this.shape === "sharp" ? "sharp" : "rounded";
    // Figma pins Icon small at small and medium at medium and large (16/20/20).
    const iconSize = this.size === "small" ? "small" : "medium";
    return html`<button
      part="button"
      type=${this.type}
      ?disabled=${this.disabled}
      aria-label=${this.label || nothing}
      aria-expanded=${this.expanded === undefined ? nothing : String(this.expanded)}
    >
      ${this.icon ? html`<zds-icon class="icon" name=${this.icon} .iconStyle=${iconStyle} size=${iconSize}></zds-icon>` : nothing}
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-icon-button": ZdsIconButton;
  }
}
