import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, Scrim } from "../src/index.js";

const TONES = ["scrim", "modal"] as const;

/** A sample page for the scrim to cover, so the dim reads. */
function Page({ children }: { children?: React.ReactNode }) {
  return (
    <div
      style={{
        position: "relative",
        width: 640,
        height: 400,
        overflow: "hidden",
        background: "var(--surface-page)",
        color: "var(--foreground-primary)",
        border: "var(--stroke-thin) solid var(--border-default)",
        boxSizing: "border-box",
        padding: "var(--space-lg)",
        display: "grid",
        alignContent: "start",
        gap: "var(--space-md)",
        font: "var(--text-body-medium)",
      }}
    >
      <strong style={{ font: "var(--text-title-medium)" }}>Printers</strong>
      <span>ZD621 · Ready</span>
      <span>ZT411 · Paper out</span>
      <span>ZQ630 · Offline</span>
      {children}
    </div>
  );
}

const meta: Meta<typeof Scrim> = {
  title: "Components/Scrim",
  component: Scrim,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The barrier between a raised surface and the page behind it. Dialog, Lightbox and Bottom Sheet draw their own; use Scrim only under a custom overlay.",
      },
    },
  },
  argTypes: { tone: { control: "inline-radio", options: TONES } },
  args: { tone: "scrim" },
  render: (a) => (
    <Page>
      <Scrim {...a} />
    </Page>
  ),
};
export default meta;
type Story = StoryObj<typeof Scrim>;

export const Playground: Story = {};

/** scrim dims the page; modal hides it. */
export const Tones: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 24 }}>
      {TONES.map((tone) => (
        <Page key={tone}>
          <Scrim tone={tone} />
        </Page>
      ))}
    </div>
  ),
};

/** Under a custom overlay: the owner opens it and closes on a scrim click. */
export const UnderCustomOverlay: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(true);
    return (
      <Page>
        <div style={{ position: "absolute", insetInlineEnd: "var(--space-lg)", insetBlockStart: "var(--space-lg)" }}>
          <Button onClick={() => setOpen(true)}>Open</Button>
        </div>
        {open && (
          <>
            <Scrim onClick={() => setOpen(false)} />
            <div
              role="dialog"
              aria-label="Printer details"
              style={{
                position: "absolute",
                inset: "auto var(--space-lg) var(--space-lg) auto",
                width: 280,
                padding: "var(--space-lg)",
                background: "var(--surface-overlay)",
                borderRadius: "var(--radius-element-md)",
                boxShadow: "var(--shadow-large-x) var(--shadow-large-y) var(--shadow-large-blur) var(--shadow-soft)",
                color: "var(--foreground-primary)",
              }}
            >
              Click the scrim to close.
            </div>
          </>
        )}
      </Page>
    );
  },
};

/** The tokens follow the nearest mode or extension class. */
export const Dark: Story = {
  render: () => (
    <div className="mode-dark" style={{ display: "grid", gap: 24 }}>
      {TONES.map((tone) => (
        <Page key={tone}>
          <Scrim tone={tone} />
        </Page>
      ))}
    </div>
  ),
};
