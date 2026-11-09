import { LitElement } from "lit";
import "../dropdown-menu/dropdown-menu.js";
export type DropdownPosition = "bottom" | "top" | "right" | "left";
export type DropdownAlign = "left" | "right" | "bottom" | "top";
/**
 * A pattern, not a single visual component: a trigger paired with a
 * `zds-dropdown-menu` positioned relative to it. `open` shows or hides the
 * menu, `position` picks which side it opens on, and `align` pins which pair
 * of edges line up (spec: "Align pins opposite edges together" — with
 * Position bottom/top the menu's left/right edge lines up with the
 * trigger's, with Position left/right its top/bottom edge does).
 *
 * Composition: the spec's own anatomy nests the Dropdown Menu instance
 * *inside* the template, pinned to `Rounded=true` and exposed so its slot is
 * reachable from outside ("Menu content goes into the nested menu's slot,
 * not the template"). This element mirrors that rather than asking a
 * consumer to place a `zds-dropdown-menu` themselves: the trigger goes in the
 * named `trigger` slot, and everything else — `zds-menu-item` rows — goes in
 * the default slot, which this element forwards into its own internal
 * `zds-dropdown-menu`. `rounded` is exposed here (defaulting `true`, matching
 * the spec's pinned value) so a consumer can still opt into square corners
 * without reaching into the panel directly.
 *
 * Positioning is pure CSS: `.panel` is `position: absolute` against `:host`
 * (`position: relative`, already hugging just the trigger per the spec), with
 * one rule per `position` value setting the matching offset (`top: 100%` for
 * `bottom`, cleared by `--space-sm` — 8px, matching the spec's stated fixed
 * gap) and one rule per applicable `position`×`align` pair pinning the
 * cross-axis edge — see dropdown.styles.ts. No `getBoundingClientRect`, no
 * resize/scroll listeners, no `position: fixed` viewport math.
 *
 * An earlier version used `position: fixed` plus JS-computed `top`/`left` in
 * viewport coordinates, recomputed on open/resize/scroll. That broke
 * specifically on Storybook's Docs page: Docs wraps each embedded story in a
 * zoomable/scaled preview frame, and `position: fixed` resolves against
 * whichever ancestor introduces a `transform` (the zoom's scale), not the
 * viewport — so JS math done in true viewport coordinates landed the panel
 * somewhere that transformed frame never painted it, and the menu appeared
 * not to open at all there even though the same story rendered correctly in
 * Canvas (no transformed ancestor). Anchoring to `:host` with plain CSS
 * offsets has no viewport coordinate to get wrong in the first place, so the
 * whole bug class doesn't apply.
 *
 * No collision detection: the spec itself says flipping `position` near a
 * viewport edge is the implementation's job ("nothing here stops it opening
 * off-screen... is the implementation's job"), and this is an intentional,
 * documented scope reduction versus the React sibling package's Base UI Menu
 * (which gets that for free from floating-ui) rather than an oversight.
 *
 * @slot trigger - The control the menu opens from (a `zds-button` by
 *   default per the spec, but anything focusable works).
 * @slot - The menu's rows, forwarded into the internal `zds-dropdown-menu`.
 * @fires open-change - The open state changed, `{ open: boolean }`.
 * @part panel - The internal `zds-dropdown-menu`.
 *
 * @spec specs/dropdown/dropdown.spec.json
 */
export declare class ZdsDropdown extends LitElement {
    static styles: import("lit").CSSResult;
    /** Shows or hides the menu. The menu stays in the DOM either way, so slotted content is kept. */
    open: boolean;
    /** Which side of the trigger the menu opens on. */
    position: DropdownPosition;
    /** Which pair of edges line up between the trigger and the menu. Only meaningful for the axis `position` doesn't already fix. */
    align: DropdownAlign;
    /** Corner treatment of the internal panel. Matches the spec's pinned `Rounded=true`. */
    rounded: boolean;
    /** Tightens the internal panel's inset for a cramped rail. */
    compact: boolean;
    private triggerSlotEl;
    private readonly onDocumentPointerDown;
    private readonly onDocumentKeydown;
    private hasRenderedOnce;
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    private getTrigger;
    private returnFocusToTrigger;
    private onTriggerClick;
    private close;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-dropdown": ZdsDropdown;
    }
}
//# sourceMappingURL=dropdown.d.ts.map