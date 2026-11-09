import * as React from "react";
import { Menu } from "@base-ui/react/menu";
import "./dropdown.css";
export type DropdownPosition = "bottom" | "top" | "right" | "left";
export type DropdownAlign = "left" | "right" | "bottom" | "top";
export interface DropdownProps extends Pick<React.ComponentPropsWithoutRef<typeof Menu.Root>, "open" | "defaultOpen" | "onOpenChange"> {
    /** The control the menu opens from — e.g. a `<Button>`. Rendered through `Menu.Trigger`'s `render` prop, so it stays the real trigger element (focus, ARIA, click) rather than a wrapper around it. */
    trigger: React.ReactElement;
    /** Which side of the trigger the menu opens on. */
    position?: DropdownPosition;
    /** Which edges line up. Left/top with Position bottom/top means the leading/top edges match; right/bottom means the trailing/bottom edges match — see the mapping note below. */
    align?: DropdownAlign;
    /** Softens the menu panel's corners. The spec pins this `true` on the nested Dropdown Menu. */
    rounded?: boolean;
    /** Tightens the menu panel's inset for a cramped rail. */
    compact?: boolean;
    /** Menu Item rows (or any content) rendered inside the Dropdown Menu's slot. */
    children?: React.ReactNode;
    /**
     * Where `Menu.Portal` mounts the menu. Defaults to `document.body` (Base
     * UI's own default) — which, per this visual audit, escapes an `.ext-*` /
     * `.mode-*` class scoped to anything narrower than `<html>`/`<body>`, since
     * a portal moves the popup out from under its React parent in the DOM tree
     * and this package's theming is a plain CSS ancestor cascade with no
     * context to fall back on. Pass a ref to the themed root (or that
     * element itself) when the app scopes theme classes below `<body>`.
     */
    portalContainer?: React.ComponentPropsWithoutRef<typeof Menu.Portal>["container"];
    className?: string;
}
/**
 * A trigger paired with a Dropdown Menu, positioned relative to it — a
 * pattern rather than a component (per the spec, the page's "Dropdown" is
 * three sibling component sets; this composes all three: `trigger` swaps in
 * for the spec's `triggerComponent`, `children` fill the Dropdown Menu's
 * slot).
 *
 * Behaviour — open/close state, focus return, escape-to-close, collision
 * avoidance when the menu would open off-screen — comes from Base UI's
 * `Menu.Root` / `Menu.Positioner`. The spec explicitly leaves all of that to
 * the implementation ("flipping Position [at a viewport edge] is the
 * implementation's job") and only models the fixed anchor math for the
 * non-colliding case, so Base UI's Positioner (which auto-flips) is strictly
 * more capable than the spec — that's intentional, not a deviation.
 *
 * The gap between trigger and menu is `--space-sm` (8px), read from the
 * token layer via `getComputedStyle` and handed to `sideOffset`, which only
 * accepts a number or a function — see the `offset` callback below. This
 * keeps the single literal traceable to its token instead of a hard-coded
 * `8`.
 *
 * @spec specs/dropdown/dropdown.spec.md
 */
export declare const Dropdown: React.ForwardRefExoticComponent<DropdownProps & React.RefAttributes<HTMLDivElement>>;
