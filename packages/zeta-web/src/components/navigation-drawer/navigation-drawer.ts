import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./navigation-drawer.styles.js";
import { Contourable, Popup } from "../../mixins/mixins.js";
import { ZetaPopupEvent } from "../../events.js";
import "../scrim/scrim.js";
import "../button/button.js";

export * from "./navigation-drawer-footer/navigation-drawer-footer.js";
export * from "./navigation-drawer-header/navigation-drawer-header.js";
export * from "./navigation-drawer-item/navigation-drawer-item.js";
export * from "./navigation-drawer-sub-item/navigation-drawer-sub-item.js";

type DrawerPart = HTMLElement & {
  rounded?: boolean;
  expanded?: boolean;
  showIconButton?: boolean;
  actionIcon?: string;
  actionLabel?: string;
};

/** The rail parts the drawer hands its shape to (spec: everything inside follows `shape`). */
const PARTS = "zeta-sub-menu-item, zeta-collapsible-menu-item, zeta-navigation-header, zeta-navigation-rail-item";
/** Rows that navigate; a group header (zeta-collapsible-menu-item) never does. */
const DESTINATIONS = new Set([
  "zeta-sub-menu-item",
  "zeta-navigation-rail-item",
  "zeta-navigation-drawer-item",
  "zeta-navigation-drawer-sub-item",
  "a"
]);

/** A boolean that defaults to true: only the attribute value "false" turns it off. */
const defaultTrue = {
  fromAttribute: (v: string | null) => v !== "false",
  toAttribute: (v: boolean) => (v ? "" : "false")
};

/**
 * The app's destinations in a tall panel at the edge of the screen, opened from a menu button.
 *
 * Built from the Navigation Rail family: a `zeta-navigation-header` in the `header` slot, then `zeta-sub-menu-item`
 * rows, `zeta-collapsible-menu-item` groups and `zeta-divider` in the menu and footer. The drawer hands them its
 * `rounded` and the header its wide form. It follows the page's theme.
 *
 * Modal (default): a dialog at the screen's edge over a `zeta-scrim` (tone scrim), opened with `show()` or
 * `showModal()`. Escape, a scrim click, the header's close button or a chosen destination closes it. With
 * `modal="false"` it is a standard drawer in the layout, opened with `show()`; closed, it narrows to nothing.
 *
 * Only the header is frozen (sticky). The menu never scrolls on its own and the footer follows it.
 *
 * The legacy `zeta-navigation-drawer-header`, `-item`, `-sub-item` and `-footer` still slot in, but are deprecated:
 * use the Navigation Rail family's parts.
 *
 * @slot - The menu: `zeta-sub-menu-item`, `zeta-collapsible-menu-item`, `zeta-divider`.
 * @slot header - A `zeta-navigation-header`. Sticky.
 * @slot footer - More rows after the menu (settings, help). Not pinned.
 *
 * @part dialog - The drawer surface.
 *
 * @event open - The drawer opened.
 * @event close - The drawer closed. `returnValue` is "close", "navigate" or "cancel".
 * @event cancel - Escape or a scrim click dismissed it.
 * @event action - The header action button was pressed.
 *
 * @cssproperty --navigation-drawer-width - The drawer's width; 320px by default (no width token exists).
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8255-1584
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-drawer--docs
 */
@customElement("zeta-navigation-drawer")
export class ZetaNavigationDrawer extends Contourable(Popup(LitElement)) {
  /** The side of the screen that the drawer is anchored on (spec `side`: left = start, right = end). */
  @property({ type: String, reflect: true }) anchor: "left" | "right" = "left";

  /** Toggles the animation for the navigation drawer. */
  @property({ type: Boolean, reflect: true }) showAnimation: boolean = true;

  /** Whether the drawer is initially open. */
  @property({ type: Boolean }) initialOpen: boolean = false;

  /** Slides over the page on a scrim. `false` is a standard drawer that sits in the layout and pushes the content. */
  @property({ type: Boolean, reflect: true, converter: defaultTrue }) modal: boolean = true;

  /** Escape and a scrim click close a modal drawer. */
  @property({ type: Boolean, converter: defaultTrue }) dismissible: boolean = true;

  /** Choosing a destination closes a modal drawer. Opening a group never does. */
  @property({ type: Boolean, attribute: "close-on-navigate", converter: defaultTrue }) closeOnNavigate: boolean = true;

  /** The header's icon button becomes the close button. */
  @property({ type: Boolean, attribute: "show-close", converter: defaultTrue }) showClose: boolean = true;

  /** Accessible name of the close button. */
  @property({ type: String, attribute: "close-label" }) closeLabel: string = "Close navigation";

