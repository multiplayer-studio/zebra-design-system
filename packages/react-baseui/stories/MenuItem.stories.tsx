import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "@base-ui/react/menu";
import { MenuItem } from "../src/index.js";
import { iconNames } from "@zebra-design-system/icons/names";

const TYPES = ["icon", "checkbox", "radio", "custom"] as const;

// Menu.Item only renders meaningfully inside a Menu.Root + open Menu.Popup —
// wrap every story specimen so highlight/keyboard navigation actually work.
const MenuHost = ({ children, width = 240 }: { children: React.ReactNode; width?: number }) => (
  <Menu.Root open>
    <Menu.Trigger render={<button style={{ display: "none" }} />} />
    <Menu.Portal keepMounted>
      <Menu.Positioner side="bottom" align="start" style={{ position: "static" }}>
        <div
          style={{
            width,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            padding: 12,
            background: "var(--surface-menu)",
            boxShadow: "0 8px 24px rgb(0 0 0 / 0.15)",
          }}
        >
          {children}
        </div>
      </Menu.Positioner>
    </Menu.Portal>
  </Menu.Root>
);

const meta: Meta<typeof MenuItem> = {
  title: "Components/MenuItem",
  component: MenuItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Behaviour — roving highlight, keyboard navigation, disabled semantics — from Base UI's Menu.Item. Icon/checkbox/radio share the same exposed Icon glyph with no drawn control (see the spec's internalVariations issue).",
      },
    },
  },
  decorators: [(Story) => <MenuHost><Story /></MenuHost>],
  argTypes: {
    type: { control: "inline-radio", options: TYPES },
    rounded: { control: "boolean" },
    disabled: { control: "boolean" },
    selected: { control: "boolean" },
    leadingIcon: { control: "select", options: [undefined, ...iconNames] },
    trailingIcon: { control: "select", options: [undefined, ...iconNames] },
  },
  args: { type: "icon", rounded: false, disabled: false, selected: false, leadingIcon: "verified", children: "Menu Item" },
};
export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Playground: Story = {};

/** Icon, checkbox and radio share one exposed Icon instance — the glyph you pick is the only difference; custom swaps in an arbitrary `leadingSlot`. */
export const Types: Story = {
  render: (args) => (
    <>
      <MenuItem {...args} type="icon" leadingIcon="verified">Icon</MenuItem>
      <MenuItem {...args} type="checkbox" leadingIcon="check-mark">Checkbox (glyph-only)</MenuItem>
      <MenuItem {...args} type="radio" leadingIcon="check-mark">Radio (glyph-only)</MenuItem>
      <MenuItem {...args} type="custom" leadingSlot={<span style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--interactive-primary-background-default)" }} />}>
        Custom
      </MenuItem>
    </>
  ),
};

/** Square (rounded=false) matches a square panel; rounded=true matches a floating rounded one. Match the panel, don't mix. */
export const Rounded: Story = {
  render: (args) => (
    <>
      <MenuItem {...args} rounded={false}>Rounded=false</MenuItem>
      <MenuItem {...args} rounded={true}>Rounded=true</MenuItem>
    </>
  ),
};

/**
 * Default/hover/selected/focus/selected-focus/disabled. Hover and focus are
 * driven by Base UI (`data-highlighted`, `:focus-visible`) rather than props
 * — this row uses the `selected` prop, the one state MenuItem adds itself,
 * to show the tint statically for the story.
 */
export const States: Story = {
  render: (args) => (
    <>
      <MenuItem {...args}>Default</MenuItem>
      <MenuItem {...args} selected>Selected</MenuItem>
      <MenuItem {...args} disabled>Disabled</MenuItem>
    </>
  ),
};

/** Leading element hidden shifts the label to the leading edge. Trailing icon adds a submenu/external-link mark. */
export const LeadingAndTrailing: Story = {
  render: (args) => (
    <>
      <MenuItem {...args} leadingIcon={undefined}>No leading element</MenuItem>
      <MenuItem {...args} trailingIcon="chevron-right">With trailing icon</MenuItem>
      <MenuItem {...args} leadingIcon={undefined} trailingIcon="chevron-right">Trailing only</MenuItem>
    </>
  ),
};
