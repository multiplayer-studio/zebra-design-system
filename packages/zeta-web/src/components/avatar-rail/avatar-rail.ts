import { html, LitElement, nothing } from "lit";
import styles from "./avatar-rail.styles.js";
import { customElement, property, state } from "lit/decorators.js";
import type { AvatarSize } from "../avatar/avatar-size.js";
import type { ZetaAvatar } from "../avatar/avatar.js";

/**
 * Shows a group of people as overlapping avatars, with a counter standing in for everyone who did not fit. Up to `max`
 * avatars show (two to four, the first two always), each overlapping the next by a quarter of its diameter. Everyone
 * past `max` is counted into the overflow, so six avatars at `max` 4 read +2. Size moves the whole rail together.
 *
 * Reach for it where the group matters more than the individuals, and for a single Avatar where one person is the
 * subject.
 *
 * @slot {zeta-avatar[]} - The avatars to be displayed in the rail.
 * @part overflow - The counter circle.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6494-1953
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-avatar-rail--docs
 */
@customElement("zeta-avatar-rail")
export class ZetaAvatarRail extends LitElement {
  /**
   * Shows the close icon on all avatars in the rail. An avatar's own `show-close` attribute takes precedence.
   * The spec's rail pins close off; this stays for existing Zeta use.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-close" }) showClose: boolean = false;

  /**
   * The size of the avatars in the rail. This will be overridden by the individual avatar's `size` attribute.
   */
  @property({ type: String, reflect: true }) size?: AvatarSize;

  /** Which end of the stack is shown whole: `start` puts the first avatar on top, `end` the last (and the counter). */
  @property({ type: String, reflect: true }) stacking: "start" | "end" = "start";

  /** How many avatars show, from 2 to 4. Everyone past it is counted into the overflow. */
  @property({ type: Number, reflect: true }) max: 2 | 3 | 4 = 4;

  /** Shows the counter when there are more avatars than `max`. Turn off only where the rail shows the whole group. */
  @property({ type: Boolean, reflect: true, attribute: "show-overflow" }) showOverflow: boolean = true;

  @state() private avatarCount = 0;

  private get avatars(): ZetaAvatar[] {
    const slot = this.shadowRoot?.querySelector("slot");
    return (slot?.assignedElements({ flatten: true }) ?? []).filter(el => el.tagName === "ZETA-AVATAR") as ZetaAvatar[];
  }

  private handleSlotChange = () => {
    this.avatarCount = this.avatars.length;
    this.syncClose();
  };

  /** Propagates the rail's `show-close` to avatars that do not set their own. */
  private syncClose() {
    for (const avatar of this.avatars) {
      if (this.showClose && !avatar.hasAttribute("show-close")) {
        avatar.showClose = true;
        avatar.dataset.railClose = "";
      } else if (!this.showClose && "railClose" in avatar.dataset) {
        avatar.showClose = false;
        delete avatar.dataset.railClose;
      }
    }
  }

  protected updated(changed: Map<string, unknown>) {
    if (changed.has("showClose")) this.syncClose();
  }

  protected render() {
    const remainder = this.avatarCount - this.max;
    return html`<slot @slotchange=${this.handleSlotChange}></slot>${
        this.showOverflow && remainder > 0
          ? html`<span class="overflow" part="overflow" role="img" aria-label=${`${remainder} more`}>+${remainder}</span>`
          : nothing
      }`;
  }

  static styles = [super.styles ?? [], styles];
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-avatar-rail": ZetaAvatarRail;
  }
}
