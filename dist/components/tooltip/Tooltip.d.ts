import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import "./tooltip.css";
/** The edge of the bubble the pointer sits on — the edge facing the trigger, not the side the bubble appears on. */
export type TooltipPoint = "bottom" | "top" | "left" | "right";
export type TooltipShape = "rounded" | "sharp";
export interface TooltipProps {
    /** The message (spec `label`). Name the control's action in a few words; long text wraps at a max width rather than growing without limit. */
    children?: React.ReactNode;
    /** The edge the pointer sits on, facing the trigger. `bottom` puts the bubble above the trigger, `top` below, `left` to the right, `right` to the left. Near a viewport edge the bubble flips to the opposite side and the pointer follows. */
    point?: TooltipPoint;
    /** Corner contour — and the pointer tip with it. Match the surrounding controls. */
    shape?: TooltipShape;
    /**
     * The control the tooltip describes. Rendered through `Tooltip.Trigger`'s
     * `render` prop, so it stays the real element (hover, focus, ARIA) rather
     * than a wrapper. Give it its own accessible name — the tooltip is only
     * wired up as its description (`aria-describedby`).
     *
     * Omit it to render the static bubble on its own, in flow — the component
     * exactly as the spec draws it.
     */
    trigger?: React.ReactElement;
    /** Controlled open state. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called when hover, focus, Escape or a click on the trigger opens or closes the tooltip. */
    onOpenChange?: (open: boolean) => void;
    /** Milliseconds of hover before it opens. Keyboard focus opens it at once. */
    delay?: number;
    /** Milliseconds before it closes after the pointer leaves. */
    closeDelay?: number;
    /**
     * Wire the bubble up as the trigger's description (`aria-describedby`).
     * Default true. Set false when the bubble only repeats the trigger's own
     * accessible name — a truncated label shown in full — so a screen reader
     * does not hear it twice. Off, the bubble is also not kept mounted while
     * closed (nothing needs it there).
     */
    describe?: boolean;
    /**
     * Where `Tooltip.Portal` mounts the bubble. Defaults to `document.body`,
     * which escapes an `.ext-*` / `.mode-*` class scoped below `<body>` (the
     * same gap Dropdown documents) — pass the themed root when the app scopes
     * theme classes more narrowly.
     */
    portalContainer?: React.ComponentPropsWithoutRef<typeof BaseTooltip.Portal>["container"];
    className?: string;
}
/**
 * A short floating message that names what an adjacent control does.
 *
 * Behaviour — hover delay, opening on keyboard focus, Escape and click
 * dismissal, keeping the bubble open while the pointer moves onto it,
 * collision flipping and the pointer's cross-axis placement — comes from Base
 * UI's Tooltip (Root/Trigger/Portal/Positioner/Popup/Arrow). Base UI marks the
 * popup up with no role and no `aria-describedby`; this adds both, keeping the
 * popup mounted while closed so the description is there before the bubble
 * is. Everything visual comes from the token layer via `tooltip.css`.
 *
 * With no `trigger` it renders the static bubble only.
 *
 * @spec specs/tooltip/tooltip.spec.md
 */
export declare const Tooltip: React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<HTMLDivElement>>;
