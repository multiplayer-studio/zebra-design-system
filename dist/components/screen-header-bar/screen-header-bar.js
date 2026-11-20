var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import styles from "./screen-header-bar.styles.js";
import "../button/icon-button/icon-button.js";
/**
 * The bar at the top of a screen: a back button, the screen's title and one action. It suits a screen with exactly
 * one primary action; use Top App Bar for more actions or a different leading control.
 *
 * `rounded` sets the shape of the back button and of the Buttons and Icon Buttons in the action slot.
 * The bar is transparent and fills the width of its container.
 *
 * @slot action - The trailing action, usually one primary Button.
 * @event back - Fired when the back button is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5712-3566
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-screen-header-bar--docs
 */
let ZetaScreenHeaderBar = class ZetaScreenHeaderBar extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** The screen's name (spec: title). Name the screen rather than the task in progress. */
        this.headline = "";
        /** Shows the back button. Turn it off on a root screen with nowhere to go back to. */
        this.showLeadingIcon = true;
        /** Accessible name of the back button. */
        this.backLabel = "Back";
        /** Heading level of the title. */
        this.headingLevel = 1;
        this.shapeActions = () => {
            const slot = this.renderRoot.querySelector("slot[name=action]");
            for (const el of slot?.assignedElements() ?? []) {
                if (el.localName === "zeta-button" || el.localName === "zeta-icon-button")
                    el.setAttribute("shape", this.rounded ? "rounded" : "sharp");
            }
        };
    }
    updated() {
        this.shapeActions();
    }
    render() {
        return html `${this.showLeadingIcon
            ? html `<zeta-icon-button
              class="back"
              size="medium"
              flavor="subtle"
              shape=${this.rounded ? "rounded" : "sharp"}
              aria-label=${this.backLabel}
              @click=${() => this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true }))}
              >chevron_left</zeta-icon-button
            >`
            : nothing}
      <div class="heading" role="heading" aria-level=${this.headingLevel}>${this.headline}</div>
      <div class="action"><slot name="action" @slotchange=${this.shapeActions}></slot></div>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: String })
], ZetaScreenHeaderBar.prototype, "headline", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-leading-icon" })
], ZetaScreenHeaderBar.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: String, attribute: "back-label" })
], ZetaScreenHeaderBar.prototype, "backLabel", void 0);
__decorate([
    property({ type: Number, attribute: "heading-level" })
], ZetaScreenHeaderBar.prototype, "headingLevel", void 0);
ZetaScreenHeaderBar = __decorate([
    customElement("zeta-screen-header-bar")
], ZetaScreenHeaderBar);
export { ZetaScreenHeaderBar };
//# sourceMappingURL=screen-header-bar.js.map