import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar, Icon } from "../src/index.js";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/Progress Indicators/Progress Bar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal track that fills to show how far a process has got. `value` is a real number (null = indeterminate, a sliding segment); `buffering` turns on the band, up to `buffer` (preloaded); `value` never runs past it. Base UI Progress. Spec: specs/progress-bar.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "number", min: 0, max: 100 } },
    buffering: { control: "boolean" },
    buffer: { control: { type: "number", min: 0, max: 100 } },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    size: { control: "inline-radio", options: ["small", "medium"] },
    label: { control: "text" },
  },
  args: { value: 40, label: "Uploading quarterly-report.pdf", showLabel: true, showTrack: true, shape: "rounded", size: "small" },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

const Cap = ({ children }: { children: React.ReactNode }) => <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</span>;
const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 20, maxWidth: 408 }}>{children}</div>;

export const Playground: Story = { render: (a) => <Stack><ProgressBar {...a} /></Stack> };

/** Figma's Progress axis: four samples of the value, then the two modes without a known extent. */
export const Progress: Story = {
  render: (a) => (
    <Stack>
      <ProgressBar {...a} value={0} label="Preparing upload" />
      <ProgressBar {...a} value={25} label="25% complete" />
      <ProgressBar {...a} value={50} label="50% complete" />
      <ProgressBar {...a} value={100} label="Complete" />
      <ProgressBar {...a} value={null} label="Uploading photos" />
      <ProgressBar {...a} value={null} buffering buffer={75} label="Indeterminate: no band, even with buffering on" />
      <ProgressBar {...a} value={30} buffering buffer={75} label="Playing — 30% watched, 75% buffered" />
      <ProgressBar {...a} value={90} buffering buffer={60} label="Value 90, preloaded 60: stops at 60" />
      <ProgressBar {...a} value={30} buffer={75} label="buffer set, buffering off: no band" />
    </Stack>
  ),
};

export const Shape: Story = {
  render: (a) => (
    <Stack>
      {(["rounded", "sharp"] as const).map((s) => (
        <React.Fragment key={s}><Cap>shape={s}</Cap>
          <ProgressBar {...a} shape={s} size="small" label="Syncing contacts" value={60} />
          <ProgressBar {...a} shape={s} size="medium" label="Syncing contacts" value={60} /></React.Fragment>
      ))}
    </Stack>
  ),
};

export const Size: Story = {
  render: (a) => (
    <Stack>
      {(["small", "medium"] as const).map((s) => (
        <React.Fragment key={s}><Cap>size={s}</Cap><ProgressBar {...a} size={s} label="Installing update" value={70} /></React.Fragment>
      ))}
    </Stack>
  ),
};

/** Without a label the row reads the formatted value; hidden, the label still names the bar for assistive tech. */
export const ShowLabel: Story = {
  render: (a) => (
    <Stack>
      <Cap>showLabel · label</Cap><ProgressBar {...a} value={45} label="Exporting 1,240 rows" />
      <Cap>showLabel · no label (formatted value)</Cap><ProgressBar {...a} value={45} label={undefined} />
      <Cap>showLabel=false</Cap><ProgressBar {...a} value={45} showLabel={false} label="Exporting 1,240 rows" />
    </Stack>
  ),
};

/** Hiding the track keeps the buffer band, so Buffering still reads as buffering. */
export const ShowTrack: Story = {
  render: (a) => (
    <Stack>
      <Cap>showTrack</Cap><ProgressBar {...a} value={40} label="Downloading maps" />
      <Cap>showTrack=false</Cap><ProgressBar {...a} value={40} showTrack={false} label="Downloading maps" />
      <Cap>showTrack=false · buffering</Cap><ProgressBar {...a} value={30} buffering buffer={75} showTrack={false} label="Playing video" />
    </Stack>
  ),
};

/** Figma's Right Slot (Show More Details): supporting detail at the trailing end of the label row. */
export const Trailing: Story = {
  render: (a) => (
    <Stack>
      <ProgressBar {...a} value={62} label="Uploading 12 photos" trailing={<><Icon name="hourglass" size="small" /> 2 min left</>} />
      <ProgressBar {...a} value={62} label="Uploading 12 photos" trailing="7 of 12" />
    </Stack>
  ),
};

export const ThemingCascade: Story = {
  render: (a) => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 16 }}>
          <Cap>{cls || "base / light"}</Cap>
          <ProgressBar {...a} value={55} label="Uploading report.pdf" />
          <ProgressBar {...a} value={30} buffering buffer={75} size="medium" label="Playing video" />
        </div>
      ))}
    </div>
  ),
};
