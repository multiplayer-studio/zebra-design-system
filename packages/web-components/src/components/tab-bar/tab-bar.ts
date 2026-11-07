import { LitElement, html, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./tab-bar.styles.js";
import "./tab-item.js";
import type { ZdsTabItem } from "./tab-item.js";

/**
 * How the tabs share the row. Spec values are "full width" and "condensed";
 * the space becomes a hyphen so the value works as an attribute.
 */
export type TabBarFlavour = "full-width" | "condensed";

const ARROWS: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

/**
 * A row of tabs for switching between views at the same level.
 *
 * The host is the `role="tablist"`; each slotted `<zds-tab-item>` is a
 * `role="tab"`. Matching the React package's Base UI Tabs: one tab stop on
 * the selected tab (roving tabindex), Left/Right move with wrap-around
 * (mirrored in RTL), Home/End jump to the ends, and focus selects as it
 * moves. Show the matching view yourself from `value`; the bar has no panels
 * (spec: tabs only).
 *
 * @slot - The tabs: `<zds-tab-item>` elements. Four is what Figma draws, not a limit.
 * @fires zds-value-change - The user chose another tab. `detail.value` is the new value.
 *
 * @spec specs/tab-bar/tab-bar.spec.json
 */
@customElement("zds-tab-bar")
export class ZdsTabBar extends LitElement {
  static styles = styles;

  /** `full-width` divides the row evenly; `condensed` lets each tab hug its content. */
  @property({ type: String, reflect: true }) flavour: TabBarFlavour = "full-width";

  /** The selected tab's value. Empty, or one naming no enabled tab, falls back to the first enabled tab. */
  @property({ type: String }) value = "";

  /** Accessible name of the tab list, e.g. "Connection type". */
  @property({ type: String }) label: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tablist");
    this.addEventListener("click", this.#onClick);
    this.addEventListener("keydown", this.#onKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.#onClick);
    this.removeEventListener("keydown", this.#onKeydown);
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("label")) {
      if (this.label) this.setAttribute("aria-label", this.label);
      else this.removeAttribute("aria-label");
    }
    if (changed.has("value")) this.#sync();
  }

  protected render() {
    return html`<slot @slotchange=${this.#sync}></slot>`;
  }

  private get tabs(): ZdsTabItem[] {
    return [...this.children].filter((el): el is ZdsTabItem => el.localName === "zds-tab-item");
  }

  /** Marks the selected tab and gives it the one tab stop. */
  #sync = () => {
    const tabs = this.tabs;
    const enabled = tabs.filter((t) => !t.disabled);
    const chosen = enabled.find((t) => t.value === this.value) ?? enabled[0];
    if (chosen && chosen.value !== this.value) this.value = chosen.value;
    for (const t of tabs) {
      t.selected = t === chosen;
      t.tabIndex = t === chosen ? 0 : -1;
    }
  };

  #choose(tab: ZdsTabItem) {
    if (tab.disabled || tab.value === this.value) return;
    this.value = tab.value;
    this.dispatchEvent(new CustomEvent("zds-value-change", { detail: { value: tab.value }, bubbles: true, composed: true }));
  }

  #onClick = (e: Event) => {
    const tab = this.tabs.find((t) => e.composedPath().includes(t));
    if (tab) this.#choose(tab);
  };

  #onKeydown = (e: KeyboardEvent) => {
    const tabs = this.tabs;
    const current = tabs.findIndex((t) => e.composedPath().includes(t));
    if (current < 0) return;
    let next: ZdsTabItem | undefined;
    if (e.key === "Home") next = tabs.find((t) => !t.disabled);
    else if (e.key === "End") next = [...tabs].reverse().find((t) => !t.disabled);
    else if (e.key in ARROWS) {
      const rtl = getComputedStyle(this).direction === "rtl";
      const step = ARROWS[e.key] * (rtl ? -1 : 1);
      const n = tabs.length;
      for (let i = 1; i <= n && !next; i++) {
        const t = tabs[(current + step * i + n * n) % n];
        if (!t.disabled) next = t;
      }
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.#choose(tabs[current]);
      return;
    } else return;
    e.preventDefault();
    if (!next) return;
    next.focus();
    this.#choose(next);
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-tab-bar": ZdsTabBar;
  }
}
