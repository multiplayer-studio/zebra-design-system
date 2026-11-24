var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./system-banner.styles.js";
import { Contourable } from "../../mixins/mixins.js";
import "../icon/icon.js";
import "../button/icon-button/icon-button.js";
/* Desktop's glyph follows Status; positive is the legacy name for the success colour. */
const STATUS_ICON = {
    default: "check_circle",
    positive: "check_circle",
    negative: "error",
    warning: "warning",
    info: "info"
};
/* Slotted actions whose shape the banner sets. */
const SHAPED = new Set(["ZETA-BUTTON", "ZETA-ICON-BUTTON"]);
/* In, the height opens from nothing while the row slides down, pushing what is below; out reverses it. 400ms, easing
   out in and in out (no motion token yet); reduced motion fades. Resolves true when it finished. */
function slide(banner, row, direction) {
    if (typeof banner.animate !== "function")
        return Promise.resolve(true);
    banner.getAnimations().forEach(a => a.cancel());
    row.getAnimations().forEach(a => a.cancel());
    const into = direction === "in";
    const settle = (a) => a.finished.then(() => true, () => false);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const fade = [{ opacity: 0 }, { opacity: 1 }];
        return settle(banner.animate(into ? fade : fade.reverse(), { duration: 200, easing: "ease-out", fill: into ? "none" : "forwards" }));
    }
    const height = banner.getBoundingClientRect().height;
    const timing = into
        ? { duration: 400, easing: "cubic-bezier(0.2, 0, 0, 1)" }
        : { duration: 400, easing: "cubic-bezier(0.3, 0, 1, 1)", fill: "forwards" };
    const open = [{ height: "0px" }, { height: `${height}px` }];
    const drop = [{ transform: "translateY(-100%)" }, { transform: "none" }];
    banner.style.overflow = "hidden";
    const anim = banner.animate(into ? open : open.reverse(), timing);
    row.animate(into ? drop : drop.reverse(), timing);
    return settle(anim).then(done => {
        if (done && into)
            banner.style.overflow = "";
        return done;
    });
}
/** A full-width message pinned to the top of a screen or view: a status colour, a title, an optional description and
 * optional actions. It spans its container and stays until something clears it. `layout` picks the desktop banner or
 * the mobile one.
 *
 * It is locked to Dark, whatever the page's mode, so the white text and the controls hold on the strong status
 * colours. The banner stays square; `rounded` sets the shape of the dismiss and every Button or Icon Button in the
 * actions. `status="negative"` never shows a dismiss and interrupts assistive technology; the others announce politely.
 * It reveals by sliding down and pushing the content below; the dismiss or `open=false` plays that in reverse.
 *
 * @slot - The title, when `heading` is not set (the legacy way to give the text).
 * @slot actions - The controls the message needs, typically one small outline-contrast zeta-button.
 * @slot {zeta-icon} leadingIcon - A leading icon in place of the status glyph (legacy).
 * @slot {zeta-icon} trailingIcon - An icon at the trailing end (legacy).
 * @part row - The message row.
 * @event close - The dismiss was pressed. The banner plays its exit and hides first.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5255-2146
 * @storybook ?path=/docs/components-system-banner--docs
 */
