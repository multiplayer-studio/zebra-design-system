import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import styles from "./navigation-item.styles.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
import type { NotificationIndicatorSize } from "../notification-indicator/notification-indicator.js";

/**
 * `true` shows a dot; a number or string shows that count. `false`, `0`,
 * `""` and `null` show nothing — a zero count means nothing is waiting.
 * As an attribute: bare `badge` is the dot, `badge="3"` a count.
 */
export type NavigationItemBadge = boolean | number | string | null;

function badgeParts(badge: NavigationItemBadge): { size: NotificationIndicatorSize; value?: string } | null {
  if (badge === true) return { size: "small" };
  if (badge === false || badge === null || badge === undefined || badge === "" || badge === 0) return null;
  const value = typeof badge === "number" && badge > 99 ? "99+" : String(badge);
  return { size: value.length > 1 ? "large" : "medium", value };
}

/**
 * A single destination inside a Navigation Bar: an icon above a label, with
 * an optional badge.
 *
 * Renders an `<a>` when `href` is set, otherwise a `<button type="button">`;
 * `active` sets `aria-current="page"`. Focus is delegated to that element, so
 * `item.focus()` and Tab land on it. Inside `<zds-navigation-bar>` the bar
 * gives the host `role="listitem"`.
 *
 * Hover, pressed and focus are not in Figma (spec issue); they come from the
 * ghost interactive tokens, like a ghost Button. The icon takes the label's
 * colour via currentColor in every state (spec issue: Figma's icon bindings
 * disagree with the label's).
 *
 * @part item - The `<a>` / `<button>`.
 * @part label - The label text.
 *
 * @spec specs/navigation-item/navigation-item.spec.json
 */
@customElement("zds-navigation-item")
export class ZdsNavigationItem extends LitElement {
  static styles = styles;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** The destination's name, and the only text on the item. One or two words. */
  @property({ type: String }) label = "Label";

  /** Glyph above the label. Figma ships a `star` placeholder — swap it on every item. */
  @property({ type: String }) icon: IconName = "star";

  /**
   * The destination the user is on: sets `aria-current="page"`. Exactly one
   * item in a bar should carry it; nothing enforces that.
   */
  @property({ type: Boolean, reflect: true }) active = false;

  /**
   * The destination is unavailable. A link loses its `href` and gets
   * `aria-disabled`; a button gets the native `disabled`. Figma offers it on
   * inactive items only — when both are set, disabled wins and `active` is
   * ignored (spec issue: no active+disabled variant).
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * A Notification Indicator over the icon's top-right corner. `true` (bare
   * attribute) is the dot, Figma's pinned Size=small; a count shows the
   * number — medium for one character, large for more, capped at "99+".
   */
  @property({
    converter: { fromAttribute: (v: string | null) => (v === null ? null : v === "" ? true : v) },
  })
  badge: NavigationItemBadge = null;

  /**
   * Text equivalent of the badge, appended (visually hidden) to the item's
   * accessible name, e.g. "3 unread". Defaults to the count itself; a dot
   * badge has none unless you give one.
   */
  @property({ type: String, attribute: "badge-label" }) badgeLabel: string | null = null;

  /** Renders an `<a>`. Without it the item is a `<button type="button">`. */
  @property({ type: String }) href: string | null = null;

  /** Link target, when `href` is set. */
  @property({ type: String }) target: string | null = null;

  /** Link rel, when `href` is set. */
  @property({ type: String }) rel: string | null = null;

  protected render() {
    const isActive = this.active && !this.disabled;
    const b = badgeParts(this.badge);
    const srText = b ? (this.badgeLabel ?? b.value) : undefined;
    const content = html`
      <span class="icon" aria-hidden="true">
        <!-- Icon pinned to Size=medium, Framed off (spec); colour is currentColor. -->
        <zds-icon name=${this.icon} size="medium"></zds-icon>
        ${b
          ? html`<zds-notification-indicator class="badge" size=${b.size} .value=${b.value ?? ""}></zds-notification-indicator>`
          : nothing}
      </span>
      <span part="label" class="label">${this.label}</span>
      ${srText ? html`<span class="sr">, ${srText}</span>` : nothing}
    `;
    const current = isActive ? "page" : nothing;

    if (this.href !== null) {
      return html`<a
        part="item"
        class="item"
        href=${this.disabled ? nothing : this.href}
        target=${this.target ?? nothing}
        rel=${this.rel ?? nothing}
        aria-disabled=${this.disabled ? "true" : nothing}
        aria-current=${current}
        @click=${this.#guard}
      >${content}</a>`;
    }
    return html`<button part="item" class="item" type="button" ?disabled=${this.disabled} aria-current=${current}>
      ${content}
    </button>`;
  }

  /** A disabled item must not fire click listeners on the host. */
  #guard = (e: Event) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-navigation-item": ZdsNavigationItem;
  }
}
