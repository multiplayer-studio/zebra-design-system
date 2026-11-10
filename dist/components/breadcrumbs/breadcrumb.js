var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
export * from "./breadcrumb-item/breadcrumb-item.js";
import { html, LitElement, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./breadcrumb.styles.js";
import "../button/icon-button/icon-button.js";
import "../dropdown/droppable.js";
import "../dropdown/menu-item/dropdown-menu-item.js";
import "../icon/icon.js";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";
/** Shows where a page sits in the hierarchy, as a trail of links ending on the current page. Each crumb goes back up a
 * level. A long trail collapses its middle into a compact overflow menu, so every crumb stays reachable.
 *
 * The chevron after each crumb and the current page are worked out from the slotted items; the last one is the current
 * page. `rounded` reaches the overflow control and its menu.
 *
 * @slot - The `zeta-breadcrumb-item` crumbs, root first.
 * @slot leading - Set by the element: it holds the first crumb, so the overflow control follows it.
 *
 * @cssproperty --breadcrumb-current-color - The current page's text and icon. Set by `flavor`.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=7667-447
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-breadcrumb--docs
 */
let ZetaBreadcrumb = class ZetaBreadcrumb extends Contourable(Interactive(LitElement)) {
    constructor() {
        super(...arguments);
        /**
         * The maximum number of items to display in the breadcrumb.
         * For example, if the value is 3 and there are 5 items in the breadcrumb:
         * * The first item will always be displayed.
         * * The last 2 items will always be displayed.
         * * The rest of the items will be moved to the overflow menu.
         *
         * The minimum is 2. Leave it at 0 to show every item.
         */
        this.maxItems = 0;
        /** How the current page stands out. `accent` sets it and its icon in blue. */
        this.flavor = "default";
        /** Accessible name of the trail. */
        this.label = "Breadcrumb";
        /** Accessible name of the overflow control (spec issue: Figma has none). */
        this.overflowLabel = "Show hidden pages";
        /** The items moved to the overflow menu. */
        this.hiddenItems = [];
        /** The overflow menu is showing. */
        this.open = false;
        /** Marks each item for its place in the trail, and works out which ones the overflow menu holds. */
        this.syncItems = () => {
            const items = this.items;
            const kept = this.maxItems >= 1 ? Math.max(this.maxItems, 2) : items.length;
            const hiddenCount = Math.max(items.length - kept, 0);
            items.forEach((item, index) => {
                const hidden = index >= 1 && index <= hiddenCount;
                item.slot = index === 0 ? "leading" : "";
                item.hidden = hidden;
                item.current = index === items.length - 1;
                item.separator = index < items.length - 1;
                item.rounded = this.rounded;
                item.setAttribute("role", "listitem");
            });
            this.hiddenItems = items.slice(1, hiddenCount + 1);
            if (hiddenCount === 0)
                this.open = false;
        };
        this.handleOutsideClick = (event) => {
            if (this.open && !event.composedPath().includes(this))
                this.open = false;
        };
        this.toggle = () => {
            this.open = !this.open;
        };
        /** zeta-droppable has no keyboard handling of its own. */
        this.handleMenuKey = (event) => {
            const current = this.rows.indexOf(this.shadowRoot?.activeElement);
            switch (event.key) {
                case "ArrowDown":
                    this.focusRow(current + 1);
                    break;
                case "ArrowUp":
                    this.focusRow(current - 1);
                    break;
                case "Home":
                    this.focusRow(0);
                    break;
                case "End":
                    this.focusRow(-1);
                    break;
                case "Enter":
                    this.rows[current]?.click();
                    break;
                case "Escape":
                    this.close();
                    break;
                default:
                    return;
            }
            event.preventDefault();
        };
    }
    static { this.styles = [super.styles ?? [], styles]; }
    /** The `zeta-breadcrumb-item` children, root first. */
    get items() {
        return [...this.children].filter(child => child.tagName === "ZETA-BREADCRUMB-ITEM");
    }
    get rows() {
        return [...(this.shadowRoot?.querySelectorAll("zeta-dropdown-menu-item") ?? [])];
    }
    get triggerButton() {
        return this.overflowButton?.shadowRoot?.querySelector("button");
    }
    close() {
        this.open = false;
        this.triggerButton?.focus();
    }
    /** Follows the hidden crumb. Going through its link keeps its href and any click listener on it working. */
    select(item) {
        this.close();
        item.shadowRoot?.querySelector("a")?.click();
    }
    focusRow(index) {
        const rows = this.rows;
        rows
            .at(index % rows.length)
            ?.shadowRoot?.querySelector(".droppable-item")
            ?.focus();
    }
    itemLabel(item) {
        // Comment nodes carry a textContent too, and Lit leaves its markers in anything it renders.
        const nodes = [...item.childNodes].filter(node => node.nodeType !== Node.COMMENT_NODE && node.slot !== "icon");
        return nodes
            .map(node => node.textContent)
            .join("")
            .trim();
    }
    renderRow(item) {
        const icon = item.querySelector("[slot='icon']")?.textContent?.trim();
        return html `<zeta-dropdown-menu-item @click=${() => this.select(item)}>
      ${icon ? html `<zeta-icon slot="icon">${icon}</zeta-icon>` : nothing}${this.itemLabel(item)}
    </zeta-dropdown-menu-item>`;
    }
    renderOverflow() {
        if (this.hiddenItems.length === 0)
            return nothing;
        return html `<div class="overflow" role="listitem">
      <zeta-icon-button
        id="overflow-button"
        size="small"
        flavor="outline-subtle"
        shape=${this.rounded ? "rounded" : "sharp"}
        aria-label=${this.overflowLabel}
        @click=${this.toggle}
        >more_horizontal</zeta-icon-button
      >
      <zeta-icon class="separator" aria-hidden="true" .rounded=${this.rounded}>chevron_right</zeta-icon>
      <zeta-droppable compact ?open=${this.open} ?rounded=${this.rounded} .anchor=${this.overflowButton} @keydown=${this.handleMenuKey}>
        ${this.hiddenItems.map(item => this.renderRow(item))}
      </zeta-droppable>
    </div>`;
    }
    connectedCallback() {
        super.connectedCallback?.();
        document.addEventListener("click", this.handleOutsideClick);
    }
    disconnectedCallback() {
        super.disconnectedCallback?.();
        document.removeEventListener("click", this.handleOutsideClick);
    }
    willUpdate(changed) {
        if (changed.has("maxItems") || changed.has("rounded"))
            this.syncItems();
    }
    /** Waits for the menu to draw its rows, then moves focus in. */
    async focusFirstRow() {
        await (this.shadowRoot?.querySelector("zeta-droppable")).updateComplete;
        this.focusRow(0);
    }
    updated(changed) {
        const trigger = this.triggerButton;
        trigger?.setAttribute("aria-haspopup", "menu");
        trigger?.setAttribute("aria-expanded", String(this.open));
        if (changed.has("open") && this.open)
            void this.focusFirstRow();
    }
    render() {
        return html `<nav aria-label=${this.label}>
      <div class="list" role="list">
        <slot name="leading" @slotchange=${this.syncItems}></slot>
        ${this.renderOverflow()}
        <slot @slotchange=${this.syncItems}></slot>
      </div>
    </nav>`;
    }
};
__decorate([
    property({ type: Number })
], ZetaBreadcrumb.prototype, "maxItems", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaBreadcrumb.prototype, "flavor", void 0);
__decorate([
    property({ type: String })
], ZetaBreadcrumb.prototype, "label", void 0);
__decorate([
    property({ type: String })
], ZetaBreadcrumb.prototype, "overflowLabel", void 0);
__decorate([
    state()
], ZetaBreadcrumb.prototype, "hiddenItems", void 0);
__decorate([
    state()
], ZetaBreadcrumb.prototype, "open", void 0);
__decorate([
    query("#overflow-button")
], ZetaBreadcrumb.prototype, "overflowButton", void 0);
ZetaBreadcrumb = __decorate([
    customElement("zeta-breadcrumb")
], ZetaBreadcrumb);
export { ZetaBreadcrumb };
//# sourceMappingURL=breadcrumb.js.map