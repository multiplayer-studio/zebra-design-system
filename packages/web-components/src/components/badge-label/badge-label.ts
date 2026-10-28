import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { defaultTrue } from "../chip/chip.js";
import styles from "./badge-label.styles.js";

export type BadgeLabelVariant = "neutral" | "info" | "positive" | "warning" | "negative";
export type BadgeLabelShape = "rounded" | "sharp";

/**
 * Figma's "Label" badge. Names a category on an item in a word or two.
 * Variant carries the standing of that category, and Bold and Outlined
 * decide how hard it pushes: bold (solid), outlined (tint with an edge) or
 * plain (tint with none). Reach for `<zds-status-label>` where the thing
 * shown is a state rather than a category.
 *
 * Bold and Outlined together are not built in Figma, so bold wins.
 *
 * Named `zds-badge-label` so it does not read as a form label. Not
 * interactive; the text is the accessible name and the only thing naming the
 * category.
 *
 * @slot - The category. One or two words.
 * @csspart root - The badge.
 *
 * @spec specs/badges/label.spec.json
 */
@customElement("zds-badge-label")
export class ZdsBadgeLabel extends LitElement {
  static styles = styles;

  /** The standing of the category; fill, border and text move together. positive / negative draw the success / error tokens. */
  @property({ type: String, reflect: true }) variant: BadgeLabelVariant = "neutral";

  /** Softly rounded (radius/element-sm) or square (radius/none). */
  @property({ type: String, reflect: true }) shape: BadgeLabelShape = "rounded";

  /** Solid fill with knocked-out text, the strongest form. `bold="false"` gives a tinted fill. */
  @property({ converter: defaultTrue, reflect: true }) bold = true;

  /** Adds a 1px border to the tinted fill. Only applies while `bold` is false. */
  @property({ type: Boolean, reflect: true }) outlined = false;

  protected render() {
    const emphasis = this.bold ? "bold" : this.outlined ? "outlined" : "plain";
    return html`<span part="root" class="root" data-emphasis=${emphasis}><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { "zds-badge-label": ZdsBadgeLabel; }
}
