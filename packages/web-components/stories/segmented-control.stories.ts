import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../src/components/segmented-control/segmented-control.js";
import type { SegmentedControlOption } from "../src/components/segmented-control/segmented-control.js";

const VIEWS: SegmentedControlOption[] = [
  { value: "day", label: "Day", icon: "calendar-day" },
  { value: "week", label: "Week", icon: "calendar-weekly" },
  { value: "month", label: "Month", icon: "calendar-monthly" },
];
const LAYOUT: SegmentedControlOption[] = [
  { value: "list", label: "List view", icon: "list" },
  { value: "grid", label: "Grid view", icon: "grid-view" },
  { value: "map", label: "Map view", icon: "map" },
];
const MIXED: SegmentedControlOption[] = [...LAYOUT.slice(0, 2), { value: "table", label: "Table" }];
const stack = (c: unknown) => html`<div style="display:grid;gap:16px;justify-items:start">${c}</div>`;
const cap = (t: string) => html`<div style="font:500 12px/1.4 system-ui;opacity:.7">${t}</div>`;

const meta: Meta = {
  title: "Components/Segmented Control",
  component: "zds-segmented-control",
  tags: ["autodocs"],
  argTypes: {
    shape: { control: "inline-radio", options: ["rounded", "sharp", "full"] },
    inverse: { control: "boolean" },
    flavour: { control: "inline-radio", options: ["default", "text-only", "icon-only"] },
  },
  args: { value: "day", shape: "rounded", inverse: false, flavour: "default", disabled: false, label: "Calendar range" },
  render: (a) => html`<zds-segmented-control .options=${VIEWS} value=${a.value} shape=${a.shape} ?inverse=${a.inverse} flavour=${a.flavour} ?disabled=${a.disabled} label=${a.label}></zds-segmented-control>`,
};
export default meta;
type Story = StoryObj;

export const Playground: Story = {};

/** Spec \`shape\`: the track, every segment and the active indicator follow it. The icons stay in the rounded family either way, as Figma pins them. */
export const Shape: Story = {
  render: () => stack((["rounded", "sharp", "full"] as const).map((s) => html`${cap(s)}<zds-segmented-control label="Calendar range, ${s}" shape=${s} .options=${VIEWS} value="day"></zds-segmented-control>`)),
};

/** Spec Flavour=inverse: a dark chosen segment on a lighter, bordered track, for stronger emphasis. Shown in each shape, and with a disabled chosen option. */
export const Inverse: Story = {
  render: () => stack(html`
    ${(["rounded", "sharp", "full"] as const).map((s) => html`${cap(`inverse, ${s}`)}<zds-segmented-control label="Calendar range, ${s}" inverse shape=${s} .options=${VIEWS} value="week"></zds-segmented-control>`)}
    ${cap("inverse, icon-only")}<zds-segmented-control label="Layout" inverse .options=${LAYOUT} flavour="icon-only"></zds-segmented-control>
    ${cap("inverse, disabled")}<zds-segmented-control label="Calendar range" inverse .options=${VIEWS} value="week" disabled></zds-segmented-control>`),
};

/**
 * \`flavour\`, one per control. default: icon + label. text-only: labels, icons
 * hidden even though these options have them. icon-only: icons, labels become
 * accessible names and tooltips. An option without an icon shows its label in
 * default and icon-only alike (the "mixed" rows).
 */
export const Flavour: Story = {
  render: () => stack(html`
    ${cap("default (icon + label)")}<zds-segmented-control label="Calendar range" .options=${VIEWS}></zds-segmented-control>
    ${cap("text-only")}<zds-segmented-control label="Calendar range" .options=${VIEWS} flavour="text-only"></zds-segmented-control>
    ${cap("icon-only")}<zds-segmented-control label="Layout" .options=${LAYOUT} flavour="icon-only"></zds-segmented-control>
    ${cap("default, mixed (one option without an icon)")}<zds-segmented-control label="Layout" .options=${MIXED}></zds-segmented-control>
    ${cap("icon-only, mixed (one option without an icon)")}<zds-segmented-control label="Layout" .options=${MIXED} flavour="icon-only"></zds-segmented-control>`),
};

/** Segment state: one indicator on the track slides (250ms on Switch's spring curve, matching Switch) to the chosen segment. Hover, press and keyboard focus (Tab, then arrow keys) come from interaction. */
export const State: Story = {
  render: () => stack(html`
    <zds-segmented-control label="Calendar range" .options=${VIEWS} value="week"
      @zds-value-change=${(e: CustomEvent<{ value: string }>) => {
        const out = (e.target as HTMLElement).nextElementSibling;
        if (out) out.textContent = `value: ${e.detail.value}`;
      }}></zds-segmented-control>
    <div style="font:500 12px/1.4 system-ui;opacity:.7">value: week</div>`),
};

/**
 * One option locked, or the whole control. A disabled control keeps its
 * indicator on the chosen option. A value naming a disabled (or unknown)
 * option falls back to the first enabled one: one is always chosen.
 */
export const Disabled: Story = {
  render: () => stack(html`
    ${cap("one option")}<zds-segmented-control label="Calendar range" .options=${[...VIEWS.slice(0, 2), { ...VIEWS[2]!, disabled: true }]}></zds-segmented-control>
    ${cap("value names the disabled option: falls back to Day")}<zds-segmented-control label="Calendar range" .options=${[...VIEWS.slice(0, 2), { ...VIEWS[2]!, disabled: true }]} value="month"></zds-segmented-control>
    ${cap("whole control")}<zds-segmented-control label="Calendar range" .options=${VIEWS} value="week" disabled></zds-segmented-control>`),
};

/** Right to left: arrow keys follow reading order and the indicator slides over the mirrored row. */
export const RightToLeft: Story = {
  render: () => html`<div dir="rtl" style="display:grid;gap:16px;justify-items:start">
    <zds-segmented-control label="Calendar range" .options=${VIEWS} value="week"></zds-segmented-control>
    <zds-segmented-control label="Calendar range" .options=${VIEWS} flavour="text-only" shape="sharp"></zds-segmented-control>
  </div>`,
};

export const ThemingCascade: Story = {
  render: () => html`<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(320px,1fr))">
    ${["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => html`
      <div class=${cls} style="padding:16px;background:var(--surface-page);color:var(--foreground-primary);display:grid;gap:8px;justify-items:start">
        ${cap(cls || "base / light")}
        <zds-segmented-control label="Calendar range" .options=${VIEWS}></zds-segmented-control>
        <zds-segmented-control label="Calendar range" .options=${VIEWS} flavour="text-only" shape="sharp" value="week"></zds-segmented-control>
        <zds-segmented-control label="Layout" .options=${[...LAYOUT.slice(0, 2), { ...LAYOUT[2]!, disabled: true }]} flavour="icon-only"></zds-segmented-control>
        <zds-segmented-control label="Calendar range" .options=${VIEWS} inverse shape="full" value="week"></zds-segmented-control>
      </div>`)}
  </div>`,
};
