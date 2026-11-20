var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./navigation-rail.styles.js";
import "./navigation-rail-item.js";
import "../button/button.js";
import "../icon/icon.js";
const RAIL_PARTS = "zeta-navigation-rail-item, zeta-navigation-header, zeta-sub-menu-header, zeta-sub-menu-item, zeta-collapsible-menu-item";
const toLength = (v) => (v === undefined || v === "" ? null : /^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v));
/**
 * Navigation rails allow navigation between sections of an app: a narrow icon rail at the edge of a desktop view,
 * and a sub menu panel beside it for destinations with a second level.
 *
 * The rail is locked to dark mode whatever the page's mode; `inverse` locks it to light. It sets `expanded`,
 * `showLabel` and `rounded` on every rail part inside it. Widening and narrowing run on animations/smooth, never on
 * first render, and are off under reduced motion.
 *
 * @slot - The menu: `zeta-navigation-rail-item`s, optionally separated by a `zeta-divider`.
 * @slot header - A `zeta-navigation-header`.
 * @slot footer - Destinations pinned to the bottom, above the toggle item.
 * @slot sub-menu-header - A `zeta-sub-menu-header`. The panel shows when it or the sub-menu slot is filled.
 * @slot sub-menu - `zeta-sub-menu-item`s and `zeta-collapsible-menu-item`s.
 * @event expanded-change - Fired when the toggle item widens or narrows the rail; `detail.expanded` is the new state.
 * @event action - Fired when the header action is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54061
 * @storybook ?path=/docs/components-navigation-rail--docs
 */
