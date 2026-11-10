import { LitElement, type PropertyValues } from "lit";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import "../button/button.js";
export type DialogFlavour = "default" | "error" | "info" | "success" | "warning";
/**
 * Figma names the values `round` / `sharp`; exposed as `rounded` / `sharp`
 * so the dialog takes the same word as Button, Tooltip and the chips.
 */
export type DialogShape = "rounded" | "sharp";
/** Which preset footer button was pressed. */
export type DialogAction = "primary" | "secondary" | "tertiary";
/** Why the open state changed. */
export type DialogOpenChangeReason = "trigger" | "close" | "escape" | "backdrop" | "action" | "other";
/** First focusable element in flat-tree order, through shadow roots and slots. */
export declare function firstFocusable(nodes: Iterable<Node>): HTMLElement | null;
export declare function deepActiveElement(): HTMLElement | null;
export declare function lockScroll(): void;
export declare function unlockScroll(): void;
/**
 * A modal message that interrupts the current task until the user responds
 * or dismisses it. A header carries the flavour glyph, the title and a close
 * button; the body (default slot) holds the message; an optional footer
 * offers one to three preset buttons — primary; secondary + primary;
 * tertiary | secondary + primary, following which labels are set — or the
 * `footer-start` / `footer-end` slots for custom content.
 *
 * Modal behaviour comes from the native `<dialog>` and `showModal()`: the top
 * layer (above every page stacking context), the inert page behind it, and
 * Escape. On top of that: the backdrop click, `dismissible`, initial focus
 * (the first focusable — the close button when shown), focus returned to
 * whatever had it (the trigger) on close, and page scroll lock. An element in
 * the `trigger` slot opens it on click.
 *
 * Kept in step with packages/react-baseui `<Dialog>`, which gets the same
 * behaviour from Base UI's Dialog.
 *
 * @slot - The body. Any content; long content scrolls inside the body.
 * @slot trigger - An element (usually a zds-button) that opens the dialog on click.
 * @slot footer-start - Custom footer content, start side. Replaces the preset buttons.
 * @slot footer-end - Custom footer content, end side. Replaces the preset buttons.
 * @part dialog - The panel.
 * @fires zds-open-change - `{ open, reason }` when the trigger, close button, Escape, the backdrop or a footer action opens or closes it. Not fired for a programmatic `open` change.
 * @fires zds-action - `{ action: "primary" | "secondary" | "tertiary" }` when a preset footer button is pressed.
 *
 * @spec specs/dialog/dialog.spec.json
 */
export declare class ZdsDialog extends LitElement {
    static styles: import("lit").CSSResult;
    /** Whether the dialog is open. Reflected. */
    open: boolean;
    /** The title in the header. Short; it names the dialog for assistive tech. */
    heading: string;
    /** Sets only the header's leading glyph: block, error, info, verified or warning. Never recolours anything. */
    flavour: DialogFlavour;
    /** Corner radius, and the shape (and glyph family) of the header icon, close button and footer buttons. */
    shape: DialogShape;
    /** Shows the footer. `show-footer="false"` removes it — only for a message with nothing to decide. */
    showFooter: boolean;
    /** Shows the close button in the header (spec Dev Deviation: hiding it is allowed). `show-close="false"` hides it. */
    showClose: boolean;
    /** Accessible name of the close button. */
    closeLabel: string;
    /** Label of the primary (filled) footer button. */
    primaryLabel: string;
    /** Label of the secondary (outline-subtle) footer button, beside the primary. */
    secondaryLabel: string;
    /** Label of the tertiary (text) footer button, on the opposite side. */
    tertiaryLabel: string;
    /** Keep the dialog open after a preset footer button is pressed (e.g. to validate first). By default it closes. */
    keepOpenOnAction: boolean;
    /** Escape and a click on the backdrop close the dialog. `dismissible="false"` when a decision is required. */
    dismissible: boolean;
    /**
     * Renders the panel in normal flow, always shown, with no backdrop, focus
     * trap or dismissal — the component exactly as the spec draws it, for
     * documentation and screenshots.
     */
    inline: boolean;
    private dialogEl?;
    private returnFocus;
    private locked;
    private observer;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /** Opens the dialog (same as `open = true`). */
    show(): void;
    /** Closes the dialog (same as `open = false`). */
    close(): void;
    private hasSlotted;
    /** A user-originated change: update `open` and announce it. */
    private setOpen;
    private onAction;
    private onTriggerClick;
    private onKeydown;
    private onCancel;
    private onNativeClose;
    private onDialogClick;
    protected updated(changed: PropertyValues<this>): void;
    private syncDialog;
    private focusInitial;
    private renderAction;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-dialog": ZdsDialog;
    }
    interface HTMLElementEventMap {
        "zds-open-change": CustomEvent<{
            open: boolean;
            reason: DialogOpenChangeReason;
        }>;
        "zds-action": CustomEvent<{
            action: DialogAction;
        }>;
    }
}
//# sourceMappingURL=dialog.d.ts.map