import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import styles from "./screen-header-bar.styles.js";
import "../button/icon-button/icon-button.js";

/**
 * The bar at the top of a screen: a back button, the screen's title and one action. It suits a screen with exactly
 * one primary action; use Top App Bar for more actions or a different leading control.
 *
 * `rounded` sets the shape of the Buttons and Icon Buttons in the action slot; the back button stays sharp, as drawn.
 * The bar is transparent and fills the width of its container.
 *
 * @slot action - The trailing action, usually one primary Button.
 * @event back - Fired when the back button is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5712-3566
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-screen-header-bar--docs
 */
@customElement("zeta-screen-header-bar")
export class ZetaScreenHeaderBar extends Contourable(LitElement) {
  /** The screen's name (spec: title). Name the screen rather than the task in progress. */
  @property({ type: String }) headline = "";

  /** Shows the back button. Turn it off on a root screen with nowhere to go back to. */
  @property({ type: Boolean, reflect: true, attribute: "show-leading-icon" }) showLeadingIcon = true;

  /** Accessible name of the back button. */
  @property({ type: String, attribute: "back-label" }) backLabel = "Back";

  /** Heading level of the title. */
  @property({ type: Number, attribute: "heading-level" }) headingLevel = 1;

  protected updated() {
    this.shapeActions();
  }

  private shapeActions = () => {
    const slot = this.renderRoot.querySelector<HTMLSlotElement>("slot[name=action]");
    for (const el of slot?.assignedElements() ?? []) {
      if (el.localName === "zeta-button" || el.localName === "zeta-icon-button") el.setAttribute("shape", this.rounded ? "rounded" : "sharp");
    }
  };

  protected render() {
    return html`${
        this.showLeadingIcon
          ? html`<zeta-icon-button
              class="back"
              size="medium"
              flavor="subtle"
              shape="sharp"
              aria-label=${this.backLabel}
              @click=${() => this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true }))}
              >chevron_left</zeta-icon-button
            >`
          : nothing
      }
      <div class="heading" role="heading" aria-level=${this.headingLevel}>${this.headline}</div>
      <div class="action"><slot name="action" @slotchange=${this.shapeActions}></slot></div>`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-screen-header-bar": ZetaScreenHeaderBar;
  }
}
