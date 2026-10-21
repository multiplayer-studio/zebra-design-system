import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, IconButton, Button } from "../src/index.js";
import type { TooltipPoint, TooltipShape } from "../src/index.js";

const POINTS: TooltipPoint[] = ["bottom", "top", "left", "right"];
const SHAPES: TooltipShape[] = ["rounded", "sharp"];

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A short floating message that names what an adjacent control does. `point` names the edge the pointer sits on — the edge facing the trigger — so `point=\"bottom\"` puts the bubble above it. Built on Base UI's Tooltip: hover with a delay, keyboard focus, Escape to dismiss, collision flipping. With no `trigger` it renders the static bubble.",
      },
    },
  },
  argTypes: {
    point: { control: "inline-radio", options: POINTS },
    shape: { control: "inline-radio", options: SHAPES },
    children: { control: "text", name: "label (children)" },
    delay: { control: "number" },
    closeDelay: { control: "number" },
  },
  args: { point: "bottom", shape: "rounded", children: "Save draft", delay: 600, closeDelay: 0 },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

const Cap = ({ children }: { children: React.ReactNode }) => (
  <span style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</span>
);

// The portal mounts into the story's own frame (not document.body) so the
// bubble stays inside the docs preview and inside any theme scope around it.
// The container is a zero-size absolute box: Base UI's portal adds a wrapper
// div, which would otherwise take a slot in the stage's flex/grid layout.
function Stage({
  children,
  style,
  className,
}: {
  children: (container: HTMLElement) => React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <div ref={setContainer} style={{ position: "absolute", top: 0, left: 0, width: 0, height: 0 }} />
      {container ? children(container) : null}
    </div>
  );
}

/** Hover or tab to the button. */
export const Playground: Story = {
  render: (args) => (
    <Stage style={{ height: 200, display: "grid", placeItems: "center" }}>
      {(c) => (
        <Tooltip {...args} portalContainer={c} trigger={<IconButton icon="save" label="Save draft" shape="rounded" />} />
      )}
    </Stage>
  ),
};

/** Point names the pointer's edge: bottom → bubble above, top → below, left → to the right, right → to the left. Shown open. */
export const Points: Story = {
  render: (args) => (
    <Stage style={{ display: "flex", gap: 200, padding: "64px 120px", flexWrap: "wrap" }}>
      {(c) =>
        POINTS.map((point) => (
          <Tooltip key={point} {...args} point={point} open portalContainer={c} trigger={<IconButton icon="edit" label="Edit" shape="rounded" />}>
            {`point=${point}`}
          </Tooltip>
        ))
      }
    </Stage>
  ),
};

/** Rounded and sharp change the corners and the pointer tip together. */
export const Shapes: Story = {
  render: (args) => (
    <Stage style={{ display: "flex", gap: 120, padding: "64px 96px" }}>
      {(c) =>
        SHAPES.map((shape) => (
          <Tooltip key={shape} {...args} shape={shape} open portalContainer={c}
            trigger={<IconButton icon="delete" label="Delete" shape={shape} flavour="outline" />}>
            Delete item
          </Tooltip>
        ))
      }
    </Stage>
  ),
};

/** The spec's eight variants as static bubbles (no trigger) — the component exactly as Figma draws it. */
export const StaticVariants: Story = {
  render: (args) => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, max-content)", gap: 32, padding: 16, alignItems: "center" }}>
      {SHAPES.flatMap((shape) =>
        POINTS.map((point) => (
          <div key={shape + point} style={{ display: "grid", gap: 12, justifyItems: "start" }}>
            <Cap>{`${shape} · ${point}`}</Cap>
            <Tooltip shape={shape} point={point}>{args.children}</Tooltip>
          </div>
        )),
      )}
    </div>
  ),
};

/** No max width in Figma. Here a label wraps at ~32ch of its own font, between words. */
export const LongLabel: Story = {
  args: { children: "Copies the share link for this report to your clipboard so you can paste it into a message" },
  render: (args) => (
    <Stage style={{ height: 220, display: "grid", placeItems: "center" }}>
      {(c) => <Tooltip {...args} open portalContainer={c} trigger={<Button shape="rounded" leadingIcon="share">Share</Button>} />}
    </Stage>
  ),
};

/** Pinned to the viewport's top corners: `point="bottom"` has no room above, so the bubble flips below and the pointer follows; `point="right"` has no room on the right, so it flips left. The long label also shifts to stay on screen while its pointer keeps aiming at the trigger. */
export const Collision: Story = {
  parameters: { docs: { story: { inline: false, height: "160px" } } },
  render: (args) => (
    <Stage style={{ height: 120 }}>
      {(c) => (
        <>
          <Tooltip {...args} point="bottom" open portalContainer={c}
            trigger={<IconButton icon="hamburger-menu" label="Menu" shape="rounded" style={{ position: "fixed", top: 4, left: 4 }} />}>
            Open the navigation menu
          </Tooltip>
          <Tooltip {...args} point="right" open portalContainer={c}
            trigger={<IconButton icon="settings" label="Settings" shape="rounded" style={{ position: "fixed", top: 4, right: 4 }} />}>
            Settings
          </Tooltip>
        </>
      )}
    </Stage>
  ),
};

/** The same pair in each theme scope: base, dark, companion, companion dark. */
export const ThemingCascade: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <Stage key={cls} className={cls}
          style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 16, justifyItems: "start", minHeight: 160 }}>
          {(c) => (
            <>
              <Cap>{cls || "base / light"}</Cap>
              <Tooltip shape={args.shape} point="left">{args.children}</Tooltip>
              <div style={{ paddingTop: 36 }}>
                <Tooltip {...args} open portalContainer={c} trigger={<IconButton icon="save" label="Save draft" shape="rounded" />} />
              </div>
            </>
          )}
        </Stage>
      ))}
    </div>
  ),
};
