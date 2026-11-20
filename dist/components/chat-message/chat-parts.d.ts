import{ZetaChatBubbleProps,ZetaChatTimestampProps,ZetaChatLoadingIndicatorProps,ZetaChatControlsProps,BaseProps,BaseEvents}from"../../jsx.js";import{LitElement}from"lit";import"../button/icon-button/icon-button.js";declare const ZetaChatBubble_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** The text of a message. fill: a tinted bubble that wraps at 80% of the chat; none: plain text on the page. In a run
 * the corner toward the neighbour tightens.
 *
 * @slot - The message text.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19217
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */export declare class ZetaChatBubble extends ZetaChatBubble_base{
/** fill: a tinted bubble; none: plain text. */
bubbleStyle:"fill"|"none";
/** Position in a run of one sender's bubbles. */
status:"single"|"first"|"middle"|"last";
/** The spec's Role, named so as not to collide with the ARIA role attribute. */
roleName:"sender"|"receiver";protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}
/** The send time, formatted by the product.
 *
 * @slot - The time.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-24563
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */export declare class ZetaChatTimestamp extends LitElement{protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResult[];}declare const ZetaChatLoadingIndicator_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** Stands in while the assistant or someone else produces a reply: three pulsing dots and a short present-tense label.
 *
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19269
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */export declare class ZetaChatLoadingIndicator extends ZetaChatLoadingIndicator_base{
/** What is happening: Thinking, Typing. */
label:string;connectedCallback():void;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare const ZetaChatControls_base:import("../../mixins/utils.js").Constructor<{rounded:boolean;}&LitElement>&typeof LitElement;
/** The bar of message actions: React, the Control Slot (Reply by default) and More. React and More are toggles; only
 * one of their panels is open at a time. Every control follows `rounded`.
 *
 * @slot - The Control Slot: extra actions. Reply when empty.
 * @event {CustomEvent} react - React pressed.
 * @event {CustomEvent} more - More pressed.
 * @figma https://www.figma.com/design/hvRmnZZOZrmTW0wf8hbrt5/Zebra-Design-System?node-id=8414-19258
 * @storybook https://design.zebra.com/web/storybook/?path=/docs/components-chat-message--docs
 */export declare class ZetaChatControls extends ZetaChatControls_base{
/** fill: a floating bar; none: transparent (the assistant's). */
controlsStyle:"fill"|"none";
/** Shows the React toggle. */
showReact:boolean;
/** Shows the More toggle. */
showMore:boolean;
/** The reactions row is open. */
reactOpen:boolean;
/** The menu is open. */
moreOpen:boolean;private filled;connectedCallback():void;private fire;protected render():import("lit").TemplateResult<1>;static styles:import("lit").CSSResultGroup[];}declare global{interface HTMLElementTagNameMap{"zeta-chat-bubble":ZetaChatBubble;"zeta-chat-timestamp":ZetaChatTimestamp;"zeta-chat-loading-indicator":ZetaChatLoadingIndicator;"zeta-chat-controls":ZetaChatControls;}}export{};declare module"react"{namespace JSX{interface IntrinsicElements{
/**
 * The text of a message. fill: a tinted bubble that wraps at 80% of the chat; none: plain text on the page. In a run
 * the corner toward the neighbour tightens.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The message text.
 */"zeta-chat-bubble":Partial<ZetaChatBubbleProps&BaseProps&BaseEvents>
/**
 * The send time, formatted by the product.
 * ---
 *
 *
 * ### **Slots:**
 *  - _default_ - The time.
 */"zeta-chat-timestamp":Partial<ZetaChatTimestampProps&BaseProps&BaseEvents>
/**
 * Stands in while the assistant or someone else produces a reply: three pulsing dots and a short present-tense label.
 * ---
 *
 */"zeta-chat-loading-indicator":Partial<ZetaChatLoadingIndicatorProps&BaseProps&BaseEvents>
/**
 * The bar of message actions: React, the Control Slot (Reply by default) and More. React and More are toggles; only
 * one of their panels is open at a time. Every control follows `rounded`.
 * ---
 *
 *
 * ### **Events:**
 *  - **n**
 * - **react** - React pressed.
 * - **more** - More pressed.
 *
 * ### **Slots:**
 *  - _default_ - The Control Slot: extra actions. Reply when empty.
 */"zeta-chat-controls":Partial<ZetaChatControlsProps&BaseProps&BaseEvents>}}}