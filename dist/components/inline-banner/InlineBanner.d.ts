import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import "./inline-banner.css";
export type InlineBannerStatus = "neutral" | "info" | "positive" | "warning" | "negative";
/** `solid` fills with the strong status colour; `subtle` tints the surface and outlines it. */
export type InlineBannerAppearance = "solid" | "subtle";
export type InlineBannerShape = "rounded" | "sharp";
export interface InlineBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title" | "role"> {
    /** The status colour and glyph. */
    status?: InlineBannerStatus;
    /** solid for messages that must be seen now; subtle for context that sits with the content. */
    appearance?: InlineBannerAppearance;
    /** Corner shape. The actions and the dismiss take it too. */
    shape?: InlineBannerShape;
    /** The headline: what happened. */
    title: React.ReactNode;
    /** The supporting line: why, and what to do. */
    description?: React.ReactNode;
    /** Keeps the status glyph so the banner survives greyscale. */
    showIcon?: boolean;
    /** Replaces the status glyph. */
    icon?: IconName;
    /** Small Buttons. Use outline-contrast on solid and outline-subtle on subtle. */
    actions?: React.ReactNode;
    /** Shows a dismiss control. */
    showClose?: boolean;
    /** Accessible name for the dismiss control. */
    closeLabel?: string;
    /** The dismiss was pressed. The product removes the banner. */
    onClose?: () => void;
    className?: string;
}
/**
 * A status message placed inside the content it is about (a form, a card, a
 * panel), not pinned to the screen like SystemBanner. It sits in the flow at
 * the width of its container.
 *
 * Five statuses, each in two appearances:
 * - solid: the strong feedback fill with foreground/on-strong text. For the
 *   one message on a view that must be seen now.
 * - subtle: the faint feedback tint with a status border and the status
 *   colour on the glyph only. For context and guidance; several can share a
 *   page.
 *
 * On solid, the controls sit in a Dark scope (Figma pins palette=Dark on the
 * action slot and the dismiss) so outline-contrast actions and the dismiss
 * draw light on any fill; the fill itself follows the page's mode.
 *
 * The text keeps a 16rem minimum before the actions wrap beneath it (spec
 * gap: no size token). Description and actions render when they are set,
 * which is the spec's showDescription and showActions.
 *
 * Announced politely (role=status); negative interrupts (role=alert).
 *
 * Kept in step with packages/web-components `<zds-inline-banner>`.
 *
 * @spec specs/inline-banner/inline-banner.spec.json
 */
export declare const InlineBanner: React.ForwardRefExoticComponent<InlineBannerProps & React.RefAttributes<HTMLDivElement>>;
