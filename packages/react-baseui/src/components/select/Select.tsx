import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Field } from "@base-ui/react/field";
import { Icon, type IconName } from "../icon/Icon.js";
import { CaretIndicator } from "../caret-indicator/CaretIndicator.js";
import { InputHint } from "../input/InputHint.js";
import type { InputFieldSize, InputFieldShape, InputFieldFlavour } from "../input-field/InputField.js";
import type { InputState, InputLabelType } from "../input/Input.js";
import "../input-field/input-field.css";
import "../input/input.css";
import "../dropdown-menu/dropdown-menu.css";
import "../menu-item/menu-item.css";
import "./select.css";

export interface SelectOption {
  value: string;
  /** What the row and the field show. Defaults to `value`. */
  label?: string;
  /** Glyph ahead of the label, in the row and in the field once chosen. */
  icon?: IconName;
  disabled?: boolean;
}

/** Input / Select's State axis. Interaction states are derived; `invalid`, `read-only` and `disabled` come from props. */
export type SelectFieldState = "enabled" | "open" | "filled" | "invalid" | "read-only" | "disabled";
export type SelectSize = InputFieldSize;
export type SelectShape = InputFieldShape;
export type SelectFlavour = InputFieldFlavour;
export type SelectState = InputState;
export type SelectLabelType = InputLabelType;

export interface SelectProps {
  /** The choices, in order. Each row is a Menu Item. */
  options?: ReadonlyArray<SelectOption>;
  /** The chosen option's `value` (controlled). `null` for none. */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Whether the list is open (controlled) — the spec's Open. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Shown in the field while nothing is chosen. Not a label. */
  placeholder?: string;
  /** The field's name, shown above it. Empty hides the label (Show Label). */
  label?: React.ReactNode;
  /** Marker after the name: none, an asterisk (`required`) or `(optional)`. Mark whichever is the exception. */
  labelType?: SelectLabelType;
  /** Adds an information icon after the name (the label's Show Information). */
  information?: boolean;
  /** Accessible name of the information icon. */
  informationLabel?: string;
  /** Supporting line below the field; carries the reason when `state` is invalid. Empty hides it (Show Hint). */
  hint?: React.ReactNode;
  /** Icon ahead of the hint (the hint's Show Icon). */
  hintIcon?: boolean;
  /** One state across label, field and hint (spec issue 8: code owns the assembly state, as on Input). */
  state?: SelectState;
  /** The value is shown but cannot be changed. Stays legible and in the tab order. */
  readOnly?: boolean;
  /** Form field name. */
  name?: string;
  /** Glyph at the field's leading edge (hasLeading). A chosen option's own `icon` replaces it. */
  leadingIcon?: IconName | null;
  /** Field height; only `small` also reduces the text. */
  size?: SelectSize;
  /** Field corners, as Input Field. The list is always rounded (spec issue 14). */
  shape?: SelectShape;
  /** `default` inside a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction. */
  flavour?: SelectFlavour;
  /** Opens the list on the compact Dropdown Menu: a space/xs inset and no gap between rows, for a cramped spot. */
  compact?: boolean;
  /**
   * Where the list mounts. Defaults to the Select's own root, so the list
   * stays inside any `.ext-*` / `.mode-*` scope the Select sits in; it is
   * positioned `fixed`, so an `overflow: hidden` ancestor does not clip it.
   */
  portalContainer?: React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>["container"];
  /** Accessible name when there is no visible `label`. */
  "aria-label"?: string;
  className?: string;
}

// Hoisted: a fresh [] default would change identity every render.
const NO_OPTIONS: ReadonlyArray<SelectOption> = [];

