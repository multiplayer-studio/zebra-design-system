import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import styles from "./navigation-drawer.styles.js";
import "../button/button.js";
import "../scrim/scrim.js";
import { raiseScrim, lowerScrim } from "../scrim/scrim.js";
import { lockScroll, unlockScroll, deepActiveElement, firstFocusable } from "../dialog/dialog.js";
import { defaultTrue } from "../chip/chip.js";
import type { NavigationRailShape } from "../navigation-rail/navigation-rail.js";
import type { ZdsNavigationHeader } from "../navigation-rail/navigation-header.js";

/** Which edge the drawer comes from. `start` is the left edge in a left-to-right page. */
export type NavigationDrawerSide = "start" | "end";
/** Why the drawer opened or closed. `navigate` is a destination being chosen. */
export type NavigationDrawerOpenChangeReason = "close" | "escape" | "backdrop" | "navigate";

const PARTS = "zds-sub-menu-item, zds-collapsible-menu-item, zds-navigation-header";
/** Rows that navigate. A group header (zds-collapsible-menu-item) never does. */
const DESTINATIONS = new Set(["zds-sub-menu-item", "zds-navigation-rail-item", "a"]);

/**
 * The app's destinations in a tall panel at the edge of the screen, opened
 * from a menu button.
 *
 * Built from the Navigation Rail family, with no new parts: a
 * `zds-navigation-header` in the `header` slot, then `zds-sub-menu-item`
 * rows, `zds-collapsible-menu-item` groups and `zds-divider` in the menu and
 * footer. The drawer hands them its `shape` and the header its wide form.
 * It follows the page's colour mode (unlike the rail, it is not locked).
 *
 * `modal` (default): a native `<dialog>` at the screen's edge over a
 * `<zds-scrim>` (tone scrim). Focus moves in and returns, page scroll is
 * locked, and Escape, a scrim click, the header's close button or a chosen
 * destination closes it. It slides in from its edge (animations/smooth;
 * none under reduced motion).
 * `modal="false"`: a standard drawer in the layout. Closed, it narrows to
 * nothing and is inert.
 *
 * Scrolling: only the header is frozen (sticky). The menu never scrolls on
 * its own and the footer is never pinned. The standard drawer grows with its
 * content and the page scrolls it; the modal drawer scrolls as one surface
 * with no scrollbar.
 *
 * With `show-close` (default) the header's icon button is the close button:
 * the drawer sets its glyph to `close` and its label to `close-label`.
 *
 * @slot header - A `zds-navigation-header`. Sticky.
 * @slot - The menu: `zds-sub-menu-item`, `zds-collapsible-menu-item`, `zds-divider`.
 * @slot footer - More rows after the menu (settings, help). Not pinned.
 * @csspart panel - The drawer surface.
 * @fires zds-open-change - `{ open, reason }` when the drawer closes itself. Not fired for a programmatic `open` change.
 * @fires zds-action - The header action button was pressed.
 * @cssprop --zds-navigation-drawer-width - The drawer's width; 320px by default (no width token exists).
 *
 * @spec specs/navigation-drawer/navigation-drawer.spec.json
 */
@customElement("zds-navigation-drawer")
export class ZdsNavigationDrawer extends LitElement {
  static styles = styles;

  /** Slides over the page on a Scrim. `modal="false"` sits in the layout and pushes the content. */
  @property({ type: Boolean, reflect: true, converter: defaultTrue }) modal = true;

  /** Whether the drawer is shown. Reflected. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** The edge it comes from. Code only. */
  @property({ type: String, reflect: true }) side: NavigationDrawerSide = "start";

  /** Corner shape of the rows, groups and buttons inside. The drawer itself is never rounded. Code only. */
  @property({ type: String, reflect: true }) shape: NavigationRailShape = "rounded";

  /** Escape and a scrim click close a modal drawer. Code only. */
  @property({ type: Boolean, reflect: true, converter: defaultTrue }) dismissible = true;

  /** Choosing a destination closes a modal drawer. Opening a group never does. Code only. */
  @property({ type: Boolean, attribute: "close-on-navigate", converter: defaultTrue }) closeOnNavigate = true;

  /** The header's icon button becomes the close button (Figma's Show Icon Button on the exposed header). */
  @property({ type: Boolean, attribute: "show-close", converter: defaultTrue }) showClose = true;

  /** Accessible name of the close button. */
  @property({ type: String, attribute: "close-label" }) closeLabel = "Close navigation";

  /** Accessible name of the `<nav>` landmark, and of the modal drawer. */
  @property({ type: String, attribute: "nav-label" }) navLabel = "Main";

  /** A full-width primary Button under the header (Figma's Show Action). Unset, there is none. */
  @property({ type: String, attribute: "action-label" }) actionLabel: string | null = null;

  /** The action's glyph. */
  @property({ type: String, attribute: "action-icon" }) actionIcon: IconName = "add-circle-outline";

  /** Whether the header region has anything in it; empty, it only keeps the top padding. */
  @state() private hasHeader = false;

