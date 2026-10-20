import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Avatar } from "../src/components/avatar/Avatar.js";
import { AvatarRail } from "../src/components/avatar-rail/AvatarRail.js";

const SIZES = ["xxxsmall", "xxsmall", "xsmall", "small", "medium", "large", "xlarge", "xxlarge", "xxxlarge"] as const;

// The spec's sample: initials purple, a photo, initials blue, initials sea.
const PEOPLE = [
  { initials: "AA", color: "purple", name: "Ada Alden" },
  { photo: "https://i.pravatar.cc/200?img=47", name: "Bea Brook" },
  { initials: "CK", color: "blue", name: "Cal Kerr" },
  { initials: "DM", color: "sea", name: "Dee Moss" },
  { initials: "EF", color: "orange", name: "Eli Fox" },
  { initials: "GH", color: "green", name: "Gus Hale" },
] as const;

const avatars = (n = 4) =>
  PEOPLE.slice(0, n).map((p) =>
    "photo" in p ? (
      <Avatar key={p.name} type="photo" src={p.photo} alt={p.name} />
    ) : (
      <Avatar key={p.name} initials={p.initials} swatchColor={p.color} alt={p.name} />
    ),
  );

const meta: Meta<typeof AvatarRail> = {
  title: "Components/Avatar Rail",
  component: AvatarRail,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: SIZES },
    stacking: { control: "inline-radio", options: ["start", "end"] },
    showOverflow: { control: "boolean" },
    max: { control: { type: "range", min: 2, max: 4 } },
  },
  args: { size: "medium", stacking: "start", showOverflow: true, max: 4, label: "Assignees" },
  render: (a) => <AvatarRail {...a}>{avatars(6)}</AvatarRail>,
};
export default meta;
type Story = StoryObj<typeof AvatarRail>;

const Col = ({ children }: { children: React.ReactNode }) => <div style={{ display: "grid", gap: 20, justifyItems: "start" }}>{children}</div>;

export const Playground: Story = {};

/** Every avatar and the counter take one diameter; the overlap is a quarter of it. */
export const Size: Story = {
  render: () => <Col>{SIZES.map((s) => <AvatarRail key={s} size={s} label="Assignees">{avatars(6)}</AvatarRail>)}</Col>,
};

/** Only the paint order changes. */
export const Stacking: Story = {
  render: () => <Col>{(["start", "end"] as const).map((s) => <AvatarRail key={s} size="large" stacking={s} label="Assignees">{avatars(6)}</AvatarRail>)}</Col>,
};

/** Six people at each max: the rail shows max of them and counts the rest. */
export const Max: Story = {
  render: () => <Col>{[2, 3, 4].map((m) => <AvatarRail key={m} size="medium" max={m} label="Assignees">{avatars(6)}</AvatarRail>)}</Col>,
};

/** Off only where the rail shows the whole group; with nothing past max there is no counter either way. */
export const ShowOverflow: Story = {
  render: () => (
    <Col>
      <AvatarRail size="medium" max={3} label="Assignees">{avatars(6)}</AvatarRail>
      <AvatarRail size="medium" max={3} showOverflow={false} label="Assignees">{avatars(6)}</AvatarRail>
      <AvatarRail size="medium" max={4} label="Assignees">{avatars(4)}</AvatarRail>
    </Col>
  ),
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, borderRadius: 8, background: "var(--surface-page)", color: "var(--foreground-primary)", border: "1px solid var(--border-default)", display: "grid", gap: 8 }}>
          <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{cls || "base / light"}</div>
          <AvatarRail size="medium" label="Assignees">{avatars(6)}</AvatarRail>
        </div>
      ))}
    </div>
  ),
};
