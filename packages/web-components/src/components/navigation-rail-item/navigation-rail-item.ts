import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import styles from "./navigation-rail-item.styles.js";
import type { NavigationRailShape } from "../navigation-rail/navigation-rail.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";

/**
 * A single destination in a Navigation Rail: a glyph in a square target, or
 * glyph and label on one row in the wide form.
 *
 * Renders an `<a>` when `href` is set, otherwise a `<button type="button">`;
 * `selected` sets `aria-current="page"`. Focus is delegated to that element.
 * Inside `<zds-navigation-rail>` the rail sets `expanded`, `show-label` and
 * `shape`.
 *
 * Hover and pressed scrims are the ghost tokens alone (spec warn "Double
 * alpha": Figma stacks a paint opacity on already-translucent tokens).
 * Figma's `Collapsible` boolean is wired to nothing and has no caret — it is
 * dropped; a group that expands is a zds-collapsible-menu-item.
 *
 * Kept in step with React `<NavigationRailItem>`.
 *
 * @part item - The `<a>` / `<button>`.
 * @part label - The label text.
 *
 * @spec specs/navigation-rail-item/navigation-rail-item.spec.json
 */
@customElement("zds-navigation-rail-item")
export class ZdsNavigationRailItem extends LitElement {
  static styles = styles;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * The destination's name. Always the accessible name; shown beside the
   * glyph in the wide form and under it in the narrow form when `show-label`.
   */
  @property({ type: String }) label = "Label";

  /** The glyph. Figma ships a `star` placeholder — swap it on every item. */
  @property({ type: String }) icon: IconName = "star";

  /**
   * The destination the user is on: sets `aria-current="page"` and recolours
   * glyph and label (no scrim). Figma's State=selected. Exactly one item
   * across the rail and its panel should carry it; nothing enforces that.
   */
  @property({ type: Boolean, reflect: true }) selected = false;

  /**
   * Unavailable. A link loses its `href` and gets `aria-disabled`; a button
   * gets `disabled`. Disabled wins over `selected`.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The wide form: glyph and label on one row. Inside a rail, the rail sets it. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Caption under the glyph in the narrow form. Inside a rail, the rail's `show-labels` sets it. */
  @property({ type: Boolean, reflect: true, attribute: "show-label" }) showLabel = false;

  /**
   * Corner shape: rounded (`radius/sm`) or sharp (`radius/none`). Inside a
   * zds-navigation-rail the rail's `shape` sets it.
   */
  @property({ type: String, reflect: true }) shape: NavigationRailShape = "rounded";

  /** Shows the glyph (and the badge anchored to it). Keep it on in the narrow form. */
  @property({ type: Boolean, reflect: true, attribute: "show-icon" }) showIcon = true;

  /** The Badges-page Notification Indicator dot (Size=small) over the glyph's top-right corner. */
  @property({ type: Boolean }) badge = false;

  /** Text equivalent of the badge, appended (visually hidden) to the accessible name. */
  @property({ type: String, attribute: "badge-label" }) badgeLabel: string | null = null;

  /**
   * Makes the item a disclosure toggle: its button carries `aria-expanded`
   * with this value. The rail's own toggle item uses it.
   */
  @property({ type: Boolean, attribute: "toggle-expanded" }) toggleExpanded: boolean | null = null;

  /** Renders an `<a>`. Without it the item is a `<button type="button">`. */
  @property({ type: String }) href: string | null = null;
  @property({ type: String }) target: string | null = null;
  @property({ type: String }) rel: string | null = null;

  protected render() {
    const isSelected = this.selected && !this.disabled;
    const captionVisible = this.expanded || this.showLabel;
    const content = html`
      ${this.showIcon
        ? html`<span class="icon" aria-hidden="true">
            <!-- Icon pinned to Size=small, Framed off (spec); colour is currentColor. -->
            <zds-icon name=${this.icon} size="small"></zds-icon>
            ${this.badge ? html`<zds-notification-indicator class="badge" size="small"></zds-notification-indicator>` : nothing}
          </span>`
        : nothing}
      <span part="label" class=${captionVisible ? "label" : "sr"}>${this.label}</span>
      ${this.badge && this.badgeLabel ? html`<span class="sr">, ${this.badgeLabel}</span>` : nothing}
    `;
    const current = isSelected ? "page" : nothing;
    const title = captionVisible ? nothing : this.label;
    const d = (b: boolean) => (b ? "" : nothing);

    if (this.href !== null) {
      return html`<a
        part="item"
        class="item"
        href=${this.disabled ? nothing : this.href}
        target=${this.target ?? nothing}
        rel=${this.rel ?? nothing}
        title=${title}
        aria-disabled=${this.disabled ? "true" : nothing}
        aria-current=${current}
        data-expanded=${d(this.expanded)}
        data-show-label=${d(this.showLabel)}
        data-shape=${this.shape}
        data-selected=${d(isSelected)}
        data-disabled=${d(this.disabled)}
        @click=${this.#guard}
      >${content}</a>`;
    }
    return html`<button
      part="item"
      class="item"
      type="button"
      title=${title}
      ?disabled=${this.disabled}
      aria-current=${current}
      aria-expanded=${this.toggleExpanded === null ? nothing : String(this.toggleExpanded)}
      data-expanded=${d(this.expanded)}
      data-show-label=${d(this.showLabel)}
      data-shape=${this.shape}
      data-selected=${d(isSelected)}
      data-disabled=${d(this.disabled)}
    >${content}</button>`;
  }

  /** A disabled link must not fire click listeners on the host. */
  #guard = (e: Event) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-navigation-rail-item": ZdsNavigationRailItem;
  }
}
