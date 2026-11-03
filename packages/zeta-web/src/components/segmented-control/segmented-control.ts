import { html, LitElement, type PropertyValues } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { customElement, property, query, queryAssignedElements, state } from "lit/decorators.js";
import styles from "./segmented-control.styles.js";
import { ZetaSegmentedItem } from "./segmented-item.js";
import { styleMap } from "lit/directives/style-map.js";

/**
 * A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button.
 * Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
 *
 * To listen for changes, add a `click` event listener to the `zeta-segmented-control` element.
 *
 * To set the active segment, set the `active` property on the `zeta-segmented-item` element.
 *
 * Exactly one segment is active; the first is chosen when none is. The control is a radio group with one tab stop, and
 * the arrow keys move the choice. A single indicator slides to the active segment on animations/spring, off under
 * reduced motion. `rounded` and `flavor` are set once here and reach every segment.
 *
 * @slot {zeta-segmented-item[]} - The content of the segmented control. Should be a collection of `zeta-segmented-item` elements.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-774
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-segmented-control--docs
 */
@customElement("zeta-segmented-control")
export class ZetaSegmentedControl extends Contourable(LitElement) {
  @queryAssignedElements({ selector: "zeta-segmented-item" }) items!: Array<ZetaSegmentedItem>;

  /** What every segment shows: icon and label, the label alone, or the icon alone. Sets their padding. */
  @property({ type: String, reflect: true }) flavor: "default" | "text-only" | "icon-only" = "default";

  @state() activeItem?: ZetaSegmentedItem;
  @state() initComplete = false;
  @query(".indicator") indicator!: HTMLDivElement;

  constructor() {
    super();
    this.addEventListener("click", e => {
      const item = this.findSegmentedItem(e.target as HTMLElement);
      if (item) this.select(item);
    });
    this.addEventListener("keydown", this.onKeyDown);
  }

  connectedCallback() {
    super.connectedCallback?.();
    this.setAttribute("role", "radiogroup");
  }

  private findSegmentedItem(element: HTMLElement | null): ZetaSegmentedItem | null {
    if (!element || element === this) return null;
    if (element instanceof ZetaSegmentedItem) return element;
    return this.findSegmentedItem(element.parentElement);
  }

  private select(item: ZetaSegmentedItem) {
    this.activeItem = item;
    this.items.forEach(i => (i.active = i === item));
  }

  private onKeyDown = (e: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!step || !this.activeItem) return;
    e.preventDefault();
    const items = this.items;
    const next = items[(items.indexOf(this.activeItem) + step + items.length) % items.length];
    next.click();
    next.focus();
  };

  private syncItems = () => {
    const items = this.items;
    this.activeItem = items.find(i => i.active) ?? items[0];
    items.forEach(i => {
      i.active = i === this.activeItem;
      i.rounded = this.rounded;
      i.flavor = this.flavor;
    });
  };

  protected firstUpdated(_changedProperties: PropertyValues): void {
    this.syncItems();
    requestAnimationFrame(() => (this.initComplete = true));
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("rounded") || changed.has("flavor")) this.syncItems();
  }

  render() {
    const item = this.activeItem;
    return html`<div class="track contourable-target">
      <div
        class="indicator contourable-target"
        ?data-ready=${this.initComplete}
        style=${styleMap({
          visibility: item ? "visible" : "hidden",
          width: `${item?.offsetWidth ?? 0}px`,
          height: `${item?.offsetHeight ?? 0}px`,
          transform: `translateX(${item?.offsetLeft ?? 0}px)`
        })}
      ></div>
      <slot id="content-slot" @slotchange=${this.syncItems}></slot>
    </div>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-segmented-control": ZetaSegmentedControl;
  }
}
