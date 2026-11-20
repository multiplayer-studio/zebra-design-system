import{ZetaNavigationRailProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement,type PropertyValues}from"lit";import type{ZetaIconName}from"../../icons.js";import"./navigation-rail-item.js";import"../button/button.js";import"../icon/icon.js";declare const ZetaNavigationRail_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/**
 * Navigation rails allow navigation between sections of an app: a narrow icon rail at the edge of a desktop view,
 * and a sub menu panel beside it for destinations with a second level.
 *
 * The rail is locked to dark mode whatever the page's mode; `inverse` locks it to light. It sets `expanded`,
 * `showLabel` and `rounded` on every rail part inside it. Widening and narrowing run on animations/smooth, never on
 * first render, and are off under reduced motion.
 *
 * @slot - The menu: `zeta-navigation-rail-item`s, optionally separated by a `zeta-divider`.
 * @slot header - A `zeta-navigation-header`.
 * @slot footer - Destinations pinned to the bottom, above the toggle item.
 * @slot sub-menu-header - A `zeta-sub-menu-header`. The panel shows when it or the sub-menu slot is filled.
 * @slot sub-menu - `zeta-sub-menu-item`s and `zeta-collapsible-menu-item`s.
 * @event expanded-change - Fired when the toggle item widens or narrows the rail; `detail.expanded` is the new state.
 * @event action - Fired when the header action is clicked.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=3453-54061
 * @storybook ?path=/docs/components-navigation-rail--docs
 */export declare class ZetaNavigationRail extends ZetaNavigationRail_base{
/** The wide rail, with every item's label beside its glyph. The toggle item flips it. */
expanded:boolean;
/** Captions under each glyph in the narrow rail (spec: label). No effect when expanded. */
showLabels:boolean;
/** Shows the create or compose action under the header. Off by default, so existing rails keep their layout. */
showHeaderAction:boolean;
/** The header action's label: its text in the wide rail, its name in the narrow one, where only the glyph shows. */
actionLabel:string;
/** The header action's glyph. */
actionIcon:ZetaIconName;
/** Shows the toggle item that widens and narrows the rail. Off by default, so existing rails keep their layout. */
showToggleItem:boolean;
/** The toggle item's label in the narrow rail. */
expandLabel:string;
/** The toggle item's label in the wide rail. */
collapseLabel:string;
/** Shows the rail in light mode instead of its locked dark mode. */
inverse:boolean;
/**
 * The wide rail's width: 200px by default (Figma's measure), a CSS length or a number in px set by the project, or
 * `fill` to take the width of the rail's container. The narrow rail is unaffected.
 */
railWidth?:string|number;
/** Caps the wide rail. A CSS length, or a number in px. The narrow rail is unaffected. */
railMaxWidth?:string|number;
/** Caps the sub menu, which otherwise hugs its rows from 240px up. A cap below 240px lowers the minimum. */
subMenuMaxWidth?:string|number;
/** Accessible name of the navigation landmark. */
navLabel:string;private hasHeader;private hasFooter;private hasPanel;private ready;
/** The form the parts are drawn in. It follows `expanded` at once when widening, but only once the rail has finished
        narrowing, so the shrinking width clips the wide layout instead of every part re-laying itself out mid-way. */private wide;private narrowTimer?;connectedCallback():void;protected willUpdate(changed:PropertyValues<this>):void;disconnectedCallback():void;
/** The rail's width transition in ms; 0 under reduced motion. The timer is the fallback for a missed transitionend. */private transitionMs;private narrow;private onTransitionEnd;protected updated():void;private syncParts;private onSlot;private toggle;private onAction;private renderAction;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-navigation-rail":ZetaNavigationRail;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * Navigation rails allow navigation between sections of an app: a narrow icon rail at the edge of a desktop view,
 * and a sub menu panel beside it for destinations with a second level.
 *
 * The rail is locked to dark mode whatever the page's mode; `inverse` locks it to light. It sets `expanded`,
 * `showLabel` and `rounded` on every rail part inside it. Widening and narrowing run on animations/smooth, never on
 * first render, and are off under reduced motion.
 * ---
 *
 *
 * ### **Events:**
 *  - **expanded-change** - Fired when the toggle item widens or narrows the rail; `detail.expanded` is the new state.
 * - **action** - Fired when the header action is clicked.
 *
 * ### **Slots:**
 *  - _default_ - The menu: `zeta-navigation-rail-item`s, optionally separated by a `zeta-divider`.
 * - **header** - A `zeta-navigation-header`.
 * - **footer** - Destinations pinned to the bottom, above the toggle item.
 * - **sub-menu-header** - A `zeta-sub-menu-header`. The panel shows when it or the sub-menu slot is filled.
 * - **sub-menu** - `zeta-sub-menu-item`s and `zeta-collapsible-menu-item`s.
 */"zeta-navigation-rail":Partial<ZetaNavigationRailProps&BaseProps&BaseEvents>}}}