import type { Meta, StoryObj } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../src/components/progress-bar/progress-bar.js";
import "../src/components/icon/icon.js";

const note = (t: string) => html`<div style="font:500 12px/1.4 system-ui;color:var(--foreground-secondary)">${t}</div>`;
const col = (c: unknown) => html`<div style="display:grid;gap:20px;max-width:408px">${c}</div>`;

type Args = {
  value: number | null; buffer: number | null; label: string; showLabel: boolean; showTrack: boolean;
  shape: "rounded" | "sharp"; size: "small" | "medium";
};

const bar = (a: Partial<Args>, extra: unknown = nothing) => html`<zds-progress-bar
  .value=${a.value === undefined ? 0 : a.value}
  .buffer=${a.buffer ?? null}
  .label=${a.label ?? ""}
  .showLabel=${a.showLabel ?? true}
  .showTrack=${a.showTrack ?? true}
  shape=${a.shape ?? "rounded"}
  size=${a.size ?? "small"}
>${extra}</zds-progress-bar>`;

const meta: Meta<Args> = {
  title: "Components/ProgressBar",
  component: "zds-progress-bar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A horizontal track that fills to show how far a process has got. `value` is a real number (null = indeterminate, a sliding segment); `buffer` adds the buffered band. `role=\"progressbar\"` with aria-valuenow/min/max/valuetext. Spec: specs/progress-bar.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "number", min: 0, max: 100 } },
    buffer: { control: { type: "number", min: 0, max: 100 } },
    shape: { control: "inline-radio", options: ["rounded", "sharp"] },
    size: { control: "inline-radio", options: ["small", "medium"] },
    label: { control: "text" },
  },
  args: { value: 40, buffer: null, label: "Uploading quarterly-report.pdf", showLabel: true, showTrack: true, shape: "rounded", size: "small" },
  render: (a) => col(bar(a)),
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

/** Figma's Progress axis: four samples of the value, then the two modes without a known extent. */
export const Progress: Story = {
  render: (a) => col(html`
    ${bar({ ...a, value: 0, label: "Preparing upload" })}
    ${bar({ ...a, value: 25, label: "25% complete" })}
    ${bar({ ...a, value: 50, label: "50% complete" })}
    ${bar({ ...a, value: 100, label: "Complete" })}
    ${bar({ ...a, value: null, label: "Uploading photos" })}
    ${bar({ ...a, value: null, buffer: 75, label: "Loading video" })}
    ${bar({ ...a, value: 30, buffer: 75, label: "Playing — 30% watched, 75% buffered" })}
  `),
};

export const Shape: Story = {
  render: (a) => col((["rounded", "sharp"] as const).map((s) => html`${note(`shape=${s}`)}
    ${bar({ ...a, shape: s, size: "small", value: 60, label: "Syncing contacts" })}
    ${bar({ ...a, shape: s, size: "medium", value: 60, label: "Syncing contacts" })}`)),
};

export const Size: Story = {
  render: (a) => col((["small", "medium"] as const).map((s) => html`${note(`size=${s}`)}${bar({ ...a, size: s, value: 70, label: "Installing update" })}`)),
};

/** Without a label the row reads the formatted value; hidden, the label still names the bar for assistive tech. */
export const ShowLabel: Story = {
  render: (a) => col(html`
    ${note("showLabel · label")}${bar({ ...a, value: 45, label: "Exporting 1,240 rows" })}
    ${note("showLabel · no label (formatted value)")}${bar({ ...a, value: 45, label: "" })}
    ${note("showLabel=false")}${bar({ ...a, value: 45, showLabel: false, label: "Exporting 1,240 rows" })}
  `),
};

/** Hiding the track keeps the buffer band, so Buffering still reads as buffering. */
export const ShowTrack: Story = {
  render: (a) => col(html`
    ${note("showTrack")}${bar({ ...a, value: 40, label: "Downloading maps" })}
    ${note("showTrack=false")}${bar({ ...a, value: 40, showTrack: false, label: "Downloading maps" })}
    ${note("showTrack=false · buffering")}${bar({ ...a, value: null, buffer: 75, showTrack: false, label: "Loading video" })}
  `),
};

/** Figma's Right Slot (Show More Details): supporting detail at the trailing end of the label row. */
export const Trailing: Story = {
  render: (a) => col(html`
    ${bar({ ...a, value: 62, label: "Uploading 12 photos" }, html`<span slot="trailing" style="display:inline-flex;align-items:center;gap:var(--space-xs)"><zds-icon name="hourglass" size="small"></zds-icon> 2 min left</span>`)}
    ${bar({ ...a, value: 62, label: "Uploading 12 photos" }, html`<span slot="trailing">7 of 12</span>`)}
  `),
};

export const ThemingCascade: Story = {
  render: (a) => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(360px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map(
      (cls) => html`<div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:16px">
        ${note(cls || "base / light")}
        ${bar({ ...a, value: 55, label: "Uploading report.pdf" })}
        ${bar({ ...a, value: null, buffer: 75, size: "medium", label: "Loading video" })}
      </div>`,
    )}
  </div>`,
};
