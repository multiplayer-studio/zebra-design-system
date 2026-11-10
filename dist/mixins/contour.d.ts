import type { LitElement } from "lit";
import { type Constructor } from "./utils.js";
declare class ContourableInterface {
    rounded: boolean;
}
/**
 * Mixin to add Contourable to component, with rounded and sharp shapes as a boolean.
 *
 * Adds rounded attribute, and associated styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export declare const Contourable: <T extends Constructor<LitElement>>(superClass: T) => Constructor<ContourableInterface & LitElement> & T;
export {};
//# sourceMappingURL=contour.d.ts.map