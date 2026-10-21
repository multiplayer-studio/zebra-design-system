import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { Toggle } from "@base-ui/react/toggle";
import { Icon } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Divider } from "../divider/Divider.js";
import "./accordion.css";

interface AccordionContextValue {
  selectable: boolean;
  rounded: boolean;
  inCard: boolean;
}
const AccordionContext = React.createContext<AccordionContextValue>({
  selectable: false,
  rounded: false,
  inCard: true,
});

export interface AccordionProps
  extends Omit<
    BaseAccordion.Root.Props<string>,
    "className" | "value" | "defaultValue" | "onValueChange" | "orientation" | "loopFocus"
  > {
  /**
   * Rows carry a selection as well as disclosure: a leading control opens and
   * closes the row and the rest of the row toggles its selection. Off, the
   * whole row is one target that opens and closes it.
   */
  selectable?: boolean;
  /** radius/lg on the container's four corners, and rounded leading controls. */
  rounded?: boolean;
  /** Treat the list as one bounded object: an outline, and a divider under every row but the last. */
  inCard?: boolean;
  /**
   * Allow more than one row open at a time. Off by default: "only one item can
   * have the open state at a time" (spec metadata).
   */
  multiple?: boolean;
  /** The values of the open rows (controlled). */
  value?: string[];
  /** The values of the rows open at first (uncontrolled). */
  defaultValue?: string[];
  /** Called when a row opens or closes, with every open row's value. */
  onValueChange?: (value: string[], eventDetails: BaseAccordion.Root.ChangeEventDetails) => void;
  /** `<AccordionItem>` rows. */
  children?: React.ReactNode;
  className?: string;
}

// Disclosure controls of this accordion's own rows, never a nested one's.
const TRIGGER = ".zds-accordion__trigger, .zds-accordion__control";
const NAV_KEYS = new Set(["ArrowDown", "ArrowUp", "Home", "End"]);

/**
 * A vertically stacked list of disclosure rows sharing one container, for a
 * page that has more sections than it has room to show at once.
 *
 * Behaviour comes from Base UI's Accordion: the `button` + `aria-expanded` /
 * `aria-controls` trigger inside a heading, the `region` panel labelled by it,
 * single or `multiple` expansion, disabled rows, and the panel height exposed
 * as `--accordion-panel-height` so the open and close can animate. Base UI
 * 1.8 dropped arrow-key movement between headers (APG update); the owner asks
 * for it, so Up / Down / Home / End between this accordion's own triggers is
 * the one piece of keyboard handling added here, matching `<zds-accordion>`.
 *
 * Built apart from CollapsibleCard (spec analysis): that is one card that
 * folds, this is a list of rows with one shared outline.
 *
 * Kept in step with packages/web-components `<zds-accordion>`.
 *
 * @spec specs/accordion/accordion.spec.md
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    selectable = true,
    rounded = false,
    inCard = true,
    multiple = false,
    value,
    defaultValue,
    onValueChange,
    onKeyDown,
    className,
    children,
    ...rest
  },
  ref,
) {
  const ctx = React.useMemo(() => ({ selectable, rounded, inCard }), [selectable, rounded, inCard]);

  const handleKeyDown: NonNullable<AccordionProps["onKeyDown"]> = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !NAV_KEYS.has(event.key)) return;
    const root = event.currentTarget;
    const target = event.target as HTMLElement;
    if (!target.matches(TRIGGER) || target.closest(".zds-accordion") !== root) return;
    const triggers = [...root.querySelectorAll<HTMLElement>(TRIGGER)].filter(
      (t) => t.closest(".zds-accordion") === root && !t.hasAttribute("disabled") && !t.hasAttribute("data-disabled"),
    );
    const i = triggers.indexOf(target);
    const last = triggers.length - 1;
    const next =
      event.key === "Home" ? 0 : event.key === "End" ? last : event.key === "ArrowDown" ? (i + 1 > last ? 0 : i + 1) : i - 1 < 0 ? last : i - 1;
    event.preventDefault();
    triggers[next]?.focus();
  };

  return (
    <AccordionContext.Provider value={ctx}>
      <BaseAccordion.Root<string>
        ref={ref}
        {...rest}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        multiple={multiple}
        onKeyDown={handleKeyDown}
        className={["zds-accordion", className].filter(Boolean).join(" ")}
        data-selectable={selectable ? "" : undefined}
        data-rounded={rounded ? "" : undefined}
        data-in-card={inCard ? "" : undefined}
      >
        {children}
      </BaseAccordion.Root>
    </AccordionContext.Provider>
  );
});

export interface AccordionItemProps
  extends Omit<BaseAccordion.Item.Props, "className" | "value" | "title" | "children"> {
  /** Identifies the row in the accordion's `value`. Unique within the accordion; generated when omitted. */
  value?: string;
  /**
   * The row's label (the spec's Title). Name the section it opens — the caret
   * says a row opens, never what is inside. Called `heading`, as on
   * `<zds-accordion-item>`, where `title` would be the native tooltip.
   */
  heading: string;
  /** Whether the row is chosen (controlled). Only meaningful on a `selectable` accordion. */
  selected?: boolean;
  /** Whether the row is chosen at first (uncontrolled). */
  defaultSelected?: boolean;
  /** Called when the row body is pressed on a `selectable` accordion. */
  onSelectedChange?: (selected: boolean) => void;
  /** What the row reveals when open. Any content; it fills the row's width. */
  children?: React.ReactNode;
  className?: string;
}

