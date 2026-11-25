var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./system-banner.styles.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
/** Slotted actions whose `shape` the banner sets. Anything else is slotted as-is. */
const SHAPED_TAGS = new Set(["ZDS-BUTTON", "ZDS-ICON-BUTTON"]);
/** Desktop's glyph follows Status (spec: variants byStatus); Mobile holds Verified on all four. */
const STATUS_ICON = {
    default: "check-circle",
    negative: "error",
    warning: "warning",
    info: "info",
};
/**
 * The motion (spec: Motion). In, the banner's height opens from nothing while
 * the row slides down from above, so everything below is pushed down rather
 * than covered; out plays it in reverse and pulls the content back up. Both
 * 400ms, easing out on the way in and in on the way out (no motion token
 * yet); reduced motion fades instead. Resolves true when the motion finished,
 * false when it was interrupted.
 */
function slide(banner, row, direction) {
    if (typeof banner.animate !== "function")
        return Promise.resolve(true);
    banner.getAnimations().forEach((a) => a.cancel());
    row.getAnimations().forEach((a) => a.cancel());
    const into = direction === "in";
    const settle = (a) => a.finished.then(() => true, () => false);
    if (typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const fade = [{ opacity: 0 }, { opacity: 1 }];
        return settle(banner.animate(into ? fade : fade.reverse(), { duration: 200, easing: "ease-out", fill: into ? "none" : "forwards" }));
    }
    const height = banner.getBoundingClientRect().height;
    // Out holds its collapsed end state until the banner is hidden.
    const timing = into
        ? { duration: 400, easing: "cubic-bezier(0.2, 0, 0, 1)" }
        : { duration: 400, easing: "cubic-bezier(0.3, 0, 1, 1)", fill: "forwards" };
    const open = [{ height: "0px" }, { height: `${height}px` }];
    const drop = [{ transform: "translateY(-100%)" }, { transform: "none" }];
    banner.style.overflow = "hidden";
    const anim = banner.animate(into ? open : open.reverse(), timing);
    row.animate(into ? drop : drop.reverse(), timing);
    return settle(anim).then((done) => {
        if (done && into)
            banner.style.overflow = "";
        return done;
    });
}
/** A boolean attribute that defaults to true: present or "true" is on, "false" is off. */
const onUnlessFalse = { fromAttribute: (v) => v !== "false", toAttribute: (v) => String(v) };
/**
 * A full-width message pinned to the top of a screen or view, carrying a
 * status colour, a title, an optional description and an optional action.
 * It spans its container and stays until something clears it.
 *
 * Locked to Dark (spec: modeLock): Figma pins palette=Dark on every variant,
 * so the host always carries .mode-dark in the light DOM and every token
 * inside, the dismiss `<zds-icon-button>` and the slotted actions included,
 * resolves dark whatever mode the page is in. That is what keeps the
 * foreground/primary text and the outline-contrast action white on the
 * strong feedback colours.
 *
 * Mobile and Desktop are two Figma sets with different APIs (spec issue
 * "api (sibling sets)"); here they are one element with `layout`. Desktop's
 * Content Type is the presence of `description`, Mobile's Show Description
 * likewise. The title is `heading` (a `title` attribute would also show the
 * browser's tooltip). The dismiss is a subtle sharp `<zds-icon-button>`,
 * medium on mobile and small on desktop, and never shows on negative.
 *
 * One shape (spec: shapeInheritance): `shape` comes from the container and
 * reaches the dismiss
 * and every slotted `<zds-button>` / `<zds-icon-button>`; no control keeps its own.
 *
 * It reveals by sliding in from the top and pushing the content below down,
 * and removal plays that in reverse (spec: Motion): the dismiss, or `open`
 * set to false. `open` true again replays the reveal. Hidden means the
 * `hidden` attribute, set once the reverse has played.
 *
 * Announced politely (role=status), negative interrupts (role=alert).
 *
 * Kept in step with packages/react-baseui `SystemBanner`.
 *
 * @slot actions - The controls the message needs, typically one small outline-contrast `<zds-button>`. The banner sets its shape.
 * @fires close - The dismiss was pressed. The banner plays the reverse and hides first, then fires this. What happens next is the product's decision.
 * @csspart row - The message row.
 *
 * @spec specs/system-banner-mobile/system-banner-mobile.spec.json
 * @spec specs/system-banner-desktop/system-banner-desktop.spec.json
 */
