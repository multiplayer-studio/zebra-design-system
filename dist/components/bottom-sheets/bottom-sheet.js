var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from "lit";
import { customElement, property, queryAssignedElements, state } from "lit/decorators.js";
import styles from "./bottom-sheet.styles.js";
import {} from "@zebra-fed/zeta-icons";
import { ZetaGridMenuItem } from "../grid-menu-item/grid-menu-item.js";
import { ZetaListItem } from "../list/list.js";
import { ZetaDropdownMenuItem } from "../dropdown/menu-item/dropdown-menu-item.js";
import "../card/card-footer/card-footer.js";
import "../button/icon-button/icon-button.js";
/** A surface anchored to the bottom edge of the screen, holding supplementary content or a short set of actions. It
 * lays out list rows, a grid of tiles three to a row, or generic content, and works out which from what is slotted
 * unless `contentType` says. Moving focus in and dismissing the sheet belong to the screen that presents it.
 *
 * @slot - Content: `zeta-dropdown-menu-item` or `zeta-list-item` rows, `zeta-grid-menu-item` tiles, or anything else.
 * @slot actions - The footer actions, usually an outline and a primary `zeta-button` at size small.
 * @cssproperty --bottom-sheet-max-height - Caps the sheet's height. Figma defines no cap, so this is a Zeta extension. Defaults to 90vh.
 *
 * @event leading-click - The leading button was activated.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5207-3343
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-bottom-sheet--docs
 */
let ZetaBottomSheet = class ZetaBottomSheet extends LitElement {
    constructor() {
        super(...arguments);
        /** Sheet Header alignment.*/
        this.headerAlignment = "start";
        /** Sheet Header text content.*/
        this.headerText = "Title";
        /** Accessible name of the leading button (spec issue: Figma has none). */
        this.leadingLabel = "Back";
        /** If the items are list items or grid items */
        this.isGrid = false;
        /** If the content is generic. E.g. not list or grid items. */
        this.isGenericContent = false;
        /** If the bottom sheet is collapsed or not */
        this.isExpanded = true;
        this.setLayout = () => {
            const first = this.items?.[0];
            const type = this.contentType ??
                (first instanceof ZetaGridMenuItem ? "grid" : first instanceof ZetaListItem || first instanceof ZetaDropdownMenuItem ? "list" : "generic");
            this.isGrid = type === "grid";
            this.isGenericContent = type === "generic";
            if (this.isGrid)
                this.items?.forEach(item => item instanceof ZetaGridMenuItem && (item.tile = true));
        };
        /** Footer actions are slotted */
        this.hasActions = false;
        this.onActions = (event) => {
            this.hasActions = event.target.assignedElements({ flatten: true }).length > 0;
        };
    }
    static { this.styles = [super.styles ?? [], styles]; }
    renderLeading() {
        if (!this.headerIcon)
            return nothing;
        return html `<zeta-icon-button
      class="header-icon"
      size="small"
      shape="rounded"
      flavor="subtle"
      aria-label=${this.leadingLabel}
      @click=${() => this.dispatchEvent(new CustomEvent("leading-click", { bubbles: true, composed: true }))}
      >${this.headerIcon}</zeta-icon-button
    >`;
    }
    willUpdate() {
        this.setLayout();
    }
    render() {
        return html `
      <section class="container" aria-labelledby="title">
        <div class="handle-row"><div class="handle"></div></div>
        <div class="header">
          ${this.renderLeading()}
          <h2 id="title" class="title">${this.headerText}</h2>
        </div>
        <div class="content ${this.isGenericContent ? "isGenericContent" : ""}${this.isGrid ? "isGrid" : ""}" tabindex="0">
          <slot @slotchange=${this.setLayout}></slot>
        </div>
        <zeta-card-footer class="footer" ?hidden=${!this.hasActions}><slot name="actions" @slotchange=${this.onActions}></slot></zeta-card-footer>
      </section>
    `;
    }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaBottomSheet.prototype, "headerAlignment", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaBottomSheet.prototype, "headerText", void 0);
__decorate([
    property({ type: String })
], ZetaBottomSheet.prototype, "headerIcon", void 0);
__decorate([
    property({ type: String })
], ZetaBottomSheet.prototype, "leadingLabel", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaBottomSheet.prototype, "contentType", void 0);
__decorate([
    state()
], ZetaBottomSheet.prototype, "isGrid", void 0);
__decorate([
    state()
], ZetaBottomSheet.prototype, "isGenericContent", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaBottomSheet.prototype, "isExpanded", void 0);
__decorate([
    queryAssignedElements({ flatten: true })
], ZetaBottomSheet.prototype, "items", void 0);
__decorate([
    state()
], ZetaBottomSheet.prototype, "hasActions", void 0);
ZetaBottomSheet = __decorate([
    customElement("zeta-bottom-sheet")
], ZetaBottomSheet);
export { ZetaBottomSheet };
//# sourceMappingURL=bottom-sheet.js.map