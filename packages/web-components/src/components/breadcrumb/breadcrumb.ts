import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./breadcrumb.styles.js";
import "./breadcrumb-item.js";
import "../dropdown/dropdown.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../menu-item/menu-item.js";
import type { ZdsBreadcrumbItem } from "./breadcrumb-item.js";
import type { ZdsDropdown } from "../dropdown/dropdown.js";
import type { ZdsMenuItem } from "../menu-item/menu-item.js";

export type BreadcrumbFlavour = "default" | "accent";
export type BreadcrumbShape = "rounded" | "sharp";

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
@customElement("zds-breadcrumb")
export class ZdsBreadcrumb extends LitElement {
  static styles = styles;

  /** How the current page stands out. `accent` sets it and its icon in blue. */
  @property({ type: String, reflect: true }) flavour: BreadcrumbFlavour = "default";

  /** Corners of the overflow control and its menu. */
  @property({ type: String, reflect: true }) shape: BreadcrumbShape = "rounded";

  /** How many crumbs show before the middle collapses: the first, then the rest from the end. Unset shows them all. The minimum is 2. */
  @property({ type: Number, attribute: "max-items" }) maxItems: number | null = null;

  /** Accessible name of the trail. */
  @property({ type: String }) label = "Breadcrumb";

  /** Accessible name of the overflow control. */
  @property({ type: String, attribute: "overflow-label" }) overflowLabel = "Show hidden pages";

  /** The items moved to the overflow menu. */
  @state() private hiddenItems: ZdsBreadcrumbItem[] = [];

  /** The overflow menu is showing. */
  @state() private open = false;

  @query("zds-dropdown") private dropdown?: ZdsDropdown;

  get #items() {
    return [...this.children].filter((child) => child.localName === "zds-breadcrumb-item") as ZdsBreadcrumbItem[];
  }

  get #rows() {
    return [...this.renderRoot.querySelectorAll("zds-menu-item")] as ZdsMenuItem[];
  }

  #sync = () => {
    const items = this.#items;
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
  };

  get #activeRow() {
    return this.#rows.indexOf((this.renderRoot as ShadowRoot).activeElement as ZdsMenuItem);
  }

  /* Neither zds-menu-item nor zds-icon-button delegates focus, so it has to land on the element inside. */
  #focusRow(index: number) {
    const rows = this.#rows;
    const row = rows[(index + rows.length) % rows.length];
    row?.renderRoot.querySelector<HTMLElement>("[tabindex]")?.focus();
  }

  #focusTrigger() {
    this.renderRoot.querySelector("zds-icon-button")?.renderRoot.querySelector("button")?.focus();
  }

  /* zds-dropdown owns open, outside click and Escape. Moving through the rows is left to whoever fills it. */
  #onKeydown = (event: KeyboardEvent) => {
    if (!this.open) return;
    const current = this.#activeRow;
    const moves: Record<string, number> = { ArrowDown: current + 1, ArrowUp: current - 1, Home: 0, End: -1 };
    if (!(event.key in moves)) return;
    event.preventDefault();
    this.#focusRow(moves[event.key]);
  };

  #onOpenChange = async (event: CustomEvent<{ open: boolean }>) => {
    const inMenu = this.#activeRow >= 0;
    this.open = event.detail.open;
    if (!this.open) {
      if (inMenu) this.#focusTrigger();
      return;
    }
    await Promise.all(this.#rows.map((row) => row.updateComplete));
    this.#focusRow(0);
  };

  #select(item: ZdsBreadcrumbItem) {
    if (this.dropdown) this.dropdown.open = false;
    item.activate();
  }

  /* Text only: Lit leaves comment markers in anything it renders, and those have a textContent too. */
  #label(item: ZdsBreadcrumbItem) {
    return [...item.childNodes]
      .filter((node) => node.nodeType !== Node.COMMENT_NODE)
      .map((node) => node.textContent)
      .join("")
      .trim();
  }

  #overflow() {
    if (!this.hiddenItems.length) return nothing;
    const rounded = this.shape === "rounded";
    return html`<div class="overflow" role="listitem">
      <zds-dropdown compact .rounded=${rounded} @open-change=${this.#onOpenChange} @keydown=${this.#onKeydown}>
        <zds-icon-button slot="trigger" flavour="outline-subtle" size="small" shape=${this.shape} icon="more-horizontal" .label=${this.overflowLabel} .expanded=${this.open}></zds-icon-button>
        ${this.hiddenItems.map(
          (item) => html`<zds-menu-item leading-icon=${item.icon ?? nothing} ?rounded=${rounded} @click=${() => this.#select(item)}>${this.#label(item)}</zds-menu-item>`,
        )}
      </zds-dropdown>
      <zds-icon class="separator" name="chevron-right" size="small"></zds-icon>
    </div>`;
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("maxItems")) this.#sync();
  }

  /* zds-icon-button forwards aria-expanded but has no way to say what it opens. */
  protected updated() {
    const button = this.renderRoot.querySelector("zds-icon-button");
    void button?.updateComplete.then(() => button.renderRoot.querySelector("button")?.setAttribute("aria-haspopup", "menu"));
  }

  protected render() {
    return html`<nav part="nav" aria-label=${this.label}>
      <div class="list" role="list">
        <slot name="leading" @slotchange=${this.#sync}></slot>
        ${this.#overflow()}
        <slot @slotchange=${this.#sync}></slot>
      </div>
    </nav>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-breadcrumb": ZdsBreadcrumb;
  }
}
