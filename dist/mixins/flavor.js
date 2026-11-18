var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property } from "lit/decorators.js";
import styles from "./flavor.styles.js";
/**
 * A mixin class that adds a `flavor` property to components, allowing them to be styled with predefined visual variants.
 *
 * Adds flavor attribute and associated styles.
 * @cssproperty --flavor-background-color  an override to set the background color of the element.
 * @cssproperty --flavor-disabled-background-color an override to set the background color of the element when it is disabled.
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const Flavored = (superClass) => {
    class FlavoredClass extends superClass {
        constructor() {
            super(...arguments);
            /** Flavor of component.
             *
             * Values:
             * * primary - blue background.
             * * positive - green background.
             * * negative - red background.
             * * outline - primary outline only.
             * * outline-subtle - grey outline only.
             * * text - primary text only.
             * * inverse - black/white background. Note that this flavor is not supported in all components.
             * * subtle - white background with grey text. Same action colors as 'text' flavor.
             *
             * @remarks The value `"secondary"` is no longer supported and should not be used.
             */
            this.flavor = "primary";
        }
        static { this.styles = [superClass.styles ?? [], styles]; }
    }
    __decorate([
        property({ type: String, reflect: true })
    ], FlavoredClass.prototype, "flavor", void 0);
    return FlavoredClass;
};
//# sourceMappingURL=flavor.js.map