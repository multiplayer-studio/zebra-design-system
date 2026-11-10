var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./snackbar.styles.js";
import "../icon/icon.js";
import "../button/button.js";
import "../button/icon-button/icon-button.js";
import { Interactive } from "../../mixins/interactive.js";
import { ContourableThree } from "../../mixins/contourable-three.js";
import {} from "@zebra-fed/zeta-icons";
/* What each contextual flavour carries: a glyph, a default action and its Button flavour, a close, and whether it is
   a dark bar. */
const FLAVORS = {
    info: { icon: "info", close: true, actionFlavor: "subtle" },
    positive: { icon: "check_circle", close: true, actionFlavor: "subtle" },
    warning: { icon: "warning", close: true, actionFlavor: "subtle" },
    error: { icon: "error", close: true, actionFlavor: "subtle" },
    deletion: { icon: "delete", action: "Undo", close: true, actionFlavor: "subtle" },
    view: { icon: "open_in_new_window", action: "View", close: false, actionFlavor: "subtle" },
    action: { action: "Action", close: false, actionFlavor: "outline-subtle", dark: true },
    default: { close: true, actionFlavor: "subtle", dark: true }
};
const showCloseConverter = {
    fromAttribute: (v) => (v === null ? null : v !== "false"),
    toAttribute: (v) => (v === null ? null : String(v))
};
/** A brief message about something the app just did, carrying at most one action. `variant` chooses a contextual pill,
 * where `flavor` sets the tint, the glyph and the controls together, or a plain dark standard bar.
 *
 * It sits in the page by default, as Zeta's snackbar always has. `floating` lifts it into the top layer, centred above
 * the bottom of the viewport, sliding in over 300ms and out over 200ms (a fade only with reduced motion). With
 * `duration` it closes itself, pausing while the pointer or focus is inside. It announces itself politely (an error
 * interrupts). The dark bars carry their own colour mode, so on a dark page they invert to light.
 *
 * @slot - The message: one short line, which ends in an ellipsis where it runs out of room.
 * @slot icon - A leading icon, for the flavours without a glyph of their own (default, action and standard).
 * @part surface - The bar.
 * @event action - The action button was pressed. The snackbar then closes.
 * @event close - It closed; `detail.reason` is "dismiss", "timeout" or "action".
 *
 * @figma https://www.figma.com/design/a141EitftpzBk3asu3a315/Snackbar?node-id=6551-170
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-snackbar--docs
 */
