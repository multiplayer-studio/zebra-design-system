var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./snackbar.styles.js";
import "../icon/icon.js";
import "../button/button.js";
import "../icon-button/icon-button.js";
/**
 * What each contextual flavour carries (spec: variants byFlavour): a leading
 * glyph, an action and its Button flavour, whether it has a close, and
 * whether the bar is a dark one (which carries its own colour mode).
 */
const FLAVOUR = {
    info: { icon: "info", close: true, actionFlavour: "subtle" },
    positive: { icon: "check-circle", close: true, actionFlavour: "subtle" },
    warning: { icon: "warning", close: true, actionFlavour: "subtle" },
    error: { icon: "error", close: true, actionFlavour: "subtle" },
    deletion: { icon: "delete", action: "Undo", close: true, actionFlavour: "subtle" },
    view: { icon: "open-in-new-window", action: "View", close: false, actionFlavour: "subtle" },
    action: { action: "Action", close: false, actionFlavour: "outline-subtle", dark: true },
    default: { close: true, actionFlavour: "subtle", dark: true },
};
/**
 * A brief message about something the app just did, carrying at most one
 * action. Variant chooses between a contextual pill, where Flavour sets the
 * tint, the leading glyph and the controls together, and a plain standard
 * bar.
 *
 * Follows specs/snackbar:
 *  - contextual info / positive / warning / error / deletion / view sit on
 *    feedback/<kind>/background/subtle (deletion shares error, view takes
 *    neutral) with their glyph; action, default and every standard bar are
 *    the dark bars, on surface/overlay.
 *  - The action is a `<zds-button>`, subtle on deletion (Undo), view (View)
 *    and standard (Action), outline-subtle on action; the close a subtle
 *    `<zds-icon-button>`. Both are medium, full on the contextual pill,
 *    rounded on standard and sharp when the bar is sharp. (Figma draws the
 *    rounded action bar's button small; the spec warns, and medium keeps it
 *    concentric with the bar's end like every other control.)
 *  - The message stays on one line (spec: Width). Where the space runs out
 *    it ends in an ellipsis rather than running past the edge.
 *
 * The message is the default slot. `action-label` overrides the flavour's
 * action ("" removes it); `show-close` the close. The flavours without a
 * glyph of their own (default, action, and every standard bar) take one in
 * the `icon` slot (Figma's Icon Slot / Show Icon); it is coloured and sized
 * (control/icon-md) like the built-in glyphs.
 *
 * Behaviour: `open` shows it. With `duration` (ms) it closes itself, but the
 * timer pauses while the pointer or focus is inside, so nobody loses a
 * message they are reading or an Undo they are reaching for. Announced
 * politely (role=status); error interrupts (role=alert).
 *
 * Dark bars carry their own colour mode: Figma pins palette=Dark on them; in
 * code the host takes .mode-dark on a light page and .mode-light on a dark
 * one (the inversion the spec notes Figma cannot express), so every token
 * inside, the buttons' included, resolves in that mode. The page's mode is
 * read from the nearest .mode-* ancestor when the bar connects and each time
 * it opens.
 *
 * Placement and motion (spec: Motion, Layering): it floats in the top layer
 * (a manual popover), so no z-index on the page can sit above it, centred
 * space/xl above the bottom of the viewport. It slides in from below over
 * 300ms and leaves sliding up and fading over 200ms (no motion tokens yet);
 * with reduced motion it only fades. `inline` keeps it in the page flow
 * instead, for documentation.
 *
 * @slot - The message.
 * @slot icon - A leading icon, for the flavours without one of their own.
 * @fires action - The action button was pressed. The snackbar then closes.
 * @fires close - It closed; `detail.reason` is "dismiss", "timeout" or "action".
 * @csspart surface - The bar.
 *
 * @spec specs/snackbar/snackbar.spec.json
 */