let ZetaNavigationRail = class ZetaNavigationRail extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** The wide rail, with every item's label beside its glyph. The toggle item flips it. */
        this.expanded = false;
        /** Captions under each glyph in the narrow rail (spec: label). No effect when expanded. */
        this.showLabels = false;
        /** Shows the create or compose action under the header. Off by default, so existing rails keep their layout. */
        this.showHeaderAction = false;
        /** The header action's label: its text in the wide rail, its name in the narrow one, where only the glyph shows. */
        this.actionLabel = "Create";
        /** The header action's glyph. */
        this.actionIcon = "add_circle_outline";
        /** Shows the toggle item that widens and narrows the rail. Off by default, so existing rails keep their layout. */
        this.showToggleItem = false;
        /** The toggle item's label in the narrow rail. */
        this.expandLabel = "Open";
        /** The toggle item's label in the wide rail. */
        this.collapseLabel = "Close";
        /** Shows the rail in light mode instead of its locked dark mode. */
        this.inverse = false;
        /** Accessible name of the navigation landmark. */
        this.navLabel = "Main";
        this.hasHeader = false;
        this.hasFooter = false;
        this.hasPanel = { header: false, menu: false };
        this.ready = false;
        /** The form the parts are drawn in. It follows `expanded` at once when widening, but only once the rail has finished
            narrowing, so the shrinking width clips the wide layout instead of every part re-laying itself out mid-way. */
        this.wide = false;
        this.narrow = () => {
            clearTimeout(this.narrowTimer);
            if (!this.expanded)
                this.wide = false;
        };
        this.onTransitionEnd = (e) => {
            if (e.target === e.currentTarget && e.propertyName === "width")
                this.narrow();
        };
        this.onSlot = (e) => {
            const slot = e.target;
            const filled = slot.assignedElements().length > 0;
            if (slot.name === "header")
                this.hasHeader = filled;
            if (slot.name === "footer")
                this.hasFooter = filled;
            if (slot.name === "sub-menu-header")
                this.hasPanel = { ...this.hasPanel, header: filled };
            if (slot.name === "sub-menu")
                this.hasPanel = { ...this.hasPanel, menu: filled };
            this.syncParts();
        };
        this.toggle = () => {
            this.expanded = !this.expanded;
            this.dispatchEvent(new CustomEvent("expanded-change", { detail: { expanded: this.expanded }, bubbles: true, composed: true }));
        };
        this.onAction = () => this.dispatchEvent(new CustomEvent("action", { bubbles: true, composed: true }));
    }
    connectedCallback() {
        super.connectedCallback?.();
        requestAnimationFrame(() => (this.ready = true));
    }
    willUpdate(changed) {
        if (changed.has("expanded")) {
            clearTimeout(this.narrowTimer);
            if (this.expanded || !this.ready || !this.wide)
                this.wide = this.expanded;
            else
                this.narrowTimer = setTimeout(this.narrow, this.transitionMs() + 50);
        }
        if (changed.has("inverse"))
            this.setAttribute("data-theme", this.inverse ? "light" : "dark");
        const set = (name, v) => {
            const length = toLength(v);
            if (length)
                this.style.setProperty(name, length);
            else
                this.style.removeProperty(name);
        };
        if (changed.has("railWidth"))
            set("--navigation-rail-width", this.railWidth === "fill" ? undefined : this.railWidth);
        if (changed.has("railMaxWidth"))
            set("--navigation-rail-max-width", this.railMaxWidth);
        if (changed.has("subMenuMaxWidth"))
            set("--navigation-rail-sub-menu-max-width", this.subMenuMaxWidth);
    }
    disconnectedCallback() {
        super.disconnectedCallback?.();
        clearTimeout(this.narrowTimer);
    }
    /** The rail's width transition in ms; 0 under reduced motion. The timer is the fallback for a missed transitionend. */
    transitionMs() {
        const rail = this.shadowRoot?.querySelector(".rail");
        if (!rail)
            return 0;
        const s = getComputedStyle(rail);
        const ms = (v) => parseFloat(v) * (v.trim().endsWith("ms") ? 1 : 1000);
        return ms(s.transitionDuration) + ms(s.transitionDelay);
    }
    updated() {
        this.syncParts();
    }
    syncParts() {
        for (const el of this.querySelectorAll(RAIL_PARTS)) {
            if (el.closest("zeta-navigation-rail") !== this)
                continue;
            el.rounded = this.rounded;
            if (el.localName === "zeta-navigation-rail-item" || el.localName === "zeta-navigation-header")
                el.expanded = this.wide;
            if (el.localName === "zeta-navigation-rail-item")
                el.showLabel = this.showLabels;
        }
    }
    /* One Button in both forms: it is as wide as the rail's content and its label shrinks away, so the glyph sits centred
       in the narrow rail and the label is revealed, still centred, as the rail widens. The label stays its name. */
    renderAction() {
        return html `<zeta-button
      class="action"
      size="large"
      flavor="primary"
      shape=${this.rounded ? "rounded" : "sharp"}
      .leadingIcon=${this.actionIcon}
      @click=${this.onAction}
      >${this.actionLabel}</zeta-button
    >`;
    }
    render() {
        const showHeader = this.hasHeader || this.showHeaderAction;
        const showFooter = this.hasFooter || this.showToggleItem;
        return html `<nav class="root" aria-label=${this.navLabel} ?data-ready=${this.ready}>
      <div class=${this.wide ? "rail wide" : "rail"} @transitionend=${this.onTransitionEnd}>
        <div class="header" ?hidden=${!showHeader}>
          <slot name="header" @slotchange=${this.onSlot}></slot>
          ${this.showHeaderAction ? this.renderAction() : nothing}
        </div>
        <div class="menu"><slot id="content-slot" @slotchange=${this.onSlot}></slot></div>
        <div class="footer" ?hidden=${!showFooter}>
          <slot name="footer" @slotchange=${this.onSlot}></slot>
          ${this.showToggleItem
            ? html `<zeta-navigation-rail-item
                  class="toggle"
                  ?expanded=${this.wide}
                  ?show-label=${this.showLabels}
                  .rounded=${this.rounded}
                  .toggleExpanded=${this.expanded}
                  @click=${this.toggle}
                  ><zeta-icon slot="icon" .rounded=${this.rounded}>${this.expanded ? "left_panel_close" : "left_panel_open"}</zeta-icon>${this.expanded ? this.collapseLabel : this.expandLabel}</zeta-navigation-rail-item
                >`
            : nothing}
        </div>
      </div>
      <div class="panel" ?hidden=${!this.hasPanel.header && !this.hasPanel.menu}>
        <slot name="sub-menu-header" @slotchange=${this.onSlot}></slot>
        <div class="sub-menu" ?hidden=${!this.hasPanel.menu}><slot name="sub-menu" @slotchange=${this.onSlot}></slot></div>
      </div>
    </nav>`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationRail.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-labels" })
], ZetaNavigationRail.prototype, "showLabels", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-header-action" })
], ZetaNavigationRail.prototype, "showHeaderAction", void 0);
__decorate([
    property({ type: String, attribute: "action-label" })
], ZetaNavigationRail.prototype, "actionLabel", void 0);
__decorate([
    property({ type: String, attribute: "action-icon" })
], ZetaNavigationRail.prototype, "actionIcon", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-toggle-item" })
], ZetaNavigationRail.prototype, "showToggleItem", void 0);
__decorate([
    property({ type: String, attribute: "expand-label" })
], ZetaNavigationRail.prototype, "expandLabel", void 0);
__decorate([
    property({ type: String, attribute: "collapse-label" })
], ZetaNavigationRail.prototype, "collapseLabel", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationRail.prototype, "inverse", void 0);
__decorate([
    property({ attribute: "rail-width", reflect: true })
], ZetaNavigationRail.prototype, "railWidth", void 0);
__decorate([
    property({ attribute: "rail-max-width" })
], ZetaNavigationRail.prototype, "railMaxWidth", void 0);
__decorate([
    property({ attribute: "sub-menu-max-width" })
], ZetaNavigationRail.prototype, "subMenuMaxWidth", void 0);
__decorate([
    property({ type: String, attribute: "nav-label" })
], ZetaNavigationRail.prototype, "navLabel", void 0);
__decorate([
    state()
], ZetaNavigationRail.prototype, "hasHeader", void 0);
__decorate([
    state()
], ZetaNavigationRail.prototype, "hasFooter", void 0);
__decorate([
    state()
], ZetaNavigationRail.prototype, "hasPanel", void 0);
__decorate([
    state()
], ZetaNavigationRail.prototype, "ready", void 0);
__decorate([
    state()
], ZetaNavigationRail.prototype, "wide", void 0);
ZetaNavigationRail = __decorate([
    customElement("zeta-navigation-rail")
], ZetaNavigationRail);
export { ZetaNavigationRail };
//# sourceMappingURL=navigation-rail.js.map