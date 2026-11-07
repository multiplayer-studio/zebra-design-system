import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import styles from "./tab-item.styles.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
import type { NotificationIndicatorSize } from "../notification-indicator/notification-indicator.js";

/**
 * `true` shows a dot; a number or string shows that count. `false`, `0`,
 * `""` and `null` show nothing. As an attribute: bare `badge` is the dot,
 * `badge="3"` a count.
 */
export type TabItemBadge = boolean | number | string | null;

function badgeParts(badge: TabItemBadge): { size: NotificationIndicatorSize; value?: string } | null {
  if (badge === true) return { size: "small" };
  if (badge === false || badge === null || badge === undefined || badge === "" || badge === 0) return null;
  const value = typeof badge === "number" && badge > 99 ? "99+" : String(badge);
  return { size: value.length > 1 ? "large" : "medium", value };
}

/**
 * One tab in a Tab Bar: an optional icon, a label and an optional badge.
 *
 * The host is the tab: it carries `role="tab"` and `aria-selected`, and the
 * surrounding `<zds-tab-bar>` sets `selected` and the roving `tabindex`.
 * Figma's separate State, Selected and Disabled axes collapse into the
 * `selected` and `disabled` properties (spec issue).
 *
 * @part label - The label text.
 *
 * @spec specs/tab-bar/tab-bar.spec.json
 */
@customElement("zds-tab-item")
export class ZdsTabItem extends LitElement {
  static styles = styles;

  /** The value the bar reports when this tab is chosen. Unique within the bar. */
  @property({ type: String }) value = "";

  /** The tab's name: one or two real words. Figma has no text property for it (spec note). */
  @property({ type: String }) label = "Tab Item";

  /** Leading glyph. Omit for a label-only tab (Figma's Show Leading Icon off). */
  @property({ type: String }) icon: IconName | null = null;

  /** Whether this is the chosen tab. Set by `<zds-tab-bar>` from its `value`. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** The tab cannot be chosen. The surface holds; the label carries it alone (spec). */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * A Notification Indicator after the label. `true` (bare attribute) is a
   * dot; a count shows the number, capped at "99+" (spec issue: Figma pins a
   * large count while the metadata describes a dot, so both are offered).
   */
  @property({
    converter: { fromAttribute: (v: string | null) => (v === null ? null : v === "" ? true : v) },
  })
  badge: TabItemBadge = null;

  /** Text equivalent of the badge, read after the label, e.g. "3 new". Defaults to the count. */
  @property({ type: String, attribute: "badge-label" }) badgeLabel: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tab");
    if (!this.hasAttribute("tabindex")) this.tabIndex = -1;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("selected")) this.setAttribute("aria-selected", String(this.selected));
    if (changed.has("disabled")) this.toggleAttribute("aria-disabled", this.disabled);
  }

  protected render() {
    const b = badgeParts(this.badge);
    const srText = b ? (this.badgeLabel ?? b.value) : undefined;
    return html`
      ${this.icon
        ? html`<!-- Icon pinned to Size=medium, Framed off (spec); colour is currentColor. -->
            <zds-icon class="icon" name=${this.icon} size="medium"></zds-icon>`
        : nothing}
      <span part="label" class="label">${this.label}</span>
      ${b
        ? html`<zds-notification-indicator class="badge" aria-hidden="true" size=${b.size} .value=${b.value ?? ""}></zds-notification-indicator>`
        : nothing}
      ${srText ? html`<span class="sr">, ${srText}</span>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-tab-item": ZdsTabItem;
  }
}
