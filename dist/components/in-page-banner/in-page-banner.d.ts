import{ZetaInPageBannerProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import"../icon/icon.js";import"../button/icon-button/icon-button.js";import type{ZetaIconName}from"@zebra-fed/zeta-icons";export type ZetaInPageBannerStatus="neutral"|"info"|"positive"|"warning"|"negative"|"default";export type ZetaInPageBannerAppearance="subtle"|"solid";declare const ZetaInPageBanner_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** A status message placed inside the content it is about: a form, a card, a panel. It sits in the flow at its
 * container's width. `status` sets the colour and glyph; `appearance` sets how loud it is. Solid interrupts, for the
 * one message on a view that must be seen now. Subtle informs, for context and guidance, and several can share a page.
 *
 * On solid the controls draw light on any fill: slotted actions take `data-theme="dark"`, and the dismiss maps its
 * foreground to foreground/on-strong (Figma pins palette Dark on both). The text keeps a 16rem minimum before the
 * actions wrap beneath it. `status="negative"` interrupts assistive technology; the others announce politely.
 *
 * @slot - The supporting line, when `description` is not set (the legacy way to give the body).
 * @slot actions - The controls the message needs, normally one small zeta-button: outline-subtle on subtle,
 * outline-contrast on solid. The banner sets their shape.
 * @slot action - The legacy name for `actions`.
 *
 * @part banner - The banner surface.
 * @part icon - The container holding the status glyph.
 * @part header - The title.
 * @part body - The supporting line.
 * @part footer - The actions.
 *
 * @event {CustomEvent<ZetaCloseEventDetail>} close - The dismiss was pressed. The product removes the banner.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8051-4995
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-in-page-banner--docs
 */export declare class ZetaInPageBanner extends ZetaInPageBanner_base{
/** The status colour and glyph. `default` is the legacy name for neutral. */
status:ZetaInPageBannerStatus;
/** `solid` interrupts; `subtle` informs. */
appearance:ZetaInPageBannerAppearance;
/** The headline: what happened (spec: title). */
heading:string;
/** The legacy name for `heading`. */
title:string;
/** The supporting line: why, and what to do next. Shown when set. */
description:string;
/** Keeps the status glyph so the banner survives greyscale. */
showIcon:boolean;
/** Replaces the status glyph. */
icon?:ZetaIconName;
/** Shows the dismiss. */
showClose:boolean;
/** The legacy name for `showClose`. */
canClose:boolean;
/** Accessible name of the dismiss. */
closeLabel:string;private hasActions;close():void;protected updated(changed:PropertyValues<this>):void;private syncActions;private onActions;protected render():import("lit-html").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-in-page-banner":ZetaInPageBanner;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * A status message placed inside the content it is about: a form, a card, a panel. It sits in the flow at its
 * container's width. `status` sets the colour and glyph; `appearance` sets how loud it is. Solid interrupts, for the
 * one message on a view that must be seen now. Subtle informs, for context and guidance, and several can share a page.
 *
 * On solid the controls draw light on any fill: slotted actions take `data-theme="dark"`, and the dismiss maps its
 * foreground to foreground/on-strong (Figma pins palette Dark on both). The text keeps a 16rem minimum before the
 * actions wrap beneath it. `status="negative"` interrupts assistive technology; the others announce politely.
 * ---
 *
 *
 * ### **Events:**
 *  - **close** - The dismiss was pressed. The product removes the banner.
 *
 * ### **Slots:**
 *  - _default_ - The supporting line, when `description` is not set (the legacy way to give the body).
 * - **actions** - The controls the message needs, normally one small zeta-button: outline-subtle on subtle, outline-contrast on solid. The banner sets their shape.
 * - **action** - The legacy name for `actions`.
 *
 * ### **CSS Parts:**
 *  - **banner** - The banner surface.
 * - **icon** - The container holding the status glyph.
 * - **header** - The title.
 * - **body** - The supporting line.
 * - **footer** - The actions.
 */"zeta-in-page-banner":Partial<ZetaInPageBannerProps&BaseProps&BaseEvents>}}}