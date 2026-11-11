var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./empty-state.styles.js";
import { Contourable } from "../../mixins/contour.js";
/** Empty states are used to convey there is no data is available for display. Types include No results, First use, No Data, User Cleared.
 *
 * @slot primaryAction - Primary Action Button. Should be a `zeta-button`.
 * @slot secondaryAction - Secondary Action Button. Should be a `zeta-button`.
 * @slot illustration - Illustration to be displayed in the empty state. Should be a `zeta-illustration`.
 * @slot title - Title of the empty state. Should be a `h4` element.
 * @slot description - Description of the empty state. Should be a `p` element.
 *
 * @cssproperty --empty-state-max-width - Max width of the empty state. Default is 375px.
 *
 * @part container - The container of the empty state.
 * @part content - The content of the empty state (title, description, actions).
 * @part actions - The container for the action buttons.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=38470-1055
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-empty-state--docs
 */
let ZetaEmptyState = class ZetaEmptyState extends Contourable(LitElement) {
    render() {
        return html `
      <div part="container">
        <slot name="illustration"></slot>
        <div part="content">
          <slot name="title"><h4 class="title">${this.title}</h4></slot>
          <slot name="description">
            <p class="description">${this.description}</p>
          </slot>
          <div part="actions">
            <slot name="secondaryAction"></slot>
            <slot name="primaryAction"></slot>
          </div>
        </div>
      </div>
    `;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String })
], ZetaEmptyState.prototype, "title", void 0);
__decorate([
    property({ type: String })
], ZetaEmptyState.prototype, "description", void 0);
ZetaEmptyState = __decorate([
    customElement("zeta-empty-state")
], ZetaEmptyState);
export { ZetaEmptyState };
//# sourceMappingURL=empty-state.js.map