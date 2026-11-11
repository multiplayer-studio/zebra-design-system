import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Icon, type IconName } from "../icon/Icon.js";
import { IconButton } from "../icon-button/IconButton.js";
import { Scrim } from "../scrim/Scrim.js";
import { Button } from "../button/Button.js";
import "./dialog.css";

export type DialogFlavour = "default" | "error" | "info" | "success" | "warning";
/**
 * Figma names the values `round` / `sharp`; exposed as `rounded` / `sharp`
 * so the dialog takes the same word as Button, Tooltip and the chips.
 */
export type DialogShape = "rounded" | "sharp";
/** Which preset footer button was pressed. */
export type DialogAction = "primary" | "secondary" | "tertiary";
/** Why the open state changed. */
export type DialogOpenChangeReason =
  | "trigger" | "close" | "escape" | "backdrop" | "action" | "other";

// Flavour sets the header glyph and nothing else (spec: flavour.glyphByValue).
const GLYPH: Record<DialogFlavour, IconName> = {
  default: "block",
  error: "error",
  info: "info",
  success: "verified",
  warning: "warning",
};

const REASON: Record<string, DialogOpenChangeReason> = {
  "trigger-press": "trigger",
  "close-press": "close",
  "escape-key": "escape",
  "outside-press": "backdrop",
};

export interface DialogProps {
  /** The title in the header. Short; it names the dialog for assistive tech. */
  heading?: React.ReactNode;
  /** The body: any content. Long content scrolls inside the body; the header and footer stay put. */
  children?: React.ReactNode;
  /** Sets only the header's leading glyph: block, error, info, verified or warning. Never recolours anything. */
  flavour?: DialogFlavour;
  /** Corner radius, and the shape (and glyph family) of the header icon, close button and footer buttons. */
  shape?: DialogShape;
  /** Shows the footer. Turn off only for a message with nothing to decide. */
  showFooter?: boolean;
  /** Shows the close button in the header (spec Dev Deviation: hiding it is allowed). */
  showClose?: boolean;
  /** Accessible name of the close button. */
  closeLabel?: string;
  /** Label of the primary (filled) footer button. */
  primaryLabel?: string;
  /** Label of the secondary (outline-subtle) footer button, beside the primary. */
  secondaryLabel?: string;
  /** Label of the tertiary (text) footer button, on the opposite side. */
  tertiaryLabel?: string;
  /** Custom footer content for the start side. Replaces the preset buttons when either custom slot is set. */
  footerStart?: React.ReactNode;
  /** Custom footer content for the end side. Replaces the preset buttons when either custom slot is set. */
  footerEnd?: React.ReactNode;
  /** Called when a preset footer button is pressed. */
  onAction?: (action: DialogAction) => void;
  /** Keep the dialog open after a preset footer button is pressed (e.g. to validate first). By default it closes. */
  keepOpenOnAction?: boolean;
  /** Escape and a click on the backdrop close the dialog. Turn off when a decision is required. */
  dismissible?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called when the trigger, the close button, Escape, the backdrop or a footer action opens or closes the dialog. */
  onOpenChange?: (open: boolean, reason: DialogOpenChangeReason) => void;
  /**
   * The element that opens the dialog. Rendered through `Dialog.Trigger`'s
   * `render` prop, so it stays the real element; focus returns to it on close.
   */
  trigger?: React.ReactElement;
  /**
   * Renders the panel in normal flow, always shown, with no backdrop, portal,
   * focus trap or dismissal — the component exactly as the spec draws it,
   * for documentation and screenshots.
   */
  inline?: boolean;
  /**
   * Where `Dialog.Portal` mounts the backdrop and panel. Defaults to
   * `document.body`, which escapes an `.ext-*` / `.mode-*` class scoped below
   * `<body>` — pass the themed root when the app scopes theme classes more
   * narrowly (the same gap Tooltip and Dropdown document).
   */
  portalContainer?: React.ComponentPropsWithoutRef<typeof BaseDialog.Portal>["container"];
  className?: string;
}

function classes(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(" ");
}

/**
 * A modal message that interrupts the current task until the user responds or
 * dismisses it. A header carries the flavour glyph, the title and a close
 * button; the body holds the message; an optional footer offers one to three
 * preset buttons (primary; secondary + primary; tertiary | secondary +
 * primary) or two custom slots.
 *
 * Behaviour — the backdrop, the focus trap, initial focus (the first
 * focusable, which is the close button when shown), focus returning to the
 * trigger, Escape and outside-click dismissal, scroll lock and portalling
 * above the page — comes from Base UI's Dialog
 * (Root/Trigger/Portal/Backdrop/Popup/Title/Description/Close). Title and
 * Description label and describe the popup. Everything visual comes from the
 * token layer via `dialog.css`.
 *
 * Kept in step with packages/web-components `<zds-dialog>`.
 *
 * @spec specs/dialog/dialog.spec.md
 */