/**
 * The full select assembly: a label above, a Select Field in the middle and a
 * hint below, stacked and spaced as one unit. Opening it reveals a Dropdown
 * Menu of the options, overlaid below the field.
 *
 * Built by composition: the field wears Input Field's classes and `data-*`
 * axes, the list Dropdown Menu's panel and Menu Item's rows, the label and
 * hint Input's. `select.css` holds only the deltas — the `open` state, the
 * placeholder colour, the list's width and scroll.
 *
 * Behaviour — the WAI-ARIA listbox select (a button with `aria-haspopup`
 * and `aria-expanded`, `role="listbox"` / `role="option"` with
 * `aria-selected`), typeahead, arrow / Home / End navigation, Enter or Space
 * to choose, Escape to close, focus return, collision flipping and form
 * participation — comes from Base UI's Select. That model opens on Enter,
 * Space and the arrow keys, so it satisfies both metadata keyboard
 * descriptions (spec issue 7: Select's "Space or Enter" and Select Field's
 * "Alt+Down or Enter"); it follows Select's, the fuller one.
 *
 * The field's State is derived and reflected as `data-state`, in Input /
 * Select's names: open → `open` (spec issue 11: not Input Field's
 * `selected`), a value at rest → `filled`, plus `invalid`, `read-only` and
 * `disabled` from props. Keyboard focus is `:focus-visible`. Open outranks
 * invalid, as focus does on Input Field.
 *
 * Kept in step with packages/web-components `<zds-select>`.
 *
 * @spec specs/select/select.spec.md
 */
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    options = NO_OPTIONS, value: valueProp, defaultValue = null, onValueChange,
    open: openProp, defaultOpen = false, onOpenChange,
    placeholder = "Select an option", label, labelType = "default", information = false, informationLabel = "More information",
    hint, hintIcon = true, state = "default", readOnly = false,
    name, leadingIcon = null, size = "medium", shape = "rounded", flavour = "default", compact = false,
    portalContainer, "aria-label": ariaLabel, className,
  },
  ref,
) {
  const [innerValue, setInnerValue] = React.useState<string | null>(defaultValue);
  const value = valueProp === undefined ? innerValue : valueProp;
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const open = openProp ?? innerOpen;
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  // The default portal target is the Select's own root, known only after
  // mount: hold the list back until then so it never lands in <body> first.
  const [root, setRoot] = React.useState<HTMLDivElement | null>(null);
  const setRootRef = React.useCallback((el: HTMLDivElement | null) => { rootRef.current = el; setRoot(el); }, []);
  const container = portalContainer ?? root;

  const disabled = state === "disabled";
  const invalid = state === "invalid";
  const hintType = disabled ? "disabled" : invalid ? "error" : "default";
  const chosen = options.find((o) => o.value === value) ?? null;

  const fieldState: SelectFieldState = disabled ? "disabled"
    : open ? "open"
    : invalid ? "invalid" : readOnly ? "read-only" : chosen ? "filled" : "enabled";

  const items = React.useMemo(() => options.map((o) => ({ value: o.value, label: o.label ?? o.value })), [options]);
  const iconSize = size === "small" ? "small" : "medium";
  const shownIcon = chosen?.icon ?? leadingIcon;

  // Positioner offsets take a number, never a CSS value: resolve --space-xxs
  // (the spec's 4 Px under the field) at the field's place in the cascade.
  const sideOffset = React.useCallback(() => {
    if (typeof window === "undefined") return 4; // SSR fallback: --space-xxs's shipped 4px.
    const px = parseFloat(getComputedStyle(rootRef.current ?? document.documentElement).getPropertyValue("--space-xxs"));
    return Number.isFinite(px) ? px : 4;
  }, []);

  return (
    <Field.Root ref={setRootRef} className={["zds-input", "zds-select", className].filter(Boolean).join(" ")} name={name} disabled={disabled} invalid={invalid} data-state={state}>
      {label ? (
        <Field.Label className="zds-input__label" nativeLabel={false} render={<div />}>
          <span className="zds-input__name">{label}</span>
          {labelType === "required" ? <span className="zds-input__required" aria-hidden="true">*</span> : null}
          {labelType === "optional" ? <span className="zds-input__optional">(optional)</span> : null}
          {information ? <Icon className="zds-input__information" name="info" size="medium" iconStyle="rounded" label={informationLabel} /> : null}
        </Field.Label>
      ) : null}
      <BaseSelect.Root
        items={items}
        value={value}
        onValueChange={(v) => { if (valueProp === undefined) setInnerValue(v); onValueChange?.(v); }}
        open={open}
        onOpenChange={(o) => { if (openProp === undefined) setInnerOpen(o); onOpenChange?.(o); }}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        required={labelType === "required"}
      >
        <BaseSelect.Trigger
          ref={ref}
          aria-label={label ? undefined : ariaLabel}
          className="zds-input-field zds-select__trigger"
          data-size={size} data-shape={shape} data-flavour={flavour} data-state={fieldState}
        >
          {shownIcon ? <Icon className="zds-input-field__icon" name={shownIcon} size={iconSize} iconStyle="rounded" /> : null}
          <BaseSelect.Value className="zds-input-field__input zds-select__value" data-empty={chosen ? undefined : ""} placeholder={placeholder} />
          {/* One glyph turned, in place of Figma's expand-more / expand-less
              swap (spec issue 12, owner decision): the shared Caret Indicator
              at the field's icon size, on the field's text colour. */}
          <BaseSelect.Icon className="zds-select__chevron" render={<span />}>
            <CaretIndicator direction="vertical" open={open} size={iconSize} />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        {container ? <BaseSelect.Portal container={container}>
          {/* Spec issue 13: always below, 4 Px off, flipping above only when
              there is no room (Figma has no collision case to copy). */}
          <BaseSelect.Positioner className="zds-select__positioner" alignItemWithTrigger={false}
            side="bottom" align="start" sideOffset={sideOffset} positionMethod="fixed">
            {/* Spec issue 14: the Dropdown Menu is always Rounded=true. */}
            <BaseSelect.Popup className="zds-dropdown-menu zds-select__popup" data-rounded="true" data-compact={compact}>
              <BaseSelect.List className="zds-dropdown-menu__content">
                {options.map((o) => (
                  <BaseSelect.Item key={o.value} value={o.value} disabled={o.disabled}
                    className="zds-menu-item zds-select__item" data-rounded="true">
                    {o.icon ? <span className="zds-menu-item__leading"><Icon name={o.icon} size="small" /></span> : null}
                    <BaseSelect.ItemText className="zds-menu-item__label zds-select__item-label">{o.label ?? o.value}</BaseSelect.ItemText>
                    {/* Spec issue 6: the set description's reading — Menu
                        Item State=selected plus a trailing check-mark. */}
                    <BaseSelect.ItemIndicator className="zds-menu-item__trailing zds-select__check">
                      <Icon name="check-mark" size="small" iconStyle="rounded" />
                    </BaseSelect.ItemIndicator>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal> : null}
      </BaseSelect.Root>
      {hint ? <InputHint type={hintType} icon={hintIcon}>{hint}</InputHint> : null}
    </Field.Root>
  );
});
