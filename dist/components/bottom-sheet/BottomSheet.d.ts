import * as React from "react";
import type { IconName } from "../icon/Icon.js";
import "./bottom-sheet.css";
export type BottomSheetContentType = "list" | "grid" | "generic";
export type BottomSheetHeaderAlignment = "start" | "center";
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
    className?: string;
}
/**
 * A surface anchored to the bottom edge of the screen, holding supplementary
 * content or a short set of actions.
 *
 * It only draws the surface. Presenting it, the scrim, moving focus in and
 * dismissing it all belong to the screen, and Figma defines no motion, shadow
 * or height cap, so no Base UI primitive applies.
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
