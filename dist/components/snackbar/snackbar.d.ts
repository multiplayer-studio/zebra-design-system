import{ZetaSnackbarProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,nothing,type PropertyValues}from"lit";import"../icon/icon.js";import"../button/button.js";import"../button/icon-button/icon-button.js";import{type ZetaIconName}from"@zebra-fed/zeta-icons";export type ZetaSnackbarStatus="default"|"action"|"positive"|"info"|"warning"|"negative"|"deletion"|"view";
/** @deprecated Use `ZetaSnackbarStatus`; `error` is now `negative`. */export type ZetaSnackbarFlavor=Exclude<ZetaSnackbarStatus,"negative">|"error";export type ZetaSnackbarCloseReason="dismiss"|"timeout"|"action";declare const ZetaSnackbar_base:import("../../mixins/utils.js").Constructor<{shape:import("../../mixins/contourable-three.js").Shape;}&LitElement>&import("../../mixins/utils.js").Constructor<import("../../mixins/interactive.js").InteractiveInterface&LitElement>&typeof LitElement;
/** A brief message about something the app just did, carrying at most one action. `variant` chooses a contextual pill,
 * where `status` sets the tint, the glyph and the controls together, or a plain dark standard bar.
 *
 * It sits in the page by default, as Zeta's snackbar always has. `floating` lifts it into the top layer, centred above
 * the bottom of the viewport, sliding in over 300ms and out over 200ms (a fade only with reduced motion). With
 * `duration` it closes itself, pausing while the pointer or focus is inside. It announces itself politely (negative
 * interrupts). The dark bars carry their own colour mode, so on a dark page they invert to light.
 *
 * @slot - The message: one short line, which ends in an ellipsis where it runs out of room.
 * @slot icon - A leading icon, for the statuses without a glyph of their own (default, action and standard).
 * @part surface - The bar.
 * @event action - The action button was pressed. The snackbar then closes.
 * @event close - It closed; `detail.reason` is "dismiss", "timeout" or "action".
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6551-170
 * @storybook https://design.zebra.com/web/storybook/index.html?path=/docs/components-snackbar--docs
 */export declare class ZetaSnackbar extends ZetaSnackbar_base{
/** The contextual pill, or the plain dark standard bar. */
variant:"contextual"|"standard";
/** Contextual only: the glyph, the tint and the controls, picked for what happened (spec: status). */
status:ZetaSnackbarStatus;
/** @deprecated Use `status`; `error` maps to `negative`. */
flavor?:ZetaSnackbarFlavor;
/** Shows it. On by default, so a snackbar placed in the page shows as it always has. */
open:boolean;
/** Floats it in the top layer, centred above the bottom of the viewport, with its motion. */
floating:boolean;
/** Closes it after this many ms. 0 keeps it until dismissed. */
duration:number;
/** The action's text. Defaults per status (Undo, View, Action); "" removes it. */
actionLabel?:string;
/** Called when the action is pressed, as well as the `action` event. */
actionClick?:()=>void;
/** Shows the close. Unset, it follows the status; `show-close="false"` turns it off. */
showClose:boolean|null;
/** The legacy switch for the close. */
hasCloseAction:boolean;
/** The close's glyph. */
closeActionIcon?:ZetaIconName;
/** Accessible name of the close. */
closeLabel:string;private leaving;private slottedIcon;private internals;private timer?;private paused;private get contextual();private get action();private get close();private get dark();
/** The page's mode at the bar: the nearest data-theme above it, else the OS preference. */private pageIsDark;
/** Dark bars take the opposite of the page's mode; tinted bars follow the page. */private syncMode;connectedCallback():void;disconnectedCallback():void;protected willUpdate(changed:PropertyValues<this>):void;protected updated(changed:PropertyValues<this>):void;private get reducedMotion();private enter;private exit;
/** Closes it, as the close button does. */
hide(reason?:ZetaSnackbarCloseReason):void;private arm;private pause;private resume;private onAction;private onIconSlot;render():import("lit-html").TemplateResult<1>|typeof nothing;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-snackbar":ZetaSnackbar;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A brief message about something the app just did, carrying at most one action. `variant` chooses a contextual pill,
 * where `status` sets the tint, the glyph and the controls together, or a plain dark standard bar.
 *
 * It sits in the page by default, as Zeta's snackbar always has. `floating` lifts it into the top layer, centred above
 * the bottom of the viewport, sliding in over 300ms and out over 200ms (a fade only with reduced motion). With
 * `duration` it closes itself, pausing while the pointer or focus is inside. It announces itself politely (negative
 * interrupts). The dark bars carry their own colour mode, so on a dark page they invert to light.
 * ---
 *
 *
 * ### **Events:**
 *  - **close** - It closed; `detail.reason` is "dismiss", "timeout" or "action".
 * - **action** - The action button was pressed. The snackbar then closes.
 *
 * ### **Methods:**
 *  - **hide(reason: _ZetaSnackbarCloseReason_)** - Closes it, as the close button does.
 *
 * ### **Slots:**
 *  - _default_ - The message: one short line, which ends in an ellipsis where it runs out of room.
 * - **icon** - A leading icon, for the statuses without a glyph of their own (default, action and standard).
 *
 * ### **CSS Parts:**
 *  - **surface** - The bar.
 */"zeta-snackbar":Partial<ZetaSnackbarProps&BaseProps&BaseEvents>}}}