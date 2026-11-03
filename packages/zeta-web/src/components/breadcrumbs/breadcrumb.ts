export * from "./breadcrumb-item/breadcrumb-item.js";
import { html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./breadcrumb.styles.js";
import "../button/icon-button/icon-button.js";
import "../dropdown/droppable.js";
import "../dropdown/menu-item/dropdown-menu-item.js";
import "../icon/icon.js";
import type { ZetaBreadcrumbItem } from "./breadcrumb-item/breadcrumb-item.js";
import type { ZetaDropdownMenuItem } from "../dropdown/menu-item/dropdown-menu-item.js";
import type { ZetaDroppable } from "../dropdown/droppable.js";
import type { ZetaIconButton } from "../button/icon-button/icon-button.js";
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
@customElement("zeta-breadcrumb")
export class ZetaBreadcrumb extends Contourable(Interactive(LitElement)) {
  static styles = [super.styles ?? [], styles];

  /**
   * The maximum number of items to display in the breadcrumb.
   * For example, if the value is 3 and there are 5 items in the breadcrumb:
   * * The first item will always be displayed.
   * * The last 2 items will always be displayed.
   * * The rest of the items will be moved to the overflow menu.
   *
   * The minimum is 2. Leave it at 0 to show every item.
   */
  @property({ type: Number }) maxItems: number = 0;

  /** How the current page stands out. `accent` sets it and its icon in blue. */
  @property({ type: String, reflect: true }) flavor: "default" | "accent" = "default";

  /** Accessible name of the trail. */
  @property({ type: String }) label: string = "Breadcrumb";

  /** Accessible name of the overflow control (spec issue: Figma has none). */
  @property({ type: String }) overflowLabel: string = "Show hidden pages";

  /** The items moved to the overflow menu. */
  @state() private hiddenItems: ZetaBreadcrumbItem[] = [];

  /** The overflow menu is showing. */
  @state() private open: boolean = false;

  @query("#overflow-button") private overflowButton?: ZetaIconButton;

  /** The `zeta-breadcrumb-item` children, root first. */
  get items() {
    return [...this.children].filter(child => child.tagName === "ZETA-BREADCRUMB-ITEM") as ZetaBreadcrumbItem[];
  }

  private get rows() {
    return [...(this.shadowRoot?.querySelectorAll("zeta-dropdown-menu-item") ?? [])] as ZetaDropdownMenuItem[];
  }

  private get triggerButton() {
    return this.overflowButton?.shadowRoot?.querySelector("button");
  }

  /** Marks each item for its place in the trail, and works out which ones the overflow menu holds. */
  private syncItems = () => {
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
    if (hiddenCount === 0) this.open = false;
  };

  private handleOutsideClick = (event: Event) => {
    if (this.open && !event.composedPath().includes(this)) this.open = false;
  };

  private toggle = () => {
    this.open = !this.open;
  };

  private close() {
    this.open = false;
    this.triggerButton?.focus();
  }

  /** Follows the hidden crumb. Going through its link keeps its href and any click listener on it working. */
  private select(item: ZetaBreadcrumbItem) {
    this.close();
    item.shadowRoot?.querySelector("a")?.click();
  }

  private focusRow(index: number) {
    const rows = this.rows;
    rows
      .at(index % rows.length)
      ?.shadowRoot?.querySelector<HTMLElement>(".droppable-item")
      ?.focus();
  }

  /** zeta-droppable has no keyboard handling of its own. */
  private handleMenuKey = (event: KeyboardEvent) => {
    const current = this.rows.indexOf(this.shadowRoot?.activeElement as ZetaDropdownMenuItem);
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

  private itemLabel(item: ZetaBreadcrumbItem) {
    // Comment nodes carry a textContent too, and Lit leaves its markers in anything it renders.
    const nodes = [...item.childNodes].filter(node => node.nodeType !== Node.COMMENT_NODE && (node as Element).slot !== "icon");
    return nodes
      .map(node => node.textContent)
      .join("")
      .trim();
  }

  private renderRow(item: ZetaBreadcrumbItem) {
    const icon = item.querySelector("[slot='icon']")?.textContent?.trim();
    return html`<zeta-dropdown-menu-item @click=${() => this.select(item)}>
      ${icon ? html`<zeta-icon slot="icon">${icon}</zeta-icon>` : nothing}${this.itemLabel(item)}
    </zeta-dropdown-menu-item>`;
  }

  private renderOverflow() {
    if (this.hiddenItems.length === 0) return nothing;
    return html`<div class="overflow" role="listitem">
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

  protected override willUpdate(changed: PropertyValues<this>) {
    if (changed.has("maxItems") || changed.has("rounded")) this.syncItems();
  }

  /** Waits for the menu to draw its rows, then moves focus in. */
  private async focusFirstRow() {
    await (this.shadowRoot?.querySelector("zeta-droppable") as ZetaDroppable).updateComplete;
    this.focusRow(0);
  }

  protected override updated(changed: PropertyValues) {
    const trigger = this.triggerButton;
    trigger?.setAttribute("aria-haspopup", "menu");
    trigger?.setAttribute("aria-expanded", String(this.open));
    if (changed.has("open") && this.open) void this.focusFirstRow();
  }

  protected override render() {
    return html`<nav aria-label=${this.label}>
      <div class="list" role="list">
        <slot name="leading" @slotchange=${this.syncItems}></slot>
        ${this.renderOverflow()}
        <slot @slotchange=${this.syncItems}></slot>
      </div>
    </nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-breadcrumb": ZetaBreadcrumb;
  }
}
