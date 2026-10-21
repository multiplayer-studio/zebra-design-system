import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import { railStyles } from "./navigation-rail.styles.js";
import "../button/button.js";
import "../icon-button/icon-button.js";
import "../navigation-rail-item/navigation-rail-item.js";
import type { ZdsNavigationRailItem } from "../navigation-rail-item/navigation-rail-item.js";
import type { ZdsNavigationHeader } from "./navigation-header.js";
import type { ZdsSubMenuHeader } from "./sub-menu-header.js";
import type { ZdsCollapsibleMenuItem } from "./collapsible-menu-item.js";
import type { ZdsSubMenuItem } from "../sub-menu-item/sub-menu-item.js";

/**
 * The corner shape a rail hands to everything nested in it. Code-only: Figma
 * has no counterpart (spec: the rail's `shape`). rounded = `radius/sm`,
 * sharp = `radius/none`; a nested zds-button / zds-icon-button takes the
 * same-named `shape`.
 */
export type NavigationRailShape = "rounded" | "sharp";

/** The parts the rail hands its state to. */
const RAIL_PARTS = "zds-navigation-rail-item, zds-navigation-header, zds-sub-menu-header, zds-sub-menu-item, zds-collapsible-menu-item";
type RailPart = ZdsNavigationRailItem | ZdsNavigationHeader | ZdsSubMenuHeader | ZdsSubMenuItem | ZdsCollapsibleMenuItem;

const hasContent = (slot: HTMLSlotElement) =>
  slot
    .assignedNodes({ flatten: true })
    .some((n) => n.nodeType === Node.ELEMENT_NODE || (n.textContent ?? "").trim() !== "");

/**
 * A vertical navigation column for the edge of a desktop view: a narrow icon
 * rail or a wide labelled one, and an optional sub menu panel beside it.
 *
 * Locked to dark mode by default, whatever the page's mode; `inverse` locks
 * it to light (owner decision). The host takes the token layer's `mode-dark`
 * / `mode-light` class (added with `classList`, so a consumer's own classes
 * stay), which re-resolves every token on the host; the shadow tree and the
 * slotted content inherit them from there, and an `.ext-*` ancestor still
 * applies. Nothing in the rail family leaves the tree, so popups stay in mode.
 *
 * Regions are slots; the rail sets `expanded` / `show-label` on the
 * zds-navigation-rail-item and zds-navigation-header elements inside it, and
 * `shape` on every rail part inside it (items, headers, sub menu rows and
 * groups). Slotted controls it did not render — a zds-sub-menu-header's
 * actions — read `el.closest("zds-navigation-rail")?.shape` to match, as
 * with zds-table. It
 * owns the toggle item and wires it to `expanded` (spec: "Behaviour code
 * must own"), firing `zds-expanded-change`.
 *
 * A plain `<nav>` of links, every destination in the Tab order; groups are
 * zds-collapsible-menu-item disclosures — the same structure as the React
 * build (which uses Base UI Collapsible, not NavigationMenu).
 *
 * Figma's Show Header (wired to nothing) is dropped — the header shows when
 * slotted. Its per-Label Menu Slots and orphan Menu Slot#3200:20 are one
 * default slot; moreRailItems / moreFooterItems / showHeaderAction /
 * showSubMenu become "is the slot filled".
 *
 * @slot - The menu: zds-navigation-rail-item (and zds-divider). Absorbs the free height.
 * @slot header - Top of the rail: normally a zds-navigation-header.
 * @slot footer - Destinations pinned to the bottom, above the toggle item.
 * @slot sub-menu-header - The panel's title bar: a zds-sub-menu-header.
 * @slot sub-menu - The panel's rows: zds-sub-menu-item and zds-collapsible-menu-item.
 *
 * @fires zds-expanded-change - The toggle item was pressed. `detail.expanded` is the new value (already applied).
 * @fires zds-action - The header action was pressed.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json
 */
@customElement("zds-navigation-rail")
export class ZdsNavigationRail extends LitElement {
  static styles = railStyles;

  /** The wide rail, labels beside glyphs. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /**
   * Captions under the glyphs in the narrow rail (Figma's `Label`). With
   * `expanded` the labels show beside the glyphs anyway, so the combination
   * Figma never built simply works.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-labels" }) showLabels = false;

  /** The last footer item, which moves between narrow and wide. */
  @property({ type: Boolean, reflect: true, attribute: "show-toggle-item" }) showToggleItem = true;

  /** Toggle label in the narrow rail. */
  @property({ type: String, attribute: "expand-label" }) expandLabel = "Open";

  /** Toggle label in the wide rail. */
  @property({ type: String, attribute: "collapse-label" }) collapseLabel = "Close";

  /**
   * The corner shape of everything nested in the rail: slot items, groups,
   * the header action, and the buttons inside zds-navigation-header and
   * zds-sub-menu-header (including the back button). rounded = `radius/sm`,
   * sharp = `radius/none`. The rail itself has no corners and is unaffected.
   * Code-only — Figma has no counterpart.
   */
  @property({ type: String, reflect: true }) shape: NavigationRailShape = "rounded";

