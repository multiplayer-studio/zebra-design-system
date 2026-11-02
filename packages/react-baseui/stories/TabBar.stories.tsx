import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { iconNames } from "@zebra-design-system/icons/names";
import { TabBar, TabItem, type TabBarFlavour } from "../src/index.js";

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "grid", gap: 16, inlineSize: 708 }}>{children}</div>
);
const Cap = ({ children }: { children: React.ReactNode }) => (
  <div style={{ font: "500 12px/1.4 system-ui", color: "var(--foreground-secondary)" }}>{children}</div>
);

const FOUR = (
  <>
    <TabItem value="one" label="Tab Item" icon="star" />
    <TabItem value="two" label="Tab Item" icon="star" />
    <TabItem value="three" label="Tab Item" icon="star" />
    <TabItem value="four" label="Tab Item" icon="star" />
  </>
);

type PlaygroundArgs = {
  flavour: TabBarFlavour;
  icon: (typeof iconNames)[number] | undefined;
  badge: string;
  disableLast: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: "Components/Tab Bar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A row of tabs for switching between views at the same level. `flavour` sets whether the tabs divide the row or hug. Built on Base UI Tabs: one tab stop on the selected tab, arrow keys and Home/End move and select. Show the matching view yourself from `value`. Spec: specs/tab-bar.",
      },
    },
  },
  argTypes: {
    flavour: { control: "inline-radio", options: ["full-width", "condensed"] },
    icon: { control: "select", options: [undefined, ...iconNames] },
    badge: { control: "text", description: "Badge on the second tab: empty for none, `dot`, or a count." },
    disableLast: { control: "boolean" },
  },
  args: { flavour: "full-width", icon: "star", badge: "", disableLast: false },
  render: ({ flavour, icon, badge, disableLast }) => (
    <div style={{ inlineSize: 708 }}>
      <TabBar flavour={flavour} label="Sections" defaultValue="one">
        <TabItem value="one" label="Overview" icon={icon} />
        <TabItem value="two" label="Activity" icon={icon} badge={badge === "dot" ? true : badge || null} />
        <TabItem value="three" label="Settings" icon={icon} />
        <TabItem value="four" label="Billing" icon={icon} disabled={disableLast} />
      </TabBar>
    </div>
  ),
};
export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {};

/** Spec `flavour`: full width divides the row (177 each with four at 708); condensed hugs. */
export const Flavour: Story = {
  render: () => (
    <Stack>
      <Cap>full-width</Cap>
      <TabBar flavour="full-width" label="Full width" defaultValue="one">{FOUR}</TabBar>
      <Cap>condensed</Cap>
      <div><TabBar flavour="condensed" label="Condensed" defaultValue="one">{FOUR}</TabBar></div>
    </Stack>
  ),
};

/** Tab Item states: default, selected and disabled (hover, pressed and focus are CSS states). */
export const States: Story = {
  render: () => (
    <div><TabBar flavour="condensed" label="States" defaultValue="selected">
      <TabItem value="default" label="Default" icon="star" />
      <TabItem value="selected" label="Selected" icon="star" />
      <TabItem value="disabled" label="Disabled" icon="star" disabled />
    </TabBar></div>
  ),
};

/** Tab Item content: icon on or off, and a dot or count badge. */
export const Content: Story = {
  render: () => (
    <div><TabBar flavour="condensed" label="Content" defaultValue="a">
      <TabItem value="a" label="Icon" icon="star" />
      <TabItem value="b" label="No icon" />
      <TabItem value="c" label="Dot" icon="star" badge badgeLabel="new activity" />
      <TabItem value="d" label="Count" icon="star" badge={120} badgeLabel="120 unread" />
    </TabBar></div>
  ),
};

/** Controlled: the bar reports the value and the page shows the matching view. */
export const Controlled: Story = {
  render: function Controlled() {
    const [value, setValue] = React.useState<string>("wifi");
    return (
      <Stack>
        <div><TabBar flavour="condensed" label="Connection type" value={value} onValueChange={(v) => setValue(String(v))}>
          <TabItem value="wifi" label="Wi-Fi" icon="wifi" />
          <TabItem value="ethernet" label="Ethernet" icon="ethernet" />
        </TabBar></div>
        <Cap>Showing: {value}</Cap>
      </Stack>
    );
  },
};
