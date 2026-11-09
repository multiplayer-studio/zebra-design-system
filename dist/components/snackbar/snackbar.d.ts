import { LitElement, nothing } from "lit";
import "../icon/icon.js";
import "../button/button.js";
import "../icon-button/icon-button.js";
export type SnackbarVariant = "standard" | "contextual";
export type SnackbarFlavour = "default" | "action" | "positive" | "info" | "warning" | "error" | "deletion" | "view";
export type SnackbarCloseReason = "dismiss" | "timeout" | "action";
export type SnackbarShape = "rounded" | "sharp";
/**
 * A brief message about something the app just did, carrying at most one
 * action. Variant chooses between a contextual pill, where Flavour sets the
 * tint, the leading glyph and the controls together, and a plain standard
 * bar.
 *
 * Follows specs/snackbar:
 *  - contextual info / positive / warning / error / deletion / view sit on
 *    feedback/<kind>/background/subtle (deletion shares error, view takes
 *    neutral) with their glyph; action, default and every standard bar are
 *    the dark bars, on surface/overlay.
 *  - The action is a `<zds-button>`, subtle on deletion (Undo), view (View)
 *    and standard (Action), outline-subtle on action; the close a subtle
 *    `<zds-icon-button>`. Both are medium, full on the contextual pill,
 *    rounded on standard and sharp when the bar is sharp. (Figma draws the
 *    rounded action bar's button small; the spec warns, and medium keeps it
 *    concentric with the bar's end like every other control.)
 *  - The message stays on one line (spec: Width). Where the space runs out
 *    it ends in an ellipsis rather than running past the edge.
 *
 * The message is the default slot. `action-label` overrides the flavour's
 * action ("" removes it); `show-close` the close. The flavours without a
 * glyph of their own (default, action, and every standard bar) take one in
 * the `icon` slot (Figma's Icon Slot / Show Icon); it is coloured and sized
 * (control/icon-md) like the built-in glyphs.
 *
 * Behaviour: `open` shows it. With `duration` (ms) it closes itself, but the
 * timer pauses while the pointer or focus is inside, so nobody loses a
 * message they are reading or an Undo they are reaching for. Announced
 * politely (role=status); error interrupts (role=alert).
 *
 * Dark bars carry their own colour mode: Figma pins palette=Dark on them; in
 * code the host takes .mode-dark on a light page and .mode-light on a dark
 * one (the inversion the spec notes Figma cannot express), so every token
 * inside, the buttons' included, resolves in that mode. The page's mode is
 * read from the nearest .mode-* ancestor when the bar connects and each time
 * it opens.
 *
 * Placement and motion (spec: Motion, Layering): it floats in the top layer
 * (a manual popover), so no z-index on the page can sit above it, centred
 * space/xl above the bottom of the viewport. It slides in from below over
 * 300ms and leaves sliding up and fading over 200ms (no motion tokens yet);
 * with reduced motion it only fades. `inline` keeps it in the page flow
 * instead, for documentation.
 *
 * @slot - The message.
 * @slot icon - A leading icon, for the flavours without one of their own.
 * @fires action - The action button was pressed. The snackbar then closes.
 * @fires close - It closed; `detail.reason` is "dismiss", "timeout" or "action".
 * @csspart surface - The bar.
 *
 * @spec specs/snackbar/snackbar.spec.json
 */
export declare class ZdsSnackbar extends LitElement {
    static styles: import("lit").CSSResult;
    variant: SnackbarVariant;
    /** Corners: rounded (a pill when contextual, radius/md when standard) or sharp (radius/none). */
    shape: SnackbarShape;
    /** Contextual only: sets the glyph, the tint and the default action. */
    flavour: SnackbarFlavour;
    open: boolean;
    /** Closes itself after this many ms. 0 keeps it until dismissed. */
    duration: number;
    /** The action's text. Defaults per flavour (Undo, View, Action); "" removes it. */
    actionLabel: string | null;
    /**
     * Shows the close button. Unset, it follows the flavour (spec: Show Close);
     * `show-close` or `show-close="true"` forces it on, `show-close="false"`
     * forces it off.
     */
    showClose: boolean | null;
    /** Accessible name for the close button. */
    closeLabel: string;
    /** Renders in the page flow rather than floating in the top layer, without motion. For documentation. */
    inline: boolean;
    /** Still on screen while the exit plays after `open` went false. */
    private leaving;
    /** Whether the icon slot has something in it, so an empty slot adds no gap. */
    private slottedIcon;
    private internals;
    private timer?;
    private paused;
    private get contextual();
    private get action();
    private get close();
    /** A dark bar: contextual default/action, or any standard bar. */
    private get dark();
    /** The page's mode at the bar, from the nearest .mode-* ancestor across shadow roots. */
    private pageIsDark;
    /** Dark bars carry the opposite of the page's mode; tinted bars follow the page. */
    private syncMode;
    protected willUpdate(changed: Map<string, unknown>): void;
    protected updated(changed: Map<string, unknown>): void;
    private get reducedMotion();
    private enter;
    private exit;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /** Closes it, as the close button does. */
    hide(reason?: SnackbarCloseReason): void;
    private arm;
    private pause;
    private resume;
    private onAction;
    protected render(): typeof nothing | import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-snackbar": ZdsSnackbar;
    }
}
//# sourceMappingURL=snackbar.d.ts.map