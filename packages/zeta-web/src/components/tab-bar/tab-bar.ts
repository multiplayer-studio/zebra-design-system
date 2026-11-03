import { LitElement, html, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./tab-bar.styles.js";
import type { ZetaTabItem } from "./tab-item/tab-item.js";

export * from "./tab-item/tab-item.js";

/** A row of tabs for switching between views at the same level. `flavor="full-width"` divides the row between the
 * tabs; `condensed` hugs them, for a bar that shares a row with other content.
 *
 * Choosing a tab selects it and fires `change`; exactly one tab is selected. The selected tab is the tab stop, and the
 * arrow keys, Home and End move between tabs and select as they go.
 *
 * @cssproperty --tab-bar-background The background colour of the tab bar.
 * @slot - The zeta-tab-items.
 * @event change - A tab was chosen; `detail.index` is its position and `detail.tab` the element.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3607-237
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-tab-bar--docs
 */
@customElement("zeta-tab-bar")
export class ZetaTabBar extends LitElement {
  /** Full width divides the row; condensed hugs the tabs (spec: flavour). */
  @property({ type: String, reflect: true }) flavor: "full-width" | "condensed" = "full-width";

  private internals = this.attachInternals();

  constructor() {
    super();
    this.internals.role = "tablist";
    this.addEventListener("click", this.onClick);
    this.addEventListener("keydown", this.onKeyDown);
  }

  private get tabs() {
    return Array.from(this.querySelectorAll<ZetaTabItem>(":scope > zeta-tab-item"));
  }

  private get enabled() {
    return this.tabs.filter(t => !t.disabled);
  }

  /** Makes the selected tab (or the first enabled one) the only tab stop. */
  private syncTabStops = () => {
    const tabs = this.tabs;
    const current = tabs.find(t => t.isSelected && !t.disabled) ?? this.enabled[0];
    for (const t of tabs) t.tabIndex = t === current ? 0 : -1;
  };

  private select(tab: ZetaTabItem, focus = false) {
    if (tab.disabled) return;
    const was = tab.isSelected;
    for (const t of this.tabs) {
      t.selected = t === tab;
      t.active = false;
    }
    this.syncTabStops();
    if (focus) tab.focus();
    if (!was) this.dispatchEvent(new CustomEvent("change", { detail: { index: this.tabs.indexOf(tab), tab }, bubbles: true, composed: true }));
  }

  private onClick = (e: Event) => {
    const tab = (e.target as HTMLElement).closest?.("zeta-tab-item");
    if (tab && tab.parentElement === this) this.select(tab);
  };

  private onKeyDown = (e: KeyboardEvent) => {
    const tabs = this.enabled;
    const i = tabs.indexOf(e.target as ZetaTabItem);
    if (i < 0) return;
    const next: Record<string, number> = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.select(tabs[i]);
      return;
    }
    if (!(e.key in next)) return;
    e.preventDefault();
    const n = (next[e.key] + tabs.length) % tabs.length;
    this.select(tabs[n], true);
  };

  protected firstUpdated(_changed: PropertyValues<this>) {
    this.syncTabStops();
  }

  protected override render() {
    return html`<slot @slotchange=${this.syncTabStops}></slot>`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-tab-bar": ZetaTabBar;
  }
}
