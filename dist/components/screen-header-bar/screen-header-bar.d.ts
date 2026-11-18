import { LitElement } from "lit";
import "../icon-button/icon-button.js";
export type ScreenHeaderBarShape = "sharp" | "rounded";
export type ScreenHeaderBarHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
/**
 * The bar at the top of a screen: a back button, the screen's title and one
 * trailing action. Reach for it on a pushed screen with exactly one primary
 * action.
 *
 * Overlaps `<zds-top-app-bar>`, which covers the same screen-level role with
 * more layouts and slots; this is effectively its single-action preset. Use
 * Top App Bar when a screen needs more than one action or a different leading
 * control.
 *
 * Departures from Figma, each a spec issue:
 * - The leading control is a `<zds-icon-button>` (medium, subtle,
 *   `chevron-left`) with its own states, not the "locked Icon" the metadata
 *   describes. It is reachable by keyboard, named "Back" (`back-label`), and
 *   fires `zds-back`.
 * - Height, padding and gap are the bound tokens (space/md around control/md,
 *   left space/sm, gap space/2xs = 64px), not the metadata's 56 / space/lg.
 * - `shape` (Figma `Rounded`) also reaches a slotted `<zds-button>` /
 *   `<zds-icon-button>`, not only the one Figma ships in the slot.
 * - The bar fills its container's width (Figma ships a fixed 474).
 * - No subtitle: Figma's heading wrapper has a gap for one but no property.
 *
 * @slot action - The single trailing action: a `<zds-button>` or `<zds-icon-button>`. The bar sets its `shape`.
 * @fires zds-back - The back button was activated. Bubbles and is composed.
 * @csspart back - The back `<zds-icon-button>`.
 * @csspart title - The heading element.
 *
 * @spec specs/screen-header-bar/screen-header-bar.spec.json
 */
export declare class ZdsScreenHeaderBar extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    /** The screen's name. Name the screen, not the task in progress. Rendered as a real heading. */
    title: string;
    /** Heading level of the title. A screen's own title is its `h1`; lower it when the bar sits inside a larger page. */
    headingLevel: ScreenHeaderBarHeadingLevel;
    /** Show the back button. Leave on for a pushed screen; turn off on a root screen with nowhere to go back to. */
    showLeadingIcon: boolean;
    /** Accessible name of the back button. */
    backLabel: string;
    /**
     * Corner treatment of the back button and of a slotted action. Figma's
     * `Rounded` true/false, renamed to the `shape` vocabulary the rest of the
     * package uses.
     */
    shape: ScreenHeaderBarShape;
    attributeChangedCallback(name: string, old: string | null, value: string | null): void;
    protected updated(): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-screen-header-bar": ZdsScreenHeaderBar;
    }
}
//# sourceMappingURL=screen-header-bar.d.ts.map