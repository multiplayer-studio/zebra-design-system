import{ZetaEmptyStateProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";declare const ZetaEmptyState_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Empty states are used to convey there is no data is available for display. Types include No results, First use, No Data, User Cleared.
 *
 * @slot primaryAction - Primary Action Button. Should be a `zeta-button`.
 * @slot secondaryAction - Secondary Action Button. Should be a `zeta-button`.
 * @slot illustration - Illustration to be displayed in the empty state. Should be a `zeta-illustration`.
 * @slot title - Title of the empty state. Should be a `h4` element.
 * @slot description - Description of the empty state. Should be a `p` element.
 *
 * @cssproperty --empty-state-max-width - Max width of the empty state. Default is 375px.
 *
 * @part container - The container of the empty state.
 * @part content - The content of the empty state (title, description, actions).
 * @part actions - The container for the action buttons.
 *
 * @figma https://www.figma.com/design/JesXQFLaPJLc1BdBM4sisI/%F0%9F%A6%93-ZDS---Components?node-id=38470-1055
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-empty-state--docs
 */export declare class ZetaEmptyState extends ZetaEmptyState_base{
/** Title of the empty state.
 *
 * @deprecated - The title should be slotted in using the `title` slot. This property will be removed in a future release.
 */
title:string;
/** Description of the empty state
 *
 * @deprecated - The description should be slotted in using the `description` slot. This property will be removed in a future release.
 */
description:string;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-empty-state":ZetaEmptyState;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Empty states are used to convey there is no data is available for display. Types include No results, First use, No Data, User Cleared.
 * ---
 *
 *
 * ### **Slots:**
 *  - **primaryAction** - Primary Action Button. Should be a `zeta-button`.
 * - **secondaryAction** - Secondary Action Button. Should be a `zeta-button`.
 * - **illustration** - Illustration to be displayed in the empty state. Should be a `zeta-illustration`.
 * - **title** - Title of the empty state. Should be a `h4` element.
 * - **description** - Description of the empty state. Should be a `p` element.
 *
 * ### **CSS Properties:**
 *  - **--empty-state-max-width** - Max width of the empty state. Default is 375px. _(default: undefined)_
 *
 * ### **CSS Parts:**
 *  - **container** - The container of the empty state.
 * - **content** - The content of the empty state (title, description, actions).
 * - **actions** - The container for the action buttons.
 */"zeta-empty-state":Partial<ZetaEmptyStateProps&BaseProps&BaseEvents>}}}