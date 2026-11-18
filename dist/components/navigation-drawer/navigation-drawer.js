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
var _ZdsNavigationDrawer_instances, _ZdsNavigationDrawer_setOpen, _ZdsNavigationDrawer_sync, _ZdsNavigationDrawer_syncDialog, _ZdsNavigationDrawer_onKeydown, _ZdsNavigationDrawer_onCancel, _ZdsNavigationDrawer_onDialogClick, _ZdsNavigationDrawer_onHeaderAction, _ZdsNavigationDrawer_onHeaderSlot, _ZdsNavigationDrawer_onAction;
import { LitElement, html, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./navigation-drawer.styles.js";
import "../button/button.js";
import "../scrim/scrim.js";
import { raiseScrim, lowerScrim } from "../scrim/scrim.js";
import { lockScroll, unlockScroll, deepActiveElement, firstFocusable } from "../dialog/dialog.js";
import { defaultTrue } from "../chip/chip.js";
const PARTS = "zds-sub-menu-item, zds-collapsible-menu-item, zds-navigation-header";
/** Rows that navigate. A group header (zds-collapsible-menu-item) never does. */
const DESTINATIONS = new Set(["zds-sub-menu-item", "zds-navigation-rail-item", "a"]);
/**
 * The app's destinations in a tall panel at the edge of the screen, opened
 * from a menu button.
 *
 * Built from the Navigation Rail family, with no new parts: a
 * `zds-navigation-header` in the `header` slot, then `zds-sub-menu-item`
 * rows, `zds-collapsible-menu-item` groups and `zds-divider` in the menu and
 * footer. The drawer hands them its `shape` and the header its wide form.
 * It follows the page's colour mode (unlike the rail, it is not locked).
 *
 * `modal` (default): a native `<dialog>` at the screen's edge over a
 * `<zds-scrim>` (tone scrim). Focus moves in and returns, page scroll is
 * locked, and Escape, a scrim click, the header's close button or a chosen
 * destination closes it. It slides in from its edge (animations/smooth;
 * none under reduced motion).
 * `modal="false"`: a standard drawer in the layout. Closed, it narrows to
 * nothing and is inert.
 *
 * Scrolling: only the header is frozen (sticky). The menu never scrolls on
 * its own and the footer is never pinned. The standard drawer grows with its
 * content and the page scrolls it; the modal drawer scrolls as one surface
 * with no scrollbar.
 *
 * With `show-close` (default) the header's icon button is the close button:
 * the drawer sets its glyph to `close` and its label to `close-label`.
 *
 * @slot header - A `zds-navigation-header`. Sticky.
 * @slot - The menu: `zds-sub-menu-item`, `zds-collapsible-menu-item`, `zds-divider`.
 * @slot footer - More rows after the menu (settings, help). Not pinned.
 * @csspart panel - The drawer surface.
 * @fires zds-open-change - `{ open, reason }` when the drawer closes itself. Not fired for a programmatic `open` change.
 * @fires zds-action - The header action button was pressed.
 * @cssprop --zds-navigation-drawer-width - The drawer's width; 320px by default (no width token exists).
 *
 * @spec specs/navigation-drawer/navigation-drawer.spec.json
 */
let ZdsNavigationDrawer = class ZdsNavigationDrawer extends LitElement {
    constructor() {
        super(...arguments);
        _ZdsNavigationDrawer_instances.add(this);
        /** Slides over the page on a Scrim. `modal="false"` sits in the layout and pushes the content. */
        this.modal = true;
        /** Whether the drawer is shown. Reflected. */
        this.open = false;
        /** The edge it comes from. Code only. */
        this.side = "start";
        /** Corner shape of the rows, groups and buttons inside. The drawer itself is never rounded. Code only. */
        this.shape = "rounded";
        /** Escape and a scrim click close a modal drawer. Code only. */
        this.dismissible = true;
        /** Choosing a destination closes a modal drawer. Opening a group never does. Code only. */
        this.closeOnNavigate = true;
        /** The header's icon button becomes the close button (Figma's Show Icon Button on the exposed header). */
        this.showClose = true;
        /** Accessible name of the close button. */
        this.closeLabel = "Close navigation";
        /** Accessible name of the `<nav>` landmark, and of the modal drawer. */
        this.navLabel = "Main";
        /** A full-width primary Button under the header (Figma's Show Action). Unset, there is none. */
        this.actionLabel = null;
        /** The action's glyph. */
        this.actionIcon = "add-circle-outline";
        /** Whether the header region has anything in it; empty, it only keeps the top padding. */
        this.hasHeader = false;
        this.returnFocus = null;
        this.locked = false;
        _ZdsNavigationDrawer_onKeydown.set(this, (e) => {
            if (e.key !== "Escape")
                return;
            e.preventDefault();
            e.stopPropagation();
            if (this.dismissible)
                __classPrivateFieldGet(this, _ZdsNavigationDrawer_instances, "m", _ZdsNavigationDrawer_setOpen).call(this, false, "escape");
        });
        _ZdsNavigationDrawer_onCancel.set(this, (e) => {
            e.preventDefault();
            if (this.dismissible)
                __classPrivateFieldGet(this, _ZdsNavigationDrawer_instances, "m", _ZdsNavigationDrawer_setOpen).call(this, false, "escape");
        });
        // The ::backdrop hit-tests as the <dialog>; a click outside the drawer's
        // box is a click on the scrim.
        _ZdsNavigationDrawer_onDialogClick.set(this, (e) => {
            const dlg = this.dialogEl;
            if (dlg && e.target === dlg) {
                const r = dlg.getBoundingClientRect();
                const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
                if (!inside) {
                    if (this.dismissible)
                        __classPrivateFieldGet(this, _ZdsNavigationDrawer_instances, "m", _ZdsNavigationDrawer_setOpen).call(this, false, "backdrop");
                    return;
                }
            }
            if (!this.closeOnNavigate)
                return;
            for (const n of e.composedPath()) {
                if (n === this)
                    return;
                if (!(n instanceof HTMLElement))
                    continue;
                // The header (close button handled by zds-action), the action and group headers never navigate.
                if (n.localName === "zds-navigation-header" || n.localName === "zds-collapsible-menu-item" || n.classList.contains("action"))
                    return;
                if (DESTINATIONS.has(n.localName) && (n.localName !== "a" || n.hasAttribute("href"))) {
                    if (n.hasAttribute("disabled") || n.getAttribute("aria-disabled") === "true")
                        return;
                    __classPrivateFieldGet(this, _ZdsNavigationDrawer_instances, "m", _ZdsNavigationDrawer_setOpen).call(this, false, "navigate");
                    return;
                }
            }
        });
        // zds-navigation-header fires zds-action from its icon button: with show-close, that is the close.
        _ZdsNavigationDrawer_onHeaderAction.set(this, (e) => {
            if (!this.showClose)
                return;
            e.stopPropagation();
            __classPrivateFieldGet(this, _ZdsNavigationDrawer_instances, "m", _ZdsNavigationDrawer_setOpen).call(this, false, "close");
        });
        _ZdsNavigationDrawer_onHeaderSlot.set(this, (e) => {
            this.hasHeader = e.target.assignedElements({ flatten: true }).length > 0;
            __classPrivateFieldGet(this, _ZdsNavigationDrawer_instances, "m", _ZdsNavigationDrawer_sync).call(this);
        });
        _ZdsNavigationDrawer_onAction.set(this, () => {
            this.dispatchEvent(new CustomEvent("zds-action", { bubbles: true, composed: true }));
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.locked) {
            unlockScroll();
            this.locked = false;
        }
    }
    /** Opens the drawer (same as `open = true`). */
    show() { this.open = true; }
    /** Closes the drawer (same as `open = false`). */
    close() { this.open = false; }
    updated(changed) {
        __classPrivateFieldGet(this, _ZdsNavigationDrawer_instances, "m", _ZdsNavigationDrawer_sync).call(this);
        if (changed.has("open") || changed.has("modal"))
            __classPrivateFieldGet(this, _ZdsNavigationDrawer_instances, "m", _ZdsNavigationDrawer_syncDialog).call(this);
    }
    render() {
        const panel = html `<nav part="panel" class="panel" aria-label=${this.navLabel}>
      <div class="header" ?data-empty=${!this.hasHeader && !this.actionLabel}>
        <slot name="header" @slotchange=${__classPrivateFieldGet(this, _ZdsNavigationDrawer_onHeaderSlot, "f")} @zds-action=${__classPrivateFieldGet(this, _ZdsNavigationDrawer_onHeaderAction, "f")}></slot>
        ${this.actionLabel
            ? html `<zds-button class="action" size="large" shape=${this.shape} flavour="primary" leading-icon=${this.actionIcon} @click=${__classPrivateFieldGet(this, _ZdsNavigationDrawer_onAction, "f")}>${this.actionLabel}</zds-button>`
            : nothing}
      </div>
      <div class="menu"><slot @slotchange=${() => __classPrivateFieldGet(this, _ZdsNavigationDrawer_instances, "m", _ZdsNavigationDrawer_sync).call(this)}></slot></div>
      <div class="footer"><slot name="footer" @slotchange=${() => __classPrivateFieldGet(this, _ZdsNavigationDrawer_instances, "m", _ZdsNavigationDrawer_sync).call(this)}></slot></div>
    </nav>`;
        if (!this.modal) {
            return html `<div class="standard" ?inert=${!this.open}>${panel}</div>`;
        }
        return html `<zds-scrim popover="manual" tone="scrim"></zds-scrim><dialog class="drawer" aria-label=${this.navLabel}
      @keydown=${__classPrivateFieldGet(this, _ZdsNavigationDrawer_onKeydown, "f")} @cancel=${__classPrivateFieldGet(this, _ZdsNavigationDrawer_onCancel, "f")} @click=${__classPrivateFieldGet(this, _ZdsNavigationDrawer_onDialogClick, "f")}>${panel}</dialog>`;
    }
};
_ZdsNavigationDrawer_onKeydown = new WeakMap();
_ZdsNavigationDrawer_onCancel = new WeakMap();
_ZdsNavigationDrawer_onDialogClick = new WeakMap();
_ZdsNavigationDrawer_onHeaderAction = new WeakMap();
_ZdsNavigationDrawer_onHeaderSlot = new WeakMap();
_ZdsNavigationDrawer_onAction = new WeakMap();
_ZdsNavigationDrawer_instances = new WeakSet();
_ZdsNavigationDrawer_setOpen = function _ZdsNavigationDrawer_setOpen(open, reason) {
    if (this.open === open)
        return;
    this.open = open;
    this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open, reason }, bubbles: true, composed: true }));
};
_ZdsNavigationDrawer_sync = function _ZdsNavigationDrawer_sync() {
    for (const el of this.querySelectorAll(PARTS)) {
        if (el.closest("zds-navigation-drawer") !== this)
            continue;
        el.shape = this.shape;
        if (el.localName === "zds-navigation-header") {
            const h = el;
            h.expanded = true;
            if (this.showClose) {
                h.showIconButton = true;
                h.actionIcon = "close";
                h.actionLabel = this.closeLabel;
            }
        }
    }
};
_ZdsNavigationDrawer_syncDialog = function _ZdsNavigationDrawer_syncDialog() {
    const dlg = this.dialogEl;
    if (!this.modal || !dlg) {
        if (this.locked) {
            unlockScroll();
            this.locked = false;
        }
        return;
    }
    if (this.open && !dlg.open) {
        this.returnFocus = deepActiveElement();
        raiseScrim(this.scrimEl);
        dlg.showModal();
        if (!this.locked) {
            lockScroll();
            this.locked = true;
        }
        (firstFocusable(dlg.childNodes) ?? dlg).focus();
    }
    else if (!this.open && dlg.open) {
        lowerScrim(this.scrimEl);
        dlg.close();
        if (this.locked) {
            unlockScroll();
            this.locked = false;
        }
        const back = this.returnFocus;
        this.returnFocus = null;
        if (back?.isConnected)
            back.focus();
    }
};
ZdsNavigationDrawer.styles = styles;
__decorate([
    property({ type: Boolean, reflect: true, converter: defaultTrue })
], ZdsNavigationDrawer.prototype, "modal", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZdsNavigationDrawer.prototype, "open", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsNavigationDrawer.prototype, "side", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZdsNavigationDrawer.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true, converter: defaultTrue })
], ZdsNavigationDrawer.prototype, "dismissible", void 0);
__decorate([
    property({ type: Boolean, attribute: "close-on-navigate", converter: defaultTrue })
], ZdsNavigationDrawer.prototype, "closeOnNavigate", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-close", converter: defaultTrue })
], ZdsNavigationDrawer.prototype, "showClose", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZdsNavigationDrawer.prototype, "closeLabel", void 0);
__decorate([
    property({ type: String, attribute: "nav-label" })
], ZdsNavigationDrawer.prototype, "navLabel", void 0);
__decorate([
    property({ type: String, attribute: "action-label" })
], ZdsNavigationDrawer.prototype, "actionLabel", void 0);
__decorate([
    property({ type: String, attribute: "action-icon" })
], ZdsNavigationDrawer.prototype, "actionIcon", void 0);
__decorate([
    state()
], ZdsNavigationDrawer.prototype, "hasHeader", void 0);
__decorate([
    query("dialog")
], ZdsNavigationDrawer.prototype, "dialogEl", void 0);
__decorate([
    query("zds-scrim")
], ZdsNavigationDrawer.prototype, "scrimEl", void 0);
ZdsNavigationDrawer = __decorate([
    customElement("zds-navigation-drawer")
], ZdsNavigationDrawer);
export { ZdsNavigationDrawer };
