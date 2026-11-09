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
var _ZdsNavigationRail_instances, _ZdsNavigationRail_latchTimer, _ZdsNavigationRail_readyFrame, _ZdsNavigationRail_action, _ZdsNavigationRail_armReady, _ZdsNavigationRail_syncMode, _ZdsNavigationRail_syncWidths, _ZdsNavigationRail_sync, _ZdsNavigationRail_onSlot, _ZdsNavigationRail_toggle, _ZdsNavigationRail_onAction;
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { railStyles } from "./navigation-rail.styles.js";
import "../button/button.js";
import "../icon-button/icon-button.js";
import "../navigation-rail-item/navigation-rail-item.js";
/** The parts the rail hands its state to. */
const RAIL_PARTS = "zds-navigation-rail-item, zds-navigation-header, zds-sub-menu-header, zds-sub-menu-item, zds-collapsible-menu-item";
/** The first duration in an element's computed `transition-duration`, in ms (0 under reduced motion or before the rail is ready). */
function motionMs(el) {
    if (!el)
        return 0;
    const d = getComputedStyle(el).transitionDuration.split(",")[0]?.trim() ?? "0s";
    const n = parseFloat(d);
    return Number.isFinite(n) ? (d.endsWith("ms") ? n : n * 1000) : 0;
}
const hasContent = (slot) => slot
    .assignedNodes({ flatten: true })
    .some((n) => n.nodeType === Node.ELEMENT_NODE || (n.textContent ?? "").trim() !== "");
/**
 * A vertical navigation column for the edge of a desktop view: a narrow icon
 * rail or a wide labelled one, and an optional sub menu panel beside it.
 *
 * Locked to dark mode by default, whatever the page's mode; `inverse` locks
 * it to light (owner decision). The host takes the token layer's `mode-dark`
 * / `mode-light` class (added with `classList`, so a consumer's own classes
 * stay), which re-resolves every token on the host; the shadow tree and the
 * slotted content inherit them from there, and an `.ext-*` ancestor still
 * applies. Nothing in the rail family leaves the tree, so popups stay in mode.
 *
 * Regions are slots; the rail sets `expanded` / `show-label` on the
 * zds-navigation-rail-item and zds-navigation-header elements inside it, and
 * `shape` on every rail part inside it (items, headers, sub menu rows and
 * groups). Slotted controls it did not render — a zds-sub-menu-header's
 * actions — read `el.closest("zds-navigation-rail")?.shape` to match, as
 * with zds-table. It
 * owns the toggle item and wires it to `expanded` (spec: "Behaviour code
 * must own"), firing `zds-expanded-change`.
 *
 * A plain `<nav>` of links, every destination in the Tab order; groups are
 * zds-collapsible-menu-item disclosures — the same structure as the React
 * build (which uses Base UI Collapsible, not NavigationMenu).
 *
 * Figma's Show Header (wired to nothing) is dropped — the header shows when
 * slotted. Its per-Label Menu Slots and orphan Menu Slot#3200:20 are one
 * default slot; moreRailItems / moreFooterItems / showHeaderAction /
 * showSubMenu become "is the slot filled".
 *
 * @slot - The menu: zds-navigation-rail-item (and zds-divider). Absorbs the free height.
 * @slot header - Top of the rail: normally a zds-navigation-header.
 * @slot footer - Destinations pinned to the bottom, above the toggle item.
 * @slot sub-menu-header - The panel's title bar: a zds-sub-menu-header.
 * @slot sub-menu - The panel's rows: zds-sub-menu-item and zds-collapsible-menu-item.
 *
 * @fires zds-expanded-change - The toggle item was pressed. `detail.expanded` is the new value (already applied).
 * @fires zds-action - The header action was pressed.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json
 */
