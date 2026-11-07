import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./user-profile.styles.js";
import "../avatar/avatar.js";
import "../icon/icon.js";

/**
 * The account control in a Global Header: a username, an avatar and a chevron
 * on a neutral ground. It is the header's dropdown trigger, so it reports
 * `aria-haspopup`, and `expanded` when the header passes it on.
 *
 * @slot avatar - A zds-avatar to show in place of the default, carrying any
 *   avatar property (type, icon, swatch-color, status…); its size stays xxsmall.
 *
 * Figma fixes the username and avatar as sample content; both are inputs here
 * (spec issue).
 *
 * @csspart control - The `<button>`.
 * @spec specs/global-header/global-header.spec.json
 */
@customElement("zds-user-profile")
export class ZdsUserProfile extends LitElement {
  static styles = styles;
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /** The person's name. */
  @property({ type: String }) username = "Username";

  /** Avatar photo. Without it the avatar shows `initials`. */
  @property({ type: String, attribute: "avatar-src" }) avatarSrc: string | null = null;

  /** Avatar initials, used when there is no photo. */
  @property({ type: String }) initials: string | null = null;

  /** Softens the control's corners. */
  @property({ type: Boolean, reflect: true }) rounded = false;

  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether the menu it opens is showing. */
  @property({ attribute: false }) expanded = false;

  /** A slotted zds-avatar keeps every property it is given except its size, which the control fixes. */
  #sizeAvatar(e: Event) {
    for (const el of (e.target as HTMLSlotElement).assignedElements({ flatten: true })) {
      if (el.localName === "zds-avatar") el.setAttribute("size", "xxsmall");
    }
  }

  protected render() {
    return html`
      <button
        part="control"
        class="control"
        type="button"
        ?disabled=${this.disabled}
        aria-haspopup="menu"
        aria-expanded=${this.expanded ? "true" : "false"}
      >
        <span class="username">${this.username}</span>
        <slot name="avatar" @slotchange=${this.#sizeAvatar}>
          <zds-avatar
            size="xxsmall"
            type=${this.avatarSrc ? "photo" : "initials"}
            src=${this.avatarSrc ?? nothing}
            initials=${this.initials ?? nothing}
            alt=""
            .showClose=${false}
            .showStatus=${false}
            .showRing=${false}
          ></zds-avatar>
        </slot>
        <zds-icon name="expand-more" size="small"></zds-icon>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-user-profile": ZdsUserProfile;
  }
}
