import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import { type NavigationRailShape } from "./context.js";
import "./navigation-rail.css";
export type SubMenuHeaderType = "default" | "sub-page";
export interface SubMenuHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title" | "children"> {
    /** default: a leading glyph. sub-page: a back Icon Button (`arrow-back`). */
    type?: SubMenuHeaderType;
    /** The panel's title. */
    heading?: string;
    /** Leading glyph in type=default. Figma ships a `verified` placeholder. */
    icon?: IconName;
    /**
     * Shows the leading glyph / back button. Figma wires it in type=default
     * only (spec warn); here it works in both.
     */
    showLeadingIcon?: boolean;
    /** Accessible name of the back button (type=sub-page). */
    backLabel?: string;
    /** Called when the back button is pressed (type=sub-page). */
    onBack?: () => void;
    /**
     * The back Icon Button's shape. Inside a NavigationRail the rail's `shape`
     * sets it and this prop is ignored. Trailing `actions` are yours: read
     * `useNavigationRailShape()` to match them.
     */
    shape?: NavigationRailShape;
    /** Trailing actions — Buttons or Icon Buttons. Replaces Figma's showTrailingActions + slot. */
    actions?: React.ReactNode;
    /** Heading level of the title. */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    className?: string;
}
/**
 * The title bar of a Navigation Rail's sub menu panel.
 *
 * Type=sub-page leads with a back Icon Button and sits it `space/sm` from the
 * title; Type=default leads with a glyph at `space/md`. `showLeadingIcon`
 * hides either (Figma wires it in default only — spec warn).
 *
 * @spec specs/navigation-rail/navigation-rail.spec.md (subcomponents › Sub Menu Header)
 */
export declare const SubMenuHeader: React.ForwardRefExoticComponent<SubMenuHeaderProps & React.RefAttributes<HTMLDivElement>>;