/**
 * One row of an Accordion: a header holding the title and its disclosure
 * control, and the content it reveals. Use inside `<Accordion>`, which
 * decides whether the row is selectable, its divider and its control's shape.
 *
 * Kept in step with packages/web-components `<zds-accordion-item>`.
 *
 * @spec specs/accordion/accordion.spec.md (subcomponents › Accordion Item, Accordion Header)
 */
export const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value, heading, selected, defaultSelected = false, onSelectedChange, disabled, className, children, ...rest },
  ref,
) {
  const { selectable, rounded, inCard } = React.useContext(AccordionContext);
  const [innerSelected, setInnerSelected] = React.useState(defaultSelected);
  const isSelected = selected ?? innerSelected;

  return (
    <BaseAccordion.Item
      ref={ref}
      {...rest}
      value={value}
      disabled={disabled}
      className={["zds-accordion__item", className].filter(Boolean).join(" ")}
      data-selected={selectable && isSelected ? "" : undefined}
    >
      <BaseAccordion.Header className="zds-accordion__header" data-selectable={selectable ? "" : undefined}>
        {selectable ? (
          <>
            {/* The leading control owns open/close. Icon Button subtle/medium,
                its shape following the accordion's `rounded` (spec). One
                chevron-right glyph rotated 90° when open, in place of
                Figma's chevron-right → expand-more swap (owner decision;
                spec warn "The caret swaps glyphs"). */}
            <BaseAccordion.Trigger
              className="zds-accordion__control"
              render={
                <IconButton
                  flavour="subtle"
                  size="medium"
                  shape={rounded ? "rounded" : "sharp"}
                  icon="chevron-right"
                  label={`${heading} details`}
                />
              }
            />
            {/* The rest of the row takes the selection: a toggle button with
                a real pressed state, so the trailing mark is not the only sign. */}
            <Toggle
              className="zds-accordion__select"
              pressed={isSelected}
              disabled={disabled}
              onPressedChange={(next) => {
                if (selected === undefined) setInnerSelected(next);
                onSelectedChange?.(next);
              }}
            >
              <span className="zds-accordion__heading">
                <span className="zds-accordion__title">{heading}</span>
              </span>
              {isSelected ? (
                <Icon className="zds-accordion__mark" name="check-mark" size="medium" framed />
              ) : null}
            </Toggle>
          </>
        ) : (
          <BaseAccordion.Trigger className="zds-accordion__trigger">
            <span className="zds-accordion__heading">
              <span className="zds-accordion__title">{heading}</span>
            </span>
            {/* One expand-more glyph rotated 180° when open, in place of the
                expand-more → expand-less swap (owner decision). */}
            <Icon className="zds-accordion__caret" name="expand-more" size="medium" />
          </BaseAccordion.Trigger>
        )}
      </BaseAccordion.Header>
      <BaseAccordion.Panel className="zds-accordion__panel">
        <div className="zds-accordion__content">{children}</div>
      </BaseAccordion.Panel>
      {/* inCard turns the row dividers on; the last row's is hidden in CSS. */}
      {inCard ? <Divider className="zds-accordion__divider" /> : null}
    </BaseAccordion.Item>
  );
});