  /**
   * The rail is locked to dark mode (`mode-dark` on the host) whatever the
   * page's mode. `inverse` locks it to light (`mode-light`) instead. Either
   * way everything inside follows the rail, not the page. Code-only (owner
   * decision).
   */
  @property({ type: Boolean, reflect: true }) inverse = false;

  /** Accessible name of the `<nav>` landmark. */
  @property({ type: String, attribute: "nav-label" }) navLabel = "Main";

  /**
   * The header action's label — a create/compose entry point. Icon Button in
   * the narrow rail, Button in the wide one. Unset, there is no action.
   */
  @property({ type: String, attribute: "action-label" }) actionLabel: string | null = null;

  /** The header action's glyph. */
  @property({ type: String, attribute: "action-icon" }) actionIcon: IconName = "add-circle-outline";

  @state() private hasHeader = false;
  @state() private hasFooter = false;
  @state() private hasSubMenuHeader = false;
  @state() private hasSubMenu = false;

  protected render() {
    const showHeader = this.hasHeader || !!this.actionLabel;
    const showFooter = this.hasFooter || this.showToggleItem;
    const showPanel = this.hasSubMenuHeader || this.hasSubMenu;
    return html`<nav part="nav" class="root" aria-label=${this.navLabel}>
      <div part="rail" class="rail">
        <div class="header" ?hidden=${!showHeader}>
          <slot name="header" @slotchange=${this.#onSlot}></slot>
          ${this.actionLabel ? this.#action() : nothing}
        </div>
        <div part="menu" class="menu"><slot @slotchange=${this.#onSlot}></slot></div>
        <div part="footer" class="footer" ?hidden=${!showFooter}>
          <slot name="footer" @slotchange=${this.#onSlot}></slot>
          ${this.showToggleItem
            ? html`<zds-navigation-rail-item
                class="toggle"
                icon=${this.expanded ? "left-panel-close" : "left-panel-open"}
                label=${this.expanded ? this.collapseLabel : this.expandLabel}
                ?expanded=${this.expanded}
                ?show-label=${this.showLabels}
                shape=${this.shape}
                .toggleExpanded=${this.expanded}
                @click=${this.#toggle}
              ></zds-navigation-rail-item>`
            : nothing}
        </div>
      </div>
      <div part="panel" class="panel" ?hidden=${!showPanel}>
        <slot name="sub-menu-header" @slotchange=${this.#onSlot}></slot>
        <div class="sub-menu" ?hidden=${!this.hasSubMenu}><slot name="sub-menu" @slotchange=${this.#onSlot}></slot></div>
      </div>
    </nav>`;
  }

  #action() {
    // Size=large, Flavour=primary in both forms (spec). Figma pins
    // Shape=rounded; the rail's shape now sets it (owner decision: every
    // nested component follows the rail).
    return this.expanded
      ? html`<zds-button class="action" size="large" shape=${this.shape} flavour="primary" leading-icon=${this.actionIcon} @click=${this.#onAction}>${this.actionLabel}</zds-button>`
      : html`<zds-icon-button class="action" size="large" shape=${this.shape} flavour="primary" icon=${this.actionIcon} label=${this.actionLabel ?? ""} @click=${this.#onAction}></zds-icon-button>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.#syncMode();
  }

  protected willUpdate() {
    // Every update, not only when `inverse` changes: a framework that rewrites
    // the host's class attribute would otherwise drop the mode class.
    this.#syncMode();
  }

  protected updated() {
    this.#sync();
  }

  /**
   * Locked colour mode (owner decision). Only the rail sets it — no part
   * inside pins a mode of its own, so light and dark rules never meet. The
   * opposite class is removed, so a stray one can't win on source order.
   */
  #syncMode() {
    this.classList.toggle("mode-dark", !this.inverse);
    this.classList.toggle("mode-light", this.inverse);
  }

  /** Hand the rail's width form and shape down to the parts inside it (not into a nested rail). */
  #sync() {
    for (const el of this.querySelectorAll<RailPart>(RAIL_PARTS)) {
      if (el.closest("zds-navigation-rail") !== this) continue;
      el.shape = this.shape;
      if (el.localName === "zds-navigation-rail-item" || el.localName === "zds-navigation-header") {
        (el as ZdsNavigationRailItem | ZdsNavigationHeader).expanded = this.expanded;
      }
      if (el.localName === "zds-navigation-rail-item") (el as ZdsNavigationRailItem).showLabel = this.showLabels;
    }
  }

  #onSlot = (e: Event) => {
    const slot = e.target as HTMLSlotElement;
    const filled = hasContent(slot);
    switch (slot.name) {
      case "header": this.hasHeader = filled; break;
      case "footer": this.hasFooter = filled; break;
      case "sub-menu-header": this.hasSubMenuHeader = filled; break;
      case "sub-menu": this.hasSubMenu = filled; break;
    }
    this.#sync();
  };

  #toggle = () => {
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent("zds-expanded-change", { detail: { expanded: this.expanded }, bubbles: true, composed: true }));
  };

  #onAction = () => {
    this.dispatchEvent(new CustomEvent("zds-action", { bubbles: true, composed: true }));
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-navigation-rail": ZdsNavigationRail;
  }
}
