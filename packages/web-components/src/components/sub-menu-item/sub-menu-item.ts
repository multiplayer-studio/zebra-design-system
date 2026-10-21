import { LitElement, html, nothing, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import styles from "./sub-menu-item.styles.js";
import type { NavigationRailShape } from "../navigation-rail/navigation-rail.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
import "../caret-indicator/caret-indicator.js";
import type { NotificationIndicatorSize } from "../notification-indicator/notification-indicator.js";
import type { CaretIndicatorDirection } from "../caret-indicator/caret-indicator.js";

/** A count. `0`, `""` and `null` show nothing; above 99 reads "99+". */
export type SubMenuItemBadge = number | string | null;

function badgeParts(badge: SubMenuItemBadge): { size: NotificationIndicatorSize; value: string } | null {
  if (badge === null || badge === undefined || badge === "" || badge === 0 || badge === "0") return null;
  const value = typeof badge === "number" && badge > 99 ? "99+" : String(badge);
  return { size: value.length > 1 ? "large" : "medium", value };
}

/** @internal The row's inside, shared with zds-collapsible-menu-item's header. */
export function subMenuRowContent(o: {
  label: string;
  icon: IconName;
  showLeadingIcon: boolean;
  badge: SubMenuItemBadge;
  badgeLabel: string | null;
  caret: CaretIndicatorDirection | null;
  open: boolean;
}): TemplateResult {
  const b = badgeParts(o.badge);
  const sr = b ? (o.badgeLabel ?? b.value) : null;
  // Icon and Title: their own group at space/md, inside the row's space/sm
  // (spec warn "Gap": the bound tokens, not the metadata's single space/sm).
  return html`
    <span class="lead">
      ${o.showLeadingIcon ? html`<zds-icon class="icon" name=${o.icon} size="small"></zds-icon>` : nothing}
      <span part="label" class="label">${o.label}</span>
    </span>
    ${b ? html`<zds-notification-indicator class="badge" size=${b.size} .value=${b.value} aria-hidden="true"></zds-notification-indicator>` : nothing}
    ${sr ? html`<span class="sr">, ${sr}</span>` : nothing}
    ${o.caret ? html`<zds-caret-indicator class="caret" direction=${o.caret} ?open=${o.open} size="small"></zds-caret-indicator>` : nothing}
  `;
}

/**
 * A row in the Navigation Rail's sub menu panel: leading glyph, label, an
 * optional counter badge and an optional caret.
 *
 * Renders an `<a>` when `href` is set, otherwise a `<button type="button">`;
 * `selected` sets `aria-current="page"`. Inside a zds-collapsible-menu-item
 * the group sets `nested`. Hover, pressed and selected fills are the ghost
 * tokens alone (spec warn "Double alpha"). Kept in step with React
 * `<SubMenuItem>`.
 *
 * @part item - The `<a>` / `<button>`.
 * @part label - The label text.
 *
 * @spec specs/sub-menu-item/sub-menu-item.spec.json
 */
@customElement("zds-sub-menu-item")
export class ZdsSubMenuItem extends LitElement {
  static styles = styles;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** The row's name. One line; a long name is end-truncated. */
  @property({ type: String }) label = "Label";

  /** Leading glyph. Figma ships a `verified` placeholder — swap it. */
  @property({ type: String }) icon: IconName = "verified";

  /** Shows the leading glyph. Keep it on for every row in a list, or off for all. */
  @property({ type: Boolean, reflect: true, attribute: "show-leading-icon" }) showLeadingIcon = true;

  /** The row the user is on: `aria-current="page"`, the selected ghost fill and label colour. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Unavailable. Disabled wins over `selected`. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** A child row under a collapsible group: indented, quieter label, smaller type. Set by the group. */
  @property({ type: Boolean, reflect: true }) nested = false;

  /**
   * Corner shape: rounded (`radius/sm`) or sharp (`radius/none`). Inside a
   * zds-navigation-rail the rail's `shape` sets it, inside a
   * zds-collapsible-menu-item the group's.
   */
  @property({ type: String, reflect: true }) shape: NavigationRailShape = "rounded";

  /**
   * The Badges-page Notification Indicator counter, in the row's layout.
   * Its visibility depends on this alone (spec warn: Figma also hides it with
   * the leading icon). Not Figma's drifted copy (2837:1489).
   */
  @property({
    converter: { fromAttribute: (v: string | null) => (v === null || v === "" ? null : v) },
  })
  badge: SubMenuItemBadge = null;

  /** Text equivalent of the badge in the accessible name. Defaults to the count. */
  @property({ type: String, attribute: "badge-label" }) badgeLabel: string | null = null;

  /**
   * Shows the trailing `chevron-right` caret: a row that opens a further
   * level. Figma defaults it on; here it defaults off, because the spec's own
   * usage says a caret on a row that opens nothing "promises a level that is
   * not there".
   */
  @property({ type: Boolean, reflect: true, attribute: "sub-menu" }) subMenu = false;

  /** Turns the caret (90°) while the level it opens is showing. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Renders an `<a>`. Without it the row is a `<button type="button">`. */
  @property({ type: String }) href: string | null = null;
  @property({ type: String }) target: string | null = null;
  @property({ type: String }) rel: string | null = null;

  protected render() {
    const isSelected = this.selected && !this.disabled;
    const d = (b: boolean) => (b ? "" : nothing);
    const content = subMenuRowContent({
      label: this.label,
      icon: this.icon,
      showLeadingIcon: this.showLeadingIcon,
      badge: this.badge,
      badgeLabel: this.badgeLabel,
      caret: this.subMenu ? "horizontal" : null,
      open: this.open,
    });
    if (this.href !== null) {
      return html`<a
        part="item"
        class="row"
        href=${this.disabled ? nothing : this.href}
        target=${this.target ?? nothing}
        rel=${this.rel ?? nothing}
        aria-disabled=${this.disabled ? "true" : nothing}
        aria-current=${isSelected ? "page" : nothing}
        data-nested=${d(this.nested)}
        data-shape=${this.shape}
        data-selected=${d(isSelected)}
        data-disabled=${d(this.disabled)}
        @click=${this.#guard}
      >${content}</a>`;
    }
    return html`<button
      part="item"
      class="row"
      type="button"
      ?disabled=${this.disabled}
      aria-current=${isSelected ? "page" : nothing}
      data-nested=${d(this.nested)}
      data-shape=${this.shape}
      data-selected=${d(isSelected)}
      data-disabled=${d(this.disabled)}
    >${content}</button>`;
  }

  #guard = (e: Event) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-sub-menu-item": ZdsSubMenuItem;
  }
}
