var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { Contourable } from "../../mixins/contour.js";
import { customElement, property, query, queryAssignedElements, state } from "lit/decorators.js";
import styles from "./segmented-control.styles.js";
import { ZetaSegmentedItem } from "./segmented-item.js";
import { styleMap } from "lit/directives/style-map.js";
/**
 * A segmented control is a linear set of two or more segments, each of which functions as a mutually exclusive button.
 * Like buttons, segments can contain text or images. Segmented controls are often used to display different views.
 *
 * To listen for changes, add a `click` event listener to the `zeta-segmented-control` element.
 *
 * To set the active segment, set the `active` property on the `zeta-segmented-item` element.
 *
 * Exactly one segment is active; the first is chosen when none is. The control is a radio group with one tab stop, and
 * the arrow keys move the choice. A single indicator slides to the active segment on animations/spring, off under
 * reduced motion. `rounded`, `shape`, `inverse` and `flavor` are set once here and reach every segment.
 *
 * @slot {zeta-segmented-item[]} - The content of the segmented control. Should be a collection of `zeta-segmented-item` elements.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=5757-774
 * @storybook ?path=/docs/components-segmented-control--docs
 */
let ZetaSegmentedControl = class ZetaSegmentedControl extends Contourable(LitElement) {
    constructor() {
        super();
        /** What every segment shows: icon and label, the label alone, or the icon alone. Sets their padding. */
        this.flavor = "default";
        /** Stronger emphasis on the active segment: a dark fill on a lighter, bordered track. */
        this.inverse = false;
        this.initComplete = false;
        this.onKeyDown = (e) => {
            const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
            if (!step || !this.activeItem)
                return;
            e.preventDefault();
            const items = this.items;
            const next = items[(items.indexOf(this.activeItem) + step + items.length) % items.length];
            next.click();
            next.focus();
        };
        this.syncItems = () => {
            const items = this.items;
            this.activeItem = items.find(i => i.active) ?? items[0];
            items.forEach(i => {
                i.active = i === this.activeItem;
                i.rounded = this.rounded;
                i.shape = this.shape;
                i.inverse = this.inverse;
                i.flavor = this.flavor;
            });
        };
        this.addEventListener("click", e => {
            const item = this.findSegmentedItem(e.target);
            if (item)
                this.select(item);
        });
        this.addEventListener("keydown", this.onKeyDown);
    }
    connectedCallback() {
        super.connectedCallback?.();
        this.setAttribute("role", "radiogroup");
    }
    findSegmentedItem(element) {
        if (!element || element === this)
            return null;
        if (element instanceof ZetaSegmentedItem)
            return element;
        return this.findSegmentedItem(element.parentElement);
    }
    select(item) {
        this.activeItem = item;
        this.items.forEach(i => (i.active = i === item));
    }
    firstUpdated(_changedProperties) {
        this.syncItems();
        requestAnimationFrame(() => (this.initComplete = true));
    }
    willUpdate(changed) {
        if (changed.has("shape") && this.shape)
            this.rounded = this.shape !== "sharp";
    }
    updated(changed) {
        if (changed.has("rounded") || changed.has("flavor") || changed.has("shape") || changed.has("inverse"))
            this.syncItems();
    }
    render() {
        const item = this.activeItem;
        return html `<div class="track contourable-target">
      <div
        class="indicator contourable-target"
        ?data-ready=${this.initComplete}
        style=${styleMap({
            visibility: item ? "visible" : "hidden",
            width: `${item?.offsetWidth ?? 0}px`,
            height: `${item?.offsetHeight ?? 0}px`,
            transform: `translateX(${item?.offsetLeft ?? 0}px)`
        })}
      ></div>
      <slot id="content-slot" @slotchange=${this.syncItems}></slot>
    </div>`;
    }
    static { this.styles = [super.styles ?? [], styles]; }
};
__decorate([
    queryAssignedElements({ selector: "zeta-segmented-item" })
], ZetaSegmentedControl.prototype, "items", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaSegmentedControl.prototype, "flavor", void 0);
__decorate([
    property({ type: String, reflect: true })
], ZetaSegmentedControl.prototype, "shape", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], ZetaSegmentedControl.prototype, "inverse", void 0);
__decorate([
    state()
], ZetaSegmentedControl.prototype, "activeItem", void 0);
__decorate([
    state()
], ZetaSegmentedControl.prototype, "initComplete", void 0);
__decorate([
    query(".indicator")
], ZetaSegmentedControl.prototype, "indicator", void 0);
ZetaSegmentedControl = __decorate([
    customElement("zeta-segmented-control")
], ZetaSegmentedControl);
export { ZetaSegmentedControl };
//# sourceMappingURL=segmented-control.js.map