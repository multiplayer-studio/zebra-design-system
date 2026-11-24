import { LitElement } from "lit";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import type { IconName } from "@zebra-design-system/icons/names";
/** `mobile` is System Banner (Mobile), `desktop` is System Banner (Desktop): one element, two Figma sets. */
export type SystemBannerLayout = "desktop" | "mobile";
/** Figma's Status. `default` is the success colour, despite the name. */
export type SystemBannerStatus = "default" | "negative" | "warning" | "info";
/** The container's shape. Every control inside the banner takes it; the banner itself stays square (spec: shapeInheritance). */
export type SystemBannerShape = "rounded" | "sharp";
/**
 * A full-width message pinned to the top of a screen or view, carrying a
 * status colour, a title, an optional description and an optional action.
 * It spans its container and stays until something clears it.
 *
 * Locked to Dark (spec: modeLock): Figma pins palette=Dark on every variant,
 * so the host always carries .mode-dark in the light DOM and every token
 * inside, the dismiss `<zds-icon-button>` and the slotted actions included,
 * resolves dark whatever mode the page is in. That is what keeps the
 * foreground/primary text and the outline-contrast action white on the
 * strong feedback colours.
 *
 * Mobile and Desktop are two Figma sets with different APIs (spec issue
 * "api (sibling sets)"); here they are one element with `layout`. Desktop's
 * Content Type is the presence of `description`, Mobile's Show Description
 * likewise. The title is `heading` (a `title` attribute would also show the
 * browser's tooltip). The dismiss is a subtle sharp `<zds-icon-button>`,
 * medium on mobile and small on desktop, and never shows on negative.
 *
 * One shape (spec: shapeInheritance): `shape` comes from the container and
 * reaches the dismiss
 * and every slotted `<zds-button>` / `<zds-icon-button>`; no control keeps its own.
 *
 * It reveals by sliding in from the top and pushing the content below down,
 * and removal plays that in reverse (spec: Motion): the dismiss, or `open`
 * set to false. `open` true again replays the reveal. Hidden means the
 * `hidden` attribute, set once the reverse has played.
 *
 * Announced politely (role=status), negative interrupts (role=alert).
 *
 * Kept in step with packages/react-baseui `SystemBanner`.
 *
 * @slot actions - The controls the message needs, typically one small outline-contrast `<zds-button>`. The banner sets its shape.
 * @fires close - The dismiss was pressed. The banner plays the reverse and hides first, then fires this. What happens next is the product's decision.
 * @csspart row - The message row.
 *
 * @spec specs/system-banner-mobile/system-banner-mobile.spec.json
 * @spec specs/system-banner-desktop/system-banner-desktop.spec.json
 */
export declare class ZdsSystemBanner extends LitElement {
    static styles: import("lit").CSSResult;
    /** Which Figma set it draws: the mobile screen banner or the desktop view banner. */
    layout: SystemBannerLayout;
    /** Sets the background. negative carries no dismiss, so it stays until the condition clears. */
    status: SystemBannerStatus;
    /** Rounded or sharp, from the container. The actions and the dismiss take it; the banner's own corners stay square. */
    shape: SystemBannerShape;
    /** The headline: what happened. */
    heading: string;
    /** The supporting line. On desktop it turns the banner multiline (Figma's Content Type). */
    description: string;
    /** Keeps the status glyph. `show-leading-icon="false"` drops it. */
    showLeadingIcon: boolean;
    /** Mobile only: the glyph is chosen per use (Figma holds Verified). Desktop's follows Status. */
    icon: IconName;
    /** Lets the person dismiss the banner. `show-close="false"` hides it. Ignored on negative. */
    showClose: boolean;
    /** Accessible name for the dismiss control. */
    closeLabel: string;
    /** Shows the banner. `open="false"` plays the reveal in reverse and then hides it; back to true replays the reveal. */
    open: boolean;
    private hasActions;
    connectedCallback(): void;
    private onSlotChange;
    private get row();
    firstUpdated(): void;
    updated(changed: Map<string, unknown>): void;
    private syncActions;
    private dismiss;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-system-banner": ZdsSystemBanner;
    }
}
//# sourceMappingURL=system-banner.d.ts.map