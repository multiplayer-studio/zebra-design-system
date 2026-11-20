/* eslint-disable @typescript-eslint/unbound-method */
import { html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseButton } from "./base-button.js";
import { ifDefined } from "lit/directives/if-defined.js";
import "../icon/icon.js";
import styles from "./button.styles.js";
import type { ZetaIconName } from "../../icons.js";

/** Visual weight of the button. */
export type ButtonFlavor =
  "primary" | "positive" | "negative" | "subtle" | "text" | "outline-subtle" | "outline" | "gradient" | "text-gradient" | "contrast" | "outline-contrast";

/** Triggers an action from a text label, with optional icons on either side. Flavour sets how much weight the action
 * carries, size and shape fit it to the surface it sits on. When an action has no text label, use Icon Button.
 *
 * Every colour, size and radius is a Zebra token (specs/button). Hover, pressed and focus are CSS states, not
 * properties.
 *
 * @slot - Content shown on button; typically text.
 * @part button - The button element
 * @part label - The wrapper around the slotted label, for text buttons.
 * @part icon - The icon element of the button, for buttons of type "icon".
 * @cssproperty --flavor-background-color - Overrides the resting background.
 * @cssproperty --flavor-disabled-background-color - Overrides the disabled background.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2024-6729
 * @storybook ?path=/docs/components-buttons--docs
 */
@customElement("zeta-button")
export class ZetaButton extends BaseButton {
  /** @internal */
  protected _buttonType: "text" | "icon" = "text";

  static get styles() {
    return [super.styles ?? [], styles];
  }

  /**
   * The flavor of the component determines the visual style of the component.
   *
   * @type {ButtonFlavor}
   *
   * @defaultValue "primary"
   *
   * @remarks
   * Supported values for `flavor`:
   * - `"primary"` - The single most important action in a view, one per group.
   * - `"positive"` - Confirms a constructive outcome such as approving or publishing.
   * - `"negative"` - Destructive actions the user cannot undo.
   * - `"subtle"` - A neutral action beside a stronger one, typically the cancel next to a primary.
   * - `"text"` - A tertiary action inside dense content.
   * - `"outline-subtle"` - A secondary action on a busy surface where an accent border would compete.
   * - `"outline"` - A secondary action that still needs to look clickable on its own.
   * - `"gradient"` - One promotional or high-emphasis moment.
   * - `"text-gradient"` - The promotional treatment without the filled weight.
   * - `"contrast"` - The strongest neutral against the page.
   * - `"outline-contrast"` - A secondary action that pairs with contrast.
   *
   * @remarks The value `"secondary"` is no longer supported and should not be used.
   */
  @property({ type: String, reflect: true }) flavor: ButtonFlavor = "primary";

  /**
   * Leading icon of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
   */
  @property({ type: String }) leadingIcon: ZetaIconName | null = null;

  /**
   * Trailing icon of button. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
   */
  @property({ type: String }) trailingIcon: ZetaIconName | null = null;

  /**
   * Forwarded to the inner button as `aria-expanded`, for a button that opens and closes something (the leading
   * control of a selectable Accordion row). Set it as a property so the button re-renders when it changes.
   */
  @property({ attribute: false }) override ariaExpanded: string | null = null;

  protected render() {
    const leading = this.leadingIcon ? html`<zeta-icon name="${this.leadingIcon}" .rounded=${this.shape != "sharp"}></zeta-icon>` : nothing;
    const trailing = this.trailingIcon ? html`<zeta-icon name="${this.trailingIcon}" .rounded=${this.shape != "sharp"}></zeta-icon>` : nothing;

    return html`
      <button
        ?disabled=${this.disabled}
        value=${ifDefined(this.value)}
        name=${ifDefined(this.name)}
        type=${ifDefined(this.type)}
        aria-label=${ifDefined(ifDefined(this.ariaLabel))}
        aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
        @click=${this._handleClick}
        part="button"
        class="contourable-target"
      >
        ${
          this._buttonType === "icon"
            ? html`<zeta-icon part="icon" .rounded=${this.shape != "sharp"}><slot></slot></zeta-icon>`
            : html`${leading}
                <span class="label" part="label"><slot></slot></span>
                ${trailing}`
        }
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-button": ZetaButton;
  }
}
