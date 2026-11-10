var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./icon.styles.js";
import { Contourable } from "../../mixins/mixins.js";
/**
 *
 * The Zeta icon component has first class integration with the Zeta icon library.
 * To see the built in icons, please visit [Zeta Icons](https://design.zebra.com/icons).
 * These icons can be rendered as rounded or sharp; and the size and color can be customized using CSS variables.
 *
 * To use this component, you can either use the `name` prop or place an icon in the slot.
 * Using the name prop allows for better typescript integration, whereas using the slot allows for more flexibility in terms of custom icons.
 *
 * ```html
 * <zeta-icon name="home"></zeta-icon>
 * ```
 * or
 * ```html
 * <zeta-icon>home</zeta-icon>
 * ```
 *
 *
 * Custom icons can be created by placing an SVG in the slot:
 *
 * ```html
 * <zeta-icon>
 *   <svg>
 *   ...
 *   </svg>
 * </zeta-icon>
 * ```
 *
 * The embedding component passes its foreground through `--icon-color` (falling back to `--main-default`). The icon is
 * decorative on its own: the meaning has to come from a label beside it or an accessible name on the control around it.
 *
 * `size` picks one of the Zebra icon sizes (`control/icon-xs`, `-sm`, `-md`, `-lg`: 12, 16, 20 and 28px); without it the icon keeps
 * `--icon-size` or its 24px default, as every existing embed expects. `framed` pads the glyph to a 40px box
 * (`control/target-min`) so a standalone icon meets the touch target on its own; xsmall frames to 24px (`control/xs`).
 *
 * @cssproperty --icon-size The width/height of the icon
 * @cssproperty --icon-color The color of the icon
 * @cssproperty --icon-border-width The border width of the icon.
 * @cssproperty --icon-border-color The border color of the icon.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2046-15004
 * @slot {ZetaIconName} - Name of icon to be displayed. Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}. If this value and the name prop are both populated, the name prop will take precedence.
 */
let ZetaIcon = class ZetaIcon extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Pads the glyph to a fixed box, 40px (24px at xsmall), so it meets the minimum touch target on its own. Adds space, nothing visible. */
        this.framed = false;
    }
    render() {
        return html `${this.name ?? html `<slot @slotchange=${() => this.requestUpdate()}></slot>`}`;
    }
    static { this.styles = [styles, super.styles || []]; }
};
__decorate([
    property({ type: String })
], ZetaIcon.prototype, "name", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaIcon.prototype, "size", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaIcon.prototype, "framed", void 0);
ZetaIcon = __decorate([
    customElement("zeta-icon")
], ZetaIcon);
export { ZetaIcon };
//# sourceMappingURL=icon.js.map