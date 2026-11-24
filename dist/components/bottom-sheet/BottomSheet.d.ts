import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { IconName } from "../icon/Icon.js";
import "./bottom-sheet.css";
export type BottomSheetContentType = "list" | "grid" | "generic";
export type BottomSheetHeaderAlignment = "start" | "center";
/** Why a modal sheet opened or closed. */
export type BottomSheetOpenChangeReason = "escape" | "backdrop" | "other";
export interface BottomSheetProps extends Omit<React.ComponentPropsWithoutRef<"section">, "className"> {
    /** How the items are arranged: `MenuItem` rows, `GridMenuItem` tiles or anything else. */
    contentType?: BottomSheetContentType;
    /** The sheet's title and accessible name. Use a short noun phrase. */
    heading?: string;
    /** Glyph before the title. */
    headerIcon?: IconName;
    /** Show the glyph before the title. */
    showLeadingIcon?: boolean;
    /** Accessible name of the leading button (spec issue: Figma has none). */
    leadingLabel?: string;
    /** The leading button was activated. */
    onLeadingClick?: () => void;
    /** `center` centres the title and pins the icon to the leading edge. */
    headerAlignment?: BottomSheetHeaderAlignment;
    /** The footer actions, usually an outline and a primary `Button` at size small. */
    actions?: React.ReactNode;
    /** Present the sheet at the bottom of the viewport over a `Scrim`, with focus trapped inside. Code only. */
    modal?: boolean;
    /** Whether a modal sheet is shown. */
    open?: boolean;
    /** Escape and a scrim click close a modal sheet. Turn off when the sheet needs a decision. */
    dismissible?: boolean;
    /** A modal sheet asked to open or close. */
    onOpenChange?: (open: boolean, reason: BottomSheetOpenChangeReason) => void;
    /** Where a modal sheet and its scrim portal to; defaults to document.body. */
    portalContainer?: React.ComponentPropsWithoutRef<typeof BaseDialog.Portal>["container"];
    className?: string;
}
/**
 * A surface anchored to the bottom edge of the screen, holding supplementary
 * content or a short set of actions.
 *
 * By default it only draws the surface, and the screen presents it. With
 * `modal`, it presents itself through Base UI's Dialog: anchored to the bottom
 * of the viewport over a `Scrim` (tone scrim), focus trapped, Escape and a
 * scrim click closing it when `dismissible`. It rises from the bottom edge
 * (animations/smooth; none under reduced motion). Figma defines no motion,
 * so that is a code decision.
 *
 * Departures from Figma, each a spec issue:
 * - `heading`, `headerIcon`, `showLeadingIcon`, `headerAlignment` and
 *   `actions` are inputs, because Figma sets them on nested instances.
 * - The sheet fills its container (Figma ships a fixed 360).
 *
 * Kept in step with packages/web-components `<zds-bottom-sheet>`.
 *
 * @spec specs/bottom-sheet/bottom-sheet.spec.md
 */
export declare const BottomSheet: React.ForwardRefExoticComponent<BottomSheetProps & React.RefAttributes<HTMLElement>>;
