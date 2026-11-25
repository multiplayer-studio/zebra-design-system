var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./tooltip.styles.js";
/** The first duration in an element's computed `transition-duration`, in ms (0 under reduced motion). */
function motionMs(el) {
    const d = getComputedStyle(el).transitionDuration.split(",")[0]?.trim() ?? "0s";
    const n = parseFloat(d);
    return Number.isFinite(n) ? (d.endsWith("ms") ? n : n * 1000) : 0;
}
// spec issue "Point is the pointer edge, not the placement": point=bottom
// puts the bubble ABOVE the trigger.
const POINT_TO_SIDE = { bottom: "top", top: "bottom", left: "right", right: "left" };
const OPPOSITE = { top: "bottom", bottom: "top", left: "right", right: "left" };
// Matches Base UI's defaults in the React sibling, so the two behave alike:
// 5px collision padding, and the hover grace that lets the pointer cross the
// gap onto the bubble without it closing (Base UI does this with a safe
// polygon; a short timer is the small-positioner equivalent).
const COLLISION_PADDING = 5;
const HOVER_GRACE_MS = 100;
const FOCUSABLE = "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])";
let uid = 0;
/**
 * A short floating message that names what an adjacent control does.
 *
 * Point it at its trigger with `for` (an id in the same document or shadow
 * root) or the `anchor` property. It then lives in the top layer as a manual
 * popover — clear of any `overflow: hidden` ancestor, still inside the theme
 * cascade because it stays in this element's shadow tree — and:
 *
 * - opens after `delay` ms of hover, at once on keyboard focus (`:focus-visible`);
 * - stays open while the pointer moves onto the bubble;
 * - closes on pointer leave (after `close-delay`), blur, a press on the
 *   trigger, or Escape;
 * - is placed on the side opposite `point`, flips when that side would leave
 *   the viewport, shifts along the edge to stay on screen, and aims the
 *   pointer at the trigger's centre;
 * - wires itself up as the trigger's `aria-describedby` (and, for a trigger
 *   whose focusable element sits in its own open shadow root — `zds-button`,
 *   `zds-icon-button` — as that element's `ariaDescribedByElements`). The
 *   trigger still needs its own accessible name.
 *
 * With no trigger it renders the static bubble in flow — the component
 * exactly as the spec draws it.
 *
 * Positioning is a small manual positioner rather than CSS anchor
 * positioning: `anchor-name` cannot reach from a light-DOM trigger into this
 * shadow root, and Firefox/Safari support is too recent for the package's
 * targets.
 *
 * @slot - The message (spec `label`). A few words naming the action; long text wraps at a max width.
 * @fires zds-open-change - Hover, focus, Escape or a press opened or closed it. `detail: { open: boolean }`.
 * @part bubble - The bubble.
 * @part pointer - The pointer.
 *
 * @spec specs/tooltip/tooltip.spec.json
 */
