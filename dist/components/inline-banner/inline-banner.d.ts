import { LitElement } from "lit";
import "../icon/icon.js";
import "../icon-button/icon-button.js";
import type { IconName } from "@zebra-design-system/icons/names";
export type InlineBannerStatus = "neutral" | "info" | "positive" | "warning" | "negative";
/** `solid` fills with the strong status colour; `subtle` tints the surface and outlines it. */
export type InlineBannerAppearance = "solid" | "subtle";
export type InlineBannerShape = "rounded" | "sharp";
/**
 * A status message placed inside the content it is about (a form, a card, a
 * panel), not pinned to the screen like `<zds-system-banner>`. It sits in the
 * flow at the width of its container.
 *
 * Five statuses, each in two appearances. solid: the strong feedback fill with
 * foreground/on-strong text, for the one message on a view that must be seen
 * now. subtle: the faint feedback tint with a status border and the status
 * colour on the glyph only, for context and guidance.
 *
 * On solid, Figma pins palette=Dark on the action slot and the dismiss so they
 * draw light on any fill. Slotted actions live in the light DOM, so the banner
 * puts `.mode-dark` on them. The dismiss lives in the shadow root, where the
 * document's mode classes can't reach, so on solid it maps its foreground to
 * foreground/on-strong instead; its hover scrim follows the page mode.
 *
 * The text keeps a 16rem minimum before the actions wrap beneath it (spec
 * gap: no size token). The description and the actions render when they are
 * set, which is the spec's showDescription and showActions. The title is
 * `heading` (a `title` attribute would also show the browser's tooltip).
 *
 * Announced politely (role=status); negative interrupts (role=alert).
 *
 * Kept in step with packages/react-baseui `InlineBanner`.
 *
 * @slot actions - The controls the message needs, normally one small `<zds-button>`: outline-subtle on subtle, outline-contrast on solid. The banner sets its shape.
 * @fires close - The dismiss was pressed. The product removes the banner.
 * @csspart banner - The banner surface.
 *
 * @spec specs/inline-banner/inline-banner.spec.json
 */
export declare class ZdsInlineBanner extends LitElement {
    static styles: import("lit").CSSResult;
    /** The status colour and glyph. */
    status: InlineBannerStatus;
    /** solid interrupts; subtle informs. */
    appearance: InlineBannerAppearance;
    /** Corner shape. The actions and the dismiss take it too. */
    shape: InlineBannerShape;
    /** The headline: what happened. */
    heading: string;
    /** The supporting line: why, and what to do next. Shown when set. */
    description: string;
    /** Keeps the status glyph. `show-icon="false"` drops it. */
    showIcon: boolean;
    /** Replaces the status glyph. */
    icon?: IconName;
    /** Shows the dismiss. */
    showClose: boolean;
    /** Accessible name for the dismiss control. */
    closeLabel: string;
    private hasActions;
    private onSlotChange;
    updated(changed: Map<string, unknown>): void;
    private syncActions;
    private dismiss;
    render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-inline-banner": ZdsInlineBanner;
    }
}
//# sourceMappingURL=inline-banner.d.ts.map