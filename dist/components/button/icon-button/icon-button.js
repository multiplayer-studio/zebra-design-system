var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let ZetaIconButton = class ZetaIconButton extends ZetaButton {
    constructor() {
        super(...arguments);
        this._buttonType = "icon";
    }
    static get styles() {
        return [super.styles || [], styles];
    }
};
ZetaIconButton = __decorate([
    customElement("zeta-icon-button")
], ZetaIconButton);
export { ZetaIconButton };
//# sourceMappingURL=icon-button.js.map