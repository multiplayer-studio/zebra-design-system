import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, Button, IconButton } from "../src/index.js";
import type { DialogFlavour, DialogShape } from "../src/index.js";

const FLAVOURS: DialogFlavour[] = ["default", "error", "info", "success", "warning"];
const SHAPES: DialogShape[] = ["rounded", "sharp"];

const BODY =
  "Deleting this project removes its 14 files and revokes access for the 3 people it is shared with. You can restore it from the bin for 30 days.";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A modal message that interrupts the current task until the user responds or dismisses it. `flavour` changes only the header glyph; `shape` sets the corners and the shape of every button inside. The footer layout follows from which labels are set (primary; secondary + primary; tertiary | secondary + primary), or `footerStart` / `footerEnd` for custom content. Built on Base UI's Dialog: backdrop, focus trap and return, Escape and backdrop dismissal (`dismissible`), scroll lock. `inline` renders the panel in flow, always open, for documentation.",
      },
    },
  },
  argTypes: {
    flavour: { control: "inline-radio", options: FLAVOURS },
    shape: { control: "inline-radio", options: SHAPES },
    heading: { control: "text" },
    children: { control: "text", name: "body (children)" },
    primaryLabel: { control: "text" },
    secondaryLabel: { control: "text" },
    tertiaryLabel: { control: "text" },
    closeLabel: { control: "text" },
  },
  args: {
    heading: "Delete project?",
    children: BODY,
    flavour: "default",
    shape: "rounded",
    showFooter: true,
    showClose: true,
    dismissible: true,
    keepOpenOnAction: false,
    primaryLabel: "Delete",
    secondaryLabel: "Cancel",
    tertiaryLabel: "Learn more",
  },
};
export default meta;
type Story = StoryObj<typeof Dialog>;

const Cap = ({ children }: { children: React.ReactNode }) => (
  <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</span>
);

// The portal mounts into the story's own frame (not document.body) so the
// dialog stays inside any theme scope around it. A zero-size box: Base UI's
// portal adds a wrapper div that would otherwise take a layout slot.
function Stage({ children, className, style }: {
  children: (container: HTMLElement) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div ref={setContainer} style={{ position: "absolute", top: 0, left: 0, width: 0, height: 0 }} />
      {container ? children(container) : null}
    </div>
  );
}

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>{children}</div>
);
const Cell = ({ cap, children }: { cap: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 8, justifyItems: "start" }}>
    <Cap>{cap}</Cap>
    {children}
  </div>
);

/** Press the button. Escape, the backdrop, the close button or a footer button closes it; focus returns to the trigger. */
export const Playground: Story = {
  render: (args) => (
    <Stage>
      {(c) => (
        <Dialog {...args} portalContainer={c} trigger={<Button shape={args.shape === "sharp" ? "sharp" : "rounded"}>Delete project</Button>} />
      )}
    </Stage>
  ),
};

/** The panel as the spec draws it — always open, in flow, for screenshots. */
export const Static: Story = {
  render: (args) => <Dialog {...args} inline />,
};

/** Flavour changes only the header glyph: block, error, info, verified, warning. */
export const Flavours: Story = {
  render: (args) => (
    <Row>
      {FLAVOURS.map((f) => (
        <Cell key={f} cap={f}>
          <Dialog {...args} flavour={f} inline />
        </Cell>
      ))}
    </Row>
  ),
};

/** rounded (Figma "round") or sharp — corners, and the shape of the close and footer buttons. */
export const Shapes: Story = {
  render: (args) => (
    <Row>
      {SHAPES.map((s) => (
        <Cell key={s} cap={s}>
          <Dialog {...args} shape={s} inline />
        </Cell>
      ))}
    </Row>
  ),
};

/** showFooter off: an informational dialog with nothing to decide. */
export const ShowFooter: Story = {
  render: (args) => (
    <Row>
      {[true, false].map((v) => (
        <Cell key={String(v)} cap={`showFooter=${v}`}>
          <Dialog {...args} showFooter={v} inline />
        </Cell>
      ))}
    </Row>
  ),
};

/** The footer presets — 1, 2, 3 buttons — and the custom slots. */
export const FooterActions: Story = {
  render: (args) => (
    <Row>
      <Cell cap="1 action">
        <Dialog {...args} flavour="success" heading="Export complete" inline primaryLabel="Done" secondaryLabel={undefined} tertiaryLabel={undefined}>
          Your report was exported to Downloads as quarterly-report.pdf.
        </Dialog>
      </Cell>
      <Cell cap="2 actions">
        <Dialog {...args} tertiaryLabel={undefined} inline />
      </Cell>
      <Cell cap="3 actions">
        <Dialog {...args} inline />
      </Cell>
      <Cell cap="custom (footerStart / footerEnd)">
        <Dialog
          {...args}
          flavour="info"
          heading="Share project"
          inline
          footerStart={<IconButton flavour="subtle" size="medium" shape={args.shape === "sharp" ? "sharp" : "rounded"} icon="link" label="Copy link" />}
          footerEnd={<Button size="medium" shape={args.shape === "sharp" ? "sharp" : "rounded"}>Send invite</Button>}
        >
          Invite people by email. They get view access until you change it.
        </Dialog>
      </Cell>
    </Row>
  ),
};

/** showClose off (spec Dev Deviation) — dismissible stays on, so Escape still closes. */
export const ShowClose: Story = {
  render: (args) => (
    <Row>
      {[true, false].map((v) => (
        <Cell key={String(v)} cap={`showClose=${v}`}>
          <Dialog {...args} showClose={v} inline />
        </Cell>
      ))}
    </Row>
  ),
};

/** Long body content scrolls inside the body; the header and footer stay put. */
export const LongContent: Story = {
  render: (args) => (
    <Stage>
      {(c) => (
        <Dialog {...args} flavour="info" heading="Terms of service" primaryLabel="Accept" secondaryLabel="Decline" tertiaryLabel={undefined}
          portalContainer={c} trigger={<Button shape="rounded">Read terms</Button>}>
          {Array.from({ length: 14 }, (_, i) => (
            <p key={i} style={{ margin: "0 0 12px" }}>
              {i + 1}. You keep ownership of the content you upload. We store it to provide the service and delete it within 30 days of you removing it, except where the law requires us to keep it longer.
            </p>
          ))}
        </Dialog>
      )}
    </Stage>
  ),
};

/** dismissible off: Escape and the backdrop do nothing — the user has to choose. */
export const NotDismissible: Story = {
  args: { dismissible: false, showClose: false, flavour: "warning", heading: "Unsaved changes", tertiaryLabel: undefined, primaryLabel: "Save", secondaryLabel: "Discard" },
  render: (args) => (
    <Stage>
      {(c) => (
        <Dialog {...args} portalContainer={c} trigger={<Button shape="rounded">Leave editor</Button>}>
          You have unsaved changes in 2 files. Save them before leaving?
        </Dialog>
      )}
    </Stage>
  ),
};

/** The static panel in each theme scope: base, dark, companion, companion dark. */
export const ThemingCascade: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12 }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls}
          style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 12, justifyItems: "start" }}>
          <Cap>{cls || "base / light"}</Cap>
          <Dialog {...args} inline />
        </div>
      ))}
    </div>
  ),
};
