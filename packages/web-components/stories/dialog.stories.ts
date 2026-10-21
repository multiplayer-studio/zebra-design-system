import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing, type TemplateResult } from "lit";
import "../src/components/dialog/dialog.js";
import "../src/components/button/button.js";
import "../src/components/icon-button/icon-button.js";
import type { DialogFlavour, DialogShape } from "../src/components/dialog/dialog.js";

const FLAVOURS: DialogFlavour[] = ["default", "error", "info", "success", "warning"];
const SHAPES: DialogShape[] = ["rounded", "sharp"];

const BODY =
  "Deleting this project removes its 14 files and revokes access for the 3 people it is shared with. You can restore it from the bin for 30 days.";

type Args = {
  heading: string;
  body: string;
  flavour: DialogFlavour;
  shape: DialogShape;
  showFooter: boolean;
  showClose: boolean;
  dismissible: boolean;
  keepOpenOnAction: boolean;
  primaryLabel: string;
  secondaryLabel: string;
  tertiaryLabel: string;
  closeLabel: string;
};

const meta: Meta<Args> = {
  title: "Components/Dialog",
  component: "zds-dialog",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A modal message that interrupts the current task until the user responds or dismisses it. `flavour` changes only the header glyph; `shape` sets the corners and the shape of every button inside. The footer layout follows from which labels are set (primary; secondary + primary; tertiary | secondary + primary), or the `footer-start` / `footer-end` slots for custom content. Built on the native `<dialog>` with `showModal()`: top layer, inert page, Escape; plus backdrop click and `dismissible`, initial focus, focus return and scroll lock. Fires `zds-open-change` and `zds-action`. `inline` renders the panel in flow, always open, for documentation.",
      },
    },
  },
  argTypes: {
    flavour: { control: "inline-radio", options: FLAVOURS },
    shape: { control: "inline-radio", options: SHAPES },
    heading: { control: "text" },
    body: { control: "text" },
    primaryLabel: { control: "text" },
    secondaryLabel: { control: "text" },
    tertiaryLabel: { control: "text" },
    closeLabel: { control: "text" },
  },
  args: {
    heading: "Delete project?",
    body: BODY,
    flavour: "default",
    shape: "rounded",
    showFooter: true,
    showClose: true,
    dismissible: true,
    keepOpenOnAction: false,
    primaryLabel: "Delete",
    secondaryLabel: "Cancel",
    tertiaryLabel: "Learn more",
    closeLabel: "Close",
  },
};
export default meta;
type Story = StoryObj<Args>;

const cap = (t: string) => html`<span style="font:500 12px/1.4 system-ui;opacity:.7">${t}</span>`;
const row = (c: unknown) => html`<div style="display:flex;flex-wrap:wrap;gap:24px;align-items:flex-start">${c}</div>`;
const cell = (t: string, c: unknown) => html`<div style="display:grid;gap:8px;justify-items:start">${cap(t)}${c}</div>`;

/** One dialog from args, with any overrides. */
function dialog(a: Args, o: Partial<Args> & { inline?: boolean; trigger?: TemplateResult; content?: unknown; footer?: unknown } = {}) {
  const p = { ...a, ...o };
  return html`<zds-dialog
    heading=${p.heading}
    flavour=${p.flavour}
    shape=${p.shape}
    show-footer=${String(p.showFooter)}
    show-close=${String(p.showClose)}
    dismissible=${String(p.dismissible)}
    ?keep-open-on-action=${p.keepOpenOnAction}
    ?inline=${o.inline}
    primary-label=${p.primaryLabel || nothing}
    secondary-label=${p.secondaryLabel || nothing}
    tertiary-label=${p.tertiaryLabel || nothing}
    close-label=${p.closeLabel}
  >${o.trigger ?? nothing}${o.content ?? p.body}${o.footer ?? nothing}</zds-dialog>`;
}

