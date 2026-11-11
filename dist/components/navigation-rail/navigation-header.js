var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import styles from "./navigation-header.styles.js";
import "../button/icon-button/icon-button.js";
/**
 * The Navigation Rail's header: a brand mark, and in the wide rail a title and a settings action. Collapsed it shows
 * the mark alone. Inside a `zeta-navigation-rail` the rail sets `expanded` and `rounded`.
 *
 * @slot mark - The brand mark: a `zeta-avatar` at size s (type avatar), or a logo (type logo).
 * @event action - Fired when the action is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54312
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */
let ZetaNavigationHeader = class ZetaNavigationHeader extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Which mark the header carries. Both are slotted; the type sets the logo's framed height. */
        this.type = "avatar";
        /** The wide form, with title and action. Inside a rail, the rail sets it. */
        this.expanded = false;
        /** The title beside the mark (spec: title). */
        this.headline = "";
        /** Shows the title. No effect when collapsed. */
        this.showTitle = true;
        /** Shows the settings action. No effect when collapsed. */
        this.showIconButton = true;
        /** Accessible name of the action. */
        this.actionLabel = "Settings";
        /** The action's glyph (a Zeta icon name). Settings by default; set any icon, with `action-label` to match. */
        this.actionIcon = "settings";
    }
    render() {
        return html `<div class="brand">
        <slot name="mark"></slot>
        ${this.expanded && this.showTitle && this.headline ? html `<span class="title">${this.headline}</span>` : nothing}
      </div>
      ${this.expanded && this.showIconButton
            ? html `<zeta-icon-button
              size="small"
              flavor="subtle"
              shape=${this.rounded ? "rounded" : "sharp"}
              aria-label=${this.actionLabel}
              @click=${() => this.dispatchEvent(new CustomEvent("action", { bubbles: true, composed: true }))}
              >${this.actionIcon}</zeta-icon-button
            >`
            : nothing}`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaNavigationHeader.prototype, "type", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationHeader.prototype, "expanded", void 0);
__decorate([
    property({ type: String })
], ZetaNavigationHeader.prototype, "headline", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-title" })
], ZetaNavigationHeader.prototype, "showTitle", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-icon-button" })
], ZetaNavigationHeader.prototype, "showIconButton", void 0);
__decorate([
    property({ type: String, attribute: "action-label" })
], ZetaNavigationHeader.prototype, "actionLabel", void 0);
__decorate([
    property({ type: String, attribute: "action-icon" })
], ZetaNavigationHeader.prototype, "actionIcon", void 0);
ZetaNavigationHeader = __decorate([
    customElement("zeta-navigation-header")
], ZetaNavigationHeader);
export { ZetaNavigationHeader };
//# sourceMappingURL=navigation-header.js.map