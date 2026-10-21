import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProgressCircle } from "../src/index.js";

const SIZES = ["xxsmall", "xsmall", "small", "medium", "large"] as const;

const meta: Meta<typeof ProgressCircle> = {
  title: "Components/Progress Indicators/Progress Circle",
  component: ProgressCircle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A ring that reports progress where a bar will not fit. `value` drives the arc (null = spinning); `upload` adds the centred readout / cancel control at small, medium and large. Base UI Progress. Spec: specs/progress-circle.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "number", min: 0, max: 100 } },
    size: { control: "select", options: SIZES },
  },
  args: { value: 75, size: "medium", rounded: true, showTrack: true, upload: false, showCancel: false, label: "Uploading report.pdf", cancelLabel: "Cancel upload" },
};
export default meta;
type Story = StoryObj<typeof ProgressCircle>;

const Cap = ({ children }: { children: React.ReactNode }) => <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</span>;
const Row = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>{children}</div>;
const Cell = ({ cap, children }: { cap: string; children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 6, justifyItems: "center" }}>{children}<Cap>{cap}</Cap></div>
);

export const Playground: Story = {};

/** The real value drives the sweep; null spins. */
export const Value: Story = {
  render: (a) => (
    <Row>
      {[0, 10, 25, 50, 75, 100].map((v) => <Cell key={v} cap={`${v}%`}><ProgressCircle {...a} value={v} /></Cell>)}
      <Cell cap="indeterminate"><ProgressCircle {...a} value={null} /></Cell>
    </Row>
  ),
};

export const Size: Story = {
  render: (a) => <Row>{SIZES.map((s) => <Cell key={s} cap={s}><ProgressCircle {...a} size={s} /></Cell>)}</Row>,
};

/** A line cap: visible only at the arc's two ends. */
export const Rounded: Story = {
  render: (a) => (
    <Row>
      <Cell cap="rounded"><ProgressCircle {...a} size="large" rounded /></Cell>
      <Cell cap="rounded=false"><ProgressCircle {...a} size="large" rounded={false} /></Cell>
    </Row>
  ),
};

export const ShowTrack: Story = {
  render: (a) => (
    <Row>
      <Cell cap="showTrack"><ProgressCircle {...a} size="large" /></Cell>
      <Cell cap="showTrack=false"><ProgressCircle {...a} size="large" showTrack={false} /></Cell>
    </Row>
  ),
};

/** Readout, then cancel (the _Upload Stop state), at every size. xsmall and xxsmall cannot hold the 36px control, so it is left out there. */
export const Upload: Story = {
  render: (a) => {
    const [cancelled, setCancelled] = React.useState(0);
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <Row>{SIZES.map((s) => <Cell key={s} cap={`${s} · readout`}><ProgressCircle {...a} size={s} upload value={42} /></Cell>)}</Row>
        <Row>{SIZES.map((s) => <Cell key={s} cap={`${s} · cancel`}><ProgressCircle {...a} size={s} upload showCancel value={42} onCancel={() => setCancelled((n) => n + 1)} /></Cell>)}</Row>
        <Cap>onCancel fired {cancelled} time(s)</Cap>
      </div>
    );
  },
};

export const ThemingCascade: Story = {
  render: (a) => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 12 }}>
          <Cap>{cls || "base / light"}</Cap>
          <Row>
            <ProgressCircle {...a} size="small" />
            <ProgressCircle {...a} size="medium" upload value={64} />
            <ProgressCircle {...a} size="large" upload showCancel value={64} />
          </Row>
        </div>
      ))}
    </div>
  ),
};
