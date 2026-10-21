import * as React from "react";

/**
 * The corner shape a Navigation Rail hands to everything nested in it — its
 * slot items, Collapsible Menu Items and the Buttons / Icon Buttons inside
 * Navigation Header and Sub Menu Header. Code-only: Figma has no counterpart
 * (spec: the rail's `shape`). rounded = `radius/sm`, sharp = `radius/none`;
 * a nested Button or Icon Button takes the same-named `shape`.
 */
export type NavigationRailShape = "rounded" | "sharp";

/**
 * The token layer's mode class a Navigation Rail locks itself to: `mode-dark`
 * by default, `mode-light` with `inverse` (owner decision).
 */
export type NavigationRailModeClass = "mode-dark" | "mode-light";

/**
 * What a Navigation Rail hands down to the parts placed in its slots: its
 * width form, whether the narrow rail shows captions, its shape and its
 * locked colour mode. `null`
 * outside a rail, where each part's own props apply. Figma ties each item's
 * Expanded / Show Label to the rail's (spec); in code the rail owns them.
 */
export interface NavigationRailContextValue {
  expanded: boolean;
  showLabels: boolean;
  shape: NavigationRailShape;
  modeClass: NavigationRailModeClass;
}
export const NavigationRailContext = React.createContext<NavigationRailContextValue | null>(null);

/**
 * The nearest Navigation Rail's shape, for content slotted into it that the
 * rail did not render (a Sub Menu Header's trailing actions, say), so it can
 * match. `null` outside a rail. Same pattern as Table's `useTableShape()`.
 */
export function useNavigationRailShape(): NavigationRailShape | null {
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
export function useNavigationRailModeClass(): NavigationRailModeClass | null {
  return React.useContext(NavigationRailContext)?.modeClass ?? null;
}

/**
 * Inside a CollapsibleMenuItem's children: the group's shape, and SubMenuItem
 * renders nested. `null` outside a group.
 */
export const NestedMenuContext = React.createContext<NavigationRailShape | null>(null);
