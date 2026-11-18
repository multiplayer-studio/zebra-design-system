var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { Contourable, Interactive } from "../../mixins/mixins.js";
import { Navigate } from "../../mixins/navigate.js";
import styles from "./sub-menu-item.styles.js";
import "./caret-indicator.js";
import "../badges/indicators/indicators.js";
import "../tooltip/tooltip.js";
/** How long a pointer rests on a truncated label before the full label shows (owner decision). */
const TRUNCATION_DELAY = 3000;
/**
 * A row in the Navigation Rail's sub menu panel: leading glyph, label, an optional counter badge and an optional
 * caret. Renders a link when `href` is set, otherwise a button; `selected` sets `aria-current="page"`. Inside a
 * `zeta-collapsible-menu-item` the group sets `nested`.
 *
 * A label cut off by its ellipsis shows in full in a tooltip after a 3 second hover, or at once on keyboard focus.
 *
 * @slot - The row's name.
 * @slot {zeta-icon} icon - The leading glyph. Figma ships a `verified` placeholder; swap it.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54275
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */
let ZetaSubMenuItem = class ZetaSubMenuItem extends Navigate(Contourable(Interactive(LitElement))) {
    constructor() {
        super(...arguments);
        /** The row the user is on. */
        this.selected = false;
        /** A child row under a collapsible group: indented, quieter label, smaller type. Set by the group. */
        this.nested = false;
        /** Shows the leading glyph. Keep it on for every row in a list, or off for all. */
        this.showLeadingIcon = true;
        /** Shows the trailing caret, for a row that opens a further level. */
        this.subMenu = false;
        /** Turns the caret while the level it opens is showing. */
        this.open = false;
        /** Shows the counter badge between the label and the caret. It takes space in the row. */
        this.showBadge = false;
        /** The badge's count. Above 99 it reads "99+". */
        this.badgeValue = 1;
        this.tipOpen = false;
        this.showTip = (delay) => {
            clearTimeout(this.tipTimer);
            this.tipTimer = setTimeout(() => (this.tipOpen = this.truncated), delay);
        };
        this.hideTip = () => {
            clearTimeout(this.tipTimer);
            this.tipOpen = false;
        };
        this.guard = (e) => {
            if (this.disabled) {
                e.preventDefault();
                e.stopImmediatePropagation();
            }
        };
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: "open",
        delegatesFocus: true
    }; }
    get truncated() {
        return !!this.labelEl && this.labelEl.scrollWidth > this.labelEl.clientWidth;
    }
    disconnectedCallback() {
        clearTimeout(this.tipTimer);
        super.disconnectedCallback?.();
    }
    renderContent() {
        return html `
      <span class="lead">
        ${this.showLeadingIcon ? html `<span class="icon" aria-hidden="true"><slot name="icon"></slot></span>` : nothing}
        <span class="label"><slot></slot></span>
      </span>
      ${this.showBadge
            ? html `<zeta-notification-indicator class="badge" aria-hidden="true" .value=${this.badgeValue}></zeta-notification-indicator>
              <span class="sr">, ${this.badgeLabel ?? (this.badgeValue > 99 ? "99+" : this.badgeValue)}</span>`
            : nothing}
      ${this.subMenu
            ? html `<zeta-caret-indicator class="caret" direction="horizontal" ?open=${this.open} .rounded=${this.rounded}></zeta-caret-indicator>`
            : nothing}
    `;
    }
    renderRow() {
        const current = this.selected && !this.disabled ? "page" : nothing;
        if (this.href) {
            return html `<a
        class="row interactive-target"
        href=${this.disabled ? nothing : this.href}
        aria-disabled=${this.disabled ? "true" : nothing}
        aria-current=${current}
        @click=${this.guard}
        >${this.renderContent()}</a
      >`;
        }
        return html `<button class="row interactive-target" type="button" ?disabled=${this.disabled} aria-current=${current}>${this.renderContent()}</button>`;
    }
    render() {
        return html `<div
        class="wrapper"
        @pointerenter=${() => this.showTip(TRUNCATION_DELAY)}
        @pointerleave=${this.hideTip}
        @focusin=${(e) => e.target.matches?.(":focus-visible") && this.showTip(0)}
        @focusout=${this.hideTip}
      >
        ${this.renderRow()}
      </div>
      ${this.tipOpen
            ? html `<zeta-tooltip class="tip" point="left" aria-hidden="true" .rounded=${this.rounded}>${this.labelEl?.textContent?.trim()}</zeta-tooltip>`
            : nothing}`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSubMenuItem.prototype, "selected", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSubMenuItem.prototype, "nested", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-leading-icon" })
], ZetaSubMenuItem.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "sub-menu" })
], ZetaSubMenuItem.prototype, "subMenu", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSubMenuItem.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-badge" })
], ZetaSubMenuItem.prototype, "showBadge", void 0);
__decorate([
    property({ type: Number, attribute: "badge-value" })
], ZetaSubMenuItem.prototype, "badgeValue", void 0);
__decorate([
    property({ type: String, attribute: "badge-label" })
], ZetaSubMenuItem.prototype, "badgeLabel", void 0);
__decorate([
    state()
], ZetaSubMenuItem.prototype, "tipOpen", void 0);
__decorate([
    query(".label")
], ZetaSubMenuItem.prototype, "labelEl", void 0);
ZetaSubMenuItem = __decorate([
    customElement("zeta-sub-menu-item")
], ZetaSubMenuItem);
export { ZetaSubMenuItem };
//# sourceMappingURL=sub-menu-item.js.map