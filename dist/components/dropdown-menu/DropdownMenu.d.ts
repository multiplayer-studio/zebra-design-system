import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import "./dropdown-menu.css";
export interface DropdownMenuProps extends Omit<React.ComponentPropsWithoutRef<typeof Menu.Popup>, "className"> {
    /** Softens the panel's corners; the rows round with it. */
    rounded?: boolean;
    /** Tightens the inset (`space/xs` instead of `space/card`) for a menu with little room to spare. Rows keep their size. */
    compact?: boolean;
    className?: string;
}
/**
 * The floating panel a dropdown opens onto — a list of Menu Item rows behind
 * its own menu surface and elevation.
 *
 * The spec models this panel as two fixed built-in rows above a
 * `slotContainer` that takes the rest, with a `moreItems` toggle hiding that
 * slot. Per the spec's own issues, "each Rounded variant stores this slot's
 * content separately" is a Figma authoring artifact (content pinned to one
 * variant of a component set), not a real anatomy split — there is nothing
 * to reproduce in code. This component just renders `children` (any number
 * of `MenuItem`s) inside `Menu.Popup`; a consumer wanting a shorter menu
 * simply renders fewer children, which is `moreItems=false`'s only real
 * effect.
 *
 * Behaviour — positioning, portal mounting, focus return — is owned by the
 * `Dropdown` component that composes this one with `Menu.Root` /
 * `Menu.Positioner`; `DropdownMenu` is presentational only.
 *
 * Every nested `MenuItem` defaults its own `rounded` to this panel's
 * `rounded` (via `MenuItemRoundedContext`) unless it sets one explicitly —
 * "match the panel" is enforced, not just documented. See the spec's
 * "Rounded propagation" behavior entry.
 *
 * @spec specs/dropdown/dropdown.spec.md (Dropdown Menu subcomponent)
 */
export declare const DropdownMenu: React.ForwardRefExoticComponent<DropdownMenuProps & React.RefAttributes<HTMLDivElement>>;
