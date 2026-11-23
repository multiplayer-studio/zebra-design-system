var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css } from "lit";
import { property } from "lit/decorators.js";
/**
 * Mixin to add a href attribute to a given component.
 *
 * Removes default styling from anchor tags.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const Navigate = (superClass) => {
    class InteractiveClass extends superClass {
        static { this.styles = [
            superClass.styles ?? [],
            css `
        a {
          text-decoration: none;
        }
      `
        ]; }
    }
    __decorate([
        property({ type: String, reflect: true })
    ], InteractiveClass.prototype, "href", void 0);
    return InteractiveClass;
};
//# sourceMappingURL=navigate.js.map