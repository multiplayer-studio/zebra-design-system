import * as React from "react";
import "./top-app-bar.css";
export type TopAppBarType = "default" | "centered" | "contextual" | "contextual alt" | "search" | "extended";
export type TopAppBarShape = "sharp" | "rounded";
export type TopAppBarHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export interface TopAppBarProps extends Omit<React.ComponentPropsWithoutRef<"div">, "className" | "title" | "children"> {
    /** The arrangement. Each value brings its own content. */
    type?: TopAppBarType;
    /** The bar's own corner. Nested controls stay rounded either way. */
    shape?: TopAppBarShape;
    /** Names the screen on `default`, `centered` and `extended`. */
    pageTitle?: string;
    /** Heading level of the title. */
    headingLevel?: TopAppBarHeadingLevel;
    /** Trailing actions on `default` and `extended`: `IconButton` at size small, flavour subtle. */
    trailing?: React.ReactNode;
    /** Actions on `contextual` and `contextual alt`. */
    contextualControls?: React.ReactNode;
    /** The selection count on `contextual` and `contextual alt`. Announced when it changes. */
    count?: string;
    /** Avatar photo on `default`. Without a photo or initials there is no avatar. */
    avatarSrc?: string;
    /** Avatar initials on `default`, used when there is no photo. */
    avatarInitials?: string;
    /** Accessible name of the leading control. Defaults to one that follows `type`. */
    leadingLabel?: string;
    /** Accessible name of the fixed trailing control on `centered`. */
    trailingLabel?: string;
    /** The query on `search` (controlled). */
    searchValue?: string;
    /** Called on every search edit. */
    onSearchChange?: (value: string) => void;
    /** The leading control was activated. */
    onLeadingClick?: () => void;
    /** The fixed `centered` control was activated. */
    onTrailingClick?: () => void;
    className?: string;
}
/**
 * The header at the top of a mobile screen. `type` switches between six
 * arrangements, each with its own leading control and content.
 *
 * Departures from Figma, each a spec issue:
 * - `count`, `avatarSrc`, `avatarInitials`, `searchValue` and the leading
 *   label are inputs, because Figma draws them as fixed sample content.
 * - The title and count use foreground/primary, because Figma's raw black
 *   would not follow dark mode.
 * - contextual keeps space/md after the leading control, as the metadata says.
 *   Figma binds none there.
 * - The search field opens empty, not in Figma's typing state.
 * - The bar fills its container (Figma ships a fixed 390).
 *
 * No Base UI primitive: the bar is a static layout, and its controls bring
 * their own.
 *
 * Kept in step with packages/web-components `<zds-top-app-bar>`.
 *
 * @spec specs/top-app-bar/top-app-bar.spec.md
 */
export declare const TopAppBar: React.ForwardRefExoticComponent<TopAppBarProps & React.RefAttributes<HTMLDivElement>>;
