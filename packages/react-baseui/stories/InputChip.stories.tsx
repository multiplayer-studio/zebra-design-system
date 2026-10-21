import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { InputChip } from "../src/index.js";

const PHOTO = "https://i.pravatar.cc/200?img=47";
const PEOPLE = ["Ada Alden", "Grace Hopper", "Alan Turing"];
const Row = ({ children }: { children: React.ReactNode }) => <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>{children}</div>;
const Cap = ({ children }: { children: React.ReactNode }) => <div style={{ font: "500 12px/1.4 system-ui", opacity: 0.7 }}>{children}</div>;
const noop = () => {};

const meta: Meta<typeof InputChip> = {
  title: "Components/Chips/Input Chip", component: InputChip, tags: ["autodocs"],
  argTypes: { shape: { control: "inline-radio", options: ["rounded", "sharp"] }, onRemove: { action: "remove" } },
  args: { children: "Ada Alden", showAvatar: true, avatarSrc: PHOTO, disabled: false, shape: "rounded", removable: true },
};
export default meta;
type Story = StoryObj<typeof InputChip>;

export const Playground: Story = {};

/** A face or initials for people; off for tags and typed terms. */
export const ShowAvatar: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      <Row>
        <InputChip avatarSrc={PHOTO} onRemove={noop}>Ada Alden</InputChip>
        <InputChip onRemove={noop}>Grace Hopper</InputChip>
      </Row>
      <Row>
        <InputChip showAvatar={false} onRemove={noop}>invoices-2026</InputChip>
        <InputChip showAvatar={false} onRemove={noop}>Urgent</InputChip>
      </Row>
    </div>
  ),
};

/** Hover and focus come from interaction, not a prop: point at a chip, or Tab to its remove control. */
export const State: Story = {
  render: () => <Row>{PEOPLE.map((p) => <InputChip key={p} onRemove={noop}>{p}</InputChip>)}</Row>,
};

/** A fixed value: greyed, borderless, and the remove control is hidden. */
export const Disabled: Story = {
  render: () => (
    <Row>
      <InputChip onRemove={noop}>Grace Hopper</InputChip>
      <InputChip disabled onRemove={noop}>Grace Hopper</InputChip>
      <InputChip showAvatar={false} disabled>Finance team</InputChip>
    </Row>
  ),
};

/** Spec `rounded`: pill (rounded) or square (sharp). */
export const Shape: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12 }}>
      {(["rounded", "sharp"] as const).map((s) => (
        <Row key={s}>{PEOPLE.map((p) => <InputChip key={p} shape={s} onRemove={noop}>{p}</InputChip>)}</Row>
      ))}
    </div>
  ),
};

/** The remove control: named "Remove <label>", activated by click, Enter/Space or Backspace/Delete. The field announces the change. */
export const Removable: Story = {
  render: function Render() {
    const [people, setPeople] = React.useState(PEOPLE);
    const [said, setSaid] = React.useState("");
    return (
      <div style={{ display: "grid", gap: 8 }}>
        <Row>
          {people.map((p) => (
            <InputChip key={p} onRemove={() => { setPeople((l) => l.filter((x) => x !== p)); setSaid(`${p} removed`); }}>{p}</InputChip>
          ))}
          {people.length === 0 ? <button type="button" onClick={() => setPeople(PEOPLE)}>Reset</button> : null}
        </Row>
        <div role="status" aria-live="polite" style={{ font: "12px system-ui", opacity: 0.7 }}>{said}</div>
      </div>
    );
  },
};

export const ThemingCascade: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
      {["", "mode-dark", "ext-companion", "ext-companion mode-dark"].map((cls) => (
        <div key={cls} className={cls} style={{ padding: 16, background: "var(--surface-page)", color: "var(--foreground-primary)", display: "grid", gap: 8 }}>
          <Cap>{cls || "base / light"}</Cap>
          <Row>
            <InputChip avatarSrc={PHOTO} onRemove={noop}>Ada Alden</InputChip>
            <InputChip onRemove={noop}>Grace Hopper</InputChip>
            <InputChip showAvatar={false} onRemove={noop}>Urgent</InputChip>
            <InputChip disabled>Alan Turing</InputChip>
          </Row>
        </div>
      ))}
    </div>
  ),
};
