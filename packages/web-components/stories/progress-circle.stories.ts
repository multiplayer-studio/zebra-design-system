import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/progress-circle/progress-circle.js";

const SIZES = ["xxsmall", "xsmall", "small", "medium", "large"] as const;
type Size = (typeof SIZES)[number];

type Args = {
  value: number | null; size: Size; rounded: boolean; showTrack: boolean; upload: boolean;
  showCancel: boolean; label: string; cancelLabel: string;
};

const note = (t: string) => html`<span style="font:500 12px/1.4 system-ui;color:var(--foreground-secondary)">${t}</span>`;
const row = (c: unknown) => html`<div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">${c}</div>`;
const cell = (cap: string, c: unknown) => html`<div style="display:grid;gap:6px;justify-items:center">${c}${note(cap)}</div>`;

let cancelled = 0;
const onCancel = (e: Event) => {
  cancelled += 1;
  const out = document.getElementById("cancel-readout");
  if (out) out.textContent = `zds-cancel fired ${cancelled} time(s)`;
  void e;
};

const ring = (a: Partial<Args>) => html`<zds-progress-circle
  .value=${a.value === undefined ? 0 : a.value}
  size=${a.size ?? "xxsmall"}
  .rounded=${a.rounded ?? true}
  .showTrack=${a.showTrack ?? true}
  .upload=${a.upload ?? false}
  .showCancel=${a.showCancel ?? false}
  .label=${a.label ?? ""}
  .cancelLabel=${a.cancelLabel ?? "Cancel upload"}
  @zds-cancel=${onCancel}
></zds-progress-circle>`;

const meta: Meta<Args> = {
  title: "Components/Progress Indicators/Progress Circle",
  component: "zds-progress-circle",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A ring that reports progress where a bar will not fit. `value` drives the arc (null = spinning); `upload` adds the centred readout / cancel control at small, medium and large. `role=\"progressbar\"`, fires `zds-cancel`. Spec: specs/progress-circle.",
      },
    },
  },
  argTypes: {
    value: { control: { type: "number", min: 0, max: 100 } },
    size: { control: "select", options: SIZES },
  },
  args: { value: 75, size: "medium", rounded: true, showTrack: true, upload: false, showCancel: false, label: "Uploading report.pdf", cancelLabel: "Cancel upload" },
  render: (a) => ring(a),
};
export default meta;
type Story = StoryObj<Args>;

export const Playground: Story = {};

/** The real value drives the sweep; null spins. */
export const Value: Story = {
  render: (a) => row(html`
    ${[0, 10, 25, 50, 75, 100].map((v) => cell(`${v}%`, ring({ ...a, value: v })))}
    ${cell("indeterminate", ring({ ...a, value: null }))}
  `),
};

export const Size: Story = {
  render: (a) => row(SIZES.map((s) => cell(s, ring({ ...a, size: s })))),
};

/** A line cap: visible only at the arc's two ends. */
export const Rounded: Story = {
  render: (a) => row(html`
    ${cell("rounded", ring({ ...a, size: "large", rounded: true }))}
    ${cell("rounded=false", ring({ ...a, size: "large", rounded: false }))}
  `),
};

export const ShowTrack: Story = {
  render: (a) => row(html`
    ${cell("showTrack", ring({ ...a, size: "large" }))}
    ${cell("showTrack=false", ring({ ...a, size: "large", showTrack: false }))}
  `),
};

/** Readout, then cancel (the _Upload Stop state), at every size. xsmall and xxsmall cannot hold the 36px control, so it is left out there. */
export const Upload: Story = {
  render: (a) => html`<div style="display:grid;gap:16px">
    ${row(SIZES.map((s) => cell(`${s} · readout`, ring({ ...a, size: s, upload: true, value: 42 }))))}
    ${row(SIZES.map((s) => cell(`${s} · cancel`, ring({ ...a, size: s, upload: true, showCancel: true, value: 42 }))))}
    <span id="cancel-readout" style="font:500 12px/1.4 system-ui;color:var(--foreground-secondary)">zds-cancel fired 0 time(s)</span>
  </div>`,
};

export const ThemingCascade: Story = {
  render: (a) => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map(
      (cls) => html`<div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:12px">
        ${note(cls || "base / light")}
        ${row(html`
          ${ring({ ...a, size: "small" })}
          ${ring({ ...a, size: "medium", upload: true, value: 64 })}
          ${ring({ ...a, size: "large", upload: true, showCancel: true, value: 64 })}
        `)}
      </div>`,
    )}
  </div>`,
};
