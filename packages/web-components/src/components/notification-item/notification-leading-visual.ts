import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { IconName } from "@zebra-design-system/icons/names";
import "../avatar/avatar.js";
import "../icon/icon.js";
import styles from "./notification-leading-visual.styles.js";

export type NotificationLeadingFlavour = "avatar" | "image" | "icon";

/**
 * The private `_Leading Visual` part of `<zds-notification-item>`: a circular
 * control/sm slot holding an Avatar, an image or an Icon. Registered by the
 * item and not exported from the package — the flavour is chosen through the
 * item's `leading`.
 *
 * Decorative in all three flavours (spec accessibility: it carries no text),
 * so the item's heading has to name the source.
 *
 * Spec: specs/notification-item/notification-item.spec.json (subcomponents)
 */
@customElement("zds-notification-leading-visual")
export class ZdsNotificationLeadingVisual extends LitElement {
  static styles = styles;

  @property({ type: String, reflect: true }) flavour: NotificationLeadingFlavour = "avatar";
  /** avatar: the photo (initials are shown without one). image: the artwork. */
  @property({ type: String }) src: string | null = null;
  /** avatar: shown when there is no `src`. */
  @property({ type: String }) initials: string | null = null;
  /** icon: the glyph. */
  @property({ type: String }) icon: IconName = "verified";

  protected updated() {
    this.setAttribute("aria-hidden", "true");
    // The artwork is the slot's own background (spec: "a background rather
    // than a separate element"). A content URL, not a themed value.
    if (this.flavour === "image" && this.src) this.style.backgroundImage = `url("${this.src}")`;
    else this.style.removeProperty("background-image");
  }

  protected render() {
    if (this.flavour === "avatar") {
      return html`<zds-avatar
        size="xxsmall"
        type=${this.src ? "photo" : "initials"}
        src=${this.src ?? nothing}
        .initials=${this.initials}
        alt=""
        .showStatus=${false}
        .showRing=${false}
        .showClose=${false}
      ></zds-avatar>`;
    }
    // Family pinned to rounded: the `shape` token is a string no component
    // can read from CSS yet (same as zds-icon-indicator).
    if (this.flavour === "icon") return html`<zds-icon name=${this.icon} size="medium" .iconStyle=${"rounded"}></zds-icon>`;
    return nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-notification-leading-visual": ZdsNotificationLeadingVisual;
  }
}
