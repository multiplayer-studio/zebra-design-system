import type { LitElement } from "lit";
import { type Constructor } from "./utils.js";
declare class SizeInterface {
    size: "small" | "medium" | "large";
}
export type SizeType = SizeInterface["size"];
/**
 * Mixin to add sizes component.
 *
 * Only adds size property, does not apply styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export declare const Size: <T extends Constructor<LitElement>>(superClass: T) => Constructor<SizeInterface & LitElement> & T;
export {};
//# sourceMappingURL=size.d.ts.map