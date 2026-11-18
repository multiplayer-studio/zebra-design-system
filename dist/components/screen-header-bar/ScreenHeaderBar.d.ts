import * as React from "react";
import "./screen-header-bar.css";
export type ScreenHeaderBarShape = "sharp" | "rounded";
export type ScreenHeaderBarHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export interface ScreenHeaderBarProps extends Omit<React.ComponentPropsWithoutRef<"div">, "className" | "title"> {
    /** The screen's name. Name the screen, not the task in progress. Rendered as a real heading. */
    title: React.ReactNode;
    /** Heading level of the title. A screen's own title is its `h1`; lower it when the bar sits inside a larger page. */
    headingLevel?: ScreenHeaderBarHeadingLevel;
    /** Show the back button. Leave on for a pushed screen; turn off on a root screen with nowhere to go back to. */
    showLeadingIcon?: boolean;
    /** Called when the back button is activated. */
    onBack?: (event: React.MouseEvent<HTMLElement>) => void;
    /** Accessible name of the back button. */
    backLabel?: string;
    /**
     * Corner treatment of the back button and of a `Button` / `IconButton`
     * passed as `action`. Figma's `Rounded` true/false, renamed to the
     * `shape` vocabulary the rest of the package uses.
     */
    shape?: ScreenHeaderBarShape;
    /** The single trailing action: a `Button` or `IconButton`. The bar sets its `shape`. */
    action?: React.ReactNode;
    className?: string;
}
/**
 * The bar at the top of a screen: a back button, the screen's title and one
 * trailing action. Reach for it on a pushed screen with exactly one primary
 * action.
 *
 * Overlaps `TopAppBar`, which covers the same screen-level role with
 * more layouts and slots; this is effectively its single-action preset. Use
 * Top App Bar when a screen needs more than one action or a different leading
 * control.
 *
 * Departures from Figma, each a spec issue:
 * - The leading control is an `IconButton` (medium, subtle, `chevron-left`)
 *   with its own states, not the "locked Icon" the metadata describes. It is
 *   reachable by keyboard, named "Back" (`backLabel`), and calls `onBack`.
 * - Height, padding and gap are the bound tokens (space/md around control/md,
 *   left space/sm, gap space/xs = 64px), not the metadata's 56 / space/lg.
 * - `shape` (Figma `Rounded`) also reaches an `IconButton` / `Button` placed
 *   as the action, not only the one Figma ships in the slot.
 * - The bar fills its container's width (Figma ships a fixed 474).
 * - No subtitle: Figma's heading wrapper has a gap for one but no property.
 *
 * No Base UI primitive: the bar is a static layout; the only behaviour is the
 * back button's, which comes from IconButton (Base UI Button).
 *
 * Kept in step with packages/web-components `<zds-screen-header-bar>`.
 *
 * @spec specs/screen-header-bar/screen-header-bar.spec.md
 */
export declare const ScreenHeaderBar: React.ForwardRefExoticComponent<ScreenHeaderBarProps & React.RefAttributes<HTMLDivElement>>;
