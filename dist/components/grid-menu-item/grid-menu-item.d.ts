import { LitElement } from "lit";
import "../icon/icon.js";
import "../notification-indicator/notification-indicator.js";
import type { IconName } from "@zebra-design-system/icons/names";
/**
 * One tile of the grid arrangement inside a bottom sheet: an icon above a
 * short label. Hover and press come from the pointer. `active` marks the
 * option a person is on, and `disabled` puts one out of reach.
 *
 * Departures from Figma, each a spec issue:
 * - `icon` is an input, because every tile needs its own glyph. Figma fixes it
 *   to `star`, which stays the default.
 * - `active` sets `aria-current` and `disabled` the native attribute, because
 *   both are otherwise carried by the label's colour alone.
 *
 * @fires click - The tile was activated. Not fired while disabled.
 * @csspart tile - The `<button>`.
 * @csspart label - The label text.
 *
 * @spec specs/bottom-sheet/bottom-sheet.spec.json
 */
export declare class ZdsGridMenuItem extends LitElement {
    static styles: import("lit").CSSResult;
    /** Names the option beneath its icon. A long label wraps and makes every tile in the row taller. */
    label: string;
    /** Glyph above the label. */
    icon: IconName;
    /** Marks the option a person is on now. */
    active: boolean;
    /** Puts the option out of reach and takes it out of the tab order. */
    disabled: boolean;
    /** Softens the tile's corners. */
    rounded: boolean;
    /** Adds a dot over the icon. It carries no number. */
    showBadge: boolean;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-grid-menu-item": ZdsGridMenuItem;
    }
}
//# sourceMappingURL=grid-menu-item.d.ts.map