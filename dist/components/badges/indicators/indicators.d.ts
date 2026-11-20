import{ZetaNotificationIndicatorProps,ZetaIconIndicatorProps,ZetaIndicatorProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import{type ZetaIconName}from"@zebra-fed/zeta-icons";import"../../icon/icon.js";declare const ZetaIndicator_base:import("../../../mixins/utils.js").Constructor<{size:"small"|"medium"|"large";}&LitElement>&import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Indicators are used to show the status of a user or any messages/notifications they might have.
 *
 * @slot - Value to be displayed inside the indicator.
 *         If the `type` is set to `notification`, this should be the number or text shown inside the indicator.
 *         If the `type` is set to `icon`, this should be an icon or any other content you want to display.
 *         There is first class support for the `zeta-icon` component, which can be used to display icons inside the indicator.
 *
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10045&mode=design&t=6mhOcUUr3tgxxFdd-0
 * @figma https://www.figma.com/file/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?type=design&node-id=22000-10072&mode=design&t=6mhOcUUr3tgxxFdd-0
 *
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-badges--docs
 */export declare class ZetaIndicator extends ZetaIndicator_base{
/**
 * Icon to be shown on icon type indicator.
 *
 * Full list of icons can be found at {@link https://design.zebra.com/icons Zeta Icons}.
 */
icon?:ZetaIconName;
/** Whether to render as a notification or icon indicator. */type:"icon"|"notification";
/**
 * Value to be displayed inside the indicator.
 * The value should not be negative.
 * If the value is above 99, it will be displayed as "99+". It never runs past 3 characters.
 * The value will determine the size of the indicator when the type is set to "notification".
 * If the value is above 99, the size will be set to "large".
 * If the value is a number, it will be displayed as a number.s
 */
value?:number;static styles:import("lit").CSSResultGroup[];private getBody;protected render():import("lit").TemplateResult<1>;}
/** A small circular marker carrying a fixed clock glyph, sized to sit beside text or on its own. Size moves the circle
 * and the glyph together. It names nothing, so whatever it refers to has to be named beside it.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6407-416
 */export declare class ZetaIconIndicator extends ZetaIndicator{constructor();}
/** Marks that something is waiting on whatever it is pinned to, optionally with a count. Size decides whether the
 * count shows: large hugs a count of any length, medium is a 16 square for one digit, and small is a plain dot that
 * says only that something is new. A count above 9 moves to large, above 99 reads 99+, and nothing runs past 3 characters. Remove the indicator for
 * a count of zero rather than showing 0.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3719-6256
 */export declare class ZetaNotificationIndicator extends ZetaIndicator{constructor();}declare global{interface HTMLElementTagNameMap{"zeta-notification-indicator":ZetaNotificationIndicator;"zeta-icon-indicator":ZetaIconIndicator;"zeta-indicator":ZetaIndicator;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Indicators are used to show the status of a user or any messages/notifications they might have.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - Value to be displayed inside the indicator. If the `type` is set to `notification`, this should be the number or text shown inside the indicator. If the `type` is set to `icon`, this should be an icon or any other content you want to display. There is first class support for the `zeta-icon` component, which can be used to display icons inside the indicator.
 */"zeta-indicator":Partial<ZetaIndicatorProps&BaseProps&BaseEvents>
/**
 * A small circular marker carrying a fixed clock glyph, sized to sit beside text or on its own. Size moves the circle
 * and the glyph together. It names nothing, so whatever it refers to has to be named beside it.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - Value to be displayed inside the indicator. If the `type` is set to `notification`, this should be the number or text shown inside the indicator. If the `type` is set to `icon`, this should be an icon or any other content you want to display. There is first class support for the `zeta-icon` component, which can be used to display icons inside the indicator.
 */"zeta-icon-indicator":Partial<ZetaIconIndicatorProps&BaseProps&BaseEvents>
/**
 * Marks that something is waiting on whatever it is pinned to, optionally with a count. Size decides whether the
 * count shows: large hugs a count of any length, medium is a 16 square for one digit, and small is a plain dot that
 * says only that something is new. A count above 9 moves to large, above 99 reads 99+, and nothing runs past 3 characters. Remove the indicator for
 * a count of zero rather than showing 0.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - Value to be displayed inside the indicator. If the `type` is set to `notification`, this should be the number or text shown inside the indicator. If the `type` is set to `icon`, this should be an icon or any other content you want to display. There is first class support for the `zeta-icon` component, which can be used to display icons inside the indicator.
 */"zeta-notification-indicator":Partial<ZetaNotificationIndicatorProps&BaseProps&BaseEvents>}}}