import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./indicators.styles.js";
import { type ZetaIconName } from "../../../icons.js";
import { Contourable, Size, type SizeType } from "../../../mixins/mixins.js";
import "../../icon/icon.js";

/** Indicators are used to show the status of a user or any messages/notifications they might have.
 *
 * @slot - Value to be displayed inside the indicator.
 *         If the `type` is set to `notification`, this should be the number or text shown inside the indicator.
 *         If the `type` is set to `icon`, this should be an icon or any other content you want to display.
 *         There is first class support for the `zeta-icon` component, which can be used to display icons inside the indicator.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10045&mode=design&t=6mhOcUUr3tgxxFdd-0
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10072&mode=design&t=6mhOcUUr3tgxxFdd-0
 *
 * @storybook ?path=/docs/components-badges--docs
 */
@customElement("zeta-indicator")
export class ZetaIndicator extends Size(Contourable(LitElement)) {
  /**
   * Icon to be shown on icon type indicator.
   *
   * The names are those of the Zebra icon set, `@zebra-design-system/icons`.
   */
  @property({ type: String }) icon?: ZetaIconName;

  /** Whether to render as a notification or icon indicator. */
  @property({ type: String, reflect: true }) type: "icon" | "notification" = "notification";

  /**
   * Value to be displayed inside the indicator.
   * The value should not be negative.
   * If the value is above 99, it will be displayed as "99+". It never runs past 3 characters.
   * The value will determine the size of the indicator when the type is set to "notification".
   * If the value is above 99, the size will be set to "large".
   * If the value is a number, it will be displayed as a number.s
   */
  @property({ type: Number, reflect: true }) value?: number;

  static styles = [super.styles ?? [], styles];

  private getBody(value?: string | number) {
    if (this.type == "icon") {
      // Spec: specs/badges/icon-indicator fixes the glyph to clock; `icon` stays as a Zeta override.
      return html`<zeta-icon .rounded=${this.rounded}>${this.icon ?? "clock"}</zeta-icon> `;
    } else if (this.type === "notification" && value) {
      return html`<span>${String(value).slice(0, 3)}</span>`;
    }
    return html`<slot></slot>`;
  }

  protected override render() {
    let enforcedSize: SizeType = this.size;

    let value: number | string | undefined = this.value;

    if (this.type === "notification" && this.value && !isNaN(Number(this.value))) {
      const num = Math.abs(this.value);
      if (num > 99) {
        value = "99+";
      }
      if (num > 9) {
        enforcedSize = "large";
      }
    }
    // The icon type carries its glyph at every size, small included (spec: icon-indicator).
    const showBody = this.size !== "small" || this.type === "icon";
    return html`<div class="container ${enforcedSize}">${showBody ? this.getBody(value) : ""}</div> `;
  }
}

/** A small circular marker carrying a fixed clock glyph, sized to sit beside text or on its own. Size moves the circle
 * and the glyph together. It names nothing, so whatever it refers to has to be named beside it.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6407-416
 */
@customElement("zeta-icon-indicator")
export class ZetaIconIndicator extends ZetaIndicator {
  constructor() {
    super();
    this.type = "icon";
  }
}

/** Marks that something is waiting on whatever it is pinned to, optionally with a count. Size decides whether the
 * count shows: large hugs a count of any length, medium is a 16 square for one digit, and small is a plain dot that
 * says only that something is new. A count above 9 moves to large, above 99 reads 99+, and nothing runs past 3 characters. Remove the indicator for
 * a count of zero rather than showing 0.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3719-6256
 */
@customElement("zeta-notification-indicator")
export class ZetaNotificationIndicator extends ZetaIndicator {
  constructor() {
    super();
    this.type = "notification";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-notification-indicator": ZetaNotificationIndicator;
    "zeta-icon-indicator": ZetaIconIndicator;
    "zeta-indicator": ZetaIndicator;
  }
}
