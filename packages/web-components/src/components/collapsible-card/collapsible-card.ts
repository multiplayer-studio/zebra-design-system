import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./collapsible-card.styles.js";
import "../icon/icon.js";

export type CollapsibleCardShape = "sharp" | "rounded";
export type CollapsibleCardFlavor = "default" | "gradient";

/**
 * A card whose body opens and closes behind a header that is always
 * visible. The header carries a title, a description, and a leading chevron
 * that flips with the expanded state.
 *
 * Figma's own file doesn't actually wire the chevron to State (spec issue —
 * the nested header instance is identical between collapsed and expanded in
 * every variant); this element implements the metadata's stated intent
 * instead of that gap, since a chevron that doesn't move defeats the
 * disclosure affordance.
 *
 * The toggle target, its focus handling and its keyboard behaviour are this
 * element's own responsibility (a native `button`), since Figma models none
 * of them. `expanded` reflects, so it can be set or read like a native
 * `<details>` element; toggling fires a bubbling, composed `toggle` event.
 *
 * @slot - The body, revealed only while expanded.
 * @fires toggle - The expanded state changed.
 * @part header - The header button.
 * @part body - The body wrapper.
 *
 * @spec specs/card/card.spec.json
 */
@customElement("zds-collapsible-card")
export class ZdsCollapsibleCard extends LitElement {
  static styles = styles;

  /** Corner treatment. */
  @property({ type: String, reflect: true }) shape: CollapsibleCardShape = "sharp";

  /** Plain, or outlined with the brand gradient to draw the eye. Use gradient for at most one card in a group. */
  @property({ type: String, reflect: true }) flavor: CollapsibleCardFlavor = "default";

  /** The title, always visible in the header. */
  @property({ type: String }) heading: string | null = null;

  /** Marks the heading as required with a trailing asterisk. */
  @property({ type: Boolean, reflect: true }) required = true;

  /**
   * Supporting text under the heading. Figma's header now has a real
   * `showDescription` toggle (default true) for this — this element derives
   * the same thing from whether `description` was set, rather than adding a
   * second property to keep in sync with it.
   */
  @property({ type: String }) description: string | null = null;

  /** Whether the body is revealed. Reflects, so it can be read or set like `<details open>`. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  private toggle() {
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent("toggle", { detail: { expanded: this.expanded }, bubbles: true, composed: true }));
  }

  protected render() {
    // The icon follows the card's shape, matching Button's own convention.
    const iconStyle = this.shape === "sharp" ? "sharp" : "rounded";
    return html`
      <button type="button" part="header" class="header" aria-expanded=${this.expanded} @click=${this.toggle}>
        <!-- expand-more's own glyph sits high in its box with dead space
             below, which reads as top-aligned no matter how the box itself
             is centered; chevron-right is optically centered, so it's
             rotated instead of swapping glyphs on toggle. -->
        <zds-icon class="chevron" name="chevron-right" .iconStyle=${iconStyle} size="large" ?expanded=${this.expanded}></zds-icon>
        <span class="text">
          <span class="heading"
            >${this.heading}${this.required ? html`<span class="required" aria-hidden="true"> *</span>` : nothing}</span
          >
          ${this.description ? html`<span class="description">${this.description}</span>` : nothing}
        </span>
      </button>
      ${this.expanded ? html`<div part="body" class="body"><slot></slot></div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-collapsible-card": ZdsCollapsibleCard;
  }
}