let ZdsNavigationRail = class ZdsNavigationRail extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsNavigationRail_instances.add(this);
        /** The wide rail, labels beside glyphs. */
        this.expanded = false;
        /**
         * Captions under the glyphs in the narrow rail (Figma's `Label`). With
         * `expanded` the labels show beside the glyphs anyway, so the combination
         * Figma never built simply works.
         */
        this.showLabels = false;
        /** The last footer item, which moves between narrow and wide. */
        this.showToggleItem = true;
        /** Toggle label in the narrow rail. */
        this.expandLabel = "Open";
        /** Toggle label in the wide rail. */
        this.collapseLabel = "Close";
        /**
         * The corner shape of everything nested in the rail: slot items, groups,
         * the header action, and the buttons inside zds-navigation-header and
         * zds-sub-menu-header (including the back button). rounded = `radius/sm`,
         * sharp = `radius/none`. The rail itself has no corners and is unaffected.
         * Code-only — Figma has no counterpart.
         */
        this.shape = "rounded";
        /**
         * The rail is locked to dark mode (`mode-dark` on the host) whatever the
         * page's mode. `inverse` locks it to light (`mode-light`) instead. Either
         * way everything inside follows the rail, not the page. Code-only (owner
         * decision).
         */
        this.inverse = false;
        /**
         * The wide rail's width. 200px by default (Figma's measure); the project
         * sets its own as a CSS length or a number in px, or `fill` to take the
         * width of the rail's container. The narrow icon rail is unaffected.
         */
        this.railWidth = null;
        /**
         * Caps the wide rail's width; the narrow icon rail is unaffected. A CSS
         * length, or a number in px. Wide labels truncate.
         */
        this.railMaxWidth = null;
        /**
         * Caps the sub menu panel's width. The panel still hugs its list, up to
         * this width; longer rows truncate (full label in a tooltip after a 3s
         * hover). A cap below 240px also lowers the 240px minimum. A CSS length,
         * or a number in px.
         */
        this.subMenuMaxWidth = null;
        /** Accessible name of the `<nav>` landmark. */
        this.navLabel = "Main";
        /**
         * The header action's label — a create/compose entry point. Icon Button in
         * the narrow rail, Button in the wide one. Unset, there is no action.
         */
        this.actionLabel = null;
        /** The header action's glyph. */
        this.actionIcon = "add-circle-outline";
        this.hasHeader = false;
        this.hasFooter = false;
        this.hasSubMenuHeader = false;
        this.hasSubMenu = false;
        /**
         * Motion (owner decision: animations/smooth). The rail's width animates on
         * `[expanded]`; its content keeps the wide layout until a collapse has
         * finished (`wideLatch`), laid out at its final width and clipped by the
         * narrowing rail, so labels never reflow or wrap mid-animation. Expanding
         * switches the content at once and the widening rail reveals it.
         */
        this.wideLatch = false;
        /** Transitions only after the first paint, so nothing animates on mount. */
        this.ready = false;
        _ZdsNavigationRail_latchTimer.set(this, void 0);
        _ZdsNavigationRail_readyFrame.set(this, void 0);
        _ZdsNavigationRail_onSlot.set(this, (e) => {
            const slot = e.target;
            const filled = hasContent(slot);
            switch (slot.name) {
                case "header":
                    this.hasHeader = filled;
                    break;
                case "footer":
                    this.hasFooter = filled;
                    break;
                case "sub-menu-header":
                    this.hasSubMenuHeader = filled;
                    break;
                case "sub-menu":
                    this.hasSubMenu = filled;
                    break;
            }
            __classPrivateFieldGet(this, _ZdsNavigationRail_instances, "m", _ZdsNavigationRail_sync).call(this);
        });
        _ZdsNavigationRail_toggle.set(this, () => {
            this.expanded = !this.expanded;
            this.dispatchEvent(new CustomEvent("zds-expanded-change", { detail: { expanded: this.expanded }, bubbles: true, composed: true }));
        });
        _ZdsNavigationRail_onAction.set(this, () => {
            this.dispatchEvent(new CustomEvent("zds-action", { bubbles: true, composed: true }));
        });
    }
    /** The content's form: wide while expanded, and through a collapse. */
    get wide() {
        return this.expanded || this.wideLatch;
    }
    render() {
        const showHeader = this.hasHeader || !!this.actionLabel;
        const showFooter = this.hasFooter || this.showToggleItem;
        const showPanel = this.hasSubMenuHeader || this.hasSubMenu;
        return html `<nav part="nav" class="root" aria-label=${this.navLabel} data-wide=${this.wide ? "" : nothing} data-ready=${this.ready ? "" : nothing}>
      <div part="rail" class="rail">
        <div class="header" ?hidden=${!showHeader}>
          <slot name="header" @slotchange=${__classPrivateFieldGet(this, _ZdsNavigationRail_onSlot, "f")}></slot>
          ${this.actionLabel ? __classPrivateFieldGet(this, _ZdsNavigationRail_instances, "m", _ZdsNavigationRail_action).call(this) : nothing}
        </div>
        <div part="menu" class="menu"><slot @slotchange=${__classPrivateFieldGet(this, _ZdsNavigationRail_onSlot, "f")}></slot></div>
        <div part="footer" class="footer" ?hidden=${!showFooter}>
          <slot name="footer" @slotchange=${__classPrivateFieldGet(this, _ZdsNavigationRail_onSlot, "f")}></slot>
          ${this.showToggleItem
            ? html `<zds-navigation-rail-item
                class="toggle"
                icon=${this.expanded ? "left-panel-close" : "left-panel-open"}
                label=${this.expanded ? this.collapseLabel : this.expandLabel}
                ?expanded=${this.wide}
                ?show-label=${this.showLabels}
                shape=${this.shape}
                .toggleExpanded=${this.expanded}
                @click=${__classPrivateFieldGet(this, _ZdsNavigationRail_toggle, "f")}
              ></zds-navigation-rail-item>`
            : nothing}
        </div>
      </div>
      <!-- Always rendered so it can animate open and closed (width, on
           [data-open]); closed it is zero-width and visibility: hidden. -->
      <div part="panel" class="panel" data-open=${showPanel ? "" : nothing}>
        <slot name="sub-menu-header" @slotchange=${__classPrivateFieldGet(this, _ZdsNavigationRail_onSlot, "f")}></slot>
        <div class="sub-menu" ?hidden=${!this.hasSubMenu}><slot name="sub-menu" @slotchange=${__classPrivateFieldGet(this, _ZdsNavigationRail_onSlot, "f")}></slot></div>
      </div>
    </nav>`;
    }
    connectedCallback() {
        super.connectedCallback();
        __classPrivateFieldGet(this, _ZdsNavigationRail_instances, "m", _ZdsNavigationRail_syncMode).call(this);
        if (this.hasUpdated)
            __classPrivateFieldGet(this, _ZdsNavigationRail_instances, "m", _ZdsNavigationRail_armReady).call(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (__classPrivateFieldGet(this, _ZdsNavigationRail_readyFrame, "f") !== undefined)
            cancelAnimationFrame(__classPrivateFieldGet(this, _ZdsNavigationRail_readyFrame, "f"));
        clearTimeout(__classPrivateFieldGet(this, _ZdsNavigationRail_latchTimer, "f"));
        __classPrivateFieldSet(this, _ZdsNavigationRail_readyFrame, undefined, "f");
        this.ready = false;
        this.wideLatch = this.expanded;
    }
    firstUpdated() {
        __classPrivateFieldGet(this, _ZdsNavigationRail_instances, "m", _ZdsNavigationRail_armReady).call(this);
    }
    willUpdate(changed) {
        // Every update, not only when `inverse` changes: a framework that rewrites
        // the host's class attribute would otherwise drop the mode class.
        __classPrivateFieldGet(this, _ZdsNavigationRail_instances, "m", _ZdsNavigationRail_syncMode).call(this);
        if (changed.has("railWidth") || changed.has("railMaxWidth") || changed.has("subMenuMaxWidth"))
            __classPrivateFieldGet(this, _ZdsNavigationRail_instances, "m", _ZdsNavigationRail_syncWidths).call(this);
        if (changed.has("expanded")) {
            clearTimeout(__classPrivateFieldGet(this, _ZdsNavigationRail_latchTimer, "f"));
            const ms = this.expanded || !this.hasUpdated ? 0 : motionMs(this.renderRoot.querySelector(".rail"));
            if (this.expanded || !ms)
                this.wideLatch = this.expanded;
            else
                __classPrivateFieldSet(this, _ZdsNavigationRail_latchTimer, setTimeout(() => (this.wideLatch = false), ms), "f");
        }
    }
    updated() {
        __classPrivateFieldGet(this, _ZdsNavigationRail_instances, "m", _ZdsNavigationRail_sync).call(this);
    }
};
_ZdsNavigationRail_latchTimer = new WeakMap();
_ZdsNavigationRail_readyFrame = new WeakMap();
_ZdsNavigationRail_onSlot = new WeakMap();
_ZdsNavigationRail_toggle = new WeakMap();
_ZdsNavigationRail_onAction = new WeakMap();
_ZdsNavigationRail_instances = new WeakSet();
_ZdsNavigationRail_action = function _ZdsNavigationRail_action() {
    // Size=large, Flavour=primary in both forms (spec). Figma pins
    // Shape=rounded; the rail's shape now sets it (owner decision: every
    // nested component follows the rail).
    return this.wide
        ? html `<zds-button class="action" size="large" shape=${this.shape} flavour="primary" leading-icon=${this.actionIcon} @click=${__classPrivateFieldGet(this, _ZdsNavigationRail_onAction, "f")}>${this.actionLabel}</zds-button>`
        : html `<zds-icon-button class="action" size="large" shape=${this.shape} flavour="primary" icon=${this.actionIcon} label=${this.actionLabel ?? ""} @click=${__classPrivateFieldGet(this, _ZdsNavigationRail_onAction, "f")}></zds-icon-button>`;
};
_ZdsNavigationRail_armReady = function _ZdsNavigationRail_armReady() {
    __classPrivateFieldSet(this, _ZdsNavigationRail_readyFrame, requestAnimationFrame(() => {
        __classPrivateFieldSet(this, _ZdsNavigationRail_readyFrame, undefined, "f");
        this.ready = true;
    }), "f");
};
_ZdsNavigationRail_syncMode = function _ZdsNavigationRail_syncMode() {
    this.classList.toggle("mode-dark", !this.inverse);
    this.classList.toggle("mode-light", this.inverse);
};
_ZdsNavigationRail_syncWidths = function _ZdsNavigationRail_syncWidths() {
    // A bare number — `180` or the attribute string "180" — is px.
    const set = (name, v) => v === null || v === "" ? this.style.removeProperty(name) : this.style.setProperty(name, /^\d+(\.\d+)?$/.test(String(v)) ? `${v}px` : String(v));
    set("--zds-navigation-rail-width", this.railWidth === "fill" ? null : this.railWidth);
    set("--zds-navigation-rail-max-width", this.railMaxWidth);
    set("--zds-navigation-rail-sub-menu-max-width", this.subMenuMaxWidth);
};
_ZdsNavigationRail_sync = function _ZdsNavigationRail_sync() {
    for (const el of this.querySelectorAll(RAIL_PARTS)) {
        if (el.closest("zds-navigation-rail") !== this)
            continue;
        el.shape = this.shape;
        if (el.localName === "zds-navigation-rail-item" || el.localName === "zds-navigation-header") {
            el.expanded = this.wide;
        }
        if (el.localName === "zds-navigation-rail-item")
            el.showLabel = this.showLabels;
    }
};
ZdsNavigationRail.styles = railStyles;
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNavigationRail.prototype, "expanded", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-labels" })
], ZdsNavigationRail.prototype, "showLabels", void 0);
__decorate([
    property({ type: Boolean, reflect: true, attribute: "show-toggle-item" })
], ZdsNavigationRail.prototype, "showToggleItem", void 0);
__decorate([
    property({ type: String, attribute: "expand-label" })
], ZdsNavigationRail.prototype, "expandLabel", void 0);
__decorate([
    property({ type: String, attribute: "collapse-label" })
], ZdsNavigationRail.prototype, "collapseLabel", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsNavigationRail.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNavigationRail.prototype, "inverse", void 0);
__decorate([
    property({ attribute: "rail-width", reflect: true })
], ZdsNavigationRail.prototype, "railWidth", void 0);
__decorate([
    property({ attribute: "rail-max-width" })
], ZdsNavigationRail.prototype, "railMaxWidth", void 0);
__decorate([
    property({ attribute: "sub-menu-max-width" })
], ZdsNavigationRail.prototype, "subMenuMaxWidth", void 0);
__decorate([
    property({ type: String, attribute: "nav-label" })
], ZdsNavigationRail.prototype, "navLabel", void 0);
__decorate([
    property({ type: String, attribute: "action-label" })
], ZdsNavigationRail.prototype, "actionLabel", void 0);
__decorate([
    property({ type: String, attribute: "action-icon" })
], ZdsNavigationRail.prototype, "actionIcon", void 0);
__decorate([
    state()
], ZdsNavigationRail.prototype, "hasHeader", void 0);
__decorate([
    state()
], ZdsNavigationRail.prototype, "hasFooter", void 0);
__decorate([
    state()
], ZdsNavigationRail.prototype, "hasSubMenuHeader", void 0);
__decorate([
    state()
], ZdsNavigationRail.prototype, "hasSubMenu", void 0);
__decorate([
    state()
], ZdsNavigationRail.prototype, "wideLatch", void 0);
__decorate([
    state()
], ZdsNavigationRail.prototype, "ready", void 0);
ZdsNavigationRail = __decorate([
    customElement("zds-navigation-rail")
], ZdsNavigationRail);
export { ZdsNavigationRail };
