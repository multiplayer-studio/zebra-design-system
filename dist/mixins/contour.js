var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css } from "lit";
import { property } from "lit/decorators.js";
import {} from "./utils.js";
/**
 * Mixin to add Contourable to component, with rounded and sharp shapes as a boolean.
 *
 * Adds rounded attribute, and associated styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const Contourable = (superClass) => {
    class ContourableClass extends superClass {
        constructor() {
            super(...arguments);
            /**
             * Whether the component is rounded or sharp.
             *
             * When true, rounded will set the border radius of the first child, and any children with class 'contourable-target' to `--radius-minimal`.
             *
             * Otherwise, this value will be `--radius-none`.
             */
            this.rounded = true;
        }
        static { this.styles = [
            superClass.styles ?? [],
            css `
        :host([rounded]) {
          --contour: var(--radius-minimal);
          --computed-icon-font: "zeta-icons-round";
        }
        :host([rounded="false"]) {
          --contour: var(--radius-none);
          --computed-icon-font: "zeta-icons-sharp";
        }
        :host > *,
        :host .contourable-target {
          --icon-font: var(--computed-icon-font, "zeta-icons-sharp");
          border-radius: var(--contour, var(--radius-none));
        }
      `
        ]; }
    }
    __decorate([
        property({ type: Boolean, reflect: true })
    ], ContourableClass.prototype, "rounded", void 0);
    return ContourableClass;
};
//# sourceMappingURL=contour.js.map