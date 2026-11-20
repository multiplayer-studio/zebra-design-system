import { LitElement } from "lit";
import type { ButtonSize } from "../button/button.js";
import "../divider/divider.js";
export type ButtonGroupSize = ButtonSize;
export type ButtonGroupShape = "sharp" | "rounded";
/**
 * A row of related actions sharing one bordered surface, where each carries
 * equal weight rather than one leading. Reach for a single `<zds-button>`
 * when one action is clearly the primary one.
 *
 * Items are slotted `<zds-button>` and/or `<zds-icon-button>` children. The
 * group sets each one's `size` from its own, pins `flavour="subtle"` and
 * `shape="sharp"` (spec: size, shape and flavour belong to the group, never
 * set per item) and draws a vertical `<zds-divider>` between every pair.
 * Figma's per-size, per-position wrapper sets are an authoring arrangement
 * and are not reproduced: position comes from the item's index.
 *
 * The dividers sit between slotted children, which a single default slot
 * can't do, so the shadow root uses manual slot assignment: one slot per
 * child, assigned in `updated()`, re-synced whenever children change.
 *
 * Semantics match the React package: a `role="group"` named by `label`, each
 * item its own tab stop (no roving focus — see ButtonGroup.tsx for why Base
 * UI's Toolbar was not used there).
 *
 * @slot - The actions: `<zds-button>` / `<zds-icon-button>` elements.
 * @csspart group - The bordered `role="group"` surface.
 * @csspart divider - Each rule between two items.
 *
 * @spec specs/button-group/button-group.spec.json
 */
export declare class ZdsButtonGroup extends LitElement {
    #private;
    static styles: import("lit").CSSResult;
    static shadowRootOptions: ShadowRootInit;
    /** Row height and the size of every item. The group's call, never set per item. */
    size: ButtonGroupSize;
    /** Rounds the group's outline and the outer ends of its first and last item only. */
    shape: ButtonGroupShape;
    /** The accessible name: what the actions have in common. */
    label: string;
    private _items;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-button-group": ZdsButtonGroup;
    }
}
//# sourceMappingURL=button-group.d.ts.map