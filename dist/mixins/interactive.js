var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { property, query } from "lit/decorators.js";
import styles from "./interactive.styles.js";
/**
 * Mixin to add interactive states to component.
 *
 * Adds disabled attribute and associated styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
//TODO BK: add @events (what are these? onFocus? onBlur?)
export const Interactive = (superClass) => {
    class InteractiveClass extends superClass {
        constructor() {
            super(...arguments);
            /** @internal This stops internal focus events happening onclick */
            this._handleFocus = (event) => {
                if (this.disabled) {
                    event.preventDefault();
                    event.stopPropagation();
                    // Revert focus back to previous blurring element
                    if (event.relatedTarget) {
                        event.relatedTarget.focus();
                    }
                    else {
                        this.blur();
                    }
                }
                return true;
            };
            /**
             * Boolean for if component is disabled.
             *
             * This will apply disabled styles.
             */
            this.disabled = false;
            /**
             * The tab index of the component, used to determine the order in which elements receive focus when the user navigates through the document by pressing the Tab key.
             */
            this.tabIndex = 0;
        }
        /** @internal adds the focus eventListener*/
        firstUpdated(_changedProperties) {
            super.firstUpdated(_changedProperties);
            if (this.interactiveElement) {
                this.interactiveElement.addEventListener("focus", this._handleFocus);
                this._listenerTarget = "target";
            }
            else if (this.interactiveChild) {
                this.interactiveChild?.classList.add("interactive-target");
                this.interactiveChild?.addEventListener("focus", this._handleFocus);
                this._listenerTarget = "firstChild";
            }
        }
        /** @internal removes the focus eventListener*/
        disconnectedCallback() {
            super.disconnectedCallback();
            switch (this._listenerTarget) {
                case "target":
                    this.interactiveElement?.removeEventListener("focus", this._handleFocus);
                    break;
                case "firstChild":
                    this.interactiveChild?.removeEventListener("focus", this._handleFocus);
                    break;
            }
        }
        static { this.styles = [superClass.styles ?? [], styles]; }
    }
    __decorate([
        query(".interactive-target")
    ], InteractiveClass.prototype, "interactiveElement", void 0);
    __decorate([
        query(":host > :first-child")
    ], InteractiveClass.prototype, "interactiveChild", void 0);
    __decorate([
        property({ type: Boolean, reflect: true })
    ], InteractiveClass.prototype, "disabled", void 0);
    __decorate([
        property({ type: Number })
    ], InteractiveClass.prototype, "tabIndex", void 0);
    return InteractiveClass;
};
//# sourceMappingURL=interactive.js.map