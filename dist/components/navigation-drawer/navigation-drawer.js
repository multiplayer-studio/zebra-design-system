var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./navigation-drawer.styles.js";
import { Contourable, Popup } from "../../mixins/mixins.js";
import { ZetaPopupEvent } from "../../events.js";
import "../scrim/scrim.js";
import "../button/button.js";
export * from "./navigation-drawer-footer/navigation-drawer-footer.js";
export * from "./navigation-drawer-header/navigation-drawer-header.js";
export * from "./navigation-drawer-item/navigation-drawer-item.js";
export * from "./navigation-drawer-sub-item/navigation-drawer-sub-item.js";
/** The rail parts the drawer hands its shape to (spec: everything inside follows `shape`). */
const PARTS = "zeta-sub-menu-item, zeta-collapsible-menu-item, zeta-navigation-header, zeta-navigation-rail-item";
/** Rows that navigate; a group header (zeta-collapsible-menu-item) never does. */
const DESTINATIONS = new Set([
    "zeta-sub-menu-item",
    "zeta-navigation-rail-item",
    "zeta-navigation-drawer-item",
    "zeta-navigation-drawer-sub-item",
    "a"
]);
/** A boolean that defaults to true: only the attribute value "false" turns it off. */
const defaultTrue = {
    fromAttribute: (v) => v !== "false",
    toAttribute: (v) => (v ? "" : "false")
};
/**
 * The app's destinations in a tall panel at the edge of the screen, opened from a menu button.
 *
 * Built from the Navigation Rail family: a `zeta-navigation-header` in the `header` slot, then `zeta-sub-menu-item`
 * rows, `zeta-collapsible-menu-item` groups and `zeta-divider` in the menu and footer. The drawer hands them its
 * `rounded` and the header its wide form. It follows the page's theme.
 *
 * Modal (default): a dialog at the screen's edge over a `zeta-scrim` (tone scrim), opened with `show()` or
 * `showModal()`. Escape, a scrim click, the header's close button or a chosen destination closes it. With
 * `modal="false"` it is a standard drawer in the layout, opened with `show()`; closed, it narrows to nothing.
 *
 * Only the header is frozen (sticky). The menu never scrolls on its own and the footer follows it.
 *
 * The legacy `zeta-navigation-drawer-header`, `-item`, `-sub-item` and `-footer` still slot in, but are deprecated:
 * use the Navigation Rail family's parts.
 *
 * @slot - The menu: `zeta-sub-menu-item`, `zeta-collapsible-menu-item`, `zeta-divider`.
 * @slot header - A `zeta-navigation-header`. Sticky.
 * @slot footer - More rows after the menu (settings, help). Not pinned.
 *
 * @part dialog - The drawer surface.
 *
 * @event open - The drawer opened.
 * @event close - The drawer closed. `returnValue` is "close", "navigate" or "cancel".
 * @event cancel - Escape or a scrim click dismissed it.
 * @event action - The header action button was pressed.
 *
 * @cssproperty --navigation-drawer-width - The drawer's width; 320px by default (no width token exists).
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8255-1584
 * @storybook ?path=/docs/components-navigation-drawer--docs
 */
