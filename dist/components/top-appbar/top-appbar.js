var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import styles from "./top-appbar.styles.js";
import { customElement, property } from "lit/decorators.js";
import {} from "@zebra-fed/zeta-icons";
import "../avatar/avatar.js";
import "../button/button.js";
import "../button/icon-button/icon-button.js";
import "../search/search.js";
/** The leading control `type` draws when nothing is in the `leading` slot. */
const LEADING = {
    default: { icon: "hamburger_menu", label: "Menu" },
    centered: { icon: "hamburger_menu", label: "Menu" },
    extended: { icon: "hamburger_menu", label: "Menu" },
    contextual: { icon: "close", label: "Clear selection" },
    "contextual alt": { icon: "close", label: "Clear selection" },
    search: { icon: "arrow_back", label: "Back" }
};
/** The header at the top of a mobile screen, carrying the screen's name between a leading control and its actions.
 * Setting `type` picks one of six arrangements, each drawing its own leading control and content; slotted content
 * replaces what it draws. Without `type` the element only lays out its slots, and `centered` and `extended` still work.
 *
 * @slot - The content of the appbar.
 * @slot leading - The content to be placed at the start of the appbar.
 * @slot trailing - The content to be placed at the end of the appbar.
 * @slot contextual-controls - The actions on `contextual` and `contextual alt`, in place of `trailing`.
 *
 * @event leading-click - The leading control `type` draws was activated.
 * @event trailing-click - The fixed control on `centered` was activated.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1217
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-top-appbar--docs
 */
let ZetaTopAppbar = class ZetaTopAppbar extends LitElement {
    constructor() {
        super(...arguments);
        /** Centers the content of the title. */
        this.centered = false;
        /** Places the title below the main appbar. */
        this.extended = false;
        /** The bar's own corner. Controls inside keep theirs. */
        this.shape = "sharp";
        /** Heading level of the title `type` draws. */
        this.headingLevel = 1;
        /** The search field's value on `search`. It opens empty (spec issue: Figma draws its typing state). */
        this.searchValue = "";
        /** The selection count on `contextual` and `contextual alt`. Announced when it changes. */
        this.count = "2 Items";
        /** Accessible name of the fixed control on `centered`. */
        this.trailingLabel = "Account";
    }
    get isExtended() {
        return this.extended || this.type === "extended";
    }
    get isContextual() {
        return this.type === "contextual" || this.type === "contextual alt";
    }
    emit(name) {
        this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true }));
    }
    getTitle() {
        // Rendered beside the slot, not as its fallback: whitespace in the light DOM would hide a fallback.
        return html ` <div class="title">
      <slot id="content-slot"></slot>
      ${this.renderAvatar()}${this.type === "contextual" ? html `<span class="count" role="status">${this.count}</span>` : this.renderPageTitle()}
    </div>`;
    }
    renderAvatar() {
        if (this.type !== "default" || !(this.avatarSrc || this.avatarInitials))
            return nothing;
        return html `<zeta-avatar size="xxxs">${this.avatarSrc ? html `<img src=${this.avatarSrc} alt="" />` : this.avatarInitials}</zeta-avatar>`;
    }
    renderPageTitle() {
        if (!this.pageTitle)
            return nothing;
        return this.type ? html `<span role="heading" aria-level=${this.headingLevel}>${this.pageTitle}</span>` : this.pageTitle;
    }
    renderLeading() {
        if (!this.type)
            return nothing;
        const { icon, label } = LEADING[this.type];
        if (this.type === "contextual alt") {
            return html `<zeta-button flavor="subtle" size="small" shape="rounded" aria-label=${this.leadingLabel ?? label} @click=${() => this.emit("leading-click")}>
        <zeta-icon>${icon}</zeta-icon><span role="status">${this.count}</span>
      </zeta-button>`;
        }
        return html `<zeta-icon-button
      flavor="subtle"
      size="small"
      shape="rounded"
      aria-label=${this.leadingLabel ?? label}
      @click=${() => this.emit("leading-click")}
      >${icon}</zeta-icon-button
    >`;
    }
    renderTrailing() {
        if (this.type !== "centered")
            return nothing;
        return html `<zeta-icon-button flavor="subtle" size="small" shape="rounded" aria-label=${this.trailingLabel} @click=${() => this.emit("trailing-click")}
      >user_circle</zeta-icon-button
    >`;
    }
    render() {
        return html `
      <header>
        <div class="body">
          <slot id="leading-slot" name="leading">${this.renderLeading()}</slot>
          ${this.type === "search" ? html `<zeta-search class="search" block size="small" flavor="ghost" shape="rounded" placeholder="Search" .value=${this.searchValue}></zeta-search>` : nothing}
          ${!this.isExtended && this.type !== "search" && this.type !== "contextual alt" ? this.getTitle() : nothing}
          ${this.type === "search"
            ? nothing
            : html `<slot id="trailing-slot" name=${this.isContextual ? "contextual-controls" : "trailing"}>${this.renderTrailing()}</slot>`}
        </div>
        ${this.isExtended ? this.getTitle() : nothing}
      </header>
    `;
    }
    static { this.styles = [styles]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaTopAppbar.prototype, "centered", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaTopAppbar.prototype, "extended", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaTopAppbar.prototype, "type", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaTopAppbar.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], ZetaTopAppbar.prototype, "pageTitle", void 0);
__decorate([
    property({ type: Number })
], ZetaTopAppbar.prototype, "headingLevel", void 0);
__decorate([
    property({ type: String })
], ZetaTopAppbar.prototype, "avatarSrc", void 0);
__decorate([
    property({ type: String })
], ZetaTopAppbar.prototype, "avatarInitials", void 0);
__decorate([
    property({ type: String })
], ZetaTopAppbar.prototype, "searchValue", void 0);
__decorate([
    property({ type: String })
], ZetaTopAppbar.prototype, "count", void 0);
__decorate([
    property({ type: String })
], ZetaTopAppbar.prototype, "leadingLabel", void 0);
__decorate([
    property({ type: String })
], ZetaTopAppbar.prototype, "trailingLabel", void 0);
ZetaTopAppbar = __decorate([
    customElement("zeta-top-appbar")
], ZetaTopAppbar);
export { ZetaTopAppbar };
//# sourceMappingURL=top-appbar.js.map