import * as React from "react";
import { type IconName } from "../icon/Icon.js";
import "./system-banner.css";
/** `mobile` is System Banner (Mobile), `desktop` is System Banner (Desktop): one component, two Figma sets. */
export type SystemBannerLayout = "desktop" | "mobile";
/** Figma's Status. `default` is the success colour, despite the name. */
export type SystemBannerStatus = "default" | "negative" | "warning" | "info";
/** The container's shape. Every control inside the banner takes it; the banner itself stays square (spec: shapeInheritance). */
export type SystemBannerShape = "rounded" | "sharp";
export interface SystemBannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "title" | "role"> {
    /** Which Figma set it draws: the mobile screen banner or the desktop view banner. */
    layout?: SystemBannerLayout;
    /** Sets the background. negative carries no dismiss, so it stays until the condition clears. */
    status?: SystemBannerStatus;
    /** Rounded or sharp, from the container. The actions and the dismiss take it; the banner's own corners stay square. */
    shape?: SystemBannerShape;
    /** The headline: what happened. */
    title: React.ReactNode;
    /** The supporting line. On desktop it turns the banner multiline (Figma's Content Type). */
    description?: React.ReactNode;
    /** Keeps the status glyph so the banner survives greyscale. */
    showLeadingIcon?: boolean;
    /** Mobile only: the glyph is chosen per use (Figma holds Verified). Desktop's follows Status. */
    icon?: IconName;
    /** The controls the message needs, typically one small outline-contrast Button. The banner sets its shape. */
    actions?: React.ReactNode;
    /** Lets the person dismiss the banner. Ignored on negative. */
    showClose?: boolean;
    /** Accessible name for the dismiss control. */
    closeLabel?: string;
    /** Shows the banner. Turning it false plays the reveal in reverse and then hides it; true again replays the reveal. */
    open?: boolean;
    /** The dismiss was pressed. The banner plays the reverse and hides first, then calls this. What happens next is the product's decision. */
    onClose?: () => void;
    className?: string;
}
/**
 * A full-width message pinned to the top of a screen or view, carrying a
 * status colour, a title, an optional description and an optional action.
 * It spans its container and stays until something clears it.
 *
 * Locked to Dark (spec: modeLock): Figma pins palette=Dark on every variant,
 * so the root always carries .mode-dark and every element inside, the
 * dismiss IconButton and anything in `actions` included, resolves dark
 * tokens whatever mode the page is in. That is what keeps the
 * foreground/primary text and the outline-contrast action white on the
 * strong feedback colours.
 *
 * Mobile and Desktop are two Figma sets with different APIs (spec issue
 * "api (sibling sets)"); here they are one component with `layout`:
 * Desktop's Content Type is the presence of `description`, Mobile's Show
 * Description likewise, and Title is a prop on both. The banner has no
 * interaction states of its own; the dismiss is a subtle sharp IconButton,
 * medium on mobile and small on desktop.
 *
 * One shape (spec: shapeInheritance): `shape` comes from the container and
 * reaches the dismiss
 * and every Button / IconButton in `actions`; no control keeps its own.
 *
 * It reveals by sliding in from the top and pushing the content below down,
 * and removal plays that in reverse (spec: Motion): the dismiss, or `open`
 * turned false. `open` true again replays the reveal.
 *
 * Announced politely (role=status), negative interrupts (role=alert). The
 * metadata leaves announcement to the product; a live region does it for
 * free when the banner is inserted.
 *
 * Kept in step with packages/web-components `<zds-system-banner>`.
 *
 * @spec specs/system-banner-mobile/system-banner-mobile.spec.md
 * @spec specs/system-banner-desktop/system-banner-desktop.spec.md
 */
export declare const SystemBanner: React.ForwardRefExoticComponent<SystemBannerProps & React.RefAttributes<HTMLDivElement>>;