const trig = (label: string, shape: DialogShape = "rounded") =>
  html`<zds-button slot="trigger" shape=${shape}>${label}</zds-button>`;

/** Press the button. Escape, the backdrop, the close button or a footer button closes it; focus returns to the trigger. */
export const Playground: Story = {
  render: (a) => dialog(a, { trigger: trig("Delete project", a.shape) }),
};

/** The panel as the spec draws it — always open, in flow, for screenshots. */
export const Static: Story = {
  render: (a) => dialog(a, { inline: true }),
};

/** Flavour changes only the header glyph: block, error, info, verified, warning. */
export const Flavours: Story = {
  render: (a) => row(FLAVOURS.map((f) => cell(f, dialog(a, { flavour: f, inline: true })))),
};

/** rounded (Figma "round") or sharp — corners, and the shape of the close and footer buttons. */
export const Shapes: Story = {
  render: (a) => row(SHAPES.map((s) => cell(s, dialog(a, { shape: s, inline: true })))),
};

/** showFooter off: an informational dialog with nothing to decide. */
export const ShowFooter: Story = {
  render: (a) => row([true, false].map((v) => cell(`showFooter=${v}`, dialog(a, { showFooter: v, inline: true })))),
};

/** The footer presets — 1, 2, 3 buttons — and the custom slots. */
export const FooterActions: Story = {
  render: (a) => {
    const shape = a.shape === "sharp" ? "sharp" : "rounded";
    return row([
      cell("1 action", dialog(a, {
        flavour: "success", heading: "Export complete", inline: true, primaryLabel: "Done", secondaryLabel: "", tertiaryLabel: "",
        content: "Your report was exported to Downloads as quarterly-report.pdf.",
      })),
      cell("2 actions", dialog(a, { tertiaryLabel: "", inline: true })),
      cell("3 actions", dialog(a, { inline: true })),
      cell("custom (footer-start / footer-end)", dialog(a, {
        flavour: "info", heading: "Share project", inline: true,
        content: "Invite people by email. They get view access until you change it.",
        footer: html`<zds-icon-button slot="footer-start" flavour="subtle" size="medium" shape=${shape} icon="link" label="Copy link"></zds-icon-button>
          <zds-button slot="footer-end" size="medium" shape=${shape}>Send invite</zds-button>`,
      })),
    ]);
  },
};

/** showClose off (spec Dev Deviation) — dismissible stays on, so Escape still closes. */
export const ShowClose: Story = {
  render: (a) => row([true, false].map((v) => cell(`showClose=${v}`, dialog(a, { showClose: v, inline: true })))),
};

/** Long body content scrolls inside the body; the header and footer stay put. */
export const LongContent: Story = {
  render: (a) => dialog(a, {
    flavour: "info", heading: "Terms of service", primaryLabel: "Accept", secondaryLabel: "Decline", tertiaryLabel: "",
    trigger: trig("Read terms"),
    content: Array.from({ length: 14 }, (_, i) => html`<p style="margin:0 0 12px">${i + 1}. You keep ownership of the content you upload. We store it to provide the service and delete it within 30 days of you removing it, except where the law requires us to keep it longer.</p>`),
  }),
};

/** dismissible off: Escape and the backdrop do nothing — the user has to choose. */
export const NotDismissible: Story = {
  args: { dismissible: false, showClose: false, flavour: "warning", heading: "Unsaved changes", tertiaryLabel: "", primaryLabel: "Save", secondaryLabel: "Discard" },
  render: (a) => dialog(a, {
    trigger: trig("Leave editor"),
    content: "You have unsaved changes in 2 files. Save them before leaving?",
  }),
};

/** The static panel in each theme scope: base, dark, companion, companion dark. */
export const ThemingCascade: Story = {
  render: (a) => html`<div style="display:grid;gap:12px">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:12px;justify-items:start">
        ${cap(cls || "base / light")}
        ${dialog(a, { inline: true })}
      </div>`)}
  </div>`,
};
