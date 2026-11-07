import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "../src/index.js";
import { iconNames } from "@zebra-design-system/icons/names";

const SIZES = ["xxxsmall", "xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge", "xxxlarge"] as const;
const SWATCH_COLORS = ["purple", "blue", "sea", "yellow", "orange", "green", "burgundy"] as const;
const STATUSES = ["available", "away", "busy", "dnd", "on-shift", "offline"] as const;

const PHOTO = "https://i.pravatar.cc/200?img=47";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A visual representation of a user or entity, shown as a photo, initials, or icon, with an optional status indicator.",
      },
    },
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    type: { control: "inline-radio", options: ["initials", "photo", "icon"] },
    swatchColor: { control: "select", options: SWATCH_COLORS },
    icon: { control: "select", options: [undefined, ...iconNames] },
    statusIcon: { control: "select", options: [undefined, ...iconNames] },
    status: { control: "select", options: [...STATUSES, "icon"] },
    showClose: { control: "boolean" },
    showStatus: { control: "boolean" },
    showRing: { control: "boolean" },
  },
  args: {
    size: "medium",
    type: "initials",
    initials: "AA",
    swatchColor: "purple",
    showClose: false,
    showStatus: true,
    status: "available",
    statusLabel: "Available",
    showRing: true,
    alt: "Ada Alden",
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>{children}</div>
);

export const Playground: Story = {};

/** Nine sizes, xxxsmall to xxxlarge. Only medium is bound to a real token. */
export const Sizes: Story = {
  render: () => (
    <Row>
      {SIZES.map((s) => (
        <Avatar key={s} size={s} type="initials" initials="AA" showClose={false} showStatus={false} showRing />
      ))}
    </Row>
  ),
};

/** Initials, a photo, or an icon — swap-only in Figma, exposed here as `type`. */
export const ContentTypes: Story = {
  render: () => (
    <Row>
      <Avatar size="xlarge" type="initials" initials="AA" showStatus={false} showClose={false} />
      <Avatar size="xlarge" type="photo" src={PHOTO} alt="Ada Alden" showStatus={false} showClose={false} />
      <Avatar size="xlarge" type="icon" icon="person" showStatus={false} showClose={false} />
    </Row>
  ),
};

/** Background behind initials or a content icon. Not used behind a photo. */
export const SwatchColors: Story = {
  render: () => (
    <Row>
      {SWATCH_COLORS.map((c) => (
        <Avatar key={c} size="large" type="initials" initials="AA" swatchColor={c} showStatus={false} showClose={false} />
      ))}
    </Row>
  ),
};

/** Any other colour: a token name, a custom property, or a CSS colour value. */
export const CustomSwatch: Story = {
  render: () => (
    <Row>
      {["chart/series/2", "feedback/error/background/strong", "--chart-series-10", "#0b7a75"].map((c) => (
        <Avatar key={c} size="large" type="initials" initials="AA" swatchColor={c} showStatus={false} showClose={false} title={c} />
      ))}
    </Row>
  ),
};

/**
 * Presence states. In the current Figma file every state but "icon" shares
 * one glyph and differs only by fill colour (spec issue) — this component
 * follows that rather than inventing a distinct glyph the design doesn't specify.
 */
export const StatusStates: Story = {
  render: () => (
    <Row>
      {STATUSES.map((s) => (
        <Avatar key={s} size="large" type="initials" initials="AA" status={s} statusLabel={s} showClose={false} />
      ))}
      <Avatar size="large" type="initials" initials="AA" status="icon" statusIcon="star" statusLabel="Custom" showClose={false} />
    </Row>
  ),
};

/** The dismiss badge. Give it a real handler and an accessible name — Figma has no interactive state for it. */
export const Closable: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);
    if (!visible) return <button onClick={() => setVisible(true)}>Show again</button>;
    return (
      <Avatar
        size="large"
        type="photo"
        src={PHOTO}
        alt="Ada Alden"
        showClose
        onClose={() => setVisible(false)}
        showStatus={false}
      />
    );
  },
};

/** Hides the ring on a background where the outline would compete. */
export const NoRing: Story = {
  render: () => (
    <Row>
      <Avatar size="xlarge" type="photo" src={PHOTO} alt="Ada Alden" showRing showStatus={false} showClose={false} />
      <Avatar size="xlarge" type="photo" src={PHOTO} alt="Ada Alden" showRing={false} showStatus={false} showClose={false} />
    </Row>
  ),
};

/** Theming is a class, at any level, cascading to everything inside. */
export const ThemingCascade: Story = {
  render: () => {
    const Panel = ({ cls, label }: { cls: string; label: string }) => (
      <div
        className={cls}
        style={{
          padding: 16,
          borderRadius: 8,
          background: "var(--surface-page)",
          color: "var(--foreground-primary)",
          border: "1px solid var(--border-default)",
        }}
      >
        <div style={{ font: "500 12px/1.4 system-ui", marginBottom: 8, opacity: 0.7 }}>{label || "base / light"}</div>
        <Row>
          <Avatar size="medium" type="initials" initials="AA" status="available" statusLabel="Available" />
        </Row>
      </div>
    );
    return (
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
        <Panel cls="" label="" />
        <Panel cls="mode-dark" label="mode-dark" />
        <Panel cls="ext-companion" label="ext-companion" />
        <Panel cls="ext-companion mode-dark" label="ext-companion mode-dark" />
      </div>
    );
  },
};
