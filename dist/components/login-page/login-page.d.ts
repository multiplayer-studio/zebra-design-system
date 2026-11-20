import{ZetaLoginPageProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../button/button.js";declare const ZetaLoginPage_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * TODO
 *
 * @figma TODO
 * @storybook https://design.zebra.com/web/storybook/?path=/story/templates-login-page--login-page
 */export declare class ZetaLoginPage extends ZetaLoginPage_base{
/** The URL to redirect to when the Sign in button is pressed */
url:string;
/** Name of Zebra Product. */
name:string;
/** Extra information to display to the user to inform them what they are signing into */
description?:string;login():void;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-login-page":ZetaLoginPage;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * TODO
 * ---
 *
 */"zeta-login-page":Partial<ZetaLoginPageProps&BaseProps&BaseEvents>}}}