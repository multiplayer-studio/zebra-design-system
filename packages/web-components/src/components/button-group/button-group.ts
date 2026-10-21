import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { ButtonSize } from "../button/button.js";
import styles, { itemStyles } from "./button-group.styles.js";
import "../divider/divider.js";

export type ButtonGroupSize = ButtonSize;
export type ButtonGroupShape = "sharp" | "rounded";

/** The items the group configures. Anything else is slotted as-is. */
const ITEM_TAGS = new Set(["ZDS-BUTTON", "ZDS-ICON-BUTTON"]);

/** One shared sheet, adopted into each item's shadow root (see `#adopt`). */
let itemSheet: CSSStyleSheet | null = null;

/**
 * A row of related actions sharing one bordered surface, where each carries
 * equal weight rather than one leading. Reach for a single `<zds-button>`
 * when one action is clearly the primary one.
 *
 * Items are slotted `<zds-button>` and/or `<zds-icon-button>` children. The
 * group sets each one's `size` from its own, pins `flavour="subtle"` and
 * `shape="sharp"` (spec: size, shape and flavour belong to the group, never
 * set per item) and draws a vertical `<zds-divider>` between every pair.
 * Figma's per-size, per-position wrapper sets are an authoring arrangement
 * and are not reproduced: position comes from the item's index.
 *
 * The dividers sit between slotted children, which a single default slot
 * can't do, so the shadow root uses manual slot assignment: one slot per
 * child, assigned in `updated()`, re-synced whenever children change.
 *
 * Semantics match the React package: a `role="group"` named by `label`, each
 * item its own tab stop (no roving focus — see ButtonGroup.tsx for why Base
 * UI's Toolbar was not used there).
 *
 * @slot - The actions: `<zds-button>` / `<zds-icon-button>` elements.
 * @csspart group - The bordered `role="group"` surface.
 * @csspart divider - Each rule between two items.
 *
 * @spec specs/button-group/button-group.spec.json
 */
@customElement("zds-button-group")
export class ZdsButtonGroup extends LitElement {
  static styles = styles;
  static shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, slotAssignment: "manual" };

  /** Row height and the size of every item. The group's call, never set per item. */
  @property({ type: String, reflect: true }) size: ButtonGroupSize = "medium";

  /** Rounds the group's outline and the outer ends of its first and last item only. */
  @property({ type: String, reflect: true }) shape: ButtonGroupShape = "sharp";

  /** The accessible name: what the actions have in common. */
  @property({ type: String }) label = "";

  @state() private _items: (Element | Text)[] = [];

  #observer = new MutationObserver(() => this.#collect());

  connectedCallback() {
    super.connectedCallback();
    this.#observer.observe(this, { childList: true, characterData: true, subtree: false });
    this.#collect();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#observer.disconnect();
  }

  #collect() {
    const next = [...this.childNodes].filter(
      (n): n is Element | Text =>
        n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && !!n.textContent?.trim()),
    );
    for (const old of this._items) {
      if (old instanceof Element && !next.includes(old)) {
        old.removeAttribute("data-zds-group-start");
        old.removeAttribute("data-zds-group-end");
      }
    }
    this._items = next;
  }

  /**
   * The outer-end radius has to land on the item's inner `<button>`, inside
   * its own shadow root, which the group's styles can't reach (`::part()`
   * doesn't apply to slotted elements). So one small sheet is adopted into
   * each item's shadow root, keyed off `data-zds-group-start` / `-end`; it
   * reads `--zds-button-group-inner-radius`, which only a rounded group sets.
   * Button itself is unchanged. React styles `.zds-button` directly.
   */
  async #adopt(el: Element) {
    await customElements.whenDefined(el.localName);
    await (el as LitElement).updateComplete;
    const root = el.shadowRoot;
    if (!root) return;
    itemSheet ??= (() => {
      const s = new CSSStyleSheet();
      s.replaceSync(itemStyles);
      return s;
    })();
    if (!root.adoptedStyleSheets.includes(itemSheet)) root.adoptedStyleSheets = [...root.adoptedStyleSheets, itemSheet];
  }

  protected updated() {
    const slots = this.renderRoot.querySelectorAll("slot");
    this._items.forEach((node, i) => {
      slots[i]?.assign(node);
      if (!(node instanceof Element) || !ITEM_TAGS.has(node.tagName)) return;
      const item = node as Element & { size: string; flavour: string; shape: string };
      if (item.size !== this.size) item.size = this.size;
      if (item.flavour !== "subtle") item.flavour = "subtle";
      if (item.shape !== "sharp") item.shape = "sharp";
      node.toggleAttribute("data-zds-group-start", i === 0);
      node.toggleAttribute("data-zds-group-end", i === this._items.length - 1);
      void this.#adopt(node);
    });
  }

  protected render() {
    return html`
      <div part="group" class="group" role="group" aria-label=${this.label || nothing}>
        ${this._items.map(
          (_, i) => html`${i > 0
              ? /* Spec issue: Figma drops the divider after item 1 on
                   medium/rounded. Here every pair gets one. */
                html`<zds-divider part="divider" orientation="vertical"></zds-divider>`
              : nothing}<slot></slot>`,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-button-group": ZdsButtonGroup;
  }
}
