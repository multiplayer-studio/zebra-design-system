import { LitElement } from "lit";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";
export type ButtonFlavour = "primary" | "positive" | "negative" | "subtle" | "text" | "outline-subtle" | "outline" | "gradient" | "text-gradient"
/** `contrast` is the strongest neutral against the
    page; `outline-contrast` is its outline sibling. Both follow the mode. */
 | "contrast" | "outline-contrast";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonShape = "sharp" | "rounded" | "full";
/**
 * Triggers an action from a text label, with optional icons on either side.
 *
 * Eleven flavours set how much weight the action carries, three sizes and three shapes fit it to the surface it sits on. The label is the only content a
 * consumer writes, everything else is a variant choice. When an action has no
 * text label, reach for Icon Button rather than hiding this one's label.
 *
 * Theming: every colour is a semantic token, so an `.ext-*` / `.mode-*` class
 * on any ancestor re-themes the button and everything beside it.
 *
 * @slot - The label. A verb phrase naming the action.
 * @part button - The button element.
 *
 * @spec specs/button/button.spec.json
 */
export declare class ZdsButton extends LitElement {
    static styles: import("lit").CSSResult;
    /** How much weight the action carries. */
    flavour: ButtonFlavour;
    /** Fits the control to the surface it sits on. Drives height, padding, type ramp and icon size together. */
    size: ButtonSize;
    /** Corner treatment. Match the container; don't mix shapes inside one group. */
    shape: ButtonShape;
    /** The action is unavailable. Say why nearby — a disabled control with no explanation is indistinguishable from a broken one. */
    disabled: boolean;
    /** Icon before the label. Reinforces the action at a glance. */
    leadingIcon: IconName | null;
    /** Icon after the label. Use for directional or disclosure actions. */
    trailingIcon: IconName | null;
    /** Native button type, forwarded to the inner element. */
    type: "button" | "submit" | "reset";
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-button": ZdsButton;
    }
}
//# sourceMappingURL=button.d.ts.map