import{ZetaTopAppbarProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../avatar/avatar.js";import"../button/button.js";import"../button/icon-button/icon-button.js";import"../search/search.js";export type ZetaTopAppbarType="default"|"centered"|"contextual"|"contextual alt"|"search"|"extended";
/** The header at the top of a mobile screen, carrying the screen's name between a leading control and its actions.
 * Setting `type` picks one of six arrangements, each drawing its own leading control and content; slotted content
 * replaces what it draws. Without `type` the element only lays out its slots, and `centered` and `extended` still work.
 *
 * @slot - The content of the appbar.
 * @slot leading - The content to be placed at the start of the appbar.
 * @slot trailing - The content to be placed at the end of the appbar.
 * @slot contextual-controls - The actions on `contextual` and `contextual alt`, in place of `trailing`.
 *
 * @event leading-click - The leading control `type` draws was activated.
 * @event trailing-click - The fixed control on `centered` was activated.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3116-1217
 * @storybook ?path=/docs/components-top-appbar--docs
 */export declare class ZetaTopAppbar extends LitElement{
/** Centers the content of the title. */
centered:boolean;
/** Places the title below the main appbar. */
extended:boolean;
/** The arrangement. Each value brings its own leading control and content. */type?:ZetaTopAppbarType;
/** The bar's own corner. Controls inside keep theirs. */
shape:"sharp"|"rounded";
/** Names the screen when `type` is set and nothing is in the default slot. */
pageTitle?:string;
/** Heading level of the title `type` draws. */
headingLevel:1|2|3|4|5|6;
/** Avatar photo on `default`. Without a photo or initials there is no avatar. */
avatarSrc?:string;
/** Avatar initials on `default`, used when there is no photo. */
avatarInitials?:string;
/** The search field's value on `search`. It opens empty (spec issue: Figma draws its typing state). */
searchValue:string;
/** The selection count on `contextual` and `contextual alt`. Announced when it changes. */
count:string;
/** Accessible name of the leading control `type` draws. */
leadingLabel?:string;
/** Accessible name of the fixed control on `centered`. */
trailingLabel:string;private get isExtended();private get isContextual();private emit;getTitle():import("lit").TemplateResult<1>;private renderAvatar;private renderPageTitle;private renderLeading;private renderTrailing;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare global{interface HTMLElementTagNameMap{"zeta-top-appbar":ZetaTopAppbar;}}declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The header at the top of a mobile screen, carrying the screen's name between a leading control and its actions.
 * Setting `type` picks one of six arrangements, each drawing its own leading control and content; slotted content
 * replaces what it draws. Without `type` the element only lays out its slots, and `centered` and `extended` still work.
 * ---
 *
 *
 * ### **Events:**
 *  - **name**
 * - **leading-click** - The leading control `type` draws was activated.
 * - **trailing-click** - The fixed control on `centered` was activated.
 *
 * ### **Slots:**
 *  - _default_ - The content of the appbar.
 * - **leading** - The content to be placed at the start of the appbar.
 * - **trailing** - The content to be placed at the end of the appbar.
 * - **contextual-controls** - The actions on `contextual` and `contextual alt`, in place of `trailing`.
 */"zeta-top-appbar":Partial<ZetaTopAppbarProps&BaseProps&BaseEvents>}}}