import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Menu } from "@base-ui/react/menu";
import { DropdownMenu, MenuItem } from "../src/index.js";

// DropdownMenu wraps Menu.Popup, which needs a Menu.Root/Portal/Positioner
// around it to mount at all — the same host every story uses, standing in
// for the Dropdown component that normally supplies it.
//
// `Menu.Portal` mounts to `document.body` by default (see Dropdown's own
// `portalContainer` prop, added for exactly this reason). That's invisible in
// a real app's theming, but inside a Storybook story it moves the rendered
// panel out of the story's own root — with the Positioner forced to
// `position: static` here (so this story shows the panel in place rather
// than floating), the panel then lands wherever it falls in `<body>`'s
// normal flow, below the visible framed canvas, rather than inside it. No
// amount of height on a wrapper *inside* the story fixes that, since that
// wrapper is never the portaled panel's parent — the fix is to portal into a
// container that's actually part of this story's own DOM instead of `body`.
const MenuHost = ({ children }: { children: React.ReactNode }) => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  return (
    <Menu.Root open>
      <Menu.Trigger render={<button style={{ display: "none" }} />} />
      <div ref={setContainer} />
      {/* Gate on `container` rather than passing `container={null}` on the
          first render: Base UI's underlying FloatingPortal treats an explicit
          `null` container as "not resolved yet" and never falls back to
          `document.body` for it — it just renders nothing, forever, even
          once `container` later becomes real (see `useFloatingPortalNode`).
          Not rendering `Menu.Portal` at all until the ref callback has fired
          avoids ever hitting that branch, matching the same pattern
          Dropdown.stories.tsx's `Stage` uses. */}
      {container && (
        <Menu.Portal keepMounted container={container}>
          <Menu.Positioner side="bottom" align="start" style={{ position: "static" }}>
            {children}
          </Menu.Positioner>
        </Menu.Portal>
      )}
    </Menu.Root>
  );
};

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/Dropdown/Dropdown Menu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The floating panel a Dropdown opens onto. Renders `children` (any MenuItem rows) inside Menu.Popup — the spec's split between two 'built-in' rows and a slot for the rest is a Figma authoring artifact (content stored per Rounded variant), not a real anatomy difference, so this component does not reproduce it.",
      },
    },
  },
  decorators: [(Story) => <MenuHost><Story /></MenuHost>],
  argTypes: {
    rounded: { control: "boolean" },
  },
  args: { rounded: false },
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

const DefaultRows = () => (
  <>
    <MenuItem leadingIcon="verified">Menu Item</MenuItem>
    <MenuItem leadingIcon="verified">Menu Item</MenuItem>
    <MenuItem leadingIcon="verified">Menu Item</MenuItem>
    <MenuItem leadingIcon="verified">Menu Item</MenuItem>
  </>
);

export const Playground: Story = {
  render: (args) => <DropdownMenu {...args}><DefaultRows /></DropdownMenu>,
};

/**
 * Square corners for a panel against square surfaces; rounded for a panel
 * that reads as a floating object. The rows round with the panel — none of
 * `DefaultRows`'s `MenuItem`s set their own `rounded`, they inherit the
 * panel's via `MenuItemRoundedContext`.
 */
export const Rounded: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <DropdownMenu rounded={false}><DefaultRows /></DropdownMenu>
      <DropdownMenu rounded={true}><DefaultRows /></DropdownMenu>
    </div>
  ),
};

/** `moreItems` has no anatomy of its own in code — it's just "render fewer children." */
export const MoreItems: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <DropdownMenu>
        <MenuItem leadingIcon="verified">Menu Item</MenuItem>
        <MenuItem leadingIcon="verified">Menu Item</MenuItem>
      </DropdownMenu>
      <DropdownMenu><DefaultRows /></DropdownMenu>
    </div>
  ),
};
