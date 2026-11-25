import * as React from "react";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Radio } from "@base-ui/react/radio";
import { Icon, type IconName } from "../icon/Icon.js";
import "./segmented-control.css";

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
  /**
   * The option's name. Shown as the label, and the segment's accessible name
   * (and `title`) when the control is `icon-only`. Keep it to one or two words.
   */
  label: string;
  /** Leading glyph. Replaces Figma's locked Star (spec issue "Icon locked to star"). */
  icon?: IconName;
  /** This one option cannot be chosen. */
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<
    RadioGroup.Props<string>,
    "className" | "value" | "defaultValue" | "onValueChange" | "children"
  > {
  /** The options, in order. Each segment hugs its own content. */
  options?: readonly SegmentedControlOption[];
  /**
   * The chosen option's value (controlled). A value that matches no enabled
   * option shows the first enabled option instead: one is always chosen.
   */
  value?: string;
  /** The option chosen at first (uncontrolled). Falls back to the first enabled option, so exactly one is always chosen. */
  defaultValue?: string;
  /** Called when the user chooses another option. */
  onValueChange?: (value: string, eventDetails: RadioGroup.ChangeEventDetails) => void;
  /** Rounded, sharp or pill-shaped corners on the track, every segment and the active indicator. Match the surrounding controls. */
  shape?: SegmentedControlShape;
  /**
   * Stronger emphasis on the chosen option (the spec's control Flavour
   * `inverse`): a dark chosen segment on a lighter, bordered track.
   */
  inverse?: boolean;
  /**
   * What every segment shows. `default`: icon + label (an option without an
   * icon shows its label alone). `text-only`: labels only, icons hidden even
   * when options have them. `icon-only`: icons only, each label becomes the
   * segment's accessible name and `title`; an option without an icon still
   * shows its label, so nothing goes unnamed on screen.
   */
  flavour?: SegmentedControlFlavour;
  className?: string;
}

// Hoisted: a fresh [] default would be a new identity every render.
const NO_OPTIONS: readonly SegmentedControlOption[] = [];

/** The flavour one segment renders as: the control's flavour, narrowed by what the option provides. */
export function segmentFlavour(option: SegmentedControlOption, flavour: SegmentedControlFlavour): SegmentedControlFlavour {
  if (flavour === "text-only" || !option.icon) return "text-only";
  return flavour;
}

/**
 * The value actually shown as chosen: `wanted` when it names an enabled
 * option, else the first enabled option (spec Selection: "there most always
 * be an active segment on"). With every option disabled, `wanted` if it names
 * one, else the first.
 */
export function resolveSegmentedValue(options: readonly SegmentedControlOption[], wanted: string | undefined) {
  const enabled = options.filter((o) => !o.disabled);
  if (enabled.some((o) => o.value === wanted)) return wanted;
  if (enabled.length) return enabled[0]!.value;
  return options.some((o) => o.value === wanted) ? wanted : options[0]?.value;
}

/**
 * Places the track's one active indicator over the chosen segment by writing
 * its box into custom properties on the track. `data-indicator` turns the
 * indicator on (until then the chosen segment carries its own fill), and
 * `data-sliding` turns the transition on only when the chosen value changed —
 * so the first placement lands in place.
 */
function placeIndicator(track: HTMLElement, index: number, slide?: boolean): boolean {
  const seg = track.querySelectorAll<HTMLElement>(".zds-segmented-control__segment")[index];
  if (!seg) {
    track.removeAttribute("data-indicator");
    return false;
  }
  // Read everything first, then write: a layout read between the writes
  // would commit the new position before [data-sliding] lands, and that
  // property would jump instead of sliding.
  const t = track.getBoundingClientRect();
  const s = seg.getBoundingClientRect();
  const x = s.left - t.left - track.clientLeft;
  const y = s.top - t.top - track.clientTop;
  // undefined (a re-measure) leaves the sliding state as it is, so a
  // re-measure mid-slide cannot cut the slide short.
  if (slide !== undefined) track.toggleAttribute("data-sliding", slide);
  const st = track.style;
  st.setProperty("--zds-seg-indicator-x", `${x}px`);
  st.setProperty("--zds-seg-indicator-y", `${y}px`);
  st.setProperty("--zds-seg-indicator-w", `${s.width}px`);
  st.setProperty("--zds-seg-indicator-h", `${s.height}px`);
  track.setAttribute("data-indicator", "");
  return true;
}

