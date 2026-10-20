import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Field } from "@base-ui/react/field";
import { Icon, type IconName } from "../icon/Icon.js";
import type { InputFieldSize, InputFieldShape, InputFieldFlavour, InputFieldState } from "../input-field/InputField.js";
import type { InputState, InputLabelType } from "../input/Input.js";
import "../input-field/input-field.css";
import "../input/input.css";
import "../dropdown-menu/dropdown-menu.css";
import "../menu-item/menu-item.css";
import "./select.css";

export interface SelectOption {
  value: string;
  /** What the row and the trigger show. Defaults to `value`. */
  label?: string;
  /** Glyph ahead of the label, in the row and in the trigger once chosen. */
  icon?: IconName;
  disabled?: boolean;
}

export interface SelectProps {
  /** The choices, in order. */
  options: ReadonlyArray<SelectOption>;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Shown in the trigger while nothing is chosen. */
  placeholder?: string;
  /** The field's name, shown above it. Empty hides the label. */
  label?: React.ReactNode;
  /** Marker after the name: none, an asterisk (`required`) or `(optional)`. */
  labelType?: InputLabelType;
  /** Supporting line below the field; carries the reason when `state` is invalid. */
  hint?: React.ReactNode;
  /** One state across label, field and hint — as on Input. */
  state?: InputState;
  readOnly?: boolean;
  /** Form field name. */
  name?: string;
  /** Leading icon in the trigger. A chosen option's own `icon` replaces it. */
  leadingIcon?: IconName | null;
  /** Same three axes as Input Field, so a Select sits in a form beside one. */
  size?: InputFieldSize;
  shape?: InputFieldShape;
  flavour?: InputFieldFlavour;
  /**
   * Where the list mounts. Defaults to `document.body`, which escapes an
   * `.ext-*` / `.mode-*` class scoped below `<body>` — the same caveat as
   * Dropdown's `portalContainer`. Pass the themed root when themes are scoped.
   */
  portalContainer?: React.ComponentPropsWithoutRef<typeof BaseSelect.Portal>["container"];
  /** Accessible name when there is no visible `label`. */
  "aria-label"?: string;
  className?: string;
}

/**
 * EXPERIMENTAL — no Figma spec yet. A single-choice picker that looks like
 * an Input Field at rest and opens a Dropdown Menu of Menu Item rows.
 *
 * Built by composition, not new design: the trigger wears Input Field's
 * classes and `data-*` axes (size, shape, flavour, state), the list wears
 * Dropdown Menu's panel and Menu Item's rows, and the label and hint are
 * Input's. `select.css` holds only the deltas — the chevron, the placeholder
 * colour, the list's width and scroll. A visual change to any of those
 * components reaches Select for free; a spec for Select should replace this.
 *
 * Behaviour — listbox semantics, typeahead, keyboard navigation, focus
 * return, collision flipping, form participation — comes from Base UI's
 * Select. The trigger's `data-state` is derived the way Input Field's is:
 * open → `selected`, a value at rest → `filled`, plus `invalid`,
 * `read-only` and `disabled` from props; keyboard focus is `:focus-visible`.
 *
 * @spec none — experimental. Composes specs/input and specs/dropdown.
 */
export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    options, value: valueProp, defaultValue = null, onValueChange,
    open: openProp, defaultOpen = false, onOpenChange,
    placeholder = "Select…", label, labelType = "default", hint, state = "default", readOnly = false,
    name, leadingIcon = null, size = "medium", shape = "rounded", flavour = "default",
    portalContainer, "aria-label": ariaLabel, className,
  },
  ref,
) {
  const [innerValue, setInnerValue] = React.useState<string | null>(defaultValue);
  const value = valueProp === undefined ? innerValue : valueProp;
  const [innerOpen, setInnerOpen] = React.useState(defaultOpen);
  const open = openProp ?? innerOpen;

  const disabled = state === "disabled";
  const invalid = state === "invalid";
  const hintType = disabled ? "disabled" : invalid ? "error" : "default";
  const chosen = options.find((o) => o.value === value) ?? null;

  const fieldState: InputFieldState = disabled ? "disabled"
    : open ? "selected"
    : invalid ? "invalid" : readOnly ? "read-only" : chosen ? "filled" : "enabled";

  const items = React.useMemo(() => options.map((o) => ({ value: o.value, label: o.label ?? o.value })), [options]);
  const iconSize = size === "small" ? "small" : "medium";
  const shownIcon = chosen?.icon ?? leadingIcon;

  // Positioner offsets take a number, never a CSS value: resolve --space-xs
  // when the list opens, as Dropdown does with --space-sm.
  const sideOffset = React.useCallback(() => {
    if (typeof window === "undefined") return 4; // SSR fallback; --space-xs's shipped 4px.
    const px = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--space-xs"));
    return Number.isFinite(px) ? px : 4;
  }, []);

  return (
    <Field.Root className={["zds-input", "zds-select", className].filter(Boolean).join(" ")} name={name} disabled={disabled} invalid={invalid} data-state={state}>
      {label ? (
        <Field.Label className="zds-input__label" nativeLabel={false} render={<div />}>
          <span className="zds-input__name">{label}</span>
          {labelType === "required" ? <span className="zds-input__required" aria-hidden="true">*</span> : null}
          {labelType === "optional" ? <span className="zds-input__optional">(optional)</span> : null}
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
          {/* Icon family pinned to rounded, as Input Field's controls are. */}
          <BaseSelect.Icon className="zds-select__chevron">
            <Icon name="expand-more" size={iconSize} iconStyle="rounded" />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal container={portalContainer}>
          <BaseSelect.Positioner className="zds-select__positioner" alignItemWithTrigger={false} sideOffset={sideOffset}>
            <BaseSelect.Popup className="zds-dropdown-menu zds-select__popup" data-rounded={shape !== "sharp"}>
              <BaseSelect.List className="zds-dropdown-menu__content">
                {options.map((o) => (
                  <BaseSelect.Item key={o.value} value={o.value} disabled={o.disabled}
                    className="zds-menu-item zds-select__item" data-rounded={shape !== "sharp"}>
                    {o.icon ? <span className="zds-menu-item__leading"><Icon name={o.icon} /></span> : null}
                    <BaseSelect.ItemText className="zds-menu-item__label">{o.label ?? o.value}</BaseSelect.ItemText>
                    <BaseSelect.ItemIndicator className="zds-menu-item__trailing zds-select__check">
                      <Icon name="check-mark" iconStyle="rounded" />
                    </BaseSelect.ItemIndicator>
                  </BaseSelect.Item>
                ))}
              </BaseSelect.List>
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {hint ? (
        <Field.Description className="zds-input__hint" data-type={hintType}>
          <Icon className="zds-input__hint-icon" name={hintType === "error" ? "error" : "info"} size="small" iconStyle="rounded" />
          <span className="zds-input__message" aria-live={hintType === "error" ? "polite" : undefined}>{hint}</span>
        </Field.Description>
      ) : null}
    </Field.Root>
  );
});
