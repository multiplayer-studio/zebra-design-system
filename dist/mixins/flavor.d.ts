import type { LitElement } from "lit";
import type { Constructor } from "./utils.js";
export type Flavor = "primary" | "positive" | "negative" | "outline" | "outline-subtle" | "text" | "inverse" | "subtle" | "contrast" | "outline-contrast" | "gradient" | "text-gradient";
export declare class FlavoredInterface {
    flavor: Flavor;
}
/**
 * A mixin class that adds a `flavor` property to components, allowing them to be styled with predefined visual variants.
 *
 * Adds flavor attribute and associated styles.
 * @cssproperty --flavor-background-color  an override to set the background color of the element.
 * @cssproperty --flavor-disabled-background-color an override to set the background color of the element when it is disabled.
 * @param superClass - LitElement to add mixin to
 * @returns - component with mixin applied.
 */
export declare const Flavored: <T extends Constructor<LitElement>>(superClass: T) => Constructor<FlavoredInterface & LitElement> & T;
//# sourceMappingURL=flavor.d.ts.map