  @query("dialog") private dialogEl?: HTMLDialogElement;
  @query("zds-scrim") private scrimEl?: HTMLElement;
  private returnFocus: HTMLElement | null = null;
  private locked = false;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.locked) { unlockScroll(); this.locked = false; }
  }

  /** Opens the drawer (same as `open = true`). */
  show() { this.open = true; }

  /** Closes the drawer (same as `open = false`). */
  close() { this.open = false; }

  #setOpen(open: boolean, reason: NavigationDrawerOpenChangeReason) {
    if (this.open === open) return;
    this.open = open;
    this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open, reason }, bubbles: true, composed: true }));
  }

  protected updated(changed: PropertyValues<this>) {
    this.#sync();
    if (changed.has("open") || changed.has("modal")) this.#syncDialog();
  }

  /** Shape onto every rail part inside; the header gets the wide form and, with show-close, becomes the close. */
  #sync() {
    for (const el of this.querySelectorAll<HTMLElement & { shape: NavigationRailShape }>(PARTS)) {
      if (el.closest("zds-navigation-drawer") !== this) continue;
      el.shape = this.shape;
      if (el.localName === "zds-navigation-header") {
        const h = el as unknown as ZdsNavigationHeader;
        h.expanded = true;
        if (this.showClose) {
          h.showIconButton = true;
          h.actionIcon = "close";
          h.actionLabel = this.closeLabel;
        }
      }
    }
  }

  #syncDialog() {
    const dlg = this.dialogEl;
    if (!this.modal || !dlg) {
      if (this.locked) { unlockScroll(); this.locked = false; }
      return;
    }
    if (this.open && !dlg.open) {
      this.returnFocus = deepActiveElement();
      raiseScrim(this.scrimEl);
      dlg.showModal();
      if (!this.locked) { lockScroll(); this.locked = true; }
      (firstFocusable(dlg.childNodes) ?? dlg).focus();
    } else if (!this.open && dlg.open) {
      lowerScrim(this.scrimEl);
      dlg.close();
      if (this.locked) { unlockScroll(); this.locked = false; }
      const back = this.returnFocus;
      this.returnFocus = null;
      if (back?.isConnected) back.focus();
    }
  }

  #onKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    e.preventDefault();
    e.stopPropagation();
    if (this.dismissible) this.#setOpen(false, "escape");
  };

  #onCancel = (e: Event) => {
    e.preventDefault();
    if (this.dismissible) this.#setOpen(false, "escape");
  };

  // The ::backdrop hit-tests as the <dialog>; a click outside the drawer's
  // box is a click on the scrim.
  #onDialogClick = (e: MouseEvent) => {
    const dlg = this.dialogEl;
    if (dlg && e.target === dlg) {
      const r = dlg.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) { if (this.dismissible) this.#setOpen(false, "backdrop"); return; }
    }
    if (!this.closeOnNavigate) return;
    for (const n of e.composedPath()) {
      if (n === this) return;
      if (!(n instanceof HTMLElement)) continue;
      // The header (close button handled by zds-action), the action and group headers never navigate.
      if (n.localName === "zds-navigation-header" || n.localName === "zds-collapsible-menu-item" || n.classList.contains("action")) return;
      if (DESTINATIONS.has(n.localName) && (n.localName !== "a" || n.hasAttribute("href"))) {
        if (n.hasAttribute("disabled") || n.getAttribute("aria-disabled") === "true") return;
        this.#setOpen(false, "navigate");
        return;
      }
    }
  };

  // zds-navigation-header fires zds-action from its icon button: with show-close, that is the close.
  #onHeaderAction = (e: Event) => {
    if (!this.showClose) return;
    e.stopPropagation();
    this.#setOpen(false, "close");
  };

  #onHeaderSlot = (e: Event) => {
    this.hasHeader = (e.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
    this.#sync();
  };

  #onAction = () => {
    this.dispatchEvent(new CustomEvent("zds-action", { bubbles: true, composed: true }));
  };

  protected render() {
    const panel = html`<nav part="panel" class="panel" aria-label=${this.navLabel}>
      <div class="header" ?data-empty=${!this.hasHeader && !this.actionLabel}>
        <slot name="header" @slotchange=${this.#onHeaderSlot} @zds-action=${this.#onHeaderAction}></slot>
        ${this.actionLabel
          ? html`<zds-button class="action" size="large" shape=${this.shape} flavour="primary" leading-icon=${this.actionIcon} @click=${this.#onAction}>${this.actionLabel}</zds-button>`
          : nothing}
      </div>
      <div class="menu"><slot @slotchange=${() => this.#sync()}></slot></div>
      <div class="footer"><slot name="footer" @slotchange=${() => this.#sync()}></slot></div>
    </nav>`;
    if (!this.modal) {
      return html`<div class="standard" ?inert=${!this.open}>${panel}</div>`;
    }
    return html`<zds-scrim popover="manual" tone="scrim"></zds-scrim><dialog class="drawer" aria-label=${this.navLabel}
      @keydown=${this.#onKeydown} @cancel=${this.#onCancel} @click=${this.#onDialogClick}>${panel}</dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-navigation-drawer": ZdsNavigationDrawer;
  }
}
