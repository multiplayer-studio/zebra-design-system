import { LitElement, type PropertyValues } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import "../icon/icon.js";
export type IconIndicatorSize = "small" | "medium" | "large";
/**
 * A small circular marker carrying a glyph, sized to sit beside text or on
 * its own. Size moves the circle and the glyph together. It names nothing, so
 * whatever it refers to has to be named beside it (or given with `label`).
 *
 * Defaults are the spec's: the Clock glyph on foreground/secondary, size
 * small. Beyond the spec, the host can set the glyph (`icon`) and both
 * colours (`fill`, `foreground`, or the `--zds-icon-indicator-fill` /
 * `-foreground` custom properties) — the owner's decision, recorded against
 * the spec's "fixed meaning" warn. Property beats CSS beats default.
 *
 * Glyph colour defaults to foreground/inverse, which flips with the fill.
 * Figma binds foreground/on-strong; the spec warns it measures 1.51:1 in dark
 * mode and names foreground/inverse as the fix.
 *
 * Decorative unless given `label`, which becomes its accessible name.
 *
 * @spec specs/badges/icon-indicator.spec.json
 */
export declare class ZdsIconIndicator extends LitElement {
    /** The glyph. */
    icon: IconName;
    /** Circle colour: a CSS colour or a `--token` name. */
    fill: string | null;
    /** Glyph colour: a CSS colour or a `--token` name. Defaults to foreground/inverse. */
    foreground: string | null;
    size: IconIndicatorSize;
    /** Accessible name. Without it the indicator is hidden from assistive tech. */
    label: string | null;
    protected willUpdate(changed: PropertyValues<this>): void;
    private readonly owned;
    private applyColour;
    protected render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-icon-indicator": ZdsIconIndicator;
    }
}
//# sourceMappingURL=icon-indicator.d.ts.map