/**
 * A row of mutually exclusive options sharing one track, where exactly one
 * is active at a time. Use it to switch a mode within one view; reach for
 * tabs when the choice moves between views.
 *
 * Behaviour comes from Base UI's RadioGroup + Radio, not ToggleGroup. A
 * single-mode ToggleGroup is a row of `aria-pressed` buttons that can be
 * un-pressed back to no value and whose arrow keys only move focus; the spec
 * asks for exactly one active option and a radiogroup role, which is what
 * RadioGroup is: `role="radiogroup"` / `role="radio"` + `aria-checked`, one
 * tab stop, arrow keys move and select, no way to deselect, plus a hidden
 * input for forms. The value is always passed down controlled, so a value
 * that names no enabled option can fall back to the first enabled one.
 *
 * The active background is one indicator bound to the track, not to a
 * segment, and slides between segments (spec Motion). RadioGroup has no
 * indicator part, so the chosen segment is measured (layout effect +
 * ResizeObserver) into custom properties the CSS positions it from.
 *
 * Name the control with `aria-label` or `aria-labelledby`.
 *
 * Kept in step with packages/web-components `<zds-segmented-control>`.
 *
 * @spec specs/segmented-control/segmented-control.spec.md
 */
export const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControl(
    {
      options = NO_OPTIONS,
      value,
      defaultValue,
      onValueChange,
      shape = "rounded",
      inverse = false,
      flavour = "default",
      className,
      ...rest
    },
    ref,
  ) {
    const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
    const current = resolveSegmentedValue(options, value !== undefined ? value : uncontrolled);
    const index = options.findIndex((o) => o.value === current);

    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        trackRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    // Measure after every layout-affecting change, before paint. The first
    // placement lands in place, a change of value slides, anything else
    // re-measures and leaves the sliding state alone.
    const placed = React.useRef<string | undefined>(undefined);
    const indexRef = React.useRef(index);
    indexRef.current = index;
    React.useLayoutEffect(() => {
      const track = trackRef.current;
      if (!track) return;
      // Only a placement that landed counts (options can arrive after mount).
      if (placeIndicator(track, index, placed.current === undefined ? false : placed.current !== current || undefined))
        placed.current = current;
    }, [current, index, options, shape, flavour, inverse]);

    // Segment sizes change without a render (web fonts landing, the track
    // reflowing): re-measure, leaving the sliding state alone.
    React.useLayoutEffect(() => {
      const track = trackRef.current;
      if (!track || typeof ResizeObserver === "undefined") return;
      const ro = new ResizeObserver(() => placeIndicator(track, indexRef.current));
      ro.observe(track);
      track.querySelectorAll(".zds-segmented-control__segment").forEach((s) => ro.observe(s));
      return () => ro.disconnect();
    }, [options, flavour]);

    // The icon family stays rounded in every shape: Figma pins the rounded
    // Star in all 54 _Segmented item variants (spec note "The icon family
    // stays rounded in every Shape"), unlike Button.
    return (
      <RadioGroup<string>
        ref={setRefs}
        {...rest}
        value={current}
        onValueChange={(v, details) => {
          setUncontrolled(v);
          onValueChange?.(v, details);
        }}
        className={["zds-segmented-control", className].filter(Boolean).join(" ")}
        data-shape={shape}
        data-inverse={inverse ? "" : undefined}
        data-flavour={flavour}
      >
        <span className="zds-segmented-control__indicator" aria-hidden="true" />
        {options.map((o) => {
          const f = segmentFlavour(o, flavour);
          return (
            <Radio.Root
              key={o.value}
              value={o.value}
              disabled={o.disabled}
              className="zds-segmented-control__segment"
              data-flavour={f}
              aria-label={f === "icon-only" ? o.label : undefined}
              title={f === "icon-only" ? o.label : undefined}
            >
              {o.icon && f !== "text-only" ? (
                <Icon className="zds-segmented-control__icon" name={o.icon} size="small" iconStyle="rounded" />
              ) : null}
              {f !== "icon-only" ? <span className="zds-segmented-control__label">{o.label}</span> : null}
            </Radio.Root>
          );
        })}
      </RadioGroup>
    );
  },
);
