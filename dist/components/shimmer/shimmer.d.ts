import{ZetaShimmerProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";
/** Shimmer is a loading skeleton component that displays an animated shimmer effect to indicate content is loading.
 *
 * @cssproperty --shimmer-height - The height of the shimmer element. Default: 20px
 * @cssproperty --shimmer-width - The width of the shimmer element. Default: 100%
 * @cssproperty --shimmer-animation-duration - The duration of the shimmer animation. Default: 1.5s
 * @cssproperty --shimmer-border-radius - The border radius of the shimmer element. Default: 0px
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components
 * @storybook ?path=/docs/components-shimmer--docs
 */export declare class ZetaShimmer extends LitElement{protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare global{interface HTMLElementTagNameMap{"zeta-shimmer":ZetaShimmer;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Shimmer is a loading skeleton component that displays an animated shimmer effect to indicate content is loading.
 * ---
 *
 *
 * ### **CSS Properties:**
 *  - **--shimmer-height** - The height of the shimmer element. Default: 20px _(default: undefined)_
 * - **--shimmer-width** - The width of the shimmer element. Default: 100% _(default: undefined)_
 * - **--shimmer-animation-duration** - The duration of the shimmer animation. Default: 1.5s _(default: undefined)_
 * - **--shimmer-border-radius** - The border radius of the shimmer element. Default: 0px _(default: undefined)_
 */"zeta-shimmer":Partial<ZetaShimmerProps&BaseProps&BaseEvents>}}}