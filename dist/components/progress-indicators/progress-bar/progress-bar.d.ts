import{ZetaProgressBarProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";declare const ZetaProgressBar_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Progress indicators express an unspecified wait time or display the length of a process.
 *
 * A determinate bar reports `value` (a share of 1, or of `maxValue`). `indeterminate` slides a short segment along the
 * track. `buffering` adds a band for what has preloaded (`buffer`); the indicator never runs past it, and an
 * indeterminate bar never shows it. The bar is a `progressbar` named by its label.
 *
 * @slot trailing - Supporting detail at the trailing end of the label row (spec: Show More Details).
 * @cssproperty --progress-bar-color The color of the indicator. Defaults to foreground/link.
 * @cssproperty --progress-bar-buffer-color The color of the buffer band.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4275-1997
 * @storybook ?path=/docs/components-progress--docs
 */export declare class ZetaProgressBar extends ZetaProgressBar_base{
/** The thickness: small (8px) for a bar beside other content, large (16px) when progress is the main thing. `thin`
 * and `medium` are the old names for small and large. */
size:"small"|"large"|"thin"|"medium";
/** Displays the indeterminate progress indicator. If set to true, any argument for 'value' will be ignored. */
indeterminate?:boolean;
/**
 * The % complete of the process indicator.
 * Input a floating point number to represent a percentage. Values must be between 0.0-1.0.
 * If maxValue is set, value can be any number between 0 and maxValue.
 */
value:number;
/** If maxValue is null treat value as a percentage */
maxValue?:number;
/** The label for the progress indicator. The label row shows when it is set. */
label?:string;
/** Shows the buffer band for what has preloaded. Determinate bars only. */
buffering?:boolean;
/** How much has preloaded, on the same scale as value. The indicator never runs past it. */
buffer:number;
/** Shows the unfilled track behind the indicator, and the buffer band with it. */
showTrack:boolean;private hasTrailing;private share;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-progress-bar":ZetaProgressBar;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Progress indicators express an unspecified wait time or display the length of a process.
 *
 * A determinate bar reports `value` (a share of 1, or of `maxValue`). `indeterminate` slides a short segment along the
 * track. `buffering` adds a band for what has preloaded (`buffer`); the indicator never runs past it, and an
 * indeterminate bar never shows it. The bar is a `progressbar` named by its label.
 * ---
 *
 *
 * ### **Slots:**
 *  - **trailing** - Supporting detail at the trailing end of the label row (spec: Show More Details).
 *
 * ### **CSS Properties:**
 *  - **--progress-bar-color** - The color of the indicator. Defaults to foreground/link. _(default: undefined)_
 * - **--progress-bar-buffer-color** - The color of the buffer band. _(default: undefined)_
 */"zeta-progress-bar":Partial<ZetaProgressBarProps&BaseProps&BaseEvents>}}}