let ZdsSystemBanner = class ZdsSystemBanner extends LitElement {
    constructor() {
        super(...arguments);
        /** Which Figma set it draws: the mobile screen banner or the desktop view banner. */
        this.layout = "desktop";
        /** Sets the background. negative carries no dismiss, so it stays until the condition clears. */
        this.status = "default";
        /** Rounded or sharp, from the container. The actions and the dismiss take it; the banner's own corners stay square. */
        this.shape = "sharp";
        /** The headline: what happened. */
        this.heading = "";
        /** The supporting line. On desktop it turns the banner multiline (Figma's Content Type). */
        this.description = "";
        /** Keeps the status glyph. `show-leading-icon="false"` drops it. */
        this.showLeadingIcon = true;
        /** Mobile only: the glyph is chosen per use (Figma holds Verified). Desktop's follows Status. */
        this.icon = "verified";
        /** Lets the person dismiss the banner. `show-close="false"` hides it. Ignored on negative. */
        this.showClose = true;
        /** Accessible name for the dismiss control. */
        this.closeLabel = "Dismiss";
        /** Shows the banner. `open="false"` plays the reveal in reverse and then hides it; back to true replays the reveal. */
        this.open = true;
        this.hasActions = false;
    }
    connectedCallback() {
        super.connectedCallback();
        // The Dark lock lives on the host, in the light DOM, where the token scopes match.
        this.classList.add("mode-dark");
    }
    onSlotChange(e) {
        this.hasActions = e.target.assignedElements().length > 0;
        this.syncActions();
    }
    get row() {
        return this.renderRoot.querySelector(".row");
    }
    firstUpdated() {
        const row = this.row;
        if (!this.open)
            this.hidden = true;
        else if (row)
            slide(this, row, "in");
    }
    updated(changed) {
        if (changed.has("shape"))
            this.syncActions();
        // The first render is firstUpdated's; after that, open plays the motion.
        if (changed.has("open") && changed.get("open") !== undefined) {
            const row = this.row;
            if (this.open) {
                this.hidden = false;
                if (row)
                    slide(this, row, "in");
            }
            else if (row) {
                slide(this, row, "out").then((done) => { if (done)
                    this.hidden = true; });
            }
            else {
                this.hidden = true;
            }
        }
    }
    syncActions() {
        const slot = this.renderRoot.querySelector('slot[name="actions"]');
        for (const el of slot?.assignedElements({ flatten: true }) ?? []) {
            if (!SHAPED_TAGS.has(el.tagName))
                continue;
            const item = el;
            if (item.shape !== this.shape)
                item.shape = this.shape;
        }
    }
    dismiss() {
        const finish = () => {
            this.hidden = true;
            this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
        };
        const row = this.row;
        if (row)
            slide(this, row, "out").then((done) => { if (done)
                finish(); });
        else
            finish();
    }
    render() {
        const mobile = this.layout === "mobile";
        const close = this.showClose && this.status !== "negative";
        return html `
      <div
        class="row"
        part="row"
        role=${this.status === "negative" ? "alert" : "status"}
        data-content=${this.description ? "multiline" : "single"}
      >
        ${this.showLeadingIcon
            ? html `<span class="glyph"><zds-icon name=${mobile ? this.icon : STATUS_ICON[this.status]} size="medium" ?framed=${mobile}></zds-icon></span>`
            : nothing}
        <div class="content">
          <div class="text">
            <span class="title">${this.heading}</span>
            ${this.description ? html `<span class="description">${this.description}</span>` : nothing}
          </div>
          <div class="actions" ?hidden=${!this.hasActions}><slot name="actions" @slotchange=${this.onSlotChange}></slot></div>
        </div>
        ${close
            ? html `<zds-icon-button class="dismiss" flavour="subtle" shape=${this.shape} size=${mobile ? "medium" : "small"} icon="close" label=${this.closeLabel} @click=${this.dismiss}></zds-icon-button>`
            : nothing}
      </div>
    `;
    }
};
ZdsSystemBanner.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsSystemBanner.prototype, "layout", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSystemBanner.prototype, "status", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSystemBanner.prototype, "shape", void 0);
__decorate([
    property({ type: String })
], ZdsSystemBanner.prototype, "heading", void 0);
__decorate([
    property({ type: String })
], ZdsSystemBanner.prototype, "description", void 0);
__decorate([
    property({ attribute: "show-leading-icon", converter: onUnlessFalse })
], ZdsSystemBanner.prototype, "showLeadingIcon", void 0);
__decorate([
    property({ type: String })
], ZdsSystemBanner.prototype, "icon", void 0);
__decorate([
    property({ attribute: "show-close", converter: onUnlessFalse })
], ZdsSystemBanner.prototype, "showClose", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZdsSystemBanner.prototype, "closeLabel", void 0);
__decorate([
    property({ converter: onUnlessFalse })
], ZdsSystemBanner.prototype, "open", void 0);
__decorate([
    state()
], ZdsSystemBanner.prototype, "hasActions", void 0);
ZdsSystemBanner = __decorate([
    customElement("zds-system-banner")
], ZdsSystemBanner);
export { ZdsSystemBanner };