let ZdsSnackbar = class ZdsSnackbar extends LitElement {
    constructor() {
        super(...arguments);
        this.variant = "contextual";
        /** Corners: rounded (a pill when contextual, radius/md when standard) or sharp (radius/none). */
        this.shape = "rounded";
        /** Contextual only: sets the glyph, the tint and the default action. */
        this.flavour = "info";
        this.open = false;
        /** Closes itself after this many ms. 0 keeps it until dismissed. */
        this.duration = 0;
        /** The action's text. Defaults per flavour (Undo, View, Action); "" removes it. */
        this.actionLabel = null;
        /**
         * Shows the close button. Unset, it follows the flavour (spec: Show Close);
         * `show-close` or `show-close="true"` forces it on, `show-close="false"`
         * forces it off.
         */
        this.showClose = null;
        /** Accessible name for the close button. */
        this.closeLabel = "Dismiss";
        /** Renders in the page flow rather than floating in the top layer, without motion. For documentation. */
        this.inline = false;
        /** Still on screen while the exit plays after `open` went false. */
        this.leaving = false;
        /** Whether the icon slot has something in it, so an empty slot adds no gap. */
        this.slottedIcon = false;
        this.internals = this.attachInternals();
        this.paused = false;
        this.pause = () => {
            this.paused = true;
            clearTimeout(this.timer);
        };
        this.resume = (e) => {
            // Focus moving between the action and the close is still "inside".
            if (e instanceof FocusEvent && this.renderRoot.contains(e.relatedTarget))
                return;
            this.paused = false;
            this.arm();
        };
    }
    get contextual() {
        return this.variant !== "standard";
    }
    get action() {
        if (this.actionLabel !== null)
            return this.actionLabel;
        return this.contextual ? (FLAVOUR[this.flavour]?.action ?? "") : "";
    }
    get close() {
        return this.showClose ?? (this.contextual ? (FLAVOUR[this.flavour]?.close ?? true) : false);
    }
    /** A dark bar: contextual default/action, or any standard bar. */
    get dark() {
        return this.contextual ? !!FLAVOUR[this.flavour]?.dark : true;
    }
    /** The page's mode at the bar, from the nearest .mode-* ancestor across shadow roots. */
    pageIsDark() {
        let n = this.parentElement ?? (this.getRootNode().host ?? null);
        while (n) {
            if (n.classList.contains("mode-dark"))
                return true;
            if (n.classList.contains("mode-light"))
                return false;
            n = n.parentElement ?? (n.getRootNode().host ?? null);
        }
        return false;
    }
    /** Dark bars carry the opposite of the page's mode; tinted bars follow the page. */
    syncMode() {
        const own = this.dark ? (this.pageIsDark() ? "mode-light" : "mode-dark") : null;
        this.classList.toggle("mode-dark", own === "mode-dark");
        this.classList.toggle("mode-light", own === "mode-light");
    }
    willUpdate(changed) {
        if (changed.has("variant") || changed.has("flavour") || (changed.has("open") && this.open))
            this.syncMode();
        // Keep rendering through the exit when open turns off.
        if (changed.has("open") && !this.open && changed.get("open") === true && !this.inline)
            this.leaving = true;
        this.toggleAttribute("data-shown", this.open || this.leaving);
    }
    updated(changed) {
        this.internals.role = this.contextual && this.flavour === "error" ? "alert" : "status";
        if (changed.has("inline")) {
            if (this.inline) {
                if (this.popover) {
                    if (this.matches(":popover-open"))
                        this.hidePopover();
                    this.removeAttribute("popover");
                }
            }
            else
                this.popover = "manual";
        }
        if (changed.has("open")) {
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
        if (this.inline)
            return;
        if (!this.matches(":popover-open"))
            this.showPopover();
        const bar = this.renderRoot.querySelector(".surface");
        // Reopened mid-exit: drop the exit, which holds its faded end state.
        bar?.getAnimations().forEach((anim) => anim.cancel());
        bar?.animate(this.reducedMotion
            ? [{ opacity: 0 }, { opacity: 1 }]
            : [{ opacity: 0, transform: "translateY(100%)" }, { opacity: 1, transform: "none" }], { duration: this.reducedMotion ? 150 : 300, easing: "cubic-bezier(0.2, 0, 0, 1)" });
    }
    async exit() {
        const bar = this.renderRoot.querySelector(".surface");
        if (bar) {
            const anim = bar.animate(this.reducedMotion
                ? [{ opacity: 1 }, { opacity: 0 }]
                : [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-50%)" }], { duration: this.reducedMotion ? 150 : 200, easing: "cubic-bezier(0.3, 0, 1, 1)", fill: "forwards" });
            await anim.finished.catch(() => undefined);
        }
        if (this.open)
            return; // reopened mid-exit
        this.leaving = false;
        if (this.matches(":popover-open"))
            this.hidePopover();
    }
    connectedCallback() {
        super.connectedCallback();
        this.syncMode();
        if (!this.inline)
            this.popover = "manual";
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearTimeout(this.timer);
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
    onAction() {
        this.dispatchEvent(new Event("action", { bubbles: true, composed: true }));
        this.hide("action");
    }
    render() {
        if (!this.open && !this.leaving)
            return nothing;
        const icon = this.contextual ? FLAVOUR[this.flavour]?.icon : undefined;
        const onIconSlot = (e) => {
            this.slottedIcon = e.target.assignedNodes({ flatten: true }).length > 0;
        };
        const action = this.action;
        const actionFlavour = this.contextual ? (FLAVOUR[this.flavour]?.actionFlavour ?? "subtle") : "subtle";
        const buttonShape = this.shape === "sharp" ? "sharp" : this.contextual ? "full" : "rounded";
        // Any control at the end sits concentric in the bar's end: the styles
        // match its end gap to its top gap.
        const end = action || this.close ? "control" : nothing;
        return html `<div
      part="surface"
      class="surface"
      data-end=${end}
      @pointerenter=${this.pause}
      @pointerleave=${this.resume}
      @focusin=${this.pause}
      @focusout=${this.resume}
    >
      ${icon
            ? html `<zds-icon class="lead" name=${icon} size="medium"></zds-icon>`
            : html `<span class="lead" ?hidden=${!this.slottedIcon}><slot name="icon" @slotchange=${onIconSlot}></slot></span>`}
      <span class="message"><slot></slot></span>
      ${action || this.close
            ? html `<span class="controls">
            ${action
                ? html `<zds-button class="action" flavour=${actionFlavour} size="medium" shape=${buttonShape} @click=${this.onAction}
                  >${action}</zds-button
                >`
                : nothing}
            ${this.close
                ? html `<zds-icon-button
                  class="close"
                  flavour="subtle"
                  size="medium"
                  shape=${buttonShape}
                  icon="close"
                  label=${this.closeLabel}
                  @click=${() => this.hide("dismiss")}
                ></zds-icon-button>`
                : nothing}
          </span>`
            : nothing}
    </div>`;
    }
};
ZdsSnackbar.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsSnackbar.prototype, "variant", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSnackbar.prototype, "shape", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsSnackbar.prototype, "flavour", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSnackbar.prototype, "open", void 0);
__decorate([
    property({ type: Number })
], ZdsSnackbar.prototype, "duration", void 0);
__decorate([
    property({ type: String, attribute: "action-label" })
], ZdsSnackbar.prototype, "actionLabel", void 0);
__decorate([
    property({
        attribute: "show-close",
        converter: { fromAttribute: (v) => (v === null ? null : v !== "false"), toAttribute: (v) => (v === null ? null : String(v)) },
    })
], ZdsSnackbar.prototype, "showClose", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZdsSnackbar.prototype, "closeLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsSnackbar.prototype, "inline", void 0);
__decorate([
    state()
], ZdsSnackbar.prototype, "leaving", void 0);
__decorate([
    state()
], ZdsSnackbar.prototype, "slottedIcon", void 0);
ZdsSnackbar = __decorate([
    customElement("zds-snackbar")
], ZdsSnackbar);
export { ZdsSnackbar };
