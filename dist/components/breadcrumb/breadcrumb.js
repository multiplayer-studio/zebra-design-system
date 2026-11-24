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
var _ZdsBreadcrumb_instances, _ZdsBreadcrumb_items_get, _ZdsBreadcrumb_rows_get, _ZdsBreadcrumb_sync, _ZdsBreadcrumb_activeRow_get, _ZdsBreadcrumb_focusRow, _ZdsBreadcrumb_focusTrigger, _ZdsBreadcrumb_onKeydown, _ZdsBreadcrumb_onOpenChange, _ZdsBreadcrumb_select, _ZdsBreadcrumb_label, _ZdsBreadcrumb_overflow;
import { LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./breadcrumb.styles.js";
import "./breadcrumb-item.js";
import "../dropdown/dropdown.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../menu-item/menu-item.js";
/**
 * Shows where a page sits in the hierarchy, as a trail of links ending on the
 * current page. `max-items` collapses the middle into a compact overflow menu,
 * so every crumb stays reachable. The last item is the current page.
 *
 * A labelled `nav` holding a list: the host of each `<zds-breadcrumb-item>` is
 * its list item, because slotted children cannot sit inside an `<ol>`.
 *
 * Departures from Figma, each a spec issue:
 * - The first item moves to the `leading` slot, so the overflow control can
 *   follow it. `collapsed` and `open` are derived, not properties.
 * - `overflow-label` names the overflow control, which Figma leaves unnamed.
 * - The menu has no portal or collision handling: it is `zds-dropdown`, which
 *   documents that scope itself. So `portalContainer` has no property here.
 *
 * @slot - The crumbs: `<zds-breadcrumb-item>` elements, root first.
 * @slot leading - Set by the element. It holds the first crumb.
 * @csspart nav - The navigation landmark.
 *
 * @spec specs/breadcrumb/breadcrumb.spec.json
 */
let ZdsBreadcrumb = class ZdsBreadcrumb extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsBreadcrumb_instances.add(this);
        /** How the current page stands out. `accent` sets it and its icon in blue. */
        this.flavour = "default";
        /** Corners of the overflow control and its menu. */
        this.shape = "rounded";
        /** How many crumbs show before the middle collapses: the first, then the rest from the end. Unset shows them all. The minimum is 2. */
        this.maxItems = null;
        /** Accessible name of the trail. */
        this.label = "Breadcrumb";
        /** Accessible name of the overflow control. */
        this.overflowLabel = "Show hidden pages";
        /** The items moved to the overflow menu. */
        this.hiddenItems = [];
        /** The overflow menu is showing. */
        this.open = false;
        _ZdsBreadcrumb_sync.set(this, () => {
            const items = __classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "a", _ZdsBreadcrumb_items_get);
            const kept = this.maxItems ? Math.max(this.maxItems, 2) : items.length;
            const hiddenCount = Math.max(items.length - kept, 0);
            items.forEach((item, index) => {
                item.slot = index === 0 ? "leading" : "";
                item.hidden = index >= 1 && index <= hiddenCount;
                item.current = index === items.length - 1;
                item.separator = index < items.length - 1;
                item.setAttribute("role", "listitem");
            });
            this.hiddenItems = items.slice(1, hiddenCount + 1);
        });
        /* zds-dropdown owns open, outside click and Escape. Moving through the rows is left to whoever fills it. */
        _ZdsBreadcrumb_onKeydown.set(this, (event) => {
            if (!this.open)
                return;
            const current = __classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "a", _ZdsBreadcrumb_activeRow_get);
            const moves = { ArrowDown: current + 1, ArrowUp: current - 1, Home: 0, End: -1 };
            if (!(event.key in moves))
                return;
            event.preventDefault();
            __classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "m", _ZdsBreadcrumb_focusRow).call(this, moves[event.key]);
        });
        _ZdsBreadcrumb_onOpenChange.set(this, async (event) => {
            const inMenu = __classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "a", _ZdsBreadcrumb_activeRow_get) >= 0;
            this.open = event.detail.open;
            if (!this.open) {
                if (inMenu)
                    __classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "m", _ZdsBreadcrumb_focusTrigger).call(this);
                return;
            }
            await Promise.all(__classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "a", _ZdsBreadcrumb_rows_get).map((row) => row.updateComplete));
            __classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "m", _ZdsBreadcrumb_focusRow).call(this, 0);
        });
    }
    willUpdate(changed) {
        if (changed.has("maxItems"))
            __classPrivateFieldGet(this, _ZdsBreadcrumb_sync, "f").call(this);
    }
    /* zds-icon-button forwards aria-expanded but has no way to say what it opens. */
    updated() {
        const button = this.renderRoot.querySelector("zds-icon-button");
        void button?.updateComplete.then(() => button.renderRoot.querySelector("button")?.setAttribute("aria-haspopup", "menu"));
    }
    render() {
        return html `<nav part="nav" aria-label=${this.label}>
      <div class="list" role="list">
        <slot name="leading" @slotchange=${__classPrivateFieldGet(this, _ZdsBreadcrumb_sync, "f")}></slot>
        ${__classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "m", _ZdsBreadcrumb_overflow).call(this)}
        <slot @slotchange=${__classPrivateFieldGet(this, _ZdsBreadcrumb_sync, "f")}></slot>
      </div>
    </nav>`;
    }
};
_ZdsBreadcrumb_sync = new WeakMap();
_ZdsBreadcrumb_onKeydown = new WeakMap();
_ZdsBreadcrumb_onOpenChange = new WeakMap();
_ZdsBreadcrumb_instances = new WeakSet();
_ZdsBreadcrumb_items_get = function _ZdsBreadcrumb_items_get() {
    return [...this.children].filter((child) => child.localName === "zds-breadcrumb-item");
};
_ZdsBreadcrumb_rows_get = function _ZdsBreadcrumb_rows_get() {
    return [...this.renderRoot.querySelectorAll("zds-menu-item")];
};
_ZdsBreadcrumb_activeRow_get = function _ZdsBreadcrumb_activeRow_get() {
    return __classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "a", _ZdsBreadcrumb_rows_get).indexOf(this.renderRoot.activeElement);
};
_ZdsBreadcrumb_focusRow = function _ZdsBreadcrumb_focusRow(index) {
    const rows = __classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "a", _ZdsBreadcrumb_rows_get);
    const row = rows[(index + rows.length) % rows.length];
    row?.renderRoot.querySelector("[tabindex]")?.focus();
};
_ZdsBreadcrumb_focusTrigger = function _ZdsBreadcrumb_focusTrigger() {
    this.renderRoot.querySelector("zds-icon-button")?.renderRoot.querySelector("button")?.focus();
};
_ZdsBreadcrumb_select = function _ZdsBreadcrumb_select(item) {
    if (this.dropdown)
        this.dropdown.open = false;
    item.activate();
};
_ZdsBreadcrumb_label = function _ZdsBreadcrumb_label(item) {
    return [...item.childNodes]
        .filter((node) => node.nodeType !== Node.COMMENT_NODE)
        .map((node) => node.textContent)
        .join("")
        .trim();
};
_ZdsBreadcrumb_overflow = function _ZdsBreadcrumb_overflow() {
    if (!this.hiddenItems.length)
        return nothing;
    const rounded = this.shape === "rounded";
    return html `<div class="overflow" role="listitem">
      <zds-dropdown compact .rounded=${rounded} @open-change=${__classPrivateFieldGet(this, _ZdsBreadcrumb_onOpenChange, "f")} @keydown=${__classPrivateFieldGet(this, _ZdsBreadcrumb_onKeydown, "f")}>
        <zds-icon-button slot="trigger" flavour="outline-subtle" size="small" shape=${this.shape} icon="more-horizontal" .label=${this.overflowLabel} .expanded=${this.open}></zds-icon-button>
        ${this.hiddenItems.map((item) => html `<zds-menu-item leading-icon=${item.icon ?? nothing} ?rounded=${rounded} @click=${() => __classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "m", _ZdsBreadcrumb_select).call(this, item)}>${__classPrivateFieldGet(this, _ZdsBreadcrumb_instances, "m", _ZdsBreadcrumb_label).call(this, item)}</zds-menu-item>`)}
      </zds-dropdown>
      <zds-icon class="separator" name="chevron-right" size="small"></zds-icon>
    </div>`;
};
ZdsBreadcrumb.styles = styles;
__decorate([
    property({ type: String, reflect: true })
], ZdsBreadcrumb.prototype, "flavour", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsBreadcrumb.prototype, "shape", void 0);
__decorate([
    property({ type: Number, attribute: "max-items" })
], ZdsBreadcrumb.prototype, "maxItems", void 0);
__decorate([
    property({ type: String })
], ZdsBreadcrumb.prototype, "label", void 0);
__decorate([
    property({ type: String, attribute: "overflow-label" })
], ZdsBreadcrumb.prototype, "overflowLabel", void 0);
__decorate([
    state()
], ZdsBreadcrumb.prototype, "hiddenItems", void 0);
__decorate([
    state()
], ZdsBreadcrumb.prototype, "open", void 0);
__decorate([
    query("zds-dropdown")
], ZdsBreadcrumb.prototype, "dropdown", void 0);
ZdsBreadcrumb = __decorate([
    customElement("zds-breadcrumb")
], ZdsBreadcrumb);
export { ZdsBreadcrumb };
