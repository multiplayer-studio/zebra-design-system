import{ZetaDividerProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";
/**
 * A thin line that separates content into sections or groups, such as list rows, cards or menu items. Orientation
 * matches the direction it divides: horizontal between stacked content, vertical between side-by-side content.
 *
 * It fills its container along its length and has no padding of its own, so space it with the layout's gap rather than
 * margins. Assistive technology hears it as a separator.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=2152-8795
 * @storybook ?path=/story/components-divider--divider
 */export declare class ZetaDivider extends LitElement{
/** The direction the line runs. Vertical fills the height of its container, so give that container a height. */
orientation:"horizontal"|"vertical";private internals;constructor();protected updated(changed:PropertyValues<this>):void;static styles:import("lit").CSSResult;}declare global{interface HTMLElementTagNameMap{"zeta-divider":ZetaDivider;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A thin line that separates content into sections or groups, such as list rows, cards or menu items. Orientation
 * matches the direction it divides: horizontal between stacked content, vertical between side-by-side content.
 *
 * It fills its container along its length and has no padding of its own, so space it with the layout's gap rather than
 * margins. Assistive technology hears it as a separator.
 * ---
 *
 */"zeta-divider":Partial<ZetaDividerProps&BaseProps&BaseEvents>}}}