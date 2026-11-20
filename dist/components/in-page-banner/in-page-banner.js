var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./in-page-banner.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../icon/icon.js";
import "../button/icon-button/icon-button.js";
import { ZetaCloseEvent } from "../../events.js";
/* The glyph follows Status (spec: anatomy statusIcon). */
const STATUS_ICON = {
    neutral: "lightbulb",
    default: "lightbulb",
    info: "info",
    positive: "check_circle",
    warning: "warning",
    negative: "error"
};
/* Slotted actions whose shape the banner sets. */
const SHAPED = new Set(["ZETA-BUTTON", "ZETA-ICON-BUTTON"]);
/* Marks a slotted action the banner moved into Dark, so it only ever clears its own attribute. */
const DARK_MARK = "data-zeta-banner-dark";
/** A status message placed inside the content it is about: a form, a card, a panel. It sits in the flow at its
 * container's width. `status` sets the colour and glyph; `appearance` sets how loud it is. Solid interrupts, for the
 * one message on a view that must be seen now. Subtle informs, for context and guidance, and several can share a page.
 *
 * On solid the controls draw light on any fill: slotted actions take `data-theme="dark"`, and the dismiss maps its
 * foreground to foreground/on-strong (Figma pins palette Dark on both). The text keeps a 16rem minimum before the
 * actions wrap beneath it. `status="negative"` interrupts assistive technology; the others announce politely.
 *
 * @slot - The supporting line, when `description` is not set (the legacy way to give the body).
 * @slot actions - The controls the message needs, normally one small zeta-button: outline-subtle on subtle,
 * outline-contrast on solid. The banner sets their shape.
 * @slot action - The legacy name for `actions`.
 *
 * @part banner - The banner surface.
 * @part icon - The container holding the status glyph.
 * @part header - The title.
 * @part body - The supporting line.
 * @part footer - The actions.
 *
 * @event {CustomEvent<ZetaCloseEventDetail>} close - The dismiss was pressed. The product removes the banner.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8051-4995
 * @storybook ?path=/docs/components-in-page-banner--docs
 */
let ZetaInPageBanner = class ZetaInPageBanner extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** The status colour and glyph. `default` is the legacy name for neutral. */
        this.status = "info";
        /** `solid` interrupts; `subtle` informs. */
        this.appearance = "subtle";
        /** The headline: what happened (spec: title). */
        this.heading = "";
        /** The legacy name for `heading`. */
        this.title = "";
        /** The supporting line: why, and what to do next. Shown when set. */
        this.description = "";
        /** Keeps the status glyph so the banner survives greyscale. */
        this.showIcon = true;
        /** Shows the dismiss. */
        this.showClose = false;
        /** The legacy name for `showClose`. */
        this.canClose = false;
        /** Accessible name of the dismiss. */
        this.closeLabel = "Dismiss";
        this.hasActions = false;
        this.syncActions = () => {
            const solid = this.appearance === "solid";
            for (const slot of this.renderRoot.querySelectorAll("slot[name]")) {
                for (const el of slot.assignedElements({ flatten: true })) {
                    if (solid && !el.hasAttribute("data-theme")) {
                        el.setAttribute("data-theme", "dark");
                        el.setAttribute(DARK_MARK, "");
                    }
                    if (!solid && el.hasAttribute(DARK_MARK)) {
                        el.removeAttribute("data-theme");
                        el.removeAttribute(DARK_MARK);
                    }
                    if (SHAPED.has(el.tagName))
                        el.shape = this.rounded ? "rounded" : "sharp";
                }
            }
        };
        this.onActions = () => {
            const slots = this.renderRoot.querySelectorAll("slot[name]");
            this.hasActions = [...slots].some(s => s.assignedElements().length > 0);
            this.syncActions();
        };
    }
    close() {
        this.dispatchEvent(new ZetaCloseEvent().toEvent());
    }
    updated(changed) {
        if (changed.has("rounded") || changed.has("appearance"))
            this.syncActions();
    }
    render() {
        const heading = this.heading || this.title;
        const closable = this.showClose || this.canClose;
        return html `
      <div class="banner" part="banner" role=${this.status === "negative" ? "alert" : "status"}>
        ${this.showIcon
            ? html `<span class="glyph" part="icon"><zeta-icon .rounded=${this.rounded}>${this.icon ?? STATUS_ICON[this.status]}</zeta-icon></span>`
            : nothing}
        <div class="content">
          <div class="text">
            ${heading ? html `<span class="title" part="header">${heading}</span>` : nothing}
            <span class="description" part="body">${this.description || html `<slot></slot>`}</span>
          </div>
          <div class="actions" part="footer" ?hidden=${!this.hasActions}>
            <slot name="actions" @slotchange=${this.onActions}></slot><slot name="action" @slotchange=${this.onActions}></slot>
          </div>
        </div>
        ${closable
            ? html `<zeta-icon-button
                class="dismiss"
                flavor="subtle"
                size="small"
                shape=${this.rounded ? "rounded" : "sharp"}
                aria-label=${this.closeLabel}
                @click=${() => this.close()}
                >close</zeta-icon-button
              >`
            : nothing}
      </div>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaInPageBanner.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaInPageBanner.prototype, "appearance", void 0);
__decorate([
    property({ type: String })
], ZetaInPageBanner.prototype, "heading", void 0);
__decorate([
    property({ type: String })
], ZetaInPageBanner.prototype, "title", void 0);
__decorate([
    property({ type: String })
], ZetaInPageBanner.prototype, "description", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-icon" })
], ZetaInPageBanner.prototype, "showIcon", void 0);
__decorate([
    property({ type: String })
], ZetaInPageBanner.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-close" })
], ZetaInPageBanner.prototype, "showClose", void 0);
__decorate([
    property({ type: Boolean })
], ZetaInPageBanner.prototype, "canClose", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZetaInPageBanner.prototype, "closeLabel", void 0);
__decorate([
    state()
], ZetaInPageBanner.prototype, "hasActions", void 0);
ZetaInPageBanner = __decorate([
    customElement("zeta-in-page-banner")
], ZetaInPageBanner);
export { ZetaInPageBanner };
//# sourceMappingURL=in-page-banner.js.map