let ZetaNavigationDrawer = class ZetaNavigationDrawer extends Contourable(Popup(LitElement)) {
    constructor() {
        super(...arguments);
        /** The side of the screen that the drawer is anchored on (spec `side`: left = start, right = end). */
        this.anchor = "left";
        /** Toggles the animation for the navigation drawer. */
        this.showAnimation = true;
        /** Whether the drawer is initially open. */
        this.initialOpen = false;
        /** Slides over the page on a scrim. `false` is a standard drawer that sits in the layout and pushes the content. */
        this.modal = true;
        /** Escape and a scrim click close a modal drawer. */
        this.dismissible = true;
        /** Choosing a destination closes a modal drawer. Opening a group never does. */
        this.closeOnNavigate = true;
        /** The header's icon button becomes the close button. */
        this.showClose = true;
        /** Accessible name of the close button. */
        this.closeLabel = "Close navigation";
        /** Accessible name of the navigation landmark and of the modal drawer. */
        this.navLabel = "Main";
        /** The action's icon (Zeta icon name). */
        this.actionIcon = "add_circle_outline";
        this.hasHeader = false;
        this.onHeaderSlot = (e) => {
            this.hasHeader = e.target.assignedElements({ flatten: true }).length > 0;
            this.syncParts();
        };
        this.onHeaderAction = (e) => {
            if (!this.showClose)
                return;
            e.stopPropagation();
            void this.hide("close");
        };
        this.onActionClick = () => this.dispatchEvent(new CustomEvent("action", { bubbles: true, composed: true }));
        this.onCloseEvent = () => {
            const scrim = this.shadowRoot?.querySelector("zeta-scrim");
            if (scrim?.matches(":popover-open"))
                scrim.hidePopover();
            this.dispatchEvent(new Event("close"));
        };
        this.onCancelEvent = (e) => {
            if (!this.dismissible)
                e.preventDefault();
            this.dispatchEvent(new Event("cancel"));
        };
        this.onClick = (e) => {
            this.onBarrierClicked(e);
            if (!this.modal || !this.closeOnNavigate)
                return;
            for (const n of e.composedPath()) {
                if (n === this)
                    return;
                if (!(n instanceof HTMLElement))
                    continue;
                if (n.localName === "zeta-navigation-header" ||
                    n.localName === "zeta-collapsible-menu-item" ||
                    n.classList.contains("action"))
                    return;
                if (DESTINATIONS.has(n.localName) && (n.localName !== "a" || n.hasAttribute("href"))) {
                    if (n.hasAttribute("disabled") || n.getAttribute("aria-disabled") === "true")
                        return;
                    void this.hide("navigate");
                    return;
                }
            }
        };
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true
    }; }
    /**
     * Popup's opener, made to follow `modal`: `show()` and `showModal()` both open a modal drawer in the top layer over
     * its scrim, and a standard drawer in place.
     */
    async _show(_isModal) {
        await this.updateComplete;
        const dialog = this.shadowRoot?.querySelector("dialog");
        if (!dialog)
            return;
        if (this.modal) {
            const scrim = this.shadowRoot?.querySelector("zeta-scrim");
            if (scrim && !scrim.matches(":popover-open"))
                scrim.showPopover();
            dialog.showModal();
        }
        else {
            dialog.show();
        }
        this.dispatchEvent(new ZetaPopupEvent("open").toEvent());
    }
    willUpdate() {
        this.closeOnBarrierClicked = this.dismissible;
    }
    firstUpdated() {
        if (this.initialOpen)
            void this.show();
    }
    updated() {
        this.syncParts();
    }
    /** Shape onto every rail part inside; the header gets the wide form and, with show-close, becomes the close. */
    syncParts() {
        for (const el of this.querySelectorAll(PARTS)) {
            if (el.closest("zeta-navigation-drawer") !== this)
                continue;
            el.rounded = this.rounded;
            if (el.localName === "zeta-navigation-header") {
                el.expanded = true;
                if (this.showClose) {
                    el.showIconButton = true;
                    el.actionIcon = "close";
                    el.actionLabel = this.closeLabel;
                }
            }
        }
    }
    render() {
        return html `
      ${this.modal ? html `<zeta-scrim popover="manual" tone="scrim"></zeta-scrim>` : nothing}
      <dialog
        class="navigation-drawer"
        part="dialog"
        id=${this.id}
        aria-label=${this.navLabel}
        @click=${this.onClick}
        @cancel=${this.onCancelEvent}
        @close=${this.onCloseEvent}
      >
        <nav class="panel" aria-label=${this.navLabel}>
          <div class="header" ?data-empty=${!this.hasHeader && !this.actionLabel}>
            <slot name="header" @slotchange=${this.onHeaderSlot} @action=${this.onHeaderAction}></slot>
            ${this.actionLabel
            ? html `<zeta-button
                    class="action"
                    size="large"
                    flavor="primary"
                    shape=${this.rounded ? "rounded" : "sharp"}
                    .leadingIcon=${this.actionIcon}
                    @click=${this.onActionClick}
                    >${this.actionLabel}</zeta-button
                  >`
            : nothing}
          </div>
          <div class="menu"><slot @slotchange=${() => this.syncParts()}></slot></div>
          <div class="footer"><slot name="footer" @slotchange=${() => this.syncParts()}></slot></div>
        </nav>
      </dialog>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaNavigationDrawer.prototype, "anchor", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaNavigationDrawer.prototype, "showAnimation", void 0);
__decorate([
    property({ type: Boolean })
], ZetaNavigationDrawer.prototype, "initialOpen", void 0);
__decorate([
    property({ type: Boolean, reflect: true, converter: defaultTrue })
], ZetaNavigationDrawer.prototype, "modal", void 0);
__decorate([
    property({ type: Boolean, converter: defaultTrue })
], ZetaNavigationDrawer.prototype, "dismissible", void 0);
__decorate([
    property({ type: Boolean, attribute: "close-on-navigate", converter: defaultTrue })
], ZetaNavigationDrawer.prototype, "closeOnNavigate", void 0);
__decorate([
    property({ type: Boolean, attribute: "show-close", converter: defaultTrue })
], ZetaNavigationDrawer.prototype, "showClose", void 0);
__decorate([
    property({ type: String, attribute: "close-label" })
], ZetaNavigationDrawer.prototype, "closeLabel", void 0);
__decorate([
    property({ type: String, attribute: "nav-label" })
], ZetaNavigationDrawer.prototype, "navLabel", void 0);
__decorate([
    property({ type: String, attribute: "action-label" })
], ZetaNavigationDrawer.prototype, "actionLabel", void 0);
__decorate([
    property({ type: String, attribute: "action-icon" })
], ZetaNavigationDrawer.prototype, "actionIcon", void 0);
__decorate([
    state()
], ZetaNavigationDrawer.prototype, "hasHeader", void 0);
ZetaNavigationDrawer = __decorate([
    customElement("zeta-navigation-drawer")
], ZetaNavigationDrawer);
export { ZetaNavigationDrawer };
//# sourceMappingURL=navigation-drawer.js.map