import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./navigation-bar.styles.js";
import "../divider/divider.js";
import type { ZdsNavigationItem } from "../navigation-item/navigation-item.js";

/**
 * How the items are arranged across the bar's width. Renames Figma's
 * `shrinkItems`, whose name describes neither mode:
 * - `start` (shrinkItems=true): items keep their natural width and pack from
 *   the start; a `<zds-navigation-bar-spacer>` pushes the next group to the end.
 * - `space-between` (shrinkItems=false): the item row fills the width and
 *   distributes free space BETWEEN items — the end items touch the bar's
 *   edges. It is Figma's actual behaviour, not equal-width items or an even
 *   spread (spec note).
 */
export type NavigationBarDistribution = "start" | "space-between";

/**
 * A horizontal bar of top-level destinations, pinned to one edge of a view.
 *
 * Renders a `<nav>` landmark holding a list: each slotted
 * `<zds-navigation-item>` gets `role="listitem"`, each
 * `<zds-navigation-bar-spacer>` is hidden from assistive tech. Every item
 * stays in the Tab order (they are links, not toolbar buttons, so roving
 * tabindex would hide destinations from Tab users); Left/Right arrows also
 * move between items, without wrapping, matching the React package's Base UI
 * NavigationMenu.
 *
 * It has no fill — only a top border — so it takes the surface behind it.
 *
 * @slot - NavigationItem elements, optionally split into groups by `zds-navigation-bar-spacer`.
 * @slot action - A call to action at the end that is not a destination — normally one `zds-button`. Replaces Figma's `showActionSlot`.
 * @part nav - The `<nav>` element.
 * @part list - The item row (`role="list"`).
 * @part action - The action slot's wrapper.
 *
 * @spec specs/navigation-bar/navigation-bar.spec.json
 */
@customElement("zds-navigation-bar")
export class ZdsNavigationBar extends LitElement {
  static styles = styles;

  /** Accessible name of the `<nav>` landmark. Name it when a page has more than one. */
  @property({ type: String }) label = "Main";

  /** How the items are arranged across the width. */
  @property({ type: String, reflect: true }) distribution: NavigationBarDistribution = "start";

  /**
   * A vertical rule before the action. Figma draws it only in the
   * spacer + showDivider variant and never documents it (spec issue); in
   * code it is independent.
   */
  @property({ type: Boolean, reflect: true, attribute: "action-divider" }) actionDivider = false;

  @state() private hasAction = false;

  protected render() {
    return html`<nav part="nav" class="nav" aria-label=${this.label}>
      <div part="list" class="list" role="list" @keydown=${this.#onKeydown}>
        <slot @slotchange=${this.#onItemsChange}></slot>
      </div>
      ${this.hasAction && this.actionDivider
        ? html`<div class="divider-section" aria-hidden="true"><zds-divider orientation="vertical"></zds-divider></div>`
        : nothing}
      <div part="action" class="action" ?hidden=${!this.hasAction}>
        <slot name="action" @slotchange=${this.#onActionChange}></slot>
      </div>
    </nav>`;
  }

  #onItemsChange = (e: Event) => {
    for (const el of (e.target as HTMLSlotElement).assignedElements()) {
      if (el.localName === "zds-navigation-item") el.setAttribute("role", "listitem");
      else if (el.localName === "zds-navigation-bar-spacer") el.setAttribute("aria-hidden", "true");
    }
  };

  #onActionChange = (e: Event) => {
    this.hasAction = (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).some(
      (n) => n.nodeType === Node.ELEMENT_NODE || (n.textContent ?? "").trim() !== "",
    );
  };

  /** Left/Right move focus between enabled items, without wrapping (mirrors Base UI's composite list). */
  #onKeydown = (e: KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const slot = this.renderRoot.querySelector<HTMLSlotElement>("slot:not([name])");
    const items = (slot?.assignedElements() ?? []).filter(
      (el): el is ZdsNavigationItem => el.localName === "zds-navigation-item" && !(el as ZdsNavigationItem).disabled,
    );
    const current = items.findIndex((el) => e.composedPath().includes(el));
    if (current < 0) return;
    const rtl = getComputedStyle(this).direction === "rtl";
    const step = (e.key === "ArrowRight") !== rtl ? 1 : -1;
    const next = items[current + step];
    e.preventDefault();
    next?.focus();
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-navigation-bar": ZdsNavigationBar;
  }
}
