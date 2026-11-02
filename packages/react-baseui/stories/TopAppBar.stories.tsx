import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton, TopAppBar, type TopAppBarProps } from "../src/index.js";
import type { IconName } from "@zebra-design-system/icons/names";

const TYPES = ["default", "centered", "contextual", "contextual alt", "search", "extended"] as const;
const actions = (list: [IconName, string][]) => (
  <>{list.map(([icon, label]) => <IconButton key={label} flavour="subtle" size="small" shape="rounded" icon={icon} label={label} />)}</>
);
const bar = (props: TopAppBarProps) => (
  <TopAppBar
    avatarInitials="RK"
    trailing={actions([["world", "Language"], ["love", "Favourite"], ["more-vertical", "More"]])}
    contextualControls={actions([["edit", "Edit"], ["share", "Share"], ["delete", "Delete"], ["more-vertical", "More"]])}
    {...props}
  />
);

const meta: Meta<typeof TopAppBar> = {
  title: "Components/Top App Bar",
  component: TopAppBar,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "select", options: TYPES },
    shape: { control: "inline-radio", options: ["sharp", "rounded"] },
  },
  args: { type: "default", shape: "sharp", pageTitle: "Title" },
  render: (args) => <div style={{ maxWidth: 390 }}>{bar(args)}</div>,
};
export default meta;
type Story = StoryObj<typeof TopAppBar>;

export const Playground: Story = {};

/** Each value brings its own content. */
export const Types: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, maxWidth: 390 }}>
      {TYPES.map((type) => <React.Fragment key={type}>{bar({ type })}</React.Fragment>)}
    </div>
  ),
};

/** Shape sets the bar's own corner only. */
export const Shape: Story = { args: { shape: "rounded" } };
