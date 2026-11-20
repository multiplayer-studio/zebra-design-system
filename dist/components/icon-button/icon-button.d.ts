import { LitElement } from "lit";
import "../icon/icon.js";
import type { IconName } from "@zebra-design-system/icons/names";
import type { ButtonFlavour, ButtonSize, ButtonShape } from "../button/button.js";
/**
 * Triggers an action from a single glyph, with no text label. Square at
 * every size, and it carries the same nine flavours, three shapes and four
 * states as Button so the two sit together consistently. Nothing on it is
 * readable, so every instance needs an accessible name in code. When the
 * action can carry a word, use Button instead.
 *
 * `label` is that accessible name and is required. The glyph is decorative.
 *
 * The glyph takes the flavour's label colour through Button's styles (spec:
 * "Background and glyph swap to the disabled tokens of their family"). Three
 * Figma bindings that contradict that are not copied (spec warns): subtle's
 * glyph on foreground/primary, and the disabled glyph of positive
 * (destructive token) and negative (primary token).
 *
 * @spec specs/icon-button/icon-button.spec.json
 */
export declare class ZdsIconButton extends LitElement {
    static styles: import("lit").CSSResult[];
    /** How much weight the action carries. The same nine as Button. */
    flavour: ButtonFlavour;
    /** small (36, under the 40 minimum target), medium or large. */
    size: ButtonSize;
    /** sharp, rounded or full (a circle). Also picks the glyph family. */
    shape: ButtonShape;
    disabled: boolean;
    /**
     * The glyph. Defaults to more-horizontal, as in Figma — which reads as an
     * overflow menu, so set it deliberately (spec: How to use).
     */
    icon: IconName;
    /** The accessible name, e.g. "Dismiss". Required: there is no visible text. */
    label: string;
    type: "button" | "submit" | "reset";
    /**
     * For a button that opens a menu or panel: whether it is open, forwarded to
     * the inner button as `aria-expanded`. Unset, no `aria-expanded` at all.
     */
    expanded?: boolean;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-icon-button": ZdsIconButton;
    }
}
//# sourceMappingURL=icon-button.d.ts.map