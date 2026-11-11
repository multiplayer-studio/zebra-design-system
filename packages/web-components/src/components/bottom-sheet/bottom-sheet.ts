import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./bottom-sheet.styles.js";
import "../card-footer/card-footer.js";
import "../icon-button/icon-button.js";
import { raiseScrim, lowerScrim } from "../scrim/scrim.js";
import { lockScroll, unlockScroll, deepActiveElement, firstFocusable } from "../dialog/dialog.js";
import { defaultTrue } from "../chip/chip.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type BottomSheetContentType = "list" | "grid" | "generic";
export type BottomSheetHeaderAlignment = "start" | "center";
/** Why a modal sheet closed. */
export type BottomSheetOpenChangeReason = "escape" | "backdrop" | "other";

/** A unique id for the title, so the sheet can name itself with it. */
const ID = () => `zds-bottom-sheet-${Math.random().toString(36).slice(2)}`;

/**
 * A surface anchored to the bottom edge of the screen, holding supplementary
 * content or a short set of actions. `content-type` lays out `zds-menu-item`
 * rows, `zds-grid-menu-item` tiles or anything else.
 *
 * By default it only draws the surface, and the screen presents it. With
 * `modal`, it presents itself: a native `<dialog>` anchored to the bottom of
 * the viewport over a `<zds-scrim>` (tone scrim), focus moved in and returned,
 * page scroll locked, and Escape or a scrim click closing it when
 * `dismissible`. It rises from the bottom edge (animations/smooth; none under
 * reduced motion). Figma defines no motion, so that is a code decision.
 *
 * Departures from Figma, each a spec issue:
 * - `heading`, `header-icon`, `show-leading-icon`, `header-alignment` and the
 *   `actions` slot are inputs, because Figma sets them on nested instances.
 * - The sheet fills its container (Figma ships a fixed 360).
 *
 * @slot - The items, laid out by `content-type`.
 * @slot actions - The footer actions, usually an outline and a primary `zds-button` at size small.
 * @csspart surface - The sheet.
 * @csspart handle - The drag affordance. It has no control behind it.
 * @fires zds-leading-click - The leading button was activated.
 * @fires zds-open-change - `{ open, reason }` when Escape or a scrim click closes a modal sheet. Not fired for a programmatic `open` change.
 * @csspart header - The title row.
 * @csspart content - The region holding the items.
 * @csspart footer - The `zds-card-footer`.
 *
 * @spec specs/bottom-sheet/bottom-sheet.spec.json
 */
@customElement("zds-bottom-sheet")
export class ZdsBottomSheet extends LitElement {
  static styles = styles;

  /** How the items are arranged. */
  @property({ type: String, reflect: true, attribute: "content-type" }) contentType: BottomSheetContentType = "list";

  /** The sheet's title and accessible name. Use a short noun phrase. */
  @property({ type: String }) heading = "Sheet Title";

  /** Glyph before the title. */
  @property({ type: String, attribute: "header-icon" }) headerIcon: IconName = "arrow-back";

  /** Show the glyph before the title. */
  @property({ type: Boolean, attribute: "show-leading-icon" }) showLeadingIcon = true;

  /** Accessible name of the leading button (spec issue: Figma has none). */
  @property({ type: String, attribute: "leading-label" }) leadingLabel = "Back";

  /** `center` centres the title and pins the icon to the leading edge. */
  @property({ type: String, reflect: true, attribute: "header-alignment" }) headerAlignment: BottomSheetHeaderAlignment = "start";

  /** Present the sheet at the bottom of the viewport over a scrim, with focus inside. Code only. */
  @property({ type: Boolean, reflect: true }) modal = false;

  /** Whether a modal sheet is shown. Reflected. */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Escape and a scrim click close a modal sheet. `dismissible="false"` when the sheet needs a decision. */
  @property({ type: Boolean, reflect: true, converter: defaultTrue }) dismissible = true;

  @state() private hasActions = false;

  @query("dialog") private dialogEl?: HTMLDialogElement;
  @query("zds-scrim") private scrimEl?: HTMLElement;
  private returnFocus: HTMLElement | null = null;
  private locked = false;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.locked) { unlockScroll(); this.locked = false; }
  }

  /** Opens a modal sheet (same as `open = true`). */
  show() { this.open = true; }

  /** Closes a modal sheet (same as `open = false`). */
  close() { this.open = false; }

  private setOpen(open: boolean, reason: BottomSheetOpenChangeReason) {
    if (this.open === open) return;
    this.open = open;
    this.dispatchEvent(new CustomEvent("zds-open-change", { detail: { open, reason }, bubbles: true, composed: true }));
  }

  private onKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    e.preventDefault();
    e.stopPropagation();
    if (this.dismissible) this.setOpen(false, "escape");
  };

  private onCancel = (e: Event) => {
    e.preventDefault();
    if (this.dismissible) this.setOpen(false, "escape");
  };

  // The ::backdrop hit-tests as the <dialog>; the dialog box is the sheet, so
  // a click outside it is a click on the scrim.
  private onDialogClick = (e: MouseEvent) => {
    const dlg = this.dialogEl;
    if (!dlg || e.target !== dlg || !this.dismissible) return;
    const r = dlg.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) this.setOpen(false, "backdrop");
  };

  protected updated(changed: PropertyValues<this>) {
    if (changed.has("open") || changed.has("modal")) this.syncDialog();
  }

  private syncDialog() {
    const dlg = this.dialogEl;
    if (!this.modal || !dlg) {
      if (this.locked) { unlockScroll(); this.locked = false; }
      return;
    }
    if (!this.open) lowerScrim(this.scrimEl);
    if (this.open && !dlg.open) {
      this.returnFocus = deepActiveElement();
      raiseScrim(this.scrimEl);
      dlg.showModal();
      if (!this.locked) { lockScroll(); this.locked = true; }
      (firstFocusable(dlg.childNodes) ?? dlg).focus();
    } else if (!this.open && dlg.open) {
      dlg.close();
      if (this.locked) { unlockScroll(); this.locked = false; }
      const back = this.returnFocus;
      this.returnFocus = null;
      if (back?.isConnected) back.focus();
    }
  }

  #titleId = ID();

  #onActions(event: Event) {
    this.hasActions = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
  }

  protected render() {
    const surface = html`
      <section part="surface" class="surface" aria-labelledby=${this.#titleId}>
        <div part="handle" class="handle"><span class="bar"></span></div>
        <div part="header" class="header">
          ${this.showLeadingIcon ? html`<zds-icon-button
                class="icon"
                flavour="subtle"
                size="small"
                shape="rounded"
                icon=${this.headerIcon}
                .label=${this.leadingLabel}
                @click=${() => this.dispatchEvent(new CustomEvent("zds-leading-click", { bubbles: true, composed: true }))}
              ></zds-icon-button>` : nothing}
          <h2 id=${this.#titleId} class="title">${this.heading}</h2>
        </div>
        <div part="content" class="content"><slot></slot></div>
        <zds-card-footer part="footer" class="footer" ?hidden=${!this.hasActions}>
          <slot name="actions" @slotchange=${this.#onActions}></slot>
        </zds-card-footer>
      </section>
    `;
    if (!this.modal) return surface;
    return html`<zds-scrim popover="manual" tone="scrim"></zds-scrim><dialog class="sheet" aria-labelledby=${this.#titleId}
      @keydown=${this.onKeydown} @cancel=${this.onCancel} @click=${this.onDialogClick}>${surface}</dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-bottom-sheet": ZdsBottomSheet;
  }
}
