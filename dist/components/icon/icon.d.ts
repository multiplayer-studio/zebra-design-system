import { LitElement } from "lit";
import { type IconStyle } from "@zebra-design-system/icons/codepoints.js";
import type { IconName } from "@zebra-design-system/icons/names";
export type { IconName, IconStyle };
export type IconSize = "xsmall" | "small" | "medium" | "large";
/**
 * A glyph from the Zebra icon font.
 *
 * Renders the glyph as a character rather than an SVG. `@font-face` is
 * registered on the document and reaches into shadow roots, but the
 * `.zds-icon-*` class rules from icons.css do not — so this component looks the
 * character up itself and only sets the family. Load `icons.css` (or at least
 * its `@font-face` blocks) once in the host page.
 *
 * Colour comes from `currentColor` — the whole reason to ship icons as a
 * font: an icon inside a button inherits that button's colour with no extra
 * rule and no per-flavour wiring. `size` binds the glyph's own dimension
 * token (`control-icon-xs/sm/md/lg`); `framed` pads it to a fixed box,
 * 40px (`control-target-min`) or 24px (`control-xs`) at xsmall, for a
 * standalone tappable icon. A
 * component that already provides its own target area, like Button, locks
 * both rather than leaving them open to the consumer.
 *
 * Both families share codepoints, so `sharp` is a family swap, never a
 * content change. The spec pins this axis to rounded and does not expose it
 * (spec issue 1); this component exposes it deliberately since both families
 * ship in the font at no extra cost.
 *
 * @csspart glyph - The element carrying the glyph.
 * @spec specs/icon/icon.spec.json
 */
export declare class ZdsIcon extends LitElement {
    static styles: import("lit").CSSResult;
    /** Glyph name, e.g. `alarm`. See `@zebra-design-system/icons` for the full list. */
    name: IconName | null;
    /** Which family to draw from. Same codepoints, different outlines. */
    iconStyle: IconStyle;
    /** The glyph's own box — 12 / 16 / 20 / 28px. */
    size: IconSize;
    /** Pads the glyph to a fixed box: 40px, or 24px at xsmall. Only for a standalone tappable icon — wrong inside a control that already provides one. */
    framed: boolean;
    /**
     * Accessible name. Leave unset for a decorative icon that repeats adjacent
     * text — which is the case inside a Button, where the label already says it.
     */
    label: string | null;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-icon": ZdsIcon;
    }
}
//# sourceMappingURL=icon.d.ts.map