var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css } from "lit";
import { property } from "lit/decorators.js";
import {} from "./utils.js";
export const ShapeList = ["sharp", "rounded", "full"];
/**
 * Mixin to add Contourable to component with sharp, rounded and fully rounded shapes.
 *
 * Adds rounded attribute, and associated styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export const ContourableThree = (superClass) => {
    class ContourableThreeClass extends superClass {
        constructor() {
            super(...arguments);
            /**
             * Whether the component is sharp, rounded or fully rounded.
             * This will change the border radius and icon font.
             *
             * Possible values are:
             *  - `sharp`: No border radius, uses "zeta-icons-sharp"
             * - `rounded`: Minimal border radius, uses "zeta-icons-round"
             * - `full`: Full border radius, uses "zeta-icons-round"
             *
             * @type {'sharp' | 'rounded' | 'full'}
             * @defaultValue "rounded"
             */
            this.shape = "rounded";
        }
        static { this.styles = [
            superClass.styles ?? [],
            css `
        :host([shape="full"]) {
          --contour: var(--radius-full);
          --computed-icon-font: "zeta-icons-round";
        }

        :host([shape="sharp"]) {
          --contour: var(--radius-none);
          --computed-icon-font: "zeta-icons-sharp";
        }

        :host([shape="rounded"]) {
          --contour: var(--radius-minimal);
          --computed-icon-font: "zeta-icons-round";
        }

        :host > *,
        :host .contourable-target {
          --icon-font: var(--computed-icon-font, "zeta-icons-round");
          border-radius: var(--contour, var(--radius-minimal));
        }
      `
        ]; }
    }
    __decorate([
        property({ type: String, reflect: true })
    ], ContourableThreeClass.prototype, "shape", void 0);
    return ContourableThreeClass;
};
//# sourceMappingURL=contourable-three.js.map