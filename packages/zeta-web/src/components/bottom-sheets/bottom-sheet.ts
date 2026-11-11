import { html, LitElement, nothing, type PropertyValues } from "lit";
import { customElement, property, query, queryAssignedElements, state } from "lit/decorators.js";
import styles from "./bottom-sheet.styles.js";
import { type ZetaIconName } from "@zebra-fed/zeta-icons";
import { ZetaGridMenuItem } from "../grid-menu-item/grid-menu-item.js";
import { ZetaListItem } from "../list/list.js";
import { ZetaDropdownMenuItem } from "../dropdown/menu-item/dropdown-menu-item.js";
import "../card/card-footer/card-footer.js";
import "../button/icon-button/icon-button.js";
import "../scrim/scrim.js";
import { ZetaPopupEvent } from "../../events.js";

/** A surface anchored to the bottom edge of the screen, holding supplementary content or a short set of actions. It
 * lays out list rows, a grid of tiles three to a row, or generic content, and works out which from what is slotted
 * unless `contentType` says. By default the screen presents the sheet. With `modal`, it presents itself: pinned to the
 * bottom of the viewport over a `zeta-scrim` (tone scrim), focus moved in, and Escape or a scrim click closing it while
 * `dismissible`. Call `show()` and `hide()`, or set `open`.
 *
 * @slot - Content: `zeta-dropdown-menu-item` or `zeta-list-item` rows, `zeta-grid-menu-item` tiles, or anything else.
 * @slot actions - The footer actions, usually an outline and a primary `zeta-button` at size small.
 * @cssproperty --bottom-sheet-max-height - Caps the sheet's height. Figma defines no cap, so this is a Zeta extension. Defaults to 90vh.
 *
 * @event leading-click - The leading button was activated.
 * @event open - A modal sheet opened.
 * @event close - A modal sheet closed, by `hide()`, Escape or a scrim click.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-3343
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-bottom-sheet--docs
 */
@customElement("zeta-bottom-sheet")
export class ZetaBottomSheet extends LitElement {
  /** Sheet Header alignment.*/
  @property({ type: String, reflect: true }) headerAlignment: "start" | "center" = "start";

  /** Sheet Header text content.*/
  @property({ type: String, reflect: true }) headerText: string = "Title";

  /** Glyph before the title. Unset shows none, as this element always has. */
  @property({ type: String }) headerIcon?: ZetaIconName;

  /** Accessible name of the leading button (spec issue: Figma has none). */
  @property({ type: String }) leadingLabel: string = "Back";

  /** How the items are arranged. Unset works it out from what is slotted. */
  @property({ type: String, reflect: true }) contentType?: "list" | "grid" | "generic";

  /** If the items are list items or grid items */
  @state() isGrid: boolean = false;

  /** If the content is generic. E.g. not list or grid items. */
  @state() isGenericContent: boolean = false;

  /** If the bottom sheet is collapsed or not */
  @property({ type: Boolean, reflect: true }) isExpanded: boolean = true;

  /** Present the sheet at the bottom of the viewport over a scrim, with focus inside. Code only (spec: modal). */
  @property({ type: Boolean, reflect: true }) modal: boolean = false;
  /** Whether a modal sheet is shown. */
  @property({ type: Boolean, reflect: true }) open: boolean = false;
  /** Escape and a scrim click close a modal sheet. Set the property to false when the sheet needs a decision. */
  @property({ type: Boolean }) dismissible: boolean = true;
  @query("dialog") private readonly dialog?: HTMLDialogElement | null;
  @query("zeta-scrim") private readonly scrim?: HTMLElement | null;

  /** Opens a modal sheet. */
  show() {
    this.open = true;
  }

  /** Closes a modal sheet. */
  hide() {
    this.open = false;
  }

  private onCancel = (e: Event) => {
    e.preventDefault();
    if (this.dismissible) this.hide();
  };

  // The ::backdrop hit-tests as the dialog, which is the sheet's own box, so a click outside it is on the scrim.
  private onDialogClick = (e: MouseEvent) => {
    if (!this.dialog || e.target !== this.dialog || !this.dismissible) return;
    const { left, right, top, bottom } = this.dialog.getBoundingClientRect();
    if (e.clientX < left || e.clientX > right || e.clientY < top || e.clientY > bottom) this.hide();
  };

  protected override updated(changed: PropertyValues<this>) {
    if (!changed.has("open") && !changed.has("modal")) return;
    const dialog = this.dialog;
    if (!this.modal || !dialog) return;
    if (this.open && !dialog.open) {
      // The scrim joins the top layer first, so the sheet lands directly above it.
      if (this.scrim && !this.scrim.matches(":popover-open")) this.scrim.showPopover();
      dialog.showModal();
      this.dispatchEvent(new ZetaPopupEvent("open").toEvent());
    } else if (!this.open && dialog.open) {
      dialog.close();
      if (this.scrim?.matches(":popover-open")) this.scrim.hidePopover();
      this.dispatchEvent(new Event("close"));
    }
  }

  /** Default slot */
  @queryAssignedElements({ flatten: true }) items: NodeList | undefined;

  static styles = [super.styles ?? [], styles];

  private setLayout = () => {
    const first = this.items?.[0];
    const type =
      this.contentType ??
      (first instanceof ZetaGridMenuItem ? "grid" : first instanceof ZetaListItem || first instanceof ZetaDropdownMenuItem ? "list" : "generic");
    this.isGrid = type === "grid";
    this.isGenericContent = type === "generic";
    if (this.isGrid) this.items?.forEach(item => item instanceof ZetaGridMenuItem && (item.tile = true));
  };

  /** Footer actions are slotted */
  @state() private hasActions: boolean = false;

  private onActions = (event: Event) => {
    this.hasActions = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
  };

  private renderLeading() {
    if (!this.headerIcon) return nothing;
    return html`<zeta-icon-button
      class="header-icon"
      size="small"
      shape="rounded"
      flavor="subtle"
      aria-label=${this.leadingLabel}
      @click=${() => this.dispatchEvent(new CustomEvent("leading-click", { bubbles: true, composed: true }))}
      >${this.headerIcon}</zeta-icon-button
    >`;
  }

  protected override willUpdate() {
    this.setLayout();
  }

  protected override render() {
    const sheet = html`
      <section class="container" aria-labelledby="title">
        <div class="handle-row"><div class="handle"></div></div>
        <div class="header">
          ${this.renderLeading()}
          <h2 id="title" class="title">${this.headerText}</h2>
        </div>
        <div class="content ${this.isGenericContent ? "isGenericContent" : ""}${this.isGrid ? "isGrid" : ""}" tabindex="0">
          <slot @slotchange=${this.setLayout}></slot>
        </div>
        <zeta-card-footer class="footer" ?hidden=${!this.hasActions}><slot name="actions" @slotchange=${this.onActions}></slot></zeta-card-footer>
      </section>
    `;
    if (!this.modal) return sheet;
    return html`<zeta-scrim popover="manual" tone="scrim"></zeta-scrim>
      <dialog class="sheet" aria-labelledby="title" @cancel=${this.onCancel} @click=${this.onDialogClick}>${sheet}</dialog>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "zeta-bottom-sheet": ZetaBottomSheet;
  }
}
