import type { LitElement } from "lit";
import { type Constructor } from "./utils.js";
export declare const ShapeList: readonly ["sharp", "rounded", "full"];
export type Shape = (typeof ShapeList)[number];
declare class ContourableThreeInterface {
    shape: Shape;
}
/**
 * Mixin to add Contourable to component with sharp, rounded and fully rounded shapes.
 *
 * Adds rounded attribute, and associated styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export declare const ContourableThree: <T extends Constructor<LitElement>>(superClass: T) => Constructor<ContourableThreeInterface & LitElement> & T;
export {};
//# sourceMappingURL=contourable-three.d.ts.map