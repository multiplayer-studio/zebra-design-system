import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { Icon, type IconName } from "../icon/Icon.js";
import { Divider } from "../divider/Divider.js";
import "./input-field.css";

export type InputFieldType = "text" | "number" | "password" | "date" | "time";
export type InputFieldSize = "small" | "medium" | "large";
export type InputFieldShape = "sharp" | "rounded" | "full";
export type InputFieldFlavour = "default" | "gradient" | "ghost";
export type InputFieldState = "enabled" | "focus" | "selected" | "typing" | "filled" | "invalid" | "read-only" | "disabled";

export interface InputFieldProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, "className" | "children" | "size" | "type" | "value" | "defaultValue" | "onValueChange"> {
  /** What the field holds; brings its own placeholder shape and trailing control. */
  type?: InputFieldType;
  /** Fits the field to its surface. Only `small` also reduces the text. Default medium (spec decision). */
  size?: InputFieldSize;
  /** Corners. Match the controls around the field. */
  shape?: InputFieldShape;
  /** Fills the container's width. Without it the field starts at 280 and narrows to fit its container. */
  block?: boolean;
  /** `default` inside a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction. */
  flavour?: InputFieldFlavour;
  /** The value failed validation. Changes the border only; pair it with an error hint. */
  invalid?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** The clear control emptied the field. */
  onClear?: () => void;
  /** Leading icon (the spec's hasLeading). Text, number and password only. */
  leadingIcon?: IconName | null;
  /** Content between the leading icon and the text, such as a dial code. It reads with the value. */
  leadingContent?: React.ReactNode;
  /** Trailing icon on text and number (hasTrailing). Number defaults to `dialpad`; `null` for none. */
  trailingIcon?: IconName | null;
  /** Accessible name of the clear control. */
  clearLabel?: string;
  className?: string;
}

/**
 * The text entry control on its own, without a label or hint around it. One
 * model covers five input types, Text, Number, Password, Date and Time, which
 * share the same Size, Shape, State and Flavour and differ only in their
 * placeholder and in the control sitting at the trailing edge.
 *
 * Behaviour — the native input, disabled semantics, form participation, and
 * labelling when it sits in a Base UI Field — comes from Base UI's Input.
 * Everything visual comes from the token layer via `input-field.css`, keyed
 * off data attributes. The spec's State is derived and reflected as
 * `data-state`: keyboard focus on an empty field `focus`, pointer focus
 * `selected`, focus with a value `typing` (clear appears), a value at rest
 * `filled`; `invalid`, `readOnly` and `disabled` come from props.
 *
 * Kept in step with packages/web-components `<zds-input-field>`.
 *
 * @spec specs/input/input.spec.md
 */
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    type = "text", size = "medium", shape = "sharp", flavour = "default", invalid = false, block = false,
    value: valueProp, defaultValue = "", onValueChange, onClear,
    leadingIcon = null, leadingContent, trailingIcon, clearLabel = "Clear",
    inputMode, autoComplete,
    disabled = false, readOnly = false, className, onFocus, onBlur,
    children: _children,
    ...rest
  }: InputFieldProps & { children?: React.ReactNode },
  forwardedRef,
) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = valueProp ?? inner;
  const setValue = (v: string) => { if (valueProp === undefined) setInner(v); onValueChange?.(v); };

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const setRefs = (el: HTMLInputElement | null) => {
    inputRef.current = el;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  // :focus-visible can't separate keyboard from pointer focus on a text input.
  const pointerPressed = React.useRef(false);
  const [focused, setFocused] = React.useState(false);
  const [keyboardFocus, setKeyboardFocus] = React.useState(false);
  const [revealed, setRevealed] = React.useState(false);

  const state: InputFieldState = disabled ? "disabled"
    : focused ? (value ? "typing" : keyboardFocus ? "focus" : "selected")
    : invalid ? "invalid" : readOnly ? "read-only" : value ? "filled" : "enabled";

  const leaveIfOutside = (e: React.FocusEvent) => {
    if (rootRef.current?.contains(e.relatedTarget as Node)) return;
    setFocused(false); setKeyboardFocus(false); pointerPressed.current = false;
  };
  const clear = () => { setValue(""); onClear?.(); inputRef.current?.focus(); };
  const openPicker = () => {
    if (disabled || readOnly) return;
    inputRef.current?.focus();
    try { (inputRef.current as HTMLInputElement & { showPicker?: () => void })?.showPicker?.(); } catch { /* needs a user gesture */ }
  };

  const iconSize = size === "small" ? "small" : "medium";
  const control = (icon: IconName, label: string, onClick: () => void, pressed?: boolean) => (
    <button type="button" className="zds-input-field__control" aria-label={label} aria-pressed={pressed}
      disabled={disabled || readOnly} onPointerDown={(e) => e.preventDefault()} onClick={onClick} onBlur={leaveIfOutside}>
      <Icon name={icon} size={iconSize} iconStyle="rounded" />
    </button>
  );

  const typing = state === "typing" && !readOnly;
  const clearControl = control("cancel", clearLabel, clear);
  const typeControl =
    type === "password" ? control(revealed ? "visibility-off" : "visibility", revealed ? "Hide password" : "Show password", () => setRevealed((r) => !r), revealed)
    : type === "date" ? control("calendar-3-day", "Choose date", openPicker)
    : type === "time" ? control("clock-outline", "Choose time", openPicker)
    : null;
  const decorative = trailingIcon === null ? null : trailingIcon ?? (type === "number" ? "dialpad" : null);

  let trailing: React.ReactNode = null;
  if (typeControl) trailing = typing ? <>{clearControl}<Divider className="zds-input-field__divider" orientation="vertical" aria-hidden="true" />{typeControl}</> : typeControl;
  else if (typing) trailing = clearControl;
  else if (decorative) trailing = <Icon className="zds-input-field__icon" name={decorative} size={iconSize} iconStyle="rounded" />;

  const showLeading = !!leadingIcon && type !== "date" && type !== "time";

  return (
    <div ref={rootRef} className={["zds-input-field", className].filter(Boolean).join(" ")}
      data-type={type} data-size={size} data-shape={shape} data-flavour={flavour} data-state={state} data-block={block ? "" : undefined}
      onPointerDown={() => { pointerPressed.current = true; }}>
      {showLeading ? <Icon className="zds-input-field__icon" name={leadingIcon!} size={iconSize} iconStyle="rounded" /> : null}
      {leadingContent ? <span className="zds-input-field__leading-content">{leadingContent}</span> : null}
      <BaseInput ref={setRefs} {...rest}
        className="zds-input-field__input"
        type={type === "password" && revealed ? "text" : type}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        inputMode={inputMode ?? (type === "number" ? "decimal" : undefined)}
        aria-invalid={invalid || undefined}
        autoComplete={autoComplete ?? (type === "password" ? "current-password" : "off")}
        onValueChange={(v) => setValue(v)}
        onFocus={(e) => { setFocused(true); setKeyboardFocus(!pointerPressed.current); pointerPressed.current = false; onFocus?.(e); }}
        onBlur={(e) => { leaveIfOutside(e); onBlur?.(e); }}
      />
      {trailing ? <span className="zds-input-field__trailing">{trailing}</span> : null}
    </div>
  );
});
