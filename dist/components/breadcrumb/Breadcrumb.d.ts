import * as React from "react";
import { Dropdown } from "../dropdown/Dropdown.js";
import { type IconName } from "../icon/Icon.js";
import "./breadcrumb.css";
export type BreadcrumbShape = "rounded" | "sharp";
/** `default` sets the current page in the primary foreground; `accent` sets it and its icon in blue. */
export type BreadcrumbFlavour = "default" | "accent";
export interface BreadcrumbItem {
    label: string;
    /** Where the crumb goes. Without one it is a button, for `onSelect`. */
    href?: string;
    /** A glyph before the label. */
    icon?: IconName;
    /** Called when the crumb is chosen, from the trail or from the overflow menu. */
    onSelect?: () => void;
}
export interface BreadcrumbProps extends Omit<React.ComponentPropsWithoutRef<"nav">, "className" | "children" | "onSelect"> {
    /** The path, root first. The last item is the current page. */
    items: BreadcrumbItem[];
    /** How many crumbs show before the middle collapses into the overflow menu: the first, then the rest from the end. Unset shows them all. */
    maxItems?: number;
    /** How the current page stands out. */
    flavour?: BreadcrumbFlavour;
    /** Corners of the overflow control and its menu. */
    shape?: BreadcrumbShape;
    /** Accessible name of the trail. */
    label?: string;
    /** Accessible name of the overflow control. */
    overflowLabel?: string;
    /** Where the overflow menu mounts, for a theme scoped below `<body>`. */
    portalContainer?: React.ComponentProps<typeof Dropdown>["portalContainer"];
    className?: string;
}
/**
 * Where a page sits in the hierarchy, as a trail of links back up to the root,
 * ending on the current page. `maxItems` collapses the middle of a long trail
 * into an overflow menu, which keeps every crumb reachable.
 *
 * A labelled `nav` holding an ordered list, with `aria-current="page"` on the
 * last item. Separators are decorative.
 *
 * Departures from Figma, each a spec issue:
 * - `collapsed` and `open` are derived, from `maxItems` and the menu, not props.
 * - `overflowLabel` names the overflow control, which Figma leaves unnamed.
 *
 * Kept in step with packages/web-components `<zds-breadcrumb>`.
 *
 * @spec specs/breadcrumb/breadcrumb.spec.md
 */
export declare const Breadcrumb: React.ForwardRefExoticComponent<BreadcrumbProps & React.RefAttributes<HTMLElement>>;
