import{ZetaProgressCircleProps,BaseProps,BaseEvents}from"../../../jsx.js";import{LitElement}from"lit";import"../../icon/icon.js";import"../../button/icon-button/icon-button.js";
/** Ring diameters by spec size, measured in Figma (spec warn "Sizes aren't tokens"). */declare const DIAMETERS:{readonly xxsmall:24;readonly xsmall:36;readonly small:40;readonly medium:48;readonly large:64;};export type ProgressCircleSize=keyof typeof DIAMETERS|20|24|36|40|48|64;declare const ZetaProgressCircle_base:import("../../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Progress indicators express an unspecified wait time or display the length of a process.
 *
 * A ring whose arc starts at twelve o'clock and runs clockwise. With `upload` (small and up) a readout sits in the
 * middle and swaps for a cancel button on hover or focus. The ring is a `progressbar`.
 *
 * @event {CustomEvent<ZetaCancelUploadEventDetail>} cancelUpload - Fired when the cancel button is clicked.
 *
 * @cssproperty --progress-circle-color The color of the arc. Defaults to border/info.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=4416-77
 * @storybook ?path=/docs/components-progress--docs
 */export declare class ZetaProgressCircle extends ZetaProgressCircle_base{static styles:import("lit").CSSResultGroup[];
/** Size: xxsmall (24px), xsmall (36px), small (40px), medium (48px) or large (64px). Pixel numbers still work. */
size:ProgressCircleSize;
/** Progress (0-100). */get progress():number;
/** Displays the indeterminate progress indicator. If set to true, any argument for 'value' will be ignored. */
indeterminate?:boolean;
/** The type of the progress circle. `upload` is the same as setting the upload property. */type:"default"|"upload";
/** Places the readout and cancel control at the centre. No effect at xsmall or xxsmall, where it is not built. */
upload:boolean;
/** Shows the unfilled track behind the arc. */
showTrack:boolean;
/** Accessible name of the cancel button. */
cancelLabel:string;
/** Accessible name of the progress ring. */
label:string;set progress(value:number);private progressValue;private strokeWidth;private get diameter();protected firstUpdated():void;private renderUpload;protected render():import("lit").TemplateResult<1>;}declare global{interface HTMLElementTagNameMap{"zeta-progress-circle":ZetaProgressCircle;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Progress indicators express an unspecified wait time or display the length of a process.
 *
 * A ring whose arc starts at twelve o'clock and runs clockwise. With `upload` (small and up) a readout sits in the
 * middle and swaps for a cancel button on hover or focus. The ring is a `progressbar`.
 * ---
 *
 *
 * ### **Events:**
 *  - **cancelUpload** - Fired when the cancel button is clicked.
 *
 * ### **CSS Properties:**
 *  - **--progress-circle-color** - The color of the arc. Defaults to border/info. _(default: undefined)_
 */"zeta-progress-circle":Partial<ZetaProgressCircleProps&BaseProps&BaseEvents>}}}