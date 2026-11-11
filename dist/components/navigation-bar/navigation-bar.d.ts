import{ZetaNavigationBarProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";export*from"../grid-menu-item/grid-menu-item.js";
/**
 * A bottom bar of an app's primary destinations, built from `zeta-grid-menu-item`s. A second group in the `right`
 * slot sits at the far end, for account or utility entries, with an optional rule between the two (`showDivider`).
 * The `action` slot holds a single button for a call to action that is not a destination.
 *
 * @slot - The main group of destinations: `zeta-grid-menu-item`s.
 * @slot right - A second group at the far end (spec: spacer).
 * @slot action - A single action at the end of the bar, such as a zeta-button.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2835-796
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-navigation-bar--docs
 */export declare class ZetaNavigationBar extends LitElement{
/** Items keep their natural width and the groups sit against the ends. Off, the items share the width evenly. */
shrinkItems:boolean;
/** Draws a vertical rule between the main and the `right` group. */
showDivider:boolean;private hasRight;private hasAction;connectedCallback():void;private filled;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-bar":ZetaNavigationBar;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A bottom bar of an app's primary destinations, built from `zeta-grid-menu-item`s. A second group in the `right`
 * slot sits at the far end, for account or utility entries, with an optional rule between the two (`showDivider`).
 * The `action` slot holds a single button for a call to action that is not a destination.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The main group of destinations: `zeta-grid-menu-item`s.
 * - **right** - A second group at the far end (spec: spacer).
 * - **action** - A single action at the end of the bar, such as a zeta-button.
 */"zeta-navigation-bar":Partial<ZetaNavigationBarProps&BaseProps&BaseEvents>}}}