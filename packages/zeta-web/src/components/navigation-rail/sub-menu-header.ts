import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import styles from "./sub-menu-header.styles.js";
import "../button/icon-button/icon-button.js";

/**
 * The title bar of the Navigation Rail's sub menu panel. The default type leads with a glyph; the sub page type leads
 * with a back button. Trailing actions are slotted. Inside a `zeta-navigation-rail` the rail sets `rounded`.
 *
 * @slot icon - The leading glyph (type default). Figma ships a `verified` placeholder.
 * @slot actions - Trailing actions, such as a small Button.
 * @event back - Fired when the back button is clicked (type sub-page).
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54332
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */
@customElement("zeta-sub-menu-header")
export class ZetaSubMenuHeader extends Contourable(LitElement) {
  /** default leads with a glyph; sub-page leads with a back button. */
  @property({ type: String, reflect: true }) type: "default" | "sub-page" = "default";

  /** The panel's title (spec: title). */
  @property({ type: String }) headline = "";

  /** Shows the leading glyph or back button. Figma leaves it unwired on sub page (spec warn); here it hides either. */
  @property({ type: Boolean, attribute: "show-leading-icon" }) showLeadingIcon = true;

  /** Shows the trailing actions slot. */
  @property({ type: Boolean, attribute: "show-trailing-actions" }) showTrailingActions = true;

  /** Accessible name of the back button. */
  @property({ type: String, attribute: "back-label" }) backLabel = "Back";

  /** Heading level of the title. */
  @property({ type: Number, attribute: "heading-level" }) headingLevel = 2;

  @state() private hasActions = false;

  protected render() {
    const lead = !this.showLeadingIcon
      ? nothing
      : this.type === "sub-page"
        ? html`<zeta-icon-button
            class="back"
            size="small"
            flavor="subtle"
            shape=${this.rounded ? "rounded" : "sharp"}
            aria-label=${this.backLabel}
            @click=${() => this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true }))}
            >arrow_back</zeta-icon-button
          >`
        : html`<span class="icon" aria-hidden="true"><slot name="icon"></slot></span>`;
    return html`<div class="lead">
        ${lead}
        <div class="title" role="heading" aria-level=${this.headingLevel}>${this.headline}</div>
      </div>
      <div class="actions" ?hidden=${!this.showTrailingActions || !this.hasActions}>
        <slot name="actions" @slotchange=${(e: Event) => (this.hasActions = (e.target as HTMLSlotElement).assignedElements().length > 0)}></slot>
      </div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-sub-menu-header": ZetaSubMenuHeader;
  }
}
