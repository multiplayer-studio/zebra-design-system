import * as React from "react";
export const NavigationRailContext = React.createContext(null);
/**
 * The nearest Navigation Rail's shape, for content slotted into it that the
 * rail did not render (a Sub Menu Header's trailing actions, say), so it can
 * match. `null` outside a rail. Same pattern as Table's `useTableShape()`.
 */
export function useNavigationRailShape() {
    return React.useContext(NavigationRailContext)?.shape ?? null;
}
/**
 * The nearest Navigation Rail's mode class (`mode-dark`, or `mode-light` when
 * `inverse`), `null` outside a rail. Everything rendered inside the rail
 * inherits its mode through the cascade; a popup that portals out of it (a
 * Tooltip or Dropdown in a slot, mounted on `document.body`) does not, so put
 * this class on the popup (`className`) or mount it inside the rail
 * (`portalContainer`) to keep it in the rail's mode.
 */
export function useNavigationRailModeClass() {
    return React.useContext(NavigationRailContext)?.modeClass ?? null;
}
/**
 * Inside a CollapsibleMenuItem's children: the group's shape, and SubMenuItem
 * renders nested. `null` outside a group.
 */
export const NestedMenuContext = React.createContext(null);
