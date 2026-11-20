import * as React from "react";
import { Separator } from "@base-ui/react/separator";
import "./divider.css";
export type DividerOrientation = "horizontal" | "vertical";
export interface DividerProps extends Omit<React.ComponentPropsWithoutRef<typeof Separator>, "className"> {
    className?: string;
}
/**
 * A thin line used to visually separate content into distinct sections or
 * groups, such as list rows, cards, or menu items. Orientation sets whether
 * the line runs horizontal or vertical.
 *
 * Behaviour — the separator role and `aria-orientation` — comes from Base
 * UI's Separator, which also reflects `orientation` as `data-orientation`.
 * Everything visual comes from the token layer via divider.css, keyed off
 * that attribute, so an `.ext-*` / `.mode-*` class on any ancestor re-themes
 * it with no re-render.
 *
 * Not a spacing or margin mechanism — it has no built-in padding. Use layout
 * gap for spacing between elements instead.
 *
 * @spec specs/divider/divider.spec.md
 */
export declare const Divider: React.ForwardRefExoticComponent<DividerProps & React.RefAttributes<HTMLDivElement>>;
