import{ZetaTabBarProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";export*from"./tab-item/tab-item.js";
/** A row of tabs for switching between views at the same level. `flavor="full-width"` divides the row between the
 * tabs; `condensed` hugs them, for a bar that shares a row with other content.
 *
 * Choosing a tab selects it and fires `change`; exactly one tab is selected. The selected tab is the tab stop, and the
 * arrow keys, Home and End move between tabs and select as they go.
 *
 * @cssproperty --tab-bar-background The background colour of the tab bar.
 * @slot - The zeta-tab-items.
 * @event change - A tab was chosen; `detail.index` is its position and `detail.tab` the element.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3607-237
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-tab-bar--docs
 */export declare class ZetaTabBar extends LitElement{
/** Full width divides the row; condensed hugs the tabs (spec: flavour). */
flavor:"full-width"|"condensed";private internals;constructor();private get tabs();private get enabled();
/** Makes the selected tab (or the first enabled one) the only tab stop. */private syncTabStops;private select;private onClick;private onKeyDown;protected firstUpdated(_changed:PropertyValues<this>):void;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-tab-bar":ZetaTabBar;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A row of tabs for switching between views at the same level. `flavor="full-width"` divides the row between the
 * tabs; `condensed` hugs them, for a bar that shares a row with other content.
 *
 * Choosing a tab selects it and fires `change`; exactly one tab is selected. The selected tab is the tab stop, and the
 * arrow keys, Home and End move between tabs and select as they go.
 * ---
 *
 *
 * ### **Events:**
 *  - **change** - A tab was chosen; `detail.index` is its position and `detail.tab` the element.
 *
 * ### **Slots:**
 *  - _default_ - The zeta-tab-items.
 *
 * ### **CSS Properties:**
 *  - **--tab-bar-background** - The background colour of the tab bar. _(default: undefined)_
 */"zeta-tab-bar":Partial<ZetaTabBarProps&BaseProps&BaseEvents>}}}