import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import { collapsibleStyles } from "./navigation-rail.styles.js";
import { subMenuRowContent, type SubMenuItemBadge } from "../sub-menu-item/sub-menu-item.js";
import type { ZdsSubMenuItem } from "../sub-menu-item/sub-menu-item.js";
import type { NavigationRailShape } from "./navigation-rail.js";

/**
 * A Sub Menu Item that opens a group of nested rows beneath it.
 *
 * The header is a `<button>` with `aria-expanded` / `aria-controls`; the
 * rows sit in a `role="region"` named by it, `hidden` while closed — the
 * semantics React gets from Base UI's Collapsible. The header is a sub menu
 * row with its caret turned vertical (`expand-more`, rotated 180° when open —
 * one glyph, owner decision). Open, the header takes the ghost pressed fill
 * as Figma draws (State=active), the token alone (spec warn "Double alpha"),
 * and the rows sit on surface/menu. The group sets `nested` and its `shape`
 * on its rows.
 *
 * @slot - zds-sub-menu-item rows.
 * @fires zds-open-change - The header was pressed. `detail.open` is the new value (already applied).
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Collapsible Menu Item)
 */
@customElement("zds-collapsible-menu-item")
export class ZdsCollapsibleMenuItem extends LitElement {
  static styles = collapsibleStyles;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** The group's name, on its header row. */
  @property({ type: String }) label = "Label";

  /** Header glyph. Figma ships a `verified` placeholder. */
  @property({ type: String }) icon: IconName = "verified";

  /** Shows the header glyph. */
  @property({ type: Boolean, attribute: "show-leading-icon" }) showLeadingIcon = true;

  /** Counter badge on the header row, as on zds-sub-menu-item. */
  @property({
    converter: { fromAttribute: (v: string | null) => (v === null || v === "" ? null : v) },
  })
  badge: SubMenuItemBadge = null;

  /** Text equivalent of the badge. */
  @property({ type: String, attribute: "badge-label" }) badgeLabel: string | null = null;

  /** Whether the group is open. */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Corner shape of the group and its rows: rounded (`radius/sm`) or sharp
   * (`radius/none`). Inside a zds-navigation-rail the rail's `shape` sets it.
   */
  @property({ type: String, reflect: true }) shape: NavigationRailShape = "rounded";

  /** The header cannot be pressed. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  protected render() {
    return html`
      <button
        part="header"
        id="header"
        type="button"
        class="row header"
        aria-expanded=${String(this.open)}
        aria-controls="panel"
        ?disabled=${this.disabled}
        data-disabled=${this.disabled ? "" : nothing}
        data-shape=${this.shape}
        @click=${this.#toggle}
      >
        ${subMenuRowContent({
          label: this.label,
          icon: this.icon,
          showLeadingIcon: this.showLeadingIcon,
          badge: this.badge,
          badgeLabel: this.badgeLabel,
          caret: "vertical",
          open: this.open,
        })}
      </button>
      <div part="panel" id="panel" class="panel" role="region" aria-labelledby="header" ?hidden=${!this.open}>
        <div class="children"><slot @slotchange=${this.#nest}></slot></div>
      </div>
    `;
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("shape")) this.#nestRows();
  }

  #nest = () => this.#nestRows();

  #nestRows() {
    const slot = this.renderRoot.querySelector("slot");
    for (const el of slot?.assignedElements() ?? []) {
      if (el.localName !== "zds-sub-menu-item") continue;
      (el as ZdsSubMenuItem).nested = true;
      (el as ZdsSubMenuItem).shape = this.shape;
    }
  }

  #toggle = () => {
    if (this.disabled) return;
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open: this.open }, bubbles: true, composed: true }));
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-collapsible-menu-item": ZdsCollapsibleMenuItem;
  }
}
