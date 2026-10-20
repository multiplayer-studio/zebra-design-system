import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { Icon, type IconName } from "../icon/Icon.js";
import { Divider } from "../divider/Divider.js";
import "./search.css";

export type SearchShape = "sharp" | "rounded" | "full";
export type SearchSize = "small" | "medium" | "large";
export type SearchFlavour = "default" | "gradient" | "ghost";
type SearchState = "enabled" | "focus" | "selected" | "typing" | "filled" | "disabled";

export interface SearchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseInput>, "className" | "children" | "size" | "value" | "defaultValue" | "onValueChange"> {
  /** Match the contour of the controls around the field. Changes only the corners. */
  shape?: SearchShape;
  /** Fits the field to its surface. Only `small` also reduces the text. */
  size?: SearchSize;
  /** `default` in a form, `ghost` on a surface that already bounds it, `gradient` for a distinct interaction such as an AI companion. */
  flavour?: SearchFlavour;
  /** Ghost only: suppress the focus outline for a container that shows focus itself. It must then show focus in its place. */
  hideFocusOutline?: boolean;
  /** The query (controlled). */
  value?: string;
  /** The initial query (uncontrolled). */
  defaultValue?: string;
  /** Called on every edit, and when the clear control empties the field. */
  onValueChange?: (value: string) => void;
  /** Enter was pressed. */
  onSearch?: (value: string) => void;
  /** The clear control emptied the field. */
  onClear?: () => void;
  /** Glyph leading the field: the spec's `hasLeading`. `null` drops it. */
  leadingIcon?: IconName | null;
  /**
   * Glyph for the trailing control: the spec's `hasTrailing`. Unset means no
   * trailing control. Figma's sample ships `microphone` (voice input); it is
   * not a default because the control is only meaningful with a function.
   */
  trailingIcon?: IconName;
  /** Accessible name of the trailing control, e.g. "Search by voice". */
  trailingLabel?: string;
  /** The trailing control was pressed. */
  onTrailingClick?: () => void;
  /** Accessible name of the clear control. */
  clearLabel?: string;
  className?: string;
}

/**
 * A single-line input for typing a query, with a magnifier leading it and a
 * trailing control that takes whatever icon and function the implementation
 * passes.
 *
 * Behaviour — the native input, disabled semantics, form participation —
 * comes from Base UI's Input. Everything visual comes from the token layer
 * via `search.css`, keyed off data attributes. The spec's State axis is not a
 * prop; it follows from the field and is reflected as `data-state`:
 * keyboard focus on an empty field is `focus` (the heaviest border), pointer
 * focus is `selected`, focus with text is `typing` (the clear control
 * appears), text without focus is `filled`.
 *
 * The field has no label of its own (spec accessibility): pass `aria-label`
 * or `aria-labelledby`. The spec's `Show Cancel` property is not built —
 * Figma wires it to nothing.
 *
 * Kept in step with packages/web-components `<zds-search>`.
 *
 * @spec specs/search/search.spec.md
 */
export const Search = React.forwardRef<HTMLInputElement, SearchProps>(function Search(
  {
    shape = "sharp",
    size = "large",
    flavour = "default",
    hideFocusOutline = false,
    value: valueProp,
    defaultValue = "",
    onValueChange,
    onSearch,
    onClear,
    leadingIcon = "search",
    trailingIcon,
    trailingLabel,
    onTrailingClick,
    clearLabel = "Clear search",
    disabled = false,
    placeholder = "Search",
    className,
    onFocus,
    onBlur,
    onKeyDown,
    // An <input> can't hold children; drop any that arrive at run time.
    children: _children,
    ...rest
  }: SearchProps & { children?: React.ReactNode },
  forwardedRef,
) {
  const [inner, setInner] = React.useState(defaultValue);
  const value = valueProp ?? inner;
  const setValue = (v: string) => {
    if (valueProp === undefined) setInner(v);
    onValueChange?.(v);
  };

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const setRefs = (el: HTMLInputElement | null) => {
    inputRef.current = el;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  // :focus-visible matches every focus on a text input, so it can't tell the
  // spec's keyboard `focus` from pointer `selected`. Track the modality.
  const pointerPressed = React.useRef(false);
  const [focused, setFocused] = React.useState(false);
  const [keyboardFocus, setKeyboardFocus] = React.useState(false);

  const state: SearchState = disabled
    ? "disabled"
    : focused
      ? value.length > 0 ? "typing" : keyboardFocus ? "focus" : "selected"
      : value.length > 0 ? "filled" : "enabled";

  const leaveIfOutside = (e: React.FocusEvent) => {
    // Focus moving to the clear or trailing control stays inside the field.
    if (rootRef.current?.contains(e.relatedTarget as Node)) return;
    setFocused(false);
    setKeyboardFocus(false);
    pointerPressed.current = false;
  };

  const clear = () => {
    setValue("");
    onClear?.();
    inputRef.current?.focus();
  };

  // Icon size is the nested Icon's own Size variant, pinned per field size;
  // every icon uses the Rounded family, as the spec pins. All small icons are
  // 16 here (spec warn "the small typing group's icons render 20").
  const iconSize = size === "small" ? "small" : "medium";
  const showClear = state === "typing";

  return (
    <div
      ref={rootRef}
      className={["zds-search", className].filter(Boolean).join(" ")}
      data-shape={shape}
      data-size={size}
      data-flavour={flavour}
      data-state={state}
      data-disabled={disabled ? "" : undefined}
      data-hide-focus-outline={hideFocusOutline ? "" : undefined}
      onPointerDown={() => { pointerPressed.current = true; }}
    >
      {leadingIcon ? <Icon className="zds-search__leading" name={leadingIcon} size={iconSize} iconStyle="rounded" /> : null}
      <BaseInput
        ref={setRefs}
        {...rest}
        className="zds-search__input"
        type="search"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        enterKeyHint="search"
        autoComplete="off"
        onValueChange={(v) => setValue(v)}
        onFocus={(e) => {
          setFocused(true);
          setKeyboardFocus(!pointerPressed.current);
          pointerPressed.current = false;
          onFocus?.(e);
        }}
        onBlur={(e) => { leaveIfOutside(e); onBlur?.(e); }}
        onKeyDown={(e) => { if (e.key === "Enter") onSearch?.(value); onKeyDown?.(e); }}
      />
      {showClear || trailingIcon ? (
        <span className="zds-search__trailing">
          {showClear ? (
            <button type="button" className="zds-search__control" aria-label={clearLabel} onClick={clear} onBlur={leaveIfOutside}>
              <Icon name="cancel" size={iconSize} iconStyle="rounded" />
            </button>
          ) : null}
          {showClear && trailingIcon ? <Divider className="zds-search__divider" orientation="vertical" aria-hidden="true" /> : null}
          {trailingIcon ? (
            <button type="button" className="zds-search__control" aria-label={trailingLabel} disabled={disabled} onClick={onTrailingClick} onBlur={leaveIfOutside}>
              <Icon name={trailingIcon} size={iconSize} iconStyle="rounded" />
            </button>
          ) : null}
        </span>
      ) : null}
    </div>
  );
});