let ZdsTooltip = class ZdsTooltip extends LitElement {
    constructor() {
        super(...arguments);
        /** The edge the pointer sits on, facing the trigger. `bottom` puts the bubble above the trigger, `top` below, `left` to the right, `right` to the left. */
        this.point = "bottom";
        /** Corner contour — and the pointer tip with it. Match the surrounding controls. */
        this.shape = "rounded";
        /** Shown or hidden. Ignored by a static bubble (no trigger), which is always shown. */
        this.open = false;
        /** Id of the trigger, looked up in this element's own document or shadow root. */
        this.htmlFor = null;
        /** The trigger element itself, when an id will not do. Takes precedence over `for`. */
        this.anchor = null;
        /** Milliseconds of hover before it opens. Keyboard focus opens it at once. */
        this.delay = 600;
        /** Milliseconds before it closes after the pointer leaves. */
        this.closeDelay = 0;
        /**
         * Don't wire the bubble up as the trigger's description (`aria-describedby`).
         * For a bubble that only repeats the trigger's own accessible name — a
         * truncated label shown in full — so a screen reader does not hear it twice.
         */
        this.noDescribe = false;
        /**
         * Asked before every open (hover start, keyboard focus, and when the delay
         * ends); returning false keeps the bubble shut. Unset, it always may open.
         * For a tooltip that only applies sometimes, such as a label that is
         * truncated right now.
         */
        this.canOpen = null;
        this.anchorEl = null;
        this.describedEl = null;
        this.onAnchorEnter = (e) => {
            if (e.pointerType === "touch")
                return;
            if (this.open)
                clearTimeout(this.timer);
            else if (!this.canOpen || this.canOpen())
                this.schedule(true, this.delay);
        };
        this.onBubbleEnter = () => {
            if (this.open)
                clearTimeout(this.timer);
        };
        this.onLeave = () => {
            this.schedule(false, Math.max(this.closeDelay, HOVER_GRACE_MS));
        };
        this.onFocusIn = () => {
            // Keyboard focus only, as Base UI does — a mouse click's focus would
            // otherwise reopen the tooltip the same press just dismissed.
            let el = document.activeElement;
            while (el?.shadowRoot?.activeElement)
                el = el.shadowRoot.activeElement;
            if (el?.matches(":focus-visible"))
                this.setOpen(true);
        };
        this.onFocusOut = () => this.setOpen(false);
        this.onPress = () => this.setOpen(false);
        this.onKeydown = (e) => {
            if (e.key === "Escape" && this.open) {
                e.stopPropagation();
                this.setOpen(false);
            }
        };
        this.tracking = false;
        this.place = () => {
            const anchor = this.anchorEl;
            const bubble = this.bubbleEl;
            const pointer = this.pointerEl;
            if (!anchor || !bubble || !pointer)
                return;
            const a = anchor.getBoundingClientRect();
            const w = bubble.offsetWidth;
            const h = bubble.offsetHeight;
            const cs = getComputedStyle(bubble);
            // The gap is the pointer's depth (--space-2xs) plus the same again as
            // clearance — read at the bubble's place in the cascade, so a theme
            // scope that shrinks the token moves it.
            const depth = parseFloat(cs.getPropertyValue("--space-2xs"));
            const gap = 2 * (Number.isFinite(depth) ? depth : 4);
            const vw = document.documentElement.clientWidth;
            const vh = document.documentElement.clientHeight;
            const pad = COLLISION_PADDING;
            const fits = (s) => s === "top" ? a.top - gap - h >= pad
                : s === "bottom" ? a.bottom + gap + h <= vh - pad
                    : s === "left" ? a.left - gap - w >= pad
                        : a.right + gap + w <= vw - pad;
            const preferred = POINT_TO_SIDE[this.point] ?? "top";
            const side = fits(preferred) || !fits(OPPOSITE[preferred]) ? preferred : OPPOSITE[preferred];
            const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), Math.max(lo, hi));
            const box = pointer.offsetWidth;
            const inset = parseFloat(cs.borderTopLeftRadius) || 0;
            let x;
            let y;
            if (side === "top" || side === "bottom") {
                x = clamp(a.left + a.width / 2 - w / 2, pad, vw - w - pad);
                y = side === "top" ? a.top - gap - h : a.bottom + gap;
                pointer.style.left = `${clamp(a.left + a.width / 2 - x - box / 2, inset, w - box - inset)}px`;
                pointer.style.top = "";
            }
            else {
                y = clamp(a.top + a.height / 2 - h / 2, pad, vh - h - pad);
                x = side === "left" ? a.left - gap - w : a.right + gap;
                pointer.style.top = `${clamp(a.top + a.height / 2 - y - box / 2, inset, h - box - inset)}px`;
                pointer.style.left = "";
            }
            bubble.style.left = `${x}px`;
            bubble.style.top = `${y}px`;
            bubble.dataset.side = side;
            pointer.dataset.side = side;
        };
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.id)
            this.id = `zds-tooltip-${++uid}`;
        // A `for` target later in the document may not be parsed yet.
        queueMicrotask(() => this.bindAnchor());
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unbindAnchor();
        this.stopTracking();
        clearTimeout(this.timer);
        this.endClosing();
    }
    willUpdate(changed) {
        if (changed.has("anchor") || changed.has("htmlFor"))
            this.bindAnchor();
        else if (changed.has("noDescribe") && this.anchorEl) {
            this.unbindAnchor();
            this.bindAnchor();
        }
    }
    updated() {
        this.sync();
    }
    // ---- anchor wiring ----------------------------------------------------
    resolveAnchor() {
        if (this.anchor)
            return this.anchor;
        if (!this.htmlFor || !this.isConnected)
            return null;
        const root = this.getRootNode();
        return root.getElementById?.(this.htmlFor) ?? null;
    }
    bindAnchor() {
        const next = this.resolveAnchor();
        if (next === this.anchorEl)
            return;
        this.unbindAnchor();
        this.anchorEl = next;
        this.toggleAttribute("data-anchored", !!next);
        if (!next)
            return;
        next.addEventListener("pointerenter", this.onAnchorEnter);
        next.addEventListener("pointerleave", this.onLeave);
        next.addEventListener("focusin", this.onFocusIn);
        next.addEventListener("focusout", this.onFocusOut);
        next.addEventListener("pointerdown", this.onPress);
        if (this.noDescribe) {
            this.requestUpdate();
            return;
        }
        const ids = (next.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean);
        if (!ids.includes(this.id))
            next.setAttribute("aria-describedby", [...ids, this.id].join(" "));
        // An id reference cannot cross into the trigger's own shadow root, so a
        // custom-element trigger's inner control gets an element reference
        // instead (references may point outward to an ancestor tree).
        const inner = next.shadowRoot?.querySelector(FOCUSABLE);
        if (inner && "ariaDescribedByElements" in inner) {
            inner.ariaDescribedByElements = [this];
            this.describedEl = inner;
        }
        this.requestUpdate();
    }
    unbindAnchor() {
        const prev = this.anchorEl;
        if (!prev)
            return;
        prev.removeEventListener("pointerenter", this.onAnchorEnter);
        prev.removeEventListener("pointerleave", this.onLeave);
        prev.removeEventListener("focusin", this.onFocusIn);
        prev.removeEventListener("focusout", this.onFocusOut);
        prev.removeEventListener("pointerdown", this.onPress);
        const ids = (prev.getAttribute("aria-describedby") ?? "").split(/\s+/).filter((t) => t && t !== this.id);
        if (ids.length)
            prev.setAttribute("aria-describedby", ids.join(" "));
        else
            prev.removeAttribute("aria-describedby");
        if (this.describedEl)
            this.describedEl.ariaDescribedByElements = null;
        this.describedEl = null;
        this.anchorEl = null;
        this.removeAttribute("data-anchored");
        for (const el of [this.bubbleEl, this.pointerEl]) {
            if (!el)
                continue;
            el.style.left = el.style.top = "";
            delete el.dataset.side;
        }
        if (this.bubbleEl?.matches(":popover-open"))
            this.bubbleEl.hidePopover();
        this.stopTracking();
    }
    // ---- interaction ------------------------------------------------------
    setOpen(next) {
        clearTimeout(this.timer);
        if (next && this.canOpen && !this.canOpen())
            return;
        if (next === this.open)
            return;
        this.open = next;
        this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open: next }, bubbles: true, composed: true }));
    }
    schedule(next, ms) {
        clearTimeout(this.timer);
        if (ms <= 0)
            this.setOpen(next);
        else
            this.timer = setTimeout(() => this.setOpen(next), ms);
    }
    // ---- positioning ------------------------------------------------------
    sync() {
        const bubble = this.bubbleEl;
        if (!bubble || !this.anchorEl || !bubble.showPopover)
            return;
        const shown = bubble.matches(":popover-open");
        if (this.open && !shown) {
            this.endClosing();
            bubble.showPopover();
            this.startTracking();
        }
        else if (!this.open && shown) {
            // Keep the host rendered while the bubble fades out. Set before anything
            // reads style: a recalc with the host hidden would skip the fade.
            this.toggleAttribute("data-closing", true);
            bubble.hidePopover();
            this.stopTracking();
            const ms = motionMs(bubble); // 0 under reduced motion
            if (ms)
                this.closingTimer = setTimeout(() => this.endClosing(), ms);
            else
                this.endClosing();
        }
        if (this.open)
            this.place();
    }
    endClosing() {
        clearTimeout(this.closingTimer);
        this.closingTimer = undefined;
        this.removeAttribute("data-closing");
    }
    startTracking() {
        if (this.tracking)
            return;
        this.tracking = true;
        window.addEventListener("scroll", this.place, { capture: true, passive: true });
        window.addEventListener("resize", this.place, { passive: true });
        document.addEventListener("keydown", this.onKeydown, true);
    }
    stopTracking() {
        if (!this.tracking)
            return;
        this.tracking = false;
        window.removeEventListener("scroll", this.place, { capture: true });
        window.removeEventListener("resize", this.place);
        document.removeEventListener("keydown", this.onKeydown, true);
    }
    render() {
        const side = POINT_TO_SIDE[this.point] ?? "top";
        const anchored = !!this.anchorEl;
        return html `<div
      class="bubble"
      part="bubble"
      role="tooltip"
      popover=${anchored ? "manual" : nothing}
      data-side=${side}
      @pointerenter=${this.onBubbleEnter}
      @pointerleave=${this.onLeave}
    ><span class="pointer" part="pointer" data-side=${side} aria-hidden="true"></span><span class="label"><slot></slot></span></div>`;
    }
};
ZdsTooltip.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsTooltip.prototype, "point", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsTooltip.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsTooltip.prototype, "open", void 0);
__decorate([
    property({ type: String, attribute: "for" })
], ZdsTooltip.prototype, "htmlFor", void 0);
__decorate([
    property({ attribute: false })
], ZdsTooltip.prototype, "anchor", void 0);
__decorate([
    property({ type: Number })
], ZdsTooltip.prototype, "delay", void 0);
__decorate([
    property({ type: Number, attribute: "close-delay" })
], ZdsTooltip.prototype, "closeDelay", void 0);
__decorate([
    property({ type: Boolean, attribute: "no-describe" })
], ZdsTooltip.prototype, "noDescribe", void 0);
__decorate([
    property({ attribute: false })
], ZdsTooltip.prototype, "canOpen", void 0);
__decorate([
    query(".bubble")
], ZdsTooltip.prototype, "bubbleEl", void 0);
__decorate([
    query(".pointer")
], ZdsTooltip.prototype, "pointerEl", void 0);
ZdsTooltip = __decorate([
    customElement("zds-tooltip")
], ZdsTooltip);
export { ZdsTooltip };