let ZetaSnackbar = class ZetaSnackbar extends ContourableThree(Interactive(LitElement)) {
    constructor() {
        super(...arguments);
        /** The contextual pill, or the plain dark standard bar. */
        this.variant = "contextual";
        /** Contextual only: the glyph, the tint and the controls, picked for what happened (spec: flavour). */
        this.flavor = "default";
        /** Shows it. On by default, so a snackbar placed in the page shows as it always has. */
        this.open = true;
        /** Floats it in the top layer, centred above the bottom of the viewport, with its motion. */
        this.floating = false;
        /** Closes it after this many ms. 0 keeps it until dismissed. */
        this.duration = 0;
        /** Shows the close. Unset, it follows the flavour; `show-close="false"` turns it off. */
        this.showClose = null;
        /** The legacy switch for the close. */
        this.hasCloseAction = false;
        /** Accessible name of the close. */
        this.closeLabel = "Dismiss";
        this.leaving = false;
        this.slottedIcon = false;
        this.internals = this.attachInternals();
        this.paused = false;
        this.pause = () => {
            this.paused = true;
            clearTimeout(this.timer);
        };
        this.resume = (e) => {
            if (e instanceof FocusEvent && this.renderRoot.contains(e.relatedTarget))
                return;
            this.paused = false;
            this.arm();
        };
        this.onAction = () => {
            this.actionClick?.();
            this.dispatchEvent(new Event("action", { bubbles: true, composed: true }));
            this.hide("action");
        };
        this.onIconSlot = (e) => {
            this.slottedIcon = e.target.assignedNodes({ flatten: true }).length > 0;
        };
    }
    get contextual() {
        return this.variant !== "standard";
    }
    get action() {
        if (this.actionLabel !== undefined)
            return this.actionLabel;
        return this.contextual ? (FLAVORS[this.flavor]?.action ?? "") : "Action";
    }
    get close() {
        if (this.showClose !== null)
            return this.showClose;
        if (this.hasCloseAction)
            return true;
        return this.contextual ? (FLAVORS[this.flavor]?.close ?? true) : true;
    }
    get dark() {
        return this.contextual ? !!FLAVORS[this.flavor]?.dark : true;
    }
    /** The page's mode at the bar: the nearest data-theme above it, else the OS preference. */
    pageIsDark() {
        let n = this.parentElement ?? (this.getRootNode().host || null);
        while (n) {
            const theme = n.getAttribute("data-theme");
            if (theme)
                return theme === "dark";
            n = n.parentElement ?? (n.getRootNode().host || null);
        }
        return matchMedia("(prefers-color-scheme: dark)").matches;
    }
    /** Dark bars take the opposite of the page's mode; tinted bars follow the page. */
    syncMode() {
        if (this.dark)
            this.setAttribute("data-theme", this.pageIsDark() ? "light" : "dark");
        else
            this.removeAttribute("data-theme");
    }
    connectedCallback() {
        super.connectedCallback?.();
        this.syncMode();
    }
    disconnectedCallback() {
        super.disconnectedCallback?.();
        clearTimeout(this.timer);
    }
    willUpdate(changed) {
        if (changed.has("status") && this.status)
            this.flavor = this.status === "negative" ? "error" : this.status;
        if (changed.has("shape") && this.shape === "full")
            this.shape = "rounded";
        if (changed.has("variant") || changed.has("flavor") || changed.has("status") || (changed.has("open") && this.open))
            this.syncMode();
        if (changed.has("open") && !this.open && changed.get("open") === true && this.floating)
            this.leaving = true;
        this.toggleAttribute("data-shown", this.open || this.leaving);
    }
    updated(changed) {
        this.internals.role = this.contextual && this.flavor === "error" ? "alert" : "status";
        if (changed.has("floating")) {
            if (this.floating)
                this.popover = "manual";
            else if (this.popover) {
                if (this.matches(":popover-open"))
                    this.hidePopover();
                this.removeAttribute("popover");
            }
        }
        if (changed.has("open") || changed.has("floating")) {
            if (this.open)
                this.enter();
            else if (this.leaving)
                void this.exit();
        }
        if (changed.has("open") || changed.has("duration"))
            this.arm();
    }
    get reducedMotion() {
        return matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    enter() {
        if (!this.floating)
            return;
        if (!this.matches(":popover-open"))
            this.showPopover();
        const bar = this.renderRoot.querySelector(".snackbar-root");
        bar?.getAnimations().forEach(a => a.cancel());
        bar?.animate(this.reducedMotion
            ? [{ opacity: 0 }, { opacity: 1 }]
            : [
                { opacity: 0, transform: "translateY(100%)" },
                { opacity: 1, transform: "none" }
            ], { duration: this.reducedMotion ? 150 : 300, easing: "cubic-bezier(0.2, 0, 0, 1)" });
    }
    async exit() {
        const bar = this.renderRoot.querySelector(".snackbar-root");
        if (bar) {
            const anim = bar.animate(this.reducedMotion
                ? [{ opacity: 1 }, { opacity: 0 }]
                : [
                    { opacity: 1, transform: "none" },
                    { opacity: 0, transform: "translateY(-50%)" }
                ], { duration: this.reducedMotion ? 150 : 200, easing: "cubic-bezier(0.3, 0, 1, 1)", fill: "forwards" });
            await anim.finished.catch(() => undefined);
        }
        if (this.open)
            return;
        this.leaving = false;
        if (this.matches(":popover-open"))
            this.hidePopover();
    }
    /** Closes it, as the close button does. */
    hide(reason = "dismiss") {
        if (!this.open)
            return;
        this.open = false;
        clearTimeout(this.timer);
        this.dispatchEvent(new CustomEvent("close", { detail: { reason }, bubbles: true, composed: true }));
    }
    arm() {
        clearTimeout(this.timer);
        if (this.open && this.duration > 0 && !this.paused)
            this.timer = setTimeout(() => this.hide("timeout"), this.duration);
    }
    render() {
        if (!this.open && !this.leaving)
            return nothing;
        const icon = this.contextual ? FLAVORS[this.flavor]?.icon : undefined;
        const action = this.action;
        const actionFlavor = this.contextual ? (FLAVORS[this.flavor]?.actionFlavor ?? "subtle") : "subtle";
        const shape = this.shape === "sharp" ? "sharp" : this.contextual ? "full" : "rounded";
        return html `<div
      part="surface"
      class="snackbar-root"
      ?data-end=${!!action || this.close}
      @pointerenter=${this.pause}
      @pointerleave=${this.resume}
      @focusin=${this.pause}
      @focusout=${this.resume}
    >
      ${icon
            ? html `<zeta-icon class="lead" aria-hidden="true" .rounded=${this.shape !== "sharp"}>${icon}</zeta-icon>`
            : html `<span class="lead" ?hidden=${!this.slottedIcon}><slot name="icon" @slotchange=${this.onIconSlot}></slot></span>`}
      <span class="message"><slot></slot></span>
      ${action || this.close
            ? html `<span class="controls">
              ${action
                ? html `<zeta-button id="action" class="action" flavor=${actionFlavor} size="medium" shape=${shape} @click=${this.onAction}
                    >${action}</zeta-button
                  >`
                : nothing}
              ${this.close
                ? html `<zeta-icon-button
                    id="closeButton"
                    class="close"
                    flavor="subtle"
                    size="medium"
                    shape=${shape}
                    aria-label=${this.closeLabel}
                    @click=${() => this.hide("dismiss")}
                    >${this.closeActionIcon ?? "close"}</zeta-icon-button
                  >`
                : nothing}
            </span>`
            : nothing}
    </div>`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaSnackbar.prototype, "variant", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaSnackbar.prototype, "flavor", void 0);
__decorate([
    property({ type: String })
], ZetaSnackbar.prototype, "status", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSnackbar.prototype, "open", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSnackbar.prototype, "floating", void 0);
__decorate([
    property({ type: Number })
], ZetaSnackbar.prototype, "duration", void 0);
__decorate([
    property({ type: String })
], ZetaSnackbar.prototype, "actionLabel", void 0);
__decorate([
    property({ attribute: false })
], ZetaSnackbar.prototype, "actionClick", void 0);
__decorate([
    property({ attribute: "show-close", converter: showCloseConverter })
], ZetaSnackbar.prototype, "showClose", void 0);
__decorate([
    property({ type: Boolean })
], ZetaSnackbar.prototype, "hasCloseAction", void 0);
__decorate([
    property({ type: String })
], ZetaSnackbar.prototype, "closeActionIcon", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZetaSnackbar.prototype, "closeLabel", void 0);
__decorate([
    state()
], ZetaSnackbar.prototype, "leaving", void 0);
__decorate([
    state()
], ZetaSnackbar.prototype, "slottedIcon", void 0);
ZetaSnackbar = __decorate([
    customElement("zeta-snackbar")
], ZetaSnackbar);
export { ZetaSnackbar };
//# sourceMappingURL=snackbar.js.map