export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  {
    heading,
    children,
    flavour = "default",
    shape = "rounded",
    showFooter = true,
    showClose = true,
    closeLabel = "Close",
    primaryLabel,
    secondaryLabel,
    tertiaryLabel,
    footerStart,
    footerEnd,
    onAction,
    keepOpenOnAction = false,
    dismissible = true,
    open,
    defaultOpen,
    onOpenChange,
    trigger,
    inline = false,
    portalContainer,
    className,
  },
  ref,
) {
  // Shape is one decision for the whole dialog (spec: "the two cannot be
  // mixed"): it picks the footer buttons' and close button's shape and the
  // glyph family. spec issue "Shape misses the close glyph": Figma leaves the
  // close glyph rounded in sharp dialogs; here it follows shape like the rest.
  const iconStyle = shape === "sharp" ? "sharp" : "rounded";
  const titleId = React.useId();

  // Plain elements when inline (no Root to give Base UI parts their context).
  const Title = inline ? "h2" : BaseDialog.Title;
  const close = (
    // spec issue "The close control is a bare Icon": an IconButton (subtle,
    // so it carries hover/pressed/focus states and a hit area) with an
    // accessible name, not a bare glyph.
    <IconButton className="zds-dialog__close" flavour="subtle" size="medium" shape={shape} icon="close" label={closeLabel} />
  );

  const action = (which: DialogAction, label: string, flavour: "primary" | "outline-subtle" | "text") => {
    const btn = (
      <Button flavour={flavour} size="medium" shape={shape} onClick={() => onAction?.(which)}>
        {label}
      </Button>
    );
    // A closing action goes through Dialog.Close so Base UI closes the dialog
    // and returns focus; its onOpenChange reason is reported as "action".
    return inline || keepOpenOnAction ? (
      <React.Fragment key={which}>{btn}</React.Fragment>
    ) : (
      <BaseDialog.Close key={which} render={btn} data-zds-action="" />
    );
  };

  // spec issue "Footer presets aren't exposed": the 1 / 2 / 3 layouts follow
  // from which labels are set; footerStart / footerEnd are the custom preset.
  const custom = footerStart != null || footerEnd != null;
  const end = custom
    ? footerEnd
    : [secondaryLabel ? action("secondary", secondaryLabel, "outline-subtle") : null,
       primaryLabel ? action("primary", primaryLabel, "primary") : null];
  const start = custom ? footerStart : tertiaryLabel ? action("tertiary", tertiaryLabel, "text") : null;
  const hasFooterContent = custom || Boolean(primaryLabel || secondaryLabel || tertiaryLabel);
  const split = custom || Boolean(tertiaryLabel);

  const panel = (
    <>
      <div className="zds-dialog__header">
        <div className="zds-dialog__title-group">
          {/* spec issue "header icon drawn without Icon at 24px": the Icon
              component at medium (control/icon-md), the same size as the
              close glyph, so the two match. */}
          <Icon className="zds-dialog__icon" name={GLYPH[flavour] ?? GLYPH.default} iconStyle={iconStyle} size="medium" />
          <Title className="zds-dialog__title" id={inline ? titleId : undefined}>{heading}</Title>
        </div>
        {showClose ? (inline ? close : <BaseDialog.Close render={close} />) : null}
      </div>
      {inline ? (
        <div className="zds-dialog__body">{children}</div>
      ) : (
        <BaseDialog.Description render={<div />} className="zds-dialog__body">{children}</BaseDialog.Description>
      )}
      {showFooter && hasFooterContent ? (
        <div className="zds-dialog__footer" data-layout={split ? "split" : "end"}>
          {split ? <div className="zds-dialog__footer-start">{start}</div> : null}
          <div className="zds-dialog__footer-end">{end}</div>
        </div>
      ) : null}
    </>
  );

  const shared = {
    className: classes("zds-dialog", inline && "zds-dialog--inline", className),
    "data-flavour": flavour,
    "data-shape": shape,
  };

  if (inline) {
    return (
      <div ref={ref} role="dialog" aria-labelledby={titleId} {...shared}>
        {panel}
      </div>
    );
  }

  return (
    <BaseDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      disablePointerDismissal={!dismissible}
      onOpenChange={(next, details) => {
        const target = details.event?.target as Element | null | undefined;
        const fromAction = details.reason === "close-press" && !!target?.closest?.("[data-zds-action]");
        if (!dismissible && !next && (details.reason === "escape-key" || details.reason === "outside-press")) {
          details.cancel();
          return;
        }
        onOpenChange?.(next, fromAction ? "action" : REASON[details.reason] ?? "other");
      }}
    >
      {trigger ? <BaseDialog.Trigger render={trigger} /> : null}
      <BaseDialog.Portal container={portalContainer}>
        <BaseDialog.Backdrop className="zds-dialog__backdrop" render={<Scrim tone="scrim" />} />
        <BaseDialog.Popup ref={ref} {...shared}>
          {panel}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
});
