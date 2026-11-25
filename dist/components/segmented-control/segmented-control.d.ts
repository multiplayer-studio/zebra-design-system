import { LitElement, type PropertyValues } from "lit";
import type { IconName } from "@zebra-design-system/icons/names";
import "../icon/icon.js";
/** Rounded, square-cornered or pill-shaped track and segments. Spec: the `shape` axis. */
export type SegmentedControlShape = "rounded" | "sharp" | "full";
/**
 * What every segment shows, set once on the control (spec: "Pick one Flavour
 * and hold it across every segment"). This is the segment's Flavour in the
 * spec; the control's own Flavour (default or inverse) is the `inverse` prop. `default` is icon + label, `text-only`
 * the label alone, `icon-only` the icon alone with the label as its
 * accessible name and tooltip.
 */
export type SegmentedControlFlavour = "default" | "text-only" | "icon-only";
/** One option in the control. */
export interface SegmentedControlOption {
    /** The value reported when this option is chosen. Unique within the control. */
    value: string;
    /** The option's name: the label, and the accessible name (and `title`) when the control's flavour is `icon-only`. */
    label: string;
    /** Leading glyph. Replaces Figma's locked Star (spec issue "Icon locked to star"). */
    icon?: IconName;
    /** This one option cannot be chosen. */
    disabled?: boolean;
}
/** The flavour one segment renders as: the control's flavour, narrowed by what the option provides. */
export declare function segmentFlavour(option: SegmentedControlOption, flavour: SegmentedControlFlavour): SegmentedControlFlavour;
/**
 * The value actually shown as chosen: `wanted` when it names an enabled
 * option, else the first enabled option (spec Selection: "there most always
 * be an active segment on"). With every option disabled, `wanted` if it names
 * one, else the first.
 */
export declare function resolveSegmentedValue(options: readonly SegmentedControlOption[], wanted: string | undefined): string | undefined;
/**
 * A row of mutually exclusive options sharing one track, where exactly one
 * is active at a time. Use it to switch a mode within one view; reach for
 * tabs when the choice moves between views.
 *
 * A radio group, matching the React package's Base UI RadioGroup: an inner
 * `role="radiogroup"` holding one `role="radio"` + `aria-checked` per option,
 * one tab stop (roving tabindex on the chosen option), arrow keys move and
 * select with wrap-around (mirrored in RTL), Space selects, and nothing can
 * be deselected — exactly one option is always chosen: a `value` that names
 * no enabled option falls back to the first enabled one (spec Selection).
 * The value is submitted with a form under `name`.
 *
 * The active background is one indicator bound to the track, not to a
 * segment, and slides between segments (spec Motion). The chosen segment is
 * measured in `updated()` and by a ResizeObserver into custom properties the
 * styles position it from, as the React package does.
 *
 * Options are data, not slotted children (spec note: the slot "makes use of
 * the segment options"): set `options` as a property, or as JSON in the
 * attribute.
 *
 * @fires zds-value-change - The user chose another option. `detail.value` is the new value.
 * @csspart track - The radiogroup track.
 * @csspart segment - Each option.
 *
 * @spec specs/segmented-control/segmented-control.spec.json
 */
export declare class ZdsSegmentedControl extends LitElement {
    static styles: import("lit").CSSResult;
    static formAssociated: boolean;
    /** The options, in order. Each segment hugs its own content. */
    options: SegmentedControlOption[];
    /** The chosen option's value. One that names no enabled option (or empty) falls back to the first enabled option, so exactly one is always chosen. */
    value: string;
    /** Rounded, sharp or pill-shaped corners on the track, every segment and the active indicator. Match the surrounding controls. */
    shape: SegmentedControlShape;
    /** Stronger emphasis on the chosen option (the spec's control Flavour `inverse`): a dark chosen segment on a lighter, bordered track. */
    inverse: boolean;
    /**
     * What every segment shows. `default`: icon + label (an option without an
     * icon shows its label alone). `text-only`: labels only, icons hidden even
     * when options have them. `icon-only`: icons only, each label becomes the
     * segment's accessible name and `title`; an option without an icon still
     * shows its label, so nothing goes unnamed on screen.
     */
    flavour: SegmentedControlFlavour;
    /** Disables every option. */
    disabled: boolean;
    /** Accessible name of the control. */
    label: string | null;
    /** Field name submitted with a form. */
    name: string | null;
    private readonly internals;
    private defaultValue;
    /** The value the indicator was last placed on; undefined before the first placement. */
    private placed;
    private resizeObserver;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues<this>): void;
    protected updated(changed: PropertyValues<this>): void;
    private get track();
    /** Segment sizes change without an update (web fonts landing, reflow): re-measure. */
    private observeSegments;
    /**
     * Places the track's one active indicator over the chosen segment by
     * writing its box into custom properties on the track. `data-indicator`
     * turns the indicator on (until then the chosen segment carries its own
     * fill) and `data-sliding` turns the transition on only for a change of
     * value, so the first placement lands in place.
     */
    private placeIndicator;
    private get segments();
    private isDisabled;
    private choose;
    private onKeyDown;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    protected render(): import("lit").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "zds-segmented-control": ZdsSegmentedControl;
    }
}
//# sourceMappingURL=segmented-control.d.ts.map