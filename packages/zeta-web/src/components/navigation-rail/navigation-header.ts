import { html, LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
import styles from "./navigation-header.styles.js";
import "../button/icon-button/icon-button.js";

/**
 * The Navigation Rail's header: a brand mark, and in the wide rail a title and a settings action. Collapsed it shows
 * the mark alone. Inside a `zeta-navigation-rail` the rail sets `expanded` and `rounded`.
 *
 * @slot mark - The brand mark: a `zeta-avatar` at size s (type avatar), or a logo (type logo).
 * @event action - Fired when the action is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54312
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-rail--docs
 */
@customElement("zeta-navigation-header")
export class ZetaNavigationHeader extends Contourable(LitElement) {
  /** Which mark the header carries. Both are slotted; the type sets the logo's framed height. */
  @property({ type: String, reflect: true }) type: "avatar" | "logo" = "avatar";

  /** The wide form, with title and action. Inside a rail, the rail sets it. */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** The title beside the mark (spec: title). */
  @property({ type: String }) headline = "";

  /** Shows the title. No effect when collapsed. */
  @property({ type: Boolean, attribute: "show-title" }) showTitle = true;

  /** Shows the settings action. No effect when collapsed. */
  @property({ type: Boolean, attribute: "show-icon-button" }) showIconButton = true;

  /** Accessible name of the action. */
  @property({ type: String, attribute: "action-label" }) actionLabel = "Settings";

  /** The action's glyph (a Zeta icon name). Settings by default; set any icon, with `action-label` to match. */
  @property({ type: String, attribute: "action-icon" }) actionIcon = "settings";

  protected render() {
    return html`<div class="brand">
        <slot name="mark"></slot>
        ${this.expanded && this.showTitle && this.headline ? html`<span class="title">${this.headline}</span>` : nothing}
      </div>
      ${
        this.expanded && this.showIconButton
          ? html`<zeta-icon-button
              size="small"
              flavor="subtle"
              shape=${this.rounded ? "rounded" : "sharp"}
              aria-label=${this.actionLabel}
              @click=${() => this.dispatchEvent(new CustomEvent("action", { bubbles: true, composed: true }))}
              >${this.actionIcon}</zeta-icon-button
            >`
          : nothing
      }`;
  }

  static styles = [styles, super.styles || []];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-navigation-header": ZetaNavigationHeader;
  }
}
