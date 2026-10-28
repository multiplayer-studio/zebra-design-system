import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, Button, MenuItem } from "../src/index.js";

const POSITIONS = ["bottom", "top", "right", "left"] as const;
const ALIGNS = ["left", "right", "bottom", "top"] as const;

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A trigger paired with a Dropdown Menu, positioned relative to it. Composes Base UI's Menu.Root/Trigger/Portal/Positioner with this package's DropdownMenu and MenuItem.",
      },
    },
  },
  argTypes: {
    position: { control: "inline-radio", options: POSITIONS },
    align: { control: "inline-radio", options: ALIGNS },
    rounded: { control: "boolean" },
    defaultOpen: { control: "boolean" },
  },
  args: { position: "bottom", align: "left", rounded: true, defaultOpen: true },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

const DefaultRows = () => (
  <>
    <MenuItem leadingIcon="verified">Menu Item</MenuItem>
    <MenuItem leadingIcon="verified">Menu Item</MenuItem>
    <MenuItem leadingIcon="verified">Menu Item</MenuItem>
  </>
);

// `Menu.Portal` mounts to `document.body` by default. That's harmless for
// theming (an ancestor `.mode-*`/`.ext-*` class still reaches it as long as
// it's scoped to `<html>`/`<body>` — see `Dropdown`'s own `portalContainer`
// doc), but on Storybook's Autodocs page every story on the page shares one
// `document.body`, so a portaled panel renders appended at the very end of
// the whole docs page — below each story's own bordered preview frame, not
// inside it. A tall `Stage` div doesn't fix that on its own, since it's
// never the portaled panel's actual DOM parent; passing that same div as
// `portalContainer` is what keeps the panel inside the visible frame.
const Stage = ({ children }: { children: React.ReactNode }) => {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  return (
    <div
      ref={setContainer}
      style={{ height: 320, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
    >
      {container ? React.cloneElement(children as React.ReactElement, { portalContainer: container }) : null}
    </div>
  );
};

export const Playground: Story = {
  render: (args) => (
    <Stage>
      <Dropdown {...args} trigger={<Button shape="rounded">Open menu</Button>}>
        <DefaultRows />
      </Dropdown>
    </Stage>
  ),
};

/** Bottom opens below (the default), top above, right/left to either side of a narrow column. */
export const Positions: Story = {
  render: () => {
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
    return (
      <div ref={setContainer} style={{ display: "flex", gap: 240, flexWrap: "wrap", padding: 120 }}>
        {container &&
          POSITIONS.map((position) => (
            <Dropdown
              key={position}
              position={position}
              defaultOpen
              portalContainer={container}
              trigger={<Button shape="rounded">{position}</Button>}
            >
              <DefaultRows />
            </Dropdown>
          ))}
      </div>
    );
  },
};

/** Left/top line up the leading/top edge with the trigger; right/bottom line up the trailing/bottom edge. Only two of the four values apply to any one Position. */
export const Aligns: Story = {
  render: () => {
    const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
    return (
      <div ref={setContainer} style={{ display: "flex", gap: 240, flexWrap: "wrap", padding: 120 }}>
        {container && (
          <>
            <Dropdown position="bottom" align="left" defaultOpen portalContainer={container} trigger={<Button shape="rounded">bottom / left</Button>}>
              <DefaultRows />
            </Dropdown>
            <Dropdown position="bottom" align="right" defaultOpen portalContainer={container} trigger={<Button shape="rounded">bottom / right</Button>}>
              <DefaultRows />
            </Dropdown>
            <Dropdown position="right" align="top" defaultOpen portalContainer={container} trigger={<Button shape="rounded">right / top</Button>}>
              <DefaultRows />
            </Dropdown>
            <Dropdown position="right" align="bottom" defaultOpen portalContainer={container} trigger={<Button shape="rounded">right / bottom</Button>}>
              <DefaultRows />
            </Dropdown>
          </>
        )}
      </div>
    );
  },
};

/** The trigger swaps in through `trigger` — Button is the suggested default, but any element works via the same Base UI `render` polymorphism Button itself exposes. */
export const CustomTrigger: Story = {
  render: () => (
    <Stage>
      <Dropdown defaultOpen trigger={<Button shape="rounded" flavour="outline" leadingIcon="add">Custom trigger</Button>}>
        <DefaultRows />
      </Dropdown>
    </Stage>
  ),
};

/** Closed is the resting state: trigger only, menu hidden but present. */
export const Closed: Story = {
  args: { defaultOpen: false },
  render: (args) => (
    <Stage>
      <Dropdown {...args} trigger={<Button shape="rounded">Closed</Button>}>
        <DefaultRows />
      </Dropdown>
    </Stage>
  ),
};
