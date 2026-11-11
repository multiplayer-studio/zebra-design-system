import{ZetaScrollbarProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";
/**
 * The scroll indicator for a region that clips its content. A padded gutter holds a pill handle whose position and
 * length mirror the scroll offset; hovering raises a track scrim so the grab target reads. The scrolling region, not
 * the bar, owns the behaviour: the element is presentational, takes no focus and fires no events — expose scrolling
 * through the region itself.
 *
 * `value` and `size` are code inputs the spec leaves to the implementation (Figma draws one sample). Size the bar to
 * the region's edge with `--scrollbar-length` (typically `100%`); unset, it draws at the sample length.
 *
 * @cssproperty --scrollbar-length - The bar's length along its axis. Defaults to the drawn sample (200px); set it to the scrolling region's edge.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=6057-11947
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-scrollbar--docs
 */export declare class ZetaScrollbar extends LitElement{
/** The axis the region scrolls. Vertical stands against the trailing edge; horizontal lies along the bottom. */
orientation:"vertical"|"horizontal";
/** Where the handle sits: 0 is the start of the content, 1 the end. Code-only — Figma draws one sample. */
value:number;
/** The handle's length as the viewport's share of the content, 0–1. Code-only; defaults to the drawn sample. */
size:number;private internals;constructor();connectedCallback():void;protected willUpdate(changed:PropertyValues<this>):void;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResult;}declare global{interface HTMLElementTagNameMap{"zeta-scrollbar":ZetaScrollbar;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The scroll indicator for a region that clips its content. A padded gutter holds a pill handle whose position and
 * length mirror the scroll offset; hovering raises a track scrim so the grab target reads. The scrolling region, not
 * the bar, owns the behaviour: the element is presentational, takes no focus and fires no events — expose scrolling
 * through the region itself.
 *
 * `value` and `size` are code inputs the spec leaves to the implementation (Figma draws one sample). Size the bar to
 * the region's edge with `--scrollbar-length` (typically `100%`); unset, it draws at the sample length.
 * ---
 *
 *
 * ### **CSS Properties:**
 *  - **--scrollbar-length** - The bar's length along its axis. Defaults to the drawn sample (200px); set it to the scrolling region's edge. _(default: undefined)_
 */"zeta-scrollbar":Partial<ZetaScrollbarProps&BaseProps&BaseEvents>}}}