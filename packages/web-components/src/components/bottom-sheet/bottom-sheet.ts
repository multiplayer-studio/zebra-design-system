import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./bottom-sheet.styles.js";
import "../card-footer/card-footer.js";
import "../icon-button/icon-button.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type BottomSheetContentType = "list" | "grid" | "generic";
export type BottomSheetHeaderAlignment = "start" | "center";

/** A unique id for the title, so the sheet can name itself with it. */
const ID = () => `zds-bottom-sheet-${Math.random().toString(36).slice(2)}`;

/**
 * A surface anchored to the bottom edge of the screen, holding supplementary
 * content or a short set of actions. `content-type` lays out `zds-menu-item`
 * rows, `zds-grid-menu-item` tiles or anything else.
 *
 * It only draws the surface. Presenting it, the scrim, moving focus in and
 * dismissing it all belong to the screen, and Figma defines no motion, shadow
 * or height cap.
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

  @state() private hasActions = false;

  #titleId = ID();

  #onActions(event: Event) {
    this.hasActions = (event.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
  }

  protected render() {
    return html`
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
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-bottom-sheet": ZdsBottomSheet;
  }
}
