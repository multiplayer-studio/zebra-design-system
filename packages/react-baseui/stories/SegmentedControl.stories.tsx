import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SegmentedControl, type SegmentedControlOption } from "../src/index.js";

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
const Stack = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 16, justifyItems: "start" }}>{children}</div>;
const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;

const meta: Meta<typeof SegmentedControl> = {
  title: "Components/Segmented Control", component: SegmentedControl, tags: ["autodocs"],
  argTypes: {
    shape: { control: "inline-radio", options: ["rounded", "sharp", "full"] },
    inverse: { control: "boolean" },
    flavour: { control: "inline-radio", options: ["default", "text-only", "icon-only"] },
    onValueChange: { action: "valueChange" },
  },
  args: { options: VIEWS, defaultValue: "day", shape: "rounded", inverse: false, flavour: "default", disabled: false, "aria-label": "Calendar range" },
};
export default meta;
type Story = StoryObj<typeof SegmentedControl>;

export const Playground: Story = {};

/** Spec `shape`: the track, every segment and the active indicator follow it. The icons stay in the rounded family either way, as Figma pins them. */
export const Shape: Story = {
  render: () => (
    <Stack>
      {(["rounded", "sharp", "full"] as const).map((s) => (
        <React.Fragment key={s}><Cap>{s}</Cap><SegmentedControl aria-label={`Calendar range, ${s}`} shape={s} options={VIEWS} defaultValue="day" /></React.Fragment>
      ))}
    </Stack>
  ),
};

/** Spec Flavour=inverse: a dark chosen segment on a lighter, bordered track, for stronger emphasis. Shown in each shape, and with a disabled chosen option. */
export const Inverse: Story = {
  render: () => (
    <Stack>
      {(["rounded", "sharp", "full"] as const).map((s) => (
        <React.Fragment key={s}><Cap>inverse, {s}</Cap><SegmentedControl aria-label={`Calendar range, ${s}`} inverse shape={s} options={VIEWS} defaultValue="week" /></React.Fragment>
      ))}
      <Cap>inverse, icon-only</Cap><SegmentedControl aria-label="Layout" inverse options={LAYOUT} flavour="icon-only" />
      <Cap>inverse, disabled</Cap><SegmentedControl aria-label="Calendar range" inverse options={VIEWS} defaultValue="week" disabled />
    </Stack>
  ),
};

/**
 * `flavour`, one per control. default: icon + label. text-only: labels, icons
 * hidden even though these options have them. icon-only: icons, labels become
 * accessible names and tooltips. An option without an icon shows its label in
 * default and icon-only alike (the "mixed" rows).
 */
export const Flavour: Story = {
  render: () => (
    <Stack>
      <Cap>default (icon + label)</Cap><SegmentedControl aria-label="Calendar range" options={VIEWS} />
      <Cap>text-only</Cap><SegmentedControl aria-label="Calendar range" options={VIEWS} flavour="text-only" />
      <Cap>icon-only</Cap><SegmentedControl aria-label="Layout" options={LAYOUT} flavour="icon-only" />
      <Cap>default, mixed (one option without an icon)</Cap><SegmentedControl aria-label="Layout" options={MIXED} />
      <Cap>icon-only, mixed (one option without an icon)</Cap><SegmentedControl aria-label="Layout" options={MIXED} flavour="icon-only" />
    </Stack>
  ),
};

/** Segment state: one indicator on the track slides (250ms on Switch's spring curve, matching Switch) to the chosen segment. Hover, press and keyboard focus (Tab, then arrow keys) come from interaction. */
export const State: Story = {
  render: function State() {
    const [value, setValue] = React.useState("week");
    return (
      <Stack>
        <SegmentedControl aria-label="Calendar range" options={VIEWS} value={value} onValueChange={(v) => setValue(v)} />
        <Cap>value: {value}</Cap>
      </Stack>
    );
  },
};

/**
 * One option locked, or the whole control. A disabled control keeps its
 * indicator on the chosen option. A value naming a disabled (or unknown)
 * option falls back to the first enabled one: one is always chosen.
 */
export const Disabled: Story = {
  render: () => (
    <Stack>
      <Cap>one option</Cap><SegmentedControl aria-label="Calendar range" options={[...VIEWS.slice(0, 2), { ...VIEWS[2]!, disabled: true }]} />
      <Cap>defaultValue names the disabled option: falls back to Day</Cap><SegmentedControl aria-label="Calendar range" options={[...VIEWS.slice(0, 2), { ...VIEWS[2]!, disabled: true }]} defaultValue="month" />
      <Cap>whole control</Cap><SegmentedControl aria-label="Calendar range" options={VIEWS} defaultValue="week" disabled />
    </Stack>
  ),
};

/** Right to left: arrow keys follow reading order and the indicator slides over the mirrored row. */
export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl" style={{ display: "grid", gap: 16, justifyItems: "start" }}>
      <SegmentedControl aria-label="Calendar range" options={VIEWS} defaultValue="week" />
      <SegmentedControl aria-label="Calendar range" options={VIEWS} flavour="text-only" shape="sharp" />
    </div>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8, justifyItems: "start" }}>
          <Cap>{cls || "base / light"}</Cap>
          <SegmentedControl aria-label="Calendar range" options={VIEWS} />
          <SegmentedControl aria-label="Calendar range" options={VIEWS} flavour="text-only" shape="sharp" defaultValue="week" />
          <SegmentedControl aria-label="Layout" options={[...LAYOUT.slice(0, 2), { ...LAYOUT[2]!, disabled: true }]} flavour="icon-only" />
          <SegmentedControl aria-label="Calendar range" options={VIEWS} inverse shape="full" defaultValue="week" />
        </div>
      ))}
    </div>
  ),
};
