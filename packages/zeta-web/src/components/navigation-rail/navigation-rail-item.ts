import { html, LitElement, nothing } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { Interactive } from "../../mixins/interactive.js";
import { customElement, property } from "lit/decorators.js";
import styles from "./navigation-rail-item.styles.js";
import { Navigate } from "../../mixins/navigate.js";
import "../badges/indicators/indicators.js";

/**
 * A single destination in a Navigation Rail: a glyph in a square target, or glyph and label on one row in the wide
 * form. Selection recolours the glyph and label instead of laying a scrim behind them.
 *
 * Renders a link when `href` is set, otherwise a button; `selected` sets `aria-current="page"`. Inside a
 * `zeta-navigation-rail` the rail sets `expanded`, `showLabel` and `rounded`. The label is always the accessible name,
 * even when it is hidden in the narrow form.
 *
 * @slot - The label of the navigation item.
 * @slot {zeta-icon} icon - The glyph. Figma ships a `star` placeholder; swap it on every item.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54230
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */
@customElement("zeta-navigation-rail-item")
export class ZetaNavigationRailItem extends Navigate(Contourable(Interactive(LitElement))) {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: "open",
    delegatesFocus: true
  };

  /** The destination the user is on. Exactly one item across the rail and its panel should carry it. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** The wide form: glyph and label on one row. Inside a rail, the rail sets it. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Adds the caption under the glyph in the narrow form. No effect in the wide form, where the label always shows. */
  @property({ type: Boolean, reflect: true, attribute: "show-label" }) showLabel = false;

  /** Shows the glyph, and the badge anchored to it. Keep it on in the narrow form. */
  @property({ type: Boolean, reflect: true, attribute: "show-icon" }) showIcon = true;

  /** A notification dot over the glyph's top-right corner. It sits outside the layout. */
  @property({ type: Boolean, reflect: true, attribute: "show-badge" }) showBadge = false;

  /** Text equivalent of the badge, added to the accessible name. */
  @property({ type: String, attribute: "badge-label" }) badgeLabel?: string;

  /** Makes the item a disclosure toggle with this `aria-expanded` value. The rail's toggle item uses it. */
  @property({ type: Boolean, attribute: "toggle-expanded" }) toggleExpanded?: boolean;

  private renderContent() {
    return html`
      ${
        this.showIcon
          ? html`<span class="icon" aria-hidden="true">
              <slot name="icon"></slot>
              ${this.showBadge ? html`<zeta-notification-indicator class="badge" size="small"></zeta-notification-indicator>` : nothing}
            </span>`
          : nothing
      }
      <span class=${this.expanded || this.showLabel ? "label" : "label sr"}><slot></slot></span>
      ${this.showBadge && this.badgeLabel ? html`<span class="sr">, ${this.badgeLabel}</span>` : nothing}
    `;
  }

  protected render() {
    const current = this.selected && !this.disabled ? "page" : nothing;
    if (this.href) {
      return html`<a
        class="item interactive-target"
        href=${this.disabled ? nothing : this.href}
        aria-disabled=${this.disabled ? "true" : nothing}
        aria-current=${current}
        @click=${this.guard}
        >${this.renderContent()}</a
      >`;
    }
    return html`<button
      class="item interactive-target"
      type="button"
      ?disabled=${this.disabled}
      aria-current=${current}
      aria-expanded=${this.toggleExpanded === undefined ? nothing : String(this.toggleExpanded)}
    >
      ${this.renderContent()}
    </button>`;
  }

  /** A disabled link must not navigate or reach click listeners on the host. */
  private guard = (e: Event) => {
    if (this.disabled) {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-rail-item": ZetaNavigationRailItem;
  }
}
