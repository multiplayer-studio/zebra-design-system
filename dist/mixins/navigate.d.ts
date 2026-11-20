import { type LitElement } from "lit";
import type { Constructor } from "./utils";
declare class NavigateInterface {
    href: string;
}
/**
 * Mixin to add a href attribute to a given component.
 *
 * Removes default styling from anchor tags.
 *
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export declare const Navigate: <T extends Constructor<LitElement>>(superClass: T) => Constructor<NavigateInterface & LitElement> & T;
export {};
//# sourceMappingURL=navigate.d.ts.map