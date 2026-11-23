import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import "./dialog.css";
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
export interface DialogProps {
    /** The title in the header. Short; it names the dialog for assistive tech. */
    heading?: React.ReactNode;
    /** The body: any content. Long content scrolls inside the body; the header and footer stay put. */
    children?: React.ReactNode;
    /** Sets only the header's leading glyph: block, error, info, verified or warning. Never recolours anything. */
    flavour?: DialogFlavour;
    /** Corner radius, and the shape (and glyph family) of the header icon, close button and footer buttons. */
    shape?: DialogShape;
    /** Shows the footer. Turn off only for a message with nothing to decide. */
    showFooter?: boolean;
    /** Shows the close button in the header (spec Dev Deviation: hiding it is allowed). */
    showClose?: boolean;
    /** Accessible name of the close button. */
    closeLabel?: string;
    /** Label of the primary (filled) footer button. */
    primaryLabel?: string;
    /** Label of the secondary (outline-subtle) footer button, beside the primary. */
    secondaryLabel?: string;
    /** Label of the tertiary (text) footer button, on the opposite side. */
    tertiaryLabel?: string;
    /** Custom footer content for the start side. Replaces the preset buttons when either custom slot is set. */
    footerStart?: React.ReactNode;
    /** Custom footer content for the end side. Replaces the preset buttons when either custom slot is set. */
    footerEnd?: React.ReactNode;
    /** Called when a preset footer button is pressed. */
    onAction?: (action: DialogAction) => void;
    /** Keep the dialog open after a preset footer button is pressed (e.g. to validate first). By default it closes. */
    keepOpenOnAction?: boolean;
    /** Escape and a click on the backdrop close the dialog. Turn off when a decision is required. */
    dismissible?: boolean;
    /** Controlled open state. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called when the trigger, the close button, Escape, the backdrop or a footer action opens or closes the dialog. */
    onOpenChange?: (open: boolean, reason: DialogOpenChangeReason) => void;
    /**
     * The element that opens the dialog. Rendered through `Dialog.Trigger`'s
     * `render` prop, so it stays the real element; focus returns to it on close.
     */
    trigger?: React.ReactElement;
    /**
     * Renders the panel in normal flow, always shown, with no backdrop, portal,
     * focus trap or dismissal — the component exactly as the spec draws it,
     * for documentation and screenshots.
     */
    inline?: boolean;
    /**
     * Where `Dialog.Portal` mounts the backdrop and panel. Defaults to
     * `document.body`, which escapes an `.ext-*` / `.mode-*` class scoped below
     * `<body>` — pass the themed root when the app scopes theme classes more
     * narrowly (the same gap Tooltip and Dropdown document).
     */
    portalContainer?: React.ComponentPropsWithoutRef<typeof BaseDialog.Portal>["container"];
    className?: string;
}
/**
 * A modal message that interrupts the current task until the user responds or
 * dismisses it. A header carries the flavour glyph, the title and a close
 * button; the body holds the message; an optional footer offers one to three
 * preset buttons (primary; secondary + primary; tertiary | secondary +
 * primary) or two custom slots.
 *
 * Behaviour — the backdrop, the focus trap, initial focus (the first
 * focusable, which is the close button when shown), focus returning to the
 * trigger, Escape and outside-click dismissal, scroll lock and portalling
 * above the page — comes from Base UI's Dialog
 * (Root/Trigger/Portal/Backdrop/Popup/Title/Description/Close). Title and
 * Description label and describe the popup. Everything visual comes from the
 * token layer via `dialog.css`.
 *
 * Kept in step with packages/web-components `<zds-dialog>`.
 *
 * @spec specs/dialog/dialog.spec.md
 */
export declare const Dialog: React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<HTMLDivElement>>;
