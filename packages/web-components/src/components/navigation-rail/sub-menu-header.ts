import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import { subMenuHeaderStyles } from "./navigation-rail.styles.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import type { NavigationRailShape } from "./navigation-rail.js";

export type SubMenuHeaderType = "default" | "sub-page";

/**
 * The title bar of a Navigation Rail's sub menu panel.
 *
 * Type=sub-page leads with a back Icon Button and sits it `space/sm` from the
 * title; Type=default leads with a glyph at `space/md`. `show-leading-icon`
 * hides either (Figma wires it in default only — spec warn). Inside
 * zds-navigation-rail the rail sets `shape`; slotted actions are yours —
 * read `this.closest("zds-navigation-rail")?.shape` to match.
 *
 * @slot actions - Trailing actions — zds-button or zds-icon-button. Replaces Figma's showTrailingActions + slot.
 * @fires zds-back - The back button was pressed (type="sub-page").
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Sub Menu Header)
 */
@customElement("zds-sub-menu-header")
export class ZdsSubMenuHeader extends LitElement {
  static styles = subMenuHeaderStyles;

  /** default: a leading glyph. sub-page: a back Icon Button (`arrow-back`). */
  @property({ type: String, reflect: true }) type: SubMenuHeaderType = "default";

  /** The panel's title (called `heading`, since `title` is the native tooltip). */
  @property({ type: String }) heading = "Sub Header";

  /** Leading glyph in type=default. Figma ships a `verified` placeholder. */
  @property({ type: String }) icon: IconName = "verified";

  /**
   * Shows the leading glyph / back button. Figma wires it in type=default
   * only (spec warn); here it works in both.
   */
  @property({ type: Boolean, attribute: "show-leading-icon" }) showLeadingIcon = true;

  /** Accessible name of the back button. */
  @property({ type: String, attribute: "back-label" }) backLabel = "Back";

  /** The back Icon Button's shape. Inside a zds-navigation-rail the rail's `shape` sets it. */
  @property({ type: String, reflect: true }) shape: NavigationRailShape = "rounded";

  /** Heading level of the title. */
  @property({ type: Number, attribute: "heading-level" }) headingLevel: 2 | 3 | 4 | 5 | 6 = 2;

  @state() private hasActions = false;

  protected render() {
    const lead = !this.showLeadingIcon
      ? nothing
      : this.type === "sub-page"
        ? // Icon Button Size=small, Flavour=subtle (spec, changed 2026-10-21);
          // Figma pins Shape=sharp, the rail's shape sets it (owner decision).
          html`<zds-icon-button
            part="back"
            class="back"
            size="small"
            flavour="subtle"
            shape=${this.shape}
            icon="arrow-back"
            label=${this.backLabel}
            @click=${this.#onBack}
          ></zds-icon-button>`
        : html`<zds-icon class="icon" name=${this.icon} size="medium"></zds-icon>`;
    return html`
      <div class="lead">
        ${lead}
        <div part="title" class="title" role="heading" aria-level=${this.headingLevel}>${this.heading}</div>
      </div>
      <div class="actions" ?hidden=${!this.hasActions}>
        <slot name="actions" @slotchange=${this.#onActions}></slot>
      </div>
    `;
  }

  #onActions = (e: Event) => {
    this.hasActions = (e.target as HTMLSlotElement).assignedElements({ flatten: true }).length > 0;
  };

  #onBack = () => {
    this.dispatchEvent(new CustomEvent("zds-back", { bubbles: true, composed: true }));
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-sub-menu-header": ZdsSubMenuHeader;
  }
}
