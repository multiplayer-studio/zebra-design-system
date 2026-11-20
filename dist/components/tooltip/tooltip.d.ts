import { LitElement, type PropertyValues } from "lit";
/** The edge of the bubble the pointer sits on — the edge facing the trigger, not the side the bubble appears on. */
export type TooltipPoint = "bottom" | "top" | "left" | "right";
export type TooltipShape = "rounded" | "sharp";
/**
 * A short floating message that names what an adjacent control does.
 *
 * Point it at its trigger with `for` (an id in the same document or shadow
 * root) or the `anchor` property. It then lives in the top layer as a manual
 * popover — clear of any `overflow: hidden` ancestor, still inside the theme
 * cascade because it stays in this element's shadow tree — and:
 *
 * - opens after `delay` ms of hover, at once on keyboard focus (`:focus-visible`);
 * - stays open while the pointer moves onto the bubble;
 * - closes on pointer leave (after `close-delay`), blur, a press on the
 *   trigger, or Escape;
 * - is placed on the side opposite `point`, flips when that side would leave
 *   the viewport, shifts along the edge to stay on screen, and aims the
 *   pointer at the trigger's centre;
 * - wires itself up as the trigger's `aria-describedby` (and, for a trigger
 *   whose focusable element sits in its own open shadow root — `zds-button`,
 *   `zds-icon-button` — as that element's `ariaDescribedByElements`). The
 *   trigger still needs its own accessible name.
 *
 * With no trigger it renders the static bubble in flow — the component
 * exactly as the spec draws it.
 *
 * Positioning is a small manual positioner rather than CSS anchor
 * positioning: `anchor-name` cannot reach from a light-DOM trigger into this
 * shadow root, and Firefox/Safari support is too recent for the package's
 * targets.
 *
 * @slot - The message (spec `label`). A few words naming the action; long text wraps at a max width.
 * @fires zds-open-change - Hover, focus, Escape or a press opened or closed it. `detail: { open: boolean }`.
 * @part bubble - The bubble.
 * @part pointer - The pointer.
 *
 * @spec specs/tooltip/tooltip.spec.json
 */
export declare class ZdsTooltip extends LitElement {
    static styles: import("lit").CSSResult;
    /** The edge the pointer sits on, facing the trigger. `bottom` puts the bubble above the trigger, `top` below, `left` to the right, `right` to the left. */
    point: TooltipPoint;
    /** Corner contour — and the pointer tip with it. Match the surrounding controls. */
    shape: TooltipShape;
    /** Shown or hidden. Ignored by a static bubble (no trigger), which is always shown. */
    open: boolean;
    /** Id of the trigger, looked up in this element's own document or shadow root. */
    htmlFor: string | null;
    /** The trigger element itself, when an id will not do. Takes precedence over `for`. */
    anchor: HTMLElement | null;
    /** Milliseconds of hover before it opens. Keyboard focus opens it at once. */
    delay: number;
    /** Milliseconds before it closes after the pointer leaves. */
    closeDelay: number;
    /**
     * Don't wire the bubble up as the trigger's description (`aria-describedby`).
     * For a bubble that only repeats the trigger's own accessible name — a
     * truncated label shown in full — so a screen reader does not hear it twice.
     */
    noDescribe: boolean;
    /**
     * Asked before every open (hover start, keyboard focus, and when the delay
     * ends); returning false keeps the bubble shut. Unset, it always may open.
     * For a tooltip that only applies sometimes, such as a label that is
     * truncated right now.
     */
    canOpen: (() => boolean) | null;
    private bubbleEl;
    private pointerEl;
    private anchorEl;
    private describedEl;
    private timer;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues<this>): void;
    protected updated(): void;
    private resolveAnchor;
    private bindAnchor;
    private unbindAnchor;
    private setOpen;
    private schedule;
    private onAnchorEnter;
    private onBubbleEnter;
    private onLeave;
    private onFocusIn;
    private onFocusOut;
    private onPress;
    private onKeydown;
    private sync;
    private closingTimer;
    private endClosing;
    private tracking;
    private startTracking;
    private stopTracking;
    private place;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-tooltip": ZdsTooltip;
    }
}
//# sourceMappingURL=tooltip.d.ts.map