var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let ZetaSubMenuHeader = class ZetaSubMenuHeader extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** default leads with a glyph; sub-page leads with a back button. */
        this.type = "default";
        /** The panel's title (spec: title). */
        this.headline = "";
        /** Shows the leading glyph or back button. Figma leaves it unwired on sub page (spec warn); here it hides either. */
        this.showLeadingIcon = true;
        /** Shows the trailing actions slot. */
        this.showTrailingActions = true;
        /** Accessible name of the back button. */
        this.backLabel = "Back";
        /** Heading level of the title. */
        this.headingLevel = 2;
        this.hasActions = false;
    }
    render() {
        const lead = !this.showLeadingIcon
            ? nothing
            : this.type === "sub-page"
                ? html `<zeta-icon-button
            class="back"
            size="small"
            flavor="subtle"
            shape=${this.rounded ? "rounded" : "sharp"}
            aria-label=${this.backLabel}
            @click=${() => this.dispatchEvent(new CustomEvent("back", { bubbles: true, composed: true }))}
            >arrow_back</zeta-icon-button
          >`
                : html `<span class="icon" aria-hidden="true"><slot name="icon"></slot></span>`;
        return html `<div class="lead">
        ${lead}
        <div class="title" role="heading" aria-level=${this.headingLevel}>${this.headline}</div>
      </div>
      <div class="actions" ?hidden=${!this.showTrailingActions || !this.hasActions}>
        <slot name="actions" @slotchange=${(e) => (this.hasActions = e.target.assignedElements().length > 0)}></slot>
      </div>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaSubMenuHeader.prototype, "type", void 0);
__decorate([
    property({ type: String })
], ZetaSubMenuHeader.prototype, "headline", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-leading-icon" })
], ZetaSubMenuHeader.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-trailing-actions" })
], ZetaSubMenuHeader.prototype, "showTrailingActions", void 0);
__decorate([
    property({ type: String, attribute: "back-label" })
], ZetaSubMenuHeader.prototype, "backLabel", void 0);
__decorate([
    property({ type: Number, attribute: "heading-level" })
], ZetaSubMenuHeader.prototype, "headingLevel", void 0);
__decorate([
    state()
], ZetaSubMenuHeader.prototype, "hasActions", void 0);
ZetaSubMenuHeader = __decorate([
    customElement("zeta-sub-menu-header")
], ZetaSubMenuHeader);
export { ZetaSubMenuHeader };
//# sourceMappingURL=sub-menu-header.js.map