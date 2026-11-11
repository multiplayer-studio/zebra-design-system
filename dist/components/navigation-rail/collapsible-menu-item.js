var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ZdsCollapsibleMenuItem_instances, _ZdsCollapsibleMenuItem_motionTimer, _ZdsCollapsibleMenuItem_settle, _ZdsCollapsibleMenuItem_animatePanel, _ZdsCollapsibleMenuItem_nest, _ZdsCollapsibleMenuItem_nestRows, _ZdsCollapsibleMenuItem_toggle;
import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { collapsibleStyles } from "./navigation-rail.styles.js";
import { subMenuRowContent, truncatedLabelTooltip } from "../sub-menu-item/sub-menu-item.js";
/** The first duration in an element's computed `transition-duration`, in ms (0 under reduced motion). */
function motionMs(el) {
    const d = getComputedStyle(el).transitionDuration.split(",")[0]?.trim() ?? "0s";
    const n = parseFloat(d);
    return Number.isFinite(n) ? (d.endsWith("ms") ? n : n * 1000) : 0;
}
/**
 * A Sub Menu Item that opens a group of nested rows beneath it.
 *
 * The header is a `<button>` with `aria-expanded` / `aria-controls`; the
 * rows sit in a `role="region"` named by it, `hidden` while closed — the
 * semantics React gets from Base UI's Collapsible. The header is a sub menu
 * row with its caret turned vertical (`expand-more`, rotated 180° when open —
 * one glyph, owner decision). Open, the header takes the ghost pressed fill
 * as Figma draws (State=active), the token alone (spec warn "Double alpha"),
 * and the rows sit on surface/subtle. The group sets `nested` and its `shape`
 * on its rows. Opening and closing animate the rows' height on
 * animations/smooth (owner decision), with the same state attributes Base
 * UI's Collapsible gives the React build; not on first render, and not
 * under prefers-reduced-motion.
 *
 * @slot - zds-sub-menu-item rows.
 * @fires zds-open-change - The header was pressed. `detail.open` is the new value (already applied).
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Collapsible Menu Item)
 */
