import { customElement } from "lit/decorators.js";
import styles from "./icon-button.styles.js";
import { ZetaButton } from "../button.js";
import "../../icon/icon.js";
// TODO slot icon name instead of passing it through a property

/** Triggers an action from a single glyph, with no text label. Square at every size, with the same flavours, shapes and
 * states as Button so the two sit together. Nothing on it is readable, so every instance needs an accessible name:
 * set `aria-label`. When the action can carry a word, use Button instead.
 *
 * Small (control/sm, 36px) is under the 40px minimum target; prefer medium wherever the control is tapped.
 *
 * @cssproperty --icon-button-color the color of the button.
 * @cssproperty --icon-button-icon-color the color of the icon.
 * @cssproperty --icon-button-icon-color-disabled the color of the icon when the button is disabled.
 * @slot {ZetaIconName} - The name of the icon. The names are those of the Zebra icon set, `@zebra-design-system/icons`.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2338-1763
 * @storybook ?path=/docs/components-buttons--docs
 */
@customElement("zeta-icon-button")
export class ZetaIconButton extends ZetaButton {
  static get styles() {
    return [super.styles || [], styles];
  }
  protected override _buttonType: "text" | "icon" = "icon";
}

declare global {
  interface HTMLElementTagNameMap {
    "zeta-icon-button": ZetaIconButton;
  }
}
