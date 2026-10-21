import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { headerStyles } from "./navigation-rail.styles.js";
import type { NavigationRailShape } from "./navigation-rail.js";
import "../avatar/avatar.js";
import "../icon/icon.js";
import "../icon-button/icon-button.js";

export type NavigationHeaderType = "avatar" | "logo";

/**
 * The top of a Navigation Rail: an avatar or logo mark, and in the wide form
 * a title and a settings action. Inside zds-navigation-rail the rail sets
 * `expanded` and `shape`.
 *
 * @fires zds-action - The settings action was pressed.
 *
 * @spec specs/navigation-rail/navigation-rail.spec.json (subcomponents › Navigation Header)
 */
@customElement("zds-navigation-header")
export class ZdsNavigationHeader extends LitElement {
  static styles = headerStyles;

  /** The mark: the user's Avatar, or the `zebra` logo glyph. */
  @property({ type: String, reflect: true }) type: NavigationHeaderType = "avatar";

  /** The wide form, with title and action. */
  @property({ type: Boolean, reflect: true }) expanded = true;

  /** The product or user name beside the mark (called `heading`, since `title` is the native tooltip), in the wide form. */
  @property({ type: String }) heading = "Title";

  /** Shows the title (wide form only). */
  @property({ type: Boolean, attribute: "show-title" }) showTitle = true;

  /** Shows the trailing settings Icon Button (wide form only). */
  @property({ type: Boolean, attribute: "show-icon-button" }) showIconButton = true;

  /** Accessible name of the action. */
  @property({ type: String, attribute: "action-label" }) actionLabel = "Settings";

  /** The settings Icon Button's shape. Inside a zds-navigation-rail the rail's `shape` sets it. */
  @property({ type: String, reflect: true }) shape: NavigationRailShape = "rounded";

  /** Avatar initials (type=avatar). */
  @property({ type: String, attribute: "avatar-initials" }) avatarInitials = "ZB";

  /** Avatar photo (type=avatar). */
  @property({ type: String, attribute: "avatar-src" }) avatarSrc: string | null = null;

  protected render() {
    return html`
      <div class="brand">
        ${this.type === "avatar"
          ? html`<!-- Avatar Size=small, status on, ring and close off (spec). -->
              <zds-avatar
                size="small"
                type=${this.avatarSrc ? "photo" : "initials"}
                .src=${this.avatarSrc}
                .initials=${this.avatarInitials}
                .alt=${this.heading}
                .showStatus=${true}
                .showRing=${false}
                .showClose=${false}
              ></zds-avatar>`
          : html`<!-- Icon Size=large, Framed (spec: height control/target-min). -->
              <zds-icon class="logo" name="zebra" size="large" framed .label=${this.expanded ? null : this.heading}></zds-icon>`}
        ${this.expanded && this.showTitle ? html`<span part="title" class="title">${this.heading}</span>` : nothing}
      </div>
      ${this.expanded && this.showIconButton
        ? // Figma pins Shape=sharp; the rail's shape sets it (owner decision).
          html`<zds-icon-button flavour="subtle" size="small" shape=${this.shape} icon="settings" label=${this.actionLabel} @click=${this.#onAction}></zds-icon-button>`
        : nothing}
    `;
  }

  #onAction = () => {
    this.dispatchEvent(new CustomEvent("zds-action", { bubbles: true, composed: true }));
  };
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-navigation-header": ZdsNavigationHeader;
  }
}
