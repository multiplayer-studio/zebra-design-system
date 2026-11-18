var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from "lit";
import styles from "./button-group.styles.js";
import { customElement, property, queryAssignedElements } from "lit/decorators.js";
import { Contourable } from "../../mixins/mixins.js";
export * from "./button-group-item/button-group-item.js";
/** A row of related actions sharing one bordered surface, where each carries equal weight rather than one leading.
 * The group owns the fill, the outline and the rules between items; each item is a subtle button. Size is the
 * group's call and every item inherits it. Reach for a single Button when one action is clearly the primary one.
 *
 * `rounded` reaches the group's outline and the outer corners of the first and last items, nothing else.
 *
 * @slot - Children must be of type `zeta-button-group-item` otherwise they will not be displayed.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5763-1251
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-button-group--docs
 */
let ZetaButtonGroup = class ZetaButtonGroup extends Contourable(LitElement) {
    constructor() {
        super(...arguments);
        /** Size of the group. Every item takes it. */
        this.size = "medium";
    }
    /** Items take the group's size; it is never set per item (spec: size). */
    syncItems() {
        for (const item of this.items ?? [])
            item.size = this.size;
    }
    updated(changed) {
        if (changed.has("size"))
            this.syncItems();
    }
    render() {
        return html `<slot @slotchange=${() => this.syncItems()}></slot>`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    property({ type: String, reflect: true })
], ZetaButtonGroup.prototype, "size", void 0);
__decorate([
    queryAssignedElements({ selector: "zeta-button-group-item", flatten: true })
], ZetaButtonGroup.prototype, "items", void 0);
ZetaButtonGroup = __decorate([
    customElement("zeta-button-group")
], ZetaButtonGroup);
export { ZetaButtonGroup };
//# sourceMappingURL=button-group.js.map