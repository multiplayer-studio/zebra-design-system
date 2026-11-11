import type { LitElement } from "lit";
import type { Constructor } from "./utils.js";
export declare class InteractiveInterface {
    disabled: boolean;
}
/**
 * Mixin to add interactive states to component.
 *
 * Adds disabled attribute and associated styles.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export declare const Interactive: <T extends Constructor<LitElement>>(superClass: T) => Constructor<InteractiveInterface & LitElement> & T;
//# sourceMappingURL=interactive.d.ts.map