  /** Accessible name of the navigation landmark and of the modal drawer. */
  @property({ type: String, attribute: "nav-label" }) navLabel: string = "Main";

  /** A full-width primary button under the header. Unset, there is none. */
  @property({ type: String, attribute: "action-label" }) actionLabel?: string;

  /** The action's icon (Zeta icon name). */
  @property({ type: String, attribute: "action-icon" }) actionIcon: string = "add_circle_outline";

  @state() private hasHeader = false;

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  /**
   * Popup's opener, made to follow `modal`: `show()` and `showModal()` both open a modal drawer in the top layer over
   * its scrim, and a standard drawer in place.
   */
  async _show(_isModal: boolean) {
    await this.updateComplete;
    const dialog = this.shadowRoot?.querySelector("dialog");
    if (!dialog) return;
    if (this.modal) {
      const scrim = this.shadowRoot?.querySelector("zeta-scrim");
      if (scrim && !scrim.matches(":popover-open")) scrim.showPopover();
      dialog.showModal();
    } else {
      dialog.show();
    }
    this.dispatchEvent(new ZetaPopupEvent("open").toEvent());
  }

  protected override willUpdate() {
    this.closeOnBarrierClicked = this.dismissible;
  }

  protected override firstUpdated() {
    if (this.initialOpen) void this.show();
  }

  protected override updated() {
    this.syncParts();
  }

  /** Shape onto every rail part inside; the header gets the wide form and, with show-close, becomes the close. */
  private syncParts() {
    for (const el of this.querySelectorAll<DrawerPart>(PARTS)) {
      if (el.closest("zeta-navigation-drawer") !== this) continue;
      el.rounded = this.rounded;
      if (el.localName === "zeta-navigation-header") {
        el.expanded = true;
        if (this.showClose) {
          el.showIconButton = true;
          el.actionIcon = "close";
          el.actionLabel = this.closeLabel;
        }
      }
    }
  }

  private onHeaderSlot = (e: Event) => {
    this.hasHeader = (e.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
    this.syncParts();
  };

  private onHeaderAction = (e: Event) => {
    if (!this.showClose) return;
    e.stopPropagation();
    void this.hide("close");
  };

  private onActionClick = () => this.dispatchEvent(new CustomEvent("action", { bubbles: true, composed: true }));

  private onCloseEvent = () => {
    const scrim = this.shadowRoot?.querySelector("zeta-scrim");
    if (scrim?.matches(":popover-open")) scrim.hidePopover();
    this.dispatchEvent(new Event("close"));
  };

  private onCancelEvent = (e: Event) => {
    if (!this.dismissible) e.preventDefault();
    this.dispatchEvent(new Event("cancel"));
  };

  private onClick = (e: MouseEvent) => {
    this.onBarrierClicked(e);
    if (!this.modal || !this.closeOnNavigate) return;
    for (const n of e.composedPath()) {
      if (n === this) return;
      if (!(n instanceof HTMLElement)) continue;
      if (
        n.localName === "zeta-navigation-header" ||
        n.localName === "zeta-collapsible-menu-item" ||
        n.classList.contains("action")
      )
        return;
      if (DESTINATIONS.has(n.localName) && (n.localName !== "a" || n.hasAttribute("href"))) {
        if (n.hasAttribute("disabled") || n.getAttribute("aria-disabled") === "true") return;
        void this.hide("navigate");
        return;
      }
    }
  };

  protected override render() {
    return html`
      ${this.modal ? html`<zeta-scrim popover="manual" tone="scrim"></zeta-scrim>` : nothing}
      <dialog
        class="navigation-drawer"
        part="dialog"
        id=${this.id}
        aria-label=${this.navLabel}
        @click=${this.onClick}
        @cancel=${this.onCancelEvent}
        @close=${this.onCloseEvent}
      >
        <nav class="panel" aria-label=${this.navLabel}>
          <div class="header" ?data-empty=${!this.hasHeader && !this.actionLabel}>
            <slot name="header" @slotchange=${this.onHeaderSlot} @action=${this.onHeaderAction}></slot>
            ${
              this.actionLabel
                ? html`<zeta-button
                    class="action"
                    size="large"
                    flavor="primary"
                    shape=${this.rounded ? "rounded" : "sharp"}
                    .leadingIcon=${this.actionIcon}
                    @click=${this.onActionClick}
                    >${this.actionLabel}</zeta-button
                  >`
                : nothing
            }
          </div>
          <div class="menu"><slot @slotchange=${() => this.syncParts()}></slot></div>
          <div class="footer"><slot name="footer" @slotchange=${() => this.syncParts()}></slot></div>
        </nav>
      </dialog>
    `;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-drawer": ZetaNavigationDrawer;
  }
}
