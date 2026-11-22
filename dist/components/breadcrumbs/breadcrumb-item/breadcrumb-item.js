var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./breadcrumb-item.styles.js";
import "../../icon/icon.js";
import { Contourable, Navigate } from "../../../mixins/mixins.js";
import { ifDefined } from "lit/directives/if-defined.js";
/**
 * One crumb in a `zeta-breadcrumb`: an optional glyph, a label and the separator after it. Inside a breadcrumb, the
 * parent sets `current` and `separator`, so neither needs setting by hand.
 *
 * @slot - The crumb's label.
 * @slot icon - A `zeta-icon` before the label.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7665-138
 * @storybook ?path=/docs/components-breadcrumb--docs
 */
let ZetaBreadcrumbItem = class ZetaBreadcrumbItem extends Contourable(Navigate(LitElement)) {
    constructor() {
        super(...arguments);
        /** The page a person is on. It is text, not a link, even with an `href`. */
        this.current = false;
        /** Shows the chevron after the crumb. */
        this.separator = false;
        /** A crumb with no `href` still has to be reachable, for a click listener on it. */
        this.handleKey = (event) => {
            if (event.key === "Enter" && !this.href)
                event.currentTarget.click();
        };
    }
    static { this.styles = [super.styles ?? [], styles]; }
    renderCrumb() {
        const content = html `<slot name="icon"></slot><span><slot></slot></span>`;
        if (this.current)
            return html `<span class="crumb" aria-current="page">${content}</span>`;
        return html `<a
      class="crumb"
      href=${ifDefined(this.href)}
      role=${ifDefined(this.href ? undefined : "link")}
      tabindex=${ifDefined(this.href ? undefined : 0)}
      @keydown=${this.handleKey}
      >${content}</a
    >`;
    }
    render() {
        return html `
      ${this.renderCrumb()}
      ${this.separator ? html `<zeta-icon class="separator" aria-hidden="true" .rounded=${this.rounded}>chevron_right</zeta-icon>` : nothing}
    `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaBreadcrumbItem.prototype, "current", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaBreadcrumbItem.prototype, "separator", void 0);
ZetaBreadcrumbItem = __decorate([
    customElement("zeta-breadcrumb-item")
], ZetaBreadcrumbItem);
export { ZetaBreadcrumbItem };
//# sourceMappingURL=breadcrumb-item.js.map