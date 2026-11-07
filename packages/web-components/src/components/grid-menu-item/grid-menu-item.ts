import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./grid-menu-item.styles.js";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
import type { IconName } from "@zebra-design-system/icons/names";

/**
 * One tile of the grid arrangement inside a bottom sheet: an icon above a
 * short label. Hover and press come from the pointer. `active` marks the
 * option a person is on, and `disabled` puts one out of reach.
 *
 * Departures from Figma, each a spec issue:
 * - `icon` is an input, because every tile needs its own glyph. Figma fixes it
 *   to `star`, which stays the default.
 * - `active` sets `aria-current` and `disabled` the native attribute, because
 *   both are otherwise carried by the label's colour alone.
 *
 * @fires click - The tile was activated. Not fired while disabled.
 * @csspart tile - The `<button>`.
 * @csspart label - The label text.
 *
 * @spec specs/bottom-sheet/bottom-sheet.spec.json
 */
@customElement("zds-grid-menu-item")
export class ZdsGridMenuItem extends LitElement {
  static styles = styles;

  /** Names the option beneath its icon. A long label wraps and makes every tile in the row taller. */
  @property({ type: String }) label = "Label";

  /** Glyph above the label. */
  @property({ type: String }) icon: IconName = "star";

  /** Marks the option a person is on now. */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Puts the option out of reach and takes it out of the tab order. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Softens the tile's corners. */
  @property({ type: Boolean, reflect: true }) rounded = true;

  /** Adds a dot over the icon. It carries no number. */
  @property({ type: Boolean, reflect: true, attribute: "show-badge" }) showBadge = false;

  protected render() {
    return html`
      <button part="tile" class="tile" type="button" ?disabled=${this.disabled} aria-current=${this.active ? "true" : nothing}>
        <span class="indicator">
          <zds-icon name=${this.icon} size="large"></zds-icon>
          ${this.showBadge ? html`<zds-notification-indicator class="badge" size="small"></zds-notification-indicator>` : nothing}
        </span>
        <span part="label" class="label">${this.label}</span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-grid-menu-item": ZdsGridMenuItem;
  }
}