let ZdsCollapsibleMenuItem = class ZdsCollapsibleMenuItem extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsCollapsibleMenuItem_instances.add(this);
        /** The group's name, on its header row. */
        this.label = "Label";
        /** Header glyph. Figma ships a `verified` placeholder. */
        this.icon = "verified";
        /** Shows the header glyph. */
        this.showLeadingIcon = true;
        /** Counter badge on the header row, as on zds-sub-menu-item. */
        this.badge = null;
        /** Text equivalent of the badge. */
        this.badgeLabel = null;
        /** Whether the group is open. */
        this.open = false;
        /**
         * Corner shape of the group and its rows: rounded (`radius/sm`) or sharp
         * (`radius/none`). Inside a zds-navigation-rail the rail's `shape` sets it.
         */
        this.shape = "rounded";
        /** The header cannot be pressed. */
        this.disabled = false;
        _ZdsCollapsibleMenuItem_motionTimer.set(this, void 0);
        _ZdsCollapsibleMenuItem_nest.set(this, () => __classPrivateFieldGet(this, _ZdsCollapsibleMenuItem_instances, "m", _ZdsCollapsibleMenuItem_nestRows).call(this));
        _ZdsCollapsibleMenuItem_toggle.set(this, () => {
            if (this.disabled)
                return;
            this.open = !this.open;
            this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open: this.open }, bubbles: true, composed: true }));
        });
    }
    render() {
        return html `
      <button
        part="header"
        id="header"
        type="button"
        class="row header"
        aria-expanded=${String(this.open)}
        aria-controls="panel"
        ?disabled=${this.disabled}
        data-disabled=${this.disabled ? "" : nothing}
        data-shape=${this.shape}
        @click=${__classPrivateFieldGet(this, _ZdsCollapsibleMenuItem_toggle, "f")}
      >
        ${subMenuRowContent({
            label: this.label,
            icon: this.icon,
            showLeadingIcon: this.showLeadingIcon,
            badge: this.badge,
            badgeLabel: this.badgeLabel,
            caret: "vertical",
            open: this.open,
        })}
      </button>
      <!-- A truncated header label shows in full after a 3s hover, as on the rows. -->
      ${truncatedLabelTooltip({ anchorId: "header", label: this.label, shape: this.shape, root: this.renderRoot })}
      <div part="panel" id="panel" class="panel" role="region" aria-labelledby="header">
        <div class="children"><slot @slotchange=${__classPrivateFieldGet(this, _ZdsCollapsibleMenuItem_nest, "f")}></slot></div>
      </div>
    `;
    }
    get panel() {
        return this.renderRoot.querySelector(".panel");
    }
    firstUpdated() {
        // `hidden` is managed here, not bound in the template, so a close can
        // hold the rows visible until its transition ends.
        this.panel.hidden = !this.open;
    }
    updated(changed) {
        if (changed.has("shape"))
            __classPrivateFieldGet(this, _ZdsCollapsibleMenuItem_instances, "m", _ZdsCollapsibleMenuItem_nestRows).call(this);
        // A real change only (the previous value is a boolean): no motion on first render.
        if (changed.has("open") && typeof changed.get("open") === "boolean")
            __classPrivateFieldGet(this, _ZdsCollapsibleMenuItem_instances, "m", _ZdsCollapsibleMenuItem_animatePanel).call(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        clearTimeout(__classPrivateFieldGet(this, _ZdsCollapsibleMenuItem_motionTimer, "f"));
        if (this.hasUpdated)
            __classPrivateFieldGet(this, _ZdsCollapsibleMenuItem_instances, "m", _ZdsCollapsibleMenuItem_settle).call(this);
    }
};
_ZdsCollapsibleMenuItem_motionTimer = new WeakMap();
_ZdsCollapsibleMenuItem_nest = new WeakMap();
_ZdsCollapsibleMenuItem_toggle = new WeakMap();
_ZdsCollapsibleMenuItem_instances = new WeakSet();
_ZdsCollapsibleMenuItem_settle = function _ZdsCollapsibleMenuItem_settle() {
    const panel = this.panel;
    panel.removeAttribute("data-starting-style");
    panel.removeAttribute("data-ending-style");
    panel.style.setProperty("--collapsible-panel-height", "auto");
    panel.hidden = !this.open;
};
_ZdsCollapsibleMenuItem_animatePanel = function _ZdsCollapsibleMenuItem_animatePanel() {
    const panel = this.panel;
    clearTimeout(__classPrivateFieldGet(this, _ZdsCollapsibleMenuItem_motionTimer, "f"));
    const ms = motionMs(panel);
    if (!ms)
        return __classPrivateFieldGet(this, _ZdsCollapsibleMenuItem_instances, "m", _ZdsCollapsibleMenuItem_settle).call(this);
    if (this.open) {
        panel.removeAttribute("data-ending-style");
        panel.hidden = false;
        panel.setAttribute("data-starting-style", "");
        panel.style.setProperty("--collapsible-panel-height", `${panel.scrollHeight}px`);
        void panel.offsetHeight; // commit the starting frame
        panel.removeAttribute("data-starting-style");
    }
    else {
        panel.style.setProperty("--collapsible-panel-height", `${panel.scrollHeight}px`);
        void panel.offsetHeight; // commit the measured height
        panel.setAttribute("data-ending-style", "");
    }
    __classPrivateFieldSet(this, _ZdsCollapsibleMenuItem_motionTimer, setTimeout(() => __classPrivateFieldGet(this, _ZdsCollapsibleMenuItem_instances, "m", _ZdsCollapsibleMenuItem_settle).call(this), ms), "f");
};
_ZdsCollapsibleMenuItem_nestRows = function _ZdsCollapsibleMenuItem_nestRows() {
    const slot = this.renderRoot.querySelector("slot");
    for (const el of slot?.assignedElements() ?? []) {
        if (el.localName !== "zds-sub-menu-item")
            continue;
        el.nested = true;
        el.shape = this.shape;
    }
};
ZdsCollapsibleMenuItem.styles = collapsibleStyles;
ZdsCollapsibleMenuItem.shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };
__decorate([
    property({ type: String })
], ZdsCollapsibleMenuItem.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZdsCollapsibleMenuItem.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-leading-icon" })
], ZdsCollapsibleMenuItem.prototype, "showLeadingIcon", void 0);
__decorate([
    property({
        converter: { fromAttribute: (v) => (v === null || v === "" ? null : v) },
    })
], ZdsCollapsibleMenuItem.prototype, "badge", void 0);
__decorate([
    property({ type: String, attribute: "badge-label" })
], ZdsCollapsibleMenuItem.prototype, "badgeLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsCollapsibleMenuItem.prototype, "open", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsCollapsibleMenuItem.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsCollapsibleMenuItem.prototype, "disabled", void 0);
ZdsCollapsibleMenuItem = __decorate([
    customElement("zds-collapsible-menu-item")
], ZdsCollapsibleMenuItem);
export { ZdsCollapsibleMenuItem };
