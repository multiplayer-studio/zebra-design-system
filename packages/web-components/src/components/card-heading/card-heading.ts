import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./card-heading.styles.js";

/**
 * A title row: optional leading content, a heading and subheading, optional
 * trailing content. Built for `zds-card`'s header slot (and reused inside the
 * body slot of media layouts), but not exclusive to it.
 *
 * Figma exposes `hasLeading`/`hasTrailing` as separate boolean properties;
 * this element derives visibility from whether the `leading`/`trailing`
 * slots have assigned content, since a consumer would otherwise have to keep
 * a slot and a boolean in sync for one decision.
 *
 * @slot leading - Leading content, e.g. an avatar.
 * @slot trailing - Trailing content, e.g. an icon button.
 * @part heading - The heading text.
 * @part subheading - The subheading text.
 *
 * @spec specs/card/card.spec.json
 */
@customElement("zds-card-heading")
export class ZdsCardHeading extends LitElement {
  static styles = styles;

  /** The title. */
  @property({ type: String }) heading: string | null = null;

  /** Supporting text under the heading. */
  @property({ type: String }) subheading: string | null = null;

  @state() private hasLeading = false;
  @state() private hasTrailing = false;

  private onLeadingSlotChange(e: Event) {
    this.hasLeading = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  private onTrailingSlotChange(e: Event) {
    this.hasTrailing = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

  protected render() {
    return html`
      <div class="leading" ?hidden=${!this.hasLeading}>
        <slot name="leading" @slotchange=${this.onLeadingSlotChange}></slot>
      </div>
      <div class="text">
        <div part="heading" class="heading">${this.heading}</div>
        ${this.subheading ? html`<div part="subheading" class="subheading">${this.subheading}</div>` : ""}
      </div>
      <div class="trailing" ?hidden=${!this.hasTrailing}>
        <slot name="trailing" @slotchange=${this.onTrailingSlotChange}></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-card-heading": ZdsCardHeading;
  }
}
