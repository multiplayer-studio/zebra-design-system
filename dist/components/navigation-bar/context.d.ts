import * as React from "react";
/**
 * True inside a NavigationBar. NavigationItem and NavigationBarSpacer read it
 * to decide whether to render as Base UI NavigationMenu parts (an `<li>` in
 * the bar's list, with the menu's composite keyboard handling) or as plain
 * standalone elements — Base UI's parts throw outside a NavigationMenu.Root,
 * and both components are public on their own.
 */
export declare const NavigationBarContext: React.Context<boolean>;