let ZetaSystemBanner = class ZetaSystemBanner extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** The status colour. `default` is the success colour, despite the name; `positive` is its legacy name. */
        this.status = "default";
        /** The desktop view banner or the mobile screen banner. */
        this.layout = "desktop";
        /** The headline: what happened (spec: title). */
        this.heading = "";
        /** The supporting line. On desktop it makes the banner multiline. */
        this.description = "";
        /** Keeps the status glyph. */
        this.showLeadingIcon = true;
        /** Mobile only: the glyph, chosen per use. Desktop's follows `status`. */
        this.icon = "verified";
        /** Lets the person dismiss the banner. Ignored on negative. */
        this.showClose = true;
        /** Accessible name of the dismiss. */
        this.closeLabel = "Dismiss";
        /** Shows the banner; false plays the exit and hides it, true again replays the reveal. */
        this.open = true;
        /** Legacy: `center` centres the message in the row. */
        this.align = "start";
        this.hasActions = false;
        this.hasLeading = false;
        this.hasTrailing = false;
        this.shapeActions = () => {
            const slot = this.renderRoot.querySelector('slot[name="actions"]');
            for (const el of slot?.assignedElements({ flatten: true }) ?? []) {
                if (SHAPED.has(el.tagName))
                    el.shape = this.rounded ? "rounded" : "sharp";
            }
        };
        this.onActions = (e) => {
            this.hasActions = e.target.assignedElements().length > 0;
            this.shapeActions();
        };
        this.dismiss = () => {
            const finish = () => {
                this.hidden = true;
                this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
            };
            const row = this.row;
            if (row)
                void slide(this, row, "out").then(done => done && finish());
            else
                finish();
        };
    }
    connectedCallback() {
        super.connectedCallback?.();
        // The Dark lock: every token inside, the controls' included, resolves dark.
        this.setAttribute("data-theme", "dark");
    }
    get row() {
        return this.renderRoot.querySelector(".system-banner");
    }
    firstUpdated() {
        const row = this.row;
        if (!this.open)
            this.hidden = true;
        else if (row)
            void slide(this, row, "in");
    }
    updated(changed) {
        if (changed.has("rounded"))
            this.shapeActions();
        if (changed.has("open") && changed.get("open") !== undefined) {
            const row = this.row;
            if (this.open) {
                this.hidden = false;
                if (row)
                    void slide(this, row, "in");
            }
            else if (row) {
                void slide(this, row, "out").then(done => {
                    if (done)
                        this.hidden = true;
                });
            }
            else
                this.hidden = true;
        }
    }
    render() {
        const mobile = this.layout === "mobile";
        const close = this.showClose && this.status !== "negative";
        const heading = this.heading || this.text;
        const glyph = this.showLeadingIcon
            ? html `<span class="glyph" ?hidden=${this.hasLeading}
          ><zeta-icon .rounded=${this.rounded}>${mobile ? this.icon : STATUS_ICON[this.status]}</zeta-icon></span
        >`
            : nothing;
        return html `
      <div class="system-banner" part="row" role=${this.status === "negative" ? "alert" : "status"} data-content=${this.description ? "multiline" : "single"}>
        <span class="glyph" ?hidden=${!this.hasLeading}>
          <slot name="leadingIcon" @slotchange=${(e) => (this.hasLeading = e.target.assignedElements().length > 0)}></slot>
        </span>
        ${glyph}
        <div class="content">
          <div class="text">
            <span class="title">${heading || html `<slot></slot>`}</span>
            ${this.description ? html `<span class="description">${this.description}</span>` : nothing}
          </div>
          <div class="actions" ?hidden=${!this.hasActions}><slot name="actions" @slotchange=${this.onActions}></slot></div>
        </div>
        <span class="trailing" ?hidden=${!this.hasTrailing}>
          <slot name="trailingIcon" @slotchange=${(e) => (this.hasTrailing = e.target.assignedElements().length > 0)}></slot>
        </span>
        ${close
            ? html `<zeta-icon-button
                class="dismiss"
                flavor="subtle"
                shape=${this.rounded ? "rounded" : "sharp"}
                size=${mobile ? "medium" : "small"}
                aria-label=${this.closeLabel}
                @click=${this.dismiss}
                >close</zeta-icon-button
              >`
            : nothing}
      </div>
    `;
    }
    static { this.styles = [super.styles || [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaSystemBanner.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaSystemBanner.prototype, "layout", void 0);
__decorate([
    property({ type: String })
], ZetaSystemBanner.prototype, "heading", void 0);
__decorate([
    property({ type: String })
], ZetaSystemBanner.prototype, "text", void 0);
__decorate([
    property({ type: String })
], ZetaSystemBanner.prototype, "description", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-leading-icon" })
], ZetaSystemBanner.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: String })
], ZetaSystemBanner.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-close" })
], ZetaSystemBanner.prototype, "showClose", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZetaSystemBanner.prototype, "closeLabel", void 0);
__decorate([
    property({ type: Boolean })
], ZetaSystemBanner.prototype, "open", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaSystemBanner.prototype, "align", void 0);
__decorate([
    state()
], ZetaSystemBanner.prototype, "hasActions", void 0);
__decorate([
    state()
], ZetaSystemBanner.prototype, "hasLeading", void 0);
__decorate([
    state()
], ZetaSystemBanner.prototype, "hasTrailing", void 0);
ZetaSystemBanner = __decorate([
    customElement("zeta-system-banner")
], ZetaSystemBanner);
export { ZetaSystemBanner };
//# sourceMappingURL=system-banner.js.map