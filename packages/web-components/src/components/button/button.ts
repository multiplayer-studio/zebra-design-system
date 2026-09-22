import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./button.styles.js";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";

export type ButtonFlavour =
  | "primary" | "positive" | "negative" | "subtle" | "text"
  | "outline-subtle" | "outline" | "gradient" | "text-gradient";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonShape = "sharp" | "rounded" | "full";

/**
 * Triggers an action from a text label, with optional icons on either side.
 *
 * Nine flavours set how much weight the action carries, three sizes and three
 * shapes fit it to the surface it sits on. The label is the only content a
 * consumer writes, everything else is a variant choice. When an action has no
 * text label, reach for Icon Button rather than hiding this one's label.
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*` class
 * on any ancestor re-themes the button and everything beside it.
 *
 * @slot - The label. A verb phrase naming the action.
 * @part button - The button element.
 *
 * @spec specs/button/button.spec.json
 */
@customElement("zds-button")
export class ZdsButton extends LitElement {
  static styles = styles;

  /** How much weight the action carries. */
  @property({ type: String, reflect: true }) flavour: ButtonFlavour = "primary";

  /** Fits the control to the surface it sits on. Drives height, padding, type ramp and icon size together. */
  @property({ type: String, reflect: true }) size: ButtonSize = "small";

  /** Corner treatment. Match the container; don't mix shapes inside one group. */
  @property({ type: String, reflect: true }) shape: ButtonShape = "sharp";

  /** The action is unavailable. Say why nearby — a disabled control with no explanation is indistinguishable from a broken one. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Icon before the label. Reinforces the action at a glance. */
  @property({ type: String, attribute: "leading-icon" }) leadingIcon: IconName | null = null;

  /** Icon after the label. Use for directional or disclosure actions. */
  @property({ type: String, attribute: "trailing-icon" }) trailingIcon: IconName | null = null;

  /** Native button type, forwarded to the inner element. */
  @property({ type: String }) type: "button" | "submit" | "reset" = "button";

  protected render() {
    // The icon follows the button's shape: only shape="sharp" takes the sharp
    // family. Button pins this rather than exposing it.
    const iconStyle = this.shape === "sharp" ? "sharp" : "rounded";
    return html`
      <button part="button" type=${this.type} ?disabled=${this.disabled}>
        ${this.leadingIcon
          ? html`<zds-icon class="icon" name=${this.leadingIcon} .iconStyle=${iconStyle}></zds-icon>`
          : nothing}
        <span class="label"><slot></slot></span>
        ${this.trailingIcon
          ? html`<zds-icon class="icon" name=${this.trailingIcon} .iconStyle=${iconStyle}></zds-icon>`
          : nothing}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zds-button": ZdsButton;
  }
}
